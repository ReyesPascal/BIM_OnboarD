import React from 'react';
import { 
  Building2, 
  GitMerge, 
  Crosshair, 
  BookA, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Monitor, 
  ShieldCheck, 
  Zap,
  BarChart3,
  Layers,
  FileCheck
} from 'lucide-react';
import { ActiveTab, UserProgress } from '../types';
import { BIM_MODULES } from '../data/bimCurriculum';
import { BIM_GLOSSARY } from '../data/bimGlossary';

interface OverviewHeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectModule: (moduleId: string) => void;
  progress: UserProgress;
  overallScore: number;
  onOpenMentor?: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  setActiveTab,
  onSelectModule,
  progress,
  overallScore,
  onOpenMentor
}) => {
  const completedSimsCount = Object.values(progress.simulationsCompleted).filter(Boolean).length;

  return (
    <div className="space-y-6">
      
      {/* Bento Grid Row 1: Main Platform Welcome + Real-Time Readiness Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Bento Cell 1: Welcome & Mission Statement (Span 8) */}
        <div className="lg:col-span-8 bg-[#101522] border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Top Platform Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>Web-Based Desktop Platform • Accessible in Any Browser</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Master BIM Workflows &amp; Software Fundamentals for Your New Job
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Welcome to your dedicated onboarding academy. Prepare with confidence for day one through hands-on simulations of multi-user Central worksharing, 3D clash coordination, ISO 19650 CDE standards, and Revit parametric taxonomy.
            </p>
          </div>

          <div className="pt-6 relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onSelectModule(BIM_MODULES[0].id);
                setActiveTab('modules');
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-950/50 transition-all group"
            >
              <span>Start Module 1: BIM Foundations</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('clash-simulator')}
              className="px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Crosshair className="w-4 h-4 text-cyan-400" />
              <span>Launch 3D Clash Lab</span>
            </button>
          </div>
        </div>

        {/* Bento Cell 2: Live Onboarding Readiness Tracker (Span 4) */}
        <div className="lg:col-span-4 bg-[#101522] border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Candidate Readiness
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Live Gauge
              </span>
            </div>

            <div className="flex items-center gap-5 my-3">
              <div className="relative w-20 h-20 shrink-0 rounded-full border-4 border-slate-800 flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-cyan-400 transition-all duration-700"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${overallScore > 25 ? '100% 0%' : '50% 0%'}, ${
                      overallScore > 50 ? '100% 100%' : '100% 0%'
                    }, ${overallScore > 75 ? '0% 100%' : '100% 100%'}, 0% 0%)`
                  }}
                />
                <span className="text-xl font-black text-white">{overallScore}%</span>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-white">
                  {overallScore >= 80 ? 'Job Ready (High Competency)' : overallScore >= 50 ? 'On Track (In Progress)' : 'Foundations Stage'}
                </p>
                <p className="text-slate-400 text-[11px] leading-tight">
                  {progress.candidateName || 'Modeler'} • Continuous evaluation
                </p>
              </div>
            </div>

            {/* Quick Metrics Bento Stack */}
            <div className="space-y-2 mt-4 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400 text-[11px]">Curriculum:</span>
                <span className="font-bold text-white">{progress.completedModules.length} of 4 Modules</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400 text-[11px]">Simulations:</span>
                <span className="font-bold text-amber-400">{completedSimsCount} of 4 Complete</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400 text-[11px]">Glossary Terms:</span>
                <span className="font-bold text-indigo-400">{progress.masteredTerms.length} of {BIM_GLOSSARY.length} Mastered</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('assessment')}
            className="mt-5 w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Open Assessment Dashboard</span>
          </button>
        </div>

      </div>

      {/* Bento Grid Row 2: 4 Core Curriculum Modules Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Core Curriculum Modules</span>
            </h2>
            <p className="text-xs text-slate-400">
              Essential modeling workflows, element taxonomies, and collaboration protocols.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('modules')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BIM_MODULES.map((mod) => {
            const isCompleted = progress.completedModules.includes(mod.id);
            const score = progress.quizScores[mod.id];
            return (
              <div
                key={mod.id}
                onClick={() => {
                  onSelectModule(mod.id);
                  setActiveTab('modules');
                }}
                className="bg-[#101522] border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
                      MOD 0{mod.number}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800/60">
                        <CheckCircle2 className="w-3 h-3" />
                        {score}%
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {mod.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {mod.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span>{isCompleted ? 'Review Lesson' : 'Start Module'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Row 3: Interactive Hands-On Practice Labs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Interactive Hands-On Practice Labs</span>
          </h2>
          <span className="text-xs text-slate-500">Real-World Software Simulators</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Clash Lab Card */}
          <div 
            onClick={() => setActiveTab('clash-simulator')}
            className="p-5 rounded-2xl bg-[#101522] border border-slate-800/80 hover:border-cyan-500/50 transition-all cursor-pointer shadow-lg space-y-3 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/70 text-cyan-400 border border-cyan-800/60 flex items-center justify-center">
                  <Crosshair className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                {progress.simulationsCompleted.clashResolved && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800/60">
                    Resolved ✓
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                3D Multi-Discipline Clash Lab
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explore isometric architecture, structural steel, and MEP ductwork. Run automated clash detection, resolve duct-beam collisions, and inspect OpenBIM BCF XML packets.
              </p>
            </div>
            <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1 pt-2 border-t border-slate-800/80">
              <span>Open 3D Simulator</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Worksharing Card */}
          <div 
            onClick={() => setActiveTab('worksharing')}
            className="p-5 rounded-2xl bg-[#101522] border border-slate-800/80 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg space-y-3 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-800/60 flex items-center justify-center">
                  <GitMerge className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                {progress.simulationsCompleted.worksharingSynced && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800/60">
                    Synced ✓
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Central Worksharing Lab
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Master Central vs. Local Revit file collaboration. Practice element borrowing, workset ownership, granting editing requests, and Synchronize with Central (SWC).
              </p>
            </div>
            <div className="text-xs text-amber-400 font-semibold flex items-center gap-1 pt-2 border-t border-slate-800/80">
              <span>Open Worksharing Lab</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Glossary Card */}
          <div 
            onClick={() => setActiveTab('glossary')}
            className="p-5 rounded-2xl bg-[#101522] border border-slate-800/80 hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg space-y-3 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/70 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
                  <BookA className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/70 px-2 py-0.5 rounded-full border border-indigo-800/60">
                  {progress.masteredTerms.length} / {BIM_GLOSSARY.length} Mastered
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                Terminology &amp; Flashcards
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Master 35+ essential acronyms and standards (IFC, BCF, COBie, EIR, BEP, LOD 100-400). Practice with interactive 3D flip cards and practical interview advice.
              </p>
            </div>
            <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1 pt-2 border-t border-slate-800/80">
              <span>Practice Flashcards</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Bento Grid Row 4: Verification & Certificate + Ask BIM Mentor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Bento Cell: Verified Certificate Callout (Span 8) */}
        <div className="lg:col-span-8 bg-[#101522] border border-cyan-500/30 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 text-center sm:text-left relative z-10">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Verified Competency Certificate
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Share Your Readiness With Your Employer
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Generate an official certificate of onboarding readiness and export a shareable progress report to prove your software and workflow knowledge.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('assessment')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shrink-0 shadow-lg shadow-cyan-950/50 transition-all"
          >
            Open Assessment Dashboard
          </button>
        </div>

        {/* Bento Cell: BIM Mentor Card (Span 4) */}
        <div 
          onClick={onOpenMentor}
          className="lg:col-span-4 bg-[#101522] border border-purple-800/50 hover:border-purple-600/70 rounded-3xl p-6 flex flex-col justify-between shadow-xl cursor-pointer group transition-all hover:-translate-y-1"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-purple-950/70 text-purple-400 border border-purple-800/60">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded-full border border-purple-800/40">
                AI Onboarding Lead
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
              Have a BIM Question or Dilemma?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask your simulated BIM Lead practical questions about modeling workflows, interview scenarios, or software bugs.
            </p>
          </div>

          <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5 pt-3 mt-2 border-t border-slate-800/80">
            <span>Launch BIM Mentor</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

    </div>
  );
};

