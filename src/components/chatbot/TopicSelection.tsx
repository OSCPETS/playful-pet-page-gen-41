
import { Bot, MessageSquare, Apple, Dumbbell, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// AI assistant categories
const assistantTypes = [
  { id: 'vet', label: 'Veterinary Questions', icon: MessageSquare, description: 'Get answers about pet health and medical concerns' },
  { id: 'nutrition', label: 'Nutrition Advice', icon: Apple, description: 'Learn about proper diet and feeding for your pets' },
  { id: 'training', label: 'Training Tips', icon: Dumbbell, description: 'Get guidance on pet behavior and training techniques' }
];

interface TopicSelectionProps {
  onSelectTopic: (topicId: string) => void;
}

const TopicSelection = ({ onSelectTopic }: TopicSelectionProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex flex-col items-center md:items-start">
          <Bot size={36} className="mb-2 text-osc-blue" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Chat with OSCPETS AI</h1>
          <p className="text-sm md:text-base text-gray-600">Our AI assistant can help with various pet-related topics</p>
        </div>
        <Link 
          to="/" 
          className="text-osc-blue hover:text-osc-blue/80 text-sm font-medium flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Back to Website
        </Link>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        <p className="text-gray-600 mb-2 md:mb-4 text-center md:text-left">Choose a topic to get started:</p>
        {assistantTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelectTopic(type.id)}
            className="w-full p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:bg-osc-pale-blue hover:border-osc-blue transition-all flex items-center gap-3"
          >
            <div className="bg-osc-pale-blue p-2 md:p-3 rounded-full text-osc-blue">
              <type.icon size={20} />
            </div>
            <div className="text-left">
              <p className="font-medium text-base md:text-lg">{type.label}</p>
              <p className="text-xs md:text-sm text-gray-500">{type.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelection;
