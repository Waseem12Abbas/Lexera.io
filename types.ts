export enum Language {
  ENGLISH = 'en',
  URDU = 'ur'
}

export enum Subject {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  BIOLOGY = 'Biology',
  MATH = 'Mathematics',
  ENGLISH = 'English'
}

export type GradeLevel = '9' | '10' | '11' | '12';

export type StudentCategory = 'pre_engineering' | 'pre_medical';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  category: StudentCategory;
  grade: GradeLevel;
  board: string;
  avatarInitials?: string;
  joinedAt: string;
}

export interface WorkedExample {
  question: Record<Language, string>;
  solution: Record<Language, string>;
  keyTakeaway?: Record<Language, string>;
}

export interface TopicPractice {
  keyPoints: Record<Language, string>[];
  formulas?: string[];
  workedExamples: WorkedExample[];
}

export enum QuestionType {
  MCQ = 'mcq',
  NUMERICAL = 'numerical',
  SHORT_ANSWER = 'short_answer'
}

export interface Question {
  id: string;
  subject: Subject;
  topicId?: string;
  type: QuestionType;
  text: Record<Language, string>;
  options?: Record<Language, string>[];
  correctAnswer: string | number;
  explanation: Record<Language, string>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Lesson {
  id: string;
  chapterNumber: number;
  grade: GradeLevel;
  subject: Subject;
  title: Record<Language, string>;
  description: Record<Language, string>;
  content: Record<Language, string>;
  weightage: number; // Sindh Board Exam Marks
  practice: TopicPractice;
  quizQuestions: Question[];
}

export enum View {
  AUTH = 'auth',
  DASHBOARD = 'dashboard',
  LESSONS = 'lessons',
  READ_LESSON = 'read_lesson',
  AI_TUTOR = 'ai_tutor',
  ASSESSMENT = 'assessment',
  AI_COACH = 'ai_coach',
  LEARNING_PATH = 'learning_path',
  TIMETABLE = 'timetable'
}

export type PriorityLevel = 'high' | 'medium' | 'low';

export interface SubjectPriority {
  subject: Subject;
  priority: PriorityLevel;
  weeklyTargetHours: number;
}

export interface DayAvailability {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  enabled: boolean;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
}

export interface TimetableSlot {
  id: string;
  day: string;
  timeSlot: string;
  subject: Subject;
  chapterNumber?: number;
  topicTitle: Record<Language, string>;
  taskType: 'read' | 'practice' | 'quiz' | 'revision';
  completed: boolean;
  lessonId?: string;
}

export interface GeneratedTimetable {
  id: string;
  createdAt: string;
  presetName: string;
  totalWeeklyHours: number;
  slots: TimetableSlot[];
  aiAdvice?: {
    en: string;
    ur: string;
  };
}

export interface LOPerformance {
  lessonId: string;
  attempts: number;
  correct: number;
  totalQuestions: number;
  avgTimePerQuestion: number;
  lastAttemptDate: Date;
}

export enum PathNodeType {
  LESSON = 'lesson',
  PRACTICE = 'practice',
  QUIZ = 'quiz',
  MILESTONE = 'milestone'
}

export enum PathNodeStatus {
  LOCKED = 'locked',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  NEEDS_REVISION = 'needs_revision'
}

export interface PathNode {
  id: string;
  type: PathNodeType;
  status: PathNodeStatus;
  lessonId?: string;
  title: Record<Language, string>;
  subject?: Subject;
  xpReward: number;
}

export enum AssessmentMode {
  MENU = 'menu',
  SECURITY_CHECK = 'security_check',
  EXAM = 'exam',
  REPORT = 'report'
}

export interface IntegrityReport {
  score: number;
  tabSwitches: number;
  focusLostCount: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  warningsTriggered: string[];
}

export interface AIImprovementResult {
  improved_en: string;
  improved_ur: string;
  explanation_en: string;
  explanation_ur: string;
}

export interface Assignment {
  id: string;
  title: string;
  lessonId?: string;
  dueDate?: string;
  status?: string;
}

export interface Notification {
  id: string;
  title: Record<Language, string>;
  message: Record<Language, string>;
  type: 'alert' | 'info' | 'success';
  timestamp: Date;
  isRead: boolean;
  actionLabel?: Record<Language, string>;
  actionView?: View;
  actionData?: any;
}
