import { appTiles } from '../data/demoData'

function HomeScreen({ onOpenApp, activeApp }) {
  return (
    <div className="home-screen">
      <div className="home-header">
        <div className="brand-mini">
          <span className="mini-shield">V</span>
          <span>PROJECT VAULT</span>
        </div>

        <div className="secure-pill">
          <span className="green-dot" />
          SECURE
        </div>
      </div>

      <div className="home-body">
        <div className="welcome-block">
          <p className="eyebrow">JOURNALIST MODE</p>
          <h1>Welcome back.</h1>
          <p>Your protected investigative workspace is available.</p>
        </div>

        <div className="app-grid">
          {appTiles.map((app) => (
            <button
              key={app.id}
              type="button"
              className={`app-tile ${activeApp === app.id ? 'active' : ''}`}
              onClick={() => onOpenApp(app.id)}
            >
              <span className="app-icon">{app.icon}</span>
              <span className="app-label">{app.label}</span>
            </button>
          ))}
        </div>

        <div className="status-card">
          <strong>Protected environment</strong>
          <p>All critical materials remain isolated behind Vault protection.</p>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
