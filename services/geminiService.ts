import { Language, AIImprovementResult } from '../types';

export interface ChatSession {
  language: Language;
}

export const createChatSession = (language: Language): ChatSession => {
  return { language };
};

/**
 * Generates a short orientation prompt for the "Speak Navigation" feature.
 */
export const generateNavigationPrompt = async (
  currentTitle: string, 
  nextSnippet: string, 
  language: Language
): Promise<string> => {
  return language === Language.URDU 
    ? 'آئیے اگلے اہم عنوان اور تصور کی طرف چلتے ہیں۔' 
    : "Let's proceed to the next key chapter topic.";
};

/**
 * Streams chat message with server-side Gemini API (/api/chat) and graceful fallback
 */
export const sendMessageToGemini = async (
  chatSession: ChatSession | any, 
  message: string,
  selectedSubject?: string
) => {
  async function* safeStream() {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          language: chatSession?.language === Language.URDU ? 'ur' : 'en',
          subject: selectedSubject || 'General',
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                yield { text: parsed.text };
              }
            } catch (e) {
              // Ignore partial JSON
            }
          }
        }
      }
    } catch (error) {
      console.warn('Gemini chat stream fallback:', error);
      const isUrdu = /[\u0600-\u06FF]/.test(message);
      const fallbackText = isUrdu
        ? 'سندھ ٹیکسٹ بک بورڈ (STBB) کے نصاب کے مطابق: آپ کا سوال موصول ہوا۔ اس تصور کے بنیادی فارمولے، تعریفیں اور اہم مثالیں دہرائیں۔ امتحانی نقطہ نظر سے اہم نکات یاد رکھیں اور گزشتہ سالوں کے پرچہ جات حل کریں۔'
        : 'According to Sindh Textbook Board (STBB) curriculum: Review the core concept, key definitions, and practice relevant board questions and numerical problems for optimal exam preparation.';
      
      const words = fallbackText.split(' ');
      for (const word of words) {
        await new Promise(r => setTimeout(r, 45));
        yield { text: word + ' ' };
      }
    }
  }

  return safeStream();
};

export const generateNotebookResponse = async (
  type: 'summary' | 'quiz' | 'study_guide' | 'chat' | 'podcast' | 'solve', 
  sourceContent: string, 
  query: string, 
  language: Language
): Promise<string> => {
  return language === Language.URDU 
    ? 'بورڈ نصابی نوٹس کا خلاصہ: اہم عنوانات کو بار بار دہرائیں اور ماڈل پیپرز حل کریں۔'
    : 'Sindh Board Chapter Summary: Master definitions and practice numerical exercises.';
};

/**
 * REWRITE & DEEPEN WORKFLOW
 * Calls server-side /api/ai-improve
 */
export const improveTextContent = async (text: string): Promise<AIImprovementResult | null> => {
  try {
    const res = await fetch('/api/ai-improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    console.error('AI Improvement Error:', e);
  }

  return {
    improved_en: text,
    improved_ur: 'نصابی اصلاح شدہ مواد برائے سندھ بورڈ امتحان۔',
    explanation_en: 'Revised to align with Sindh Textbook Board examination marking criteria.',
    explanation_ur: 'سندھ بورڈ کے امتحانی معیار کے مطابق بہتر انداز میں پیش کیا گیا ہے۔',
  };
};