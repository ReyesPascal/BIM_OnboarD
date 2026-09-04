import React from 'react';
import { ActiveTab, UserProgress } from '../types';
import { 
  Building2, 
  BookOpen, 
  Crosshair, 
  GitMerge, 
  BookA, 
  Award, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  progress: UserProgress;
  onOpenMentor: () => void;
  overallScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onOpenMentor,
  overallScore
}) => {
  const completedCount = progress.completedModules.length;

  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Overview', icon: Building2 },
    { id: 'modules' as ActiveTab, label: 'Core Curriculum', icon: BookOpen, badge: `${completedCount}/4` },
    { id: 'clash-simulator' as ActiveTab, label: '3D Clash Lab', icon: Crosshair },
    { id: 'worksharing' as ActiveTab, label: 'Worksharing Lab', icon: GitMerge },
    { id: 'glossary' as ActiveTab, label: 'Terminology', icon: BookA },
    { id: 'assessment' as ActiveTab, label: 'Assessment', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-slate-800/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('overview')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-950/50 text-white font-black text-lg border border-cyan-400/30 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  BIM Onboarding Academy
                </span>
                <span className="hidden md:inline-flex text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  Day 1 Ready
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-400 font-medium">
                Workflows • Terminology • Software Fundamentals
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1.5 p-1 bg-[#101522] rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-700/60 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: AI Mentor & Readiness Score */}
          <div className="flex items-center gap-2.5">
            <button
              id="open-bim-mentor-btn"
              onClick={onOpenMentor}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-purple-200 border border-purple-800/60 hover:border-purple-600 transition-all shadow-sm"
              title="Ask BIM Mentor practical questions or interview prep"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span className="hidden sm:inline">Ask</span> BIM Mentor
            </button>

            {/* Overall Readiness Pill */}
            <button
              id="view-assessment-score-btn"
              onClick={() => setActiveTab('assessment')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#101522] border border-slate-800/80 hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex flex-col text-right">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider leading-none">
                  Readiness
                </span>
                <span className="text-xs font-extrabold text-cyan-400 leading-tight">
                  {overallScore}%
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 gap-1 border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-800'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
