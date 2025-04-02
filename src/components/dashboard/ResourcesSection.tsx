
import React from 'react';
import RecommendedResources from '@/components/RecommendedResources';
import LearningTools from '@/components/LearningTools';
import { useDashboard } from '@/contexts/DashboardContext';
import { mockFlashcards } from '@/data/mockData';

const ResourcesSection: React.FC = () => {
  const { resources, handleSaveResource } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-1">
        <RecommendedResources 
          resources={resources} 
          onSaveResource={handleSaveResource} 
        />
      </div>
      <div className="md:col-span-1">
        <LearningTools flashcards={mockFlashcards} />
      </div>
    </div>
  );
};

export default ResourcesSection;
