
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, MessageSquare, Volume2 } from 'lucide-react';
import FlashcardsTab from './FlashcardsTab';
import AIChatTab from './AIChatTab';
import TextToSpeechTab from './TextToSpeechTab';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface LearningToolsContainerProps {
  flashcards: Flashcard[];
}

const LearningToolsContainer: React.FC<LearningToolsContainerProps> = ({ flashcards }) => {
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
            <FlashcardsTab flashcards={flashcards} />
          </TabsContent>

          <TabsContent value="ai-chat" className="h-full">
            <AIChatTab />
          </TabsContent>

          <TabsContent value="text-to-speech" className="h-full">
            <TextToSpeechTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LearningToolsContainer;
