
import { Instagram, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold text-osc-blue">OSC<span className="text-osc-dark-gray">PETS</span></span>
            </a>
            <p className="text-gray-600 mb-4">
              Your Tech-Driven Pet Marketplace - Bringing technology and heart together for the best pet parent experience!
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/oscpets/?utm_source=qr#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-osc-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/share/1HXDZESENU/?" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-osc-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/oscpets-com-945290358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-osc-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-600 hover:text-osc-blue transition-colors">
                  Why OSCPETS?
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-osc-blue transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-600 hover:text-osc-blue transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-osc-blue transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-osc-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-osc-blue transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-osc-blue transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-osc-blue transition-colors">
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <a href="mailto:info@oscpets.com" className="hover:text-osc-blue transition-colors">
                  info@oscpets.com
                </a>
              </li>
              <li className="mt-6">
                <a 
                  href="https://chat.whatsapp.com/invite-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Join WhatsApp Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {year} OSCPETS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
