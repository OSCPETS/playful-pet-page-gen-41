
import { useState } from 'react';
import { Bot, X, MessageSquare, ScrollText, Apple, Dumbbell } from 'lucide-react';
import { cn } from "@/lib/utils";

// AI assistant categories
const assistantTypes = [
  { id: 'vet', label: 'Veterinary Questions', icon: MessageSquare, description: 'Get answers about pet health and medical concerns' },
  { id: 'nutrition', label: 'Nutrition Advice', icon: Apple, description: 'Learn about proper diet and feeding for your pets' },
  { id: 'training', label: 'Training Tips', icon: Dumbbell, description: 'Get guidance on pet behavior and training techniques' }
];

const PetAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);
    
    // Welcome message based on selected type
    const welcomeMessages: Record<string, string> = {
      vet: "Hello! I'm your veterinary assistant. How can I help with your pet's health today?",
      nutrition: "Hi there! I'm your pet nutrition advisor. What would you like to know about pet diet and food?",
      training: "Welcome! I'm your pet training assistant. How can I help with your pet's behavior and training?"
    };
    
    setMessages([{ type: 'ai', content: welcomeMessages[typeId] }]);
  };

  const handleBackToTopics = () => {
    setSelectedType(null);
    setMessages([]);
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: question }]);
    
    // Simulated AI response for demo purposes
    setTimeout(() => {
      const demoResponses: Record<string, string[]> = {
        vet: [
          "It's recommended to consult your vet for specific medical advice, but this could be related to...",
          "Annual check-ups are important for monitoring your pet's health. Based on your question...",
          "Many pets experience this issue. Some common causes include..."
        ],
        nutrition: [
          "A balanced diet for your pet should include proteins, vitamins and minerals. For your specific question...",
          "Feeding schedules depend on your pet's age, size, and activity level. In your case...",
          "This food ingredient is generally considered safe for most pets, but..."
        ],
        training: [
          "This behavior can be addressed with consistent positive reinforcement techniques...",
          "Puppies and kittens learn best through short, frequent training sessions...",
          "This common behavior issue can be managed by establishing clear boundaries and..."
        ]
      };
      
      // Get a random response from the selected category
      const typeResponses = demoResponses[selectedType || 'vet'];
      const randomResponse = typeResponses[Math.floor(Math.random() * typeResponses.length)];
      
      setMessages(prev => [...prev, { type: 'ai', content: randomResponse }]);
    }, 1000);
    
    setQuestion('');
  };

  return (
    <>
      {/* AI Assistant Button */}
      <button 
        onClick={toggleAssistant}
        className="fixed right-6 bottom-6 bg-osc-blue text-white p-3 rounded-full shadow-lg hover:bg-osc-blue/90 transition-all z-40"
        aria-label="Open Pet AI Assistant"
      >
        <Bot size={24} />
      </button>
      
      {/* AI Assistant Panel */}
      <div 
        className={cn(
          "fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 bg-osc-blue text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-semibold">OSCPETS AI Assistant</h3>
          </div>
          <button 
            onClick={toggleAssistant} 
            className="hover:bg-white/10 p-1 rounded-full"
            aria-label="Close Assistant"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4">
          {selectedType === null ? (
            // Topic Selection
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Choose a topic to get started:</p>
              {assistantTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelection(type.id)}
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-osc-pale-blue hover:border-osc-blue transition-all flex items-center gap-3"
                >
                  <div className="bg-osc-pale-blue p-2 rounded-full text-osc-blue">
                    <type.icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{type.label}</p>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Chat Interface
            <div className="flex flex-col h-full">
              <button
                onClick={handleBackToTopics}
                className="mb-4 text-sm text-osc-blue flex items-center gap-1 hover:underline"
              >
                ← Back to topics
              </button>
              
              <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "max-w-[85%] p-3 rounded-lg",
                      msg.type === 'user' 
                        ? "bg-osc-blue text-white ml-auto" 
                        : "bg-gray-100 text-gray-800"
                    )}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Input area (only shown when a topic is selected) */}
        {selectedType !== null && (
          <form onSubmit={handleSendQuestion} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-osc-blue"
              />
              <button
                type="submit"
                disabled={!question.trim()}
                className="bg-osc-blue text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default PetAIAssistant;
