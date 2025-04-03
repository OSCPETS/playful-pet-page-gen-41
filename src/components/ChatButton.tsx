
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatButton = () => {
  return (
    <Link 
      to="/chat" 
      className="fixed right-6 bottom-6 bg-osc-blue text-white px-6 py-3 rounded-full shadow-lg hover:bg-osc-blue/90 transition-all z-40 flex items-center gap-2"
    >
      <MessageSquare size={20} />
      <span>Chat with OSCPETS AI Now!</span>
    </Link>
  );
};

export default ChatButton;
