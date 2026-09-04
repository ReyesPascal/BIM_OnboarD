import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  Printer, 
  Share2, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  Copy, 
  ArrowLeft 
} from 'lucide-react';
import { UserProgress } from '../types';

interface CertificateViewProps {
  progress: UserProgress;
  overallScore: number;
  onBack: () => void;
  onUpdateCandidateName: (name: string) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  progress,
  overallScore,
  onBack,
  onUpdateCandidateName
}) => {
  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShareReport = () => {
    const text = `🎓 Verified BIM Onboarding Readiness Certificate
Candidate: ${progress.candidateName || 'BIM Model Specialist'}
Score: ${overallScore}% Verified Readiness
Modules Completed: ${progress.completedModules.length}/4 Modules
Core Competencies:
• ISO 19650 & CDE Governance
• Central Model Worksharing & Synchronization Protocols
• BIM Element Hierarchy (Category > Family > Type > Instance)
• Navisworks Clash Coordination & BCF Issue Resolution

Verified via BIM Onboarding Academy Web Platform.`;

    navigator.clipboard.writeText(text);
    alert('Shareable achievement report copied to clipboard! You can paste this on LinkedIn or send to your hiring manager.');
  };

  const certificateId = `BIM-CERT-2026-${Math.abs(
    (progress.candidateName || 'Ryan').split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000)
  ) % 9000 + 1000}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#101522] border border-slate-800/80 rounded-3xl p-4 sm:p-5 no-print shadow-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B0E14] hover:bg-slate-800/80 text-slate-300 text-xs font-semibold border border-slate-800/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0E14] hover:bg-slate-800/80 text-slate-200 text-xs font-semibold border border-slate-800/80 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-cyan-400" />
            Copy Shareable Text
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-950 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Candidate Name Input (Hidden in Print) */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-4 sm:p-5 no-print flex flex-col sm:flex-row items-center justify-between gap-3">
        <label className="text-xs text-slate-300 font-medium">
          Customize Recipient Name on Certificate:
        </label>
        <input
          type="text"
          value={progress.candidateName}
          onChange={(e) => onUpdateCandidateName(e.target.value)}
          placeholder="Enter your full name"
          className="bg-[#0B0E14] border border-slate-800/80 text-slate-200 px-3.5 py-2 rounded-xl text-xs w-full sm:w-64 focus:outline-none focus:border-cyan-400 font-semibold"
        />
      </div>

      {/* Official Certificate Paper Layout (Designed for Screen & Print) */}
      <div className="bg-[#101522] border-4 border-slate-800/80 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center">
        
        {/* Certificate Decorative Border */}
        <div className="absolute inset-3 border border-cyan-500/30 rounded-2xl pointer-events-none" />
        <div className="absolute inset-5 border border-slate-800/80 rounded-xl pointer-events-none" />

        {/* Certificate Header Badge */}
        <div className="relative z-10 space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 border-2 border-cyan-400 flex items-center justify-center text-white shadow-xl shadow-cyan-950">
            <Building2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-cyan-400 block mb-1">
              BIM ONBOARDING ACADEMY • VERIFIED CREDENTIAL
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certificate of BIM Onboarding Readiness
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Professional Competency Verification for Modeling Workflows &amp; Software Fundamentals
            </p>
          </div>

          {/* Recipient */}
          <div className="py-4 space-y-2 border-y border-slate-800/80 max-w-lg mx-auto">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              This is officially awarded to:
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-serif tracking-wide underline decoration-cyan-500/50 underline-offset-8">
              {progress.candidateName || 'Ryan Pascal'}
            </div>
            <p className="text-xs text-slate-300 pt-2 leading-relaxed">
              for successfully demonstrating operational understanding of multi-disciplinary Building Information Modeling (BIM) workflows, collaborative worksharing, clash detection coordination, and software taxonomy.
            </p>
          </div>

          {/* Competency Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto py-2">
            <div className="p-3.5 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-left">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] font-bold text-white block">ISO 19650</span>
              <span className="text-[10px] text-slate-400 block">CDE &amp; BEP Standards</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-left">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] font-bold text-white block">Worksharing</span>
              <span className="text-[10px] text-slate-400 block">Central / Local Sync</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-left">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] font-bold text-white block">Revit Taxonomy</span>
              <span className="text-[10px] text-slate-400 block">Parameters &amp; Families</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-left">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] font-bold text-white block">Clash Detective</span>
              <span className="text-[10px] text-slate-400 block">Navisworks &amp; BCF</span>
            </div>
          </div>

          {/* Certificate Metadata Footer */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto text-xs font-mono text-slate-400">
            <div className="text-left">
              <span className="text-[10px] uppercase block text-slate-500 font-sans font-bold">Verification ID</span>
              <span className="text-cyan-300 font-bold">{certificateId}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase block text-slate-500 font-sans font-bold">Readiness Score</span>
              <span className="text-emerald-400 font-extrabold text-sm">{overallScore}% Verified</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase block text-slate-500 font-sans font-bold">Date of Issuance</span>
              <span className="text-slate-300">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
