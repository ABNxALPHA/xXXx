// yes.js — happy bears on edges + 5 dabke bears + hearts
const edgeBears = Array.from(document.querySelectorAll(".bear"));
const dabkeBears = Array.from(document.querySelectorAll(".dabke-bear"));

function twemojify(){
  if (window.twemoji) twemoji.parse(document.body, {folder:'svg', ext:'.svg'});
}

/* دب كامل (سعيد) */
function renderHappyBear(){
  return `
  <svg viewBox="0 0 360 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fur2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffd7b0"/>
        <stop offset="1" stop-color="#ffb989"/>
      </linearGradient>
      <linearGradient id="shirt2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ff4d6d"/>
        <stop offset="1" stop-color="#ff7a9a"/>
      </linearGradient>
    </defs>

    <!-- body -->
    <path d="M85 360 C80 270 95 225 140 205 C155 240 205 240 220 205 C265 225 280 270 275 360 Z"
          fill="url(#fur2)" stroke="rgba(0,0,0,.08)" stroke-width="4"/>
    <!-- shirt -->
    <path d="M135 240 C160 270 200 270 225 240 C255 250 270 280 270 330
             C240 350 120 350 90 330 C90 280 105 250 135 240 Z"
          fill="url(#shirt2)" opacity="0.96"/>
    <text x="180" y="306" text-anchor="middle" font-size="34" font-weight="800" fill="white">LOVE</text>

    <!-- head -->
    <ellipse cx="180" cy="160" rx="120" ry="110" fill="url(#fur2)" stroke="rgba(0,0,0,.08)" stroke-width="4"/>
    <!-- ears -->
    <ellipse cx="95" cy="95" rx="46" ry="42" fill="url(#fur2)" stroke="rgba(0,0,0,.08)" stroke-width="4"/>
    <ellipse cx="265" cy="95" rx="46" ry="42" fill="url(#fur2)" stroke="rgba(0,0,0,.08)" stroke-width="4"/>
    <ellipse cx="95" cy="98" rx="24" ry="22" fill="#ffcfbf" opacity=".9"/>
    <ellipse cx="265" cy="98" rx="24" ry="22" fill="#ffcfbf" opacity=".9"/>

    <ellipse cx="180" cy="188" rx="78" ry="60" fill="#ffe9d6" opacity=".95"/>

    <!-- happy eyes -->
    <path d="M120 150 C132 138 148 138 160 150" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>
    <path d="M212 150 C224 138 240 138 252 150" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>

    <ellipse cx="180" cy="182" rx="16" ry="13" fill="#141418"/>

    <!-- smile -->
    <path d="M150 208 C172 228 200 228 222 208" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>

    <ellipse cx="118" cy="190" rx="18" ry="12" fill="#ff8fb1" opacity=".55"/>
    <ellipse cx="242" cy="190" rx="18" ry="12" fill="#ff8fb1" opacity=".55"/>

    <path d="M304 120 C304 104 290 94 276 94 C266 94 258 100 254 108
             C250 100 242 94 232 94 C218 94 204 104 204 120
             C204 144 254 168 254 168 C254 168 304 144 304 120 Z"
          fill="#ff4d6d" opacity=".95"/>
  </svg>`;
}

/* حط نفس الدب لكل دباديب الحواف */
edgeBears.forEach(b => b.innerHTML = renderHappyBear());

/* حط نفس الدب لـ 5 دباديب الدبكة */
dabkeBears.forEach(b => b.innerHTML = renderHappyBear());

twemojify();

/* قلوب */
const hearts = ["❤️","🤍"];
function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = hearts[Math.floor(Math.random()*hearts.length)];
  h.style.setProperty("--lx", (Math.random()*100) + "vw");
  h.style.setProperty("--fs", (14 + Math.random()*20) + "px");
  h.style.setProperty("--dur", (2.2 + Math.random()*1.6) + "s");
  document.body.appendChild(h);
  setTimeout(()=>h.remove(), 4200);
}
setInterval(spawnHeart, 140);
