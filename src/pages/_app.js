import { QueryClientProvider, QueryClient } from 'react-query'

import '../styles/globals.css'
import { AppProvider } from '~/context/app-context'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppProvider>
  )
}

export default MyApp
