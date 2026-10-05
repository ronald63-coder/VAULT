import { useState } from 'react'
import SecurityNotification from '../components/SecurityNotification'

const safeApps = [
  { id: 'weather', icon: '☁', label: 'Weather' },
  { id: 'calculator', icon: '▣', label: 'Calculator' },
  { id: 'notes', icon: '✎', label: 'Notes' },
  { id: 'settings', icon: '⚙', label: 'Settings' },
]

const calculatorKeys = [
  ['C', '÷', '×', '−'],
  ['7', '8', '9', '+'],
  ['4', '5', '6', '='],
  ['1', '2', '3', '0'],
  ['.'],
]

const settingOptions = [
  { id: 'notifications', label: 'Notifications' },
  { id: 'sound', label: 'Sound' },
  { id: 'vibration', label: 'Vibration' },
]

function SafeMode({ activeApp, theme, onThemeChange, onOpenApp, onCloseApp, onBack, onContinue, onReset }) {
  const [note, setNote] = useState('')
  const [calculatorDisplay, setCalculatorDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [pendingOperator, setPendingOperator] = useState(null)
  const [startNewInput, setStartNewInput] = useState(false)
  const [settings, setSettings] = useState({
    notifications: true,
    sound: false,
    vibration: true,
  })

  const pressCalculatorKey = (key) => {
    if (key === 'C') {
      setCalculatorDisplay('0')
      setFirstOperand(null)
      setPendingOperator(null)
      setStartNewInput(false)
      return
    }

    if (['+', '−', '×', '÷'].includes(key)) {
      setFirstOperand(Number(calculatorDisplay))
      setPendingOperator(key)
      setStartNewInput(true)
      return
    }

    if (key === '=') {
      if (firstOperand === null || pendingOperator === null) {
        return
      }

      const secondOperand = Number(calculatorDisplay)
      const result = {
        '+': () => firstOperand + secondOperand,
        '−': () => firstOperand - secondOperand,
        '×': () => firstOperand * secondOperand,
        '÷': () => firstOperand / secondOperand,
      }[pendingOperator]()

      setCalculatorDisplay(Number.isFinite(result) ? String(Number(result.toFixed(8))) : 'Error')
      setFirstOperand(null)
      setPendingOperator(null)
      setStartNewInput(true)
      return
    }

    if (key === '.' && !startNewInput && calculatorDisplay.includes('.')) {
      return
    }

    setCalculatorDisplay((current) => {
      if (startNewInput) {
        return key === '.' ? '0.' : key
      }

      if (key === '.') {
        return `${current}.`
      }

      return current === '0' || current === 'Error' ? key : `${current}${key}`
    })
    setStartNewInput(false)
  }

  const selectedApp = safeApps.find((app) => app.id === activeApp)

  return (
    <div className="safe-mode-screen">
      {selectedApp ? (
        <section className="safe-app-view" aria-label={`${selectedApp.label} app`}>
          <div className="safe-app-header">
            <button type="button" className="safe-app-back" onClick={onCloseApp}>
              <span aria-hidden="true">‹</span> Safe Mode
            </button>
            <span className="safe-app-icon">{selectedApp.icon}</span>
            <h1>{selectedApp.label}</h1>
          </div>

          {activeApp === 'weather' && (
            <div className="weather-app-content">
              <p className="eyebrow">LOCAL FORECAST</p>
              <div className="weather-current">
                <span aria-hidden="true">☁</span>
                <strong>18°</strong>
                <p>Partly cloudy</p>
              </div>
              <div className="weather-details">
                <div><span>Feels like</span><strong>17°</strong></div>
                <div><span>Wind</span><strong>12 km/h</strong></div>
                <div><span>Humidity</span><strong>54%</strong></div>
                <div><span>Today</span><strong>16° / 21°</strong></div>
              </div>
              <p className="weather-disclaimer">Sample conditions for this demo.</p>
            </div>
          )}

          {activeApp === 'calculator' && (
            <div className="calculator-app-content">
              <output className="calculator-display" aria-live="polite">
                {calculatorDisplay}
              </output>
              <div className="calculator-keypad">
                {calculatorKeys.flat().map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`calculator-key ${['+', '−', '×', '÷', '='].includes(key) ? 'operator' : ''} ${key === 'C' ? 'clear' : ''}`}
                    onClick={() => pressCalculatorKey(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeApp === 'notes' && (
            <div className="notes-app-content">
              <label htmlFor="safe-note">Quick note</label>
              <textarea
                id="safe-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Write a note..."
              />
              <span className="note-count">{note.length} characters</span>
            </div>
          )}

          {activeApp === 'settings' && (
            <div className="settings-app-content">
              <p className="eyebrow">DEVICE PREFERENCES</p>
              <div className="appearance-setting">
                <span>Appearance</span>
                <div className="appearance-options" role="group" aria-label="Appearance">
                  {['light', 'dark'].map((option) => (
                    <button
                      type="button"
                      key={option}
                      aria-pressed={theme === option}
                      className={theme === option ? 'selected' : ''}
                      onClick={() => onThemeChange(option)}
                    >
                      {option === 'light' ? 'Light' : 'Dark'}
                    </button>
                  ))}
                </div>
              </div>
              {settingOptions.map((setting) => (
                <label className="setting-row" key={setting.id}>
                  <span>{setting.label}</span>
                  <input
                    type="checkbox"
                    checked={settings[setting.id]}
                    onChange={(event) => setSettings((current) => ({
                      ...current,
                      [setting.id]: event.target.checked,
                    }))}
                  />
                </label>
              ))}
              <p className="settings-disclaimer">Preferences are saved for this demo session.</p>
            </div>
          )}
        </section>
      ) : (
        <>
          <div className="safe-banner">
            <div className="safe-icon">✓</div>
            <div>
              <p className="eyebrow">PROTECTIVE STATE</p>
              <h1>Safe Mode Active</h1>
            </div>
          </div>

          <div className="safe-grid">
            {safeApps.map((app) => (
              <button
                type="button"
                key={app.id}
                className="safe-card"
                onClick={() => onOpenApp(app.id)}
              >
                <span>{app.icon}</span>
                <strong>{app.label}</strong>
              </button>
            ))}
          </div>

          <SecurityNotification />

          <div className="flow-actions">
            <button type="button" className="flow-button secondary" onClick={onBack}>
              Back to Protocol
            </button>
            <button type="button" className="flow-button primary" onClick={onContinue}>
              Continue to Newsroom
            </button>
          </div>

          <button type="button" className="reset-btn" onClick={onReset}>RESET DEMO</button>
        </>
      )}
    </div>
  )
}

export default SafeMode
