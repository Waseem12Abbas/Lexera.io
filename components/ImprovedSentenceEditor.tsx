
import React, { useState } from 'react';
import { Sparkles, Check, X, Edit3, Save, Info, Globe, ArrowRight } from 'lucide-react';
import { AIImprovementResult, Language } from '../types';

interface ImprovedSentenceEditorProps {
    original: string;
    result: AIImprovementResult;
    language: Language;
    onAccept: (improved: string) => void;
    onClose: () => void;
}

const ImprovedSentenceEditor: React.FC<ImprovedSentenceEditorProps> = ({ 
    original, result, language, onAccept, onClose 
}) => {
    const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');
    const [editedText, setEditedText] = useState(language === Language.URDU ? result.improved_text_ur : result.improved_text_en);
    const [activeLangTab, setActiveLangTab] = useState<Language>(language);

    const isUrdu = activeLangTab === Language.URDU;
    const displayText = isUrdu ? result.improved_text_ur : result.improved_text_en;
    const explanation = isUrdu ? result.explanation_ur : result.explanation_en;

    return (
        <div className="bg-white border-2 border-emerald-100 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 ring-4 ring-emerald-50/50">
            {/* AI Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="font-bold text-sm uppercase tracking-wider">AI Exam-Style Enhancement</span>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-6 space-y-6">
                {/* Original Snippet */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative">
                    <span className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 rounded">Original</span>
                    <p className="text-slate-500 text-sm italic">{original}</p>
                </div>

                {/* Comparison Container */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button 
                                onClick={() => setActiveLangTab(Language.ENGLISH)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeLangTab === Language.ENGLISH ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
                            >
                                English
                            </button>
                            <button 
                                onClick={() => setActiveLangTab(Language.URDU)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeLangTab === Language.URDU ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
                            >
                                اردو
                            </button>
                         </div>
                         <button 
                            onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
                            className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline"
                        >
                            {viewMode === 'edit' ? <><Check className="w-3 h-3" /> Finish Editing</> : <><Edit3 className="w-3 h-3" /> Manual Edit</>}
                        </button>
                    </div>

                    {viewMode === 'edit' ? (
                        <textarea 
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className={`w-full p-4 bg-emerald-50/30 border-2 border-emerald-200 rounded-2xl focus:ring-0 outline-none min-h-[120px] text-lg ${isUrdu ? 'text-right font-[UrduFont]' : 'font-medium'}`}
                        />
                    ) : (
                        <div className={`p-5 bg-emerald-50/50 rounded-2xl border-2 border-emerald-100 relative group animate-in fade-in duration-500`}>
                             <div className="absolute -top-3 right-4 bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">Suggested</div>
                             <p className={`text-slate-800 text-lg leading-relaxed ${isUrdu ? 'text-right font-[UrduFont] text-2xl' : 'font-semibold'}`}>
                                {displayText}
                             </p>
                        </div>
                    )}
                </div>

                {/* Deep-Dive Explanation */}
                <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                        <Info className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-900 text-sm mb-1 uppercase tracking-tight">AI Reasoning</h4>
                        <p className={`text-indigo-800/80 text-sm leading-relaxed ${isUrdu ? 'text-right font-[UrduFont] text-lg' : ''}`}>
                            {explanation}
                        </p>
                    </div>
                </div>

                {/* Action Dock */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        Keep Original
                    </button>
                    <button 
                        onClick={() => onAccept(editedText)}
                        className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                    >
                        <Save className="w-4 h-4" /> 
                        Accept & Use
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImprovedSentenceEditor;
