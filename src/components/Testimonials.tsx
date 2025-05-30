
import { useRef, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const instagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    // Observe section elements
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    if (instagramRef.current) {
      observer.observe(instagramRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-white py-16">
      <div className="container-custom max-w-5xl">
        {/* Section Header */}
        <div 
          ref={sectionRef} 
          className="text-center mb-16 animated-element"
        >
          <div className="section-label mb-2">Testimonials</div>
          <h2 className="heading-lg mb-4">Real Pet Parents Love OSCPETS (Coming Soon)</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're just getting started! Stay tuned for real reviews and stories from pet parents who'll experience OSCPETS soon.
          </p>
        </div>

        {/* Coming Soon Placeholder */}
        <div 
          ref={contentRef}
          className="flex justify-center items-center mb-16 animated-element"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-100 shadow-sm max-w-2xl">
            <div className="text-6xl mb-6">🐾</div>
            <h3 className="text-xl font-medium mb-4">Be the First to Share Your Experience!</h3>
            <p className="text-gray-600">
              Our community of pet parents is growing. Join our waitlist today and be among the first to experience and review OSCPETS!
            </p>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Instagram Feed */}
        <div className="text-center mb-10 animated-element" ref={instagramRef} style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl font-semibold mb-8">Follow Us on Instagram</h3>
          <p className="text-gray-600 mb-8">Stay up-to-date with our latest pet tips, offers, and adorable content! 🐶🐱</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div 
                key={item} 
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group"
              >
                <img 
                  src={`https://images.unsplash.com/photo-15901520${item}4-bdd8b25e3ccf?q=80&w=300`} 
                  alt={`Instagram post ${item}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-osc-blue/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white font-medium">#OSCPETS</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
