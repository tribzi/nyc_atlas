import React from 'react';

export default function AuthModal({ isOpen, onClose, email, setEmail, handleLogin, authLoading, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
        <p className="text-sm text-slate-500 mb-6 font-medium">Create an account to save maps and organize them into custom folders.</p>

        {message ? (
          /* SUCCESS VIEW (Environment Aware) */
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-sm font-medium animate-in fade-in text-center">
            {import.meta.env.DEV
              ? "Local Dev: Check Inbucket (localhost:54324) for your login link!"
              : "Success! Check your email for your magic login link."
            }
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              {authLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
