import React, { useState, useEffect, useRef } from 'react';
import {
  Play, RotateCcw, CheckCircle, Terminal, Layers,
  Info, X, Search, ArrowRight, ArrowLeft, Trash2,
  Plus, AlertTriangle, Timer, Zap, MousePointerClick,
  Sparkles, Settings, FastForward, Shuffle, Volume2,
  BookOpen, List, Split
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10px`,
            backgroundColor: ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7'][Math.floor(Math.random() * 5)],
            animationDuration: `${1 + Math.random() * 1.5}s`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};

const SoundEffect = ({ label }: { label: string | null }) => {
  if (!label) return null;
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-ping-short">
      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-lg transform -rotate-12 block">
        {label}
      </span>
    </div>
  );
};

const TheoryCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="bg-[#1e293b]/50 border-l-4 border-blue-500 rounded-r-lg p-6 my-6 hover:bg-[#1e293b] transition-colors">
    <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
      {icon} {title}
    </h4>
    <div className="text-slate-300 text-sm leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const AlgorithmSteps = ({ steps }: { steps: string[] }) => (
  <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 my-4">
    <h5 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">Algorithm Steps</h5>
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 text-sm text-slate-300">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center font-mono text-xs border border-blue-800">
            {i + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  </div>
);

const CodeBlock = ({ code, language = 'c', explanation }: { code: string, language?: string, explanation: string }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-slate-700 my-4 shadow-2xl relative group transition-all duration-300 hover:border-slate-500">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all font-bold ${showExplanation
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
          >
            {showExplanation ? <X size={14} /> : <Info size={14} />}
            {showExplanation ? 'Close Explanation' : 'Explain Logic'}
          </button>
        </div>
      </div>

      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
          {code}
        </pre>

        <div className={`
          absolute inset-0 bg-[#0f172a]/95 backdrop-blur-sm p-5 overflow-y-auto transition-opacity duration-300
          ${showExplanation ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
          <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
            <Terminal size={16} /> Logic Breakdown
          </h4>
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-2">
            {explanation.split('\n').map((line, i) => (
              <p key={i} className={`
                ${line.trim().startsWith('•') ? 'pl-4 text-slate-200' : ''}
                ${line.trim().startsWith('1.') || line.trim().startsWith('2.') ? 'font-bold text-white mt-3' : ''}
              `}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 0. TRAVERSAL VISUALIZER
const TraversalVisualizer = () => {
  const [arr] = useState([15, 42, 8, 23, 4, 16]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [output, setOutput] = useState<string[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [output]);

  const runTraversal = async () => {
    if (isTraversing) return;
    setIsTraversing(true);
    setOutput([]);

    for (let i = 0; i < arr.length; i++) {
      setCurrentIndex(i);
      setOutput(prev => [...prev, `Accessing arr[${i}]: Value = ${arr[i]}`]);
      await new Promise(r => setTimeout(r, 800));
    }

    setCurrentIndex(null);
    setOutput(prev => [...prev, `Traversal Complete.`]);
    setIsTraversing(false);
  };

  const reset = () => {
    setCurrentIndex(null);
    setOutput([]);
    setIsTraversing(false);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Play size={20} className="text-cyan-400" /> Traversal Animator
        </h3>
        <div className="flex gap-2">
          <button
            onClick={runTraversal}
            disabled={isTraversing}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 transition-colors"
          >
            {isTraversing ? 'Traversing...' : 'Start Loop'}
          </button>
          <button onClick={reset} disabled={isTraversing} className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Array Visual */}
      <div className="flex justify-center gap-3 mb-8 relative h-28 items-center border-b border-slate-800 pb-6">
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center relative group">
            {/* Index Label */}
            <span className="text-[10px] text-slate-500 font-mono mb-1">Index {i}</span>

            {/* Box */}
            <div className={`
              w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-300
              ${i === currentIndex
                ? 'bg-cyan-600 border-cyan-400 text-white scale-125 shadow-[0_0_20px_rgba(34,211,238,0.5)] z-10'
                : 'bg-slate-800 border-slate-600 text-slate-400'}
            `}>
              {val}
            </div>

            {/* Pointer (only visible when active) */}
            <div className={`absolute -bottom-10 transition-all duration-300 ${i === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <div className="flex flex-col items-center">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-cyan-400"></div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase mt-1">i={i}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Output Console */}
      <div ref={scrollRef} className="bg-[#0f172a] rounded-lg border border-slate-800 p-3 h-32 overflow-y-auto font-mono text-xs shadow-inner">
        <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1 sticky top-0 bg-[#0f172a] flex justify-between">
          <span>Console Output:</span>
          <span className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div><div className="w-2 h-2 rounded-full bg-yellow-500"></div><div className="w-2 h-2 rounded-full bg-green-500"></div></span>
        </div>
        {output.length === 0 && <span className="text-slate-600 italic">Waiting to start simulation...</span>}
        {output.map((line, idx) => (
          <div key={idx} className="text-cyan-200 mb-1 animate-fadeIn">
            <span className="text-slate-600 mr-2 font-bold">{'>'}</span>{line}
          </div>
        ))}
        {isTraversing && <div className="animate-pulse text-cyan-500 mt-1">_</div>}
      </div>
    </div>
  );
};

// 1. ADVANCED OPERATION LAB (Insert/Delete)
const OperationLab = () => {
  const [arr, setArr] = useState<(number | null)[]>([10, 20, 30, 40, 50, null, null, null]);
  const [size, setSize] = useState(5);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [msg, setMsg] = useState("Select an operation to begin");
  const [animating, setAnimating] = useState(false);
  const [mode, setMode] = useState<'insert' | 'delete'>('insert');
  const [targetIdx, setTargetIdx] = useState(2);
  const [insertVal, setInsertVal] = useState(99);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const reset = () => {
    setArr([10, 20, 30, 40, 50, null, null, null]);
    setSize(5);
    setActiveIdx(null);
    setMsg("Reset complete.");
  };

  const runInsertion = async () => {
    if (animating) return;
    if (size >= 8) { setMsg("Error: Array Full (Overflow)"); return; }
    if (targetIdx < 0 || targetIdx > size) { setMsg("Error: Invalid Index"); return; }

    setAnimating(true);
    setMsg(`Step 1: Make space for ${insertVal} at index ${targetIdx}`);
    await sleep(600);

    const temp = [...arr];

    for (let i = size; i > targetIdx; i--) {
      setActiveIdx(i);
      setMsg(`Shifting ${temp[i - 1]} from [${i - 1}] to [${i}]`);
      temp[i] = temp[i - 1];
      temp[i - 1] = null;
      setArr([...temp]);
      await sleep(500);
    }

    setMsg(`Step 2: Insert ${insertVal} into the gap at [${targetIdx}]`);
    setActiveIdx(targetIdx);
    temp[targetIdx] = insertVal;
    setArr([...temp]);
    setSize(s => s + 1);
    await sleep(600);

    setActiveIdx(null);
    setMsg("Insertion Complete! Size increased.");
    setAnimating(false);
  };

  const runDeletion = async () => {
    if (animating) return;
    if (size === 0) { setMsg("Error: Array Empty (Underflow)"); return; }
    if (targetIdx < 0 || targetIdx >= size) { setMsg("Error: Invalid Index"); return; }

    setAnimating(true);
    setMsg(`Step 1: Identify element to delete at [${targetIdx}]`);
    setActiveIdx(targetIdx);
    await sleep(600);

    const temp = [...arr];
    temp[targetIdx] = null;
    setArr([...temp]);
    setMsg(`Element deleted. Now shifting left to close gap.`);
    await sleep(600);

    for (let i = targetIdx; i < size - 1; i++) {
      setActiveIdx(i);
      setMsg(`Shifting ${temp[i + 1]} from [${i + 1}] to [${i}]`);
      temp[i] = temp[i + 1];
      temp[i + 1] = null;
      setArr([...temp]);
      await sleep(500);
    }

    setSize(s => s - 1);
    setActiveIdx(null);
    setMsg("Deletion Complete! Size decreased.");
    setAnimating(false);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
      <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap size={20} className="text-orange-400" /> The Shifting Lab
        </h3>
        <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">
          <button onClick={() => setMode('insert')} className={`px-3 py-1 text-xs font-bold rounded ${mode === 'insert' ? 'bg-green-600 text-white' : 'text-slate-400'}`}>Insertion</button>
          <button onClick={() => setMode('delete')} className={`px-3 py-1 text-xs font-bold rounded ${mode === 'delete' ? 'bg-red-600 text-white' : 'text-slate-400'}`}>Deletion</button>
        </div>
      </div>

      <div className="flex gap-4 items-end mb-8 justify-center">
        <div>
          <label className="text-[10px] text-slate-500 uppercase font-bold">Target Index</label>
          <input type="number" value={targetIdx} onChange={e => setTargetIdx(Number(e.target.value))} className="w-16 bg-slate-800 border-slate-600 rounded p-2 text-white font-mono text-center" />
        </div>
        {mode === 'insert' && (
          <div>
            <label className="text-[10px] text-slate-500 uppercase font-bold">Value</label>
            <input type="number" value={insertVal} onChange={e => setInsertVal(Number(e.target.value))} className="w-16 bg-slate-800 border-slate-600 rounded p-2 text-white font-mono text-center" />
          </div>
        )}
        <button
          onClick={mode === 'insert' ? runInsertion : runDeletion}
          disabled={animating}
          className={`px-4 py-2 rounded font-bold text-white flex items-center gap-2 ${mode === 'insert' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'} disabled:opacity-50`}
        >
          {mode === 'insert' ? <Plus size={16} /> : <Trash2 size={16} />}
          Run {mode === 'insert' ? 'Insert' : 'Delete'}
        </button>
        <button onClick={reset} disabled={animating} className="p-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600"><RotateCcw size={16} /></button>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center group">
            <div className={`
              w-12 h-14 flex items-center justify-center border-2 rounded-md font-bold text-lg transition-all duration-300
              ${i === activeIdx
                ? 'bg-orange-600 border-orange-400 text-white scale-110 z-10 shadow-lg'
                : i >= size
                  ? 'bg-slate-900/50 border-slate-800 text-slate-700 border-dashed'
                  : 'bg-slate-800 border-slate-600 text-slate-200'}
            `}>
              {val ?? '∅'}
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-2">{i}</span>
          </div>
        ))}
      </div>

      <div className="bg-black/30 p-3 rounded-lg text-center font-mono text-sm text-orange-300 border border-slate-800">
        {msg}
      </div>
    </div>
  );
};

// 2. SEARCH RACE (Enhanced Visuals)
const SearchRace = () => {
  const [running, setRunning] = useState(false);
  const [linStep, setLinStep] = useState(0);

  // Binary State for visualization
  const [binState, setBinState] = useState<{ low: number, high: number, mid: number, visited: number[] }>({ low: 0, high: 31, mid: -1, visited: [] });

  const [data, setData] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(32);
  const [customArrayStr, setCustomArrayStr] = useState("");
  const [mode, setMode] = useState<'generate' | 'custom'>('generate');
  const [target, setTarget] = useState(32);
  const [foundLinear, setFoundLinear] = useState(false);
  const [foundBinary, setFoundBinary] = useState(false);
  const [sfx, setSfx] = useState<string | null>(null);

  // Initialize
  useEffect(() => {
    generateArray();
  }, [arraySize]);

  useEffect(() => {
    if (sfx) {
      const t = setTimeout(() => setSfx(null), 500);
      return () => clearTimeout(t);
    }
  }, [sfx]);

  const generateArray = () => {
    const arr = Array.from({ length: arraySize }, (_, i) => i + 1); // 1 to Size
    setData(arr);
    // Random target from array
    setTarget(arr[Math.floor(Math.random() * arr.length)]);
    resetRace();
  };

  const handleCustomArray = () => {
    const arr = customArrayStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    // Sort needed for binary search
    arr.sort((a, b) => a - b);
    setData(arr);
    setArraySize(arr.length);
    if (arr.length > 0) setTarget(arr[Math.floor(Math.random() * arr.length)]);
    resetRace();
  };

  const shuffleTarget = () => {
    if (data.length > 0) {
      setTarget(data[Math.floor(Math.random() * data.length)]);
      resetRace();
    }
  }

  const resetRace = () => {
    setLinStep(0);
    setBinState({ low: 0, high: data.length - 1, mid: -1, visited: [] });
    setFoundLinear(false); setFoundBinary(false);
    setRunning(false);
  };

  const runRace = async () => {
    if (running) return;
    setRunning(true);
    setFoundLinear(false); setFoundBinary(false);
    setLinStep(0);
    setBinState({ low: 0, high: data.length - 1, mid: -1, visited: [] });

    // Run both
    const linearPromise = new Promise<void>(async (resolve) => {
      for (let i = 0; i < data.length; i++) {
        setLinStep(i);
        await new Promise(r => setTimeout(r, 80));
        if (data[i] === target) {
          setFoundLinear(true);
          break;
        }
      }
      resolve();
    });

    const binaryPromise = new Promise<void>(async (resolve) => {
      let l = 0, h = data.length - 1;
      let visited: number[] = [];

      while (l <= h) {
        let m = Math.floor((l + h) / 2);
        visited.push(m);
        setBinState({ low: l, high: h, mid: m, visited: [...visited] });

        await new Promise(r => setTimeout(r, 1000)); // "Thinking" time

        if (data[m] === target) {
          setFoundBinary(true);
          setSfx("MATCH!");
          break;
        }

        if (data[m] < target) {
          l = m + 1;
          setSfx("RIGHT ->");
        } else {
          h = m - 1;
          setSfx("<- LEFT");
        }
      }
      resolve();
    });

    await Promise.all([linearPromise, binaryPromise]);
    setRunning(false);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8 relative overflow-hidden">
      <Confetti active={foundBinary && foundLinear} />
      <SoundEffect label={sfx} />
      <style>{`
        @keyframes ping-short {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .animate-ping-short {
          animation: ping-short 0.5s cubic-bezier(0, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Timer size={20} className="text-green-400" /> Efficiency Race
        </h3>

        <div className="flex gap-2 items-center bg-slate-950 p-2 rounded-lg border border-slate-800 flex-wrap justify-center">
          {mode === 'generate' ? (
            <div className="flex items-center gap-2">
              <label className="text-[10px] text-slate-500 uppercase">Size</label>
              <input
                type="range" min="10" max="64"
                value={arraySize}
                onChange={e => setArraySize(Number(e.target.value))}
                className="accent-blue-500 w-20"
              />
              <span className="text-xs font-mono w-6 text-center">{arraySize}</span>
            </div>
          ) : (
            <input
              placeholder="1, 2, 5, 8, 10..."
              value={customArrayStr}
              onChange={e => setCustomArrayStr(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white w-24"
            />
          )}
          <button onClick={() => setMode(m => m === 'generate' ? 'custom' : 'generate')} className="text-slate-500 hover:text-white p-1"><Settings size={14} /></button>

          <div className="h-4 w-px bg-slate-700 mx-1"></div>

          <div className="flex items-center gap-2">
            <label className="text-[10px] text-slate-500 uppercase">Find</label>
            <input
              type="number"
              value={target}
              onChange={e => setTarget(Number(e.target.value))}
              className="w-12 bg-slate-800 border border-slate-700 rounded px-1 py-1 text-xs text-white text-center"
            />
            <button onClick={shuffleTarget} className="text-slate-500 hover:text-purple-400"><Shuffle size={14} /></button>
          </div>

          <button
            onClick={mode === 'custom' ? handleCustomArray : generateArray}
            className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded font-bold"
          >
            Set
          </button>
        </div>

        <button onClick={runRace} disabled={running} className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-green-900/20 flex items-center gap-2">
          {running ? 'Running...' : 'START'} <Zap size={16} />
        </button>
      </div>

      <div className="space-y-8">
        {/* Linear Track */}
        <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 relative">
          <div className="flex justify-between text-xs text-blue-300 mb-2 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2"><ArrowRight size={14} /> Linear Search (Sequential)</span>
            <span className="bg-blue-900/30 px-2 rounded font-mono">{linStep + 1} Checks</span>
          </div>

          <div className="flex gap-px h-16 items-end relative">
            {data.map((val, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-colors duration-0 ${i === linStep
                    ? 'bg-blue-400 h-full shadow-[0_0_10px_rgba(96,165,250,0.8)] z-10'
                    : i < linStep
                      ? 'bg-slate-700 h-3/4 opacity-40'
                      : 'bg-slate-800 h-1/2'
                  } ${foundLinear && i === linStep ? 'bg-green-500 !h-full animate-pulse' : ''}`}
                title={`Index ${i}: ${val}`}
              ></div>
            ))}
          </div>
          {foundLinear && <div className="absolute top-2 right-2 text-green-400 font-bold text-xs animate-bounce bg-green-900/20 px-2 rounded border border-green-500/50">FOUND!</div>}
        </div>

        {/* Binary Track */}
        <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 relative">
          <div className="flex justify-between text-xs text-purple-300 mb-2 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2"><Layers size={14} /> Binary Search (Divide & Conquer)</span>
            <span className="bg-purple-900/30 px-2 rounded font-mono">{binState.visited.length} Checks</span>
          </div>

          <div className="flex gap-px h-16 items-end relative">
            {data.map((val, i) => {
              // Logic for visual style
              const isMid = i === binState.mid;
              const isVisited = binState.visited.includes(i);
              const inRange = i >= binState.low && i <= binState.high;
              const discarded = !inRange && !isVisited;

              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all duration-300 ${isMid
                      ? 'bg-yellow-400 h-full shadow-[0_0_15px_rgba(250,204,21,0.8)] z-10 scale-x-110'
                      : isVisited
                        ? 'bg-purple-500 h-3/4 opacity-60'
                        : inRange
                          ? 'bg-slate-600 h-1/2'
                          : 'bg-slate-900 h-1/4 opacity-30'
                    } ${foundBinary && isMid ? '!bg-green-500 animate-pulse' : ''}`}
                  title={`Index ${i}: ${val}`}
                ></div>
              );
            })}
          </div>
          {foundBinary && <div className="absolute top-2 right-2 text-green-400 font-bold text-xs animate-bounce bg-green-900/20 px-2 rounded border border-green-500/50">FOUND!</div>}

          <div className="mt-2 flex gap-4 text-[10px] text-slate-500 justify-center font-mono">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div> Current Mid</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> Checked</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-600 rounded-full"></div> Active Range</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-900 rounded-full"></div> Discarded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. BINARY SEARCH GUIDED (Customizable)
const BinarySearchGuided = () => {
  const [dataStr, setDataStr] = useState("10, 20, 30, 40, 50, 60, 70");
  const [data, setData] = useState([10, 20, 30, 40, 50, 60, 70]);
  const [target, setTarget] = useState(70);

  const [step, setStep] = useState(0);
  const [low, setLow] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [msg, setMsg] = useState("Click 'Next Step' to begin");
  const [isFound, setIsFound] = useState(false);

  const parseData = () => {
    const arr = dataStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    arr.sort((a, b) => a - b);
    setData(arr);
    reset();
  };

  const reset = () => {
    setStep(0); setLow(null); setHigh(null); setMid(null); setIsFound(false);
    setMsg("Reset. Ready to search.");
  };

  // Pre-calculate steps strategy for robust navigation
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    const s = [];
    let l = 0, h = data.length - 1;
    while (l <= h) {
      let m = Math.floor((l + h) / 2);
      let txt = "";
      if (data[m] === target) txt = `FOUND! ${data[m]} == ${target} at Index ${m}`;
      else if (data[m] < target) txt = `${data[m]} < ${target}. Go Right (Low -> ${m + 1})`;
      else txt = `${data[m]} > ${target}. Go Left (High -> ${m - 1})`;

      s.push({ l, h, m, txt, found: data[m] === target });

      if (data[m] === target) break;
      if (data[m] < target) l = m + 1;
      else h = m - 1;
    }
    if (s.length === 0 || !s[s.length - 1].found) {
      s.push({ l, h, m: -1, txt: "Not Found", found: false });
    }
    setSteps(s);
  }, [data, target]);

  const handleNext = () => {
    if (step < steps.length) {
      const s = steps[step];
      setLow(s.l); setHigh(s.h); setMid(s.m);
      setMsg(s.txt);
      setIsFound(s.found);
      setStep(step + 1);
    } else {
      reset();
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Search size={20} className="text-blue-400" /> Guided Walkthrough
        </h3>

        {/* Custom Inputs */}
        <div className="flex gap-2 items-center bg-slate-800 p-2 rounded-lg w-full md:w-auto">
          <input
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white flex-1 min-w-[150px]"
            value={dataStr}
            onChange={e => setDataStr(e.target.value)}
            placeholder="10, 20, 30..."
          />
          <input
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white w-16"
            type="number"
            value={target}
            onChange={e => setTarget(Number(e.target.value))}
            placeholder="Target"
          />
          <button onClick={parseData} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold">
            Load
          </button>
        </div>

        <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
          {step === 0 ? <Play size={14} /> : <FastForward size={14} />}
          {step >= steps.length ? 'Reset' : 'Next Step'}
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-12 flex-wrap min-h-[100px] items-center">
        {data.map((val, i) => {
          const isMid = i === mid;
          const isRange = low !== null && high !== null && i >= low && i <= high;

          return (
            <div key={i} className="relative group mt-8">
              <div className={`
                 w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-500
                 ${isMid
                  ? 'bg-blue-600 border-blue-400 text-white scale-125 z-20 shadow-[0_0_20px_rgba(37,99,235,0.5)]'
                  : isRange
                    ? 'bg-slate-700 border-slate-500 text-slate-200'
                    : 'bg-slate-900 border-slate-800 text-slate-600 opacity-30 scale-90'}
                 ${isFound && isMid ? 'bg-green-500 border-green-400 animate-bounce' : ''}
               `}>
                {val}
              </div>

              {/* Pointers with Text */}
              {i === low && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-400 flex flex-col items-center transition-all duration-500"><ArrowRight className="rotate-[-90deg]" size={12} />LOW</div>}
              {i === high && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-400 flex flex-col items-center transition-all duration-500"><ArrowRight className="rotate-[-90deg]" size={12} />HIGH</div>}
              {i === mid && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-400 flex flex-col items-center transition-all duration-500">MID<ArrowRight className="rotate-[90deg]" size={12} /></div>}
            </div>
          )
        })}
      </div>

      <div className={`p-4 rounded-lg border flex items-center gap-3 transition-colors duration-500 ${isFound ? 'bg-green-900/30 border-green-500/50' : 'bg-slate-950 border-slate-800'}`}>
        {isFound ? <Sparkles className="text-green-400 shrink-0" /> : <Info className="text-blue-500 shrink-0" />}
        <p className={`text-sm font-mono ${isFound ? 'text-green-200 font-bold' : 'text-blue-200'}`}>{msg}</p>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

const Lecture3Page = () => {
  const insertExpl = `1. **Capacity Check**: First, we ensure the array isn't full. We can't insert into a full array without losing data or crashing.
2. **The Shift Loop**: 
   • 'i' starts at the last element (*n-1).
   • We move elements to the RIGHT (arr[i+1] = arr[i]).
   • We stop when we reach the target 'pos'.
3. **Insertion**: Now that a "gap" is created at 'pos', we simply assign the new value.
4. **Update Size**: Increment 'n' to reflect the new count.`;

  const deleteExpl = `1. **The Shift Loop**:
   • 'i' starts at the target 'pos'.
   • We move elements from the RIGHT to the LEFT (arr[i] = arr[i+1]).
   • This overwrites the value at 'pos' and closes the gap.
2. **Update Size**: Decrement 'n'. The last element is now considered "garbage" or empty.`;

  const binaryExpl = `1. **Low & High**: Pointers to the start and end of the search range.
2. **Mid Calculation**: (low + high) / 2. This cuts the array in half.
3. **Comparison**:
   • Equal? Found it!
   • Key < Mid? It must be in the left half. Discard right (high = mid - 1).
   • Key > Mid? It must be in the right half. Discard left (low = mid + 1).
4. **Loop**: Repeat until found or low > high.`;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation-name: confetti;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
        }
      `}</style>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 z-40 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-white" />
          <div>
            <h1 className="font-bold text-white text-sm md:text-base leading-tight">Array Operations</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unit 4 • Lecture 3</p>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-white mb-6">
          Manipulating the Block
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
          Arrays are rigid. Because they use <strong>contiguous memory</strong>, simple actions like "Inserting" or "Deleting" require computationally expensive <strong>shifting</strong> of elements.
        </p>
      </section>

      {/* SECTION 1: TRAVERSAL */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-cyan-600/20 text-cyan-400 p-2 rounded-lg"><ArrowRight size={24} /></span>
          <h2 className="text-2xl font-bold text-white">Traversal</h2>
        </div>

        <TheoryCard title="What is Traversal?" icon={<BookOpen size={20} className="text-blue-400" />}>
          <p>
            Traversal is the act of <strong>visiting every element in an array exactly once</strong>.
            It is the fundamental building block for almost all other array operations (printing, summing, searching).
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-400">
            <li><strong>Purpose:</strong> To read or modify data sequentially.</li>
            <li><strong>Complexity:</strong> Always <code>O(N)</code> because the loop runs 'N' times.</li>
            <li><strong>Direction:</strong> Typically left-to-right (Index 0 to N-1), but can be reversed.</li>
          </ul>
        </TheoryCard>

        <TraversalVisualizer />

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <CodeBlock
            code={`void traverse(int arr[], int n) {
  printf("Array Elements: ");
  for(int i=0; i<n; i++) {
    printf("%d ", arr[i]);
  }
}`}
            explanation={`1. We iterate from index 0 to n-1.\n2. In each iteration, we perform an operation (printf).\n3. Time Complexity: O(N) because we touch every element.`}
          />
        </div>
      </section>

      {/* SECTION 2: INSERTION & DELETION */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-orange-600/20 text-orange-400 p-2 rounded-lg"><Zap size={24} /></span>
          <h2 className="text-2xl font-bold text-white">The Cost of Modification</h2>
        </div>

        <TheoryCard title="Why is Modification Expensive?" icon={<AlertTriangle size={20} className="text-yellow-400" />}>
          <p>
            Unlike Linked Lists, Arrays are static blocks of memory. You cannot simply "squeeze" a new element in between two others.
          </p>
          <div className="mt-3 grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-3 rounded border border-slate-800">
              <strong className="text-green-400 block mb-1">Insertion Strategy</strong>
              To insert at index <code>i</code>, you must shift all elements from <code>i</code> to the <strong>RIGHT</strong> to create a hole.
            </div>
            <div className="bg-slate-900 p-3 rounded border border-slate-800">
              <strong className="text-red-400 block mb-1">Deletion Strategy</strong>
              To delete at index <code>i</code>, you must shift all elements from <code>i+1</code> to the <strong>LEFT</strong> to fill the hole.
            </div>
          </div>
        </TheoryCard>

        <OperationLab />

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h4 className="text-sm font-bold text-green-400 uppercase mb-2">Insertion Logic</h4>
            <AlgorithmSteps steps={[
              "Check if the array has capacity (Size < Max).",
              "Start loop from the last element (Size-1).",
              "Shift each element one step to the Right (arr[i+1] = arr[i]).",
              "Stop when you reach the Target Index.",
              "Insert the new value at the Target Index.",
              "Increment the Size counter."
            ]} />
            <CodeBlock
              code={`// Shift Right from End
for (int i = n-1; i >= pos; i--) {
    arr[i+1] = arr[i]; 
}
arr[pos] = val;
n++;`}
              explanation={insertExpl}
            />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-400 uppercase mb-2">Deletion Logic</h4>
            <AlgorithmSteps steps={[
              "Check if the array is empty (Size > 0).",
              "Start loop from the Target Index.",
              "Shift each element from the right one step to the Left (arr[i] = arr[i+1]).",
              "Continue until the end of the array.",
              "Decrement the Size counter."
            ]} />
            <CodeBlock
              code={`// Shift Left from Pos
for (int i = pos; i < n-1; i++) {
    arr[i] = arr[i+1];
}
n--;`}
              explanation={deleteExpl}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: SEARCHING */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mb-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-blue-600/20 text-blue-400 p-2 rounded-lg"><Search size={24} /></span>
          <h2 className="text-2xl font-bold text-white">Searching: Linear vs Binary</h2>
        </div>

        {/* Complexity Comparison Matrix */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-12">
          <div className="grid grid-cols-4 bg-slate-950 p-4 border-b border-slate-800 font-bold text-slate-400 text-sm">
            <div>Algorithm</div>
            <div>Time Complexity (Worst)</div>
            <div>Requirement</div>
            <div>Best Case</div>
          </div>
          <div className="grid grid-cols-4 p-4 border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
            <div className="font-bold text-blue-400">Linear Search</div>
            <div className="font-mono text-red-400">O(N)</div>
            <div className="text-slate-400 text-sm">None (Works on unsorted)</div>
            <div className="font-mono text-green-400">O(1)</div>
          </div>
          <div className="grid grid-cols-4 p-4 hover:bg-slate-800/50 transition-colors">
            <div className="font-bold text-purple-400">Binary Search</div>
            <div className="font-mono text-green-400">O(log N)</div>
            <div className="text-slate-400 text-sm">Sorted Data Only</div>
            <div className="font-mono text-green-400">O(1)</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <TheoryCard title="Linear Search Theory" icon={<List size={20} className="text-blue-400" />}>
              <p>The "Brute Force" approach. It works like checking every pocket until you find your keys.</p>
              <AlgorithmSteps steps={[
                "Start from the first element (Index 0).",
                "Compare current element with the Key.",
                "If Match: Return current Index.",
                "If No Match: Move to next element.",
                "If end of array is reached: Return -1 (Not Found)."
              ]} />
            </TheoryCard>
          </div>
          <div>
            <TheoryCard title="Binary Search Theory" icon={<Split size={20} className="text-purple-400" />}>
              <p>The "Divide and Conquer" approach. It works like finding a word in a dictionary by opening the middle page.</p>
              <AlgorithmSteps steps={[
                "Set Low = 0, High = N-1.",
                "Calculate Mid = (Low + High) / 2.",
                "If Arr[Mid] == Key: Return Mid.",
                "If Key < Arr[Mid]: Discard Right Half (High = Mid - 1).",
                "If Key > Arr[Mid]: Discard Left Half (Low = Mid + 1).",
                "Repeat until found or Low > High."
              ]} />
            </TheoryCard>
          </div>
        </div>

        <SearchRace />

        <h3 className="text-xl font-bold text-white mt-12 mb-4">Binary Search Walkthrough</h3>
        <BinarySearchGuided />

        <div className="mt-8">
          <CodeBlock
            code={`int binarySearch(int arr[], int n, int key) {
  int low=0, high=n-1;
  while(low <= high) {
    int mid = (low + high) / 2;
    if(arr[mid] == key) return mid;
    else if(key < arr[mid]) high = mid - 1;
    else low = mid + 1;
  }
  return -1;
}`}
            explanation={binaryExpl}
          />
        </div>
      </section>

    </div>
  );
};

export default Lecture3Page;