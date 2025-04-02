
import React from 'react';
import UserProfileCard from '@/components/UserProfileCard';
import CourseOverview from '@/components/CourseOverview';
import ProgressTracking from '@/components/ProgressTracking';
import TodoList from '@/components/TodoList';
import RecommendedResources from '@/components/RecommendedResources';
import StudyPlanner from '@/components/StudyPlanner';
import LearningTools from '@/components/LearningTools';
import AchievementsCard from '@/components/AchievementsCard';
import AIChatbox from '@/components/AIChatbox';
import StudyTimer from '@/components/StudyTimer';
import { useDashboard } from '@/contexts/DashboardContext';
import { 
  mockSubjects,
  mockNotifications,
  mockStudySessions,
  mockFlashcards,
  mockAchievements
} from '@/data/mockData';

const DashboardMainSection: React.FC = () => {
  const { 
    userProfile, 
    userCourses, 
    userTasks, 
    resources, 
    appSettings, 
    handleSaveResource 
  } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfileCard {...userProfile} />
        </div>
        
        <div className="md:col-span-2">
          <CourseOverview courses={userCourses} />
        </div>
        
        <div className="md:col-span-2">
          <ProgressTracking subjects={mockSubjects} />
        </div>
        
        <div className="md:col-span-1">
          <StudyTimer 
            focusTime={appSettings.focusTime} 
            breakTime={appSettings.breakTime}
            soundEnabled={appSettings.soundEffects}
          />
        </div>
        
        <div className="md:col-span-1">
          <TodoList todos={userTasks} notifications={mockNotifications} />
        </div>
        
        <div className="md:col-span-2">
          <RecommendedResources 
            resources={resources} 
            onSaveResource={handleSaveResource} 
          />
        </div>
        
        <div className="md:col-span-1">
          <StudyPlanner todaySessions={mockStudySessions} />
        </div>
        
        <div className="md:col-span-1">
          <LearningTools flashcards={mockFlashcards} />
        </div>
        
        <div className="md:col-span-3">
          <AchievementsCard 
            achievements={mockAchievements} 
            streak={7} 
            level={12} 
            xp={2450} 
            nextLevelXp={3000}
          />
        </div>
      </div>
      
      <div className="hidden md:block md:col-span-1 lg:col-span-1">
        <AIChatbox />
      </div>
    </div>
  );
};

export default DashboardMainSection;
