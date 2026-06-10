/* global React, STR, PROJECTS, NURIA, Placeholder, MediaGallery, Tabs */
const { useState: useStateW } = React;

/* LazyVideo — GIF-style autoplay video that only loads + plays once scrolled
   into view (preload="none" + IntersectionObserver). Keeps muted/loop/playsInline
   so it behaves like the old autoPlay videos, but no longer downloads megabytes
   the moment a project opens. Pauses again when scrolled away. */
function LazyVideo({ src, poster, controls = false, loop = false, className, style, onClick }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      if (e.isIntersecting) { const p = el.play(); if (p && p.catch) p.catch(() => {}); }
      else { el.pause(); }
    }, { rootMargin: '200px', threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      controls={controls}
      loop={loop}
      muted
      playsInline
      preload="none"
      className={className}
      style={style}
      onClick={onClick}
    />
  );
}

/* ═════════════════════════════════════════════════════════════════════
   TL;DR CARD — 4-cell case-study summary at the top of every project
   ─────────────────────────────────────────────────────────────────────
   Goal: a recruiter has the whole case study in their head in 10 seconds.
   Problem → My role → Solution → Outcome, in that scan order. */
// TL;DR card removed — replaced by compact overview-first layout.

/* ═════════════════════════════════════════════════════════════════════
   RECRUITER WINDOW — the priority view
═════════════════════════════════════════════════════════════════════ */
function RecruiterContent({ t, lang, openProject, openWindow, closeWindow, onDownloadCV, openLightbox }) {
  /* Marquee projects — curated top 3 in fixed order: Atolls, Echoes, Vinted.
     Anything else falls into the "more projects" footer link. This is the
     Amanda-style index: 3 scannable cards, not the full catalogue. */
  const marqueeIds = ['atolls', 'echoes', 'vinted'];
  const topProjects = marqueeIds
    .map(id => PROJECTS.find(p => p.id === id && p.status === 'completed'))
    .filter(Boolean);
  /* WIPs currently in progress — shown in a separate section below. */
  const wipProjects = PROJECTS.filter(p => p.status === 'wip').slice(0, 3);

  /* Closing transition — used by every project-card click and the
     "view all projects" CTA. The pattern: trigger fade, perform the next
     nav, then close Recruiter once the animation completes. CSS class
     .recruiter-content--closing runs the scale-down + fade. */
  const [closing, setClosing] = React.useState(false);
  const [mailCopied, setMailCopied] = React.useState(false);
  const copyMail = () => {
    try { navigator.clipboard?.writeText(NURIA.email); } catch (e) { /* ignore */ }
    setMailCopied(true);
    setTimeout(() => setMailCopied(false), 1800);
  };
  const handOff = (nav) => {
    if (closing) return;
    setClosing(true);
    if (typeof nav === 'function') nav();
    setTimeout(() => { if (closeWindow) closeWindow('recruiter'); }, 420);
  };
  /* Derive the city from NURIA.location (e.g. "München · Ottobrunn" → "München"). */
  const city = (NURIA.location || '').split('·')[0].trim();

  return (
    <div className={`recruiter-content recruiter-content--landing${closing ? ' recruiter-content--closing' : ''}`}>
      {/* ── HERO IDENTITY — discipline-first ─────────────────────────── */}
      <div className="recruiter-hero">
        <div className="recruiter-portrait">
          <img
            src={NURIA.photo}
            alt={NURIA.name}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="recruiter-intro">
          <span className="about-kicker">UX / SERVICE DESIGN</span>
          <h1 className="recruiter-name">{NURIA.name}</h1>
          <p className="about-lede">{STR[lang].tagline}</p>
          <div className="about-block recruiter-looking">
            <span className="about-block-label">{lang === 'de' ? 'Was ich suche' : "What I'm looking for"}</span>
            <div className="about-facts">
              <div className="about-fact">
                <span className="about-fact-k">{lang === 'de' ? 'Position' : 'Position'}</span>
                <span className="about-fact-v">{lang === 'de' ? 'Praxissemester · UX / Service Design' : 'Internship · UX / Service Design'}</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-k">{lang === 'de' ? 'Zeit' : 'Time'}</span>
                <span className="about-fact-v">WS 26/27 · {city}</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-k">{lang === 'de' ? 'Studium' : 'Studies'}</span>
                <span className="about-fact-v">B.Sc. Informatik &amp; Design · HM München · 4. Sem.</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-k">{lang === 'de' ? 'Mindset' : 'Mindset'}</span>
                <span className="about-fact-v">{lang === 'de' ? 'Research first, dann designen & coden' : 'Research first, then design & code'}</span>
              </div>
            </div>
          </div>
          <div className="recruiter-contact-buttons">
            <a className="recruiter-btn-email" href={`mailto:${NURIA.email}`} onClick={copyMail}>
              ✉ {lang === 'de' ? 'Mail' : 'Email'}
            </a>
            <a className="recruiter-btn-linkedin" href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">
              in LinkedIn
            </a>
            <a className="recruiter-btn-cv" href="assets/Nuria_Kurrle_CV.pdf" download>
              ⬇ CV
            </a>
          </div>
          <p className="recruiter-copied" aria-live="polite">
            {mailCopied
              ? (lang === 'de' ? `✓ E-Mail kopiert: ${NURIA.email}` : `✓ Email copied: ${NURIA.email}`)
              : ' '}
          </p>
        </div>
      </div>

      <div className="recruiter-divider"></div>

      {/* ── MARQUEE PROJECTS — 3 visual cards, vertical stack ───────── */}
      <div className="recruiter-projects-section">
        <h2 className="recruiter-projects-title">
          {lang === 'de' ? 'Ausgewählte Projekte' : 'Selected work'}
        </h2>

        <div className="recruiter-projects-grid recruiter-projects-grid--stack">
          {topProjects.map(project => {
            const d = project[lang];
            /* Trigger fade-out of the landing while the project window opens
               on top, then close Recruiter behind it. */
            const openCase = () => handOff(() => openWindow('project', { projectId: project.id }));
            const roleChips = d.roleChips?.slice(0, 2) || [];
            return (
              <div
                key={project.id}
                className="recruiter-project-card--new"
                onClick={openCase}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(); } }}
                role="button"
                tabIndex={0}
              >
                {/* Hero image with overlay tags. Prefer heroImage (curated
                   product shot) over cover (the icon-sized tile). Falls back
                   to a colored emoji block if both 404. */}
                <div className="recruiter-card-hero">
                  {(d.heroImage || project.cover) ? (
                    <img
                      src={d.heroImage || project.cover}
                      alt={d.title}
                      style={{ objectFit: d.heroImage ? 'cover' : (project.coverFit || 'cover') }}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('recruiter-card-hero--fallback');
                      }}
                    />
                  ) : null}
                  <div className="recruiter-card-hero-fallback-glyph" aria-hidden="true">
                    {project.emoji}
                  </div>
                  <span
                    className="recruiter-card-status"
                    title={project.status === 'completed' ? (lang === 'de' ? 'Abgeschlossen' : 'Completed') : (lang === 'de' ? 'In Arbeit' : 'In progress')}
                    aria-hidden="true"
                  >
                    {project.status === 'completed' ? '✓' : '◐'}
                  </span>
                  <div className="recruiter-card-hero-overlay">
                    <div className="recruiter-card-tags">
                      {roleChips.map((chip, i) => (
                        <span key={i} className="recruiter-chip-tag">{chip}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="recruiter-card-content">
                  <h3 className="recruiter-card-title">{d.title.split('—')[0].trim()}</h3>
                  <p className="recruiter-card-desc">{d.problemShort}</p>

                  {/* Quick meta */}
                  <div className="recruiter-card-footer-meta">
                    {d.duration && (
                      <span className="recruiter-meta-chip">⏱️ {d.duration.split('(')[0].trim()}</span>
                    )}
                    {d.team && (
                      <span className="recruiter-meta-chip">👥 {lang === 'de' ? 'Teamprojekt' : 'Team project'}</span>
                    )}
                  </div>
                </div>

                {/* CTA button */}
                <button
                  className="recruiter-card-cta-new"
                  onClick={(e) => { e.stopPropagation(); openCase(); }}
                >
                  {lang === 'de' ? 'Case Study öffnen →' : 'Open Case Study →'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {wipProjects.length > 0 && (
        <div className="recruiter-section recruiter-section--wip">
          <h3 className="recruiter-section-title">
            🔄 {lang === 'de' ? 'Momentan in Arbeit' : 'Currently in Progress'}
          </h3>
          <p className="recruiter-section-sub mono">
            {lang === 'de'
              ? 'Aktive Projekte — Einblick, nicht das Endprodukt.'
              : 'Active projects — a peek, not the finished story.'}
          </p>

          <div className="recruiter-wip-grid">
            {wipProjects.map(project => {
              const d = project[lang];
              const roleChipsPreview = d.roleChips?.slice(0, 2) || [];
              const openCase = () => handOff(() => openWindow('project', { projectId: project.id }));
              return (
                <div
                  key={project.id}
                  className="recruiter-card recruiter-card--wip"
                  onClick={openCase}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(); } }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="recruiter-card-header">
                    <span className="recruiter-card-emoji">{project.emoji}</span>
                    <div className="recruiter-card-title">
                      <div className="recruiter-card-name">{d.title}</div>
                      <div className="recruiter-card-desc">{d.problemShort}</div>
                    </div>
                  </div>

                  <div className="recruiter-card-meta">
                    {roleChipsPreview.map((chip, i) => (
                      <span key={i} className="recruiter-meta-chip">{chip}</span>
                    ))}
                    {d.duration && <span className="recruiter-meta-chip mono">{d.duration}</span>}
                  </div>

                  <div className="recruiter-card-status">
                    <span className="recruiter-status-badge wip">
                      🔄 {lang === 'de' ? 'In Arbeit' : 'In Progress'}
                    </span>
                    {typeof project.progress === 'number' && (
                      <span className="recruiter-status-progress mono">{project.progress}%</span>
                    )}
                  </div>
                  {typeof project.progress === 'number' && (
                    <div className="recruiter-wip-bar" aria-hidden="true">
                      <div style={{ width: `${project.progress}%` }} />
                    </div>
                  )}

                  <button
                    className="recruiter-card-cta recruiter-card-cta--wip"
                    onClick={(e) => { e.stopPropagation(); openCase(); }}
                  >
                    → {lang === 'de' ? 'Einblick' : 'Preview'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="recruiter-view-all">
        <button
          className="recruiter-view-all-btn"
          onClick={() => handOff(() => openWindow('projects'))}
        >
          {lang === 'de'
            ? '→ Alle Projekte ansehen'
            : '→ View all projects'}
        </button>
      </div>

    </div>
  );
}

/* Signature colour per project — used to tint the prev/next case-study nav
   so each button carries the colour of the project it leads to. */
const PROJECT_ACCENTS = {
  atolls:     '#1F8A8A', /* teal */
  echoes:     '#B0584C', /* terracotta / Moosburg rose */
  vinted:     '#FFB700', /* Retro Yellow — Vinted Rewind palette */
  munichapp:  '#2E78C8', /* Munich blue */
  soulsphere: '#5B4BC4', /* indigo */
  donbosco:   '#2E8B57', /* green */
  clarity:    '#E0853B', /* amber */
};
const accentStyle = (proj) => {
  const c = proj && PROJECT_ACCENTS[proj.id];
  if (!c) return undefined;
  /* Pick dark text on light accents (e.g. Vinted's yellow), white on dark ones. */
  const r = parseInt(c.slice(1, 3), 16), g = parseInt(c.slice(3, 5), 16), b = parseInt(c.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return { background: c, color: luminance > 0.6 ? 'var(--ink)' : '#fff', borderColor: c };
};

/* ─────────────────────────────────────────────────────────────────────
   Single-scroll layout — sticky pill nav with smooth-scroll to sections.
   Buffer-inspired: sections stack vertically; click a pill, page glides.
───────────────────────────────────────────────────────────────────── */
function CaseScrollLayout({ sections, prevProj, nextProj, openWindow, lang, miniTitle, miniDek, introBlock, noProjectNav }) {
  const [activeId, setActiveId] = React.useState(sections[0]?.id);
  const rootRef = React.useRef(null);

  const scrollTo = (id) => {
    setActiveId(id);
    const el = rootRef.current?.querySelector(`#section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* Update active pill based on which section is most visible, + reveal-on-scroll. */
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sectionTargets = sections.map(s => root.querySelector(`#section-${s.id}`)).filter(Boolean);
    const revealTargets = Array.from(root.querySelectorAll('.reveal'));
    if (sectionTargets.length === 0 && revealTargets.length === 0) return;

    /* The case study scrolls inside .case-study-container, not the page. */
    const scrollRoot = root.closest('.case-study-container');

    /* Reveal-on-scroll stays on the observer — it only needs a one-shot trigger. */
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.classList.contains('reveal')) {
          e.target.classList.add('revealed');
        }
      });
    }, { root: scrollRoot || null, threshold: 0.12, rootMargin: '-24px 0px -40% 0px' });
    revealTargets.forEach(t => io.observe(t));

    /* Active pill is picked by geometry, not intersection ratio: tall sections
       never reach a high visible-area ratio, so ratio-based spy skipped them.
       Instead, the active section is the last one whose top has crossed an
       "active line" ~30% down the scroll viewport. Height-independent. */
    const scroller = scrollRoot || window;
    let ticking = false;
    const pickActive = () => {
      ticking = false;
      const rootRect = scrollRoot
        ? scrollRoot.getBoundingClientRect()
        : { top: 0, height: window.innerHeight };
      const line = rootRect.top + rootRect.height * 0.3;
      let currentId = sectionTargets[0]?.id;
      for (const el of sectionTargets) {
        if (el.getBoundingClientRect().top - line <= 0) currentId = el.id;
      }
      if (currentId) setActiveId(currentId.replace(/^section-/, ''));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(pickActive);
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    pickActive();

    return () => {
      io.disconnect();
      scroller.removeEventListener('scroll', onScroll);
    };
  }, [sections]);

  const shortTitle = (p) => (p?.[lang]?.title || '').split('—')[0].trim();

  return (
    <div className="case-scroll-layout" ref={rootRef}>
      {(miniTitle || miniDek) && (
        <header className="case-mini-header">
          {miniTitle && <strong>{miniTitle}</strong>}
          {miniDek && <span className="case-mini-header-dek">— {miniDek}</span>}
        </header>
      )}
      {introBlock && <div className="tab-content case-intro-wrap">{introBlock}</div>}
      {sections.map((s, i) => (
        <section key={s.id} id={`section-${s.id}`} className="case-scroll-section">
          {(s.chapterTitle || sections.length > 1) && (
            <header className="case-chapter">
              <span className="case-chapter-num">
                {String(i + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
              </span>
              {s.chapterTitle && <h2 className="case-chapter-title">{s.chapterTitle}</h2>}
            </header>
          )}
          {s.content}
        </section>
      ))}
      <nav className="case-scroll-nav" aria-label="Section navigation">
        {!noProjectNav && (
          <button
            type="button"
            className="case-scroll-arrow"
            disabled={!prevProj}
            style={accentStyle(prevProj)}
            onClick={() => prevProj && openWindow && openWindow('project', { projectId: prevProj.id })}
            title={prevProj ? prevProj[lang]?.title : ''}
          >
            ← {prevProj ? shortTitle(prevProj) : (lang === 'de' ? 'Vorheriges' : 'Previous')}
          </button>
        )}
        <div className="case-scroll-pills">
          {sections.map(s => (
            <button
              key={s.id}
              type="button"
              className={`case-scroll-pill ${activeId === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        {!noProjectNav && (
          <button
            type="button"
            className="case-scroll-arrow"
            disabled={!nextProj}
            style={accentStyle(nextProj)}
            onClick={() => nextProj && openWindow && openWindow('project', { projectId: nextProj.id })}
            title={nextProj ? nextProj[lang]?.title : ''}
          >
            {nextProj ? shortTitle(nextProj) : (lang === 'de' ? 'Fertig' : 'Done')} →
          </button>
        )}
      </nav>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   SYSTEM JOURNEY — "a path through the network", drawn as a map route.
   The images are stops down a winding, hand-drawn dashed trail; a Moosburg-
   rose pin marks each stop. Stops alternate left/right so the trail weaves.
   The dashed <path> is a smooth Catmull-Rom curve through the pin tips, whose
   positions are measured in JS (ResizeObserver + onLoad) so it stays glued to
   the pins on any width. */
/* Split a sentence into [bold lead, rest] for the reflection prose: the lead is
   the first clause up to the first ". " (kept) or " — " (split on the dash). */
function splitLead(text) {
  const dot = text.indexOf('. ');
  const dash = text.indexOf(' — ');
  let idx = -1;
  if (dot !== -1 && (dash === -1 || dot < dash)) idx = dot + 1;   // include the period
  else if (dash !== -1) idx = dash;                                // dash kept in the rest
  if (idx === -1) return [text, ''];
  return [text.slice(0, idx), text.slice(idx).trim()];
}

function smoothRoute(pts) {
  if (pts.length < 2) return '';
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
  const [geo, setGeo] = React.useState({ w: 0, h: 0, d: '' });

  const measure = React.useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const sb = stage.getBoundingClientRect();
    const pts = [];
    pinRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      // anchor at the rose centre so the trail threads through each marker.
      pts.push({ x: r.left + r.width / 2 - sb.left, y: r.top + r.height / 2 - sb.top });
    });
    setGeo({ w: sb.width, h: sb.height, d: smoothRoute(pts) });
  }, []);

  React.useEffect(() => {
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro && stageRef.current) ro.observe(stageRef.current);
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 450); // settle after fonts/images load
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, [measure, images]);

  const items = images.map((it) => ({ type: 'image', src: it.src, caption: it.caption || '' }));

  return (
    <section className="case-section system-journey-section">
      {title && <h3>{title}</h3>}
      {intro && <p className="journey-intro">{intro}</p>}
      <div className="system-journey" ref={stageRef}>
        {images.map((img, i) => (
          <div className={'journey-stop' + (img.bare ? ' bare' : '')} key={i}>
            <span className="journey-pin" ref={(el) => { pinRefs.current[i] = el; }}>
              <img className="journey-rose" src={hub} alt="" aria-hidden="true" />
            </span>
            <figure className="journey-card" onClick={() => openLightbox(items, i)}>
              <img src={img.src} alt={img.caption || ''} loading="lazy" onLoad={measure} />
              {(img.caption || img.text) && (
                <figcaption>
                  {img.caption && (
                    <span className="journey-cap-title"><b>{i + 1}</b> {img.caption}</span>
                  )}
                  {img.text && <span className="journey-cap-text">{img.text}</span>}
                </figcaption>
              )}
            </figure>
          </div>
        ))}
        <svg className="journey-path" width={geo.w} height={geo.h} aria-hidden="true">
          <path d={geo.d} />
        </svg>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   PROJECT DETAIL WINDOW
═════════════════════════════════════════════════════════════════════ */
function ProjectContent({ project, t, lang, openLightbox, openWindow, closeWindow }) {
  const d = project[lang];

  const [mailCopied, setMailCopied] = React.useState(false);
  const copyMail = () => {
    try { navigator.clipboard?.writeText(NURIA.email); } catch (e) { /* ignore */ }
    setMailCopied(true);
    setTimeout(() => setMailCopied(false), 1800);
  };

  /* Linear pager: walk through all completed projects with prev/next.
     Replaces the old left sidebar — bottom-bar feels less crowded and
     turns the case studies into a guided tour. */
  const completedProjects = PROJECTS.filter(p => p.status === 'completed');
  const currentIdx = completedProjects.findIndex(p => p.id === project.id);
  const prevProj = currentIdx > 0 ? completedProjects[currentIdx - 1] : null;
  const nextProj = currentIdx >= 0 && currentIdx < completedProjects.length - 1
    ? completedProjects[currentIdx + 1]
    : null;

  /* WIP fallback: render the simple preview when the case study isn't
     fleshed out yet (no research array). Clarity has rich content → falls
     through to the full case study. DonBosco doesn't → simple preview. */
  const hasRichContent = Array.isArray(d.research) && d.research.length > 0;
  const isWipPreview = project.status === 'coming-soon' || (project.status === 'wip' && !hasRichContent);
  if (isWipPreview) {
    return (
      <div className="content">
        <div className="hero">
          <div style={{ fontSize: 64, alignSelf:'center', textAlign:'center' }}>{project.emoji}</div>
          <div>
            <h1>{d.title}</h1>
            <div className="tag mono">{d.problemShort}</div>
            <span className="chip peach">🔨 {project.status === 'wip'
              ? (lang === 'de' ? 'In Arbeit' : 'In Progress')
              : t.coming_soon}</span>
          </div>
        </div>
        {d.phase && (
          <div className="callout yellow">
            <strong>{t.phase}:</strong> {d.phase}
            {typeof project.progress === 'number' && (
              <div style={{ marginTop: 8 }}>
                <div className="bar" style={{ height: 18 }}>
                  <div style={{ width: `${project.progress}%` }} />
                </div>
                <div className="mono" style={{ marginTop: 4 }}>{project.progress}% — {t.progress}</div>
              </div>
            )}
          </div>
        )}
        {d.context && (
          <>
            <h2>{lang === 'de' ? 'Kontext' : 'Context'}</h2>
            <p>{d.context}</p>
          </>
        )}
        <h2>{t.role_label}</h2>
        <p>{d.role}{d.duration ? ` · ${d.duration}` : ''}{d.team ? ` · ${d.team}` : ''}</p>
        {Array.isArray(d.tools) && d.tools.length > 0 && (
          <div className="tag-row">{d.tools.map(tt => <span key={tt} className="chip">{tt}</span>)}</div>
        )}
        <Placeholder caption={t.placeholder_caption('Process Snapshot')} />
      </div>
    );
  }

  /* Hero stays above the tabs — project identity. Two-column layout:
  /* ── Intro block + chapter header rendered by CaseScrollLayout now,
        so the panels themselves stay order-agnostic. ───────────────── */
  const introBlock = (
    <>
      <div className="case-intro-block">
        <h1 className="case-intro-title">{d.title}</h1>
        {d.description && <p className="case-intro-desc">{d.description}</p>}
        <div className="case-intro-tags">
          {d.duration && <span className="case-intro-tag">{d.duration}</span>}
          {d.team && <span className="case-intro-tag">{lang === 'de' ? 'Teamprojekt' : 'Team project'}</span>}
          {(d.tools || []).slice(0, 3).map(tt => <span key={tt} className="case-intro-tag">{tt}</span>)}
        </div>
      </div>
      {(() => {
        const heroVideo = project.id === 'atolls' ? d.media?.find(m => m.type === 'video' && m.src) : null;
        if (heroVideo) {
          return (
            <div className="case-hero-bleed">
              <video controls preload="metadata" poster={d.heroImage || undefined} style={{ width: '100%', display: 'block' }}>
                <source src={heroVideo.src} type="video/mp4" />
              </video>
            </div>
          );
        }
        if (project.id === 'vinted') {
          const vintedHero = 'assets/Portfolio_Content/VInted_Rebranding/magazine1.webp';
          return (
            <div className="case-hero-bleed">
              <img
                src={vintedHero}
                alt={d.title}
                onClick={() => openLightbox([{ type: 'image', src: vintedHero, caption: d.title }], 0)}
              />
            </div>
          );
        }
        if (d.heroImage) {
          return (
            <div className="case-hero-bleed">
              <img
                src={d.heroImage}
                alt={d.title}
                onClick={() => openLightbox([{ type: 'image', src: d.heroImage, caption: d.title }], 0)}
              />
            </div>
          );
        }
        return null;
      })()}
      {(project.devLog || project.figmaUrl || project.documentation) && (() => {
        const dev = project.devLog;
        const links = [
          /* Deck replaces the Figma link here; the Figma prototype stays
             accessible via its own embed section below. */
          ...(project.deckUrl
            ? [{ label: lang === 'de' ? 'Präsentation öffnen' : 'Open presentation', href: project.deckUrl }]
            : (project.figmaUrl ? [{ label: (project.figmaLabel && project.figmaLabel[lang]) || (lang === 'de' ? 'Figma öffnen' : 'Open Figma'), href: project.figmaUrl }] : [])),
          ...((dev?.links || []).filter(l => l.href && l.href !== '#').map(l => ({ label: l.label, href: l.href }))),
        ];
        return (
          <div className="case-meta-strip">
            {dev?.stack?.length > 0 && (
              <>
                <div className="case-meta-label">{lang === 'de' ? 'Stack' : 'Stack'}</div>
                <div className="case-meta-value">{dev.stack.join(' · ')}</div>
              </>
            )}
            {(d.role || dev?.role) && (
              <>
                <div className="case-meta-label">{lang === 'de' ? 'Rolle' : 'Role'}</div>
                <div className="case-meta-value">{d.role || dev.role}</div>
              </>
            )}
            {links.length > 0 && (
              <>
                <div className="case-meta-label">{lang === 'de' ? 'Links' : 'Links'}</div>
                <div className="case-meta-links">
                  {links.map((l, i) => (
                    <a key={i} className="case-meta-link" href={l.href} target="_blank" rel="noreferrer">→ {l.label}</a>
                  ))}
                </div>
              </>
            )}
            {project.documentation && (
              <>
                <div className="case-meta-label">{lang === 'de' ? 'Doku' : 'Docs'}</div>
                <div className="case-meta-value">
                  <a className="case-meta-link" href={project.documentation} target="_blank" rel="noreferrer">
                    → {lang === 'de' ? 'Gesamte Dokumentation (PDF)' : 'Full documentation (PDF)'}
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })()}
    </>
  );

  /* ── TAB 1: Research & Problem ─────────────────────────────────── */
  const researchPanel = (
    <div className="tab-content">
      {d.context && (
        <section className="case-section">
          <h2>{lang === 'de' ? 'Kontext' : 'Context'}</h2>
          <p>{d.context}</p>
        </section>
      )}
      {/* THE PROBLEM — when a gallery is provided: Buffer-style sticky text +
          scrolling images (like "The Solution"). Otherwise the classic 40/60 row.
          Hidden for soulsphere (chatbot persona — no separate problem section). */}
      {project.id !== 'soulsphere' && (d.problemGallery?.length > 0 ? (
        <section className="case-section case-sticky-scroll">
          <div className="sticky-scroll-text">
            <h2>{lang === 'de' ? 'Das Problem' : 'The Problem'}</h2>
            <p>{d.problemStatement || d.problemShort}</p>
            {d.problemContext && d.problemContext !== (d.problemStatement || d.problemShort) && (
              <p>{d.problemContext}</p>
            )}
          </div>
          <div className="sticky-scroll-media">
            {d.problemGallery.map((img, i) => (
              <figure
                key={i}
                className={img.bare ? 'bare' : undefined}
                onClick={() => openLightbox(
                  d.problemGallery.map(it => ({ type: 'image', src: it.src, caption: it.caption || '' })),
                  i
                )}
              >
                <img src={img.src} alt={img.caption || ''} loading="lazy" />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      ) : (
        <section className="case-section">
          <div className="case-row">
            <div className="case-row-text">
              <h2>{lang === 'de' ? 'Das Problem' : 'The Problem'}</h2>
              <p>{d.problemStatement || d.problemShort}</p>
              {d.problemContext && d.problemContext !== (d.problemStatement || d.problemShort) && (
                <p>{d.problemContext}</p>
              )}
            </div>
            <div className="case-row-media">
              {d.problemImage ? (
                <img
                  src={d.problemImage}
                  alt={lang === 'de' ? 'Problem-Kontext' : 'Problem context'}
                  className="case-row-img-zoom"
                  onClick={() => openLightbox([{ type: 'image', src: d.problemImage, caption: d.problemStatement || d.problemShort }], 0)}
                />
              ) : (
                <Placeholder caption={lang === 'de' ? 'Problem-Visual folgt' : 'Problem visual TBD'} h={280} />
              )}
            </div>
          </div>
        </section>
      ))}

      {/* HOW MIGHT WE — right after the problem */}
      {d.hmw?.length > 0 && (
        <section className="case-section">
          <h3>{t.hmw_label}</h3>
          <div className="hmw-box">
            {d.hmw.map((h, idx) => <p key={idx}>↳ {h}</p>)}
          </div>
        </section>
      )}

      {/* KEY INSIGHT — single pulled-quote callout, only if present */}
      {d.keyInsight && (
        <section className="case-section">
          <blockquote className="case-insight-quote">
            {d.keyInsight}
          </blockquote>
        </section>
      )}

      {/* RESEARCH — when a gallery is present: sticky methods (stacked) + images
          scrolling past (like "The Solution"). Otherwise methods grid + image. */}
      {d.research?.length > 0 && (() => {
        const icons = ['👥', '🚶', '💭', '📊', '🎯', '📱', '🧪', '🗺️'];
        const sticky = d.researchGallery?.length > 0;
        const methodCards = (
          <div className={'research-methods-grid' + (sticky ? ' research-methods-stack' : '')}>
            {d.research.map((method, i) => {
              const [name, ...rest] = method.split(' — ');
              const desc = rest.join(' — ');
              return (
                <div key={i} className="research-method-card">
                  <div className="research-method-head">
                    <span className="research-method-icon" aria-hidden="true">{icons[i % icons.length]}</span>
                    <span className="research-method-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="research-method-name">{name}</div>
                  {desc && <div className="research-method-desc">{desc}</div>}
                </div>
              );
            })}
          </div>
        );
        if (sticky) {
          return (
            <section className="case-section research-split">
              {project.id !== 'soulsphere' && <h2>{t.research_label}</h2>}
              {d.researchContext && <p>{d.researchContext}</p>}
              <div className="research-split-cols">
                <div className="research-split-methods">
                  {methodCards}
                </div>
                <div className="research-split-media">
                  {d.researchGallery.map((img, i) => (
                    <figure
                      key={i}
                      onClick={() => openLightbox(
                        d.researchGallery.map(it => ({ type: 'image', src: it.src, caption: it.caption || '' })),
                        i
                      )}
                    >
                      <img src={img.src} alt={img.caption || ''} loading="lazy" />
                      {img.caption && <figcaption>{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          );
        }
        return (
          <section className="case-section">
            {project.id !== 'soulsphere' && <h2>{t.research_label}</h2>}
            {d.researchContext && <p>{d.researchContext}</p>}
            {methodCards}
            {d.researchImage && (
              <img
                src={d.researchImage}
                alt={lang === 'de' ? 'Research-Prozess' : 'Research process'}
                style={{ cursor: 'zoom-in' }}
                onClick={() => openLightbox([{ type: 'image', src: d.researchImage, caption: lang === 'de' ? 'Research' : 'Research' }], 0)}
              />
            )}
          </section>
        );
      })()}

      {/* KEY INSIGHTS — right after the research methods. */}
      {d.insights?.length > 0 && (
        <section className="case-section">
          <h2>{t.insights_label}</h2>
          <div className="insights-cards-grid">
            {d.insights.map((insight, idx) => (
              <div key={idx} className="insight-card-large">
                <div className="insight-card-number">{String(idx + 1).padStart(2, '0')}</div>
                <div className="insight-card-content"><p>{insight}</p></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TEAM PRESENTATION — deck embed removed; linked at the top ("Links"). */}

      {/* Narrative scenario + image-break between chapter 01 and 02 (skipped for munichapp) */}
      {project.id !== 'munichapp' && project.id !== 'soulsphere' && d.problemScenario && (
        <div className="case-scenario" data-lang={lang}>
          {d.problemScenario}
        </div>
      )}
      {project.id !== 'munichapp' && (() => {
        const breakImg = (d.media || []).filter(m => m.type === 'image' && m.src)[1];
        if (!breakImg) return null;
        return (
          <div className="case-section-break">
            <img
              src={breakImg.src}
              alt={breakImg.caption || ''}
              onClick={() => openLightbox([{ type: 'image', src: breakImg.src, caption: breakImg.caption || '' }], 0)}
            />
            {breakImg.caption && <div className="case-section-break-caption">{breakImg.caption}</div>}
          </div>
        );
      })()}
    </div>
  );

  /* ── TAB 2: Design & Solution ──────────────────────────────────── */
  const designPanel = (
    <div className="tab-content">
      {/* THE SOLUTION — Buffer-style: sticky title + description, images scroll past.
          Without a carousel, drop the 2-col grid so the text spans full width (cohesive). */}
      {(d.solutionStatement || d.concept || d.designCarousel?.length > 0) && (
        <section className={'case-section' + (d.designCarousel?.length > 0 ? ' case-sticky-scroll' : '')}>
          <div className="sticky-scroll-text">
            <h2>{project.id === 'soulsphere' ? (lang === 'de' ? 'Der Bot' : 'The Bot') : (lang === 'de' ? 'Die Lösung' : 'The Solution')}</h2>
            {d.solutionStatement && <p><strong>{d.solutionStatement}</strong></p>}
            {(d.solutionContext || d.concept) && <p>{d.solutionContext || d.concept}</p>}
          </div>
          {d.designCarousel?.length > 0 && (
            <div className="sticky-scroll-media">
              {d.designCarousel.map((img, i) => (
                <figure
                  key={i}
                  className={img.bare ? 'bare' : undefined}
                  onClick={() => openLightbox(
                    d.designCarousel.map(it => ({ type: 'image', src: it.src, caption: it.caption || '' })),
                    i
                  )}
                >
                  <img src={img.src} alt={img.caption || ''} loading="lazy" />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      {/* BRAND GUIDE QR — scannable code that opens the full brand & language guide. */}
      {d.brandQr?.src && (
        <section className="case-section case-brand-qr">
          <h2>{lang === 'de' ? 'Brand Guide scannen' : 'Scan the brand guide'}</h2>
          <p>{lang === 'de'
            ? 'Der vollständige Brand- & Language-Guide — QR-Code mit dem Handy scannen oder antippen zum Öffnen.'
            : 'The full brand & language guide — scan the QR code with your phone or tap it to open.'}</p>
          <a
            className="case-brand-qr-code"
            href={d.brandQr.link || d.brandQr.src}
            target="_blank"
            rel="noreferrer"
          >
            <img src={d.brandQr.src} alt={lang === 'de' ? 'QR-Code zum Brand Guide' : 'QR code to the brand guide'} />
          </a>
        </section>
      )}

      {/* SYSTEM JOURNEY — winding map route: images as stops, rose pins, a
          hand-drawn dashed trail weaving between them. */}
      {d.systemSlider?.images?.length > 0 && (
        <SystemJourney
          title={d.systemSlider.title}
          intro={d.systemSlider.intro}
          images={d.systemSlider.images}
          hub={d.systemSlider.hub || 'assets/Portfolio_Content/Echoes_of_Moosburg/identity/rose_logo.webp'}
          openLightbox={openLightbox}
        />
      )}
      {d.systemSlider?.scenario && (
        <div className="case-scenario" data-lang={lang}>{d.systemSlider.scenario}</div>
      )}

      {/* BEFORE / AFTER — supports both legacy d.beforeAfterMedia and new d.beforeImage/d.afterImage */}
      {((d.beforeImage && d.afterImage) || (d.beforeAfterMedia && (d.beforeAfterMedia.before || d.beforeAfterMedia.after))) && (
        <section className="case-section">
          <h2>{lang === 'de' ? 'Vorher / Nachher' : 'Before / After'}</h2>
          <div className="before-after-grid">
            <div>
              <h3>{lang === 'de' ? 'Vorher' : 'Before'}</h3>
              <img
                src={d.beforeImage || d.beforeAfterMedia?.before}
                alt={lang === 'de' ? 'Vorher' : 'Before'}
                onClick={() => openLightbox([{ type: 'image', src: d.beforeImage || d.beforeAfterMedia?.before, caption: lang === 'de' ? 'Vorher' : 'Before' }], 0)}
              />
            </div>
            <div>
              <h3>{lang === 'de' ? 'Nachher' : 'After'}</h3>
              <img
                src={d.afterImage || d.beforeAfterMedia?.after}
                alt={lang === 'de' ? 'Nachher' : 'After'}
                onClick={() => openLightbox([{ type: 'image', src: d.afterImage || d.beforeAfterMedia?.after, caption: lang === 'de' ? 'Nachher' : 'After' }], 0)}
              />
            </div>
          </div>
        </section>
      )}

      {/* DESIGN SCREENS — hero + 2-up grid; skipped when a Figma embed replaces it. */}
      {d.designScreens?.length > 0 && !project.figmaEmbedUrl && (
        <section className="case-section">
          <h2>{lang === 'de' ? 'Design Screens' : 'Design Screens'}</h2>
          <div className="design-screens-block">
            {/* Hero screen — first one, big */}
            {(() => {
              const hero = d.designScreens[0];
              return (
                <div className="design-screens-hero">
                  {hero.image ? (
                    <img
                      src={hero.image}
                      alt={hero.name}
                      onClick={() => openLightbox([{ type: 'image', src: hero.image, caption: hero.name }], 0)}
                    />
                  ) : (
                    <Placeholder caption={hero.name} h={320} />
                  )}
                  <div className="design-screens-hero-caption">
                    <span className="design-screens-hero-name">{hero.name}</span>
                    <span className="design-screens-hero-desc">{hero.description}</span>
                  </div>
                </div>
              );
            })()}
            {/* Remaining screens — 2-up grid */}
            {d.designScreens.length > 1 && (
              <div className="design-screens-grid">
                {d.designScreens.slice(1).map((screen, i) => (
                  <div key={i} className="design-screen-card">
                    {screen.image ? (
                      <img
                        src={screen.image}
                        alt={screen.name}
                        onClick={() => openLightbox([{ type: 'image', src: screen.image, caption: screen.name }], 0)}
                      />
                    ) : (
                      <Placeholder caption={screen.name} h={220} />
                    )}
                    <div className="design-screen-card-name">{screen.name}</div>
                    <div className="design-screen-card-desc">{screen.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {/* Solution intro scenario — sets up the protagonist (hidden for soulsphere) */}
      {project.id !== 'soulsphere' && d.solutionScenario && (
        <div className="case-scenario" data-lang={lang}>
          {d.solutionScenario}
        </div>
      )}
      {/* Screen sequence — each image paired with its own scenario step */}
      {(d.solutionScenarioImages || (d.solutionScenarioImage ? [{ src: d.solutionScenarioImage, caption: d.solutionScenarioCaption }] : [])).map((img, i, arr) => (
        <div key={i} className="case-scenario-step">
          <div className="case-section-break">
            <img
              src={img.src}
              alt={img.caption || ''}
              onClick={() => openLightbox(arr.map(it => ({ type: 'image', src: it.src, caption: it.caption || '' })), i)}
            />
            {img.caption && <div className="case-section-break-caption">{img.caption}</div>}
          </div>
          {img.scenario && <div className="case-scenario" data-lang={lang}>{img.scenario}</div>}
        </div>
      ))}
      {project.figmaEmbedUrl && (
        <section className="case-section case-section-figma">
          <h2>{t.figma_section}</h2>
          <p className="mono" style={{ fontSize: 12, opacity: 0.8 }}>{t.figma_hint}</p>
          {d.figmaNote && <p style={{ fontSize: 19, fontWeight: 700, margin: '10px 0 16px', color: 'var(--ink)' }}> {d.figmaNote}</p>}
          <div className="figma-embed">
            <iframe src={project.figmaEmbedUrl} title={`${d.title} — Figma`} allowFullScreen loading="lazy" />
          </div>
          {project.figmaUrl && (
            <a className="btn-primary" href={project.figmaUrl} target="_blank" rel="noreferrer">
              → {t.figma_cta}
            </a>
          )}
        </section>
      )}
    </div>
  );

  /* ── TAB 3: Results & Reflection ───────────────────────────────── */
  const dev = project.devLog;
  const devNotes = dev ? (dev[`notes_${lang}`] || dev.notes_de || []) : [];

  /* Reflection — clean prose "Learnings & Retrospective" (like amandawallgren
     buffer): no box, just a heading and flowing paragraphs, each with a bold
     lead-in (the key statement) followed by the elaboration. */
  const hasRetro = d.reflection || d.wouldChange?.length > 0;
  const leadParagraph = (text, key) => {
    const [lead, rest] = splitLead(text);
    return (
      <p key={key}><strong>{lead}</strong>{rest ? ' ' + rest : ''}</p>
    );
  };
  const reflectionBlocks = (d.learnings?.length > 0 || hasRetro) && (
    <section className="case-section reflection-prose">
      <h2 className="reflection-prose-title">Learnings &amp; Retrospective</h2>
      {d.learnings?.map((l, i) => leadParagraph(l, 'l' + i))}
      {d.reflection && leadParagraph(d.reflection, 'refl')}
      {d.wouldChange?.map((c, i) => leadParagraph(c, 'w' + i))}
    </section>
  );
  const closingBlock = (
    <section className="case-section case-closing">
      <p className="case-closing-kicker">{lang === 'de' ? "That's all." : "That's all."}</p>
      <h2 className="case-closing-title">{lang === 'de' ? 'Wanna get in touch?' : 'Wanna get in touch?'}</h2>
      <div className="case-closing-arrow" aria-hidden="true">↓</div>
      <div className="case-closing-links">
        <a className="case-closing-link" href={`mailto:${NURIA.email}`} onClick={copyMail}>✉ {NURIA.email}</a>
        <a className="case-closing-link" href="assets/Nuria_Kurrle_CV.pdf" download>⬇ CV (PDF)</a>
        <a className="case-closing-link" href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">in {NURIA.linkedin}</a>
      </div>
      <p className="case-closing-copied" aria-live="polite">
        {mailCopied
          ? (lang === 'de' ? `✓ E-Mail kopiert: ${NURIA.email}` : `✓ Email copied: ${NURIA.email}`)
          : ' '}
      </p>
      <p className="case-closing-copyright">© {NURIA.name} 2026</p>
    </section>
  );
  const reflectionPanel = (
    <div className="tab-content">{reflectionBlocks}{closingBlock}</div>
  );

  const resultsPanel = (
    <div className="tab-content">
      {d.outcome && (
        <section className="case-section">
          <div className="case-row">
            <div className="case-row-text">
              <h2>{lang === 'de' ? 'Ergebnis' : 'Outcome'}</h2>
              <p>{d.outcome}</p>
            </div>
            <div className="case-row-media">
              {(() => {
                /* Atolls uses its video as hero, so skip it here to avoid duplication */
                const heroVideo = project.id !== 'atolls' ? d.media?.find(m => m.type === 'video' && m.src) : null;
                if (heroVideo) {
                  return (
                    <video controls preload="metadata" poster={d.heroImage || undefined} className="case-row-video">
                      <source src={heroVideo.src} type="video/mp4" />
                    </video>
                  );
                }
                /* Outcome 40/60 right-column fall-through */
                if (d.resultsImage) {
                  const cap = lang === 'de' ? 'Ergebnis' : 'Outcome';
                  if (/\.mp4$/i.test(d.resultsImage)) {
                    return (
                      <LazyVideo
                        src={d.resultsImage}
                        className="case-row-img-zoom"
                        loop
                        onClick={() => openLightbox([{ type: 'video', src: d.resultsImage, caption: cap }], 0)}
                      />
                    );
                  }
                  return (
                    <img
                      src={d.resultsImage}
                      alt={cap}
                      className="case-row-img-zoom"
                      onClick={() => openLightbox([{ type: 'image', src: d.resultsImage, caption: cap }], 0)}
                    />
                  );
                }
                return <Placeholder caption={lang === 'de' ? 'Ergebnis-Visual folgt' : 'Outcome visual TBD'} h={280} />;
              })()}
            </div>
          </div>
          {project.id !== 'soulsphere' && d.outcomeScenario && (
            <div className="case-scenario" data-lang={lang}>
              {d.outcomeScenario}
            </div>
          )}
          {project.id === 'echoes' && (
            <>
              <img
                className="case-echoes-img"
                src="assets/Portfolio_Content/Echoes_of_Moosburg/outcome/baracken_tafel.webp"
                alt={lang === 'de' ? 'Baracken-Tafel' : 'Baracken sign'}
              />
              <p className="case-echoes-note">
                {d.outcomeNote || (lang === 'de'
                  ? '[Kurzer Erklärungstext folgt — wie die Themen-Tafel und der QR-Code zusammenspielen.]'
                  : '[Short explanation goes here — how the themed sign and the QR code work together.]')}
              </p>
              <img
                className="case-echoes-img"
                src="assets/Portfolio_Content/Echoes_of_Moosburg/outcome/QR_code_scan.webp"
                alt={lang === 'de' ? 'QR-Code Scan' : 'QR-code scan'}
              />
            </>
          )}
        </section>
      )}
    </div>
  );


  /* ── PROJECT-SPECIFIC: Vinted Rewind (Brand / Design / System / Marketing) ─── */
  const vintedRewindTabs = project.customTabs === 'vinted-rewind' ? (() => {
    /* SKELETON: titles + Figma embeds + logo evolution only.
       All other photos, videos and body content removed — to be refilled.
       The original content still lives in data.jsx for reference. */
    const conceptPanel = (
      <div className="tab-content vinted-rewind">
        <section className="case-section">
          <p>
            {lang === 'de'
              ? 'Die Aufgabe für das Semester war das Rebranding einer bestehenden Marke. Meine Gruppe und ich haben uns für Vinted entschieden — eine Plattform, auf der gebrauchte Kleidung und Objekte verkauft werden.'
              : 'The semester brief was to rebrand an existing brand. My group and I chose Vinted — a platform where people sell second-hand clothing and objects.'}
          </p>
          <p>
            {lang === 'de'
              ? 'Ausgangspunkt war der bisherige Auftritt: das alte Logo und die alte Website. Diese haben wir analysiert, um daraus ein frisches, eigenständiges Konzept zu entwickeln.'
              : 'Our starting point was the existing presence: the old logo and the old website. We analysed both to develop a fresh, distinct concept from there.'}
          </p>
        </section>

        {/* Ausgangslage — Buffer-style sticky text + scrolling "before" images */}
        <section className="case-section case-sticky-scroll">
          <div className="sticky-scroll-text">
            <h3>{lang === 'de' ? '🔍 Ausgangslage' : '🔍 Starting Point'}</h3>
            <p>
              {lang === 'de'
                ? 'So sah Vinted vorher aus — das alte Logo und die alte Website als Ausgangspunkt für unser Rebranding.'
                : 'This is how Vinted looked before — the old logo and the old website as the starting point for our rebrand.'}
            </p>
          </div>
          <div className="sticky-scroll-media">
            {[
              { src: 'assets/Portfolio_Content/VInted_Rebranding/old_logo.webp', cap: lang === 'de' ? 'Original Logo' : 'Old logo' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/old_website.webp', cap: lang === 'de' ? 'Original Website' : 'Old website' },
            ].map((img, i, arr) => (
              <figure
                key={i}
                onClick={() => openLightbox(
                  arr.map(it => ({ type: 'image', src: it.src, caption: it.cap })),
                  i
                )}
              >
                <img src={img.src} alt={img.cap} loading="lazy" />
                <figcaption>{img.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    );

    const identityPanel = (
      <div className="tab-content vinted-rewind">
        {/* Moodboard & Arbeitsprozess — Buffer-style sticky text + scrolling images */}
        <section className="case-section case-sticky-scroll">
          <div className="sticky-scroll-text">
            <h3>{lang === 'de' ? '🧭 Moodboard & Arbeitsprozess' : '🧭 Moodboard & Process'}</h3>
            <p>
              {lang === 'de'
                ? 'Unser Ziel: ein Konzept für alle Altersgruppen — ein nostalgisches, spielerisches Gefühl, das alle anspricht und Generationen verbindet. Gerade junge Menschen wollen heute wieder analog gehen, das Handy weglegen und zurück in eine einfachere Zeit. Genau dieses Lebensgefühl haben wir auf einem Moodboard gesammelt — 80s/90s-Arcade, Pixel-Art, CRT-Glow, knallige Farben — und Schritt für Schritt zur visuellen Richtung verdichtet: Pixel-Logo, Vier-Farben-Palette und ein klarer Type-Stack.'
                : 'Our goal: a concept for every age group — a nostalgic, playful feeling that speaks to everyone and connects generations. Young people especially want to go analog again today, put the phone down and return to a simpler time. We gathered exactly that mood on a moodboard — 80s/90s arcade, pixel art, CRT glow, bold colours — and step by step distilled it into a visual direction: pixel logo, four-colour palette and a clear type stack.'}
            </p>
          </div>
          <div className="sticky-scroll-media">
            {[
              { src: 'assets/Portfolio_Content/VInted_Rebranding/Moodboard.webp', cap: 'Moodboard' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/arbeitsprozess.webp', cap: lang === 'de' ? 'Arbeitsprozess' : 'Process' },
            ].map((img, i, arr) => (
              <figure
                key={i}
                onClick={() => openLightbox(
                  arr.map(it => ({ type: 'image', src: it.src, caption: it.cap })),
                  i
                )}
              >
                <img src={img.src} alt={img.cap} loading="lazy" />
                <figcaption>{img.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-section">
          <h3>{lang === 'de' ? '🛠 Logo-Evolution & Maskottchen' : '🛠 Logo Evolution & Mascot'}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {[
              { src: 'assets/Portfolio_Content/VInted_Rebranding/old_logo.webp', cap: lang === 'de' ? 'Vorher' : 'Before' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/logo_skizze.webp', cap: lang === 'de' ? 'Skizze' : 'Sketch' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/Logo.webp', cap: lang === 'de' ? 'Final' : 'Final' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/vinti.webp', cap: lang === 'de' ? 'Maskottchen „Vinti"' : 'Mascot "Vinti"' },
            ].map((m, i, arr) => (
              <figure key={i} className="bare" style={{ margin: 0, flex: '1 1 140px', textAlign: 'center' }}>
                <img src={m.src} alt={m.cap} style={{ width: '100%', borderRadius: 8, cursor: 'zoom-in' }}
                  onClick={() => openLightbox(arr.map(x => ({ type: 'image', src: x.src, caption: x.cap })), i)} />
                <figcaption className="small" style={{ marginTop: 6 }}>{m.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-section">
          <h3>{lang === 'de' ? '🎨 Farbpalette' : '🎨 Colour Palette'}</h3>
          <figure
            style={{ margin: '12px 0 0' }}
            onClick={() => openLightbox([{ type: 'image', src: 'assets/Portfolio_Content/VInted_Rebranding/palette.webp', caption: lang === 'de' ? 'Farbpalette' : 'Colour palette' }], 0)}
          >
            <img
              src="assets/Portfolio_Content/VInted_Rebranding/palette.webp"
              alt={lang === 'de' ? 'Farbpalette' : 'Colour palette'}
              style={{ width: '100%', borderRadius: 8, cursor: 'zoom-in', display: 'block' }}
              loading="lazy"
            />
          </figure>
        </section>
      </div>
    );

    const designSystemPanel = (
      <div className="tab-content vinted-rewind">
        <section className="case-section">
          <h2>{lang === 'de' ? 'Konzept & Ecosystem' : 'Concept & Ecosystem'}</h2>
          <figure
            className="bare"
            style={{ margin: '16px 0 0' }}
            onClick={() => openLightbox([{ type: 'video', src: 'assets/Portfolio_Content/VInted_Rebranding/vinted_website.mp4', caption: lang === 'de' ? 'Neue Website' : 'New website' }], 0)}
          >
            <LazyVideo
              src="assets/Portfolio_Content/VInted_Rebranding/vinted_website.mp4"
              loop
              style={{ width: '100%', maxWidth: 700, margin: '0 auto', borderRadius: 8, cursor: 'zoom-in', display: 'block' }}
            />
            <figcaption className="small" style={{ marginTop: 6 }}>{lang === 'de' ? 'Neue Website' : 'New website'}</figcaption>
          </figure>
        </section>

        {/* Ecosystem — Buffer-style sticky text + scrolling images */}
        <section className="case-section case-sticky-scroll">
          <div className="sticky-scroll-text">
            <h3>{lang === 'de' ? '♻️ Repair-Ecosystem' : '♻️ Repair Ecosystem'}</h3>
            <p>
              {lang === 'de'
                ? 'Vinted Rewind ist kein einzelnes Produkt, sondern ein geschlossener Kreislauf — online wie offline. Im Hub gibt man Geräte zur Reparatur, tauscht oder verkauft sie; der „Submit · Match · Ship"-Flow macht jeden Schritt so leicht und spielerisch wie ein Level. Physische Arcade-Repair-Shops holen das Erlebnis in die echte Welt, und die wiederverwendbare Retro-Game-Box ersetzt Wegwerf-Verpackung. Reparieren wird so zum Spiel statt zur lästigen Pflicht. Vinted Rewind ist der Ort, an dem deine Geräte ein zweites Zuhause finden — und an dem du dich ein Stück weit wieder zuhause fühlst: nostalgisch, nachhaltig und generationenverbindend.'
                : 'Vinted Rewind isn\'t a single product but a closed loop — online and offline. In the hub you send devices in for repair, swap or sell them; the "Submit · Match · Ship" flow makes every step as easy and playful as a level. Physical arcade repair shops bring the experience into the real world, and the reusable retro-game-box replaces throwaway packaging. Repair becomes play instead of a chore. Vinted Rewind is the place where your devices find a second home — and where you feel a little at home again: nostalgic, sustainable and generation-spanning.'}
            </p>
          </div>
          <div className="sticky-scroll-media">
            {[
              { src: 'assets/Portfolio_Content/VInted_Rebranding/vinted_hub.webp', cap: 'Vinted Hub' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/repair_concept.webp', cap: lang === 'de' ? 'Repair-Konzept' : 'Repair concept', bg: '#032036' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/shipping_box.webp', cap: lang === 'de' ? 'Versand-Box' : 'Shipping box' },
            ].map((img, i, arr) => (
              <figure
                key={i}
                className={img.bare ? 'bare' : undefined}
                onClick={() => openLightbox(
                  arr.map(it => ({ type: 'image', src: it.src, caption: it.cap })),
                  i
                )}
              >
                <img src={img.src} alt={img.cap} loading="lazy" style={img.bg ? { background: img.bg, padding: '32px 64px' } : undefined} />
                <figcaption>{img.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {project.figmaEmbedUrl && (
          <section className="case-section case-section-figma">
            <h3>{t.figma_section}</h3>
            <p>
              {lang === 'de'
                ? 'In diesem Figma-File ist das komplette Projekt versammelt: Website- und Mobile-Ansicht, Gamification, Präsentation, Werbevideo, Insta-Story und Mockups.'
                : 'This Figma file gathers the whole project: website and mobile view, gamification, presentation, ad video, Insta story and mockups.'}
            </p>
            <p className="mono" style={{ fontSize: 12, opacity: 0.8 }}>{t.figma_hint}</p>
            <div className="figma-embed">
              <iframe src={project.figmaEmbedUrl} title={`${d.title} — Figma`} allowFullScreen loading="lazy" />
            </div>
            {project.figmaUrl && (
              <a className="btn-primary" href={project.figmaUrl} target="_blank" rel="noreferrer">
                → {t.figma_cta}
              </a>
            )}
          </section>
        )}
      </div>
    );

    const gamificationPanel = (
      <div className="tab-content vinted-rewind">
        <section className="case-section">
          <figure
            className="bare"
            style={{ margin: '16px 0 0' }}
            onClick={() => openLightbox([{ type: 'image', src: 'assets/Portfolio_Content/VInted_Rebranding/gamification_app.webp', caption: lang === 'de' ? 'Gamification in der App' : 'Gamification in the app' }], 0)}
          >
            <img
              src="assets/Portfolio_Content/VInted_Rebranding/gamification_app.webp"
              alt={lang === 'de' ? 'Gamification in der App' : 'Gamification in the app'}
              style={{ width: '100%', borderRadius: 8, cursor: 'zoom-in', display: 'block' }}
              loading="lazy"
            />
            <figcaption className="small" style={{ marginTop: 6 }}>{lang === 'de' ? 'Gamification in der App' : 'Gamification in the app'}</figcaption>
          </figure>
        </section>

        {/* Spielablauf — Buffer-style sticky text + scrolling app screens */}
        <section className="case-section case-sticky-scroll">
          <div className="sticky-scroll-text">
            <h3>{lang === 'de' ? '🕹 Spielablauf' : '🕹 Game Flow'}</h3>
            <p>
              {lang === 'de'
                ? 'Jede nachhaltige Aktion — reparieren, tauschen, recyceln — bringt Punkte. Damit schaltet man Retro-Mini-Games frei, sammelt Rewards und steigt durch drei Level: vom Rookie über Master bis Legend. Im Verlauf sieht man jederzeit, wie viel man schon bewegt hat, und ab einer bestimmten Punktzahl schaltet man seinen eigenen Avatar frei — das persönliche Gesicht des Fortschritts. So fühlt sich Nachhaltigkeit nicht nach Verzicht an, sondern nach Highscore.'
                : 'Every sustainable action — repair, swap, recycle — earns points. You spend them to unlock retro mini-games, collect rewards and climb through three levels: from Rookie to Master to Legend. The history view shows how much you\'ve already moved, and once you hit a certain point threshold you unlock your own avatar — the personal face of your progress. Sustainability doesn\'t feel like giving something up — it feels like a high score.'}
            </p>
          </div>
          <div className="sticky-scroll-media">
            {[
              { src: 'assets/Portfolio_Content/VInted_Rebranding/vinted_mini_game.webp', cap: lang === 'de' ? 'Mini-Game' : 'Mini-game', bare: true },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/vinted_rewards.webp', cap: 'Rewards', bare: true },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/vinted_verlauf.webp', cap: lang === 'de' ? 'Verlauf' : 'History', bare: true },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/reward_figur.webp', cap: lang === 'de' ? 'Nutzer-Avatar — ab bestimmter Punktzahl' : 'User avatar — unlocked with points' },
            ].map((img, i, arr) => (
              <figure
                key={i}
                className={img.bare ? 'bare' : undefined}
                onClick={() => openLightbox(
                  arr.map(it => ({ type: 'image', src: it.src, caption: it.cap })),
                  i
                )}
              >
                <img src={img.src} alt={img.cap} loading="lazy" />
                <figcaption>{img.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {project.gamificationFigmaEmbedUrl && (
          <section className="case-section case-section-figma">
            <h3>{lang === 'de' ? '🎮 Gamification-Prototyp (Figma)' : '🎮 Gamification prototype (Figma)'}</h3>
            <p className="mono" style={{ fontSize: 12, opacity: 0.8 }}>{t.figma_hint}</p>
            <div className="figma-embed">
              <iframe src={project.gamificationFigmaEmbedUrl} title={`${d.title} — Gamification Figma`} allowFullScreen loading="lazy" />
            </div>
            {project.gamificationFigmaUrl && (
              <a className="btn-primary" href={project.gamificationFigmaUrl} target="_blank" rel="noreferrer">
                → {t.figma_cta}
              </a>
            )}
          </section>
        )}
      </div>
    );

    const marketingPanel = (
      <div className="tab-content vinted-rewind">
        {/* Intro — TV/Online commercial */}
        <section className="case-section">
          <LazyVideo
            src="assets/Portfolio_Content/VInted_Rebranding/commercial.mp4"
            controls
            loop
            style={{ width: '100%', maxWidth: 820, margin: '0 auto', display: 'block', borderRadius: 8, border: '2px solid var(--ink, #000)' }}
          />
          <p className="small" style={{ marginTop: 8, textAlign: 'center' }}>
            {lang === 'de' ? 'Vinted-Werbung im Retro-90er-Style' : 'Vinted ad in retro 90s style'}
          </p>
        </section>

        {/* Social Media — Buffer-style sticky text + scrolling posts/ads */}
        <section className="case-section case-sticky-scroll">
          <div className="sticky-scroll-text">
            <h3>{lang === 'de' ? '📱 Social Media' : '📱 Social Media'}</h3>
            <p>
              {lang === 'de'
                ? 'Auf Instagram wird die Marke zur Community: Feed-Posts erzählen Before/After-Repair-Stories mit Pixel-Art-Overlays, Creator zeigen ihre eigenen reparierten Schätze, und kurze Insta-Werbung bringt den Retro-Vibe in die Timeline. Statt erhobenem Zeigefinger entsteht ein Feed, der Lust aufs Reparieren macht — und Generationen über gemeinsame Nostalgie zusammenbringt.'
                : 'On Instagram the brand becomes a community: feed posts tell before/after repair stories with pixel-art overlays, creators show off their own fixed-up treasures, and short Insta ads bring the retro vibe into the timeline. Instead of wagging a finger, it\'s a feed that makes you want to repair — connecting generations through shared nostalgia.'}
            </p>
            <p className="small">
              {lang === 'de'
                ? '🎮 Idee: wöchentliche Mini-Games in der Story halten Follower aktiv im Kontakt mit dem Account. Eine solche Spiel-Story haben wir gebaut — ansehen kannst du sie im Figma-Embed.'
                : '🎮 Idea: weekly mini-games in the story keep followers actively engaged with the account. We built one such game story — you can view it in the Figma embed.'}
            </p>
          </div>
          <div className="sticky-scroll-media">
            <figure onClick={() => openLightbox([{ type: 'image', src: 'assets/Portfolio_Content/VInted_Rebranding/insta.webp', caption: 'Instagram' }], 0)}>
              <img src="assets/Portfolio_Content/VInted_Rebranding/insta.webp" alt="Instagram" loading="lazy" />
              <figcaption>Instagram</figcaption>
            </figure>
            <figure onClick={() => openLightbox([{ type: 'image', src: 'assets/Portfolio_Content/VInted_Rebranding/coumba.video 1.webp', caption: lang === 'de' ? 'Creator-Content' : 'Creator content' }], 0)}>
              <img src="assets/Portfolio_Content/VInted_Rebranding/coumba.video 1.webp" alt={lang === 'de' ? 'Creator-Content' : 'Creator content'} loading="lazy" />
              <figcaption>{lang === 'de' ? 'Creator-Content' : 'Creator content'}</figcaption>
            </figure>
            <figure style={{ cursor: 'default' }}>
              <video controls muted preload="metadata" style={{ width: '100%', display: 'block', border: '2px solid var(--ink, #000)', boxShadow: '4px 4px 0 var(--ink, #000)' }}>
                <source src="assets/Portfolio_Content/VInted_Rebranding/insta_werbung.mp4" type="video/mp4" />
              </video>
              <figcaption>{lang === 'de' ? 'Insta-Werbung' : 'Insta ad'}</figcaption>
            </figure>
          </div>
        </section>

        {/* Out-of-home & print — Buffer-style sticky text + scrolling billboard, magazine & merch */}
        <section className="case-section case-sticky-scroll">
          <div className="sticky-scroll-text">
            <h3>{lang === 'de' ? '🪧 Out-of-Home & Print' : '🪧 Out-of-Home & Print'}</h3>
            <p>
              {lang === 'de'
                ? 'Damit die Marke nicht nur im Screen lebt, haben wir sie in den öffentlichen Raum geholt: ein von 90er-Magazinen inspiriertes Cover samt Spread, Poster und Plakate — alle als realitätsnahe Mockups inszeniert. Der Retro-Look funktioniert auch groß und gedruckt: Pixel-Logo, knallige Palette und klare Typo bleiben sofort wiedererkennbar, ob am Kiosk oder an der Bushaltestelle.'
                : 'To make sure the brand doesn\'t only live on screen, we took it into public space: a 90s-magazine-inspired cover and spread, posters and billboards — all staged as realistic mockups. The retro look holds up large and in print: pixel logo, bold palette and clear type stay instantly recognisable, whether at the kiosk or the bus stop.'}
            </p>
          </div>
          <div className="sticky-scroll-media">
            {[
              { src: 'assets/Portfolio_Content/VInted_Rebranding/werbung_tafel.webp', cap: lang === 'de' ? 'Plakat' : 'Billboard' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/magazine2.webp', cap: lang === 'de' ? 'Magazin (90er-inspiriert)' : 'Magazine (90s-inspired)' },
              { src: 'assets/Portfolio_Content/VInted_Rebranding/etiquette.webp', cap: lang === 'de' ? 'Etikett (Merch)' : 'Tag (Merch)' },
            ].map((m, i, arr) => (
              <figure key={i}
                onClick={() => openLightbox(arr.map(x => ({ type: 'image', src: x.src, caption: x.cap })), i)}>
                <img src={m.src} alt={m.cap} loading="lazy" />
                <figcaption>{m.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {closingBlock}
      </div>
    );

    return [
      { id: 'concept',   label: (lang === 'de' ? '📋 Aufgabe' : '📋 Brief'),   panel: conceptPanel },
      { id: 'identity',  label: (lang === 'de' ? '🎨 Konzept & Visual Identity' : '🎨 Concept & Visual Identity'),   panel: <>{identityPanel}{designSystemPanel}</> },
      { id: 'system',    label: (lang === 'de' ? '🎮 Gamification'     : '🎮 Gamification'),      panel: gamificationPanel },
      { id: 'marketing', label: (lang === 'de' ? '🚀 Brand Activation' : '🚀 Brand Activation'),    panel: marketingPanel },
    ];
  })() : null;

  return (
    <div className="case-study-wrapper has-scroll-layout">
      {/* Main Case Study */}
      <div className="case-study-container">
        {vintedRewindTabs ? (
          <CaseScrollLayout
            prevProj={prevProj}
            nextProj={nextProj}
            openWindow={openWindow}
            lang={lang}
            miniTitle={d.title}
            miniDek={d.description || d.problemShort}
            introBlock={introBlock}
            sections={vintedRewindTabs.map(tab => ({
              id: tab.id,
              label: tab.label.replace(/^\p{Emoji}+\s*/u, '').toLowerCase(),
              chapterTitle: tab.label.replace(/^\p{Emoji}+\s*/u, ''),
              content: tab.panel,
            }))}
          />
        ) : (
          <CaseScrollLayout
            prevProj={prevProj}
            nextProj={nextProj}
            openWindow={openWindow}
            lang={lang}
            miniTitle={d.title}
            miniDek={d.description || d.problemShort}
            introBlock={introBlock}
            sections={(project.id === 'soulsphere'
              /* Small first-semester chatbot build — merge Identity & Design with Outcome. */
              ? [
                {
                  id: 'results',
                  label: 'design & outcome',
                  chapterTitle: lang === 'de' ? 'Design & Ergebnis' : 'Design & Outcome',
                  content: <>{designPanel}{resultsPanel}</>,
                },
                {
                  id: 'research',
                  label: 'process',
                  chapterTitle: 'Research & Testing',
                  content: researchPanel,
                },
                {
                  id: 'reflection',
                  label: 'reflection',
                  chapterTitle: '',
                  content: reflectionPanel,
                },
              ]
              : [
                {
                  id: 'results',
                  label: 'outcome',
                  chapterTitle: project.id === 'echoes' ? 'The Echoes Zone' : 'Outcome & Impact',
                  content: resultsPanel,
                },
                {
                  id: 'design',
                  label: 'identity & design',
                  chapterTitle: 'Identity & Design',
                  content: designPanel,
                },
                {
                  id: 'research',
                  label: 'process',
                  chapterTitle: lang === 'de' ? 'Process & Research' : 'Process & Research',
                  content: researchPanel,
                },
                {
                  id: 'reflection',
                  label: 'reflection',
                  chapterTitle: '',   /* heading lives inside the lilac field instead */
                  content: reflectionPanel,
                },
              ])}
          />
        )}
      </div>

      {/* Bottom pager removed — prev/next now lives in CaseScrollLayout's sticky bottom nav. */}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   PROJECTS OVERVIEW (folder)
═════════════════════════════════════════════════════════════════════ */
/* ProjectsOverview — Projects.exe. Now hosts the skill→project mapping
   that used to float on the desktop, as a filter chip row. Two-mode:
     · HOVER chip → matching projects highlighted, others dim
     · CLICK chip → opens that <Skill>.exe detail window
     · Shift+CLICK → pin the filter (sticky) */
function ProjectsOverview({ t, lang, openProject }) {
  /* All visible projects: completed first (in array order), then WIPs. */
  const projects = PROJECTS.filter(p => p.status === 'completed' || p.status === 'wip');
  const completed = projects.filter(p => p.status === 'completed');
  const wips = projects.filter(p => p.status === 'wip');
  const ordered = [...completed, ...wips];

  return (
    <div className="projects-content">
      <div className="projects-header">
        <h2 className="projects-title">
          {lang === 'de' ? '📁 Meine Projekte' : '📁 My Projects'}
        </h2>
        <p className="projects-subtitle">
          {lang === 'de'
            ? `${projects.length} Projekte · Doppelklick um zu öffnen`
            : `${projects.length} projects · Double-click to open`}
        </p>
      </div>

      <div className="projects-simple-grid">
        {ordered.map(project => {
          const d = project[lang];
          const isWip = project.status === 'wip';
          return (
            <div
              key={project.id}
              className={`project-grid-item ${isWip ? 'project-grid-item--wip' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => openProject(project.id)}
              onDoubleClick={() => openProject(project.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(project.id); } }}
              title={d.title}
            >
              <div className="project-grid-icon" aria-hidden="true">{project.emoji}</div>
              <p className="project-grid-name">{d.title}</p>
              {d.roleChips?.length > 0 && (
                <div className="project-grid-chips">
                  {d.roleChips.slice(0, 2).map((chip, i) => (
                    <span key={i} className="project-grid-chip">{chip}</span>
                  ))}
                </div>
              )}
              {isWip && (
                <span className="project-grid-wip-badge">
                  🔄 {lang === 'de' ? 'In Arbeit' : 'In Progress'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="projects-footer">
        <small>
          {lang === 'de'
            ? 'Klick oder Doppelklick um eine Case Study zu öffnen'
            : 'Click or double-click to open a case study'}
        </small>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   SKILLS WINDOW
═════════════════════════════════════════════════════════════════════ */
function SkillsContent({ t, lang }) {
  const s = t.skills;
  return (
    <div className="content">
      <h1>{t.skills_section}</h1>
      <p className="mono">{lang === 'de' ? 'Was ich auf dem Tisch habe — kein Skill-Slop, nur ehrlich gewichtet.' : 'What I actually bring — no skill slop, honestly weighted.'}</p>

      <h2>{lang === 'de' ? 'Selbsteinschätzung' : 'Self-assessment'}</h2>
      {t.skill_bars.map((b,i) => (
        <div key={i} className="skill-row">
          <div>{b.label}</div>
          <div className="bar"><div style={{ width: `${b.pct}%` }} /></div>
          <div style={{ textAlign: 'right' }}>{b.pct}</div>
        </div>
      ))}

      <h2>{t.methods}</h2>
      <div className="tag-row">{s.methods.map(x => <span key={x} className="chip">{x}</span>)}</div>

      <h2>{t.tools}</h2>
      <div className="tag-row">{s.tools.map(x => <span key={x} className="chip blue">{x}</span>)}</div>

      <h2>{t.languages}</h2>
      <ul>{s.langs.map((x,i) => <li key={i}>{x}</li>)}</ul>

      <h2>{t.soft_skills}</h2>
      <div className="tag-row">{s.soft.map(x => <span key={x} className="chip pink">{x}</span>)}</div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   CV / TIMELINE WINDOW
═════════════════════════════════════════════════════════════════════ */
function CVContent({ t, lang, onDownload }) {
  return (
    <div className="content">
      <h1>{t.cv_section}</h1>
      <div style={{ display:'flex', gap:8, marginBottom: 10, flexWrap:'wrap' }}>
        <button className="pix-btn primary" onClick={onDownload}>⬇ {t.download_cv}</button>
        <a className="pix-btn" href={`mailto:${NURIA.email}`}>✉ {NURIA.email}</a>
      </div>
      {t.timeline_items.map((it, i) => (
        <div key={i} className="cv-row">
          <div className="cv-year">{it.year}</div>
          <div className="cv-body">
            <strong>{it.title}</strong>
            <p>{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   ABOUT / INTRO WINDOW
═════════════════════════════════════════════════════════════════════ */
/* Categorise a timeline item from its title — keeps data.jsx untouched */
function timelineCat(title) {
  if (/Colegio|Spanien|Andalusien|exchange|Auslandsj/i.test(title)) return 'ausland';
  if (/B\.Sc|Abitur|Hochschule|Bachelor|Therese|Klasse|Computer Science|Informatik/i.test(title)) return 'studium';
  return 'job';
}

const LANGS = [
  { code: 'ES', flag: '🇪🇸', label_de: 'Spanisch',     label_en: 'Spanish',  level_de: 'Muttersprache', level_en: 'native',  pct: 100 },
  { code: 'DE', flag: '🇩🇪', label_de: 'Deutsch',       label_en: 'German',   level_de: 'Fließend',      level_en: 'fluent',  pct: 95 },
  { code: 'EN', flag: '🇬🇧', label_de: 'Englisch',      label_en: 'English',  level_de: 'B2',            level_en: 'B2',      pct: 70 },
  { code: 'IT', flag: '🇮🇹', label_de: 'Italienisch',   label_en: 'Italian',  level_de: 'A1',            level_en: 'A1',      pct: 25 },
];

/* AboutEditorIntro — the intro framed as a live text editor: fake menu bar,
   the tagline types itself out with a blinking caret, status bar at the foot. */
function AboutEditorIntro({ lang, tagline }) {
  const full = tagline || '';
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    setN(0);
    let i = 0, id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1; setN(i);
        if (i >= full.length) clearInterval(id);
      }, 34);
    }, 350);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [full]);
  const done = n >= full.length;
  return (
    <div className="case-intro-block about-editor">
      <div className="about-editor-menubar" aria-hidden="true">
        <span className="about-editor-dot r" />
        <span className="about-editor-dot y" />
        <span className="about-editor-dot g" />
        <span className="about-editor-menus">{lang === 'de' ? 'Datei  Bearbeiten  Ansicht  Hilfe' : 'File  Edit  View  Help'}</span>
        <span className="about-editor-fname">About_Me.txt</span>
      </div>
      <div className="about-editor-body about-editor-cols">
        <div className="about-editor-text">
          <h1 className="case-intro-title">
            {lang === 'de' ? `Hallo, ich bin ${NURIA.name}` : `Hi, I'm ${NURIA.name}`}
          </h1>
          <p className="case-intro-desc about-editor-line">
            {full.slice(0, n)}
            <span className={'tw-caret' + (done ? ' is-blink' : '')} aria-hidden="true">▋</span>
          </p>
          <div className="case-intro-tags">
            <span className="case-intro-tag">📍 {NURIA.location}</span>
            <span className="case-intro-tag">📅 WS 26/27</span>
            <span className="case-intro-tag">UX/UI</span>
            <span className="case-intro-tag">Service Design</span>
            <span className="case-intro-tag">B.Sc. HM München</span>
          </div>
        </div>
        <div className="about-portrait">
          <img src={NURIA.pixelPhoto || NURIA.photo} alt={NURIA.name} />
          <span className="about-portrait-bubble" aria-hidden="true">¡Hola! 👋</span>
        </div>
      </div>
      <div className="about-editor-statusbar" aria-hidden="true">
        <span className={done ? '' : 'is-typing'}>{done ? (lang === 'de' ? 'Bereit' : 'Ready') : (lang === 'de' ? 'Schreibt…' : 'Typing…')}</span>
        <span>{lang === 'de' ? 'Zeile' : 'Ln'} 3, {lang === 'de' ? 'Spalte' : 'Col'} {n + 1}</span>
        <span>UTF-8</span>
        <span>{lang === 'de' ? 'DE' : 'EN'}</span>
        <span>100%</span>
      </div>
    </div>
  );
}

/* CvMap — the Werdegang as a winding route: stations alternate left/right,
   a smooth SVG path threads through them, and pixel_me walks along the line
   driven by the scroll position inside the case-study container. */
function CvMap({ items, pixelSrc }) {
  const stageRef = React.useRef(null);
  const nodeRefs = React.useRef([]);
  const pathRef = React.useRef(null);
  const markerRef = React.useRef(null);
  const [geo, setGeo] = React.useState({ w: 0, h: 0, d: '' });

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
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro && stageRef.current) ro.observe(stageRef.current);
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 300);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, [measure, items]);

  /* Scroll-driven walker: map the section's scroll progress to a point on the path. */
  React.useEffect(() => {
    const path = pathRef.current;
    const marker = markerRef.current;
    const stage = stageRef.current;
    if (!path || !marker || !stage || !geo.d) return;
    let len = 0;
    try { len = path.getTotalLength(); } catch (e) { return; }
    if (!len) return;
    const scrollRoot = stage.closest('.case-study-container');
    const scroller = scrollRoot || window;
    let ticking = false;
    const update = () => {
      ticking = false;
      const sb = stage.getBoundingClientRect();
      const rootRect = scrollRoot
        ? scrollRoot.getBoundingClientRect()
        : { top: 0, height: window.innerHeight };
      const line = rootRect.top + rootRect.height * 0.5;
      const p = Math.max(0, Math.min(1, (line - sb.top) / (sb.height || 1)));
      const pt = path.getPointAtLength(p * len);
      marker.style.transform = `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%)`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [geo]);

  if (!items || items.length === 0) return null;

  return (
    <div className="cvmap" ref={stageRef}>
      <svg className="cvmap-path" width={geo.w} height={geo.h} aria-hidden="true">
        <path ref={pathRef} d={geo.d} />
      </svg>
      {items.map((it, i) => (
        <div key={i} className="cvmap-station" data-side={i % 2 === 0 ? 'left' : 'right'} data-cat={timelineCat(it.title)}>
          <span className="cvmap-node" ref={(el) => { nodeRefs.current[i] = el; }} />
          <div className="cvmap-card reveal">
            <span className="cvmap-year">{it.year}</span>
            <strong>{it.title}</strong>
            <p>{it.body}</p>
          </div>
        </div>
      ))}
      <img className="cvmap-walker" ref={markerRef} src={pixelSrc} alt="" aria-hidden="true" />
    </div>
  );
}

/* PixelDissolve — a band of square pixels that scatter upward from a solid
   edge: bottom rows full, upper rows increasingly sparse. Y2K dissolve look. */
function PixelDissolve({ cols = 30, rows = 7, color }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const threshold = Math.pow(r / (rows - 1), 1.8);
      const h = Math.sin(r * 127.1 + c * 311.7) * 43758.5453;
      const rnd = h - Math.floor(h);
      if (r === rows - 1 || rnd < threshold) {
        cells.push(<span key={`${r}-${c}`} style={{ gridColumn: c + 1, gridRow: r + 1, background: color }} />);
      }
    }
  }
  return (
    <div
      className="touch-dissolve"
      aria-hidden="true"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, aspectRatio: `${cols} / ${rows}` }}
    >
      {cells}
    </div>
  );
}

/* DvdBouncer — the classic DVD-screensaver bounce inside the contact panel:
   a little badge drifts and bounces off the walls, switching colour on each hit. */
function DvdBouncer() {
  const wrapRef = React.useRef(null);
  const elRef = React.useRef(null);
  React.useEffect(() => {
    const wrap = wrapRef.current;
    const el = elRef.current;
    if (!wrap || !el) return;
    const colors = ['#7FA7DA', '#F2E59E', '#E8C1D3', '#8FB39A', '#CF5E66', '#FFFFFF'];
    let ci = 0;
    let x = 24, y = 18;
    let vx = 0.85, vy = 0.7;
    let raf;
    const step = () => {
      const W = wrap.clientWidth, H = wrap.clientHeight;
      const w = el.offsetWidth, h = el.offsetHeight;
      if (W && H) {
        x += vx; y += vy;
        let bounced = false;
        if (x <= 0) { x = 0; vx = Math.abs(vx); bounced = true; }
        else if (x + w >= W) { x = W - w; vx = -Math.abs(vx); bounced = true; }
        if (y <= 0) { y = 0; vy = Math.abs(vy); bounced = true; }
        else if (y + h >= H) { y = H - h; vy = -Math.abs(vy); bounced = true; }
        if (bounced) { ci = (ci + 1) % colors.length; el.style.backgroundColor = colors[ci]; }
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="dvd-stage" ref={wrapRef} aria-hidden="true">
      <span className="dvd-badge" ref={elRef} />
    </div>
  );
}

/* ScrollProgress — thin bar at the top of the About window tracking how far
   the visitor has scrolled through the case-study container. */
function ScrollProgress() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const scroller = bar.closest('.case-study-wrapper')?.querySelector('.case-study-container');
    if (!scroller) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = scroller.scrollHeight - scroller.clientHeight;
      const p = max > 0 ? scroller.scrollTop / max : 0;
      bar.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return <div className="about-progress" aria-hidden="true"><div className="about-progress-fill" ref={ref} /></div>;
}

/* TouchContactPanel — the dark "LET'S GET IN TOUCH" hero used by Contact.exe.
   (The About contact tab uses the lighter AboutContactPanel instead.) Clicking
   the email/mail button copies the address to the clipboard (with feedback)
   and still tries mailto, so it works even when no default mail app is set. */
function TouchContactPanel({ t, lang, cols = 28 }) {
  const [copied, setCopied] = React.useState(false);
  const copyMail = () => {
    try { navigator.clipboard?.writeText(NURIA.email); } catch (e) { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section className="touch">
      <PixelDissolve cols={cols} rows={7} color="var(--touch-bg)" />
      <div className="touch-body">
        <DvdBouncer />
        <div className="touch-content">
          <h2 className="touch-title">LET'S GET<br />IN TOUCH</h2>
          <div className="touch-rows">
            <div className="touch-row">
              <span className="touch-k">[ E-MAIL ]</span>
              <a className="touch-v" href={`mailto:${NURIA.email}`} onClick={copyMail}>{NURIA.email}</a>
            </div>
            <div className="touch-row">
              <span className="touch-k">[ LINKEDIN ]</span>
              <a className="touch-v" href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">{NURIA.linkedin}</a>
            </div>
            {NURIA.phone && (
              <div className="touch-row">
                <span className="touch-k">[ {lang === 'de' ? 'TELEFON' : 'PHONE'} ]</span>
                <a className="touch-v" href={`tel:${NURIA.phone.replace(/\s+/g, '')}`}>{NURIA.phone}</a>
              </div>
            )}
            <div className="touch-row">
              <span className="touch-k">[ {lang === 'de' ? 'STANDORT' : 'LOCATION'} ]</span>
              <span className="touch-v touch-v-static">{NURIA.location}</span>
            </div>
          </div>
          <div className="touch-cta">
            <a className="touch-btn" href={`mailto:${NURIA.email}`} onClick={copyMail}>✉ {t.contact_cta}</a>
            <a className="touch-btn ghost" href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">in LinkedIn</a>
            <a className="touch-btn ghost" href="assets/Nuria_Kurrle_CV.pdf" download>⬇ {t.download_cv}</a>
          </div>
          <p className="touch-copied" aria-live="polite">
            {copied
              ? (lang === 'de' ? '✓ E-Mail kopiert — füg sie in dein Mailprogramm ein' : '✓ Email copied — paste it into your mail app')
              : ''}
          </p>
        </div>
      </div>
    </section>
  );
}

/* AboutContactPanel — editorial, LIGHT contact block for the About window's
   Kontakt tab. Speaks the same calm about-block / about-facts language as the
   other tabs instead of the loud dark Contact.exe hero (TouchContactPanel),
   which stays in ContactContent where it belongs. Clicking the email copies
   the address (with feedback) and still tries mailto. */
function AboutContactPanel({ t, lang, onProjects }) {
  const [copied, setCopied] = React.useState(false);
  const copyMail = () => {
    try { navigator.clipboard?.writeText(NURIA.email); } catch (e) { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="about-contact">
      <p className="about-lede">
        {lang === 'de'
          ? 'Lust auf Zusammenarbeit? Ob Praxissemester, ein gemeinsames Service-Design-Projekt oder der Einstieg in euer Team — schreib mir gern. Ich antworte schnell und freue mich darauf, mit euch etwas aufzubauen.'
          : "Want to work together? Whether it's a practical semester, a joint service-design project or joining your team — drop me a line. I reply fast and would love to build something with you."}
      </p>

      <div className="about-block">
        <span className="about-block-label">{lang === 'de' ? 'Kontakt' : 'Contact'}</span>
        <div className="about-facts about-contact-facts">
          <div className="about-fact">
            <span className="about-fact-k">{lang === 'de' ? 'E-Mail' : 'Email'}</span>
            <a className="about-fact-v about-contact-link" href={`mailto:${NURIA.email}`} onClick={copyMail}>{NURIA.email}</a>
          </div>
          <div className="about-fact">
            <span className="about-fact-k">LinkedIn</span>
            <a className="about-fact-v about-contact-link" href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">{NURIA.linkedin}</a>
          </div>
          {NURIA.phone && (
            <div className="about-fact">
              <span className="about-fact-k">{lang === 'de' ? 'Telefon' : 'Phone'}</span>
              <a className="about-fact-v about-contact-link" href={`tel:${NURIA.phone.replace(/\s+/g, '')}`}>{NURIA.phone}</a>
            </div>
          )}
          <div className="about-fact">
            <span className="about-fact-k">{lang === 'de' ? 'Ort' : 'Location'}</span>
            <span className="about-fact-v">{NURIA.location}</span>
          </div>
        </div>
      </div>

      <div className="about-contact-cta">
        <a className="about-cta-btn" href={`mailto:${NURIA.email}`} onClick={copyMail}>✉ {t.contact_cta}</a>
        <a className="about-cta-btn ghost" href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">in LinkedIn</a>
        <a className="about-cta-btn ghost" href="assets/Nuria_Kurrle_CV.pdf" download>⬇ {t.download_cv}</a>
        {onProjects && (
          <button className="about-cta-btn ghost" type="button" onClick={onProjects}>
            {lang === 'de' ? 'Projekte ansehen' : 'See projects'} →
          </button>
        )}
      </div>
      <p className="about-contact-copied" aria-live="polite">
        {copied
          ? (lang === 'de' ? '✓ E-Mail kopiert — füg sie in dein Mailprogramm ein' : '✓ Email copied — paste it into your mail app')
          : ''}
      </p>
    </div>
  );
}

function AboutContent({ t, lang, openWindow, closeWindow }) {
  /* About_Me.txt — warm, personal page split into 4 tabs:
       Profil   → who I am + how I work + fun facts
       Skills   → 3-col badge wall (Design / Tech / Languages), click → .exe
       CV       → Werdegang timeline with category filter chips
       Kontakt  → email/LinkedIn/phone + message form */

  /* ── Buffer-style intro for About: photo + h1 + tagline + meta-pills */
  const aboutIntroBlock = (
    <AboutEditorIntro lang={lang} tagline={t.tagline} />
  );

  /* ── Profile panel — airy editorial: lede + facts + interests */
  const profilPanel = (
    <div className="tab-content about-profile">
      <p className="about-lede">
        {lang === 'de'
          ? 'Informatik- & Design-Studentin an der Hochschule München mit großem Interesse an UX, Service Design & Research — aus Argentinien, heute in München zuhause. Mehrsprachig und neugierig: Ich verstehe echte Probleme durch echte Forschung und übersetze sie in klare, menschliche Lösungen — von der ersten Journey Map bis zum lebenden Prototyp im Code.'
          : "Computer science & design student at Munich UAS with a strong interest in UX, service design & research — from Argentina, now at home in Munich. Multilingual and curious: I understand real problems through genuine research and turn them into clear, human solutions — from the first journey map to a living prototype in code."}
      </p>

      <div className="about-block">
        <span className="about-block-label">{lang === 'de' ? 'Was ich suche' : "What I'm looking for"}</span>
        <div className="about-facts">
          <div className="about-fact">
            <span className="about-fact-k">{lang === 'de' ? 'Position' : 'Position'}</span>
            <span className="about-fact-v">{lang === 'de' ? 'Praxissemester · UX / Service Design' : 'Practical semester · UX / Service Design'}</span>
          </div>
          <div className="about-fact">
            <span className="about-fact-k">{lang === 'de' ? 'Zeit' : 'Time'}</span>
            <span className="about-fact-v">WS 26/27</span>
          </div>
          <div className="about-fact">
            <span className="about-fact-k">{lang === 'de' ? 'Ort' : 'Location'}</span>
            <span className="about-fact-v">{lang === 'de' ? 'München' : 'Munich'}</span>
          </div>
          <div className="about-fact">
            <span className="about-fact-k">{lang === 'de' ? 'Mindset' : 'Mindset'}</span>
            <span className="about-fact-v">{lang === 'de' ? 'Research first, dann designen & coden' : 'Research first, then design & code'}</span>
          </div>
        </div>
      </div>

      <div className="about-block">
        <span className="about-block-label">{lang === 'de' ? 'Abseits der Arbeit' : 'Off the clock'}</span>
        <div className="interest-chips">
          {[
            { e: '🇦🇷', de: 'Aus Argentinien', en: 'From Argentina' },
            { e: '🎬', de: 'Filme schauen & reviewen', en: 'Watching & reviewing films' },
            { e: '🎧', de: 'Immer Musik im Ohr', en: 'Always music on' },
            { e: '🧁', de: 'Backt, um anderen eine Freude zu machen', en: 'Bakes to make people happy' },
            { e: '🎉', de: 'Organisiert gern Geburtstage & kleine Events', en: 'Loves organizing birthdays & small events' },
            { e: '📼', de: 'Hoffnungslos nostalgisch', en: 'Hopelessly nostalgic' },
          ].map((x, i) => (
            <span className="interest-chip" key={i}>
              <span className="interest-chip-e" aria-hidden="true">{x.e}</span>
              {lang === 'de' ? x.de : x.en}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Skills panel — content cleared per request */
  const skillGroups = [
    {
      title: lang === 'de' ? 'Design' : 'Design',
      items: [
        { logo: 'figma_logo.png', name: 'Figma' },
        { logo: 'ui_ux_logo.png', name: 'UI/UX Design' },
        { logo: 'adobe_illustrator.png', name: 'Illustrator' },
      ],
    },
    {
      title: lang === 'de' ? 'Entwicklung' : 'Development',
      items: [
        { logo: 'react_logo.png', name: 'React' },
        { logo: 'html_css_logo.png', name: 'HTML / CSS' },
        { logo: 'nodejs_logo.png', name: 'Node.js' },
        { logo: 'python.png', name: 'Python' },
      ],
    },
    {
      title: lang === 'de' ? 'Tools & AI' : 'Tools & AI',
      items: [
        { logo: 'n8n_logo.png', name: 'n8n' },
        { logo: 'docker_logo.png', name: 'Docker' },
        { logo: 'openai.png', name: 'OpenAI' },
      ],
    },
  ];
  const skillsPanel = (
    <div className="tab-content">
      {skillGroups.map((g, gi) => (
        <section className="skills-section" key={gi}>
          <h3 className="skills-group-h">{g.title}</h3>
          <div className="skills-logo-grid">
            {g.items.map((s, i) => (
              <div className="skill-logo-card reveal" key={i}>
                <img src={`assets/logos/${s.logo}`} alt={s.name} loading="lazy" />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <section className="skills-section">
        <h3 className="skills-group-h">{lang === 'de' ? 'Sprachen' : 'Languages'}</h3>
        <div className="skills-logo-grid">
          {LANGS.map((l) => (
            <div className="skill-logo-card skill-lang-card reveal" key={l.code}>
              <span className="skill-lang-flag" aria-hidden="true">{l.flag}</span>
              <span>{l[`label_${lang}`]}</span>
              <span className="skill-lang-level">{l[`level_${lang}`]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  /* ── CV panel — timeline as a winding map */
  const cvPanel = (
    <div className="tab-content">
      <CvMap items={t.timeline_items} pixelSrc={NURIA.pixelPhoto || NURIA.photo} />
    </div>
  );

  /* ── Kontakt panel */
  const kontaktPanel = (
    <div className="tab-content">
      <AboutContactPanel
        t={t}
        lang={lang}
        onProjects={openWindow ? () => { openWindow('recruiter'); closeWindow && closeWindow('about'); } : undefined}
      />
    </div>
  );

  return (
    <div className="case-study-wrapper has-scroll-layout about-window">
      <ScrollProgress />
      <div className="case-study-container">
        <CaseScrollLayout
          noProjectNav
          openWindow={openWindow}
          lang={lang}
          miniTitle={lang === 'de' ? 'about_me' : 'about_me'}
          miniDek={lang === 'de' ? 'UX/UI & Service Design Studentin · HM München' : 'UX/UI & Service Design student · HM Munich'}
          introBlock={aboutIntroBlock}
          sections={[
            { id: 'profile',    label: lang === 'de' ? 'profil'    : 'profile',    chapterTitle: lang === 'de' ? 'Über mich' : 'About me',    content: profilPanel },
            { id: 'skills',     label: lang === 'de' ? 'skills'    : 'skills',     chapterTitle: lang === 'de' ? 'Skills & Tools' : 'Skills & Tools', content: skillsPanel },
            { id: 'background', label: lang === 'de' ? 'werdegang' : 'background', chapterTitle: lang === 'de' ? 'Werdegang' : 'Background', content: cvPanel },
            { id: 'contact',    label: lang === 'de' ? 'kontakt'   : 'contact',    chapterTitle: '',    content: kontaktPanel },
          ]}
        />
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   CONTACT WINDOW
═════════════════════════════════════════════════════════════════════ */
function ContactContent({ t, lang }) {
  return (
    <div className="content contact-exe">
      <TouchContactPanel t={t} lang={lang} cols={26} />
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   DASHBOARD.EXE — single hub window for Calm mode
   ─────────────────────────────────────────────────────────────────────
   Replaces the desktop + Recruiter+About cascade with ONE navigator
   window. Four tabs: Profile · Projects · Experience · Contact.
   Each tab is the calm distillation of the equivalent playful surface.
═════════════════════════════════════════════════════════════════════ */
function DashProfile({ t, lang }) {
  return (
    <>
      <section className="dash-profile-hero">
        <div className="dash-profile-photo">
          <img src={NURIA.photo} alt={NURIA.name} />
        </div>
        <div className="dash-profile-text">
          <h1>{NURIA.name}</h1>
          <div className="dash-profile-tag mono">{t.role}</div>
          <div className="dash-pill-row">
            <span className="dash-pill dash-pill-mint">● {t.availability}</span>
            <span className="dash-pill">📍 {NURIA.location}</span>
            <span className="dash-pill">🌐 ES · DE · EN · IT</span>
          </div>
        </div>
      </section>
      <h2>{lang === 'de' ? 'Wer ich bin' : 'Who I am'}</h2>
      <p>{t.recruiter_intro}</p>
      <p style={{ fontStyle: 'italic', color: 'var(--ink-soft)' }}>{t.recruiter_quote || t.tagline}</p>
      <h2>{t.why_me}</h2>
      <ul>{t.why_bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
    </>
  );
}

function DashProjects({ t, lang, openWindow }) {
  return (
    <>
      <p className="mono" style={{ margin: '0 0 14px', color: 'var(--ink-soft)' }}>
        {lang === 'de'
          ? `${PROJECTS.length} Case Studies — klick öffnet Vollansicht.`
          : `${PROJECTS.length} case studies — click to open full view.`}
      </p>
      <div className="project-list">
        {PROJECTS.map((p, i) => {
          const d = p[lang];
          const stack = (p.devLog?.stack || d.tools || []).slice(0, 4).join(' · ');
          return (
            <button key={p.id} className="project-row" onClick={() => openWindow(p.id)}>
              <span className="project-row-id">{String(i + 1).padStart(2, '0')}</span>
              <div className="project-row-body">
                <h3>{p.emoji} {d.title}</h3>
                <p>{d.solutionShort || d.problemShort}</p>
                <div className="project-row-meta mono">
                  {d.duration} · {d.role}{stack ? ` · ${stack}` : ''}
                </div>
              </div>
              <span className="project-row-arrow">→</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function DashExperience({ t, lang, onDownloadCV }) {
  const [cvFilter, setCvFilter] = useStateW('all');
  const CV_FILTERS = [
    { id: 'all',     label_de: 'Alle',       label_en: 'All' },
    { id: 'studium', label_de: '🎓 Studium', label_en: '🎓 Studies' },
    { id: 'job',     label_de: '💼 Job',     label_en: '💼 Work' },
    { id: 'ausland', label_de: '✈ Ausland',  label_en: '✈ Abroad' },
  ];
  const items = cvFilter === 'all'
    ? t.timeline_items
    : t.timeline_items.filter(it => timelineCat(it.title) === cvFilter);

  return (
    <>
      <div className="cv-toolbar">
        <button className="pix-btn primary" onClick={onDownloadCV}>⬇ {t.download_cv}</button>
        <div className="cv-filters">
          {CV_FILTERS.map(f => (
            <button
              key={f.id}
              type="button"
              className={`cv-filter-chip ${cvFilter === f.id ? 'on' : ''}`}
              onClick={() => setCvFilter(f.id)}
            >
              {f[`label_${lang}`]}
            </button>
          ))}
        </div>
      </div>
      {items.length === 0 && (
        <p className="mono" style={{ opacity: 0.7 }}>
          {lang === 'de' ? 'Keine Einträge.' : 'No entries.'}
        </p>
      )}
      {items.map((it, i) => (
        <div key={i} className="cv-row" data-cat={timelineCat(it.title)}>
          <div className="cv-year">{it.year}</div>
          <div className="cv-body">
            <strong>{it.title}</strong>
            <p>{it.body}</p>
          </div>
        </div>
      ))}
    </>
  );
}

function DashContact({ t, lang, onDownloadCV, openWindow }) {
  return (
    <>
      <div className="callout">
        <div className="mono" style={{ fontSize: 16, lineHeight: 1.8 }}>
          ✉ <a href={`mailto:${NURIA.email}`}>{NURIA.email}</a><br />
          in <a href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">{NURIA.linkedin}</a><br />
          {NURIA.phone && <>📞 <a href={`tel:${NURIA.phone.replace(/\s+/g,'')}`}>{NURIA.phone}</a><br /></>}
          📍 {NURIA.location}
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <a className="pix-btn primary" href={`mailto:${NURIA.email}?subject=${encodeURIComponent(lang==='de' ? 'Praxissemester WS 26/27 — Nuria Kurrle' : 'Internship Fall 26 / Spring 27 — Nuria Kurrle')}`}>✉ {t.contact_cta}</a>
          <a className="pix-btn" href={`https://${NURIA.linkedin}`} target="_blank" rel="noreferrer">in {t.linkedin_cta}</a>
          <button className="pix-btn warn" onClick={onDownloadCV}>⬇ {t.download_cv}</button>
          <button className="pix-btn" onClick={() => openWindow?.('quickpitch')}>🎯 {lang === 'de' ? '60-Sek-Pitch' : '60-sec pitch'}</button>
        </div>
      </div>
      <div className="callout mint" style={{ marginTop: 14 }}>
        <strong>{lang === 'de' ? 'Verfügbar für Praxissemester · WS 26/27' : 'Available for practical semester · Fall 26 / Spring 27'}</strong>
        <p style={{ marginTop: 4 }}>{lang === 'de'
          ? 'Nur München. Fokus: UX, Service Design, Research.'
          : 'Munich only. Focus: UX, service design, research.'}</p>
      </div>
    </>
  );
}

function DashboardContent({ t, lang, openWindow, onDownloadCV, openLightbox }) {
  return (
    <div className="content content-tabbed dashboard-content">
      <Tabs
        idPrefix="dash"
        defaultId="profile"
        tabs={[
          { id: 'profile',    label: (lang === 'de' ? '👤 Profil'      : '👤 Profile'),    panel: <DashProfile    t={t} lang={lang} /> },
          { id: 'projects',   label: (lang === 'de' ? '📂 Projekte'    : '📂 Projects'),   panel: <DashProjects   t={t} lang={lang} openWindow={openWindow} /> },
          { id: 'experience', label: (lang === 'de' ? '🕘 Werdegang'   : '🕘 Experience'), panel: <DashExperience t={t} lang={lang} onDownloadCV={onDownloadCV} /> },
          { id: 'contact',    label: (lang === 'de' ? '✉ Kontakt'      : '✉ Contact'),    panel: <DashContact    t={t} lang={lang} onDownloadCV={onDownloadCV} openWindow={openWindow} /> },
        ]}
      />
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   WIP LOADING MODAL — Win95-style dialog for in-progress projects
   ─────────────────────────────────────────────────────────────────────
   Shown when a recruiter clicks Clarity, Don Bosco, or any other
   project with status === 'wip'. Replaces the full case-study window:
   honest, fun, Win95-authentic, animated progress bar.
═════════════════════════════════════════════════════════════════════ */
function WIPLoadingModal({ project, lang, onClose }) {
  const d = project[lang] || project.de;
  const target = Number.isFinite(d.wipProgress) ? d.wipProgress : (project.progress || 50);
  const [progress, setProgress] = useStateW(0);

  /* Tick from 0 → target with a tiny random jitter for that authentic
     "installer is doing something" feel. Caps at target. */
  React.useEffect(() => {
    let raf;
    const id = setInterval(() => {
      setProgress(prev => {
        if (prev >= target) { clearInterval(id); return target; }
        return Math.min(target, prev + 1 + Math.random() * 6);
      });
    }, 220);
    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, [target]);

  /* Close on Esc */
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const shortName = (d.title || '').split('—')[0].trim() || d.title;
  const concept = d.wipShortConcept || d.problemShort || '';
  const description = d.wipDescription || d.problemShort || '';
  const phase = d.wipPhase || d.phase || (lang === 'de' ? 'In Arbeit' : 'In progress');
  const eta = d.wipETA || (lang === 'de' ? 'Bald' : 'Soon');

  return (
    <div className="wip-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={shortName}>
      <div className="wip-modal-window" onClick={e => e.stopPropagation()}>
        <div className="wip-title-bar">
          <div className="wip-title-text">
            ⏳ {shortName} — {lang === 'de' ? 'Lädt…' : 'Loading…'}
          </div>
          <button className="wip-close-btn" onClick={onClose} aria-label={lang === 'de' ? 'Schließen' : 'Close'}>✕</button>
        </div>

        <div className="wip-content">
          <div className="wip-header">
            <span className="wip-emoji" aria-hidden="true">{project.emoji}</span>
            <h2 className="wip-concept">{concept}</h2>
          </div>

          <p className="wip-description">{description}</p>

          <div className="wip-status">
            <span className="wip-status-badge">🔄 {phase}</span>
          </div>

          <div className="wip-progress-container">
            <div className="wip-progress-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
              <div className="wip-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="wip-progress-text">{Math.round(progress)}%</span>
          </div>

          <div className="wip-eta">
            <p className="wip-eta-blink">⏳ {lang === 'de' ? 'Kommt bald…' : 'Coming soon…'}</p>
            <p className="wip-eta-date">
              {lang === 'de' ? 'Geplant: ' : 'Planned: '}<strong>{eta}</strong>
            </p>
          </div>
        </div>

        <div className="wip-footer">
          <button className="wip-ok-btn" onClick={onClose} autoFocus>OK</button>
        </div>
      </div>
    </div>
  );
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
