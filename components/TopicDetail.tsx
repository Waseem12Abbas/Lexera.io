import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Calculator, CheckCircle2, ChevronLeft, Volume2, 
  VolumeX, Pause, Sparkles, Check, X, RotateCcw, Award, Lightbulb,
  ArrowRight, FileText
} from 'lucide-react';
import { Lesson, Language, Question } from '../types';
import { TRANSLATIONS } from '../constants';
import { improveTextContent } from '../services/geminiService';

interface TopicDetailProps {
  lesson: Lesson;
  language: Language;
  initialTab?: 'read' | 'practice' | 'quiz';
  onBack: () => void;
  onTopicComplete?: (topicId: string, score?: number) => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({
  lesson,
  language,
  initialTab = 'read',
  onBack,
  onTopicComplete
}) => {
  const [activeTab, setActiveTab] = useState<'read' | 'practice' | 'quiz'>(initialTab);
  
  // TTS State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synth = useRef(window.speechSynthesis);

  // AI Deepen Explanation State
  const [isAIExplaining, setIsAIExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<{ en: string; ur: string } | null>(null);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const t = TRANSLATIONS[language];

  // Stop speech on unmount or tab switch
  useEffect(() => {
    return () => {
      synth.current.cancel();
    };
  }, []);

  const handleToggleTTS = () => {
    if (isSpeaking && !isPaused) {
      synth.current.pause();
      setIsPaused(true);
      return;
    }
    if (isPaused) {
      synth.current.resume();
      setIsPaused(false);
      return;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = lesson.content[language];
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    const utterance = new SpeechSynthesisUtterance(plainText);
    const voices = synth.current.getVoices();
    let voice = null;
    if (language === Language.URDU) {
      voice = voices.find(v => v.lang.includes('ur')) || voices.find(v => v.lang.includes('hi'));
    } else {
      voice = voices.find(v => v.lang.includes('en-GB')) || voices.find(v => v.lang.includes('en-US'));
    }
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;

    utterance.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
    utterance.onend = () => { setIsSpeaking(false); setIsPaused(false); };
    utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false); };

    synth.current.speak(utterance);
  };

  const handleStopTTS = () => {
    synth.current.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleAskAI = async () => {
    setIsAIExplaining(true);
    try {
      const res = await improveTextContent(lesson.description[Language.ENGLISH]);
      if (res) {
        setAiExplanation({
          en: res.explanation_en,
          ur: res.explanation_ur
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAIExplaining(false);
    }
  };

  const handleSelectOption = (questionId: string, option: string | number) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    const questions = lesson.quizQuestions;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 100;
    setQuizScore(percentage);
    setSubmittedQuiz(true);

    if (onTopicComplete) {
      onTopicComplete(lesson.id, percentage);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(null);
  };

  return (
    <div className="space-y-6 antialiased" dir={language === Language.URDU ? 'rtl' : 'ltr'}>
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.backToTopics}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Sindh Board</span>
          <span aria-hidden="true">·</span>
          <span>{lesson.subject}</span>
          <span aria-hidden="true">·</span>
          <span>Chapter {lesson.chapterNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{lesson.weightage} Marks</span>
        </div>
      </div>

      {/* Chapter Title & Header Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span>{lesson.subject}</span>
              <span>•</span>
              <span>Chapter {lesson.chapterNumber}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {lesson.title[language]}
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              {lesson.description[language]}
            </p>
          </div>

          {/* Quick Stats Box & Completion Action */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 shrink-0">
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Exam Marks</div>
              <div className="text-xl font-extrabold text-emerald-400">{lesson.weightage} Marks</div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">MCQ Questions</div>
              <div className="text-xl font-extrabold text-white">{lesson.quizQuestions.length}</div>
            </div>
            {onTopicComplete && (
              <>
                <div className="h-8 w-px bg-slate-700"></div>
                <button
                  onClick={() => onTopicComplete(lesson.id, 100)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Completed</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 3 Core Interactive Modes Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveTab('read'); handleStopTTS(); }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'read'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Read Notes (Theory)</span>
          </button>

          <button
            onClick={() => { setActiveTab('practice'); handleStopTTS(); }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'practice'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>2. Practice (Worked Examples)</span>
          </button>

          <button
            onClick={() => { setActiveTab('quiz'); handleStopTTS(); }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>3. Topic Quiz (Assessment)</span>
          </button>
        </div>
      </div>

      {/* ===================== TAB 1: READ NOTES (THEORY) ===================== */}
      {activeTab === 'read' && (
        <div className="space-y-6">
          {/* Audio & AI Tools Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleTTS}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSpeaking && !isPaused
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {isSpeaking && !isPaused ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{isSpeaking && !isPaused ? t.pauseAudio : t.listenAudio}</span>
              </button>

              {isSpeaking && (
                <button
                  onClick={handleStopTTS}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  {t.stopAudio}
                </button>
              )}
            </div>

            <button
              onClick={handleAskAI}
              disabled={isAIExplaining}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAIExplaining ? 'Analyzing with AI...' : t.improveWithAI}</span>
            </button>
          </div>

          {/* AI Explanation Callout if generated */}
          {aiExplanation && (
            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-slate-900 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>AI Concept Breakdown</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-800">
                {aiExplanation[language]}
              </p>
            </div>
          )}

          {/* HTML Textbook Content Card */}
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm">
            <div 
              className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700"
              dangerouslySetInnerHTML={{ __html: lesson.content[language] }}
            />
          </div>

          {/* Next Step CTA */}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('practice')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <span>Proceed to Practice & Solved Examples</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: PRACTICE (WORKED EXAMPLES & FORMULAS) ===================== */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          
          {/* Key Formulas & Board Exam Takeaways */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Key Board Exam Formulas & Rules</span>
            </h3>

            {lesson.practice.formulas && lesson.practice.formulas.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.practice.formulas.map((form, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs font-semibold text-slate-800">
                    {form}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-500 uppercase">Core Revision Points:</div>
              <ul className="space-y-2">
                {lesson.practice.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                    <span>{pt[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solved Numericals & Worked Questions */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>Step-by-Step Solved Numericals (Sindh Board Pattern)</span>
            </h3>

            {lesson.practice.workedExamples.map((ex, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <span>Solved Problem #{idx + 1}</span>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {ex.question[language]}
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Solution & Steps:</div>
                  <div className="text-xs text-slate-800 leading-relaxed font-mono">
                    {ex.solution[language]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Step CTA */}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('quiz')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <span>Take Topic Quiz Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: TOPIC QUIZ ASSESSMENT ===================== */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          
          {/* Quiz Score Banner if Submitted */}
          {submittedQuiz && quizScore !== null && (
            <div className={`p-6 rounded-3xl border shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 ${
              quizScore >= 70
                ? 'bg-emerald-950 border-emerald-500 text-white'
                : 'bg-slate-900 border-amber-500 text-white'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${quizScore >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {quizScore >= 70 ? 'Mastery Achieved!' : 'Review Recommended'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {quizScore >= 70 
                      ? 'Great work! You demonstrated solid understanding of this Sindh Board topic.'
                      : 'You scored below 70%. Review the explanations below and attempt again.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-slate-400 uppercase font-bold">Your Score</div>
                  <div className="text-3xl font-extrabold text-emerald-400">{quizScore}%</div>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Retake Quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-4">
            {lesson.quizQuestions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

              return (
                <div key={q.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-emerald-700">Question {idx + 1} of {lesson.quizQuestions.length}</span>
                    {submittedQuiz && (
                      <span className={`inline-flex items-center gap-1 text-xs font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                        {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                    {q.text[language]}
                  </h4>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {q.options?.map((opt, optIdx) => {
                      const optionValue = opt.en;
                      const isSelected = selectedAnswers[q.id] === optionValue;
                      const isOptionCorrect = optionValue === q.correctAnswer;

                      let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100";
                      if (submittedQuiz) {
                        if (isOptionCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                        } else if (isSelected && !isOptionCorrect) {
                          btnStyle = "bg-red-50 border-red-500 text-red-800";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-emerald-50 border-emerald-600 text-emerald-900 font-bold shadow-sm";
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optionValue)}
                          disabled={submittedQuiz}
                          className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt[language]}</span>
                          {submittedQuiz && isOptionCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {submittedQuiz && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <div className="font-bold text-slate-900">Explanation:</div>
                      <p>{q.explanation[language]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action Bar */}
          {!submittedQuiz ? (
            <div className="flex justify-end">
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                Submit Topic Assessment
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>

              <button
                onClick={onBack}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Back to Curriculum List
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default TopicDetail;
