
import { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            entry.target.classList.add('animate-fade-in');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe section title
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe each testimonial
    testimonialRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: "Aditi",
      title: "Pet Parent",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1000",
      quote: "OSCPETS AI helped me find the perfect food for my dog!",
      stars: 5
    },
    {
      name: "Rohit",
      title: "Dog Lover",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000",
      quote: "Finally! A marketplace that understands pet needs.",
      stars: 5
    },
    {
      name: "Priya",
      title: "Cat Mom",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000",
      quote: "The AI assistant saved me from a late-night vet visit!",
      stars: 5
    }
  ];

  // Generate star rating
  const renderStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={16} className="fill-osc-yellow text-osc-yellow" />
    ));
  };

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={sectionRef} 
          className="text-center mb-16 animated-element"
        >
          <div className="section-label">Testimonials</div>
          <h2 className="heading-lg mb-4">Real Pet Parents Love OSCPETS</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our community of pet parents who have experienced the OSCPETS difference
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el)}
              className="testimonial-card animated-element"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {renderStars(testimonial.stars)}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        {/* Instagram Feed Placeholder */}
        <div className="mt-16 text-center animated-element" ref={(el) => (testimonialRefs.current[3] = el)}>
          <h3 className="heading-md mb-6">Follow Us on Instagram</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="aspect-square bg-osc-gray rounded-lg overflow-hidden relative group"
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
