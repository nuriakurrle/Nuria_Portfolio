(function(){
const { NURIA, STR, PROJECTS, PROJECT_TAGS, SKILL_CATALOG } = window;
const { useState, useEffect, useRef, useCallback } = React;
function Win({ win, t, onClose, onMinimize, onFocus, isActive, children }) {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [size, setSize] = useState({ w: win.w, h: win.h });
  const [maximized, setMaximized] = useState(false);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const drag = useRef(null);
  const bodyRef = useRef(null);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const check = () => {
      const scrollable = el.scrollHeight > el.clientHeight + 4;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
      el.classList.toggle("has-scroll", scrollable && !atBottom);
    };
    check();
    el.addEventListener("scroll", check);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, []);
  const onMouseDown = (e) => {
    if (e.target.closest(".win-ctrl")) return;
    onFocus();
    drag.current = { startX: e.clientX, startY: e.clientY, ox: pos.x, oy: pos.y };
    e.currentTarget.classList.add("dragging");
  };
  useEffect(() => {
    const mv = (e) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.startX;
      const dy = e.clientY - drag.current.startY;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 200, drag.current.ox + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 80, drag.current.oy + dy))
      });
    };
    const up = () => {
      if (drag.current) {
        document.querySelectorAll(".win-titlebar").forEach((el) => el.classList.remove("dragging"));
      }
      drag.current = null;
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
    };
  }, []);
  const style = maximized ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 30px)", zIndex: win.z } : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: win.z };
  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(id);
  }, []);
  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(() => onClose && onClose(), 220);
  }, [onClose]);
  return /* @__PURE__ */ React.createElement("div", { className: `win ${isActive ? "active" : ""} ${entered ? "entered" : ""} ${exiting ? "exiting" : ""}`, style, onMouseDown: onFocus, "data-screen-label": win.label }, /* @__PURE__ */ React.createElement("div", { className: "win-titlebar", onMouseDown, onDoubleClick: () => setMaximized((m) => !m) }, /* @__PURE__ */ React.createElement("span", { className: "win-icon" }, win.icon), /* @__PURE__ */ React.createElement("span", { className: "win-title" }, win.title), /* @__PURE__ */ React.createElement("div", { className: "win-controls" }, /* @__PURE__ */ React.createElement("button", { className: "win-ctrl", onClick: onMinimize, title: t.minimize, "aria-label": t.minimize }, "_"), /* @__PURE__ */ React.createElement("button", { className: "win-ctrl", onClick: () => setMaximized((m) => !m), title: t.maximize, "aria-label": t.maximize }, "\u25A2"), /* @__PURE__ */ React.createElement("button", { className: "win-ctrl", onClick: handleClose, title: t.close, "aria-label": t.close }, "\u2715"))), !win.noMenubar && /* @__PURE__ */ React.createElement("div", { className: "win-menubar" }, /* @__PURE__ */ React.createElement("span", { className: "win-menu-item" }, /* @__PURE__ */ React.createElement("u", null, t.file[0]), t.file.slice(1)), /* @__PURE__ */ React.createElement("span", { className: "win-menu-item" }, /* @__PURE__ */ React.createElement("u", null, t.edit[0]), t.edit.slice(1)), /* @__PURE__ */ React.createElement("span", { className: "win-menu-item" }, /* @__PURE__ */ React.createElement("u", null, t.view[0]), t.view.slice(1)), /* @__PURE__ */ React.createElement("span", { className: "win-menu-item" }, /* @__PURE__ */ React.createElement("u", null, t.help[0]), t.help.slice(1))), /* @__PURE__ */ React.createElement("div", { className: "win-body", ref: bodyRef }, children), !win.noStatusbar && /* @__PURE__ */ React.createElement("div", { className: "win-statusbar" }, /* @__PURE__ */ React.createElement("div", null, win.statusLeft || "Ready"), /* @__PURE__ */ React.createElement("div", { style: { flex: 0, minWidth: 90 } }, "C:\\nuria\\")));
}
function DeskIcon({ id, label, emoji, badge, attention, selected, dimmed, matched, matchColor, tooltip, onClick, onDouble, double, onHoverChange }) {
  const [hover, setHover] = React.useState(false);
  const setHoverBoth = (h) => {
    setHover(h);
    onHoverChange == null ? void 0 : onHoverChange(h);
  };
  const handleKey = (e) => {
    var _a;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (_a = onDouble || onClick) == null ? void 0 : _a();
    }
  };
  const style = matched && matchColor ? { "--match-color": matchColor } : void 0;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `desk-icon ${selected ? "selected" : ""} ${dimmed ? "dimmed" : ""} ${matched ? "matched" : ""}`,
      style,
      onClick,
      onDoubleClick: onDouble,
      onKeyDown: handleKey,
      onMouseEnter: () => setHoverBoth(true),
      onMouseLeave: () => setHoverBoth(false),
      onFocus: () => setHoverBoth(true),
      onBlur: () => setHoverBoth(false),
      role: "button",
      tabIndex: 0,
      "aria-label": `${label}${badge ? ", " + badge : ""}${tooltip ? ", " + tooltip : ""}`,
      "aria-disabled": dimmed || void 0
    },
    matched && /* @__PURE__ */ React.createElement("span", { className: "ico-sparkle", "aria-hidden": "true" }, "\u2726"),
    /* @__PURE__ */ React.createElement("div", { className: `ico-glyph ${attention ? "ico-attention" : ""}`, "aria-hidden": "true" }, emoji, badge && /* @__PURE__ */ React.createElement("span", { className: `ico-badge ico-badge--${badge.toLowerCase()}` }, badge)),
    /* @__PURE__ */ React.createElement("span", { className: "ico-label" }, label),
    tooltip && hover && /* @__PURE__ */ React.createElement("div", { className: "desk-icon-tooltip", role: "tooltip" }, tooltip)
  );
}
function Placeholder({ caption, src, bg, h = 180, onZoom, label, chapterNum, width, height, alt, pixelated }) {
  const chapter = label && /* @__PURE__ */ React.createElement("div", { className: "tile-chapter" }, chapterNum != null && /* @__PURE__ */ React.createElement("span", { className: "tile-chapter-num" }, String(chapterNum).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", { className: "tile-chapter-label" }, label));
  if (src) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "placeholder placeholder-real",
        style: { minHeight: h, background: bg || "#fff", padding: 0 },
        onClick: onZoom
      },
      chapter,
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src,
          alt: caption,
          loading: "lazy",
          className: /pixel|mascot|vinti|logo|pixelart/i.test(src) ? "pixelated" : void 0
        }
      ),
      /* @__PURE__ */ React.createElement("div", { className: "zoom-hint" }, "\u{1F50D} ", caption)
    );
  }
  return /* @__PURE__ */ React.createElement("div", { className: "placeholder", style: { minHeight: h }, onClick: onZoom }, chapter, /* @__PURE__ */ React.createElement("div", null, caption), /* @__PURE__ */ React.createElement("div", { className: "zoom-hint" }, "\u{1F50D} zoom"));
}
function VideoTile({ caption, duration = "00:42", onZoom, mini, src, poster }) {
  if (src) {
    return /* @__PURE__ */ React.createElement("div", { className: "video-tile video-tile-real", onClick: onZoom }, /* @__PURE__ */ React.createElement(
      "video",
      {
        src,
        poster,
        controls: true,
        preload: "metadata",
        playsInline: true,
        onClick: (e) => e.stopPropagation()
      }
    ), !mini && caption && /* @__PURE__ */ React.createElement("span", { className: "vhs-caption" }, caption), duration && /* @__PURE__ */ React.createElement("span", { className: "vhs-time" }, duration));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "video-tile", onClick: onZoom }, /* @__PURE__ */ React.createElement("span", { className: "vhs-meta" }, "CH-04"), /* @__PURE__ */ React.createElement("div", { className: "play" }), /* @__PURE__ */ React.createElement("span", { className: "vhs-caption" }, mini ? "" : caption), /* @__PURE__ */ React.createElement("span", { className: "vhs-time" }, duration));
}
function BeforeAfterSlider({ before, after, beforeLabel = "Vorher", afterLabel = "Nachher", caption, bg, beforeWidth, beforeHeight, afterWidth, afterHeight, pixelated }) {
  const [pos, setPos] = React.useState(50);
  return /* @__PURE__ */ React.createElement("div", { className: "ba-slider", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "ba-frame", style: { background: bg || "#1B2236" } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: after,
      alt: afterLabel,
      className: `ba-img ${pixelated ? "pixelated" : ""}`,
      width: afterWidth,
      height: afterHeight
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "ba-clip", style: { width: `${pos}%` } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: before,
      alt: beforeLabel,
      className: `ba-img ${pixelated ? "pixelated" : ""}`,
      width: beforeWidth,
      height: beforeHeight
    }
  )), /* @__PURE__ */ React.createElement("span", { className: "ba-label ba-label-before" }, beforeLabel), /* @__PURE__ */ React.createElement("span", { className: "ba-label ba-label-after" }, afterLabel), /* @__PURE__ */ React.createElement("div", { className: "ba-divider", style: { left: `${pos}%` }, "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "ba-handle" }, "\u2039 \u203A")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "0",
      max: "100",
      value: pos,
      onChange: (e) => setPos(+e.target.value),
      className: "ba-range",
      "aria-label": `${beforeLabel} / ${afterLabel} comparison`
    }
  )), caption && /* @__PURE__ */ React.createElement("div", { className: "ba-caption" }, caption));
}
function MediaGallery({ items, onOpen, layout = "hero" }) {
  var _a;
  if (!items || items.length === 0) return null;
  const renderItem = (m, i, mini, chapterNum) => {
    if (m.type === "video") {
      return /* @__PURE__ */ React.createElement(VideoTile, { key: i, caption: m.caption, duration: m.duration, src: m.src, poster: m.poster, onZoom: () => onOpen(i), mini });
    }
    if (m.type === "slider") {
      return /* @__PURE__ */ React.createElement("div", { key: i, className: "gallery-slider-cell", style: { background: m.bg || "#1B2236" } }, /* @__PURE__ */ React.createElement(
        BeforeAfterSlider,
        {
          before: m.before,
          after: m.after,
          beforeLabel: m.beforeLabel,
          afterLabel: m.afterLabel,
          bg: m.bg,
          beforeWidth: m.beforeWidth,
          beforeHeight: m.beforeHeight,
          afterWidth: m.afterWidth,
          afterHeight: m.afterHeight,
          pixelated: m.pixelated
        }
      ), m.caption && /* @__PURE__ */ React.createElement("div", { className: "zoom-hint" }, "\u{1F501} ", m.caption));
    }
    return /* @__PURE__ */ React.createElement(Placeholder, { key: i, caption: m.caption, src: m.src, bg: m.bg, label: m.label, chapterNum, onZoom: () => onOpen(i), width: m.width, height: m.height, alt: m.alt, pixelated: m.pixelated });
  };
  if (layout === "hero" && ((_a = items[0]) == null ? void 0 : _a.type) === "slider") {
    const rest = items.slice(1, 5);
    return /* @__PURE__ */ React.createElement("div", { className: "gallery-hero-slider" }, renderItem(items[0], 0, false), rest.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "gallery-chapters" }, rest.map((m, i) => renderItem(m, i + 1, false, i + 1))));
  }
  const cls = layout === "hero" ? "gallery" : "gallery-strip";
  const showItems = layout === "hero" ? items.slice(0, 5) : items;
  return /* @__PURE__ */ React.createElement("div", { className: cls }, showItems.map((m, i) => renderItem(m, i, layout !== "hero" || i > 0)));
}
function Lightbox({ items, index, onClose, onPrev, onNext, lang }) {
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);
  if (!items || index == null) return null;
  const m = items[index];
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "lightbox",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": m.caption || (m.type === "video" ? "Video preview" : "Image preview")
    },
    /* @__PURE__ */ React.createElement("div", { className: "frame", onClick: (e) => e.stopPropagation(), style: { width: "88vw", height: "82vh" } }, /* @__PURE__ */ React.createElement("div", { className: "lb-titlebar" }, /* @__PURE__ */ React.createElement("span", null, "\u{1F50D} ", m.caption || (m.type === "video" ? "Video" : "Image"), ", Preview"), /* @__PURE__ */ React.createElement("button", { className: "x", onClick: onClose, "aria-label": lang === "de" ? "Schlie\xDFen" : "Close" }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "lb-body" }, /* @__PURE__ */ React.createElement("div", { className: "lb-media" }, m.type === "video" ? m.src ? (
      /* Real video — actually playable, fills the lightbox frame */
      /* @__PURE__ */ React.createElement("div", { className: "big-video big-video-real", style: { background: "#000" } }, /* @__PURE__ */ React.createElement(
        "video",
        {
          src: m.src,
          poster: m.poster,
          controls: true,
          autoPlay: true,
          playsInline: true,
          style: { width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", background: "#000" }
        }
      ))
    ) : (
      /* Fallback: VHS-styled fake-video tile when no src */
      /* @__PURE__ */ React.createElement("div", { className: "big-video" }, /* @__PURE__ */ React.createElement("span", { className: "vhs-meta", style: { position: "absolute", top: 8, left: 12, zIndex: 3, fontFamily: "var(--font-mono)", color: "#aaeebb" } }, "\u25CF REC  CH-04"), /* @__PURE__ */ React.createElement("div", { className: "play", style: { width: 96, height: 96, border: "4px solid #fff", background: "rgba(122,95,255,0.85)", display: "grid", placeItems: "center", position: "relative", zIndex: 2, boxShadow: "0 0 0 3px var(--black), 0 0 28px rgba(174,230,255,0.5)" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 0, height: 0, borderLeft: "28px solid #fff", borderTop: "18px solid transparent", borderBottom: "18px solid transparent", marginLeft: 8 } })), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", bottom: 10, right: 14, zIndex: 3, fontFamily: "var(--font-mono)", color: "#aaeebb", fontSize: 16 } }, m.duration || "00:42"))
    ) : m.type === "slider" ? /* @__PURE__ */ React.createElement("div", { className: "big-placeholder big-real", style: { background: m.bg || "#1B2236", padding: 0, border: "none" } }, /* @__PURE__ */ React.createElement(
      BeforeAfterSlider,
      {
        before: m.before,
        after: m.after,
        beforeLabel: m.beforeLabel,
        afterLabel: m.afterLabel,
        bg: m.bg
      }
    )) : m.src ? /* @__PURE__ */ React.createElement("div", { className: "big-placeholder big-real", style: { background: m.bg || "#fff", padding: 0, border: "none" } }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: m.src,
        alt: m.caption,
        style: { maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", imageRendering: "pixelated" }
      }
    )) : /* @__PURE__ */ React.createElement("div", { className: "big-placeholder" }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 8 } }, "\u{1F5BC}"), m.caption))), /* @__PURE__ */ React.createElement("div", { className: "lb-caption" }, m.caption), /* @__PURE__ */ React.createElement("div", { className: "lb-counter" }, index + 1, " / ", items.length, " \xA0\xB7\xA0 ", lang === "de" ? "\u2190 \u2192 bl\xE4ttern \xB7 ESC schlie\xDFen" : "\u2190 \u2192 navigate \xB7 ESC close")), items.length > 1 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { className: "lb-nav prev", onClick: onPrev, "aria-label": lang === "de" ? "Vorheriges" : "Previous" }, "\u2039"), /* @__PURE__ */ React.createElement("button", { className: "lb-nav next", onClick: onNext, "aria-label": lang === "de" ? "N\xE4chstes" : "Next" }, "\u203A")))
  );
}
function Tabs({ tabs, defaultId, idPrefix = "tab" }) {
  var _a;
  const [active, setActive] = React.useState(defaultId || ((_a = tabs[0]) == null ? void 0 : _a.id));
  const refs = React.useRef({});
  const ids = tabs.map((t) => t.id);
  const onKey = (e) => {
    var _a2;
    const i = ids.indexOf(active);
    if (i < 0) return;
    let next = null;
    if (e.key === "ArrowRight") next = ids[(i + 1) % ids.length];
    else if (e.key === "ArrowLeft") next = ids[(i - 1 + ids.length) % ids.length];
    else if (e.key === "Home") next = ids[0];
    else if (e.key === "End") next = ids[ids.length - 1];
    if (next) {
      e.preventDefault();
      setActive(next);
      (_a2 = refs.current[next]) == null ? void 0 : _a2.focus();
    }
  };
  const activeTab = tabs.find((t) => t.id === active) || tabs[0];
  return /* @__PURE__ */ React.createElement("div", { className: "win-tabs-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "win-tabs", role: "tablist", onKeyDown: onKey }, tabs.map((t) => {
    const isOn = t.id === active;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: t.id,
        type: "button",
        role: "tab",
        id: `${idPrefix}-${t.id}-tab`,
        "aria-controls": `${idPrefix}-${t.id}-panel`,
        "aria-selected": isOn,
        tabIndex: isOn ? 0 : -1,
        ref: (el) => {
          refs.current[t.id] = el;
        },
        className: `win-tab ${isOn ? "active" : ""}`,
        onClick: () => setActive(t.id)
      },
      t.label
    );
  })), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "win-tab-panel",
      role: "tabpanel",
      id: `${idPrefix}-${activeTab.id}-panel`,
      "aria-labelledby": `${idPrefix}-${activeTab.id}-tab`
    },
    activeTab.panel
  ));
}
window.Tabs = Tabs;
window.Win = Win;
window.DeskIcon = DeskIcon;
window.Placeholder = Placeholder;
window.VideoTile = VideoTile;
window.MediaGallery = MediaGallery;
window.BeforeAfterSlider = BeforeAfterSlider;
window.Lightbox = Lightbox;

})();
