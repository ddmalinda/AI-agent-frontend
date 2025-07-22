import { Routes, Route } from 'react-router-dom'
import { pagesLinkpath } from './path/LinkPath'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './App.css'
import SingIn from './pages/SingIn'
import ProductAddPage from './pages/ProductListPage'
import AuthGuard from './commen/AuthGuard'




function App() {

  return (
      <Routes>
        <Route path={pagesLinkpath.login} element={<LoginPage />} />
        <Route path={pagesLinkpath.homePage} element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        } />
        <Route path={pagesLinkpath.singIn} element={<SingIn/>}/>
        <Route path={pagesLinkpath.productAddPage} element={<ProductAddPage/>}/>
      </Routes>
  )
}

export default App
