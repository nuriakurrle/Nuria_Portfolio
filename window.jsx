/* global React, NURIA, STR, PROJECTS */
const { useState, useEffect, useRef, useCallback } = React;

/* ═════════════════════════════════════════════════════════════════════
   DRAGGABLE WINDOW
═════════════════════════════════════════════════════════════════════ */
function Win({ win, t, onClose, onMinimize, onFocus, isActive, children }) {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [size, setSize] = useState({ w: win.w, h: win.h });
  const [maximized, setMaximized] = useState(false);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const drag = useRef(null);

  /* Scroll-indicator: toggles `.has-scroll` on .win-body when content
     exceeds the viewport AND we're not already at the bottom. CSS appends
     a "▾ mehr ▾" hint. ResizeObserver re-checks on window resize. */
  const bodyRef = useRef(null);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const check = () => {
      const scrollable = el.scrollHeight > el.clientHeight + 4;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
      el.classList.toggle('has-scroll', scrollable && !atBottom);
    };
    check();
    el.addEventListener('scroll', check);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', check); ro.disconnect(); };
  }, []);

  const onMouseDown = (e) => {
    if (e.target.closest('.win-ctrl')) return;
    onFocus();
    drag.current = { startX: e.clientX, startY: e.clientY, ox: pos.x, oy: pos.y };
    e.currentTarget.classList.add('dragging');
  };
  useEffect(() => {
    const mv = (e) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.startX;
      const dy = e.clientY - drag.current.startY;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 200, drag.current.ox + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 80, drag.current.oy + dy)),
      });
    };
    const up = () => {
      if (drag.current) {
        document.querySelectorAll('.win-titlebar').forEach(el => el.classList.remove('dragging'));
      }
      drag.current = null;
    };
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
  }, []);

  const style = maximized
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 30px)', zIndex: win.z }
    : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: win.z };

  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(id);
  }, []);

  const handleClose = useCallback(() => {
    // animate out before calling parent onClose
    setExiting(true);
    setTimeout(() => onClose && onClose(), 220);
  }, [onClose]);

  return (
    <div className={`win ${isActive ? 'active' : ''} ${entered ? 'entered' : ''} ${exiting ? 'exiting' : ''}`} style={style} onMouseDown={onFocus} data-screen-label={win.label}>
      <div className="win-titlebar" onMouseDown={onMouseDown} onDoubleClick={() => setMaximized(m => !m)}>
        <span className="win-icon">{win.icon}</span>
        <span className="win-title">{win.title}</span>
        <div className="win-controls">
          <button className="win-ctrl" onClick={onMinimize} title={t.minimize} aria-label={t.minimize}>_</button>
          <button className="win-ctrl" onClick={() => setMaximized(m => !m)} title={t.maximize} aria-label={t.maximize}>▢</button>
          <button className="win-ctrl" onClick={handleClose} title={t.close} aria-label={t.close}>✕</button>
        </div>
      </div>
      {!win.noMenubar && (
        <div className="win-menubar">
          <span className="win-menu-item"><u>{t.file[0]}</u>{t.file.slice(1)}</span>
          <span className="win-menu-item"><u>{t.edit[0]}</u>{t.edit.slice(1)}</span>
          <span className="win-menu-item"><u>{t.view[0]}</u>{t.view.slice(1)}</span>
          <span className="win-menu-item"><u>{t.help[0]}</u>{t.help.slice(1)}</span>
        </div>
      )}
      <div className="win-body" ref={bodyRef}>{children}</div>
      {!win.noStatusbar && (
        <div className="win-statusbar">
          <div>{win.statusLeft || 'Ready'}</div>
          <div style={{flex:0, minWidth:90}}>C:\nuria\</div>
        </div>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   DESKTOP ICONS
═════════════════════════════════════════════════════════════════════ */
function DeskIcon({ id, label, emoji, badge, attention, selected, dimmed, matched, matchColor, tooltip, onClick, onDouble, double, onHoverChange }) {
  const [hover, setHover] = React.useState(false);
  const setHoverBoth = (h) => { setHover(h); onHoverChange?.(h); };
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      (onDouble || onClick)?.();
    }
  };
  const style = matched && matchColor ? { '--match-color': matchColor } : undefined;
  return (
    <div
      className={`desk-icon ${selected ? 'selected' : ''} ${dimmed ? 'dimmed' : ''} ${matched ? 'matched' : ''}`}
      style={style}
      onClick={onClick}
      onDoubleClick={onDouble}
      onKeyDown={handleKey}
      onMouseEnter={() => setHoverBoth(true)}
      onMouseLeave={() => setHoverBoth(false)}
      onFocus={() => setHoverBoth(true)}
      onBlur={() => setHoverBoth(false)}
      role="button"
      tabIndex={0}
      aria-label={`${label}${badge ? ' — ' + badge : ''}${tooltip ? ' — ' + tooltip : ''}`}
      aria-disabled={dimmed || undefined}
    >
      {matched && <span className="ico-sparkle" aria-hidden="true">✦</span>}
      <div className={`ico-glyph ${attention ? 'ico-attention' : ''}`} aria-hidden="true">
        {emoji}
        {badge && <span className={`ico-badge ico-badge--${badge.toLowerCase()}`}>{badge}</span>}
      </div>
      <span className="ico-label">{label}</span>
      {tooltip && hover && (
        <div className="desk-icon-tooltip" role="tooltip">{tooltip}</div>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   PLACEHOLDER MEDIA
   Renders real images when given a `src`, or the striped placeholder
   if no asset exists yet. Caption stays on hover via the zoom-hint.
═════════════════════════════════════════════════════════════════════ */
function Placeholder({ caption, src, bg, h = 180, onZoom, label, chapterNum, width, height, alt, pixelated }) {
  const chapter = label && (
    <div className="tile-chapter">
      {chapterNum != null && <span className="tile-chapter-num">{String(chapterNum).padStart(2, '0')}</span>}
      <span className="tile-chapter-label">{label}</span>
    </div>
  );
  if (src) {
    return (
      <div
        className="placeholder placeholder-real"
        style={{ minHeight: h, background: bg || '#fff', padding: 0 }}
        onClick={onZoom}
      >
        {chapter}
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className={/pixel|mascot|vinti|logo|pixelart/i.test(src) ? 'pixelated' : undefined}
        />
        <div className="zoom-hint">🔍 {caption}</div>
      </div>
    );
  }
  return (
    <div className="placeholder" style={{ minHeight: h }} onClick={onZoom}>
      {chapter}
      <div>{caption}</div>
      <div className="zoom-hint">🔍 zoom</div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   VIDEO TILE (VHS-style placeholder)
═════════════════════════════════════════════════════════════════════ */
function VideoTile({ caption, duration = '00:42', onZoom, mini, src, poster }) {
  /* If a real video file exists, render an inline <video> with controls.
     Click anywhere on the tile (except the controls) still opens lightbox.
     If no src, fall back to the VHS-style fake-video placeholder. */
  if (src) {
    return (
      <div className="video-tile video-tile-real" onClick={onZoom}>
        <video
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
          onClick={(e) => e.stopPropagation()}
        />
        {!mini && caption && <span className="vhs-caption">{caption}</span>}
        {duration && <span className="vhs-time">{duration}</span>}
      </div>
    );
  }
  return (
    <div className="video-tile" onClick={onZoom}>
      <span className="vhs-meta">CH-04</span>
      <div className="play" />
      <span className="vhs-caption">{mini ? '' : caption}</span>
      <span className="vhs-time">{duration}</span>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   BEFORE / AFTER SLIDER  — Vorher / Nachher for logo iterations
═════════════════════════════════════════════════════════════════════ */
function BeforeAfterSlider({ before, after, beforeLabel = 'Vorher', afterLabel = 'Nachher', caption, bg, beforeWidth, beforeHeight, afterWidth, afterHeight, pixelated }) {
  const [pos, setPos] = React.useState(50);
  return (
    <div className="ba-slider" onClick={(e) => e.stopPropagation()}>
      <div className="ba-frame" style={{ background: bg || '#1B2236' }}>
        <img
          src={after}
          alt={afterLabel}
          className={`ba-img ${pixelated ? 'pixelated' : ''}`}
          width={afterWidth}
          height={afterHeight}
        />
        <div className="ba-clip" style={{ width: `${pos}%` }}>
          <img
            src={before}
            alt={beforeLabel}
            className={`ba-img ${pixelated ? 'pixelated' : ''}`}
            width={beforeWidth}
            height={beforeHeight}
          />
        </div>
        <span className="ba-label ba-label-before">{beforeLabel}</span>
        <span className="ba-label ba-label-after">{afterLabel}</span>
        <div className="ba-divider" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="ba-handle">‹ ›</span>
        </div>
        <input
          type="range" min="0" max="100" value={pos}
          onChange={(e) => setPos(+e.target.value)}
          className="ba-range"
          aria-label={`${beforeLabel} / ${afterLabel} comparison`}
        />
      </div>
      {caption && <div className="ba-caption">{caption}</div>}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   MEDIA GALLERY  + LIGHTBOX
═════════════════════════════════════════════════════════════════════ */
function MediaGallery({ items, onOpen, layout = 'hero' }) {
  if (!items || items.length === 0) return null;

  const renderItem = (m, i, mini, chapterNum) => {
    if (m.type === 'video') {
      return <VideoTile key={i} caption={m.caption} duration={m.duration} src={m.src} poster={m.poster} onZoom={() => onOpen(i)} mini={mini} />;
    }
    if (m.type === 'slider') {
      return (
        <div key={i} className="gallery-slider-cell" style={{ background: m.bg || '#1B2236' }}>
          <BeforeAfterSlider
            before={m.before}
            after={m.after}
            beforeLabel={m.beforeLabel}
            afterLabel={m.afterLabel}
            bg={m.bg}
            beforeWidth={m.beforeWidth}
            beforeHeight={m.beforeHeight}
            afterWidth={m.afterWidth}
            afterHeight={m.afterHeight}
            pixelated={m.pixelated}
          />
          {m.caption && <div className="zoom-hint">🔁 {m.caption}</div>}
        </div>
      );
    }
    return <Placeholder key={i} caption={m.caption} src={m.src} bg={m.bg} label={m.label} chapterNum={chapterNum} onZoom={() => onOpen(i)} width={m.width} height={m.height} alt={m.alt} pixelated={m.pixelated} />;
  };

  // Special hero layout: when item[0] is a slider, give it a full-width hero
  // and lay the remaining mockups out as a 2×2 labelled grid below — every
  // tile reads as its own chapter, no carousel clicks required.
  if (layout === 'hero' && items[0]?.type === 'slider') {
    const rest = items.slice(1, 5);
    return (
      <div className="gallery-hero-slider">
        {renderItem(items[0], 0, false)}
        {rest.length > 0 && (
          <div className="gallery-chapters">
            {rest.map((m, i) => renderItem(m, i + 1, false, i + 1))}
          </div>
        )}
      </div>
    );
  }

  const cls = layout === 'hero' ? 'gallery' : 'gallery-strip';
  const showItems = layout === 'hero' ? items.slice(0, 5) : items;
  return (
    <div className={cls}>
      {showItems.map((m, i) => renderItem(m, i, layout !== 'hero' || i > 0))}
    </div>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext, lang }) {
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  if (!items || index == null) return null;
  const m = items[index];
  return (
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={m.caption || (m.type === 'video' ? 'Video preview' : 'Image preview')}
    >
      <div className="frame" onClick={e => e.stopPropagation()} style={{ width: '88vw', height: '82vh' }}>
        <div className="lb-titlebar">
          <span>🔍 {m.caption || (m.type === 'video' ? 'Video' : 'Image')} — Preview</span>
          <button className="x" onClick={onClose} aria-label={lang === 'de' ? 'Schließen' : 'Close'}>✕</button>
        </div>
        <div className="lb-body">
          <div className="lb-media">
            {m.type === 'video' ? (
              m.src ? (
                /* Real video — actually playable, fills the lightbox frame */
                <div className="big-video big-video-real" style={{ background:'#000' }}>
                  <video
                    src={m.src}
                    poster={m.poster}
                    controls
                    autoPlay
                    playsInline
                    style={{ width:'100%', height:'100%', maxWidth:'100%', maxHeight:'100%', objectFit:'contain', background:'#000' }}
                  />
                </div>
              ) : (
                /* Fallback: VHS-styled fake-video tile when no src */
                <div className="big-video">
                  <span className="vhs-meta" style={{position:'absolute', top:8, left:12, zIndex:3, fontFamily:'var(--font-mono)', color:'#aaeebb'}}>● REC  CH-04</span>
                  <div className="play" style={{width:96, height:96, border:'4px solid #fff', background:'rgba(122,95,255,0.85)', display:'grid', placeItems:'center', position:'relative', zIndex:2, boxShadow:'0 0 0 3px var(--black), 0 0 28px rgba(174,230,255,0.5)'}}>
                    <span style={{width:0, height:0, borderLeft:'28px solid #fff', borderTop:'18px solid transparent', borderBottom:'18px solid transparent', marginLeft:8}}/>
                  </div>
                  <span style={{position:'absolute', bottom:10, right:14, zIndex:3, fontFamily:'var(--font-mono)', color:'#aaeebb', fontSize:16}}>{m.duration || '00:42'}</span>
                </div>
              )
            ) : m.type === 'slider' ? (
              <div className="big-placeholder big-real" style={{ background: m.bg || '#1B2236', padding: 0, border: 'none' }}>
                <BeforeAfterSlider
                  before={m.before}
                  after={m.after}
                  beforeLabel={m.beforeLabel}
                  afterLabel={m.afterLabel}
                  bg={m.bg}
                />
              </div>
            ) : m.src ? (
              <div className="big-placeholder big-real" style={{ background: m.bg || '#fff', padding: 0, border: 'none' }}>
                <img
                  src={m.src}
                  alt={m.caption}
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', imageRendering: 'pixelated' }}
                />
              </div>
            ) : (
              <div className="big-placeholder">
                <div style={{textAlign:'center'}}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>🖼</div>
                  {m.caption}
                </div>
              </div>
            )}
          </div>
          <div className="lb-caption">{m.caption}</div>
          <div className="lb-counter">
            {index + 1} / {items.length} &nbsp;·&nbsp; {lang==='de'?'← → blättern · ESC schließen':'← → navigate · ESC close'}
          </div>
        </div>
        {items.length > 1 && (
          <>
            <button className="lb-nav prev" onClick={onPrev} aria-label={lang === 'de' ? 'Vorheriges' : 'Previous'}>‹</button>
            <button className="lb-nav next" onClick={onNext} aria-label={lang === 'de' ? 'Nächstes' : 'Next'}>›</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   TABS — Win95-style property-sheet tabs (Control Panel pattern)
   ─────────────────────────────────────────────────────────────────────
   Reusable inside any window body. Tabs sit on top of the content area,
   the active tab "lifts" 2px and merges with the content (negative
   bottom border). Keyboard: ←/→ cycle, Home/End jump to ends, Enter/Space
   activate. Aria roles: tablist / tab / tabpanel for screen readers.
═════════════════════════════════════════════════════════════════════ */
function Tabs({ tabs, defaultId, idPrefix = 'tab' }) {
  const [active, setActive] = React.useState(defaultId || tabs[0]?.id);
  const refs = React.useRef({});
  const ids = tabs.map(t => t.id);

  const onKey = (e) => {
    const i = ids.indexOf(active);
    if (i < 0) return;
    let next = null;
    if (e.key === 'ArrowRight') next = ids[(i + 1) % ids.length];
    else if (e.key === 'ArrowLeft') next = ids[(i - 1 + ids.length) % ids.length];
    else if (e.key === 'Home') next = ids[0];
    else if (e.key === 'End') next = ids[ids.length - 1];
    if (next) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };

  const activeTab = tabs.find(t => t.id === active) || tabs[0];
  return (
    <div className="win-tabs-wrap">
      <div className="win-tabs" role="tablist" onKeyDown={onKey}>
        {tabs.map(t => {
          const isOn = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${idPrefix}-${t.id}-tab`}
              aria-controls={`${idPrefix}-${t.id}-panel`}
              aria-selected={isOn}
              tabIndex={isOn ? 0 : -1}
              ref={el => { refs.current[t.id] = el; }}
              className={`win-tab ${isOn ? 'active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        className="win-tab-panel"
        role="tabpanel"
        id={`${idPrefix}-${activeTab.id}-panel`}
        aria-labelledby={`${idPrefix}-${activeTab.id}-tab`}
      >
        {activeTab.panel}
      </div>
    </div>
  );
}

window.Tabs = Tabs;
window.Win = Win;
window.DeskIcon = DeskIcon;
window.Placeholder = Placeholder;
window.VideoTile = VideoTile;
window.MediaGallery = MediaGallery;
window.BeforeAfterSlider = BeforeAfterSlider;
window.Lightbox = Lightbox;
