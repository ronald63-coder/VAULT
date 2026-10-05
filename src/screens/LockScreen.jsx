import PinPad from '../components/PinPad'
import vaultLogo from '../assets/vault-logo.jpg'

function LockScreen({ enteredPin, loginMessage, onPressKey, onDelete, onSubmit }) {
  return (
    <div className="lock-screen">
      <div className="vault-logo">
        <img src={vaultLogo} alt="Project Vault Logo" />
        <h1>PROJECT VAULT</h1>
        <p>Coercion-Aware Security for Journalism</p>
      </div>

      <div className="login-card">
        <div className="status-dot" />
        <h2>Secure Access</h2>
        <p className="muted">Enter your security PIN to continue.</p>

        <div className="pin-display" aria-live="polite">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index}>{index < enteredPin.length ? '●' : '•'}</span>
          ))}
        </div>

        <PinPad onPressKey={onPressKey} onDelete={onDelete} onSubmit={onSubmit} />

        <p className="login-message">{loginMessage}</p>
      </div>
    </div>
  )
}

export default LockScreen
