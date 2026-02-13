"use client";
import { useState } from 'react';
import Link from 'next/link';
import AuthModal from './AuthModal';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Cars for Sale", href: "/cars" },
    { name: "About Us", href: "/about" },
    { name: "News & Videos", href: "/#news" },
    { name: "Sell Your Car", href: "/sell" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-[100]">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-[28px] font-black  text-black italic tracking-tighter">
           Qaulity cars
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-7 text-[14px] font-bold text-[#333333]">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                {link.name}
              </Link>
            ))}
            {user?.isAdmin && (
              <>
                <Link 
                  href="/admin" 
                  className="text-black hover:text-gray-700 transition-colors underline-offset-4 hover:underline"
                >
                  Manage Inventory
                </Link>
               
              </>
            )}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-xs font-bold text-gray-500">Hi, {user.email.split('@')[0]}</span>
              <button 
                onClick={logout}
                className="text-[14px] font-bold text-gray-500 hover:text-black transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden sm:flex items-center gap-2 text-[14px] font-bold text-[#333333] hover:text-black"
            >
              <span>Sign In</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.963-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg lg:hidden transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" 
              strokeWidth={2} stroke="currentColor" 
              className="w-7 h-7 text-black"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-white z-[90] lg:hidden transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-y-0' : '-translate-y-full'}
      `}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          
          {/* NEW HOME BUTTON FOR MOBILE */}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-4xl font-black text-black italic hover:scale-105 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
            HOME
          </Link>

          <hr className="w-20 border-t-4 border-gray-100 rounded-full" />

          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black text-gray-900 italic hover:text-black"
            >
              {link.name}
            </Link>
          ))}
          {user?.isAdmin && (
            <Link 
              href="/admin" 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black text-black italic hover:underline"
            >
              Admin Panel
            </Link>
          )}
          <hr className="w-full border-gray-100" />
          {user ? (
            <button 
              onClick={() => { setIsOpen(false); logout(); }}
              className="w-full py-5 bg-gray-100 text-black font-black rounded-2xl italic uppercase tracking-widest shadow-sm"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => { setIsOpen(false); setIsAuthModalOpen(true); }}
              className="w-full py-5 bg-black text-white font-black rounded-2xl italic uppercase tracking-widest shadow-xl"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* The Auth Modal Component */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}