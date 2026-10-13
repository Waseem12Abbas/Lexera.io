import React, { useState } from 'react';
import { 
  GraduationCap, ArrowRight, ShieldCheck, BookOpen, Compass, 
  Stethoscope, Cpu, CheckCircle2, User, Mail, Lock
} from 'lucide-react';
import { StudentCategory, GradeLevel, StudentProfile, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LoginProps {
  language: Language;
  onLogin: (profile: StudentProfile) => void;
}

const Login: React.FC<LoginProps> = ({ language, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState<StudentCategory>('pre_engineering');
  const [grade, setGrade] = useState<GradeLevel>('11');
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && !name.trim()) {
      setError(language === Language.URDU ? 'براہ کرم اپنا پورا نام درج کریں' : 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError(language === Language.URDU ? 'براہ کرم ای میل یا صارف نام درج کریں' : 'Please enter your email or username');
      return;
    }

    const studentName = isSignUp ? name.trim() : (name.trim() || email.split('@')[0] || 'Student');
    const profile: StudentProfile = {
      id: `std_${Date.now()}`,
      name: studentName,
      email: email.trim(),
      category,
      grade,
      board: 'Sindh Textbook Board (STBB)',
      avatarInitials: studentName.slice(0, 2).toUpperCase(),
      joinedAt: new Date().toISOString()
    };

    onLogin(profile);
  };

  const handleQuickDemo = (demoCategory: StudentCategory, demoGrade: GradeLevel, demoName: string) => {
    const profile: StudentProfile = {
      id: `demo_${demoCategory}_${demoGrade}`,
      name: demoName,
      email: `${demoName.toLowerCase().replace(/\s+/g, '.')}@student.pk`,
      category: demoCategory,
      grade: demoGrade,
      board: 'Sindh Textbook Board (STBB)',
      avatarInitials: demoName.slice(0, 2).toUpperCase(),
      joinedAt: new Date().toISOString()
    };
    onLogin(profile);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 md:p-8 font-sans antialiased selection:bg-emerald-500 selection:text-white" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Visual Branding Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sindh Textbook Board (STBB) Aligned</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              {language === Language.URDU ? 'ایڈاپٹو لرننگ پاتھ وے' : 'Adaptive Learning Pathway'}
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              {language === Language.URDU
                ? 'سندھ بورڈ کے طلباء کے لیے جامع تعلیمی پورٹل۔ 10-10 مکمل ابواب برائے فزکس، کیمسٹری، بیالوجی، ریاضی اور انگریزی۔'
                : 'Dedicated academic mastery portal for Sindh Board SSC & HSC students. Topic-wise notes, practice, and exam assessments.'}
            </p>

            {/* Stream Showcase */}
            <div className="space-y-3 mb-8">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Pre-Engineering Stream</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Physics · Chemistry · Mathematics · English</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Pre-Medical Stream</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Physics · Chemistry · Biology · English</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="pt-6 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
              {language === Language.URDU ? 'فوری ڈیمو لاگ ان (1-کلک)' : 'Instant Demo Student Login'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('pre_engineering', '11', 'Waseem Abbas')}
                className="w-full text-left px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-between group"
              >
                <span>Waseem (PE • Gr 11)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('pre_medical', '10', 'Ayesha Fatima')}
                className="w-full text-left px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-between group"
              >
                <span>Ayesha (PM • Gr 10)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-slate-900">
          <div className="max-w-md mx-auto w-full">
            
            {/* Header Tabs: Sign In / Create Account */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {isSignUp 
                    ? (language === Language.URDU ? 'نیا اسٹوڈنٹ اکاؤنٹ بنائیں' : 'Create Student Portal')
                    : (language === Language.URDU ? 'اسٹوڈنٹ لاگ ان' : 'Student Sign In')}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {language === Language.URDU
                    ? 'اپنے نام سے ذاتی سندھ بورڈ ڈیش بورڈ کھولیں'
                    : 'Access your personalized Sindh Board dashboard'}
                </p>
              </div>

              <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setError(null); }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${!isSignUp ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  {language === Language.URDU ? 'لاگ ان' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setError(null); }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${isSignUp ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  {language === Language.URDU ? 'رجسٹر' : 'Sign Up'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Input (Required for Signup, optional for signin) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {language === Language.URDU ? 'مکمل نام (طالب علم)' : 'Student Full Name'} {isSignUp && <span className="text-red-400">*</span>}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === Language.URDU ? 'مثلاً: وسیم عباس' : 'e.g. Waseem Abbas'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email / Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {language === Language.URDU ? 'ای میل یا اسٹوڈنٹ آئی ڈی' : 'Email or Student ID'} <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === Language.URDU ? 'student@lexera.pk' : 'student@lexera.pk'}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {language === Language.URDU ? 'پاس ورڈ' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Category / Stream Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {language === Language.URDU ? 'تعلیمی کیٹیگری (Category)' : 'Student Category / Stream'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory('pre_engineering')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      category === 'pre_engineering'
                        ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">Pre-Engineering</span>
                      <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <p className="text-[10px] text-slate-400">Maths, Physics, Chem, English</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('pre_medical')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      category === 'pre_medical'
                        ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">Pre-Medical</span>
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[10px] text-slate-400">Biology, Physics, Chem, English</p>
                  </button>
                </div>
              </div>

              {/* Grade Selector (9 to 12) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {language === Language.URDU ? 'کلاس / گریڈ (Grades 9 to 12)' : 'Select Grade Level (9 - 12)'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['9', '10', '11', '12'] as GradeLevel[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrade(g)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                        grade === g
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {g === '9' ? 'Gr 9 (SSC-I)' : g === '10' ? 'Gr 10 (SSC-II)' : g === '11' ? 'Gr 11 (HSC-I)' : 'Gr 12 (HSC-II)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Board info */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Curriculum Board:</span>
                <span className="font-semibold text-slate-200">Sindh Textbook Board (STBB)</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{isSignUp ? (language === Language.URDU ? 'پورٹل بنائیں' : 'Create My Portal') : (language === Language.URDU ? 'ڈیش بورڈ کھولیں' : 'Enter My Dashboard')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;