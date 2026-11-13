// Captures the animation frame by frame with Playwright and pipes it to ffmpeg.
// Usage: node render.js <cut 20|15> <layout v|h> <out.mp4>      (silent video)
//        node render.js still <cut> <layout> <t seconds> <out.png>
//        node render.js timeline                                 (writes build/timeline_*.json)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
const TL = require('./timeline.js');
const SIZE = { v: [1080, 1920], h: [1920, 1080] };
const url = (cut, layout) => 'file://' + path.join(__dirname, 'index.html') + `?cut=${cut}&layout=${layout}`;

async function open(cut, layout) {
  const [width, height] = SIZE[layout];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exitCode = 1; });
  await page.goto(url(cut, layout));
  await page.waitForFunction('window.READY === true');
  return { browser, page };
}

(async () => {
  const a = process.argv.slice(2);
  fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });
  if (a[0] === 'timeline') {
    for (const c of Object.keys(TL.cuts)) fs.writeFileSync(path.join(__dirname, 'build', `timeline_${c}.json`), JSON.stringify(TL.resolve(c), null, 1));
    return;
  }
  if (a[0] === 'still') {
    const { browser, page } = await open(a[1], a[2]);
    await page.evaluate(t => window.renderFrame(t), parseFloat(a[3]));
    await page.screenshot({ path: a[4] });
    await browser.close(); return;
  }
  const [cut, layout, out] = a, T = TL.resolve(cut), n = Math.round(T.dur * T.fps);
  const { browser, page } = await open(cut, layout);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(T.fps), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-r', String(T.fps), '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    await page.evaluate(t => window.renderFrame(t), i / T.fps);
    const buf = await page.screenshot({ type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 100 === 0) console.log(`${out}: frame ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
})();
