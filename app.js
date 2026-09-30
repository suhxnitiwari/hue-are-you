const $ = (sel) => document.querySelector(sel);
const AXES = ["t", "v", "c"];
// Temperature is the biggest split between seasons, so it counts a bit more.
const WEIGHTS = { t: 1.2, v: 1, c: 1 };

let current = 0;
let answers = [];
let season = null;

// ---------- Screens ----------

function show(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $("#" + id).classList.add("active");
  window.scrollTo(0, 0);
}

// ---------- Quiz ----------

function renderQuestion() {
  const q = QUESTIONS[current];
  $("#bar").style.width = `${(current / QUESTIONS.length) * 100}%`;
  $("#step").textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
  $("#q-title").textContent = q.title;
  $("#q-hint").textContent = q.hint || "";
  $("#back").style.visibility = current === 0 ? "hidden" : "visible";

  const box = $("#options");
  box.innerHTML = "";
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "option" + (answers[current] === i ? " selected" : "");
    b.textContent = opt.label;
    b.onclick = () => choose(i);
    box.appendChild(b);
  });
}

function choose(i) {
  answers[current] = i;
  if (current < QUESTIONS.length - 1) {
    current++;
    renderQuestion();
  } else {
    const scores = score(answers);
    const ranked = rank(scores);
    showResult(ranked[0].id, scores, ranked);
  }
}

// ---------- Scoring ----------

const clamp = (n) => Math.max(-1, Math.min(1, n));

// Sum each axis, then scale it into -1..1. We divide by half the maximum
// possible score, because real answers rarely all point the same way.
function score(ans) {
  const sum = { t: 0, v: 0, c: 0 };
  const max = { t: 0, v: 0, c: 0 };
  QUESTIONS.forEach((q, i) => {
    const picked = q.options[ans[i]];
    AXES.forEach((a) => {
      max[a] += Math.max(...q.options.map((o) => Math.abs(o[a] || 0)));
      sum[a] += picked[a] || 0;
    });
  });
  const out = {};
  AXES.forEach((a) => (out[a] = max[a] ? clamp(sum[a] / (max[a] * 0.5)) : 0));
  return out;
}

// Rank all seasons by distance from the user's scores.
function rank(s) {
  return Object.entries(SEASONS)
    .map(([id, data]) => {
      const [t, v, c] = data.target;
      const d = Math.hypot(
        (s.t - t) * WEIGHTS.t,
        (s.v - v) * WEIGHTS.v,
        (s.c - c) * WEIGHTS.c
      );
      return { id, d };
    })
    .sort((a, b) => a.d - b.d);
}

// ---------- Result ----------

function textColorFor(hex) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#222" : "#fff";
}

function swatch(hex, onClick) {
  const b = document.createElement("button");
  b.className = "swatch";
  b.style.background = "#" + hex;
  b.style.color = textColorFor(hex);
  b.title = "#" + hex;
  b.innerHTML = `<span>#${hex}</span>`;
  b.onclick = onClick;
  return b;
}

function copyHex(hex) {
  navigator.clipboard?.writeText("#" + hex);
  toast(`Copied #${hex}`);
}

function renderAxes(s) {
  const rows = [
    { key: "t", left: "Cool", right: "Warm", grad: "linear-gradient(90deg,#7FA7D9,#E8E1D9,#E8964F)" },
    { key: "v", left: "Deep", right: "Light", grad: "linear-gradient(90deg,#3A2A24,#9C8778,#F5EBDD)" },
    { key: "c", left: "Soft", right: "Bright", grad: "linear-gradient(90deg,#A8A29C,#C98FA0,#FF2E7A)" },
  ];
  $("#axes").innerHTML = rows
    .map((r) => {
      const pct = ((s[r.key] + 1) / 2) * 100;
      return `<div class="axis">
        <div class="labels"><span>${r.left}</span><span>${r.right}</span></div>
        <div class="track" style="background:${r.grad}">
          <div class="dot" style="left:${pct}%"></div>
        </div>
      </div>`;
    })
    .join("");
}

function showResult(id, scores, ranked) {
  season = SEASONS[id];
  $("#r-name").textContent = season.name;
  $("#r-tagline").textContent = season.tagline;
  $("#r-desc").textContent = season.description;
  $("#r-neutrals").textContent = season.neutrals;
  $("#r-metals").textContent = season.metals;
  $("#r-lips").textContent = season.lips;

  // The score bars and runner-up only make sense right after taking the quiz,
  // not when someone opens a shared link.
  if (scores) {
    renderAxes(scores);
    $("#axes").style.display = "";
    const [first, second] = ranked;
    $("#runner-up").textContent =
      second.d - first.d < 0.25
        ? `Close call: you're also near ${SEASONS[second.id].name}. Try both palettes in the drape test.`
        : "";
  } else {
    $("#axes").style.display = "none";
    $("#runner-up").textContent = "";
  }

  const pal = $("#palette");
  pal.innerHTML = "";
  season.palette.forEach((hex) => pal.appendChild(swatch(hex, () => copyHex(hex))));

  const av = $("#avoid");
  av.innerHTML = "";
  season.avoid.forEach((hex) => av.appendChild(swatch(hex, () => copyHex(hex))));

  setDrapeSet("palette");
  history.replaceState(null, "", "#" + id);
  show("result");
}

// ---------- Drape test ----------

function setDrapeSet(which) {
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c.dataset.set === which));
  const box = $("#drape-swatches");
  box.innerHTML = "";
  season[which].forEach((hex, i) => {
    const s = swatch(hex, () => drape(hex, s));
    s.innerHTML = "";
    box.appendChild(s);
    if (i === 0) drape(hex, s);
  });
}

function drape(hex, el) {
  $("#mirror").style.background = "#" + hex;
  document.querySelectorAll("#drape-swatches .swatch").forEach((s) => s.classList.remove("on"));
  el.classList.add("on");
}

document.querySelectorAll(".chip").forEach((c) => (c.onclick = () => setDrapeSet(c.dataset.set)));

$("#photo").onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  // Object URLs stay in the browser. Nothing is sent anywhere.
  $("#selfie").src = URL.createObjectURL(file);
  $("#placeholder").style.display = "none";
};

// ---------- Download palette as an image ----------

function downloadPalette() {
  const W = 1080, H = 1350, pad = 80, cols = 5, gap = 20;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");

  ctx.fillStyle = "#FBF7F2";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#7A6E66";
  ctx.font = "500 30px Inter, sans-serif";
  ctx.fillText("MY COLOR SEASON", pad, 130);
  ctx.fillStyle = "#2A2320";
  ctx.font = "700 96px Fraunces, Georgia, serif";
  ctx.fillText(season.name, pad, 230);
  ctx.fillStyle = "#C4553A";
  ctx.font = "500 36px Inter, sans-serif";
  ctx.fillText(season.tagline, pad, 290);

  const size = (W - pad * 2 - gap * (cols - 1)) / cols;
  season.palette.forEach((hex, i) => {
    const x = pad + (i % cols) * (size + gap);
    const y = 360 + Math.floor(i / cols) * (size + gap);
    ctx.fillStyle = "#" + hex;
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, 18);
    ctx.fill();
    ctx.fillStyle = textColorFor(hex);
    ctx.font = "500 22px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("#" + hex, x + size / 2, y + size - 20);
    ctx.textAlign = "left";
  });

  ctx.fillStyle = "#7A6E66";
  ctx.font = "400 28px Inter, sans-serif";
  ctx.fillText("Found with Hue Are You?", pad, H - 70);

  const a = document.createElement("a");
  a.download = `${season.name.toLowerCase().replace(/\s+/g, "-")}-palette.png`;
  a.href = cv.toDataURL("image/png");
  a.click();
}

// ---------- Misc ----------

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1600);
}

function startQuiz() {
  current = 0;
  answers = [];
  renderQuestion();
  show("quiz");
}

$("#start").onclick = startQuiz;
$("#restart").onclick = () => {
  history.replaceState(null, "", location.pathname);
  startQuiz();
};
$("#back").onclick = () => {
  if (current > 0) { current--; renderQuestion(); }
};
$("#download").onclick = downloadPalette;
$("#share").onclick = () => {
  navigator.clipboard?.writeText(location.href);
  toast("Link copied");
};

// Opening a shared link like #soft-autumn goes straight to that result.
const shared = location.hash.slice(1);
if (SEASONS[shared]) showResult(shared);
