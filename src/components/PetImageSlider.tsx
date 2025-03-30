
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PetImageSlider = () => {
  const images = [
    '/lovable-uploads/7bfa2097-5840-4c2d-b09e-12c908c68280.png',
    '/img/cat-image.jpg',
    '/img/puppy-image.jpg'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="w-full h-80 overflow-hidden rounded-2xl shadow-lg">
        <img 
          src={images[currentImageIndex]} 
          alt="Pet" 
          className="w-full h-full object-cover transform transition-all duration-500 scale-105 hover:scale-110"
        />
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} className="text-osc-blue" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition-all"
        aria-label="Next image"
      >
        <ChevronRight size={20} className="text-osc-blue" />
      </button>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PetImageSlider;
