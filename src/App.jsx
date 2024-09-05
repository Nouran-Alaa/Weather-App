import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Weather from './components/weather/weather'
SearchContextProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchContextProvider from './Context/SearchContext'
function App() {
  let query =new QueryClient()
  const [count, setCount] = useState(0)

  return (
    <>
    <QueryClientProvider client={query}>
      <SearchContextProvider>
      <Weather/>
      </SearchContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
