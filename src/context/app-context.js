import { createContext } from 'react';

const AppContext = createContext()
AppContext.displayName = 'AppContext'

const AppProvider = ({ children }) => {
  console.log('🚀 ~ file: app-context.js ~ line 11 ~ AppProvider ~  process.env.NODE_ENV', process.env.NODE_ENV)
  console.log('🚀 ~ file: app-context.js ~ line 11 ~ AppProvider ~  process.env.API_URL', process.env.NEXT_PUBLIC_API_URL)

  return (
    <AppContext.Provider value={{
      API_URL: process.env.NEXT_PUBLIC_API_URL
    }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }