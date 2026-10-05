function PinPad({ onPressKey, onDelete, onSubmit }) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  return (
    <div className="keypad">
      {digits.map((digit) => (
        <button key={digit} type="button" className="keypad-btn" onClick={() => onPressKey(digit)}>
          {digit}
        </button>
      ))}

      <button type="button" className="keypad-btn empty" aria-hidden="true" />
      <button type="button" className="keypad-btn" onClick={() => onPressKey('0')}>0</button>
      <button type="button" className="keypad-btn" onClick={onDelete}>⌫</button>

      <button type="button" className="unlock-btn" onClick={onSubmit}>UNLOCK</button>
    </div>
  )
}

export default PinPad
