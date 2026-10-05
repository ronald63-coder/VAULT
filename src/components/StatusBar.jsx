function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-time">14:47</span>

      <div className="status-icons" aria-label="device status">
        <span className="signal">▮▮</span>
        <span className="wifi">Wi‑Fi</span>
        <span className="battery">🔋</span>
      </div>
    </div>
  )
}

export default StatusBar
