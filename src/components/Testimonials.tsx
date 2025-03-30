
import { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
      <Star key={i} size={16} fill="#FFD700" className="text-yellow-400" />
    ));
  };

  return (
    <section id="testimonials" className="section-padding bg-white py-16">
      <div className="container-custom max-w-5xl">
        {/* Section Header */}
        <div 
          ref={sectionRef} 
          className="text-center mb-16 animated-element"
        >
          <div className="section-label mb-2">Testimonials</div>
          <h2 className="heading-lg mb-4">Real Pet Parents Love OSCPETS</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our pet-loving community who have experienced the OSCPETS difference!
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el)}
              className="animated-element flex flex-col items-center text-center"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <Avatar className="w-16 h-16 mb-4 border-2 border-gray-100 shadow-sm">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <h3 className="font-semibold text-lg">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{testimonial.title}</p>
              
              <div className="flex mb-3">
                {renderStars(testimonial.stars)}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        <Separator className="mb-12" />

        {/* Instagram Feed */}
        <div className="text-center mb-10 animated-element" ref={(el) => (testimonialRefs.current[3] = el)}>
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
