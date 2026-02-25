import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton } from '@clerk/clerk-react'
import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import ProductPage from './pages/ProductPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import CreatePage from './pages/CreatePage'
import EditProductPage from './pages/EditProductPage'
import useUserSync from './hooks/useUserSync'
import useAuthReq from './hooks/useAuthReq'
const app = () => {
  //we are callling the useauth and user sync here and also desrcutuing them 
  const {isClerkLoaded}=useAuthReq();
  useUserSync();
  //console.log({isSignedIn});
  if(!isClerkLoaded) return null;
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar/>
      <main className='max-w-5xl mx-auto px-4 py-8'>
        {/* //these are out diffrent pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* if user signed in then only open this page else navigate to the signin tab home tab  */}
          <Route path="/create" element={isSignedIn?<CreatePage />:<Navigate to={"/"}/>} />
          <Route path="/edit/:id" element={<EditProductPage />} />

        </Routes>
      </main>
      x
    </div>
  )
}

export default app
