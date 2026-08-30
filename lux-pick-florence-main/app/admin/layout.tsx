'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '🏠' },
  { href: '/admin/products', label: 'Products', icon: '🛍️' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/team', label: 'Team Members', icon: '👥' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_authed');
    if (saved === 'true') setAuthed(true);
    setChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem('admin_authed', 'true');
      setAuthed(true);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed');
    setAuthed(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF66C4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF66C4] to-[#ff3fa0] mb-4 shadow-lg shadow-pink-500/30">
              <span className="text-2xl">✦</span>
            </div>
            <h1 className="text-2xl font-bold text-white font-serif">Lux Pick Florence</h1>
            <p className="text-gray-400 mt-1 text-sm">Admin Dashboard</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#1a1a22] border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-white font-semibold text-lg mb-6">Sign In</h2>

            <label className="block text-gray-400 text-sm mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              className="w-full bg-[#0f0f13] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF66C4] transition-colors"
              required
            />

            {error && (
              <p className="mt-3 text-red-400 text-sm flex items-center gap-1">
                <span>⚠️</span> {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-[#FF66C4] to-[#ff3fa0] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Access Dashboard
            </button>

            <p className="mt-4 text-center text-gray-600 text-xs">
              Default: <code className="text-gray-500">admin123</code> (set in .env.local)
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f13] flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#1a1a22] border-r border-white/10 flex flex-col transition-all duration-300 fixed h-full z-30`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF66C4] to-[#ff3fa0] flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/20">
            <span className="text-sm">✦</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-bold text-sm leading-none">Lux Pick</p>
              <p className="text-[#FF66C4] text-xs mt-0.5">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-[#FF66C4]/15 text-[#FF66C4] border border-[#FF66C4]/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <span className="flex-shrink-0">🌐</span>
            {sidebarOpen && <span className="text-sm">View Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <span className="flex-shrink-0">🚪</span>
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top bar */}
        <header className="h-16 bg-[#1a1a22] border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <span className="text-xl">{sidebarOpen ? '◀' : '▶'}</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF66C4] to-[#ff3fa0] flex items-center justify-center">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <span className="text-gray-400 text-sm">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
