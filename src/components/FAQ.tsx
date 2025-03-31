
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
      answer: "We're India's first tech-powered pet marketplace, combining AI technology with trusted pet products and services to simplify pet parenting!"
    },
    {
      question: "How does the AI assistant work?",
      answer: "Ask the AI any pet-related question, and it will provide instant, expert-backed advice."
    },
    {
      question: "When is the official launch?",
      answer: "We're launching in just 30 days! Join our waitlist to be among the first users."
    },
    {
      question: "How do I get free ebooks?",
      answer: "Follow OSCPETS button go there fill the form our team can mail you the free audio books and update an notify through mail when launching"
    },
    {
      question: "What types of products will be available?",
      answer: "Our marketplace will feature pet food, grooming supplies, accessories, and much more – all from trusted local vendors."
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
            <span>Chat with OSCPETS AI Now!</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
