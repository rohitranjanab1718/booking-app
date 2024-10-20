import { createRoot } from 'react-dom/client'
import { QueryClient , QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContexts.tsx'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
)
