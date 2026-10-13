import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Clock, CheckCircle2, Circle, Sparkles, 
  RotateCcw, Sliders, ChevronRight, BookOpen, AlertCircle, 
  Download, Printer, ArrowRight, ShieldCheck, Check,
  Cpu, Stethoscope, BarChart3, Flame, HelpCircle, Layers
} from 'lucide-react';
import { 
  Language, Subject, StudentProfile, Lesson, 
  PriorityLevel, SubjectPriority, DayAvailability, 
  TimetableSlot, GeneratedTimetable, View 
} from '../types';
import { SINDH_BOARD_LESSONS, TRANSLATIONS } from '../constants';

interface TimetableGeneratorProps {
  student: StudentProfile;
  language: Language;
  onSelectTopic: (topic: Lesson, tab?: 'read' | 'practice' | 'quiz') => void;
  onNavigate: (view: View) => void;
  completedTopicIds?: string[];
}

const STORAGE_KEY_TIMETABLE = 'lexera_student_timetable';

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
] as const;

type DayName = typeof DAYS_OF_WEEK[number];

const DAY_URDU_MAP: Record<DayName, string> = {
  Monday: 'پیر (Monday)',
  Tuesday: 'منگل (Tuesday)',
  Wednesday: 'بدھ (Wednesday)',
  Thursday: 'جمعرات (Thursday)',
  Friday: 'جمعہ (Friday)',
  Saturday: 'ہفتہ (Saturday)',
  Sunday: 'اتوار (Sunday)'
};

const DEFAULT_DAYS_AVAILABILITY: DayAvailability[] = [
  { day: 'Monday', enabled: true, startTime: '16:00', endTime: '20:00', slotDurationMinutes: 60 },
  { day: 'Tuesday', enabled: true, startTime: '16:00', endTime: '20:00', slotDurationMinutes: 60 },
  { day: 'Wednesday', enabled: true, startTime: '16:00', endTime: '20:00', slotDurationMinutes: 60 },
  { day: 'Thursday', enabled: true, startTime: '16:00', endTime: '20:00', slotDurationMinutes: 60 },
  { day: 'Friday', enabled: true, startTime: '15:00', endTime: '19:00', slotDurationMinutes: 60 },
  { day: 'Saturday', enabled: true, startTime: '10:00', endTime: '16:00', slotDurationMinutes: 60 },
  { day: 'Sunday', enabled: true, startTime: '10:00', endTime: '14:00', slotDurationMinutes: 60 },
];

export const TimetableGenerator: React.FC<TimetableGeneratorProps> = ({
  student,
  language,
  onSelectTopic,
  onNavigate,
  completedTopicIds = []
}) => {
  const t = TRANSLATIONS[language];

  // Subjects based on active student stream
  const streamSubjects = useMemo(() => {
    if (student.category === 'pre_engineering') {
      return [Subject.PHYSICS, Subject.CHEMISTRY, Subject.MATH, Subject.ENGLISH];
    } else {
      return [Subject.PHYSICS, Subject.CHEMISTRY, Subject.BIOLOGY, Subject.ENGLISH];
    }
  }, [student.category]);

  // Initial subject priorities
  const defaultPriorities: SubjectPriority[] = useMemo(() => {
    return streamSubjects.map(sub => {
      let priority: PriorityLevel = 'medium';
      let targetHours = 5;

      if (sub === Subject.PHYSICS || sub === Subject.MATH || sub === Subject.BIOLOGY) {
        priority = 'high';
        targetHours = 7;
      } else if (sub === Subject.ENGLISH) {
        priority = 'low';
        targetHours = 3;
      }

      return {
        subject: sub,
        priority,
        weeklyTargetHours: targetHours
      };
    });
  }, [streamSubjects]);

  // State: Configuration inputs
  const [availability, setAvailability] = useState<DayAvailability[]>(DEFAULT_DAYS_AVAILABILITY);
  const [priorities, setPriorities] = useState<SubjectPriority[]>(defaultPriorities);
  const [slotDuration, setSlotDuration] = useState<number>(60); // 45, 60, 90 mins
  const [breakDuration, setBreakDuration] = useState<number>(10); // mins
  const [selectedFocusChapters, setSelectedFocusChapters] = useState<Record<Subject, string[]>>({
    [Subject.PHYSICS]: [],
    [Subject.CHEMISTRY]: [],
    [Subject.BIOLOGY]: [],
    [Subject.MATH]: [],
    [Subject.ENGLISH]: []
  });

  // State: Generated timetable
  const [timetable, setTimetable] = useState<GeneratedTimetable | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TIMETABLE);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Active view tab: 'schedule' | 'configure'
  const [activeTab, setActiveTab] = useState<'schedule' | 'configure'>(() => {
    return timetable ? 'schedule' : 'configure';
  });

  // Filter day in schedule view: 'all' | DayName
  const [selectedFilterDay, setSelectedFilterDay] = useState<string>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<Subject | 'all'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Sync priorities when stream changes
  useEffect(() => {
    setPriorities(defaultPriorities);
  }, [defaultPriorities]);

  // Persist timetable
  useEffect(() => {
    if (timetable) {
      localStorage.setItem(STORAGE_KEY_TIMETABLE, JSON.stringify(timetable));
    } else {
      localStorage.removeItem(STORAGE_KEY_TIMETABLE);
    }
  }, [timetable]);

  // Calculate total weekly available hours from settings
  const totalWeeklyHoursCalculated = useMemo(() => {
    return availability.reduce((acc, day) => {
      if (!day.enabled) return acc;
      const [startH, startM] = day.startTime.split(':').map(Number);
      const [endH, endM] = day.endTime.split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;
      const diffMinutes = Math.max(0, endMinutes - startMinutes);
      return acc + (diffMinutes / 60);
    }, 0);
  }, [availability]);

  // Quick preset handlers
  const applyPreset = (presetType: 'intensive' | 'balanced' | 'weekend') => {
    if (presetType === 'intensive') {
      setSlotDuration(60);
      setBreakDuration(10);
      setAvailability(DAYS_OF_WEEK.map(day => ({
        day,
        enabled: true,
        startTime: day === 'Saturday' || day === 'Sunday' ? '09:00' : '15:30',
        endTime: day === 'Saturday' || day === 'Sunday' ? '18:00' : '21:30',
        slotDurationMinutes: 60
      })));
      setPriorities(streamSubjects.map(sub => ({
        subject: sub,
        priority: (sub === Subject.PHYSICS || sub === Subject.MATH || sub === Subject.BIOLOGY) ? 'high' : 'medium',
        weeklyTargetHours: (sub === Subject.PHYSICS || sub === Subject.MATH || sub === Subject.BIOLOGY) ? 8 : 5
      })));
    } else if (presetType === 'balanced') {
      setSlotDuration(45);
      setBreakDuration(15);
      setAvailability(DAYS_OF_WEEK.map(day => ({
        day,
        enabled: day !== 'Sunday',
        startTime: '16:00',
        endTime: '19:30',
        slotDurationMinutes: 45
      })));
      setPriorities(streamSubjects.map(sub => ({
        subject: sub,
        priority: sub === Subject.ENGLISH ? 'low' : 'medium',
        weeklyTargetHours: sub === Subject.ENGLISH ? 3 : 5
      })));
    } else if (presetType === 'weekend') {
      setSlotDuration(60);
      setBreakDuration(10);
      setAvailability(DAYS_OF_WEEK.map(day => {
        const isWeekend = day === 'Saturday' || day === 'Sunday';
        return {
          day,
          enabled: true,
          startTime: isWeekend ? '09:00' : '18:00',
          endTime: isWeekend ? '17:00' : '20:30',
          slotDurationMinutes: 60
        };
      }));
    }
  };

  // Toggle single day
  const handleToggleDay = (dayName: DayName) => {
    setAvailability(prev => prev.map(d => d.day === dayName ? { ...d, enabled: !d.enabled } : d));
  };

  // Update day time
  const handleDayTimeChange = (dayName: DayName, field: 'startTime' | 'endTime', value: string) => {
    setAvailability(prev => prev.map(d => d.day === dayName ? { ...d, [field]: value } : d));
  };

  // Update priority
  const handlePriorityChange = (subject: Subject, priority: PriorityLevel) => {
    setPriorities(prev => prev.map(p => {
      if (p.subject === subject) {
        const hours = priority === 'high' ? 8 : priority === 'medium' ? 5 : 3;
        return { ...p, priority, weeklyTargetHours: hours };
      }
      return p;
    }));
  };

  // Update hours
  const handleHoursChange = (subject: Subject, hours: number) => {
    setPriorities(prev => prev.map(p => p.subject === subject ? { ...p, weeklyTargetHours: Math.max(1, hours) } : p));
  };

  // Toggle chapter focus
  const handleToggleFocusChapter = (subject: Subject, topicId: string) => {
    setSelectedFocusChapters(prev => {
      const current = prev[subject] || [];
      const updated = current.includes(topicId) 
        ? current.filter(id => id !== topicId)
        : [...current, topicId];
      return { ...prev, [subject]: updated };
    });
  };

  // Generator algorithm
  const handleGenerateSchedule = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const slots: TimetableSlot[] = [];

      // Weight multiplier based on priority
      const priorityWeights: Record<PriorityLevel, number> = {
        high: 3,
        medium: 2,
        low: 1
      };

      // Create subject pool with weighted frequency
      const subjectPool: Subject[] = [];
      priorities.forEach(p => {
        const weight = priorityWeights[p.priority];
        for (let i = 0; i < weight; i++) {
          subjectPool.push(p.subject);
        }
      });

      // Task types rotation
      const taskCycle: ('read' | 'practice' | 'quiz' | 'revision')[] = [
        'read', 'practice', 'quiz', 'read', 'practice', 'revision'
      ];

      let poolIndex = 0;
      let taskIndex = 0;
      let slotCounter = 0;

      // Group lessons by subject
      const lessonsBySubject: Record<Subject, Lesson[]> = {
        [Subject.PHYSICS]: SINDH_BOARD_LESSONS.filter(l => l.subject === Subject.PHYSICS),
        [Subject.CHEMISTRY]: SINDH_BOARD_LESSONS.filter(l => l.subject === Subject.CHEMISTRY),
        [Subject.BIOLOGY]: SINDH_BOARD_LESSONS.filter(l => l.subject === Subject.BIOLOGY),
        [Subject.MATH]: SINDH_BOARD_LESSONS.filter(l => l.subject === Subject.MATH),
        [Subject.ENGLISH]: SINDH_BOARD_LESSONS.filter(l => l.subject === Subject.ENGLISH),
      };

      // Index pointer for rotating through chapters per subject
      const subjectTopicPointer: Record<Subject, number> = {
        [Subject.PHYSICS]: 0,
        [Subject.CHEMISTRY]: 0,
        [Subject.BIOLOGY]: 0,
        [Subject.MATH]: 0,
        [Subject.ENGLISH]: 0,
      };

      availability.forEach(dayConfig => {
        if (!dayConfig.enabled) return;

        const [startH, startM] = dayConfig.startTime.split(':').map(Number);
        const [endH, endM] = dayConfig.endTime.split(':').map(Number);
        let currentMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;

        while (currentMinutes + slotDuration <= endMinutes) {
          const slotStartH = Math.floor(currentMinutes / 60);
          const slotStartM = currentMinutes % 60;
          const slotEndMinutes = currentMinutes + slotDuration;
          const slotEndH = Math.floor(slotEndMinutes / 60);
          const slotEndM = slotEndMinutes % 60;

          const formatTime = (h: number, m: number) => {
            const period = h >= 12 ? 'PM' : 'AM';
            const displayH = h % 12 === 0 ? 12 : h % 12;
            const displayM = m.toString().padStart(2, '0');
            return `${displayH}:${displayM} ${period}`;
          };

          const timeSlotString = `${formatTime(slotStartH, slotStartM)} - ${formatTime(slotEndH, slotEndM)}`;

          // Pick subject
          const chosenSubject = subjectPool[poolIndex % subjectPool.length];
          poolIndex++;

          // Pick task type
          const chosenTask = taskCycle[taskIndex % taskCycle.length];
          taskIndex++;

          // Pick topic for that subject (check focus preferences first)
          const allSubjectTopics = lessonsBySubject[chosenSubject] || [];
          const focusedIds = selectedFocusChapters[chosenSubject] || [];
          let chosenLesson: Lesson | undefined;

          if (focusedIds.length > 0) {
            const focusedTopics = allSubjectTopics.filter(l => focusedIds.includes(l.id));
            if (focusedTopics.length > 0) {
              const ptr = subjectTopicPointer[chosenSubject] % focusedTopics.length;
              chosenLesson = focusedTopics[ptr];
            }
          }

          if (!chosenLesson && allSubjectTopics.length > 0) {
            const ptr = subjectTopicPointer[chosenSubject] % allSubjectTopics.length;
            chosenLesson = allSubjectTopics[ptr];
          }

          subjectTopicPointer[chosenSubject]++;
          slotCounter++;

          slots.push({
            id: `slot-${dayConfig.day}-${slotCounter}-${Date.now()}`,
            day: dayConfig.day,
            timeSlot: timeSlotString,
            subject: chosenSubject,
            chapterNumber: chosenLesson?.chapterNumber,
            topicTitle: chosenLesson ? chosenLesson.title : {
              [Language.ENGLISH]: `${chosenSubject} Core Chapter`,
              [Language.URDU]: `${chosenSubject} کا بنیادی باب`
            },
            taskType: chosenTask,
            completed: false,
            lessonId: chosenLesson?.id
          });

          // Advance time by slot duration + break
          currentMinutes += slotDuration + breakDuration;
        }
      });

      // Stream-specific AI coaching advice
      const adviceEn = student.category === 'pre_engineering'
        ? `STBB Pre-Engineering Strategy: High concentration of slots allocated to Physics mechanics & Mathematics formulas during peak evening focus periods. Use the 10-minute break to mentally digest derivations before moving into solved examples.`
        : `STBB Pre-Medical Strategy: Prime focus given to Biology diagrams & Chemistry reactions. Alternate between reading theory notes and self-testing with topic quizzes to maximize recall for Sindh Board MCQs.`;

      const adviceUr = student.category === 'pre_engineering'
        ? `سندھ بورڈ پری انجینئرنگ حکمت عملی: فزکس اور ریاضی کے حسابی سوالات کو زیادہ وقت دیا گیا ہے۔ 10 منٹ کے وقفے کو ذہن کو تازہ دم رکھنے کے لیے استعمال کریں اور ہر فارمولے کی مشق ضرور کریں۔`
        : `سندھ بورڈ پری میڈیکل حکمت عملی: حیاتیات (Biology) کی ڈایاگرامز اور کیمسٹری کے کیمیائی فارمولوں پر خصوصی توجہ دی گئی ہے۔ نوٹس پڑھنے کے بعد فورا کوئز حل کریں تاکہ امتحانی تیاری پختہ ہو۔`;

      const newTimetable: GeneratedTimetable = {
        id: `tt-${Date.now()}`,
        createdAt: new Date().toISOString(),
        presetName: `${student.category === 'pre_engineering' ? 'Pre-Engineering' : 'Pre-Medical'} Board Schedule`,
        totalWeeklyHours: Math.round((slots.length * slotDuration) / 60),
        slots,
        aiAdvice: {
          en: adviceEn,
          ur: adviceUr
        }
      };

      setTimetable(newTimetable);
      setActiveTab('schedule');
      setIsGenerating(false);
    }, 600);
  };

  // Toggle slot completion
  const handleToggleSlotCompleted = (slotId: string) => {
    if (!timetable) return;
    setTimetable(prev => {
      if (!prev) return null;
      const updatedSlots = prev.slots.map(s => s.id === slotId ? { ...s, completed: !s.completed } : s);
      return { ...prev, slots: updatedSlots };
    });
  };

  // Handle slot action click (jump to read, practice, or quiz)
  const handleSlotAction = (slot: TimetableSlot) => {
    let lessonToOpen: Lesson | undefined;
    if (slot.lessonId) {
      lessonToOpen = SINDH_BOARD_LESSONS.find(l => l.id === slot.lessonId);
    }
    if (!lessonToOpen) {
      lessonToOpen = SINDH_BOARD_LESSONS.find(l => l.subject === slot.subject);
    }

    if (lessonToOpen) {
      const tab = slot.taskType === 'quiz' ? 'quiz' : slot.taskType === 'practice' ? 'practice' : 'read';
      onSelectTopic(lessonToOpen, tab);
    }
  };

  // Filtered slots for schedule display
  const displayedSlots = useMemo(() => {
    if (!timetable) return [];
    return timetable.slots.filter(s => {
      const matchesDay = selectedFilterDay === 'all' || s.day === selectedFilterDay;
      const matchesSub = selectedSubjectFilter === 'all' || s.subject === selectedSubjectFilter;
      return matchesDay && matchesSub;
    });
  }, [timetable, selectedFilterDay, selectedSubjectFilter]);

  // Overall schedule stats
  const totalSlots = timetable?.slots.length || 0;
  const completedSlots = timetable?.slots.filter(s => s.completed).length || 0;
  const completionPercent = totalSlots > 0 ? Math.round((completedSlots / totalSlots) * 100) : 0;

  // Color helpers
  const getSubjectColor = (subject: Subject) => {
    switch (subject) {
      case Subject.PHYSICS: return 'text-blue-700 bg-blue-50 border-blue-200';
      case Subject.CHEMISTRY: return 'text-amber-700 bg-amber-50 border-amber-200';
      case Subject.BIOLOGY: return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case Subject.MATH: return 'text-purple-700 bg-purple-50 border-purple-200';
      case Subject.ENGLISH: return 'text-teal-700 bg-teal-50 border-teal-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getTaskBadge = (taskType: TimetableSlot['taskType']) => {
    switch (taskType) {
      case 'read':
        return { label: language === Language.URDU ? 'نوٹس پڑھیں' : 'Read Theory', color: 'bg-blue-100 text-blue-800' };
      case 'practice':
        return { label: language === Language.URDU ? 'مسائل حل کریں' : 'Practice Numericals', color: 'bg-emerald-100 text-emerald-800' };
      case 'quiz':
        return { label: language === Language.URDU ? 'کوئز حل کریں' : 'Topic Quiz', color: 'bg-purple-100 text-purple-800' };
      case 'revision':
        return { label: language === Language.URDU ? 'دہرائی (Revision)' : 'Revision', color: 'bg-amber-100 text-amber-800' };
    }
  };

  return (
    <div className="space-y-8 antialiased" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
      
      {/* 1. Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Calendar className="w-4 h-4" />
              <span>Sindh Textbook Board (STBB)</span>
              <span className="text-slate-600">·</span>
              <span>{student.category === 'pre_engineering' ? 'Pre-Engineering Track' : 'Pre-Medical Track'}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              {language === Language.URDU ? 'اسٹڈی ٹائم ٹیبل جنریٹر' : 'Study Timetable Generator'}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === Language.URDU
                ? 'اپنی روزانہ کی دستیابی اور مضامین کی ترجیحات درج کریں، سسٹم خودکار طریقے سے سندھ بورڈ کے ابواب پر مشتمل جامع اسٹڈی شیڈول تیار کرے گا۔'
                : 'Input your daily available study hours and subject priority levels to generate an intelligent, topic-aligned weekly study routine for board exams.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab(activeTab === 'schedule' && timetable ? 'configure' : 'schedule')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'configure'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{activeTab === 'configure' ? (language === Language.URDU ? 'شیڈول دیکھیں' : 'View Schedule') : (language === Language.URDU ? 'ترجیحات تبدیل کریں' : 'Edit Availability & Priorities')}</span>
            </button>

            {timetable && (
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Print Timetable"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">{language === Language.URDU ? 'پرنٹ کریں' : 'Print'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Schedule KPI Summary if generated */}
        {timetable && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{language === Language.URDU ? 'ہفتہ وار وقت' : 'Weekly Capacity'}</span>
              <div className="text-xl font-bold text-white tabular-nums mt-0.5">{timetable.totalWeeklyHours} hrs</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{language === Language.URDU ? 'کل سیشنز' : 'Total Sessions'}</span>
              <div className="text-xl font-bold text-white tabular-nums mt-0.5">{totalSlots} slots</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{language === Language.URDU ? 'مکمل شدہ سیشنز' : 'Completed'}</span>
              <div className="text-xl font-bold text-emerald-400 tabular-nums mt-0.5">{completedSlots}/{totalSlots} ({completionPercent}%)</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{language === Language.URDU ? 'سیشن کی مدت' : 'Slot Duration'}</span>
              <div className="text-xl font-bold text-amber-400 tabular-nums mt-0.5">{slotDuration} mins</div>
            </div>
          </div>
        )}
      </div>

      {/* 2. TAB CONTENT: CONFIGURE INPUTS vs SCHEDULE VIEW */}
      {activeTab === 'configure' || !timetable ? (
        <div className="space-y-8">
          
          {/* Preset Strategy Selector */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {language === Language.URDU ? 'فوری حکمت عملی منتخب کریں (Quick Presets)' : 'Select Study Strategy Preset'}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === Language.URDU ? 'ایک کلک پر امتحانی یا متوازن روٹین لاگو کریں' : 'Apply pre-configured study routines tailored for Sindh Board preparations'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => applyPreset('intensive')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                    {language === Language.URDU ? 'امتحانی کرینچ' : 'Board Exam Intensive'}
                  </span>
                  <Flame className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                  {language === Language.URDU ? 'سخت اور گہرا شیڈول (4-5 گھنٹے/روزانہ)' : 'High Intensity Routine (4-5 hrs/day)'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {language === Language.URDU ? 'فزکس اور ریاضی/بائیولوجی کے حسابی سوالات پر زیادہ فوکس' : 'Maximum focus on high-weightage numericals and past papers across all 7 days'}
                </p>
              </button>

              <button
                onClick={() => applyPreset('balanced')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-lg">
                    {language === Language.URDU ? 'متوازن معمول' : 'Balanced Routine'}
                  </span>
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                  {language === Language.URDU ? 'متوازن پڑھائی (2-3 گھنٹے/روزانہ)' : 'Steady Pace (2.5-3 hrs/day)'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {language === Language.URDU ? '45 منٹ کے پومودورو سیشنز اور باقاعدہ وقفوں کے ساتھ' : 'Mon-Sat schedule with 45 min pomodoro slots and healthy 15 min rest intervals'}
                </p>
              </button>

              <button
                onClick={() => applyPreset('weekend')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-lg">
                    {language === Language.URDU ? 'ہفتہ اور اتوار خصوصی' : 'Weekend Deep-Dive'}
                  </span>
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700">
                  {language === Language.URDU ? 'ہفتہ کے دن ہلکا، ویک اینڈ پر مکمل مطالعہ' : 'Light Weekdays + Heavy Weekends'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {language === Language.URDU ? 'کالج کے بعد شام کی مختصر پڑھائی اور ویک اینڈ پر طویل سیشنز' : 'Ideal for students attending college or coaching centers during the week'}
                </p>
              </button>
            </div>
          </div>

          {/* Section 1: Daily Availability Input */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    {language === Language.URDU ? '1. روزانہ کی دستیابی اور اوقات' : '1. Daily Availability & Study Windows'}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {language === Language.URDU ? 'ہفتے کے جن دنوں میں آپ پڑھ سکتے ہیں ان کے شروع اور اختتام کا وقت سیٹ کریں۔' : 'Select active study days and specify your available time window for each day.'}
                </p>
              </div>

              {/* Slot Duration & Break Duration Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">
                    {language === Language.URDU ? 'سیشن کا وقت:' : 'Slot:'}
                  </span>
                  <select
                    value={slotDuration}
                    onChange={(e) => setSlotDuration(Number(e.target.value))}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={45}>45 Minutes (Pomodoro)</option>
                    <option value={60}>60 Minutes (Standard)</option>
                    <option value={90}>90 Minutes (Deep Session)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">
                    {language === Language.URDU ? 'وقفہ:' : 'Break:'}
                  </span>
                  <select
                    value={breakDuration}
                    onChange={(e) => setBreakDuration(Number(e.target.value))}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={5}>5 mins</option>
                    <option value={10}>10 mins</option>
                    <option value={15}>15 mins</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Days Table / Grid */}
            <div className="space-y-3">
              {availability.map((dayItem) => {
                const dayLabel = language === Language.URDU ? DAY_URDU_MAP[dayItem.day] : dayItem.day;
                
                // Calculate hours for this day
                const [sH, sM] = dayItem.startTime.split(':').map(Number);
                const [eH, eM] = dayItem.endTime.split(':').map(Number);
                const dayMinutes = Math.max(0, (eH * 60 + eM) - (sH * 60 + sM));
                const dayHours = (dayMinutes / 60).toFixed(1);
                const estimatedSlots = Math.floor(dayMinutes / (slotDuration + breakDuration));

                return (
                  <div
                    key={dayItem.day}
                    className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      dayItem.enabled 
                        ? 'bg-slate-50/70 border-slate-200' 
                        : 'bg-slate-100/50 border-slate-200/60 opacity-60'
                    }`}
                  >
                    {/* Day toggle */}
                    <div className="flex items-center gap-3 min-w-[160px]">
                      <button
                        type="button"
                        onClick={() => handleToggleDay(dayItem.day)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          dayItem.enabled ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {dayItem.enabled ? <Check className="w-4 h-4" /> : null}
                      </button>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{dayLabel}</span>
                        <span className="text-[11px] text-slate-500">
                          {dayItem.enabled ? `${dayHours} hrs available (~${estimatedSlots} slots)` : 'Day Off / Rest'}
                        </span>
                      </div>
                    </div>

                    {/* Time Window Inputs */}
                    {dayItem.enabled ? (
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">{language === Language.URDU ? 'شروع:' : 'From:'}</span>
                          <input
                            type="time"
                            value={dayItem.startTime}
                            onChange={(e) => handleDayTimeChange(dayItem.day, 'startTime', e.target.value)}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                          />
                        </div>

                        <span className="text-slate-400 text-xs">→</span>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">{language === Language.URDU ? 'ختم:' : 'To:'}</span>
                          <input
                            type="time"
                            value={dayItem.endTime}
                            onChange={(e) => handleDayTimeChange(dayItem.day, 'endTime', e.target.value)}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs font-semibold text-slate-400 italic">
                        {language === Language.URDU ? 'اس دن کوئی مطالعہ شیڈول نہیں ہوگا' : 'No study sessions scheduled for this day'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total Weekly Hours Note */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
              <span className="font-bold">
                {language === Language.URDU ? 'کل ہفتہ وار پڑھائی کی گنجائش:' : 'Total Calculated Weekly Study Capacity:'}
              </span>
              <span className="font-extrabold text-sm text-emerald-800 tabular-nums">
                {totalWeeklyHoursCalculated.toFixed(1)} Hours / Week
              </span>
            </div>
          </div>

          {/* Section 2: Subject Priorities & Target Chapter Focus */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  {language === Language.URDU ? '2. مضامین کی ترجیحات اور ہدف ابواب' : '2. Subject Priorities & Target Chapters'}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {language === Language.URDU
                  ? 'جن مضامین میں آپ کو زیادہ وقت درکار ہے انہیں "High" پر رکھیں۔ اس مضمون کو زیادہ سیشنز ملیں گے۔'
                  : 'Assign priority levels (High, Medium, Low) to subjects. High-priority subjects receive greater slot share and prime hours.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priorities.map((item) => {
                const subjectLessons = SINDH_BOARD_LESSONS.filter(l => l.subject === item.subject);
                const focusedIds = selectedFocusChapters[item.subject] || [];

                return (
                  <div
                    key={item.subject}
                    className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                          {student.category === 'pre_engineering' ? 'Pre-Engineering' : 'Pre-Medical'}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                          {item.subject}
                        </h3>
                      </div>

                      {/* Priority Selector Pills */}
                      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                        {(['high', 'medium', 'low'] as PriorityLevel[]).map((level) => {
                          const isSelected = item.priority === level;
                          const label = level === 'high' 
                            ? (language === Language.URDU ? 'اعلیٰ' : 'High')
                            : level === 'medium'
                            ? (language === Language.URDU ? 'درمیانہ' : 'Medium')
                            : (language === Language.URDU ? 'کم' : 'Low');

                          return (
                            <button
                              key={level}
                              type="button"
                              onClick={() => handlePriorityChange(item.subject, level)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                isSelected
                                  ? level === 'high'
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : level === 'medium'
                                    ? 'bg-amber-600 text-white shadow-xs'
                                    : 'bg-slate-700 text-white shadow-xs'
                                  : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Target hours slider */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">
                          {language === Language.URDU ? 'ہدف گھنٹے فی ہفتہ:' : 'Target Hours / Week:'}
                        </span>
                        <span className="font-bold text-slate-900 tabular-nums">{item.weeklyTargetHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={15}
                        value={item.weeklyTargetHours}
                        onChange={(e) => handleHoursChange(item.subject, Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    {/* Target chapter selector (from 10 Sindh Board topics) */}
                    <div className="pt-2 border-t border-slate-200/80">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-700">
                          {language === Language.URDU ? 'ترجیحی ابواب (اختیاری):' : 'Prioritize Specific Chapters:'}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {focusedIds.length > 0 ? `${focusedIds.length} selected` : 'All 10 chapters'}
                        </span>
                      </div>

                      <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                        {subjectLessons.map(lesson => {
                          const isChecked = focusedIds.includes(lesson.id);
                          return (
                            <label
                              key={lesson.id}
                              className={`flex items-center gap-2 p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                                isChecked ? 'bg-emerald-100/60 font-semibold text-emerald-950' : 'bg-white hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleFocusChapter(item.subject, lesson.id)}
                                className="rounded text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="truncate">
                                Ch {lesson.chapterNumber}: {lesson.title[language]}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Generate Action Bar */}
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">
                {language === Language.URDU ? 'کیا آپ شیڈول تیار کرنے کے لیے تیار ہیں؟' : 'Ready to Generate Your Schedule?'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === Language.URDU
                  ? 'سسٹم خودکار طریقے سے فزکس، کیمسٹری، ریاضی/بائیولوجی اور انگریزی کے سیشنز کو ترتیب دے گا۔'
                  : 'The intelligent generator balances high-priority topics with theory, worked numericals, and quizzes.'}
              </p>
            </div>

            <button
              onClick={handleGenerateSchedule}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{language === Language.URDU ? 'شیڈول تیار کیا جا رہا ہے...' : 'Generating Schedule...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{language === Language.URDU ? 'نیا ٹائم ٹیبل بنائیں' : 'Generate Suggested Timetable'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* 3. TAB CONTENT: GENERATED TIMETABLE VIEW */
        <div className="space-y-6">

          {/* AI Strategy Advice Card */}
          {timetable.aiAdvice && (
            <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-start gap-4 shadow-xs">
              <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {language === Language.URDU ? 'اسٹیٹس اور امتحانی مشیر کی خصوصی رہنمائی' : 'Sindh Board Academic Status Advice'}
                </h3>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {timetable.aiAdvice[language]}
                </p>
              </div>
            </div>
          )}

          {/* Schedule Controls & Filters */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {language === Language.URDU ? 'ہفتہ وار اسٹڈی شیڈول' : 'Weekly Study Schedule'}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === Language.URDU
                    ? 'کسی بھی سیشن کے سامنے والے بٹن پر کلک کر کے براہ راست نوٹس پڑھیں یا کوئز دیں۔'
                    : 'Click any session to jump directly into the textbook lesson, practice examples, or topic quiz.'}
                </p>
              </div>

              {/* Progress pill & regenerate */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800 tabular-nums">
                    {completedSlots} / {totalSlots} {language === Language.URDU ? 'مکمل' : 'Done'}
                  </div>
                  <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${completionPercent}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={handleGenerateSchedule}
                  disabled={isGenerating}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  title="Reshuffle schedule"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === Language.URDU ? 'دوبارہ ترتیب دیں' : 'Reshuffle'}</span>
                </button>
              </div>
            </div>

            {/* Day Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedFilterDay('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedFilterDay === 'all'
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {language === Language.URDU ? 'تمام ایام (All Week)' : 'All Week'}
              </button>

              {DAYS_OF_WEEK.map(dayName => {
                const countForDay = timetable.slots.filter(s => s.day === dayName).length;
                if (countForDay === 0) return null;
                const isSelected = selectedFilterDay === dayName;
                const label = language === Language.URDU ? dayName : dayName;

                return (
                  <button
                    key={dayName}
                    onClick={() => setSelectedFilterDay(dayName)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200 text-slate-600'}`}>
                      {countForDay}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Subject Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                {language === Language.URDU ? 'مضمون:' : 'Subject:'}
              </span>
              <button
                onClick={() => setSelectedSubjectFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubjectFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All
              </button>
              {streamSubjects.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubjectFilter(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedSubjectFilter === sub ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Timetable Slot Cards List */}
          {displayedSlots.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800">
                {language === Language.URDU ? 'اس فلٹر کے تحت کوئی سیشن موجود نہیں' : 'No study sessions match this filter'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === Language.URDU ? 'تمام دن یا دیگر مضامین منتخب کریں۔' : 'Select "All Week" or choose a different subject filter above.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedSlots.map((slot, index) => {
                const subColorClass = getSubjectColor(slot.subject);
                const taskBadge = getTaskBadge(slot.taskType);

                return (
                  <div
                    key={slot.id}
                    className={`bg-white rounded-2xl p-4 md:p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      slot.completed 
                        ? 'border-emerald-300 bg-emerald-50/20 shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Left: Complete toggle + Time slot & Day */}
                    <div className="flex items-start sm:items-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleSlotCompleted(slot.id)}
                        className={`mt-0.5 sm:mt-0 p-1.5 rounded-xl transition-colors ${
                          slot.completed 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-slate-100 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={slot.completed ? "Mark pending" : "Mark completed"}
                      >
                        {slot.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                            {slot.day}
                          </span>
                          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 tabular-nums">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {slot.timeSlot}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${subColorClass}`}>
                            {slot.subject}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${taskBadge.color}`}>
                            {taskBadge.label}
                          </span>
                        </div>

                        {/* Chapter and title */}
                        <div className="text-sm font-bold text-slate-900 pt-0.5">
                          {slot.chapterNumber && (
                            <span className="text-slate-500 font-medium mr-1.5">
                              Chapter {slot.chapterNumber}:
                            </span>
                          )}
                          <span className={slot.completed ? 'line-through text-slate-500' : ''}>
                            {slot.topicTitle[language]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Direct Study Link button */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleSlotAction(slot)}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>
                          {slot.taskType === 'quiz' 
                            ? (language === Language.URDU ? 'کوئز دیں' : 'Start Quiz')
                            : slot.taskType === 'practice'
                            ? (language === Language.URDU ? 'مشق کریں' : 'Practice Numericals')
                            : (language === Language.URDU ? 'نوٹس پڑھیں' : 'Study Notes')}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Reset / Clear Schedule option */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500">
            <span>
              {language === Language.URDU ? 'شیڈول خودکار طور پر محفوظ رہتا ہے' : 'Timetable is automatically saved to your browser.'}
            </span>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset your timetable?')) {
                  setTimetable(null);
                  setActiveTab('configure');
                }
              }}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              {language === Language.URDU ? 'شیڈول صاف کریں اور نیا بنائیں' : 'Reset & Reconfigure'}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default TimetableGenerator;
