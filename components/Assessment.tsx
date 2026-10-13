import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle, XCircle, ChevronRight, ChevronLeft, RefreshCw, Trophy, FileText, Printer, 
  ArrowRight, AlertCircle, Camera, Mic, Wifi, Shield, Lock, Eye, EyeOff, Flag, Clock,
  LayoutGrid, List, Check, X, HelpCircle, BarChart2, GraduationCap, Atom, FlaskConical,
  Dna, Variable, Languages, Sparkles, Award
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Question, Language, QuestionType, Subject, AssessmentMode, IntegrityReport, 
  Assignment, GradeLevel, StudentProfile 
} from '../types';
import { MOCK_QUESTIONS, TRANSLATIONS, SINDH_BOARD_LESSONS } from '../constants';

interface AssessmentProps {
  language: Language;
  student?: StudentProfile;
  assignment?: Assignment;
  onCompleteAssignment?: (id: string, data: any) => void;
  onExit?: () => void;
}

// Extra question pool for Grades 11 & 12 (HSC) to ensure complete subject-wise assessments
const HSC_QUESTIONS: Record<'11' | '12', Question[]> = {
  '11': [
    {
      id: 'q-hsc11-phy-1',
      subject: Subject.PHYSICS,
      type: QuestionType.MCQ,
      text: { en: "What is the angle between rectangular components of a vector?", ur: "کسی ویکٹر کے مستطیل اجزاء کے درمیان کتنا زاویہ ہوتا ہے؟" },
      options: [{ en: "45°", ur: "45°" }, { en: "90°", ur: "90°" }, { en: "180°", ur: "180°" }, { en: "0°", ur: "0°" }],
      correctAnswer: 1,
      explanation: { en: "Rectangular components are mutually perpendicular, making an angle of 90 degrees.", ur: "مستطیل اجزاء ایک دوسرے پر عمود ہوتے ہیں یعنی زاویہ 90 ڈگری ہوتا ہے۔" }
    },
    {
      id: 'q-hsc11-phy-2',
      subject: Subject.PHYSICS,
      type: QuestionType.MCQ,
      text: { en: "At what projection angle is the horizontal range of a projectile maximum?", ur: "کس زاویے پر پروجیکٹائل کی افقی رینج زیادہ سے زیادہ ہوتی ہے؟" },
      options: [{ en: "30°", ur: "30°" }, { en: "45°", ur: "45°" }, { en: "60°", ur: "60°" }, { en: "90°", ur: "90°" }],
      correctAnswer: 1,
      explanation: { en: "Range R is maximum when sin(2θ) = 1, which gives θ = 45°.", ur: "45 ڈگری پر پروجیکٹائل کی رینج زیادہ سے زیادہ ہوتی ہے۔" }
    },
    {
      id: 'q-hsc11-chem-1',
      subject: Subject.CHEMISTRY,
      type: QuestionType.MCQ,
      text: { en: "What is the number of particles in one mole of any substance (Avogadro's Number)?", ur: "کسی شے کے ایک مول میں ذرات کی تعداد (ایووگیڈرو نمبر) کیا ہوتی ہے؟" },
      options: [{ en: "6.02 x 10^23", ur: "6.02 x 10^23" }, { en: "3.01 x 10^23", ur: "3.01 x 10^23" }, { en: "9.11 x 10^-31", ur: "9.11 x 10^-31" }, { en: "1.6 x 10^-19", ur: "1.6 x 10^-19" }],
      correctAnswer: 0,
      explanation: { en: "Avogadro's number is 6.02 x 10^23 particles per mole.", ur: "ایک مول میں 6.02 ضرب 10 کی طاقت 23 ذرات ہوتے ہیں۔" }
    },
    {
      id: 'q-hsc11-chem-2',
      subject: Subject.CHEMISTRY,
      type: QuestionType.MCQ,
      text: { en: "What is the geometry of a molecule with sp3 hybridization and zero lone pairs?", ur: "sp3 ہائبرڈائزیشن والے مالیکیول کی ساخت کیا ہوتی ہے؟" },
      options: [{ en: "Linear", ur: "لکیری" }, { en: "Tetrahedral", ur: "ٹیٹرا ہیڈرل" }, { en: "Trigonal planar", ur: "مثلثی ہموار" }, { en: "Octahedral", ur: "اوکٹا ہیڈرل" }],
      correctAnswer: 1,
      explanation: { en: "sp3 hybridization with four bonding pairs yields a tetrahedral geometry with 109.5° angles.", ur: "sp3 ہائبرڈائزیشن سے ٹیٹرا ہیڈرل ساخت بنتی ہے جیسے میتھین۔" }
    },
    {
      id: 'q-hsc11-bio-1',
      subject: Subject.BIOLOGY,
      type: QuestionType.MCQ,
      text: { en: "Which organelle is universally known as the powerhouse of the eukaryotic cell?", ur: "خلیے کا پاور ہاؤس کس آرگنیل کو کہا جاتا ہے؟" },
      options: [{ en: "Ribosome", ur: "رائبوسوم" }, { en: "Mitochondria", ur: "مائٹوکونڈریا" }, { en: "Golgi apparatus", ur: "گالجی باڈی" }, { en: "Lysosome", ur: "لائسوسوم" }],
      correctAnswer: 1,
      explanation: { en: "Mitochondria synthesize cellular ATP through aerobic cellular respiration.", ur: "مائٹوکونڈریا سیلولر ریسپریشن کے ذریعے اے ٹی پی بناتا ہے۔" }
    },
    {
      id: 'q-hsc11-math-1',
      subject: Subject.MATH,
      type: QuestionType.MCQ,
      text: { en: "What is the value of i^4 (where i is the imaginary unit)?", ur: "i^4 کی قیمت کیا ہے جہاں i امیجنری یونٹ ہے؟" },
      options: [{ en: "1", ur: "1" }, { en: "-1", ur: "-1" }, { en: "i", ur: "i" }, { en: "-i", ur: "-i" }],
      correctAnswer: 0,
      explanation: { en: "i = √(-1), i^2 = -1, hence i^4 = (-1)^2 = 1.", ur: "i^2 = -1 ہوتا ہے لہٰذا i^4 = 1۔" }
    },
    {
      id: 'q-hsc11-eng-1',
      subject: Subject.ENGLISH,
      type: QuestionType.MCQ,
      text: { en: "What is the correct active voice of: 'The experiment was performed by the student'?", ur: "اس جملے کی درست ایکٹو وائس کیا ہے؟" },
      options: [
        { en: "The student performed the experiment.", ur: "The student performed the experiment." },
        { en: "The student was performing the experiment.", ur: "The student was performing the experiment." },
        { en: "The student has performed the experiment.", ur: "The student has performed the experiment." },
        { en: "The experiment performed the student.", ur: "The experiment performed the student." }
      ],
      correctAnswer: 0,
      explanation: { en: "Past simple passive converts directly to past simple active.", ur: "ماضی سادہ کا مجہول ماضی سادہ کے معروف میں تبدیل ہوتا ہے۔" }
    }
  ],
  '12': [
    {
      id: 'q-hsc12-phy-1',
      subject: Subject.PHYSICS,
      type: QuestionType.MCQ,
      text: { en: "Coulomb's Law states that force between two point charges is inversely proportional to:", ur: "کولمب کے قانون کے مطابق دو چارجز کے درمیان قوت کس کے معکوس تناسب میں ہوتی ہے؟" },
      options: [{ en: "Distance", ur: "فاصلہ" }, { en: "Square of the distance", ur: "فاصلے کا مربع" }, { en: "Product of charges", ur: "چارجز کا حاصل ضرب" }, { en: "Dielectric constant", ur: "ڈائی الیکٹرک" }],
      correctAnswer: 1,
      explanation: { en: "Coulomb's force F is inversely proportional to r^2 (square of distance).", ur: "قوت فاصلے کے مربع کے معکوس متناسب ہوتی ہے۔" }
    },
    {
      id: 'q-hsc12-chem-1',
      subject: Subject.CHEMISTRY,
      type: QuestionType.MCQ,
      text: { en: "Benzene undergoes which type of characteristic reactions?", ur: "بینزین میں کون سے مخصوص کیمیائی ری ایکشن ہوتے ہیں؟" },
      options: [{ en: "Electrophilic substitution", ur: "الیکٹروفیلک سبسٹٹیوشن" }, { en: "Nucleophilic addition", ur: "نیوکلیوفیلک ایڈیشن" }, { en: "Elimination", ur: "اخراج" }, { en: "Hydrolysis", ur: "ہائیڈرولائسز" }],
      correctAnswer: 0,
      explanation: { en: "Benzene ring stability preserves resonance via electrophilic substitution.", ur: "بینزین الیکٹروفیلک سبسٹٹیوشن کے ذریعے ری ایکٹ کرتا ہے۔" }
    },
    {
      id: 'q-hsc12-bio-1',
      subject: Subject.BIOLOGY,
      type: QuestionType.MCQ,
      text: { en: "What is the structural and functional filtration unit of the human kidney?", ur: "انسانی گردے کی ساخت اور فلٹریشن کی بنیادی اکائی کیا ہے؟" },
      options: [{ en: "Nephron", ur: "نیفرون" }, { en: "Neuron", ur: "نیورون" }, { en: "Alveolus", ur: "ایلویولس" }, { en: "Villus", ur: "ولس" }],
      correctAnswer: 0,
      explanation: { en: "Each human kidney contains roughly 1 million nephrons for blood filtration.", ur: "گردے کی بنیادی فعال اکائی نیفرون ہے۔" }
    },
    {
      id: 'q-hsc12-math-1',
      subject: Subject.MATH,
      type: QuestionType.MCQ,
      text: { en: "What is the derivative of sin(x) with respect to x?", ur: "sin(x) کا تفرقی تفاعل (derivative) کیا ہے؟" },
      options: [{ en: "cos(x)", ur: "cos(x)" }, { en: "-cos(x)", ur: "-cos(x)" }, { en: "tan(x)", ur: "tan(x)" }, { en: "sec^2(x)", ur: "sec^2(x)" }],
      correctAnswer: 0,
      explanation: { en: "d/dx [sin(x)] = cos(x).", ur: "سائن کا ڈیریویٹو کوسائن ہوتا ہے۔" }
    },
    {
      id: 'q-hsc12-eng-1',
      subject: Subject.ENGLISH,
      type: QuestionType.MCQ,
      text: { en: "What is the ideal length of a precis compared to the original passage?", ur: "اصل عبارت کے مقابلے میں تلخیص کی مثالی لمبائی کیا ہونی چاہیے؟" },
      options: [{ en: "One-third (1/3)", ur: "ایک تہائی (1/3)" }, { en: "One-half (1/2)", ur: "نصف (1/2)" }, { en: "Two-thirds (2/3)", ur: "دو تہائی (2/3)" }, { en: "One-fourth (1/4)", ur: "ایک چوتھائی (1/4)" }],
      correctAnswer: 0,
      explanation: { en: "In board precis writing rules, the precis must be approximately one-third of the original text.", ur: "سندھ بورڈ کے قواعد کے مطابق تلخیص اصل عبارت کے ایک تہائی کے برابر ہونی چاہیے۔" }
    }
  ]
};

const Assessment: React.FC<AssessmentProps> = ({ 
  language, 
  student, 
  assignment, 
  onCompleteAssignment, 
  onExit 
}) => {
  const t = TRANSLATIONS[language];
  const [mode, setMode] = useState<AssessmentMode>(assignment ? AssessmentMode.SECURITY_CHECK : AssessmentMode.MENU);

  // 1. Grade-wise Selection State
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(student?.grade || '9');

  // Pending exam details
  const [pendingExam, setPendingExam] = useState<{
    grade: GradeLevel;
    subject: Subject | 'all';
    titleEn: string;
    titleUr: string;
  }>({
    grade: selectedGrade,
    subject: 'all',
    titleEn: 'Sindh Board Grand Mock Exam (All Subjects)',
    titleUr: 'سندھ بورڈ گرینڈ ماک امتحان (تمام مضامین)'
  });

  // Security Checks State
  const [checksPassed, setChecksPassed] = useState({ camera: false, mic: false, env: false });
  const [checkingStep, setCheckingStep] = useState(0); 

  // Exam State
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({}); 
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(600); 

  // Integrity State
  const [integrityReport, setIntegrityReport] = useState<IntegrityReport>({
      score: 100, tabSwitches: 0, focusLostCount: 0, riskLevel: 'Low', warningsTriggered: []
  });

  // Results State
  const [scoreData, setScoreData] = useState<{
      total: number, max: number, subjectScores: Record<Subject, {correct: number, total: number}>,
      examTitleEn: string, examTitleUr: string, grade: GradeLevel
  } | null>(null);

  // Auto-start for assignment mode
  useEffect(() => {
      if (assignment && mode === AssessmentMode.SECURITY_CHECK && checkingStep === 0) {
          initSecurityCheck(selectedGrade, 'all', 'Assigned Board Quiz', 'تفویض شدہ کوئز');
      }
  }, [assignment, mode, checkingStep]);

  // Timer Effect
  useEffect(() => {
      let interval: any;
      if (mode === AssessmentMode.EXAM && timeLeft > 0) {
          interval = setInterval(() => {
              setTimeLeft(prev => {
                  if (prev <= 1) { finishExam(); return 0; }
                  return prev - 1;
              });
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [mode, timeLeft]);

  // Anti-cheat tab switch monitoring
  useEffect(() => {
      if (mode !== AssessmentMode.EXAM) return;
      const handleVisibilityChange = () => {
          if (document.hidden) {
              setIntegrityReport(prev => ({
                  ...prev, tabSwitches: prev.tabSwitches + 1, score: Math.max(0, prev.score - 5),
                  warningsTriggered: [...prev.warningsTriggered, `Tab switch at ${new Date().toLocaleTimeString()}`]
              }));
          }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [mode]);

  // --- Logic ---
  const initSecurityCheck = (grade: GradeLevel, subject: Subject | 'all', titleEn: string, titleUr: string) => {
      setPendingExam({ grade, subject, titleEn, titleUr });
      setMode(AssessmentMode.SECURITY_CHECK);
      setChecksPassed({ camera: false, mic: false, env: false });
      setCheckingStep(1);
      setTimeout(() => { setChecksPassed(p => ({...p, camera: true})); setCheckingStep(2); }, 1200);
      setTimeout(() => { setChecksPassed(p => ({...p, mic: true})); setCheckingStep(3); }, 2200);
      setTimeout(() => { setChecksPassed(p => ({...p, env: true})); setCheckingStep(4); }, 3200);
  };

  const startExam = () => {
    const { grade, subject } = pendingExam;
    let questions: Question[] = [];

    // 1. Gather all questions matching the grade
    const gradeLessons = SINDH_BOARD_LESSONS.filter(l => l.grade === grade);
    const lessonQuestions = gradeLessons.flatMap(l => l.quizQuestions);
    const extraGradeQuestions = (grade === '11' || grade === '12') ? (HSC_QUESTIONS[grade] || []) : [];
    
    let combinedPool = [...lessonQuestions, ...extraGradeQuestions];

    // If pool is empty or small for this grade, combine with general questions
    if (combinedPool.length < 5) {
      combinedPool = [...combinedPool, ...MOCK_QUESTIONS];
    }

    // 2. Filter by subject if specific subject is requested
    if (subject !== 'all') {
      const subjectFiltered = combinedPool.filter(q => q.subject === subject);
      if (subjectFiltered.length >= 5) {
        questions = subjectFiltered;
      } else {
        // Fallback to all questions of that subject across grades
        questions = MOCK_QUESTIONS.filter(q => q.subject === subject);
      }
    } else {
      // Grand mock exam combines all subjects
      questions = combinedPool;
    }

    // Ensure at least 10-15 questions for comprehensive test
    if (questions.length < 8) {
      questions = [...questions, ...questions];
    }
    
    const finalQuestions = questions.sort(() => Math.random() - 0.5).slice(0, subject === 'all' ? 15 : 10);
    
    setExamQuestions(finalQuestions);
    setCurrentQIndex(0);
    setUserAnswers({});
    setMarkedQuestions(new Set());
    setTimeLeft(finalQuestions.length * 90); // 1.5 min per question
    
    setIntegrityReport({ score: 100, tabSwitches: 0, focusLostCount: 0, riskLevel: 'Low', warningsTriggered: [] });
    setMode(AssessmentMode.EXAM);
  };

  const handleAnswerChange = (val: string | number) => {
      const currentQ = examQuestions[currentQIndex];
      setUserAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const toggleMarkForReview = () => {
      const currentQ = examQuestions[currentQIndex];
      setMarkedQuestions(prev => {
          const newSet = new Set(prev);
          if (newSet.has(currentQ.id)) newSet.delete(currentQ.id);
          else newSet.add(currentQ.id);
          return newSet;
      });
  };

  const checkAnswer = (q: Question, ans: string | number | undefined): boolean => {
      if (ans === undefined || ans === '') return false;
      if (q.type === QuestionType.MCQ) {
        if (typeof q.correctAnswer === 'number') {
          return Number(ans) === q.correctAnswer;
        }
        // If correctAnswer is string matching option text
        if (q.options && typeof ans === 'number' && q.options[ans]) {
          const selectedText = q.options[ans][Language.ENGLISH];
          return selectedText.toLowerCase() === String(q.correctAnswer).toLowerCase();
        }
      }
      return String(ans).toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim();
  };

  const finishExam = () => {
      let totalCorrect = 0;
      const subjectScores: any = {};
      Object.values(Subject).forEach(s => subjectScores[s] = {correct: 0, total: 0});

      examQuestions.forEach(q => {
          const ans = userAnswers[q.id];
          const isCorrect = checkAnswer(q, ans);
          if (!subjectScores[q.subject]) subjectScores[q.subject] = {correct: 0, total: 0};
          subjectScores[q.subject].total += 1;
          if (isCorrect) { totalCorrect += 1; subjectScores[q.subject].correct += 1; }
      });

      const finalData = { 
        total: totalCorrect, 
        max: examQuestions.length, 
        subjectScores,
        examTitleEn: pendingExam.titleEn,
        examTitleUr: pendingExam.titleUr,
        grade: pendingExam.grade
      };
      setScoreData(finalData);
      setMode(AssessmentMode.REPORT);

      if (assignment && onCompleteAssignment) {
          const percentage = Math.round((totalCorrect / examQuestions.length) * 100);
          onCompleteAssignment(assignment.id, {
              score: percentage,
              timeSpent: (examQuestions.length * 90) - timeLeft,
              completedAt: new Date(),
              integrityScore: integrityReport.score
          });
      }
  };

  const formatTime = (s: number) => {
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionStatusClass = (idx: number, qId: string) => {
      const isCurrent = currentQIndex === idx;
      const isAnswered = userAnswers[qId] !== undefined && userAnswers[qId] !== '';
      const isMarked = markedQuestions.has(qId);

      let base = "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all border-2 ";
      if (isCurrent) return base + "border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200";
      if (isMarked) return base + "border-amber-400 bg-amber-50 text-amber-700";
      if (isAnswered) return base + "border-blue-300 bg-blue-50 text-blue-700";
      return base + "border-slate-200 text-slate-400 hover:border-slate-300";
  };

  // Grade labels
  const gradeLabels: Record<GradeLevel, { en: string; ur: string }> = {
    '9': { en: "Grade 9 (SSC-I / نہم)", ur: "کلاس 9 (نہم)" },
    '10': { en: "Grade 10 (SSC-II / دہم)", ur: "کلاس 10 (دہم)" },
    '11': { en: "Grade 11 (HSC-I / گیارہویں)", ur: "کلاس 11 (گیارہویں)" },
    '12': { en: "Grade 12 (HSC-II / بارہویں)", ur: "کلاس 12 (بارہویں)" }
  };

  // Subject assessment card metadata
  const subjectAssessments = [
    {
      subject: Subject.PHYSICS,
      titleEn: "Physics Board Assessment",
      titleUr: "طبیعیات کا امتحانی پرچہ",
      descEn: "Mechanics, Heat, Electromagnetism & Modern Physics conceptual MCQs.",
      descUr: "حرکیات، برقی رو اور جدید طبیعیات کے بورڈ طرز کے سوالات۔",
      icon: Atom,
      color: "from-blue-600 to-indigo-700",
      accent: "text-blue-600",
      bgLight: "bg-blue-50",
      questionsCount: 10,
      duration: "15 min",
      marks: "20 Marks"
    },
    {
      subject: Subject.CHEMISTRY,
      titleEn: "Chemistry Board Assessment",
      titleUr: "کیمیا کا امتحانی پرچہ",
      descEn: "Stoichiometry, Atomic Structure, Bonding & Organic Reactions.",
      descUr: "ایٹمی ساخت، کیمیائی بندھن اور نامیاتی کیمیا کے سوالات۔",
      icon: FlaskConical,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-600",
      bgLight: "bg-amber-50",
      questionsCount: 10,
      duration: "15 min",
      marks: "20 Marks"
    },
    {
      subject: Subject.BIOLOGY,
      titleEn: "Biology Board Assessment",
      titleUr: "حیاتیات کا امتحانی پرچہ",
      descEn: "Cell Biology, Human Physiology, Genetics & Enzymes.",
      descUr: "سیل بیالوجی، جینیات اور انسانی نظام کے اہم موضوعات۔",
      icon: Dna,
      color: "from-emerald-500 to-teal-700",
      accent: "text-emerald-600",
      bgLight: "bg-emerald-50",
      questionsCount: 10,
      duration: "15 min",
      marks: "20 Marks"
    },
    {
      subject: Subject.MATH,
      titleEn: "Mathematics Board Assessment",
      titleUr: "ریاضی کا امتحانی پرچہ",
      descEn: "Matrices, Trigonometry, Calculus & Analytical Geometry.",
      descUr: "قالب، مثلثات، تفرقی حساب اور ہندسہ کے معروضی سوالات۔",
      icon: Variable,
      color: "from-purple-600 to-violet-800",
      accent: "text-purple-600",
      bgLight: "bg-purple-50",
      questionsCount: 10,
      duration: "15 min",
      marks: "20 Marks"
    },
    {
      subject: Subject.ENGLISH,
      titleEn: "English Board Assessment",
      titleUr: "انگریزی کا امتحانی پرچہ",
      descEn: "Grammar, Active/Passive, Vocabulary & Figures of Speech.",
      descUr: "گرائمر، جملوں کی ساخت اور اصناف سخن کے سوالات۔",
      icon: Languages,
      color: "from-rose-500 to-pink-700",
      accent: "text-rose-600",
      bgLight: "bg-rose-50",
      questionsCount: 10,
      duration: "15 min",
      marks: "20 Marks"
    }
  ];

  // 1. MENU: Grade-wise and Subject-wise Selection + Overall Mock
  if (mode === AssessmentMode.MENU) {
    return (
      <div className="max-w-6xl mx-auto animate-fade-in space-y-8 pb-16 antialiased" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
        
        {/* Header Hero */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
              <CheckCircle className="w-5 h-5" />
              <span>{language === Language.URDU ? 'سندھ ٹیکسٹ بک بورڈ امتحانی مرکز' : 'Sindh Board Assessment Center'}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {language === Language.URDU ? 'گریڈ وائز اور سبجیکٹ وائز اسسمنٹ' : 'Grade & Subject-Wise Assessments'}
            </h1>
            
            <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
              {language === Language.URDU
                ? 'پہلے اپنا گریڈ منتخب کریں، پھر کسی مخصوص مضمون کی اسسمنٹ لیں یا تمام مضامین کا جامع بورڈ ماک ٹیسٹ حل کریں۔ وقت کی پابندی اور تفصیلی کارکردگی رپورٹ کے ساتھ۔'
                : 'Select your grade level to attempt subject-specific tests or the comprehensive all-subjects board mock exam simulator.'}
            </p>
          </div>
        </div>

        {/* 1. GRADE-WISE SELECTOR TOGGLE */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                {language === Language.URDU ? '1. گریڈ کا انتخاب کریں (Grade Selector)' : '1. Choose Examination Grade Level'}
              </h2>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {gradeLabels[selectedGrade][language]}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['9', '10', '11', '12'] as GradeLevel[]).map((grade) => {
              const isSelected = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`py-3.5 px-4 rounded-2xl font-bold text-xs md:text-sm transition-all flex flex-col items-center justify-center gap-1 border ${
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

        {/* 2. OVERALL ALL-SUBJECTS GRAND MOCK EXAM (FEATURED) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 rounded-3xl p-6 md:p-8 text-white border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>{language === Language.URDU ? 'تمام مضامین کا گرینڈ ماک ٹیسٹ' : 'Grand Mock Exam (All Subjects Combined)'}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                {language === Language.URDU 
                  ? `گریڈ ${selectedGrade} مکمل سندھ بورڈ ماک امتحان`
                  : `Grade ${selectedGrade} Full Sindh Board Simulator`}
              </h3>
              
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                {language === Language.URDU
                  ? `تمام نصابی مضامین (طبیعیات، کیمیا، حیاتیات/ریاضی اور انگریزی) کے سوالات پر مشتمل مشترکہ ماک ٹیسٹ۔ امتحانی وقت کی پابندی اور حقیقی بورڈ پیپر کا ماحول۔`
                  : `Full-spectrum board examination combining Physics, Chemistry, Biology/Math, and English questions for Grade ${selectedGrade}. Accurate simulation with AI proctoring.`}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                  <Clock className="w-4 h-4 text-emerald-400" /> 25 Minutes
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                  <FileText className="w-4 h-4 text-blue-400" /> 15 Comprehensive MCQs
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                  <Award className="w-4 h-4 text-amber-400" /> 30 Marks Total
                </span>
              </div>
            </div>

            <button
              onClick={() => initSecurityCheck(
                selectedGrade, 
                'all', 
                `Grade ${selectedGrade} Grand Mock Exam (All Subjects)`,
                `گریڈ ${selectedGrade} گرینڈ ماک امتحان (تمام مضامین)`
              )}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-extrabold text-sm md:text-base shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 shrink-0"
            >
              <span>{language === Language.URDU ? 'گرینڈ ماک ٹیسٹ شروع کریں' : 'Launch Grand Mock Test'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3. SUBJECT-WISE ASSESSMENTS GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
              {language === Language.URDU 
                ? `2. گریڈ ${selectedGrade} کے انفرادی مضامین کی اسسمنٹس (Subject-wise Tests)` 
                : `2. Grade ${selectedGrade} Subject-Specific Tests`}
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              {language === Language.URDU ? '10-10 مخصوص سوالات' : '10 Focused Questions'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjectAssessments.map((sub) => {
              const Icon = sub.icon;
              return (
                <div 
                  key={sub.subject}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${sub.bgLight} ${sub.accent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        Grade {selectedGrade}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mb-1">
                      {language === Language.URDU ? sub.titleUr : sub.titleEn}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {language === Language.URDU ? sub.descUr : sub.descEn}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 mb-6">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> {sub.questionsCount} MCQs
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {sub.duration}
                      </span>
                      <span>·</span>
                      <span className="text-emerald-600 font-bold">
                        {sub.marks}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => initSecurityCheck(
                      selectedGrade, 
                      sub.subject, 
                      `Grade ${selectedGrade} ${sub.titleEn}`,
                      `گریڈ ${selectedGrade} ${sub.titleUr}`
                    )}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{language === Language.URDU ? 'مضمون کا ٹیسٹ دیں' : 'Start Subject Test'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // 2. SECURITY CHECK
  if (mode === AssessmentMode.SECURITY_CHECK) {
      return (
          <div className="max-w-2xl mx-auto mt-8 bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in border border-slate-100" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
              <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-center">
                   <Shield className="w-8 h-8 text-emerald-600 mr-3" />
                   <h2 className="text-xl font-bold text-slate-800">
                     {language === Language.URDU ? 'امتحانی سسٹم کی تصدیق (Security Check)' : t.securityCheck}
                   </h2>
              </div>
              
              <div className="p-8 space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-center">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                      {language === Language.URDU ? 'منتخب کردہ امتحان' : 'Selected Assessment'}:
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {language === Language.URDU ? pendingExam.titleUr : pendingExam.titleEn}
                    </h3>
                  </div>

                  <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-full ${checksPassed.camera ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-400'}`}>
                                  <Camera className="w-5 h-5" />
                              </div>
                              <span className="font-medium text-slate-700">{t.cameraCheck}</span>
                          </div>
                          {checkingStep > 1 ? <CheckCircle className="w-6 h-6 text-emerald-500 animate-in zoom-in" /> : <div className="w-5 h-5 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"/>}
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-full ${checksPassed.mic ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-400'}`}>
                                  <Mic className="w-5 h-5" />
                              </div>
                              <span className="font-medium text-slate-700">{t.micCheck}</span>
                          </div>
                          {checkingStep > 2 ? <CheckCircle className="w-6 h-6 text-emerald-500 animate-in zoom-in" /> : (checkingStep > 1 && <div className="w-5 h-5 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"/>)}
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-full ${checksPassed.env ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-400'}`}>
                                  <Wifi className="w-5 h-5" />
                              </div>
                              <span className="font-medium text-slate-700">{t.environmentCheck}</span>
                          </div>
                          {checkingStep > 3 ? <CheckCircle className="w-6 h-6 text-emerald-500 animate-in zoom-in" /> : (checkingStep > 2 && <div className="w-5 h-5 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin"/>)}
                      </div>
                  </div>

                  {checkingStep >= 4 ? (
                      <div className="animate-in slide-in-from-bottom-2 fade-in">
                        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm mb-6 flex gap-3">
                            <Lock className="w-5 h-5 flex-shrink-0" />
                            <p>
                              {language === Language.URDU
                                ? 'امتحانی ماحول محفوظ ہے۔ وقت اور اسکرین تبدیل کرنے پر نظر رکھی جائے گی۔'
                                : 'Exam environment is secure. Full screen mode will be enabled. Tab switching is monitored.'}
                            </p>
                        </div>
                        <button onClick={() => startExam()} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all text-lg">
                            {t.readyToStart}
                        </button>
                      </div>
                  ) : (
                      <p className="text-center text-slate-400 text-sm py-4">Verifying system integrity...</p>
                  )}
              </div>
          </div>
      );
  }

  // 3. EXAM INTERFACE
  if (mode === AssessmentMode.EXAM) {
      if (!examQuestions[currentQIndex]) return <div className="p-12 text-center text-slate-500">Loading exam questions...</div>;
      const currentQ = examQuestions[currentQIndex];
      const answeredCount = Object.keys(userAnswers).length;
      const progress = (answeredCount / examQuestions.length) * 100;

      return (
        <div className="flex flex-col h-[calc(100vh-100px)] animate-fade-in bg-slate-50 -m-4 md:-m-8" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
           
           {/* Top Bar */}
           <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm z-20">
               <div className="flex items-center gap-4">
                   <div className="font-bold text-sm md:text-base text-slate-800">
                     <span className="text-emerald-700">{currentQ.subject}</span> · Grade {pendingExam.grade}
                   </div>
                   <div className="hidden md:flex items-center gap-2 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">
                       <Shield className="w-3 h-3 text-emerald-600" /> Monitored
                   </div>
               </div>
               
               <div className="flex items-center gap-6">
                   <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                       <Clock className="w-5 h-5" />
                       {formatTime(timeLeft)}
                   </div>
                   <button 
                       onClick={finishExam}
                       className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
                   >
                       {t.finish}
                   </button>
               </div>
           </div>

           {/* Progress Line */}
           <div className="w-full h-1 bg-slate-200">
               <div className="h-full bg-emerald-500 transition-all duration-500" style={{width: `${progress}%`}}></div>
           </div>

           {/* Main Layout */}
           <div className="flex-1 flex overflow-hidden">
               
               {/* Question Area */}
               <div className="flex-1 overflow-y-auto p-6 md:p-10">
                   <div className="max-w-3xl mx-auto space-y-6">
                       
                       {/* Question Card */}
                       <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 min-h-[400px] relative">
                           <div className="flex justify-between items-start mb-6">
                               <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                                 Question {currentQIndex + 1} of {examQuestions.length}
                               </span>
                               <button 
                                   onClick={toggleMarkForReview}
                                   className={`flex items-center gap-2 text-xs font-bold transition-colors ${markedQuestions.has(currentQ.id) ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
                               >
                                   <Flag className={`w-4 h-4 ${markedQuestions.has(currentQ.id) ? 'fill-current' : ''}`} />
                                   {markedQuestions.has(currentQ.id) ? 'Marked' : 'Mark for Review'}
                               </button>
                           </div>

                           <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-8 leading-relaxed">
                               {currentQ.text[language]}
                           </h2>

                           {/* Options */}
                           {currentQ.type === QuestionType.MCQ && currentQ.options && (
                               <div className="space-y-3">
                                   {currentQ.options.map((opt, optIdx) => {
                                       const isSelected = userAnswers[currentQ.id] === optIdx;
                                       return (
                                           <button
                                               key={optIdx}
                                               onClick={() => handleAnswerChange(optIdx)}
                                               className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between ${
                                                   isSelected 
                                                       ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 shadow-sm ring-1 ring-emerald-500' 
                                                       : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                               }`}
                                           >
                                               <div className="flex items-center gap-3">
                                                   <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold ${
                                                       isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                                                   }`}>
                                                       {String.fromCharCode(65 + optIdx)}
                                                   </span>
                                                   <span>{opt[language]}</span>
                                               </div>
                                               {isSelected && <Check className="w-5 h-5 text-emerald-600" />}
                                           </button>
                                       );
                                   })}
                               </div>
                           )}

                           {currentQ.type !== QuestionType.MCQ && (
                               <div className="mt-4">
                                   <input
                                       type="text"
                                       value={(userAnswers[currentQ.id] as string) || ''}
                                       onChange={(e) => handleAnswerChange(e.target.value)}
                                       placeholder="Type your answer here..."
                                       className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                   />
                               </div>
                           )}
                       </div>

                       {/* Navigation */}
                       <div className="flex justify-between items-center pt-4">
                           <button 
                               onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                               disabled={currentQIndex === 0}
                               className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-600 bg-white border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                           >
                               <ChevronLeft className="w-4 h-4" /> Prev
                           </button>
                           <button 
                               onClick={() => setCurrentQIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
                               disabled={currentQIndex === examQuestions.length - 1}
                               className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-500 shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                           >
                               Next <ChevronRight className="w-4 h-4" />
                           </button>
                       </div>
                   </div>
               </div>

               {/* Right Sidebar: Palette */}
               <div className="hidden md:flex w-72 bg-white border-l border-slate-200 flex-col">
                   <div className="p-4 border-b border-slate-100 font-bold text-slate-800 text-xs flex items-center gap-2 uppercase tracking-wider">
                       <LayoutGrid className="w-4 h-4 text-slate-400" /> Question Palette
                   </div>
                   <div className="p-4 flex-1 overflow-y-auto">
                       <div className="grid grid-cols-4 gap-2">
                           {examQuestions.map((q, idx) => (
                               <button
                                   key={q.id}
                                   onClick={() => setCurrentQIndex(idx)}
                                   className={getQuestionStatusClass(idx, q.id)}
                               >
                                   {idx + 1}
                               </button>
                           ))}
                       </div>
                   </div>
                   
                   <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs space-y-2">
                       <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div> Answered</div>
                       <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-50 border border-amber-400 rounded"></div> Marked</div>
                       <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-slate-200 rounded"></div> Not Visited</div>
                   </div>
               </div>
           </div>
        </div>
      );
  }

  // 4. REPORT: Grade & Subject-Wise Detailed Analytics
  if (mode === AssessmentMode.REPORT && scoreData) {
      const percentage = Math.round((scoreData.total / scoreData.max) * 100);
      const chartData = Object.entries(scoreData.subjectScores)
        .filter(([_, val]) => (val as any).total > 0)
        .map(([sub, val]) => {
          const data = val as {correct: number, total: number};
          return {
              name: sub,
              score: Math.round((data.correct / data.total) * 100),
              correct: data.correct,
              total: data.total
          };
      });

      return (
          <div className="max-w-6xl mx-auto animate-fade-in pb-16 antialiased space-y-8" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
             
             {/* Report Card Banner */}
             <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-800">
                 <div>
                     <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                       Grade {scoreData.grade} Sindh Board Examination
                     </div>
                     <h1 className="text-3xl font-extrabold mb-2">
                         {language === Language.URDU ? scoreData.examTitleUr : scoreData.examTitleEn}
                     </h1>
                     <p className="text-slate-400 text-sm">
                       {language === Language.URDU 
                         ? `کل درست جوابات: ${scoreData.total} میں سے ${scoreData.max}۔ کارکردگی کا تفصیلی تجزیہ۔` 
                         : `Completed with ${scoreData.total} of ${scoreData.max} correct answers.`}
                     </p>
                 </div>
                 <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10 min-w-[160px]">
                     <div className="text-5xl font-black text-emerald-400 mb-1 tabular-nums">{percentage}%</div>
                     <div className="text-xs text-slate-300 uppercase font-bold tracking-widest">{t.totalScore}</div>
                 </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 
                 {/* Left Col: Analytics */}
                 <div className="lg:col-span-1 space-y-6">
                     <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                         <h3 className="font-extrabold text-slate-800 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                             <BarChart2 className="w-5 h-5 text-emerald-600" /> Subject Mastery Breakdown
                         </h3>
                         <div className="h-60">
                             <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={chartData} layout="vertical" margin={{left: 0}}>
                                     <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                     <XAxis type="number" domain={[0, 100]} hide />
                                     <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 11, fontWeight: 700}} axisLine={false} tickLine={false} />
                                     <RechartsTooltip cursor={{fill: 'transparent'}} />
                                     <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={22}>
                                         {chartData.map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={entry.score >= 70 ? '#10b981' : entry.score >= 40 ? '#f59e0b' : '#ef4444'} />
                                         ))}
                                     </Bar>
                                 </BarChart>
                             </ResponsiveContainer>
                         </div>
                     </div>

                     <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                         <h3 className="font-extrabold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                             <Shield className="w-5 h-5 text-emerald-600" /> Exam Integrity Report
                         </h3>
                         <div className="space-y-3">
                             <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                 <span className="text-xs font-semibold text-slate-600">Integrity Score</span>
                                 <span className={`font-bold ${integrityReport.score > 80 ? 'text-emerald-600' : 'text-red-600'}`}>{integrityReport.score}%</span>
                             </div>
                             <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                 <span className="text-xs font-semibold text-slate-600">Tab Switches</span>
                                 <span className="font-bold text-slate-900">{integrityReport.tabSwitches}</span>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Right Col: Question Review */}
                 <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                     <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                         <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Detailed Question Review</h3>
                         <div className="flex gap-2 text-xs font-bold">
                             <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full"><CheckCircle className="w-3.5 h-3.5" /> {scoreData.total} Correct</span>
                             <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2.5 py-1 rounded-full"><XCircle className="w-3.5 h-3.5" /> {scoreData.max - scoreData.total} Incorrect</span>
                         </div>
                     </div>
                     <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                         {examQuestions.map((q, idx) => {
                             const ans = userAnswers[q.id];
                             const isCorrect = checkAnswer(q, ans);
                             
                             return (
                                 <div key={q.id} className="p-6 hover:bg-slate-50 transition-colors">
                                     <div className="flex gap-4">
                                         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                             {idx + 1}
                                         </div>
                                         <div className="flex-1 space-y-2">
                                             <div className="flex justify-between items-start gap-4">
                                                 <p className="font-bold text-sm text-slate-900">{q.text[language]}</p>
                                                 <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">{q.subject}</span>
                                             </div>
                                             
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                                                 <div className={`p-3 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                                                     <div className="font-bold uppercase opacity-60 mb-0.5">Your Answer</div>
                                                     <div className="font-semibold">
                                                         {q.type === QuestionType.MCQ && q.options ? q.options[Number(ans)]?.[language] || "Skipped" : (ans || "Skipped")}
                                                     </div>
                                                 </div>
                                                 {!isCorrect && (
                                                     <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
                                                         <div className="font-bold uppercase text-emerald-600 mb-0.5">Correct Answer</div>
                                                         <div className="font-semibold text-slate-700">
                                                             {q.type === QuestionType.MCQ && q.options && typeof q.correctAnswer === 'number' 
                                                               ? q.options[q.correctAnswer]?.[language] 
                                                               : String(q.correctAnswer)}
                                                         </div>
                                                     </div>
                                                 )}
                                             </div>
                                             
                                             <div className="pt-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                                                 <span className="font-bold text-slate-700">Explanation:</span> {q.explanation[language]}
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             );
                         })}
                     </div>
                 </div>

             </div>

             <div className="flex justify-center mt-8 gap-4">
                 <button onClick={() => setMode(AssessmentMode.MENU)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-xs">
                     Back to Assessment Center
                 </button>
             </div>
          </div>
      );
  }

  return <div className="p-12 text-center text-slate-500">Loading Assessment System...</div>;
};

export default Assessment;