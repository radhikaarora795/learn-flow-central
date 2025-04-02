
import React from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Home,
  Settings,
  Award,
  User,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/contexts/DashboardContext';

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  id: string;
}

const DashboardSidebar: React.FC = () => {
  const { activeSection, setActiveSection } = useDashboard();

  const mainMenuItems: SidebarItem[] = [
    { name: 'Dashboard', icon: <Home size={20} />, id: 'dashboard' },
    { name: 'Courses', icon: <BookOpen size={20} />, id: 'courses' },
    { name: 'Schedule', icon: <Calendar size={20} />, id: 'schedule' },
    { name: 'Tasks', icon: <Clock size={20} />, id: 'tasks' },
    { name: 'Resources', icon: <FileText size={20} />, id: 'resources' },
    { name: 'AI Assistant', icon: <MessageSquare size={20} />, id: 'assistant' },
  ];

  const secondaryMenuItems: SidebarItem[] = [
    { name: 'Achievements', icon: <Award size={20} />, id: 'achievements' },
    { name: 'Profile', icon: <User size={20} />, id: 'profile' },
    { name: 'Settings', icon: <Settings size={20} />, id: 'settings' },
  ];

  return (
    <div className="w-64 fixed inset-y-0 left-0 bg-card border-r shadow-sm z-10">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-learn-primary" />
            <h1 className="text-xl font-semibold">LearnFlow</h1>
          </div>
        </div>

        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          <nav className="space-y-1">
            {mainMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  activeSection === item.id
                    ? 'bg-learn-primary text-white'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t">
            <p className="px-3 text-xs font-semibold text-muted-foreground mb-2 uppercase">
              User
            </p>
            <nav className="space-y-1">
              {secondaryMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    activeSection === item.id
                      ? 'bg-learn-primary text-white'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-learn-primary flex items-center justify-center text-white font-medium">
              AJ
            </div>
            <div>
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
