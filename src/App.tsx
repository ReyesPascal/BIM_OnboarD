import React, { useState, useEffect } from 'react';
import { ActiveTab, UserProgress } from './types';
import { BIM_MODULES } from './data/bimCurriculum';
import { BIM_GLOSSARY } from './data/bimGlossary';
import { Navbar } from './components/Navbar';
import { OverviewHero } from './components/OverviewHero';
import { ModuleLessonView } from './components/ModuleLessonView';
import { InteractiveClashViewer } from './components/InteractiveClashViewer';
import { WorksharingSimulator } from './components/WorksharingSimulator';
import { GlossaryFlashcards } from './components/GlossaryFlashcards';
import { AssessmentDashboard } from './components/AssessmentDashboard';
import { CertificateView } from './components/CertificateView';
import { BimMentorModal } from './components/BimMentorModal';
import { 
  Building2, 
  Sparkles, 
  MessageSquare, 
  Monitor, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const STORAGE_KEY = 'bim_academy_user_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  candidateName: 'Ryan Pascal',
  completedModules: [],
  quizScores: {},
  completedScenarios: {},
  masteredTerms: ['iso-19650', 'central-model', 'hard-clash'],
  simulationsCompleted: {
    clashRun: false,
    clashResolved: false,
    lodExplored: false,
    worksharingSynced: false
  },
  lastActiveDate: new Date().toISOString()
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(BIM_MODULES[0].id);
  const [mentorOpen, setMentorOpen] = useState<boolean>(false);
  
  // Local storage state initialization
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading progress from localStorage:', e);
    }
    return INITIAL_PROGRESS;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Error saving progress to localStorage:', e);
    }
  }, [progress]);

  // Calculate Overall Readiness Score (0 to 100%)
  const calculateOverallScore = (): number => {
    // 1. Modules completed weight: 25%
    const modulePart = (progress.completedModules.length / BIM_MODULES.length) * 25;

    // 2. Quiz scores weight: 35%
    const quizValues: number[] = Object.values(progress.quizScores);
    const avgQuiz = quizValues.length > 0 
      ? quizValues.reduce((a, b) => a + b, 0) / quizValues.length 
      : 0;
    const quizPart = (avgQuiz / 100) * 35;

    // 3. Scenario challenges weight: 15%
    const scenarioValues: number[] = Object.values(progress.completedScenarios);
    const avgScenario = scenarioValues.length > 0 
      ? scenarioValues.reduce((a, b) => a + b, 0) / scenarioValues.length 
      : 0;
    const scenarioPart = (avgScenario / 100) * 15;

    // 4. Simulations weight: 15%
    const simValues = Object.values(progress.simulationsCompleted);
    const completedSims = simValues.filter(Boolean).length;
    const simPart = (completedSims / 4) * 15;

    // 5. Terminology mastered weight: 10%
    const termPart = Math.min((progress.masteredTerms.length / 20) * 10, 10);

    const total = Math.round(modulePart + quizPart + scenarioPart + simPart + termPart);
    return Math.min(Math.max(total, 5), 100);
  };

  const overallScore = calculateOverallScore();

  // Progress Handlers
  const handleCompleteModule = (moduleId: string, quizScore: number, scenarioScore: number) => {
    setProgress(prev => {
      const updatedModules = prev.completedModules.includes(moduleId)
        ? prev.completedModules
        : [...prev.completedModules, moduleId];
      return {
        ...prev,
        completedModules: updatedModules,
        quizScores: { ...prev.quizScores, [moduleId]: quizScore },
        completedScenarios: { ...prev.completedScenarios, [moduleId]: scenarioScore },
        lastActiveDate: new Date().toISOString()
      };
    });
  };

  const handleToggleMasteredTerm = (termId: string) => {
    setProgress(prev => {
      const isMastered = prev.masteredTerms.includes(termId);
      const updated = isMastered
        ? prev.masteredTerms.filter(t => t !== termId)
        : [...prev.masteredTerms, termId];
      return {
        ...prev,
        masteredTerms: updated,
        lastActiveDate: new Date().toISOString()
      };
    });
  };

  const handleUpdateCandidateName = (name: string) => {
    setProgress(prev => ({
      ...prev,
      candidateName: name
    }));
  };

  const handleClashResolved = () => {
    setProgress(prev => ({
      ...prev,
      simulationsCompleted: {
        ...prev.simulationsCompleted,
        clashRun: true,
        clashResolved: true
      }
    }));
  };

  const handleLODExplored = () => {
    setProgress(prev => ({
      ...prev,
      simulationsCompleted: {
        ...prev.simulationsCompleted,
        lodExplored: true
      }
    }));
  };

  const handleWorksharingSynced = () => {
    setProgress(prev => ({
      ...prev,
      simulationsCompleted: {
        ...prev.simulationsCompleted,
        worksharingSynced: true
      }
    }));
  };

  const currentModule = BIM_MODULES.find(m => m.id === selectedModuleId) || BIM_MODULES[0];

  const handleNextModule = () => {
    const currentIndex = BIM_MODULES.findIndex(m => m.id === currentModule.id);
    if (currentIndex < BIM_MODULES.length - 1) {
      setSelectedModuleId(BIM_MODULES[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('assessment');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        onOpenMentor={() => setMentorOpen(true)}
        overallScore={overallScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: Overview */}
        {activeTab === 'overview' && (
          <OverviewHero
            setActiveTab={setActiveTab}
            onSelectModule={(id) => {
              setSelectedModuleId(id);
              setActiveTab('modules');
            }}
            progress={progress}
            overallScore={overallScore}
            onOpenMentor={() => setMentorOpen(true)}
          />
        )}

        {/* TAB 2: Core Curriculum Modules */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            
            {/* Module Picker Tabs - Bento Bar */}
            <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-2.5 sm:p-3 shadow-xl flex items-center overflow-x-auto gap-2 no-scrollbar">
              {BIM_MODULES.map((m) => {
                const isSelected = m.id === currentModule.id;
                const isCompleted = progress.completedModules.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModuleId(m.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                      isSelected
                        ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-700/60 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCompleted 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isCompleted ? '✓' : m.number}
                    </span>
                    <span>Mod {m.number}: {m.title.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Module Lesson View */}
            <ModuleLessonView
              module={currentModule}
              progress={progress}
              onCompleteModule={handleCompleteModule}
              onNextModule={handleNextModule}
            />
          </div>
        )}

        {/* TAB 3: 3D Clash Lab */}
        {activeTab === 'clash-simulator' && (
          <InteractiveClashViewer
            onClashResolved={handleClashResolved}
            onLODExplored={handleLODExplored}
          />
        )}

        {/* TAB 4: Worksharing Lab */}
        {activeTab === 'worksharing' && (
          <WorksharingSimulator
            onSyncCompleted={handleWorksharingSynced}
          />
        )}

        {/* TAB 5: Glossary & Flashcards */}
        {activeTab === 'glossary' && (
          <GlossaryFlashcards
            masteredTerms={progress.masteredTerms}
            onToggleMastered={handleToggleMasteredTerm}
          />
        )}

        {/* TAB 6: Assessment Dashboard */}
        {activeTab === 'assessment' && (
          <AssessmentDashboard
            progress={progress}
            overallScore={overallScore}
            onNavigateToCertificate={() => setActiveTab('certificate')}
            onNavigateToModule={(id) => {
              setSelectedModuleId(id);
              setActiveTab('modules');
            }}
          />
        )}

        {/* TAB 7: Certificate of Readiness */}
        {activeTab === 'certificate' && (
          <CertificateView
            progress={progress}
            overallScore={overallScore}
            onBack={() => setActiveTab('assessment')}
            onUpdateCandidateName={handleUpdateCandidateName}
          />
        )}

      </main>

      {/* Persistent Floating "Ask BIM Mentor" Button */}
      <button
        onClick={() => setMentorOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900/90 text-purple-200 font-bold text-xs sm:text-sm shadow-2xl shadow-purple-950/80 border border-purple-600/50 hover:scale-105 transition-all no-print backdrop-blur-md"
      >
        <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
        <span>Ask BIM Mentor</span>
      </button>

      {/* BIM Mentor Modal */}
      <BimMentorModal
        isOpen={mentorOpen}
        onClose={() => setMentorOpen(false)}
        activeTopic={activeTab}
      />

      {/* Footer */}
      <footer className="bg-[#0B0E14] border-t border-slate-800/80 py-8 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">BIM Onboarding Academy</span>
            <span>• Browser-based learning platform for engineering &amp; architectural modeling</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('assessment')}
              className="hover:text-cyan-400 transition-colors"
            >
              Verification Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('glossary')}
              className="hover:text-cyan-400 transition-colors"
            >
              Industry Glossary
            </button>
            <button 
              onClick={() => setActiveTab('certificate')}
              className="hover:text-cyan-400 transition-colors"
            >
              Certificate
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
