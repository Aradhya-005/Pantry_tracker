"use client";
import React from 'react';
import '../css/Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { signInWithGoogle } from '@/auth/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleGoogleSignIn = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevent the default link behavior
    try {
      await signInWithGoogle();
      router.push('/dashboard'); // Redirect to the dashboard page after successful login
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link href="/">Home</Link></li>
        <li className="navbar-item"><Link href="/features">Features</Link></li>
        <li className="navbar-item"><Link href="/contact">Contact</Link></li>
        <li className="navbar-item"><Link onClick={handleGoogleSignIn} href="#signin">Sign In</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
