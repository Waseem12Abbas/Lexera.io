import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, Circle, Clock, Award, ArrowRight, BookOpen, 
  Calculator, Sparkles, Filter, ChevronRight, AlertCircle, 
  RotateCcw, Compass, Flame, ShieldCheck, GraduationCap,
  Atom, FlaskConical, Dna, Variable, Languages
} from 'lucide-react';
import { 
  Language, Lesson, View, Subject, GradeLevel, StudentProfile 
} from '../types';
import { SINDH_BOARD_LESSONS, TRANSLATIONS } from '../constants';

interface LearningPathProps {
  language: Language;
  student?: StudentProfile;
  completedTopicIds?: string[];
  onNavigate: (view: View, lesson?: Lesson, tab?: 'read' | 'practice' | 'quiz') => void;
}

// Extra curriculum topics for Grades 11 and 12 (HSC) to guarantee complete pathways
const HSC_CURRICULUM: Record<'11' | '12', Partial<Record<Subject, Array<{
  chapterNumber: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  weightage: number;
}>>>> = {
  '11': {
    [Subject.PHYSICS]: [
      { chapterNumber: 1, title: { en: "Scope of Physics & Vectors", ur: "طبیعیات کا دائرہ کار اور ویکٹرز" }, description: { en: "Vector addition by rectangular components, scalar and vector products.", ur: "مستطیل اجزاء کے ذریعے ویکٹر کا جمع، اسکیلر اور ویکٹر ضرب۔" }, weightage: 10 },
      { chapterNumber: 2, title: { en: "Motion in Two Dimensions & Projectile", ur: "دو سمتوں میں حرکت اور پروجیکٹائل" }, description: { en: "Trajectory, height, time of flight, horizontal range of projectile.", ur: "پروجیکٹائل کا راستہ، اونچائی، پرواز کا وقت اور افقی فاصلہ۔" }, weightage: 12 },
      { chapterNumber: 3, title: { en: "Circular Motion & Gravitation", ur: "دائرہ نما حرکت اور کشش ثقل" }, description: { en: "Centripetal acceleration, angular momentum, Newton's law of gravitation.", ur: "مرکز مائل اسراع، زاویائی مومینٹم اور نیوٹن کا قانون ثقل۔" }, weightage: 11 },
      { chapterNumber: 4, title: { en: "Work, Power and Energy", ur: "کام، طاقت اور توانائی" }, description: { en: "Work done by constant and variable force, conservation of energy.", ur: "مستقل اور متغیر قوت کے ذریعے کام، توانائی کی بقا۔" }, weightage: 9 },
      { chapterNumber: 5, title: { en: "Thermodynamics & Heat Engines", ur: "تھرموڈائنامکس اور حرارتی انجن" }, description: { en: "First and second laws of thermodynamics, Carnot cycle, entropy.", ur: "پہلا اور دوسرا قانون حرکیات، کارنوٹ انجن اور اینٹروپی۔" }, weightage: 12 },
    ],
    [Subject.CHEMISTRY]: [
      { chapterNumber: 1, title: { en: "Stoichiometry & Mole Concept", ur: "اسٹوئیچیومیٹری اور مول کا تصور" }, description: { en: "Molar volume, Avogadro's number, limiting reactant, theoretical yield.", ur: "موالر والیوم، ایووگیڈرو کا عدد اور محدود عامل۔" }, weightage: 10 },
      { chapterNumber: 2, title: { en: "Atomic Structure & Quantum Numbers", ur: "ایٹمی ساخت اور کوانٹم نمبرز" }, description: { en: "Bohr's theory, Planck's quantum theory, electronic configuration.", ur: "بوہر کا نظریہ اور الیکٹرانک کنفیگریشن۔" }, weightage: 12 },
      { chapterNumber: 3, title: { en: "Chemical Bonding & Hybridization", ur: "کیمیائی بندھن اور ہائبرڈائزیشن" }, description: { en: "VSEPR theory, sp, sp2, sp3 hybridization, dipole moment.", ur: "ویسپر تھیوری، ہائبرڈائزیشن اور ڈائی پول مومینٹ۔" }, weightage: 11 },
      { chapterNumber: 4, title: { en: "Chemical Equilibrium & Le Chatelier", ur: "کیمیائی توازن اور لے شیٹلیئر اصول" }, description: { en: "Equilibrium constant Kc and Kp, shift in equilibrium, solubility product.", ur: "توازنی مستقل Kc اور توازن پر اثرات۔" }, weightage: 11 },
    ],
    [Subject.BIOLOGY]: [
      { chapterNumber: 1, title: { en: "Cell Structure & Organelles", ur: "خلیاتی ساخت اور آرگنیلز" }, description: { en: "Endoplasmic reticulum, Golgi bodies, mitochondria, nucleus ultrastructure.", ur: "مائٹوکونڈریا، گالجی باڈیز اور نیوکلیئس کی باریک ساخت۔" }, weightage: 12 },
      { chapterNumber: 2, title: { en: "Biological Molecules & Enzymes", ur: "حیاتیاتی مالیکیولز اور اینزائمز" }, description: { en: "Carbohydrates, lipids, proteins, lock-and-key and induced fit models.", ur: "کاربوہائیڈریٹس، پروٹینز اور اینزائمز کی کارکردگی۔" }, weightage: 10 },
      { chapterNumber: 3, title: { en: "Acellular Life (Viruses)", ur: "غیر خلیاتی زندگی (وائرسز)" }, description: { en: "Bacteriophage structure, lytic and lysogenic cycles, retroviruses.", ur: "بیکٹیریوفیج کی ساخت اور لائیٹک سائیکل۔" }, weightage: 9 },
    ],
    [Subject.MATH]: [
      { chapterNumber: 1, title: { en: "Complex Numbers & De Moivre's Theorem", ur: "پیچیدہ اعداد اور ڈی موئیور کا قانون" }, description: { en: "Polar form, modulus, argument, roots of complex numbers.", ur: "پولر شکل، ماڈیولس اور پیچیدہ جزر۔" }, weightage: 12 },
      { chapterNumber: 2, title: { en: "Matrices and Determinants", ur: "قالب اور مقطع (Matrices & Determinants)" }, description: { en: "Cramer's rule, adjoint method, echelon form, system of linear equations.", ur: "کریمر کا قاعدہ اور لکیری مساوات کا حل۔" }, weightage: 14 },
      { chapterNumber: 3, title: { en: "Trigonometric Identities & Functions", ur: "مثلثاتی فارمولے اور مساوات" }, description: { en: "Fundamental identities, sum and difference formulas, inverse trigonometry.", ur: "بنیادی مثلثاتی شناختیں اور معکوس فنکشنز۔" }, weightage: 14 },
    ],
    [Subject.ENGLISH]: [
      { chapterNumber: 1, title: { en: "HSC Intermediate Essays & Comprehension", ur: "مضامین اور فہم و ادراک" }, description: { en: "Argumentative essays, thematic comprehension, formal correspondence.", ur: "استدلالی مضامین اور باضابطہ مراسلت۔" }, weightage: 15 },
      { chapterNumber: 2, title: { en: "Advanced Grammar: Synthesis & Clauses", ur: "اعلیٰ گرامر اور کلازز" }, description: { en: "Compound & complex sentences, noun/adjective/adverb clauses.", ur: "مرکب جملے اور ذیلی شقیں۔" }, weightage: 15 },
    ]
  },
  '12': {
    [Subject.PHYSICS]: [
      { chapterNumber: 1, title: { en: "Electrostatics & Coulomb's Law", ur: "الیکٹرو سٹیٹکس اور کولمب کا قانون" }, description: { en: "Electric field intensity, Gauss's law applications, electric potential.", ur: "برقی میدان، گاس کا قانون اور برقی پوٹینشل۔" }, weightage: 13 },
      { chapterNumber: 2, title: { en: "Current Electricity & Kirchhoff's Rules", ur: "برقی رو اور کرچوف کے قوانین" }, description: { en: "Ohm's law, temperature coefficient of resistance, Wheatstone bridge.", ur: "اوہم کا قانون اور وہٹ اسٹون برج۔" }, weightage: 12 },
      { chapterNumber: 3, title: { en: "Electromagnetism & Faraday's Law", ur: "برق مقناطیسیت اور فیراڈے کا قانون" }, description: { en: "Lenz's law, mutual and self-inductance, AC generator.", ur: "لینز کا قانون اور اے سی جنریٹر۔" }, weightage: 14 },
      { chapterNumber: 4, title: { en: "Nuclear Physics & Radiation", ur: "نیوکلیئر فزکس اور تابکاری" }, description: { en: "Mass defect, binding energy, radioactive decay law, half-life.", ur: "کمیت کی کمی، بائنڈنگ انرجی اور نصف حیات۔" }, weightage: 11 },
    ],
    [Subject.CHEMISTRY]: [
      { chapterNumber: 1, title: { en: "Periodic Classification of Elements", ur: "عناصر کی متواتر درجہ بندی" }, description: { en: "s and p block elements, periodic trends in ionization energy and electronegativity.", ur: "ایس اور پی بلاک عناصر، آئیونائزیشن انرجی۔" }, weightage: 12 },
      { chapterNumber: 2, title: { en: "Organic Chemistry: Hydrocarbons", ur: "نامیاتی کیمیا: ہائیڈرو کاربنز" }, description: { en: "Alkanes, alkenes, alkynes, benzene resonance structure and electrophilic substitution.", ur: "الکینز، الکائنز اور بینزین کا ری ایکشن۔" }, weightage: 15 },
      { chapterNumber: 3, title: { en: "Alkyl Halides & Organometallics", ur: "الکائل ہیلائیڈز اور گرگ نارڈ ریجنٹ" }, description: { en: "SN1 and SN2 mechanisms, Grignard reagents synthesis and reactions.", ur: "SN1 اور SN2 میکانزم، گرگ نارڈ ریجنٹ۔" }, weightage: 13 },
    ],
    [Subject.BIOLOGY]: [
      { chapterNumber: 1, title: { en: "Homeostasis & Osmoregulation", ur: "ہومیوسٹاسس اور گردے کی ساخت" }, description: { en: "Kidney structure, nephron function, excretion in animals, dialyzer.", ur: "گردے کی ساخت، نیفرون کے افعال اور ڈائیلاسز۔" }, weightage: 13 },
      { chapterNumber: 2, title: { en: "Support and Locomotion", ur: "سہارا اور حرکت" }, description: { en: "Human skeletal system, joints, sliding filament model of muscle contraction.", ur: "انسانی ہڈیوں کا ڈھانچہ اور عضلات کا سکڑاؤ۔" }, weightage: 12 },
      { chapterNumber: 3, title: { en: "Genetics and DNA Replication", ur: "جینیات اور ڈی این اے ریپلیکیشن" }, description: { en: "Mendel's laws, DNA double helix, transcription and translation.", ur: "مینڈل کے قوانین، ٹرانسکرپشن اور ترجمہ۔" }, weightage: 15 },
    ],
    [Subject.MATH]: [
      { chapterNumber: 1, title: { en: "Limits and Continuity", ur: "حدود اور تسلسل (Limits & Continuity)" }, description: { en: "Limit theorems, indeterminate forms, continuity of functions.", ur: "حدود کے قضیے اور فنکشنز کا تسلسل۔" }, weightage: 12 },
      { chapterNumber: 2, title: { en: "Differentiation & Derivatives", ur: "تفرقی تفاعل (Differentiation)" }, description: { en: "Power, product, quotient and chain rules, maxima and minima.", ur: "چین رول اور انتہائی قدریں۔" }, weightage: 16 },
      { chapterNumber: 3, title: { en: "Integration & Definite Integrals", ur: "تکامل (Integration)" }, description: { en: "Integration by parts, substitution, area under curve.", ur: "حصص میں تکامل اور منحنی خطوط کا رقبہ۔" }, weightage: 16 },
    ],
    [Subject.ENGLISH]: [
      { chapterNumber: 1, title: { en: "HSC Board Precis Writing & Essays", ur: "تلخیص نگاری اور تفصیلی مضامین" }, description: { en: "Rules of precis writing, one-third summarization, title extraction.", ur: "تلخیص نگاری کے اصول، ایک تہائی خلاصہ۔" }, weightage: 15 },
      { chapterNumber: 2, title: { en: "Sindh Board Final Past Paper Analysis", ur: "سندھ بورڈ سالانہ ماڈل پرچہ" }, description: { en: "Objective MCQs, translation, grammar corrections.", ur: "معروضی سوالات اور جملوں کی درستی۔" }, weightage: 15 },
    ]
  }
};

const LearningPath: React.FC<LearningPathProps> = ({ 
  language, 
  student, 
  completedTopicIds = [], 
  onNavigate 
}) => {
  const t = TRANSLATIONS[language];

  // 1. Grade-wise Toggle State (Default to student.grade or '9')
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(student?.grade || '9');

  // 2. Subject-wise Categories State (Default to Physics)
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.PHYSICS);

  // Available subjects for the curriculum
  const subjectsList = [
    { 
      key: Subject.PHYSICS, 
      labelEn: "Physics", 
      labelUr: "طبیعیات", 
      icon: Atom,
      color: "from-blue-600 to-indigo-700",
      accent: "text-blue-500",
      bgLight: "bg-blue-50 text-blue-700 border-blue-200"
    },
    { 
      key: Subject.CHEMISTRY, 
      labelEn: "Chemistry", 
      labelUr: "کیمیا", 
      icon: FlaskConical,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-500",
      bgLight: "bg-amber-50 text-amber-700 border-amber-200"
    },
    { 
      key: Subject.BIOLOGY, 
      labelEn: "Biology", 
      labelUr: "حیاتیات", 
      icon: Dna,
      color: "from-emerald-500 to-teal-700",
      accent: "text-emerald-500",
      bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    { 
      key: Subject.MATH, 
      labelEn: "Mathematics", 
      labelUr: "ریاضی", 
      icon: Variable,
      color: "from-purple-600 to-violet-800",
      accent: "text-purple-500",
      bgLight: "bg-purple-50 text-purple-700 border-purple-200"
    },
    { 
      key: Subject.ENGLISH, 
      labelEn: "English", 
      labelUr: "انگریزی", 
      icon: Languages,
      color: "from-rose-500 to-pink-700",
      accent: "text-rose-500",
      bgLight: "bg-rose-50 text-rose-700 border-rose-200"
    }
  ];

  // Grade descriptions for context
  const gradeLabels: Record<GradeLevel, { en: string; ur: string }> = {
    '9': { en: "Grade 9 (SSC-I / نہم)", ur: "کلاس 9 (نہم)" },
    '10': { en: "Grade 10 (SSC-II / دہم)", ur: "کلاس 10 (دہم)" },
    '11': { en: "Grade 11 (HSC-I / سال اول)", ur: "کلاس 11 (سال اول)" },
    '12': { en: "Grade 12 (HSC-II / سال دوم)", ur: "کلاس 12 (سال دوم)" },
  };

  // Compile the path nodes for the selected grade and subject
  const currentPathItems = useMemo(() => {
    // 1. First search in SINDH_BOARD_LESSONS matching selected grade and subject
    const directMatches = SINDH_BOARD_LESSONS.filter(
      l => l.grade === selectedGrade && l.subject === selectedSubject
    );

    if (directMatches.length > 0) {
      return directMatches.map((l, index) => {
        const isCompleted = completedTopicIds.includes(l.id);
        const isActive = index === 0 && !isCompleted;
        return {
          id: l.id,
          chapterNumber: l.chapterNumber,
          title: l.title,
          description: l.description,
          weightage: l.weightage,
          lessonRef: l,
          status: isCompleted ? 'mastered' : (isActive ? 'active' : 'upcoming')
        };
      });
    }

    // 2. If Grade 11 or 12, use HSC curriculum
    if ((selectedGrade === '11' || selectedGrade === '12') && HSC_CURRICULUM[selectedGrade]?.[selectedSubject]) {
      const hscItems = HSC_CURRICULUM[selectedGrade][selectedSubject] || [];
      return hscItems.map((item, index) => {
        const synthesizedId = `hsc-${selectedGrade}-${selectedSubject.toLowerCase().slice(0, 3)}-${item.chapterNumber}`;
        const isCompleted = completedTopicIds.includes(synthesizedId);
        
        // Find closest template lesson for direct reading if clicked
        const templateLesson = SINDH_BOARD_LESSONS.find(l => l.subject === selectedSubject) || SINDH_BOARD_LESSONS[0];
        const synthesizedLesson: Lesson = {
          ...templateLesson,
          id: synthesizedId,
          chapterNumber: item.chapterNumber,
          grade: selectedGrade,
          subject: selectedSubject,
          title: item.title,
          description: item.description,
          weightage: item.weightage
        };

        return {
          id: synthesizedId,
          chapterNumber: item.chapterNumber,
          title: item.title,
          description: item.description,
          weightage: item.weightage,
          lessonRef: synthesizedLesson,
          status: isCompleted ? 'mastered' : (index === 0 ? 'active' : 'upcoming')
        };
      });
    }

    // 3. Fallback: filter by subject from SINDH_BOARD_LESSONS so the student always has rich topics
    const subjectLessons = SINDH_BOARD_LESSONS.filter(l => l.subject === selectedSubject);
    return subjectLessons.slice(0, 5).map((l, index) => {
      const isCompleted = completedTopicIds.includes(l.id);
      return {
        id: l.id,
        chapterNumber: index + 1,
        title: l.title,
        description: l.description,
        weightage: l.weightage,
        lessonRef: l,
        status: isCompleted ? 'mastered' : (index === 0 ? 'active' : 'upcoming')
      };
    });
  }, [selectedGrade, selectedSubject, completedTopicIds]);

  const totalTopics = currentPathItems.length;
  const masteredCount = currentPathItems.filter(i => i.status === 'mastered').length;
  const progressPercent = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0;
  const activeSubjectInfo = subjectsList.find(s => s.key === selectedSubject) || subjectsList[0];

  return (
    <div className="space-y-8 animate-fade-in pb-16 antialiased" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
      
      {/* 1. Header & Pathway Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === Language.URDU ? 'ایڈاپٹو لرننگ پاتھ وے' : 'Adaptive Learning Pathway'}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
                {language === Language.URDU 
                  ? `سبجیکٹ وائز لرننگ روڈ میپ: ${activeSubjectInfo.labelUr}` 
                  : `${activeSubjectInfo.labelEn} Learning Pathway`}
              </h1>
              <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
                {language === Language.URDU
                  ? `سندھ ٹیکسٹ بک بورڈ کے نصاب کے مطابق ${gradeLabels[selectedGrade].ur} کے لیے مرحلہ وار ابواب کا روڈ میپ۔ پہلے نوٹس پڑھیں، مشق کریں اور کوئز سے مہارت حاصل کریں۔`
                  : `Structured step-by-step syllabus mastery for ${gradeLabels[selectedGrade].en} aligned with Sindh Textbook Board (STBB). Follow the milestones to board exam excellence.`}
              </p>
            </div>

            {/* Subject Progress Summary Capsule */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shrink-0 text-center min-w-[160px]">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {language === Language.URDU ? 'سبجیکٹ پروگریس' : 'Subject Mastery'}
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 mt-1 tabular-nums">
                {progressPercent}%
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {masteredCount} / {totalTopics} {language === Language.URDU ? 'ابواب مکمل' : 'Chapters Done'}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. GRADE-WISE TOGGLE (Pill Selector) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {language === Language.URDU ? '1. گریڈ کا انتخاب کریں (Grade-wise Toggle)' : '1. Select Class / Grade Level'}
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {language === Language.URDU ? 'سندھ بورڈ نصاب' : 'Sindh Board Syllabus'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['9', '10', '11', '12'] as GradeLevel[]).map((grade) => {
            const isSelected = selectedGrade === grade;
            return (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`py-3 px-4 rounded-2xl font-bold text-xs md:text-sm transition-all flex flex-col items-center justify-center gap-1 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500 ring-offset-2'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="text-base font-extrabold">Grade {grade}</span>
                <span className="text-[11px] font-normal opacity-80">
                  {gradeLabels[grade][language]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SUBJECT-WISE CATEGORIES TOGGLE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Atom className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {language === Language.URDU ? '2. مضمون کا انتخاب کریں (Subject-wise Category)' : '2. Select Subject Pathway'}
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {language === Language.URDU ? 'تمام لازمی و اختیاری مضامین' : 'Core & Elective Streams'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {subjectsList.map((sub) => {
            const isSelected = selectedSubject === sub.key;
            const Icon = sub.icon;

            return (
              <button
                key={sub.key}
                onClick={() => setSelectedSubject(sub.key)}
                className={`p-4 rounded-2xl font-bold text-left transition-all border flex flex-col justify-between min-h-[105px] group ${
                  isSelected
                    ? 'bg-gradient-to-br text-white shadow-lg border-transparent ' + sub.color
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-700 shadow-sm'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  )}
                </div>

                <div className="mt-2">
                  <div className={`text-sm font-extrabold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {language === Language.URDU ? sub.labelUr : sub.labelEn}
                  </div>
                  <div className={`text-[10px] mt-0.5 font-medium ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                    Grade {selectedGrade} Pathway
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SUBJECT-SPECIFIC LEARNING PATH JOURNEY */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-8">
        
        {/* Pathway Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${activeSubjectInfo.bgLight}`}>
                {activeSubjectInfo.labelEn} · Grade {selectedGrade}
              </span>
              <span className="text-xs font-bold text-slate-400">Sindh Textbook Board</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
              {language === Language.URDU 
                ? `${activeSubjectInfo.labelUr} کا تعلیمی روڈ میپ (گریڈ ${selectedGrade})`
                : `${activeSubjectInfo.labelEn} Syllabus Pathway (Grade ${selectedGrade})`}
            </h2>
          </div>

          {/* Quick Legend */}
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              {language === Language.URDU ? 'مکمل شدہ' : 'Mastered'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              {language === Language.URDU ? 'موجودہ باب' : 'Active'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              {language === Language.URDU ? 'آئندہ' : 'Upcoming'}
            </span>
          </div>
        </div>

        {/* Step-by-Step Learning Path Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-1 before:bg-slate-200">
          {currentPathItems.map((item, index) => {
            const isMastered = item.status === 'mastered';
            const isActive = item.status === 'active';

            return (
              <div 
                key={item.id}
                className="relative group transition-all"
              >
                {/* Timeline node marker */}
                <div className={`absolute -left-6 sm:-left-8 top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md border-2 border-white transition-transform ${
                  isMastered 
                    ? 'bg-emerald-500 text-white' 
                    : (isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110' : 'bg-slate-200 text-slate-600')
                }`}>
                  {isMastered ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </div>

                {/* Node Content Card */}
                <div className={`p-5 md:p-6 rounded-2xl border transition-all ${
                  isMastered
                    ? 'bg-emerald-50/40 border-emerald-200/80 hover:shadow-md'
                    : (isActive 
                        ? 'bg-blue-50/40 border-blue-200 shadow-md ring-1 ring-blue-200' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm')
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Info */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                          Chapter {item.chapterNumber}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                          {item.weightage} Marks (Sindh Board)
                        </span>
                        {isMastered && (
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {language === Language.URDU ? 'مکمل مہارت' : 'Mastered'}
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center gap-1 font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full text-[11px] animate-pulse">
                            <Sparkles className="w-3.5 h-3.5" />
                            {language === Language.URDU ? 'موجودہ ہدف' : 'Current Target'}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base md:text-lg font-extrabold text-slate-900">
                        {item.title[language]}
                      </h3>

                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-3xl">
                        {item.description[language]}
                      </p>
                    </div>

                    {/* Right: Actions (Read · Practice · Quiz) */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0">
                      <button
                        onClick={() => onNavigate(View.READ_LESSON, item.lessonRef, 'read')}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        title="Read notes and theory"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === Language.URDU ? 'نوٹس پڑھیں' : 'Read Notes'}</span>
                      </button>

                      <button
                        onClick={() => onNavigate(View.READ_LESSON, item.lessonRef, 'practice')}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        title="Practice solved examples"
                      >
                        <Calculator className="w-3.5 h-3.5 text-blue-600" />
                        <span>{language === Language.URDU ? 'مشق کریں' : 'Practice'}</span>
                      </button>

                      <button
                        onClick={() => onNavigate(View.READ_LESSON, item.lessonRef, 'quiz')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                          isMastered
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                        title="Attempt quiz"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-300" />
                        <span>{language === Language.URDU ? 'کوئز دیں' : 'Take Quiz'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Pathway Recommendation Box */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-6 text-white border border-emerald-800/60 shadow-md">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-emerald-300 uppercase tracking-wide">
                {language === Language.URDU ? 'سندھ بورڈ ایڈاپٹو اسٹیٹس رہنمائی' : 'Sindh Board Academic Status Advice'}
              </h4>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                {language === Language.URDU
                  ? `${activeSubjectInfo.labelUr} (گریڈ ${selectedGrade}): اس مضمون میں اچھے نمبروں کے لیے پہلے ہر باب کے بنیادی فارمولے اور تعریفیں ذہن نشین کریں، پھر حل شدہ نمونہ سوالات کی مشق کریں۔ اگلا سنگ میل حاصل کر کے اپنے نمبرز بڑھائیں!`
                  : `Mastering ${activeSubjectInfo.labelEn} for Grade ${selectedGrade}: Allocate 45-60 minutes daily to complete Section A MCQs and worked numericals. Complete the next pending chapter in this pathway to unlock your full board exam score.`}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LearningPath;
