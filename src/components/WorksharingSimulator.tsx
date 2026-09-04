import React, { useState } from 'react';
import { 
  GitMerge, 
  Server, 
  Laptop, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Send, 
  Save, 
  ShieldAlert,
  Clock,
  Sparkles
} from 'lucide-react';

interface WorksharingSimulatorProps {
  onSyncCompleted?: () => void;
}

interface AuditLogEntry {
  timestamp: string;
  user: string;
  action: string;
  workset: string;
  details: string;
}

export const WorksharingSimulator: React.FC<WorksharingSimulatorProps> = ({
  onSyncCompleted
}) => {
  // State Steps: 1: Open/Create Local, 2: Borrow Elements, 3: Colleague Request, 4: Synchronize & Relinquish, 5: Complete
  const [step, setStep] = useState<number>(1);
  const [localFileCreated, setLocalFileCreated] = useState<boolean>(false);
  const [activeWorkset, setActiveWorkset] = useState<string>('AR_Interior_Partitions');
  const [borrowedElements, setBorrowedElements] = useState<string[]>([]);
  const [sarahRequestPending, setSarahRequestPending] = useState<boolean>(false);
  const [sarahGranted, setSarahGranted] = useState<boolean>(false);
  const [compactCentral, setCompactCentral] = useState<boolean>(true);
  const [relinquishBorrowed, setRelinquishBorrowed] = useState<boolean>(true);
  const [syncHistory, setSyncHistory] = useState<AuditLogEntry[]>([
    {
      timestamp: '08:30:12 AM',
      user: 'Sarah_K (Lead)',
      action: 'Synchronize with Central',
      workset: 'ST_Core_ShearWalls',
      details: 'Adjusted core elevator shaft dimensions +200mm'
    }
  ]);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);

  // Step 1: Create Local File
  const handleCreateLocal = () => {
    setLocalFileCreated(true);
    setSyncHistory(prev => [
      {
        timestamp: new Date().toLocaleTimeString(),
        user: 'You (Modeler A)',
        action: 'Created Local Copy',
        workset: 'Project Defaults',
        details: 'Generated local copy Hospital_Arch_Local_Ryan.rvt from Central'
      },
      ...prev
    ]);
    setStep(2);
  };

  // Step 2: Borrow element
  const handleBorrowElement = (elemName: string) => {
    if (!borrowedElements.includes(elemName)) {
      setBorrowedElements(prev => [...prev, elemName]);
      setSyncHistory(prev => [
        {
          timestamp: new Date().toLocaleTimeString(),
          user: 'You (Modeler A)',
          action: 'Element Borrowed',
          workset: activeWorkset,
          details: `Modified & locked ownership of ${elemName}`
        },
        ...prev
      ]);
    }
  };

  // Step 3: Trigger Colleague request
  const handleTriggerSarahRequest = () => {
    setSarahRequestPending(true);
    setStep(3);
  };

  // Grant Sarah's request
  const handleGrantSarah = () => {
    setSarahGranted(true);
    setSarahRequestPending(false);
    setStep(4);
  };

  // Step 4: Synchronize with Central
  const handleSyncWithCentral = () => {
    setSyncSuccess(true);
    setBorrowedElements([]);
    setSyncHistory(prev => [
      {
        timestamp: new Date().toLocaleTimeString(),
        user: 'You (Modeler A)',
        action: 'Synchronize with Central (SWC)',
        workset: activeWorkset,
        details: `Saved changes to central server. Relinquished all borrowed elements. Compacted database.`
      },
      ...prev
    ]);
    setStep(5);
    if (onSyncCompleted) onSyncCompleted();
  };

  const handleReset = () => {
    setStep(1);
    setLocalFileCreated(false);
    setBorrowedElements([]);
    setSarahRequestPending(false);
    setSarahGranted(false);
    setSyncSuccess(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/60">
                <GitMerge className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-white">Central Model &amp; Worksharing Lab</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-400 border border-amber-800/60 font-semibold">
                Day 1 Survival Skills
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Step through the exact collaborative cycle in Autodesk Revit and ACC. Learn why opening a Central file directly is forbidden, how element borrowing prevents overwrites, and how to synchronize cleanly without corrupting team files.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold border border-slate-700/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Simulation
          </button>
        </div>
      </div>

      {/* Interactive Worksharing Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visual Architecture (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Topology Architecture Diagram */}
          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              Multi-User BIM Architecture Topology
            </h3>

            {/* Topology Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Node 1: Modeler A (You) */}
              <div className={`p-4 rounded-2xl border transition-all ${
                localFileCreated 
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/50' 
                  : 'bg-[#0B0E14] border-slate-800/80 opacity-70'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">Modeler A (You)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 font-mono border border-cyan-800/60">
                    Local Workstation
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="text-slate-400">
                    File: <strong className="text-cyan-300 font-normal">
                      {localFileCreated ? 'Hospital_Local_Ryan.rvt' : 'No local file open'}
                    </strong>
                  </div>
                  <div className="text-slate-400">
                    Active Workset: <span className="text-slate-200">{activeWorkset}</span>
                  </div>
                  <div className="text-slate-400">
                    Borrowed: <span className="text-amber-300">{borrowedElements.length} element(s)</span>
                  </div>
                </div>

                {borrowedElements.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1">
                    {borrowedElements.map((elem, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        {elem}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Central Server Hub (Middle) */}
              <div className="p-5 rounded-2xl bg-[#0B0E14] border-2 border-cyan-500/50 shadow-2xl relative text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-inner">
                  <Server className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">CENTRAL MODEL</h4>
                  <span className="text-[10px] text-cyan-400 font-mono">Hospital_Central_Master.rvt</span>
                  <p className="text-[11px] text-slate-400 mt-1">Cloud Hub / BIM 360 ACC</p>
                </div>
                <div className="text-[10px] py-1 px-2.5 rounded-xl bg-[#101522] border border-slate-800 text-slate-300 font-mono">
                  Current Version: v48.2 (Synchronized)
                </div>
              </div>

              {/* Node 2: Modeler B (Sarah - Colleague) */}
              <div className="p-4 rounded-2xl bg-[#0B0E14] border border-slate-800/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-white">Modeler B (Sarah)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 font-mono border border-purple-800/60">
                    Colleague PC
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="text-slate-400">
                    File: <span className="text-purple-300">Hospital_Local_Sarah.rvt</span>
                  </div>
                  <div className="text-slate-400">
                    Status: <span className="text-emerald-400">Active Modeling</span>
                  </div>
                  <div className="text-slate-400">
                    Action: <span className="text-slate-300">{sarahRequestPending ? 'Waiting for Door #104' : 'Working on Core Walls'}</span>
                  </div>
                </div>

                {sarahGranted && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Permission granted to Sarah!</span>
                  </div>
                )}
              </div>

            </div>

            {/* Stepper Guide Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Simulation Stage {step} of 5:
                </span>
                <span className="text-xs text-cyan-400 font-medium">
                  {step === 1 && 'Create Local Working Copy'}
                  {step === 2 && 'Element Borrowing & Active Workset'}
                  {step === 3 && 'Editing Request Resolution'}
                  {step === 4 && 'Synchronize with Central (SWC)'}
                  {step === 5 && 'Audit Verified & Completed'}
                </span>
              </div>

              {/* Progress Stepper Pills */}
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div 
                    key={s} 
                    className={`h-1.5 rounded-full transition-all ${
                      s < step ? 'bg-emerald-500' : s === step ? 'bg-cyan-400 animate-pulse' : 'bg-slate-800'
                    }`} 
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Simulation Controls for Current Step */}
          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
            
            {/* Step 1: Open Central vs Create Local */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/50 text-xs space-y-2">
                  <h4 className="font-bold text-blue-200 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-400" />
                    The Cardinal Rule of Day 1 in Revit:
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    You arrived at your desk. You open Revit to start work on the Hospital project. The Central Model is at <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300 font-mono">P:\BIM_Projects\Hospital_Central_Master.rvt</code>.
                  </p>
                  <p className="text-amber-300 font-medium">
                    What must you ALWAYS ensure in the Revit Open Dialog?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => alert('🚨 DANGER! Opening the Central Model directly locks the file for the entire office, prevents teammates from synchronizing, and risks corrupting project history. Always choose "Create New Local"!')}
                    className="p-3 rounded-xl bg-red-950/30 hover:bg-red-900/40 border border-red-800/60 text-left text-xs space-y-1 transition-all"
                  >
                    <span className="font-bold text-red-300 block">❌ Double-click &amp; Open Central Directly</span>
                    <span className="text-[11px] text-slate-400 block">Edit the central model directly on the server without creating a local file.</span>
                  </button>

                  <button
                    id="create-local-btn"
                    onClick={handleCreateLocal}
                    className="p-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/70 text-left text-xs space-y-1 transition-all shadow-md shadow-cyan-950 group"
                  >
                    <span className="font-bold text-cyan-300 flex items-center gap-1">
                      ✅ Check &quot;Create New Local&quot; <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] text-slate-400 block">Revit creates a safe copy on your C: drive named <code className="text-cyan-400">Hospital_Local_Ryan.rvt</code>.</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Borrow Elements & Active Workset */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                    Active Workset &amp; Transparent Element Borrowing:
                  </span>
                  <p>
                    In modern Revit worksharing, you rarely check out entire worksets. Instead, when you click and edit a wall or door, Revit automatically <strong>borrows</strong> that element from the Central Model.
                  </p>
                </div>

                {/* Workset Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold block">Select Active Workset:</label>
                  <select
                    value={activeWorkset}
                    onChange={(e) => setActiveWorkset(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5"
                  >
                    <option value="AR_Interior_Partitions">AR_Interior_Partitions (Correct for room walls)</option>
                    <option value="Shared Levels & Grids">Shared Levels &amp; Grids (⚠️ NEVER place building geometry here!)</option>
                    <option value="AR_Exterior_Shell">AR_Exterior_Shell</option>
                  </select>
                </div>

                {/* Borrowable Elements Interactive Buttons */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold block">Click to Modify / Borrow Elements:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['Door #104 (Fire Rated)', 'Wall #208 (Interior)', 'Sink #102 (Plumbing)'].map((elem) => {
                      const isBorrowed = borrowedElements.includes(elem);
                      return (
                        <button
                          key={elem}
                          onClick={() => handleBorrowElement(elem)}
                          className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                            isBorrowed
                              ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <span>{elem}</span>
                          {isBorrowed ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {borrowedElements.length > 0 && (
                  <button
                    id="trigger-colleague-request-btn"
                    onClick={handleTriggerSarahRequest}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Proceed to Collaboration Test: Sarah Needs Your Element</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Step 3: Editing Request Notification Simulation */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-950/40 border-2 border-amber-600/70 text-xs space-y-3 shadow-xl">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                    <span>Revit Editing Request Dialogue</span>
                  </div>
                  <p className="text-slate-200">
                    Colleague <strong>Sarah_K</strong> is placing an access card reader and tried to modify <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">Door #104 (Fire Rated)</code>, which is currently checked out by you!
                  </p>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300">
                    &quot;User Sarah_K requests permission to edit element 492014 (Door #104). Would you like to grant permission or synchronize now?&quot;
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={handleGrantSarah}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Grant Permission &amp; Prepare to Synchronize
                    </button>
                    <button
                      onClick={() => alert('If you deny the request, Sarah cannot complete her task. In professional BIM teams, you either grant permission or do a quick Synchronize with Central to release ownership!')}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Deny Request
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Synchronize with Central & Relinquish Settings */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Save className="w-4 h-4 text-cyan-400" />
                      Synchronize and Modify Settings (Ctrl+Alt+S)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">
                      SWC Dialog
                    </span>
                  </div>

                  <p className="text-slate-300">
                    Before leaving your workstation or after completing coordination milestones, always configure your sync options:
                  </p>

                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={compactCentral} 
                        onChange={(e) => setCompactCentral(e.target.checked)}
                        className="rounded border-slate-700 text-cyan-500 accent-cyan-500" 
                      />
                      <span><strong>Compact Central Model</strong> (Defragments file &amp; reduces cloud storage bloat)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={relinquishBorrowed} 
                        onChange={(e) => setRelinquishBorrowed(e.target.checked)}
                        className="rounded border-slate-700 text-cyan-500 accent-cyan-500" 
                      />
                      <span className="text-emerald-300">
                        <strong>Relinquish Borrowed Elements &amp; User-Created Worksets</strong> (Releases locks so teammates can edit)
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  id="execute-swc-btn"
                  onClick={handleSyncWithCentral}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Synchronize with Central Now (SWC)
                </button>
              </div>
            )}

            {/* Step 5: Complete & Verified */}
            {step === 5 && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/60 text-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Worksharing Lifecycle Mastered!</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  You successfully executed the entire multi-user worksharing workflow. You created a safe local copy, worked within assigned worksets, respected teammate editing requests, and synchronized cleanly back to the central repository while releasing locks.
                </p>
                <div className="flex items-center gap-2 text-cyan-400 font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>This competency is now verified on your Assessment Dashboard.</span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Live Central Server Audit History (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#101522] border border-slate-800/80 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Central Audit Log</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0B0E14] text-slate-400 font-mono border border-slate-800">
                Live Stream
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Revit Central Models maintain an encrypted audit history recording who synchronized what, when, and on which workset:
            </p>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {syncHistory.map((log, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#0B0E14] border border-slate-800/80 text-xs space-y-1 font-mono">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-cyan-400 font-bold">{log.user}</span>
                    <span className="text-slate-400">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-200 font-sans font-semibold text-[11px]">{log.action}</div>
                  <div className="text-slate-400 text-[10px]">Workset: {log.workset}</div>
                  <div className="text-slate-400 text-[11px] font-sans italic">{log.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
