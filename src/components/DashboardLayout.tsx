
import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardMainSection from './dashboard/DashboardMainSection';
import CoursesSection from './dashboard/CoursesSection';
import ScheduleSection from './dashboard/ScheduleSection';
import TasksSection from './dashboard/TasksSection';
import ResourcesSection from './dashboard/ResourcesSection';
import AssistantSection from './dashboard/AssistantSection';
import AchievementsSection from './dashboard/AchievementsSection';
import ProfileSection from './dashboard/ProfileSection';
import SettingsSection from './dashboard/SettingsSection';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';

// This is the component that handles the section content display
const DashboardContent: React.FC = () => {
  const { activeSection } = useDashboard();
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  
  // Define section titles
  const sectionTitles: Record<string, string> = {
    dashboard: 'Learning Dashboard',
    courses: 'My Courses',
    schedule: 'Study Schedule',
    tasks: 'Tasks & Assignments',
    resources: 'Learning Resources',
    assistant: 'AI Learning Assistant',
    achievements: 'Achievements & Progress',
    profile: 'User Profile',
    settings: 'Settings',
  };

  return (
    <div className="flex-1 p-6 ml-64">
      <DashboardHeader 
        title={sectionTitles[activeSection] || 'Learning Dashboard'} 
        isMobileChatOpen={isMobileChatOpen}
        setIsMobileChatOpen={setIsMobileChatOpen}
      />
      
      {activeSection === 'dashboard' && <DashboardMainSection />}
      {activeSection === 'courses' && <CoursesSection />}
      {activeSection === 'schedule' && <ScheduleSection />}
      {activeSection === 'tasks' && <TasksSection />}
      {activeSection === 'resources' && <ResourcesSection />}
      {activeSection === 'assistant' && <AssistantSection />}
      {activeSection === 'achievements' && <AchievementsSection />}
      {activeSection === 'profile' && <ProfileSection />}
      {activeSection === 'settings' && <SettingsSection />}
    </div>
  );
};

// This is the main wrapper component
const DashboardLayout: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
