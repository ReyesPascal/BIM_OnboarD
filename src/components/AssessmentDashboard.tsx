import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  ShieldCheck, 
  Share2, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  Copy,
  ExternalLink,
  Zap
} from 'lucide-react';
import { UserProgress } from '../types';
import { BIM_MODULES } from '../data/bimCurriculum';
import { BIM_GLOSSARY } from '../data/bimGlossary';

interface AssessmentDashboardProps {
  progress: UserProgress;
  overallScore: number;
  onNavigateToCertificate: () => void;
  onNavigateToModule: (moduleId: string) => void;
}

export const AssessmentDashboard: React.FC<AssessmentDashboardProps> = ({
  progress,
  overallScore,
  onNavigateToCertificate,
  onNavigateToModule
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Practical Checklist items
  const checklistItems = [
    {
      title: 'Central Model vs. Local Files',
      desc: 'Never open Central file directly; always work in Local copies to avoid locking the team repository.',
      verified: progress.simulationsCompleted.worksharingSynced || progress.completedModules.includes('modeling-workflows')
    },
    {
      title: 'Family Type vs. Instance Parameters',
      desc: 'Understand that editing Type properties alters every placed instance across the entire project.',
      verified: progress.completedModules.includes('software-fundamentals')
    },
    {
      title: 'Hard vs. Soft / Clearance Clashes',
      desc: 'Differentiate physical geometric collisions from required maintenance access and code clearances.',
      verified: progress.simulationsCompleted.clashResolved || progress.completedModules.includes('coordination-openbim')
    },
    {
      title: 'Navisworks File Hierarchy (.NWC / .NWF / .NWD)',
      desc: 'Understand that .NWF holds clash setups and pointers without geometry, while .NWD is a frozen deliverable.',
      verified: progress.completedModules.includes('coordination-openbim')
    },
    {
      title: 'ISO 19650 Common Data Environment (CDE)',
      desc: 'Know how information flows from WIP to Shared to Published containers under formal review.',
      verified: progress.completedModules.includes('bim-fundamentals')
    },
    {
      title: 'Level of Development (LOD 100 - 400)',
      desc: 'Familiar with geometric fidelity progression from massing to fabrication-ready assemblies.',
      verified: progress.simulationsCompleted.lodExplored || progress.completedModules.includes('bim-fundamentals')
    }
  ];

  const handleShareReport = () => {
    const text = `🚀 BIM Onboarding Readiness Verification Report
Candidate: ${progress.candidateName || 'Junior BIM Modeler'}
Overall Readiness Score: ${overallScore}%
Curriculum Modules Completed: ${progress.completedModules.length} / 4
Glossary Terms Mastered: ${progress.masteredTerms.length} / ${BIM_GLOSSARY.length}
Key Verified Skills:
✅ ISO 19650 CDE & BEP Compliance
✅ Revit Central Worksharing & Borrowing Protocols
✅ Navisworks Clash Coordination & BCF Reporting
✅ Parametric Family & Shared Parameter Architecture

Platform: BIM Onboarding Academy`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-white">Assessment &amp; Verification Dashboard</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-semibold">
                Real-Time Tracking
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Verify your operational readiness before stepping onto the modeling floor. This dashboard evaluates quiz performance, practical dilemma decisions, simulation milestones, and technical vocabulary mastery.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleShareReport}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              {copySuccess ? 'Copied to Clipboard!' : 'Share Progress Report'}
            </button>

            <button
              id="open-certificate-btn"
              onClick={onNavigateToCertificate}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/50 transition-all"
            >
              <Award className="w-4 h-4" />
              View Official Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Readiness Meter Card */}
        <div className="md:col-span-1 bg-[#101522] border border-cyan-500/40 rounded-3xl p-6 shadow-xl text-center flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-cyan-400 block mb-3">
              Onboarding Readiness
            </span>
            <div className="relative inline-flex items-center justify-center my-2">
              <div className="w-28 h-28 rounded-full border-8 border-slate-800 flex items-center justify-center relative">
                <div 
                  className="absolute inset-0 rounded-full border-8 border-cyan-400 transition-all duration-1000"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${overallScore > 25 ? '100% 0%' : '50% 0%'}, ${
                      overallScore > 50 ? '100% 100%' : '100% 0%'
                    }, ${overallScore > 75 ? '0% 100%' : '100% 100%'}, 0% 0%)`
                  }}
                />
                <span className="text-3xl font-black text-white">{overallScore}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-2">
              {overallScore >= 80 
                ? 'Excellent: Day 1 Ready!' 
                : overallScore >= 50 
                ? 'Good progress: Complete remaining modules' 
                : 'Getting started: Complete Module 1'}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
            Based on quizzes, simulations &amp; terminology mastery
          </div>
        </div>

        {/* 3 Metrics Cards (Right 3 cols) */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Core Curriculum
              </span>
              <div className="text-2xl font-black text-white">
                {progress.completedModules.length} / 4
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Essential modules verified
              </p>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(progress.completedModules.length / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Simulations Completed
              </span>
              <div className="text-2xl font-black text-amber-400">
                {Object.values(progress.simulationsCompleted).filter(Boolean).length} / 4
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Clash detection &amp; worksharing labs
              </p>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(Object.values(progress.simulationsCompleted).filter(Boolean).length / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Terminology Mastered
              </span>
              <div className="text-2xl font-black text-indigo-400">
                {progress.masteredTerms.length} / {BIM_GLOSSARY.length}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Industry vocabulary terms
              </p>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(progress.masteredTerms.length / BIM_GLOSSARY.length) * 100}%` }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Module Breakdown Table */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          Curriculum Modules &amp; Assessment Scores
        </h3>

        <div className="space-y-2.5">
          {BIM_MODULES.map((mod) => {
            const isCompleted = progress.completedModules.includes(mod.id);
            const score = progress.quizScores[mod.id] ?? 0;
            return (
              <div
                key={mod.id}
                className="p-4 rounded-2xl bg-[#0B0E14] border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-700/80 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      MOD 0{mod.number}
                    </span>
                    <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400">{mod.tagline}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                  {isCompleted ? (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Quiz Score</span>
                      <span className="text-xs font-bold text-emerald-400">{score}% Verified</span>
                    </div>
                  ) : (
                    <span className="text-xs text-amber-400 font-medium">Incomplete</span>
                  )}

                  <button
                    onClick={() => onNavigateToModule(mod.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-700/60"
                  >
                    <span>{isCompleted ? 'Review' : 'Start'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Day 1 Readiness Checklist */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Day 1 Operational Competency Checklist</h3>
          </div>
          <span className="text-xs text-slate-400">
            {checklistItems.filter(i => i.verified).length} / {checklistItems.length} Verified
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          These six practical principles represent the core behavioral competencies that BIM managers and senior coordinators look for in new team members:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                item.verified
                  ? 'bg-emerald-950/20 border-emerald-800/50'
                  : 'bg-[#0B0E14] border-slate-800/80'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                  item.verified ? 'text-emerald-400' : 'text-slate-600'
                }`} />
                <div>
                  <h4 className={`text-xs font-bold ${item.verified ? 'text-emerald-200' : 'text-slate-300'}`}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
