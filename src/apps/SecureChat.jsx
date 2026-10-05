function SecureChat({ messages, onBack }) {
  return (
    <div className="app-page">
      <div className="app-topbar">
        <button type="button" className="back-btn" onClick={onBack}>←</button>
        <h2>SECURE CHAT</h2>
      </div>

      <div className="security-pill small">🔒 End-to-end encrypted (simulated)</div>

      <div className="chat-list">
        {messages.map((message) => (
          <div key={message.id} className={`chat-item ${message.isIncoming ? 'incoming' : 'outgoing'}`}>
            <div className="chat-meta">
              <strong>{message.author}</strong>
              <span>{message.time}</span>
            </div>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SecureChat
