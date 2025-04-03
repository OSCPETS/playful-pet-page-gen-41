
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    // Observe each FAQ item
    faqRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Observe CTA button
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data
  const faqs: FAQItem[] = [
    {
      question: "What makes OSCPETS different?",
      answer: "OSCPETS is India's first AI-powered pet marketplace, combining artificial intelligence with a curated selection of quality pet products. Our AI assistant helps answer pet care questions, recommends products based on your pet's needs, and connects you with a community of pet parents."
    },
    {
      question: "How does the AI assistant work?",
      answer: "Our AI assistant uses advanced machine learning to provide accurate and helpful information about pet care. It can answer questions about nutrition, behavior, health concerns, and even recommend products based on your pet's specific needs. The more you use it, the better it understands your pet's requirements."
    },
    {
      question: "When is the official launch?",
      answer: "We're launching the full OSCPETS marketplace in 30 days. In the meantime, you can join our WhatsApp community to get early access to our AI assistant and exclusive pre-launch offers."
    },
    {
      question: "How do I get early access?",
      answer: "Join our WhatsApp community by clicking the 'Join Our Pet Parent Community' button. The first 500 members will receive a free pet care eBook and early access to our AI assistant before the public launch."
    },
    {
      question: "What types of products will be available?",
      answer: "OSCPETS will offer a wide range of pet products from trusted brands, including food, treats, toys, grooming supplies, health supplements, accessories, and more. All products are vetted for quality to ensure the best for your pets."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-osc-gray">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={sectionRef} 
          className="text-center mb-16 animated-element"
        >
          <div className="section-label">FAQ</div>
          <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about OSCPETS
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (faqRefs.current[index] = el)}
              className="faq-item animated-element"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <button
                className="w-full flex justify-between items-center focus:outline-none text-left py-4"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Chat Button */}
        <div 
          ref={ctaRef}
          className="text-center mt-12 animated-element"
        >
          <a 
            href="https://chat.whatsapp.com/invite-link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-osc-blue text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle size={20} />
            <span>Chat with OSCPETS AI now!</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
