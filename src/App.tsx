import { Routes, Route } from 'react-router-dom'
import { pagesLinkpath } from './path/LinkPath'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './App.css'
import SingIn from './pages/SingIn'
import BusinessDetails from './pages/BusinessDetails'
import ProductAddPage from './pages/ProductListPage'




function App() {

  return (
      <Routes>
        <Route path={pagesLinkpath.login} element={<LoginPage />} />
        <Route path={pagesLinkpath.homePage} element={<HomePage />} />
        <Route path={pagesLinkpath.singIn} element={<SingIn/>}/>
        <Route path={pagesLinkpath.businessDetails} element={<BusinessDetails/>}/>
        <Route path={pagesLinkpath.productAddPage} element={<ProductAddPage/>}/>
      </Routes>
  )
}

export default App
