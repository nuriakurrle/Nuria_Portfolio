(function(){
const { NURIA, STR, PROJECTS, PROJECT_TAGS, SKILL_CATALOG, Placeholder, MediaGallery, Tabs, ProjectsOverview, DashboardContent, ChatContent, WIPLoadingModal } = window;
const MODE_KEY = "nuria-mode";
const { useState, useEffect, useRef, useMemo } = React;
const STARS = Array.from({ length: 12 }, (_, i) => ({
  x: i * 37 % 95 + 2,
  y: i * 53 % 90 + 4,
  size: 8 + i % 4 * 3,
  delay: i * 0.3 % 3
}));
const WALLPAPERS = {
  "pixel-land": "none",
  /* Y2K pixel-art landscape (CSS-driven) */
  "slate-blue": "linear-gradient(180deg, #3F5E84 0%, #28415F 100%)",
  /* deep steel-navy — recruiter-safe, max contrast for light windows */
  "lilac-sunset": "linear-gradient(160deg, #6F8A8C 0%, #5A7378 50%, #455D6B 100%)",
  /* sage-teal stargazer (image 1) */
  "mint-cloud": "linear-gradient(160deg, #B8CDC8 0%, #C9C4E0 50%, #DDB8C6 100%)",
  /* sage → lavender → rose */
  "pixel-night": "linear-gradient(160deg, #161D2C 0%, #2B3858 50%, #3F4C7C 100%)",
  /* deep cosmos (Galaxy.gif) */
  "peach-sky": "linear-gradient(160deg, #E0CCB5 0%, #DDB8C6 50%, #8FAACA 100%)"
  /* dawn — sand → rose → steel */
};
const ACCENT_OPTIONS = [
  ["#B8B0D8", "#3F4C7C"],
  // lavender / navy
  ["#DDB8C6", "#9F5B73"],
  // dusty rose / mulberry
  ["#8FAACA", "#4D6A85"],
  // steel blue / deep steel
  ["#B8CDC8", "#648a82"]
  // sage / forest
];
const KLIPPI_MESSAGES = {
  desktop: {
    de: [
      "\u{1F44B} Willkommen! Doppelklick auf die Icons, oder \xF6ffne direkt \u{1F4C2} Recruiter.exe f\xFCr den \xDCberblick.",
      "\u{1F52E} Die Logos rechts sind meine Skills, du kannst sie herumziehen und anklicken!",
      "\u{1F31F} Tipp: hover \xFCber einen Skill und die passenden Projekte leuchten auf der linken Seite.",
      "\u{1F3A8} Alles im Y2K-Vibe, enjoy the ride.",
      "\u{1F5BC}\uFE0F Tipp: unten rechts kannst du den Hintergrund wechseln, \u{1F7E6} seri\xF6ses Blau oder \u{1F304} Pixel-Welt.",
      "\u{1F4AC} Fragen? Klick \u{1F4AC} NuriaBot.aim, oder schreib mir eine Mail."
    ],
    en: [
      "\u{1F44B} Welcome! Double-click the icons, or jump straight into \u{1F4C2} Recruiter.exe for the overview.",
      "\u{1F52E} The logos on the right are my skills, drag them around and click them!",
      "\u{1F31F} Tip: hover a skill sticker and the matching project icons light up on the left.",
      "\u{1F3A8} Everything's in Y2K vibes, enjoy the ride.",
      "\u{1F5BC}\uFE0F Tip: switch the background bottom-right, \u{1F7E6} serious blue or \u{1F304} pixel world.",
      "\u{1F4AC} Questions? Click \u{1F4AC} NuriaBot.aim, or just email me."
    ]
  },
  recruiter: {
    de: [
      "\u{1F50D} Meine ausgew\xE4hlten Projekte, jedes hat eine komplette Case Study mit Research, Design und Ergebnissen.",
      "\u{1F4E7} Mail, in LinkedIn oder \u2B07 CV, w\xE4hle was dir am besten passt.",
      "\u{1F3AF} Meine Arbeitsweise: Research zuerst, dann Design, dann Code.",
      '\u{1F447} Klick auf "\u2192 Case Study" um in ein Projekt einzutauchen.',
      "\u{1FA9F} Zu eng? Doppelklick auf die Titelleiste, oder \u25A2 oben rechts, und das Fenster wird gro\xDF."
    ],
    en: [
      "\u{1F50D} My selected projects, each one has a full case study with research, design and results.",
      "\u{1F4E7} Mail, in LinkedIn or \u2B07 CV, pick whichever works best for you.",
      "\u{1F3AF} How I work: research first, then design, then code.",
      '\u{1F447} Hit "\u2192 Case Study" to dive into a project.',
      "\u{1FA9F} Feels cramped? Double-click the title bar, or hit \u25A2 top-right, to make the window bigger."
    ]
  },
  about: {
    de: [
      "\u{1F4DD} Hier erf\xE4hrst du wer ich bin und wie ich ticke.",
      "\u2728 Fair warning: ich liebe gutes Research und ehrliche Reflexion.",
      "\u{1F393} HM M\xFCnchen, 4. Semester, Praxissemester WS 26/27 in M\xFCnchen.",
      "\u{1F30D} Aus Argentinien, jetzt in Ottobrunn bei M\xFCnchen."
    ],
    en: [
      "\u{1F4DD} Find out who I am and how I work.",
      "\u2728 Fair warning: I love research and honest reflection.",
      "\u{1F393} HM Munich, 4th semester, looking for a fall 26/27 internship in Munich.",
      "\u{1F30D} From Argentina, now in Ottobrunn near Munich."
    ]
  },
  projects: {
    de: [
      "\u{1F4C2} Alle 7 Projekte, 5 fertig, 2 in Arbeit.",
      "\u{1F3AF} Klick eines an, um die vollst\xE4ndige Case Study zu \xF6ffnen.",
      "\u{1F4A1} Oder zur\xFCck zu Recruiter.exe f\xFCr den schnellen \xDCberblick."
    ],
    en: [
      "\u{1F4C2} All 7 projects, 5 complete, 2 in progress.",
      "\u{1F3AF} Click one to open its full case study.",
      "\u{1F4A1} Or head back to Recruiter.exe for the quick overview."
    ]
  },
  projectOpen: {
    de: [
      "\u{1FA9F} Tipp zum Start: Doppelklick auf die Titelleiste, oder \u25A2 oben rechts, macht das Fenster gro\xDF.",
      "\u{1F4D6} Einfach scrollen: Outcome \xB7 Identity & Design \xB7 Process \xB7 Reflection, oder klick die Pills unten.",
      "\u{1F4CA} Outcome zuerst: das Ergebnis und der Impact des Projekts.",
      "\u{1F3A8} Identity & Design: was ich gebaut habe, und warum.",
      "\u{1F50D} Process: wie ich das Problem verstanden und erforscht habe.",
      "\u{1F4AD} Reflection: meine Learnings aus dem Projekt.",
      "\u{1F9EA} Oben in der Meta-Zeile siehst du Stack, Rolle und Links."
    ],
    en: [
      "\u{1FA9F} Quick tip: Double-click the title bar, or hit \u25A2 top-right, to make the window bigger.",
      "\u{1F4D6} Just scroll: Outcome \xB7 Identity & Design \xB7 Process \xB7 Reflection, or click the pills at the bottom.",
      "\u{1F4CA} Outcome first: the project's result and impact.",
      "\u{1F3A8} Identity & Design: what I built, and why.",
      "\u{1F50D} Process: how I understood and researched the problem.",
      "\u{1F4AD} Reflection: my takeaways from the project.",
      "\u{1F9EA} The meta bar up top shows the stack, role and links."
    ]
  },
  click: {
    de: [
      "Ouch! Klick auf \u{1F4C4} About_Me.txt, nicht auf mich, um Nuria besser kennenzulernen \u{1F605}",
      "Hey hey, ich bin nur Klippi! Nuria findest du in About_Me.txt \u{1F4C4}",
      "Du kennst das doch von fr\xFCher: Klippi ist da um zu helfen, nicht zum Anklicken \u{1F609}",
      "\u{1F645} Nicht ich! Doppelklick auf die Icons links, die sind die Stars."
    ],
    en: [
      "Ouch! Click \u{1F4C4} About_Me.txt, not me, if you want to get to know Nuria \u{1F605}",
      "Hey hey, I'm just Klippi! You'll find Nuria over in About_Me.txt \u{1F4C4}",
      "You know the drill: Klippi is here to help, not to be clicked \u{1F609}",
      "\u{1F645} Not me! Double-click the icons on the left, they're the stars."
    ]
  }
};
const PROJECT_ICONS = [
  { id: "atolls", label: "Atolls_Hub", emoji: "\u{1F916}", badge: "WS25/26" },
  { id: "echoes", label: "Echoes_MB", emoji: "\u{1F3DB}\uFE0F", badge: "WS25/26" },
  { id: "vinted", label: "Vinted_Rebrand", emoji: "\u{1F6CD}\uFE0F", badge: "SS25" },
  { id: "munichapp", label: "Munich_SuperApp", emoji: "\u{1F3D9}\uFE0F", badge: "SS25" },
  { id: "donbosco", label: "Don_Bosco", emoji: "\u{1F4CB}", badge: "SS26" },
  { id: "clarity", label: "Clarity.app", emoji: "\u{1F4D3}", badge: "SS26" },
  { id: "soulsphere", label: "Soulsphere", emoji: "\u{1F52E}", badge: "WS24" }
];
const SKILL_STICKERS = [
  {
    id: "figma",
    logo: "assets/logos/figma_logo.png",
    label: "Figma",
    level: 4,
    levelLabel: { de: "Stark", en: "Strong" },
    summary: {
      de: "Hi-Fi-Mockups, Design Systems, Prototyping, Brand Bibles.",
      en: "Hi-fi mockups, design systems, prototyping, brand bibles."
    },
    projects: ["atolls", "echoes", "vinted", "munichapp", "donbosco", "clarity"],
    x: 1380,
    y: 195,
    rot: -3,
    mobileX: 0.45,
    mobileY: 220
  },
  {
    id: "ui_ux",
    logo: "assets/logos/ui_ux_logo.png",
    label: "UX \xB7 Research",
    level: 4,
    levelLabel: { de: "Stark", en: "Strong" },
    summary: {
      de: "Interviews, Journey Maps, Empathy & JTBD, Usability Tests.",
      en: "Interviews, journey maps, empathy & JTBD, usability tests."
    },
    projects: ["atolls", "echoes", "munichapp", "donbosco", "clarity"],
    x: 1570,
    y: 180,
    rot: 2,
    mobileX: 0.68,
    mobileY: 200
  },
  {
    id: "react",
    logo: "assets/logos/react_logo.png",
    label: "React \xB7 TS",
    level: 3,
    levelLabel: { de: "Solide", en: "Solid" },
    summary: {
      de: "Komponenten-basierte UIs, Hooks. Dieses Portfolio.",
      en: "Component-based UIs, hooks. This very portfolio."
    },
    projects: ["donbosco", "atolls", "clarity"],
    x: 1190,
    y: 580,
    rot: -2,
    mobileX: 0.86,
    mobileY: 250
  },
  {
    id: "n8n",
    logo: "assets/logos/n8n_logo.png",
    label: "n8n",
    level: 3,
    levelLabel: { de: "Solide", en: "Solid" },
    summary: {
      de: "No-Code Workflows, API-Verkettung, KI-Bots.",
      en: "No-code workflows, API chaining, AI bots."
    },
    projects: ["atolls", "donbosco"],
    x: 1400,
    y: 350,
    rot: 4,
    mobileX: 0.5,
    mobileY: 350
  },
  {
    id: "html_css",
    logo: "assets/logos/html_css_logo.png",
    label: "HTML \xB7 CSS",
    level: 4,
    levelLabel: { de: "Stark", en: "Strong" },
    summary: {
      de: "Semantik, Flexbox, Grid, Animationen.",
      en: "Semantics, flexbox, grid, animations."
    },
    projects: ["atolls", "clarity", "donbosco"],
    x: 1580,
    y: 465,
    rot: -4,
    mobileX: 0.72,
    mobileY: 320
  },
  {
    id: "nodejs",
    logo: "assets/logos/nodejs_logo.png",
    label: "Node.js",
    level: 2,
    levelLabel: { de: "Lernend", en: "Learning" },
    summary: {
      de: "Kleine Skripte, Build-Tools, Server-Setup.",
      en: "Small scripts, build tools, server setup."
    },
    projects: ["donbosco", "atolls"],
    x: 1740,
    y: 360,
    rot: 3,
    mobileX: 0.86,
    mobileY: 380
  },
  {
    id: "python",
    logo: "assets/logos/python.png",
    label: "Python",
    level: 2,
    levelLabel: { de: "Lernend", en: "Learning" },
    summary: {
      de: "Data Wrangling, kleine Automatisierungen.",
      en: "Data wrangling, small automation."
    },
    projects: ["soulsphere", "clarity"],
    x: 1190,
    y: 165,
    rot: -1,
    mobileX: 0.54,
    mobileY: 460
  },
  {
    id: "docker",
    logo: "assets/logos/docker_logo.png",
    label: "Docker",
    level: 2,
    levelLabel: { de: "Lernend", en: "Learning" },
    summary: {
      de: "Container f\xFCr Dev-Setup, einfache Compose-Stacks.",
      en: "Containers for dev setup, simple compose stacks."
    },
    projects: ["clarity", "atolls", "donbosco"],
    x: 1210,
    y: 425,
    rot: 2,
    mobileX: 0.78,
    mobileY: 470
  },
  {
    id: "illustrator",
    logo: "assets/logos/adobe_illustrator.png",
    label: "Illustrator",
    level: 3,
    levelLabel: { de: "Solide", en: "Solid" },
    summary: {
      de: "Vektor-Logos, Icons, Illustrationen, Brand-Assets.",
      en: "Vector logos, icons, illustrations, brand assets."
    },
    projects: ["vinted"],
    x: 1380,
    y: 520,
    rot: -3,
    mobileX: 0.62,
    mobileY: 540
  }
];
const WINDOW_DEFS = {
  dashboard: { icon: "\u{1F5A5}", w: 880, h: 660, x: 100, y: 50, label: "Dashboard" },
  recruiter: { icon: "\u{1F9D1}\u200D\u{1F4BC}", w: 1100, h: 780, x: 60, y: 30, label: "Recruiter" },
  about: { icon: "\u{1F4C4}", w: 1100, h: 780, x: 60, y: 30, label: "About", noMenubar: true, noStatusbar: true },
  projects: { icon: "\u{1F4C2}", w: 480, h: 360, x: 220, y: 100, label: "Projects" },
  atolls: { icon: "\u{1F916}", w: 1100, h: 780, x: 60, y: 30, label: "Atolls" },
  echoes: { icon: "\u{1F3DB}\uFE0F", w: 1100, h: 780, x: 60, y: 30, label: "Echoes" },
  vinted: { icon: "\u{1F6CD}\uFE0F", w: 1100, h: 780, x: 60, y: 30, label: "Vinted" },
  soulsphere: { icon: "\u{1F52E}", w: 1100, h: 780, x: 60, y: 30, label: "Soulsphere" },
  munichapp: { icon: "\u{1F3D9}\uFE0F", w: 1100, h: 780, x: 60, y: 30, label: "MunichApp" },
  donbosco: { icon: "\u{1F4CB}", w: 1100, h: 780, x: 60, y: 30, label: "DonBosco" },
  clarity: { icon: "\u{1F4D3}", w: 1100, h: 780, x: 60, y: 30, label: "Clarity" },
  skills: { icon: "\u2699\uFE0F", w: 580, h: 540, x: 350, y: 50, label: "Skills" },
  cv: { icon: "\u{1F558}", w: 600, h: 560, x: 320, y: 70, label: "CV" },
  contact: { icon: "\u2709\uFE0F", w: 760, h: 640, x: 300, y: 60, label: "Contact" },
  chat: { icon: "\u{1F4AC}", w: 640, h: 520, x: 290, y: 70, label: "NuriaBot", titlebarVariant: "chat" },
  /* Quick Pitch — 60-second elevator console for time-pressed recruiters */
  quickpitch: { icon: "\u{1F3AF}", w: 540, h: 460, x: 380, y: 100, label: "Quick_Pitch.txt" },
  project: { icon: "\u{1F4C1}", w: 1100, h: 780, x: 60, y: 30, label: "Project: Case Study", noMenubar: true, noStatusbar: true }
};
function QuickPitchContent({ lang, openWindow, onDownloadCV }) {
  const lines = lang === "de" ? [
    "> Nuria Kurrle, UX & Service Design",
    "> verf\xFCgbar: WS 26/27 \xB7 M\xFCnchen \xB7 5\u20136 Monate \xB7 Vollzeit",
    "> Studium: B.Sc. Informatik & Design, HM M\xFCnchen, 4. Sem.",
    "> Stack:  React \xB7 TypeScript \xB7 Figma \xB7 n8n \xB7 HTML/CSS",
    "> Research: 6\u201312 Interviews pro Projekt \xB7 DSGVO-clean",
    "> Top 3:  Atolls (-70% HR-Aufwand)",
    ">         Echoes (5 Tests, 3 Generationen)",
    ">         Vinted (komplette Brand-Bibel)",
    "> Solo gebaut: ~60% des Next.js-Frontends von Atolls",
    "> Sprachen: ES \xB7 DE \xB7 EN \xB7 IT",
    "> 8 Sekunden gelesen? Perfekt. Hier deine Optionen:"
  ] : [
    "> Nuria Kurrle, UX & Service Design",
    "> available: Fall 26 / Spring 27 \xB7 Munich \xB7 5\u20136 months \xB7 full-time",
    "> studies: B.Sc. Computer Science & Design, HM Munich, 4th sem.",
    "> stack:  React \xB7 TypeScript \xB7 Figma \xB7 n8n \xB7 HTML/CSS",
    "> research: 6\u201312 interviews per project \xB7 GDPR-clean",
    "> top 3:  Atolls (-70% HR workload)",
    ">        Echoes (5 tests, 3 generations)",
    ">        Vinted (full brand bible)",
    "> solo built: ~60% of Atolls' Next.js frontend",
    "> languages: ES \xB7 DE \xB7 EN \xB7 IT",
    "> 8 seconds read? Perfect. Here are your options:"
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "content quickpitch-content" }, /* @__PURE__ */ React.createElement("div", { className: "quickpitch-terminal" }, /* @__PURE__ */ React.createElement("div", { className: "quickpitch-bar" }, /* @__PURE__ */ React.createElement("span", { className: "quickpitch-dot" }), /* @__PURE__ */ React.createElement("span", null, "quick_pitch.txt: ", lang === "de" ? "60 Sekunden" : "60 seconds"), /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", opacity: 0.7 } }, "cat /portfolio/pitch")), /* @__PURE__ */ React.createElement("div", { className: "quickpitch-body" }, lines.map((line, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "quickpitch-line" }, line)), /* @__PURE__ */ React.createElement("div", { className: "quickpitch-line quickpitch-cursor" }, /* @__PURE__ */ React.createElement("span", { className: "devlog-cursor" }, "_")))), /* @__PURE__ */ React.createElement("div", { className: "quickpitch-cta-row" }, /* @__PURE__ */ React.createElement("a", { className: "pix-btn primary", href: `mailto:${NURIA.email}?subject=${encodeURIComponent(lang === "de" ? "Praxissemester WS 26/27, Nuria Kurrle" : "Internship Fall 26 / Spring 27, Nuria Kurrle")}` }, "\u2709 ", lang === "de" ? "Mail mich" : "Email me"), /* @__PURE__ */ React.createElement("a", { className: "pix-btn", href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, "in LinkedIn"), /* @__PURE__ */ React.createElement("button", { className: "pix-btn warn", type: "button", onClick: onDownloadCV }, "\u2B07 CV \xB7 PDF"), /* @__PURE__ */ React.createElement("button", { className: "pix-btn", type: "button", onClick: () => openWindow("recruiter") }, "\u{1F4C2} ", lang === "de" ? "Recruiter.exe" : "Recruiter.exe")));
}
function WelcomeDialog({ lang, onAction }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  function dismiss(action) {
    setVisible(false);
    onAction == null ? void 0 : onAction(action);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "welcome-dialog-backdrop", onClick: () => dismiss("dismiss"), "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "welcome-dialog", role: "dialog", "aria-label": lang === "de" ? "Willkommen" : "Welcome" }, /* @__PURE__ */ React.createElement("div", { className: "welcome-dialog-bar" }, /* @__PURE__ */ React.createElement("span", { className: "welcome-dialog-bar-icon", "aria-hidden": "true" }, "\u2726"), /* @__PURE__ */ React.createElement("span", { className: "welcome-dialog-bar-title" }, "Nuria \xB7 OS"), /* @__PURE__ */ React.createElement("button", { className: "welcome-dialog-close", onClick: () => dismiss("dismiss"), "aria-label": lang === "de" ? "Schlie\xDFen" : "Close" }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "welcome-dialog-body" }, /* @__PURE__ */ React.createElement("div", { className: "welcome-dialog-icon", "aria-hidden": "true" }, "\u{1F527}"), /* @__PURE__ */ React.createElement("div", { className: "welcome-dialog-text" }, lang === "de" ? "Suchst du jemanden f\xFCrs Praxissemester?" : "Looking for an intern?")), /* @__PURE__ */ React.createElement("div", { className: "welcome-dialog-buttons" }, /* @__PURE__ */ React.createElement("button", { className: "welcome-dialog-btn primary", onClick: () => dismiss("yes") }, lang === "de" ? "Klar, pack mir\u2019s zusammen \u2728" : "Yes, pack it for me \u2728"), /* @__PURE__ */ React.createElement("button", { className: "welcome-dialog-btn", onClick: () => dismiss("explore") }, lang === "de" ? "Nee, lass mich st\xF6bern" : "Nah, let me browse"))));
}
function SkillSticker({ sticker, onBringToFront, onHoverChange, z, highlighted, dim }) {
  const POS_KEY = `nuria-skill-pos-v2-${sticker.id}`;
  const [pos, setPos] = useState(() => {
    var _a, _b;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
    const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
    const mobile = vw < 1100;
    const fallback = mobile ? { x: Math.round(vw * ((_a = sticker.mobileX) != null ? _a : 0.5)), y: (_b = sticker.mobileY) != null ? _b : 250 } : { x: sticker.x, y: sticker.y };
    try {
      const saved = JSON.parse(localStorage.getItem(POS_KEY) || "null");
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
        if (saved.x >= 0 && saved.x <= vw - 30 && saved.y >= 0 && saved.y <= vh - 30) {
          return saved;
        }
      }
    } catch {
    }
    return fallback;
  });
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    const onResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setPos((prev) => {
        var _a, _b;
        const offscreen = prev.x > vw - 30 || prev.y > vh - 30 || prev.x < 0 || prev.y < 0;
        if (!offscreen) return prev;
        const mobile = vw < 1100;
        return mobile ? { x: Math.round(vw * ((_a = sticker.mobileX) != null ? _a : 0.5)), y: (_b = sticker.mobileY) != null ? _b : 250 } : { x: sticker.x, y: sticker.y };
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sticker.x, sticker.y, sticker.mobileX, sticker.mobileY]);
  const onPointerDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    onBringToFront == null ? void 0 : onBringToFront();
    const startX = e.clientX, startY = e.clientY;
    const baseX = pos.x, baseY = pos.y;
    let moved = false;
    let lastX = baseX, lastY = baseY;
    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > 4) {
        moved = true;
        setDragging(true);
      }
      lastX = baseX + dx;
      lastY = baseY + dy;
      setPos({ x: lastX, y: lastY });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setDragging(false);
      if (moved) {
        try {
          localStorage.setItem(POS_KEY, JSON.stringify({ x: lastX, y: lastY }));
        } catch {
        }
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    e.preventDefault();
  };
  return /* @__PURE__ */ React.createElement(
    "img",
    {
      src: sticker.logo,
      alt: sticker.label,
      draggable: false,
      className: `skill-sticker ${dragging ? "dragging" : ""} ${highlighted ? "highlighted" : ""} ${dim ? "dim" : ""}`,
      style: { left: pos.x, top: pos.y, transform: `rotate(${sticker.rot}deg)`, zIndex: z },
      onPointerDown,
      onMouseEnter: () => onHoverChange == null ? void 0 : onHoverChange(sticker.id),
      onMouseLeave: () => onHoverChange == null ? void 0 : onHoverChange(null)
    }
  );
}
function App() {
  const [lang, setLang] = useState("de");
  const t = STR[lang];
  const mode = "playful";
  const calm = false;
  const tweakDefaults = (
    /*EDITMODE-BEGIN*/
    {
      "wallpaper": "slate-blue",
      "accent": ["#B8B0D8", "#3F4C7C"],
      "intensity": 0.6,
      "showPostIts": true,
      "showClippy": true
    }
  );
  const [tweaks, setTweak] = useTweaks(tweakDefaults);
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--wallpaper", WALLPAPERS[tweaks.wallpaper] || WALLPAPERS["lilac-sunset"]);
    r.setProperty("--accent", tweaks.accent[0]);
    r.setProperty("--accent-deep", tweaks.accent[1]);
    r.setProperty("--intensity", calm ? Math.min(tweaks.intensity, 0.2) : tweaks.intensity);
    document.body.classList.toggle("calm-mode", calm);
    document.body.classList.toggle("playful-mode", mode === "playful");
    document.body.dataset.wallpaper = tweaks.wallpaper || "lilac-sunset";
  }, [tweaks, calm, mode]);
  const [desktopRevealed, setDesktopRevealed] = useState(true);
  const revealDesktop = () => setDesktopRevealed(true);
  useEffect(() => {
    document.body.classList.toggle("desktop-collapsed", !desktopRevealed);
  }, [desktopRevealed]);
  const [windows, setWindows] = useState([]);
  const [wipModal, setWipModal] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [booting, setBooting] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const zCounter = useRef(1e3);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const STICKER_Z_MAX = 50;
  const [stickerZ, setStickerZ] = useState(() => {
    const z = {};
    SKILL_STICKERS.forEach((s, i) => {
      z[s.id] = 10 + i;
    });
    return z;
  });
  const bringStickerToFront = (id) => {
    setStickerZ((prev) => {
      const max = Math.max(...Object.values(prev));
      const next = Math.min(max + 1, STICKER_Z_MAX);
      return { ...prev, [id]: next };
    });
  };
  const matchedProjectIds = useMemo(() => {
    if (!hoveredSkill) return null;
    const s = SKILL_STICKERS.find((x) => x.id === hoveredSkill);
    return s ? s.projects : null;
  }, [hoveredSkill]);
  const isMatched = (id) => !!matchedProjectIds && matchedProjectIds.includes(id);
  const isDimmedByHover = (id) => !!matchedProjectIds && !matchedProjectIds.includes(id);
  const [klippiVisible, setKlippiVisible] = useState(false);
  const [klippiIdx, setKlippiIdx] = useState(0);
  const [klippiReaction, setKlippiReaction] = useState(false);
  const [klippiClickIdx, setKlippiClickIdx] = useState(0);
  const openLightbox = (items, index) => setLightbox({ items, index });
  const closeLightbox = () => setLightbox(null);
  const lbPrev = () => setLightbox((lb) => lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : lb);
  const lbNext = () => setLightbox((lb) => lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : lb);
  useEffect(() => {
    if (!mode) return;
    if (mode === "playful") {
      setBooting(true);
      const tm = setTimeout(() => setBooting(false), 2600);
      return () => clearTimeout(tm);
    }
    setBooting(false);
  }, [mode]);
  useEffect(() => {
    if (booting) return;
    if (!tweaks.showClippy) return;
    const t2 = setTimeout(() => setKlippiVisible(true), 1800);
    return () => clearTimeout(t2);
  }, [booting, tweaks.showClippy]);
  useEffect(() => {
    setKlippiIdx(0);
    setKlippiReaction(false);
  }, [activeId]);
  useEffect(() => {
    if (!klippiVisible || booting) return;
    const i = setInterval(() => setKlippiIdx((n) => n + 1), 12e3);
    return () => clearInterval(i);
  }, [klippiVisible, booting]);
  useEffect(() => {
    if (!klippiReaction) return;
    const t2 = setTimeout(() => setKlippiReaction(false), 5e3);
    return () => clearTimeout(t2);
  }, [klippiReaction, klippiClickIdx]);
  useEffect(() => {
    if (!mode || booting) return;
    if (windows.length !== 0) return;
    if (!calm) {
      setDesktopRevealed(true);
      return;
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const taskbar = 34;
    const w = Math.min(900, Math.max(420, vw - 80));
    const h = Math.min(720, Math.max(460, vh - taskbar - 60));
    openWindow("dashboard", {
      x: Math.max(20, Math.floor((vw - w) / 2)),
      y: Math.max(24, Math.floor((vh - taskbar - h) / 2)),
      w,
      h,
      _intro: true
    });
  }, [booting, mode]);
  useEffect(() => {
    if (!startOpen) return;
    const handler = (e) => {
      if (!e.target.closest(".start-menu") && !e.target.closest(".start-btn")) {
        setStartOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [startOpen]);
  function openWindow(id, override) {
    if (id === "recruiter" && typeof window !== "undefined") {
      const vw = window.innerWidth;
      const targetW = Math.min(1100, Math.max(560, vw - 40));
      const targetX = Math.max(20, Math.floor((vw - targetW) / 2));
      override = { ...override || {}, w: targetW, x: targetX };
    }
    const wipLookupId = id === "project" ? override == null ? void 0 : override.projectId : id;
    const wipProj = PROJECTS.find((p) => p.id === wipLookupId && p.status === "wip");
    if (wipProj && !(override == null ? void 0 : override._forceFull)) {
      setDesktopRevealed(true);
      setStartOpen(false);
      setWipModal(wipProj);
      return;
    }
    const def = WINDOW_DEFS[id];
    if (!def) return;
    if (!(override == null ? void 0 : override._intro)) {
      setDesktopRevealed(true);
    }
    setStartOpen(false);
    setWindows((ws) => {
      var _a, _b;
      const existing = ws.find((w) => w.id === id);
      try {
        const projectIds = Array.isArray(PROJECTS) ? PROJECTS.map((p) => p.id) : [];
        const fallbackProjectKeys = ["atolls", "echoes", "vinted", "soulsphere", "munichapp", "donbosco", "clarity"];
        const isProjectIdOpen = projectIds.includes(id) || fallbackProjectKeys.includes(id);
        const isReusableProject = id === "project" && override && override.projectId;
        if (isProjectIdOpen || isReusableProject) {
          ws = ws.filter((w) => {
            const wid = w.id || "";
            if (wid === "project") return true;
            if (projectIds.includes(wid)) return false;
            if (fallbackProjectKeys.includes(wid)) return false;
            return true;
          });
        }
      } catch (e) {
      }
      ws = ws.filter((w) => w.id === id);
      if (existing) {
        return ws.map((w) => w.id === id ? { ...w, minimized: false, z: ++zCounter.current, ...override || {} } : w);
      }
      const offset = override ? 0 : ws.length * 24;
      return [...ws, {
        id,
        ...def,
        ...override || {},
        x: ((_a = override == null ? void 0 : override.x) != null ? _a : def.x) + offset,
        y: ((_b = override == null ? void 0 : override.y) != null ? _b : def.y) + offset,
        z: ++zCounter.current,
        minimized: false
      }];
    });
    setActiveId(id);
  }
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const proj = params.get("project");
      const cv = params.get("cv");
      if (proj && PROJECTS.some((p) => p.id === proj)) {
        setTimeout(() => openWindow("project", { _intro: true, projectId: proj }), 120);
      }
      if (cv) setTimeout(() => downloadCV(), 200);
      if (proj || cv) {
        const url = new URL(window.location.href);
        url.searchParams.delete("project");
        url.searchParams.delete("cv");
        window.history.replaceState({}, "", url);
      }
    } catch (e) {
    }
  }, []);
  function closeWindow(id) {
    if (id === "dashboard" || id === "recruiter" || id === "about") setDesktopRevealed(true);
    setWindows((ws) => ws.filter((w) => w.id !== id));
    if (activeId === id) setActiveId(null);
  }
  function minimizeWindow(id) {
    setWindows((ws) => ws.map((w) => w.id === id ? { ...w, minimized: true } : w));
  }
  function focusWindow(id) {
    setWindows((ws) => ws.map((w) => w.id === id ? { ...w, z: ++zCounter.current, minimized: false } : w));
    setActiveId(id);
  }
  function downloadCV() {
    const a = document.createElement("a");
    a.href = "assets/Nuria_Kurrle_CV.pdf";
    a.download = "Nuria_Kurrle_CV.pdf";
    a.target = "_blank";
    a.rel = "noopener";
    a.click();
  }
  const getTitle = (id) => {
    if (id === "project") {
      const win = windows.find((w) => w.id === "project");
      const pid = win == null ? void 0 : win.projectId;
      const p = PROJECTS.find((p2) => p2.id === pid);
      if (p) return p[lang].windowTitle;
      return lang === "de" ? "Case Study" : "Case Study";
    }
    if (id === "dashboard") return lang === "de" ? "Dashboard.exe: \xDCbersicht" : "Dashboard.exe: Overview";
    if (id === "recruiter") return lang === "de" ? "Recruiter.exe: f\xFCr dich gepackt \u2728" : "Recruiter.exe: packed for you \u2728";
    if (id === "about") return "About_Me.txt: Editor";
    if (id === "projects") return lang === "de" ? "Projekte: Explorer" : "Projects: Explorer";
    if (id === "skills") return "Skills.cpl: Control Panel";
    if (id === "cv") return lang === "de" ? "Lebenslauf.doc: Editor" : "Resume.doc: Editor";
    if (id === "contact") return "Contact.exe";
    if (id === "chat") return lang === "de" ? "NuriaBot: Instant Message" : "NuriaBot: Instant Message";
    if (id === "quickpitch") return lang === "de" ? "Quick_Pitch.txt: Notepad" : "Quick_Pitch.txt: Notepad";
    const proj = PROJECTS.find((p) => p.id === id);
    if (proj) return proj[lang].windowTitle;
    return id;
  };
  function renderBody(id) {
    if (id === "dashboard") return /* @__PURE__ */ React.createElement(DashboardContent, { t, lang, openWindow, onDownloadCV: downloadCV, openLightbox });
    if (id === "recruiter") return /* @__PURE__ */ React.createElement(RecruiterContent, { t, lang, openProject: openWindow, openWindow, closeWindow, onDownloadCV: downloadCV, openLightbox });
    if (id === "about") return /* @__PURE__ */ React.createElement(AboutContent, { t, lang, openWindow, closeWindow });
    if (id === "projects") return /* @__PURE__ */ React.createElement(ProjectsOverview, { t, lang, openProject: (pid) => {
      openWindow("project", { projectId: pid });
      closeWindow("projects");
    } });
    if (id === "skills") return /* @__PURE__ */ React.createElement(SkillsContent, { t, lang });
    if (id === "cv") return /* @__PURE__ */ React.createElement(CVContent, { t, lang, onDownload: downloadCV });
    if (id === "contact") return /* @__PURE__ */ React.createElement(ContactContent, { t, lang });
    if (id === "chat") return /* @__PURE__ */ React.createElement(ChatContent, { lang });
    if (id === "quickpitch") return /* @__PURE__ */ React.createElement(QuickPitchContent, { lang, openWindow, onDownloadCV: downloadCV });
    if (id === "project") {
      const win = windows.find((w) => w.id === "project");
      const pid = win == null ? void 0 : win.projectId;
      const proj = PROJECTS.find((p) => p.id === pid);
      if (proj) return /* @__PURE__ */ React.createElement(ProjectContent, { key: proj.id, project: proj, t, lang, openLightbox, openWindow, closeWindow });
      return null;
    }
    return null;
  }
  const visibleWindows = windows.filter((w) => !w.minimized);
  const activeProjectId = (windows.find((w) => w.id === "project") || {}).projectId;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, booting && /* @__PURE__ */ React.createElement(BootScreen, { lang }), /* @__PURE__ */ React.createElement("div", { className: "desktop" }, !calm && /* @__PURE__ */ React.createElement("div", { className: "dither" }), !calm && /* @__PURE__ */ React.createElement("div", { className: "scanlines" }), !calm && STARS.map((s, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "star", style: {
    left: `${s.x}%`,
    top: `${s.y}%`,
    fontSize: s.size,
    color: ["#fff", "#FDE68A", "#F9C8E4", "#C8D4F8"][i % 4],
    animationDelay: `${s.delay}s`
  } }, "\u2726")), !booting && /* @__PURE__ */ React.createElement(
    WelcomeDialog,
    {
      lang,
      onAction: (action) => {
        setDesktopRevealed(true);
        if (action === "yes") {
          openWindow("recruiter", { x: 60, y: 30, w: 1100, h: 780, _intro: true });
        }
      }
    }
  ), /* @__PURE__ */ React.createElement("main", { role: "main", "aria-label": "Portfolio projects" }, /* @__PURE__ */ React.createElement("div", { className: "icon-grid" }, /* @__PURE__ */ React.createElement(
    DeskIcon,
    {
      id: "recruiter",
      label: "Recruiter.exe",
      emoji: "\u{1F9D1}\u200D\u{1F4BC}",
      badge: "START",
      dimmed: !!matchedProjectIds,
      onClick: () => openWindow("recruiter"),
      onDouble: () => openWindow("recruiter")
    }
  ), /* @__PURE__ */ React.createElement(
    DeskIcon,
    {
      id: "about",
      label: "About_Me.txt",
      emoji: "\u{1F4C4}",
      dimmed: !!matchedProjectIds,
      onClick: () => openWindow("about"),
      onDouble: () => openWindow("about")
    }
  ), /* @__PURE__ */ React.createElement(
    DeskIcon,
    {
      id: "projects",
      label: "Projekte.exe",
      emoji: "\u{1F4C1}",
      dimmed: !!matchedProjectIds,
      onClick: () => openWindow("projects"),
      onDouble: () => openWindow("projects")
    }
  ), PROJECT_ICONS.map((p) => /* @__PURE__ */ React.createElement(
    DeskIcon,
    {
      key: p.id,
      id: p.id,
      label: p.label,
      emoji: p.emoji,
      badge: p.badge,
      matched: isMatched(p.id),
      dimmed: isDimmedByHover(p.id),
      selected: activeProjectId === p.id,
      onClick: () => openWindow("project", { projectId: p.id }),
      onDouble: () => openWindow("project", { projectId: p.id }),
      onHoverChange: (h) => setHoveredProject(h ? p.id : null)
    }
  )), /* @__PURE__ */ React.createElement(
    DeskIcon,
    {
      id: "chat",
      label: "NuriaBot.aim",
      emoji: "\u{1F4AC}",
      badge: "AI",
      dimmed: !!matchedProjectIds,
      onClick: () => openWindow("chat"),
      onDouble: () => openWindow("chat")
    }
  ))), !booting && visibleWindows.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "desktop-hint" }, "\u2191 ", lang === "de" ? "Klick ein Projekt um die Case Study zu \xF6ffnen" : "Click a project to open the case study"), /* @__PURE__ */ React.createElement("div", { className: "skill-sticker-layer" }, SKILL_STICKERS.map((s) => {
    var _a, _b;
    return /* @__PURE__ */ React.createElement(
      SkillSticker,
      {
        key: s.id,
        sticker: s,
        z: stickerZ[s.id],
        onBringToFront: () => bringStickerToFront(s.id),
        onHoverChange: setHoveredSkill,
        highlighted: !!hoveredProject && ((_a = s.projects) == null ? void 0 : _a.includes(hoveredProject)),
        dim: !!hoveredProject && !((_b = s.projects) == null ? void 0 : _b.includes(hoveredProject))
      }
    );
  })), visibleWindows.map((w) => /* @__PURE__ */ React.createElement(
    Win,
    {
      key: w.id,
      win: { ...w, title: getTitle(w.id) },
      t,
      onClose: () => closeWindow(w.id),
      onMinimize: () => minimizeWindow(w.id),
      onFocus: () => focusWindow(w.id),
      isActive: activeId === w.id
    },
    renderBody(w.id)
  )), klippiVisible && tweaks.showClippy && !booting && (() => {
    const bucketKey = !activeId || visibleWindows.length === 0 ? "desktop" : activeId === "recruiter" ? "recruiter" : activeId === "about" ? "about" : activeId === "projects" ? "projects" : activeId === "project" || PROJECTS.some((p) => p.id === activeId) ? "projectOpen" : "desktop";
    const bucket = KLIPPI_MESSAGES[bucketKey][lang] || KLIPPI_MESSAGES.desktop[lang];
    const clickMsgs = KLIPPI_MESSAGES.click[lang];
    const message = klippiReaction ? clickMsgs[klippiClickIdx % clickMsgs.length] : bucket[klippiIdx % bucket.length];
    const triggerReaction = () => {
      setKlippiReaction(true);
      setKlippiClickIdx((i) => i + 1);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "clippy" }, /* @__PURE__ */ React.createElement("div", { className: "clippy-bubble", onClick: triggerReaction }, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "x",
        onClick: (e) => {
          e.stopPropagation();
          setKlippiVisible(false);
        }
      },
      "\u2715"
    ), /* @__PURE__ */ React.createElement("div", { className: "clippy-message" }, message)), /* @__PURE__ */ React.createElement(
      "img",
      {
        className: "clippy-character",
        src: "assets/funsies/clippy.png",
        alt: "",
        "aria-hidden": "true",
        draggable: false,
        onClick: triggerReaction
      }
    ));
  })()), startOpen && /* @__PURE__ */ React.createElement("div", { className: "start-menu" }, /* @__PURE__ */ React.createElement("div", { className: "start-menu-side" }, "NURIA \xB7 OS"), /* @__PURE__ */ React.createElement("div", { className: "start-menu-list" }, /* @__PURE__ */ React.createElement("div", { className: "start-section-label" }, "\u26A1 ", lang === "de" ? "Quick Access" : "Quick Access"), /* @__PURE__ */ React.createElement(
    StartItem,
    {
      glyph: "\u2B07",
      label: t.download_cv,
      hot: true,
      onClick: downloadCV
    }
  ), /* @__PURE__ */ React.createElement(
    StartItem,
    {
      glyph: "\u2709",
      label: lang === "de" ? "Mail an Nuria" : "Email Nuria",
      hot: true,
      onClick: () => {
        window.location.href = `mailto:${NURIA.email}?subject=${encodeURIComponent(lang === "de" ? "Praxissemester WS 26/27, Anfrage" : "Internship Fall 26 / Spring 27, Inquiry")}`;
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "start-divider" }), /* @__PURE__ */ React.createElement("div", { className: "start-section-label" }, lang === "de" ? "\u{1F5C2} Programme" : "\u{1F5C2} Programs"), /* @__PURE__ */ React.createElement(StartItem, { glyph: "\u{1F9D1}\u200D\u{1F4BC}", label: "Recruiter.exe", onClick: () => openWindow("recruiter") }), /* @__PURE__ */ React.createElement(StartItem, { glyph: "\u{1F4C2}", label: lang === "de" ? "Projekte" : "Projects", onClick: () => openWindow("projects") }), /* @__PURE__ */ React.createElement(StartItem, { glyph: "\u{1F4C4}", label: lang === "de" ? "About_Me.txt" : "About_Me.txt", onClick: () => openWindow("about") }), /* @__PURE__ */ React.createElement(StartItem, { glyph: "\u2709\uFE0F", label: "Contact.exe", onClick: () => openWindow("contact") }), /* @__PURE__ */ React.createElement(StartItem, { glyph: "\u{1F4AC}", label: "NuriaBot (chat)", onClick: () => openWindow("chat") }))), /* @__PURE__ */ React.createElement("div", { className: "taskbar" }, /* @__PURE__ */ React.createElement("button", { className: `start-btn ${startOpen ? "open" : ""}`, onClick: () => {
    setStartOpen((s) => !s);
    revealDesktop();
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, "\u2726"), " ", t.start), windows.map((w) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: w.id,
      className: `task-btn ${activeId === w.id && !w.minimized ? "active" : ""}`,
      onClick: () => {
        if (w.minimized || activeId !== w.id) focusWindow(w.id);
        else minimizeWindow(w.id);
      }
    },
    /* @__PURE__ */ React.createElement("span", null, w.icon),
    /* @__PURE__ */ React.createElement("span", null, getTitle(w.id).replace(/[—:].*$/, ""))
  )), /* @__PURE__ */ React.createElement("div", { className: "tray" }, /* @__PURE__ */ React.createElement("div", { className: "lang-toggle wp-toggle", title: lang === "de" ? "Hintergrund wechseln" : "Switch background" }, /* @__PURE__ */ React.createElement("button", { className: tweaks.wallpaper === "slate-blue" ? "on" : "", onClick: () => setTweak("wallpaper", "slate-blue"), "aria-label": lang === "de" ? "Blauer Hintergrund" : "Blue background" }, "\u{1F7E6}"), /* @__PURE__ */ React.createElement("button", { className: tweaks.wallpaper === "pixel-land" ? "on" : "", onClick: () => setTweak("wallpaper", "pixel-land"), "aria-label": lang === "de" ? "Pixel-Hintergrund" : "Pixel background" }, "\u{1F304}")), /* @__PURE__ */ React.createElement("div", { className: "lang-toggle" }, /* @__PURE__ */ React.createElement("button", { className: lang === "de" ? "on" : "", onClick: () => setLang("de") }, "DE"), /* @__PURE__ */ React.createElement("button", { className: lang === "en" ? "on" : "", onClick: () => setLang("en") }, "EN")), /* @__PURE__ */ React.createElement("span", { className: "tray-icon", title: "Mood: focused" }, "\u{1F319}"), /* @__PURE__ */ React.createElement(Clock, null))), lightbox && /* @__PURE__ */ React.createElement(Lightbox, { items: lightbox.items, index: lightbox.index, onClose: closeLightbox, onPrev: lbPrev, onNext: lbNext, lang }), wipModal && WIPLoadingModal && /* @__PURE__ */ React.createElement(
    WIPLoadingModal,
    {
      project: wipModal,
      lang,
      onClose: () => setWipModal(null)
    }
  ), /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: "Wallpaper" }, /* @__PURE__ */ React.createElement(
    TweakRadio,
    {
      label: "Preset",
      value: tweaks.wallpaper,
      onChange: (v) => setTweak("wallpaper", v),
      options: [
        { value: "pixel-land", label: "Pixel Land" },
        { value: "slate-blue", label: "Slate Blue" },
        { value: "lilac-sunset", label: "Lilac" },
        { value: "mint-cloud", label: "Mint" },
        { value: "peach-sky", label: "Peach" },
        { value: "pixel-night", label: "Night" }
      ]
    }
  )), /* @__PURE__ */ React.createElement(TweakSection, { label: "Accent" }, /* @__PURE__ */ React.createElement(
    TweakColor,
    {
      label: "Palette",
      value: tweaks.accent,
      onChange: (v) => setTweak("accent", v),
      options: ACCENT_OPTIONS
    }
  )), /* @__PURE__ */ React.createElement(TweakSection, { label: "Y2K vibe" }, /* @__PURE__ */ React.createElement(
    TweakSlider,
    {
      label: "Intensity",
      value: tweaks.intensity,
      onChange: (v) => setTweak("intensity", v),
      min: 0,
      max: 2,
      step: 0.1
    }
  ), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Klippi", value: tweaks.showClippy, onChange: (v) => setTweak("showClippy", v) }))));
}
function StartItem({ glyph, label, onClick, hot }) {
  return /* @__PURE__ */ React.createElement("div", { className: `start-item ${hot ? "start-item-hot" : ""}`, onClick }, /* @__PURE__ */ React.createElement("span", { className: "glyph" }, glyph), /* @__PURE__ */ React.createElement("span", null, label));
}
function Clock() {
  const [now, setNow] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
    return () => clearInterval(i);
  }, []);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-pixel)", fontSize: 12, minWidth: 38, textAlign: "center" } }, hh, ":", mm);
}
function BootScreen({ lang }) {
  return /* @__PURE__ */ React.createElement("div", { className: "boot boot-xp" }, /* @__PURE__ */ React.createElement("div", { className: "boot-xp-center" }, /* @__PURE__ */ React.createElement("div", { className: "boot-logo" }, "NURIA\xB7OS"), /* @__PURE__ */ React.createElement("div", { className: "boot-xp-sub" }, lang === "de" ? "Portfolio \xB7 UX / Service Design" : "Portfolio \xB7 UX / Service Design"), /* @__PURE__ */ React.createElement("div", { className: "boot-xp-bar", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("div", { className: "boot-xp-fill" })), /* @__PURE__ */ React.createElement("div", { className: "boot-xp-loading mono" }, lang === "de" ? "L\xE4dt\u2026" : "Loading\u2026")), /* @__PURE__ */ React.createElement("div", { className: "boot-xp-foot mono" }, /* @__PURE__ */ React.createElement("span", null, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " ", NURIA.name), /* @__PURE__ */ React.createElement("span", null, lang === "de" ? "Built solo \xB7 React + n8n + Kaffee" : "Built solo \xB7 React + n8n + coffee")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));

})();
