
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
  BookOpen,
  Calculator,
  Atom,
  Code,
  BookText,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  subject?: string;
}

const subjectResponses = {
  mathematics: [
    "Calculus is the mathematical study of continuous change. The main concepts are limits, derivatives, and integrals.",
    "Algebra deals with mathematical symbols and the rules for manipulating these symbols. It's a unifying thread of almost all mathematics.",
    "Geometry is concerned with questions of shape, size, relative position of figures, and the properties of space.",
    "Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data.",
    "Probability theory is the branch of mathematics that deals with analyzing random phenomena."
  ],
  physics: [
    "Newton's laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.",
    "Thermodynamics is the branch of physics that deals with heat and temperature and their relation to energy and work.",
    "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.",
    "Electromagnetism is a branch of physics involving the study of the electromagnetic force, which is one of the four fundamental interactions in nature.",
    "Relativity is Albert Einstein's theory describing the relationship between space and time."
  ],
  computerScience: [
    "Algorithms are step-by-step procedures for calculations, data processing, and automated reasoning.",
    "Data structures are a way of organizing and storing data so that it can be accessed and modified efficiently.",
    "Object-oriented programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data and code.",
    "Big O notation is used to classify algorithms according to how their run time or space requirements grow as the input size grows.",
    "Machine learning is a field of computer science that gives systems the ability to learn without being explicitly programmed."
  ],
  biology: [
    "Cell theory states that all living organisms are composed of cells, cells are the basic unit of structure and function in living organisms, and all cells come from pre-existing cells.",
    "Evolution by natural selection is the process by which organisms change over time as a result of changes in inheritable physical or behavioral traits.",
    "DNA (deoxyribonucleic acid) is a molecule composed of two chains that coil around each other to form a double helix carrying genetic instructions.",
    "Photosynthesis is the process used by plants to convert light energy into chemical energy that can later be released to fuel the organisms' activities.",
    "Homeostasis is the state of steady internal conditions maintained by living things."
  ],
  chemistry: [
    "The periodic table is a tabular arrangement of the chemical elements, organized by their atomic number, electron configuration, and recurring chemical properties.",
    "Chemical bonds are the forces of attraction that tie atoms together in elements and compounds.",
    "Acids and bases are substances that, when dissolved in water, increase or decrease the concentration of hydrogen ions.",
    "Organic chemistry is the study of the structure, properties, composition, reactions, and preparation of carbon-containing compounds.",
    "Thermochemistry is the study of the heat energy associated with chemical reactions and physical changes."
  ]
};

const AIChatbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI learning assistant. How can I help you today? Feel free to ask questions about Mathematics, Physics, Computer Science, Biology, or Chemistry.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Biology', 'Chemistry', 'All Subjects'];

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to get a response based on detected subject and keywords
  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Detect subject
    let detectedSubject = '';
    if (/math|calculus|algebra|geometry|equation|formula|derivative|integral/i.test(lowerQuery)) {
      detectedSubject = 'mathematics';
    } else if (/physics|newton|einstein|gravity|motion|force|energy|quantum|relativity/i.test(lowerQuery)) {
      detectedSubject = 'physics';
    } else if (/computer|algorithm|programming|code|software|data structure|oop|machine learning/i.test(lowerQuery)) {
      detectedSubject = 'computerScience';
    } else if (/biology|cell|dna|evolution|organism|species|photosynthesis/i.test(lowerQuery)) {
      detectedSubject = 'biology';
    } else if (/chemistry|element|compound|reaction|acid|base|molecule|organic|periodic/i.test(lowerQuery)) {
      detectedSubject = 'chemistry';
    }
    
    // If we detected a subject, get a response from that subject
    if (detectedSubject && subjectResponses[detectedSubject as keyof typeof subjectResponses]) {
      const responses = subjectResponses[detectedSubject as keyof typeof subjectResponses];
      
      // Try to match specific topics within the subject
      if (detectedSubject === 'mathematics') {
        if (/calculus|derivative|integral/i.test(lowerQuery)) {
          return responses[0];
        } else if (/algebra|equation|formula/i.test(lowerQuery)) {
          return responses[1];
        } else if (/geometry/i.test(lowerQuery)) {
          return responses[2];
        } else if (/statistics/i.test(lowerQuery)) {
          return responses[3];
        } else if (/probability/i.test(lowerQuery)) {
          return responses[4];
        }
      } else if (detectedSubject === 'physics') {
        if (/newton|motion|force/i.test(lowerQuery)) {
          return responses[0];
        } else if (/thermo|heat|temperature/i.test(lowerQuery)) {
          return responses[1];
        } else if (/quantum/i.test(lowerQuery)) {
          return responses[2];
        } else if (/electro|magnet/i.test(lowerQuery)) {
          return responses[3];
        } else if (/relativity|einstein/i.test(lowerQuery)) {
          return responses[4];
        }
      } 
      // Similar logic for other subjects
      
      // If no specific topic is found, return a random response from that subject
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Generic response for unrecognized queries
    return `I don't have specific information about "${query}" in my knowledge base. Would you like to learn about Mathematics, Physics, Computer Science, Biology, or Chemistry? Feel free to ask a more specific question.`;
  };

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

    // Get AI response
    const responseContent = getAIResponse(userMessage.content);
    
    // Detect subject for the response
    let responseSubject = null;
    if (/calculus|algebra|geometry|mathematics/i.test(responseContent)) {
      responseSubject = 'Mathematics';
    } else if (/physics|newton|einstein/i.test(responseContent)) {
      responseSubject = 'Physics';
    } else if (/computer|algorithm|programming/i.test(responseContent)) {
      responseSubject = 'Computer Science';
    } else if (/biology|cell|dna/i.test(responseContent)) {
      responseSubject = 'Biology';
    } else if (/chemistry|element|compound/i.test(responseContent)) {
      responseSubject = 'Chemistry';
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
        subject: responseSubject,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      // Simulate text-to-speech
      if (isSpeaking) {
        simulateTextToSpeech(responseContent);
      }
    }, 800);
  };

  // Handle the send message event when pressing Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simulate speech recognition
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Voice recognition started",
        description: "Listening for your question...",
        duration: 2000,
      });
      
      // Simulate starting recording
      setTimeout(() => {
        // Simulate speech recognition result
        const randomQuestions = [
          "Can you explain Newton's laws of motion?",
          "What is the derivative of x^2?",
          "Explain the concept of object-oriented programming",
          "What is the structure of DNA?",
          "How does the periodic table organize elements?"
        ];
        const randomQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
        setInputMessage(randomQuestion);
        setIsRecording(false);
        
        toast({
          title: "Voice recognized",
          description: `Detected: "${randomQuestion}"`,
          duration: 3000,
        });
      }, 2000);
    } else {
      toast({
        title: "Voice recognition stopped",
        duration: 2000,
      });
    }
  };

  // Simulate text-to-speech
  const simulateTextToSpeech = (text: string) => {
    setIsSpeaking(true);
    
    toast({
      title: "Speaking...",
      description: "AI is reading the response aloud",
      duration: 2000,
    });
    
    // Simulate speech duration based on text length
    const speechDuration = Math.min(Math.max(text.length * 50, 1500), 5000);
    setTimeout(() => {
      setIsSpeaking(false);
    }, speechDuration);
  };

  // Toggle speaking
  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    toast({
      title: isSpeaking ? "Voice output disabled" : "Voice output enabled",
      duration: 2000,
    });
  };

  // Filter messages by subject
  const filteredMessages = activeSubject && activeSubject !== 'All Subjects'
    ? messages.filter(m => 
        !m.subject || m.subject === activeSubject || 
        m.content.toLowerCase().includes(activeSubject.toLowerCase()))
    : messages;

  // Get subject icon
  const getSubjectIcon = (subject: string | undefined) => {
    switch (subject) {
      case 'Mathematics':
        return <Calculator className="h-4 w-4 mr-1" />;
      case 'Physics':
        return <Atom className="h-4 w-4 mr-1" />;
      case 'Computer Science':
        return <Code className="h-4 w-4 mr-1" />;
      case 'Biology':
        return <BookText className="h-4 w-4 mr-1" />;
      case 'Chemistry':
        return <BookOpen className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md h-full animate-fade-in overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-learn-primary" />
            AI Learning Assistant
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
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
                    {message.subject && !message.isUser && (
                      <div className="flex items-center text-xs font-medium mb-1 text-learn-accent">
                        {getSubjectIcon(message.subject)}
                        {message.subject}
                      </div>
                    )}
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
                placeholder="Ask about any subject or homework problem..."
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
                { text: "Explain the derivative rules in calculus", subject: "Mathematics", icon: <Calculator className="h-4 w-4 mr-2" /> },
                { text: "What are Newton's laws of motion?", subject: "Physics", icon: <Atom className="h-4 w-4 mr-2" /> },
                { text: "Explain big O notation in programming", subject: "Computer Science", icon: <Code className="h-4 w-4 mr-2" /> },
                { text: "How does DNA replication work?", subject: "Biology", icon: <BookText className="h-4 w-4 mr-2" /> },
                { text: "Explain the periodic table organization", subject: "Chemistry", icon: <BookOpen className="h-4 w-4 mr-2" /> }
              ].map((suggestion, index) => (
                <div 
                  key={index} 
                  className="p-2 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setInputMessage(suggestion.text);
                  }}
                >
                  <div className="flex items-center text-xs font-medium mb-1 text-learn-accent">
                    {suggestion.icon}
                    {suggestion.subject}
                  </div>
                  <p className="text-sm">{suggestion.text}</p>
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
