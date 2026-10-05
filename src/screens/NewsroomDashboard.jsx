import SecurityNotification from '../components/SecurityNotification'

function NewsroomDashboard({ eventTime, onBack, onReplay }) {
  return (
    <div className="newsroom-dashboard">
      <div className="newsroom-header">
        <p className="eyebrow">PROTECTED RESPONSE</p>
        <h2>Newsroom Security Desk</h2>
        <p className="newsroom-intro">
          A duress PIN can trigger protection without revealing the sensitive workspace.
        </p>
      </div>

      <div className="newsroom-card alert">
        <div className="incident-heading">
          <h3>POTENTIAL COERCION</h3>
          <span className="incident-status">ACTION NEEDED</span>
        </div>
        <div className="meta-row">
          <span>Journalist</span>
          <strong>J-001</strong>
        </div>
        <div className="meta-row">
          <span>Status</span>
          <strong>Requires attention</strong>
        </div>
        <div className="meta-row">
          <span>Event</span>
          <strong>Duress PIN</strong>
        </div>
        <div className="meta-row">
          <span>Time</span>
          <strong>{eventTime}</strong>
        </div>
      </div>

      <div className="response-summary">
        <p className="eyebrow">VAULT RESPONSE</p>
        <div><span>01</span><strong>Investigative workspace concealed</strong></div>
        <div><span>02</span><strong>Source identities kept out of view</strong></div>
        <div><span>03</span><strong>Trusted newsroom contact notified</strong></div>
      </div>

      <SecurityNotification />

      <p className="prototype-note">
        Demonstration only. This prototype does not provide real device-level protection.
      </p>

      <div className="flow-actions">
        <button type="button" className="flow-button secondary" onClick={onBack}>
          Back to Safe Mode
        </button>
        <button type="button" className="flow-button primary" onClick={onReplay}>
          Replay Demo
        </button>
      </div>
    </div>
  )
}

export default NewsroomDashboard
