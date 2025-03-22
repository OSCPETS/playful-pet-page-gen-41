
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="relative z-10">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-bold text-osc-blue">OSC<span className="text-osc-dark-gray">PETS</span></span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-gray-700 hover:text-osc-blue transition-colors">
            Why OSCPETS?
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-osc-blue transition-colors">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-osc-blue transition-colors">
            Testimonials
          </a>
          <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-osc-blue transition-colors">
            FAQ
          </a>
          <a 
            href="https://chat.whatsapp.com/invite-link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Join Community
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-10 p-2" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <a 
            href="#features" 
            className="text-xl font-medium" 
            onClick={toggleMobileMenu}
          >
            Why OSCPETS?
          </a>
          <a 
            href="#how-it-works" 
            className="text-xl font-medium" 
            onClick={toggleMobileMenu}
          >
            How It Works
          </a>
          <a 
            href="#testimonials" 
            className="text-xl font-medium" 
            onClick={toggleMobileMenu}
          >
            Testimonials
          </a>
          <a 
            href="#faq" 
            className="text-xl font-medium" 
            onClick={toggleMobileMenu}
          >
            FAQ
          </a>
          <a 
            href="https://chat.whatsapp.com/invite-link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary mt-6"
            onClick={toggleMobileMenu}
          >
            Join Community
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
