import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';
import useStore from '../store/useStore';

export default function AuthModal() {
  const { loginOpen, closeLogin, setAuth } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('twistwear_users') || '[]');

    if (isLogin) {
      const user = storedUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        setAuth(true);
        closeLogin();
      } else {
        alert('No account found with this email/password! Please create an account first.');
        setIsLogin(false);
      }
    } else {
      // Create Account
      if (!formData.name || !formData.email || !formData.password) return;
      
      const exists = storedUsers.some(u => u.email === formData.email);
      if (exists) {
        alert('This email is already registered! Redirecting to login.');
        setIsLogin(true);
      } else {
        storedUsers.push(formData);
        localStorage.setItem('twistwear_users', JSON.stringify(storedUsers));
        alert('Account created successfully! You can now login.');
        setIsLogin(true);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {loginOpen && (
        <motion.div
          key="auth-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-4 md:px-6 bg-black/95 backdrop-blur-md"
          style={{ zIndex: 99999999 }}
        >
          <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          className="bg-[#0a0a0a] border border-[#c8a45c]/30 p-8 md:p-12 w-full max-w-md relative shadow-[0_0_50px_rgba(200,164,92,0.15)]"
        >
          <button 
            style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px', 
              zIndex: 100,
              color: 'rgba(255,255,255,0.4)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={closeLogin}
          >
            <RiCloseLine size={32} />
          </button>

          <h2 className="font-display text-4xl text-white mb-2 underline decoration-[#c8a45c]/30 underline-offset-8">
            {isLogin ? 'Welcome Back' : 'Join TwistWear'}
          </h2>
          <p className="text-[#c8a45c] uppercase tracking-[0.2em] text-[10px] md:text-xs mb-8 font-black">
            {isLogin ? 'Log in to continue' : 'Create an account'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div>
                <label className="text-white/60 text-xs tracking-wider uppercase mb-2 block">Full Name</label>
                <input 
                  required 
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-[#c8a45c] transition-colors" 
                  placeholder="Jane Doe" 
                />
              </div>
            )}
            <div>
              <label className="text-white/60 text-xs tracking-wider uppercase mb-2 block">Email</label>
              <input 
                required 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-[#c8a45c] transition-colors" 
                placeholder="you@example.com" 
              />
            </div>
            <div>
              <label className="text-white/60 text-xs tracking-wider uppercase mb-2 block">Password</label>
              <input 
                required 
                name="password"
                type="password" 
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-[#c8a45c] transition-colors" 
                placeholder="••••••••" 
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-4 bg-[#c8a45c] text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-[#d4b46c] transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(200,164,92,0.2)]"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-white/50 text-xs">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#c8a45c] uppercase tracking-wider font-bold hover:underline underline-offset-4"
            >
              {isLogin ? 'Create Account' : 'Login'}
            </button>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
