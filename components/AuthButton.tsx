'use client';

import { useState, useEffect } from 'react';
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, User, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { LogIn, LogOut, User as UserIcon, Loader2 } from 'lucide-react';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    // Check for redirect result first
    getRedirectResult(auth).catch((error) => {
      console.error('Redirect result error:', error);
    });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setSigningIn(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      // Try popup first (works on desktop)
      await signInWithPopup(auth, googleProvider);
    } catch (error: unknown) {
      const firebaseError = error as { code?: string };
      console.error('Popup sign in failed, trying redirect:', error);
      // If popup fails (blocked, mobile, etc.), use redirect
      if (firebaseError.code === 'auth/popup-blocked' || 
          firebaseError.code === 'auth/popup-closed-by-user' ||
          firebaseError.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          console.error('Redirect sign in error:', redirectError);
          setSigningIn(false);
        }
      } else {
        setSigningIn(false);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-surface animate-pulse" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface">
          <UserIcon className="w-4 h-4 text-accent" />
          <span className="text-sm text-secondary hidden sm:inline">Logged in privately</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-hover hover:bg-surface text-secondary hover:text-primary transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={signingIn}
      className="btn-secondary flex items-center gap-2 disabled:opacity-50"
    >
      {signingIn ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4" />
          <span>Login (Optional)</span>
        </>
      )}
    </button>
  );
}

