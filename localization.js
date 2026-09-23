(function(){
"use strict";
const p=new URLSearchParams(location.search);
const req=p.get("hubLang")||p.get("lang")||localStorage.getItem("skc-language");
const lang=req==="en"?"en":"es";
try{localStorage.setItem("skc-language",lang)}catch(e){}
document.documentElement.lang=lang;
const exact=new Map([...(window.SKC_ES_1||[]),...(window.SKC_ES_2||[]),...(window.SKC_ES_3||[]),...(window.SKC_ES_4||[]),...(window.SKC_ES_5||[])]);
function tr(v){if(lang!=="es"||typeof v!=="string")return v;const t=v.trim();if(exact.has(t))return v.replace(t,exact.get(t));let o=v;
o=o.replace(/^Resume question (\d+)$/,(m,a)=>"Continuar en la pregunta "+a);
o=o.replace(/^(\d+) of (\d+) selected$/,(m,a,b)=>a+" de "+b+" seleccionadas");
o=o.replace(/^(\d+) of (\d+) ordered$/,(m,a,b)=>a+" de "+b+" ordenados");
o=o.replace(/^Priority (\d+)$/,(m,a)=>"Prioridad "+a);
o=o.replace(/^Open (M\d+[^↗]*) ↗$/,(m,a)=>"Abrir "+a+" ↗");
return o}
function deep(v,seen=new WeakSet()){if(lang!=="es")return v;if(typeof v==="string")return tr(v);if(!v||typeof v!=="object")return v;if(seen.has(v))return v;seen.add(v);if(Array.isArray(v)){for(let i=0;i<v.length;i++)v[i]=deep(v[i],seen)}else{for(const k of Object.keys(v))v[k]=deep(v[k],seen)}return v}
if(window.SKC_DATA)deep(window.SKC_DATA);
function walk(root){if(lang!=="es"||!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),ns=[];while(w.nextNode())ns.push(w.currentNode);for(const n of ns){if(!n.parentElement||/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(n.parentElement.tagName))continue;const x=tr(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x}root.querySelectorAll?.("[title],[aria-label],[alt],[placeholder]").forEach(el=>{for(const a of["title","aria-label","alt","placeholder"])if(el.hasAttribute(a))el.setAttribute(a,tr(el.getAttribute(a)))})}
function control(){const b=document.createElement("div");b.id="skc-language";b.innerHTML='<button data-l="es">ES</button><span>|</span><button data-l="en">EN</button>';b.style.cssText="position:fixed;z-index:2147483647;right:12px;top:12px;display:flex;gap:7px;align-items:center;padding:8px 11px;border-radius:999px;background:#102a26;color:#fff;border:2px solid rgba(255,255,255,.85);font:800 12px/1 system-ui;box-shadow:0 5px 18px rgba(0,0,0,.25)";b.querySelectorAll("button").forEach(x=>{x.type="button";x.style.cssText="border:0;background:transparent;color:#fff;font:inherit;cursor:pointer;padding:2px 4px";if(x.dataset.l===lang)x.style.textDecoration="underline";x.onclick=()=>{const u=new URL(location.href);u.searchParams.set("hubLang",x.dataset.l);location.href=u.toString()}});document.body.appendChild(b)}
function init(){control();walk(document.body)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
new MutationObserver(ms=>{if(lang!=="es")return;for(const m of ms){for(const n of m.addedNodes){if(n.nodeType===1)walk(n);else if(n.nodeType===3){const x=tr(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x}}if(m.type==="characterData"){const x=tr(m.target.nodeValue);if(x!==m.target.nodeValue)m.target.nodeValue=x}}}).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();