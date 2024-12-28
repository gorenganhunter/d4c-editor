import React, { useEffect } from 'react'
import MappingPage from './MappingPage'
import { useGameState } from './GamePage/gamestate'
import GamePage from './GamePage'
import { Theme } from '@mui/material/styles';
declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
    interface DefaultTheme extends Theme {}
}

const App = () => {

  useEffect(() => {
    document.getElementById("loader")?.remove()
    document.getElementById("loader-style")?.remove()

    gtag('event', 'timing_complete', {
      'name' : 'app_load',
      'value' : performance.now(),
    })
  }, [])

  const inGame = useGameState()

  if (inGame) return <GamePage />

  return <MappingPage />
}

export default App
