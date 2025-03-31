
import { useRef, useEffect } from 'react';
import { Bot, ShoppingBag, Truck, Users } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // Observe section title
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe each feature card
    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Features data
  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Pet Assistant",
      description: "Get instant answers to your pet care questions.",
      number: "1️⃣"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Multi-Vendor Marketplace",
      description: "Shop from multiple trusted pet brands all in one place.",
      number: "2️⃣"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Smart Delivery",
      description: "Fast shipping powered by your local pet vendors.",
      number: "3️⃣"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description: "Join our growing pet parent community and be part of something exciting!",
      number: "4️⃣",
      image: "/lovable-uploads/ad043302-1835-42a1-9268-f6ae490297ac.png"
    }
  ];

  return (
    <section id="features" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={sectionRef} 
          className="text-center mb-16 animated-element"
        >
          <div className="section-label">Features</div>
          <h2 className="heading-lg mb-4">Why OSCPETS?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're building the ultimate tech-powered platform for pet parents in India, simplifying pet care 
            by combining innovative technology with trusted products and services.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="feature-card animated-element"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="absolute top-2 right-2 text-sm opacity-60">{feature.number}</div>
              <div className="feature-icon-container">
                {feature.image ? (
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  feature.icon
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
