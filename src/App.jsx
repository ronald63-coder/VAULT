import { useState } from 'react'
import './App.css'

const NORMAL_PIN = '1234'
const DURESS_PIN = '9999'

function App() {
  const [screen, setScreen] = useState('loginScreen')
  const [enteredPin, setEnteredPin] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const [eventTime, setEventTime] = useState('--:--')
  const [progress, setProgress] = useState(0)
  const [activationStatus, setActivationStatus] = useState(
    'Initializing protective state...'
  )

  const showScreen = (screenId) => setScreen(screenId)

  const pressKey = (number) => {
    if (enteredPin.length >= 4) {
      return
    }

    setEnteredPin((prev) => prev + number)
  }

  const clearPin = () => {
    setEnteredPin('')
    setLoginMessage('')
  }

  const showSafeMode = () => {
    showScreen('safeScreen')

    const now = new Date()
    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    setEventTime(time)
  }

  const activateVault = () => {
    showScreen('vaultScreen')
    setProgress(0)
    setActivationStatus('Initializing protective state...')

    setTimeout(() => {
      setProgress(35)
      setActivationStatus('Protecting sensitive workspace...')
    }, 300)

    setTimeout(() => {
      setProgress(70)
      setActivationStatus('Generating emergency notification...')
    }, 1300)

    setTimeout(() => {
      setProgress(100)
      setActivationStatus('Protective state established.')
    }, 2300)

    setTimeout(() => {
      showSafeMode()
    }, 3300)
  }

  const unlockVault = () => {
    if (enteredPin.length !== 4) {
      setLoginMessage('Enter your 4-digit PIN.')
      return
    }

    if (enteredPin === NORMAL_PIN) {
      setLoginMessage('')
      setEnteredPin('')
      showScreen('journalistScreen')
      return
    }

    if (enteredPin === DURESS_PIN) {
      setLoginMessage('')
      setEnteredPin('')
      activateVault()
      return
    }

    setLoginMessage('Authentication failed.')
    setEnteredPin('')
  }

  const resetVault = () => {
    setEnteredPin('')
    setLoginMessage('')
    setProgress(0)
    setActivationStatus('Initializing protective state...')
    setEventTime('--:--')
    showScreen('loginScreen')
  }

  return (
    <>
      <main id="loginScreen" className={`screen ${screen === 'loginScreen' ? 'active' : ''}`}>
        <div className="vault-logo">
          <div className="shield">V</div>
          <h1>PROJECT VAULT</h1>
          <p>Coercion-Aware Security for Journalism</p>
        </div>

        <div className="login-card">
          <div className="status-dot" />

          <h2>Secure Access</h2>
          <p className="muted">Enter your security PIN to continue.</p>

          <div id="pinDisplay" className="pin-display">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>{index < enteredPin.length ? '●' : '•'}</span>
            ))}
          </div>

          <div className="keypad">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button key={digit} type="button" onClick={() => pressKey(digit)}>
                {digit}
              </button>
            ))}
            <button type="button" className="empty" aria-hidden="true"></button>
            <button type="button" onClick={() => pressKey('0')}>0</button>
            <button type="button" onClick={clearPin}>⌫</button>
          </div>

          <button type="button" className="unlock-btn" onClick={unlockVault}>
            UNLOCK
          </button>

          <p id="loginMessage" className="login-message">
            {loginMessage}
          </p>

          <div className="demo-hint">
            <strong>Prototype Demo</strong>
            <br />
            Normal PIN: <code>1234</code>
            <br />
            Duress PIN: <code>9999</code>
          </div>
        </div>
      </main>

      <main id="journalistScreen" className={`screen ${screen === 'journalistScreen' ? 'active' : ''}`}>
        <header className="topbar">
          <div className="brand">
            <div className="mini-shield">V</div>
            <span>PROJECT VAULT</span>
          </div>

          <div className="secure-status">
            <span className="green-dot"></span>
            SECURE
          </div>
        </header>

        <section className="dashboard">
          <div className="welcome">
            <p className="eyebrow">JOURNALIST MODE</p>
            <h1>Welcome back.</h1>
            <p>Your protected investigative workspace is available.</p>
          </div>

          <div className="workspace-grid">
            <div className="workspace-card">
              <div className="card-icon">▣</div>
              <h3>Investigations</h3>
              <p>Active investigative projects and working files.</p>
              <span className="protected">PROTECTED</span>
            </div>

            <div className="workspace-card">
              <div className="card-icon">◉</div>
              <h3>Confidential Sources</h3>
              <p>Protected source identities and communications.</p>
              <span className="protected">PROTECTED</span>
            </div>

            <div className="workspace-card">
              <div className="card-icon">◆</div>
              <h3>Evidence</h3>
              <p>Documents, photographs and investigative material.</p>
              <span className="protected">PROTECTED</span>
            </div>

            <div className="workspace-card">
              <div className="card-icon">✉</div>
              <h3>Secure Communications</h3>
              <p>Encrypted communication with trusted contacts.</p>
              <span className="protected">PROTECTED</span>
            </div>
          </div>

          <div className="demo-warning">
            <strong>⚠ Prototype Environment</strong>
            <p>
              This is a proof-of-concept demonstrating the Vault security workflow.
              It does not provide real device-level protection.
            </p>
          </div>

          <button type="button" className="lock-btn" onClick={resetVault}>
            🔒 LOCK DEVICE
          </button>
        </section>
      </main>

      <main id="vaultScreen" className={`screen ${screen === 'vaultScreen' ? 'active' : ''}`}>
        <div className="activation-container">
          <div className="danger-ring">
            <div className="danger-icon">!</div>
          </div>

          <p className="eyebrow danger-text">VAULT PROTOCOL</p>

          <h1>Protective Protocol Activated</h1>

          <p className="activation-description">
            A protected authentication pathway has been triggered.
          </p>

          <div className="activation-steps">
            <div className="step complete">
              <span>✓</span>
              <div>
                <strong>Authentication event detected</strong>
                <small>Protective pathway initiated</small>
              </div>
            </div>

            <div className="step complete">
              <span>✓</span>
              <div>
                <strong>Sensitive workspace protected</strong>
                <small>Investigative workspace unavailable</small>
              </div>
            </div>

            <div className="step complete">
              <span>✓</span>
              <div>
                <strong>Emergency event generated</strong>
                <small>Trusted newsroom contact alerted</small>
              </div>
            </div>
          </div>

          <div className="progress-container">
            <div id="progressBar" style={{ width: `${progress}%` }} />
          </div>

          <p id="activationStatus">{activationStatus}</p>
        </div>
      </main>

      <main id="safeScreen" className={`screen ${screen === 'safeScreen' ? 'active' : ''}`}>
        <header className="topbar safe-topbar">
          <div className="brand">
            <div className="mini-shield">V</div>
            <span>PROJECT VAULT</span>
          </div>

          <div className="safe-status">● SAFE MODE</div>
        </header>

        <section className="safe-dashboard">
          <div className="safe-banner">
            <div className="safe-icon">✓</div>

            <div>
              <p className="eyebrow">PROTECTIVE STATE</p>
              <h1>Safe Mode Active</h1>

              <p>
                Sensitive investigative workspaces are not available in this session.
              </p>
            </div>
          </div>

          <h2>Available</h2>

          <div className="safe-grid">
            <div className="safe-card">
              <span>☁</span>
              <strong>Weather</strong>
            </div>

            <div className="safe-card">
              <span>▣</span>
              <strong>Calculator</strong>
            </div>

            <div className="safe-card">
              <span>✎</span>
              <strong>Notes</strong>
            </div>

            <div className="safe-card">
              <span>⚙</span>
              <strong>Settings</strong>
            </div>
          </div>

          <div className="alert-card">
            <div className="alert-header">
              <span className="alert-icon">!</span>

              <div>
                <p className="eyebrow">SECURITY EVENT</p>
                <h2>Trusted Contact Notification</h2>
              </div>

              <span className="alert-status">SENT</span>
            </div>

            <div className="alert-details">
              <div>
                <span>EVENT</span>
                <strong>Potential coercion</strong>
              </div>

              <div>
                <span>TIME</span>
                <strong id="eventTime">{eventTime}</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>Protected / Demo Location</strong>
              </div>

              <div>
                <span>RECIPIENT</span>
                <strong>Newsroom Security Desk</strong>
              </div>
            </div>
          </div>

          <div className="core-message">
            <strong>
              Forced to unlock should not mean forced to surrender the investigation.
            </strong>
          </div>

          <button type="button" className="reset-btn" onClick={resetVault}>
            ↻ RESET DEMO
          </button>
        </section>
      </main>
    </>
  )
}

export default App
