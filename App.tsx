import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TopicDetail from './components/TopicDetail';
import LearningPath from './components/LearningPath';
import Assessment from './components/Assessment';
import AITutor from './components/AITutor';
import AICoach from './components/AICoach';
import TimetableGenerator from './components/TimetableGenerator';
import Login from './components/Login';
import { 
  View, Language, Lesson, Subject, StudentProfile, 
  StudentCategory, GradeLevel 
} from './types';
import { SINDH_BOARD_LESSONS, TRANSLATIONS } from './constants';
import { BookOpen, Search, CheckCircle2, Calculator, ArrowRight } from 'lucide-react';

const STORAGE_KEY_PROFILE = 'lexera_student_profile';
const STORAGE_KEY_COMPLETED = 'lexera_completed_topics';
const STORAGE_KEY_LANG = 'lexera_language';

const DEFAULT_PROFILE: StudentProfile = {
  id: 'std_demo_1',
  name: 'Waseem Abbas',
  email: 'waseem.abbas@student.pk',
  category: 'pre_engineering',
  grade: '11',
  board: 'Sindh Textbook Board (STBB)',
  avatarInitials: 'WA',
  joinedAt: new Date().toISOString()
};

const App: React.FC = () => {
  // Authentication & Profile State (with LocalStorage persistence)
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Navigation & Language State
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      return (saved as Language) || Language.ENGLISH;
    } catch (e) {
      return Language.ENGLISH;
    }
  });

  // Active Selected Topic State
  const [selectedTopic, setSelectedTopic] = useState<Lesson>(SINDH_BOARD_LESSONS[0]);
  const [selectedTopicInitialTab, setSelectedTopicInitialTab] = useState<'read' | 'practice' | 'quiz'>('read');

  // Completed Topics Tracker
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      return saved ? JSON.parse(saved) : ['phy-01', 'chem-01'];
    } catch (e) {
      return ['phy-01', 'chem-01'];
    }
  });

  // Curriculum library search state
  const [librarySubjectFilter, setLibrarySubjectFilter] = useState<Subject | 'all'>('all');
  const [librarySearch, setLibrarySearch] = useState('');

  // Save profile changes to localStorage
  useEffect(() => {
    if (student) {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(student));
    } else {
      localStorage.removeItem(STORAGE_KEY_PROFILE);
    }
  }, [student]);

  // Save completed topics to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, language);
  }, [language]);

  // Auth Handlers
  const handleLogin = (profile: StudentProfile) => {
    setStudent(profile);
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setStudent(null);
    setCurrentView(View.AUTH);
  };

  const handleUpdateCategory = (newCategory: StudentCategory) => {
    if (!student) return;
    setStudent({ ...student, category: newCategory });
  };

  const handleUpdateGrade = (newGrade: GradeLevel) => {
    if (!student) return;
    setStudent({ ...student, grade: newGrade });
  };

  // Topic Navigation Handlers
  const handleSelectTopic = (topic: Lesson, tab: 'read' | 'practice' | 'quiz' = 'read') => {
    setSelectedTopic(topic);
    setSelectedTopicInitialTab(tab);
    setCurrentView(View.READ_LESSON);
  };

  const handleTopicComplete = (topicId: string, score?: number) => {
    setCompletedTopicIds(prev => prev.includes(topicId) ? prev : [...prev, topicId]);
  };

  // If not authenticated, show modern login / account creation screen
  if (!student) {
    return <Login language={language} onLogin={handleLogin} />;
  }

  // Active stream subjects for library filter
  const streamSubjects = student.category === 'pre_engineering'
    ? [Subject.PHYSICS, Subject.CHEMISTRY, Subject.MATH, Subject.ENGLISH]
    : [Subject.PHYSICS, Subject.CHEMISTRY, Subject.BIOLOGY, Subject.ENGLISH];

  const libraryLessons = SINDH_BOARD_LESSONS.filter(l => {
    const inStream = streamSubjects.includes(l.subject);
    const matchesSub = librarySubjectFilter === 'all' || l.subject === librarySubjectFilter;
    const matchesSearch = librarySearch === '' ||
      l.title[Language.ENGLISH].toLowerCase().includes(librarySearch.toLowerCase()) ||
      l.title[Language.URDU].includes(librarySearch) ||
      l.chapterNumber.toString().includes(librarySearch);
    return inStream && matchesSub && matchesSearch;
  });

  // Render content based on current view
  const renderCurrentView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return (
          <Dashboard
            key="view-dashboard"
            student={student}
            language={language}
            onSelectTopic={handleSelectTopic}
            onNavigate={setCurrentView}
            onUpdateCategory={handleUpdateCategory}
            onUpdateGrade={handleUpdateGrade}
            completedTopicIds={completedTopicIds}
          />
        );

      case View.READ_LESSON:
        return (
          <TopicDetail
            key={`view-topic-${selectedTopic.id}`}
            lesson={selectedTopic}
            language={language}
            initialTab={selectedTopicInitialTab}
            onBack={() => setCurrentView(View.DASHBOARD)}
            onTopicComplete={handleTopicComplete}
          />
        );

      case View.LESSONS:
        return (
          <div key="view-curriculum-library" className="space-y-6" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {language === Language.URDU ? 'سندھ بورڈ نصابی لائبریری' : 'Sindh Board Curriculum Library'}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  {student.category === 'pre_engineering' ? 'Pre-Engineering Stream' : 'Pre-Medical Stream'} · 10 Topics Per Subject
                </p>
              </div>

              {/* Search */}
              <div className="w-full md:w-72">
                <input
                  type="text"
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  placeholder="Search chapters or topics..."
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>
            </div>

            {/* Subject Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setLibrarySubjectFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  librarySubjectFilter === 'all'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                All Subjects
              </button>
              {streamSubjects.map((sub, idx) => (
                <button
                  key={`filter-${sub}-${idx}`}
                  onClick={() => setLibrarySubjectFilter(sub)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    librarySubjectFilter === sub
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Topic Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {libraryLessons.map((lesson, idx) => {
                const isCompleted = completedTopicIds.includes(lesson.id);

                return (
                  <div
                    key={`lib-${lesson.id}-${idx}`}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-700">{lesson.subject}</span>
                        <span className="text-slate-400 font-medium">Chapter {lesson.chapterNumber} · {lesson.weightage} Marks</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {lesson.title[language]}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {lesson.description[language]}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {isCompleted ? (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Completed
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">Not Attempted</span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSelectTopic(lesson, 'read')}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                        >
                          Read Notes
                        </button>
                        <button
                          onClick={() => handleSelectTopic(lesson, 'quiz')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case View.LEARNING_PATH:
        return (
          <LearningPath
            key="view-learning-path"
            language={language}
            student={student}
            completedTopicIds={completedTopicIds}
            onNavigate={(view, lesson, tab) => {
              if (lesson) handleSelectTopic(lesson, tab);
              else setCurrentView(view);
            }}
          />
        );

      case View.ASSESSMENT:
        return (
          <Assessment
            key="view-assessment"
            language={language}
            student={student}
            onExit={() => setCurrentView(View.DASHBOARD)}
          />
        );

      case View.AI_TUTOR:
        return (
          <AITutor key="view-ai-tutor" language={language} />
        );

      case View.AI_COACH:
        return (
          <AICoach
            key="view-ai-coach"
            language={language}
            onNavigate={(view, lesson) => {
              if (lesson) handleSelectTopic(lesson);
              else setCurrentView(view);
            }}
          />
        );

      case View.TIMETABLE:
        return (
          <TimetableGenerator
            key="view-timetable"
            student={student}
            language={language}
            onSelectTopic={handleSelectTopic}
            onNavigate={setCurrentView}
            completedTopicIds={completedTopicIds}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout
      currentView={currentView}
      language={language}
      student={student}
      onViewChange={setCurrentView}
      onLanguageChange={setLanguage}
      onLogout={handleLogout}
    >
      {renderCurrentView()}
    </Layout>
  );
};

export default App;