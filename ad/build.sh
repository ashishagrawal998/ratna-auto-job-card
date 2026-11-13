#!/usr/bin/env bash
# Rebuilds everything in ad/out. Run from the repo root:  bash ad/build.sh
# Needs: python3 (numpy, scipy), ffmpeg, node + playwright (chromium).
set -euo pipefail
cd "$(dirname "$0")/.."

norm() {   # two-pass loudness normalisation to -14 LUFS, true peak -1.5 dB
  local in=$1 out=$2
  local js; js=$(ffmpeg -hide_banner -i "$in" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  local mi mtp mlra mth off
  mi=$(echo "$js" | python3 -c 'import sys,json;print(json.load(sys.stdin)["input_i"])')
  mtp=$(echo "$js" | python3 -c 'import sys,json;print(json.load(sys.stdin)["input_tp"])')
  mlra=$(echo "$js" | python3 -c 'import sys,json;print(json.load(sys.stdin)["input_lra"])')
  mth=$(echo "$js" | python3 -c 'import sys,json;print(json.load(sys.stdin)["input_thresh"])')
  off=$(echo "$js" | python3 -c 'import sys,json;print(json.load(sys.stdin)["target_offset"])')
  ffmpeg -hide_banner -loglevel error -y -i "$in" -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$mi:measured_TP=$mtp:measured_LRA=$mlra:measured_thresh=$mth:offset=$off:linear=true" -ar 44100 "$out"
}

for c in 20 15; do
  python3 ad/music.py $c
  norm ad/music_${c}s_raw.wav ad/music_${c}s.wav
  rm ad/music_${c}s_raw.wav
done

export NODE_PATH=${NODE_PATH:-$(npm root -g)}
node ad/render.js video v 20
node ad/render.js video h 20
node ad/render.js video v 15
# thumbnail = the call-to-action frame of the vertical video
ffmpeg -hide_banner -loglevel error -y -ss 18.3 -i ad/out/jobcardbook_20s_vertical.mp4 -frames:v 1 ad/out/thumbnail.png
echo "done -> ad/out"
