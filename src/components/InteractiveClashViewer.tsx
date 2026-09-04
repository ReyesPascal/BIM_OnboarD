import React, { useState } from 'react';
import { 
  Crosshair, 
  Layers, 
  Sliders, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode2, 
  Eye, 
  EyeOff, 
  RefreshCw,
  Maximize2,
  HelpCircle,
  Wrench
} from 'lucide-react';
import { ClashItem, LODData } from '../types';

interface InteractiveClashViewerProps {
  onClashResolved?: () => void;
  onLODExplored?: () => void;
}

const LOD_LEVELS: LODData[] = [
  {
    level: 100,
    name: 'Conceptual Massing',
    definition: 'Generic spatial volume, area, and orientation. No specific shape, materials, or internal components.',
    geometryExample: 'Translucent solid bounding box with wireframe perimeter.',
    dataIncluded: ['Gross Floor Area', 'Target Volume', 'Building Mass Identifier'],
    primaryUse: 'Feasibility, site planning, early massing studies.',
    projectStage: 'Pre-design & Concept'
  },
  {
    level: 200,
    name: 'Generic System',
    definition: 'Approximate size, shape, and location. Represented as a generic placeholder assembly.',
    geometryExample: 'Uniform 8-inch solid wall and rectangular generic 18"x12" duct without fittings.',
    dataIncluded: ['Approximate Dimensions', 'Category Classification', 'Placeholder System Type'],
    primaryUse: 'Schematic spatial coordination, preliminary layouts.',
    projectStage: 'Schematic Design (SD)'
  },
  {
    level: 300,
    name: 'Specific Assembly',
    definition: 'Specific dimensions, quantity, location, orientation, and materials. Accurate system design.',
    geometryExample: 'W14x43 wide-flange steel beam with exact flange/web thickness; galvanized sheet metal duct with radius elbows.',
    dataIncluded: ['Specific Manufacturer or Material Spec', 'Structural Load Capacity', 'Thermal U-Value', 'Airflow CFM'],
    primaryUse: 'Design Development, Construction Documents, Bidding.',
    projectStage: 'Design Development (DD)'
  },
  {
    level: 350,
    name: 'Interfaces & Supports',
    definition: 'Elements include connection details, supports, penetrations, and trade interfaces necessary for coordination.',
    geometryExample: 'Duct with seismic clevis hangers; beam with web penetration sleeves; base plates and anchor bolts.',
    dataIncluded: ['Clearance Zones', 'Penetration Sleeve IDs', 'Hanger Spacing', 'Firestop Seal Ratings'],
    primaryUse: 'Multi-trade spatial coordination and clash detection.',
    projectStage: 'Pre-Construction Coordination'
  },
  {
    level: 400,
    name: 'Fabrication & Assembly',
    definition: 'Fabrication-level detail with shop drawing tolerances, weld specs, stiffeners, and assembly instructions.',
    geometryExample: 'Duct with TDC flange connections, damper actuators, and reinforcement seams; beam with welded shear tabs.',
    dataIncluded: ['Fabrication Spool Sheet IDs', 'Part Serial Numbers', 'Installation Sequence Codes'],
    primaryUse: 'Direct CNC fabrication, field procurement, and installation.',
    projectStage: 'Subcontractor Shop Drawings'
  }
];

const INITIAL_CLASHES: ClashItem[] = [
  {
    id: 'CLASH-101',
    title: 'Supply Air Duct vs. Primary Steel Girder',
    disciplineA: 'MEP',
    itemA: 'Rectangular Supply Duct 24"x16" (HVAC-Supply-L02)',
    disciplineB: 'Structure',
    itemB: 'W14x43 Wide-Flange Girder (ST-G-108)',
    type: 'Hard Clash',
    severity: 'Critical',
    status: 'New',
    recommendedAction: 'Apply double 45° offset transition on HVAC duct to route 6" below bottom of beam flange.',
    location: 'Grid B-2, Level 2 Plenum',
    bcfGuid: '4a8b2f91-c1e0-4a81-9876-098234fedcba'
  },
  {
    id: 'CLASH-102',
    title: 'Hydronic Chilled Water Pipe vs. 2-Hr Fire Wall',
    disciplineA: 'MEP',
    itemA: 'Chilled Water Supply Pipe 4" Ø (HYD-CHW-04)',
    disciplineB: 'Architecture',
    itemB: '2-Hr Fire Partition Wall (WALL-F2-204)',
    type: 'Clearance / Soft Clash',
    severity: 'High',
    status: 'New',
    recommendedAction: 'Architect to insert UL-approved 6" firestop penetration sleeve with intumescent acoustic collar.',
    location: 'Corridor 204 Demising Wall',
    bcfGuid: '7b91e42c-091f-4cd2-b34e-8761234509ab'
  },
  {
    id: 'CLASH-103',
    title: 'Electrical Cable Tray vs. VAV Access Clearance',
    disciplineA: 'MEP',
    itemA: 'Ladder Cable Tray 18"W (ELEC-CT-201)',
    disciplineB: 'MEP',
    itemB: 'VAV Terminal Box Maintenance Clearance Zone (MEP-VAV-12)',
    type: 'Clearance / Soft Clash',
    severity: 'Medium',
    status: 'New',
    recommendedAction: 'Shift electrical cable tray 14 inches toward Grid C to respect 36" maintenance clearance.',
    location: 'Conference Room 210 Ceiling Plenum',
    bcfGuid: 'c91209ff-8123-49aa-9912-abcdef123456'
  }
];

interface ElementProperty {
  category: string;
  family: string;
  type: string;
  instanceId: string;
  level: string;
  workset: string;
  material: string;
  customParam: { label: string; value: string };
}

export const InteractiveClashViewer: React.FC<InteractiveClashViewerProps> = ({
  onClashResolved,
  onLODExplored
}) => {
  // Viewer States
  const [showArch, setShowArch] = useState(true);
  const [showStruct, setShowStruct] = useState(true);
  const [showMep, setShowMep] = useState(true);
  const [lodIndex, setLodIndex] = useState(2); // LOD 300 default
  const [clashTestRun, setClashTestRun] = useState(false);
  const [clashes, setClashes] = useState<ClashItem[]>(INITIAL_CLASHES);
  const [selectedClash, setSelectedClash] = useState<ClashItem | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementProperty | null>({
    category: 'Structural Framing',
    family: 'W-Wide Flange',
    type: 'W14x43',
    instanceId: '389201',
    level: 'Level 2 Floor',
    workset: 'ST_Framing_Primary',
    material: 'Steel, ASTM A992 Grade 50',
    customParam: { label: 'Structural Usage', value: 'Girder / Moment Frame' }
  });
  const [showBcfModal, setShowBcfModal] = useState(false);
  const [resolutionMode, setResolutionMode] = useState<string>('offset');

  const currentLOD = LOD_LEVELS[lodIndex];

  // Run clash test simulation
  const handleRunClashTest = () => {
    setClashTestRun(true);
    if (!selectedClash) {
      setSelectedClash(clashes[0]);
    }
  };

  // Resolve clash handler
  const handleResolveClash = (clashId: string) => {
    setClashes(prev =>
      prev.map(c => {
        if (c.id === clashId) {
          return {
            ...c,
            status: 'Resolved',
            resolutionNote: resolutionMode === 'offset' 
              ? 'Duct offset applied (6" bottom clearance achieved).' 
              : 'Structural web sleeve approved per AISC engineering guidelines.'
          };
        }
        return c;
      })
    );
    if (selectedClash?.id === clashId) {
      setSelectedClash(prev => prev ? { ...prev, status: 'Resolved' } : null);
    }
    if (onClashResolved) onClashResolved();
  };

  const handleLODChange = (newIndex: number) => {
    setLodIndex(newIndex);
    if (onLODExplored) onLODExplored();
  };

  // Check if primary duct clash is resolved to adjust SVG visual
  const ductClashResolved = clashes.find(c => c.id === 'CLASH-101')?.status === 'Resolved';

  return (
    <div className="space-y-6">
      
      {/* Top Intro Banner */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                <Crosshair className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-white">Interactive 3D Multi-Discipline Clash Lab</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-semibold">
                Live Simulator
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Experience real-world spatial coordination. Toggle discipline models, adjust the Level of Development (LOD) slider to see geometric evolution, run automated clash batches, and inspect Revit-style parameter metadata.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="run-clash-batch-btn"
              onClick={handleRunClashTest}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                clashTestRun
                  ? 'bg-slate-800/80 text-slate-300 border border-slate-700/80 hover:bg-slate-700/80'
                  : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-950/50 animate-pulse'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${clashTestRun ? '' : 'animate-spin'}`} />
              {clashTestRun ? 'Re-Run Clash Batch' : 'Run Clash Detection'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Canvas & Inspection Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 3D Isometric Canvas & Toolbar (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl flex flex-col">
            
            {/* Canvas Header Controls */}
            <div className="bg-[#0B0E14] px-4 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              
              {/* Discipline Model Toggles */}
              <div className="flex items-center gap-1.5 bg-[#101522] p-1 rounded-xl border border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-400 px-2">Disciplines:</span>
                
                <button
                  onClick={() => setShowArch(!showArch)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    showArch 
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50' 
                      : 'text-slate-500 hover:text-slate-300 opacity-60'
                  }`}
                  title="Toggle Architecture (Walls, Slab, Windows)"
                >
                  {showArch ? <Eye className="w-3 h-3 text-blue-400" /> : <EyeOff className="w-3 h-3" />}
                  Arch
                </button>

                <button
                  onClick={() => setShowStruct(!showStruct)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    showStruct 
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50' 
                      : 'text-slate-500 hover:text-slate-300 opacity-60'
                  }`}
                  title="Toggle Structure (Beams, Columns)"
                >
                  {showStruct ? <Eye className="w-3 h-3 text-amber-400" /> : <EyeOff className="w-3 h-3" />}
                  Struct
                </button>

                <button
                  onClick={() => setShowMep(!showMep)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    showMep 
                      ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/50' 
                      : 'text-slate-500 hover:text-slate-300 opacity-60'
                  }`}
                  title="Toggle MEP (HVAC, Pipes, Trays)"
                >
                  {showMep ? <Eye className="w-3 h-3 text-cyan-400" /> : <EyeOff className="w-3 h-3" />}
                  MEP
                </button>
              </div>

              {/* Viewport Info Pill */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px]">Isometric Bay L02-Grid B</span>
              </div>
            </div>

            {/* SVG 3D Isometric Viewport */}
            <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#0B0E14] via-[#0d121c] to-[#0B0E14] flex items-center justify-center p-4 select-none overflow-hidden">
              
              {/* Background Construction Grid Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="iso-grid" width="40" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 0 12 L 20 0 L 40 12 L 20 24 Z" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#iso-grid)" />
              </svg>

              {/* Interactive Isometric Building Bay SVG */}
              <svg 
                viewBox="0 0 800 500" 
                className="w-full h-full max-h-[460px] drop-shadow-2xl transition-all duration-500"
              >
                <defs>
                  {/* Gradients for 3D Shading */}
                  <linearGradient id="concreteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  
                  <linearGradient id="steelBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#92400e" />
                  </linearGradient>

                  <linearGradient id="ductGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>

                  <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>

                  <linearGradient id="cableTrayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  
                  {/* Flashing clash animation marker */}
                  <filter id="clashGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* --- 1. ARCHITECTURE: Concrete Floor Slab (Bottom) --- */}
                {showArch && (
                  <g 
                    className="cursor-pointer transition-opacity duration-300"
                    onClick={() => setSelectedElement({
                      category: 'Floors',
                      family: 'Floor: Cast-in-Place Concrete',
                      type: 'Concrete Slab with Metal Deck 6"',
                      instanceId: '102948',
                      level: 'Level 2 Finished Floor',
                      workset: 'AR_Shell_Slabs',
                      material: 'Concrete, Structural Lightweight 4000 PSI',
                      customParam: { label: 'Structural', value: 'Yes (Load-Bearing)' }
                    })}
                  >
                    {/* Top Face of Floor Slab */}
                    <polygon 
                      points="120,380 400,240 680,380 400,480" 
                      fill="#1e293b" 
                      stroke="#475569" 
                      strokeWidth="1.5" 
                    />
                    {/* Front Left Edge */}
                    <polygon 
                      points="120,380 400,480 400,500 120,400" 
                      fill="#0f172a" 
                      stroke="#334155" 
                      strokeWidth="1" 
                    />
                    {/* Front Right Edge */}
                    <polygon 
                      points="400,480 680,380 680,400 400,500" 
                      fill="#0b1120" 
                      stroke="#334155" 
                      strokeWidth="1" 
                    />
                  </g>
                )}

                {/* --- 2. STRUCTURE: Columns & Framing --- */}
                {showStruct && (
                  <g 
                    className="cursor-pointer"
                    onClick={() => setSelectedElement({
                      category: 'Structural Framing',
                      family: 'W-Wide Flange Girder',
                      type: 'W14x43 Structural Steel',
                      instanceId: '389201',
                      level: 'Level 2 Floor',
                      workset: 'ST_Framing_Primary',
                      material: 'Steel, ASTM A992 Grade 50',
                      customParam: { label: 'Structural Usage', value: 'Girder / Moment Connection' }
                    })}
                  >
                    {/* Left Column (Grid A2) */}
                    <polygon points="190,140 215,128 215,348 190,360" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                    <polygon points="215,128 240,140 240,360 215,348" fill="#78350f" stroke="#d97706" strokeWidth="1" />
                    
                    {/* Right Column (Grid B2) */}
                    <polygon points="560,140 585,128 585,348 560,360" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                    <polygon points="585,128 610,140 610,360 585,348" fill="#78350f" stroke="#d97706" strokeWidth="1" />

                    {/* Main Structural Steel Girder Beam spanning between Columns */}
                    <g>
                      {/* Top Flange */}
                      <polygon points="215,130 585,130 575,145 205,145" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
                      {/* Web */}
                      <polygon points="210,145 580,145 580,210 210,210" fill="url(#steelBeamGrad)" stroke="#b45309" strokeWidth="1.5" />
                      {/* Bottom Flange */}
                      <polygon points="210,210 580,210 570,225 200,225" fill="#92400e" stroke="#d97706" strokeWidth="1.5" />
                      
                      {/* Stiffener plates if LOD >= 350 */}
                      {lodIndex >= 3 && (
                        <>
                          <line x1="330" y1="145" x2="330" y2="210" stroke="#f59e0b" strokeWidth="3" />
                          <line x1="470" y1="145" x2="470" y2="210" stroke="#f59e0b" strokeWidth="3" />
                        </>
                      )}
                    </g>
                  </g>
                )}

                {/* --- 3. ARCHITECTURE: Interior 2-Hr Fire Wall --- */}
                {showArch && (
                  <g 
                    className="cursor-pointer"
                    onClick={() => setSelectedElement({
                      category: 'Walls',
                      family: 'Basic Wall: Interior',
                      type: '2-Hr Fire Partition 6" Metal Stud',
                      instanceId: '492018',
                      level: 'Level 2 Floor',
                      workset: 'AR_Partitions_Core',
                      material: '5/8" Type X Gypsum Board / Mineral Wool',
                      customParam: { label: 'Fire Rating', value: '2 Hours (UL-U411)' }
                    })}
                  >
                    {/* Semi-translucent partition wall sliced on right side */}
                    <polygon 
                      points="470,210 540,175 540,360 470,395" 
                      fill="#3b82f6" 
                      fillOpacity="0.25" 
                      stroke="#60a5fa" 
                      strokeWidth="1.5" 
                      strokeDasharray={lodIndex < 2 ? "4 4" : "none"}
                    />
                    <polygon 
                      points="455,217 470,210 470,395 455,402" 
                      fill="#1d4ed8" 
                      fillOpacity="0.4" 
                      stroke="#3b82f6" 
                      strokeWidth="1" 
                    />
                  </g>
                )}

                {/* --- 4. MEP: HVAC Rectangular Supply Air Duct --- */}
                {showMep && (
                  <g 
                    className="cursor-pointer"
                    onClick={() => setSelectedElement({
                      category: 'Ducts',
                      family: 'Rectangular Duct',
                      type: '24" x 16" Supply Air Duct',
                      instanceId: '582049',
                      level: 'Level 2 Floor',
                      workset: 'MEP_HVAC_Supply',
                      material: 'Galvanized Sheet Metal Gauge 22',
                      customParam: { label: 'Calculated Airflow', value: '1,850 CFM' }
                    })}
                  >
                    {ductClashResolved ? (
                      /* Resolved Path: Offset goes cleanly UNDER the beam flange */
                      <g className="transition-all duration-500">
                        {/* Approaching duct segment */}
                        <polygon points="340,80 390,105 390,150 340,125" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                        {/* Downward 45-degree offset transition */}
                        <polygon points="390,105 390,235 340,210 340,125" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                        {/* Continuing horizontal duct run passing below beam flange */}
                        <polygon points="390,235 440,260 440,305 390,280" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                        <polygon points="440,260 490,285 490,330 440,305" fill="#075985" stroke="#38bdf8" strokeWidth="1.5" />
                        
                        {/* Green Resolved Tag */}
                        <circle cx="390" cy="245" r="14" fill="#059669" />
                        <path d="M 384 245 L 388 249 L 396 241" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                      </g>
                    ) : (
                      /* Clashing Path: Duct passes right through the steel beam web! */
                      <g>
                        {/* Front Segment */}
                        <polygon points="340,135 420,175 420,225 340,185" fill="url(#ductGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                        {/* Top Face */}
                        <polygon points="340,135 390,110 470,150 420,175" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                        {/* Back exiting segment passing straight through the beam */}
                        <polygon points="420,175 500,215 500,265 420,225" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                        
                        {/* Flange seams if LOD >= 300 */}
                        {lodIndex >= 2 && (
                          <>
                            <line x1="380" y1="155" x2="380" y2="205" stroke="#bae6fd" strokeWidth="2" />
                            <line x1="460" y1="195" x2="460" y2="245" stroke="#bae6fd" strokeWidth="2" />
                          </>
                        )}
                      </g>
                    )}
                  </g>
                )}

                {/* --- 5. MEP: Hydronic Chilled Water Pipe (Blue) --- */}
                {showMep && (
                  <g 
                    className="cursor-pointer"
                    onClick={() => setSelectedElement({
                      category: 'Pipes',
                      family: 'Chilled Water Supply',
                      type: 'Carbon Steel Schedule 40 - 4" Ø',
                      instanceId: '772109',
                      level: 'Level 2 Floor',
                      workset: 'MEP_Piping_Hydronic',
                      material: 'Steel Carbon ASTM A53',
                      customParam: { label: 'Fluid Temperature', value: '44°F (6.7°C)' }
                    })}
                  >
                    <path 
                      d="M 280,240 L 520,360" 
                      stroke="#2563eb" 
                      strokeWidth={lodIndex >= 2 ? "12" : "6"} 
                      strokeLinecap="round" 
                    />
                    {/* Pipe insulation boundary if LOD >= 300 */}
                    {lodIndex >= 2 && (
                      <path 
                        d="M 280,240 L 520,360" 
                        stroke="#60a5fa" 
                        strokeWidth="16" 
                        strokeOpacity="0.4"
                        strokeLinecap="round" 
                      />
                    )}
                  </g>
                )}

                {/* --- 6. MEP: Electrical Cable Tray (Amber) --- */}
                {showMep && (
                  <g 
                    className="cursor-pointer"
                    onClick={() => setSelectedElement({
                      category: 'Cable Trays',
                      family: 'Ladder Cable Tray',
                      type: '18" Width x 4" Depth Aluminum',
                      instanceId: '901234',
                      level: 'Level 2 Floor',
                      workset: 'MEP_Electrical_Feeders',
                      material: 'Aluminum 6063-T6',
                      customParam: { label: 'Fill Capacity', value: '45% NEC Compliant' }
                    })}
                  >
                    <path 
                      d="M 220,180 L 360,250" 
                      stroke="#f59e0b" 
                      strokeWidth={lodIndex >= 2 ? "14" : "8"} 
                      strokeDasharray={lodIndex >= 3 ? "6 3" : "none"}
                    />
                  </g>
                )}

                {/* --- 7. CLASH DETECTION MARKERS (When Clash Test is active) --- */}
                {clashTestRun && (
                  <g>
                    {/* Clash #101: Duct vs Beam Web */}
                    {!ductClashResolved && (
                      <g 
                        className="cursor-pointer group"
                        onClick={() => setSelectedClash(clashes[0])}
                      >
                        <circle 
                          cx="405" 
                          cy="180" 
                          r="22" 
                          fill="#ef4444" 
                          fillOpacity="0.3" 
                          className="animate-ping" 
                        />
                        <circle 
                          cx="405" 
                          cy="180" 
                          r="16" 
                          fill="#dc2626" 
                          stroke="#ffffff" 
                          strokeWidth="2.5" 
                        />
                        <text 
                          x="405" 
                          y="185" 
                          textAnchor="middle" 
                          fill="#ffffff" 
                          fontSize="12" 
                          fontWeight="bold"
                        >
                          !
                        </text>
                        <text 
                          x="405" 
                          y="150" 
                          textAnchor="middle" 
                          fill="#f87171" 
                          fontSize="11" 
                          fontWeight="bold"
                          className="drop-shadow"
                        >
                          CLASH #101: Duct / Beam
                        </text>
                      </g>
                    )}

                    {/* Clash #102: Pipe vs Fire Wall */}
                    {clashes.find(c => c.id === 'CLASH-102')?.status !== 'Resolved' && (
                      <g 
                        className="cursor-pointer group"
                        onClick={() => setSelectedClash(clashes[1])}
                      >
                        <circle 
                          cx="480" 
                          cy="340" 
                          r="18" 
                          fill="#f59e0b" 
                          fillOpacity="0.3" 
                          className="animate-ping" 
                        />
                        <circle 
                          cx="480" 
                          cy="340" 
                          r="13" 
                          fill="#d97706" 
                          stroke="#ffffff" 
                          strokeWidth="2" 
                        />
                        <text 
                          x="480" 
                          y="344" 
                          textAnchor="middle" 
                          fill="#ffffff" 
                          fontSize="11" 
                          fontWeight="bold"
                        >
                          2
                        </text>
                      </g>
                    )}

                    {/* Clash #103: Cable Tray vs Maintenance */}
                    {clashes.find(c => c.id === 'CLASH-103')?.status !== 'Resolved' && (
                      <g 
                        className="cursor-pointer group"
                        onClick={() => setSelectedClash(clashes[2])}
                      >
                        <circle 
                          cx="290" 
                          cy="215" 
                          r="14" 
                          fill="#f97316" 
                          fillOpacity="0.3" 
                          className="animate-pulse" 
                        />
                        <circle 
                          cx="290" 
                          cy="215" 
                          r="10" 
                          fill="#ea580c" 
                          stroke="#ffffff" 
                          strokeWidth="1.5" 
                        />
                        <text 
                          x="290" 
                          y="219" 
                          textAnchor="middle" 
                          fill="#ffffff" 
                          fontSize="9" 
                          fontWeight="bold"
                        >
                          3
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* Level Tag Overlay */}
                <text x="130" y="420" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="600">
                  LEVEL 02 • ELEV: +14&apos;-0&quot;
                </text>
                <text x="640" y="360" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="600">
                  GRID B / BAY 2-3
                </text>
              </svg>

              {/* Viewport Overlay Helper */}
              <div className="absolute bottom-3 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Click any 3D element to inspect Revit properties or click numbered clash flags</span>
              </div>
            </div>

            {/* Bottom Slider: Level of Development (LOD 100 - 400) */}
            <div className="bg-slate-950 px-5 py-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Level of Development (LOD) Slider:
                  </span>
                  <span className="text-xs font-extrabold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
                    LOD {currentLOD.level} - {currentLOD.name}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Stage: <strong className="text-slate-200">{currentLOD.projectStage}</strong>
                </span>
              </div>

              {/* Step Slider */}
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={lodIndex}
                  onChange={(e) => handleLODChange(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                  {LOD_LEVELS.map((lod, idx) => (
                    <button
                      key={lod.level}
                      onClick={() => handleLODChange(idx)}
                      className={`hover:text-cyan-400 transition-colors ${
                        lodIndex === idx ? 'text-cyan-400 font-bold underline' : ''
                      }`}
                    >
                      LOD {lod.level}
                    </button>
                  ))}
                </div>
              </div>

              {/* LOD Context Box */}
              <div className="p-4 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Geometric Fidelity:</span>
                  <p className="text-slate-300">{currentLOD.definition}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Reliable Data Embedded:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentLOD.dataIncluded.map((dataItem, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-[#101522] text-cyan-300 border border-slate-700/80">
                        {dataItem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Column: Clash Inspector & Element Property Palette (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Clash Inspection & Resolution Card */}
          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-bold text-white">Clash Detective Batch</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0B0E14] text-slate-300 border border-slate-700/80">
                {clashes.filter(c => c.status === 'Resolved').length}/{clashes.length} Resolved
              </span>
            </div>

            {/* Clash List */}
            <div className="space-y-2">
              {clashes.map((clash) => {
                const isSelected = selectedClash?.id === clash.id;
                const isResolved = clash.status === 'Resolved';
                return (
                  <button
                    key={clash.id}
                    onClick={() => setSelectedClash(clash)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-slate-800/70 border-cyan-500/70 shadow-md'
                        : 'bg-[#0B0E14] border-slate-800/80 hover:border-slate-700/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          isResolved 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : clash.severity === 'Critical'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {clash.status}
                        </span>
                        <span className="font-bold text-slate-200">{clash.id}</span>
                      </div>
                      <p className="font-medium text-slate-300 line-clamp-1">{clash.title}</p>
                      <span className="text-[11px] text-slate-400">{clash.location}</span>
                    </div>

                    {isResolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Clash Details & Action Panel */}
            {selectedClash && (
              <div className="p-4 rounded-2xl bg-[#0B0E14] border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{selectedClash.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#101522] text-slate-400 border border-slate-800">
                    {selectedClash.type}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#101522] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block">Item 1 ({selectedClash.disciplineA}):</span>
                    <span className="text-slate-300 font-mono text-[11px]">{selectedClash.itemA}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#101522] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block">Item 2 ({selectedClash.disciplineB}):</span>
                    <span className="text-slate-300 font-mono text-[11px]">{selectedClash.itemB}</span>
                  </div>
                </div>

                {/* Coordination Recommended Resolution */}
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs">
                  <span className="text-[10px] uppercase font-bold text-blue-300 flex items-center gap-1 mb-1">
                    <Wrench className="w-3 h-3" /> Recommended Trade Action:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{selectedClash.recommendedAction}</p>
                </div>

                {/* Resolution Controls */}
                {selectedClash.status !== 'Resolved' ? (
                  <div className="space-y-2 pt-1">
                    <label className="text-[11px] text-slate-400 block font-medium">Select Resolution Strategy:</label>
                    <select
                      value={resolutionMode}
                      onChange={(e) => setResolutionMode(e.target.value)}
                      className="w-full bg-[#101522] border border-slate-700/80 text-slate-200 text-xs rounded-xl p-2.5 focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="offset">MEP Duct 45° Offset (Route 6&quot; Below Beam Flange)</option>
                      <option value="sleeve">Structural Web Sleeve (Verify AISC Central 1/3 Span Criteria)</option>
                    </select>

                    <button
                      onClick={() => handleResolveClash(selectedClash.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Apply Resolution &amp; Update Model
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Clash verified &amp; resolved in coordination model.</span>
                  </div>
                )}

                {/* BCF Issue Snapshot Button */}
                <button
                  onClick={() => setShowBcfModal(true)}
                  className="w-full py-2 px-3 rounded-xl bg-[#101522] hover:bg-slate-800/80 text-slate-300 border border-slate-700/80 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-purple-400" />
                  View BCF (OpenBIM) Issue Payload
                </button>

              </div>
            )}
          </div>

          {/* Revit-Style Properties Palette for Selected 3D Element */}
          {selectedElement && (
            <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Revit Properties Palette</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0B0E14] text-cyan-300 border border-slate-800">
                  ID: {selectedElement.instanceId}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-slate-200 font-medium">{selectedElement.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Family:</span>
                  <span className="text-slate-200 font-medium">{selectedElement.family}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-cyan-300 font-medium">{selectedElement.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Reference Level:</span>
                  <span className="text-slate-200">{selectedElement.level}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Workset:</span>
                  <span className="text-amber-300">{selectedElement.workset}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Material:</span>
                  <span className="text-slate-200 text-right truncate max-w-[180px]">{selectedElement.material}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">{selectedElement.customParam.label}:</span>
                  <span className="text-emerald-300 font-semibold">{selectedElement.customParam.value}</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                In Revit and BIM tools, selecting any object opens this palette. Changing Type Parameters here updates all instances in the project.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* BCF OpenBIM Export Modal */}
      {showBcfModal && selectedClash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">BCF (BIM Collaboration Format) Snippet</h3>
              </div>
              <button 
                onClick={() => setShowBcfModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of emailing gigabytes of models, OpenBIM issue trackers (Revizto, BIM Track, Solibri) exchange lightweight BCF payloads containing exact camera coordinates and element GUIDs:
            </p>

            <div className="bg-[#0B0E14] p-4 rounded-2xl border border-slate-800/80 overflow-x-auto font-mono text-[11px] text-purple-300">
              <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<Topic Guid="${selectedClash.bcfGuid}" TopicType="Clash" TopicStatus="${selectedClash.status}">
  <Title>${selectedClash.title}</Title>
  <Priority>${selectedClash.severity}</Priority>
  <AssignedTo>lead.mep@coordination.bim</AssignedTo>
  <Description>${selectedClash.recommendedAction}</Description>
  <Viewpoint Guid="8a9b2c3d-e4f5-6789-0123-abcdef456789">
    <CameraViewPoint>
      <X>405.24</X><Y>180.15</Y><Z>14.00</Z>
    </CameraViewPoint>
    <CameraDirection>
      <X>-0.707</X><Y>0.000</Y><Z>-0.707</Z>
    </CameraDirection>
    <Components>
      <Component IfcGuid="2O2$U$pointy8734h" Selected="true" Color="red"/>
      <Component IfcGuid="3B9$Z$girder2345k" Selected="true" Color="yellow"/>
    </Components>
  </Viewpoint>
</Topic>`}</pre>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedClash.bcfGuid);
                  alert('BCF GUID copied to clipboard!');
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Copy BCF GUID
              </button>
              <button
                onClick={() => setShowBcfModal(false)}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
