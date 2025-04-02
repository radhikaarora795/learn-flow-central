
// Mock data for the dashboard
export const mockUser = {
  name: 'Alex Johnson',
  avatarUrl: '',
  grade: 'Senior Year',
  learningStyle: 'Visual Learner',
  overallProgress: 68,
};

export const mockCourses = [
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

export const mockSubjects = [
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

export const mockTodos = [
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

export const mockNotifications = [
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

export const mockResources = [
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

export const mockStudySessions = [
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

export const mockFlashcards = [
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

export const mockAchievements = [
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
