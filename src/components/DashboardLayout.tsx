
import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import UserProfileCard from './UserProfileCard';
import CourseOverview from './CourseOverview';
import ProgressTracking from './ProgressTracking';
import TodoList from './TodoList';
import RecommendedResources from './RecommendedResources';
import StudyPlanner from './StudyPlanner';
import LearningTools from './LearningTools';
import AchievementsCard from './AchievementsCard';
import AIChatbox from './AIChatbox';
import StudyTimer from './StudyTimer';
import ProfileSettingsForm from './ProfileSettingsForm';
import CourseSettingsForm from './CourseSettingsForm';
import TaskSettingsForm from './TaskSettingsForm';
import SettingsPanel from './SettingsPanel';
import { useToast } from '@/hooks/use-toast';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const mockUser = {
  name: 'Alex Johnson',
  avatarUrl: '',
  grade: 'Senior Year',
  learningStyle: 'Visual Learner',
  overallProgress: 68,
};

const mockCourses = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    progress: 75,
    nextClass: 'Today, 2:00 PM',
    deadlines: [
      { title: 'Calculus Assignment', date: 'Tomorrow', type: 'assignment' as const },
      { title: 'Midterm Exam', date: 'In 5 days', type: 'exam' as const },
    ],
  },
  {
    id: '2',
    name: 'Physics 101',
    progress: 60,
    nextClass: 'Tomorrow, 10:00 AM',
    deadlines: [
      { title: 'Lab Report', date: 'In 3 days', type: 'project' as const },
    ],
  },
  {
    id: '3',
    name: 'Computer Science',
    progress: 82,
    nextClass: 'Wed, 1:00 PM',
    deadlines: [
      { title: 'Coding Challenge', date: 'In 2 days', type: 'assignment' as const },
    ],
  },
];

const mockSubjects = [
  {
    subject: 'Mathematics',
    mastery: 75,
    timeSpent: 8.5,
    recentGrades: [
      { title: 'Calculus Quiz', score: 'A-', date: '2 days ago' },
      { title: 'Algebra Test', score: 'B+', date: '1 week ago' },
    ],
    skills: [
      { name: 'Calculus', level: 4 },
      { name: 'Algebra', level: 3 },
      { name: 'Geometry', level: 5 },
    ],
  },
  {
    subject: 'Physics',
    mastery: 60,
    timeSpent: 6.2,
    recentGrades: [
      { title: 'Mechanics Quiz', score: 'B', date: '3 days ago' },
      { title: 'Lab Report', score: 'A', date: '2 weeks ago' },
    ],
    skills: [
      { name: 'Mechanics', level: 3 },
      { name: 'Thermodynamics', level: 4 },
      { name: 'Electricity', level: 2 },
    ],
  },
];

const mockTodos = [
  {
    id: '1',
    title: 'Complete Calculus Assignment',
    due: 'Tomorrow, 11:59 PM',
    completed: false,
    course: 'Mathematics',
    type: 'assignment' as const,
  },
  {
    id: '2',
    title: 'Read Physics Chapter 5',
    due: 'Today, 6:00 PM',
    completed: false,
    course: 'Physics',
    type: 'reading' as const,
  },
  {
    id: '3',
    title: 'Prepare for Coding Quiz',
    due: 'In 2 days',
    completed: true,
    course: 'Computer Science',
    type: 'quiz' as const,
  },
];

const mockNotifications = [
  {
    id: '1',
    message: 'Your Mathematics assignment is due tomorrow',
    time: '1 hour ago',
    read: false,
    type: 'deadline' as const,
  },
  {
    id: '2',
    message: 'Professor Williams left feedback on your essay',
    time: '3 hours ago',
    read: false,
    type: 'feedback' as const,
  },
  {
    id: '3',
    message: 'New course materials uploaded for Physics',
    time: 'Yesterday',
    read: true,
    type: 'update' as const,
  },
];

const mockResources = [
  {
    id: '1',
    title: 'Calculus Made Easy: Derivatives',
    source: 'Khan Academy',
    type: 'video' as const,
    relevantSubject: 'Mathematics',
    saved: false,
    url: '#',
  },
  {
    id: '2',
    title: "Understanding Newton's Laws of Motion",
    source: 'MIT OpenCourseware',
    type: 'article' as const,
    relevantSubject: 'Physics',
    saved: true,
    url: '#',
  },
  {
    id: '3',
    title: 'Data Structures Practice Problems',
    source: 'LeetCode',
    type: 'practice' as const,
    relevantSubject: 'Computer Science',
    saved: false,
    url: '#',
  },
];

const mockStudySessions = [
  {
    id: '1',
    subject: 'Mathematics',
    time: '2:00 PM - 3:30 PM',
    duration: 90,
  },
  {
    id: '2',
    subject: 'Physics',
    time: '4:00 PM - 5:00 PM',
    duration: 60,
  },
  {
    id: '3',
    subject: 'Computer Science',
    time: '7:00 PM - 8:30 PM',
    duration: 90,
  },
];

const mockFlashcards = [
  {
    id: '1',
    question: 'What is the derivative of e^x?',
    answer: 'e^x',
    category: 'Mathematics',
  },
  {
    id: '2',
    question: "What is Newton's First Law of Motion?",
    answer: 'An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.',
    category: 'Physics',
  },
  {
    id: '3',
    question: 'What is the time complexity of quicksort?',
    answer: 'O(n log n) on average, O(n²) in the worst case',
    category: 'Computer Science',
  },
];

const mockAchievements = [
  {
    id: '1',
    title: 'Study Streak',
    description: 'Study for 7 consecutive days',
    progress: 85,
    completed: false,
    icon: 'flame' as const,
  },
  {
    id: '2',
    title: 'Math Master',
    description: 'Complete all mathematics assignments with grade A',
    progress: 100,
    completed: true,
    icon: 'star' as const,
  },
  {
    id: '3',
    title: 'Quiz Champion',
    description: 'Score perfectly on 5 quizzes',
    progress: 60,
    completed: false,
    icon: 'award' as const,
  },
];

const DashboardLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [resources, setResources] = useState(mockResources);
  const { toast } = useToast();
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  
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

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Learning Dashboard</h1>
          
          <div className="md:hidden">
            <Drawer open={isMobileChatOpen} onOpenChange={setIsMobileChatOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh]">
                <div className="p-4 h-full">
                  <AIChatbox />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        
        {activeSection === 'dashboard' && (
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
        )}
        
        {activeSection === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <CourseOverview courses={userCourses} />
            </div>
            <div className="md:col-span-1">
              <ProgressTracking subjects={mockSubjects} />
            </div>
          </div>
        )}
        
        {activeSection === 'schedule' && (
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
        )}
        
        {activeSection === 'tasks' && (
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
        )}
        
        {activeSection === 'resources' && (
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
        )}
        
        {activeSection === 'assistant' && (
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <AIChatbox />
            </div>
          </div>
        )}
        
        {activeSection === 'achievements' && (
          <div>
            <AchievementsCard 
              achievements={mockAchievements} 
              streak={7} 
              level={12} 
              xp={2450} 
              nextLevelXp={3000}
            />
          </div>
        )}
        
        {activeSection === 'profile' && (
          <div className="flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <ProfileSettingsForm 
                initialData={userProfile} 
                onSave={handleProfileUpdate}
              />
            </div>
          </div>
        )}
        
        {activeSection === 'settings' && (
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
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
