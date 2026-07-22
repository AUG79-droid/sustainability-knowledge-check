# Sustainability Knowledge Check · v1.0 validation

Validated 22 July 2026.

## Content

- 6 decision areas.
- 36-question bank: 6 questions per area.
- 18 balanced questions per attempt: exactly 3 questions per area.
- 12 decision scenarios.
- 7 single-choice questions.
- 7 multiple-selection questions.
- 6 true/false questions.
- 4 sequencing questions.
- 12 public primary or official evidence sources.
- 4,694 words in the structured learning dataset.

## Functional checks

- A complete 18-question perfect-answer path returns 100% overall and 100% in all six areas.
- Multiple-selection partial credit and false-positive penalties are implemented.
- Sequence partial credit is calculated by correct position.
- Immediate feedback, correct-answer reveal and evidence links work for every interaction type.
- Progress, current answer state and latest result persist in browser storage.
- The personal learning plan downloads as a local text file.
- A new attempt selects a fresh balanced set without modifying the 36-question bank.

## Visual and accessibility checks

- Chromium desktop: home, question, feedback, results and evidence base reviewed.
- Chromium mobile at 390 × 844: home and question reviewed.
- No horizontal overflow or console errors detected.
- Semantic buttons, visible keyboard focus, skip link, responsive layout and reduced-motion support included.
- All production images load locally; the app has no runtime dependency on external fonts or image services.

## Content guardrails

- No A350, Airbus Commercial, Commercial Aircraft or “six pillars” framing.
- Airbus Defence and Space is presented as context, not as a claim of official approval.
- Scenarios use fictional composite learning situations.
- Questions show operational, technical, quality and resilience constraints alongside environmental effects.
- Educational notice states that the app does not replace controlled policy, procedures, legal advice, technical authorisation, targets or corporate positions.

