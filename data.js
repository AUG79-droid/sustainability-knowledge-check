window.SKC_DATA = {
  meta: {
    title: "Sustainability Knowledge Check",
    context: "Airbus Defence and Space",
    duration: "15–20 minutes",
    reviewed: "22 July 2026",
    version: "1.0",
    foundationsUrl: "https://aug79-droid.github.io/sustainable-aviation-foundations/"
  },

  areas: [
    {
      id: "systems",
      code: "01",
      short: "Systems & evidence",
      title: "Decision Systems & Evidence",
      colour: "#36d8c4",
      image: "assets/m1-decision-room.jpg",
      foundationsModule: "M1 · Sustainability as a Decision System",
      foundationsUrl: "https://aug79-droid.github.io/sustainable-aviation-foundations/#module/m1",
      description: "Baselines, boundaries, evidence quality, trade-offs and control.",
      advice: "Reinforce how purpose, baseline, boundary, evidence, trade-offs and ownership turn an environmental idea into a defensible decision."
    },
    {
      id: "lifecycle",
      code: "02",
      short: "Lifecycle & materials",
      title: "Lifecycle, Circularity & Materials",
      colour: "#f3bf64",
      image: "assets/m2-material-review.jpg",
      foundationsModule: "M2 · Lifecycle, Circularity & Materials",
      foundationsUrl: "https://aug79-droid.github.io/sustainable-aviation-foundations/#module/m2",
      description: "Functional units, value retention, waste hierarchy and repairability.",
      advice: "Revisit lifecycle boundaries, functional comparison and the safe value-retention ladder before calling an option circular or lower-impact."
    },
    {
      id: "digital",
      code: "03",
      short: "Energy & digital",
      title: "Energy, Data & Digital Decisions",
      colour: "#5ab5ff",
      image: "assets/m3-digital-design.jpg",
      foundationsModule: "M3 · Digital Innovation & Environmental Evidence",
      foundationsUrl: "https://aug79-droid.github.io/sustainable-aviation-foundations/#module/m3",
      description: "Energy performance, data lineage, AI oversight and net value.",
      advice: "Strengthen data-quality checks and distinguish a promising digital output from a verified environmental outcome."
    },
    {
      id: "people",
      code: "04",
      short: "People & improvement",
      title: "People, Skills & Improvement Culture",
      colour: "#a58bff",
      image: "assets/m4-team-learning.jpg",
      foundationsModule: "M4 · People, Skills & Improvement Culture",
      foundationsUrl: "https://aug79-droid.github.io/sustainable-aviation-foundations/#module/m4",
      description: "Competence, weak signals, controlled trials and learning loops.",
      advice: "Focus on the difference between awareness, competence, authority and a controlled improvement experiment."
    },
    {
      id: "valuechain",
      code: "05",
      short: "Value chain & substances",
      title: "Responsible & Resilient Value Chain",
      colour: "#ff8e72",
      image: "assets/m5-value-chain-review.jpg",
      foundationsModule: "M5 · Responsible & Resilient Value Chain",
      foundationsUrl: "https://aug79-droid.github.io/sustainable-aviation-foundations/#module/m5",
      description: "Supplier evidence, resilience, chemicals and due diligence.",
      advice: "Review evidence-based supplier due diligence, substance traceability and resilience responses beyond questionnaires or urgent logistics."
    },
    {
      id: "nature",
      code: "06",
      short: "Climate & nature",
      title: "Climate, Nature & Biodiversity",
      colour: "#8ed36e",
      image: "assets/m6-site-wetland.jpg",
      foundationsModule: "M6 · Climate, Nature & Biodiversity",
      foundationsUrl: "https://aug79-droid.github.io/sustainable-aviation-foundations/#module/m6",
      description: "Mitigation, adaptation, location, dependencies and outcomes.",
      advice: "Reinforce the difference between carbon, climate adaptation and nature outcomes, then apply location-based assessment and the mitigation hierarchy."
    }
  ],

  questions: [
    {
      id: "sys-01", area: "systems", type: "scenario", difficulty: "Applied",
      context: "A workshop reports a 14% reduction in electricity per accepted part after a preparation step moves to an external supplier. Supplier energy data are not yet available and transport has increased.",
      question: "What is the strongest next step before presenting the 14% as an overall improvement?",
      options: [
        { id: "a", text: "Publish the result because the workshop meter is direct evidence." },
        { id: "b", text: "Rebuild the baseline and system boundary, estimate the transferred step and test whether plausible values change the conclusion." },
        { id: "c", text: "Exclude supplier energy because it is outside the site boundary." },
        { id: "d", text: "Wait for perfect primary data before making any operational decision." }
      ],
      correct: "b",
      explanation: "The local result may be real, but the functional boundary changed. A defensible comparison keeps the service delivered equivalent and makes transferred burdens visible. Ranges and sensitivity analysis can support a decision while better data are collected.",
      lens: "A better local indicator is not automatically a better system outcome.",
      source: "iso-14001"
    },
    {
      id: "sys-02", area: "systems", type: "truefalse", difficulty: "Foundation",
      question: "A completed environmental action is sufficient evidence that environmental performance improved.",
      options: [
        { id: "true", text: "True" },
        { id: "false", text: "False" }
      ],
      correct: "false",
      explanation: "Completion proves that an activity occurred. Performance improvement requires an outcome indicator, a credible baseline, a defined boundary and enough time or data to assess the result.",
      lens: "Track the condition or performance that the action was intended to change.",
      source: "iso-14001"
    },
    {
      id: "sys-03", area: "systems", type: "multi", difficulty: "Applied", required: 4,
      question: "Which four elements most strengthen an environmental performance claim?",
      options: [
        { id: "a", text: "A stated baseline and comparison period" },
        { id: "b", text: "A clear system boundary and functional scope" },
        { id: "c", text: "A visually impressive percentage" },
        { id: "d", text: "The calculation method, data quality and limitations" },
        { id: "e", text: "An owner and a plan to verify the result" },
        { id: "f", text: "A positive adjective such as green or clean" }
      ],
      correct: ["a", "b", "d", "e"],
      explanation: "A credible claim lets another reviewer understand what changed, compared with what, inside which boundary, using which evidence and under whose control. Design language cannot replace that chain.",
      lens: "If the evidence trail cannot be reconstructed, the claim is not decision-ready.",
      source: "iso-14001"
    },
    {
      id: "sys-04", area: "systems", type: "single", difficulty: "Foundation",
      question: "Why can a reduction in total annual waste be misleading when production volume also falls?",
      options: [
        { id: "a", text: "Waste data should never be normalised." },
        { id: "b", text: "The absolute reduction may reflect activity level rather than process improvement." },
        { id: "c", text: "Only financial data can explain waste performance." },
        { id: "d", text: "A lower total is always sufficient for an environmental objective." }
      ],
      correct: "b",
      explanation: "Absolute performance matters, but a process claim also needs a relevant activity denominator, yield or other context. Both absolute and intensity indicators can be needed to understand the result.",
      lens: "Ask what changed in the process and what changed in the workload.",
      source: "iso-14001"
    },
    {
      id: "sys-05", area: "systems", type: "scenario", difficulty: "Challenge",
      context: "A maintenance option improves mission availability but requires urgent transport and a larger stock of short-life spares. A second option is slower to deploy but reduces emergency logistics and obsolescence risk.",
      question: "Which decision approach is most robust?",
      options: [
        { id: "a", text: "Select only the option with the lowest estimated carbon impact." },
        { id: "b", text: "Select only the option with the highest availability." },
        { id: "c", text: "Define the mission requirement as a constraint, compare lifecycle and resilience effects, and make the trade-off explicit." },
        { id: "d", text: "Average the two options without checking whether either meets the mission need." }
      ],
      correct: "c",
      explanation: "Sustainability does not remove operational requirements. It improves the quality of the decision by protecting the required function while testing logistics, stock, lifetime, obsolescence and environmental effects together.",
      lens: "The purpose is a constraint; evidence and trade-offs shape how it is achieved.",
      source: "airbus-lifecycle"
    },
    {
      id: "sys-06", area: "systems", type: "single", difficulty: "Applied",
      question: "Which statement best describes uncertainty in a sustainability decision?",
      options: [
        { id: "a", text: "Uncertainty means no decision can be made." },
        { id: "b", text: "Uncertainty should be hidden until the analysis is complete." },
        { id: "c", text: "Uncertainty should be expressed as ranges or conditions and tested against the decision." },
        { id: "d", text: "Uncertainty matters only in financial estimates." }
      ],
      correct: "c",
      explanation: "Not every gap blocks action. The key question is whether plausible uncertainty could reverse the preferred option, breach a constraint or change the control plan.",
      lens: "Improve evidence where uncertainty is decision-critical.",
      source: "iso-14001"
    },

    {
      id: "life-01", area: "lifecycle", type: "sequence", difficulty: "Foundation",
      question: "Place the EU waste hierarchy in order, from the most preferred option to the least preferred.",
      options: [
        { id: "recycle", text: "Recycling" },
        { id: "dispose", text: "Disposal" },
        { id: "prevent", text: "Prevention" },
        { id: "recover", text: "Other recovery" },
        { id: "reuse", text: "Preparing for reuse" }
      ],
      correct: ["prevent", "reuse", "recycle", "recover", "dispose"],
      explanation: "The hierarchy prioritises preventing waste, then preparing items for reuse, recycling materials, other recovery and finally disposal. Technical, legal and safety conditions still apply to each route.",
      lens: "Recycling is valuable, but it is not the first question.",
      source: "eu-waste"
    },
    {
      id: "life-02", area: "lifecycle", type: "scenario", difficulty: "Challenge",
      context: "Concept A is lighter but uses a bonded multi-material architecture with no demonstrated repair route. Concept B is slightly heavier and has accessible replaceable sections.",
      question: "What is the best conclusion at an early design gate?",
      options: [
        { id: "a", text: "Select A because lower mass always means lower lifecycle impact." },
        { id: "b", text: "Select B because repairability always outweighs use-stage performance." },
        { id: "c", text: "Compare representative service and damage scenarios, and require evidence on repair, replacement and end-of-life routes before selecting." },
        { id: "d", text: "Ignore maintenance because it happens after design." }
      ],
      correct: "c",
      explanation: "Mass is important, but lifecycle performance depends on the functional unit, manufacturing, service life, damage, repair, replacement and end-of-life assumptions. Early screens should identify decision-critical evidence, not manufacture certainty.",
      lens: "Compare equivalent function across representative lifecycle scenarios.",
      source: "iso-14040"
    },
    {
      id: "life-03", area: "lifecycle", type: "single", difficulty: "Foundation",
      question: "What is the main purpose of a functional unit in a lifecycle comparison?",
      options: [
        { id: "a", text: "To make every option weigh one kilogram" },
        { id: "b", text: "To define the equivalent function against which inputs and outputs are compared" },
        { id: "c", text: "To remove the need for a system boundary" },
        { id: "d", text: "To convert every impact into cost" }
      ],
      correct: "b",
      explanation: "Options must be compared on an equivalent service or function. Comparing one component, kilogram or purchase without equivalent performance can favour an option that delivers less or shifts work elsewhere.",
      lens: "Equal quantities are not necessarily equal functions.",
      source: "iso-14040"
    },
    {
      id: "life-04", area: "lifecycle", type: "multi", difficulty: "Applied", required: 3,
      question: "A recycler accepts a segregated metal stream. Which three checks are still needed before claiming high-value recycling?",
      options: [
        { id: "a", text: "The verified downstream treatment route" },
        { id: "b", text: "The retained material quality or destination" },
        { id: "c", text: "The colour of the collection container" },
        { id: "d", text: "Losses, residues and rejected fractions" },
        { id: "e", text: "The number of internal posts about recycling" }
      ],
      correct: ["a", "b", "d"],
      explanation: "Transfer to an authorised route is essential, but acceptance alone does not describe retained value. Treatment, recovered quality, losses and residues determine what outcome the stream actually achieves.",
      lens: "Measure the route and outcome, not just the handover.",
      source: "eu-waste"
    },
    {
      id: "life-05", area: "lifecycle", type: "scenario", difficulty: "Applied",
      context: "A fixture has reached its planned replacement date. Inspection shows it remains within tolerance and its history is complete.",
      question: "Which response best follows circularity and technical control?",
      options: [
        { id: "a", text: "Keep using it indefinitely because reuse is always preferable." },
        { id: "b", text: "Discard it because the calendar date is the only valid criterion." },
        { id: "c", text: "Use the approved engineering and maintenance process to assess safe life extension, then document the decision and monitoring conditions." },
        { id: "d", text: "Donate it without checking ownership, condition or intended use." }
      ],
      correct: "c",
      explanation: "Value retention must remain inside approved technical, legal and safety controls. Condition, configuration, history, authority and monitoring determine whether life extension is responsible.",
      lens: "Circularity is controlled value retention, not uncontrolled life extension.",
      source: "airbus-lifecycle"
    },
    {
      id: "life-06", area: "lifecycle", type: "truefalse", difficulty: "Applied",
      question: "Replacing a hazardous material with a lower-hazard alternative automatically reduces total lifecycle impact.",
      options: [
        { id: "true", text: "True" },
        { id: "false", text: "False" }
      ],
      correct: "false",
      explanation: "Hazard reduction may be a major benefit, but the alternative must still meet technical requirements and be assessed for quantity, process, energy, waste, durability and other relevant effects. Regrettable substitution must be avoided.",
      lens: "Substitution needs both hazard insight and lifecycle evidence.",
      source: "echa-candidate"
    },

    {
      id: "dig-01", area: "digital", type: "scenario", difficulty: "Challenge",
      context: "An AI model recommends low-energy standby periods. Average validation accuracy is high, but the training data contain few winter start-ups and operators cannot see the confidence level.",
      question: "What should happen before automated deployment?",
      options: [
        { id: "a", text: "Deploy immediately because average accuracy is high." },
        { id: "b", text: "Validate by operating condition and consequence, expose uncertainty, define human oversight and run a controlled trial." },
        { id: "c", text: "Reject every AI application because models are never reliable." },
        { id: "d", text: "Measure only computing energy and ignore process outcomes." }
      ],
      correct: "b",
      explanation: "Average performance can hide weak conditions with operational consequences. Meaningful oversight requires information, competence, time and authority, followed by a bounded trial that measures the net environmental and operational outcome.",
      lens: "A model score is not the same as a safe, useful intervention.",
      source: "eu-ai-act"
    },
    {
      id: "dig-02", area: "digital", type: "multi", difficulty: "Applied", required: 4,
      question: "Which four data-lineage elements should accompany an environmental KPI?",
      options: [
        { id: "a", text: "Unit, timestamp and measurement context" },
        { id: "b", text: "Source, owner and quality status" },
        { id: "c", text: "Transformation formula and version" },
        { id: "d", text: "Boundary, allocation rule and exclusions" },
        { id: "e", text: "A dashboard colour chosen by the presenter" },
        { id: "f", text: "Only the final rounded value" }
      ],
      correct: ["a", "b", "c", "d"],
      explanation: "A KPI must be reproducible and interpretable. Lineage connects the physical event to the displayed value and makes data gaps, allocation choices and revisions visible.",
      lens: "Preserve enough context to reproduce the number and challenge its meaning.",
      source: "iso-50001"
    },
    {
      id: "dig-03", area: "digital", type: "truefalse", difficulty: "Foundation",
      question: "A digital tool creates environmental value as soon as it predicts a saving.",
      options: [
        { id: "true", text: "True" },
        { id: "false", text: "False" }
      ],
      correct: "false",
      explanation: "A prediction creates value only when it changes an authorised action and the outcome is verified against a credible counterfactual. Hardware, computation, storage and rebound effects may also matter.",
      lens: "Trace the chain from signal to action to verified outcome.",
      source: "eu-ai-act"
    },
    {
      id: "dig-04", area: "digital", type: "scenario", difficulty: "Applied",
      context: "Energy per processed part falls by 9%, while rejection and rework increase. The dashboard reports only energy per processed part.",
      question: "Which metric change is most urgent?",
      options: [
        { id: "a", text: "Use a brighter dashboard colour." },
        { id: "b", text: "Normalise to accepted functional output and include rework, total energy and quality guardrails." },
        { id: "c", text: "Remove quality data because it is not environmental." },
        { id: "d", text: "Report only the lowest-performing week." }
      ],
      correct: "b",
      explanation: "A denominator that includes rejected output can create a false efficiency signal. Accepted function, total burden and operational guardrails reveal whether the process really improved.",
      lens: "Optimise the useful outcome, not a convenient denominator.",
      source: "iso-50001"
    },
    {
      id: "dig-05", area: "digital", type: "single", difficulty: "Applied",
      question: "Which statement best describes meaningful human oversight of an automated environmental recommendation?",
      options: [
        { id: "a", text: "A person clicks approve without seeing uncertainty or alternatives." },
        { id: "b", text: "A competent person can understand the recommendation, challenge it and stop or change the action." },
        { id: "c", text: "The model is reviewed only after an incident." },
        { id: "d", text: "Every recommendation is printed for record keeping." }
      ],
      correct: "b",
      explanation: "Oversight is meaningful when the reviewer has relevant information, competence, time and decision authority. Ceremonial approval does not control model limitations.",
      lens: "Oversight must be capable of changing the outcome.",
      source: "eu-ai-act"
    },
    {
      id: "dig-06", area: "digital", type: "multi", difficulty: "Challenge", required: 3,
      question: "Which three effects belong in the net-value review of a digital optimisation project?",
      options: [
        { id: "a", text: "Verified operational burden avoided" },
        { id: "b", text: "Computing, hardware, storage and maintenance burden" },
        { id: "c", text: "Transfer or rebound that changes total use" },
        { id: "d", text: "The number of algorithm parameters as a success metric" },
        { id: "e", text: "The visual complexity of the interface" }
      ],
      correct: ["a", "b", "c"],
      explanation: "The environmental case is the difference between credible avoided burden and the digital system's own burden, while checking whether impact moves or total use rebounds.",
      lens: "More sophisticated technology is not automatically more sustainable.",
      source: "iso-50001"
    },

    {
      id: "ppl-01", area: "people", type: "scenario", difficulty: "Applied",
      context: "A technician notices repeated compressed-air leakage during a shift, but has no complete cost estimate and is unsure which team owns the system.",
      question: "What is the healthiest improvement response?",
      options: [
        { id: "a", text: "Reject the observation until the technician provides a full business case." },
        { id: "b", text: "Capture the signal, assign an owner, verify the pattern and run the smallest safe representative test." },
        { id: "c", text: "Announce a site-wide saving before measurement." },
        { id: "d", text: "Repair every suspected point without checking isolation or authorisation." }
      ],
      correct: "b",
      explanation: "People who see weak signals should have an easy route into the system. The organisation then frames the problem, assigns competence and authority, tests safely and measures the result.",
      lens: "The observer does not need to arrive with a completed investment case.",
      source: "greencomp"
    },
    {
      id: "ppl-02", area: "people", type: "truefalse", difficulty: "Foundation",
      question: "Attendance at a sustainability course is sufficient evidence that someone is competent to make a controlled technical decision.",
      options: [
        { id: "true", text: "True" },
        { id: "false", text: "False" }
      ],
      correct: "false",
      explanation: "Attendance supports awareness or knowledge. Competence may require demonstrated skill and judgement, while technical authorisation is a separate approved decision right.",
      lens: "Awareness, competence and authority are related but different.",
      source: "iso-14001"
    },
    {
      id: "ppl-03", area: "people", type: "multi", difficulty: "Applied", required: 4,
      question: "Which four features belong in a controlled environmental improvement trial?",
      options: [
        { id: "a", text: "A defined baseline and success criteria" },
        { id: "b", text: "Safety, quality and operational guardrails" },
        { id: "c", text: "An owner, measurement method and review date" },
        { id: "d", text: "Stop, adapt or escalation conditions" },
        { id: "e", text: "A commitment to scale before results exist" },
        { id: "f", text: "Only favourable observations in the final summary" }
      ],
      correct: ["a", "b", "c", "d"],
      explanation: "A good trial is designed to learn safely. Criteria and guardrails are set before results appear, responsibilities are clear, and negative findings can lead to adaptation or stopping.",
      lens: "A pilot is a controlled learning mechanism, not a small publicity campaign.",
      source: "greencomp"
    },
    {
      id: "ppl-04", area: "people", type: "single", difficulty: "Foundation",
      question: "Which evidence best demonstrates practical competence for a defined environmental task?",
      options: [
        { id: "a", text: "A calendar invitation" },
        { id: "b", text: "Observed performance or a work sample using the correct method" },
        { id: "c", text: "A promotional poster" },
        { id: "d", text: "A self-declared job title" }
      ],
      correct: "b",
      explanation: "Knowledge checks can support assessment, but practical competence is better evidenced by correct performance in representative conditions, with relevant criteria and feedback.",
      lens: "Assess the capability required by the work, not course attendance alone.",
      source: "iso-14001"
    },
    {
      id: "ppl-05", area: "people", type: "scenario", difficulty: "Challenge",
      context: "A successful energy-saving trial is proposed for immediate rollout across several workshops. The sites use different equipment, schedules and measurement systems.",
      question: "What should be transferred first?",
      options: [
        { id: "a", text: "The headline saving percentage without context" },
        { id: "b", text: "The method, assumptions, guardrails, evidence and conditions under which the trial worked" },
        { id: "c", text: "Only the name of the original project" },
        { id: "d", text: "The exact operating setting, regardless of local equipment" }
      ],
      correct: "b",
      explanation: "Scaling requires transfer conditions. Local teams need to know how the result was produced, which constraints mattered and what must be validated before adoption.",
      lens: "Reuse the learning method, not a context-free percentage.",
      source: "greencomp"
    },
    {
      id: "ppl-06", area: "people", type: "sequence", difficulty: "Applied",
      question: "Order the improvement learning loop from the first signal to reusable learning.",
      options: [
        { id: "share", text: "Share evidence and transfer conditions" },
        { id: "test", text: "Run a safe bounded test" },
        { id: "observe", text: "Observe and capture the signal" },
        { id: "decide", text: "Decide to stop, adapt, scale or standardise" },
        { id: "frame", text: "Frame purpose, baseline and boundary" },
        { id: "measure", text: "Measure outcomes and unintended effects" }
      ],
      correct: ["observe", "frame", "test", "measure", "decide", "share"],
      explanation: "The loop protects both curiosity and control: observe, frame, test, measure, decide and share. Skipping framing or measurement turns activity into anecdote.",
      lens: "Learning becomes reusable when the evidence and conditions travel with it.",
      source: "greencomp"
    },

    {
      id: "val-01", area: "valuechain", type: "scenario", difficulty: "Applied",
      context: "A critical supplier confirms technical conformity but cannot provide current substance composition evidence for a process chemical flagged for review.",
      question: "What is the best immediate response?",
      options: [
        { id: "a", text: "Assume compliance because the part passed inspection." },
        { id: "b", text: "Clarify the evidence gap through the approved substances and supplier process, assess exposure and consequence, and define an escalation path." },
        { id: "c", text: "Terminate the supplier without technical or supply assessment." },
        { id: "d", text: "Remove the chemical name from the record." }
      ],
      correct: "b",
      explanation: "Technical conformity does not answer every chemical obligation or future risk. The gap needs an approved evidence route, risk-based prioritisation, ownership and traceable follow-up.",
      lens: "Unknown is a managed evidence state, not permission to assume.",
      source: "echa-candidate"
    },
    {
      id: "val-02", area: "valuechain", type: "truefalse", difficulty: "Foundation",
      question: "A completed supplier sustainability questionnaire is equivalent to evidence that impacts are controlled.",
      options: [
        { id: "true", text: "True" },
        { id: "false", text: "False" }
      ],
      correct: "false",
      explanation: "A questionnaire is a useful screening input. Due diligence also identifies and prioritises impacts, acts on them, tracks effectiveness and retains an evidence trail.",
      lens: "Evidence collection starts the conversation; it does not prove the outcome.",
      source: "oecd-due"
    },
    {
      id: "val-03", area: "valuechain", type: "multi", difficulty: "Applied", required: 4,
      question: "Which four actions can improve both resilience and environmental performance in a constrained supply chain?",
      options: [
        { id: "a", text: "Reduce demand through yield, repair and lifetime improvement" },
        { id: "b", text: "Increase sub-tier visibility and material traceability" },
        { id: "c", text: "Build supplier process and recovery capability" },
        { id: "d", text: "Redesign to remove a critical dependency where justified" },
        { id: "e", text: "Use unlimited buffer stock without an exit condition" },
        { id: "f", text: "Replace evidence with a supplier commitment statement" }
      ],
      correct: ["a", "b", "c", "d"],
      explanation: "Demand reduction, visibility, capability and redesign can address the structure of the risk. Buffers may be useful selectively, but create storage, ageing and obsolescence burdens if unmanaged.",
      lens: "Resilience is a portfolio, not a synonym for more stock.",
      source: "oecd-due"
    },
    {
      id: "val-04", area: "valuechain", type: "scenario", difficulty: "Challenge",
      context: "A water-related disruption affects a supplier of a unique process. Expedited freight protects delivery for one month but adds cost and emissions.",
      question: "Which response is most complete?",
      options: [
        { id: "a", text: "Continue urgent transport indefinitely because delivery is protected." },
        { id: "b", text: "Stop all deliveries to eliminate transport emissions." },
        { id: "c", text: "Use a time-limited continuity measure while assessing supplier recovery, demand reduction, alternatives, redesign and the environmental trade-off." },
        { id: "d", text: "Treat the disruption only as a procurement price issue." }
      ],
      correct: "c",
      explanation: "A short-term buffer or logistics response can be justified by mission need, but it needs an owner, exit condition and structural recovery plan. Resilience and environmental effects should be assessed together.",
      lens: "Protect continuity now while reducing the underlying dependency.",
      source: "airbus-supply-chain"
    },
    {
      id: "val-05", area: "valuechain", type: "single", difficulty: "Applied",
      question: "Why can supplier spend be a weak proxy for environmental risk?",
      options: [
        { id: "a", text: "High-cost items never have environmental impacts." },
        { id: "b", text: "A low-cost process or material can still have high hazard, scarcity, location or continuity consequences." },
        { id: "c", text: "Spend data are illegal to use." },
        { id: "d", text: "Environmental risk is identical for every supplier." }
      ],
      correct: "b",
      explanation: "Risk-based due diligence uses severity, likelihood, dependency, location and leverage, not spend alone. A small purchase can enable a critical or high-impact process.",
      lens: "Prioritise by consequence and pathway, not only purchasing value.",
      source: "oecd-due"
    },
    {
      id: "val-06", area: "valuechain", type: "sequence", difficulty: "Applied",
      question: "Order a risk-based due-diligence cycle from governance to communication.",
      options: [
        { id: "track", text: "Track implementation and outcome" },
        { id: "identify", text: "Identify actual and potential impacts" },
        { id: "embed", text: "Embed expectations and decision rights" },
        { id: "communicate", text: "Communicate action and limitations" },
        { id: "act", text: "Prevent, mitigate, build capability or escalate" },
        { id: "prioritise", text: "Prioritise by risk and consequence" }
      ],
      correct: ["embed", "identify", "prioritise", "act", "track", "communicate"],
      explanation: "Due diligence is a cycle: embed, identify, prioritise, act, track and communicate. New evidence then updates the next round of identification and action.",
      lens: "A commitment becomes credible through action, tracking and transparent limits.",
      source: "oecd-due"
    },

    {
      id: "nat-01", area: "nature", type: "truefalse", difficulty: "Foundation",
      question: "A reduction in greenhouse-gas emissions automatically demonstrates an improvement in biodiversity.",
      options: [
        { id: "true", text: "True" },
        { id: "false", text: "False" }
      ],
      correct: "false",
      explanation: "Climate and nature are connected, but they are not interchangeable. An option can reduce emissions while increasing land, water, pollution or habitat pressure, so relevant outcomes must be assessed separately.",
      lens: "Do not use one environmental indicator as a universal proxy.",
      source: "tnfd-leap"
    },
    {
      id: "nat-02", area: "nature", type: "sequence", difficulty: "Foundation",
      question: "Order the mitigation hierarchy from the first priority to the treatment of remaining impacts.",
      options: [
        { id: "restore", text: "Restore affected condition or function" },
        { id: "residual", text: "Address residual impacts under applicable rules" },
        { id: "avoid", text: "Avoid the impact" },
        { id: "minimise", text: "Minimise the remaining impact" }
      ],
      correct: ["avoid", "minimise", "restore", "residual"],
      explanation: "The hierarchy begins with avoiding the impact, then minimising what cannot be avoided, restoring affected condition or function and only then addressing residual impacts where applicable.",
      lens: "A restoration story must not hide an avoidable impact.",
      source: "sbtn-manual"
    },
    {
      id: "nat-03", area: "nature", type: "scenario", difficulty: "Challenge",
      context: "A logistics redesign would reduce travel distance but move night-time activity closer to a wetland corridor. Current information covers fuel use but not species sensitivity, light or noise pathways.",
      question: "What should happen before approval?",
      options: [
        { id: "a", text: "Approve because lower travel distance proves the option is more sustainable." },
        { id: "b", text: "Reject because any activity near nature is unacceptable." },
        { id: "c", text: "Locate the interface, evaluate dependencies and impact pathways, assess significance and compare avoidance or minimisation options." },
        { id: "d", text: "Install a biodiversity poster in the logistics area." }
      ],
      correct: "c",
      explanation: "Nature-related significance is spatial. The decision needs location, timing, pressure, receptor and cumulative context, followed by the mitigation hierarchy and outcome monitoring.",
      lens: "A climate benefit does not close a nature assessment.",
      source: "tnfd-leap"
    },
    {
      id: "nat-04", area: "nature", type: "multi", difficulty: "Applied", required: 4,
      question: "Which four elements make an industrial-site biodiversity action more credible?",
      options: [
        { id: "a", text: "A baseline condition and location-specific objective" },
        { id: "b", text: "Indicators of ecological use, condition or function" },
        { id: "c", text: "Maintenance, monitoring thresholds and an owner" },
        { id: "d", text: "A review of unintended effects and connectivity" },
        { id: "e", text: "The number of promotional photographs" },
        { id: "f", text: "A claim of success immediately after installation" }
      ],
      correct: ["a", "b", "c", "d"],
      explanation: "Installation is an activity. Credible biodiversity performance links a location-specific baseline and objective to ecological indicators, stewardship, thresholds and adaptation.",
      lens: "Count outcomes and condition, not only objects installed.",
      source: "sbtn-manual"
    },
    {
      id: "nat-05", area: "nature", type: "single", difficulty: "Foundation",
      question: "Which option is climate adaptation rather than climate mitigation?",
      options: [
        { id: "a", text: "Reducing electricity-related greenhouse-gas emissions" },
        { id: "b", text: "Changing drainage and heat-response plans for more intense rainfall and extreme heat" },
        { id: "c", text: "Replacing a fossil fuel with renewable electricity" },
        { id: "d", text: "Avoiding unnecessary transport" }
      ],
      correct: "b",
      explanation: "Mitigation reduces greenhouse-gas sources or increases removals. Adaptation reduces exposure or vulnerability to climate effects. A robust project may need both, plus checks for maladaptation.",
      lens: "Mitigation changes the cause; adaptation changes vulnerability to the effect.",
      source: "iso-14001"
    },
    {
      id: "nat-06", area: "nature", type: "scenario", difficulty: "Applied",
      context: "A new native planting area has been installed. The project team wants to announce a biodiversity gain immediately.",
      question: "Which communication is most defensible?",
      options: [
        { id: "a", text: "Biodiversity has increased because planting is complete." },
        { id: "b", text: "A habitat-supporting action has been implemented; ecological use and condition will be monitored against the baseline before outcome claims are made." },
        { id: "c", text: "The site is now nature positive." },
        { id: "d", text: "Every native plant guarantees the same ecological outcome." }
      ],
      correct: "b",
      explanation: "The installation can be reported accurately as an action. A biodiversity outcome requires time, baseline comparison, ecological indicators and transparent limitations.",
      lens: "Say what has been done; verify what has changed.",
      source: "sbtn-manual"
    }
  ],

  sources: {
    "airbus-lifecycle": {
      organisation: "Airbus",
      title: "Adopting a lifecycle approach",
      url: "https://www.airbus.com/en/sustainability/our-approach-to-sustainability/adopting-a-lifecycle-approach"
    },
    "airbus-supply-chain": {
      organisation: "Airbus",
      title: "Responsible supply chain",
      url: "https://www.airbus.com/en/sustainability/our-approach-to-sustainability/responsible-supply-chain"
    },
    "iso-14001": {
      organisation: "ISO",
      title: "ISO 14001:2026 — Environmental management systems",
      url: "https://www.iso.org/standard/14001"
    },
    "iso-50001": {
      organisation: "ISO",
      title: "ISO 50001 — Energy management",
      url: "https://www.iso.org/iso-50001-energy-management.html"
    },
    "iso-14040": {
      organisation: "ISO",
      title: "ISO 14040 — Life cycle assessment principles and framework",
      url: "https://www.iso.org/standard/37456.html"
    },
    "eu-waste": {
      organisation: "European Commission",
      title: "Waste Framework Directive and waste hierarchy",
      url: "https://environment.ec.europa.eu/topics/waste-and-recycling/waste-framework-directive_en"
    },
    "eu-ai-act": {
      organisation: "European Union",
      title: "Rules for trustworthy Artificial Intelligence in the EU",
      url: "https://eur-lex.europa.eu/EN/legal-content/summary/rules-for-trustworthy-artificial-intelligence-in-the-eu.html"
    },
    "greencomp": {
      organisation: "European Commission Joint Research Centre",
      title: "GreenComp — European sustainability competence framework",
      url: "https://joint-research-centre.ec.europa.eu/greencomp-european-sustainability-competence-framework_en"
    },
    "oecd-due": {
      organisation: "OECD",
      title: "Due diligence for responsible business conduct",
      url: "https://www.oecd.org/en/topics/due-diligence-for-responsible-business-conduct.html"
    },
    "echa-candidate": {
      organisation: "European Chemicals Agency",
      title: "Candidate List of substances of very high concern",
      url: "https://echa.europa.eu/candidate-list-table"
    },
    "tnfd-leap": {
      organisation: "TNFD",
      title: "Guidance on nature-related issues: the LEAP approach",
      url: "https://tnfd.global/publication/additional-guidance-on-assessment-of-nature-related-issues-the-leap-approach/"
    },
    "sbtn-manual": {
      organisation: "Science Based Targets Network",
      title: "Corporate Manual for science-based targets for nature",
      url: "https://sciencebasedtargetsnetwork.org/companies/take-action/corporate-manual/"
    }
  }
};
