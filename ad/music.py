#!/usr/bin/env python3
"""Original music + sound design for the JobCardBook promo, synthesised from
scratch with numpy/scipy (no samples, no loops, nothing downloaded).

Usage:  python3 music.py 20      -> music_20s.wav
        python3 music.py 15      -> music_15s.wav
Reads build/timeline_<cut>.json (written by `node render.js timeline`) so the
whooshes, pops and the final hit land exactly on the animation.
"""
import json, sys, os
import numpy as np
from scipy import signal
from scipy.io import wavfile
import pyloudnorm as pyln

SR = 48000
BPM = 120.0            # change tempo here (scene changes sit on the beat at 120)
BEAT = 60.0 / BPM
TARGET_LUFS = -14.0
HERE = os.path.dirname(os.path.abspath(__file__))
rs = np.random.RandomState(7)

# ---------- helpers ----------
NOTE = {n: i for i, n in enumerate(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])}
def hz(name):
    return 440.0 * 2 ** ((NOTE[name[:-1]] + 12 * (int(name[-1]) + 1) - 69) / 12.0)
def tt(d): return np.arange(int(d * SR)) / SR
def env_ad(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(t / max(a, 1e-4), 1.0) * np.exp(-np.maximum(t - a, 0) / d)
def lp(x, fc, order=2): return signal.sosfilt(signal.butter(order, fc, 'low', fs=SR, output='sos'), x)
def hp(x, fc, order=2): return signal.sosfilt(signal.butter(order, fc, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi): return signal.sosfilt(signal.butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)

class Track:
    def __init__(self, dur): self.b = np.zeros((int(dur * SR) + SR, 2))
    def add(self, x, t, gain=1.0, pan=0.0):
        i = int(round(t * SR))
        if i < 0: x = x[-i:]; i = 0
        n = min(len(x), len(self.b) - i)
        if n <= 0: return
        if x.ndim == 1:
            l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
            self.b[i:i + n, 0] += x[:n] * gain * l * 1.414
            self.b[i:i + n, 1] += x[:n] * gain * r * 1.414
        else:
            self.b[i:i + n] += x[:n] * gain

# ---------- instruments ----------
def kick():
    t = tt(0.32); f = 48 + 90 * np.exp(-t / 0.035)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.11) + 0.25 * lp(rs.randn(len(t)), 3000) * np.exp(-t / 0.004)
def hat(open_=False):
    t = tt(0.18 if open_ else 0.06)
    return hp(rs.randn(len(t)), 7500) * np.exp(-t / (0.05 if open_ else 0.014))
def clap():
    t = tt(0.22); x = bp(rs.randn(len(t)), 900, 3800)
    e = sum(np.exp(-np.maximum(t - d, 0) / 0.012) * (t >= d) for d in (0, 0.011, 0.023)) * 0.5 + np.exp(-t / 0.07) * 0.4
    return x * e
def madal_dhin(f0=98.0):
    """Low, open stroke of a madal-like hand drum: tuned membrane with a pitch drop."""
    t = tt(0.4); f = f0 * (1 + 0.5 * np.exp(-t / 0.03))
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) + 0.45 * np.sin(2.01 * ph) * np.exp(-t / 0.08) + 0.2 * np.sin(3.02 * ph) * np.exp(-t / 0.04)
    return x * np.exp(-t / 0.13)
def madal_ta(f0=392.0):
    """High, closed slap of the small head."""
    t = tt(0.12); ph = 2 * np.pi * f0 * t
    x = np.sin(ph) + 0.5 * np.sin(2.4 * ph) + 0.6 * bp(rs.randn(len(t)), 1500, 5000) * np.exp(-t / 0.006)
    return x * np.exp(-t / 0.035)
def pluck(f, dur=0.6, bright=0.5):
    """Karplus-Strong plucked string with a small upward slide into the note
    (a hint of meend, for South Asian colour)."""
    n = int(dur * SR); N = int(SR / f)
    buf = lp(rs.uniform(-1, 1, N), 2000 + 7000 * bright)
    out = np.empty(n); 
    reps = n // N + 1
    cur = buf.copy(); chunks = []
    for _ in range(reps):
        chunks.append(cur)
        cur = 0.996 * 0.5 * (cur + np.roll(cur, 1))
    out = np.concatenate(chunks)[:n]
    bell = np.sin(2 * np.pi * f * tt(dur)) * np.exp(-tt(dur) / 0.25) * 0.35   # sine body for warmth
    return (out + bell) * env_ad(n, 0.002, dur * 0.6)
def saw(f, n, det=0.0):
    ph = (np.arange(n) * f * (1 + det) / SR + rs.rand()) % 1.0
    return 2 * ph - 1
def pad(notes, dur, cutoff=1800):
    n = int(dur * SR); x = np.zeros((n, 2))
    for f in notes:
        for det, pan in ((-0.006, -0.7), (0.0, 0.0), (0.006, 0.7), (0.003, -0.3), (-0.003, 0.3)):
            s = saw(f, n, det); l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
            x[:, 0] += s * l; x[:, 1] += s * r
    x = np.stack([lp(x[:, 0], cutoff, 2), lp(x[:, 1], cutoff, 2)], 1)
    a = int(0.12 * SR); r_ = int(0.25 * SR); e = np.ones(n)
    e[:a] = np.linspace(0, 1, a); e[-r_:] *= np.linspace(1, 0, r_)
    return x * e[:, None] / (len(notes) * 3)
def bass(f, dur):
    t = tt(dur); x = np.sin(2 * np.pi * f * t) + 0.35 * lp(saw(f, len(t)), 500)
    return x * env_ad(len(t), 0.005, dur * 0.7)
def whoosh(dur=0.7):
    """Rising filtered-noise sweep that ends at the scene change."""
    n = int(dur * SR); x = rs.randn(n); out = np.zeros(n); y1 = y2 = 0.0
    p = np.linspace(0, 1, n); fc = 300 * (9000 / 300) ** p
    a = 1 - np.exp(-2 * np.pi * fc / SR)
    for i in range(n):
        y1 += a[i] * (x[i] - y1); y2 += a[i] * (y1 - y2); out[i] = y2
    out = hp(out, 250)
    e = p ** 2.2; tail = int(0.03 * SR); e[-tail:] *= np.linspace(1, 0, tail)
    return out * e
def pop_(f0=880.0, soft=False):
    t = tt(0.11); f = f0 * (1 + 0.7 * (1 - np.exp(-t / 0.012)))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / (0.03 if soft else 0.024))
    if not soft: x[:int(0.002 * SR)] += 0.4 * rs.randn(int(0.002 * SR))
    return x
def tick(): t = tt(0.02); return bp(rs.randn(len(t)), 2500, 7000) * np.exp(-t / 0.003)

def swish():
    t = tt(0.3); return bp(rs.randn(len(t)), 1200, 6000) * np.sin(np.pi * t / 0.3) ** 2
def rip():
    """Paper tearing: crackly, grainy band-passed noise."""
    t = tt(0.55); x = bp(rs.randn(len(t)), 1300, 7500)
    grains = (rs.rand(len(t)) < 0.02).astype(float); g = lp(signal.lfilter([1], [1, -0.995], grains), 2500)
    g = g / (g.max() + 1e-9)
    return x * (0.25 + g) * np.sin(np.pi * np.minimum(t / 0.5, 1)) ** 0.6 * np.exp(-t / 0.3)
def ding():
    t = tt(0.9); return (np.sin(2 * np.pi * hz('B5') * t) + 0.7 * np.sin(2 * np.pi * hz('F#6') * t) * (t > 0.07)) * np.exp(-t / 0.22)
def big_hit(chord):
    t = tt(2.6)
    f = 42 + 80 * np.exp(-t / 0.05)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.45)
    cym = hp(rs.randn(len(t)), 5000) * np.exp(-t / 0.5) * 0.22
    stab = sum(np.sin(2 * np.pi * f_ * t) + 0.3 * np.sin(4 * np.pi * f_ * t) for f_ in chord) * np.exp(-t / 0.9) / len(chord)
    return boom * 0.9 + cym + stab * 0.55
def reverb(x, wet=0.25, dur=1.4):
    n = int(dur * SR); ir = rs.randn(n, 2) * np.exp(-np.arange(n)[:, None] / (0.32 * SR))
    ir = np.stack([hp(lp(ir[:, 0], 6000), 300), hp(lp(ir[:, 1], 6000), 300)], 1); ir /= np.sqrt((ir ** 2).sum(0))
    w = np.stack([signal.fftconvolve(x[:, c], ir[:, c])[:len(x)] for c in (0, 1)], 1)
    return x + wet * w

# ---------- harmony: D major pentatonic (D E F# A B) ----------
CH = {'D': ['D3', 'A3', 'D4', 'F#4', 'A4'], 'A': ['A2', 'E3', 'A3', 'C#4', 'E4'], 'Bm': ['B2', 'F#3', 'B3', 'D4', 'F#4'],
      'G': ['G2', 'D3', 'G3', 'B3', 'D4'], 'Bm7': ['B2', 'A3', 'B3', 'D4', 'F#4'], 'Gs': ['G2', 'D3', 'A3', 'B3', 'E4']}
ROOT = {'D': 'D2', 'A': 'A1', 'Bm': 'B1', 'G': 'G1'}
LOOP = ['D', 'A', 'Bm', 'G']                      # one chord every 2 beats
MOTIF = {                                         # the hook: 4 eighth-notes per chord, None = rest
    'D':  ['A4', None, 'F#4', 'A4'],
    'A':  ['B4', 'A4', None, 'E4'],
    'Bm': ['F#4', None, 'B4', 'D5'],
    'G':  ['B4', 'A4', 'F#4', 'E4'],
}
MOTIF2_G = ['D5', None, 'E5', 'D5']               # lift on every second pass
MADAL = ['d', None, 't', 't', 'd', 't', None, 't']   # dhin . ta ta | dhin ta . ta  (per bar of 8 eighths)

def build(cut):
    T = json.load(open(os.path.join(HERE, 'build', 'timeline_%s.json' % cut)))
    dur = T['dur']; sc = {s['id']: s for s in T['scenes']}
    drop = sc['s2']['start']; hit_t = sc['s6']['start']
    hit_ev = [e['t'] for e in T['events'] if e['type'] == 'hit'][0]
    drums, music, fx, bassb = Track(dur), Track(dur), Track(dur), Track(dur)
    E = BEAT / 2

    # --- intro (the "problem"): dark filtered pad, a hesitant clock-like tick
    music.add(pad([hz(n) for n in CH['Bm7']], drop * 0.55 + 0.2, 700), 0, 0.9)
    music.add(pad([hz(n) for n in CH['Gs']], drop * 0.45 + 0.1, 1100), drop * 0.55, 0.9)
    t = 0.0
    while t < drop - 0.01:
        drums.add(hat(), t, 0.10, 0.3 if int(t / BEAT) % 2 else -0.3); t += BEAT
    drums.add(madal_dhin(), drop - BEAT, 0.35); drums.add(madal_ta(), drop - E, 0.3)

    # --- groove from the drop to the final hit
    t = drop; step = 0
    while t < hit_t - 1e-6:
        seg = min(2 * BEAT, hit_t - t); name = LOOP[step % 4]
        last = t + 2 * BEAT >= hit_t - 1e-6
        music.add(pad([hz(n) for n in CH[name]], seg + 0.15, 2100 if not last else 3200), t, 0.8)
        for k in range(int(round(seg / E))):                      # bass on eighths
            bassb.add(bass(hz(ROOT[name]) * (2 if k == 3 else 1), E * 0.9), t + k * E, 0.5)
        mot = MOTIF2_G if (name == 'G' and (step // 4) % 2 == 1) else MOTIF[name]
        for k, nn in enumerate(mot):
            if nn and t + k * E < hit_t - 0.05:
                music.add(pluck(hz(nn) * 2, 0.55, 0.6), t + k * E, 0.34, pan=0.25 * (-1) ** k)
        t += seg; step += 1
    nb = int(round((hit_t - drop) / E))
    for i in range(nb):
        tb = drop + i * E; e8 = i % 8
        if i % 2 == 0: drums.add(kick(), tb, 0.8)
        if i % 2 == 1: drums.add(hat(i % 8 == 7), tb, 0.22, 0.2)
        else: drums.add(hat(), tb, 0.09, -0.2)
        if e8 in (2, 6): drums.add(clap(), tb, 0.28)
        m = MADAL[e8]
        if m == 'd': drums.add(madal_dhin(), tb, 0.42, -0.35)
        if m == 't': drums.add(madal_ta(), tb, 0.26, 0.4)
    # fill into the hit
    for k, g in ((4, .3), (3, .36), (2, .42), (1, .5)):
        drums.add(madal_ta(440), hit_t - k * E / 2, g, 0.3)

    # --- ending: clean hit on the logo, short melodic answer, natural decay
    D = [hz(n) for n in ['D3', 'A3', 'D4', 'F#4', 'A4', 'D5']]
    fx.add(big_hit(D), hit_ev, 0.7)
    out_len = dur - hit_ev
    music.add(pad([hz(n) for n in CH['D']] + [hz('D5')], min(out_len - 0.3, 3.4), 2600), hit_ev, 0.75)
    for k, nn in enumerate(['D5', 'F#5', 'A5', 'B5', 'A5', 'D6']):
        music.add(pluck(hz(nn), 0.9, 0.7), hit_ev + BEAT + k * E, 0.3, pan=0.3 * (-1) ** k)
    for k in range(4):
        drums.add(hat(), hit_ev + BEAT * (k + 1), 0.10 * (1 - k / 5)); drums.add(madal_dhin(), hit_ev + BEAT * (k + .0) + BEAT, 0.22 * (1 - k / 4), -0.3)
    final = hit_ev + BEAT + 6 * E + BEAT                      # last soft resolving note
    if final < dur - 1.0:
        music.add(pluck(hz('D5'), 1.4, 0.4), final, 0.3); bassb.add(bass(hz("D2"), 1.2), final, 0.22)

    # --- scene-change whooshes and UI sounds from the shared timeline
    for s in T['scenes'][1:]:
        w = whoosh(0.75 if s['id'] in ('s2', 's6') else 0.55)
        fx.add(w, s['start'] - len(w) / SR, 0.5 if s['id'] in ('s2', 's6') else 0.32, pan=0.0)
    pan = 1
    for e in T['events']:
        ty, te = e['type'], e['t']; pan = -pan
        if ty == 'pop': fx.add(pop_(880 + 120 * rs.rand()), te, 0.30, 0.3 * pan)
        elif ty == 'softpop': fx.add(pop_(660, True), te, 0.24, 0.3 * pan)
        elif ty == 'soft': fx.add(pop_(330, True), te, 0.2)
        elif ty == 'tick': fx.add(tick(), te, 0.16, 0.15 * pan)
        elif ty == 'tap': fx.add(pop_(520, True), te, 0.26)
        elif ty == 'swish': fx.add(swish(), te, 0.12)
        elif ty == 'rip': fx.add(rip(), te, 0.5)
        elif ty == 'ding': fx.add(ding(), te, 0.2, 0.2)

    # --- mix: sidechain pad/bass to the kick, reverb, master
    n = int(dur * SR)
    duck = np.ones(len(music.b))
    for i in range(0, nb, 2):
        a = int((drop + i * E) * SR); L = int(0.22 * SR)
        duck[a:a + L] = np.minimum(duck[a:a + L], 0.45 + 0.55 * np.linspace(0, 1, L) ** 0.7)
    mix = reverb(music.b * duck[:, None], 0.22) * 0.9 + bassb.b * duck[:, None] * 0.8 + drums.b * 0.9 + reverb(fx.b, 0.18)
    mix = mix[:n]
    mix = np.stack([hp(mix[:, 0], 28), hp(mix[:, 1], 28)], 1)
    fi = int(0.35 * SR); mix[:fi] *= np.linspace(0, 1, fi)[:, None] ** 1.5          # fade-in
    fo = int(1.4 * SR); mix[-fo:] *= (np.cos(np.linspace(0, np.pi, fo)) * .5 + .5)[:, None]  # tail to silence
    return master(mix)

def limit(x, ceil_db=-2.0):
    """Simple look-ahead peak limiter (no clipping)."""
    c = 10 ** (ceil_db / 20); pk = np.abs(x).max(1)
    win = int(0.005 * SR)
    from scipy.ndimage import maximum_filter1d, uniform_filter1d
    env = maximum_filter1d(pk, 2 * win + 1); g = np.minimum(1.0, c / np.maximum(env, 1e-9))
    g = uniform_filter1d(g, win)
    return x * g[:, None]
def master(x, target=TARGET_LUFS):
    meter = pyln.Meter(SR)
    for _ in range(4):
        x = x * 10 ** ((target - meter.integrated_loudness(x)) / 20)
        x = limit(x)
    return x
def save(path, x):
    wavfile.write(path, SR, (np.clip(x, -1, 1) * 32767).astype(np.int16))

if __name__ == '__main__':
    cut = sys.argv[1] if len(sys.argv) > 1 else '20'
    x = build(cut)
    out = os.path.join(HERE, 'music_%ss.wav' % cut); save(out, x)
    print('%s  %.2fs  %.1f LUFS  peak %.1f dBFS' % (out, len(x) / SR, pyln.Meter(SR).integrated_loudness(x), 20 * np.log10(np.abs(x).max())))
