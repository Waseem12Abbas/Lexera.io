import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Mic, MicOff, Volume2, VolumeX, Monitor } from 'lucide-react';
import { ChatMessage, Language, Subject } from '../types';
import { TRANSLATIONS } from '../constants';
import { createChatSession, sendMessageToGemini, ChatSession } from '../services/geminiService';

interface AITutorProps {
  language: Language;
}

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Simple Avatar Component
const AvatarDisplay: React.FC<{ isSpeaking: boolean, subject: Subject }> = ({ isSpeaking, subject }) => {
    // Subject-based colors
    const colors = {
        [Subject.PHYSICS]: '#3b82f6', // blue
        [Subject.CHEMISTRY]: '#f97316', // orange
        [Subject.BIOLOGY]: '#10b981', // emerald
        [Subject.MATH]: '#8b5cf6', // violet
        [Subject.ENGLISH]: '#0d9488', // teal
    };
    const mainColor = colors[subject] || '#3b82f6';
    
    // Animation states
    const [blink, setBlink] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 200);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-48 h-48 mx-auto my-6 animate-fade-in">
             <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                 {/* Body/Shoulders */}
                 <path d="M50,180 Q100,220 150,180 L150,200 L50,200 Z" fill={mainColor} opacity="0.8" />
                 
                 {/* Head */}
                 <circle cx="100" cy="100" r="70" fill="#fde6d9" stroke="#e2e8f0" strokeWidth="2" />
                 
                 {/* Hair */}
                 <path d="M40,90 Q50,20 100,20 Q150,20 160,90 Q160,50 100,40 Q40,50 40,90" fill="#1e293b" />
                 
                 {/* Glasses (Science Mode) */}
                 {(subject === Subject.PHYSICS || subject === Subject.CHEMISTRY) && (
                     <g fill="none" stroke="#64748b" strokeWidth="3">
                         <circle cx="75" cy="95" r="18" fill="rgba(255,255,255,0.3)" />
                         <line x1="93" y1="95" x2="107" y2="95" />
                         <circle cx="125" cy="95" r="18" fill="rgba(255,255,255,0.3)" />
                     </g>
                 )}

                 {/* Eyes */}
                 {blink ? (
                     <>
                        <line x1="65" y1="95" x2="85" y2="95" stroke="#1e293b" strokeWidth="3" />
                        <line x1="115" y1="95" x2="135" y2="95" stroke="#1e293b" strokeWidth="3" />
                     </>
                 ) : (
                     <>
                        <circle cx="75" cy="95" r="5" fill="#1e293b" />
                        <circle cx="125" cy="95" r="5" fill="#1e293b" />
                     </>
                 )}

                 {/* Mouth - Lip Sync Animation */}
                 {isSpeaking ? (
                     <ellipse cx="100" cy="130" rx="15" ry="10" fill="#be123c">
                        <animate attributeName="ry" values="2;10;2" dur="0.2s" repeatCount="indefinite" />
                     </ellipse>
                 ) : (
                     <path d="M85,130 Q100,140 115,130" fill="none" stroke="#be123c" strokeWidth="3" strokeLinecap="round" />
                 )}
                 
                 {/* Badge */}
                 <circle cx="150" cy="170" r="15" fill="#fff" />
                 <text x="150" y="175" textAnchor="middle" fontSize="12" fill={mainColor} fontWeight="bold">AI</text>
             </svg>
        </div>
    );
};

const AITutor: React.FC<AITutorProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.PHYSICS);
  
  // UI States
  const [isAvatarMode, setIsAvatarMode] = useState(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false); // TTS output
  const [isMicInputEnabled, setIsMicInputEnabled] = useState(false); // STT input toggle
  const [isListening, setIsListening] = useState(false); // Actual listening state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Refs
  const chatSessionRef = useRef<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize chat session
    chatSessionRef.current = createChatSession(language);
    
    // Welcome message
    setMessages([{
        id: 'welcome',
        role: 'model',
        text: t.tutorIntro,
        timestamp: new Date()
    }]);

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, [language]);

  // Update recognition language when app language changes
  useEffect(() => {
      if (recognitionRef.current) {
          recognitionRef.current.lang = language === Language.URDU ? 'ur-PK' : 'en-US';
      }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAvatarMode]);

  // Speech Synthesis Logic
  const speakText = (text: string) => {
      if (!isVoiceEnabled || !window.speechSynthesis) return;

      // Stop any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Attempt to select language voice
      const voices = window.speechSynthesis.getVoices();
      let voice = null;
      
      if (language === Language.URDU) {
          // Try to find Urdu voice (Google or Microsoft)
          voice = voices.find(v => v.lang.includes('ur') || v.name.includes('Urdu'));
          // Fallback to Hindi if Urdu not found (often works better than English voice reading Urdu script)
          if (!voice) voice = voices.find(v => v.lang.includes('hi'));
      } else {
          voice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
      }
      
      if (voice) utterance.voice = voice;
      utterance.pitch = 1.1; // Slightly higher/friendlier
      utterance.rate = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current) {
        try {
            recognitionRef.current.start();
        } catch (e) {
            console.error("Recognition start error", e);
        }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    // Stop speaking if user interrupts
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Inject Subject Context
    const contextPrompt = `[Context: Grade 9 ${selectedSubject}] ${userMsg.text}`;

    try {
      const responseStream = await sendMessageToGemini(chatSessionRef.current, contextPrompt);
      
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: '', // Start empty
        timestamp: new Date()
      }]);

      let fullText = '';
      
      for await (const chunk of responseStream) {
         const chunkText = chunk?.text || '';
         fullText += chunkText;
         
         setMessages(prev => prev.map(msg => 
            msg.id === botMsgId ? { ...msg, text: fullText } : msg
         ));
      }

      // Speak result after generation is done
      if (isVoiceEnabled) {
          speakText(fullText);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Header with Controls */}
      <div className="p-4 bg-emerald-600 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
            <h2 className="font-bold text-lg">{t.tutor}</h2>
            <p className="text-emerald-100 text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Powered by Gemini 2.5
            </p>
            </div>
        </div>
        
        <div className="flex gap-2">
            <button 
                onClick={() => setIsMicInputEnabled(!isMicInputEnabled)}
                className={`p-2 rounded-lg transition-colors ${isMicInputEnabled ? 'bg-white text-emerald-600' : 'bg-emerald-700 text-emerald-200'}`}
                title={isMicInputEnabled ? t.disableMic : t.enableMic}
            >
                {isMicInputEnabled ? <Mic className="w-5 h-5"/> : <MicOff className="w-5 h-5"/>}
            </button>
            <button 
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`p-2 rounded-lg transition-colors ${isVoiceEnabled ? 'bg-white text-emerald-600' : 'bg-emerald-700 text-emerald-200'}`}
                title={isVoiceEnabled ? t.muteVoice : t.enableVoice}
            >
                {isVoiceEnabled ? <Volume2 className="w-5 h-5"/> : <VolumeX className="w-5 h-5"/>}
            </button>
            <button 
                onClick={() => setIsAvatarMode(!isAvatarMode)}
                className={`p-2 rounded-lg transition-colors ${isAvatarMode ? 'bg-white text-emerald-600' : 'bg-emerald-700 text-emerald-200'}`}
                title={t.avatarMode}
            >
                {isAvatarMode ? <User className="w-5 h-5"/> : <Monitor className="w-5 h-5"/>}
            </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
          
          {/* Avatar Panel (Conditional) */}
          {isAvatarMode && (
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center">
                  <div className="mb-4 w-full">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{t.selectSubject}</label>
                      <div className="grid grid-cols-2 gap-2">
                          {Object.values(Subject).map(sub => (
                              <button
                                key={sub}
                                onClick={() => setSelectedSubject(sub)}
                                className={`text-xs p-2 rounded-lg border transition-all ${
                                    selectedSubject === sub 
                                    ? 'bg-slate-800 text-white border-slate-800' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                  {sub}
                              </button>
                          ))}
                      </div>
                  </div>
                  
                  <AvatarDisplay isSpeaking={isSpeaking} subject={selectedSubject} />
                  
                  <div className="mt-4">
                      <h3 className="font-bold text-slate-800 text-lg">AI Tutor</h3>
                      <p className="text-sm text-slate-500 font-medium">{selectedSubject} Expert</p>
                      {isSpeaking && (
                          <div className="flex items-center justify-center gap-1 mt-2 text-emerald-600 text-xs font-bold animate-pulse">
                              <Volume2 className="w-3 h-3" /> {t.speaking}
                          </div>
                      )}
                  </div>
              </div>
          )}

          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-emerald-600'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                    </div>
                    <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user'
                        ? 'bg-white border border-slate-200 text-slate-800 rounded-tr-none'
                        : 'bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-tl-none'
                    }`}
                    >
                    {msg.text}
                    </div>
                </div>
                ))}
                
                {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl rounded-tl-none">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200 transition-all duration-300">
                {isMicInputEnabled ? (
                    <div className="flex flex-col items-center justify-center py-2 space-y-3">
                        <button
                          onClick={startListening}
                          disabled={isListening}
                          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                              isListening 
                              ? 'bg-red-500 shadow-[0_0_0_10px_rgba(239,68,68,0.2)] scale-110' 
                              : 'bg-emerald-600 shadow-lg hover:bg-emerald-700 hover:scale-105'
                          }`}
                        >
                            <Mic className="w-8 h-8 text-white" />
                            {isListening && (
                                <div className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75"></div>
                            )}
                        </button>
                        <p className={`text-sm font-medium ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                            {isListening ? t.listening : t.tapToSpeak}
                        </p>
                        
                        {/* Hidden input to store transcript visually if needed, or fallback */}
                        {input && (
                            <div className="w-full mt-2 flex gap-2">
                                <input 
                                    type="text" 
                                    value={input} 
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 p-2 bg-slate-50 rounded-lg text-sm border border-slate-200 text-slate-600"
                                />
                                <button onClick={handleSend} className="p-2 bg-emerald-600 rounded-lg text-white"><Send className="w-4 h-4"/></button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t.askTutor}
                            className="flex-1 p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white p-3 rounded-xl transition-colors flex items-center justify-center"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;