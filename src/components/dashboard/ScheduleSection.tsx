
import React from 'react';
import StudyTimer from '@/components/StudyTimer';
import StudyPlanner from '@/components/StudyPlanner';
import { useDashboard } from '@/contexts/DashboardContext';
import { mockStudySessions } from '@/data/mockData';

const ScheduleSection: React.FC = () => {
  const { appSettings } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-1">
        <StudyTimer 
          focusTime={appSettings.focusTime} 
          breakTime={appSettings.breakTime}
          soundEnabled={appSettings.soundEffects}
        />
      </div>
      <div className="md:col-span-1">
        <StudyPlanner todaySessions={mockStudySessions} />
      </div>
    </div>
  );
};

export default ScheduleSection;
