
import React, { createContext, useContext, useState } from 'react';
import { 
  mockUser, 
  mockCourses, 
  mockTodos, 
  mockResources 
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  soundEffects: boolean;
  soundVolume: number;
  focusTime: number;
  breakTime: number;
}

interface DashboardContextType {
  activeSection: string;
  userProfile: typeof mockUser;
  userCourses: typeof mockCourses;
  userTasks: typeof mockTodos;
  resources: typeof mockResources;
  appSettings: AppSettings;
  setActiveSection: (section: string) => void;
  handleSaveResource: (id: string) => void;
  handleProfileUpdate: (data: any) => void;
  handleCoursesUpdate: (courses: any) => void;
  handleTasksUpdate: (tasks: any) => void;
  handleSettingsUpdate: (settings: any) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [resources, setResources] = useState(mockResources);
  const { toast } = useToast();
  
  const [userProfile, setUserProfile] = useState(mockUser);
  const [userCourses, setUserCourses] = useState(mockCourses);
  const [userTasks, setUserTasks] = useState(mockTodos);
  const [appSettings, setAppSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEffects: true,
    soundVolume: 80,
    focusTime: 25,
    breakTime: 5,
  });

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleSaveResource = (id: string) => {
    setResources(
      resources.map((resource) =>
        resource.id === id
          ? { ...resource, saved: !resource.saved }
          : resource
      )
    );
    
    const resource = resources.find((r) => r.id === id);
    
    if (resource) {
      toast({
        title: resource.saved ? "Resource unsaved" : "Resource saved",
        description: resource.saved 
          ? `"${resource.title}" removed from your saved resources`
          : `"${resource.title}" added to your saved resources`,
        duration: 3000,
      });
    }
  };
  
  const handleProfileUpdate = (data: any) => {
    setUserProfile({
      ...userProfile,
      ...data,
    });
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleCoursesUpdate = (courses: any) => {
    setUserCourses(courses);
  };
  
  const handleTasksUpdate = (tasks: any) => {
    setUserTasks(tasks);
  };
  
  const handleSettingsUpdate = (settings: any) => {
    setAppSettings(settings);
  };

  const value = {
    activeSection,
    userProfile,
    userCourses,
    userTasks,
    resources,
    appSettings,
    setActiveSection: handleSectionChange,
    handleSaveResource,
    handleProfileUpdate,
    handleCoursesUpdate,
    handleTasksUpdate,
    handleSettingsUpdate,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
