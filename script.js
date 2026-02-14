const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const btnArea = document.getElementById("btnArea");
const hintText = document.getElementById("hintText");

const MAX_LEVEL = 10;
let level = 0;

const bears = Array.from(document.querySelectorAll(".bear"));

/* ✅ الجمل ثابتة هون */
const phrases = [
  `كنت مفكّرِك رح تقولي اي من أولها`,
  `ما كنت متوقّع هيك بصراحة`,
  `رح أعتبرها مزحة`,
  `يا الله قديش عنيدة`,
  `طيب؟`,
  `الله يسامحك`,
  `لك خلص استحي؟`,
  `شكلو بدك تصيري كاكا؟`,
  `متأكدة انو بدك تكوني كاكا؟`,
  `ماشي يا كاكاااااا 😡`
];

/* 10 تعابير — كل كبسة وجه جديد */
const FACE = [
  { brows:"",       eyes:"smile",      mouth:"bigSmile", blush:0.55 }, // 0
  { brows:"up",     eyes:"dots",       mouth:"smallO",   blush:0.45 }, // 1
  { brows:"upHard", eyes:"bigDots",    mouth:"bigO",     blush:0.35 }, // 2
  { brows:"flat",   eyes:"dots",       mouth:"line",     blush:0.30 }, // 3
  { brows:"tilt1",  eyes:"dots",       mouth:"down1",    blush:0.22 }, // 4
  { brows:"tilt2",  eyes:"dots",       mouth:"down2",    blush:0.18 }, // 5
  { brows:"angry1", eyes:"angryDots",  mouth:"down3",    blush:0.14 }, // 6
  { brows:"angry2", eyes:"angryDots",  mouth:"down4",    blush:0.12 }, // 7
  { brows:"angry3", eyes:"angryDots2", mouth:"growl",    blush:0.10 }, // 8
  { brows:"max",    eyes:"max",        mouth:"max",      blush:0.08 }, // 9
  { brows:"max",    eyes:"max",        mouth:"max",      blush:0.08 }, // 10 احتياط
];

function twemojify(){
  if (window.twemoji) window.twemoji.parse(document.body, {folder:'svg', ext:'.svg'});
}

/* خلفية غضب */
function lerp(a,b,t){ return a+(b-a)*t; }
function hexToRgb(h){
  const x=h.replace('#','');
  const n=parseInt(x.length===3 ? x.split('').map(c=>c+c).join('') : x,16);
  return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};
}
function rgbToHex({r,g,b}){
  const to=v=>v.toString(16).padStart(2,'0');
  return `#${to(Math.round(r))}${to(Math.round(g))}${to(Math.round(b))}`;
}
function mixHex(a,b,t){
  const A=hexToRgb(a), B=hexToRgb(b);
  return rgbToHex({r:lerp(A.r,B.r,t), g:lerp(A.g,B.g,t), b:lerp(A.b,B.b,t)});
}
function setThemeForLevel(lv){
  const t=Math.min(1, lv/MAX_LEVEL);
  document.documentElement.style.setProperty("--bgTop", mixHex("#fff0f5","#3a000b",t));
  document.documentElement.style.setProperty("--bgBottom", mixHex("#ffffff","#120003",t));
}

function eyesSvg(type){
  if(type==="smile"){
    return `
      <path d="M120 152 C134 140 150 140 164 152" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>
      <path d="M196 152 C210 140 226 140 240 152" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>
    `;
  }
  if(type==="bigDots"){
    return `<circle cx="142" cy="160" r="10" fill="#141418"/><circle cx="222" cy="160" r="10" fill="#141418"/>`;
  }
  if(type==="angryDots"){
    return `<circle cx="142" cy="162" r="9" fill="#141418"/><circle cx="222" cy="162" r="9" fill="#141418"/>`;
  }
  if(type==="angryDots2"){
    return `<circle cx="142" cy="164" r="10" fill="#141418"/><circle cx="222" cy="164" r="10" fill="#141418"/>`;
  }
  if(type==="max"){
    return `<circle cx="142" cy="165" r="11" fill="#141418"/><circle cx="222" cy="165" r="11" fill="#141418"/>`;
  }
  return `<circle cx="142" cy="160" r="8" fill="#141418"/><circle cx="222" cy="160" r="8" fill="#141418"/>`;
}

function browsSvg(type){
  if(type==="up"){
    return `
      <path d="M112 128 L168 122" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
      <path d="M196 122 L252 128" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  if(type==="upHard"){
    return `
      <path d="M110 130 L170 118" stroke="#141418" stroke-width="9" stroke-linecap="round"/>
      <path d="M194 118 L254 130" stroke="#141418" stroke-width="9" stroke-linecap="round"/>
    `;
  }
  if(type==="flat"){
    return `
      <path d="M112 134 L168 134" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
      <path d="M196 134 L252 134" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  if(type==="tilt1"){
    return `
      <path d="M112 138 L168 132" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
      <path d="M196 132 L252 138" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  if(type==="tilt2"){
    return `
      <path d="M112 142 L168 132" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
      <path d="M196 132 L252 142" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  if(type==="angry1"){
    return `
      <path d="M112 146 L168 128" stroke="#141418" stroke-width="9" stroke-linecap="round"/>
      <path d="M196 128 L252 146" stroke="#141418" stroke-width="9" stroke-linecap="round"/>
    `;
  }
  if(type==="angry2"){
    return `
      <path d="M110 150 L170 126" stroke="#141418" stroke-width="10" stroke-linecap="round"/>
      <path d="M194 126 L254 150" stroke="#141418" stroke-width="10" stroke-linecap="round"/>
    `;
  }
  if(type==="angry3"){
    return `
      <path d="M108 154 L172 124" stroke="#141418" stroke-width="10" stroke-linecap="round"/>
      <path d="M188 124 L256 154" stroke="#141418" stroke-width="10" stroke-linecap="round"/>
    `;
  }
  if(type==="max"){
    return `
      <path d="M104 160 L176 120" stroke="#141418" stroke-width="11" stroke-linecap="round"/>
      <path d="M184 120 L260 160" stroke="#141418" stroke-width="11" stroke-linecap="round"/>
    `;
  }
  return "";
}

function mouthSvg(type){
  if(type==="bigSmile"){
    return `<path d="M150 214 C172 242 208 242 230 214" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>`;
  }
  if(type==="smallO"){
    return `<ellipse cx="190" cy="218" rx="14" ry="12" fill="none" stroke="#141418" stroke-width="8"/>`;
  }
  if(type==="bigO"){
    return `<ellipse cx="190" cy="220" rx="18" ry="16" fill="none" stroke="#141418" stroke-width="9"/>`;
  }
  if(type==="line"){
    return `<path d="M158 220 L222 220" stroke="#141418" stroke-width="10" stroke-linecap="round"/>`;
  }
  if(type==="down1"){
    return `<path d="M158 228 C176 214 204 214 222 228" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>`;
  }
  if(type==="down2"){
    return `<path d="M156 232 C176 212 204 212 224 232" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>`;
  }
  if(type==="down3"){
    return `<path d="M154 236 C176 210 206 210 226 236" fill="none" stroke="#141418" stroke-width="10" stroke-linecap="round"/>`;
  }
  if(type==="down4"){
    return `<path d="M152 240 C176 208 206 208 228 240" fill="none" stroke="#141418" stroke-width="11" stroke-linecap="round"/>`;
  }
  if(type==="growl"){
    return `
      <path d="M150 242 C176 206 206 206 230 242" fill="none" stroke="#141418" stroke-width="11" stroke-linecap="round"/>
      <path d="M170 238 L210 238" stroke="#141418" stroke-width="7" stroke-linecap="round"/>
    `;
  }
  if(type==="max"){
    return `
      <path d="M146 246 C176 202 208 202 234 246" fill="none" stroke="#141418" stroke-width="12" stroke-linecap="round"/>
      <path d="M168 240 L212 240" stroke="#141418" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  return "";
}

function renderBear(lv){
  const s = FACE[Math.min(lv, 10)];
  return `
  <svg viewBox="0 0 360 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fur" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffd7b0"/>
        <stop offset="1" stop-color="#ffb989"/>
      </linearGradient>
      <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ff4d6d"/>
        <stop offset="1" stop-color="#ff7a9a"/>
      </linearGradient>
    </defs>

    <path d="M85 360 C80 270 95 225 140 205 C155 240 205 240 220 205 C265 225 280 270 275 360 Z"
          fill="url(#fur)" stroke="rgba(0,0,0,.08)" stroke-width="4"/>

    <path d="M135 240 C160 270 200 270 225 240 C255 250 270 280 270 330
             C240 350 120 350 90 330 C90 280 105 250 135 240 Z"
          fill="url(#shirt)" opacity="0.96"/>
    <text x="180" y="306" text-anchor="middle" font-size="34" font-weight="800" fill="white">LOVE</text>

    <ellipse cx="180" cy="160" rx="120" ry="110" fill="url(#fur)" stroke="rgba(0,0,0,.08)" stroke-width="4"/>

    <ellipse cx="95" cy="95" rx="46" ry="42" fill="url(#fur)" stroke="rgba(0,0,0,.08)" stroke-width="4"/>
    <ellipse cx="265" cy="95" rx="46" ry="42" fill="url(#fur)" stroke="rgba(0,0,0,.08)" stroke-width="4"/>
    <ellipse cx="95" cy="98" rx="24" ry="22" fill="#ffcfbf" opacity=".9"/>
    <ellipse cx="265" cy="98" rx="24" ry="22" fill="#ffcfbf" opacity=".9"/>

    <ellipse cx="180" cy="188" rx="78" ry="60" fill="#ffe9d6" opacity=".95"/>

    ${browsSvg(s.brows)}
    ${eyesSvg(s.eyes)}

    <ellipse cx="180" cy="182" rx="16" ry="13" fill="#141418"/>
    ${mouthSvg(s.mouth)}

    <ellipse cx="118" cy="190" rx="18" ry="12" fill="#ff8fb1" opacity="${s.blush}"/>
    <ellipse cx="242" cy="190" rx="18" ry="12" fill="#ff8fb1" opacity="${s.blush}"/>

    <path d="M304 120 C304 104 290 94 276 94 C266 94 258 100 254 108
             C250 100 242 94 232 94 C218 94 204 104 204 120
             C204 144 254 168 254 168 C254 168 304 144 304 120 Z"
          fill="#ff4d6d" opacity=".95"/>
  </svg>`;
}

function setAllBears(lv){
  bears.forEach(b => b.innerHTML = renderBear(lv));
  twemojify();
}

function moveNoButton(){
  const area = btnArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const yes = yesBtn.getBoundingClientRect();
  const pad = 6;

  const maxX = Math.max(0, area.width - btn.width - pad);
  const maxY = Math.max(0, area.height - btn.height - pad);

  const yesLocalX = yes.left - area.left;
  const yesLocalY = yes.top - area.top;

  const forbid = {
    x1: yesLocalX - 24,
    y1: yesLocalY - 16,
    x2: yesLocalX + yes.width + 24,
    y2: yesLocalY + yes.height + 16
  };

  for(let i=0;i<25;i++){
    const x = pad + Math.random()*maxX;
    const y = pad + Math.random()*maxY;
    const bx1=x, by1=y, bx2=x+btn.width, by2=y+btn.height;
    const inter = !(bx2<forbid.x1 || bx1>forbid.x2 || by2<forbid.y1 || by1>forbid.y2);
    if(!inter){
      noBtn.style.left = x + "px";
      noBtn.style.top  = y + "px";
      return;
    }
  }
  noBtn.style.left = (pad + Math.random()*maxX) + "px";
  noBtn.style.top  = (pad + Math.random()*maxY) + "px";
}

function onNo(){
  level = Math.min(MAX_LEVEL, level + 1);

  const phrase = phrases[Math.min(level-1, phrases.length-1)] || "";
  hintText.textContent = phrase;

  setThemeForLevel(level);
  setAllBears(level);
  moveNoButton();
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", (e)=>{ e.preventDefault(); onNo(); });
noBtn.addEventListener("touchstart", (e)=>{ e.preventDefault(); onNo(); }, {passive:false});

yesBtn.addEventListener("click", ()=> location.href="yes.html");

(function init(){
  setThemeForLevel(0);
  setAllBears(0);
  window.addEventListener("load", moveNoButton);
})();
