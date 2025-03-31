
import { useRef, useEffect, useState } from 'react';
import { Bot, ShoppingBag, Truck, Users, BookAudio } from 'lucide-react';
import { Button } from './ui/button';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [formOpen, setFormOpen] = useState(false);

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

  const openForm = () => {
    window.open('https://forms.gle/YourGoogleFormURL', '_blank');
  };

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
      image: "/lovable-uploads/7be744b1-a3ca-41bb-b368-25fcfbddc02d.png"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

        {/* Call to Action */}
        <div className="text-center mt-8 animated-element" ref={(el) => (featureRefs.current[4] = el)}>
          <Button 
            onClick={openForm}
            className="bg-osc-blue hover:bg-osc-blue/90 text-white px-8 py-3 rounded-full font-medium 
                    shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <BookAudio className="w-5 h-5 mr-2" />
            Follow OSCPETS Now - Get Free Pet Care Ebooks
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            Fill the form to receive updates when we launch and get free pet care ebooks!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
