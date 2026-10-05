import { useEffect, useEffectEvent, useState } from 'react'

function VoiceTrigger({ onTrigger }) {
  const [enabled, setEnabled] = useState(false)
  const [status, setStatus] = useState('off')
  const supported = typeof window !== 'undefined' && Boolean(
    window.SpeechRecognition || window.webkitSpeechRecognition
  )
  const triggerDuress = useEffectEvent(onTrigger)

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      return undefined
    }

    const recognition = new Recognition()
    let disposed = false
    let restartTimer
    let lastTriggerTime = 0

    recognition.lang = 'en-US'
    recognition.continuous = true
    recognition.interimResults = false

    const startRecognition = () => {
      if (disposed) {
        return
      }

      try {
        recognition.start()
      } catch (error) {
        if (error.name !== 'InvalidStateError') {
          setStatus('error')
        }
      }
    }

    recognition.onstart = () => setStatus('listening')
    recognition.onresult = (event) => {
      const results = Array.from(event.results).slice(event.resultIndex)
      const heardTrigger = results.some((result) => /\bweather\b/i.test(result[0].transcript))

      if (heardTrigger && Date.now() - lastTriggerTime > 5000) {
        lastTriggerTime = Date.now()
        triggerDuress()
      }
    }
    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setStatus('denied')
        setEnabled(false)
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setStatus('error')
      }
    }
    recognition.onend = () => {
      if (!disposed) {
        setStatus('restarting')
        restartTimer = window.setTimeout(startRecognition, 250)
      }
    }

    startRecognition()

    return () => {
      disposed = true
      window.clearTimeout(restartTimer)
      recognition.onend = null
      recognition.stop()
    }
  }, [enabled])

  const statusLabel = {
    off: 'Voice trigger off',
    listening: 'Listening for “weather”',
    restarting: 'Reconnecting microphone',
    denied: 'Microphone permission denied',
    unsupported: 'Voice input unavailable in this browser',
    error: 'Voice input unavailable',
  }[supported ? status : 'unsupported']

  return (
    <div className="voice-trigger-control">
      <span className={`voice-status-dot ${enabled ? 'active' : ''}`} aria-hidden="true" />
      <span className="voice-trigger-label" aria-live="polite">{statusLabel}</span>
      <button
        type="button"
        className="voice-trigger-button"
        aria-pressed={enabled}
        disabled={!supported}
        onClick={() => {
          setStatus('off')
          setEnabled((current) => !current)
        }}
      >
        {enabled ? 'Stop' : 'Enable'}
      </button>
    </div>
  )
}

export default VoiceTrigger