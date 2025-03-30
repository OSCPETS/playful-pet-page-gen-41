
import { useState, useRef, useEffect } from 'react';
import { Bot, X, MessageSquare, ScrollText, Apple, Dumbbell } from 'lucide-react';
import { cn } from "@/lib/utils";
import { getOpenRouterResponse } from '@/api/openRouter';
import { Input } from '@/components/ui/input';

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
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

  const handleSendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !apiKey) return;
    
    // Check if API key is provided
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: question }]);
    setIsLoading(true);
    
    try {
      // Prepare messages for API
      const messageHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      // Add system message based on selected type
      const systemMessages: Record<string, string> = {
        vet: "You are a helpful veterinary assistant providing information about pet health. Keep responses concise, informative, and pet-friendly. Always clarify that you're not a replacement for professional veterinary care for serious issues.",
        nutrition: "You are a helpful pet nutrition advisor. Provide guidance on pet diet, foods, and nutrition. Keep responses concise and evidence-based. Remind users to consult with a vet for specific dietary needs.",
        training: "You are a helpful pet training assistant. Provide advice on pet behavior and training techniques. Keep responses concise and focus on positive reinforcement methods."
      };
      
      const apiMessages = [
        { role: "system", content: systemMessages[selectedType || 'vet'] },
        ...messageHistory,
        { role: "user", content: question }
      ];
      
      // Call OpenRouter API
      const response = await getOpenRouterResponse(apiMessages, apiKey);
      
      if (response && response.choices && response.choices.length > 0) {
        const aiResponse = response.choices[0].message.content;
        setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages(prev => [...prev, { type: 'ai', content: "Sorry, I encountered an error processing your question. Please try again later." }]);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      setShowApiKeyInput(false);
    }
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
          {showApiKeyInput ? (
            // API Key Input Form
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Please enter your OpenRouter API key to use the AI assistant.
                You can get one by signing up at <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-osc-blue underline">OpenRouter.ai</a>
              </p>
              <form onSubmit={handleApiKeySubmit} className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenRouter API key"
                    className="w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-osc-blue text-white px-4 py-2 rounded-lg"
                >
                  Save API Key
                </button>
              </form>
            </div>
          ) : selectedType === null ? (
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
                {isLoading && (
                  <div className="bg-gray-100 text-gray-800 max-w-[85%] p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
                <div ref={messageEndRef} />
              </div>
            </div>
          )}
        </div>
        
        {/* Input area (only shown when a topic is selected) */}
        {selectedType !== null && !showApiKeyInput && (
          <form onSubmit={handleSendQuestion} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-osc-blue"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
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
