function SourcesApp({ sources, onBack }) {
  return (
    <div className="app-page">
      <div className="app-topbar">
        <button type="button" className="back-btn" onClick={onBack}>←</button>
        <h2>CONFIDENTIAL SOURCES</h2>
      </div>

      <div className="source-list">
        {sources.map((source) => (
          <div key={source.id} className="source-card">
            <div className="source-header">
              <strong>{source.label}</strong>
              <span>{source.status}</span>
            </div>
            <div className="mask-line">████████</div>
            <small>{source.level} priority</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SourcesApp
