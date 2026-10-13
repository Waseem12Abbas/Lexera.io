
import React, { useMemo } from 'react';
import { 
    TrendingUp, AlertTriangle, CheckCircle, Zap, Target, 
    ArrowRight, BookOpen, Calculator 
} from 'lucide-react';
import { MOCK_LESSONS, MOCK_USER_PERFORMANCE, TRANSLATIONS } from '../constants';
import { Language, Subject, Lesson, LOPerformance, View } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

interface AICoachProps {
    language: Language;
    onNavigate: (view: View, lesson?: Lesson) => void;
}

// Helper interfaces for type safety
interface AnalyzedLesson extends Lesson {
    performance: LOPerformance;
    mastery: number;
    predictedMarks: number;
    maxMarks: number;
    isWeak: boolean;
}

interface SubjectScore {
    current: number;
    max: number;
    weakLOs: AnalyzedLesson[];
}

const AICoach: React.FC<AICoachProps> = ({ language, onNavigate }) => {
    const t = TRANSLATIONS[language];

    // --- Logic Engine ---
    
    // 1. Merge Static Lesson Data with User Performance
    const analysisData = useMemo<AnalyzedLesson[]>(() => {
        return MOCK_LESSONS.map(lesson => {
            const perf = MOCK_USER_PERFORMANCE.find(p => p.lessonId === lesson.id) || {
                lessonId: lesson.id,
                attempts: 0,
                correct: 0,
                totalQuestions: 0,
                avgTimePerQuestion: 0,
                lastAttemptDate: new Date()
            };

            const mastery = perf.totalQuestions > 0 ? (perf.correct / perf.totalQuestions) : 0;
            // Predicted score for this LO = Weightage * Mastery * Confidence Factor
            // Confidence increases with attempts
            const confidence = Math.min(1, perf.attempts / 3); 
            const predictedMarks = lesson.weightage * mastery * confidence;
            
            return {
                ...lesson,
                performance: perf,
                mastery,
                predictedMarks,
                maxMarks: lesson.weightage,
                isWeak: mastery < 0.6 && lesson.weightage > 8 // Arbitrary threshold
            };
        });
    }, []);

    // 2. Aggregate Scores per Subject
    const subjectAnalysis = useMemo(() => {
        const scores: Record<string, SubjectScore> = {};
        
        Object.values(Subject).forEach(sub => {
            const subjectLOs = analysisData.filter(d => d.subject === sub);
            const totalMax = subjectLOs.reduce((sum, lo) => sum + lo.maxMarks, 0);
            const totalPred = subjectLOs.reduce((sum, lo) => sum + lo.predictedMarks, 0);
            
            scores[sub] = {
                current: Math.round(totalPred),
                max: totalMax,
                weakLOs: subjectLOs.filter(lo => lo.isWeak)
            };
        });
        return scores;
    }, [analysisData]);

    // 3. Generate Chart Data
    const chartData = Object.entries(subjectAnalysis).map(([sub, data]) => ({
        name: sub,
        marks: (data as SubjectScore).current,
        total: (data as SubjectScore).max,
        fill: '#10b981'
    }));

    // 4. Identify Top Critical Action (The "One Thing" to fix)
    const criticalWeakness = analysisData
        .filter(lo => lo.isWeak)
        .sort((a, b) => b.weightage - a.weightage)[0]; // Highest weightage weakness

    // --- Render Helpers ---

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            
            {/* Header / Score Card */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                            <Zap className="w-4 h-4" /> {language === Language.URDU ? 'اسٹیٹس اور تیاری' : 'Academic Status & Readiness'}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            {language === Language.ENGLISH 
                                ? "Your Marks Prediction" 
                                : t.predictedMarks}
                        </h1>
                        <p className="text-slate-300 max-w-md">
                            {language === Language.ENGLISH ? t.coachInsightEn : t.coachInsightUr}
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center justify-around">
                        <div className="text-center">
                            <div className="text-4xl font-black text-emerald-400 mb-1">62%</div>
                            <div className="text-xs text-slate-400 uppercase">{t.accuracy}</div>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-white mb-1">
                                {Object.values(subjectAnalysis).reduce((acc: number, val) => acc + (val as SubjectScore).current, 0)}
                            </div>
                            <div className="text-xs text-slate-400 uppercase">{t.predictedMarks}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Marks Breakdown Chart */}
                <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-emerald-600" /> {t.mastery}
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-slate-800 text-white text-xs p-2 rounded-lg shadow-xl border-none">
                                                    <p className="font-bold mb-1">{data.name}</p>
                                                    <p>Predicted: {data.marks} / {data.total}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar dataKey="marks" radius={[0, 4, 4, 0]} barSize={24}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.marks / entry.total > 0.7 ? '#10b981' : '#f59e0b'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right: Critical Weakness Alert */}
                <div className="lg:col-span-5 bg-red-50 p-6 rounded-3xl border border-red-100 relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-red-600 font-bold uppercase tracking-wider text-xs mb-3">
                            <AlertTriangle className="w-4 h-4" /> {t.criticalAction}
                        </div>
                        
                        {criticalWeakness ? (
                            <>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {t.losingMarks} in <span className="text-red-600">{criticalWeakness.title[language]}</span>
                                </h3>
                                <div className="bg-white/60 p-4 rounded-xl mb-4 border border-red-200">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-slate-600">Weightage</span>
                                        <span className="font-bold text-slate-900">{criticalWeakness.weightage} {t.marks}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[40%]"></div>
                                    </div>
                                    <p className="text-xs text-red-600 mt-2 font-medium">
                                        {t.fixThis} <span className="underline">+{(criticalWeakness.weightage * 0.6).toFixed(0)} {t.marks}</span>
                                    </p>
                                </div>
                                <button 
                                    onClick={() => onNavigate(View.READ_LESSON, criticalWeakness)}
                                    className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                                >
                                    Start Repair Lesson <ArrowRight className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                                <h3 className="font-bold text-emerald-800">No Critical Weaknesses!</h3>
                                <p className="text-sm text-emerald-600">You are on track for a great score.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Personalized Study Plan */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-600" /> {t.studyPlan}
                        </h3>
                        <p className="text-slate-500 text-sm">Generated based on your weak LOs and Board Weightage.</p>
                    </div>
                    <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                        {t.generatePlan}
                    </button>
                </div>

                <div className="divide-y divide-slate-100">
                    {analysisData
                        .filter(lo => lo.mastery < 0.8) // Show anything below 80% mastery
                        .sort((a, b) => b.weightage - a.weightage) // Sort by impact
                        .slice(0, 4) // Top 4 items
                        .map((lo, index) => (
                        <div key={lo.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-50 transition-colors">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                {index + 1}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="font-bold text-slate-800">{lo.title[language]}</h4>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-500 mt-1">
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{lo.subject}</span>
                                    <span>•</span>
                                    <span>Impact: <strong>{lo.weightage} {t.marks}</strong></span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center min-w-[100px]">
                                <span className="text-xs font-bold uppercase text-slate-400 mb-1">Mastery</span>
                                <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${lo.mastery < 0.5 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                                        style={{ width: `${lo.mastery * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <button 
                                onClick={() => onNavigate(View.READ_LESSON, lo)}
                                className="px-5 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-white hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                            >
                                Review
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AICoach;
