// Single source of truth for timing. Used by index.html (animation),
// render.js (frame capture) and music.py (via build/timeline_<cut>.json).
// Scene-local times below are "nominal" seconds (as in the 20 s cut).
// In shorter cuts a scene plays faster: local = (t - start) * nominal / actual.
var TL = {
  fps: 30,
  nominal: { s1: 3, s2: 4, s3: 3, s4: 3, s5: 3, s6: 4 },
  cuts: {
    "20": { dur: 20, scenes: [["s1", 0, 3], ["s2", 3, 7], ["s3", 7, 10], ["s4", 10, 13], ["s5", 13, 16], ["s6", 16, 20]] },
    "15": { dur: 15, scenes: [["s1", 0, 2], ["s2", 2, 5], ["s3", 5, 7.5], ["s4", 7.5, 10.5], ["s6", 10.5, 15]] }
  },
  // Sound-effect cues in nominal scene-local seconds.
  events: {
    s1: [[0.05, "soft"], [1.7, "rip"]],
    s2: [[0.1, "pop"], [1.45, "swish"], [2.2, "pop"], [2.4, "pop"], [2.6, "pop"]],
    s3: [[0.4, "tick"], [0.5, "tick"], [0.6, "tick"], [0.7, "tick"], [0.8, "tick"], [0.9, "tick"], [1.0, "tick"], [1.1, "tick"], [1.2, "tick"], [1.3, "tick"], [0.7, "softpop"], [1.55, "pop"]],
    s4: [[0.5, "pop"], [0.85, "pop"], [1.2, "pop"], [1.0, "softpop"], [2.3, "ding"], [2.5, "softpop"]],
    s5: [[0.6, "tap"], [0.8, "pop"], [1.5, "swish"], [2.2, "pop"]],
    s6: [[0.05, "hit"], [0.9, "softpop"], [1.2, "pop"], [1.4, "pop"]]
  }
};
TL.resolve = function (cut) {
  var c = TL.cuts[String(cut)], out = { dur: c.dur, fps: TL.fps, scenes: [], events: [] };
  c.scenes.forEach(function (s) {
    var k = TL.nominal[s[0]] / (s[2] - s[1]);
    out.scenes.push({ id: s[0], start: s[1], end: s[2], k: k });
    (TL.events[s[0]] || []).forEach(function (e) {
      out.events.push({ t: +(s[1] + e[0] / k).toFixed(4), type: e[1], scene: s[0] });
    });
  });
  out.events.sort(function (a, b) { return a.t - b.t; });
  return out;
};
if (typeof module !== "undefined") module.exports = TL;
