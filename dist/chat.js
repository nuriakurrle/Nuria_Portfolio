(function(){
const { NURIA, STR } = window;
const { useState: useChatState, useRef: useChatRef, useEffect: useChatEffect } = React;
function buildSystemPrompt(lang) {
  const t = STR[lang];
  let p = "";
  p += `You are "NuriaBot", a playful Y2K-era AIM-style chatbot embodying ${NURIA.name}, a UX/Service Design student answering recruiters' questions in character. `;
  p += `Be warm, concise (1\u20134 short sentences), confident but not boastful. Use "I" (as Nuria). Drop a tasteful emoticon occasionally :) but not in every message. `;
  p += `If asked something you don't know, say so and offer email contact: ${NURIA.email}. `;
  p += `If language is German, reply in German; otherwise English. Current language: ${lang}.

`;
  p += `FACTS ABOUT NURIA:
`;
  p += `- Name: ${NURIA.name}
- Role: ${t.role}
- Location: ${NURIA.location}
- Email: ${NURIA.email}
- LinkedIn: ${NURIA.linkedin}
`;
  p += `- ${t.availability}

`;
  p += `STRENGTHS:
`;
  t.why_bullets.forEach((b) => p += `- ${b}
`);
  p += `
SKILLS:
`;
  p += `- Methods: ${t.skills.methods.join(", ")}
- Tools: ${t.skills.tools.join(", ")}
- Languages: ${t.skills.langs.join(", ")}

`;
  p += `PROJECTS:
`;
  PROJECTS.forEach((pr) => {
    const d = pr[lang];
    p += `- ${d.title}: ${d.role}, ${d.duration}. ${d.solutionShort}
`;
    if (pr.status === "completed") {
      p += `  Outcome: ${d.outcome}
`;
    }
  });
  p += `
TIMELINE:
`;
  t.timeline_items.forEach((it) => p += `- ${it.year}: ${it.title} \u2014 ${it.body}
`);
  p += `
If asked about salary, availability dates, or hiring \u2014 confirm WS 26/27 internship and direct to email. Never invent specific dates beyond that. Never invent project metrics not listed above.`;
  return p;
}
const SUGGESTIONS = {
  de: [
    "Was sind deine St\xE4rken?",
    "Erz\xE4hl mir von Atolls",
    "Welche Tools nutzt du?",
    "Bist du verf\xFCgbar?"
  ],
  en: [
    "What are your strengths?",
    "Tell me about Atolls",
    "Which tools do you use?",
    "Are you available?"
  ]
};
function ChatContent({ lang }) {
  const [messages, setMessages] = useChatState([]);
  const [input, setInput] = useChatState("");
  const [typing, setTyping] = useChatState(false);
  const [online, setOnline] = useChatState(true);
  const bodyRef = useChatRef(null);
  useChatEffect(() => {
    const greet = lang === "de" ? `Hi! ich bin NuriaBot \u273F \u2014 frag mich was \xFCber meine Projekte, Skills oder Verf\xFCgbarkeit. (Tipp: ich plaudere am liebsten \xFCber UX-Research!)` : `Hi! i'm NuriaBot \u273F \u2014 ask me anything about my projects, skills, or availability. (psst: i love nerding out about UX research!)`;
    setMessages([{ who: "bot", text: greet, time: nowStamp() }]);
  }, [lang]);
  useChatEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);
  function nowStamp() {
    const d = /* @__PURE__ */ new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  async function send(text) {
    const trimmed = (text || input).trim();
    if (!trimmed || typing) return;
    setInput("");
    const userMsg = { who: "me", text: trimmed, time: nowStamp() };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);
    try {
      const system = buildSystemPrompt(lang);
      const history = [...messages, userMsg].slice(-10).map((m) => ({
        role: m.who === "me" ? "user" : "assistant",
        content: m.text
      }));
      const reply = await window.claude.complete({
        system,
        messages: history
      });
      const replyText = typeof reply === "string" ? reply : (reply == null ? void 0 : reply.content) || String(reply);
      setMessages((m) => [...m, { who: "bot", text: replyText, time: nowStamp() }]);
    } catch (err) {
      const errText = lang === "de" ? `\u{1F50C} verbindung gest\xF6rt. probier nochmal \u2014 oder schreib mir direkt: ${NURIA.email}` : `\u{1F50C} connection glitched. try again \u2014 or email me direct: ${NURIA.email}`;
      setMessages((m) => [...m, { who: "bot", text: errText, time: nowStamp() }]);
    } finally {
      setTyping(false);
    }
  }
  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "chat-app" }, /* @__PURE__ */ React.createElement("div", { className: "chat-layout" }, /* @__PURE__ */ React.createElement("aside", { className: "chat-buddies" }, /* @__PURE__ */ React.createElement("div", { className: "buddy-title" }, "\u2605 Buddies"), /* @__PURE__ */ React.createElement("div", { className: "buddy-group" }, /* @__PURE__ */ React.createElement("div", { className: "buddy-group-h" }, "\u25BE ", lang === "de" ? "Online (1)" : "Online (1)"), /* @__PURE__ */ React.createElement("div", { className: `buddy ${online ? "on" : ""}` }, /* @__PURE__ */ React.createElement("span", { className: "buddy-status" }), /* @__PURE__ */ React.createElement("span", { className: "buddy-name" }, "NuriaBot"), /* @__PURE__ */ React.createElement("span", { className: "buddy-emoji" }, "\u273F"))), /* @__PURE__ */ React.createElement("div", { className: "buddy-group" }, /* @__PURE__ */ React.createElement("div", { className: "buddy-group-h" }, "\u25BE ", lang === "de" ? "Abwesend" : "Away"), /* @__PURE__ */ React.createElement("div", { className: "buddy off" }, /* @__PURE__ */ React.createElement("span", { className: "buddy-status away" }), /* @__PURE__ */ React.createElement("span", { className: "buddy-name" }, lang === "de" ? "echte Nuria" : "real Nuria")), /* @__PURE__ */ React.createElement("div", { className: "buddy off" }, /* @__PURE__ */ React.createElement("span", { className: "buddy-status off" }), /* @__PURE__ */ React.createElement("span", { className: "buddy-name" }, "recruiter@you"))), /* @__PURE__ */ React.createElement("div", { className: "buddy-footer mono" }, /* @__PURE__ */ React.createElement("div", null, "signed in as:"), /* @__PURE__ */ React.createElement("div", { className: "self" }, "\u2605recruiter\u2605"))), /* @__PURE__ */ React.createElement("section", { className: "chat-panel" }, /* @__PURE__ */ React.createElement("div", { className: "chat-titlebar" }, /* @__PURE__ */ React.createElement("span", { className: "chat-avatar" }, "\u273F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "chat-name" }, "NuriaBot"), /* @__PURE__ */ React.createElement("div", { className: "chat-status mono" }, online ? lang === "de" ? "online \xB7 wird mit AI generiert" : "online \xB7 AI-generated" : "away"))), /* @__PURE__ */ React.createElement("div", { className: "chat-body", ref: bodyRef }, messages.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `chat-msg ${m.who}` }, /* @__PURE__ */ React.createElement("div", { className: "chat-meta mono" }, /* @__PURE__ */ React.createElement("strong", null, m.who === "me" ? "\u2605recruiter\u2605" : "NuriaBot"), " \xB7 ", m.time), /* @__PURE__ */ React.createElement("div", { className: "chat-bubble" }, m.text))), typing && /* @__PURE__ */ React.createElement("div", { className: "chat-msg bot" }, /* @__PURE__ */ React.createElement("div", { className: "chat-meta mono" }, /* @__PURE__ */ React.createElement("strong", null, "NuriaBot"), " \xB7 ", lang === "de" ? "tippt" : "typing", "\u2026"), /* @__PURE__ */ React.createElement("div", { className: "chat-bubble typing" }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null)))), messages.length <= 1 && !typing && /* @__PURE__ */ React.createElement("div", { className: "chat-suggestions" }, SUGGESTIONS[lang].map((s) => /* @__PURE__ */ React.createElement("button", { key: s, className: "chip-btn", onClick: () => send(s) }, s))), /* @__PURE__ */ React.createElement("div", { className: "chat-composer" }, /* @__PURE__ */ React.createElement("div", { className: "chat-format" }, /* @__PURE__ */ React.createElement("button", { title: "bold" }, /* @__PURE__ */ React.createElement("b", null, "B")), /* @__PURE__ */ React.createElement("button", { title: "italic" }, /* @__PURE__ */ React.createElement("i", null, "I")), /* @__PURE__ */ React.createElement("button", { title: "underline" }, /* @__PURE__ */ React.createElement("u", null, "U")), /* @__PURE__ */ React.createElement("span", { className: "sep" }), /* @__PURE__ */ React.createElement("button", { title: "smiley" }, "\u263A"), /* @__PURE__ */ React.createElement("button", { title: "heart" }, "\u2665"), /* @__PURE__ */ React.createElement("button", { title: "star" }, "\u2605")), /* @__PURE__ */ React.createElement("div", { className: "chat-input-row" }, /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: input,
      onChange: (e) => setInput(e.target.value),
      onKeyDown: handleKey,
      placeholder: lang === "de" ? "schreib was\u2026" : "type something\u2026",
      rows: 2
    }
  ), /* @__PURE__ */ React.createElement("button", { className: "pix-btn primary", onClick: () => send(), disabled: typing || !input.trim() }, lang === "de" ? "Senden" : "Send", " \u25B8")), /* @__PURE__ */ React.createElement("div", { className: "chat-disclaimer mono" }, "\u26A0 ", lang === "de" ? "AI-Antworten \xB7 pr\xFCf wichtiges bei der echten Nuria nach" : "AI replies \xB7 verify important stuff with the real Nuria")))));
}
window.ChatContent = ChatContent;

})();
