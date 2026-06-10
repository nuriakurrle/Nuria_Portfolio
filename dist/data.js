(function(){
const NURIA = {
  name: "Nuria Kurrle",
  email: "nuria.kurrle.nk@gmail.com",
  linkedin: "www.linkedin.com/in/nuria-kurrle",
  phone: "+49 176 32133961",
  location: "M\xFCnchen \xB7 Ottobrunn",
  available: "Praxissemester \xB7 WS 26/27",
  photo: "assets/funsies/nuria_cutout.webp",
  /* transparent-bg cutout — Recruiter card */
  pixelPhoto: "assets/funsies/pixel_me.png"
  /* pixel-art portrait — About Me header */
};
const STR = {
  de: {
    role: "UX/UI \xB7 Service Design \u2014 B.Sc. Informatik & Design (HM M\xFCnchen, 4. Sem.)",
    tagline: "Ich denke in Systemen, nicht in Screens: Service Design hei\xDFt, alle Touchpoints zusammenzudenken und Menschen echte Last abzunehmen.",
    availability: "Praxissemester \xB7 WS 26/27 \xB7 nur M\xFCnchen",
    open: "\xD6ffnen",
    download_cv: "CV als PDF",
    contact_cta: "Mail schreiben",
    linkedin_cta: "LinkedIn",
    figma_cta: "In Figma \xF6ffnen",
    figma_section: "Live in Figma",
    figma_hint: "Originaldatei im Embed unten \u2014 oder im neuen Tab \xF6ffnen.",
    deck_cta: "Pr\xE4sentation \xF6ffnen",
    deck_section: "Team-Pr\xE4sentation",
    deck_hint: "Die finale Projektpr\xE4sentation als Figma-Deck \u2014 durchklicken oder im neuen Tab \xF6ffnen.",
    top_projects: "Ausgew\xE4hlte Projekte",
    skills_section: "Skills & Tools",
    cv_section: "Werdegang",
    contact_section: "Kontakt",
    methods: "Methoden",
    tools: "Tools",
    languages: "Sprachen",
    soft_skills: "Mindset",
    role_label: "Rolle",
    duration_label: "Dauer",
    team_label: "Team",
    problem_label: "Problem",
    process_label: "Prozess",
    insights_label: "Insights",
    hmw_label: "How might we\u2026",
    concept_label: "Konzept",
    outcome_label: "Ergebnis",
    learnings_label: "Learnings",
    metrics_label: "Kennzahlen",
    research_label: "Research-Methoden",
    coming_soon: "In Arbeit",
    progress: "Fortschritt",
    phase: "Phase",
    file: "Datei",
    edit: "Bearbeiten",
    view: "Ansicht",
    help: "Hilfe",
    start: "Start",
    close: "Schlie\xDFen",
    minimize: "Minimieren",
    maximize: "Maximieren",
    placeholder_caption: (cap) => `Bild: ${cap}`,
    recruiter_intro: "Studentin der Informatik & Design an der HM M\xFCnchen, 4. Semester, Schwerpunkt UX & Service Design. Ich arbeite research-first \u2014 Interviews und User Journeys bis Figma-Prototypen und Code (TypeScript/React, n8n). Suche ein Praxissemester f\xFCr WS 26/27 in M\xFCnchen.",
    recruiter_quote: '\u201EIch denke in Systemen, nicht in Screens: Service Design hei\xDFt, alle Touchpoints zusammenzudenken und Menschen echte Last abzunehmen."',
    why_me: "Was ich mitbringe",
    why_bullets: [
      "Research-first: Interviews, Personas, User Journeys, Usability Tests.",
      "Hands-on bis ins UI: Figma, TypeScript/React, HTML/CSS.",
      "Detailbewusst \u2014 Tonfall, Typografie, Touchpoints.",
      "Eigeninitiative: Brand-Guide f\xFCr Atolls ohne Briefing geliefert."
    ],
    top3_intro: "Drei Case Studies, drei verschiedene Probleme \u2014 zum Aufklappen oder im Vollbild \xF6ffnen:",
    timeline_items: [
      { year: "Okt 2024 \u2013 jetzt", title: "B.Sc. Informatik & Design \xB7 Hochschule M\xFCnchen", body: "4. Semester. Schwerpunkt UX & Service Design. Projekte: Atolls Review Hub, Echoes of Moosburg, Vinted Rebrand." },
      { year: "Nov 2024 \u2013 Feb 2025", title: "Aushilfe Einzelhandel \xB7 Bazaar Noir", body: "Kundenberatung, Warenpr\xE4sentation, Verkaufsbereich." },
      { year: "Okt 2022 \u2013 Jul 2024", title: "B.Sc. Medieninformatik \xB7 Hochschule Hof", body: "Grundlagen Java, Webentwicklung, UI-Gestaltung. Erste Figma- und Blender-Erfahrung." },
      { year: "Okt 2019 \u2013 Sep 2022", title: "Aushilfe \xB7 Schreibwaren Westermair", body: "Kasse, Lotto- und Postvorg\xE4nge, Kund:innen-Support." },
      { year: "2019 \u2013 2022", title: "Allgemeine Hochschulreife \xB7 Therese-von-Bayern Schule", body: "Schwerpunkt Wirtschaft. Pflichtpraktikum im Einzelhandel." },
      { year: "Sep 2018 \u2013 Feb 2019", title: "11. Klasse \xB7 Colegio Salliver, Spanien", body: "Auslandsschuljahr in Andalusien." }
    ],
    skills: {
      methods: ["User Research", "Interviews", "Personas", "User Journeys", "Usability Testing", "Service Design", "Prototyping"],
      tools: ["Figma", "TypeScript / React", "JavaScript", "HTML / CSS", "Python (Grundkenntnisse)", "n8n (Grundkenntnisse)", "FigJam", "Miro", "Notion"],
      langs: ["Spanisch \xB7 Muttersprache", "Deutsch \xB7 Flie\xDFend", "Englisch \xB7 B2", "Italienisch \xB7 A1"],
      soft: ["Eigeninitiative", "Strukturiertes Denken", "Liebe zum Tonfall", "Iteriert gern (zu) oft"]
    },
    skill_bars: [
      { label: "Figma", pct: 90 },
      { label: "User Research", pct: 85 },
      { label: "Service Design", pct: 78 },
      { label: "TypeScript/React", pct: 70 },
      { label: "n8n / Workflows", pct: 60 }
    ],
    clippy: '\u{1F44B} Du bist auf meinem Y2K-Playground \u2014 ein Portfolio in OS-Form, kein echtes Tool. Recruiter? Klick \u201ERecruiter.exe". Sonst: erkunde frei.',
    rules_title: "\u2726 Anleitung \u2726",
    rules_lines: [
      'Recruiter? \u2192 \u201ERecruiter.exe" \xF6ffnet sich gleich von selbst.',
      "Projekte? \u2192 Icons klicken.",
      "Mail? \u2192 \u2709 in der Toolbar oder Klippi fragen \u{1F4CE}",
      "Lost? \u2192 Alles ist nur ein Klick weg. Promise."
    ],
    rules_pin: "\u{1F4CC}"
  },
  en: {
    role: "UX/UI \xB7 Service Design \u2014 B.Sc. Computer Science & Design (HM Munich, 4th sem.)",
    tagline: "I think in systems, not screens: service design means connecting every touchpoint and taking real load off people.",
    availability: "Practical semester \xB7 Fall 26 / Spring 27 \xB7 Munich only",
    open: "Open",
    download_cv: "CV as PDF",
    contact_cta: "Send email",
    linkedin_cta: "LinkedIn",
    figma_cta: "Open in Figma",
    figma_section: "Live in Figma",
    figma_hint: "Original file embedded below \u2014 or open it in a new tab.",
    deck_cta: "Open presentation",
    deck_section: "Team Presentation",
    deck_hint: "The final project presentation as a Figma deck \u2014 click through or open it in a new tab.",
    top_projects: "Selected projects",
    skills_section: "Skills & tools",
    cv_section: "Background",
    contact_section: "Contact",
    methods: "Methods",
    tools: "Tools",
    languages: "Languages",
    soft_skills: "Mindset",
    role_label: "Role",
    duration_label: "Duration",
    team_label: "Team",
    problem_label: "Problem",
    process_label: "Process",
    insights_label: "Insights",
    hmw_label: "How might we\u2026",
    concept_label: "Concept",
    outcome_label: "Outcome",
    learnings_label: "Learnings",
    metrics_label: "Metrics",
    research_label: "Research methods",
    coming_soon: "In progress",
    progress: "Progress",
    phase: "Phase",
    file: "File",
    edit: "Edit",
    view: "View",
    help: "Help",
    start: "Start",
    close: "Close",
    minimize: "Minimize",
    maximize: "Maximize",
    placeholder_caption: (cap) => `image: ${cap}`,
    recruiter_intro: "Computer Science & Design student at HM Munich, 4th semester, focused on UX & service design. Research-first \u2014 interviews and user journeys through Figma prototypes and code (TypeScript/React). Looking for a practical semester for Fall 26 / Spring 27 in Munich.",
    recruiter_quote: '"I think in systems, not screens: service design means connecting every touchpoint and taking real load off people."',
    why_me: "What I bring",
    why_bullets: [
      "Research-first: interviews, personas, user journeys, usability tests.",
      "Hands-on through to UI: Figma, TypeScript/React, HTML/CSS.",
      "Detail-driven \u2014 tone, typography, touchpoints.",
      "Initiative: shipped a full brand guide for Atolls \u2014 unbriefed."
    ],
    top3_intro: "Three case studies, three different problems \u2014 expand inline or open in a window:",
    timeline_items: [
      { year: "Oct 2024 \u2013 now", title: "B.Sc. Computer Science & Design \xB7 HM Munich", body: "4th semester. Focus on UX & service design. Projects: Atolls Review Hub, Echoes of Moosburg, Vinted rebrand." },
      { year: "Nov 2024 \u2013 Feb 2025", title: "Retail assistant \xB7 Bazaar Noir", body: "Customer advice, merchandising, sales floor." },
      { year: "Oct 2022 \u2013 Jul 2024", title: "B.Sc. Media Informatics \xB7 HS Hof", body: "Foundations in Java, web dev, UI design. First Figma and Blender work." },
      { year: "Oct 2019 \u2013 Sep 2022", title: "Cashier \xB7 Schreibwaren Westermair", body: "Till, lottery and postal services, customer questions." },
      { year: "2019 \u2013 2022", title: "Abitur \xB7 Therese-von-Bayern Schule", body: "Focus on economics. Mandatory retail internship." },
      { year: "Sep 2018 \u2013 Feb 2019", title: "Grade 11 \xB7 Colegio Salliver, Spain", body: "Exchange year in Andalusia." }
    ],
    skills: {
      methods: ["User Research", "Interviews", "Personas", "User Journeys", "Usability Testing", "Service Design", "Prototyping"],
      tools: ["Figma", "TypeScript / React", "JavaScript", "HTML / CSS", "Python (basics)", "n8n (basics)", "FigJam", "Miro", "Notion"],
      langs: ["Spanish \xB7 native", "German \xB7 fluent", "English \xB7 B2", "Italian \xB7 A1"],
      soft: ["Self-driven", "Structured thinking", "Tone-of-voice obsessed", "Iterates (too) often"]
    },
    skill_bars: [
      { label: "Figma", pct: 90 },
      { label: "User Research", pct: 85 },
      { label: "Service Design", pct: 78 },
      { label: "TypeScript/React", pct: 70 },
      { label: "n8n / Workflows", pct: 60 }
    ],
    clippy: `\u{1F44B} You're on my Y2K playground \u2014 a portfolio in OS shape, not an actual tool. Recruiter? Click "Recruiter.exe". Otherwise, feel free to wander.`,
    rules_title: "\u2726 How this works \u2726",
    rules_lines: [
      'Recruiter? \u2192 "Recruiter.exe" opens itself in a sec.',
      "Projects? \u2192 Double-click an icon.",
      "Mail? \u2192 \u2709 in the toolbar, or ask Klippi \u{1F4CE}",
      "Lost? \u2192 Everything is one click away. Promise."
    ],
    rules_pin: "\u{1F4CC}"
  }
};
const PROJECTS = [
  {
    id: "atolls",
    emoji: "\u{1F916}",
    color: "mint",
    status: "completed",
    cover: "assets/icons/atolls.png",
    coverFit: "contain",
    figmaUrl: "https://www.figma.com/proto/rR33nuiFMFkuCCcSIY15Vx/Atolls?node-id=623-1163&p=f&t=pkc8so25hfVvltRd-0&scaling=scale-down&content-scaling=fixed&page-id=623%3A1158",
    figmaEmbedUrl: "https://embed.figma.com/proto/rR33nuiFMFkuCCcSIY15Vx/Atolls?node-id=623-1163&p=f&scaling=scale-down&content-scaling=fixed&page-id=623%3A1158&embed-host=share",
    documentation: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/Team C_ Atolls Glassdoor Dokumentation (1).pdf",
    devLog: {
      stack: ["n8n", "OpenAI API", "Next.js", "TypeScript", "React", "Slack API", "Google Sheets API"],
      builtSolo: "~60% Frontend",
      role: "UX + Workflow + Frontend Dev",
      notes_de: [
        "[w1]  Karla-Interview \u2192 JTBD: klassifizieren, antworten, auswerten",
        "[w1]  n8n-Form \u2192 Sentiment-Analyse (positiv/neutral/negativ) \u2192 Google Sheet",
        "[w2]  AI-Agent generiert Antwortvorschl\xE4ge im analysierten Atolls-Tonfall",
        "[w3]  Paralleler Workflow: Keyword-Extraktion aus negativen Reviews (salary, communication, management)",
        "[w3]  Slack-Benachrichtigung je nach Sentiment in unterschiedliche Channels",
        "[w4]  Next.js/React-Frontend (Home \xB7 Inbox \xB7 Insights) solo gebaut, ~60% des Codes",
        "[w4]  4 Webhook-Workflows als API zwischen Frontend und n8n"
      ],
      notes_en: [
        "[w1]  Karla interview \u2192 JTBD: classify, reply, evaluate",
        "[w1]  n8n form \u2192 sentiment analysis (positive/neutral/negative) \u2192 Google Sheet",
        "[w2]  AI agent drafts replies in the analyzed Atolls tone of voice",
        "[w3]  parallel workflow: keyword extraction from negative reviews (salary, communication, management)",
        "[w3]  Slack notification routed by sentiment to different channels",
        "[w4]  built Next.js/React frontend (Home \xB7 Inbox \xB7 Insights) solo, ~60% of code",
        "[w4]  4 webhook workflows as an API between frontend and n8n"
      ],
      links: [
        { label: "GitHub (privat)", href: "#", icon: "\u25B6" },
        { label: "Figma \u2014 UI", href: "#", icon: "\u25B6" },
        { label: "n8n Workflow", href: "#", icon: "\u25B6" }
      ]
    },
    de: {
      title: "Atolls Review Hub",
      windowTitle: "Atolls_Review_Hub.exe \u2014 Feedback als strategische Ressource \u{1F4AC}",
      description: "KI-gest\xFCtztes Review-Management f\xFCr Atolls \u2014 Sentiment-Analyse, CI-konforme Antwortvorschl\xE4ge und ein Insights-Dashboard, das Feedback von reaktiver Pflicht zur strategischen Ressource macht.",
      heroImage: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/atolls_hero.webp",
      keyInsight: "Happy Employees = Better Performance. Feedback ist ein Geschenk \u2014 richtig strukturiert und reflektiert wird es von der reaktiven Pflicht zur strategischen Ressource.",
      /* ── Problem (old format — deprecated) ───────────────────────────────────────────────────── */
      problemStatement: "Bei Atolls war der Umgang mit Glassdoor-Reviews reine Handarbeit \u2014 lesen, bewerten, im richtigen Ton antworten, Review f\xFCr Review. Hoher kognitiver Aufwand, und wiederkehrende Muster gingen dabei unter.",
      problemContext: "Zu Projektbeginn ging es nicht um schnelle L\xF6sungen, sondern darum, den realen Arbeitsalltag, die bestehenden Herausforderungen und die emotionale Belastung im Umgang mit Feedback sichtbar zu machen. User Journey Maps des Status quo zeigten einen Prozess voller manueller T\xE4tigkeiten, Wiederholungen, Unsicherheiten und hohem kognitivem Aufwand. Das Kernproblem war weniger technisch als kulturell: Feedback wurde reaktiv abgearbeitet statt strukturiert ausgewertet \u2014 einzelne Reviews wurden beantwortet, aber Trends und wiederkehrende Themen blieben unsichtbar.",
      /* ── Echoes-style sections — fill to enable (see echoes for the shape) ── */
      problemGallery: [
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/review_bsp1.webp", caption: "Ein typisches Glassdoor-Review \u2014 jedes wird einzeln gelesen, bewertet und im Atolls-Ton beantwortet." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/review_bsp2.webp", caption: "Kritische Reviews wie dieses gingen einzeln durch \u2014 statt als Trend oder Warnsignal erkannt zu werden." }
      ],
      /* [{ src, caption }] → Problem as sticky-scroll gallery */
      designCarousel: [
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/review_inbox.webp", caption: "Review Inbox \u2014 KI klassifiziert jedes Review und schl\xE4gt eine Antwort im Atolls-Ton vor." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/filtern.webp", caption: "Filtern & Priorisieren \u2014 nach Sentiment, Thema und Dringlichkeit sortieren." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/edit.webp", caption: "Approve oder editieren \u2014 Karla beh\xE4lt die finale Kontrolle \xFCber jede Antwort." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/warning.webp", caption: "Warnsignal \u2014 wiederkehrende kritische Themen werden als Alert markiert, nicht einzeln abgehakt." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/insight_dash.webp", caption: "Insights-Dashboard \u2014 Sentiment-Trend und Problem-Radar auf einen Blick." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/insight_summary.webp", caption: "Insight-Summary \u2014 automatische Zusammenfassung der wichtigsten Themen." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/distribution.webp", caption: "Verteilung \u2014 Reviews nach Kategorie und Sentiment aufgeschl\xFCsselt." }
      ],
      /* [{ src, caption, bare }] → Solution as sticky-scroll */
      brandQr: { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/branding_guide.webp", link: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/Branding.pdf" },
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      /* system journey (rose route) */
      problemImage: "",
      /* ── Research ──────────────────────────────────────────────────── */
      researchContext: 'Im 60-Minuten-Interview mit Karla kam es schnell raus: sie konnte nicht erkl\xE4ren, \u201Ewarum" sie so antwortete \u2014 nur \u201Ewie Atolls antworten w\xFCrde". Das Designproblem war Empathie und Tonfall, nicht UI. Deshalb: erst Language Guide, dann KI.',
      researchImage: "",
      researchGallery: [
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/journey_without.webp", caption: "User Journey ohne System \u2014 Karlas manueller Ablauf: lesen, bewerten, antworten, posten." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/journey_with.webp", caption: "User Journey mit System \u2014 wo der KI-Agent unterst\xFCtzt und wo der Mensch entscheidet." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/team_photo.webp", caption: "Das Team hinter dem Atolls Review Hub \u2014 HM M\xFCnchen." }
      ],
      research: [
        '60-Min-Interview mit Karla (HR-Lead): bestehende Prozesse rund um Glassdoor-Reviews, emotionale Last, was eine \u201Egute" Antwort ausmacht',
        "Vor-Ort-Interview in M\xFCnchen mit Maria: m\xF6gliche Erweiterungen des Use Cases & Zukunftspotenziale",
        "User Journey Mapping \u2014 Status quo (manuell, stressig) vs. mit KI-Agent (schneller, konsistenter)",
        "Analyse eines Sheets mit bereits beantworteten Reviews \u2014 realistische Einblicke in Antwortlogik, Tonalit\xE4t & Entscheidungsprozesse",
        "Ableitung zentraler Nutzerbed\xFCrfnisse: klare Interfaces, einfache & schnelle Nutzung, CI-konforme Sprache, Unterst\xFCtzung ohne Vollautomation"
      ],
      insights: [
        "Feedback wird reaktiv beantwortet statt strukturiert ausgewertet \u2014 Trends und Muster gehen verloren.",
        "Der Prozess ist manuell, repetitiv und kognitiv aufw\xE4ndig \u2014 genau hier kann KI entlasten.",
        "Nutzer:innen wollen Unterst\xFCtzung ohne Vollautomation: klare Interfaces, schnelle Nutzung und Kontrolle \xFCber die Antwort.",
        "CI-konforme, konsistente Sprache ist zentral \u2014 eine generische KI-Stimme w\xFCrde der Marke schaden.",
        "Zentrale Limitation: kein vollst\xE4ndiger Zugriff auf Glassdoor-Daten und Company-Guidelines \u2014 Konzepte mussten innerhalb dieser Rahmenbedingungen entstehen."
      ],
      hmw: [
        'Wie schaffen wir es, dass eine KI \u201Ewie Atolls" klingt \u2014 ohne dass Atolls das je formalisiert hat?',
        "Wie nehmen wir HR die emotionale Last negativer Reviews ab, ohne Empathie zu verlieren?",
        "Wie machen wir aus reaktiver Antwort-Arbeit ein Fr\xFChwarnsystem f\xFCr Kulturthemen?"
      ],
      /* ── Solution ──────────────────────────────────────────────────── */
      solutionStatement: "Ein KI-gest\xFCtztes Workflow-System (n8n), das Feedback nicht nur effizienter beantwortet, sondern strukturiert auswertbar macht \u2014 von der Sentiment-Analyse bis zum Fr\xFChwarn-Dashboard.",
      solutionContext: "Kern ist ein n8n-Workflow: Eine Review l\xE4uft \xFCber eine Sentiment-Analyse in eine strukturierte Speicherung (Google Sheets), ein AI-Agent generiert auf Basis des analysierten Atolls-Tonfalls einen passenden Antwortvorschlag. Ein zweiter, paralleler Workflow extrahiert aus negativen Reviews wiederkehrende Themen (salary, communication, management) und macht sie sichtbar; je nach Sentiment geht eine Slack-Benachrichtigung an unterschiedliche Channels. Vier Webhook-Workflows verbinden das Backend als API mit einem Next.js/React-Frontend aus drei Seiten: Home, Review Inbox (Antworten bearbeiten/ver\xF6ffentlichen) und Insights-Dashboard (Sentiment-Verteilung, Stimmung \xFCber Zeit, Top-Keywords negativer Reviews, KI-Zusammenfassung, Warn-Pop-up bei zu vielen negativen Reviews). Zus\xE4tzlich \u2014 \xFCber das Briefing hinaus \u2014 entstanden ein Branding- und ein Language-Guide, damit Interface und KI-Antworten konsistent im Atolls-Ton bleiben.",
      solutionImage: "",
      concept: "Zwei Use Cases im selben System: (1) Review Inbox \u2014 KI klassifiziert, generiert Antwortvorschlag im Atolls-Ton, Karla approved oder editiert. (2) Insights Dashboard \u2014 Keyword-Extraktion erkennt wiederkehrende Probleme (salary, communication, culture) als Fr\xFChwarnsystem. Beide laufen in n8n, Frontend in Next.js, Datenhaltung in Google Sheets.",
      beforeImage: "",
      afterImage: "",
      designScreens: [
        {
          name: "Review Inbox",
          description: "Alle eingehenden Reviews mit AI-generierten Antworten. Sentiment-Tag (Positive / Neutral / Negative), Antwort bearbeiten oder ver\xF6ffentlichen.",
          image: ""
        },
        {
          name: "Insights Dashboard",
          description: "Sentiment-Trend, Problem-Radar (Top-Keywords aus negativen Reviews), AI-Summary, Alert wenn zu viele Negativ-Reviews. Das ist das Fr\xFChwarnsystem f\xFCr Kulturthemen.",
          image: ""
        },
        {
          name: "Brand & Language Guide",
          description: "Branding Guide (Vision, Values, Personality, Farbsystem, Typografie S\xF6hne) und ein Language Guide mit Tone of Voice, Style Principles und Do's/Don'ts \u2014 \xFCber das Briefing hinaus erstellt.",
          image: ""
        }
      ],
      /* ── Results ───────────────────────────────────────────────────── */
      outcome: "Ein funktionierender Prototyp des Review-Management-Systems, getestet mit Karla und dem Atolls-Team. Das Konzept gibt Atolls ein Fr\xFChwarnsystem f\xFCr kritische Themen, macht Trends unter Reviewer:innen sichtbar statt isolierter Einzelmeinungen und schafft eine Grundlage f\xFCr datenbasierte Verbesserungen interner Prozesse. So wird Feedback von einer reaktiven Pflicht zur strategischen Ressource. Zus\xE4tzlich entstanden ein Branding- und ein Language-Guide, die Atolls auch \xFCber das Projekt hinaus nutzen kann.",
      resultsImage: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/Home.webp",
      metrics: [
        { l: "Interviews", v: "2" },
        { l: "Frontend-Seiten", v: "3" },
        { l: "n8n-Webhooks", v: "4" },
        { l: "Sentiment-Klassen", v: "3" }
      ],
      /* ── Learnings ─────────────────────────────────────────────────── */
      learnings: [
        "Reale Projektpartner sind eine Chance. Die Zusammenarbeit mit Atolls machte Komplexit\xE4t, Einschr\xE4nkungen und echte Entscheidungslogiken sichtbar \u2014 wertvoller als jede Annahme.",
        "Workarounds sind wertvolle Learnings, kein Scheitern. Fehlende Glassdoor-API und Guidelines zwangen zu kreativen, l\xF6sungsorientierten Wegen.",
        "Nicht auf perfekte Voraussetzungen warten. Ins Tun kommen, Annahmen testen und iterativ lernen bringt mehr als das Warten auf vollst\xE4ndige Daten.",
        "KI im Feedback-Kontext ist nicht rein technisch. Sie muss organisatorisch, kulturell und kommunikativ gedacht werden \u2014 sonst klingt sie generisch.",
        "Klare Kommunikation im Team und mit Betreuer:innen hat enormen Einfluss auf den Projekterfolg.",
        "Happy Employees = Better Performance \u2014 oder: Every feedback is a gift. Richtig ausgewertet wird Feedback von der reaktiven Pflicht zur strategischen Ressource."
      ],
      wouldChange: [
        "Den Language Guide direkt in den GPT-Prompt schreiben, statt drumrum zu designen \u2014 wir haben den Guide als separates Dokument gepflegt und manuell in den Prompt synchronisiert. Zwei Wahrheiten, ein Drift-Risiko.",
        "Mehr Tonfall-Beispiele pro Review-Typ sammeln. Beim ersten Prototyp klang die KI in Edge Cases (Salary-Kritik, Manager-Beschwerden) noch zu generisch \u2014 mehr Beispiele h\xE4tten die Antworten treffsicherer gemacht.",
        "Bi-Weekly-Calls mit Karla einplanen, nicht nur Kick-off + \xDCbergabe. Die Pattern in den 40 Reviews h\xE4tte ich fr\xFCher gesehen \u2014 Karla hat Dinge im Vorbeigehen gesagt, die Wochen sp\xE4ter Kern-Insights wurden.",
        "Approve/Edit-Buttons mit Tonfall-Slider testen (formaler / w\xE4rmer / direkter). Karla wollte Kontrolle ohne Mehrarbeit \u2014 ein Slider h\xE4tte das in 2 Sekunden gel\xF6st, statt sie zum manuellen Umformulieren zu zwingen."
      ],
      /* ── Reflection ────────────────────────────────────────────────── */
      reflection: "Das gr\xF6\xDFte Learning: KI im Feedback-Kontext ist nicht rein technisch \u2014 sie muss organisatorisch, kulturell und kommunikativ gedacht werden. Die Zusammenarbeit mit einem echten Partner und das Testing mit Karla haben Annahmen praxisnah \xFCberpr\xFCft. Und: Der Arbeitsprozess endet nicht mit einer fertigen L\xF6sung, sondern mit einem klaren Verst\xE4ndnis von Potenzial, Grenzen und n\xE4chsten Schritten \u2014 richtig strukturiert wird Feedback von einer reaktiven Pflicht zur strategischen Ressource.",
      /* ── Existing meta + media ─────────────────────────────────────── */
      tldr: {
        problem: "Feedback wird reaktiv abgearbeitet statt strukturiert ausgewertet \u2014 Trends gehen unter.",
        myRole: "UX Research + n8n-Workflow + Next.js-Frontend + Branding-/Language-Guide (~60 % solo).",
        solution: "KI-gest\xFCtztes n8n-Workflow-System: Sentiment, Antwort-Agent im Atolls-Ton, Keyword-Auswertung + Next.js-Frontend.",
        outcome: "Funktionierender Prototyp + Fr\xFChwarnsystem f\xFCr Kulturthemen. Feedback wird zur strategischen Ressource."
      },
      problemShort: "Bei Atolls wird Feedback reaktiv und manuell abgearbeitet statt strukturiert ausgewertet \u2014 Trends und Muster gehen verloren.",
      solutionShort: "KI-gest\xFCtztes Review-Management: n8n-Pipeline (Sentiment, Antwort-Agent, Keyword-Auswertung, Slack) + Next.js-Dashboard mit Review Inbox & Insights. Plus Branding- & Language-Guide.",
      role: "UX Research, Brand-Architektur, n8n-Workflow, Frontend-Dev",
      duration: "WS 2025/26",
      team: "Team C (4 Personen)",
      tools: ["n8n", "OpenAI API", "Next.js", "React", "Figma", "Google Sheets"],
      roleChips: ["\u{1F50D} Research", "\u{1F3A8} Brand", "\u{1F916} AI Workflow", "\u{1F4BB} Frontend"],
      media: [
        { type: "video", src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/atolls_video.mp4", caption: "System-Walkthrough: Review Inbox \u2192 Insights Dashboard", duration: "01:24", width: 1280, height: 720 },
        { type: "image", caption: "User Journey: ohne KI vs. mit KI", width: 1200, height: 800 },
        { type: "image", caption: "n8n Pipeline \u2014 5 Stufen mit Tonfall als Constraint", width: 1600, height: 900 },
        { type: "image", caption: "Review Inbox \u2014 KI-Antwortvorschl\xE4ge im Atolls-Ton", width: 1280, height: 800 },
        { type: "image", caption: "Insights Dashboard \u2014 Sentiment-Trend + Problem-Radar", width: 1280, height: 800 },
        { type: "image", caption: "Brand Guide \u2014 Vision, Values, Color System", width: 1e3, height: 1400 },
        { type: "image", caption: "Language Guide \u2014 Tonfall-Beispiele mit DO's & DON'Ts", width: 1200, height: 900 }
      ]
    },
    en: {
      title: "Atolls Review Hub",
      windowTitle: "Atolls_Review_Hub.exe \u2014 feedback as a strategic resource \u{1F4AC}",
      description: "AI-supported review management for Atolls \u2014 sentiment analysis, CI-compliant reply suggestions and an insights dashboard that turns feedback from a reactive duty into a strategic resource.",
      heroImage: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/atolls_hero.webp",
      keyInsight: "Happy employees = better performance. Every feedback is a gift \u2014 structured and reflected on properly, it shifts from a reactive duty to a strategic resource.",
      /* ── Problem ───────────────────────────────────────────────────── */
      problemStatement: "At Atolls, handling Glassdoor reviews was all manual \u2014 read, tag, reply in the right tone, one review at a time. High cognitive load, and recurring patterns slipped through.",
      problemContext: "The project didn't start with quick fixes but with making the real workday, existing challenges and emotional load of handling feedback visible. User journey maps of the status quo revealed a process full of manual steps, repetition, uncertainty and high cognitive load. The core problem was less technical than cultural: feedback was processed reactively instead of evaluated in a structured way \u2014 individual reviews got answered, but trends and recurring themes stayed invisible.",
      /* ── Echoes-style sections — fill to enable (see echoes for the shape) ── */
      problemGallery: [
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/review_bsp1.webp", caption: "A typical Glassdoor review \u2014 each one read, tagged and answered in the Atolls voice by hand." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/review_bsp2.webp", caption: "Critical reviews like this slipped through one at a time \u2014 instead of being caught as a trend or warning sign." }
      ],
      /* [{ src, caption }] → Problem as sticky-scroll gallery */
      designCarousel: [
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/review_inbox.webp", caption: "Review inbox \u2014 AI classifies each review and drafts a reply in Atolls' voice." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/filtern.webp", caption: "Filter & prioritise \u2014 sort by sentiment, topic and urgency." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/edit.webp", caption: "Approve or edit \u2014 Karla keeps final control over every reply." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/warning.webp", caption: "Warning signal \u2014 recurring critical topics are flagged as an alert, not ticked off one by one." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/insight_dash.webp", caption: "Insights dashboard \u2014 sentiment trend and problem radar at a glance." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/insight_summary.webp", caption: "Insight summary \u2014 automatic recap of the most important themes." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/distribution.webp", caption: "Distribution \u2014 reviews broken down by category and sentiment." }
      ],
      /* [{ src, caption, bare }] → Solution as sticky-scroll */
      brandQr: { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/branding_guide.webp", link: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/Branding.pdf" },
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      /* system journey (rose route) */
      problemImage: "",
      /* ── Research ──────────────────────────────────────────────────── */
      researchContext: `In the 60-minute interview with Karla it surfaced quickly: she couldn't explain *why* she replied the way she did \u2014 only that she replied "the way Atolls would". The design problem was empathy and tone, not UI. So: language guide first, AI second.`,
      researchImage: "",
      researchGallery: [
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/journey_without.webp", caption: "User journey without the system \u2014 Karla's manual flow: read, tag, reply, post." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/journey_with.webp", caption: "User journey with the system \u2014 where the AI agent assists and where the human decides." },
        { src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/team_photo.webp", caption: "The team behind the Atolls Review Hub \u2014 HM Munich." }
      ],
      research: [
        '60-min interview with Karla (HR lead): existing Glassdoor-review processes, emotional load, what makes a "good" reply',
        "On-site interview in Munich with Maria: possible use-case extensions & future potential",
        "User journey mapping \u2014 status quo (manual, stressful) vs. AI-supported (faster, more consistent)",
        "Analysis of a sheet of already-answered reviews \u2014 realistic insight into reply logic, tonality & decision processes",
        "Derived core user needs: clear interfaces, simple & fast use, CI-compliant language, support without full automation"
      ],
      insights: [
        "Feedback is answered reactively instead of evaluated in a structured way \u2014 trends and patterns get lost.",
        "The process is manual, repetitive and cognitively heavy \u2014 exactly where AI can take the load off.",
        "Users want support without full automation: clear interfaces, fast use and control over the reply.",
        "CI-compliant, consistent language is central \u2014 a generic AI voice would hurt the brand.",
        "Key limitation: no full access to Glassdoor data or company guidelines \u2014 concepts had to emerge within those constraints."
      ],
      hmw: [
        'How might we make an AI sound "like Atolls" \u2014 when Atolls never formalised what that even is?',
        "How might we lift the emotional load of negative reviews off HR, without losing empathy?",
        "How might we turn reactive reply-work into an early-warning system for cultural themes?"
      ],
      /* ── Solution ──────────────────────────────────────────────────── */
      solutionStatement: "An AI-supported workflow system (n8n) that doesn't just answer feedback more efficiently but makes it evaluable in a structured way \u2014 from sentiment analysis to an early-warning dashboard.",
      solutionContext: "At the core is an n8n workflow: a review runs through sentiment analysis into structured storage (Google Sheets), and an AI agent drafts a fitting reply based on the analyzed Atolls tone of voice. A second, parallel workflow extracts recurring themes (salary, communication, management) from negative reviews and surfaces them; depending on sentiment, a Slack notification goes to different channels. Four webhook workflows connect the backend as an API to a Next.js/React frontend of three pages: Home, Review Inbox (edit/publish replies) and an Insights dashboard (sentiment distribution, mood over time, top keywords in negative reviews, AI summary, warning pop-up when negative reviews spike). On top \u2014 beyond the brief \u2014 a branding and a language guide keep the interface and AI replies consistent in the Atolls voice.",
      solutionImage: "",
      concept: "Two use cases in one system: (1) Review Inbox \u2014 AI classifies, drafts a reply in Atolls voice, Karla approves or edits. (2) Insights Dashboard \u2014 keyword extraction surfaces recurring themes (salary, communication, culture) as an early-warning system. Both run on n8n, frontend in Next.js, data in Google Sheets.",
      beforeImage: "",
      afterImage: "",
      designScreens: [
        {
          name: "Review Inbox",
          description: "Incoming reviews with AI-generated replies. Sentiment tag (Positive / Neutral / Negative), edit or publish the reply.",
          image: ""
        },
        {
          name: "Insights Dashboard",
          description: "Sentiment trend, problem radar (top keywords from negative reviews), AI summary, alert when negative reviews spike. This is the early-warning system for cultural themes.",
          image: ""
        },
        {
          name: "Brand & Language Guide",
          description: "Branding guide (vision, values, personality, color system, S\xF6hne typography) and a language guide with tone of voice, style principles and dos/don'ts \u2014 created beyond the brief.",
          image: ""
        }
      ],
      /* ── Results ───────────────────────────────────────────────────── */
      outcome: "A working prototype of the review-management system, tested with Karla and the Atolls team. The concept gives Atolls an early-warning system for critical themes, surfaces trends across reviewers instead of isolated opinions, and creates a basis for data-driven improvements to internal processes. Feedback shifts from a reactive duty to a strategic resource. On top, a branding and a language guide were created that Atolls can use beyond the project.",
      resultsImage: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/Home.webp",
      metrics: [
        { l: "Interviews", v: "2" },
        { l: "Frontend pages", v: "3" },
        { l: "n8n webhooks", v: "4" },
        { l: "Sentiment classes", v: "3" }
      ],
      /* ── Learnings ─────────────────────────────────────────────────── */
      learnings: [
        "Real project partners are an opportunity. Working with Atolls surfaced complexity, constraints and real decision logic \u2014 more valuable than any assumption.",
        "Workarounds are valuable learnings, not failure. A missing Glassdoor API and guidelines forced creative, solution-oriented paths.",
        "Don't wait for perfect conditions. Getting into doing, testing assumptions and iterating beats waiting for complete data.",
        "AI in a feedback context isn't purely technical. It has to be thought organizationally, culturally and communicatively \u2014 otherwise it sounds generic.",
        "Clear communication within the team and with supervisors has an enormous impact on a project's success.",
        "Happy employees = better performance \u2014 or: every feedback is a gift. Evaluated properly, feedback shifts from a reactive duty to a strategic resource."
      ],
      wouldChange: [
        "Write the language guide directly into the GPT prompt, instead of designing around it \u2014 we kept the guide as a separate doc and manually synced it into the prompt. Two sources of truth, one drift risk.",
        "Collect more tone examples per review type. On the first prototype the AI still sounded generic on edge cases (salary criticism, manager complaints) \u2014 more examples would have made the replies more on-point.",
        "Schedule bi-weekly calls with Karla, not just kickoff + handover. I'd have seen the patterns in the 40 reviews earlier \u2014 Karla mentioned things in passing that became core insights weeks later.",
        "Test the Approve/Edit buttons with a tone slider (formal / warmer / more direct). Karla wanted control without extra work \u2014 a slider would solve that in 2 seconds, instead of forcing her to rewrite manually."
      ],
      /* ── Reflection ────────────────────────────────────────────────── */
      reflection: "The biggest lesson: AI in a feedback context isn't purely technical \u2014 it has to be thought organizationally, culturally and communicatively. Working with a real partner and testing with Karla checked our assumptions against reality. And the process doesn't end with a finished solution but with a clear understanding of potential, limits and next steps \u2014 structured properly, feedback shifts from a reactive duty to a strategic resource.",
      /* ── Existing meta + media ─────────────────────────────────────── */
      tldr: {
        problem: "Feedback is processed reactively instead of evaluated in a structured way \u2014 trends slip through.",
        myRole: "UX research + n8n workflow + Next.js frontend + branding/language guide (~60% solo).",
        solution: "AI-supported n8n workflow system: sentiment, a reply agent in the Atolls voice, keyword analysis + Next.js frontend.",
        outcome: "Working prototype + early-warning system for cultural themes. Feedback becomes a strategic resource."
      },
      problemShort: "At Atolls, feedback is handled reactively and manually instead of evaluated in a structured way \u2014 trends and patterns get lost.",
      solutionShort: "AI-supported review management: n8n pipeline (sentiment, reply agent, keyword analysis, Slack) + Next.js dashboard with Review Inbox & Insights. Plus a branding & language guide.",
      role: "UX Research, Brand Architecture, n8n Workflow, Frontend Dev",
      duration: "Winter 2025/26",
      team: "Team C (4 people)",
      tools: ["n8n", "OpenAI API", "Next.js", "React", "Figma", "Google Sheets"],
      roleChips: ["\u{1F50D} Research", "\u{1F3A8} Brand", "\u{1F916} AI Workflow", "\u{1F4BB} Frontend"],
      media: [
        { type: "video", src: "assets/Portfolio_Content/Atolls_Glassdoor_Reviews/atolls_video.mp4", caption: "System walkthrough: Review Inbox \u2192 Insights Dashboard", duration: "01:24", width: 1280, height: 720 },
        { type: "image", caption: "User journey: without AI vs. with AI", width: 1200, height: 800 },
        { type: "image", caption: "n8n pipeline \u2014 5 stages with tone-of-voice as constraint", width: 1600, height: 900 },
        { type: "image", caption: "Review Inbox \u2014 AI reply drafts in the Atolls voice", width: 1280, height: 800 },
        { type: "image", caption: "Insights Dashboard \u2014 sentiment trend + problem radar", width: 1280, height: 800 },
        { type: "image", caption: "Brand Guide \u2014 vision, values, color system", width: 1e3, height: 1400 },
        { type: "image", caption: "Language Guide \u2014 tone examples with DOs & DON'Ts", width: 1200, height: 900 }
      ]
    }
  },
  {
    id: "echoes",
    emoji: "\u{1F3DB}\uFE0F",
    color: "pink",
    status: "completed",
    cover: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/stadt_tafel.webp",
    icon: "assets/icons/echoes.png",
    coverFit: "cover",
    figmaUrl: "https://www.figma.com/proto/HLSnM72ozwVSgzZgtxMIwb/Moosburg-Prototype?node-id=1221-1395&t=nsOXo7JvRMkvhUAC-1",
    figmaEmbedUrl: "https://embed.figma.com/proto/HLSnM72ozwVSgzZgtxMIwb/Moosburg-Prototype?node-id=1221-1395&embed-host=share",
    deckUrl: "https://www.figma.com/deck/ciMOVPoohHVIpc5ySYNu3r/Team_B_Pr%C3%A4sentation?node-id=78-77&t=Og8jTzpWxneVfQq1-1",
    deckEmbedUrl: "https://embed.figma.com/deck/ciMOVPoohHVIpc5ySYNu3r/Team_B_Pr%C3%A4sentation?node-id=78-77&embed-host=share",
    documentation: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/Dokumentation_B.pdf",
    devLog: {
      stack: ["Figma"],
      builtSolo: "Mobile Web-App Prototyp",
      role: "Research + Prototype",
      notes_de: [
        "[w1]  10 Interviews \xB7 City Walks \xB7 Empathy Mapping",
        "[w2]  Hardware-Iteration: 3 Stelen-Varianten (Holz, Beton, Metall) papier-prototypisiert",
        "[w2]  Service Blueprint mit Stalag VII A e.V. abgestimmt",
        "[w3]  Mobile Web-App (HTML/CSS/JS) \u2014 kein App-Download, QR \u2192 Browser",
        "[w3]  Photo-Timeline (then/now) als Vanilla-JS Slider, 60fps auf low-end Android",
        "[w4]  5 Usability-Tests (18-72 J.) \u2014 Schriftgr\xF6\xDFe 18px+ verdoppelt Lesbarkeit bei Senior:innen",
        "[w4]  \xDCbergabe: 2 Partner-Orgs, 3 Hardware-Varianten dokumentiert"
      ],
      notes_en: [
        "[w1]  10 interviews \xB7 city walks \xB7 empathy mapping",
        "[w2]  hardware iteration: 3 stele variants (wood, concrete, metal) paper-prototyped",
        "[w2]  service blueprint validated with Stalag VII A e.V.",
        "[w3]  mobile web app (HTML/CSS/JS) \u2014 no install, QR \u2192 browser",
        "[w3]  then/now photo timeline as vanilla-JS slider, 60fps on low-end Android",
        "[w4]  5 usability tests (18-72 yrs) \u2014 18px+ font doubles legibility for seniors",
        "[w4]  handover: 2 partner orgs, 3 hardware variants documented"
      ],
      links: [
        { label: "Figma \u2014 Hi-Fi", href: "#", icon: "\u25B6" },
        { label: "Live Demo", href: "#", icon: "\u25B6" }
      ]
    },
    de: {
      title: "Echoes of Moosburg",
      windowTitle: "Echoes_Moosburg.html \u2014 Service Design, kein App-Build \u2726",
      description: "Hybrides Service-Design-\xD6kosystem f\xFCr Moosburgs Geschichte: physische Tafeln, mobile Web-App und Partner-Institutionen \u2014 \xFCber drei Generationen getestet.",
      heroImage: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/stadt_tafel.webp",
      /* ── Problem ───────────────────────────────────────────────────── */
      problemStatement: "Das stumme Ged\xE4chtnis Moosburgs \u2014 eine Stadt mit STALAG VII A, mittelalterlicher Struktur, hunderten Geschichten \u2014 und nichts davon ist im Alltag sichtbar.",
      problemContext: 'Es klafft eine L\xFCcke zwischen der physischen Pr\xE4senz historischer Orte und dem Wissen dar\xFCber. Wer neugierig wird, landet in fragmentierten Quellen \u2014 Stadt-Website, VHS-Kursliste, Stalag-Verein, Museum, Stadtf\xFChrungen, jede eine eigene Insel, und niemand wei\xDF, wo anfangen. Dazu kommt die \u201EHolschuld": Zugang zu Wissen erfordert hohe Eigeninitiative \u2014 aktiv suchen, Museen zu engen \xD6ffnungszeiten besuchen, sich f\xFCr Kurse anmelden. Im spontanen Moment der Neugier auf der Stra\xDFe ist nichts greifbar. Und \xFCber allem liegt ein Generationenbruch: \xC4ltere kennen die Geschichten noch, J\xFCngere wissen nicht einmal, dass es welche gibt \u2014 ohne aktive Vermittlung erodiert die lokale Identit\xE4t.',
      problemGallery: [
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/stadt_moosburg.webp", caption: "Moosburg \u2014 mittelalterliche Struktur, hunderte Geschichten, im Alltag unsichtbar." },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/Stalag-Moosburg.webp", caption: "STALAG VII A \u2014 eines der gr\xF6\xDFten Kriegsgefangenenlager, kaum sichtbar in der Stadt." },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/vhs.webp", caption: "VHS, Verein, Museum, Stadt-Website \u2014 jede Quelle eine eigene Insel." }
      ],
      /* ── Research ──────────────────────────────────────────────────── */
      researchContext: 'Zehn qualitative Interviews quer durch drei Generationen (18\u201372 J.), zwei City Walks an historischen Orten, Empathy Mapping pro Persona, eine Customer Journey von \u201EEntdecken" bis \u201EWeitererz\xE4hlen". Plus Stakeholder-Gespr\xE4che mit STALAG VII A e.V. und Karl Bauer (lokaler Historiker) \u2014 beide wurden sp\xE4ter Content-Partner, nicht nur Quellen.',
      researchImage: "",
      researchGallery: [
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/moosburg_visit.webp", caption: "City Walk in Moosburg \u2014 historische Orte vor Ort erkundet." },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/research.webp", caption: "Empathy Mapping & Customer Journey \u2014 Synthese der Interviews." }
      ],
      research: [
        "10 qualitative Interviews quer durch drei Generationen (18\u201372 J.) \u2014 Tourist:in \xB7 Anwohnerin \xB7 Sch\xFCler:in \xB7 Senior:in",
        "City Walks / Stadtbegehungen an historischen Orten \u2014 wo schaut man hin, wo geht man vorbei?",
        "Empathy Mapping (Says / Thinks / Feels / Does) + Pain/Need/Gain-Analyse pro Persona",
        "Customer Journey Before \u2192 During \u2192 After: Entdecken \u2192 Verstehen \u2192 Weitererz\xE4hlen \u2014 inkl. Soll-Journey",
        "Stakeholder-Gespr\xE4che mit STALAG VII A e.V. und Karl Bauer (lokaler Historiker) \u2014 wurden sp\xE4ter Content-Partner"
      ],
      insights: [
        "Web-Dilemma: Information ist \xFCber 5+ Quellen fragmentiert. Niemand wei\xDF, wo anfangen.",
        "Holschuld statt Bringschuld: Im Moment der Neugier ist Information nicht da \u2014 Menschen geben auf.",
        "App-Aversion vs. Wunsch nach Haptik: Niemand installiert eine App f\xFCr ein einmaliges Erlebnis, aber Tafeln und Brosch\xFCren werden mitgenommen und schaffen Vertrauen.",
        "Wissen verschwindet im \xF6ffentlichen Raum: Wertvolle Infos liegen oft nur in Geb\xE4uden (VHS, Museum) \u2014 bei geschlossenen T\xFCren f\xFCr die Laufkundschaft verloren.",
        "Generationenbruch: \xC4ltere kennen die Geschichten, J\xFCngere wissen nicht einmal, dass es welche gibt.",
        "Tradition und Moderne d\xFCrfen sich nicht ausschlie\xDFen \u2014 die Rose aus dem alten Wappen wird zur visuellen Br\xFCcke."
      ],
      hmw: [
        "Wie holen wir Moosburgs Geschichte barrierefrei in den Stadtraum \u2014 genau im Moment der Neugier, ohne App-Download?",
        "Wie b\xFCndeln wir die fragmentierten Angebote (Stadt, VHS, Verein, Museum) zu einem zentralen Zugang?",
        "Wie verbinden wir Generationen, sodass das Wissen der \xC4lteren bei den J\xFCngeren ankommt?",
        "Wie gestalten wir Tafeln und App so, dass Schulen, Vereine und Stadtf\xFChrer:innen sie aktiv als Werkzeug nutzen?"
      ],
      /* ── Solution ──────────────────────────────────────────────────── */
      solutionStatement: "Nicht: eine App. Sondern: ein lebendes Netzwerk aus physischen Ankern, digitaler Tiefe und Partner-Institutionen, die Geschichte gemeinsam lebendig machen.",
      solutionContext: "Drei S\xE4ulen, die nur zusammen funktionieren. (1) Physische Anker: eine Info-Stele am Marienplatz mit QR-Code und wettergesch\xFCtztem Brosch\xFCren-Fach, kompakte Themen-Tafeln an historischen Orten wie dem STALAG-Gel\xE4nde, schlanke Info-Pfosten als g\xFCnstiges Upgrade bestehender Beschilderung \u2014 dazu QR-Codes auf Parkb\xE4nken und Caf\xE9-Tischen, die den Moment der Neugier abholen. (2) Digitale Tiefe: eine mobile Web-App ohne Download \u2014 Zeitreise-Slider (damals/heute \xFCbereinandergelegt), Audio-Tageb\xFCcher echter STALAG-Stimmen, ein zentraler Hub, der alle fragmentierten Angebote (VHS, Verein, Museum, Stadtf\xFChrungen) an einem Ort b\xFCndelt, ein Community-Besucherbuch f\xFCr B\xFCrger-Stories und eine Melde-Funktion, \xFCber die Einwohner:innen Sch\xE4den an den Tafeln oder Feedback direkt an die Stadt geben k\xF6nnen. (3) Ecosystem-Partner: Schulen unterrichten vor Ort, die VHS wird sichtbar, Caf\xE9s bieten den QR-Code als Feature, der STALAG VII A e.V. liefert authentische Inhalte \u2014 jeder gewinnt, und die Stadt eine lebendige Erinnerungskultur. Visuelles Leitmotiv ist die Rose aus dem \xE4lteren Moosburger Wappen: Auf der Stele bewacht sie den QR-Code, in der App zieht sie sich als roter Faden durch.",
      solutionImage: "",
      concept: "Drei zusammen\xADarbeitende S\xE4ulen \u2014 physische Anker (3 Tafel-Typen + Brosch\xFCren + QR-Guerrilla), digitale Tiefe (Web-App mit Zeitreise-Slider, Audio-Tageb\xFCcher, zentraler Hub, Community-Besucherbuch, Schaden-Meldefunktion) und Partner-Institutionen (Schulen, VHS, Caf\xE9s, STALAG VII A e.V.). Keine S\xE4ule funktioniert isoliert \u2014 und das ist der Punkt.",
      designCarousel: [
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/denkmal_tafel.webp", caption: "Info-Pfosten am Denkmal \u2014 Upgrade bestehender Beschilderung" },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/b\xE4ckerei_tafel.webp", caption: "QR-Guerrilla \u2014 Caf\xE9- und B\xE4ckerei-Tische als spontaner Discovery-Punkt" },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/bank_qr.webp", caption: "QR-Guerrilla \u2014 Parkbank als beil\xE4ufiger Discovery-Punkt" },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/brosch\xFCre_seite1.webp", caption: "Brosch\xFCre Seite 1 \u2014 zum Mitnehmen, Brand-System in Pergament-Beige & Rostrot", bare: true },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/brosch\xFCre_seite2.webp", caption: "Brosch\xFCre Seite 2 \u2014 Hub-\xDCbersicht aller Stadt-Ressourcen", bare: true }
      ],
      systemSlider: {
        title: "Wie die Systeme zusammengef\xFChrt werden",
        intro: "Ein Weg durch das Netzwerk: So findet eine Moosburgerin von einem zuf\xE4lligen QR-Code bis zur ganzen Stadtgeschichte. Jeder Stopp ist ein Touchpoint \u2014 und jeder f\xFChrt zum n\xE4chsten.",
        images: [
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/stadt_tafel.webp", caption: "Info-Stele am Marienplatz", text: "Der erste Kontakt: ein zentraler Anker mitten in der Stadt. QR-Code f\xFCr die App, Flyerfach f\xFCr alle ohne Smartphone \u2014 niemand wird ausgeschlossen." },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/brosch\xFCre_seite1B_web.webp", caption: "Brosch\xFCre \u2014 zum Mitnehmen", text: "Wer lieber etwas in der Hand h\xE4lt, nimmt die Brosch\xFCre mit. Das Brand-System in Rostrot, Beige und Gr\xFCn macht die Geschichte greifbar.", bare: true },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/brosch\xFCre_seite_2B.webp", caption: "Brosch\xFCre \u2014 der Hub auf Papier", text: "Seite zwei b\xFCndelt alle Stadt-Ressourcen auf einen Blick: VHS-Kurse, Vereinsf\xFChrungen, Museum, Schulprogramme \u2014 analog wie digital derselbe Hub.", bare: true },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/museum_tafel.webp", caption: "Echoes of Moosburg QR-Code im Museum", text: "Im Museum f\xFChrt der Echoes-of-Moosburg-QR-Code direkt zum jeweiligen Objekt \u2014 der Anker vor Ort schafft Vertrauen, die App liefert die Tiefe." },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/system_konzept.webp", caption: "Das System-Konzept", text: "So greifen die S\xE4ulen ineinander: physische Anker, digitale Tiefe und Partner-Institutionen werden zu einem lebendigen Netzwerk.", bare: true },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/system_einwohner.webp", caption: "Der Weg der Einwohner:innen", text: 'Und so erlebt es eine B\xFCrgerin \u2014 ein durchgehender Pfad von \u201EEntdecken" \xFCber \u201EVerstehen" bis \u201EWeitererz\xE4hlen".', bare: true }
        ],
        scenario: "Ein Samstag in Moosburg: Familie Huber bleibt am Marienplatz an der Info-Stele stehen. Der Sohn scannt den QR-Code und legt mit dem Zeitreise-Slider das Heute \xFCber ein Foto von 1950, die Oma nimmt sich die Brosch\xFCre mit. Sp\xE4ter im Caf\xE9 scannen sie den Code auf dem Tisch und h\xF6ren gemeinsam ein Audio-Tagebuch. \xDCber den Hub buchen sie f\xFCr n\xE4chste Woche eine F\xFChrung des STALAG VII A e.V. \u2014 und melden nebenbei eine verkratzte Tafel an die Stadt. An jedem Touchpoint gibt es au\xDFerdem einen physischen Stempel f\xFCr die Brosch\xFCre \u2014 wer alle sammelt, hat Moosburgs Geschichte einmal komplett durchwandert. Drei Generationen, ein durchgehender Pfad: entdecken, verstehen, weitererz\xE4hlen."
      },
      beforeImage: "",
      afterImage: "",
      designScreens: [],
      /* ── Results ───────────────────────────────────────────────────── */
      outcome: "Hybrides Service-Design-System, getestet \xFCber drei Generationen mit 5 Usability-Tests. Drei Hardware-Varianten (zentrale Stele, Themen-Tafeln, Info-Pfosten als Upgrade-Modul) und eine Mobile Web-App mit Zeitreise-Slider, Audio-Tageb\xFCchern und zentralem Hub. Glaubw\xFCrdige Inhalte durch zwei Content-Partner (STALAG VII A e.V., Karl Bauer). Komplette Brand-Identit\xE4t mit der Moosburger Rose als generationen\xAD\xFCbergreifendes Leitmotiv. Wichtigstes Testing-Insight umgesetzt: Direkteinstieg nach QR-Scan statt Welcome-Screen \u2014 Time-to-Content ist kritisch.",
      resultsImage: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/Echoes_App.mp4",
      outcomeScenario: 'Stell dir Lena vor, 16, unterwegs am Marienplatz. An der Info-Stele scannt sie den QR-Code \u2014 und landet ohne Download direkt in der Web-App. \xDCber den Zeitreise-Slider legt sie historische Fotos aus dem Karl-Bauer-Archiv \xFCber das heutige Stra\xDFenbild und sieht, wie sich der Platz ver\xE4ndert hat; in den Audio-Tageb\xFCchern h\xF6rt sie die Stimme eines Stalag-Gefangenen. Im zentralen Hub findet sie auf einen Blick VHS-Kurse, den Stalag-Verein und das Museum \u2014 und plant f\xFCr ihre Oma eine gef\xFChrte Tour. So wird aus der \u201EHolschuld" eine \u201EBringschuld": Geschichte findet die Menschen, genau dort, wo sie passiert ist, und verbindet Generationen.',
      outcomeNote: "Am Stalag-Gel\xE4nde steht eine kompakte Themen-Tafel: weniger Text, daf\xFCr Bildvergleich und Audio direkt vor Ort. Ein Scan des QR-Codes \xF6ffnet sofort das passende Standortprofil. \u2192 Das ganze hybride System (drei Tafel-Typen, Web-App-Features, Research & Testing) steht in der vollst\xE4ndigen Dokumentation (PDF).",
      metrics: [
        { l: "Generationen getestet", v: "3" },
        { l: "Usability-Tests", v: "5" },
        { l: "Hardware-Varianten", v: "3" },
        { l: "Content-Partner", v: "2" }
      ],
      /* ── Learnings ─────────────────────────────────────────────────── */
      learnings: [
        "Technologie als Br\xFCcke, nicht als H\xFCrde. Der Erfolg eines digitalen Angebots im Stadtraum h\xE4ngt an seiner Niederschwelligkeit \u2014 der Verzicht auf App-Zwang (Web-App per QR) erh\xF6ht die Akzeptanz massiv.",
        "Multisensorisch schl\xE4gt textbasiert. Haptik (Brosch\xFCren), visueller Vergleich (Zeitreise-Slider) und emotionales Audio schaffen zusammen ein tieferes Verst\xE4ndnis als reine Text-Tafeln.",
        "Erinnerungskultur lebt von Partizipation. Sie funktioniert am besten als Gemeinschaftsprojekt \u2014 schon das Interesse der B\xFCrger:innen, eigene Inhalte (Besucherbuch) beizusteuern, h\xE4lt Geschichte lebendig.",
        "Bottom-up schl\xE4gt top-down. Die Zusammenarbeit mit offiziellen Stellen (Stadtarchiv) war langwierig, w\xE4hrend agile Initiativen wie der STALAG VII A e.V. die eigentlichen Treiber des Projekts waren.",
        "Lo-Fi-Testing zahlt sich aus. Remote Think Aloud mit Lo-Fi-Wireframes deckte kritische Navigationsfehler fr\xFCh auf \u2014 bevor Ressourcen ins High-Fidelity-Design flossen (Welcome-Screen raus, Direkteinstieg rein).",
        "Hybrid schl\xE4gt entweder/oder. Nicht digital ODER physisch \u2014 sondern: Tafeln schaffen Vertrauen, die App liefert Tiefe, Brosch\xFCren werden mitgenommen.",
        "Partner brauchen eigenen Benefit. Schulen wollen lebendigen Unterricht, VHS will Sichtbarkeit, Caf\xE9s wollen ein Feature. Wenn alle gewinnen, l\xE4uft das System ohne Top-Down-Push.",
        "Service Design > Produkt-Design. Eine App allein h\xE4tte das Problem nicht gel\xF6st \u2014 Schulen, VHS, Vereine und Caf\xE9s mussten Teil der L\xF6sung werden, nicht nur Stakeholder."
      ],
      wouldChange: [
        "Recherche in die bestehenden Rituale der Partner einbauen \u2014 STALAG VII A e.V. spricht jeden Tag mit Besucher:innen. Ich kam mit fertigem Interviewleitfaden an, statt ein paar ihrer F\xFChrungen mitzulaufen und dort zuzuh\xF6ren. Das h\xE4tte authentischere Quotes geliefert.",
        "Schulen als Partner schon in der Research-Phase einbinden. Sie kamen erst in der Solution-Phase rein \u2014 dabei sehen Lehrkr\xE4fte den Generationenbruch jeden Tag aus n\xE4chster N\xE4he und h\xE4tten Insights geliefert, f\xFCr die ich 10 Interviews brauchte.",
        'Den Ecosystem-Gedanken fr\xFCher ans Team verkaufen. In den ersten Wochen dachten wir noch in \u201EApp", erst Woche 4 kippte das zu \u201ENetzwerk". H\xE4tten wir das Framing am Anfang etabliert, w\xE4ren die ersten zwei Iterationen nicht App-zentriert gewesen.'
      ],
      /* ── Reflection ────────────────────────────────────────────────── */
      reflection: "Die Zusammenarbeit mit STALAG VII A e.V. hat mir gezeigt: UX-Research findet in Vereinen l\xE4ngst informell statt \u2014 sie sprechen jeden Tag mit ihren Besucher:innen. Beim n\xE4chsten Projekt w\xFCrde ich die Recherche in die bestehenden Rituale der Partner einbauen, statt mit fertigem Interviewleitfaden anzurollen. Das gr\xF6\xDFte Learning aber: in Service-Design-Projekten sind Partner-Institutionen keine Nutzer:innen, sondern Mit-Gestalter:innen. Die App war der einfache Teil \u2014 das System lebendig zu denken war die eigentliche Designarbeit.",
      /* ── Existing meta + media ─────────────────────────────────────── */
      tldr: {
        problem: "Moosburgs Geschichte ist im Alltag unsichtbar \u2014 Info fragmentiert, Generationen\xADbruch, App-Aversion.",
        myRole: "UX Research (10 Interviews, City Walks), Service & Ecosystem Design, Stakeholder-Coordination, Hi-Fi-Prototyp.",
        solution: "Hybrides \xD6kosystem: Tafeln + Web-App + Partner (Schulen, VHS, Caf\xE9s, STALAG VII A e.V.).",
        outcome: "Getestet \xFCber 3 Generationen. 3 Hardware-Varianten, 2 Content-Partner. Direkteinstieg nach Testing \xFCbernommen."
      },
      problemShort: "Das stumme Stadtged\xE4chtnis: Moosburgs Geschichte ist im Alltag unsichtbar, Information fragmentiert, Generationen\xADbruch droht.",
      solutionShort: "Hybrides Service-Design-\xD6kosystem: physische Tafeln + mobile Web-App + Partner-Institutionen (Schulen, VHS, Caf\xE9s, Vereine).",
      role: "UX Research, Service & Ecosystem Design, Stakeholder-Coordination, Prototyping",
      duration: "WS 2025/26",
      team: "Team B",
      tools: ["Figma", "Miro", "Canva", "HTML/CSS/JS"],
      roleChips: ["\u{1F50D} Research", "\u{1F5C2}\uFE0F Service Design", "\u{1F310} Ecosystem", "\u270F\uFE0F Prototyping"],
      partners: [
        { icon: "\u{1F393}", name: "VHS", role: "Stadtf\xFChrungen direkt in der App anfragbar" },
        { icon: "\u{1F3EB}", name: "Schulen", role: "Vor-Ort-Unterricht + Educational Content" },
        { icon: "\u{1F4D6}", name: "Stalag VII A e.V.", role: "Audio-Tageb\xFCcher + historische Expertise" },
        { icon: "\u{1F3DB}\uFE0F", name: "Museum", role: "QR-Codes auf Objekten f\xFCr Deep-Links" },
        { icon: "\u2615", name: "Caf\xE9s & B\xE4ckereien", role: "Brosch\xFCren-Distribution + spontane Discovery" },
        { icon: "\u{1F465}", name: "B\xFCrger:innen", role: "Community-Tagebuch: eigene Stories beitragen" }
      ],
      media: []
    },
    en: {
      title: "Echoes of Moosburg",
      windowTitle: "Echoes_Moosburg.html \u2014 service design, not app build \u2726",
      description: "Hybrid service-design ecosystem for Moosburg's history: physical signs, mobile web app and partner institutions \u2014 tested across three generations.",
      heroImage: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/stadt_tafel.webp",
      tldr: {
        problem: "Moosburg's history is invisible in everyday life \u2014 fragmented info, generational rift, app aversion.",
        myRole: "UX research (10 interviews, city walks), service & ecosystem design, stakeholder coordination, hi-fi prototype.",
        solution: "Hybrid ecosystem: signs + web app + partners (schools, adult-ed, caf\xE9s, STALAG VII A e.V.).",
        outcome: "Tested across 3 generations. 3 hardware variants, 2 content partners. Direct-entry shipped after testing."
      },
      problemShort: "The silent city memory: Moosburg's history is invisible in everyday life, information fragmented, generational rift looming.",
      solutionShort: "Hybrid service-design ecosystem: physical signs + mobile web app + partner institutions (schools, adult-ed, caf\xE9s, associations).",
      role: "UX Research, Service & Ecosystem Design, Stakeholder Coordination, Prototyping",
      duration: "Winter 2025/26",
      team: "Team B",
      tools: ["Figma", "Miro", "Canva", "HTML/CSS/JS"],
      roleChips: ["\u{1F50D} Research", "\u{1F5C2}\uFE0F Service Design", "\u{1F310} Ecosystem", "\u270F\uFE0F Prototyping"],
      partners: [
        { icon: "\u{1F393}", name: "Adult-Ed (VHS)", role: "City walking tours bookable directly in the app" },
        { icon: "\u{1F3EB}", name: "Schools", role: "On-site teaching + educational content" },
        { icon: "\u{1F4D6}", name: "STALAG VII A e.V.", role: "Audio diaries + historical expertise" },
        { icon: "\u{1F3DB}\uFE0F", name: "Museum", role: "QR codes on objects for deep-links" },
        { icon: "\u2615", name: "Caf\xE9s & bakeries", role: "Brochure distribution + spontaneous discovery" },
        { icon: "\u{1F465}", name: "Citizens", role: "Community diary: contribute your own stories" }
      ],
      /* ── Problem ───────────────────────────────────────────────────── */
      problemStatement: "Moosburg's silent memory \u2014 a town with STALAG VII A, medieval fabric, hundreds of stories \u2014 and none of it is visible in daily life.",
      problemContext: `There's a gap between the physical presence of historical sites and the knowledge about them. Anyone who gets curious lands in fragmented sources \u2014 city website, adult-ed course list, the Stalag association, museum, walking tours, each its own island, and nobody knows where to start. On top sits the "pull burden": accessing knowledge takes real initiative \u2014 actively searching, visiting museums during limited hours, signing up for courses. In the spontaneous moment of curiosity on the street, there's nothing to grab. And over it all lies a generational rift: older people still know the stories, younger ones don't even know they exist \u2014 without active mediation, local identity erodes.`,
      problemGallery: [
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/stadt_moosburg.webp", caption: "Moosburg \u2014 medieval layout, hundreds of stories, invisible in everyday life." },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/Stalag-Moosburg.webp", caption: "STALAG VII A \u2014 one of the largest POW camps, barely visible in town." },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/vhs.webp", caption: "Adult-ed centre, society, museum, city website \u2014 every source its own island." }
      ],
      /* ── Research ──────────────────────────────────────────────────── */
      researchContext: 'Ten qualitative interviews across three generations (18\u201372 yrs), two city walks at historical sites, empathy mapping per persona, a customer journey from "discover" to "share". Plus stakeholder conversations with STALAG VII A e.V. and Karl Bauer (local historian) \u2014 both later became content partners, not just sources.',
      researchImage: "",
      researchGallery: [
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/moosburg_visit.webp", caption: "City walk in Moosburg \u2014 exploring historical sites on the ground." },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/process/research.webp", caption: "Empathy mapping & customer journey \u2014 synthesising the interviews." }
      ],
      research: [
        "10 qualitative interviews across three generations (18\u201372) \u2014 tourist \xB7 resident \xB7 student \xB7 senior",
        "City walks at historical sites \u2014 where do people look, where do they walk past?",
        "Empathy mapping (Says / Thinks / Feels / Does) + pain/need/gain analysis per persona",
        "Customer journey Before \u2192 During \u2192 After: discover \u2192 understand \u2192 share \u2014 incl. target journey",
        "Stakeholder conversations with STALAG VII A e.V. and Karl Bauer (local historian) \u2014 who later became content partners"
      ],
      insights: [
        "Web dilemma: information fragmented across 5+ sources. Nobody knows where to start.",
        "Pull vs. push: at the moment of curiosity, information isn't there \u2014 people give up.",
        "App aversion vs. craving for the physical: nobody installs an app for a one-time experience, but signs and brochures get picked up and build trust.",
        "Knowledge vanishes in public space: valuable info often sits only inside buildings (adult-ed, museum) \u2014 behind closed doors it's lost to passers-by.",
        "Generational rift: older people know the stories, younger ones don't even know stories exist.",
        "Tradition and modernity don't have to clash \u2014 the rose from the older coat of arms becomes the visual bridge."
      ],
      hmw: [
        "How might we bring Moosburg's history into public space \u2014 right in the moment of curiosity, without an app download?",
        "How might we bundle the fragmented offers (city, adult-ed, association, museum) into one central access point?",
        "How might we connect generations so the elders' knowledge reaches the young?",
        "How might we design the signs and app so schools, associations and tour guides actively use them as a tool?"
      ],
      /* ── Solution ──────────────────────────────────────────────────── */
      solutionStatement: "Not: an app. But: a living network of physical anchors, digital depth, and partner institutions making history alive together.",
      solutionContext: "Three pillars that only work together. (1) Physical anchors: a central info-stele at Marienplatz with a QR code and a weather-protected brochure rack, compact themed signs at historical sites like the STALAG grounds, slim info-posts that cheaply upgrade existing signage \u2014 plus QR codes on park benches and caf\xE9 tables that catch the moment of curiosity. (2) Digital depth: a mobile web app with no download \u2014 a time-travel slider (then/now overlaid), audio diaries of real STALAG voices, a central hub that bundles all the fragmented offers (adult-ed, association, museum, guided tours) in one place, a community guestbook for citizen stories, and a report function that lets residents flag damaged signs or send feedback directly to the city. (3) Ecosystem partners: schools teach on-site, the adult-ed centre gains visibility, caf\xE9s offer the QR code as a feature, and STALAG VII A e.V. provides authentic content \u2014 everyone wins, and the city gains a living memory culture. The visual thread is the rose from the older Moosburg coat of arms: on the stele it guards the QR code, and it runs through the app as a recurring motif.",
      solutionImage: "",
      concept: "Three pillars working together \u2014 physical anchors (3 sign types + brochures + guerrilla QR), digital depth (web app with time-travel slider, audio diaries, central hub, community guestbook, damage-report function) and partner institutions (schools, adult-ed, caf\xE9s, STALAG VII A e.V.). No pillar works in isolation \u2014 and that is the point.",
      designCarousel: [
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/denkmal_tafel.webp", caption: "Info post at the memorial \u2014 an upgrade to existing signage" },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/b\xE4ckerei_tafel.webp", caption: "Guerrilla QR \u2014 caf\xE9 and bakery tables as spontaneous discovery points" },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/bank_qr.webp", caption: "Guerrilla QR \u2014 a park bench as a casual discovery point" },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/brosch\xFCre_seite1.webp", caption: "Brochure page 1 \u2014 take-away piece, brand system in parchment beige & rust red", bare: true },
        { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/brosch\xFCre_seite2.webp", caption: "Brochure page 2 \u2014 hub overview of all city resources", bare: true }
      ],
      systemSlider: {
        title: "How the systems come together",
        intro: "A path through the network: how a Moosburg resident goes from a chance QR code all the way to the city's history. Every stop is a touchpoint \u2014 and each one leads to the next.",
        images: [
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/stadt_tafel.webp", caption: "Info stele at Marienplatz", text: "First contact: a central anchor in the heart of town. A QR code for the app, a flyer rack for anyone without a smartphone \u2014 no one is left out." },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/brosch\xFCre_seite1B_web.webp", caption: "Brochure \u2014 take it with you", text: "For people who would rather hold something, the brochure travels home. The brand system in rust red, beige and green makes the history tangible.", bare: true },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/brosch\xFCre_seite_2B.webp", caption: "Brochure \u2014 the hub on paper", text: "Page two gathers every city resource at a glance: adult-ed courses, guided tours, the museum, school programs \u2014 the same hub, analog and digital.", bare: true },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/museum_tafel.webp", caption: "Echoes of Moosburg QR code in the museum", text: "In the museum the Echoes of Moosburg QR code jumps straight to the object \u2014 the anchor on site builds trust, the app delivers the depth." },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/system_konzept.webp", caption: "The system concept", text: "How the pillars interlock: physical anchors, digital depth and partner institutions become one living network.", bare: true },
          { src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/system_einwohner.webp", caption: "The resident's path", text: 'And here is how a citizen lives it \u2014 one continuous path from "discover" to "understand" to "pass it on."', bare: true }
        ],
        scenario: "A Saturday in Moosburg: the Huber family stops at the info stele on Marienplatz. The son scans the QR code and slides today over a photo from 1950, while grandma takes a brochure with her. Later at the caf\xE9 they scan the code on the table and listen to an audio diary together. Through the hub they book a STALAG VII A e.V. tour for next week \u2014 and report a scratched sign to the city along the way. At every touchpoint there's also a physical stamp for the brochure \u2014 collect them all and you've walked the whole of Moosburg's history once over. Three generations, one continuous path: discover, understand, pass it on."
      },
      beforeImage: "",
      afterImage: "",
      designScreens: [],
      /* ── Results ───────────────────────────────────────────────────── */
      outcome: "Hybrid service-design system, tested across three generations with 5 usability tests. Three hardware variants (central stele, themed signs, info-post upgrade module) and a mobile web app with time-travel slider, audio diaries and central hub. Credibility via two content partners (STALAG VII A e.V., Karl Bauer). Complete brand identity with the Moosburg rose as a cross-generational visual thread. Most important testing insight implemented: direct entry after QR-scan instead of a welcome screen \u2014 time-to-content is critical.",
      resultsImage: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/Echoes_App.mp4",
      outcomeScenario: `Picture Lena, 16, at Marienplatz. At the info stele she scans the QR code \u2014 and lands straight in the web app, no download. With the time-travel slider she overlays historical photos from the Karl Bauer archive onto today's street view and watches how the square changed; in the audio diaries she hears the voice of a Stalag prisoner. The central hub shows her VHS courses, the Stalag association and the museum at a glance \u2014 and she books a guided tour for her grandmother. That turns "go and fetch it" into "it comes to you": history finds people right where it happened, and connects generations.`,
      outcomeNote: "At the Stalag grounds stands a compact themed sign: less text, more on-site photo comparison and audio. Scanning the QR code opens the matching location profile instantly. \u2192 The full hybrid system (three sign types, web-app features, research & testing) is captured in the complete documentation (PDF).",
      learnings: [
        "Technology as a bridge, not a hurdle. A digital offer in public space lives or dies by how low the barrier is \u2014 dropping the app requirement (web app via QR) boosts acceptance massively.",
        "Multisensory beats text-based. The physical (brochures), visual comparison (time-travel slider) and emotional audio together create deeper understanding than text-only signs.",
        "Memory culture thrives on participation. It works best as a community project \u2014 even residents' wish to contribute their own content (guestbook) keeps history alive.",
        "Bottom-up beats top-down. Working with official bodies (city archive) was slow, while agile initiatives like STALAG VII A e.V. were the real drivers of the project.",
        "Lo-fi testing pays off. Remote think-aloud with lo-fi wireframes surfaced critical navigation flaws early \u2014 before resources went into high-fidelity design (welcome screen out, direct entry in).",
        "Hybrid beats either/or. Not digital OR physical \u2014 signs build trust, the app delivers depth, brochures get picked up and taken home.",
        "Partners need their own benefit. Schools want vivid teaching, adult-ed wants visibility, caf\xE9s want a feature. When everyone wins, the system runs without a top-down push.",
        "Service design > product design. An app alone would not have solved the problem \u2014 schools, adult-ed, associations and caf\xE9s had to be part of the solution, not just stakeholders."
      ],
      wouldChange: [
        "Embed the research in the partners' existing rituals \u2014 STALAG VII A e.V. talks to visitors every day. I arrived with a finished interview guide instead of walking a few of their tours and listening there. That would have produced more authentic quotes.",
        "Bring schools in as research partners, not just solution-phase partners. Teachers see the generational rift up close every day \u2014 they would have delivered insights I needed 10 interviews to surface.",
        `Sell the ecosystem framing to the team earlier. For the first weeks we were still thinking "app", only in week 4 did it flip to "network". If we'd established the framing at the start, the first two iterations wouldn't have been app-centric.`
      ],
      /* ── Reflection ────────────────────────────────────────────────── */
      reflection: "Working with STALAG VII A e.V. taught me: UX research happens informally inside associations all the time \u2014 they talk to their visitors every day. Next project I'd embed research into the partners' existing rituals, instead of arriving with a finished interview guide. The biggest lesson: in service-design projects, partner institutions aren't users \u2014 they're co-creators. The app was the easy part \u2014 designing the system to stay alive was the actual design work.",
      /* ── Existing meta + media ─────────────────────────────────────── */
      metrics: [
        { l: "Generations tested", v: "3" },
        { l: "Usability tests", v: "5" },
        { l: "Hardware variants", v: "3" },
        { l: "Content partners", v: "2" }
      ],
      media: []
    }
  },
  {
    id: "vinted",
    emoji: "\u{1F579}\uFE0F",
    color: "peach",
    status: "completed",
    cover: "assets/Portfolio_Content/VInted_Rebranding/Logo.webp",
    documentation: "assets/Portfolio_Content/VInted_Rebranding/Vinted Pr\xE4si.pdf",
    icon: "assets/icons/vinted.png",
    coverFit: "contain",
    customTabs: "vinted-rewind",
    devLog: {
      stack: ["Figma", "Illustrator", "ChatGPT"],
      builtSolo: "Team (3\u20134) \xB7 Brand + UI Lead",
      role: "Brand Designer + Visual + UI/UX",
      noteHead_de: "Komplettes Brand-\xD6kosystem \u2014 von Visual Identity bis Pop-up-Shop.",
      noteHead_en: "Full brand ecosystem \u2014 from visual identity to pop-up shop.",
      notes_de: [
        "[w1]  Strategie: Reparatur + Recycling als Retro-Gaming-Hub neu gedacht",
        "[w2]  Visual System: Pixel-Logo, Farbpalette (Yellow/Blue/Red/Black), Type-Stack",
        "[w3]  Website 3-Step Flow (Submit \xB7 Match \xB7 Ship)",
        "[w3]  App-Screens: Earn \xB7 Game \xB7 Redeem \u2014 Punkte-Mechanik",
        "[w4]  Gamification: 5 Aktionen \u2192 Punkte, 3 Level (Rookie \xB7 Master \xB7 Legend)",
        "[w4]  Physical Touchpoints: Arcade-Repair-Shops + Retro-Game-Box Packaging",
        "[w5]  Social Strategy: Instagram (Feed \xB7 Stories \xB7 Reels) + Brand-Film"
      ],
      notes_en: [
        "[w1]  strategy: reframed repair + recycling as a retro-gaming hub",
        "[w2]  visual system: pixel logo, palette (yellow/blue/red/black), type stack",
        "[w3]  website 3-step flow (submit \xB7 match \xB7 ship)",
        "[w3]  app screens: earn \xB7 game \xB7 redeem \u2014 points mechanic",
        "[w4]  gamification: 5 actions \u2192 points, 3 levels (rookie \xB7 master \xB7 legend)",
        "[w4]  physical touchpoints: arcade repair shops + retro-game-box packaging",
        "[w5]  social strategy: Instagram (feed \xB7 stories \xB7 reels) + brand film"
      ],
      links: []
    },
    figmaUrl: "https://www.figma.com/design/ivyvi4VafeVD24myjw74UF/Vinted-Retro-Rebranding?node-id=611-747&p=f&t=1VfZe7TcY8tKulN3-0",
    figmaLabel: { de: "Gesamtes Figma-File", en: "See the full work" },
    figmaEmbedUrl: "https://embed.figma.com/design/ivyvi4VafeVD24myjw74UF/Vinted-Retro-Rebranding?node-id=611-747&embed-host=share",
    gamificationFigmaUrl: "https://www.figma.com/proto/ivyvi4VafeVD24myjw74UF/Vinted-Retro-Rebranding?node-id=1075-11710&t=h5LfnsEiXyDX9JCK-0&scaling=min-zoom&content-scaling=fixed&page-id=1075%3A909",
    gamificationFigmaEmbedUrl: "https://embed.figma.com/proto/ivyvi4VafeVD24myjw74UF/Vinted-Retro-Rebranding?node-id=1075-11710&scaling=min-zoom&content-scaling=fixed&page-id=1075%3A909&embed-host=share",
    de: {
      title: "Vinted Rewind",
      description: "Vinted-Rebrand als Retro-Gaming-Hub: Reparatur-Service, App-Gamification, Pop-up-Arcades",
      heroImage: "assets/Portfolio_Content/VInted_Rebranding/magazine1.webp",
      brief: "Rebranding von Vinted: Nicht einfach ein Logo. Sondern ein \xD6kosystem, bei dem Menschen alte Ger\xE4te reparieren, tauschen, spielen \u2014 und Punkte sammeln.",
      strategy: 'Die Retro-Gaming-\xC4sthetik spricht zwei Zielgruppen an: (1) Junge Menschen, die bewusst \u201EAbstand" von der digitalen Welt suchen + alte Ger\xE4te lieben, (2) \xC4ltere Generation, die ihre Ger\xE4te reparieren lassen wollen. Das Reward-System (Retro-Games spielen = Punkte = Rabatte) macht Reparatur & Recycling lustig, nicht moralisch.',
      coreInsight: "Junge Menschen wollen bewusst weg von der digitalen Welt. Sie lieben alte Ger\xE4te. Sie wollen Dinge reparieren, nicht entsorgen. Vinted Rewind ist der Ort, wo Reparatur + Recycling durch Retro-Gaming lustig wird.",
      windowTitle: "Vinted_Rewind.fig \u2014 Press Start \u{1F579}\uFE0F",
      tldr: {
        problem: 'Reparatur f\xFChlt sich moralisch an (\u201Edu solltest"), nicht spielerisch.',
        myRole: "Komplettes Brand-System: Visual Identity + Website + App + Gamification + Social + Video.",
        solution: '\u201EVinted Rewind" \u2014 Reparatur als Retro-Gaming. Punkte, Mini-Games, Avatare freischalten.',
        outcome: "Brand-\xD6kosystem: Visual Identity, Website, App, Reward-System, Pop-up Repair Shops, Social-Strategie, Brand-Film."
      },
      problemShort: "Reparatur & Recycling f\xFChlen sich moralisch an \u2014 nicht spielerisch. Vinted hat das Potenzial, aber nicht die Sprache.",
      solutionShort: '\u201EVinted Rewind" \u2014 Retro-Gaming-Hub mit Reparatur-Service. Komplettes \xD6kosystem von Pixel-Logo bis Pop-up Arcade.',
      role: "Brand Designer, Visual Designer, UI/UX Designer",
      duration: "SS 2025",
      team: "Team (3\u20134 Personen)",
      tools: ["Figma", "Illustrator", "ChatGPT (Bildgenerierung)"],
      roleChips: ["\u{1F3AE} Brand Strategy", "\u{1F3A8} Visual System", "\u{1F4F1} App + Web", "\u{1F3EA} Physical"],
      reflection: 'Die gr\xF6\xDFte Lektion: Nachhaltigkeit muss nicht moralisch sein, um zu wirken. Sobald wir \u201EDu solltest reparieren" gegen \u201EDu kannst dabei spielen" getauscht haben, hat sich das ganze Brand-Vokabular ge\xF6ffnet. Was sich anfangs wie zwei Welten anf\xFChlte \u2014 Retro-Gaming und Repair-Service \u2014 wurde zu einer einzigen Idee mit klarem Tonfall.',
      personality: {
        tone: "Spielerisch, nostalgisch, empowernd",
        values: ["Reuse > Recycle", "Community-Repair", "Retro-Aesthetic", "Sustainability"],
        archetype: "Der Enthusiast + Der Rebell (gegen Fast-Tech-Kultur)"
      },
      visualIdentity: {
        logoLabel: "Pixel-Art Hybrid: Roboter + Wrench + Game-Controller",
        logoNote: "Symbolisiert: Tech + Repair + Fun",
        logoImage: "assets/Portfolio_Content/VInted_Rebranding/Logo.webp",
        colorPalette: [
          { hex: "#FFB700", name: "Retro Yellow" },
          { hex: "#4169E1", name: "Retro Blue" },
          { hex: "#FF6B6B", name: "Retro Red" },
          { hex: "#1a1a1a", name: "Game-Console Black" }
        ],
        typography: {
          headlines: "Pixel-Font (f\xFCr Retro-Vibe)",
          body: "Clean Sans-Serif (f\xFCr Lesbarkeit)",
          sample: "VINTED REWIND"
        },
        imagery: ["Pixel-Art f\xFCr Branding-Assets", "3D Renders f\xFCr Produkte", "Mix von Retro & Modern = Y2K-Nostalgia"],
        style: "Y2K trifft 8-Bit-Nostalgie"
      },
      brandSystem: {
        coreMessage: "Reparatur + Recycling + Retro-Gaming = Punkte + Community",
        tagline: "Bring Your Gadgets Back to Life. Press Start!",
        subtaglines: ["Remind, Reuse, Restart", "Fix the Past, Play the Future", "Every Device Deserves a Second Life"]
      },
      websiteFlow: [
        { num: "1", title: "Submit Your Device", body: "Alte Ger\xE4te hochladen. Beschreibung + Bilder.", image: "assets/Portfolio_Content/VInted_Rebranding/vinted_website.mp4" },
        { num: "2", title: "Get Matched with Expert", body: "Community Repair-Expert wird mit deinem Device gematcht.", image: "assets/Portfolio_Content/VInted_Rebranding/vinted_hub.webp" },
        { num: "3", title: "Ship It, We Fix It", body: "Versand, Reparatur, zur\xFCck in 2 Wochen.", image: "assets/Portfolio_Content/VInted_Rebranding/shipping_box.webp" }
      ],
      appScreens: [
        { title: "Earn Tab", body: "Punkte-\xDCbersicht. Aktivit\xE4ten (Verkauf, Kauf, Game).", image: "assets/Portfolio_Content/VInted_Rebranding/reward_figur.webp" },
        { title: "Game Tab", body: "T\xE4gliches Retro-Mini-Game. +10 Punkte pro Tag.", image: "assets/Portfolio_Content/VInted_Rebranding/vinti.webp" },
        { title: "Redeem Tab", body: "Shop: Rabatte, Repairs, Custom Avatar.", image: "assets/Portfolio_Content/VInted_Rebranding/Play here.webp" }
      ],
      rewardLevels: [
        { emoji: "\u{1F3C5}", title: "Retro Rookie", xp: "0\u2013500 XP", perk: "Sticker Set (kostenlos)" },
        { emoji: "\u{1F3AE}", title: "Game Master", xp: "500\u20131500 XP", perk: "10% Rabatt + Exclusive Game" },
        { emoji: "\u{1F451}", title: "Repair Legend", xp: "1500+ XP", perk: "Custom Avatar-Figur (3D gedruckt!)" }
      ],
      gamification: {
        intro: 'Das Problem: Reparatur & Recycling f\xFChlen sich moralisch an (\u201Edu solltest"). Die L\xF6sung: Mach es spielerisch! Punkte sammeln, Games spielen, Avatars freischalten.',
        earning: [
          { points: "+10", action: "T\xE4gliches Mini-Game", body: "Jeden Tag ein neues Retro-Game spielen." },
          { points: "+30", action: "Etwas Kaufen", body: "Second-Hand Device kaufen." },
          { points: "+50", action: "Etwas Verkaufen", body: "Altes Ger\xE4t auf Vinted verkaufen." },
          { points: "+70", action: "Reparatur nutzen", body: "Repair-Service von Experten." },
          { points: "+50", action: "Freund einladen", body: "Jemanden zur Community einladen." }
        ],
        rewards: [
          { name: "Rabatt 10%", cost: "200 Punkte" },
          { name: "Kostenloser Repair (bis \u20AC20)", cost: "500 Punkte" },
          { name: "Exclusive Retro-Game", cost: "300 Punkte" },
          { name: "Custom Avatar-Figur", cost: "1000 Punkte (ultimate)" }
        ]
      },
      physical: {
        shopTitle: "Vinted Rewind Pop-Up Shops",
        shopConcept: "Hybrid Arcade + Repair-Center",
        shopBullets: [
          "Dein Ger\xE4t bringen \u2192 Expert repariert es",
          "W\xE4hrend du wartest: Retro-Games spielen (mit Nintendo-\xE4hnlichen Konsolen)",
          "Punkte sammeln, w\xE4hrend du spielst",
          "Kaufe alte Ger\xE4te im Shop-Bereich"
        ],
        shopBranding: "Arcade-Aesthetic. Neon-Schilder. Pixelated Graphics an den W\xE4nden.",
        shopImage: "assets/Portfolio_Content/VInted_Rebranding/werbung_tafel.webp",
        packagingTitle: "Packaging: Like a Retro Game Box",
        packagingBody: 'Wenn Ger\xE4te zur\xFCck zu dir kommen, kommen sie in einer Custom Retro-Game-Box-Style Verpackung. Vorne: \u201EVINTED REWIND"-Logo + Pixel-Art. Hinten: Dein Device als \u201EGame Cover"-Illustration. Auspacken wird zum Event, nicht zur Routine.',
        packagingImage: "assets/Portfolio_Content/VInted_Rebranding/shipping_box.webp"
      },
      social: [
        { title: "Feed Posts", body: "Before/After Repair Stories (Pixel-Art-Overlays).", image: "assets/Portfolio_Content/VInted_Rebranding/magazine2.webp" },
        { title: "Stories", body: 'Daily \u201EPlay & Earn"-Stories. Game-Challenges. Polls.', image: "assets/Portfolio_Content/VInted_Rebranding/ChatGPT Image 27. Juni 2025, 18_57_57.webp" },
        { title: "Reels", body: 'Quick \u201EHow to Repair"-Videos. Game-Highlights. Community Features.', image: "assets/Portfolio_Content/VInted_Rebranding/ChatGPT Image 27. Juni 2025, 20_36_03.webp" }
      ],
      videos: [
        {
          title: "Brand Film (30s)",
          tagline: '\u201EBring Your Gadgets Back to Life. Press Start!"',
          body: "Old Device \u2192 Repair \u2192 Works Again \u2192 Happy Customer \u2192 Points. Style: Retro-Game-Cut-Scenes + Real-Footage-Mix.",
          src: "assets/Portfolio_Content/VInted_Rebranding/commercial.mp4"
        },
        {
          title: "How-It-Works Animation (45s)",
          tagline: "Submit \u2192 Match \u2192 Repair \u2192 Return \u2192 Earn Points",
          body: "Animated Pixel-Art-Sequenzen.",
          src: ""
        },
        {
          title: "Customer Testimonial Series",
          tagline: "Real People, Real Repairs",
          body: "Kurze TikTok-Format-Clips (15\u201320s), echte Reparatur-Stories + Rewards.",
          src: ""
        }
      ],
      research: [
        "Strategie: Reframing von Reparatur als Spiel, nicht Moral",
        "Visual: Pixel-Art, Y2K-Werbe\xE4sthetik, 8-Bit-Game-Boxen",
        "Konkurrenz: Depop, eBay Vintage, Etsy \u2014 fashion-zentrierte Plattformen",
        "Zielgruppe: Junge Retro-Lovers + \xE4ltere Generation, die reparieren statt entsorgen will"
      ],
      metrics: [{ l: "Touchpoints", v: "7" }, { l: "App-Screens", v: "5" }, { l: "Level-System", v: "3" }]
    },
    en: {
      title: "Vinted Rewind",
      description: "Vinted rebrand as a retro-gaming hub: repair service, app gamification, pop-up arcades",
      heroImage: "assets/Portfolio_Content/VInted_Rebranding/magazine1.webp",
      brief: "Rebranding Vinted: not just a logo. An ecosystem where people fix, swap, play with old gadgets \u2014 and collect points doing it.",
      strategy: "The retro-gaming aesthetic speaks to two audiences at once: (1) young people who want to step away from the digital, who love old hardware, and (2) an older generation who want their devices repaired. The reward system (play retro games = earn points = unlock discounts) makes repair & recycling fun, not preachy.",
      coreInsight: "Young people are deliberately stepping away from the digital. They love old gadgets. They want to fix things, not toss them. Vinted Rewind is the place where repair + recycling becomes fun through retro-gaming.",
      windowTitle: "Vinted_Rewind.fig \u2014 Press Start \u{1F579}\uFE0F",
      tldr: {
        problem: 'Repair feels moral ("you should"), not playful.',
        myRole: "Full brand system: visual identity + website + app + gamification + social + video.",
        solution: '"Vinted Rewind" \u2014 repair as retro gaming. Points, mini-games, unlockable avatars.',
        outcome: "Brand ecosystem: visual identity, website, app, reward system, pop-up repair shops, social strategy, brand film."
      },
      problemShort: "Repair & recycling feel preachy \u2014 not playful. Vinted has the reach but not the vocabulary.",
      solutionShort: '"Vinted Rewind" \u2014 a retro-gaming hub with a repair service. Full ecosystem from pixel logo to pop-up arcade.',
      role: "Brand Designer, Visual Designer, UI/UX Designer",
      duration: "Summer 2025",
      team: "Team (3\u20134 people)",
      tools: ["Figma", "Illustrator", "ChatGPT (image generation)"],
      roleChips: ["\u{1F3AE} Brand Strategy", "\u{1F3A8} Visual System", "\u{1F4F1} App + Web", "\u{1F3EA} Physical"],
      reflection: 'The biggest takeaway: sustainability does not need to be moral to land. The moment we swapped "you should repair" for "you can play while you do", the whole brand vocabulary opened up. What initially felt like two worlds \u2014 retro gaming and a repair service \u2014 settled into a single idea with one clear tone of voice.',
      personality: {
        tone: "Playful, nostalgic, empowering",
        values: ["Reuse > Recycle", "Community repair", "Retro aesthetic", "Sustainability"],
        archetype: "The Enthusiast + The Rebel (against fast-tech culture)"
      },
      visualIdentity: {
        logoLabel: "Pixel-art hybrid: robot + wrench + game controller",
        logoNote: "Symbolises: tech + repair + fun",
        logoImage: "assets/Portfolio_Content/VInted_Rebranding/Logo.webp",
        colorPalette: [
          { hex: "#FFB700", name: "Retro Yellow" },
          { hex: "#4169E1", name: "Retro Blue" },
          { hex: "#FF6B6B", name: "Retro Red" },
          { hex: "#1a1a1a", name: "Game-Console Black" }
        ],
        typography: {
          headlines: "Pixel font (for the retro vibe)",
          body: "Clean sans-serif (for legibility)",
          sample: "VINTED REWIND"
        },
        imagery: ["Pixel art for brand assets", "3D renders for products", "Mix of retro & modern = Y2K nostalgia"],
        style: "Y2K meets 8-bit nostalgia"
      },
      brandSystem: {
        coreMessage: "Repair + Recycling + Retro-Gaming = Points + Community",
        tagline: "Bring Your Gadgets Back to Life. Press Start!",
        subtaglines: ["Remind, Reuse, Restart", "Fix the Past, Play the Future", "Every Device Deserves a Second Life"]
      },
      websiteFlow: [
        { num: "1", title: "Submit Your Device", body: "Upload your old device. Description + photos.", image: "assets/Portfolio_Content/VInted_Rebranding/vinted_website.mp4" },
        { num: "2", title: "Get Matched with an Expert", body: "A community repair expert is matched to your device.", image: "assets/Portfolio_Content/VInted_Rebranding/vinted_hub.webp" },
        { num: "3", title: "Ship It, We Fix It", body: "Shipping, repair, returned within 2 weeks.", image: "assets/Portfolio_Content/VInted_Rebranding/shipping_box.webp" }
      ],
      appScreens: [
        { title: "Earn tab", body: "Points overview. Activities (sell, buy, game).", image: "assets/Portfolio_Content/VInted_Rebranding/reward_figur.webp" },
        { title: "Game tab", body: "Daily retro mini-game. +10 points a day.", image: "assets/Portfolio_Content/VInted_Rebranding/vinti.webp" },
        { title: "Redeem tab", body: "Shop: discounts, repairs, custom avatar.", image: "assets/Portfolio_Content/VInted_Rebranding/Play here.webp" }
      ],
      rewardLevels: [
        { emoji: "\u{1F3C5}", title: "Retro Rookie", xp: "0\u2013500 XP", perk: "Sticker set (free)" },
        { emoji: "\u{1F3AE}", title: "Game Master", xp: "500\u20131500 XP", perk: "10% discount + exclusive game" },
        { emoji: "\u{1F451}", title: "Repair Legend", xp: "1500+ XP", perk: "Custom avatar figure (3D-printed!)" }
      ],
      gamification: {
        intro: 'The problem: repair & recycling feel moral ("you should"). The solution: make it playful. Collect points, play games, unlock avatars.',
        earning: [
          { points: "+10", action: "Daily mini-game", body: "Play a new retro game every day." },
          { points: "+30", action: "Buy something", body: "Purchase a second-hand device." },
          { points: "+50", action: "Sell something", body: "Sell an old device on Vinted." },
          { points: "+70", action: "Use the repair", body: "Use the expert repair service." },
          { points: "+50", action: "Invite a friend", body: "Bring someone into the community." }
        ],
        rewards: [
          { name: "10% discount", cost: "200 points" },
          { name: "Free repair (up to \u20AC20)", cost: "500 points" },
          { name: "Exclusive retro game", cost: "300 points" },
          { name: "Custom avatar figure", cost: "1000 points (ultimate)" }
        ]
      },
      physical: {
        shopTitle: "Vinted Rewind Pop-Up Shops",
        shopConcept: "Hybrid arcade + repair centre",
        shopBullets: [
          "Bring your device \u2192 an expert repairs it",
          "While you wait: play retro games (on Nintendo-style consoles)",
          "Collect points while you play",
          "Buy old devices in the shop area"
        ],
        shopBranding: "Arcade aesthetic. Neon signage. Pixelated graphics on the walls.",
        shopImage: "assets/Portfolio_Content/VInted_Rebranding/werbung_tafel.webp",
        packagingTitle: "Packaging: Like a Retro Game Box",
        packagingBody: 'When devices come back to you, they arrive in a custom retro-game-box-style package. Front: "VINTED REWIND" logo + pixel art. Back: your device as a "game cover" illustration. Unboxing becomes an event, not a routine.',
        packagingImage: "assets/Portfolio_Content/VInted_Rebranding/shipping_box.webp"
      },
      social: [
        { title: "Feed posts", body: "Before/after repair stories (pixel-art overlays).", image: "assets/Portfolio_Content/VInted_Rebranding/magazine2.webp" },
        { title: "Stories", body: 'Daily "Play & Earn" stories. Game challenges. Polls.', image: "assets/Portfolio_Content/VInted_Rebranding/ChatGPT Image 27. Juni 2025, 18_57_57.webp" },
        { title: "Reels", body: 'Quick "how to repair" videos. Game highlights. Community features.', image: "assets/Portfolio_Content/VInted_Rebranding/ChatGPT Image 27. Juni 2025, 20_36_03.webp" }
      ],
      videos: [
        {
          title: "Brand Film (30s)",
          tagline: '"Bring Your Gadgets Back to Life. Press Start!"',
          body: "Old device \u2192 repair \u2192 working again \u2192 happy customer \u2192 points. Style: retro-game cut-scenes mixed with real footage.",
          src: "assets/Portfolio_Content/VInted_Rebranding/commercial.mp4"
        },
        {
          title: "How-It-Works Animation (45s)",
          tagline: "Submit \u2192 Match \u2192 Repair \u2192 Return \u2192 Earn Points",
          body: "Animated pixel-art sequences.",
          src: ""
        },
        {
          title: "Customer Testimonial Series",
          tagline: "Real people, real repairs",
          body: "Short TikTok-style clips (15\u201320s), real repair stories + rewards.",
          src: ""
        }
      ],
      research: [
        "Strategy: reframing repair as play, not as morality",
        "Visual: pixel art, Y2K advertising, 8-bit game boxes",
        "Competition: Depop, eBay Vintage, Etsy \u2014 fashion-centric platforms",
        "Audience: young retro lovers + an older generation who want to fix, not toss"
      ],
      metrics: [{ l: "Touchpoints", v: "7" }, { l: "App screens", v: "5" }, { l: "Level system", v: "3" }]
    }
  },
  {
    id: "munichapp",
    emoji: "\u{1F3D9}\uFE0F",
    color: "sky",
    status: "completed",
    cover: "assets/Portfolio_Content/Munich_Super_App/munich_entry.webp",
    icon: "assets/icons/munich.png",
    coverFit: "cover",
    figmaUrl: "https://www.figma.com/proto/nhU3ceD19oDSzRyxQPWAMu/Munich-Super-App?node-id=103-253&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=103%3A253",
    figmaEmbedUrl: "https://embed.figma.com/proto/nhU3ceD19oDSzRyxQPWAMu/Munich-Super-App?node-id=103-253&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=103%3A253&embed-host=share",
    devLog: {
      stack: ["Miro", "Figma"],
      builtSolo: "Co-Lead Research (4-Team)",
      role: "UX Research + Service Design",
      notes_de: [
        "[w1]  Interview-Guide (Before \xB7 During \xB7 After) + DSGVO-Setup",
        "[w2]  6+ Interviews quer durch Alter & Lebenslage (30-45 min)",
        "[w2]  4 Personas synthetisiert: Senior \xB7 Berufst\xE4tige \xB7 Tourist \xB7 Student",
        "[w3]  Customer Journey \xFCber 5 Phasen, Pains/Gains aus Affinity Mapping",
        "[w3]  JTBD-Statements als Service-Design-Anker",
        "[w4]  Low-Fi Prototyp in MIT App Inventor \u2014 testbar ohne dev-setup",
        "[w4]  Hi-Fi Dashboard-Mockups in Figma + Implementierungs-Roadmap"
      ],
      notes_en: [
        "[w1]  interview guide (Before \xB7 During \xB7 After) + GDPR setup",
        "[w2]  6+ interviews across age & life stages (30-45 min)",
        "[w2]  synthesized 4 personas: senior \xB7 pro \xB7 tourist \xB7 student",
        "[w3]  customer journey across 5 phases, pains/gains from affinity mapping",
        "[w3]  JTBD statements as service-design anchors",
        "[w4]  low-fi prototype in MIT App Inventor \u2014 testable without dev setup",
        "[w4]  hi-fi dashboard mockups in Figma + implementation roadmap"
      ],
      links: [
        { label: "Figma \u2014 Hi-Fi", href: "#", icon: "\u25B6" },
        { label: "Miro \u2014 Journey + JTBD", href: "#", icon: "\u25B6" }
      ]
    },
    de: {
      title: "Munich Super App",
      description: "Ein Service-Design-Konzept f\xFCr eine einzige M\xFCnchen-App \u2014 Mobilit\xE4t, Kultur, Tickets, alles in einem.",
      heroImage: "assets/Portfolio_Content/Munich_Super_App/munich_entry.webp",
      context: "Einsemestriges Service-Design-Studienprojekt an der HM M\xFCnchen. Im 4er-Team haben wir untersucht, wie st\xE4dtische Services in M\xFCnchen geb\xFCndelt werden k\xF6nnten \u2014 und welche H\xFCrden B\xFCrger:innen aktuell zwischen MVGO, M\xFCnchen Ticket & Co. erleben.",
      keyInsight: 'App-Wildwuchs ist das Kernproblem: M\xFCnchner:innen wechseln zwischen 5+ Apps f\xFCr einen einzigen Vorgang. Eine \u201ESuper App" hei\xDFt also nicht \u201Enoch eine App" \u2014 sondern \u201Eeine weniger jonglieren".',
      problemStatement: "Wer in M\xFCnchen mobil und aktiv sein will, jongliert mehrere Apps und Seiten: MVGO f\xFCr den \xD6PNV, m\xFCnchen.de f\xFCr Events und Aktivit\xE4ten, dazu Museums- und Schwimmbad-Angebote \u2014 jede mit eigener Logik, keine spricht mit der anderen.",
      problemContext: "Ein einziger Plan \u2014 vom Weg zur Veranstaltung \u2014 zerf\xE4llt in mehrere getrennte Vorg\xE4nge. Tickets verschwinden im E-Mail-Chaos, Fristen werden verpasst, und spannende Events gehen schlicht unter, weil niemand mehrere Apps und Seiten gleichzeitig im Blick hat. Sieben st\xE4dtische Services, sieben Anlaufstellen, kein roter Faden. Wir wollten verstehen: Wie k\xF6nnte die Stadt Mobilit\xE4t, Kultur und Freizeit so b\xFCndeln, dass aus vielen Einzel-Apps ein einziger, m\xFCheloser Weg wird?",
      /* ── Echoes-style sections — fill to enable (see echoes for the shape) ── */
      problemGallery: [
        { src: "assets/Portfolio_Content/Munich_Super_App/munich_seite.webp", caption: "m\xFCnchen.de \u2014 Events & Aktivit\xE4ten liegen hier, komplett getrennt von Mobilit\xE4t (MVGO) und Tickets." },
        { src: "assets/Portfolio_Content/Munich_Super_App/apps_bundle.webp", caption: "App-Wildwuchs: 5+ Apps f\xFCr einen einzigen Vorgang." },
        { src: "assets/Portfolio_Content/Munich_Super_App/UserJourney1.webp", caption: "User Journey ohne Super App \u2014 wo M\xFCnchner:innen Fristen, Tickets und \xDCberblick verlieren." }
      ],
      /* [{ src, caption }] → Problem as sticky-scroll gallery */
      designCarousel: [],
      /* [{ src, caption, bare }] → Solution as sticky-scroll */
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      /* system journey (rose route) */
      problemImage: "assets/Portfolio_Content/Munich_Super_App/munich_seite.webp",
      researchContext: "Research-first: bevor wir an Screens dachten, haben wir zugeh\xF6rt. Qualitative 1:1-Interviews mit M\xFCnchner:innen quer durch Alter, Herkunft und Lebenslage \u2014 DSGVO-konform aufgesetzt, mit schriftlicher Einwilligung und anonymisierter Auswertung. Der Guide folgte der echten Journey: Before \xB7 During \xB7 After eines Stadt-Vorgangs. Aus den Aufnahmen haben wir per Affinity Mapping geclustert, pro Persona eine Empathy Map gebaut und in Pains/Gains synthetisiert \u2014 die Grundlage f\xFCr JTBD-Statements und vier Personas.",
      researchImage: "assets/Portfolio_Content/Munich_Super_App/1000158732.webp",
      researchGallery: [
        { src: "assets/Portfolio_Content/Munich_Super_App/post_it.webp", caption: "Affinity Mapping \u2014 Interview-Aussagen auf Post-its, roh geclustert." },
        { src: "assets/Portfolio_Content/Munich_Super_App/cluster.webp", caption: "Cluster-Bildung \u2014 wiederkehrende Themen und Pains herausgearbeitet." },
        { src: "assets/Portfolio_Content/Munich_Super_App/empathy_map.webp", caption: "Empathy Map pro Persona \u2014 Says / Thinks / Feels / Does." },
        { src: "assets/Portfolio_Content/Munich_Super_App/UserJourney1.webp", caption: "Customer Journey \xFCber 5 Phasen \u2014 Before \xB7 During \xB7 After mit Pains/Gains." },
        { src: "assets/Portfolio_Content/Munich_Super_App/research.webp", caption: "Research-Synthese \u2014 von Rohdaten zu Service-Design-Ankern." }
      ],
      solutionStatement: "Nicht noch eine App, sondern eine weniger: Die Munich Super App b\xFCndelt Mobilit\xE4t und Kultur in einem Dashboard \u2014 jede Funktion beantwortet direkt einen Pain aus der Recherche.",
      solutionContext: "Zwei Verticals in einem System \u2014 Mobilit\xE4t (MVG) und Kultur & Freizeit (Tickets \xB7 Museen \xB7 Schwimmb\xE4der). Gegen App-Wildwuchs: ein Login, ein Dashboard. Gegen verpasste Fristen: proaktive, smarte Erinnerungen. Gegen E-Mail-Chaos: alle Tickets zentral, schnelle Bezahlung mit gespeicherter Methode, zuverl\xE4ssig auch offline. Personalisierung ab Sekunde eins \xFCber ein Interessen-Quiz vor dem Login. Und Barrierefreiheit als Default, nicht als Opt-in \u2014 damit die App f\xFCr alle vier Personas tr\xE4gt, von Tourist:in bis Seniorin.",
      solutionImage: "assets/Portfolio_Content/Munich_Super_App/munich_entry.webp",
      solutionScenarioImages: [
        { src: "assets/Portfolio_Content/Munich_Super_App/munich_entry.webp", caption: "Der Einstieg in die Munich Super App \u2014 ein zentrales Dashboard statt f\xFCnf Einzel-Apps.", scenario: "Schon vor dem ersten Login macht Flora einen kurzen Interessen-Quiz \u2014 ab jetzt sieht sie nur noch, was zu ihr passt. Auf dem smarten Home-Screen warten Live-Infos zu \xD6PNV und spontanen Events in der N\xE4he, ihre Upcoming Events liegen mit QR-Code bereit." },
        { src: "assets/Portfolio_Content/Munich_Super_App/munich_pay.webp", caption: "M\xFCheloser Ticketkauf & schnelle Bezahlung \u2014 Warenkorb, gespeicherte Zahlungsmethode, ein Klick.", scenario: "Sie tippt auf eine Ausstellung und wird direkt zur empfohlenen Route gef\xFChrt. Ihr MVV-Ticket kauft sie auf der Public-Transport-Leiste; nach einem Swipe fasst der Warenkorb alles zusammen, die Zahlungsmethode ist gespeichert \u2014 fertig mit einem einzigen Klick." },
        { src: "assets/Portfolio_Content/Munich_Super_App/munich_summary_reminde.webp", caption: "Kaufverlauf & intelligente Erinnerungen \u2014 volle Transparenz, keine verpassten Fristen.", scenario: "Vor dem Verlassen pr\xFCft sie ihren Kaufverlauf f\xFCr volle Transparenz und aktiviert die Offline-Funktion \u2014 Tickets und Karte sind sicher gespeichert, auch bei Netzproblemen. L\xE4uft ihr Ticket bald ab, erinnert die App sie rechtzeitig. Eine App, ein Vormittag, kein Jonglieren." }
      ],
      solutionScenario: "Nehmen wir Flora \u2014 internationale Studentin, viel unterwegs, neugierig auf die Stadt. So sieht ihr Tag mit der Munich Super App aus:",
      figmaNote: "Das Interface wurde in nur zwei Tagen in einem Hackathon gebaut.",
      outcomeScenario: "F\xFCr Flora \u2014 und f\xFCr jede:n Nutzer:in \u2014 hei\xDFt das: Struktur statt Chaos. Alle Tickets an einem Ort statt im E-Mail-Wirrwarr. Verl\xE4ssliche Echtzeit-Infos zu \xD6ffnungszeiten, Baustellen und Events. Kein App-Wechsel, ein einziger Login, personalisierte Empfehlungen durch intelligente Filter und eine Offline-Funktion, die auch bei Netzproblemen tr\xE4gt. Aus der Komplexit\xE4t des Stadtlebens wird eine nahtlose, intuitive Erfahrung \u2014 ein Stadtbegleiter, mit dem man sich vom ersten Moment an zu Hause f\xFChlt.",
      beforeImage: "",
      afterImage: "",
      designScreens: [
        {
          name: "Hi-Fi Detail-Screen",
          description: "Beispielhafte Service-Detailansicht aus dem Dashboard \u2014 zeigt wie die Service-Design-Prinzipien (Accessibility-First, Progressive Disclosure) auf Screen-Ebene umgesetzt sind. [TODO: pr\xE4zisere Annotation was konkret auf dem Screen passiert]",
          image: "assets/Portfolio_Content/Munich_Super_App/munich_pay.webp"
        }
      ],
      resultsImage: "assets/Portfolio_Content/Munich_Super_App/Munich_App_Video.mp4",
      reflection: "Mein gr\xF6\xDFtes Learning kam aus dem Hackathon: Die besten Ideen entstanden erst unter Druck und im Machen \u2014 nicht beim langen Planen davor. H\xE4tten wir fr\xFCher einfach angefangen, w\xE4ren wir auf deutlich mehr L\xF6sungsans\xE4tze gekommen. Zu viel Vorab-Nachdenken bringt wenig; loslegen, ausprobieren und im Tun verfeinern war f\xFCr uns der schnellere Weg zu guten Konzepten.",
      windowTitle: "Munich_Super_App.fig \u2014 Service Design f\xFCr die Stadt \u{1F3D9}\uFE0F",
      tldr: {
        problem: "M\xFCnchner:innen jonglieren zwischen MVGO, m\xFCnchen.de und mehr \u2014 jede Anlaufstelle eigene Logik.",
        myRole: "Co-Lead User Research, Interview-Setup (DSGVO), Empathy- & Journey-Mapping im 4er-Team.",
        solution: 'Service-Design-Konzept einer \u201EMunich Super App" \u2014 ein Dashboard f\xFCr Mobilit\xE4t und Kultur.',
        outcome: "Vollst\xE4ndige SD-Doku (Empathy \xB7 Journey \xB7 Pains/Gains \xB7 JTBD) + Low-Fi-Prototyp in MIT App Inventor."
      },
      problemShort: "7 st\xE4dtische Services, 7 Anlaufstellen \u2014 Mobilit\xE4t, Events & Aktivit\xE4ten verstreut, kein \xDCberblick.",
      solutionShort: "Service-Design-Konzept f\xFCr eine zentrale Stadt-App, die Mobilit\xE4t, Kultur & Tickets b\xFCndelt.",
      role: "UX Research, Service Design, Empathy & Journey Mapping, Prototyping",
      duration: "SS 2025",
      team: "4er-Team \xB7 Studienprojekt HM M\xFCnchen",
      tools: ["Miro", "Figma"],
      roleChips: ["\u{1F50D} Research", "\u{1F5C2}\uFE0F Service Design", "\u{1F9E0} JTBD", "\u270F\uFE0F Prototyping"],
      research: [
        "Qualitative 1:1-Interviews (30\u201345 min, Audio + Notizen) mit M\xFCnchner:innen quer durch Alter, Herkunft & Lebenslage",
        "Strukturierter Interview-Guide entlang der Journey: Before \xB7 During \xB7 After eines Stadt-Vorgangs",
        "Empathy Mapping pro Persona: Says \xB7 Thinks \xB7 Feels \xB7 Does",
        "Customer Journey \xFCber 5 Phasen \u2014 Bedarf \u2192 Entdecken \u2192 Planen/Buchen \u2192 Nutzen \u2192 Erinnern",
        "Affinity Mapping der Interview-Aussagen, Synthese in Pains / Gains",
        "JTBD-Statements + 4 Personas (Seniorin \xB7 Berufst\xE4tige \xB7 Tourist:in \xB7 Student:in)",
        "DSGVO-konformes Setup: schriftliche Einwilligung & Datenschutzerkl\xE4rung, anonymisierte Auswertung"
      ],
      insights: [
        '\u201EApp-Wildwuchs": M\xFCnchner:innen springen zwischen MVGO, m\xFCnchen.de & Co. \u2014 kein roter Faden zwischen Anfahrt, Ticket und Event.',
        "Events & Aktivit\xE4ten werden zuf\xE4llig entdeckt \u2014 ohne zentrale \xDCbersicht gehen spannende Veranstaltungen unter.",
        "Wichtige Fristen & Termine werden vergessen \u2014 Erinnerungen kommen zu sp\xE4t oder gar nicht.",
        "Datenschutzbedenken bremsen die Nutzung \u2014 Transparenz ist kein Feature, sondern Grundvoraussetzung.",
        "Accessibility wird untersch\xE4tzt: Senior:innen scheitern an kleiner Schrift und unklaren Symbolen.",
        "Sprachbarriere f\xFCr Tourist:innen & Neuank\xF6mmlinge \u2014 viele Services nur auf Deutsch verf\xFCgbar."
      ],
      hmw: [
        "Wie b\xFCndeln wir Mobilit\xE4t, Events und Aktivit\xE4ten so, dass ein kompletter Plan \u2014 vom Weg bis zur Veranstaltung \u2014 in einem Flow bleibt, statt \xFCber f\xFCnf Apps verteilt?",
        "Wie helfen wir M\xFCnchner:innen, kein Event und keine Frist mehr zu verpassen, ohne sie mit Benachrichtigungen zu \xFCberfordern?",
        "Wie schaffen wir Vertrauen in eine zentrale st\xE4dtische App \u2014 gerade bei Zahlungs- und Standortdaten?",
        "Wie machen wir eine App f\xFCr vier sehr unterschiedliche Personas (Seniorin \xB7 Berufst\xE4tige \xB7 Tourist:in \xB7 Student:in) gleicherma\xDFen zug\xE4nglich?"
      ],
      concept: "Eine Munich Super App mit zentralem Dashboard f\xFCr zwei Service-Verticals: Mobilit\xE4t (MVG) und Kultur & Freizeit (M\xFCnchen Ticket \xB7 Museen \xB7 Schwimmb\xE4der). Personalisierte, proaktive Erinnerungen. Wallet- und Kalender-Integration. Barrierefreie Gestaltung als Default \u2014 nicht als Option.",
      outcome: 'Am Ende stand ein vollst\xE4ndiges Service-Design-Konzept: Empathy Maps, eine 5-Phasen-Journey, Pains/Gains-Synthese, JTBD-Statements und 4 Personas \u2014 \xFCbergeben mit einer Implementierungs-Roadmap. Das Interface wurde in einem 2-Tage-Hackathon vom Konzept zum klickbaren Hi-Fi-Prototyp (Figma) plus Low-Fi-Build in MIT App Inventor verdichtet. Die zentrale Erkenntnis \u2014 \u201Eeine App weniger jonglieren" statt \u201Enoch eine App" \u2014 trug das ganze Konzept und machte aus App-Wildwuchs ein klares Design-Ziel.',
      learnings: [
        "Service Design \u2260 App Design: Das eigentliche Problem war die Organisations- und Datenarchitektur, nicht die UI \u2014 sieben Services zu b\xFCndeln hei\xDFt zuerst Logik ordnen, dann Screens bauen.",
        '\u201EEine App weniger" ist ein sch\xE4rferes Ziel als \u201Eeine App mehr": Erst mit App-Wildwuchs als Kernproblem wurde jede Feature-Entscheidung \xFCberpr\xFCfbar \u2014 l\xF6st sie echtes Jonglieren oder f\xFCgt sie nur hinzu?',
        "Vier sehr unterschiedliche Personas zwingen zu echter Inklusivit\xE4t: Barrierefreiheit und Mehrsprachigkeit als Default statt Opt-in war die einzige Art, Seniorin und Tourist:in gleichzeitig ernst zu nehmen.",
        "Anfangen schl\xE4gt Nachdenken: Im 2-Tage-Hackathon entstanden die besten Ideen erst unter Druck und im Machen. H\xE4tten wir fr\xFCher einfach losgelegt, w\xE4ren wir auf deutlich mehr L\xF6sungsans\xE4tze gekommen \u2014 zu viel Vorabplanung bringt wenig, einfach starten."
      ],
      wouldChange: [],
      metrics: [{ l: "Interviews", v: "6+" }, { l: "Personas", v: "4" }, { l: "Services integriert", v: "7" }],
      media: [
        { type: "image", src: "assets/Portfolio_Content/Munich_Super_App/empathy_map.webp", caption: "Empathy Map \xB7 Personas-Skizze", width: 1200, height: 800 },
        { type: "image", src: "assets/Portfolio_Content/Munich_Super_App/1000158734.webp", caption: "JTBD-Statement & 4 Personas", width: 1200, height: 800 }
      ]
    },
    en: {
      title: "Munich Super App",
      description: "A service-design concept for a single Munich app \u2014 mobility, culture, tickets, all in one.",
      heroImage: "assets/Portfolio_Content/Munich_Super_App/munich_entry.webp",
      context: "One-semester service-design student project at HM Munich. In a 4-person team we investigated how city services in Munich could be bundled \u2014 and which pain points citizens currently hit between MVGO, Munich Ticket and co.",
      keyInsight: `App sprawl is the core problem: Munich citizens switch between 5+ apps for a single task. A "super app" doesn't mean "one more app" \u2014 it means "one less to juggle".`,
      problemStatement: "Being mobile and active in Munich means juggling several apps and sites: MVGO for transit, muenchen.de for events and activities, plus museum and pool offerings \u2014 each with its own logic, none talking to the others.",
      problemContext: "A single plan \u2014 from the journey to the event \u2014 splits into several separate steps. Tickets vanish in email chaos, deadlines get missed, and exciting events simply slip through because no one keeps several apps and sites in view at once. Seven city services, seven touchpoints, no through-line. We wanted to understand: how could the city bundle mobility, culture and leisure so that many separate apps become one effortless flow?",
      /* ── Echoes-style sections — fill to enable (see echoes for the shape) ── */
      problemGallery: [
        { src: "assets/Portfolio_Content/Munich_Super_App/munich_seite.webp", caption: "muenchen.de \u2014 events & activities live here, fully separate from mobility (MVGO) and tickets." },
        { src: "assets/Portfolio_Content/Munich_Super_App/apps_bundle.webp", caption: "App sprawl: 5+ apps for a single task." },
        { src: "assets/Portfolio_Content/Munich_Super_App/UserJourney1.webp", caption: "User journey without the super app \u2014 where citizens lose deadlines, tickets and overview." }
      ],
      /* [{ src, caption }] → Problem as sticky-scroll gallery */
      designCarousel: [],
      /* [{ src, caption, bare }] → Solution as sticky-scroll */
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      /* system journey (rose route) */
      problemImage: "assets/Portfolio_Content/Munich_Super_App/apps_bundle.webp",
      researchContext: "Research-first: before we thought about screens, we listened. Qualitative 1:1 interviews with Munich residents across age, background and life stage \u2014 set up GDPR-compliant, with written consent and anonymised analysis. The guide followed the real journey: Before \xB7 During \xB7 After a city task. From the recordings we clustered via affinity mapping, built an empathy map per persona and synthesised into pains / gains \u2014 the basis for JTBD statements and four personas.",
      researchImage: "assets/Portfolio_Content/Munich_Super_App/1000158732.webp",
      researchGallery: [
        { src: "assets/Portfolio_Content/Munich_Super_App/post_it.webp", caption: "Affinity mapping \u2014 interview quotes on post-its, clustered raw." },
        { src: "assets/Portfolio_Content/Munich_Super_App/cluster.webp", caption: "Clustering \u2014 recurring themes and pains surfaced." },
        { src: "assets/Portfolio_Content/Munich_Super_App/empathy_map.webp", caption: "Empathy map per persona \u2014 Says / Thinks / Feels / Does." },
        { src: "assets/Portfolio_Content/Munich_Super_App/UserJourney1.webp", caption: "Customer journey across 5 phases \u2014 Before \xB7 During \xB7 After with pains / gains." },
        { src: "assets/Portfolio_Content/Munich_Super_App/research.webp", caption: "Research synthesis \u2014 from raw data to service-design anchors." }
      ],
      solutionStatement: "Not one more app, but one less: the Munich Super App bundles mobility and culture into one dashboard \u2014 every feature answers a pain from the research directly.",
      solutionContext: "Two verticals in one system \u2014 mobility (MVG) and culture & leisure (tickets \xB7 museums \xB7 pools). Against app sprawl: one login, one dashboard. Against missed deadlines: proactive, smart reminders. Against email chaos: all tickets in one place, fast checkout with a saved payment method, reliable even offline. Personalised from second one via an interests quiz before login. And accessibility as default, not opt-in \u2014 so the app holds up for all four personas, from tourist to senior.",
      solutionImage: "assets/Portfolio_Content/Munich_Super_App/munich_entry.webp",
      solutionScenarioImages: [
        { src: "assets/Portfolio_Content/Munich_Super_App/munich_entry.webp", caption: "Entering the Munich Super App \u2014 one central dashboard instead of five separate apps.", scenario: "Before she even logs in, Flora takes a quick interests quiz \u2014 from now on she only sees what's relevant to her. Her smart home screen greets her with live transit updates and spontaneous events nearby, her upcoming events ready with a QR code." },
        { src: "assets/Portfolio_Content/Munich_Super_App/munich_pay.webp", caption: "Effortless ticket purchase & fast checkout \u2014 cart, saved payment method, one click.", scenario: "She taps an exhibition and gets routed there instantly. She buys her MVV ticket right on the public-transport bar; after one swipe the cart sums everything up, her payment method is saved \u2014 done in a single click." },
        { src: "assets/Portfolio_Content/Munich_Super_App/munich_summary_reminde.webp", caption: "Purchase history & smart reminders \u2014 full transparency, no missed deadlines.", scenario: "Before leaving she checks her purchase history for full transparency and switches on offline mode \u2014 tickets and map safely stored, even when the network drops. And when her ticket is about to expire, the app reminds her in time. One app, one morning, no juggling." }
      ],
      solutionScenario: "Take Flora \u2014 an international student, often on the move, eager to explore the city. Here is what her day looks like with the Munich Super App:",
      figmaNote: "The interface was built in just two days at a hackathon.",
      outcomeScenario: "For Flora \u2014 and every user \u2014 it means structure instead of chaos. All tickets in one place instead of buried in email. Reliable real-time info on opening hours, construction and events. No app-switching, a single login, personalised recommendations through smart filters, and an offline mode that holds up even when the network doesn't. The complexity of city life turns into a seamless, intuitive experience \u2014 a city companion that makes you feel at home from the very first moment.",
      beforeImage: "",
      afterImage: "",
      designScreens: [
        {
          name: "Hi-Fi Detail Screen",
          description: "Example service detail view from the dashboard \u2014 shows how the service-design principles (accessibility-first, progressive disclosure) translate to screen level. [TODO: sharper annotation of what specifically happens on this screen]",
          image: "assets/Portfolio_Content/Munich_Super_App/munich_pay.webp"
        }
      ],
      resultsImage: "assets/Portfolio_Content/Munich_Super_App/Munich_App_Video.mp4",
      reflection: "My biggest takeaway came from the hackathon: our best ideas only emerged under pressure and through doing \u2014 not from long planning beforehand. If we had just started earlier, we would have landed on far more solution directions. Overthinking upfront achieves little; starting, trying things and refining as you go was the faster path to good concepts for us.",
      windowTitle: "Munich_Super_App.fig \u2014 service design for the city \u{1F3D9}\uFE0F",
      tldr: {
        problem: "Munich citizens juggle MVGO, muenchen.de and more \u2014 each touchpoint its own logic.",
        myRole: "Co-lead user research, GDPR-clean interview setup, empathy & journey mapping in a 4-person team.",
        solution: "Service-design concept for a Munich Super App \u2014 one dashboard for mobility and culture.",
        outcome: "Full SD documentation (empathy \xB7 journey \xB7 pains/gains \xB7 JTBD) plus a low-fi MIT App Inventor prototype."
      },
      problemShort: "7 city services, 7 touchpoints \u2014 mobility, events & activities scattered, no overview.",
      solutionShort: "A service-design concept for a single Munich app bundling mobility, culture and tickets.",
      role: "UX research, service design, empathy & journey mapping, prototyping",
      duration: "Summer 2025",
      team: "4-person team \xB7 HM Munich student project",
      tools: ["Miro", "Figma"],
      roleChips: ["\u{1F50D} Research", "\u{1F5C2}\uFE0F Service Design", "\u{1F9E0} JTBD", "\u270F\uFE0F Prototyping"],
      research: [
        "Qualitative 1:1 interviews (30\u201345 min, audio + notes) with Munich residents across age, background & life stage",
        "Structured interview guide along the journey: Before \xB7 During \xB7 After a city task",
        "Empathy mapping per persona: Says \xB7 Thinks \xB7 Feels \xB7 Does",
        "Customer journey across 5 phases \u2014 need \u2192 discover \u2192 plan/book \u2192 use \u2192 remember",
        "Affinity mapping of interview quotes, synthesis into Pains / Gains",
        "JTBD statements + 4 personas (senior \xB7 working professional \xB7 tourist \xB7 student)",
        "GDPR-compliant setup: written consent & privacy declaration, anonymised analysis"
      ],
      insights: [
        '"App sprawl": Munich residents hop between MVGO, muenchen.de & co. \u2014 no through-line between getting there, the ticket and the event.',
        "Events & activities are discovered by chance \u2014 without a central overview, exciting happenings slip through.",
        "Important deadlines and appointments get lost \u2014 reminders arrive too late or not at all.",
        "Privacy concerns block adoption \u2014 transparency is not a feature, it is a precondition.",
        "Accessibility is underestimated: seniors struggle with small text and unclear icons.",
        "Language barrier for tourists & newcomers \u2014 many services are German-only."
      ],
      hmw: [
        "How might we bundle mobility, events and activities so a whole plan \u2014 from the journey to the event \u2014 stays in one flow instead of spread across five apps?",
        "How might we help Munich residents never miss an event or deadline again, without overwhelming them with notifications?",
        "How might we build trust in a centralised city app \u2014 especially around payment and location data?",
        "How might we make one app equally accessible for four very different personas (senior \xB7 working professional \xB7 tourist \xB7 student)?"
      ],
      concept: "A Munich Super App with a central dashboard for two service verticals: mobility (MVG) and culture & leisure (Munich Ticket \xB7 museums \xB7 pools). Personalised, proactive reminders. Wallet and calendar integration. Accessibility as default \u2014 not as opt-in.",
      outcome: 'The result was a complete service-design concept: empathy maps, a 5-phase journey, pains/gains synthesis, JTBD statements and 4 personas \u2014 handed over with an implementation roadmap. At a 2-day hackathon the interface was condensed from concept to a clickable hi-fi prototype (Figma) plus a low-fi build in MIT App Inventor. The core insight \u2014 "one less app to juggle" rather than "one more app" \u2014 carried the whole concept and turned app sprawl into a clear design goal.',
      learnings: [
        "Service design \u2260 app design: the real problem was the org and data architecture, not the UI \u2014 bundling seven services means ordering the logic first, then building screens.",
        '"One less app" is a sharper goal than "one more app": only once we framed app sprawl as the core problem did every feature decision become testable \u2014 does it remove real juggling, or just add to it?',
        "Four very different personas force real inclusivity: accessibility and multilingual support as default, not opt-in, was the only way to take a senior and a tourist seriously at the same time.",
        "Starting beats overthinking: at the 2-day hackathon our best ideas only emerged under pressure and through doing. If we had just started earlier, we would have landed on far more solution directions \u2014 too much upfront planning achieves little, just begin."
      ],
      wouldChange: [],
      metrics: [{ l: "Interviews", v: "6+" }, { l: "Personas", v: "4" }, { l: "Services integrated", v: "7" }],
      media: [
        { type: "image", src: "assets/Portfolio_Content/Munich_Super_App/empathy_map.webp", caption: "Empathy map \xB7 personas sketch", width: 1200, height: 800 },
        { type: "image", src: "assets/Portfolio_Content/Munich_Super_App/1000158734.webp", caption: "JTBD statement & 4 personas", width: 1200, height: 800 }
      ]
    }
  },
  {
    id: "donbosco",
    emoji: "\u{1F4CB}",
    color: "blue",
    status: "wip",
    progress: 65,
    de: {
      title: "Don Bosco \xB7 ZUK",
      windowTitle: "DonBosco_ZUK.exe \u2014 still in the oven \u{1F528}",
      problemShort: "F\xFCnf Mitarbeiter teilen ein unstrukturiertes Postfach, schieben Daten per Copy-Paste zwischen Outlook, Word & drei Systemen \u2014 und l\xF6sen die Zimmerbelegung als komplexes Regel-R\xE4tsel von Hand.",
      solutionShort: "Datenschutzkonformes n8n-Multi-Agenten-System (Augmentation, not Automation): Triage-, Placement- & Creator-Agent mit Human-in-the-Loop und Eskalations-Protokoll f\xFCr sensible Daten.",
      role: "UX Research, Service Design, KI-Workflow (n8n)",
      duration: "SS 2026 (laufend)",
      team: "Team B",
      phase: "Konzeption & n8n-Prototyp",
      /* WIP loading-modal fields */
      wipShortConcept: 'KI-Multi-Agenten-\u201EStaff Assistant" f\xFCrs ZUK Benediktbeuern \u2014 Augmentation, not Automation.',
      wipDescription: 'Datenschutzkonformer \u201EStaff Assistant" f\xFCrs ZUK Benediktbeuern (Uni-Modul, n8n). Drei Agenten \u2014 Triage, Placement & Creator \u2014 \xFCbernehmen Mail-Triage, regelkonforme Zimmerbelegung und Vertragsgenerierung mit menschlicher Freigabe. So bleibt dem Team mehr Zeit f\xFCr die Betreuung von 300\u2013400 Jugendlichen pro Woche.',
      wipPhase: "Konzept & n8n-Prototyp",
      wipProgress: 30,
      wipETA: "Q1 2026",
      tools: ["n8n", "OpenAI API", "Figma", "Miro"],
      roleChips: ["\u{1F50D} Research", "\u{1F5C2}\uFE0F Service Design", "\u{1F916} KI-Workflow"],
      /* ── WIP-honest case study scaffolding ─────────────────────────── */
      context: "Service-Design-Projekt mit einer lokalen Jugendorganisation in M\xFCnchen. Die Einrichtung organisiert Workshops f\xFCr Jugendliche, verwaltet Anmeldungen bisher aber gro\xDFteils per Aushang, Telefon und Excel. Unsere Aufgabe: Wo lohnt sich Digitalisierung \u2014 und wo schadet sie?",
      problemContext: "Die Anmeldung zu einem Workshop l\xE4uft heute \xFCber drei bis vier Touchpoints (Aushang \u2192 Anruf \u2192 handschriftliche Liste \u2192 Best\xE4tigung per WhatsApp). F\xFCr die Sozialp\xE4dagog:innen ist das zeitintensiv, f\xFCr Jugendliche unklar (gibt es noch Pl\xE4tze? Bin ich angemeldet?). Eine reine Online-Form w\xFCrde die H\xE4lfte der Zielgruppe verlieren \u2014 barrierefreier Zugang ist kein Nice-to-have, sondern Kernanforderung.",
      /* ── Echoes-style sections — fill to enable (see echoes for the shape) ── */
      problemGallery: [],
      /* [{ src, caption }] → Problem as sticky-scroll gallery */
      designCarousel: [],
      /* [{ src, caption, bare }] → Solution as sticky-scroll */
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      /* system journey (rose route) */
      keyInsight: '[In Arbeit] Erste Beobachtung: die Sozialp\xE4dagog:innen wollen kein \u201Eweiteres Tool", sie wollen weniger Tools. Wenn die L\xF6sung mehr Klicks erzeugt als die aktuelle Excel, gewinnt die Excel.',
      hmw: [
        "Wie k\xF6nnen wir Workshop-Anmeldungen digitalisieren, ohne Jugendliche ohne Smartphone auszuschlie\xDFen?",
        "Wie nehmen wir Sozialp\xE4dagog:innen Arbeit ab, ohne ihnen ein neues Tool aufzudr\xFCcken?",
        "Wie machen wir den Anmeldestatus f\xFCr Jugendliche und Eltern transparent \u2014 ohne Push-Notification-Spam?"
      ],
      research: [
        "Stakeholder-Gespr\xE4che mit Sozialp\xE4dagog:innen der Einrichtung (laufend)",
        "Beobachtung des Ist-Prozesses vor Ort (Aushang \u2192 Anruf \u2192 Liste \u2192 WhatsApp)",
        "Desk Research zu Barrierefreiheit in Jugendarbeit-Tools",
        "[geplant] Interviews mit 4\u20136 Jugendlichen und 2\u20133 Eltern"
      ],
      reflection: 'Bewusst noch ohne fertige Insights oder Metriken \u2014 das Projekt ist in der Discovery-Phase. Mein gr\xF6\xDFtes Learning bisher: bei sozialen Einrichtungen ist \u201EDigitalisierung" oft Code f\xFCr \u201Euns wurde gesagt, wir br\xE4uchten eine App". Erst Service-Mapping zeigt, ob digital wirklich die richtige Antwort ist, oder ob ein besserer Aushang reicht. N\xE4chster Schritt: Co-Design-Session mit dem Team, um die echten Bottlenecks zu finden.',
      wouldChange: [
        '[laufend erg\xE4nzt] Bisher gr\xF6\xDFte Lektion: erste Stakeholder-Runde h\xE4tte ich offener anlegen sollen \u2014 ich kam mit \u201Ewie soll die App aussehen?" rein, statt \u201Ewas nervt euch am aktuellen Prozess?".'
      ]
    },
    en: {
      title: "Don Bosco \xB7 ZUK",
      windowTitle: "DonBosco_ZUK.exe \u2014 still in the oven \u{1F528}",
      problemShort: "Five staff share one unstructured inbox, copy-paste data between Outlook, Word & three systems \u2014 and solve room allocation as a complex rule puzzle by hand.",
      solutionShort: "Privacy-compliant n8n multi-agent system (augmentation, not automation): triage, placement & creator agents with human-in-the-loop and an escalation protocol for sensitive data.",
      role: "UX research, service design, AI workflow (n8n)",
      duration: "Summer 2026 (ongoing)",
      team: "Team B",
      phase: "Concept & n8n prototype",
      /* WIP loading-modal fields */
      wipShortConcept: 'AI multi-agent "staff assistant" for ZUK Benediktbeuern \u2014 augmentation, not automation.',
      wipDescription: 'A privacy-compliant "staff assistant" for ZUK Benediktbeuern (university module, n8n). Three agents \u2014 triage, placement & creator \u2014 handle email triage, rule-compliant room allocation and contract generation with human sign-off, freeing the team for the care of 300\u2013400 teenagers a week.',
      wipPhase: "Concept & n8n prototype",
      wipProgress: 30,
      wipETA: "Q1 2026",
      tools: ["n8n", "OpenAI API", "Figma", "Miro"],
      roleChips: ["\u{1F50D} Research", "\u{1F5C2}\uFE0F Service Design", "\u{1F916} AI workflow"],
      /* ── WIP-honest case study scaffolding ─────────────────────────── */
      context: "A service-design project with a local Munich youth organisation. The institution runs workshops for teenagers but currently manages sign-ups through posters, phone calls and Excel sheets. Our task: where does digitalisation help \u2014 and where does it hurt?",
      problemContext: "Signing up for a workshop today runs through three or four touchpoints (poster \u2192 phone call \u2192 handwritten list \u2192 WhatsApp confirmation). It eats up time for the social workers and leaves teenagers unclear (are spots still open? am I in?). A pure online form would lose half the audience \u2014 accessible access is not a nice-to-have, it is the core requirement.",
      /* ── Echoes-style sections — fill to enable (see echoes for the shape) ── */
      problemGallery: [],
      /* [{ src, caption }] → Problem as sticky-scroll gallery */
      designCarousel: [],
      /* [{ src, caption, bare }] → Solution as sticky-scroll */
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      /* system journey (rose route) */
      keyInsight: `[In progress] First observation: the social workers don't want "another tool", they want fewer tools. If the solution adds more clicks than the current Excel, the Excel wins.`,
      hmw: [
        "How might we digitise workshop sign-ups without excluding teenagers who don't own a smartphone?",
        "How might we take work off the social workers without forcing yet another tool on them?",
        "How might we make sign-up status transparent for teens and parents \u2014 without push-notification spam?"
      ],
      research: [
        "Stakeholder conversations with the social workers at the institution (ongoing)",
        "On-site observation of the current process (poster \u2192 call \u2192 list \u2192 WhatsApp)",
        "Desk research on accessibility in youth-work tools",
        "[planned] Interviews with 4\u20136 teenagers and 2\u20133 parents"
      ],
      reflection: 'Deliberately still without finished insights or metrics \u2014 the project is in discovery. My biggest takeaway so far: in social institutions, "digitalisation" is often code for "someone told us we need an app". Only service mapping shows whether digital is actually the right answer, or whether a better poster would do. Next step: co-design session with the team to find the real bottlenecks.',
      wouldChange: [
        '[updated as I go] Biggest lesson so far: I should have opened the first stakeholder round wider \u2014 I walked in asking "how should the app look?" instead of "what about the current process drives you up the wall?".'
      ]
    }
  },
  {
    id: "clarity",
    emoji: "\u{1F4D3}",
    color: "pink",
    status: "wip",
    progress: 35,
    icon: "assets/icons/journaling.png",
    cover: "assets/Portfolio_Content/Clearity_Journal/Screenshot_20260508_105422 1.webp",
    devLog: {
      stack: ["Figma", "FigJam", "Miro", "pdftotext", "Notion"],
      builtSolo: "Team 4 \xB7 ~25 % Lead (Research + IA)",
      role: "UX Research, Information Architecture, Privacy-Strategy",
      notes_de: [
        "16 qualitative + quantitative Interviews (18\u201325 J.) \u2192 5 Kernerkenntnisse",
        "81 % journalisieren nicht regelm\xE4\xDFig \u2192 Habit-Problem, kein Motivationsproblem",
        "94 % verlangen E2E-Verschl\xFCsselung \u2014 Privacy ist Dealbreaker, kein Feature",
        "73 % skeptisch gegen\xFCber KI \u2192 Explainability als Pflicht",
        "Zwei autonome Agenten: Sentiment + Pattern, beide lokal",
        "Information Architecture: 5 S\xE4ulen \u2014 Home, History, Add Entry, Insights, Calendar",
        "Wireframes (Figma) + Navigation Architecture (FigJam) komplett dokumentiert",
        "Zero-Knowledge Backend skizziert \u2014 Entries optional rein lokal"
      ],
      notes_en: [
        "16 qualitative + quantitative interviews (ages 18\u201325) \u2192 5 core insights",
        "81 % don't journal regularly \u2192 habit problem, not motivation",
        "94 % require E2E encryption \u2014 privacy is a dealbreaker, not a feature",
        "73 % skeptical of AI \u2192 explainability is mandatory",
        "Two autonomous agents: sentiment + pattern, both on-device",
        "Information architecture: 5 pillars \u2014 Home, History, Add Entry, Insights, Calendar",
        "Full wireframes (Figma) + navigation architecture (FigJam)",
        "Zero-knowledge backend sketched \u2014 entries can stay fully local"
      ],
      links: [
        { label: "Konzept-PDF", href: "assets/Portfolio_Content/Clearity_Journal/Konzept.pdf", icon: "\u{1F4C4}" }
      ]
    },
    de: {
      title: "Clarity \u2014 Your mind stays yours",
      description: "Ein Privacy-first-Journaling-App-Konzept, aktuell in der Research-Synthese.",
      problemStatement: "81 % der 18\u201325-J\xE4hrigen journalisieren nicht regelm\xE4\xDFig \u2014 nicht aus Motivationsmangel, sondern weil Privacy, leere Seiten und unverst\xE4ndliche KI als Barrieren wirken.",
      problemContext: 'Wir wollten verstehen, was Gen-Z davon abh\xE4lt, regelm\xE4\xDFig zu journalisieren. Die naheliegende Antwort w\xE4re \u201Efehlende Motivation". In den Interviews zeigte sich aber, dass Datenschutz-Sorgen, leere Seiten und Blackbox-KI die echten Barrieren sind.',
      /* ── Echoes-style sections — fill to enable (see echoes for the shape) ── */
      problemGallery: [],
      /* [{ src, caption }] → Problem as sticky-scroll gallery */
      designCarousel: [],
      /* [{ src, caption, bare }] → Solution as sticky-scroll */
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      /* system journey (rose route) */
      problemImage: "",
      researchContext: "16 qualitative und quantitative Interviews mit Personen zwischen 18 und 25 Jahren. Affinity Mapping zu Barrieren, Routinen und Privacy-Bedenken. Wettbewerbsanalyse von Day One, Reflectly, Stoic und Apple Journal. Personas und User Stories nach AS-A / I-WANT-TO / SO-THAT-Format.",
      researchImage: "",
      solutionStatement: "Privacy-first Journal-App mit zwei on-device Agenten, 30-Sek-Eintr\xE4gen und einem Weekly Digest als Herzst\xFCck.",
      solutionContext: "Vier S\xE4ulen: (1) E2E-Verschl\xFCsselung mit optional rein lokaler Speicherung und Zero-Knowledge-Backend, (2) zwei autonome on-device Agenten \u2014 Sentiment + Pattern, (3) Weekly Digest als w\xF6chentliche, sanfte Zusammenfassung, (4) Habit-First Design mit Voice/Photo/Quick-Mood-Eintr\xE4gen in unter 30 Sekunden.",
      solutionImage: "",
      beforeImage: "",
      afterImage: "",
      designScreens: [],
      resultsImage: "",
      reflection: "Auf halber Strecke w\xE4re das Team fast in eine UI gestartet, bevor wir die Privacy-Architektur ausreichend gekl\xE4rt hatten. Wir haben rechtzeitig korrigiert \u2014 aber die Lektion: in Privacy-first-Projekten IST der Datenfluss das Design. N\xE4chste Phase: Wireframes, die den Privacy-Status sichtbar machen, nicht verstecken.",
      /* WIP loading-modal fields */
      wipShortConcept: "Privacy-first Journaling \u2014 deine Gedanken, deine Kontrolle.",
      wipDescription: "Eine Journaling-App, in der Nutzer:innen 100 % Kontrolle \xFCber ihre Daten haben. Alles l\xE4uft lokal, Sync ist E2E-verschl\xFCsselt, KI-Features sind optional und transparent.",
      wipPhase: "Konzeptphase \xB7 Research-Synthese & IA",
      wipProgress: 35,
      wipETA: "Q3 2026",
      windowTitle: "Clarity.app \u2014 privacy-first journaling \u{1F4D3}",
      problemShort: "81 % der 18\u201325-J\xE4hrigen journalisieren nicht regelm\xE4\xDFig \u2014 Privacy-Sorgen, leere Seiten und unklare KI blockieren sie.",
      solutionShort: "Privacy-first Journal-App: zwei On-Device-Agenten (Sentiment + Pattern), 30-Sek-Eintr\xE4ge, Weekly Digest. Vollst\xE4ndig lokal, E2E-verschl\xFCsselt.",
      role: "UX Research, Information Architecture, Privacy-Strategy",
      duration: "SS 2026 (laufend)",
      team: "Team 4 \xB7 4 Personen",
      phase: "Konzeptphase \xB7 Research-Synthese & IA",
      tools: ["Figma", "FigJam", "Miro", "Notion"],
      roleChips: ["\u{1F50D} Research", "\u{1F5C2}\uFE0F IA", "\u{1F512} Privacy", "\u270F\uFE0F UX"],
      context: 'Semesterprojekt im Kurs "Mobile Anwendungen" an der HM M\xFCnchen. Vier Studentinnen sollten eine vollst\xE4ndig nutzerzentrierte mobile App konzipieren \u2014 von Research bis High-Level IT-Architektur. Wir entschieden uns fr\xFCh gegen Trend-Chasing und f\xFCr eine Bed\xFCrfnisfrage: Was hindert Gen-Z am Journaling?',
      research: [
        "16 qualitative + quantitative Interviews (18\u201325 Jahre)",
        "Affinity Mapping zu Barrieren, Routinen und Privacy-Bedenken",
        "Wettbewerbsanalyse: Day One, Reflectly, Stoic, Apple Journal",
        'Personas: "Anna" (Privacy-Bewusste) und "Marcus" (Gewohnheits-K\xE4mpfer)',
        "User Stories nach AS-A / I-WANT-TO / SO-THAT-Format mit Acceptance Criteria"
      ],
      insights: [
        "81 % journalisieren nicht regelm\xE4\xDFig \u2014 Habit-Problem, kein Motivationsproblem",
        "67 % w\xFCrden keine Journaling-App nutzen, die nicht vollst\xE4ndig sicher ist. 94 % verlangen E2E-Verschl\xFCsselung.",
        "73 % unbequem mit KI, die Gedanken analysiert \u2014 Explainability senkt Misstrauen dramatisch.",
        '38 % schreiben nicht, weil ihre Eintr\xE4ge "nicht sch\xF6n aussehen" \u2014 Beautiful-by-Default ist Pflicht.',
        "47 % wollen eine w\xF6chentliche Zusammenfassung als motivierenden Payoff."
      ],
      hmw: [
        "Wie machen wir Journaling zu einer 30-Sekunden-Gewohnheit statt einer 30-Minuten-Aufgabe?",
        "Wie machen wir Privacy zum sichtbaren Vertrauenssignal \u2014 nicht zur versteckten Fu\xDFnote?",
        "Wie machen wir KI-Analyse so transparent, dass aus Misstrauen Neugier wird?"
      ],
      concept: "Clarity steht auf vier S\xE4ulen: (1) Privacy-First Architektur mit E2E-Verschl\xFCsselung, optional rein lokaler Speicherung und Zero-Knowledge-Backend. (2) Zwei autonome on-device Agenten \u2014 der Sentiment Agent liest emotionalen Ton, der Pattern Agent erkennt wiederkehrende Trigger. (3) Weekly Digest als Herzst\xFCck: jede Woche eine sanfte Zusammenfassung mit Triggers, Themen und Insights. (4) Habit-First Design \u2014 Voice, Photo oder Quick Mood machen Eintr\xE4ge in unter 30 Sekunden m\xF6glich.",
      outcome: "Aktueller Stand (Konzeptphase): Research-Synthese aus 16 Interviews, 5 Kernerkenntnisse, 2 Personas, erste User Stories und eine 5-S\xE4ulen-Information-Architecture. Privacy-Strategie und Tonalit\xE4t f\xFCr die Privacy-Policy stehen. Wireframes, Hi-Fi-Design und IT-Architektur folgen in der n\xE4chsten Phase.",
      tldr: {
        problem: "Gen-Z journalisiert nicht \u2014 wegen Privacy-Sorgen, KI-Skepsis und leeren Seiten.",
        myRole: "Research-Lead + IA-Lead im 4er-Team; Privacy-Strategie und Personas eigenverantwortlich.",
        solution: "Privacy-first Journal-App mit 2 on-device Agenten, 30-Sek-Eintr\xE4gen und Weekly Digest.",
        outcome: "Konzeptphase: Research synthetisiert, Personas + IA stehen. N\xE4chster Schritt: Wireframes."
      },
      metrics: [
        { v: "16", l: "Interviews (18\u201325 J.)" },
        { v: "5", l: "Kernerkenntnisse" },
        { v: "94 %", l: "wollen E2E-Verschl\xFCsselung" },
        { v: "<2 min", l: "pro Eintrag" }
      ],
      learnings: [
        "Privacy ist kein Feature, sondern Architektur. Sichtbar machen hei\xDFt Vertrauen aufbauen.",
        "KI-Akzeptanz steigt dramatisch, wenn man erkl\xE4rt wie sie funktioniert \u2014 Black-Box verlieren ist das Ziel.",
        "Habit-Design schl\xE4gt Feature-Stacking. Die App, die Reibung wegnimmt, gewinnt.",
        "Recruiter-Tipp: Forschen bevor man baut spart sp\xE4ter Monate Refactoring."
      ],
      wouldChange: [
        "Klickbarer Prototyp parallel zu den Wireframes \u2014 Usability-Tests h\xE4tten zwei Iterationen mehr erlaubt.",
        'Fr\xFChere Validierung der "Weekly Digest"-Visualisierung mit echten Beispieldaten.'
      ],
      media: [
        { type: "image", src: "assets/Portfolio_Content/Clearity_Journal/Screenshot_20260508_105422 1.webp", caption: "Onboarding & Privacy-Awareness Screen", width: 1200, height: 800 }
      ]
    },
    en: {
      title: "Clarity \u2014 Your mind stays yours",
      description: "A privacy-first journaling app concept, currently in research synthesis.",
      problemStatement: "81 % of 18\u201325-year-olds don't journal regularly \u2014 not from lack of motivation, but because privacy worries, blank pages and opaque AI act as barriers.",
      problemContext: 'We wanted to understand what stops Gen-Z from journaling regularly. The obvious answer would be "lack of motivation". But interviews showed that privacy worries, blank pages and black-box AI are the real barriers.',
      /* ── Echoes-style sections — fill to enable (see echoes for the shape) ── */
      problemGallery: [],
      /* [{ src, caption }] → Problem as sticky-scroll gallery */
      designCarousel: [],
      /* [{ src, caption, bare }] → Solution as sticky-scroll */
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      /* system journey (rose route) */
      problemImage: "",
      researchContext: "16 qualitative and quantitative interviews with people aged 18\u201325. Affinity mapping on barriers, routines and privacy concerns. Competitive analysis of Day One, Reflectly, Stoic and Apple Journal. Personas and user stories in AS-A / I-WANT-TO / SO-THAT format.",
      researchImage: "",
      solutionStatement: "Privacy-first journaling app with two on-device agents, 30-second entries and a Weekly Digest as the centerpiece.",
      solutionContext: "Four pillars: (1) E2E encryption with optional fully local storage and a zero-knowledge backend, (2) two autonomous on-device agents \u2014 sentiment + pattern, (3) Weekly Digest as a gentle weekly summary, (4) habit-first design with voice / photo / quick-mood entries in under 30 seconds.",
      solutionImage: "",
      beforeImage: "",
      afterImage: "",
      designScreens: [],
      resultsImage: "",
      reflection: "Halfway through, the team almost jumped into a UI before we'd cleared the privacy architecture. We caught it in time \u2014 but the lesson: in privacy-first projects, the data flow IS the design. Next phase: wireframes that surface the privacy state, not hide it.",
      /* WIP loading-modal fields */
      wipShortConcept: "Privacy-first journaling \u2014 your thoughts, your control.",
      wipDescription: "A journaling app where users have 100% control over their data. Everything runs locally, sync is E2E encrypted, AI features are optional and transparent.",
      wipPhase: "Concept phase \xB7 research synthesis & IA",
      wipProgress: 35,
      wipETA: "Q3 2026",
      windowTitle: "Clarity.app \u2014 privacy-first journaling \u{1F4D3}",
      problemShort: "81% of 18\u201325-year-olds don't journal regularly \u2014 privacy worries, blank pages and opaque AI act as barriers.",
      solutionShort: "Privacy-first journal app: two on-device agents (sentiment + pattern), 30-sec entries, Weekly Digest. Fully local, E2E-encrypted.",
      role: "UX Research, Information Architecture, Privacy Strategy",
      duration: "Summer 2026 (ongoing)",
      team: "Team 4 \xB7 4 people",
      phase: "Concept phase \xB7 research synthesis & IA",
      tools: ["Figma", "FigJam", "Miro", "Notion"],
      roleChips: ["\u{1F50D} Research", "\u{1F5C2}\uFE0F IA", "\u{1F512} Privacy", "\u270F\uFE0F UX"],
      context: 'Semester project in the "Mobile Applications" course at HM Munich. Four students were tasked with concepting a fully user-centered mobile app \u2014 from research through high-level IT architecture. We decided early against trend-chasing and started with a needs question: what stops Gen-Z from journaling?',
      research: [
        "16 qualitative + quantitative interviews (ages 18\u201325)",
        "Affinity mapping on barriers, routines and privacy concerns",
        "Competitive analysis: Day One, Reflectly, Stoic, Apple Journal",
        'Personas: "Anna" (privacy-aware) and "Marcus" (habit-struggler)',
        "User stories in AS-A / I-WANT-TO / SO-THAT format with acceptance criteria"
      ],
      insights: [
        "81 % don't journal regularly \u2014 habit problem, not motivation problem.",
        "67 % won't use a journaling app that isn't fully secure. 94 % demand E2E encryption.",
        "73 % uncomfortable with AI analyzing their thoughts \u2014 explainability dramatically reduces distrust.",
        `38 % don't write because their entries "don't look beautiful" \u2014 beautiful-by-default is mandatory.`,
        "47 % want a weekly summary as a motivating payoff."
      ],
      hmw: [
        "How might we make journaling a 30-second habit instead of a 30-minute task?",
        "How might we make privacy a visible trust signal rather than a hidden footnote?",
        "How might we make AI analysis so transparent that distrust turns into curiosity?"
      ],
      concept: "Clarity stands on four pillars: (1) Privacy-first architecture with E2E encryption, optional fully local storage and a zero-knowledge backend. (2) Two autonomous on-device agents \u2014 the Sentiment Agent reads emotional tone, the Pattern Agent spots recurring triggers. (3) Weekly Digest as the centerpiece: every week a gentle summary of triggers, themes and insights. (4) Habit-first design \u2014 voice, photo or quick-mood entries that finish in under 30 seconds.",
      outcome: "Current state (concept phase): research synthesis from 16 interviews, 5 core insights, 2 personas, first user stories and a 5-pillar information architecture. Privacy strategy and the tone for a plain-language privacy policy are set. Wireframes, hi-fi design and IT architecture follow in the next phase.",
      tldr: {
        problem: "Gen-Z doesn't journal \u2014 privacy worries, AI skepticism and blank pages get in the way.",
        myRole: "Research lead + IA lead on a 4-person team; privacy strategy and personas owned end-to-end.",
        solution: "Privacy-first journal app with 2 on-device agents, 30-sec entries and a Weekly Digest.",
        outcome: "Concept phase: research synthesized, personas + IA in place. Next: wireframes."
      },
      metrics: [
        { v: "16", l: "interviews (18\u201325 y.o.)" },
        { v: "5", l: "core insights" },
        { v: "94 %", l: "want E2E encryption" },
        { v: "<2 min", l: "per entry" }
      ],
      learnings: [
        "Privacy isn't a feature \u2014 it's architecture. Making it visible is how you build trust.",
        "AI acceptance rises dramatically once people understand how it works \u2014 losing the black-box is the goal.",
        "Habit design beats feature stacking. The app that removes friction wins.",
        "Recruiter takeaway: researching before building saves months of refactoring later."
      ],
      wouldChange: [
        "A clickable prototype in parallel with the wireframes \u2014 usability tests could have run two more iterations.",
        'Earlier validation of the "Weekly Digest" visualization with real sample data.'
      ],
      media: [
        { type: "image", src: "assets/Portfolio_Content/Clearity_Journal/Screenshot_20260508_105422 1.webp", caption: "Onboarding & privacy awareness screen", width: 1200, height: 800 }
      ]
    }
  },
  /* ═══════════════════════════════════════════════════════════════════════
     SOULSPHERE — Astrology chatbot "Oma Astra". Standard case-study schema
     (same fields as munichapp/atolls). Real content from Soulsphere_Bot/.
     ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "soulsphere",
    emoji: "\u{1F52E}",
    color: "pink",
    status: "completed",
    cover: "assets/Portfolio_Content/Soulsphere_Bot/logo.webp",
    coverFit: "contain",
    documentation: "assets/Portfolio_Content/Soulsphere_Bot/Dokumentation-research.pdf",
    devLog: {
      stack: ["HuggingFace Spaces", "Python", "Gradio", "Instagram"],
      role: "Konzept \xB7 Persona & Brand \xB7 Bot-Bau \xB7 Testing",
      links: [
        { label: "GitHub", href: "https://github.com/ID-Start-Winter24/Team-08" },
        { label: "Live testen", href: "https://nuriakurrle-soulsphere.hf.space" },
        { label: "Instagram", href: "https://www.instagram.com/souls_phere111/" }
      ],
      notes_de: [
        "[w1]  Interviews (Before \xB7 During \xB7 After) + Synthese",
        '[w1]  Persona \u201EOma Astra" & Tone-of-Voice definiert',
        "[w2]  Brand: Logo, Sternenhimmel, Illustration",
        "[w2]  Bot auf HuggingFace deployed (First Draft \u2192 Final)",
        "[w2]  Usability- & Concept-Testing \u2192 Iteration"
      ],
      notes_en: [
        "[w1]  Interviews (Before \xB7 During \xB7 After) + synthesis",
        '[w1]  Persona "Oma Astra" & tone of voice defined',
        "[w2]  Brand: logo, starry sky, illustration",
        "[w2]  Bot deployed on HuggingFace (first draft \u2192 final)",
        "[w2]  Usability & concept testing \u2192 iteration"
      ]
    },
    de: {
      title: "Soulsphere",
      windowTitle: 'Soulsphere.exe \u2014 Astrologie mit Herz: \u201EOma Astra" \u{1F52E}',
      description: 'Mein allererstes Studienprojekt (1. Semester, Informatik \xB7 Design \xB7 KI): der Bau eines Astrologie-Chatbots mit Pers\xF6nlichkeit \u2014 \u201EOma Astra".',
      heroImage: "assets/Portfolio_Content/Soulsphere_Bot/soulsphere_laptop.webp",
      keyInsight: "",
      problemStatement: "Astrologie ist beliebt \u2014 aber bestehende Apps f\xFChlen sich kalt, generisch und kommerziell an. Es fehlt das Menschliche.",
      problemContext: "Horoskop-Apps liefern Fakten am Flie\xDFband: Sternzeichen rein, generische Vorhersage raus. Was fehlt, ist N\xE4he \u2014 eine Stimme, die sich Zeit nimmt, ermutigt und sich anf\xFChlt wie ein Gespr\xE4ch mit einem vertrauten Menschen. Die Frage war: Wie macht man Astrologie zug\xE4nglich und alltagstauglich, ohne den Zauber zu verlieren \u2014 und ohne dass es sich wie ein weiteres seelenloses Tool anf\xFChlt?",
      problemGallery: [],
      problemImage: "",
      researchContext: 'Um den Bot nicht ins Blaue zu bauen, habe ich ein paar Interviews gef\xFChrt (Before/During/After) \u2014 wie nutzen Menschen Astrologie im Alltag, was w\xFCnschen sie sich? Die wichtigste Erkenntnis: Nicht die Vorhersage z\xE4hlt, sondern das Gef\xFChl, gesehen und ermutigt zu werden. Daraus entstanden die Persona \u201EOma Astra" und ihr Tonfall.',
      researchImage: "",
      researchGallery: [
        { src: "assets/Portfolio_Content/Soulsphere_Bot/interview-research.webp", caption: "Interview-Synthese (Before \xB7 During \xB7 After \xB7 Zukunft) \u2014 W\xFCnsche und Pains geclustert." },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/old_woman.webp", caption: 'Persona \u201EOma Astra" \u2014 freundlich, warm und ansprechend.' }
      ],
      research: [
        "Interviews (Before \xB7 During \xB7 After) \u2014 wie nutzen Menschen Astrologie im Alltag?",
        'Persona-Arbeit \u2014 \u201EOma Astra" als warmherzige Sternen-Gro\xDFmutter',
        'Tone-of-Voice \u2014 \u201Emein Schatz", \u201ELiebes": N\xE4he statt Wahrsagerei',
        "Usability- & Concept-Testing \u2014 Aufgaben, Fehlermeldungen und \xC4sthetik bewerten",
        "Blick auf bestehende Horoskop-Apps \u2014 was fehlt, ist Pers\xF6nlichkeit"
      ],
      insights: [
        "Menschen wollen N\xE4he, keine Fakten \u2014 eine Stimme, die sich Zeit nimmt, schl\xE4gt jede generische Vorhersage.",
        'Eine Persona macht Astrologie zug\xE4nglich: \u201EOma Astra" senkt die Schwelle, auch f\xFCr Skeptiker:innen.',
        'Tonfall ist alles \u2014 ein Hauch zu \u201Emystisch" wirkt unglaubw\xFCrdig; warm und alltagsnah schafft Vertrauen.',
        "Im Test zeigte sich: Antworten waren zu lang und der Bot zu langsam \u2014 Tempo und K\xFCrze sind Teil der Erfahrung."
      ],
      hmw: [],
      solutionStatement: 'Die Idee: einem Horoskop-Bot eine Persona geben statt einer anonymen Stimme \u2014 \u201EOma Astra", eine warmherzige Sternen-Gro\xDFmutter, die dich beim Namen nimmt.',
      solutionContext: 'Nach einem gemeinsamen Moodboard war das Konzept schnell klar: ein Chatbot mit Pers\xF6nlichkeit. Herzst\xFCck ist \u201EOma Astra" \u2014 eine herzliche Sternen-Gro\xDFmutter (viele verbinden mit einer Oma Weisheit & Geborgenheit). Sie ist Gesicht und Maskottchen, ihr Name eine Anspielung aufs Thema. Design: astrologische Symbole und eine Lila-Blau-Palette f\xFCr den mystischen Vibe, dazu ein Planet als Logo. Technisch mit Astrologie-Dokumenten gef\xFCttert und mit einer Horoskop-API verbunden. Features: t\xE4gliche Horoskope, Sternzeichen-Eigenschaften, eine Kompatibilit\xE4tsanalyse und Ermutigung \u2014 im liebevollen Ton (\u201Emein Schatz", \u201ESonnenschein"), mit vorformulierten Beispiel-Fragen.',
      designCarousel: [
        { src: "assets/Portfolio_Content/Soulsphere_Bot/first-draft-process.webp", caption: "Erster Entwurf \u2014 schlicht, nur ein Begr\xFC\xDFungsfeld, ohne Persona." },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/insta.webp", caption: "Oma Astra auf Instagram \u2014 die Persona als interaktive Sternenberatung (@souls_phere111)." },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/illustration.webp", caption: "Oma Astra \u2014 Avatar & Maskottchen: herzlich, weise, einladend. Das Gesicht des Bots.", bare: true },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/logo.webp", caption: "Logo \u2014 ein Planet: zentrales Element der Astrologie, Verbindung zwischen Himmel und Mensch.", bare: true },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/titel.webp", caption: 'Wortmarke \u201ESoulsphere" \u2014 elegante Serifenschrift in tiefem Violett.', bare: true }
      ],
      concept: 'Ein Chatbot-Erlebnis rund um die Persona \u201EOma Astra": Sternzeichen abfragen, t\xE4gliches Horoskop, Eigenschaften erkl\xE4ren und die Kompatibilit\xE4t zweier Sternzeichen analysieren \u2014 warm, ermutigend und alltagsnah. Technisch als Web-App auf HuggingFace deployed, Code auf GitHub (Team-08). Die Persona lebt zus\xE4tzlich auf Instagram weiter.',
      solutionImage: "",
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      outcome: 'Ein lauff\xE4higer Astrologie-Chatbot mit eigener Persona, deployed auf HuggingFace und mit Nutzer:innen getestet. Aus dem Usability- und Concept-Testing flossen konkrete Verbesserungen ein: k\xFCrzere, deutsche Antworten, vorformulierte Fragen, schnellere Reaktionszeit und ein stimmigeres Design. \u201EOma Astra" lebt dar\xFCber hinaus auf Instagram (@souls_phere111) als interaktive Sternenberatung weiter \u2014 die Persona verl\xE4sst die App und wird zur Marke.',
      resultsImage: "assets/Portfolio_Content/Soulsphere_Bot/finished_bot.webp",
      metrics: [
        { label: "Live-Prototyp", value: "HuggingFace", detail: "Lauff\xE4higer Bot, \xF6ffentlich testbar" },
        { label: "Persona-Heimat", value: "Instagram", detail: "@souls_phere111 \u2014 Oma Astra als Sternenberatung" },
        { label: "Testing", value: "Usability + Concept", detail: "Findings direkt in die n\xE4chste Iteration" }
      ],
      reflection: 'Das st\xE4rkste Learning: Eine Persona schl\xE4gt ein Feature-Set. \u201EOma Astra" hat ein generisches Horoskop-Tool in etwas verwandelt, mit dem Menschen reden wollen. Astrologie war dabei nur das Medium \u2014 der eigentliche Kern war W\xE4rme und Tonfall. Beim n\xE4chsten Mal w\xFCrde ich den Tonfall noch fr\xFCher mit echten Nutzer:innen testen und Antwortl\xE4nge und Tempo von Anfang an als Design-Parameter behandeln.',
      learnings: [
        "Eine Figur mit Charakter macht ein Produkt nahbar \u2014 Pers\xF6nlichkeit ist Funktion, nicht Deko.",
        'Tonfall ist Design: \u201Emein Schatz" statt \u201EIhr Tageshoroskop" ver\xE4ndert die ganze Erfahrung.',
        "Eine Persona kann die App verlassen \u2014 auf Instagram wird Oma Astra zur eigenst\xE4ndigen Marke."
      ],
      wouldChange: [
        "Antwortl\xE4nge und Reaktionszeit fr\xFCher optimieren \u2014 im Test waren die Antworten zu lang und der Bot zu langsam.",
        "Mehr Nutzer:innen ins Testing holen, um Muster statt Einzelmeinungen zu sehen.",
        "Zus\xE4tzliche Funktionen (Charts, Mondphasen) und eine Memory-Funktion f\xFCr Antworten einplanen."
      ],
      tldr: {
        problem: "Horoskop-Apps wirken kalt und generisch \u2014 es fehlt das Menschliche.",
        myRole: "Konzept, Persona & Brand, Bot-Bau (HuggingFace), Testing.",
        solution: 'Chatbot-Persona \u201EOma Astra" \u2014 warm, ermutigend, Sternzeichen-Horoskope. Plus Instagram-Heimat.',
        outcome: "Lauff\xE4higer Bot + Instagram-Persona. Testing-Findings in die Iteration \xFCbernommen."
      },
      problemShort: "Horoskop-Apps sind kalt und generisch \u2014 Nutzer:innen fehlt eine warme, menschliche Stimme.",
      solutionShort: 'Chatbot-Persona \u201EOma Astra" \u2014 Astrologie mit Herz: warm, ermutigend, alltagsnah.',
      role: "Konzept, Persona & Brand, Bot-Bau & Testing",
      duration: "1. Semester \xB7 Winter 2024/25",
      team: "Team-08 \xB7 Erstsemester-Projekt",
      tools: ["HuggingFace", "Figma", "Instagram", "Miro"],
      roleChips: ["\u{1F3A8} Design", "\u{1F3AD} Persona", "\u{1F916} Bot-Bau", "\u{1F9EA} Testing"]
    },
    en: {
      title: "Soulsphere",
      windowTitle: 'Soulsphere.exe \u2014 astrology with heart: "Oma Astra" \u{1F52E}',
      description: 'My very first university project (1st semester, computer science \xB7 design \xB7 AI): building an astrology chatbot with personality \u2014 "Oma Astra".',
      heroImage: "assets/Portfolio_Content/Soulsphere_Bot/soulsphere_laptop.webp",
      keyInsight: "",
      problemStatement: "Astrology is popular \u2014 but existing apps feel cold, generic and commercial. The human touch is missing.",
      problemContext: "Horoscope apps deliver facts on a conveyor belt: zodiac sign in, generic prediction out. What is missing is closeness \u2014 a voice that takes its time, encourages, and feels like a conversation with someone you trust. The question: how do you make astrology accessible and part of everyday life without losing the magic \u2014 and without it feeling like yet another soulless tool?",
      problemGallery: [],
      problemImage: "",
      researchContext: 'To avoid building the bot blindly, I ran a few interviews (Before/During/After) \u2014 how do people use astrology day to day, what do they want? The key takeaway: it is not the prediction that matters, but the feeling of being seen and encouraged. That gave rise to the persona "Oma Astra" and her tone.',
      researchImage: "",
      researchGallery: [
        { src: "assets/Portfolio_Content/Soulsphere_Bot/interview-research.webp", caption: "Interview synthesis (Before \xB7 During \xB7 After \xB7 Future) \u2014 wishes and pains clustered." },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/old_woman.webp", caption: 'Persona "Oma Astra" \u2014 friendly, warm and approachable.' }
      ],
      research: [
        "Interviews (Before \xB7 During \xB7 After) \u2014 how do people use astrology day to day?",
        'Persona work \u2014 "Oma Astra" as a warm-hearted star grandmother',
        'Tone of voice \u2014 "my dear", "sunshine": closeness, not fortune-telling',
        "Usability & concept testing \u2014 tasks, error messages and aesthetics",
        "A look at existing horoscope apps \u2014 what is missing is personality"
      ],
      insights: [
        "People want closeness, not facts \u2014 a voice that takes its time beats any generic prediction.",
        'A persona makes astrology accessible: "Oma Astra" lowers the barrier, even for skeptics.',
        'Tone is everything \u2014 a touch too "mystical" feels unconvincing; warm and down-to-earth builds trust.',
        "Testing showed: answers were too long and the bot too slow \u2014 pace and brevity are part of the experience."
      ],
      hmw: [],
      solutionStatement: 'The idea: give a horoscope bot a persona instead of an anonymous voice \u2014 "Oma Astra", a warm-hearted star grandmother who calls you by name.',
      solutionContext: 'After a shared moodboard the concept came together fast: a chatbot with personality. At its heart is "Oma Astra" \u2014 a warm star grandmother (many associate a grandma with wisdom & security). She is the face and mascot, her name a nod to the theme. Design: astrological symbols and a purple-blue palette for the mystical vibe, plus a planet as the logo. Technically fed with astrology documents and connected to a horoscope API. Features: daily horoscopes, sign traits, a compatibility analysis and encouragement \u2014 in a loving tone ("my dear", "sunshine"), with pre-written example questions.',
      designCarousel: [
        { src: "assets/Portfolio_Content/Soulsphere_Bot/first-draft-process.webp", caption: "First draft \u2014 plain, just a greeting box, no persona." },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/insta.webp", caption: "Oma Astra on Instagram \u2014 the persona as an interactive star consultation (@souls_phere111)." },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/illustration.webp", caption: "Oma Astra \u2014 avatar & mascot: warm, wise, inviting. The face of the bot.", bare: true },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/logo.webp", caption: "Logo \u2014 a planet: the central element of astrology, the connection between sky and human.", bare: true },
        { src: "assets/Portfolio_Content/Soulsphere_Bot/titel.webp", caption: 'Wordmark "Soulsphere" \u2014 elegant serif in deep violet.', bare: true }
      ],
      concept: 'A chatbot experience built around the persona "Oma Astra": ask for your zodiac sign, get a daily horoscope, have traits explained and check the compatibility between two signs \u2014 warm, encouraging and down-to-earth. Deployed as a web app on HuggingFace, code on GitHub (Team-08). The persona also lives on via Instagram.',
      solutionImage: "",
      systemSlider: { title: "", intro: "", hub: "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp", images: [] },
      outcome: 'A working astrology chatbot with its own persona, deployed on HuggingFace and tested with users. Usability and concept testing fed concrete improvements back in: shorter, German answers, pre-written questions, faster response time and a more coherent design. Beyond the app, "Oma Astra" lives on via Instagram (@souls_phere111) as an interactive star consultation \u2014 the persona leaves the app and becomes a brand.',
      resultsImage: "assets/Portfolio_Content/Soulsphere_Bot/finished_bot.webp",
      metrics: [
        { label: "Live prototype", value: "HuggingFace", detail: "Working bot, publicly testable" },
        { label: "Persona home", value: "Instagram", detail: "@souls_phere111 \u2014 Oma Astra as star consultation" },
        { label: "Testing", value: "Usability + concept", detail: "Findings fed straight into the next iteration" }
      ],
      reflection: 'The strongest takeaway: a persona beats a feature set. "Oma Astra" turned a generic horoscope tool into something people want to talk to. Astrology was only the medium \u2014 the real core was warmth and tone. Next time I would test the tone with real users even earlier and treat answer length and pace as design parameters from the start.',
      learnings: [
        "A character with personality makes a product approachable \u2014 personality is function, not decoration.",
        'Tone is design: "my dear" instead of "your daily horoscope" changes the whole experience.',
        "A persona can leave the app \u2014 on Instagram, Oma Astra becomes a brand of her own."
      ],
      wouldChange: [
        "Optimise answer length and response time earlier \u2014 in testing the answers were too long and the bot too slow.",
        "Bring more users into testing to see patterns rather than single opinions.",
        "Plan for extra features (charts, moon phases) and a memory function for answers."
      ],
      tldr: {
        problem: "Horoscope apps feel cold and generic \u2014 the human touch is missing.",
        myRole: "Concept, persona & brand, bot build (HuggingFace), testing.",
        solution: 'Chatbot persona "Oma Astra" \u2014 warm, encouraging, zodiac horoscopes. Plus an Instagram home.',
        outcome: "Working bot + Instagram persona. Testing findings carried into the iteration."
      },
      problemShort: "Horoscope apps are cold and generic \u2014 users miss a warm, human voice.",
      solutionShort: 'Chatbot persona "Oma Astra" \u2014 astrology with heart: warm, encouraging, everyday.',
      role: "Concept, persona & brand, bot build & testing",
      duration: "1st semester \xB7 Winter 2024/25",
      team: "Team-08 \xB7 first-semester project",
      tools: ["HuggingFace", "Figma", "Instagram", "Miro"],
      roleChips: ["\u{1F3A8} Design", "\u{1F3AD} Persona", "\u{1F916} Bot build", "\u{1F9EA} Testing"]
    }
  }
];
window.NURIA = NURIA;
window.STR = STR;
window.PROJECTS = PROJECTS;

})();
