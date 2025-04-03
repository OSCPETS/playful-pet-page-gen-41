
import { Bot, MessageSquare, Apple, Dumbbell } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <Bot size={48} className="mx-auto mb-4 text-osc-blue" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Chat with OSCPETS AI</h1>
        <p className="text-gray-600">Our AI assistant can help with various pet-related topics</p>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600 mb-4 text-center">Choose a topic to get started:</p>
        {assistantTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelectTopic(type.id)}
            className="w-full p-6 bg-white border border-gray-200 rounded-lg hover:bg-osc-pale-blue hover:border-osc-blue transition-all flex items-center gap-4"
          >
            <div className="bg-osc-pale-blue p-3 rounded-full text-osc-blue">
              <type.icon size={24} />
            </div>
            <div className="text-left">
              <p className="font-medium text-lg">{type.label}</p>
              <p className="text-gray-500">{type.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelection;
