
import { useState } from 'react';
import { MapPin, X } from 'lucide-react';

const PuneNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 md:right-8 max-w-xs bg-osc-blue text-white p-4 rounded-lg shadow-lg z-40 animate-fade-in">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={18} />
        <p className="font-semibold">Coming Soon in Pune!</p>
      </div>
      <p className="text-sm">OSCPETS services will be launching in Pune soon. Stay tuned for updates!</p>
    </div>
  );
};

export default PuneNotification;
