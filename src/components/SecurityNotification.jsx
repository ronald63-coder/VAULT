function SecurityNotification() {
  return (
    <div className="security-notification">
      <div className="security-header">
        <span className="notify-badge">VAULT</span>
        <strong>Security event generated</strong>
      </div>

      <p>Trusted contact notified.</p>
      <p>Potential coercion detected.</p>
    </div>
  )
}

export default SecurityNotification
