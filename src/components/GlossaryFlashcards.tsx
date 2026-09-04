import React, { useState } from 'react';
import { 
  BookA, 
  Search, 
  Filter, 
  RotateCw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Share2, 
  Layers, 
  BookmarkCheck,
  Tag
} from 'lucide-react';
import { GlossaryTerm, TermCategory } from '../types';
import { BIM_GLOSSARY } from '../data/bimGlossary';

interface GlossaryFlashcardsProps {
  masteredTerms: string[];
  onToggleMastered: (termId: string) => void;
}

export const GlossaryFlashcards: React.FC<GlossaryFlashcardsProps> = ({
  masteredTerms,
  onToggleMastered
}) => {
  const [mode, setMode] = useState<'dictionary' | 'flashcards'>('dictionary');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Flashcard practice state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories: string[] = [
    'All',
    'Standards & Process',
    'Modeling & Software',
    'Coordination & Clashes',
    'Data & Formats'
  ];

  // Filter terms
  const filteredTerms = BIM_GLOSSARY.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      item.term.toLowerCase().includes(query) ||
      (item.acronym && item.acronym.toLowerCase().includes(query)) ||
      item.definition.toLowerCase().includes(query) ||
      item.realWorldExample.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const currentFlashcard = filteredTerms[cardIndex] || filteredTerms[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % filteredTerms.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + filteredTerms.length) % filteredTerms.length);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Mode Toggle */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
                <BookA className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-white">BIM Industry Terminology &amp; Flashcards</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
                {masteredTerms.length}/{BIM_GLOSSARY.length} Mastered
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Every acronym, file format, standard, and software term you will hear in team meetings. Learn the formal definitions plus practical &quot;Day 1 Interview Tips&quot; on how to discuss them with senior coordinators.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-[#0B0E14] p-1.5 rounded-2xl border border-slate-800/80 shrink-0">
            <button
              onClick={() => setMode('dictionary')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                mode === 'dictionary'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Glossary Index
            </button>
            <button
              onClick={() => {
                setMode('flashcards');
                setIsFlipped(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                mode === 'flashcards'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Flashcards
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search terms, acronyms (IFC, BCF, CDE)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0E14] border border-slate-800/80 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/80'
                    : 'bg-[#0B0E14] text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode 1: Interactive Flashcards Practice */}
      {mode === 'flashcards' && currentFlashcard && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Card {cardIndex + 1} of {filteredTerms.length}</span>
            <span className="text-indigo-400 font-semibold">{currentFlashcard.category}</span>
          </div>

          {/* 3D-Like Flipping Flashcard Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[320px] bg-[#101522] border border-slate-800/80 hover:border-indigo-500/60 rounded-3xl p-8 shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-300 relative group select-none"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                {isFlipped ? 'Definition & Practical Application' : 'Industry Term / Acronym'}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-indigo-300 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                Click anywhere to flip
              </span>
            </div>

            {/* Front vs Back Content */}
            {!isFlipped ? (
              <div className="my-auto text-center space-y-3 py-6">
                {currentFlashcard.acronym && (
                  <span className="inline-block px-3 py-1 rounded-xl bg-indigo-950/80 text-indigo-300 font-mono text-xs font-bold border border-indigo-800/80 mb-2">
                    {currentFlashcard.acronym}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentFlashcard.term}
                </h3>
                <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
                  How would you define this in a BIM onboarding interview? Click card to reveal definition and practical context.
                </p>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <div>
                  <h4 className="text-sm font-bold text-indigo-300 mb-1">{currentFlashcard.term}</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">{currentFlashcard.definition}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B0E14] border border-slate-800/90 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Real-World Job Application:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{currentFlashcard.realWorldExample}</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                    How to Explain in an Interview:
                  </span>
                  <p className="text-purple-200/90 italic leading-relaxed">{currentFlashcard.interviewTip}</p>
                </div>
              </div>
            )}

            {/* Card Footer Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => onToggleMastered(currentFlashcard.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  masteredTerms.includes(currentFlashcard.id)
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                    : 'bg-[#0B0E14] text-slate-300 hover:bg-slate-800/80 border border-slate-800/80'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {masteredTerms.includes(currentFlashcard.id) ? 'Mastered!' : 'Mark as Mastered'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCard}
                  className="px-3.5 py-2 rounded-xl bg-[#0B0E14] hover:bg-slate-800/80 text-slate-300 text-xs font-semibold border border-slate-800/80"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextCard}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-950"
                >
                  Next Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Dictionary Grid Index */}
      {mode === 'dictionary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((term) => {
            const isMastered = masteredTerms.includes(term.id);
            return (
              <div
                key={term.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                  isMastered
                    ? 'bg-[#101522] border-emerald-800/50 shadow-sm'
                    : 'bg-[#101522] border-slate-800/80 hover:border-slate-700/80'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {term.acronym && (
                        <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 mb-1">
                          {term.acronym}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-white tracking-tight">{term.term}</h3>
                    </div>

                    <button
                      onClick={() => onToggleMastered(term.id)}
                      className={`p-1.5 rounded-xl transition-colors ${
                        isMastered ? 'text-emerald-400 bg-emerald-950/80 border border-emerald-800/60' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isMastered ? 'Mastered' : 'Click to mark mastered'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="inline-block text-[10px] uppercase font-bold text-slate-400 bg-[#0B0E14] px-2.5 py-0.5 rounded-full border border-slate-800/80">
                    {term.category}
                  </span>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {term.definition}
                  </p>

                  <div className="p-3 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-[11px] space-y-1">
                    <span className="font-bold text-cyan-400 block text-[10px] uppercase">Example on the Job:</span>
                    <p className="text-slate-300 leading-relaxed">{term.realWorldExample}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-purple-300/90 italic truncate max-w-[200px]" title={term.interviewTip}>
                    Tip: {term.interviewTip}
                  </span>
                  <div className="flex gap-1">
                    {term.relatedTerms.slice(0, 2).map((rel, i) => (
                      <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#0B0E14] text-slate-400 border border-slate-800">
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
