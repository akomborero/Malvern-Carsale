"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-[440px] rounded-[40px] p-10 shadow-2xl border border-gray-100 animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-8 text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">
            Admin Login
          </h2>
          <p className="text-gray-500 font-bold text-sm mt-2">Qaulity import cars Management Portal</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email</label>
            <input 
              type="email" 
              placeholder="Qaulityimportcars@gmail.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-black placeholder:text-gray-400 outline-none focus:border-black focus:bg-white transition-all" 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-black placeholder:text-gray-400 outline-none focus:border-black focus:bg-white transition-all" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-5 mt-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 shadow-lg shadow-black/10 transition-all disabled:bg-gray-400 active:scale-95"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
          Authorized Personnel Only
        </div>
      </div>
    </div>
  );
}