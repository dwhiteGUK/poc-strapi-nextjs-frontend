import { createContext } from 'react';

const AppContext = createContext()
AppContext.displayName = 'AppContext'

const AppProvider = ({ children }) => {

  return (
    <AppContext.Provider value={{
      API_URL: process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:1337'
    }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }