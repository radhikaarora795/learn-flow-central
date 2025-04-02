
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FlashcardsTabProps {
  flashcards: Flashcard[];
}

const FlashcardsTab: React.FC<FlashcardsTabProps> = ({ flashcards }) => {
  const [activeFlashcard, setActiveFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const isMobile = useIsMobile();

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

  return (
    <div className="flex flex-col h-full">
      {flashcards.length > 0 ? (
        <>
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
              size={isMobile ? "icon" : "sm"}
              onClick={handlePrevCard}
            >
              {isMobile ? "←" : "Previous"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? "Hide" : "Show"}
            </Button>
            <Button
              variant="outline"
              size={isMobile ? "icon" : "sm"}
              onClick={handleNextCard}
            >
              {isMobile ? "→" : "Next"}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          No flashcards available. Create some to get started!
        </div>
      )}
    </div>
  );
};

export default FlashcardsTab;
