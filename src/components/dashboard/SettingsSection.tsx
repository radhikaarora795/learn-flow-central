
import React from 'react';
import SettingsPanel from '@/components/SettingsPanel';
import CourseSettingsForm from '@/components/CourseSettingsForm';
import TaskSettingsForm from '@/components/TaskSettingsForm';
import { useDashboard } from '@/contexts/DashboardContext';

const SettingsSection: React.FC = () => {
  const { 
    appSettings, 
    userCourses, 
    userTasks, 
    handleSettingsUpdate, 
    handleCoursesUpdate, 
    handleTasksUpdate 
  } = useDashboard();

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <SettingsPanel 
          onSave={handleSettingsUpdate}
          defaultSettings={appSettings}
        />
        <div className="mt-8 space-y-8">
          <CourseSettingsForm 
            courses={userCourses}
            onSave={handleCoursesUpdate}
          />
          <TaskSettingsForm 
            tasks={userTasks}
            courses={userCourses}
            onSave={handleTasksUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
