
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Book, Lightbulb, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface LearningToolsProps {
  flashcards: Flashcard[];
}

const LearningTools: React.FC<LearningToolsProps> = ({ flashcards }) => {
  const [activeFlashcard, setActiveFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { message: string; isUser: boolean }[]
  >([
    {
      message: "Hello! I'm your AI study assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [textToSpeak, setTextToSpeak] = useState('');

  const handleNextCard = () => {
    setActiveFlashcard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const handlePrevCard = () => {
    setActiveFlashcard(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
    setShowAnswer(false);
  };

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
      setChatHistory((prev) => [
        ...prev,
        {
          message: `I'll help you with "${chatMessage}". What specific aspect would you like me to explain?`,
          isUser: false,
        },
      ]);
    }, 1000);

    setChatMessage('');
  };

  const handleTextToSpeech = () => {
    // In a real app, this would call a text-to-speech API
    alert(`Text to speech would play: ${textToSpeak}`);
  };

  return (
    <Card className="shadow-md h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Book className="mr-2 h-5 w-5 text-learn-primary" />
          Learning Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="flashcards" className="h-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
            <TabsTrigger value="text-to-speech">Voice</TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards" className="h-full">
            {flashcards.length > 0 ? (
              <div className="flex flex-col h-full">
                <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                  <span>Card {activeFlashcard + 1} of {flashcards.length}</span>
                  <Badge variant="outline">
                    {flashcards[activeFlashcard].category}
                  </Badge>
                </div>
                <div 
                  className="flex-1 flex items-center justify-center p-6 
                  border rounded-lg cursor-pointer transition-all 
                  bg-muted/30 hover:bg-muted/50 mb-4"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  <div className="text-center">
                    <p className="font-medium text-lg">
                      {showAnswer
                        ? flashcards[activeFlashcard].answer
                        : flashcards[activeFlashcard].question}
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      {showAnswer ? "Question" : "Click to reveal answer"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevCard}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextCard}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No flashcards available. Create some to get started!
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai-chat" className="h-full">
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
                <Button type="submit" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="text-to-speech" className="h-full">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">
                  Enter text to convert to speech
                </label>
                <Textarea
                  value={textToSpeak}
                  onChange={(e) => setTextToSpeak(e.target.value)}
                  placeholder="Enter text to be converted to speech..."
                  className="h-[100px]"
                />
              </div>
              <Button
                onClick={handleTextToSpeech}
                className="w-full"
                disabled={!textToSpeak.trim()}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Convert to Speech
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                <Lightbulb className="h-4 w-4 inline mr-1" />
                Perfect for auditory learners and accessibility
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LearningTools;
