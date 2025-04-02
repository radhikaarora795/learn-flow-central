
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI learning assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'All Subjects'];

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Mock function for sending messages
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      let responseContent = '';
      
      if (inputMessage.toLowerCase().includes('calculus')) {
        responseContent = "Calculus is the mathematical study of continuous change. Would you like me to explain derivatives or integrals?";
      } else if (inputMessage.toLowerCase().includes('physics')) {
        responseContent = "I can help with physics concepts. What specific topic are you interested in?";
      } else if (inputMessage.toLowerCase().includes('programming')) {
        responseContent = "Programming is a valuable skill! Are you learning a specific language like Python or JavaScript?";
      } else {
        responseContent = `I understand you're asking about "${inputMessage}". How can I help you learn more about this topic?`;
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      // Simulate text-to-speech
      if (!isSpeaking) {
        simulateTextToSpeech(responseContent);
      }
    }, 1000);
  };

  // Mock function to handle the send message event when pressing Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Mock function to start/stop recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate starting recording
      setTimeout(() => {
        // Simulate speech recognition result
        setInputMessage("Can you explain Newton's laws of motion?");
        setIsRecording(false);
      }, 2000);
    }
  };

  // Mock function for text-to-speech
  const simulateTextToSpeech = (text: string) => {
    setIsSpeaking(true);
    
    // Simulate speech duration based on text length
    const speechDuration = Math.min(Math.max(text.length * 50, 1500), 5000);
    setTimeout(() => {
      setIsSpeaking(false);
    }, speechDuration);
  };

  // Toggle speaking
  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  // Filter messages by subject
  const filteredMessages = activeSubject && activeSubject !== 'All Subjects'
    ? messages.filter(m => 
        m.content.toLowerCase().includes(activeSubject.toLowerCase()))
    : messages;

  return (
    <Card className="shadow-md h-full animate-fade-in overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-learn-primary" />
            AI Learning Assistant
          </div>
          <div className="flex space-x-1">
            {subjects.map(subject => (
              <Badge 
                key={subject}
                variant={activeSubject === subject ? "default" : "outline"} 
                className="cursor-pointer text-xs"
                onClick={() => setActiveSubject(subject === activeSubject ? null : subject)}
              >
                {subject}
              </Badge>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col p-3">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="suggestions">Learning Suggestions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 flex flex-col mt-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 mb-3">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!message.isUser && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/ai-avatar.png" />
                      <AvatarFallback className="bg-learn-primary text-white text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.isUser
                        ? 'bg-learn-primary text-white'
                        : 'bg-muted border'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex items-end gap-2 mt-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about any topic or homework problem..."
                className="resize-none min-h-[80px]"
                onKeyDown={handleKeyDown}
              />
              <div className="flex flex-col gap-2">
                <Button
                  size="icon"
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={toggleRecording}
                  title={isRecording ? "Stop recording" : "Start voice input"}
                >
                  {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                </Button>
                <Button
                  size="icon"
                  variant={isSpeaking ? "destructive" : "outline"}
                  onClick={toggleSpeaking}
                  title={isSpeaking ? "Mute speech" : "Enable speech output"}
                >
                  {isSpeaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </Button>
                <Button size="icon" onClick={handleSendMessage} title="Send message">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="mt-0">
            <div className="space-y-3">
              <div className="flex items-center mb-2">
                <Lightbulb className="h-4 w-4 mr-2 text-learn-accent" />
                <h3 className="text-sm font-medium">Suggested Topics</h3>
              </div>
              
              {[
                "Can you explain derivatives in calculus?",
                "What are Newton's laws of motion?",
                "How do I solve quadratic equations?",
                "Explain big O notation in programming",
                "What's the difference between velocity and acceleration?"
              ].map((suggestion, index) => (
                <div 
                  key={index} 
                  className="p-2 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setInputMessage(suggestion);
                  }}
                >
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIChatbox;
