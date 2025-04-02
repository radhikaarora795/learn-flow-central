
import React from 'react';
import LearningToolsContainer from './learning-tools/LearningToolsContainer';

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
  return <LearningToolsContainer flashcards={flashcards} />;
};

export default LearningTools;
