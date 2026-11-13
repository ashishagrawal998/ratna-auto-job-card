"""Original background music for the JobCardBook ad, synthesized from scratch (no samples).
Usage: python3 ad/music.py 20   -> ad/music_20s_raw.wav   (then loudness-normalised by build.sh)
       python3 ad/music.py 15   -> ad/music_15s_raw.wav
Style: ~116 BPM upbeat electronic pop, madal-like hand-drum pattern, C major pentatonic melody,
whoosh on each scene change, soft UI pops, clean hit on the logo, natural ending.
"""
import sys, numpy as np
from scipy.signal import butter, lfilter
from scipy.io import wavfile

CUT = sys.argv[1] if len(sys.argv) > 1 else "20"
SR = 44100
DUR = float(CUT)
BPM = 116
BEAT = 60 / BPM
rng = np.random.default_rng(7)

# scene timings (must match scene.html)
if CUT == "15":
    SC = dict(s1=(0, 2.5), s2=(2.5, 5.5), s3=(5.5, 8), s4=(8, 11), s5=None, s6=(11, 15))
else:
    SC = dict(s1=(0, 3), s2=(3, 7), s3=(7, 10), s4=(10, 13), s5=(13, 16), s6=(16, 20))
S2, S3, S4, S5, S6 = SC["s2"][0], SC["s3"][0], SC["s4"][0], SC["s5"][0] if SC["s5"] else None, SC["s6"][0]
pops = [S2 + .2, S2 + 1.3, S2 + 1.8, S2 + 2.02, S2 + 2.24, S2 + 2.46, S3 + 1.4, S4 + .5, S4 + .82, S4 + 1.14, S4 + 1.55]
if S5 is not None: pops += [S5 + .35, S5 + 1.25, S5 + 2.15]
pops += [S6 + 1.15, S6 + 1.4]
HIT = S6 + .45
N = int(SR * DUR)
t_all = np.arange(N) / SR
mix = np.zeros((N, 2))

def lp(x, f, order=2): b, a = butter(order, f / (SR / 2), "low"); return lfilter(b, a, x)
def hp(x, f, order=2): b, a = butter(order, f / (SR / 2), "high"); return lfilter(b, a, x)
def bp(x, lo, hi): b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], "band"); return lfilter(b, a, x)
def add(sig, start, gain=1.0, pan=0.0):
    i = int(start * SR)
    if i >= N or i + len(sig) <= 0: return
    j = max(0, -i); sig = sig[j:]; i = max(0, i)
    n = min(len(sig), N - i)
    l, r = gain * np.sqrt((1 - pan) / 2), gain * np.sqrt((1 + pan) / 2)
    mix[i:i + n, 0] += sig[:n] * l; mix[i:i + n, 1] += sig[:n] * r
def env(n, a=.005, d=.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
def note(m): return 440 * 2 ** ((m - 69) / 12)

# ---------------- drums
def kick():
    n = int(.35 * SR); t = np.arange(n) / SR
    f = 50 + 70 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)
def hat():
    n = int(.06 * SR); return hp(rng.standard_normal(n), 7000) * env(n, .001, .018)
def dhim(f0=105):   # madal low stroke
    n = int(.4 * SR); t = np.arange(n) / SR
    f = f0 * (1 + .35 * np.exp(-t * 25))
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) + .3 * np.sin(4 * np.pi * np.cumsum(f) / SR)) * env(n, .002, .16)
def ta():           # madal high slap
    n = int(.12 * SR); t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * 380 * t) * env(n, .001, .05)
    return tone * .7 + bp(rng.standard_normal(n), 1800, 5000) * env(n, .001, .03) * .6
def crash():
    n = int(2.2 * SR); return hp(rng.standard_normal(n), 3500) * env(n, .002, .7) * .5

K, HH, D, T = kick(), hat(), dhim(), ta()
madal = "D.t..tD.t.D.t.t."   # 16 steps per bar
step = BEAT / 4
beat_start = 0.0
t = beat_start
i = 0
while t < DUR - .05:
    pos = i % 16
    in_intro = t < S2 - .05
    near_end = t > DUR - 1.0
    if not near_end:
        if pos % 4 == 0 and not in_intro: add(K, t, .85)
        if pos % 4 == 2: add(HH, t, .22 if not in_intro else .12, .3)
        if pos % 2 == 1 and not in_intro: add(HH, t, .1, -.3)
        ch = madal[pos]
        g = .35 if in_intro else .55
        if ch == "D": add(D, t, g, -.2)
        if ch == "t": add(T, t, g * .55, .25)
    t += step; i += 1

# ---------------- pad chords (C add9, Am7, Fmaj7, G6) one per bar
chords = [[48, 55, 62, 64], [45, 52, 60, 67], [41, 53, 57, 64], [43, 50, 59, 64]]
bar = BEAT * 4
def pad(midis, dur):
    n = int(dur * SR); tt = np.arange(n) / SR; s = np.zeros(n)
    for m in midis:
        for det in (-0.08, 0.08):
            f = note(m + det)
            s += (2 * ((f * tt) % 1) - 1) * .5 + np.sin(2 * np.pi * f * tt) * .5
    s = lp(s, 1400)
    a = np.minimum(1, tt / .25); r = np.minimum(1, (dur - tt) / .3)
    return s * a * np.clip(r, 0, 1) / len(midis)
b = 0
while b * bar < DUR:
    st = b * bar
    dur = min(bar + .3, DUR - st)
    gain = .18 if st < S2 else .26
    if st >= DUR - bar * 1.05:      # last bar: let the tonic ring out
        add(pad(chords[0], DUR - st), st, .3); break
    add(pad(chords[b % 4], dur), st, gain)
    b += 1

# ---------------- bass (root, 8ths)
def bass(m, dur):
    n = int(dur * SR); tt = np.arange(n) / SR; f = note(m)
    return lp(np.sign(np.sin(2 * np.pi * f * tt)) * .6 + np.sin(2 * np.pi * f * tt), 500) * env(n, .005, .18)
b = 0
while b * bar < DUR - 1.0:
    st = b * bar
    if st >= S2 - .05:
        root = chords[b % 4][0] - 12
        for k in range(8):
            tk = st + k * BEAT / 2
            if tk < DUR - 1.0: add(bass(root + (12 if k % 4 == 3 else 0), .22), tk, .32)
    b += 1

# ---------------- melody: C major pentatonic pluck
def pluck(m, dur=.35):
    n = int(dur * SR); tt = np.arange(n) / SR; f = note(m)
    s = np.sin(2 * np.pi * f * tt) + .35 * np.sin(4 * np.pi * f * tt) + .15 * np.sin(6 * np.pi * f * tt)
    return s * env(n, .003, .16)
motif = [(0, 76), (1, 79), (2, 81), (3, 79), (4, 76), (5, 74), (6, 72), (8, 74), (9, 76), (10, 79), (12, 81), (13, 84), (14, 81)]
mstart = S2 + .5
b = 0
while True:
    st = mstart + b * bar
    if st >= S6 - .2: break
    for k, m in motif:
        tk = st + k * BEAT / 2
        if tk < S6 - .1: add(pluck(m + (0 if b % 2 == 0 else -3 if m > 80 else 0)), tk, .16, .15 if k % 2 else -.15)
    b += 1
# small rising phrase on the call to action
for k, m in enumerate([72, 74, 76, 79, 81, 84]):
    add(pluck(m, .5), S6 + .6 + k * BEAT / 2, .2)

# ---------------- effects
def whoosh(dur=.7):
    n = int(dur * SR); tt = np.arange(n) / SR
    x = rng.standard_normal(n)
    out = np.zeros(n); seg = 512
    for s0 in range(0, n, seg):     # sweeping band-pass
        fc = 400 + 5000 * (s0 / n) ** 2
        out[s0:s0 + seg] = bp(x[max(0, s0 - 2048):s0 + seg], fc * .6, min(fc * 1.6, 18000))[-len(out[s0:s0 + seg]):]
    return out * (tt / dur) ** 2 * np.minimum(1, (dur - tt) / .05)
WH = whoosh()
for st in [S2, S3, S4] + ([S5] if S5 else []) + [S6]:
    add(WH, st - .7, .5)
def pop():
    n = int(.08 * SR); tt = np.arange(n) / SR
    f = 1300 * np.exp(-tt * 18) + 600
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .001, .03)
for p in pops: add(pop(), p, .22, rng.uniform(-.3, .3))
# paper tear in scene 1
tear_n = int(.8 * SR); tear = bp(rng.standard_normal(tear_n), 1500, 6000) * env(tear_n, .02, .25) * (1 + .5 * np.sin(np.arange(tear_n) / SR * 2 * np.pi * 30))
add(tear, SC["s1"][1] - .9, .3)
# logo hit
add(K, HIT, 1.0); add(crash(), HIT, .6); add(pad([60, 64, 67, 72, 76], 2.5), HIT, .35)

# ---------------- master
mix[:, 0] = lp(mix[:, 0], 16000, 1); mix[:, 1] = lp(mix[:, 1], 16000, 1)
fi = np.minimum(1, t_all / .5)                                   # fade in
fo = np.clip((DUR - t_all) / 1.0, 0, 1) ** 1.5                   # natural fade over the last second
mix *= (fi * np.where(t_all > DUR - 1.0, fo, 1))[:, None]
mix = np.tanh(mix * 1.1) / np.tanh(1.1)                          # gentle saturation
mix /= max(1e-9, np.abs(mix).max()) / .89
wavfile.write(f"ad/music_{CUT}s_raw.wav", SR, (mix * 32767).astype(np.int16))
print("ok", CUT, DUR)
