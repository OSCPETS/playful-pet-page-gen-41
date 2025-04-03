
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Create system prompt based on selected type
const getSystemPrompt = (type: string): string => {
  const systemPrompts: Record<string, string> = {
    vet: "You are an AI veterinary assistant for OSCPETS, a pet marketplace in India. Provide helpful information about pet health, common medical issues, and when to see a vet. Always clarify you're not a replacement for professional veterinary care. Be concise and friendly.",
    nutrition: "You are an AI pet nutrition advisor for OSCPETS, a pet marketplace in India. Provide helpful information about pet diets, nutrition, and feeding guidelines. Be concise and friendly, focusing on scientifically accurate information.",
    training: "You are an AI pet training assistant for OSCPETS, a pet marketplace in India. Provide helpful advice on pet behavior, training techniques, and common behavioral issues. Be concise and friendly, focusing on positive reinforcement methods."
  };
  
  return systemPrompts[type] || systemPrompts.vet;
};

// Get topic title
const getTopicTitle = (type: string): string => {
  const titles: Record<string, string> = {
    vet: "Veterinary Questions",
    nutrition: "Nutrition Advice",
    training: "Training Tips"
  };
  
  return titles[type] || "Chat";
};

interface ChatInterfaceProps {
  topicId: string;
  onBackToTopics: () => void;
  apiKey: string;
  model: string;
}

const ChatInterface = ({ topicId, onBackToTopics, apiKey, model }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Set welcome message on topic selection
  useEffect(() => {
    const welcomeMessages: Record<string, string> = {
      vet: "Hello! I'm your veterinary assistant. How can I help with your pet's health today?",
      nutrition: "Hi there! I'm your pet nutrition advisor. What would you like to know about pet diet and food?",
      training: "Welcome! I'm your pet training assistant. How can I help with your pet's behavior and training?"
    };
    
    setMessages([{ type: 'ai', content: welcomeMessages[topicId] || "Hello! How can I help you today?" }]);
  }, [topicId]);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: question }]);
    setIsLoading(true);
    
    try {
      const systemPrompt = getSystemPrompt(topicId);
      
      // Prepare messages for the API request
      const apiMessages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ];
      
      // Make API request to OpenRouter
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
          messages: apiMessages,
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
        description: "Failed to connect to the AI service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <button
          onClick={onBackToTopics}
          className="mr-4 text-gray-600 hover:text-gray-900"
          aria-label="Back to topics"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-semibold text-lg">{getTopicTitle(topicId)}</h2>
          <p className="text-sm text-gray-500">OSCPETS AI Assistant</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 max-w-[80%]",
              msg.type === 'user' ? "ml-auto" : ""
            )}
          >
            {msg.type === 'ai' && (
              <div className="bg-osc-pale-blue p-2 rounded-full text-osc-blue shrink-0">
                <Bot size={20} />
              </div>
            )}
            <div
              className={cn(
                "p-3 rounded-lg",
                msg.type === 'user' 
                  ? "bg-osc-blue text-white rounded-tr-none" 
                  : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
              )}
            >
              {msg.content}
            </div>
            {msg.type === 'user' && (
              <div className="bg-gray-300 p-2 rounded-full text-gray-700 shrink-0">
                <User size={20} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="bg-osc-pale-blue p-2 rounded-full text-osc-blue">
              <Bot size={20} />
            </div>
            <div className="bg-white border border-gray-200 shadow-sm p-3 rounded-lg rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSendQuestion} className="flex gap-2">
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="bg-osc-blue hover:bg-osc-blue/90"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
