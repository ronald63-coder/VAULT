function EvidenceApp({ evidenceItems, onBack }) {
  return (
    <div className="app-page">
      <div className="app-topbar">
        <button type="button" className="back-btn" onClick={onBack}>←</button>
        <h2>EVIDENCE</h2>
      </div>

      <div className="evidence-list">
        {evidenceItems.map((item) => (
          <div key={item.id} className="evidence-card">
            <div className="evidence-icon">{item.type === 'Photo' ? '📷' : item.type === 'Video' ? '🎥' : item.type === 'Audio' ? '🎙' : '📄'}</div>
            <div className="evidence-copy">
              <strong>{item.label}</strong>
              <span>{item.type}</span>
            </div>
            <span className="evidence-size">{item.size}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EvidenceApp
