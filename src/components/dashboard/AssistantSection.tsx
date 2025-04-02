
import React from 'react';
import AIChatbox from '@/components/AIChatbox';

const AssistantSection: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <AIChatbox />
      </div>
    </div>
  );
};

export default AssistantSection;
