import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Calculator, CheckCircle2, Award, Zap, 
  ArrowRight, Sparkles, Search, Filter, ShieldCheck, 
  Cpu, Stethoscope, ChevronRight, BarChart2, BookMarked,
  Calendar
} from 'lucide-react';
import { 
  StudentProfile, StudentCategory, GradeLevel, Subject, 
  Lesson, Language, View 
} from '../types';
import { TRANSLATIONS, SINDH_BOARD_LESSONS } from '../constants';

interface DashboardProps {
  student: StudentProfile;
  language: Language;
  onSelectTopic: (topic: Lesson, tab?: 'read' | 'practice' | 'quiz') => void;
  onNavigate: (view: View) => void;
  onUpdateCategory: (cat: StudentCategory) => void;
  onUpdateGrade: (grade: GradeLevel) => void;
  completedTopicIds: string[];
}

const Dashboard: React.FC<DashboardProps> = ({
  student,
  language,
  onSelectTopic,
  onNavigate,
  onUpdateCategory,
  onUpdateGrade,
  completedTopicIds
}) => {
  const t = TRANSLATIONS[language];

  // Subjects for the active student category
  const activeStreamSubjects = useMemo(() => {
    if (student.category === 'pre_engineering') {
      return [Subject.PHYSICS, Subject.CHEMISTRY, Subject.MATH, Subject.ENGLISH];
    } else {
      return [Subject.PHYSICS, Subject.CHEMISTRY, Subject.BIOLOGY, Subject.ENGLISH];
    }
  }, [student.category]);

  // Lessons filtered by active category stream
  const streamLessons = useMemo(() => {
    return SINDH_BOARD_LESSONS.filter(lesson => activeStreamSubjects.includes(lesson.subject));
  }, [activeStreamSubjects]);

  const totalStreamTopics = streamLessons.length;
  const completedCount = streamLessons.filter(l => completedTopicIds.includes(l.id)).length;
  const streamProgressPercent = totalStreamTopics > 0 ? Math.round((completedCount / totalStreamTopics) * 100) : 0;

  return (
    <div className="space-y-8 antialiased" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
      
      {/* 1. Personalized Student Portal Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl text-white relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          
          {/* Top metadata tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{student.board}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">Grade {student.grade} (SSC / HSC)</span>
            </div>

            {/* Stream Switcher Quick Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => onUpdateCategory('pre_engineering')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  student.category === 'pre_engineering'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Pre-Engineering</span>
              </button>

              <button
                onClick={() => onUpdateCategory('pre_medical')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  student.category === 'pre_medical'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Pre-Medical</span>
              </button>
            </div>
          </div>

          {/* Student Welcome Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                {language === Language.URDU ? 'اسٹوڈنٹ ڈیش بورڈ' : 'Student Learning Portal'}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                {t.welcome}, <span className="text-emerald-400">{student.name}</span>!
              </h1>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {language === Language.URDU
                  ? `آپ کا تعلیمی شعبہ: ${student.category === 'pre_engineering' ? 'پری انجینئرنگ' : 'پری میڈیکل'} (گریڈ ${student.grade})۔ 10-10 مکمل ابواب برائے سندھ ٹیکسٹ بک بورڈ۔`
                  : `Your academic track: ${student.category === 'pre_engineering' ? 'Pre-Engineering (Maths, Physics, Chem, English)' : 'Pre-Medical (Biology, Physics, Chem, English)'} for Grade ${student.grade}.`}
              </p>
            </div>

            {/* Grade Level Selector Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              {(['9', '10', '11', '12'] as GradeLevel[]).map((g) => (
                <button
                  key={g}
                  onClick={() => onUpdateGrade(g)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    student.grade === g
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Gr {g}
                </button>
              ))}
            </div>
          </div>

          {/* Key KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Stream Topics</div>
              <div className="text-2xl font-extrabold text-white mt-1 tabular-nums">
                {totalStreamTopics} <span className="text-xs font-normal text-slate-400">Chapters</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Mastered Topics</div>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1 tabular-nums">
                {completedCount} <span className="text-xs font-normal text-slate-400">({streamProgressPercent}%)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Board Exam Target</div>
              <div className="text-2xl font-extrabold text-white mt-1 tabular-nums">
                92/100 <span className="text-xs font-normal text-emerald-400">A+ Grade</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Study Streak</div>
              <div className="text-2xl font-extrabold text-amber-400 mt-1 tabular-nums">
                5 Days <span className="text-xs font-normal text-slate-400">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Stream Subject Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {language === Language.URDU ? 'آپ کے مضامین (10-10 ابواب)' : 'Your Stream Subjects (10 Topics Each)'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">Sindh Textbook Board (STBB)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeStreamSubjects.map((sub) => {
            const subjectLessons = SINDH_BOARD_LESSONS.filter(l => l.subject === sub);
            const subCompleted = subjectLessons.filter(l => completedTopicIds.includes(l.id)).length;
            const subPercent = Math.round((subCompleted / subjectLessons.length) * 100);

            return (
              <div
                key={sub}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      10 Topics
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Sindh Board</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-1">
                    {sub}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    {sub === Subject.PHYSICS && "Mechanics, Heat, Electricity & Optics"}
                    {sub === Subject.CHEMISTRY && "Atomic Structure, Bonding, Solutions & Acids"}
                    {sub === Subject.BIOLOGY && "Cells, Mitosis, Enzymes & Human Systems"}
                    {sub === Subject.MATH && "Complex Numbers, Matrices, Trigonometry"}
                    {sub === Subject.ENGLISH && "Grammar, Comprehension, Voice & Precis"}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-bold text-slate-800 tabular-nums">{subCompleted}/10 ({subPercent}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                    <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${subPercent}%` }}></div>
                  </div>

                  <button
                    onClick={() => onNavigate(View.LEARNING_PATH)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{language === Language.URDU ? 'سبجیکٹ روڈ میپ دیکھیں' : 'View Subject Pathway'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Portal Features Grid (AI Tutor, Timetable, Learning Path, Assessments) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate(View.TIMETABLE)}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-amber-50 text-amber-600 mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
              {language === Language.URDU ? 'اسٹڈی ٹائم ٹیبل جنریٹر' : 'Study Timetable Generator'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
              {language === Language.URDU 
                ? 'اپنی روزانہ کی دستیابی اور مضامین کی ترجیحات درج کریں اور سمارٹ شیڈول بنائیں۔' 
                : 'Input your daily study availability and subject priorities to generate a customized schedule.'}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
            <span>{language === Language.URDU ? 'شیڈول بنائیں' : 'Create Schedule'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        <div 
          onClick={() => onNavigate(View.AI_TUTOR)}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {language === Language.URDU ? 'سندھ بورڈ AI ٹیوٹر' : 'Sindh Board AI Tutor'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
              {language === Language.URDU 
                ? 'اردو اور انگلش میں حسابی سوالات اور نظریاتی تصورات کی فوری وضاحت حاصل کریں۔'
                : 'Get instant bilingual answers for any high school numerical or theoretical concept.'}
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <span>{language === Language.URDU ? 'ٹیوٹر کھولیں' : 'Launch AI Tutor'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        <div 
          onClick={() => onNavigate(View.LEARNING_PATH)}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-blue-50 text-blue-600 mb-4">
              <BookMarked className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
              {language === Language.URDU ? 'تعلیمی روڈ میپ' : 'Topic Roadmap'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
              {language === Language.URDU
                ? 'اپنے منتخب کردہ شعبے اور گریڈ کے تمام 10 ابواب کا تصویری روڈ میپ دیکھیں۔'
                : 'Personalized visual journey through all 10 topics of your selected stream and grade.'}
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
            <span>{language === Language.URDU ? 'روڈ میپ دیکھیں' : 'View Roadmap'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        <div 
          onClick={() => onNavigate(View.ASSESSMENT)}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
              {language === Language.URDU ? 'سندھ بورڈ موک امتحانات' : 'Sindh Board Mock Exams'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
              {language === Language.URDU
                ? 'وقت کی پابندی کے ساتھ بورڈ امتحانی ماک ٹیسٹ اور تفصیلی تشخیصی رپورٹ۔'
                : 'Timed board exam simulations with detailed score reports and topic breakdowns.'}
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
            <span>{language === Language.URDU ? 'امتحان شروع کریں' : 'Start Assessment'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
