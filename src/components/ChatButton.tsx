
import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

const ChatButton = () => {
  return (
    <Link 
      to="/chat" 
      className="fixed right-4 bottom-4 bg-osc-blue text-white p-3 rounded-full shadow-lg hover:bg-osc-blue/90 transition-all z-40"
      aria-label="Chat with AI"
    >
      <div className="relative">
        <Bot size={20} />
        <Badge className="absolute -top-2 -right-2 bg-orange-500 text-[10px] px-1 py-0 rounded-full">
          AI
        </Badge>
      </div>
    </Link>
  );
};

export default ChatButton;
