
import React from 'react';
import {
  Home,
  BookOpen,
  BarChart2,
  Calendar,
  CheckSquare,
  BookmarkPlus,
  Clock,
  Award,
  Settings,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          'flex items-center w-full space-x-3 px-4 py-2.5 rounded-lg transition-colors',
          isActive
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        )}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </button>
    </li>
  );
};

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'resources', label: 'Resources', icon: BookmarkPlus },
    { id: 'planner', label: 'Study Planner', icon: Clock },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-sidebar h-screen w-64 fixed left-0 top-0 border-r border-sidebar-border">
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-white flex items-center">
          <span className="text-learn-accent mr-2">Learn</span>Flow
        </h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeSection === item.id}
              onClick={() => onSectionChange(item.id)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
