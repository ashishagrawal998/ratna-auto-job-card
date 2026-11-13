#!/usr/bin/env python3
"""Nepali voice track (eSpeak NG, voice 'ne') + final mix with music ducked under the voice.

Usage: python3 voice.py 20   -> build/voice_20.wav, build/mix_voice_20.wav
Lines and their time windows are read from voiceover.txt, so edit the text there.
To use a human recording instead, save it as build/voice_<cut>.wav (48 kHz) and run
`python3 voice.py <cut> --mix-only`.
"""
import os, re, subprocess, sys
import numpy as np
from scipy import signal
from scipy.io import wavfile
import pyloudnorm as pyln
from music import SR, master, save, hp, lp

HERE = os.path.dirname(os.path.abspath(__file__)); B = os.path.join(HERE, 'build')
SPEED, PITCH = 165, 52          # eSpeak words/minute and pitch (0-99)
DUCK_DB = -9.0                  # how far the music drops under the voice

def lines(cut):
    txt = open(os.path.join(HERE, 'voiceover.txt'), encoding='utf8').read()
    sec = txt.split('(%s s)' % cut)[1].split('\n\n')[0]
    return [(float(a), float(b), s.strip()) for a, b, s in re.findall(r'\[([\d.]+)–([\d.]+) s\]\s+(.+)', sec)]

def tts(text, path):
    subprocess.run(['espeak-ng', '-v', 'ne', '-s', str(SPEED), '-p', str(PITCH), '-a', '180', '-w', path, text], check=True)
    sr, x = wavfile.read(path); x = x.astype(float) / 32768
    x = signal.resample_poly(x, SR, sr)
    nz = np.where(np.abs(x) > 0.01)[0]
    return x[max(nz[0] - 200, 0):nz[-1] + 2000]

def stretch(x, factor, tmp):
    """Speed up (factor > 1) without changing pitch, via ffmpeg atempo."""
    a, b = tmp + '_a.wav', tmp + '_b.wav'; save(a, x)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', a, '-af', 'atempo=%.4f' % factor, b], check=True)
    return wavfile.read(b)[1].astype(float) / 32768

def make_voice(cut, dur):
    v = np.zeros(int(dur * SR))
    for i, (a, b, text) in enumerate(lines(cut)):
        x = tts(text, os.path.join(B, 'vo_%s_%d.wav' % (cut, i)))
        room = (b - a) - 0.25
        if len(x) / SR > room: x = stretch(x, min(len(x) / SR / room, 1.6), os.path.join(B, 'vo_tmp'))
        s = int((a + 0.12) * SR); n = min(len(x), len(v) - s); v[s:s + n] += x[:n]
        print('  %5.2f-%5.2f  %.2fs  %s' % (a, b, len(x) / SR, text))
    v = hp(v, 110); v = v + 0.25 * hp(v, 3000)                    # a little clarity
    v = np.tanh(v * 2.2) / 2.2                                     # gentle compression
    return v / np.abs(v).max() * 0.8

def mix(cut):
    sr, m = wavfile.read(os.path.join(HERE, 'music_%ss.wav' % cut)); m = m.astype(float) / 32768
    sr2, v = wavfile.read(os.path.join(B, 'voice_%s.wav' % cut)); v = v.astype(float) / 32768
    if v.ndim > 1: v = v.mean(1)
    v = np.pad(v, (0, max(0, len(m) - len(v))))[:len(m)]
    env = lp(np.abs(signal.hilbert(v)), 6); env = np.clip(env / 0.08, 0, 1)
    env = np.maximum(env, np.roll(env, -int(0.08 * SR)))          # duck slightly ahead of the voice
    g = 10 ** (DUCK_DB * env / 20)
    out = m * g[:, None] + (v * 1.6)[:, None]
    return master(out)

if __name__ == '__main__':
    cut = sys.argv[1]; dur = float(cut)
    if '--mix-only' not in sys.argv:
        save(os.path.join(B, 'voice_%s.wav' % cut), make_voice(cut, dur))
    x = mix(cut); out = os.path.join(B, 'mix_voice_%s.wav' % cut); save(out, x)
    print('%s  %.1f LUFS  peak %.1f dBFS' % (out, pyln.Meter(SR).integrated_loudness(x), 20 * np.log10(np.abs(x).max())))
