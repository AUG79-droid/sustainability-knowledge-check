(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("hubLang") || params.get("lang");
  let stored = null;
  try {
    stored = window.localStorage.getItem("skc-language");
  } catch (_error) {
    // Storage is optional. URL language selection still works without it.
  }

  const language = requested === "en" || requested === "es"
    ? requested
    : stored === "en" || stored === "es" ? stored : "es";

  try {
    window.localStorage.setItem("skc-language", language);
  } catch (_error) {
    // A private or restricted browser may reject storage.
  }

  document.documentElement.lang = language;

  const spanish = new Map([
    ...(window.SKC_ES_1 || []),
    ...(window.SKC_ES_2 || []),
    ...(window.SKC_ES_3 || []),
    ...(window.SKC_ES_4 || []),
    ...(window.SKC_ES_5 || []),
    ...(window.SKC_ES_6 || [])
  ]);

  function translatePattern(text) {
    const patterns = [
      [/^Resume question (\d+)$/, (_match, number) => `Continuar en la pregunta ${number}`],
      [/^Last result · (\d+)%$/, (_match, score) => `Último resultado · ${score}%`],
      [/^Question (\d+) of (\d+)$/, (_match, current, total) => `Pregunta ${current} de ${total}`],
      [/^Question (\d+)$/, (_match, number) => `Pregunta ${number}`],
      [/^(\d+)% credit for this question$/, (_match, score) => `${score} % de puntuación en esta pregunta`],
      [/^(\d+) of (\d+) selected$/, (_match, current, total) => `${current} de ${total} seleccionadas`],
      [/^(\d+) of (\d+) ordered$/, (_match, current, total) => `${current} de ${total} ordenados`],
      [/^Select exactly (\d+) options\. Partial credit is possible\.$/, (_match, count) => `Selecciona exactamente ${count} opciones. Es posible obtener puntuación parcial.`],
      [/^Select exactly (\d+) options\. Remove one before adding another\.$/, (_match, count) => `Selecciona exactamente ${count} opciones. Quita una antes de añadir otra.`],
      [/^(.+) · based on (\d+) balanced questions$/, (_match, label, count) => `${translate(label)} · basado en ${count} preguntas equilibradas`],
      [/^Priority (\d+)$/, (_match, number) => `Prioridad ${number}`],
      [/^(.+) · assessment area$/, (_match, label) => `${translate(label)} · área de evaluación`],
      [/^Open (.+) ↗$/, (_match, label) => `Abrir ${translate(label)} ↗`],
      [/^Evidence base · (.+) ↗$/, (_match, organisation) => `Base de evidencias · ${translate(organisation)} ↗`],
      [/^Overall score (\d+) percent$/, (_match, score) => `Puntuación global: ${score} por ciento`],
      [/^Completed: (.+)$/, (_match, date) => `Completado: ${date}`],
      [/^Evidence reviewed: (.+)$/, (_match, date) => `Evidencias revisadas: ${translate(date)}`]
    ];

    for (const [pattern, replacement] of patterns) {
      if (pattern.test(text)) return text.replace(pattern, replacement);
    }
    return text;
  }

  function translate(value) {
    if (typeof value !== "string" || language !== "es") return value;
    const trimmed = value.trim();
    if (!trimmed) return value;
    const translated = spanish.get(trimmed) ?? translatePattern(trimmed);
    return translated === trimmed ? value : value.replace(trimmed, translated);
  }

  function translateData(value, seen = new WeakSet()) {
    if (language !== "es") return value;
    if (typeof value === "string") return translate(value);
    if (!value || typeof value !== "object" || seen.has(value)) return value;
    seen.add(value);
    if (Array.isArray(value)) {
      value.forEach((item, index) => { value[index] = translateData(item, seen); });
    } else {
      Object.keys(value).forEach((key) => { value[key] = translateData(value[key], seen); });
    }
    return value;
  }

  function localizeElement(root) {
    if (language !== "es" || !root) return root;

    const nodes = [];
    if (root.nodeType === Node.TEXT_NODE) nodes.push(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (!node.parentElement || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(node.parentElement.tagName)) return;
      node.nodeValue = translate(node.nodeValue);
    });

    const elements = root.nodeType === Node.ELEMENT_NODE
      ? [root, ...root.querySelectorAll("[title],[aria-label],[alt],[placeholder]")]
      : [...root.querySelectorAll?.("[title],[aria-label],[alt],[placeholder]") || []];

    elements.forEach((element) => {
      ["title", "aria-label", "alt", "placeholder"].forEach((attribute) => {
        if (element.hasAttribute?.(attribute)) {
          element.setAttribute(attribute, translate(element.getAttribute(attribute)));
        }
      });
    });
    return root;
  }

  function createLanguageControl() {
    if (document.querySelector("#skc-language")) return;
    const control = document.createElement("div");
    control.id = "skc-language";
    control.setAttribute("aria-label", translate("Language selector"));
    control.innerHTML = '<button data-language="es">ES</button><span aria-hidden="true">|</span><button data-language="en">EN</button>';
    control.style.cssText = "position:fixed;z-index:2147483647;right:12px;top:12px;display:flex;gap:7px;align-items:center;padding:8px 11px;border-radius:999px;background:#102a26;color:#fff;border:2px solid rgba(255,255,255,.85);font:800 12px/1 system-ui;box-shadow:0 5px 18px rgba(0,0,0,.25)";

    control.querySelectorAll("button").forEach((button) => {
      button.type = "button";
      button.style.cssText = "border:0;background:transparent;color:#fff;font:inherit;cursor:pointer;padding:2px 4px";
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
      if (button.dataset.language === language) button.style.textDecoration = "underline";
      button.addEventListener("click", () => {
        const url = new URL(window.location.href);
        url.searchParams.set("hubLang", button.dataset.language);
        window.location.assign(url.toString());
      });
    });
    document.body.appendChild(control);
  }

  window.SKC_I18N = Object.freeze({ language, translate, translateData, localizeElement });

  if (window.SKC_DATA) translateData(window.SKC_DATA);

  function initializeStaticInterface() {
    localizeElement(document.body);
    createLanguageControl();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeStaticInterface, { once: true });
  } else {
    initializeStaticInterface();
  }
})();
