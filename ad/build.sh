#!/usr/bin/env bash
# Re-renders everything: music, voice, video frames, final MP4s and thumbnail.
#   ./build.sh            all deliverables
#   ./build.sh audio      only music + voice mix
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p build out
node render.js timeline
for c in 20 15; do python3 music.py $c; done
VOICE=0
if command -v espeak-ng >/dev/null; then VOICE=1; for c in 20 15; do python3 voice.py $c; done; fi
[ "${1:-}" = audio ] && exit 0

# silent video passes (cut layout name), rendered in parallel
node render.js 20 v build/v_20s_vertical.mp4 &
node render.js 20 h build/v_20s_horizontal.mp4 &
node render.js 15 v build/v_15s_vertical.mp4 &
wait

mux() { # <video> <audio> <out>
  ffmpeg -y -loglevel error -i "$1" -i "$2" -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$3"
}
for n in 20s_vertical 20s_horizontal 15s_vertical; do
  c=${n%%s_*}
  mux build/v_$n.mp4 music_${c}s.wav out/jobcardbook_$n.mp4
  [ $VOICE = 1 ] && mux build/v_$n.mp4 build/mix_voice_$c.wav out/jobcardbook_${n}_voice.mp4
done
node render.js still 20 v 6.6 out/thumbnail.png
ls -la out
