import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  HelpCircle, 
  MessageSquare, 
  Lightbulb, 
  Bot, 
  User, 
  Loader2,
  Copy,
  Check
} from 'lucide-react';

interface BimMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTopic?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_PROMPTS = [
  'What essential questions should I ask my BIM Manager on Day 1?',
  'Explain the difference between Type and Instance parameters simply.',
  'What are the most common Revit keyboard shortcuts I should practice?',
  'Why is exploding a CAD file so catastrophic in Revit?',
  'Simulate a junior BIM modeler interview question for me to answer.'
];

export const BimMentorModal: React.FC<BimMentorModalProps> = ({
  isOpen,
  onClose,
  activeTopic
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your **BIM Onboarding Mentor**. Whether you want to clarify Revit commands, understand ISO 19650 protocols, review clash coordination, or practice interview questions for your upcoming role, ask me anything!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const question = queryText || input;
    if (!question.trim() || loading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          topic: activeTopic || 'BIM Onboarding Fundamentals',
          history: newMessages.slice(-4)
        })
      });

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.answer || 'Thank you for your question.' }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'In professional BIM environments, precision, coordination, and following the BIM Execution Plan (BEP) are paramount. Always verify your worksets before placing elements, never explode CAD files in your central model, and coordinate with your discipline lead whenever moving primary structural or MEP conduits!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl max-w-2xl w-full h-[600px] max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0B0E14] border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                BIM Onboarding Coach
                <span className="text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/60 font-semibold">
                  AI Mentor
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Ask practical questions, interview scenarios &amp; Revit tips
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="px-4 py-2.5 bg-[#0B0E14]/80 border-b border-slate-800/80 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
          <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0 mr-1 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Prompts:
          </span>
          {PRESET_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-xl bg-[#101522] hover:bg-slate-800/80 text-[11px] text-slate-300 border border-slate-800/80 whitespace-nowrap shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                    isUser
                      ? 'bg-cyan-600 text-white'
                      : 'bg-purple-950/80 text-purple-300 border border-purple-800/60'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-[#0B0E14] text-slate-200 border border-slate-800/80 rounded-tl-none space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {!isUser && (
                    <div className="pt-2 flex justify-end border-t border-slate-800/60">
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Answer</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-300 font-medium p-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span>Consulting Senior BIM Knowledge Base...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0B0E14] border-t border-slate-800/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about Revit, Worksharing, ISO 19650, or Day 1 tips..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#101522] border border-slate-800/80 rounded-2xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={`p-2.5 rounded-2xl font-bold transition-all ${
                input.trim() && !loading
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-950'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
