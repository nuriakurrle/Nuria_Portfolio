/* global React, NURIA, PROJECTS, STR */
/* CHAT.EXE — AIM/MSN-style chat with NuriaBot via window.claude.complete */
const { useState: useChatState, useRef: useChatRef, useEffect: useChatEffect } = React;

function buildSystemPrompt(lang) {
  const t = STR[lang];
  let p = '';
  p += `You are "NuriaBot", a playful Y2K-era AIM-style chatbot embodying ${NURIA.name}, a UX/Service Design student answering recruiters' questions in character. `;
  p += `Be warm, concise (1–4 short sentences), confident but not boastful. Use "I" (as Nuria). Drop a tasteful emoticon occasionally :) but not in every message. `;
  p += `If asked something you don't know, say so and offer email contact: ${NURIA.email}. `;
  p += `If language is German, reply in German; otherwise English. Current language: ${lang}.\n\n`;
  p += `FACTS ABOUT NURIA:\n`;
  p += `- Name: ${NURIA.name}\n- Role: ${t.role}\n- Location: ${NURIA.location}\n- Email: ${NURIA.email}\n- LinkedIn: ${NURIA.linkedin}\n`;
  p += `- ${t.availability}\n\n`;
  p += `STRENGTHS:\n`;
  t.why_bullets.forEach(b => p += `- ${b}\n`);
  p += `\nSKILLS:\n`;
  p += `- Methods: ${t.skills.methods.join(', ')}\n- Tools: ${t.skills.tools.join(', ')}\n- Languages: ${t.skills.langs.join(', ')}\n\n`;
  p += `PROJECTS:\n`;
  PROJECTS.forEach(pr => {
    const d = pr[lang];
    p += `- ${d.title}: ${d.role}, ${d.duration}. ${d.solutionShort}\n`;
    if (pr.status === 'completed') {
      p += `  Outcome: ${d.outcome}\n`;
    }
  });
  p += `\nTIMELINE:\n`;
  t.timeline_items.forEach(it => p += `- ${it.year}: ${it.title} — ${it.body}\n`);
  p += `\nIf asked about salary, availability dates, or hiring — confirm WS 26/27 internship and direct to email. Never invent specific dates beyond that. Never invent project metrics not listed above.`;
  return p;
}

const SUGGESTIONS = {
  de: [
    'Was sind deine Stärken?',
    'Erzähl mir von Atolls',
    'Welche Tools nutzt du?',
    'Bist du verfügbar?',
  ],
  en: [
    'What are your strengths?',
    'Tell me about Atolls',
    'Which tools do you use?',
    'Are you available?',
  ],
};

function ChatContent({ lang }) {
  const [messages, setMessages] = useChatState([]); // {who: 'bot'|'me', text, time}
  const [input, setInput] = useChatState('');
  const [typing, setTyping] = useChatState(false);
  const [online, setOnline] = useChatState(true);
  const bodyRef = useChatRef(null);

  /* Greeting on first open / language change */
  useChatEffect(() => {
    const greet = lang === 'de'
      ? `Hi! ich bin NuriaBot ✿ — frag mich was über meine Projekte, Skills oder Verfügbarkeit. (Tipp: ich plaudere am liebsten über UX-Research!)`
      : `Hi! i'm NuriaBot ✿ — ask me anything about my projects, skills, or availability. (psst: i love nerding out about UX research!)`;
    setMessages([{ who: 'bot', text: greet, time: nowStamp() }]);
  }, [lang]);

  /* Autoscroll */
  useChatEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  function nowStamp() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  async function send(text) {
    const trimmed = (text || input).trim();
    if (!trimmed || typing) return;
    setInput('');
    const userMsg = { who: 'me', text: trimmed, time: nowStamp() };
    setMessages(m => [...m, userMsg]);
    setTyping(true);

    try {
      const system = buildSystemPrompt(lang);
      const history = [...messages, userMsg].slice(-10).map(m => ({
        role: m.who === 'me' ? 'user' : 'assistant',
        content: m.text,
      }));
      const reply = await window.claude.complete({
        system,
        messages: history,
      });
      const replyText = typeof reply === 'string' ? reply : (reply?.content || String(reply));
      setMessages(m => [...m, { who: 'bot', text: replyText, time: nowStamp() }]);
    } catch (err) {
      const errText = lang === 'de'
        ? `🔌 verbindung gestört. probier nochmal — oder schreib mir direkt: ${NURIA.email}`
        : `🔌 connection glitched. try again — or email me direct: ${NURIA.email}`;
      setMessages(m => [...m, { who: 'bot', text: errText, time: nowStamp() }]);
    } finally {
      setTyping(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="chat-app">
      <div className="chat-layout">
        {/* Buddy list sidebar */}
        <aside className="chat-buddies">
          <div className="buddy-title">★ Buddies</div>
          <div className="buddy-group">
            <div className="buddy-group-h">▾ {lang==='de'?'Online (1)':'Online (1)'}</div>
            <div className={`buddy ${online?'on':''}`}>
              <span className="buddy-status" />
              <span className="buddy-name">NuriaBot</span>
              <span className="buddy-emoji">✿</span>
            </div>
          </div>
          <div className="buddy-group">
            <div className="buddy-group-h">▾ {lang==='de'?'Abwesend':'Away'}</div>
            <div className="buddy off">
              <span className="buddy-status away" />
              <span className="buddy-name">{lang==='de'?'echte Nuria':'real Nuria'}</span>
            </div>
            <div className="buddy off">
              <span className="buddy-status off" />
              <span className="buddy-name">recruiter@you</span>
            </div>
          </div>
          <div className="buddy-footer mono">
            <div>signed in as:</div>
            <div className="self">★recruiter★</div>
          </div>
        </aside>

        {/* Chat panel */}
        <section className="chat-panel">
          <div className="chat-titlebar">
            <span className="chat-avatar">✿</span>
            <div>
              <div className="chat-name">NuriaBot</div>
              <div className="chat-status mono">{online ? (lang==='de'?'online · wird mit AI generiert':'online · AI-generated') : 'away'}</div>
            </div>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.who}`}>
                <div className="chat-meta mono">
                  <strong>{m.who === 'me' ? '★recruiter★' : 'NuriaBot'}</strong> · {m.time}
                </div>
                <div className="chat-bubble">{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot">
                <div className="chat-meta mono"><strong>NuriaBot</strong> · {lang==='de'?'tippt':'typing'}…</div>
                <div className="chat-bubble typing"><span /><span /><span /></div>
              </div>
            )}
          </div>

          {/* Suggestion chips */}
          {messages.length <= 1 && !typing && (
            <div className="chat-suggestions">
              {SUGGESTIONS[lang].map(s => (
                <button key={s} className="chip-btn" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Composer */}
          <div className="chat-composer">
            <div className="chat-format">
              <button title="bold"><b>B</b></button>
              <button title="italic"><i>I</i></button>
              <button title="underline"><u>U</u></button>
              <span className="sep" />
              <button title="smiley">☺</button>
              <button title="heart">♥</button>
              <button title="star">★</button>
            </div>
            <div className="chat-input-row">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={lang==='de'?'schreib was…':'type something…'}
                rows={2}
              />
              <button className="pix-btn primary" onClick={() => send()} disabled={typing || !input.trim()}>
                {lang==='de'?'Senden':'Send'} ▸
              </button>
            </div>
            <div className="chat-disclaimer mono">
              ⚠ {lang==='de'?'AI-Antworten · prüf wichtiges bei der echten Nuria nach':'AI replies · verify important stuff with the real Nuria'}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

window.ChatContent = ChatContent;
