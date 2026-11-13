// Renders ad/scene.html frame by frame with Playwright, then encodes with ffmpeg.
// Usage:
//   node ad/render.js stills v 20            -> ad/out/stills/*.png at key moments
//   node ad/render.js video  v 20            -> ad/out/jobcardbook_20s_vertical.mp4
//   (mode v|h, cut 20|15). Needs: playwright (chromium) and ffmpeg on PATH.
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");

const [what = "stills", mode = "v", cut = "20"] = process.argv.slice(2);
const FPS = 30, DIR = __dirname, OUT = path.join(DIR, "out");
const W = mode === "v" ? 1080 : 1920, H = mode === "v" ? 1920 : 1080;
const name = `jobcardbook_${cut}s_${mode === "v" ? "vertical" : "horizontal"}`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const errs = []; p.on("pageerror", e => errs.push(e.message));
  await p.goto("file://" + path.join(DIR, "scene.html") + `?mode=${mode}&cut=${cut}`);
  await p.evaluate(() => document.fonts.ready);
  if (what === "stills") {
    const sd = path.join(OUT, "stills"); fs.mkdirSync(sd, { recursive: true });
    const times = cut === "15" ? [1, 2.2, 4.6, 7.4, 10.4, 13.5] : [1, 2.6, 5.8, 9.2, 12.4, 15.4, 18.5];
    for (const t of times) { await p.evaluate(t => render(t), t); await p.screenshot({ path: path.join(sd, `${name}_t${t}.png`) }); }
    console.log("stills done", errs);
  } else {
    const fd = path.join(OUT, "frames_" + name); fs.rmSync(fd, { recursive: true, force: true }); fs.mkdirSync(fd, { recursive: true });
    const n = Math.round(parseFloat(cut) * FPS);
    for (let i = 0; i < n; i++) {
      await p.evaluate(t => render(t), i / FPS);
      await p.screenshot({ path: path.join(fd, `f${String(i).padStart(4, "0")}.jpg`), type: "jpeg", quality: 92 });
    }
    const music = path.join(DIR, `music_${cut}s.wav`);
    const mp4 = path.join(OUT, name + ".mp4");
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(fd, "f%04d.jpg"), "-i", music,
      "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", mp4]);
    fs.rmSync(fd, { recursive: true, force: true });
    console.log("video", mp4, errs);
  }
  await b.close();
})();
