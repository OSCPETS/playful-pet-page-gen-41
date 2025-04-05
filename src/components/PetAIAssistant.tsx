
import { useState } from 'react';
import { Bot, X, MessageSquare, Apple, Dumbbell, MapPin, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// AI assistant categories
const assistantTypes = [
  { id: 'vet', label: 'Veterinary Questions', icon: MessageSquare, description: 'Get answers about pet health and medical concerns' },
  { id: 'nutrition', label: 'Nutrition Advice', icon: Apple, description: 'Learn about proper diet and feeding for your pets' },
  { id: 'training', label: 'Training Tips', icon: Dumbbell, description: 'Get guidance on pet behavior and training techniques' }
];

// Default model and API key
const DEFAULT_MODEL = "qwen/qwen2.5-vl-32b-instruct:free";
const DEFAULT_API_KEY = "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";

const PetAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([]);
  const [showPuneNotice, setShowPuneNotice] = useState(true);
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [apiKeySubmitted, setApiKeySubmitted] = useState(true); // Set to true by default now
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(DEFAULT_MODEL);
  
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

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setApiKeySubmitted(true);
      toast({
        title: "API Key Saved",
        description: "Your OpenRouter API key has been saved for this session.",
      });
    }
  };
  
  const handleSendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !apiKeySubmitted) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: question }]);
    setIsLoading(true);
    
    try {
      // Create system prompt based on selected type
      const systemPrompts: Record<string, string> = {
        vet: "You are an AI veterinary assistant for OSCPETS, a pet marketplace in India. Provide helpful information about pet health, common medical issues, and when to see a vet. Always clarify you're not a replacement for professional veterinary care. Be concise and friendly.",
        nutrition: "You are an AI pet nutrition advisor for OSCPETS, a pet marketplace in India. Provide helpful information about pet diets, nutrition, and feeding guidelines. Be concise and friendly, focusing on scientifically accurate information.",
        training: "You are an AI pet training assistant for OSCPETS, a pet marketplace in India. Provide helpful advice on pet behavior, training techniques, and common behavioral issues. Be concise and friendly, focusing on positive reinforcement methods."
      };
      
      const systemPrompt = systemPrompts[selectedType || 'vet'];
      
      // Prepare messages for the API request
      const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ];
      
      // Make API request to OpenRouter with the default model
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "OSCPETS AI Assistant"
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          max_tokens: 500,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
      
      // Add AI response to messages
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      
      // Add error message
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: "I'm sorry, I encountered an error processing your request. Please try again later." 
      }]);
      
      toast({
        title: "Error",
        description: "Failed to connect to the AI service. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const closePuneNotice = () => {
    setShowPuneNotice(false);
  };

  return (
    <>
      {/* Pune Coming Soon Notification */}
      {showPuneNotice && (
        <div className="fixed bottom-24 right-6 max-w-xs bg-osc-blue text-white p-4 rounded-lg shadow-lg z-40 animate-fade-in">
          <button 
            onClick={closePuneNotice}
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
      )}

      {/* AI Assistant Button */}
      <button 
        onClick={toggleAssistant}
        className="fixed right-6 bottom-6 bg-osc-blue text-white p-3 rounded-full shadow-lg hover:bg-osc-blue/90 transition-all z-40"
        aria-label="Open Pet AI Assistant"
      >
        <div className="relative">
          <Bot size={24} />
          <Badge className="absolute -top-2 -right-2 bg-orange-500 text-[10px] px-1 py-0 rounded-full">
            BETA
          </Badge>
        </div>
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
            <Badge className="bg-orange-500 text-white text-xs">BETA</Badge>
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
          {!apiKeySubmitted ? (
            // API Key Form
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div className="bg-osc-pale-blue p-4 rounded-lg">
                <h4 className="font-medium text-osc-blue mb-2">Setup Required</h4>
                <p className="text-sm text-gray-600 mb-4">
                  To use the AI assistant, please enter your OpenRouter API key. 
                  You can get one from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-osc-blue hover:underline">openrouter.ai</a>.
                </p>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your OpenRouter API key"
                  className="mb-2"
                />
                <Button type="submit" className="w-full bg-osc-blue hover:bg-osc-blue/90">
                  Save API Key
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Your API key will only be stored in your browser for this session.
                </p>
              </div>
            </form>
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
                  <div className="bg-gray-100 text-gray-800 max-w-[85%] p-3 rounded-lg flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Input area (only shown when a topic is selected and API key submitted) */}
        {selectedType !== null && apiKeySubmitted && (
          <form onSubmit={handleSendQuestion} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!question.trim() || isLoading}
                className="bg-osc-blue text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Send"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default PetAIAssistant;
