const s=[...document.querySelectorAll(".screen")],bar=document.getElementById("bar"),music=document.getElementById("music");
let c=0;
function show(i){s[c].classList.remove("active");c=i;s[c].classList.add("active");bar.style.width=(c+1)/s.length*100+"%"}
function next(){if(c<s.length-1)show(c+1)}
const heart=document.getElementById("heart");
const unlockBar=document.getElementById("unlockBar");
const unlockText=document.getElementById("unlockText");
const unlockPercent=document.getElementById("unlockPercent");
const desbloquear_mensajes=[
  "Toca el corazón para comenzar ❤️",
  "Otra vez… que esto recién empieza ❤️",
  "Algo se está encendiendo… ✨",
  "Sigue… que esto se calienta 💗",
  "Un poquito más, mi Hormiga 🐜",
  "No pares ahora… ya casi llegas 💞",
  "La última vez! ❤️"
];
let unlockStep=0,unlockDone=false;
function renderUnlock(){
  const pct=Math.round(unlockStep/(unlockMessages.length-1)*100);
  if(unlockBar) unlockBar.style.width=pct+"%";
  if(unlockPercent) unlockPercent.textContent=pct+"%";
  if(unlockText) unlockText.textContent=unlockMessages[unlockStep];
}
renderUnlock();
heart.onclick=()=>{
  if(unlockDone)return;
  music.play().catch(()=>{});
  if(unlockStep<unlockMessages.length-1){
    unlockStep++;
    renderUnlock();
  }
  if(unlockStep===unlockMessages.length-1){
    unlockDone=true;
    setTimeout(()=>next(),900);
  }
};
document.querySelectorAll(".next").forEach(x=>x.onclick=next);
document.getElementById("restart").onclick=()=>{unlockStep=0;unlockDone=false;renderUnlock();show(0)};
document.getElementById("sound").onclick=()=>music.paused?music.play():music.pause();

const pics=Array.from({length:7},(_,i)=>"fotos/foto"+(i+1)+".jpg");
const captions=[
"Momentos que merecen quedarse para siempre.",
"Contigo, cualquier lugar se siente más bonito.",
"Me gustan esos momentos sencillos… porque son nuestros.",
"Y sí, Hormiga 🐜, todavía quedan muchísimas historias por vivir.",
"Entre arena, sol y aventuras… contigo hasta perderse tiene su encanto. 😄",
"Una Hormiguita 🐜, un Pollito 🐤 y demasiados recuerdos bonitos para contar.",
"Si la vida es un viaje, qué bonito coincidir contigo en el camino. ❤️"
];
let p=0,img=document.getElementById("photo"),count=document.getElementById("count"),caption=document.getElementById("caption");
function set(n){p=(n+7)%7;img.style.opacity=0;setTimeout(()=>{img.src=pics[p];count.textContent=(p+1)+" / 7";caption.textContent=captions[p];img.style.opacity=1},150)}
document.getElementById("prev").onclick=()=>set(p-1);
document.getElementById("nextPhoto").onclick=()=>set(p+1);
let x=0;
img.ontouchstart=e=>x=e.touches[0].clientX;
img.ontouchend=e=>{let d=e.changedTouches[0].clientX-x;if(Math.abs(d)>45)set(p+(d<0?1:-1))};

