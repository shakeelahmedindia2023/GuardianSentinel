import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { Shield, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, CheckCircle, AlertCircle, AlertTriangle, Info, Settings } from 'lucide-react';

interface AuthModuleProps {
  onAuthStateChange: (user: User | null) => void;
}

const AuthModule: React.FC<AuthModuleProps> = ({ onAuthStateChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState('child');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setUser(data.session.user);
          onAuthStateChange(data.session.user);
          setConnectionError(false);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setConnectionError(true);
        setMessage({
          text: 'Unable to connect to authentication service. Please check your internet connection and Supabase configuration.',
          type: 'error'
        });
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
          onAuthStateChange(session.user);
          setConnectionError(false);
        } else {
          setUser(null);
          onAuthStateChange(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [onAuthStateChange]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setConnectionError(false);

    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Insert user profile data
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email,
              full_name: fullName,
              user_type: userType,
              created_at: new Date(),
              updated_at: new Date()
            }
          ]);

        if (profileError) throw profileError;

        if (data.user.email_confirmed_at) {
          setMessage({
            text: 'Account created and signed in successfully!',
            type: 'success'
          });
        } else {
          setMessage({
            text: 'Account created successfully! Please check your email to confirm your account, or contact your administrator to disable email confirmation.',
            type: 'warning'
          });
          // Reset form and switch to sign in
          setEmail('');
          setPassword('');
          setFullName('');
          setIsSignUp(false);
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      if (error instanceof Error && error.message.includes('fetch')) {
        setConnectionError(true);
        setMessage({
          text: 'Connection failed. Please check your internet connection and Supabase configuration.',
          type: 'error'
        });
      } else {
        setMessage({
          text: error instanceof Error ? error.message : 'An error occurred during sign up',
          type: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setConnectionError(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Email not confirmed. Please check your email for a confirmation link, or contact your administrator to disable email confirmation in Supabase settings.');
        }
        throw error;
      }

      if (data.user) {
        setMessage({
          text: 'Signed in successfully!',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      if (error instanceof Error && error.message.includes('fetch')) {
        setConnectionError(true);
        setMessage({
          text: 'Connection failed. Please check your internet connection and Supabase configuration.',
          type: 'error'
        });
      } else {
        setMessage({
          text: error instanceof Error ? error.message : 'Invalid email or password',
          type: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setMessage(null);
    setConnectionError(false);

    try {
      const demoEmail = 'demo@guardiansentinel.com';
      const demoPassword = 'demo12345';

      setMessage({
        text: 'Attempting demo login...',
        type: 'info'
      });

      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });

      if (signInError) {
        if (signInError.message.includes('Email not confirmed')) {
          setMessage({
            text: 'Demo account exists but email confirmation is required. Please disable email confirmation in your Supabase project settings (Authentication → Settings → Enable Email Confirmations = OFF) to use the demo feature.',
            type: 'warning'
          });
          return;
        } else if (signInError.message.includes('Invalid login credentials')) {
          // Demo user doesn't exist, try to create it
          setMessage({
            text: 'Creating demo account...',
            type: 'info'
          });

          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: demoEmail,
            password: demoPassword,
          });

          if (signUpError) {
            throw new Error(`Failed to create demo account: ${signUpError.message}`);
          }

          if (signUpData.user) {
            // Check if the user was created but needs email confirmation
            if (!signUpData.user.email_confirmed_at) {
              setMessage({
                text: 'Demo account created but requires email confirmation. Please disable email confirmation in your Supabase project settings (Authentication → Settings → Enable Email Confirmations = OFF) to use the demo feature without email verification.',
                type: 'warning'
              });
              return;
            }

            // Insert demo user profile data
            const { error: profileError } = await supabase
              .from('users')
              .insert([
                {
                  id: signUpData.user.id,
                  email: demoEmail,
                  full_name: 'Demo User',
                  user_type: 'guardian',
                  created_at: new Date(),
                  updated_at: new Date()
                }
              ]);

            if (profileError) {
              console.warn('Profile creation failed:', profileError);
            }

            setMessage({
              text: 'Demo account created and signed in successfully!',
              type: 'success'
            });
          }
        } else {
          throw signInError;
        }
      } else if (signInData.user) {
        setMessage({
          text: 'Signed in with demo account successfully!',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error with demo login:', error);
      if (error instanceof Error && error.message.includes('fetch')) {
        setConnectionError(true);
        setMessage({
          text: 'Connection failed. Please check your Supabase configuration in the .env file.',
          type: 'error'
        });
      } else {
        setMessage({
          text: `Demo login failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try creating a regular account or check your Supabase configuration.`,
          type: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    
    try {
      await supabase.auth.signOut();
      setMessage({
        text: 'Signed out successfully',
        type: 'success'
      });
      setConnectionError(false);
    } catch (error) {
      console.error('Error signing out:', error);
      if (error instanceof Error && error.message.includes('fetch')) {
        setConnectionError(true);
        setMessage({
          text: 'Connection failed during sign out. Please check your internet connection.',
          type: 'error'
        });
      } else {
        setMessage({
          text: error instanceof Error ? error.message : 'An error occurred during sign out',
          type: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if using placeholder credentials
  const isUsingPlaceholders = import.meta.env.VITE_SUPABASE_URL?.includes('your-project-ref') || 
                              import.meta.env.VITE_SUPABASE_ANON_KEY?.includes('your-anon-key');

  if (user) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Account</h2>
          </div>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Signed in as</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-md mb-4 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 
            message.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
            message.type === 'info' ? 'bg-blue-50 text-blue-800' :
            'bg-red-50 text-red-800'
          }`}>
            <p className="text-sm">{message.text}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>
        </div>
      </div>

      <div className="p-6">
        {/* Configuration Warning */}
        {isUsingPlaceholders && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Configuration Required</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Please update your .env file with actual Supabase credentials. The current values are placeholders.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Connection Error Warning */}
        {connectionError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                <p className="text-sm text-red-700 mt-1">
                  Unable to connect to Supabase. Please check your .env configuration and internet connection.
                </p>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className={`p-3 rounded-md mb-4 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 
            message.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
            message.type === 'info' ? 'bg-blue-50 text-blue-800' :
            'bg-red-50 text-red-800'
          }`}>
            <div className="flex items-start space-x-2">
              {message.type === 'info' && <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />}
              {message.type === 'warning' && <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
              {message.type === 'error' && <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
              {message.type === 'success' && <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        )}

        {/* Email Confirmation Help */}
        {!isUsingPlaceholders && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start space-x-3">
              <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Demo Setup Tip</h3>
                <p className="text-sm text-blue-700 mt-1">
                  For seamless demo experience, disable email confirmation in your Supabase project: 
                  <br />
                  <strong>Authentication → Settings → Enable Email Confirmations = OFF</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Demo Login Button - Placed at the top for direct access */}
        <div className="mb-6">
          <button
            onClick={handleDemoLogin}
            disabled={loading || connectionError}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Quick Demo Login</span>
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Creates demo account automatically (requires email confirmation to be disabled)
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or use email and password</span>
          </div>
        </div>

        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                User Type
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="child">Child</option>
                <option value="woman">Woman</option>
                <option value="elderly">Elderly</option>
                <option value="disabled">Person with Disability</option>
                <option value="guardian">Guardian</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || connectionError}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </>
            ) : (
              <>
                {isSignUp ? (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage(null);
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModule;