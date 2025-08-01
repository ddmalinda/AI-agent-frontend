import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { store } from './app/store.tsx'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
 
)
