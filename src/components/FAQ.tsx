import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const inquiryRef = useRef<HTMLDivElement>(null);

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

    // Observe inquiry button
    if (inquiryRef.current) {
      observer.observe(inquiryRef.current);
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
      answer: "Your One-Stop Tech-Enabled Pet Marketplace in India – Shop, Care & Connect! 🐾 Find the best pet products, get expert pet care advice, and connect with trusted vendors – all in one tech-driven platform!"
    },
    {
      question: "How does the AI assistant work?",
      answer: "Ask the AI any pet-related question, and it will provide instant, expert-backed advice."
    },
    {
      question: "When is the official launch?",
      answer: "We're launching in just 60 days! Join our waitlist to be among the first users."
    },
    {
      question: "How do I get a free audiobook?",
      answer: "Just follow OSCPETS, fill in your details, and receive your audiobook through our official email!"
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
          <Link 
            to="/chat" 
            className="inline-flex items-center justify-center gap-2 bg-osc-blue text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle size={20} />
            <span>Chat with OSCPETS AI Now!</span>
          </Link>
        </div>

        {/* Inquiry Button */}
        <div 
          ref={inquiryRef}
          className="text-center mt-8 animated-element"
          style={{ animationDelay: '0.4s' }}
        >
          <Button 
            className="bg-white text-osc-dark-gray border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
            onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLScij74ZRiEvHev-hKKXZ9pA4fnYoW_-XOFZNQ4TtOAfq109vQ/viewform?usp=dialog", "_blank")}
          >
            <HelpCircle size={20} className="mr-2" />
            <span>I HAVE A QUESTION OR INQUIRY</span>
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            Have more questions? We're here to help!
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
