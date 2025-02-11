import './assets/main.css'

import { StrictMode } from 'react'
import { Routes, Route, HashRouter } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CreatePartner from './CreatePartner'
import UpdatePartner from './UpdatePartner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/create' element={<CreatePartner/>}/>
        <Route path='/update' element={<UpdatePartner/>}/>
      </Routes>
    </StrictMode>
  </HashRouter>
)
