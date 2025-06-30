import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import TabbedDashboard from './components/TabbedDashboard';
import AuthModule from './components/AuthModule';
import { supabase } from './lib/supabase';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    checkSession();
  }, []);

  const handleAuthStateChange = (user: User | null) => {
    setUser(user);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Guardian Sentinel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {user ? (
        <TabbedDashboard />
      ) : (
        <div className="max-w-md mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Guardian Sentinel</h1>
            <p className="text-gray-600">Advanced AI Security Platform</p>
          </div>
          <AuthModule onAuthStateChange={handleAuthStateChange} />
        </div>
      )}
    </div>
  );
}

export default App;