
// Dashboard Types
export interface User {
  name: string;
  avatarUrl: string;
  grade: string;
  learningStyle: string;
  overallProgress: number;
}

export interface Course {
  id: string;
  name: string;
  progress: number;
  nextClass: string;
  deadlines: Deadline[];
}

export interface Deadline {
  title: string;
  date: string;
  type: 'assignment' | 'exam' | 'project';
}

export interface Subject {
  subject: string;
  mastery: number;
  timeSpent: number;
  recentGrades: RecentGrade[];
  skills: Skill[];
}

export interface RecentGrade {
  title: string;
  score: string;
  date: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Todo {
  id: string;
  title: string;
  due: string;
  completed: boolean;
  course: string;
  type: 'assignment' | 'reading' | 'quiz' | 'exam' | 'project';
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: 'deadline' | 'feedback' | 'update';
}

export interface Resource {
  id: string;
  title: string;
  source: string;
  type: 'video' | 'article' | 'practice';
  relevantSubject: string;
  saved: boolean;
  url: string;
}

export interface StudySession {
  id: string;
  subject: string;
  time: string;
  duration: number;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  icon: 'award' | 'star' | 'flame';
}

export interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  soundEffects: boolean;
  soundVolume: number;
  focusTime: number;
  breakTime: number;
}
