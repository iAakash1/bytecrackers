import { useState, useEffect } from 'react'

interface InitializeAppState {
  isLoading: boolean
  error: Error | null
}

export const useInitializeApp = (): InitializeAppState => {
  const [state, setState] = useState<InitializeAppState>({
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setState({
          isLoading: false,
          error: null
        })
      } catch (error) {
        setState({
          isLoading: false,
          error: error as Error
        })
      }
    }

    initializeApp()
  }, [])

  return state
}
