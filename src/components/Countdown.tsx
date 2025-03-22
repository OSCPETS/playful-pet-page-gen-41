
import { useState, useEffect, useRef } from 'react';
import { Smartphone, Instagram, Gift, Rocket } from 'lucide-react';

const Countdown = () => {
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Countdown timer
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            if (days > 0) {
              setDays(days - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            } else {
              clearInterval(countdown);
            }
          }
        }
      }
    }, 1000);

    // Animation observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (countersRef.current) {
      observer.observe(countersRef.current);
    }
    
    if (offersRef.current) {
      observer.observe(offersRef.current);
    }

    return () => {
      clearInterval(countdown);
      observer.disconnect();
    };
  }, [days, hours, minutes, seconds]);

  // Format time units to always have two digits
  const formatTimeUnit = (unit: number) => {
    return unit.toString().padStart(2, '0');
  };

  return (
    <section className="section-padding bg-osc-blue text-white parallax-container">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-5"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          ref={sectionRef} 
          className="text-center mb-16 animated-element"
        >
          <div className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full mb-4">
            Coming Soon
          </div>
          <h2 className="heading-lg mb-4">OSCPETS Marketplace Launching Soon!</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Be among the first to experience India's most innovative pet marketplace
          </p>
        </div>

        {/* Countdown Timer */}
        <div 
          ref={countersRef}
          className="flex justify-center items-center space-x-6 mb-16 animated-element"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="text-center">
            <div className="glass-card bg-white/10 border-white/20 w-20 h-20 flex items-center justify-center rounded-xl mb-2">
              <span className="text-3xl font-bold">{formatTimeUnit(days)}</span>
            </div>
            <span className="text-sm font-medium text-white/80">Days</span>
          </div>
          <div className="text-center">
            <div className="glass-card bg-white/10 border-white/20 w-20 h-20 flex items-center justify-center rounded-xl mb-2">
              <span className="text-3xl font-bold">{formatTimeUnit(hours)}</span>
            </div>
            <span className="text-sm font-medium text-white/80">Hours</span>
          </div>
          <div className="text-center">
            <div className="glass-card bg-white/10 border-white/20 w-20 h-20 flex items-center justify-center rounded-xl mb-2">
              <span className="text-3xl font-bold">{formatTimeUnit(minutes)}</span>
            </div>
            <span className="text-sm font-medium text-white/80">Minutes</span>
          </div>
          <div className="text-center">
            <div className="glass-card bg-white/10 border-white/20 w-20 h-20 flex items-center justify-center rounded-xl mb-2">
              <span className="text-3xl font-bold">{formatTimeUnit(seconds)}</span>
            </div>
            <span className="text-sm font-medium text-white/80">Seconds</span>
          </div>
        </div>

        {/* Exclusive Offers */}
        <div 
          ref={offersRef}
          className="grid md:grid-cols-2 gap-8 mb-16 animated-element"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="glass-card bg-white/10 border-white/20 p-6 rounded-xl flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Gift size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Free Pet Care eBook</h3>
              <p className="text-white/80">
                First 500 members get an exclusive pet care eBook completely FREE!
              </p>
            </div>
          </div>
          <div className="glass-card bg-white/10 border-white/20 p-6 rounded-xl flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Rocket size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Early Access</h3>
              <p className="text-white/80">
                Get early access to AI Pet Assistant before public launch!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animated-element" style={{ animationDelay: '0.6s' }}>
          <a 
            href="https://chat.whatsapp.com/invite-link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-osc-blue px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Smartphone size={18} />
            <span>Join WhatsApp Group for Early Access</span>
          </a>
          <a 
            href="https://instagram.com/oscpets" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Instagram size={18} />
            <span>Follow Us for Updates</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
