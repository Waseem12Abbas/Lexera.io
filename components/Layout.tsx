import React, { useState } from 'react';
import { 
  BarChart2, BookOpen, Map as MapIcon, CheckSquare, 
  MessageCircle, Zap, Globe, LogOut, Menu, X, 
  GraduationCap, Cpu, Stethoscope, Calendar
} from 'lucide-react';
import { View, Language, StudentProfile, StudentCategory } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  currentView: View;
  language: Language;
  student: StudentProfile;
  onViewChange: (view: View) => void;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  currentView,
  language,
  student,
  onViewChange,
  onLanguageChange,
  onLogout,
  children
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  // Strictly student-only navigation (Simulations, Teacher Tools, Classrooms, Notebook REMOVED)
  const navItems = [
    { view: View.DASHBOARD, label: t.dashboard, icon: BarChart2 },
    { view: View.LESSONS, label: t.lessons, icon: BookOpen },
    { view: View.TIMETABLE, label: t.timetable, icon: Calendar },
    { view: View.LEARNING_PATH, label: t.learningPath, icon: MapIcon },
    { view: View.ASSESSMENT, label: t.assessment, icon: CheckSquare },
    { view: View.AI_TUTOR, label: t.tutor, icon: MessageCircle },
    { view: View.AI_COACH, label: t.coach, icon: Zap }
  ];

  return (
    <div 
      className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row antialiased ${
        language === Language.URDU ? 'font-sans' : 'font-sans'
      }`} 
      dir={language === Language.URDU ? 'rtl' : 'ltr'}
    >
      
      {/* Mobile Top App Bar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
              {language === Language.URDU ? 'ایڈاپٹو لرننگ پاتھ وے' : 'Adaptive Learning Pathway'}
            </h1>
            <span className="text-[10px] text-emerald-400 font-medium">Sindh Board Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onLanguageChange(language === Language.ENGLISH ? Language.URDU : Language.ENGLISH)}
            className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            {language === Language.ENGLISH ? 'اردو' : 'EN'}
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Modern Desktop & Tablet Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 shrink-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Top Branding & Profile Summary */}
        <div>
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-white leading-tight">
                  {language === Language.URDU ? 'ایڈاپٹو لرننگ پاتھ وے' : 'Adaptive Learning Pathway'}
                </h1>
                <p className="text-[11px] text-slate-400">Sindh Board Portal</p>
              </div>
            </div>

            {/* Student Profile Identity Card */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate max-w-[120px]">{student.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 uppercase">
                  Gr {student.grade}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                {student.category === 'pre_engineering' ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-blue-400" />
                    <span>Pre-Engineering</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <Stethoscope className="w-3 h-3 text-emerald-400" />
                    <span>Pre-Medical</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item, index) => {
              const isActive = currentView === item.view || (item.view === View.LESSONS && currentView === View.READ_LESSON);
              const Icon = item.icon;

              return (
                <button
                  key={`layout-nav-${item.view}-${index}`}
                  onClick={() => {
                    onViewChange(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Controls */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-900/90">
          
          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === Language.ENGLISH ? Language.URDU : Language.ENGLISH)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{t.language}</span>
            </div>
            <span className="px-2 py-0.5 bg-slate-800 text-emerald-400 rounded-md text-[11px] font-bold">
              {language === Language.ENGLISH ? 'اردو' : 'English'}
            </span>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Desktop Top Bar Contract: 3 Zones separated by gap-8 */}
        <header className="hidden md:flex items-center justify-between gap-8 h-16 bg-white border-b border-slate-200 px-8 sticky top-0 z-30">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <span className="font-bold text-slate-900 text-sm tracking-tight">Sindh Textbook Board</span>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-xs font-semibold text-emerald-700">STBB Curriculum Portal</span>
          </div>

          {/* Zone 2: Navigation / Breadcrumb indicator */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-500 font-medium whitespace-nowrap shrink-0">
            <span>Grade {student.grade} (SSC / HSC)</span>
            <span aria-hidden="true">·</span>
            <span>{student.category === 'pre_engineering' ? 'Pre-Engineering Track' : 'Pre-Medical Track'}</span>
            <span aria-hidden="true">·</span>
            <span>10 Topics Per Subject</span>
          </div>

          {/* Zone 3: 1 Primary Profile Action */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">{student.name}</div>
              <div className="text-[10px] text-slate-500 uppercase">{student.category === 'pre_engineering' ? 'Pre-Engineering' : 'Pre-Medical'}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center text-xs font-bold">
              {student.avatarInitials || student.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Scrollable Content View */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;