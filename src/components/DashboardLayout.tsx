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
import { useToast } from '@/hooks/use-toast';

// Mock data
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

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold mb-6">Learning Dashboard</h1>
        
        {activeSection === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <UserProfileCard {...mockUser} />
            </div>
            
            <div className="lg:col-span-3">
              <CourseOverview courses={mockCourses} />
            </div>
            
            <div className="lg:col-span-2">
              <ProgressTracking subjects={mockSubjects} />
            </div>
            
            <div className="lg:col-span-2">
              <TodoList todos={mockTodos} notifications={mockNotifications} />
            </div>
            
            <div className="lg:col-span-2">
              <RecommendedResources 
                resources={resources} 
                onSaveResource={handleSaveResource} 
              />
            </div>
            
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <StudyPlanner todaySessions={mockStudySessions} />
                <LearningTools flashcards={mockFlashcards} />
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <AchievementsCard 
                achievements={mockAchievements} 
                streak={7} 
                level={12} 
                xp={2450} 
                nextLevelXp={3000}
              />
            </div>
          </div>
        )}
        
        {activeSection !== 'dashboard' && (
          <div className="flex items-center justify-center h-[80vh]">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
              </h2>
              <p className="text-muted-foreground">
                This section is under development. Please check back later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
