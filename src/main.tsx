import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'

import { Login } from './pages/Login'
import { UserDashboard } from './pages/user/UserDashboard'
import { AdminDashboard } from './pages/admin/AdminDashboard'

import AdminRoute from './pages/admin/AdminRoute.tsx'
import UserRoute from './pages/user/UserRoute.tsx'
import { InventoryPage } from './pages/admin/InventoryPage.tsx'
import { PreviewComponent } from './pages/admin/PreviewComponent'
import { SettingsPage } from './pages/admin/SettingsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<PreviewComponent />} /> 
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route element={<UserRoute />}>
          <Route path="/user" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
