import { useEffect, useRef, useState } from 'react'
import './App.css'
import PhoneShell from './components/PhoneShell'
import LockScreen from './screens/LockScreen'
import HomeScreen from './screens/HomeScreen'
import VaultProtocol from './screens/VaultProtocol'
import SafeMode from './screens/SafeMode'
import NewsroomDashboard from './screens/NewsroomDashboard'
import InvestigationApp from './apps/InvestigationApp'
import SourcesApp from './apps/SourcesApp'
import EvidenceApp from './apps/EvidenceApp'
import SecureChat from './apps/SecureChat'
import {
  investigations,
  sources,
  evidenceItems,
  chatMessages,
} from './data/demoData'

const NORMAL_PIN = '1234'
const DURESS_PIN = '9999'

function App() {
  const [screen, setScreen] = useState('lock')
  const [enteredPin, setEnteredPin] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [activeApp, setActiveApp] = useState('investigations')
  const [selectedInvestigation, setSelectedInvestigation] = useState(investigations[0].id)
  const [eventTime, setEventTime] = useState('--:--')
  const [screenHistory, setScreenHistory] = useState([])
  const [safeApp, setSafeApp] = useState(null)
  const [theme, setTheme] = useState('dark')
  const transitionTimers = useRef([])
  const currentScreenRef = useRef(screen)

  useEffect(() => {
    currentScreenRef.current = screen
  }, [screen])

  const navigateTo = (nextScreen) => {
    const currentScreen = currentScreenRef.current
    if (nextScreen === currentScreen) {
      return
    }

    setScreenHistory((history) => [...history, currentScreen].slice(-6))
    currentScreenRef.current = nextScreen
    setScreen(nextScreen)
  }

  const openApp = (appId) => {
    setActiveApp(appId)
    navigateTo(appId)
  }

  const goHome = () => {
    navigateTo('home')
  }

  const goBack = () => {
    if (currentScreenRef.current === 'safe' && safeApp) {
      setSafeApp(null)
      return
    }

    if (screenHistory.length === 0) {
      clearPin()
      return
    }

    const previousScreen = screenHistory[screenHistory.length - 1]
    setScreenHistory((history) => history.slice(0, -1))
    currentScreenRef.current = previousScreen
    setScreen(previousScreen)
  }

  const goToPhoneHome = () => {
    const currentScreen = currentScreenRef.current
    if (currentScreen === 'lock') {
      return
    }

    if (currentScreen === 'safe' && safeApp) {
      setSafeApp(null)
      return
    }

    if (['vault', 'safe', 'newsroom'].includes(currentScreen)) {
      navigateTo('safe')
      return
    }

    navigateTo('home')
  }

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

  const startVaultProtocol = () => {
    transitionTimers.current.forEach((timer) => clearTimeout(timer))
    transitionTimers.current = []
    navigateTo('vault')
    setProgress(0)
    setEventTime(new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }))

    transitionTimers.current.push(setTimeout(() => {
      setProgress(25)
    }, 300))

    transitionTimers.current.push(setTimeout(() => {
      setProgress(50)
    }, 900))

    transitionTimers.current.push(setTimeout(() => {
      setProgress(75)
    }, 1700))

    transitionTimers.current.push(setTimeout(() => {
      setProgress(100)
    }, 2500))

    transitionTimers.current.push(setTimeout(() => {
      if (currentScreenRef.current !== 'vault') {
        return
      }

      setScreenHistory((history) => [...history, 'vault'].slice(-6))
      currentScreenRef.current = 'safe'
      setScreen('safe')
    }, 3300))

  }

  const activateDuressFromVoice = () => {
    if (['vault', 'safe', 'newsroom'].includes(currentScreenRef.current)) {
      return
    }

    setEnteredPin('')
    setLoginMessage('')
    startVaultProtocol()
  }

  const unlockVault = () => {
    if (enteredPin.length !== 4) {
      setLoginMessage('Enter your 4-digit PIN.')
      return
    }

    if (enteredPin === NORMAL_PIN) {
      setEnteredPin('')
      setLoginMessage('')
      navigateTo('home')
      return
    }

    if (enteredPin === DURESS_PIN) {
      setEnteredPin('')
      setLoginMessage('')
      startVaultProtocol()
      return
    }

    setLoginMessage('Authentication failed.')
    setEnteredPin('')
  }

  const resetVault = () => {
    transitionTimers.current.forEach((timer) => clearTimeout(timer))
    transitionTimers.current = []
    setEnteredPin('')
    setLoginMessage('')
    setProgress(0)
    setSafeApp(null)
    setScreenHistory([])
    currentScreenRef.current = 'lock'
    setScreen('lock')
  }

  return (
    <div className="app-root" data-theme={theme}>
      <PhoneShell
        showDynamicIsland={screen !== 'lock'}
        activeScreen={screen}
        recentScreens={[...new Set(screenHistory)].reverse()}
        onBack={goBack}
        onHome={goToPhoneHome}
        onSelectRecent={navigateTo}
        onVoiceTrigger={activateDuressFromVoice}
      >
        {screen === 'lock' && (
          <LockScreen
            enteredPin={enteredPin}
            loginMessage={loginMessage}
            onPressKey={pressKey}
            onDelete={clearPin}
            onSubmit={unlockVault}
          />
        )}

        {screen === 'home' && <HomeScreen onOpenApp={openApp} activeApp={activeApp} />}

        {screen === 'investigations' && (
          <InvestigationApp
            investigations={investigations}
            selectedId={selectedInvestigation}
            onSelect={setSelectedInvestigation}
            onBack={goHome}
          />
        )}

        {screen === 'sources' && <SourcesApp sources={sources} onBack={goHome} />}

        {screen === 'evidence' && <EvidenceApp evidenceItems={evidenceItems} onBack={goHome} />}

        {screen === 'chat' && <SecureChat messages={chatMessages} onBack={goHome} />}

        {screen === 'vault' && (
          <VaultProtocol progress={progress} />
        )}

        {screen === 'safe' && (
          <SafeMode
            activeApp={safeApp}
            theme={theme}
            onThemeChange={setTheme}
            onOpenApp={setSafeApp}
            onCloseApp={() => setSafeApp(null)}
            onBack={goBack}
            onContinue={() => {
              setSafeApp(null)
              navigateTo('newsroom')
            }}
            onReset={resetVault}
          />
        )}

        {screen === 'newsroom' && (
          <NewsroomDashboard
            eventTime={eventTime}
            onBack={goBack}
            onReplay={resetVault}
          />
        )}
      </PhoneShell>
    </div>
  )
}

export default App
