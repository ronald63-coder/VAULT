function InvestigationApp({ investigations, selectedId, onSelect, onBack }) {
  const selected = investigations.find((item) => item.id === selectedId) ?? investigations[0]

  return (
    <div className="app-page">
      <div className="app-topbar">
        <button type="button" className="back-btn" onClick={onBack}>←</button>
        <h2>INVESTIGATIONS</h2>
      </div>

      <div className="two-column-panel">
        <div className="list-panel">
          {investigations.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`list-item ${selected.id === item.id ? 'selected' : ''}`}
              onClick={() => onSelect(item.id)}
            >
              <span className="list-title">{item.name}</span>
              <span className="list-meta">{item.state}</span>
            </button>
          ))}
        </div>

        <div className="detail-panel">
          <p className="eyebrow small">CASE FILE</p>
          <h3>{selected.name}</h3>
          <p className="muted-copy">{selected.summary}</p>

          <div className="stats-grid">
            <div>
              <span>STATUS</span>
              <strong>{selected.state}</strong>
            </div>
            <div>
              <span>SOURCE MATERIAL</span>
              <strong>{selected.files} files</strong>
            </div>
            <div>
              <span>EVIDENCE</span>
              <strong>{selected.evidence} items</strong>
            </div>
            <div>
              <span>LAST UPDATED</span>
              <strong>{selected.lastUpdated}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestigationApp
