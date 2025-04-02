
import React from 'react';
import TodoList from '@/components/TodoList';
import StudyTimer from '@/components/StudyTimer';
import { useDashboard } from '@/contexts/DashboardContext';
import { mockNotifications } from '@/data/mockData';

const TasksSection: React.FC = () => {
  const { userTasks, appSettings } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-1">
        <TodoList todos={userTasks} notifications={mockNotifications} />
      </div>
      <div className="md:col-span-1">
        <StudyTimer 
          focusTime={appSettings.focusTime} 
          breakTime={appSettings.breakTime}
          soundEnabled={appSettings.soundEffects}
        />
      </div>
    </div>
  );
};

export default TasksSection;
