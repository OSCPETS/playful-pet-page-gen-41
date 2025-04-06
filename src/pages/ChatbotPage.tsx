import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TopicSelection from '@/components/chatbot/TopicSelection';
import ChatInterface from '@/components/chatbot/ChatInterface';
import { toast } from "@/hooks/use-toast";

// Default model and API key
const DEFAULT_MODEL = "qwen/qwen2.5-vl-32b-instruct:free";
const DEFAULT_API_KEY = "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";

const ChatbotPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [apiKey] = useState(DEFAULT_API_KEY);
  const [model] = useState(DEFAULT_MODEL);
  
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    
    toast({
      title: "Topic Selected",
      description: `You can now chat about ${topicId === 'vet' ? 'veterinary questions' : topicId === 'nutrition' ? 'pet nutrition' : 'pet training'}.`,
    });
  };
  
  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };
  
  return (
    <>
      <Helmet>
        <title>Chat with OSCPETS AI | OSCPETS</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {selectedTopic ? (
          <ChatInterface 
            topicId={selectedTopic} 
            onBackToTopics={handleBackToTopics} 
            apiKey={apiKey}
            model={model}
          />
        ) : (
          <TopicSelection onSelectTopic={handleSelectTopic} />
        )}
      </div>
    </>
  );
};

export default ChatbotPage;
