(() => {
  "use strict";

  const DATA = window.SKC_DATA;
  const STORE_KEY = "sustainability-knowledge-check-v1";
  const app = document.querySelector("#app");
  const toast = document.querySelector("#toast");
  const areaById = Object.fromEntries(DATA.areas.map((area) => [area.id, area]));
  const questionById = Object.fromEntries(DATA.questions.map((question) => [question.id, question]));

  const blankState = () => ({
    attemptId: null,
    selectedIds: [],
    index: 0,
    answers: {},
    draft: null,
    showFeedback: false,
    finished: false,
    startedAt: null,
    finishedAt: null,
    lastResult: null
  });

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (!saved || typeof saved !== "object") return blankState();
      const validIds = Array.isArray(saved.selectedIds) && saved.selectedIds.every((id) => questionById[id]);
      return validIds ? { ...blankState(), ...saved } : blankState();
    } catch (_error) {
      return blankState();
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (_error) {
      showToast("Progress could not be saved in this browser.");
    }
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function shuffle(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function setPage(title, activeNav = null, resetScroll = true) {
    document.title = title ? `${title} · ${DATA.meta.title}` : DATA.meta.title;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const active = link.dataset.nav === activeNav;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (resetScroll) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        app.focus({ preventScroll: true });
        requestAnimationFrame(() => window.scrollTo(0, 0));
      });
    }
  }

  function selectAttemptQuestions() {
    const selectedByArea = {};
    DATA.areas.forEach((area) => {
      const pool = DATA.questions.filter((question) => question.area === area.id);
      const scenarios = shuffle(pool.filter((question) => question.type === "scenario"));
      const first = scenarios[0] || shuffle(pool)[0];
      const remaining = shuffle(pool.filter((question) => question.id !== first.id));
      const chosen = [first];
      const usedTypes = new Set([first.type]);

      for (const question of remaining) {
        if (chosen.length === 3) break;
        if (!usedTypes.has(question.type)) {
          chosen.push(question);
          usedTypes.add(question.type);
        }
      }
      for (const question of remaining) {
        if (chosen.length === 3) break;
        if (!chosen.some((item) => item.id === question.id)) chosen.push(question);
      }
      selectedByArea[area.id] = shuffle(chosen);
    });

    const ordered = [];
    for (let round = 0; round < 3; round += 1) {
      shuffle(DATA.areas).forEach((area) => ordered.push(selectedByArea[area.id][round].id));
    }
    return ordered;
  }

  function startNewAttempt() {
    const previousResult = state.lastResult;
    state = {
      ...blankState(),
      attemptId: `attempt-${Date.now()}`,
      selectedIds: selectAttemptQuestions(),
      startedAt: new Date().toISOString(),
      lastResult: previousResult
    };
    saveState();
    history.pushState(null, "", "#check");
    renderRoute();
  }

  function currentQuestion() {
    return questionById[state.selectedIds[state.index]] || null;
  }

  function answeredItems() {
    return state.selectedIds.map((id) => state.answers[id]).filter(Boolean);
  }

  function liveAccuracy() {
    const answered = answeredItems();
    if (!answered.length) return 0;
    return Math.round(answered.reduce((sum, answer) => sum + answer.earned, 0) / answered.length * 100);
  }

  function homeAreaCards() {
    return DATA.areas.map((area) => `
      <article class="area-card" style="--area:${esc(area.colour)}">
        <img src="${esc(area.image)}" alt="">
        <div class="area-card-copy">
          <div class="area-card-top"><span class="area-card-code">AREA ${esc(area.code)}</span><span class="area-dot" aria-hidden="true"></span></div>
          <h3>${esc(area.title)}</h3>
          <p>${esc(area.description)}</p>
        </div>
      </article>`).join("");
  }

  function renderHome() {
    const inProgress = state.selectedIds.length === 18 && !state.finished && Object.keys(state.answers).length < 18;
    const completed = state.lastResult;
    app.innerHTML = `
      <section class="home-hero">
        <img class="home-hero-media" src="assets/hero-a400m-eurofighter.jpg" alt="A Defence and Space industrial learning scene with an A400M, a fighter aircraft and a multidisciplinary team">
        <div class="home-hero-inner">
          <div class="home-copy">
            <div class="eyebrow light">Airbus Defence and Space context · English master</div>
            <h1>How strong is your <span>sustainability decision lens?</span></h1>
            <p>Test how you interpret evidence, lifecycle trade-offs and operational constraints—not how well you remember environmental vocabulary.</p>
            <div class="meta-row">
              <span class="meta-chip">18 balanced questions</span>
              <span class="meta-chip">6 decision areas</span>
              <span class="meta-chip">15–20 minutes</span>
              <span class="meta-chip">Immediate feedback</span>
            </div>
            <div class="button-row">
              ${inProgress ? `<button class="btn btn-primary" type="button" data-action="resume">Resume question ${state.index + 1} →</button><button class="btn btn-secondary" type="button" data-action="restart">Start a new attempt</button>` : `<button class="btn btn-primary" type="button" data-action="start">Start knowledge check →</button><a class="btn btn-secondary" href="#about">See how it works</a>`}
              ${completed ? `<button class="btn btn-secondary" type="button" data-action="last-results">View last result · ${completed.overall}%</button>` : ""}
            </div>
          </div>
          <aside class="diagnostic-card" aria-label="Six diagnostic areas">
            <div class="diagnostic-card-head"><strong>Your diagnostic map</strong><span>3 questions per area</span></div>
            <div class="diagnostic-grid">
              ${DATA.areas.map((area) => `<div class="diagnostic-domain" style="--area:${esc(area.colour)}"><span>${esc(area.code)}</span><strong>${esc(area.short)}</strong></div>`).join("")}
            </div>
            <p class="privacy-note">No sign-in. No answers are submitted. Progress and results stay in this browser.</p>
          </aside>
        </div>
      </section>

      <section class="home-section light">
        <div class="shell">
          <div class="section-head">
            <div><div class="eyebrow">Balanced by design</div><h2>Six areas that shape better decisions.</h2></div>
            <p>Every attempt covers the complete system. Questions change between attempts, but the diagnostic remains balanced across all six areas.</p>
          </div>
          <div class="area-grid">${homeAreaCards()}</div>
        </div>
      </section>

      <section class="method-strip">
        <div class="shell">
          <div class="section-head">
            <div><div class="eyebrow">Not a memory test</div><h2>Read. Decide. Learn. Transfer.</h2></div>
            <p>Each answer is followed by a reasoning lens. Your final learning plan links directly to the relevant Foundations modules.</p>
          </div>
          <div class="method-grid">
            ${[
              ["01", "Read the situation", "Use operational context, not environmental slogans."],
              ["02", "Make the call", "Choose, select several controls or build the right sequence."],
              ["03", "Interrogate the feedback", "See why the evidence supports one response more strongly."],
              ["04", "Take the next step", "Download a personal learning plan and continue in Foundations."]
            ].map(([number, title, text]) => `<article class="method-step"><span>${number}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join("")}
          </div>
        </div>
      </section>`;
    setPage("Home", "home");
  }

  function renderAbout() {
    app.innerHTML = `
      <section class="page-hero compact"><div class="shell"><div class="eyebrow">How it works</div><h1>A diagnostic, not a certification.</h1><p>The experience is designed to reveal how a person reasons through environmental evidence and operational trade-offs. It does not certify competence or replace any controlled Airbus process.</p></div></section>
      <section class="shell content-panel">
        <div class="about-grid">
          <article class="about-card"><h2>What you will do</h2><ul><li>Answer 18 questions: three from each decision area.</li><li>Work through scenarios, single and multiple selection, true/false and sequencing.</li><li>Receive a rationale and decision lens after every answer.</li><li>Finish with an overall score and a profile by area.</li></ul></article>
          <article class="about-card"><h2>How scoring works</h2><ul><li>Single-choice questions award full credit for the strongest response.</li><li>Multiple-selection questions can award partial credit, with a penalty for unsupported choices.</li><li>Sequencing questions award credit for correctly positioned steps.</li><li>The result highlights strengths and the areas that would benefit most from review.</li></ul></article>
          <article class="about-card"><h2>What the questions test</h2><p>They test whether you can define a boundary, compare equivalent function, question a KPI, identify evidence gaps, preserve technical constraints and separate activity from environmental outcome.</p></article>
          <article class="about-card"><h2>What happens to your data</h2><p>Nothing is submitted. The current attempt and latest result are stored only in this browser so you can resume. The downloadable plan is created locally on your device.</p></article>
        </div>
        <div class="button-row" style="margin-top:24px"><button class="btn btn-dark" type="button" data-action="start">Start knowledge check →</button><a class="btn btn-outline" href="#sources">Review evidence base</a></div>
      </section>`;
    setPage("How it works", "about");
  }

  function renderSources() {
    app.innerHTML = `
      <section class="page-hero compact"><div class="shell"><div class="eyebrow">Evidence base</div><h1>Public sources behind the reasoning.</h1><p>The questions use public primary or official sources. Internal approved documentation remains authoritative for Airbus work, and current legal or substance status must always be checked through approved processes.</p></div></section>
      <section class="shell content-panel">
        <div class="source-grid">
          ${Object.values(DATA.sources).map((source) => `<article class="source-card"><span>${esc(source.organisation)}</span><h2>${esc(source.title)}</h2><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">Open official source ↗</a></article>`).join("")}
        </div>
      </section>`;
    setPage("Evidence base", "sources");
  }

  function typeLabel(question) {
    return ({
      scenario: "Decision scenario",
      single: "Single best answer",
      truefalse: "True or false",
      multi: "Select all required",
      sequence: "Build the sequence"
    })[question.type] || "Knowledge check";
  }

  function ensureDraft(question) {
    if (!state.draft || state.draft.questionId !== question.id) {
      state.draft = {
        questionId: question.id,
        response: question.type === "multi" || question.type === "sequence" ? [] : null
      };
    }
  }

  function responseArray() {
    return Array.isArray(state.draft?.response) ? state.draft.response : [];
  }

  function isValidResponse(question) {
    if (!state.draft || state.draft.questionId !== question.id) return false;
    if (question.type === "multi") return responseArray().length === question.required;
    if (question.type === "sequence") return responseArray().length === question.options.length;
    return typeof state.draft.response === "string";
  }

  function optionsMarkup(question, disabled = false) {
    const response = state.draft?.response;
    if (question.type === "sequence") {
      const selected = responseArray();
      const remaining = question.options.filter((option) => !selected.includes(option.id));
      return `
        <div class="sequence-wrap">
          <div class="sequence-zone">
            <div class="sequence-label">Your order · tap an item to add it</div>
            <div class="sequence-selected">
              ${selected.length ? selected.map((id, index) => {
                const option = question.options.find((item) => item.id === id);
                return `<span class="sequence-rank"><b>${index + 1}</b>${esc(option.text)}</span>`;
              }).join("") : `<span class="selection-status">No steps selected yet.</span>`}
            </div>
          </div>
          ${disabled ? "" : `<div class="sequence-pool">${remaining.map((option) => `<button class="sequence-item" type="button" data-action="sequence-add" data-value="${esc(option.id)}">${esc(option.text)}</button>`).join("")}</div>`}
        </div>`;
    }

    return `<div class="option-list">${question.options.map((option, index) => {
      const selected = Array.isArray(response) ? response.includes(option.id) : response === option.id;
      return `<button class="option ${selected ? "selected" : ""}" type="button" data-action="select" data-value="${esc(option.id)}" aria-pressed="${selected}" ${disabled ? "disabled" : ""}><span class="option-letter">${String.fromCharCode(65 + index)}</span><span class="option-text">${esc(option.text)}</span></button>`;
    }).join("")}</div>`;
  }

  function instruction(question) {
    if (question.type === "multi") return `Select exactly ${question.required} options. Partial credit is possible.`;
    if (question.type === "sequence") return "Tap every step in the order you consider correct. Reset if you want to start again.";
    return "Choose the strongest answer, then review the reasoning before you continue.";
  }

  function selectionStatus(question) {
    if (question.type === "multi") return `${responseArray().length} of ${question.required} selected`;
    if (question.type === "sequence") return `${responseArray().length} of ${question.options.length} ordered`;
    return state.draft?.response ? "Answer selected" : "Choose one answer";
  }

  function correctAnswerText(question) {
    if (Array.isArray(question.correct)) {
      return question.correct.map((id, index) => {
        const option = question.options.find((item) => item.id === id);
        return question.type === "sequence" ? `${index + 1}. ${option.text}` : option.text;
      }).join(question.type === "sequence" ? " → " : "; ");
    }
    return question.options.find((option) => option.id === question.correct)?.text || "";
  }

  function calculateEarned(question, response) {
    if (question.type === "multi") {
      const correct = new Set(question.correct);
      const selected = new Set(response);
      const truePositives = [...selected].filter((id) => correct.has(id)).length;
      const falsePositives = [...selected].filter((id) => !correct.has(id)).length;
      return Math.max(0, Math.min(1, (truePositives - falsePositives) / correct.size));
    }
    if (question.type === "sequence") {
      const correctPositions = question.correct.filter((id, index) => response[index] === id).length;
      return correctPositions / question.correct.length;
    }
    return response === question.correct ? 1 : 0;
  }

  function feedbackMarkup(question, answer) {
    const score = answer.earned;
    const statusClass = score >= .999 ? "" : score >= .45 ? "partial" : "review";
    const statusTitle = score >= .999 ? "Strong call" : score >= .45 ? "Partly there" : "Review the decision";
    const statusSymbol = score >= .999 ? "✓" : score >= .45 ? "½" : "↺";
    const source = DATA.sources[question.source];
    const finalQuestion = state.index === state.selectedIds.length - 1;
    return `
      <section class="feedback-card" aria-live="polite">
        <div class="feedback-status ${statusClass}"><div class="feedback-symbol">${statusSymbol}</div><div><strong>${statusTitle}</strong><span>${Math.round(score * 100)}% credit for this question</span></div></div>
        <div class="feedback-body">
          <h2>Why this is the stronger reasoning</h2>
          <p>${esc(question.explanation)}</p>
          <div class="answer-reveal"><strong>Best-supported answer</strong>${esc(correctAnswerText(question))}</div>
          <div class="decision-lens"><strong>Decision lens:</strong><span>${esc(question.lens)}</span></div>
          <div class="feedback-links">
            <a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">Evidence base · ${esc(source.organisation)} ↗</a>
            <button class="btn btn-dark" type="button" data-action="next">${finalQuestion ? "See my diagnostic →" : "Next question →"}</button>
          </div>
        </div>
      </section>`;
  }

  function renderQuestion(preserveScroll = false) {
    const previousScroll = window.scrollY;
    const question = currentQuestion();
    if (!question) {
      finishAttempt();
      return;
    }
    ensureDraft(question);
    const area = areaById[question.area];
    const answered = state.answers[question.id];
    const isFeedback = state.showFeedback && answered;
    const completedCount = answeredItems().length;
    const progress = Math.round(completedCount / state.selectedIds.length * 100);

    app.innerHTML = `
      <section class="assessment-page" style="--area:${esc(area.colour)}">
        <div class="assessment-topbar">
          <div class="assessment-count"><strong>Question ${state.index + 1} of ${state.selectedIds.length}</strong><span>${esc(area.short)}</span></div>
          <div class="progress-track" aria-label="Assessment progress"><span style="width:${progress}%"></span></div>
          <div class="score-live"><strong>${completedCount ? `${liveAccuracy()}%` : "—"}</strong><span>live score</span></div>
        </div>
        <div class="question-stage">
          <aside class="question-visual">
            <img src="${esc(area.image)}" alt="">
            <div class="visual-copy"><div class="visual-index">Area ${esc(area.code)} · ${esc(question.difficulty)}</div><h2>${esc(area.title)}</h2><p>${esc(area.description)}</p></div>
          </aside>
          <article class="question-panel">
            <div class="question-meta"><span class="question-tag type">${esc(typeLabel(question))}</span><span class="question-tag">${esc(question.difficulty)}</span><span class="question-tag">Balanced diagnostic</span></div>
            ${question.context ? `<div class="scenario-context"><strong>Situation:</strong> ${esc(question.context)}</div>` : ""}
            <h1>${esc(question.question)}</h1>
            <p class="question-instruction">${esc(instruction(question))}</p>
            ${optionsMarkup(question, Boolean(isFeedback))}
            ${isFeedback ? feedbackMarkup(question, answered) : `<div class="question-actions"><span class="selection-status">${esc(selectionStatus(question))}</span><div class="button-row">${question.type === "sequence" && responseArray().length ? `<button class="btn btn-outline" type="button" data-action="sequence-reset">Reset order</button>` : ""}<button class="btn btn-dark" type="button" data-action="submit" ${isValidResponse(question) ? "" : "disabled"}>Submit answer</button></div></div>`}
          </article>
        </div>
      </section>`;
    setPage(`Question ${state.index + 1}`, null, !preserveScroll);
    if (preserveScroll) requestAnimationFrame(() => window.scrollTo(0, previousScroll));
  }

  function selectOption(value) {
    const question = currentQuestion();
    if (!question || state.showFeedback) return;
    ensureDraft(question);
    if (question.type === "multi") {
      const selected = new Set(responseArray());
      if (selected.has(value)) selected.delete(value);
      else if (selected.size < question.required) selected.add(value);
      else {
        showToast(`Select exactly ${question.required} options. Remove one before adding another.`);
        return;
      }
      state.draft.response = [...selected];
    } else {
      state.draft.response = value;
    }
    saveState();
    renderQuestion(true);
  }

  function addSequenceValue(value) {
    const question = currentQuestion();
    if (!question || question.type !== "sequence" || state.showFeedback) return;
    ensureDraft(question);
    if (!state.draft.response.includes(value)) state.draft.response.push(value);
    saveState();
    renderQuestion(true);
  }

  function submitAnswer() {
    const question = currentQuestion();
    if (!question || !isValidResponse(question)) return;
    const response = Array.isArray(state.draft.response) ? [...state.draft.response] : state.draft.response;
    state.answers[question.id] = {
      response,
      earned: calculateEarned(question, response),
      answeredAt: new Date().toISOString()
    };
    state.showFeedback = true;
    saveState();
    renderQuestion(true);
    requestAnimationFrame(() => document.querySelector(".feedback-card")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function nextQuestion() {
    if (state.index >= state.selectedIds.length - 1) {
      finishAttempt();
      return;
    }
    state.index += 1;
    state.draft = null;
    state.showFeedback = false;
    saveState();
    renderQuestion();
  }

  function computeResults() {
    const areaResults = DATA.areas.map((area) => {
      const questions = state.selectedIds.filter((id) => questionById[id].area === area.id);
      const earned = questions.reduce((sum, id) => sum + (state.answers[id]?.earned || 0), 0);
      return { areaId: area.id, score: Math.round(earned / questions.length * 100), count: questions.length };
    });
    const all = answeredItems();
    const overall = all.length ? Math.round(all.reduce((sum, answer) => sum + answer.earned, 0) / all.length * 100) : 0;
    return { overall, areaResults, completedAt: new Date().toISOString() };
  }

  function finishAttempt() {
    state.finished = true;
    state.finishedAt = new Date().toISOString();
    state.lastResult = computeResults();
    state.draft = null;
    state.showFeedback = false;
    saveState();
    history.pushState(null, "", "#results");
    renderRoute();
  }

  function resultLevel(score) {
    if (score >= 85) return { title: "Decision-ready foundation", text: "You consistently connect environmental ambition with boundaries, evidence, operational constraints and verification." };
    if (score >= 70) return { title: "Strong systems thinker", text: "Your reasoning is well developed. Targeted review in the lower-scoring areas will make your decisions more consistent." };
    if (score >= 55) return { title: "Developing decision lens", text: "You recognise many core ideas, but some evidence gaps or trade-offs still need a more systematic response." };
    return { title: "Build the foundations", text: "This is a useful baseline. Work through the recommended modules, then retake the diagnostic with a stronger decision method." };
  }

  function renderResults(result = state.lastResult) {
    if (!result) {
      renderHome();
      return;
    }
    const level = resultLevel(result.overall);
    const sorted = [...result.areaResults].sort((a, b) => a.score - b.score);
    const recommendations = sorted.slice(0, 3);
    app.innerHTML = `
      <section class="results-page"><div class="shell">
        <div class="results-hero">
          <div><div class="eyebrow light">Knowledge check complete</div><h1>${esc(level.title)}</h1><p>${esc(level.text)}</p><div class="meta-row"><span class="meta-chip">18 questions</span><span class="meta-chip">6 areas assessed</span><span class="meta-chip">Personal learning plan ready</span></div></div>
          <div class="score-ring" style="--score:${result.overall}" aria-label="Overall score ${result.overall} percent"><div class="score-ring-inner"><strong>${result.overall}%</strong><span>overall score</span></div></div>
        </div>

        <div class="results-grid">
          <section class="results-panel"><div class="eyebrow">Your profile</div><h2>Performance by decision area</h2><div class="domain-results">
            ${result.areaResults.map((item) => {
              const area = areaById[item.areaId];
              const label = item.score >= 80 ? "Strength" : item.score >= 60 ? "Developing" : "Priority review";
              return `<article class="domain-result" style="--area:${esc(area.colour)}"><div class="domain-result-head"><strong>${esc(area.title)}</strong><span>${item.score}%</span></div><div class="domain-bar"><span style="width:${item.score}%"></span></div><small>${label} · based on ${item.count} balanced questions</small></article>`;
            }).join("")}
          </div></section>

          <section class="results-panel"><div class="eyebrow">Recommended next steps</div><h2>Your learning plan</h2><div class="recommendation-list">
            ${recommendations.map((item, index) => {
              const area = areaById[item.areaId];
              const priorityLabel = item.score < 60 ? `Priority ${index + 1}` : item.score < 80 ? "Reinforce" : "Maintain";
              return `<article class="recommendation" style="--area:${esc(area.colour)}"><div class="rec-top"><h3>${esc(area.short)}</h3><span class="priority">${esc(priorityLabel)}</span></div><p>${esc(area.advice)}</p><a href="${esc(area.foundationsUrl)}" target="_blank" rel="noopener noreferrer">Open ${esc(area.foundationsModule)} ↗</a></article>`;
            }).join("")}
          </div></section>
        </div>

        <div class="results-actions"><p>Downloadable results are generated locally and contain no personal identifiers.</p><div class="button-row"><button class="btn btn-primary" type="button" data-action="download">Download my learning plan</button><button class="btn btn-secondary" type="button" data-action="restart">Retake with new questions</button><a class="btn btn-secondary" href="#sources">Review evidence base</a></div></div>
      </div></section>`;
    setPage("Results", null);
  }

  function downloadPlan() {
    const result = state.lastResult;
    if (!result) return;
    const level = resultLevel(result.overall);
    const sorted = [...result.areaResults].sort((a, b) => a.score - b.score);
    const lines = [
      DATA.meta.title,
      `${DATA.meta.context} context`,
      `Completed: ${new Date(result.completedAt).toLocaleString("en-GB")}`,
      "",
      `OVERALL RESULT: ${result.overall}% · ${level.title}`,
      level.text,
      "",
      "PERFORMANCE BY AREA",
      ...result.areaResults.map((item) => `${areaById[item.areaId].title}: ${item.score}%`),
      "",
      "PERSONAL LEARNING PRIORITIES",
      ...sorted.slice(0, 3).flatMap((item, index) => {
        const area = areaById[item.areaId];
        return [
          `${index + 1}. ${area.title} · ${item.score}%`,
          area.advice,
          `${area.foundationsModule}: ${area.foundationsUrl}`,
          ""
        ];
      }),
      "EDUCATIONAL NOTICE",
      "This exploratory result is not a certification of competence. It does not replace controlled policies, procedures, legal advice, technical authorisation, targets or corporate positions.",
      `Evidence reviewed: ${DATA.meta.reviewed}`
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sustainability_Knowledge_Check_Learning_Plan.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Learning plan downloaded.");
  }

  function renderRoute() {
    const route = (location.hash || "#home").slice(1).split("/")[0];
    if (route === "home" || !route) renderHome();
    else if (route === "about") renderAbout();
    else if (route === "sources") renderSources();
    else if (route === "check") {
      if (!state.selectedIds.length || state.finished) renderHome();
      else renderQuestion();
    } else if (route === "results") renderResults();
    else renderHome();
  }

  app.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    const action = trigger.dataset.action;
    if (action === "start" || action === "restart") startNewAttempt();
    else if (action === "resume") {
      history.pushState(null, "", "#check");
      renderRoute();
    } else if (action === "last-results") renderResults(state.lastResult);
    else if (action === "select") selectOption(trigger.dataset.value);
    else if (action === "sequence-add") addSequenceValue(trigger.dataset.value);
    else if (action === "sequence-reset") {
      state.draft.response = [];
      saveState();
      renderQuestion(true);
    } else if (action === "submit") submitAnswer();
    else if (action === "next") nextQuestion();
    else if (action === "download") downloadPlan();
  });

  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("popstate", renderRoute);
  renderRoute();
})();
