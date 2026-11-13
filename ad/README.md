# JobCardBook – Nepali promo video

Everything here is original and made from code: the animation (`scene.html`), the music (`music.py`, synthesized
sample by sample with numpy, no loops or samples) and the layout. All data on screen is made up
("डेमो वर्कशप", राम बहादुर, सीता देवी, हरि प्रसाद, 98XXXXXXXX, Model X, round prices). No real customer, dealer,
brand or logo appears. Font: Mukta (SIL Open Font License, `fonts/OFL.txt`) – free for commercial use.

## Files
| File | What |
|---|---|
| `out/jobcardbook_20s_vertical.mp4` | 1080×1920, 30 fps, 20 s – Reels, Shorts, TikTok, WhatsApp status |
| `out/jobcardbook_20s_horizontal.mp4` | 1920×1080, 30 fps, 20 s – YouTube, Facebook feed |
| `out/jobcardbook_15s_vertical.mp4` | 1080×1920, 15 s cut (no reminder/report scene) |
| `out/thumbnail.png` | 1080×1920 call-to-action frame |
| `music_20s.wav`, `music_15s.wav` | the background music on its own (−14 LUFS, true peak ≤ −1.5 dB) |
| `voiceover.txt` | Nepali voiceover script for both lengths |
| `scene.html` | the animation (open in a browser with `?mode=v&cut=20&t=9` to see one moment) |
| `render.js` | renders `scene.html` frame by frame (Playwright) and encodes with ffmpeg |
| `music.py` | music synthesizer |
| `build.sh` | rebuilds everything |

Video: H.264 (yuv420p, CRF 18), audio AAC 192 kb/s, 44.1 kHz.

## Re-render
```bash
bash ad/build.sh            # from the repo root; needs python3 + numpy + scipy, ffmpeg, node + playwright
```
Takes about 10 minutes (600 frames per 20 s video).

## Change things
- **Text**: edit `TEXT` near the top of the `<script>` in `scene.html` (one line per scene). Keep each line to 6–8 words.
- **Colours**: `:root` variables at the top of `scene.html` (`--bg`, `--indigo`, `--violet`, `--pink`).
- **Timing**: the `SC` object in `scene.html`; if you change it, change the same numbers in `music.py` (`SC`).
- **Phone screens**: the HTML blocks `sHome`, `sSearch`, `sJob`, `sRem` inside `#screen`.
- **Music**: in `music.py` – `BPM`, `chords` (MIDI notes, one chord per bar), `motif` (melody), `madal` (16-step drum
  pattern: `D` low stroke, `t` high slap). Run `bash ad/build.sh` again.

## Voice
There is no voiced version yet. No Nepali text-to-speech engine with a licence that clearly allows commercial use was
available offline in the build environment, so the videos have music and on-screen text only, and the script is in
`voiceover.txt`. To add a voice: record it (or use a TTS service whose licence allows commercial use), save as
`ad/voice_20s.wav`, then:
```bash
ffmpeg -i ad/out/jobcardbook_20s_vertical.mp4 -i ad/voice_20s.wav -filter_complex \
 "[0:a]volume=0.35[m];[m][1:a]sidechaincompress=threshold=0.05:ratio=8:attack=20:release=300[d];[d][1:a]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k ad/out/jobcardbook_20s_vertical_voice.mp4
```
