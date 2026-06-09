/* global React, ReactDOM, STR, PROJECTS, NURIA,
   Win, DeskIcon, Placeholder, Lightbox,
   RecruiterContent, ProjectContent, ProjectsOverview, SkillsContent, CVContent, AboutContent, ContactContent,
   DashboardContent, ChatContent,
   TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle, TweakSlider */
/* Mode = how the visitor wants to see the portfolio.
   'calm'    → recruiter-friendly: one centered window, no boot screen, no
                Klippi/post-its/constellation, minimal scanlines, no stars.
   'playful' → full Y2K experience (boot, stars, Klippi, post-its, marquee).
   null      → first visit, show the mode picker. */
const MODE_KEY = 'nuria-mode';
const { useState, useEffect, useRef, useMemo } = React;

/* Half as many stars, with calmer animation peak.
   See @keyframes twinkle below — dimmer peak (0.55) makes the wallpaper
   feel more like a sky and less like a screensaver. */
const STARS = Array.from({length: 12}, (_, i) => ({
  x: (i * 37) % 95 + 2,
  y: (i * 53) % 90 + 4,
  size: 8 + (i % 4) * 3,
  delay: (i * 0.3) % 3,
}));

/* Wallpaper presets — Pixel Office palette (cool stargazer set).
   'pixel-land' is a sentinel: the CSS background lives in styles.css under
   body[data-wallpaper="pixel-land"] .desktop so it can layer sky/water/grass
   bands + cloud blobs in a way a single gradient string can't. */
const WALLPAPERS = {
  'pixel-land':   'none',                                                              /* Y2K pixel-art landscape (CSS-driven) */
  'slate-blue':   'linear-gradient(180deg, #3F5E84 0%, #28415F 100%)',                /* deep steel-navy — recruiter-safe, max contrast for light windows */
  'lilac-sunset': 'linear-gradient(160deg, #6F8A8C 0%, #5A7378 50%, #455D6B 100%)',  /* sage-teal stargazer (image 1) */
  'mint-cloud':   'linear-gradient(160deg, #B8CDC8 0%, #C9C4E0 50%, #DDB8C6 100%)',  /* sage → lavender → rose */
  'pixel-night':  'linear-gradient(160deg, #161D2C 0%, #2B3858 50%, #3F4C7C 100%)',  /* deep cosmos (Galaxy.gif) */
  'peach-sky':    'linear-gradient(160deg, #E0CCB5 0%, #DDB8C6 50%, #8FAACA 100%)',  /* dawn — sand → rose → steel */
};

const ACCENT_OPTIONS = [
  ['#B8B0D8', '#3F4C7C'],  // lavender / navy
  ['#DDB8C6', '#9F5B73'],  // dusty rose / mulberry
  ['#8FAACA', '#4D6A85'],  // steel blue / deep steel
  ['#B8CDC8', '#648a82'],  // sage / forest
];

/* Klippi messages — context-aware tips that change with the active window.
   Each bucket holds DE + EN arrays; one entry is shown at a time and the
   scheduler rotates through them every ~12 s. Clicking Klippi's body
   triggers a one-off reaction from the `click` bucket. */
const KLIPPI_MESSAGES = {
  desktop: {
    de: [
      '👋 Willkommen! Doppelklick auf die Icons — oder öffne direkt 📂 Recruiter.exe für den Überblick.',
      '🔮 Die Logos rechts sind meine Skills — du kannst sie herumziehen und anklicken!',
      '🌟 Tipp: hover über einen Skill und die passenden Projekte leuchten auf der linken Seite.',
      '🎨 Alles im Y2K-Vibe — enjoy the ride.',
      '🖼️ Tipp: unten rechts kannst du den Hintergrund wechseln — 🟦 seriöses Blau oder 🌄 Pixel-Welt.',
      '💬 Fragen? Klick 💬 NuriaBot.aim — oder schreib mir eine Mail.',
    ],
    en: [
      '👋 Welcome! Double-click the icons — or jump straight into 📂 Recruiter.exe for the overview.',
      '🔮 The logos on the right are my skills — drag them around and click them!',
      '🌟 Tip: hover a skill sticker and the matching project icons light up on the left.',
      '🎨 Everything\'s in Y2K vibes — enjoy the ride.',
      '🖼️ Tip: switch the background bottom-right — 🟦 serious blue or 🌄 pixel world.',
      '💬 Questions? Click 💬 NuriaBot.aim — or just email me.',
    ],
  },
  recruiter: {
    de: [
      '🔍 Meine ausgewählten Projekte — jedes hat eine komplette Case Study mit Research, Design und Ergebnissen.',
      '📧 Mail, in LinkedIn oder ⬇ CV — wähle was dir am besten passt.',
      '🎯 Meine Arbeitsweise: Research zuerst, dann Design, dann Code.',
      '👇 Klick auf "→ Case Study" um in ein Projekt einzutauchen.',
      '🪟 Zu eng? Doppelklick auf die Titelleiste — oder ▢ oben rechts — und das Fenster wird groß.',
    ],
    en: [
      '🔍 My selected projects — each one has a full case study with research, design and results.',
      '📧 Mail, in LinkedIn or ⬇ CV — pick whichever works best for you.',
      '🎯 How I work: research first, then design, then code.',
      '👇 Hit "→ Case Study" to dive into a project.',
      '🪟 Feels cramped? Double-click the title bar — or hit ▢ top-right — to make the window bigger.',
    ],
  },
  about: {
    de: [
      '📝 Hier erfährst du wer ich bin und wie ich ticke.',
      '✨ Fair warning: ich liebe gutes Research und ehrliche Reflexion.',
      '🎓 HM München, 4. Semester — Praxissemester WS 26/27 in München.',
      '🌍 Aus Argentinien, jetzt in Ottobrunn bei München.',
    ],
    en: [
      '📝 Find out who I am and how I work.',
      '✨ Fair warning: I love research and honest reflection.',
      '🎓 HM Munich, 4th semester — looking for a fall 26/27 internship in Munich.',
      '🌍 From Argentina, now in Ottobrunn near Munich.',
    ],
  },
  projects: {
    de: [
      '📂 Alle 7 Projekte — 5 fertig, 2 in Arbeit.',
      '🎯 Klick eines an, um die vollständige Case Study zu öffnen.',
      '💡 Oder zurück zu Recruiter.exe für den schnellen Überblick.',
    ],
    en: [
      '📂 All 7 projects — 5 complete, 2 in progress.',
      '🎯 Click one to open its full case study.',
      '💡 Or head back to Recruiter.exe for the quick overview.',
    ],
  },
  projectOpen: {
    de: [
      '🪟 Tipp zum Start: Doppelklick auf die Titelleiste — oder ▢ oben rechts — macht das Fenster groß.',
      '📖 Einfach scrollen: Outcome · Identity & Design · Process · Reflection — oder klick die Pills unten.',
      '📊 Outcome zuerst: das Ergebnis und der Impact des Projekts.',
      '🎨 Identity & Design: was ich gebaut habe — und warum.',
      '🔍 Process: wie ich das Problem verstanden und erforscht habe.',
      '💭 Reflection: meine Learnings aus dem Projekt.',
      '🧪 Oben in der Meta-Zeile siehst du Stack, Rolle und Links.',
    ],
    en: [
      '🪟 Quick tip: Double-click the title bar — or hit ▢ top-right — to make the window bigger.',
      '📖 Just scroll: Outcome · Identity & Design · Process · Reflection — or click the pills at the bottom.',
      '📊 Outcome first: the project\'s result and impact.',
      '🎨 Identity & Design: what I built — and why.',
      '🔍 Process: how I understood and researched the problem.',
      '💭 Reflection: my takeaways from the project.',
      '🧪 The meta bar up top shows the stack, role and links.',
    ],
  },
  click: {
    de: [
      'Ouch! Klick auf 📄 About_Me.txt — nicht auf mich — um Nuria besser kennenzulernen 😅',
      'Hey hey — ich bin nur Klippi! Nuria findest du in About_Me.txt 📄',
      'Du kennst das doch von früher: Klippi ist da um zu helfen, nicht zum Anklicken 😉',
      '🙅 Nicht ich! Doppelklick auf die Icons links — die sind die Stars.',
    ],
    en: [
      'Ouch! Click 📄 About_Me.txt — not me — if you want to get to know Nuria 😅',
      'Hey hey — I\'m just Klippi! You\'ll find Nuria over in About_Me.txt 📄',
      'You know the drill: Klippi is here to help, not to be clicked 😉',
      '🙅 Not me! Double-click the icons on the left — they\'re the stars.',
    ],
  },
};

/* Desktop project icons — short Win95-style filenames + emoji glyphs.
   These shape the icon row, not the actual project data (which stays in
   data.jsx and powers the windows). */
const PROJECT_ICONS = [
  { id: 'atolls',     label: 'Atolls_Hub',     emoji: '🤖',  badge: 'WS25/26' },
  { id: 'echoes',     label: 'Echoes_MB',      emoji: '🏛️',  badge: 'WS25/26' },
  { id: 'vinted',     label: 'Vinted_Rebrand', emoji: '🛍️',  badge: 'SS25' },
  { id: 'munichapp',  label: 'Munich_SuperApp', emoji: '🏙️', badge: 'SS25' },
  { id: 'donbosco',   label: 'Don_Bosco',      emoji: '📋',  badge: 'SS26' },
  { id: 'clarity',    label: 'Clarity.app',    emoji: '📓',  badge: 'SS26' },
  { id: 'soulsphere', label: 'Soulsphere',     emoji: '🔮',  badge: 'WS24' },
];

/* Draggable skill stickers — one per logo in assets/logos/. Each opens a
   Win98 popup with proficiency dots, a short summary, and the projects
   where the skill was used. Edit `level`, `summary`, and `projects` here. */
const SKILL_STICKERS = [
  { id: 'figma',    logo: 'assets/logos/figma_logo.png',    label: 'Figma',
    level: 4, levelLabel: { de: 'Stark', en: 'Strong' },
    summary: { de: 'Hi-Fi-Mockups, Design Systems, Prototyping, Brand Bibles.',
               en: 'Hi-fi mockups, design systems, prototyping, brand bibles.' },
    projects: ['atolls','echoes','vinted','munichapp','donbosco','clarity'],
    x: 1380, y: 195, rot: -3, mobileX: 0.45, mobileY: 220 },
  { id: 'ui_ux',    logo: 'assets/logos/ui_ux_logo.png',    label: 'UX · Research',
    level: 4, levelLabel: { de: 'Stark', en: 'Strong' },
    summary: { de: 'Interviews, Journey Maps, Empathy & JTBD, Usability Tests.',
               en: 'Interviews, journey maps, empathy & JTBD, usability tests.' },
    projects: ['atolls','echoes','munichapp','donbosco','clarity'],
    x: 1570, y: 180, rot: 2, mobileX: 0.68, mobileY: 200 },
  { id: 'react',    logo: 'assets/logos/react_logo.png',    label: 'React · TS',
    level: 3, levelLabel: { de: 'Solide', en: 'Solid' },
    summary: { de: 'Komponenten-basierte UIs, Hooks. Dieses Portfolio.',
               en: 'Component-based UIs, hooks. This very portfolio.' },
    projects: ['donbosco','atolls','clarity'],
    x: 1190, y: 580, rot: -2, mobileX: 0.86, mobileY: 250 },
  { id: 'n8n',      logo: 'assets/logos/n8n_logo.png',      label: 'n8n',
    level: 3, levelLabel: { de: 'Solide', en: 'Solid' },
    summary: { de: 'No-Code Workflows, API-Verkettung, KI-Bots.',
               en: 'No-code workflows, API chaining, AI bots.' },
    projects: ['atolls','donbosco'],
    x: 1400, y: 350, rot: 4, mobileX: 0.50, mobileY: 350 },
  { id: 'html_css', logo: 'assets/logos/html_css_logo.png', label: 'HTML · CSS',
    level: 4, levelLabel: { de: 'Stark', en: 'Strong' },
    summary: { de: 'Semantik, Flexbox, Grid, Animationen.',
               en: 'Semantics, flexbox, grid, animations.' },
    projects: ['atolls','clarity','donbosco'],
    x: 1580, y: 465, rot: -4, mobileX: 0.72, mobileY: 320 },
  { id: 'nodejs',   logo: 'assets/logos/nodejs_logo.png',   label: 'Node.js',
    level: 2, levelLabel: { de: 'Lernend', en: 'Learning' },
    summary: { de: 'Kleine Skripte, Build-Tools, Server-Setup.',
               en: 'Small scripts, build tools, server setup.' },
    projects: ['donbosco','atolls'],
    x: 1740, y: 360, rot: 3, mobileX: 0.86, mobileY: 380 },
  { id: 'python',   logo: 'assets/logos/python.png',        label: 'Python',
    level: 2, levelLabel: { de: 'Lernend', en: 'Learning' },
    summary: { de: 'Data Wrangling, kleine Automatisierungen.',
               en: 'Data wrangling, small automation.' },
    projects: ['soulsphere','clarity'],
    x: 1190, y: 165, rot: -1, mobileX: 0.54, mobileY: 460 },
  { id: 'docker',   logo: 'assets/logos/docker_logo.png',   label: 'Docker',
    level: 2, levelLabel: { de: 'Lernend', en: 'Learning' },
    summary: { de: 'Container für Dev-Setup, einfache Compose-Stacks.',
               en: 'Containers for dev setup, simple compose stacks.' },
    projects: ['clarity','atolls','donbosco'],
    x: 1210, y: 425, rot: 2, mobileX: 0.78, mobileY: 470 },
  { id: 'illustrator', logo: 'assets/logos/adobe_illustrator.png', label: 'Illustrator',
    level: 3, levelLabel: { de: 'Solide', en: 'Solid' },
    summary: { de: 'Vektor-Logos, Icons, Illustrationen, Brand-Assets.',
               en: 'Vector logos, icons, illustrations, brand assets.' },
    projects: ['vinted'],
    x: 1380, y: 520, rot: -3, mobileX: 0.62, mobileY: 540 },
];

const WINDOW_DEFS = {
  dashboard: { icon: '🖥', w: 880, h: 660, x: 100, y: 50, label: 'Dashboard' },
  recruiter: { icon: '🧑‍💼', w: 1100, h: 780, x: 60,  y: 30, label: 'Recruiter' },
  about:     { icon: '📄', w: 1100, h: 780, x: 60, y: 30, label: 'About', noMenubar: true, noStatusbar: true },
  projects:  { icon: '📂', w: 480, h: 360, x: 220, y: 100, label: 'Projects' },
  atolls:    { icon: '🤖', w: 1100, h: 780, x: 60, y: 30, label: 'Atolls' },
  echoes:    { icon: '🏛️', w: 1100, h: 780, x: 60, y: 30, label: 'Echoes' },
  vinted:    { icon: '🛍️', w: 1100, h: 780, x: 60, y: 30, label: 'Vinted' },
  soulsphere:{ icon: '🔮', w: 1100, h: 780, x: 60, y: 30, label: 'Soulsphere' },
  munichapp: { icon: '🏙️', w: 1100, h: 780, x: 60, y: 30, label: 'MunichApp' },
  donbosco:  { icon: '📋', w: 1100, h: 780, x: 60, y: 30, label: 'DonBosco' },
  clarity:   { icon: '📓', w: 1100, h: 780, x: 60, y: 30, label: 'Clarity' },
  skills:    { icon: '⚙️', w: 580, h: 540, x: 350, y: 50, label: 'Skills' },
  cv:        { icon: '🕘', w: 600, h: 560, x: 320, y: 70, label: 'CV' },
  contact:   { icon: '✉️', w: 760, h: 640, x: 300, y: 60, label: 'Contact' },
  chat:      { icon: '💬', w: 640, h: 520, x: 290, y: 70, label: 'NuriaBot', titlebarVariant: 'chat' },
  /* Quick Pitch — 60-second elevator console for time-pressed recruiters */
  quickpitch:{ icon: '🎯', w: 540, h: 460, x: 380, y: 100, label: 'Quick_Pitch.txt' },
  project:   { icon: '📁', w: 1100, h: 780, x: 60, y: 30, label: 'Project — Case Study', noMenubar: true, noStatusbar: true },
};

/* ═════════════════════════════════════════════════════════════════════
   QUICK PITCH — 60-second elevator console for hurried recruiters
   ─────────────────────────────────────────────────────────────────────
   Terminal-styled .txt window with the bare-minimum facts + 4 CTAs.
   Time-to-information goal: < 8 seconds.
═════════════════════════════════════════════════════════════════════ */
function QuickPitchContent({ lang, openWindow, onDownloadCV }) {
  const lines = lang === 'de' ? [
    '> Nuria Kurrle — UX & Service Design',
    '> verfügbar: WS 26/27 · München · 5–6 Monate · Vollzeit',
    '> Studium: B.Sc. Informatik & Design, HM München, 4. Sem.',
    '> Stack:  React · TypeScript · Figma · n8n · HTML/CSS',
    '> Research: 6–12 Interviews pro Projekt · DSGVO-clean',
    '> Top 3:  Atolls (-70% HR-Aufwand)',
    '>         Echoes (5 Tests, 3 Generationen)',
    '>         Vinted (komplette Brand-Bibel)',
    '> Solo gebaut: ~60% des Next.js-Frontends von Atolls',
    '> Sprachen: ES · DE · EN · IT',
    '> 8 Sekunden gelesen? Perfekt. Hier deine Optionen:',
  ] : [
    '> Nuria Kurrle — UX & Service Design',
    '> available: Fall 26 / Spring 27 · Munich · 5–6 months · full-time',
    '> studies: B.Sc. Computer Science & Design, HM Munich, 4th sem.',
    '> stack:  React · TypeScript · Figma · n8n · HTML/CSS',
    '> research: 6–12 interviews per project · GDPR-clean',
    '> top 3:  Atolls (-70% HR workload)',
    '>        Echoes (5 tests, 3 generations)',
    '>        Vinted (full brand bible)',
    '> solo built: ~60% of Atolls\' Next.js frontend',
    '> languages: ES · DE · EN · IT',
    '> 8 seconds read? Perfect. Here are your options:',
  ];
  return (
    <div className="content quickpitch-content">
      <div className="quickpitch-terminal">
        <div className="quickpitch-bar">
          <span className="quickpitch-dot" />
          <span>quick_pitch.txt — {lang === 'de' ? '60 Sekunden' : '60 seconds'}</span>
          <span style={{ marginLeft: 'auto', opacity: 0.7 }}>cat /portfolio/pitch</span>
        </div>
        <div className="quickpitch-body">
          {lines.map((line, i) => (
            <div key={i} className="quickpitch-line">{line}</div>
          ))}
          <div className="quickpitch-line quickpitch-cursor">
            <span className="devlog-cursor">_</span>
          </div>
        </div>
      </div>
      <div className="quickpitch-cta-row">
        <a className="pix-btn primary" href={`mailto:${NURIA.email}?subject=${encodeURIComponent(lang==='de' ? 'Praxissemester WS 26/27 — Nuria Kurrle' : 'Internship Fall 26 / Spring 27 — Nuria Kurrle')}`}>
          ✉ {lang === 'de' ? 'Mail mich' : 'Email me'}
        </a>
        <a className="pix-btn" href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">
          in LinkedIn
        </a>
        <button className="pix-btn warn" type="button" onClick={onDownloadCV}>
          ⬇ CV · PDF
        </button>
        <button className="pix-btn" type="button" onClick={() => openWindow('recruiter')}>
          📂 {lang === 'de' ? 'Recruiter.exe' : 'Recruiter.exe'}
        </button>
      </div>
    </div>
  );
}

/* ModePicker removed — Tweaks panel still allows switching Calm ↔ Playful. */

/* ═════════════════════════════════════════════════════════════════════
   WELCOME DIALOG — Win98-style greeter, shown once per session.
   Replaces the auto-opened Recruiter.exe so the first impression is the
   desktop, with a friendly call-to-action above it.
═════════════════════════════════════════════════════════════════════ */
function WelcomeDialog({ lang, onAction }) {
  /* Always shows on page load. Dismissal is in-tab only — no
     sessionStorage gate, so a refresh brings it back. */
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  function dismiss(action) {
    setVisible(false);
    onAction?.(action);
  }
  return (
    <>
      <div className="welcome-dialog-backdrop" onClick={() => dismiss('dismiss')} aria-hidden="true" />
      <div className="welcome-dialog" role="dialog" aria-label={lang === 'de' ? 'Willkommen' : 'Welcome'}>
        <div className="welcome-dialog-bar">
          <span className="welcome-dialog-bar-icon" aria-hidden="true">✦</span>
          <span className="welcome-dialog-bar-title">Nuria · OS</span>
          <button className="welcome-dialog-close" onClick={() => dismiss('dismiss')} aria-label={lang === 'de' ? 'Schließen' : 'Close'}>✕</button>
        </div>
        <div className="welcome-dialog-body">
          <div className="welcome-dialog-icon" aria-hidden="true">🔧</div>
          <div className="welcome-dialog-text">
            {lang === 'de'
              ? 'Suchst du jemanden fürs Praxissemester?'
              : 'Looking for an intern?'}
          </div>
        </div>
        <div className="welcome-dialog-buttons">
          <button className="welcome-dialog-btn primary" onClick={() => dismiss('yes')}>
            {lang === 'de' ? 'Klar, pack mir’s zusammen ✨' : 'Yes, pack it for me ✨'}
          </button>
          <button className="welcome-dialog-btn" onClick={() => dismiss('explore')}>
            {lang === 'de' ? 'Nee, lass mich stöbern' : 'Nah, let me browse'}
          </button>
        </div>
      </div>
    </>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   SKILL STICKER — draggable logo on the desktop. Click (no drag) opens
   the popup; drag-and-drop position is persisted in localStorage.
═════════════════════════════════════════════════════════════════════ */
function SkillSticker({ sticker, onBringToFront, onHoverChange, z, highlighted, dim }) {
  /* Versioned key — bump the suffix to invalidate old drag positions
     when defaults change (e.g. moved back to the right side of screen). */
  const POS_KEY = `nuria-skill-pos-v2-${sticker.id}`;
  const [pos, setPos] = useState(() => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const mobile = vw < 1100;
    const fallback = mobile
      ? { x: Math.round(vw * (sticker.mobileX ?? 0.5)), y: sticker.mobileY ?? 250 }
      : { x: sticker.x, y: sticker.y };
    try {
      const saved = JSON.parse(localStorage.getItem(POS_KEY) || 'null');
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
        /* Reject saved positions that no longer fit in the current viewport
           (e.g. dragged on desktop, now visiting on mobile). */
        if (saved.x >= 0 && saved.x <= vw - 30 && saved.y >= 0 && saved.y <= vh - 30) {
          return saved;
        }
      }
    } catch {}
    return fallback;
  });
  const [dragging, setDragging] = useState(false);

  /* If the visitor resizes the window (or toggles DevTools / responsive
     mode) such that the current position would now be off-screen, snap
     back to the appropriate default. Drag-saved positions inside the
     viewport are kept. */
  useEffect(() => {
    const onResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setPos(prev => {
        const offscreen = prev.x > vw - 30 || prev.y > vh - 30 || prev.x < 0 || prev.y < 0;
        if (!offscreen) return prev;
        const mobile = vw < 1100;
        return mobile
          ? { x: Math.round(vw * (sticker.mobileX ?? 0.5)), y: sticker.mobileY ?? 250 }
          : { x: sticker.x, y: sticker.y };
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [sticker.x, sticker.y, sticker.mobileX, sticker.mobileY]);

  const onPointerDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    onBringToFront?.();
    const startX = e.clientX, startY = e.clientY;
    const baseX = pos.x, baseY = pos.y;
    let moved = false;
    let lastX = baseX, lastY = baseY;

    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > 4) { moved = true; setDragging(true); }
      lastX = baseX + dx;
      lastY = baseY + dy;
      setPos({ x: lastX, y: lastY });
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      setDragging(false);
      if (moved) {
        try { localStorage.setItem(POS_KEY, JSON.stringify({ x: lastX, y: lastY })); } catch {}
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    e.preventDefault();
  };

  return (
    <img
      src={sticker.logo}
      alt={sticker.label}
      draggable={false}
      className={`skill-sticker ${dragging ? 'dragging' : ''} ${highlighted ? 'highlighted' : ''} ${dim ? 'dim' : ''}`}
      style={{ left: pos.x, top: pos.y, transform: `rotate(${sticker.rot}deg)`, zIndex: z }}
      onPointerDown={onPointerDown}
      onMouseEnter={() => onHoverChange?.(sticker.id)}
      onMouseLeave={() => onHoverChange?.(null)}
    />
  );
}

/* ═════════════════════════════════════════════════════════════════════
   APP
═════════════════════════════════════════════════════════════════════ */
function App() {
  const [lang, setLang] = useState('de');
  const t = STR[lang];

  /* Only one mode now: playful. The calm/playful split is gone — kept the
     `mode` and `calm` locals so existing render branches keep working
     without a sweeping diff. */
  const mode = 'playful';
  const calm = false;

  const tweakDefaults = /*EDITMODE-BEGIN*/{
    "wallpaper": "slate-blue",
    "accent": ["#B8B0D8", "#3F4C7C"],
    "intensity": 0.6,
    "showPostIts": true,
    "showClippy": true
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(tweakDefaults);

  /* Apply tweaks to CSS vars. In calm mode we cap intensity so scanlines /
     dither / titlebar drop-shadow stay quiet regardless of the slider. */
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--wallpaper', WALLPAPERS[tweaks.wallpaper] || WALLPAPERS['lilac-sunset']);
    r.setProperty('--accent', tweaks.accent[0]);
    r.setProperty('--accent-deep', tweaks.accent[1]);
    r.setProperty('--intensity', calm ? Math.min(tweaks.intensity, 0.2) : tweaks.intensity);
    document.body.classList.toggle('calm-mode', calm);
    document.body.classList.toggle('playful-mode', mode === 'playful');
    /* Wallpaper key on <body> — lets CSS apply special treatments
       (e.g. pixel-art landscape) that can't be expressed as a single gradient. */
    document.body.dataset.wallpaper = tweaks.wallpaper || 'lilac-sunset';
  }, [tweaks, calm, mode]);

    /* Desktop icons are visible from the start now — the About-Widget is the
      orientation aid, not a "click Start to reveal" pattern. The reveal
      state is kept for future use (e.g. resetting via Tweaks). */
    const [desktopRevealed, setDesktopRevealed] = useState(true);
    const revealDesktop = () => setDesktopRevealed(true);

  /* Sync the progressive-reveal body class. Default = collapsed (icons hidden). */
  useEffect(() => {
    document.body.classList.toggle('desktop-collapsed', !desktopRevealed);
  }, [desktopRevealed]);

  const [windows, setWindows] = useState([]); // [{id, ...}]
  const [wipModal, setWipModal] = useState(null);  // active WIP project for loading-modal, or null
  const [activeId, setActiveId] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [booting, setBooting] = useState(false);      // only true while playful boot animation plays
  const [lightbox, setLightbox] = useState(null);
  /* Windows start high (1001+) so they always sit above the desktop layers —
     Klippi (z 100) and the mobile skill stickers (z 110) included. Keeps the
     stickers from bleeding over an open case study on narrow screens. */
  const zCounter = useRef(1000);

  /* Skill stickers — popup state + per-sticker z so the latest grabbed
     sticker sits on top of the others. */
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  /* Stickers live below windows (windows start at z=1000) but above the
     wallpaper. The cap keeps any "bring to front" from climbing above the
     window layer no matter how many times a sticker is grabbed. */
  const STICKER_Z_MAX = 50;
  const [stickerZ, setStickerZ] = useState(() => {
    const z = {};
    SKILL_STICKERS.forEach((s, i) => { z[s.id] = 10 + i; });
    return z;
  });
  const bringStickerToFront = (id) => {
    setStickerZ(prev => {
      const max = Math.max(...Object.values(prev));
      const next = Math.min(max + 1, STICKER_Z_MAX);
      return { ...prev, [id]: next };
    });
  };

  /* When a sticker is hovered, light up the project icons that used that
     skill and dim the rest. Utility icons (Recruiter, About, etc.) also dim
     so the highlight reads cleanly. */
  const matchedProjectIds = useMemo(() => {
    if (!hoveredSkill) return null;
    const s = SKILL_STICKERS.find(x => x.id === hoveredSkill);
    return s ? s.projects : null;
  }, [hoveredSkill]);
  const isMatched = (id) => !!matchedProjectIds && matchedProjectIds.includes(id);
  const isDimmedByHover = (id) => !!matchedProjectIds && !matchedProjectIds.includes(id);

  /* Klippi — context-aware tips. Reads the active window to pick a bucket
     of messages, rotates within the bucket every 12 s. Clicking Klippi's
     body triggers a one-off reaction from the click bucket. */
  const [klippiVisible, setKlippiVisible] = useState(false);
  const [klippiIdx, setKlippiIdx] = useState(0);
  const [klippiReaction, setKlippiReaction] = useState(false);
  const [klippiClickIdx, setKlippiClickIdx] = useState(0);

  const openLightbox = (items, index) => setLightbox({ items, index });
  const closeLightbox = () => setLightbox(null);
  const lbPrev = () => setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : lb);
  const lbNext = () => setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : lb);

  /* Boot screen — only plays in playful mode after the mode picker. Calm
     skips it. Re-runs whenever mode changes so a Tweaks-panel toggle can
     replay/skip the animation. */
  useEffect(() => {
    if (!mode) return;
    if (mode === 'playful') {
      setBooting(true);
      const tm = setTimeout(() => setBooting(false), 2600);
      return () => clearTimeout(tm);
    }
    setBooting(false);
  }, [mode]);

  /* Show Klippi after a short delay once the boot screen finishes. */
  useEffect(() => {
    if (booting) return;
    if (!tweaks.showClippy) return;
    const t = setTimeout(() => setKlippiVisible(true), 1800);
    return () => clearTimeout(t);
  }, [booting, tweaks.showClippy]);

  /* When the visitor changes window (or returns to the desktop), restart
     Klippi from the first message in the new context and drop any
     reaction state. */
  useEffect(() => {
    setKlippiIdx(0);
    setKlippiReaction(false);
  }, [activeId]);

  /* Rotate through messages in the current bucket every 12 s, but only
     while Klippi is visible and not booting. */
  useEffect(() => {
    if (!klippiVisible || booting) return;
    const i = setInterval(() => setKlippiIdx(n => n + 1), 12000);
    return () => clearInterval(i);
  }, [klippiVisible, booting]);

  /* A reaction message stays for ~5 s, then Klippi returns to its
     contextual rotation. */
  useEffect(() => {
    if (!klippiReaction) return;
    const t = setTimeout(() => setKlippiReaction(false), 5000);
    return () => clearTimeout(t);
  }, [klippiReaction, klippiClickIdx]);

  /* Auto-open intro — exactly ONE window in calm mode only.
     - calm:    Dashboard.exe centered (single navigator hub).
     - playful: nothing auto-opens. The WelcomeDialog greets visitors and
                a click on "Ja klar!" opens Recruiter.exe explicitly. */
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
    openWindow('dashboard', {
      x: Math.max(20, Math.floor((vw - w) / 2)),
      y: Math.max(24, Math.floor((vh - taskbar - h) / 2)),
      w, h, _intro: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booting, mode]);

  /* Close start menu on click-outside */
  useEffect(() => {
    if (!startOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.start-menu') && !e.target.closest('.start-btn')) {
        setStartOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [startOpen]);

  /* openWindow accepts an optional `override` so the boot routine can
     auto-tile windows responsively without mutating WINDOW_DEFS. The
     override skips the natural cascade offset (caller controls position).
     A truthy override._intro skips Klippi interaction tracking so the
     auto-opened intro windows don't count as the visitor having "acted". */
  function openWindow(id, override) {
    /* Recruiter.exe is sized as a landing page (1100×780). On smaller
       viewports shrink to fit and center horizontally so it never overflows
       the desktop. Applies to every entry point (icon, start menu, welcome
       dialog), so size-on-disk only needs to live in one place. */
    if (id === 'recruiter' && typeof window !== 'undefined') {
      const vw = window.innerWidth;
      const targetW = Math.min(1100, Math.max(560, vw - 40));
      const targetX = Math.max(20, Math.floor((vw - targetW) / 2));
      override = { ...(override || {}), w: targetW, x: targetX };
    }
    /* WIP projects (Clarity, Don Bosco) get the Win95 loading modal
       instead of the full case-study window — honest framing for work
       that isn't ready for a recruiter deep-dive yet. Match both the
       direct id ('donbosco') and the reusable-project path
       (id === 'project' with override.projectId). */
    const wipLookupId = id === 'project' ? override?.projectId : id;
    const wipProj = PROJECTS.find(p => p.id === wipLookupId && p.status === 'wip');
    if (wipProj && !override?._forceFull) {
      setDesktopRevealed(true);
      setStartOpen(false);
      setWipModal(wipProj);
      return;
    }
    const def = WINDOW_DEFS[id];
    if (!def) return;
    if (!override?._intro) {
      /* Any explicit window open reveals the desktop (visitor is "exploring") */
      setDesktopRevealed(true);
    }
    setStartOpen(false);
    setWindows(ws => {
      const existing = ws.find(w => w.id === id);

      // If opening a project window (either by project id or the reusable 'project'),
      // close any other per-project windows first so the UI keeps only one case study open.
      try {
        const projectIds = (Array.isArray(PROJECTS) ? PROJECTS.map(p => p.id) : []);
        const fallbackProjectKeys = ['atolls','echoes','vinted','soulsphere','munichapp','donbosco','clarity'];
        const isProjectIdOpen = projectIds.includes(id) || fallbackProjectKeys.includes(id);
        const isReusableProject = id === 'project' && override && override.projectId;
        if (isProjectIdOpen || isReusableProject) {
          ws = ws.filter(w => {
            const wid = w.id || '';
            // keep any existing 'project' reusable window; remove old per-project windows
            if (wid === 'project') return true;
            if (projectIds.includes(wid)) return false;
            if (fallbackProjectKeys.includes(wid)) return false;
            return true;
          });
        }
      } catch (e) {
        // ignore if PROJECTS isn't available
      }

      // Only one window open at a time — windows never overlap. Opening any
      // window closes whatever was open before.
      ws = ws.filter(w => w.id === id);

      if (existing) {
        return ws.map(w => w.id === id
          ? { ...w, minimized: false, z: ++zCounter.current, ...(override || {}) }
          : w);
      }
      const offset = override ? 0 : ws.length * 24;
      return [...ws, {
        id, ...def, ...(override || {}),
        x: (override?.x ?? def.x) + offset,
        y: (override?.y ?? def.y) + offset,
        z: ++zCounter.current,
        minimized: false,
      }];
    });
    setActiveId(id);
  }

  /* Deep-link support: open ?project=<id> or trigger CV download via ?cv=1.
     URL is cleared after handling so a refresh starts from a clean desktop —
     no project auto-reopens just because it was opened last session. */
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const proj = params.get('project');
      const cv = params.get('cv');
      if (proj && PROJECTS.some(p => p.id === proj)) {
        setTimeout(() => openWindow('project', { _intro: true, projectId: proj }), 120);
      }
      if (cv) setTimeout(() => downloadCV(), 200);
      if (proj || cv) {
        const url = new URL(window.location.href);
        url.searchParams.delete('project');
        url.searchParams.delete('cv');
        window.history.replaceState({}, '', url);
      }
    } catch (e) {}
  }, []);

  function closeWindow(id) {
    /* Closing the intro window means the visitor is exploring — reveal the
       desktop so they have somewhere to go next. */
    if (id === 'dashboard' || id === 'recruiter' || id === 'about') setDesktopRevealed(true);
    setWindows(ws => ws.filter(w => w.id !== id));
    if (activeId === id) setActiveId(null);
  }

  function minimizeWindow(id) {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: true } : w));
  }

  function focusWindow(id) {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, z: ++zCounter.current, minimized: false } : w));
    setActiveId(id);
  }

  function downloadCV() {
    /* Deliver the real PDF that lives in /assets.
       Recruiters need PDF for ATS — the .txt generator was a placeholder. */
    const a = document.createElement('a');
    a.href = 'assets/Nuria_Kurrle_CV.pdf';
    a.download = 'Nuria_Kurrle_CV.pdf';
    a.target = '_blank';
    a.rel = 'noopener';
    a.click();
  }

  /* Title builder per window */
  const getTitle = (id) => {
    if (id === 'project') {
      const win = windows.find(w => w.id === 'project');
      const pid = win?.projectId;
      const p = PROJECTS.find(p => p.id === pid);
      if (p) return p[lang].windowTitle;
      return lang === 'de' ? 'Case Study' : 'Case Study';
    }
    if (id === 'dashboard') return lang === 'de' ? 'Dashboard.exe — Übersicht' : 'Dashboard.exe — Overview';
    if (id === 'recruiter') return lang === 'de' ? 'Recruiter.exe — für dich gepackt ✨' : 'Recruiter.exe — packed for you ✨';
    if (id === 'about')     return 'About_Me.txt — Editor';
    if (id === 'projects')  return lang === 'de' ? 'Projekte — Explorer' : 'Projects — Explorer';
    if (id === 'skills')    return 'Skills.cpl — Control Panel';
    if (id === 'cv')        return lang === 'de' ? 'Lebenslauf.doc — Editor' : 'Resume.doc — Editor';
    if (id === 'contact')   return 'Contact.exe';
    if (id === 'chat')       return lang==='de'?'NuriaBot — Instant Message':'NuriaBot — Instant Message';
    if (id === 'quickpitch') return lang==='de'?'Quick_Pitch.txt — Notepad':'Quick_Pitch.txt — Notepad';
    const proj = PROJECTS.find(p => p.id === id);
    if (proj) return proj[lang].windowTitle;
    return id;
  };

  /* Renderer */
  function renderBody(id) {
    if (id === 'dashboard') return <DashboardContent t={t} lang={lang} openWindow={openWindow} onDownloadCV={downloadCV} openLightbox={openLightbox} />;
    if (id === 'recruiter') return <RecruiterContent t={t} lang={lang} openProject={openWindow} openWindow={openWindow} closeWindow={closeWindow} onDownloadCV={downloadCV} openLightbox={openLightbox} />;
    if (id === 'about')     return <AboutContent t={t} lang={lang} openWindow={openWindow} closeWindow={closeWindow} />;
    if (id === 'projects')  return <ProjectsOverview t={t} lang={lang} openProject={(pid) => { openWindow('project', { projectId: pid }); closeWindow('projects'); }} />;
    if (id === 'skills')    return <SkillsContent t={t} lang={lang} />;
    if (id === 'cv')        return <CVContent t={t} lang={lang} onDownload={downloadCV} />;
    if (id === 'contact')   return <ContactContent t={t} lang={lang} />;
    if (id === 'chat')       return <ChatContent lang={lang} />;
    if (id === 'quickpitch') return <QuickPitchContent lang={lang} openWindow={openWindow} onDownloadCV={downloadCV} />;
    if (id === 'project') {
      const win = windows.find(w => w.id === 'project');
      const pid = win?.projectId;
      const proj = PROJECTS.find(p => p.id === pid);
      if (proj) return <ProjectContent key={proj.id} project={proj} t={t} lang={lang} openLightbox={openLightbox} openWindow={openWindow} closeWindow={closeWindow} />;
      return null;
    }
    return null;
  }

  const visibleWindows = windows.filter(w => !w.minimized);
  const activeProjectId = (windows.find(w => w.id === 'project') || {}).projectId;

  return (
    <>
      {booting && <BootScreen lang={lang} />}

      <div className="desktop">
        { !calm && <div className="dither" /> }
        { !calm && <div className="scanlines" /> }

        {/* ✦ stars — playful only. Calm keeps the wallpaper clean. */}
        {!calm && STARS.map((s, i) => (
          <span key={i} className="star" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            fontSize: s.size,
            color: ['#fff', '#FDE68A', '#F9C8E4', '#C8D4F8'][i % 4],
            animationDelay: `${s.delay}s`,
          }}>✦</span>
        ))}

        {/* Skill constellation removed from the desktop. The skill→project
            mapping now lives inside Projects.exe as a filter chip row,
            where it's actually discoverable. */}

        {/* Win98-style greeter — splash on first visit. Two real doors:
            primary opens Recruiter.exe (packed view), secondary just closes
            the dialog so the visitor can explore the desktop. ✕ and backdrop
            click are equivalent to secondary (dismiss without opening). */}
        {!booting && (
          <WelcomeDialog
            lang={lang}
            onAction={(action) => {
              setDesktopRevealed(true);
              if (action === 'yes') {
                openWindow('recruiter', { x: 60, y: 30, w: 1100, h: 780, _intro: true });
              }
            }}
          />
        )}


        <main role="main" aria-label="Portfolio projects">
        {/* Classic Win95 desktop — short underscore filenames + emoji glyphs.
            Order mirrors the original layout (Recruiter, About, Projekte,
            then each project, then utility icons). */}
        <div className="icon-grid">
          <DeskIcon
            id="recruiter"
            label="Recruiter.exe"
            emoji="🧑‍💼"
            badge="START"
            dimmed={!!matchedProjectIds}
            onClick={() => openWindow('recruiter')}
            onDouble={() => openWindow('recruiter')}
          />
          <DeskIcon
            id="about"
            label="About_Me.txt"
            emoji="📄"
            dimmed={!!matchedProjectIds}
            onClick={() => openWindow('about')}
            onDouble={() => openWindow('about')}
          />
          <DeskIcon
            id="projects"
            label="Projekte.exe"
            emoji="📁"
            dimmed={!!matchedProjectIds}
            onClick={() => openWindow('projects')}
            onDouble={() => openWindow('projects')}
          />
          {PROJECT_ICONS.map(p => (
            <DeskIcon
              key={p.id}
              id={p.id}
              label={p.label}
              emoji={p.emoji}
              badge={p.badge}
              matched={isMatched(p.id)}
              dimmed={isDimmedByHover(p.id)}
              selected={activeProjectId === p.id}
              onClick={() => openWindow('project', { projectId: p.id })}
              onDouble={() => openWindow('project', { projectId: p.id })}
              onHoverChange={(h) => setHoveredProject(h ? p.id : null)}
            />
          ))}
          <DeskIcon
            id="chat"
            label="NuriaBot.aim"
            emoji="💬"
            badge="AI"
            dimmed={!!matchedProjectIds}
            onClick={() => openWindow('chat')}
            onDouble={() => openWindow('chat')}
          />
        </div>
        </main>

        {/* Interaction hint — visible when no window is open.
            Single click (not double-click) to open. */}
        {!booting && visibleWindows.length === 0 && (
          <div className="desktop-hint">
            ↑ {lang === 'de' ? 'Klick ein Projekt um die Case Study zu öffnen' : 'Click a project to open the case study'}
          </div>
        )}

        {/* Draggable skill stickers — always rendered, but sit at a low
            z-index so any opened window naturally covers them. On screens
            narrower than 1100 px the wrapper turns into a horizontal
            scrollable strip (see styles.css); otherwise each sticker uses
            its own absolute pixel position. */}
        <div className="skill-sticker-layer">
          {SKILL_STICKERS.map(s => (
            <SkillSticker
              key={s.id}
              sticker={s}
              z={stickerZ[s.id]}
              onBringToFront={() => bringStickerToFront(s.id)}
              onHoverChange={setHoveredSkill}
              highlighted={!!hoveredProject && s.projects?.includes(hoveredProject)}
              dim={!!hoveredProject && !s.projects?.includes(hoveredProject)}
            />
          ))}
        </div>

        {/* Windows */}
        {visibleWindows.map(w => (
          <Win
            key={w.id}
            win={{ ...w, title: getTitle(w.id) }}
            t={t}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            isActive={activeId === w.id}
          >{renderBody(w.id)}</Win>
        ))}

        {/* Klippi — context-aware tips. Bucket follows the active window;
            within a bucket the message rotates every ~12 s. Clicking the
            body cycles through playful reactions; ✕ dismisses. */}
        {klippiVisible && tweaks.showClippy && !booting && (() => {
          const bucketKey = !activeId || visibleWindows.length === 0 ? 'desktop'
            : activeId === 'recruiter' ? 'recruiter'
            : activeId === 'about' ? 'about'
            : activeId === 'projects' ? 'projects'
            : activeId === 'project' || PROJECTS.some(p => p.id === activeId) ? 'projectOpen'
            : 'desktop';
          const bucket = KLIPPI_MESSAGES[bucketKey][lang] || KLIPPI_MESSAGES.desktop[lang];
          const clickMsgs = KLIPPI_MESSAGES.click[lang];
          const message = klippiReaction
            ? clickMsgs[klippiClickIdx % clickMsgs.length]
            : bucket[klippiIdx % bucket.length];
          const triggerReaction = () => {
            setKlippiReaction(true);
            setKlippiClickIdx(i => i + 1);
          };
          return (
            <div className="clippy">
              <div className="clippy-bubble" onClick={triggerReaction}>
                <span
                  className="x"
                  onClick={(e) => { e.stopPropagation(); setKlippiVisible(false); }}
                >✕</span>
                <div className="clippy-message">{message}</div>
              </div>
              <img
                className="clippy-character"
                src="assets/funsies/clippy.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                onClick={triggerReaction}
              />
            </div>
          );
        })()}
      </div>

      {/* Start menu */}
      {startOpen && (
        <div className="start-menu">
          <div className="start-menu-side">NURIA · OS</div>
          <div className="start-menu-list">
            {/* Quick Access — recruiter-first shortcuts (no pitch) */}
            <div className="start-section-label">⚡ {lang === 'de' ? 'Quick Access' : 'Quick Access'}</div>
            <StartItem
              glyph="⬇"
              label={t.download_cv}
              hot
              onClick={downloadCV}
            />
            <StartItem
              glyph="✉"
              label={lang === 'de' ? 'Mail an Nuria' : 'Email Nuria'}
              hot
              onClick={() => {
                window.location.href = `mailto:${NURIA.email}?subject=${encodeURIComponent(lang==='de' ? 'Praxissemester WS 26/27 — Anfrage' : 'Internship Fall 26 / Spring 27 — Inquiry')}`;
              }}
            />
            <div className="start-divider" />
            <div className="start-section-label">{lang === 'de' ? '🗂 Programme' : '🗂 Programs'}</div>
            <StartItem glyph="🧑‍💼" label="Recruiter.exe" onClick={() => openWindow('recruiter')} />
            <StartItem glyph="📂" label={lang==='de'?'Projekte':'Projects'} onClick={() => openWindow('projects')} />
            {/* Vinted_Rewind shortcut removed from Start menu per request */}
            <StartItem glyph="📄" label={lang==='de'?'About_Me.txt':'About_Me.txt'} onClick={() => openWindow('about')} />
            <StartItem glyph="✉️" label="Contact.exe" onClick={() => openWindow('contact')} />
            <StartItem glyph="💬" label="NuriaBot (chat)" onClick={() => openWindow('chat')} />
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <button className={`start-btn ${startOpen?'open':''}`} onClick={() => { setStartOpen(s => !s); revealDesktop(); }}>
          <span style={{fontSize:14}}>✦</span> {t.start}
        </button>
        {windows.map(w => (
          <button
            key={w.id}
            className={`task-btn ${activeId === w.id && !w.minimized ? 'active' : ''}`}
            onClick={() => {
              if (w.minimized || activeId !== w.id) focusWindow(w.id);
              else minimizeWindow(w.id);
            }}
          >
            <span>{w.icon}</span><span>{getTitle(w.id).replace(/ — .*$/, '')}</span>
          </button>
        ))}
        <div className="tray">
          <div className="lang-toggle wp-toggle" title={lang==='de' ? 'Hintergrund wechseln' : 'Switch background'}>
            <button className={tweaks.wallpaper==='slate-blue'?'on':''} onClick={() => setTweak('wallpaper','slate-blue')} aria-label={lang==='de' ? 'Blauer Hintergrund' : 'Blue background'}>🟦</button>
            <button className={tweaks.wallpaper==='pixel-land'?'on':''} onClick={() => setTweak('wallpaper','pixel-land')} aria-label={lang==='de' ? 'Pixel-Hintergrund' : 'Pixel background'}>🌄</button>
          </div>
          <div className="lang-toggle">
            <button className={lang==='de'?'on':''} onClick={() => setLang('de')}>DE</button>
            <button className={lang==='en'?'on':''} onClick={() => setLang('en')}>EN</button>
          </div>
          <span className="tray-icon" title="Mood: focused">🌙</span>
          <Clock />
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox items={lightbox.items} index={lightbox.index} onClose={closeLightbox} onPrev={lbPrev} onNext={lbNext} lang={lang} />
      )}

      {/* WIP loading modal — Win95 dialog for in-progress projects */}
      {wipModal && WIPLoadingModal && (
        <WIPLoadingModal
          project={wipModal}
          lang={lang}
          onClose={() => setWipModal(null)}
        />
      )}

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Wallpaper">
          <TweakRadio
            label="Preset"
            value={tweaks.wallpaper}
            onChange={v => setTweak('wallpaper', v)}
            options={[
              { value: 'pixel-land',   label: 'Pixel Land' },
              { value: 'slate-blue',   label: 'Slate Blue' },
              { value: 'lilac-sunset', label: 'Lilac' },
              { value: 'mint-cloud',   label: 'Mint' },
              { value: 'peach-sky',    label: 'Peach' },
              { value: 'pixel-night',  label: 'Night' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Accent">
          <TweakColor
            label="Palette"
            value={tweaks.accent}
            onChange={v => setTweak('accent', v)}
            options={ACCENT_OPTIONS}
          />
        </TweakSection>
        <TweakSection label="Y2K vibe">
          <TweakSlider
            label="Intensity"
            value={tweaks.intensity}
            onChange={v => setTweak('intensity', v)}
            min={0} max={2} step={0.1}
          />
          <TweakToggle label="Klippi" value={tweaks.showClippy} onChange={v => setTweak('showClippy', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function StartItem({ glyph, label, onClick, hot }) {
  return (
    <div className={`start-item ${hot ? 'start-item-hot' : ''}`} onClick={onClick}>
      <span className="glyph">{glyph}</span>
      <span>{label}</span>
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(i);
  }, []);
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  return <span style={{fontFamily:'var(--font-pixel)', fontSize: 12, minWidth: 38, textAlign:'center'}}>{hh}:{mm}</span>;
}

function BootScreen({ lang }) {
  /* Windows-XP-style boot splash as the portfolio intro: centred logo,
     the iconic scrolling loading bar, and a footer line. */
  return (
    <div className="boot boot-xp">
      <div className="boot-xp-center">
        <div className="boot-logo">NURIA·OS</div>
        <div className="boot-xp-sub">{lang === 'de' ? 'Portfolio · UX / Service Design' : 'Portfolio · UX / Service Design'}</div>
        <div className="boot-xp-bar" aria-hidden="true">
          <div className="boot-xp-fill" />
        </div>
        <div className="boot-xp-loading mono">{lang === 'de' ? 'Lädt…' : 'Loading…'}</div>
      </div>
      <div className="boot-xp-foot mono">
        <span>© {new Date().getFullYear()} {NURIA.name}</span>
        <span>{lang === 'de' ? 'Built solo · React + n8n + Kaffee' : 'Built solo · React + n8n + coffee'}</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);