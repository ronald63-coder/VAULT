import { useState } from 'react'
import StatusBar from './StatusBar'
import VoiceTrigger from './VoiceTrigger'

const screenLabels = {
  lock: 'Secure Access',
  home: 'Journalist Workspace',
  investigations: 'Investigations',
  sources: 'Protected Sources',
  evidence: 'Evidence',
  chat: 'Secure Chat',
  vault: 'Vault Protocol',
  safe: 'Safe Mode',
  newsroom: 'Newsroom Security Desk',
}

function PhoneShell({
  children,
  showDynamicIsland = false,
  activeScreen,
  recentScreens,
  onBack,
  onHome,
  onSelectRecent,
  onVoiceTrigger,
}) {
  const [recentsOpen, setRecentsOpen] = useState(false)

  return (
    <div className="phone-shell">
      <div className="phone-notch">
        {showDynamicIsland && <div className="dynamic-island" />}
      </div>

      <StatusBar />
      <div className="phone-screen">
        {children}
        {recentsOpen && (
          <div className="recent-apps-overlay" aria-label="Recent screens">
            <div className="recent-apps-header">
              <h2>Recent</h2>
              <button
                type="button"
                className="recent-close"
                aria-label="Close recent screens"
                onClick={() => setRecentsOpen(false)}
              >
                ×
              </button>
            </div>
            {recentScreens.length > 0 ? (
              <div className="recent-apps-list">
                {recentScreens.map((screen) => (
                  <button
                    type="button"
                    className={`recent-app-item ${screen === activeScreen ? 'selected' : ''}`}
                    key={screen}
                    onClick={() => {
                      onSelectRecent(screen)
                      setRecentsOpen(false)
                    }}
                  >
                    <span className="recent-app-mark">V</span>
                    <span>{screenLabels[screen] ?? screen}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="recent-empty">No recent screens.</p>
            )}
          </div>
        )}
      </div>
      <VoiceTrigger onTrigger={onVoiceTrigger} />
      <nav className="system-navigation" aria-label="Phone navigation">
        <button
          type="button"
          aria-label="Back"
          title="Back"
          onClick={() => {
            setRecentsOpen(false)
            onBack()
          }}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Home"
          title="Home"
          onClick={() => {
            setRecentsOpen(false)
            onHome()
          }}
        >
          ⌂
        </button>
        <button
          type="button"
          aria-label="Recents"
          title="Recents"
          aria-expanded={recentsOpen}
          onClick={() => setRecentsOpen((open) => !open)}
        >
          ▤
        </button>
      </nav>
    </div>
  )
}

export default PhoneShell
