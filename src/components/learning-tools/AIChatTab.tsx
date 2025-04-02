
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AIChatTabProps {}

const AIChatTab: React.FC<AIChatTabProps> = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { message: string; isUser: boolean }[]
  >([
    {
      message: "Hello! I'm your AI study assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const isMobile = useIsMobile();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat
    setChatHistory((prev) => [
      ...prev,
      { message: chatMessage, isUser: true },
    ]);

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let response = `I'll help you with "${chatMessage}". What specific aspect would you like me to explain?`;
      
      if (chatMessage.toLowerCase().includes('calculus')) {
        response = "Calculus is the mathematical study of continuous change. The main concepts are limits, derivatives, and integrals. Would you like me to explain any of these concepts in more detail?";
      } else if (chatMessage.toLowerCase().includes('physics')) {
        response = "Physics is a natural science that studies matter, its motion and behavior through space and time. What specific physics topic are you studying?";
      } else if (chatMessage.toLowerCase().includes('programming')) {
        response = "Programming involves creating sets of instructions for computers to follow. What programming language or concept are you learning?";
      }
      
      setChatHistory((prev) => [
        ...prev,
        {
          message: response,
          isUser: false,
        },
      ]);
    }, 1000);

    setChatMessage('');
  };

  return (
    <div className="flex flex-col h-[300px]">
      <div className="flex-1 overflow-y-auto mb-4 p-3 border rounded-lg">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-3 ${
              chat.isUser ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block max-w-[80%] p-2 rounded-lg ${
                chat.isUser
                  ? 'bg-learn-primary text-white'
                  : 'bg-muted/50'
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Ask anything about your studies..."
          className="flex-1"
        />
        <Button type="submit" size={isMobile ? "icon" : "sm"}>
          <MessageSquare className="h-4 w-4" />
          {!isMobile && <span className="ml-1">Send</span>}
        </Button>
      </form>
    </div>
  );
};

export default AIChatTab;
