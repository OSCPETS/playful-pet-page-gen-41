
import { useRef, useEffect } from 'react';
import { Bot, ShoppingCart, Truck, Users } from 'lucide-react';

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) {
            entry.target.classList.add('animate-fade-in');
          } else {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.add('opacity-100'); // Ensure visibility
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe section title
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe each step
    stepsRef.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Steps data
  const steps = [
    {
      icon: <Bot size={24} />,
      title: "Chat with OSCPETS AI",
      description: "Ask pet care questions and get expert tips instantly.",
      number: "1️⃣"
    },
    {
      icon: <ShoppingCart size={24} />,
      title: "Explore & Shop Pet Products",
      description: "Find everything from pet food to grooming essentials.",
      number: "2️⃣"
    },
    {
      icon: <Truck size={24} />,
      title: "Get Fast & Safe Delivery",
      description: "Doorstep delivery for all your pet's needs.",
      number: "3️⃣"
    },
    {
      icon: <Users size={24} />,
      title: "Join the Community",
      description: "Join our exclusive WhatsApp group for pet parents!",
      number: "4️⃣"
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-osc-gray py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={sectionRef} 
          className="text-center mb-16 animated-element opacity-100"
        >
          <div className="section-label">Process</div>
          <h2 className="heading-lg mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how OSCPETS simplifies pet care and shopping – right at your fingertips!
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              className="timeline-step flex items-start gap-6 animated-element mb-12 opacity-0"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-osc-blue text-white flex items-center justify-center relative">
                  <span className="absolute -top-2 -right-2 text-xs">{step.number}</span>
                  {step.icon}
                </div>
              </div>
              <div className="glass-card p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
