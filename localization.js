(function(){
"use strict";
const p=new URLSearchParams(location.search);
const req=p.get("hubLang")||p.get("lang")||localStorage.getItem("skc-language");
const lang=req==="en"?"en":"es";
try{localStorage.setItem("skc-language",lang)}catch(e){}
document.documentElement.lang=lang;
const exact=new Map([...(window.SKC_ES_1||[]),...(window.SKC_ES_2||[]),...(window.SKC_ES_3||[]),...(window.SKC_ES_4||[]),...(window.SKC_ES_5||[])]);
const coverOverrides={
  en:new Map([
    ["Good decisions need more than","How much do you really know about sustainability?"],
    ["good intentions.",""],
    ["Work through 18 realistic choices. Examine the evidence, lifecycle trade-offs and operational constraints—then discover where your reasoning is strongest.","Test your knowledge, discover your strengths and identify where you can keep learning."]
  ]),
  es:new Map([
    ["Good decisions need more than","¿Cuánto sabes realmente de sostenibilidad?"],
    ["good intentions.",""],
    ["Work through 18 realistic choices. Examine the evidence, lifecycle trade-offs and operational constraints—then discover where your reasoning is strongest.","Pon a prueba tus conocimientos, descubre tus puntos fuertes e identifica dónde puedes seguir aprendiendo."]
  ])
};
const esExtra=new Map([
  ["Private browser session","Sesión privada en el navegador"],
  ["Reset","Reiniciar"],
  ["Decision scenario","Escenario de decisión"],
  ["Single best answer","Una única respuesta correcta"],
  ["True or false","Verdadero o falso"],
  ["Select all required","Selecciona todas las necesarias"],
  ["Build the sequence","Ordena la secuencia"],
  ["Knowledge check","Evaluación de conocimientos"],
  ["Challenge","Reto"],
  ["Balanced diagnostic","Diagnóstico equilibrado"],
  ["Situation:","Situación:"],
  ["Choose the strongest answer, then review the reasoning before you continue.","Elige la respuesta más sólida y revisa el razonamiento antes de continuar."],
  ["Choose one answer","Elige una respuesta"],
  ["Review the decision","Revisa la decisión"],
  ["Evidence base · Airbus ↗","Base de evidencias · Airbus ↗"],
  ["Next question →","Siguiente pregunta →"],
  ["Challenge · assessment area","Reto · área de evaluación"],
  ["Evidence review","Revisión de evidencias"],
  ["live score","puntuación en directo"],
  ["A water-related disruption affects a supplier of a unique process. Expedited freight protects delivery for one month but adds cost and emissions.","Una interrupción relacionada con el agua afecta a un proveedor de un proceso único. El transporte urgente garantiza la entrega durante un mes, pero añade costes y emisiones."],
  ["Protect continuity now while reducing the underlying dependency.","Proteger ahora la continuidad mientras se reduce la dependencia de fondo."],
  ["Resume question","Continuar en la pregunta"],
  ["Start again","Empezar de nuevo"],
  ["Last result","Último resultado"],
  ["Assessment details","Detalles de la evaluación"],
  ["Six assessment areas","Seis áreas de evaluación"],
  ["A sustainability evidence dossier under review","Un dossier de evidencias de sostenibilidad en revisión"],
  ["A layered evidence dossier with aerospace materials, environmental maps and performance data being reviewed.","Un dossier de evidencias con materiales aeroespaciales, mapas ambientales y datos de desempeño en revisión."],
  ["Preview of the final diagnostic profile","Vista previa del perfil diagnóstico final"],
  ["Question","Pregunta"],
  ["Results","Resultados"],
  ["Home","Inicio"]
]);
function tr(v){
  if(typeof v!=="string")return v;
  const t=v.trim();
  const override=coverOverrides[lang]?.get(t);
  if(override!==undefined)return v.replace(t,override);
  if(lang!=="es")return v;
  if(esExtra.has(t))return v.replace(t,esExtra.get(t));
  if(exact.has(t))return v.replace(t,exact.get(t));
  let o=v;
  o=o.replace(/^Resume question (\d+)$/,(m,a)=>"Continuar en la pregunta "+a);
  o=o.replace(/^Question (\d+) of (\d+)$/,(m,a,b)=>"Pregunta "+a+" de "+b);
  o=o.replace(/^(\d+)% credit for this question$/,(m,a)=>a+" % de puntuación en esta pregunta");
  o=o.replace(/^(\d+) of (\d+) selected$/,(m,a,b)=>a+" de "+b+" seleccionadas");
  o=o.replace(/^(\d+) of (\d+) ordered$/,(m,a,b)=>a+" de "+b+" ordenados");
  o=o.replace(/^Priority (\d+)$/,(m,a)=>"Prioridad "+a);
  o=o.replace(/^Open (M\d+[^↗]*) ↗$/,(m,a)=>"Abrir "+a+" ↗");
  return o
}
function deep(v,seen=new WeakSet()){
  if(lang!=="es")return v;
  if(typeof v==="string")return tr(v);
  if(!v||typeof v!=="object")return v;
  if(seen.has(v))return v;
  seen.add(v);
  if(Array.isArray(v)){for(let i=0;i<v.length;i++)v[i]=deep(v[i],seen)}
  else{for(const k of Object.keys(v))v[k]=deep(v[k],seen)}
  return v
}
if(window.SKC_DATA)deep(window.SKC_DATA);
function walk(root){
  if(!root)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),ns=[];
  while(w.nextNode())ns.push(w.currentNode);
  for(const n of ns){
    if(!n.parentElement||/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(n.parentElement.tagName))continue;
    const x=tr(n.nodeValue);
    if(x!==n.nodeValue)n.nodeValue=x
  }
  root.querySelectorAll?.("[title],[aria-label],[alt],[placeholder]").forEach(el=>{
    for(const a of["title","aria-label","alt","placeholder"]){
      if(el.hasAttribute(a))el.setAttribute(a,tr(el.getAttribute(a)))
    }
  })
}
function control(){
  const b=document.createElement("div");
  b.id="skc-language";
  b.innerHTML='<button data-l="es">ES</button><span>|</span><button data-l="en">EN</button>';
  b.style.cssText="position:fixed;z-index:2147483647;right:12px;top:12px;display:flex;gap:7px;align-items:center;padding:8px 11px;border-radius:999px;background:#102a26;color:#fff;border:2px solid rgba(255,255,255,.85);font:800 12px/1 system-ui;box-shadow:0 5px 18px rgba(0,0,0,.25)";
  b.querySelectorAll("button").forEach(x=>{
    x.type="button";
    x.style.cssText="border:0;background:transparent;color:#fff;font:inherit;cursor:pointer;padding:2px 4px";
    if(x.dataset.l===lang)x.style.textDecoration="underline";
    x.onclick=()=>{
      const u=new URL(location.href);
      u.searchParams.set("hubLang",x.dataset.l);
      location.href=u.toString()
    }
  });
  document.body.appendChild(b)
}
function init(){control();walk(document.body)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
new MutationObserver(ms=>{
  for(const m of ms){
    for(const n of m.addedNodes){
      if(n.nodeType===1)walk(n);
      else if(n.nodeType===3){const x=tr(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x}
    }
    if(m.type==="characterData"){const x=tr(m.target.nodeValue);if(x!==m.target.nodeValue)m.target.nodeValue=x}
  }
}).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();