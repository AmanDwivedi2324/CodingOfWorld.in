'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { signOut } from 'firebase/auth'

// Make sure this path is correct for your project structure
import { useAuth } from '@/context/AuthContext' 
import { auth } from '../../../firebase'
import img from '../../../public/CowLogo.svg'

// jhkl;
// hjlk
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();
  // Get both user and the loading state from the context
  const { user, loading } = useAuth(); 

  const toggleDrawer = () => setIsOpen(!isOpen)

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (isOpen) {
        toggleDrawer();
      }
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleNavClick = (path) => {
    router.push(path);
    toggleDrawer();
  };

  // This is the new function that renders the authentication status
  const renderAuthStatus = (isMobile = false) => {
    // While waiting for Firebase to respond, show a placeholder
    if (loading) {
      return (
        <div className={` text-[#ff2929] hover:text-red-700 transition-colors bg-gray-400 cursor-pointer ${isMobile ? 'w-24 h-10' : 'w-10 h-10 rounded-full'}`}></div>
      );
    }

    // Once loading is complete, show the correct UI
    if (user) {
      if (isMobile) {
        return (
          <button onClick={handleLogout} className='bg-gray-600 text-white rounded-md px-6 py-2 w-auto font-semibold hover:bg-gray-700'>
            Logout
          </button>
        );
      }
      return (
        <button onClick={() => router.push("/profile")} title="Profile">
          <UserCircleIcon className="h-10 w-10 text-[#ff2929] hover:text-red-700 transition-colors cursor-pointer" />
        </button>
      );
    }

    // If not loading and no user, show Sign In button
    return (
      <button 
        onClick={() => isMobile ? handleNavClick('/signin') : router.push('/signin')} 
        className={`bg-[#ff2929] cursor-pointer text-white font-bold rounded-md transition-colors ${isMobile ? 'px-6 py-2' : 'px-4 py-2 hover:bg-red-700'}`}
      >
        Sign In
      </button>
    );
  };

  return (
    <header className='bg-[#EAEAEA] sticky top-0 left-0 w-full z-50 shadow-sm'>
      <div className='flex justify-between items-center px-5 py-3 max-w-7xl mx-auto'>
        {/* Logo */}
        <Link href="/">
          <Image 
            src={img} 
            alt="logo" 
            width={200} 
            height={50} 
            className='m-1 hover:scale-105 duration-300' 
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-6'>
          <Link className='text-[#ff2929] font-semibold hover:text-red-700' href="/tools">Tools</Link>
          <Link className='text-[#ff2929] font-semibold hover:text-red-700' href="/blog">Blog</Link>
          <Link className='text-[#ff2929] font-semibold hover:text-red-700' href="/about">About</Link>
          {/* Render the auth status for desktop */}
          {renderAuthStatus()}
        </div>

        {/* Hamburger icon for mobile */}
        <button onClick={toggleDrawer} className='md:hidden'>
          {isOpen ? <XMarkIcon className='h-8 w-8 text-black' /> : <Bars3Icon className='h-8 w-8 text-black' />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-[#EAEAEA] flex flex-col items-center gap-6 py-6 shadow-lg'>
          <Link className='text-[#ff2929] font-semibold text-lg hover:text-red-700' href="/tools" onClick={toggleDrawer}>Tools</Link>
          <Link className='text-[#ff2929] font-semibold text-lg hover:text-red-700' href="/blog" onClick={toggleDrawer}>Blog</Link>
          <Link className='text-[#ff2929] font-semibold text-lg hover:text-red-700' href="/about" onClick={toggleDrawer}>About</Link>
          <div className="w-full border-t border-gray-300 my-2"></div>
          {/* Render the auth status for mobile */}
          {renderAuthStatus(true)}
        </div>
      )}
    </header>
  )
}

export default Header;