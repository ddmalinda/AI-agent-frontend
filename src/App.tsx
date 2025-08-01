import ProductAddPage from './pages/ProductListPage'
import { Routes, Route } from 'react-router-dom'
import { pagesLinkpath } from './path/LinkPath'
import AuthGuard from './commen/AuthGuard'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SingIn from './pages/SingIn'
import './App.css'
import AiAgent from './pages/AiAgent'




function App() {

  return (
    <Routes>
      <Route path={pagesLinkpath.singIn} element={<SingIn />} />
      <Route path={pagesLinkpath.login} element={<LoginPage />} />
      <Route path={pagesLinkpath.public} element={
        <AuthGuard>
          <Routes>
            <Route path={pagesLinkpath.homePage} element={<HomePage />} />
            <Route path={pagesLinkpath.productListPage + "/:businessId"} element={<ProductAddPage />} />
            <Route path={pagesLinkpath.aiAgent} element={<AiAgent />} />
          </Routes>
        </AuthGuard>
      } />
    </Routes>
  )
}

export default App
