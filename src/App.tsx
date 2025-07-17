import { Routes, Route } from 'react-router-dom'
import { pagesLinkpath } from './path/LinkPath'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './App.css'




function App() {

  return (
      <Routes>
        <Route path={pagesLinkpath.login} element={<LoginPage />} />
        <Route path={pagesLinkpath.homePage} element={<HomePage />} />
      </Routes>
  )
}

export default App
