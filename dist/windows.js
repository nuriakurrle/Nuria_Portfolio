(function(){
const { NURIA, STR, PROJECTS, PROJECT_TAGS, SKILL_CATALOG, Placeholder, MediaGallery, Tabs } = window;
const { useState: useStateW } = React;
function LazyVideo({ src, poster, controls = false, loop = false, className, style, onClick }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      if (e.isIntersecting) {
        const p = el.play();
        if (p && p.catch) p.catch(() => {
        });
      } else {
        el.pause();
      }
    }, { rootMargin: "200px", threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement(
    "video",
    {
      ref,
      src,
      poster,
      controls,
      loop,
      muted: true,
      playsInline: true,
      preload: "none",
      className,
      style,
      onClick
    }
  );
}
function RecruiterContent({ t, lang, openProject, openWindow, closeWindow, onDownloadCV, openLightbox }) {
  const marqueeIds = ["atolls", "echoes", "vinted"];
  const topProjects = marqueeIds.map((id) => PROJECTS.find((p) => p.id === id && p.status === "completed")).filter(Boolean);
  const wipProjects = PROJECTS.filter((p) => p.status === "wip").slice(0, 3);
  const [closing, setClosing] = React.useState(false);
  const [mailCopied, setMailCopied] = React.useState(false);
  const copyMail = () => {
    var _a;
    try {
      (_a = navigator.clipboard) == null ? void 0 : _a.writeText(NURIA.email);
    } catch (e) {
    }
    setMailCopied(true);
    setTimeout(() => setMailCopied(false), 1800);
  };
  const handOff = (nav) => {
    if (closing) return;
    setClosing(true);
    if (typeof nav === "function") nav();
    setTimeout(() => {
      if (closeWindow) closeWindow("recruiter");
    }, 420);
  };
  const city = (NURIA.location || "").split("\xB7")[0].trim();
  return /* @__PURE__ */ React.createElement("div", { className: `recruiter-content recruiter-content--landing${closing ? " recruiter-content--closing" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "recruiter-hero" }, /* @__PURE__ */ React.createElement("div", { className: "recruiter-portrait" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: NURIA.photo,
      alt: NURIA.name,
      onError: (e) => {
        e.currentTarget.style.display = "none";
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "recruiter-intro" }, /* @__PURE__ */ React.createElement("span", { className: "about-kicker" }, "UX / SERVICE DESIGN"), /* @__PURE__ */ React.createElement("h1", { className: "recruiter-name" }, NURIA.name), /* @__PURE__ */ React.createElement("p", { className: "about-lede" }, STR[lang].tagline), /* @__PURE__ */ React.createElement("div", { className: "about-block recruiter-looking" }, /* @__PURE__ */ React.createElement("span", { className: "about-block-label" }, lang === "de" ? "Was ich suche" : "What I'm looking for"), /* @__PURE__ */ React.createElement("div", { className: "about-facts" }, /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Position" : "Position"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, lang === "de" ? "Praxissemester \xB7 UX / Service Design" : "Internship \xB7 UX / Service Design")), /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Zeit" : "Time"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, "WS 26/27 \xB7 ", city)), /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Studium" : "Studies"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, "B.Sc. Informatik & Design \xB7 HM M\xFCnchen \xB7 4. Sem.")), /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Mindset" : "Mindset"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, lang === "de" ? "Research first, dann designen & coden" : "Research first, then design & code")))), /* @__PURE__ */ React.createElement("div", { className: "recruiter-contact-buttons" }, /* @__PURE__ */ React.createElement("a", { className: "recruiter-btn-email", href: `mailto:${NURIA.email}`, onClick: copyMail }, "\u2709 ", lang === "de" ? "Mail" : "Email"), /* @__PURE__ */ React.createElement("a", { className: "recruiter-btn-linkedin", href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, "in LinkedIn"), /* @__PURE__ */ React.createElement("a", { className: "recruiter-btn-cv", href: "assets/Nuria_Kurrle_CV.pdf", download: true }, "\u2B07 CV")), /* @__PURE__ */ React.createElement("p", { className: "recruiter-copied", "aria-live": "polite" }, mailCopied ? lang === "de" ? `\u2713 E-Mail kopiert: ${NURIA.email}` : `\u2713 Email copied: ${NURIA.email}` : "\xA0"))), /* @__PURE__ */ React.createElement("div", { className: "recruiter-divider" }), /* @__PURE__ */ React.createElement("div", { className: "recruiter-projects-section" }, /* @__PURE__ */ React.createElement("h2", { className: "recruiter-projects-title" }, lang === "de" ? "Ausgew\xE4hlte Projekte" : "Selected work"), /* @__PURE__ */ React.createElement("div", { className: "recruiter-projects-grid recruiter-projects-grid--stack" }, topProjects.map((project) => {
    var _a;
    const d = project[lang];
    const openCase = () => handOff(() => openWindow("project", { projectId: project.id }));
    const roleChips = ((_a = d.roleChips) == null ? void 0 : _a.slice(0, 2)) || [];
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: project.id,
        className: "recruiter-project-card--new",
        onClick: openCase,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openCase();
          }
        },
        role: "button",
        tabIndex: 0
      },
      /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-hero" }, d.heroImage || project.cover ? /* @__PURE__ */ React.createElement(
        "img",
        {
          src: d.heroImage || project.cover,
          alt: d.title,
          style: { objectFit: d.heroImage ? "cover" : project.coverFit || "cover" },
          loading: "lazy",
          onError: (e) => {
            var _a2;
            e.currentTarget.style.display = "none";
            (_a2 = e.currentTarget.parentElement) == null ? void 0 : _a2.classList.add("recruiter-card-hero--fallback");
          }
        }
      ) : null, /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-hero-fallback-glyph", "aria-hidden": "true" }, project.emoji), /* @__PURE__ */ React.createElement(
        "span",
        {
          className: "recruiter-card-status",
          title: project.status === "completed" ? lang === "de" ? "Abgeschlossen" : "Completed" : lang === "de" ? "In Arbeit" : "In progress",
          "aria-hidden": "true"
        },
        project.status === "completed" ? "\u2713" : "\u25D0"
      ), /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-hero-overlay" }, /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-tags" }, roleChips.map((chip, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "recruiter-chip-tag" }, chip))))),
      /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-content" }, /* @__PURE__ */ React.createElement("h3", { className: "recruiter-card-title" }, d.title.split(/[—:]/)[0].trim()), /* @__PURE__ */ React.createElement("p", { className: "recruiter-card-desc" }, d.problemShort), /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-footer-meta" }, d.duration && /* @__PURE__ */ React.createElement("span", { className: "recruiter-meta-chip" }, "\u23F1\uFE0F ", d.duration.split("(")[0].trim()), d.team && /* @__PURE__ */ React.createElement("span", { className: "recruiter-meta-chip" }, "\u{1F465} ", lang === "de" ? "Teamprojekt" : "Team project"))),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "recruiter-card-cta-new",
          onClick: (e) => {
            e.stopPropagation();
            openCase();
          }
        },
        lang === "de" ? "Case Study \xF6ffnen \u2192" : "Open Case Study \u2192"
      )
    );
  }))), wipProjects.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "recruiter-section recruiter-section--wip" }, /* @__PURE__ */ React.createElement("h3", { className: "recruiter-section-title" }, "\u{1F504} ", lang === "de" ? "Momentan in Arbeit" : "Currently in Progress"), /* @__PURE__ */ React.createElement("p", { className: "recruiter-section-sub mono" }, lang === "de" ? "Aktive Projekte, Einblick, nicht das Endprodukt." : "Active projects, a peek, not the finished story."), /* @__PURE__ */ React.createElement("div", { className: "recruiter-wip-grid" }, wipProjects.map((project) => {
    var _a;
    const d = project[lang];
    const roleChipsPreview = ((_a = d.roleChips) == null ? void 0 : _a.slice(0, 2)) || [];
    const openCase = () => handOff(() => openWindow("project", { projectId: project.id }));
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: project.id,
        className: "recruiter-card recruiter-card--wip",
        onClick: openCase,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openCase();
          }
        },
        role: "button",
        tabIndex: 0
      },
      /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-header" }, /* @__PURE__ */ React.createElement("span", { className: "recruiter-card-emoji" }, project.emoji), /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-title" }, /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-name" }, d.title), /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-desc" }, d.problemShort))),
      /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-meta" }, roleChipsPreview.map((chip, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "recruiter-meta-chip" }, chip)), d.duration && /* @__PURE__ */ React.createElement("span", { className: "recruiter-meta-chip mono" }, d.duration)),
      /* @__PURE__ */ React.createElement("div", { className: "recruiter-card-status" }, /* @__PURE__ */ React.createElement("span", { className: "recruiter-status-badge wip" }, "\u{1F504} ", lang === "de" ? "In Arbeit" : "In Progress"), typeof project.progress === "number" && /* @__PURE__ */ React.createElement("span", { className: "recruiter-status-progress mono" }, project.progress, "%")),
      typeof project.progress === "number" && /* @__PURE__ */ React.createElement("div", { className: "recruiter-wip-bar", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("div", { style: { width: `${project.progress}%` } })),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "recruiter-card-cta recruiter-card-cta--wip",
          onClick: (e) => {
            e.stopPropagation();
            openCase();
          }
        },
        "\u2192 ",
        lang === "de" ? "Einblick" : "Preview"
      )
    );
  }))), /* @__PURE__ */ React.createElement("div", { className: "recruiter-view-all" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "recruiter-view-all-btn",
      onClick: () => handOff(() => openWindow("projects"))
    },
    lang === "de" ? "\u2192 Alle Projekte ansehen" : "\u2192 View all projects"
  )));
}
const PROJECT_ACCENTS = {
  atolls: "#1F8A8A",
  /* teal */
  echoes: "#B0584C",
  /* terracotta / Moosburg rose */
  vinted: "#FFB700",
  /* Retro Yellow — Vinted Rewind palette */
  munichapp: "#2E78C8",
  /* Munich blue */
  soulsphere: "#5B4BC4",
  /* indigo */
  donbosco: "#2E8B57",
  /* green */
  clarity: "#E0853B"
  /* amber */
};
const accentStyle = (proj) => {
  const c = proj && PROJECT_ACCENTS[proj.id];
  if (!c) return void 0;
  const r = parseInt(c.slice(1, 3), 16), g = parseInt(c.slice(3, 5), 16), b = parseInt(c.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return { background: c, color: luminance > 0.6 ? "var(--ink)" : "#fff", borderColor: c };
};
function CaseScrollLayout({ sections, prevProj, nextProj, openWindow, lang, miniTitle, miniDek, introBlock, noProjectNav }) {
  var _a, _b, _c;
  const [activeId, setActiveId] = React.useState((_a = sections[0]) == null ? void 0 : _a.id);
  const rootRef = React.useRef(null);
  const scrollTo = (id) => {
    var _a2;
    setActiveId(id);
    const el = (_a2 = rootRef.current) == null ? void 0 : _a2.querySelector(`#section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sectionTargets = sections.map((s) => root.querySelector(`#section-${s.id}`)).filter(Boolean);
    const revealTargets = Array.from(root.querySelectorAll(".reveal"));
    if (sectionTargets.length === 0 && revealTargets.length === 0) return;
    const scrollRoot = root.closest(".case-study-container");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.target.classList.contains("reveal")) {
          e.target.classList.add("revealed");
        }
      });
    }, { root: scrollRoot || null, threshold: 0.12, rootMargin: "-24px 0px -40% 0px" });
    revealTargets.forEach((t) => io.observe(t));
    const scroller = scrollRoot || window;
    let ticking = false;
    const pickActive = () => {
      var _a2;
      ticking = false;
      const rootRect = scrollRoot ? scrollRoot.getBoundingClientRect() : { top: 0, height: window.innerHeight };
      const line = rootRect.top + rootRect.height * 0.3;
      let currentId = (_a2 = sectionTargets[0]) == null ? void 0 : _a2.id;
      for (const el of sectionTargets) {
        if (el.getBoundingClientRect().top - line <= 0) currentId = el.id;
      }
      if (currentId) setActiveId(currentId.replace(/^section-/, ""));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(pickActive);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    pickActive();
    return () => {
      io.disconnect();
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [sections]);
  const shortTitle = (p) => {
    var _a2;
    return (((_a2 = p == null ? void 0 : p[lang]) == null ? void 0 : _a2.title) || "").split(/[—:]/)[0].trim();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "case-scroll-layout", ref: rootRef }, (miniTitle || miniDek) && /* @__PURE__ */ React.createElement("header", { className: "case-mini-header" }, miniTitle && /* @__PURE__ */ React.createElement("strong", null, miniTitle), miniDek && /* @__PURE__ */ React.createElement("span", { className: "case-mini-header-dek" }, miniDek)), introBlock && /* @__PURE__ */ React.createElement("div", { className: "tab-content case-intro-wrap" }, introBlock), sections.map((s, i) => /* @__PURE__ */ React.createElement("section", { key: s.id, id: `section-${s.id}`, className: "case-scroll-section" }, (s.chapterTitle || sections.length > 1) && /* @__PURE__ */ React.createElement("header", { className: "case-chapter" }, /* @__PURE__ */ React.createElement("span", { className: "case-chapter-num" }, String(i + 1).padStart(2, "0"), " / ", String(sections.length).padStart(2, "0")), s.chapterTitle && /* @__PURE__ */ React.createElement("h2", { className: "case-chapter-title" }, s.chapterTitle)), s.content)), /* @__PURE__ */ React.createElement("nav", { className: "case-scroll-nav", "aria-label": "Section navigation" }, !noProjectNav && /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "case-scroll-arrow",
      disabled: !prevProj,
      style: accentStyle(prevProj),
      onClick: () => prevProj && openWindow && openWindow("project", { projectId: prevProj.id }),
      title: prevProj ? (_b = prevProj[lang]) == null ? void 0 : _b.title : ""
    },
    "\u2190 ",
    prevProj ? shortTitle(prevProj) : lang === "de" ? "Vorheriges" : "Previous"
  ), /* @__PURE__ */ React.createElement("div", { className: "case-scroll-pills" }, sections.map((s) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: s.id,
      type: "button",
      className: `case-scroll-pill ${activeId === s.id ? "active" : ""}`,
      onClick: () => scrollTo(s.id)
    },
    s.label
  ))), !noProjectNav && /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "case-scroll-arrow",
      disabled: !nextProj,
      style: accentStyle(nextProj),
      onClick: () => nextProj && openWindow && openWindow("project", { projectId: nextProj.id }),
      title: nextProj ? (_c = nextProj[lang]) == null ? void 0 : _c.title : ""
    },
    nextProj ? shortTitle(nextProj) : lang === "de" ? "Fertig" : "Done",
    " \u2192"
  )));
}
function splitLead(text) {
  const dot = text.indexOf(". ");
  const dash = text.indexOf(" \u2014 ");
  let idx = -1;
  if (dot !== -1 && (dash === -1 || dot < dash)) idx = dot + 1;
  else if (dash !== -1) idx = dash;
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx), text.slice(idx).trim()];
}
function smoothRoute(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}
function SystemJourney({ title, intro, images, hub, openLightbox }) {
  const stageRef = React.useRef(null);
  const pinRefs = React.useRef([]);
  const [geo, setGeo] = React.useState({ w: 0, h: 0, d: "" });
  const measure = React.useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const sb = stage.getBoundingClientRect();
    const pts = [];
    pinRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      pts.push({ x: r.left + r.width / 2 - sb.left, y: r.top + r.height / 2 - sb.top });
    });
    setGeo({ w: sb.width, h: sb.height, d: smoothRoute(pts) });
  }, []);
  React.useEffect(() => {
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro && stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 450);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure, images]);
  const items = images.map((it) => ({ type: "image", src: it.src, caption: it.caption || "" }));
  return /* @__PURE__ */ React.createElement("section", { className: "case-section system-journey-section" }, title && /* @__PURE__ */ React.createElement("h3", null, title), intro && /* @__PURE__ */ React.createElement("p", { className: "journey-intro" }, intro), /* @__PURE__ */ React.createElement("div", { className: "system-journey", ref: stageRef }, images.map((img, i) => /* @__PURE__ */ React.createElement("div", { className: "journey-stop" + (img.bare ? " bare" : ""), key: i }, /* @__PURE__ */ React.createElement("span", { className: "journey-pin", ref: (el) => {
    pinRefs.current[i] = el;
  } }, /* @__PURE__ */ React.createElement("img", { className: "journey-rose", src: hub, alt: "", "aria-hidden": "true" })), /* @__PURE__ */ React.createElement("figure", { className: "journey-card", onClick: () => openLightbox(items, i) }, /* @__PURE__ */ React.createElement("img", { src: img.src, alt: img.caption || "", loading: "lazy", onLoad: measure }), (img.caption || img.text) && /* @__PURE__ */ React.createElement("figcaption", null, img.caption && /* @__PURE__ */ React.createElement("span", { className: "journey-cap-title" }, /* @__PURE__ */ React.createElement("b", null, i + 1), " ", img.caption), img.text && /* @__PURE__ */ React.createElement("span", { className: "journey-cap-text" }, img.text))))), /* @__PURE__ */ React.createElement("svg", { className: "journey-path", width: geo.w, height: geo.h, "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: geo.d }))));
}
function ProjectContent({ project, t, lang, openLightbox, openWindow, closeWindow }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
  const d = project[lang];
  const [mailCopied, setMailCopied] = React.useState(false);
  const copyMail = () => {
    var _a2;
    try {
      (_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText(NURIA.email);
    } catch (e) {
    }
    setMailCopied(true);
    setTimeout(() => setMailCopied(false), 1800);
  };
  const completedProjects = PROJECTS.filter((p) => p.status === "completed");
  const currentIdx = completedProjects.findIndex((p) => p.id === project.id);
  const prevProj = currentIdx > 0 ? completedProjects[currentIdx - 1] : null;
  const nextProj = currentIdx >= 0 && currentIdx < completedProjects.length - 1 ? completedProjects[currentIdx + 1] : null;
  const hasRichContent = Array.isArray(d.research) && d.research.length > 0;
  const isWipPreview = project.status === "coming-soon" || project.status === "wip" && !hasRichContent;
  if (isWipPreview) {
    return /* @__PURE__ */ React.createElement("div", { className: "content" }, /* @__PURE__ */ React.createElement("div", { className: "hero" }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 64, alignSelf: "center", textAlign: "center" } }, project.emoji), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, d.title), /* @__PURE__ */ React.createElement("div", { className: "tag mono" }, d.problemShort), /* @__PURE__ */ React.createElement("span", { className: "chip peach" }, "\u{1F528} ", project.status === "wip" ? lang === "de" ? "In Arbeit" : "In Progress" : t.coming_soon))), d.phase && /* @__PURE__ */ React.createElement("div", { className: "callout yellow" }, /* @__PURE__ */ React.createElement("strong", null, t.phase, ":"), " ", d.phase, typeof project.progress === "number" && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { className: "bar", style: { height: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${project.progress}%` } })), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { marginTop: 4 } }, project.progress, "%, ", t.progress))), d.context && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Kontext" : "Context"), /* @__PURE__ */ React.createElement("p", null, d.context)), /* @__PURE__ */ React.createElement("h2", null, t.role_label), /* @__PURE__ */ React.createElement("p", null, d.role, d.duration ? ` \xB7 ${d.duration}` : "", d.team ? ` \xB7 ${d.team}` : ""), Array.isArray(d.tools) && d.tools.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "tag-row" }, d.tools.map((tt) => /* @__PURE__ */ React.createElement("span", { key: tt, className: "chip" }, tt))), /* @__PURE__ */ React.createElement(Placeholder, { caption: t.placeholder_caption("Process Snapshot") }));
  }
  const introBlock = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "case-intro-block" }, /* @__PURE__ */ React.createElement("h1", { className: "case-intro-title" }, d.title), d.description && /* @__PURE__ */ React.createElement("p", { className: "case-intro-desc" }, d.description), /* @__PURE__ */ React.createElement("div", { className: "case-intro-tags" }, d.duration && /* @__PURE__ */ React.createElement("span", { className: "case-intro-tag" }, d.duration), d.team && /* @__PURE__ */ React.createElement("span", { className: "case-intro-tag" }, lang === "de" ? "Teamprojekt" : "Team project"), (d.tools || []).slice(0, 3).map((tt) => /* @__PURE__ */ React.createElement("span", { key: tt, className: "case-intro-tag" }, tt)))), (() => {
    var _a2;
    const heroVideo = project.id === "atolls" ? (_a2 = d.media) == null ? void 0 : _a2.find((m) => m.type === "video" && m.src) : null;
    if (heroVideo) {
      return /* @__PURE__ */ React.createElement("div", { className: "case-hero-bleed" }, /* @__PURE__ */ React.createElement("video", { controls: true, preload: "metadata", poster: d.heroImage || void 0, style: { width: "100%", display: "block" } }, /* @__PURE__ */ React.createElement("source", { src: heroVideo.src, type: "video/mp4" })));
    }
    if (project.id === "vinted") {
      const vintedHero = "assets/Portfolio_Content/VInted_Rebranding/magazine1.webp";
      return /* @__PURE__ */ React.createElement("div", { className: "case-hero-bleed" }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: vintedHero,
          alt: d.title,
          onClick: () => openLightbox([{ type: "image", src: vintedHero, caption: d.title }], 0)
        }
      ));
    }
    if (d.heroImage) {
      return /* @__PURE__ */ React.createElement("div", { className: "case-hero-bleed" }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: d.heroImage,
          alt: d.title,
          onClick: () => openLightbox([{ type: "image", src: d.heroImage, caption: d.title }], 0)
        }
      ));
    }
    return null;
  })(), (project.devLog || project.figmaUrl || project.documentation) && (() => {
    var _a2;
    const dev2 = project.devLog;
    const links = [
      /* Deck replaces the Figma link here; the Figma prototype stays
         accessible via its own embed section below. */
      ...project.deckUrl ? [{ label: lang === "de" ? "Pr\xE4sentation \xF6ffnen" : "Open presentation", href: project.deckUrl }] : project.figmaUrl ? [{ label: project.figmaLabel && project.figmaLabel[lang] || (lang === "de" ? "Figma \xF6ffnen" : "Open Figma"), href: project.figmaUrl }] : [],
      ...((dev2 == null ? void 0 : dev2.links) || []).filter((l) => l.href && l.href !== "#").map((l) => ({ label: l.label, href: l.href }))
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "case-meta-strip" }, ((_a2 = dev2 == null ? void 0 : dev2.stack) == null ? void 0 : _a2.length) > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "case-meta-label" }, lang === "de" ? "Stack" : "Stack"), /* @__PURE__ */ React.createElement("div", { className: "case-meta-value" }, dev2.stack.join(" \xB7 "))), (d.role || (dev2 == null ? void 0 : dev2.role)) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "case-meta-label" }, lang === "de" ? "Rolle" : "Role"), /* @__PURE__ */ React.createElement("div", { className: "case-meta-value" }, d.role || dev2.role)), links.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "case-meta-label" }, lang === "de" ? "Links" : "Links"), /* @__PURE__ */ React.createElement("div", { className: "case-meta-links" }, links.map((l, i) => /* @__PURE__ */ React.createElement("a", { key: i, className: "case-meta-link", href: l.href, target: "_blank", rel: "noreferrer" }, "\u2192 ", l.label)))), project.documentation && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "case-meta-label" }, lang === "de" ? "Doku" : "Docs"), /* @__PURE__ */ React.createElement("div", { className: "case-meta-value" }, /* @__PURE__ */ React.createElement("a", { className: "case-meta-link", href: project.documentation, target: "_blank", rel: "noreferrer" }, "\u2192 ", lang === "de" ? "Gesamte Dokumentation (PDF)" : "Full documentation (PDF)"))));
  })());
  const researchPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content" }, d.context && /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Kontext" : "Context"), /* @__PURE__ */ React.createElement("p", null, d.context)), project.id !== "soulsphere" && (((_a = d.problemGallery) == null ? void 0 : _a.length) > 0 ? /* @__PURE__ */ React.createElement("section", { className: "case-section case-sticky-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-text" }, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Das Problem" : "The Problem"), /* @__PURE__ */ React.createElement("p", null, d.problemStatement || d.problemShort), d.problemContext && d.problemContext !== (d.problemStatement || d.problemShort) && /* @__PURE__ */ React.createElement("p", null, d.problemContext)), /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-media" }, d.problemGallery.map((img, i) => /* @__PURE__ */ React.createElement(
    "figure",
    {
      key: i,
      className: img.bare ? "bare" : void 0,
      onClick: () => openLightbox(
        d.problemGallery.map((it) => ({ type: "image", src: it.src, caption: it.caption || "" })),
        i
      )
    },
    /* @__PURE__ */ React.createElement("img", { src: img.src, alt: img.caption || "", loading: "lazy" }),
    img.caption && /* @__PURE__ */ React.createElement("figcaption", null, img.caption)
  )))) : /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("div", { className: "case-row" }, /* @__PURE__ */ React.createElement("div", { className: "case-row-text" }, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Das Problem" : "The Problem"), /* @__PURE__ */ React.createElement("p", null, d.problemStatement || d.problemShort), d.problemContext && d.problemContext !== (d.problemStatement || d.problemShort) && /* @__PURE__ */ React.createElement("p", null, d.problemContext)), /* @__PURE__ */ React.createElement("div", { className: "case-row-media" }, d.problemImage ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: d.problemImage,
      alt: lang === "de" ? "Problem-Kontext" : "Problem context",
      className: "case-row-img-zoom",
      onClick: () => openLightbox([{ type: "image", src: d.problemImage, caption: d.problemStatement || d.problemShort }], 0)
    }
  ) : /* @__PURE__ */ React.createElement(Placeholder, { caption: lang === "de" ? "Problem-Visual folgt" : "Problem visual TBD", h: 280 }))))), ((_b = d.hmw) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("h3", null, t.hmw_label), /* @__PURE__ */ React.createElement("div", { className: "hmw-box" }, d.hmw.map((h, idx) => /* @__PURE__ */ React.createElement("p", { key: idx }, "\u21B3 ", h)))), d.keyInsight && /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("blockquote", { className: "case-insight-quote" }, d.keyInsight)), ((_c = d.research) == null ? void 0 : _c.length) > 0 && (() => {
    var _a2;
    const icons = ["\u{1F465}", "\u{1F6B6}", "\u{1F4AD}", "\u{1F4CA}", "\u{1F3AF}", "\u{1F4F1}", "\u{1F9EA}", "\u{1F5FA}\uFE0F"];
    const sticky = ((_a2 = d.researchGallery) == null ? void 0 : _a2.length) > 0;
    const methodCards = /* @__PURE__ */ React.createElement("div", { className: "research-methods-grid" + (sticky ? " research-methods-stack" : "") }, d.research.map((method, i) => {
      const [name, ...rest] = method.split(" \u2014 ");
      const desc = rest.join(" \u2014 ");
      return /* @__PURE__ */ React.createElement("div", { key: i, className: "research-method-card" }, /* @__PURE__ */ React.createElement("div", { className: "research-method-head" }, /* @__PURE__ */ React.createElement("span", { className: "research-method-icon", "aria-hidden": "true" }, icons[i % icons.length]), /* @__PURE__ */ React.createElement("span", { className: "research-method-num", "aria-hidden": "true" }, String(i + 1).padStart(2, "0"))), /* @__PURE__ */ React.createElement("div", { className: "research-method-name" }, name), desc && /* @__PURE__ */ React.createElement("div", { className: "research-method-desc" }, desc));
    }));
    if (sticky) {
      return /* @__PURE__ */ React.createElement("section", { className: "case-section research-split" }, project.id !== "soulsphere" && /* @__PURE__ */ React.createElement("h2", null, t.research_label), d.researchContext && /* @__PURE__ */ React.createElement("p", null, d.researchContext), /* @__PURE__ */ React.createElement("div", { className: "research-split-cols" }, /* @__PURE__ */ React.createElement("div", { className: "research-split-methods" }, methodCards), /* @__PURE__ */ React.createElement("div", { className: "research-split-media" }, d.researchGallery.map((img, i) => /* @__PURE__ */ React.createElement(
        "figure",
        {
          key: i,
          onClick: () => openLightbox(
            d.researchGallery.map((it) => ({ type: "image", src: it.src, caption: it.caption || "" })),
            i
          )
        },
        /* @__PURE__ */ React.createElement("img", { src: img.src, alt: img.caption || "", loading: "lazy" }),
        img.caption && /* @__PURE__ */ React.createElement("figcaption", null, img.caption)
      )))));
    }
    return /* @__PURE__ */ React.createElement("section", { className: "case-section" }, project.id !== "soulsphere" && /* @__PURE__ */ React.createElement("h2", null, t.research_label), d.researchContext && /* @__PURE__ */ React.createElement("p", null, d.researchContext), methodCards, d.researchImage && /* @__PURE__ */ React.createElement(
      "img",
      {
        src: d.researchImage,
        alt: lang === "de" ? "Research-Prozess" : "Research process",
        style: { cursor: "zoom-in" },
        onClick: () => openLightbox([{ type: "image", src: d.researchImage, caption: lang === "de" ? "Research" : "Research" }], 0)
      }
    ));
  })(), ((_d = d.insights) == null ? void 0 : _d.length) > 0 && /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("h2", null, t.insights_label), /* @__PURE__ */ React.createElement("div", { className: "insights-cards-grid" }, d.insights.map((insight, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "insight-card-large" }, /* @__PURE__ */ React.createElement("div", { className: "insight-card-number" }, String(idx + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", { className: "insight-card-content" }, /* @__PURE__ */ React.createElement("p", null, insight)))))), project.id !== "munichapp" && project.id !== "soulsphere" && d.problemScenario && /* @__PURE__ */ React.createElement("div", { className: "case-scenario", "data-lang": lang }, d.problemScenario), project.id !== "munichapp" && (() => {
    const breakImg = (d.media || []).filter((m) => m.type === "image" && m.src)[1];
    if (!breakImg) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "case-section-break" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: breakImg.src,
        alt: breakImg.caption || "",
        onClick: () => openLightbox([{ type: "image", src: breakImg.src, caption: breakImg.caption || "" }], 0)
      }
    ), breakImg.caption && /* @__PURE__ */ React.createElement("div", { className: "case-section-break-caption" }, breakImg.caption));
  })());
  const designPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content" }, (d.solutionStatement || d.concept || ((_e = d.designCarousel) == null ? void 0 : _e.length) > 0) && /* @__PURE__ */ React.createElement("section", { className: "case-section" + (((_f = d.designCarousel) == null ? void 0 : _f.length) > 0 ? " case-sticky-scroll" : "") }, /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-text" }, /* @__PURE__ */ React.createElement("h2", null, project.id === "soulsphere" ? lang === "de" ? "Der Bot" : "The Bot" : lang === "de" ? "Die L\xF6sung" : "The Solution"), d.solutionStatement && /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, d.solutionStatement)), (d.solutionContext || d.concept) && /* @__PURE__ */ React.createElement("p", null, d.solutionContext || d.concept)), ((_g = d.designCarousel) == null ? void 0 : _g.length) > 0 && /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-media" }, d.designCarousel.map((img, i) => /* @__PURE__ */ React.createElement(
    "figure",
    {
      key: i,
      className: img.bare ? "bare" : void 0,
      onClick: () => openLightbox(
        d.designCarousel.map((it) => ({ type: "image", src: it.src, caption: it.caption || "" })),
        i
      )
    },
    /* @__PURE__ */ React.createElement("img", { src: img.src, alt: img.caption || "", loading: "lazy" }),
    img.caption && /* @__PURE__ */ React.createElement("figcaption", null, img.caption)
  )))), ((_h = d.brandQr) == null ? void 0 : _h.src) && /* @__PURE__ */ React.createElement("section", { className: "case-section case-brand-qr" }, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Brand Guide scannen" : "Scan the brand guide"), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "Der vollst\xE4ndige Brand- & Language-Guide, QR-Code mit dem Handy scannen oder antippen zum \xD6ffnen." : "The full brand & language guide, scan the QR code with your phone or tap it to open."), /* @__PURE__ */ React.createElement(
    "a",
    {
      className: "case-brand-qr-code",
      href: d.brandQr.link || d.brandQr.src,
      target: "_blank",
      rel: "noreferrer"
    },
    /* @__PURE__ */ React.createElement("img", { src: d.brandQr.src, alt: lang === "de" ? "QR-Code zum Brand Guide" : "QR code to the brand guide" })
  )), ((_j = (_i = d.systemSlider) == null ? void 0 : _i.images) == null ? void 0 : _j.length) > 0 && /* @__PURE__ */ React.createElement(
    SystemJourney,
    {
      title: d.systemSlider.title,
      intro: d.systemSlider.intro,
      images: d.systemSlider.images,
      hub: d.systemSlider.hub || "assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp",
      openLightbox
    }
  ), ((_k = d.systemSlider) == null ? void 0 : _k.scenario) && /* @__PURE__ */ React.createElement("div", { className: "case-scenario", "data-lang": lang }, d.systemSlider.scenario), (d.beforeImage && d.afterImage || d.beforeAfterMedia && (d.beforeAfterMedia.before || d.beforeAfterMedia.after)) && /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Vorher / Nachher" : "Before / After"), /* @__PURE__ */ React.createElement("div", { className: "before-after-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "Vorher" : "Before"), /* @__PURE__ */ React.createElement(
    "img",
    {
      src: d.beforeImage || ((_l = d.beforeAfterMedia) == null ? void 0 : _l.before),
      alt: lang === "de" ? "Vorher" : "Before",
      onClick: () => {
        var _a2;
        return openLightbox([{ type: "image", src: d.beforeImage || ((_a2 = d.beforeAfterMedia) == null ? void 0 : _a2.before), caption: lang === "de" ? "Vorher" : "Before" }], 0);
      }
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "Nachher" : "After"), /* @__PURE__ */ React.createElement(
    "img",
    {
      src: d.afterImage || ((_m = d.beforeAfterMedia) == null ? void 0 : _m.after),
      alt: lang === "de" ? "Nachher" : "After",
      onClick: () => {
        var _a2;
        return openLightbox([{ type: "image", src: d.afterImage || ((_a2 = d.beforeAfterMedia) == null ? void 0 : _a2.after), caption: lang === "de" ? "Nachher" : "After" }], 0);
      }
    }
  )))), ((_n = d.designScreens) == null ? void 0 : _n.length) > 0 && !project.figmaEmbedUrl && /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Design Screens" : "Design Screens"), /* @__PURE__ */ React.createElement("div", { className: "design-screens-block" }, (() => {
    const hero = d.designScreens[0];
    return /* @__PURE__ */ React.createElement("div", { className: "design-screens-hero" }, hero.image ? /* @__PURE__ */ React.createElement(
      "img",
      {
        src: hero.image,
        alt: hero.name,
        onClick: () => openLightbox([{ type: "image", src: hero.image, caption: hero.name }], 0)
      }
    ) : /* @__PURE__ */ React.createElement(Placeholder, { caption: hero.name, h: 320 }), /* @__PURE__ */ React.createElement("div", { className: "design-screens-hero-caption" }, /* @__PURE__ */ React.createElement("span", { className: "design-screens-hero-name" }, hero.name), /* @__PURE__ */ React.createElement("span", { className: "design-screens-hero-desc" }, hero.description)));
  })(), d.designScreens.length > 1 && /* @__PURE__ */ React.createElement("div", { className: "design-screens-grid" }, d.designScreens.slice(1).map((screen, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "design-screen-card" }, screen.image ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: screen.image,
      alt: screen.name,
      onClick: () => openLightbox([{ type: "image", src: screen.image, caption: screen.name }], 0)
    }
  ) : /* @__PURE__ */ React.createElement(Placeholder, { caption: screen.name, h: 220 }), /* @__PURE__ */ React.createElement("div", { className: "design-screen-card-name" }, screen.name), /* @__PURE__ */ React.createElement("div", { className: "design-screen-card-desc" }, screen.description)))))), project.id !== "soulsphere" && d.solutionScenario && /* @__PURE__ */ React.createElement("div", { className: "case-scenario", "data-lang": lang }, d.solutionScenario), (d.solutionScenarioImages || (d.solutionScenarioImage ? [{ src: d.solutionScenarioImage, caption: d.solutionScenarioCaption }] : [])).map((img, i, arr) => /* @__PURE__ */ React.createElement("div", { key: i, className: "case-scenario-step" }, /* @__PURE__ */ React.createElement("div", { className: "case-section-break" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: img.src,
      alt: img.caption || "",
      onClick: () => openLightbox(arr.map((it) => ({ type: "image", src: it.src, caption: it.caption || "" })), i)
    }
  ), img.caption && /* @__PURE__ */ React.createElement("div", { className: "case-section-break-caption" }, img.caption)), img.scenario && /* @__PURE__ */ React.createElement("div", { className: "case-scenario", "data-lang": lang }, img.scenario))), project.figmaEmbedUrl && /* @__PURE__ */ React.createElement("section", { className: "case-section case-section-figma" }, /* @__PURE__ */ React.createElement("h2", null, t.figma_section), /* @__PURE__ */ React.createElement("p", { className: "mono", style: { fontSize: 12, opacity: 0.8 } }, t.figma_hint), d.figmaNote && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 19, fontWeight: 700, margin: "10px 0 16px", color: "var(--ink)" } }, " ", d.figmaNote), /* @__PURE__ */ React.createElement("div", { className: "figma-embed" }, /* @__PURE__ */ React.createElement("iframe", { src: project.figmaEmbedUrl, title: `${d.title}, Figma`, allowFullScreen: true, loading: "lazy" })), project.figmaUrl && /* @__PURE__ */ React.createElement("a", { className: "btn-primary", href: project.figmaUrl, target: "_blank", rel: "noreferrer" }, "\u2192 ", t.figma_cta)));
  const dev = project.devLog;
  const devNotes = dev ? dev[`notes_${lang}`] || dev.notes_de || [] : [];
  const hasRetro = d.reflection || ((_o = d.wouldChange) == null ? void 0 : _o.length) > 0;
  const leadParagraph = (text, key) => {
    const [lead, rest] = splitLead(text);
    return /* @__PURE__ */ React.createElement("p", { key }, /* @__PURE__ */ React.createElement("strong", null, lead), rest ? " " + rest : "");
  };
  const reflectionBlocks = (((_p = d.learnings) == null ? void 0 : _p.length) > 0 || hasRetro) && /* @__PURE__ */ React.createElement("section", { className: "case-section reflection-prose" }, /* @__PURE__ */ React.createElement("h2", { className: "reflection-prose-title" }, "Learnings & Retrospective"), (_q = d.learnings) == null ? void 0 : _q.map((l, i) => leadParagraph(l, "l" + i)), d.reflection && leadParagraph(d.reflection, "refl"), (_r = d.wouldChange) == null ? void 0 : _r.map((c, i) => leadParagraph(c, "w" + i)));
  const closingBlock = /* @__PURE__ */ React.createElement("section", { className: "case-section case-closing" }, /* @__PURE__ */ React.createElement("p", { className: "case-closing-kicker" }, lang === "de" ? "That's all." : "That's all."), /* @__PURE__ */ React.createElement("h2", { className: "case-closing-title" }, lang === "de" ? "Wanna get in touch?" : "Wanna get in touch?"), /* @__PURE__ */ React.createElement("div", { className: "case-closing-arrow", "aria-hidden": "true" }, "\u2193"), /* @__PURE__ */ React.createElement("div", { className: "case-closing-links" }, /* @__PURE__ */ React.createElement("a", { className: "case-closing-link", href: `mailto:${NURIA.email}`, onClick: copyMail }, "\u2709 ", NURIA.email), /* @__PURE__ */ React.createElement("a", { className: "case-closing-link", href: "assets/Nuria_Kurrle_CV.pdf", download: true }, "\u2B07 CV (PDF)"), /* @__PURE__ */ React.createElement("a", { className: "case-closing-link", href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, "in ", NURIA.linkedin)), /* @__PURE__ */ React.createElement("p", { className: "case-closing-copied", "aria-live": "polite" }, mailCopied ? lang === "de" ? `\u2713 E-Mail kopiert: ${NURIA.email}` : `\u2713 Email copied: ${NURIA.email}` : " "), /* @__PURE__ */ React.createElement("p", { className: "case-closing-copyright" }, "\xA9 ", NURIA.name, " 2026"));
  const reflectionPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content" }, reflectionBlocks, closingBlock);
  const resultsPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content" }, d.outcome && /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("div", { className: "case-row" }, /* @__PURE__ */ React.createElement("div", { className: "case-row-text" }, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Ergebnis" : "Outcome"), /* @__PURE__ */ React.createElement("p", null, d.outcome)), /* @__PURE__ */ React.createElement("div", { className: "case-row-media" }, (() => {
    var _a2;
    const heroVideo = project.id !== "atolls" ? (_a2 = d.media) == null ? void 0 : _a2.find((m) => m.type === "video" && m.src) : null;
    if (heroVideo) {
      return /* @__PURE__ */ React.createElement("video", { controls: true, preload: "metadata", poster: d.heroImage || void 0, className: "case-row-video" }, /* @__PURE__ */ React.createElement("source", { src: heroVideo.src, type: "video/mp4" }));
    }
    if (d.resultsImage) {
      const cap = lang === "de" ? "Ergebnis" : "Outcome";
      if (/\.mp4$/i.test(d.resultsImage)) {
        return /* @__PURE__ */ React.createElement(
          LazyVideo,
          {
            src: d.resultsImage,
            className: "case-row-img-zoom",
            loop: true,
            onClick: () => openLightbox([{ type: "video", src: d.resultsImage, caption: cap }], 0)
          }
        );
      }
      return /* @__PURE__ */ React.createElement(
        "img",
        {
          src: d.resultsImage,
          alt: cap,
          className: "case-row-img-zoom",
          onClick: () => openLightbox([{ type: "image", src: d.resultsImage, caption: cap }], 0)
        }
      );
    }
    return /* @__PURE__ */ React.createElement(Placeholder, { caption: lang === "de" ? "Ergebnis-Visual folgt" : "Outcome visual TBD", h: 280 });
  })())), project.id !== "soulsphere" && d.outcomeScenario && /* @__PURE__ */ React.createElement("div", { className: "case-scenario", "data-lang": lang }, d.outcomeScenario), project.id === "echoes" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "img",
    {
      className: "case-echoes-img",
      src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/baracken_tafel.webp",
      alt: lang === "de" ? "Baracken-Tafel" : "Baracken sign"
    }
  ), /* @__PURE__ */ React.createElement("p", { className: "case-echoes-note" }, d.outcomeNote || (lang === "de" ? "[Kurzer Erkl\xE4rungstext folgt, wie die Themen-Tafel und der QR-Code zusammenspielen.]" : "[Short explanation goes here, how the themed sign and the QR code work together.]")), /* @__PURE__ */ React.createElement(
    "img",
    {
      className: "case-echoes-img",
      src: "assets/Portfolio_Content/Echoes_of_Moosburg/outcome/QR_code_scan.webp",
      alt: lang === "de" ? "QR-Code Scan" : "QR-code scan"
    }
  ))));
  const vintedRewindTabs = project.customTabs === "vinted-rewind" ? (() => {
    const conceptPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content vinted-rewind" }, /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "Die Aufgabe f\xFCr das Semester war das Rebranding einer bestehenden Marke. Meine Gruppe und ich haben uns f\xFCr Vinted entschieden, eine Plattform, auf der gebrauchte Kleidung und Objekte verkauft werden." : "The semester brief was to rebrand an existing brand. My group and I chose Vinted, a platform where people sell second-hand clothing and objects."), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "Ausgangspunkt war der bisherige Auftritt: das alte Logo und die alte Website. Diese haben wir analysiert, um daraus ein frisches, eigenst\xE4ndiges Konzept zu entwickeln." : "Our starting point was the existing presence: the old logo and the old website. We analysed both to develop a fresh, distinct concept from there.")), /* @__PURE__ */ React.createElement("section", { className: "case-section case-sticky-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-text" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u{1F50D} Ausgangslage" : "\u{1F50D} Starting Point"), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "So sah Vinted vorher aus, das alte Logo und die alte Website als Ausgangspunkt f\xFCr unser Rebranding." : "This is how Vinted looked before, the old logo and the old website as the starting point for our rebrand.")), /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-media" }, [
      { src: "assets/Portfolio_Content/VInted_Rebranding/old_logo.webp", cap: lang === "de" ? "Original Logo" : "Old logo" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/old_website.webp", cap: lang === "de" ? "Original Website" : "Old website" }
    ].map((img, i, arr) => /* @__PURE__ */ React.createElement(
      "figure",
      {
        key: i,
        onClick: () => openLightbox(
          arr.map((it) => ({ type: "image", src: it.src, caption: it.cap })),
          i
        )
      },
      /* @__PURE__ */ React.createElement("img", { src: img.src, alt: img.cap, loading: "lazy" }),
      /* @__PURE__ */ React.createElement("figcaption", null, img.cap)
    )))));
    const identityPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content vinted-rewind" }, /* @__PURE__ */ React.createElement("section", { className: "case-section case-sticky-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-text" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u{1F9ED} Moodboard & Arbeitsprozess" : "\u{1F9ED} Moodboard & Process"), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "Unser Ziel: ein Konzept f\xFCr alle Altersgruppen, ein nostalgisches, spielerisches Gef\xFChl, das alle anspricht und Generationen verbindet. Gerade junge Menschen wollen heute wieder analog gehen, das Handy weglegen und zur\xFCck in eine einfachere Zeit. Genau dieses Lebensgef\xFChl haben wir auf einem Moodboard gesammelt, 80s/90s-Arcade, Pixel-Art, CRT-Glow, knallige Farben, und Schritt f\xFCr Schritt zur visuellen Richtung verdichtet: Pixel-Logo, Vier-Farben-Palette und ein klarer Type-Stack." : "Our goal: a concept for every age group, a nostalgic, playful feeling that speaks to everyone and connects generations. Young people especially want to go analog again today, put the phone down and return to a simpler time. We gathered exactly that mood on a moodboard, 80s/90s arcade, pixel art, CRT glow, bold colours, and step by step distilled it into a visual direction: pixel logo, four-colour palette and a clear type stack.")), /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-media" }, [
      { src: "assets/Portfolio_Content/VInted_Rebranding/Moodboard.webp", cap: "Moodboard" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/arbeitsprozess.webp", cap: lang === "de" ? "Arbeitsprozess" : "Process" }
    ].map((img, i, arr) => /* @__PURE__ */ React.createElement(
      "figure",
      {
        key: i,
        onClick: () => openLightbox(
          arr.map((it) => ({ type: "image", src: it.src, caption: it.cap })),
          i
        )
      },
      /* @__PURE__ */ React.createElement("img", { src: img.src, alt: img.cap, loading: "lazy" }),
      /* @__PURE__ */ React.createElement("figcaption", null, img.cap)
    )))), /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u{1F6E0} Logo-Evolution & Maskottchen" : "\u{1F6E0} Logo Evolution & Mascot"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" } }, [
      { src: "assets/Portfolio_Content/VInted_Rebranding/old_logo.webp", cap: lang === "de" ? "Vorher" : "Before" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/logo_skizze.webp", cap: lang === "de" ? "Skizze" : "Sketch" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/Logo.webp", cap: lang === "de" ? "Final" : "Final" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/vinti.webp", cap: lang === "de" ? 'Maskottchen \u201EVinti"' : 'Mascot "Vinti"' }
    ].map((m, i, arr) => /* @__PURE__ */ React.createElement("figure", { key: i, className: "bare", style: { margin: 0, flex: "1 1 140px", textAlign: "center" } }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: m.src,
        alt: m.cap,
        style: { width: "100%", borderRadius: 8, cursor: "zoom-in" },
        onClick: () => openLightbox(arr.map((x) => ({ type: "image", src: x.src, caption: x.cap })), i)
      }
    ), /* @__PURE__ */ React.createElement("figcaption", { className: "small", style: { marginTop: 6 } }, m.cap))))), /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u{1F3A8} Farbpalette" : "\u{1F3A8} Colour Palette"), /* @__PURE__ */ React.createElement(
      "figure",
      {
        style: { margin: "12px 0 0" },
        onClick: () => openLightbox([{ type: "image", src: "assets/Portfolio_Content/VInted_Rebranding/palette.webp", caption: lang === "de" ? "Farbpalette" : "Colour palette" }], 0)
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: "assets/Portfolio_Content/VInted_Rebranding/palette.webp",
          alt: lang === "de" ? "Farbpalette" : "Colour palette",
          style: { width: "100%", borderRadius: 8, cursor: "zoom-in", display: "block" },
          loading: "lazy"
        }
      )
    )));
    const designSystemPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content vinted-rewind" }, /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Konzept & Ecosystem" : "Concept & Ecosystem"), /* @__PURE__ */ React.createElement(
      "figure",
      {
        className: "bare",
        style: { margin: "16px 0 0" },
        onClick: () => openLightbox([{ type: "video", src: "assets/Portfolio_Content/VInted_Rebranding/vinted_website.mp4", caption: lang === "de" ? "Neue Website" : "New website" }], 0)
      },
      /* @__PURE__ */ React.createElement(
        LazyVideo,
        {
          src: "assets/Portfolio_Content/VInted_Rebranding/vinted_website.mp4",
          loop: true,
          style: { width: "100%", maxWidth: 700, margin: "0 auto", borderRadius: 8, cursor: "zoom-in", display: "block" }
        }
      ),
      /* @__PURE__ */ React.createElement("figcaption", { className: "small", style: { marginTop: 6 } }, lang === "de" ? "Neue Website" : "New website")
    )), /* @__PURE__ */ React.createElement("section", { className: "case-section case-sticky-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-text" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u267B\uFE0F Repair-Ecosystem" : "\u267B\uFE0F Repair Ecosystem"), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? 'Vinted Rewind ist kein einzelnes Produkt, sondern ein geschlossener Kreislauf, online wie offline. Im Hub gibt man Ger\xE4te zur Reparatur, tauscht oder verkauft sie; der \u201ESubmit \xB7 Match \xB7 Ship"-Flow macht jeden Schritt so leicht und spielerisch wie ein Level. Physische Arcade-Repair-Shops holen das Erlebnis in die echte Welt, und die wiederverwendbare Retro-Game-Box ersetzt Wegwerf-Verpackung. Reparieren wird so zum Spiel statt zur l\xE4stigen Pflicht. Vinted Rewind ist der Ort, an dem deine Ger\xE4te ein zweites Zuhause finden, und an dem du dich ein St\xFCck weit wieder zuhause f\xFChlst: nostalgisch, nachhaltig und generationenverbindend.' : `Vinted Rewind isn't a single product but a closed loop, online and offline. In the hub you send devices in for repair, swap or sell them; the "Submit \xB7 Match \xB7 Ship" flow makes every step as easy and playful as a level. Physical arcade repair shops bring the experience into the real world, and the reusable retro-game-box replaces throwaway packaging. Repair becomes play instead of a chore. Vinted Rewind is the place where your devices find a second home, and where you feel a little at home again: nostalgic, sustainable and generation-spanning.`)), /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-media" }, [
      { src: "assets/Portfolio_Content/VInted_Rebranding/vinted_hub.webp", cap: "Vinted Hub" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/repair_concept.webp", cap: lang === "de" ? "Repair-Konzept" : "Repair concept", bg: "#032036" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/shipping_box.webp", cap: lang === "de" ? "Versand-Box" : "Shipping box" }
    ].map((img, i, arr) => /* @__PURE__ */ React.createElement(
      "figure",
      {
        key: i,
        className: img.bare ? "bare" : void 0,
        onClick: () => openLightbox(
          arr.map((it) => ({ type: "image", src: it.src, caption: it.cap })),
          i
        )
      },
      /* @__PURE__ */ React.createElement("img", { src: img.src, alt: img.cap, loading: "lazy", style: img.bg ? { background: img.bg, padding: "32px 64px" } : void 0 }),
      /* @__PURE__ */ React.createElement("figcaption", null, img.cap)
    )))), project.figmaEmbedUrl && /* @__PURE__ */ React.createElement("section", { className: "case-section case-section-figma" }, /* @__PURE__ */ React.createElement("h3", null, t.figma_section), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "In diesem Figma-File ist das komplette Projekt versammelt: Website- und Mobile-Ansicht, Gamification, Pr\xE4sentation, Werbevideo, Insta-Story und Mockups." : "This Figma file gathers the whole project: website and mobile view, gamification, presentation, ad video, Insta story and mockups."), /* @__PURE__ */ React.createElement("p", { className: "mono", style: { fontSize: 12, opacity: 0.8 } }, t.figma_hint), /* @__PURE__ */ React.createElement("div", { className: "figma-embed" }, /* @__PURE__ */ React.createElement("iframe", { src: project.figmaEmbedUrl, title: `${d.title}, Figma`, allowFullScreen: true, loading: "lazy" })), project.figmaUrl && /* @__PURE__ */ React.createElement("a", { className: "btn-primary", href: project.figmaUrl, target: "_blank", rel: "noreferrer" }, "\u2192 ", t.figma_cta)));
    const gamificationPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content vinted-rewind" }, /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement(
      "figure",
      {
        className: "bare",
        style: { margin: "16px 0 0" },
        onClick: () => openLightbox([{ type: "image", src: "assets/Portfolio_Content/VInted_Rebranding/gamification_app.webp", caption: lang === "de" ? "Gamification in der App" : "Gamification in the app" }], 0)
      },
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: "assets/Portfolio_Content/VInted_Rebranding/gamification_app.webp",
          alt: lang === "de" ? "Gamification in der App" : "Gamification in the app",
          style: { width: "100%", borderRadius: 8, cursor: "zoom-in", display: "block" },
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ React.createElement("figcaption", { className: "small", style: { marginTop: 6 } }, lang === "de" ? "Gamification in der App" : "Gamification in the app")
    )), /* @__PURE__ */ React.createElement("section", { className: "case-section case-sticky-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-text" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u{1F579} Spielablauf" : "\u{1F579} Game Flow"), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "Jede nachhaltige Aktion, reparieren, tauschen, recyceln, bringt Punkte. Damit schaltet man Retro-Mini-Games frei, sammelt Rewards und steigt durch drei Level: vom Rookie \xFCber Master bis Legend. Im Verlauf sieht man jederzeit, wie viel man schon bewegt hat, und ab einer bestimmten Punktzahl schaltet man seinen eigenen Avatar frei, das pers\xF6nliche Gesicht des Fortschritts. So f\xFChlt sich Nachhaltigkeit nicht nach Verzicht an, sondern nach Highscore." : "Every sustainable action, repair, swap, recycle, earns points. You spend them to unlock retro mini-games, collect rewards and climb through three levels: from Rookie to Master to Legend. The history view shows how much you've already moved, and once you hit a certain point threshold you unlock your own avatar, the personal face of your progress. Sustainability doesn't feel like giving something up, it feels like a high score.")), /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-media" }, [
      { src: "assets/Portfolio_Content/VInted_Rebranding/vinted_mini_game.webp", cap: lang === "de" ? "Mini-Game" : "Mini-game", bare: true },
      { src: "assets/Portfolio_Content/VInted_Rebranding/vinted_rewards.webp", cap: "Rewards", bare: true },
      { src: "assets/Portfolio_Content/VInted_Rebranding/vinted_verlauf.webp", cap: lang === "de" ? "Verlauf" : "History", bare: true },
      { src: "assets/Portfolio_Content/VInted_Rebranding/reward_figur.webp", cap: lang === "de" ? "Nutzer-Avatar, ab bestimmter Punktzahl" : "User avatar, unlocked with points" }
    ].map((img, i, arr) => /* @__PURE__ */ React.createElement(
      "figure",
      {
        key: i,
        className: img.bare ? "bare" : void 0,
        onClick: () => openLightbox(
          arr.map((it) => ({ type: "image", src: it.src, caption: it.cap })),
          i
        )
      },
      /* @__PURE__ */ React.createElement("img", { src: img.src, alt: img.cap, loading: "lazy" }),
      /* @__PURE__ */ React.createElement("figcaption", null, img.cap)
    )))), project.gamificationFigmaEmbedUrl && /* @__PURE__ */ React.createElement("section", { className: "case-section case-section-figma" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u{1F3AE} Gamification-Prototyp (Figma)" : "\u{1F3AE} Gamification prototype (Figma)"), /* @__PURE__ */ React.createElement("p", { className: "mono", style: { fontSize: 12, opacity: 0.8 } }, t.figma_hint), /* @__PURE__ */ React.createElement("div", { className: "figma-embed" }, /* @__PURE__ */ React.createElement("iframe", { src: project.gamificationFigmaEmbedUrl, title: `${d.title}, Gamification Figma`, allowFullScreen: true, loading: "lazy" })), project.gamificationFigmaUrl && /* @__PURE__ */ React.createElement("a", { className: "btn-primary", href: project.gamificationFigmaUrl, target: "_blank", rel: "noreferrer" }, "\u2192 ", t.figma_cta)));
    const marketingPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content vinted-rewind" }, /* @__PURE__ */ React.createElement("section", { className: "case-section" }, /* @__PURE__ */ React.createElement(
      LazyVideo,
      {
        src: "assets/Portfolio_Content/VInted_Rebranding/commercial.mp4",
        controls: true,
        loop: true,
        style: { width: "100%", maxWidth: 820, margin: "0 auto", display: "block", borderRadius: 8, border: "2px solid var(--ink, #000)" }
      }
    ), /* @__PURE__ */ React.createElement("p", { className: "small", style: { marginTop: 8, textAlign: "center" } }, lang === "de" ? "Vinted-Werbung im Retro-90er-Style" : "Vinted ad in retro 90s style")), /* @__PURE__ */ React.createElement("section", { className: "case-section case-sticky-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-text" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u{1F4F1} Social Media" : "\u{1F4F1} Social Media"), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "Auf Instagram wird die Marke zur Community: Feed-Posts erz\xE4hlen Before/After-Repair-Stories mit Pixel-Art-Overlays, Creator zeigen ihre eigenen reparierten Sch\xE4tze, und kurze Insta-Werbung bringt den Retro-Vibe in die Timeline. Statt erhobenem Zeigefinger entsteht ein Feed, der Lust aufs Reparieren macht, und Generationen \xFCber gemeinsame Nostalgie zusammenbringt." : "On Instagram the brand becomes a community: feed posts tell before/after repair stories with pixel-art overlays, creators show off their own fixed-up treasures, and short Insta ads bring the retro vibe into the timeline. Instead of wagging a finger, it's a feed that makes you want to repair, connecting generations through shared nostalgia."), /* @__PURE__ */ React.createElement("p", { className: "small" }, lang === "de" ? "\u{1F3AE} Idee: w\xF6chentliche Mini-Games in der Story halten Follower aktiv im Kontakt mit dem Account. Eine solche Spiel-Story haben wir gebaut, ansehen kannst du sie im Figma-Embed." : "\u{1F3AE} Idea: weekly mini-games in the story keep followers actively engaged with the account. We built one such game story, you can view it in the Figma embed.")), /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-media" }, /* @__PURE__ */ React.createElement("figure", { onClick: () => openLightbox([{ type: "image", src: "assets/Portfolio_Content/VInted_Rebranding/insta.webp", caption: "Instagram" }], 0) }, /* @__PURE__ */ React.createElement("img", { src: "assets/Portfolio_Content/VInted_Rebranding/insta.webp", alt: "Instagram", loading: "lazy" }), /* @__PURE__ */ React.createElement("figcaption", null, "Instagram")), /* @__PURE__ */ React.createElement("figure", { onClick: () => openLightbox([{ type: "image", src: "assets/Portfolio_Content/VInted_Rebranding/coumba.video 1.webp", caption: lang === "de" ? "Creator-Content" : "Creator content" }], 0) }, /* @__PURE__ */ React.createElement("img", { src: "assets/Portfolio_Content/VInted_Rebranding/coumba.video 1.webp", alt: lang === "de" ? "Creator-Content" : "Creator content", loading: "lazy" }), /* @__PURE__ */ React.createElement("figcaption", null, lang === "de" ? "Creator-Content" : "Creator content")), /* @__PURE__ */ React.createElement("figure", { style: { cursor: "default" } }, /* @__PURE__ */ React.createElement("video", { controls: true, muted: true, preload: "metadata", style: { width: "100%", display: "block", border: "2px solid var(--ink, #000)", boxShadow: "4px 4px 0 var(--ink, #000)" } }, /* @__PURE__ */ React.createElement("source", { src: "assets/Portfolio_Content/VInted_Rebranding/insta_werbung.mp4", type: "video/mp4" })), /* @__PURE__ */ React.createElement("figcaption", null, lang === "de" ? "Insta-Werbung" : "Insta ad")))), /* @__PURE__ */ React.createElement("section", { className: "case-section case-sticky-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-text" }, /* @__PURE__ */ React.createElement("h3", null, lang === "de" ? "\u{1FAA7} Out-of-Home & Print" : "\u{1FAA7} Out-of-Home & Print"), /* @__PURE__ */ React.createElement("p", null, lang === "de" ? "Damit die Marke nicht nur im Screen lebt, haben wir sie in den \xF6ffentlichen Raum geholt: ein von 90er-Magazinen inspiriertes Cover samt Spread, Poster und Plakate, alle als realit\xE4tsnahe Mockups inszeniert. Der Retro-Look funktioniert auch gro\xDF und gedruckt: Pixel-Logo, knallige Palette und klare Typo bleiben sofort wiedererkennbar, ob am Kiosk oder an der Bushaltestelle." : "To make sure the brand doesn't only live on screen, we took it into public space: a 90s-magazine-inspired cover and spread, posters and billboards, all staged as realistic mockups. The retro look holds up large and in print: pixel logo, bold palette and clear type stay instantly recognisable, whether at the kiosk or the bus stop.")), /* @__PURE__ */ React.createElement("div", { className: "sticky-scroll-media" }, [
      { src: "assets/Portfolio_Content/VInted_Rebranding/werbung_tafel.webp", cap: lang === "de" ? "Plakat" : "Billboard" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/magazine2.webp", cap: lang === "de" ? "Magazin (90er-inspiriert)" : "Magazine (90s-inspired)" },
      { src: "assets/Portfolio_Content/VInted_Rebranding/etiquette.webp", cap: lang === "de" ? "Etikett (Merch)" : "Tag (Merch)" }
    ].map((m, i, arr) => /* @__PURE__ */ React.createElement(
      "figure",
      {
        key: i,
        onClick: () => openLightbox(arr.map((x) => ({ type: "image", src: x.src, caption: x.cap })), i)
      },
      /* @__PURE__ */ React.createElement("img", { src: m.src, alt: m.cap, loading: "lazy" }),
      /* @__PURE__ */ React.createElement("figcaption", null, m.cap)
    )))), closingBlock);
    return [
      { id: "concept", label: lang === "de" ? "\u{1F4CB} Aufgabe" : "\u{1F4CB} Brief", panel: conceptPanel },
      { id: "identity", label: lang === "de" ? "\u{1F3A8} Konzept & Visual Identity" : "\u{1F3A8} Concept & Visual Identity", panel: /* @__PURE__ */ React.createElement(React.Fragment, null, identityPanel, designSystemPanel) },
      { id: "system", label: lang === "de" ? "\u{1F3AE} Gamification" : "\u{1F3AE} Gamification", panel: gamificationPanel },
      { id: "marketing", label: lang === "de" ? "\u{1F680} Brand Activation" : "\u{1F680} Brand Activation", panel: marketingPanel }
    ];
  })() : null;
  return /* @__PURE__ */ React.createElement("div", { className: "case-study-wrapper has-scroll-layout" }, /* @__PURE__ */ React.createElement("div", { className: "case-study-container" }, vintedRewindTabs ? /* @__PURE__ */ React.createElement(
    CaseScrollLayout,
    {
      prevProj,
      nextProj,
      openWindow,
      lang,
      miniTitle: d.title,
      miniDek: d.description || d.problemShort,
      introBlock,
      sections: vintedRewindTabs.map((tab) => ({
        id: tab.id,
        label: tab.label.replace(/^\p{Emoji}+\s*/u, "").toLowerCase(),
        chapterTitle: tab.label.replace(/^\p{Emoji}+\s*/u, ""),
        content: tab.panel
      }))
    }
  ) : /* @__PURE__ */ React.createElement(
    CaseScrollLayout,
    {
      prevProj,
      nextProj,
      openWindow,
      lang,
      miniTitle: d.title,
      miniDek: d.description || d.problemShort,
      introBlock,
      sections: project.id === "soulsphere" ? [
        {
          id: "results",
          label: "design & outcome",
          chapterTitle: lang === "de" ? "Design & Ergebnis" : "Design & Outcome",
          content: /* @__PURE__ */ React.createElement(React.Fragment, null, designPanel, resultsPanel)
        },
        {
          id: "research",
          label: "process",
          chapterTitle: "Research & Testing",
          content: researchPanel
        },
        {
          id: "reflection",
          label: "reflection",
          chapterTitle: "",
          content: reflectionPanel
        }
      ] : [
        {
          id: "results",
          label: "outcome",
          chapterTitle: project.id === "echoes" ? "The Echoes Zone" : "Outcome & Impact",
          content: resultsPanel
        },
        {
          id: "design",
          label: "identity & design",
          chapterTitle: "Identity & Design",
          content: designPanel
        },
        {
          id: "research",
          label: "process",
          chapterTitle: lang === "de" ? "Process & Research" : "Process & Research",
          content: researchPanel
        },
        {
          id: "reflection",
          label: "reflection",
          chapterTitle: "",
          /* heading lives inside the lilac field instead */
          content: reflectionPanel
        }
      ]
    }
  )));
}
function ProjectsOverview({ t, lang, openProject }) {
  const projects = PROJECTS.filter((p) => p.status === "completed" || p.status === "wip");
  const completed = projects.filter((p) => p.status === "completed");
  const wips = projects.filter((p) => p.status === "wip");
  const ordered = [...completed, ...wips];
  return /* @__PURE__ */ React.createElement("div", { className: "projects-content" }, /* @__PURE__ */ React.createElement("div", { className: "projects-header" }, /* @__PURE__ */ React.createElement("h2", { className: "projects-title" }, lang === "de" ? "\u{1F4C1} Meine Projekte" : "\u{1F4C1} My Projects"), /* @__PURE__ */ React.createElement("p", { className: "projects-subtitle" }, lang === "de" ? `${projects.length} Projekte \xB7 Doppelklick um zu \xF6ffnen` : `${projects.length} projects \xB7 Double-click to open`)), /* @__PURE__ */ React.createElement("div", { className: "projects-simple-grid" }, ordered.map((project) => {
    var _a;
    const d = project[lang];
    const isWip = project.status === "wip";
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: project.id,
        className: `project-grid-item ${isWip ? "project-grid-item--wip" : ""}`,
        role: "button",
        tabIndex: 0,
        onClick: () => openProject(project.id),
        onDoubleClick: () => openProject(project.id),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openProject(project.id);
          }
        },
        title: d.title
      },
      /* @__PURE__ */ React.createElement("div", { className: "project-grid-icon", "aria-hidden": "true" }, project.emoji),
      /* @__PURE__ */ React.createElement("p", { className: "project-grid-name" }, d.title),
      ((_a = d.roleChips) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ React.createElement("div", { className: "project-grid-chips" }, d.roleChips.slice(0, 2).map((chip, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "project-grid-chip" }, chip))),
      isWip && /* @__PURE__ */ React.createElement("span", { className: "project-grid-wip-badge" }, "\u{1F504} ", lang === "de" ? "In Arbeit" : "In Progress")
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "projects-footer" }, /* @__PURE__ */ React.createElement("small", null, lang === "de" ? "Klick oder Doppelklick um eine Case Study zu \xF6ffnen" : "Click or double-click to open a case study")));
}
function SkillsContent({ t, lang }) {
  const s = t.skills;
  return /* @__PURE__ */ React.createElement("div", { className: "content" }, /* @__PURE__ */ React.createElement("h1", null, t.skills_section), /* @__PURE__ */ React.createElement("p", { className: "mono" }, lang === "de" ? "Was ich auf dem Tisch habe, kein Skill-Slop, nur ehrlich gewichtet." : "What I actually bring, no skill slop, honestly weighted."), /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Selbsteinsch\xE4tzung" : "Self-assessment"), t.skill_bars.map((b, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "skill-row" }, /* @__PURE__ */ React.createElement("div", null, b.label), /* @__PURE__ */ React.createElement("div", { className: "bar" }, /* @__PURE__ */ React.createElement("div", { style: { width: `${b.pct}%` } })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, b.pct))), /* @__PURE__ */ React.createElement("h2", null, t.methods), /* @__PURE__ */ React.createElement("div", { className: "tag-row" }, s.methods.map((x) => /* @__PURE__ */ React.createElement("span", { key: x, className: "chip" }, x))), /* @__PURE__ */ React.createElement("h2", null, t.tools), /* @__PURE__ */ React.createElement("div", { className: "tag-row" }, s.tools.map((x) => /* @__PURE__ */ React.createElement("span", { key: x, className: "chip blue" }, x))), /* @__PURE__ */ React.createElement("h2", null, t.languages), /* @__PURE__ */ React.createElement("ul", null, s.langs.map((x, i) => /* @__PURE__ */ React.createElement("li", { key: i }, x))), /* @__PURE__ */ React.createElement("h2", null, t.soft_skills), /* @__PURE__ */ React.createElement("div", { className: "tag-row" }, s.soft.map((x) => /* @__PURE__ */ React.createElement("span", { key: x, className: "chip pink" }, x))));
}
function CVContent({ t, lang, onDownload }) {
  return /* @__PURE__ */ React.createElement("div", { className: "content" }, /* @__PURE__ */ React.createElement("h1", null, t.cv_section), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { className: "pix-btn primary", onClick: onDownload }, "\u2B07 ", t.download_cv), /* @__PURE__ */ React.createElement("a", { className: "pix-btn", href: `mailto:${NURIA.email}` }, "\u2709 ", NURIA.email)), t.timeline_items.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "cv-row" }, /* @__PURE__ */ React.createElement("div", { className: "cv-year" }, it.year), /* @__PURE__ */ React.createElement("div", { className: "cv-body" }, /* @__PURE__ */ React.createElement("strong", null, it.title), /* @__PURE__ */ React.createElement("p", null, it.body)))));
}
function timelineCat(title) {
  if (/Colegio|Spanien|Andalusien|exchange|Auslandsj/i.test(title)) return "ausland";
  if (/B\.Sc|Abitur|Hochschule|Bachelor|Therese|Klasse|Computer Science|Informatik/i.test(title)) return "studium";
  return "job";
}
const LANGS = [
  { code: "ES", flag: "\u{1F1EA}\u{1F1F8}", label_de: "Spanisch", label_en: "Spanish", level_de: "Muttersprache", level_en: "native", pct: 100 },
  { code: "DE", flag: "\u{1F1E9}\u{1F1EA}", label_de: "Deutsch", label_en: "German", level_de: "Flie\xDFend", level_en: "fluent", pct: 95 },
  { code: "EN", flag: "\u{1F1EC}\u{1F1E7}", label_de: "Englisch", label_en: "English", level_de: "B2", level_en: "B2", pct: 70 },
  { code: "IT", flag: "\u{1F1EE}\u{1F1F9}", label_de: "Italienisch", label_en: "Italian", level_de: "A1", level_en: "A1", pct: 25 }
];
function AboutEditorIntro({ lang, tagline }) {
  const full = tagline || "";
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    setN(0);
    let i = 0, id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= full.length) clearInterval(id);
      }, 34);
    }, 350);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [full]);
  const done = n >= full.length;
  return /* @__PURE__ */ React.createElement("div", { className: "case-intro-block about-editor" }, /* @__PURE__ */ React.createElement("div", { className: "about-editor-menubar", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "about-editor-dot r" }), /* @__PURE__ */ React.createElement("span", { className: "about-editor-dot y" }), /* @__PURE__ */ React.createElement("span", { className: "about-editor-dot g" }), /* @__PURE__ */ React.createElement("span", { className: "about-editor-menus" }, lang === "de" ? "Datei  Bearbeiten  Ansicht  Hilfe" : "File  Edit  View  Help"), /* @__PURE__ */ React.createElement("span", { className: "about-editor-fname" }, "About_Me.txt")), /* @__PURE__ */ React.createElement("div", { className: "about-editor-body about-editor-cols" }, /* @__PURE__ */ React.createElement("div", { className: "about-editor-text" }, /* @__PURE__ */ React.createElement("h1", { className: "case-intro-title" }, lang === "de" ? `Hallo, ich bin ${NURIA.name}` : `Hi, I'm ${NURIA.name}`), /* @__PURE__ */ React.createElement("p", { className: "case-intro-desc about-editor-line" }, full.slice(0, n), /* @__PURE__ */ React.createElement("span", { className: "tw-caret" + (done ? " is-blink" : ""), "aria-hidden": "true" }, "\u258B")), /* @__PURE__ */ React.createElement("div", { className: "case-intro-tags" }, /* @__PURE__ */ React.createElement("span", { className: "case-intro-tag" }, "\u{1F4CD} ", NURIA.location), /* @__PURE__ */ React.createElement("span", { className: "case-intro-tag" }, "\u{1F4C5} WS 26/27"), /* @__PURE__ */ React.createElement("span", { className: "case-intro-tag" }, "UX/UI"), /* @__PURE__ */ React.createElement("span", { className: "case-intro-tag" }, "Service Design"), /* @__PURE__ */ React.createElement("span", { className: "case-intro-tag" }, "B.Sc. HM M\xFCnchen"))), /* @__PURE__ */ React.createElement("div", { className: "about-portrait" }, /* @__PURE__ */ React.createElement("img", { src: NURIA.pixelPhoto || NURIA.photo, alt: NURIA.name }), /* @__PURE__ */ React.createElement("span", { className: "about-portrait-bubble", "aria-hidden": "true" }, "\xA1Hola! \u{1F44B}"))), /* @__PURE__ */ React.createElement("div", { className: "about-editor-statusbar", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: done ? "" : "is-typing" }, done ? lang === "de" ? "Bereit" : "Ready" : lang === "de" ? "Schreibt\u2026" : "Typing\u2026"), /* @__PURE__ */ React.createElement("span", null, lang === "de" ? "Zeile" : "Ln", " 3, ", lang === "de" ? "Spalte" : "Col", " ", n + 1), /* @__PURE__ */ React.createElement("span", null, "UTF-8"), /* @__PURE__ */ React.createElement("span", null, lang === "de" ? "DE" : "EN"), /* @__PURE__ */ React.createElement("span", null, "100%")));
}
function CvMap({ items, pixelSrc }) {
  const stageRef = React.useRef(null);
  const nodeRefs = React.useRef([]);
  const pathRef = React.useRef(null);
  const markerRef = React.useRef(null);
  const [geo, setGeo] = React.useState({ w: 0, h: 0, d: "" });
  const measure = React.useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const sb = stage.getBoundingClientRect();
    const pts = [];
    nodeRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      pts.push({ x: r.left + r.width / 2 - sb.left, y: r.top + r.height / 2 - sb.top });
    });
    setGeo({ w: sb.width, h: sb.height, d: smoothRoute(pts) });
  }, []);
  React.useEffect(() => {
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro && stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure, items]);
  React.useEffect(() => {
    const path = pathRef.current;
    const marker = markerRef.current;
    const stage = stageRef.current;
    if (!path || !marker || !stage || !geo.d) return;
    let len = 0;
    try {
      len = path.getTotalLength();
    } catch (e) {
      return;
    }
    if (!len) return;
    const scrollRoot = stage.closest(".case-study-container");
    const scroller = scrollRoot || window;
    let ticking = false;
    const update = () => {
      ticking = false;
      const sb = stage.getBoundingClientRect();
      const rootRect = scrollRoot ? scrollRoot.getBoundingClientRect() : { top: 0, height: window.innerHeight };
      const line = rootRect.top + rootRect.height * 0.5;
      const p = Math.max(0, Math.min(1, (line - sb.top) / (sb.height || 1)));
      const pt = path.getPointAtLength(p * len);
      marker.style.transform = `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [geo]);
  if (!items || items.length === 0) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "cvmap", ref: stageRef }, /* @__PURE__ */ React.createElement("svg", { className: "cvmap-path", width: geo.w, height: geo.h, "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { ref: pathRef, d: geo.d })), items.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "cvmap-station", "data-side": i % 2 === 0 ? "left" : "right", "data-cat": timelineCat(it.title) }, /* @__PURE__ */ React.createElement("span", { className: "cvmap-node", ref: (el) => {
    nodeRefs.current[i] = el;
  } }), /* @__PURE__ */ React.createElement("div", { className: "cvmap-card reveal" }, /* @__PURE__ */ React.createElement("span", { className: "cvmap-year" }, it.year), /* @__PURE__ */ React.createElement("strong", null, it.title), /* @__PURE__ */ React.createElement("p", null, it.body)))), /* @__PURE__ */ React.createElement("img", { className: "cvmap-walker", ref: markerRef, src: pixelSrc, alt: "", "aria-hidden": "true" }));
}
function PixelDissolve({ cols = 30, rows = 7, color }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const threshold = Math.pow(r / (rows - 1), 1.8);
      const h = Math.sin(r * 127.1 + c * 311.7) * 43758.5453;
      const rnd = h - Math.floor(h);
      if (r === rows - 1 || rnd < threshold) {
        cells.push(/* @__PURE__ */ React.createElement("span", { key: `${r}-${c}`, style: { gridColumn: c + 1, gridRow: r + 1, background: color } }));
      }
    }
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "touch-dissolve",
      "aria-hidden": "true",
      style: { gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, aspectRatio: `${cols} / ${rows}` }
    },
    cells
  );
}
function DvdBouncer() {
  const wrapRef = React.useRef(null);
  const elRef = React.useRef(null);
  React.useEffect(() => {
    const wrap = wrapRef.current;
    const el = elRef.current;
    if (!wrap || !el) return;
    const colors = ["#7FA7DA", "#F2E59E", "#E8C1D3", "#8FB39A", "#CF5E66", "#FFFFFF"];
    let ci = 0;
    let x = 24, y = 18;
    let vx = 0.85, vy = 0.7;
    let raf;
    const step = () => {
      const W = wrap.clientWidth, H = wrap.clientHeight;
      const w = el.offsetWidth, h = el.offsetHeight;
      if (W && H) {
        x += vx;
        y += vy;
        let bounced = false;
        if (x <= 0) {
          x = 0;
          vx = Math.abs(vx);
          bounced = true;
        } else if (x + w >= W) {
          x = W - w;
          vx = -Math.abs(vx);
          bounced = true;
        }
        if (y <= 0) {
          y = 0;
          vy = Math.abs(vy);
          bounced = true;
        } else if (y + h >= H) {
          y = H - h;
          vy = -Math.abs(vy);
          bounced = true;
        }
        if (bounced) {
          ci = (ci + 1) % colors.length;
          el.style.backgroundColor = colors[ci];
        }
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "dvd-stage", ref: wrapRef, "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "dvd-badge", ref: elRef }));
}
function ScrollProgress() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    var _a;
    const bar = ref.current;
    if (!bar) return;
    const scroller = (_a = bar.closest(".case-study-wrapper")) == null ? void 0 : _a.querySelector(".case-study-container");
    if (!scroller) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = scroller.scrollHeight - scroller.clientHeight;
      const p = max > 0 ? scroller.scrollTop / max : 0;
      bar.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "about-progress", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("div", { className: "about-progress-fill", ref }));
}
function TouchContactPanel({ t, lang, cols = 28 }) {
  const [copied, setCopied] = React.useState(false);
  const copyMail = () => {
    var _a;
    try {
      (_a = navigator.clipboard) == null ? void 0 : _a.writeText(NURIA.email);
    } catch (e) {
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return /* @__PURE__ */ React.createElement("section", { className: "touch" }, /* @__PURE__ */ React.createElement(PixelDissolve, { cols, rows: 7, color: "var(--touch-bg)" }), /* @__PURE__ */ React.createElement("div", { className: "touch-body" }, /* @__PURE__ */ React.createElement(DvdBouncer, null), /* @__PURE__ */ React.createElement("div", { className: "touch-content" }, /* @__PURE__ */ React.createElement("h2", { className: "touch-title" }, "LET'S GET", /* @__PURE__ */ React.createElement("br", null), "IN TOUCH"), /* @__PURE__ */ React.createElement("div", { className: "touch-rows" }, /* @__PURE__ */ React.createElement("div", { className: "touch-row" }, /* @__PURE__ */ React.createElement("span", { className: "touch-k" }, "[ E-MAIL ]"), /* @__PURE__ */ React.createElement("a", { className: "touch-v", href: `mailto:${NURIA.email}`, onClick: copyMail }, NURIA.email)), /* @__PURE__ */ React.createElement("div", { className: "touch-row" }, /* @__PURE__ */ React.createElement("span", { className: "touch-k" }, "[ LINKEDIN ]"), /* @__PURE__ */ React.createElement("a", { className: "touch-v", href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, NURIA.linkedin)), NURIA.phone && /* @__PURE__ */ React.createElement("div", { className: "touch-row" }, /* @__PURE__ */ React.createElement("span", { className: "touch-k" }, "[ ", lang === "de" ? "TELEFON" : "PHONE", " ]"), /* @__PURE__ */ React.createElement("a", { className: "touch-v", href: `tel:${NURIA.phone.replace(/\s+/g, "")}` }, NURIA.phone)), /* @__PURE__ */ React.createElement("div", { className: "touch-row" }, /* @__PURE__ */ React.createElement("span", { className: "touch-k" }, "[ ", lang === "de" ? "STANDORT" : "LOCATION", " ]"), /* @__PURE__ */ React.createElement("span", { className: "touch-v touch-v-static" }, NURIA.location))), /* @__PURE__ */ React.createElement("div", { className: "touch-cta" }, /* @__PURE__ */ React.createElement("a", { className: "touch-btn", href: `mailto:${NURIA.email}`, onClick: copyMail }, "\u2709 ", t.contact_cta), /* @__PURE__ */ React.createElement("a", { className: "touch-btn ghost", href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, "in LinkedIn"), /* @__PURE__ */ React.createElement("a", { className: "touch-btn ghost", href: "assets/Nuria_Kurrle_CV.pdf", download: true }, "\u2B07 ", t.download_cv)), /* @__PURE__ */ React.createElement("p", { className: "touch-copied", "aria-live": "polite" }, copied ? lang === "de" ? "\u2713 E-Mail kopiert, f\xFCg sie in dein Mailprogramm ein" : "\u2713 Email copied, paste it into your mail app" : ""))));
}
function AboutContactPanel({ t, lang, onProjects }) {
  const [copied, setCopied] = React.useState(false);
  const copyMail = () => {
    var _a;
    try {
      (_a = navigator.clipboard) == null ? void 0 : _a.writeText(NURIA.email);
    } catch (e) {
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "about-contact" }, /* @__PURE__ */ React.createElement("p", { className: "about-lede" }, lang === "de" ? "Lust auf Zusammenarbeit? Ob Praxissemester, ein gemeinsames Service-Design-Projekt oder der Einstieg in euer Team, schreib mir gern. Ich antworte schnell und freue mich darauf, mit euch etwas aufzubauen." : "Want to work together? Whether it's a practical semester, a joint service-design project or joining your team, drop me a line. I reply fast and would love to build something with you."), /* @__PURE__ */ React.createElement("div", { className: "about-block" }, /* @__PURE__ */ React.createElement("span", { className: "about-block-label" }, lang === "de" ? "Kontakt" : "Contact"), /* @__PURE__ */ React.createElement("div", { className: "about-facts about-contact-facts" }, /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "E-Mail" : "Email"), /* @__PURE__ */ React.createElement("a", { className: "about-fact-v about-contact-link", href: `mailto:${NURIA.email}`, onClick: copyMail }, NURIA.email)), /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, "LinkedIn"), /* @__PURE__ */ React.createElement("a", { className: "about-fact-v about-contact-link", href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, NURIA.linkedin)), NURIA.phone && /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Telefon" : "Phone"), /* @__PURE__ */ React.createElement("a", { className: "about-fact-v about-contact-link", href: `tel:${NURIA.phone.replace(/\s+/g, "")}` }, NURIA.phone)), /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Ort" : "Location"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, NURIA.location)))), /* @__PURE__ */ React.createElement("div", { className: "about-contact-cta" }, /* @__PURE__ */ React.createElement("a", { className: "about-cta-btn", href: `mailto:${NURIA.email}`, onClick: copyMail }, "\u2709 ", t.contact_cta), /* @__PURE__ */ React.createElement("a", { className: "about-cta-btn ghost", href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, "in LinkedIn"), /* @__PURE__ */ React.createElement("a", { className: "about-cta-btn ghost", href: "assets/Nuria_Kurrle_CV.pdf", download: true }, "\u2B07 ", t.download_cv), onProjects && /* @__PURE__ */ React.createElement("button", { className: "about-cta-btn ghost", type: "button", onClick: onProjects }, lang === "de" ? "Projekte ansehen" : "See projects", " \u2192")), /* @__PURE__ */ React.createElement("p", { className: "about-contact-copied", "aria-live": "polite" }, copied ? lang === "de" ? "\u2713 E-Mail kopiert, f\xFCg sie in dein Mailprogramm ein" : "\u2713 Email copied, paste it into your mail app" : ""));
}
function AboutContent({ t, lang, openWindow, closeWindow }) {
  const aboutIntroBlock = /* @__PURE__ */ React.createElement(AboutEditorIntro, { lang, tagline: t.tagline });
  const profilPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content about-profile" }, /* @__PURE__ */ React.createElement("p", { className: "about-lede" }, lang === "de" ? "Informatik- & Design-Studentin an der Hochschule M\xFCnchen mit gro\xDFem Interesse an UX, Service Design & Research, aus Argentinien, heute in M\xFCnchen zuhause. Mehrsprachig und neugierig: Ich verstehe echte Probleme durch echte Forschung und \xFCbersetze sie in klare, menschliche L\xF6sungen, von der ersten Journey Map bis zum lebenden Prototyp im Code." : "Computer science & design student at Munich UAS with a strong interest in UX, service design & research, from Argentina, now at home in Munich. Multilingual and curious: I understand real problems through genuine research and turn them into clear, human solutions, from the first journey map to a living prototype in code."), /* @__PURE__ */ React.createElement("div", { className: "about-block" }, /* @__PURE__ */ React.createElement("span", { className: "about-block-label" }, lang === "de" ? "Was ich suche" : "What I'm looking for"), /* @__PURE__ */ React.createElement("div", { className: "about-facts" }, /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Position" : "Position"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, lang === "de" ? "Praxissemester \xB7 UX / Service Design" : "Practical semester \xB7 UX / Service Design")), /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Zeit" : "Time"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, "WS 26/27")), /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Ort" : "Location"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, lang === "de" ? "M\xFCnchen" : "Munich")), /* @__PURE__ */ React.createElement("div", { className: "about-fact" }, /* @__PURE__ */ React.createElement("span", { className: "about-fact-k" }, lang === "de" ? "Mindset" : "Mindset"), /* @__PURE__ */ React.createElement("span", { className: "about-fact-v" }, lang === "de" ? "Research first, dann designen & coden" : "Research first, then design & code")))), /* @__PURE__ */ React.createElement("div", { className: "about-block" }, /* @__PURE__ */ React.createElement("span", { className: "about-block-label" }, lang === "de" ? "Abseits der Arbeit" : "Off the clock"), /* @__PURE__ */ React.createElement("div", { className: "interest-chips" }, [
    { e: "\u{1F1E6}\u{1F1F7}", de: "Aus Argentinien", en: "From Argentina" },
    { e: "\u{1F3AC}", de: "Filme schauen & reviewen", en: "Watching & reviewing films" },
    { e: "\u{1F3A7}", de: "Immer Musik im Ohr", en: "Always music on" },
    { e: "\u{1F9C1}", de: "Backt, um anderen eine Freude zu machen", en: "Bakes to make people happy" },
    { e: "\u{1F389}", de: "Organisiert gern Geburtstage & kleine Events", en: "Loves organizing birthdays & small events" },
    { e: "\u{1F4FC}", de: "Hoffnungslos nostalgisch", en: "Hopelessly nostalgic" }
  ].map((x, i) => /* @__PURE__ */ React.createElement("span", { className: "interest-chip", key: i }, /* @__PURE__ */ React.createElement("span", { className: "interest-chip-e", "aria-hidden": "true" }, x.e), lang === "de" ? x.de : x.en)))));
  const skillGroups = [
    {
      title: lang === "de" ? "Design" : "Design",
      items: [
        { logo: "figma_logo.png", name: "Figma" },
        { logo: "ui_ux_logo.png", name: "UI/UX Design" },
        { logo: "adobe_illustrator.png", name: "Illustrator" }
      ]
    },
    {
      title: lang === "de" ? "Entwicklung" : "Development",
      items: [
        { logo: "react_logo.png", name: "React" },
        { logo: "html_css_logo.png", name: "HTML / CSS" },
        { logo: "nodejs_logo.png", name: "Node.js" },
        { logo: "python.png", name: "Python" }
      ]
    },
    {
      title: lang === "de" ? "Tools & AI" : "Tools & AI",
      items: [
        { logo: "n8n_logo.png", name: "n8n" },
        { logo: "docker_logo.png", name: "Docker" },
        { logo: "openai.png", name: "OpenAI" }
      ]
    }
  ];
  const skillsPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content" }, skillGroups.map((g, gi) => /* @__PURE__ */ React.createElement("section", { className: "skills-section", key: gi }, /* @__PURE__ */ React.createElement("h3", { className: "skills-group-h" }, g.title), /* @__PURE__ */ React.createElement("div", { className: "skills-logo-grid" }, g.items.map((s, i) => /* @__PURE__ */ React.createElement("div", { className: "skill-logo-card reveal", key: i }, /* @__PURE__ */ React.createElement("img", { src: `assets/logos/${s.logo}`, alt: s.name, loading: "lazy" }), /* @__PURE__ */ React.createElement("span", null, s.name)))))), /* @__PURE__ */ React.createElement("section", { className: "skills-section" }, /* @__PURE__ */ React.createElement("h3", { className: "skills-group-h" }, lang === "de" ? "Sprachen" : "Languages"), /* @__PURE__ */ React.createElement("div", { className: "skills-logo-grid" }, LANGS.map((l) => /* @__PURE__ */ React.createElement("div", { className: "skill-logo-card skill-lang-card reveal", key: l.code }, /* @__PURE__ */ React.createElement("span", { className: "skill-lang-flag", "aria-hidden": "true" }, l.flag), /* @__PURE__ */ React.createElement("span", null, l[`label_${lang}`]), /* @__PURE__ */ React.createElement("span", { className: "skill-lang-level" }, l[`level_${lang}`]))))));
  const cvPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content" }, /* @__PURE__ */ React.createElement(CvMap, { items: t.timeline_items, pixelSrc: NURIA.pixelPhoto || NURIA.photo }));
  const kontaktPanel = /* @__PURE__ */ React.createElement("div", { className: "tab-content" }, /* @__PURE__ */ React.createElement(
    AboutContactPanel,
    {
      t,
      lang,
      onProjects: openWindow ? () => {
        openWindow("recruiter");
        closeWindow && closeWindow("about");
      } : void 0
    }
  ));
  return /* @__PURE__ */ React.createElement("div", { className: "case-study-wrapper has-scroll-layout about-window" }, /* @__PURE__ */ React.createElement(ScrollProgress, null), /* @__PURE__ */ React.createElement("div", { className: "case-study-container" }, /* @__PURE__ */ React.createElement(
    CaseScrollLayout,
    {
      noProjectNav: true,
      openWindow,
      lang,
      miniTitle: lang === "de" ? "about_me" : "about_me",
      miniDek: lang === "de" ? "UX/UI & Service Design Studentin \xB7 HM M\xFCnchen" : "UX/UI & Service Design student \xB7 HM Munich",
      introBlock: aboutIntroBlock,
      sections: [
        { id: "profile", label: lang === "de" ? "profil" : "profile", chapterTitle: lang === "de" ? "\xDCber mich" : "About me", content: profilPanel },
        { id: "skills", label: lang === "de" ? "skills" : "skills", chapterTitle: lang === "de" ? "Skills & Tools" : "Skills & Tools", content: skillsPanel },
        { id: "background", label: lang === "de" ? "werdegang" : "background", chapterTitle: lang === "de" ? "Werdegang" : "Background", content: cvPanel },
        { id: "contact", label: lang === "de" ? "kontakt" : "contact", chapterTitle: "", content: kontaktPanel }
      ]
    }
  )));
}
function ContactContent({ t, lang }) {
  return /* @__PURE__ */ React.createElement("div", { className: "content contact-exe" }, /* @__PURE__ */ React.createElement(TouchContactPanel, { t, lang, cols: 26 }));
}
function DashProfile({ t, lang }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { className: "dash-profile-hero" }, /* @__PURE__ */ React.createElement("div", { className: "dash-profile-photo" }, /* @__PURE__ */ React.createElement("img", { src: NURIA.photo, alt: NURIA.name })), /* @__PURE__ */ React.createElement("div", { className: "dash-profile-text" }, /* @__PURE__ */ React.createElement("h1", null, NURIA.name), /* @__PURE__ */ React.createElement("div", { className: "dash-profile-tag mono" }, t.role), /* @__PURE__ */ React.createElement("div", { className: "dash-pill-row" }, /* @__PURE__ */ React.createElement("span", { className: "dash-pill dash-pill-mint" }, "\u25CF ", t.availability), /* @__PURE__ */ React.createElement("span", { className: "dash-pill" }, "\u{1F4CD} ", NURIA.location), /* @__PURE__ */ React.createElement("span", { className: "dash-pill" }, "\u{1F310} ES \xB7 DE \xB7 EN \xB7 IT")))), /* @__PURE__ */ React.createElement("h2", null, lang === "de" ? "Wer ich bin" : "Who I am"), /* @__PURE__ */ React.createElement("p", null, t.recruiter_intro), /* @__PURE__ */ React.createElement("p", { style: { fontStyle: "italic", color: "var(--ink-soft)" } }, t.recruiter_quote || t.tagline), /* @__PURE__ */ React.createElement("h2", null, t.why_me), /* @__PURE__ */ React.createElement("ul", null, t.why_bullets.map((b, i) => /* @__PURE__ */ React.createElement("li", { key: i }, b))));
}
function DashProjects({ t, lang, openWindow }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { className: "mono", style: { margin: "0 0 14px", color: "var(--ink-soft)" } }, lang === "de" ? `${PROJECTS.length} Case Studies, klick \xF6ffnet Vollansicht.` : `${PROJECTS.length} case studies, click to open full view.`), /* @__PURE__ */ React.createElement("div", { className: "project-list" }, PROJECTS.map((p, i) => {
    var _a;
    const d = p[lang];
    const stack = (((_a = p.devLog) == null ? void 0 : _a.stack) || d.tools || []).slice(0, 4).join(" \xB7 ");
    return /* @__PURE__ */ React.createElement("button", { key: p.id, className: "project-row", onClick: () => openWindow(p.id) }, /* @__PURE__ */ React.createElement("span", { className: "project-row-id" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", { className: "project-row-body" }, /* @__PURE__ */ React.createElement("h3", null, p.emoji, " ", d.title), /* @__PURE__ */ React.createElement("p", null, d.solutionShort || d.problemShort), /* @__PURE__ */ React.createElement("div", { className: "project-row-meta mono" }, d.duration, " \xB7 ", d.role, stack ? ` \xB7 ${stack}` : "")), /* @__PURE__ */ React.createElement("span", { className: "project-row-arrow" }, "\u2192"));
  })));
}
function DashExperience({ t, lang, onDownloadCV }) {
  const [cvFilter, setCvFilter] = useStateW("all");
  const CV_FILTERS = [
    { id: "all", label_de: "Alle", label_en: "All" },
    { id: "studium", label_de: "\u{1F393} Studium", label_en: "\u{1F393} Studies" },
    { id: "job", label_de: "\u{1F4BC} Job", label_en: "\u{1F4BC} Work" },
    { id: "ausland", label_de: "\u2708 Ausland", label_en: "\u2708 Abroad" }
  ];
  const items = cvFilter === "all" ? t.timeline_items : t.timeline_items.filter((it) => timelineCat(it.title) === cvFilter);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "cv-toolbar" }, /* @__PURE__ */ React.createElement("button", { className: "pix-btn primary", onClick: onDownloadCV }, "\u2B07 ", t.download_cv), /* @__PURE__ */ React.createElement("div", { className: "cv-filters" }, CV_FILTERS.map((f) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: f.id,
      type: "button",
      className: `cv-filter-chip ${cvFilter === f.id ? "on" : ""}`,
      onClick: () => setCvFilter(f.id)
    },
    f[`label_${lang}`]
  )))), items.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "mono", style: { opacity: 0.7 } }, lang === "de" ? "Keine Eintr\xE4ge." : "No entries."), items.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "cv-row", "data-cat": timelineCat(it.title) }, /* @__PURE__ */ React.createElement("div", { className: "cv-year" }, it.year), /* @__PURE__ */ React.createElement("div", { className: "cv-body" }, /* @__PURE__ */ React.createElement("strong", null, it.title), /* @__PURE__ */ React.createElement("p", null, it.body)))));
}
function DashContact({ t, lang, onDownloadCV, openWindow }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "callout" }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { fontSize: 16, lineHeight: 1.8 } }, "\u2709 ", /* @__PURE__ */ React.createElement("a", { href: `mailto:${NURIA.email}` }, NURIA.email), /* @__PURE__ */ React.createElement("br", null), "in ", /* @__PURE__ */ React.createElement("a", { href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, NURIA.linkedin), /* @__PURE__ */ React.createElement("br", null), NURIA.phone && /* @__PURE__ */ React.createElement(React.Fragment, null, "\u{1F4DE} ", /* @__PURE__ */ React.createElement("a", { href: `tel:${NURIA.phone.replace(/\s+/g, "")}` }, NURIA.phone), /* @__PURE__ */ React.createElement("br", null)), "\u{1F4CD} ", NURIA.location), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { className: "pix-btn primary", href: `mailto:${NURIA.email}?subject=${encodeURIComponent(lang === "de" ? "Praxissemester WS 26/27, Nuria Kurrle" : "Internship Fall 26 / Spring 27, Nuria Kurrle")}` }, "\u2709 ", t.contact_cta), /* @__PURE__ */ React.createElement("a", { className: "pix-btn", href: `https://${NURIA.linkedin}`, target: "_blank", rel: "noreferrer" }, "in ", t.linkedin_cta), /* @__PURE__ */ React.createElement("button", { className: "pix-btn warn", onClick: onDownloadCV }, "\u2B07 ", t.download_cv), /* @__PURE__ */ React.createElement("button", { className: "pix-btn", onClick: () => openWindow == null ? void 0 : openWindow("quickpitch") }, "\u{1F3AF} ", lang === "de" ? "60-Sek-Pitch" : "60-sec pitch"))), /* @__PURE__ */ React.createElement("div", { className: "callout mint", style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("strong", null, lang === "de" ? "Verf\xFCgbar f\xFCr Praxissemester \xB7 WS 26/27" : "Available for practical semester \xB7 Fall 26 / Spring 27"), /* @__PURE__ */ React.createElement("p", { style: { marginTop: 4 } }, lang === "de" ? "Nur M\xFCnchen. Fokus: UX, Service Design, Research." : "Munich only. Focus: UX, service design, research.")));
}
function DashboardContent({ t, lang, openWindow, onDownloadCV, openLightbox }) {
  return /* @__PURE__ */ React.createElement("div", { className: "content content-tabbed dashboard-content" }, /* @__PURE__ */ React.createElement(
    Tabs,
    {
      idPrefix: "dash",
      defaultId: "profile",
      tabs: [
        { id: "profile", label: lang === "de" ? "\u{1F464} Profil" : "\u{1F464} Profile", panel: /* @__PURE__ */ React.createElement(DashProfile, { t, lang }) },
        { id: "projects", label: lang === "de" ? "\u{1F4C2} Projekte" : "\u{1F4C2} Projects", panel: /* @__PURE__ */ React.createElement(DashProjects, { t, lang, openWindow }) },
        { id: "experience", label: lang === "de" ? "\u{1F558} Werdegang" : "\u{1F558} Experience", panel: /* @__PURE__ */ React.createElement(DashExperience, { t, lang, onDownloadCV }) },
        { id: "contact", label: lang === "de" ? "\u2709 Kontakt" : "\u2709 Contact", panel: /* @__PURE__ */ React.createElement(DashContact, { t, lang, onDownloadCV, openWindow }) }
      ]
    }
  ));
}
function WIPLoadingModal({ project, lang, onClose }) {
  const d = project[lang] || project.de;
  const target = Number.isFinite(d.wipProgress) ? d.wipProgress : project.progress || 50;
  const [progress, setProgress] = useStateW(0);
  React.useEffect(() => {
    let raf;
    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) {
          clearInterval(id);
          return target;
        }
        return Math.min(target, prev + 1 + Math.random() * 6);
      });
    }, 220);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [target]);
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  const shortName = (d.title || "").split(/[—:]/)[0].trim() || d.title;
  const concept = d.wipShortConcept || d.problemShort || "";
  const description = d.wipDescription || d.problemShort || "";
  const phase = d.wipPhase || d.phase || (lang === "de" ? "In Arbeit" : "In progress");
  const eta = d.wipETA || (lang === "de" ? "Bald" : "Soon");
  return /* @__PURE__ */ React.createElement("div", { className: "wip-modal-overlay", onClick: onClose, role: "dialog", "aria-modal": "true", "aria-label": shortName }, /* @__PURE__ */ React.createElement("div", { className: "wip-modal-window", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "wip-title-bar" }, /* @__PURE__ */ React.createElement("div", { className: "wip-title-text" }, "\u23F3 ", shortName, ", ", lang === "de" ? "L\xE4dt\u2026" : "Loading\u2026"), /* @__PURE__ */ React.createElement("button", { className: "wip-close-btn", onClick: onClose, "aria-label": lang === "de" ? "Schlie\xDFen" : "Close" }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "wip-content" }, /* @__PURE__ */ React.createElement("div", { className: "wip-header" }, /* @__PURE__ */ React.createElement("span", { className: "wip-emoji", "aria-hidden": "true" }, project.emoji), /* @__PURE__ */ React.createElement("h2", { className: "wip-concept" }, concept)), /* @__PURE__ */ React.createElement("p", { className: "wip-description" }, description), /* @__PURE__ */ React.createElement("div", { className: "wip-status" }, /* @__PURE__ */ React.createElement("span", { className: "wip-status-badge" }, "\u{1F504} ", phase)), /* @__PURE__ */ React.createElement("div", { className: "wip-progress-container" }, /* @__PURE__ */ React.createElement("div", { className: "wip-progress-bar", role: "progressbar", "aria-valuenow": Math.round(progress), "aria-valuemin": "0", "aria-valuemax": "100" }, /* @__PURE__ */ React.createElement("div", { className: "wip-progress-fill", style: { width: `${progress}%` } })), /* @__PURE__ */ React.createElement("span", { className: "wip-progress-text" }, Math.round(progress), "%")), /* @__PURE__ */ React.createElement("div", { className: "wip-eta" }, /* @__PURE__ */ React.createElement("p", { className: "wip-eta-blink" }, "\u23F3 ", lang === "de" ? "Kommt bald\u2026" : "Coming soon\u2026"), /* @__PURE__ */ React.createElement("p", { className: "wip-eta-date" }, lang === "de" ? "Geplant: " : "Planned: ", /* @__PURE__ */ React.createElement("strong", null, eta)))), /* @__PURE__ */ React.createElement("div", { className: "wip-footer" }, /* @__PURE__ */ React.createElement("button", { className: "wip-ok-btn", onClick: onClose, autoFocus: true }, "OK"))));
}
window.RecruiterContent = RecruiterContent;
window.ProjectContent = ProjectContent;
window.ProjectsOverview = ProjectsOverview;
window.SkillsContent = SkillsContent;
window.CVContent = CVContent;
window.AboutContent = AboutContent;
window.ContactContent = ContactContent;
window.DashboardContent = DashboardContent;
window.WIPLoadingModal = WIPLoadingModal;

})();
