import React, { useState } from 'react';
import { 
  BIMModule, 
  QuizQuestion, 
  ScenarioChallenge, 
  UserProgress 
} from '../types';
import { 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  AlertTriangle, 
  Lightbulb, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ModuleLessonViewProps {
  module: BIMModule;
  progress: UserProgress;
  onCompleteModule: (moduleId: string, quizScore: number, scenarioScore: number) => void;
  onNextModule?: () => void;
}

export const ModuleLessonView: React.FC<ModuleLessonViewProps> = ({
  module,
  progress,
  onCompleteModule,
  onNextModule
}) => {
  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [selectedScenarioOption, setSelectedScenarioOption] = useState<number | null>(null);
  const [scenarioSubmitted, setScenarioSubmitted] = useState<boolean>(false);

  const isCompleted = progress.completedModules.includes(module.id);
  const currentQuizScore = progress.quizScores[module.id] ?? 0;

  // Answer selection
  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (!quizSubmitted) {
      setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    }
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    let correctCount = 0;
    module.quiz.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / module.quiz.length) * 100);
    setQuizSubmitted(true);
    
    // Save progress
    const scenarioScore = selectedScenarioOption !== null 
      ? module.scenario.options[selectedScenarioOption].scoreAwarded 
      : 100;
    onCompleteModule(module.id, percentage, scenarioScore);
  };

  // Submit Scenario
  const handleSubmitScenario = (optionIndex: number) => {
    setSelectedScenarioOption(optionIndex);
    setScenarioSubmitted(true);
    const scenarioScore = module.scenario.options[optionIndex].scoreAwarded;
    onCompleteModule(module.id, currentQuizScore || 100, scenarioScore);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Module Header Card */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
              MODULE {module.number} OF 4
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {module.readTime} read
            </span>
          </div>

          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Completed ({currentQuizScore}% Quiz Score)</span>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          {module.title}
        </h1>
        <p className="text-sm text-cyan-300 font-medium mb-4">
          {module.tagline}
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {module.summary}
        </p>
      </div>

      {/* Lesson Sections */}
      <div className="space-y-6">
        {module.sections.map((section, idx) => (
          <div 
            key={section.id} 
            className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-lg space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#0B0E14] text-cyan-400 text-xs font-bold flex items-center justify-center border border-slate-800">
                {idx + 1}
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {section.title}
              </h2>
            </div>
            
            <p className="text-xs text-slate-400 font-medium">
              {section.subtitle}
            </p>

            {/* Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Interactive Diagrams depending on diagramType */}
            {section.diagramType === 'cde_lifecycle' && (
              <div className="my-5 p-5 rounded-2xl bg-[#0B0E14] border border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-3">
                  ISO 19650 Common Data Environment (CDE) Gateways:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/60 text-xs">
                    <span className="font-bold text-blue-300 block mb-1">1. WIP</span>
                    <p className="text-[11px] text-slate-300">Internal discipline draft (Architecture team only). Unapproved for others.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs">
                    <span className="font-bold text-emerald-300 block mb-1">2. SHARED</span>
                    <p className="text-[11px] text-slate-300">Checked &amp; authorized for cross-trade coordination linking.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-xs">
                    <span className="font-bold text-purple-300 block mb-1">3. PUBLISHED</span>
                    <p className="text-[11px] text-slate-300">Official milestone deliverables for tender, permits &amp; construction.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#101522] border border-slate-800/80 text-xs">
                    <span className="font-bold text-slate-300 block mb-1">4. ARCHIVE</span>
                    <p className="text-[11px] text-slate-400">Permanent audit trail of previous revisions and as-built data.</p>
                  </div>
                </div>
              </div>
            )}

            {section.diagramType === 'element_hierarchy' && (
              <div className="my-5 p-5 rounded-2xl bg-[#0B0E14] border border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-3">
                  Revit / BIM Taxonomy Breakdown:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-center text-xs">
                  <div className="p-3 rounded-2xl bg-[#101522] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">1. Category</span>
                    <span className="font-bold text-white">Doors</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Built-in to software</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#101522] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block">2. Family</span>
                    <span className="font-bold text-cyan-200">Single-Flush Timber</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Component group (.rfa)</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#101522] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 block">3. Type</span>
                    <span className="font-bold text-indigo-200">36&quot; x 84&quot; Solid Core</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Shared by all of this size</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#101522] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block">4. Instance</span>
                    <span className="font-bold text-emerald-200">Door #104A</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Placed physical object</span>
                  </div>
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            <div className="p-4 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-xs space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Key Takeaways:
              </span>
              <ul className="space-y-1">
                {section.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro-Tip Box */}
            {section.proTip && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                  Day 1 Onboarding Pro-Tip:
                </span>
                <p className="text-emerald-100/90 leading-relaxed">{section.proTip}</p>
              </div>
            )}

            {/* Watch Out Warning Box */}
            {section.watchOutWarning && (
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-800/40 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-300 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  Watch Out Warning:
                </span>
                <p className="text-red-100/90 leading-relaxed">{section.watchOutWarning}</p>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Real-World Scenario Challenge */}
      <div className="bg-[#101522] border border-purple-800/50 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-2xl bg-purple-950/80 text-purple-400 border border-purple-800/60">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block">
              Practical Workplace Scenario Challenge
            </span>
            <h3 className="text-lg font-bold text-white">{module.scenario.title}</h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-xs sm:text-sm text-slate-300 space-y-2">
          <p><strong>Context:</strong> {module.scenario.roleContext}</p>
          <p className="text-amber-300 font-semibold"><strong>Dilemma:</strong> {module.scenario.dilemma}</p>
        </div>

        {/* Scenario Options */}
        <div className="space-y-2.5 pt-2">
          {module.scenario.options.map((opt, oIdx) => {
            const isSelected = selectedScenarioOption === oIdx;
            return (
              <div key={oIdx} className="space-y-2">
                <button
                  onClick={() => handleSubmitScenario(oIdx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? opt.isOptimal
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-red-950/70 border-red-500 text-red-200'
                      : 'bg-[#0B0E14] hover:bg-slate-800/60 border-slate-800/80 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                </button>

                {/* Feedback shown when clicked */}
                {isSelected && (
                  <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                    opt.isOptimal 
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' 
                      : 'bg-red-950/40 border-red-800/60 text-red-200'
                  }`}>
                    <strong>Outcome:</strong> {opt.consequence}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 italic pt-1">
          Reference: {module.scenario.industryStandardReference}
        </p>
      </div>

      {/* Module Assessment Quiz */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Module Knowledge Check</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {module.quiz.length} Questions
          </span>
        </div>

        <div className="space-y-6">
          {module.quiz.map((q, qIdx) => {
            const chosen = userAnswers[q.id];
            const isCorrect = chosen === q.correctIndex;
            return (
              <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-[#0B0E14] border border-slate-800/80 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 mt-0.5">
                    Q{qIdx + 1}.
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {q.question}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let btnClass = 'bg-[#101522] border-slate-800/80 text-slate-300 hover:border-slate-700/80';
                    
                    if (quizSubmitted) {
                      if (optIdx === q.correctIndex) {
                        btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-red-950/80 border-red-500 text-red-200';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${btnClass}`}
                      >
                        <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submitting */}
                {quizSubmitted && (
                  <div className="p-3.5 rounded-2xl bg-[#101522] border border-slate-800/80 text-xs text-slate-300 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                      Explanation:
                    </span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiz Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {quizSubmitted ? (
              <span className="text-sm font-bold text-emerald-400">
                Score: {currentQuizScore}% — Progress saved to your assessment profile.
              </span>
            ) : (
              <span>Answer all questions, then submit to verify your score.</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length < module.quiz.length}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                  Object.keys(userAnswers).length >= module.quiz.length
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-950'
                    : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/80'
                }`}
              >
                Submit Answers &amp; Verify Module
              </button>
            ) : (
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setUserAnswers({});
                }}
                className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
            )}

            {onNextModule && (
              <button
                onClick={onNextModule}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-950"
              >
                <span>Next Module</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
