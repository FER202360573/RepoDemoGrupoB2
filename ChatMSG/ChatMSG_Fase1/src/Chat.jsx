import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

/* ─── Estilos globales inyectados ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
    color: #e8e8f0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 4px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  @keyframes blink {
    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
    40%           { transform: scale(1); opacity: 1; }
  }
`;

/* ─── Colores del sistema ─── */
const C = {
  bg:       '#0a0a0f',
  surface:  '#111118',
  card:     '#16161f',
  border:   '#1e1e2e',
  accent:   '#7c6aff',
  accent2:  '#ff6a9b',
  text:     '#e8e8f0',
  muted:    '#5a5a7a',
  bubble:   '#1c1c2a',
  bubbleMe: '#2d2060',
};

/* ═══════════════════════════════════════
   PANTALLA DE LOGIN
═══════════════════════════════════════ */
function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    onLogin(name.trim());
  };

  return (
    <div style={{
      width: '100%', maxWidth: 420, padding: '48px 40px',
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 24,
      animation: 'fadeUp .5s ease both',
      boxShadow: '0 32px 80px rgba(0,0,0,.6)',
    }}>
      {/* Logo / marca */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px',
          background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, boxShadow: `0 8px 24px ${C.accent}44`,
        }}>💬</div>
        <h1 style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px' }}>
          Wavelength
        </h1>
        <p style={{ color: C.muted, fontSize: 14, marginTop: 6 }}>Chat en tiempo real</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 12, fontWeight: 500, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>
          Tu nombre
        </label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ej. María, Carlos..."
          style={{
            display: 'block', width: '100%',
            marginTop: 8, marginBottom: 20,
            padding: '14px 16px',
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12, color: C.text,
            fontSize: 15, outline: 'none',
            transition: 'border-color .2s',
          }}
          onFocus={e => e.target.style.borderColor = C.accent}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <button
          type="submit"
          disabled={name.trim().length < 2}
          style={{
            width: '100%', padding: '14px',
            background: name.trim().length >= 2
              ? `linear-gradient(135deg, ${C.accent}, ${C.accent2})`
              : C.surface,
            border: 'none', borderRadius: 12,
            color: name.trim().length >= 2 ? '#fff' : C.muted,
            fontFamily: 'Syne', fontWeight: 700, fontSize: 15,
            cursor: name.trim().length >= 2 ? 'pointer' : 'not-allowed',
            transition: 'all .2s',
            boxShadow: name.trim().length >= 2 ? `0 8px 20px ${C.accent}44` : 'none',
          }}
        >
          Entrar al chat →
        </button>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════
   BURBUJA DE MENSAJE
═══════════════════════════════════════ */
function Bubble({ msg, isMe }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMe ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      gap: 8, marginBottom: 12,
      animation: 'fadeUp .3s ease both',
    }}>
      {/* Avatar */}
      {!isMe && (
        <div style={{
          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
          background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#fff',
        }}>
          {msg.user[0].toUpperCase()}
        </div>
      )}

      <div style={{ maxWidth: '68%' }}>
        {!isMe && (
          <span style={{ fontSize: 11, color: C.muted, paddingLeft: 4, display: 'block', marginBottom: 4 }}>
            {msg.user}
          </span>
        )}
        <div style={{
          padding: '10px 14px',
          background: isMe ? C.bubbleMe : C.bubble,
          borderRadius: isMe ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
          border: `1px solid ${isMe ? C.accent + '33' : C.border}`,
          fontSize: 14, lineHeight: 1.5, color: C.text,
          wordBreak: 'break-word',
        }}>
          {msg.text}
        </div>
        <span style={{ fontSize: 10, color: C.muted, paddingRight: isMe ? 4 : 0, paddingLeft: isMe ? 0 : 4, display: 'block', marginTop: 3, textAlign: isMe ? 'right' : 'left' }}>
          {msg.time}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MENSAJE DEL SISTEMA
═══════════════════════════════════════ */
function SystemMsg({ msg }) {
  return (
    <div style={{ textAlign: 'center', margin: '8px 0' }}>
      <span style={{
        fontSize: 11, color: C.muted,
        background: C.surface,
        padding: '4px 12px', borderRadius: 20,
        border: `1px solid ${C.border}`,
      }}>
        {msg.text}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════
   PANTALLA DE CHAT
═══════════════════════════════════════ */
function ChatScreen({ user }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  useEffect(() => {
    socket.emit('user_join', user);

    socket.on('chat_history', (history) => setChat(history.map(m => ({ ...m, _type: 'msg' }))));
    socket.on('receive_message', (msg) => setChat(prev => [...prev, { ...msg, _type: 'msg' }]));
    socket.on('system_message', (msg) => setChat(prev => [...prev, { ...msg, _type: 'system', id: Date.now() }]));
    socket.on('user_list', setUsers);
    socket.on('user_typing', (u) => setTypingUser(u));
    socket.on('user_stop_typing', () => setTypingUser(''));

    return () => socket.removeAllListeners();
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, typingUser]);

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', user);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => socket.emit('stop_typing'), 1200);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit('send_message', { user, text: message.trim() });
    socket.emit('stop_typing');
    setMessage('');
  };

  return (
    <div style={{
      width: '100%', maxWidth: 520, height: '88vh', maxHeight: 720,
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 24, display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,.7)',
      animation: 'fadeUp .4s ease both',
    }}>

      {/* ── Header ── */}
      <div style={{
        padding: '18px 22px',
        borderBottom: `1px solid ${C.border}`,
        background: C.surface,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, boxShadow: `0 4px 16px ${C.accent}44`,
        }}>💬</div>
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 17, letterSpacing: '-0.3px' }}>
            Wavelength
          </h2>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>
            {users.length} {users.length === 1 ? 'persona' : 'personas'} en línea
          </p>
        </div>

        {/* Pills de usuarios */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {users.slice(0, 4).map((u, i) => (
            <div key={i} title={u} style={{
              width: 28, height: 28, borderRadius: 8,
              background: `hsl(${(u.charCodeAt(0) * 37) % 360}, 55%, 40%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: '#fff',
              border: `2px solid ${C.card}`,
              marginLeft: i > 0 ? -6 : 0,
            }}>
              {u[0].toUpperCase()}
            </div>
          ))}
          {users.length > 4 && (
            <div style={{ width: 28, height: 28, borderRadius: 8, background: C.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: C.muted }}>
              +{users.length - 4}
            </div>
          )}
        </div>
      </div>

      {/* ── Mensajes ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px' }}>
        {chat.length === 0 && (
          <div style={{ textAlign: 'center', color: C.muted, marginTop: 60 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
            <p style={{ fontSize: 14 }}>¡Sé el primero en escribir algo!</p>
          </div>
        )}

        {chat.map((item) =>
          item._type === 'system'
            ? <SystemMsg key={item.id} msg={item} />
            : <Bubble key={item.id} msg={item} isMe={item.user === user} />
        )}

        {/* Typing indicator */}
        {typingUser && typingUser !== user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, animation: 'fadeUp .2s ease both' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, flexShrink: 0,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
            }}>
              {typingUser[0].toUpperCase()}
            </div>
            <div style={{
              padding: '10px 16px', background: C.bubble,
              borderRadius: '4px 16px 16px 16px',
              border: `1px solid ${C.border}`,
              display: 'flex', gap: 4, alignItems: 'center',
            }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: C.muted,
                  display: 'inline-block',
                  animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <form onSubmit={sendMessage} style={{
        padding: '14px 16px',
        borderTop: `1px solid ${C.border}`,
        background: C.surface,
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <input
          value={message}
          onChange={handleTyping}
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1, padding: '12px 16px',
            background: C.bubble,
            border: `1px solid ${C.border}`,
            borderRadius: 14, color: C.text,
            fontSize: 14, outline: 'none',
            transition: 'border-color .2s',
          }}
          onFocus={e => e.target.style.borderColor = C.accent}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          style={{
            width: 46, height: 46,
            background: message.trim()
              ? `linear-gradient(135deg, ${C.accent}, ${C.accent2})`
              : C.bubble,
            border: 'none', borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, cursor: message.trim() ? 'pointer' : 'not-allowed',
            transition: 'all .2s',
            boxShadow: message.trim() ? `0 4px 16px ${C.accent}55` : 'none',
          }}
        >
          ➤
        </button>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════
   RAÍZ
═══════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 16 }}>
        {!user
          ? <LoginScreen onLogin={setUser} />
          : <ChatScreen user={user} />
        }
      </div>
    </>
  );
}