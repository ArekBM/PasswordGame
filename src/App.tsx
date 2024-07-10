import Home from './components/Homepage'
import Maps from './components/Maps'


function App() {
  console.log(import.meta.env.VITE_REACT_APP_TEST_API_KEY)
  return (
    <>
      <Home />
      <Maps />

    </>
  )
}

export default App
