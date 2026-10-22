import React, { useState } from 'react';
import { X, LogIn, UserPlus, LogOut, Mail, Lock, User as UserIcon } from 'lucide-react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function AuthModal({ isOpen, onClose, user, onShowToast, authPrompt = null }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      await signInWithPopup(auth, googleProvider);
      onShowToast('Signed in with Google successfully!');
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
          await updateProfile(userCred.user, { displayName });
        }
        onShowToast('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onShowToast('Signed in successfully!');
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onShowToast('Signed out of Saradhya account.');
      onClose();
    } catch (err) {
      setErrorMsg('Error signing out');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: 440, padding: '2.25rem 2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {user ? (
          /* User Profile View */
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'var(--maroon-800)',
                color: '#ffffff',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontFamily: 'var(--font-serif)',
                boxShadow: '0 4px 15px rgba(88, 17, 26, 0.25)',
                overflow: 'hidden'
              }}
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                (user.displayName || user.email || 'S').charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--charcoal-900)' }}>
                {user.displayName || 'Royal Patron'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-500)' }}>{user.email}</p>
            </div>

            <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ede7dc', borderRadius: 8, padding: '1rem', textAlign: 'left', fontSize: '0.82rem', color: 'var(--charcoal-600)' }}>
              <div><strong>Membership Status:</strong> Saradhya Royal Bridal Club</div>
              <div style={{ marginTop: 4 }}><strong>Exclusive Rental Benefit:</strong> 10% off with code <code>SARADHYA10</code></div>
            </div>

            <button
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleSignOut}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div className="logo-symbol" style={{ margin: '0 auto 0.75rem auto' }}>S</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--charcoal-900)' }}>
                {isSignUp ? 'Create Saradhya Account' : 'Sign In to Your Account'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-500)', marginTop: 4 }}>
                {authPrompt || (isSignUp ? 'Join our luxury bridal circle' : 'Sign in to reserve rentals & manage orders')}
              </p>
            </div>

            {authPrompt && (
              <div style={{
                backgroundColor: '#fbf5ea',
                border: '1px solid #ecd8b3',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                fontSize: '0.82rem',
                color: 'var(--maroon-900)',
                lineHeight: 1.5,
                textAlign: 'center'
              }}>
                ✨ <strong>Almost there!</strong> Sign in or sign up below to add this piece to your bag.
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 8,
                border: '1px solid #dfd7c7',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--charcoal-800)',
                cursor: 'pointer',
                marginBottom: '1.25rem',
                transition: 'background-color 0.2s'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: 'var(--charcoal-400)', fontSize: '0.75rem' }}>
              <div style={{ flex: 1, height: 1, backgroundColor: '#ede7dc' }} />
              <span>OR EMAIL</span>
              <div style={{ flex: 1, height: 1, backgroundColor: '#ede7dc' }} />
            </div>

            {errorMsg && (
              <div style={{ backgroundColor: '#fdf3f4', color: '#c62828', padding: '0.65rem', borderRadius: 6, fontSize: '0.8rem', marginBottom: '1rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {isSignUp && (
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--charcoal-700)', display: 'block', marginBottom: 4 }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <UserIcon size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--charcoal-400)' }} />
                    <input
                      type="text"
                      placeholder="Ananya Sharma"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.65rem 0.75rem 0.65rem 2.4rem', borderRadius: 6, border: '1px solid #dfd7c7', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--charcoal-700)', display: 'block', marginBottom: 4 }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--charcoal-400)' }} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem 0.75rem 0.65rem 2.4rem', borderRadius: 6, border: '1px solid #dfd7c7', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--charcoal-700)', display: 'block', marginBottom: 4 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--charcoal-400)' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem 0.75rem 0.65rem 2.4rem', borderRadius: 6, border: '1px solid #dfd7c7', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                {isSignUp ? <UserPlus size={16} /> : <LogIn size={16} />}
                <span>{loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}</span>
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.82rem', color: 'var(--charcoal-500)' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
                style={{ color: 'var(--maroon-800)', fontWeight: 600, textDecoration: 'underline' }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
