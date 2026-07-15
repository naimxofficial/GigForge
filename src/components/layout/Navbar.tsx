'use client';

import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-rose-600">
            GigForge
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href="/gigs/manage">
                  <Button variant="ghost">{user?.name || 'Dashboard'}</Button>
                </Link>
                <Link href="/gigs/add">
                  <Button className="bg-rose-600 hover:bg-rose-700">Add Gig</Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-rose-600 hover:bg-rose-700">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border pt-4">
            <Link href="/explore" className="block text-muted-foreground hover:text-foreground">
              Explore
            </Link>
            <Link href="/about" className="block text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/gigs/manage" className="block">
                  <Button variant="outline" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/gigs/add" className="block">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
                    Add Gig
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
