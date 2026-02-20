import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton } from '@clerk/clerk-react'
import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import ProductPage from './pages/ProductPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import CreatePage from './pages/CreatePage'
import EditProductPage from './pages/EditProductPage'

const app = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar/>
      <main className='max-w-5xl mx-auto px-4 py-8'>
        {/* //these are out diffrent pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />

        </Routes>
      </main>
      
    </div>
  )
}

export default app
