function VaultProtocol({ progress }) {
  const steps = [
    'Authentication event',
    'Workspace protection',
    'Source protection',
    'Emergency event',
    'Entering Safe Mode',
  ]

  const activeIndex = Math.min(Math.floor(progress / 20), steps.length - 1)

  return (
    <div className="vault-protocol">
      <div className="protocol-header">
        <div className="protocol-icon">◉</div>
        <h2>VAULT PROTOCOL</h2>
      </div>

      <div className="protocol-steps">
        {steps.map((step, index) => (
          <div key={step} className={`protocol-step ${index <= activeIndex ? 'active' : ''}`}>
            <span>{index <= activeIndex ? '✓' : '•'}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      <div className="protocol-progress">
        <div className="protocol-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

export default VaultProtocol
