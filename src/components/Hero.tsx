
import { useEffect, useRef } from 'react';
import { Smartphone, Instagram } from 'lucide-react';
import PetImageSlider from './PetImageSlider';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero elements on page load
    const animateHero = () => {
      if (textRef.current) {
        textRef.current.classList.add('animate-fade-in');
        textRef.current.style.animationDelay = '0.2s';
      }
      
      if (imageRef.current) {
        imageRef.current.classList.add('animate-fade-in-right');
        imageRef.current.style.animationDelay = '0.4s';
      }
      
      if (ctaRef.current) {
        ctaRef.current.classList.add('animate-fade-in');
        ctaRef.current.style.animationDelay = '0.6s';
      }
    };

    // Add parallax effect on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        if (textRef.current) {
          textRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
      }
    };

    animateHero();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center pt-20" ref={heroRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-40 right-20 w-72 h-72 bg-osc-pale-blue rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-osc-light-pink rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Hero Text Content */}
        <div ref={textRef} className="animated-element order-2 md:order-1">
          <div className="section-label">Pet Care Simplified</div>
          <h1 className="heading-xl mb-6">
            Your One-Stop Tech-Enabled Pet Marketplace in India – Shop, Care & Connect! 🐾
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Find trusted pet products, get expert pet care advice, and explore exciting features – all in one tech-driven platform!
          </p>
          
          {/* CTA Buttons */}
          <div ref={ctaRef} className="animated-element flex flex-col sm:flex-row gap-4">
            <a 
              href="https://chat.whatsapp.com/invite-link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Smartphone size={18} />
              <span>Join Our Pet Parent Community</span>
            </a>
            <a 
              href="https://instagram.com/oscpets" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Instagram size={18} />
              <span>Follow Us on Instagram</span>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div ref={imageRef} className="animated-element order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-osc-pale-blue rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>
            
            {/* Replace static image with our new slider component */}
            <PetImageSlider />
            
            <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-osc-blue rounded-full flex items-center justify-center text-white">
                  AI
                </div>
                <div>
                  <p className="text-xs font-medium">OSCPETS AI</p>
                  <p className="text-xs text-gray-500">Your pet assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
