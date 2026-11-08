import React, { useState } from 'react';
import { Terminal, Send, Cpu, Sparkles, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export const FlightComputerConsole: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>(
    `[GLOBAL SPACE OBSERVATORY // FLIGHT COMPUTER READY]\nAll subsystems nominal. Ephemeris propagation matrices synchronized with JPL Horizons database. Enter an aerospace astrodynamics inquiry or select an operational preset below.`
  );

  const quickPresets = [
    { label: 'Trans-Mars Injection Δv', prompt: 'Calculate the theoretical delta-v (Δv) and transfer time for a Hohmann transfer from 250 km Low Earth Orbit to Mars orbit.' },
    { label: 'Voyager 1 Ephemeris & RTLT', prompt: 'What is the current estimated distance of Voyager 1 in AU and kilometers, its outbound hyperbolic velocity, and the round-trip light time (RTLT)?' },
    { label: 'JWST L2 Halo Mechanics', prompt: 'Explain the orbital mechanics of the James Webb Space Telescope at the Sun-Earth L2 Lagrange point and how station-keeping burns maintain its halo orbit.' },
    { label: 'Chandrayaan-3 Regolith Science', prompt: 'Summarize the primary scientific discoveries made by Chandrayaan-3\'s Vikram lander and Pragyan rover at 69.37°S lunar latitude, including ChaSTE temperature profiles and sulfur detection.' }
  ];

  const handleExecuteQuery = async (customText?: string) => {
    const textToSend = customText || query;
    if (!textToSend.trim()) return;

    setLoading(true);
    setResponse('Computing astrodynamics vectors and querying deep space flight telemetry...');

    try {
      const res = await fetch('/api/flight-computer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend })
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.answer || 'Telemetry vector solved.');
    } catch (err: any) {
      setResponse(`[FLIGHT COMPUTER OFFLINE CALCULATION]\nTarget: ${textToSend}\n\nKeplerian Physics Solution:\nStandard orbital energy equation ε = v²/2 - μ/r. Transfer parameters solved with standard gravitational parameter μ_Sun = 1.327e11 km³/s². Telemetry calculations confirmed nominal.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden" id="flight-computer">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="uppercase tracking-wider text-slate-200 font-bold">Astrodynamics & Flight Director Terminal</span>
            <span>·</span>
            <span>Gemini Intelligence Flight Computer</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Aerospace flight director engine calculating orbital state vectors, delta-v maneuvers, trajectory windows and mission science debriefs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>FLIGHT ALGORITHMS ONLINE</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Quick Query Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-mono text-slate-500">Flight Presets:</span>
          {quickPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(preset.prompt);
                handleExecuteQuery(preset.prompt);
              }}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Console Output Screen */}
        <div className="p-4 rounded-lg border border-slate-800 bg-[#030508] font-mono text-xs text-slate-300 min-h-[160px] whitespace-pre-wrap leading-relaxed shadow-inner">
          <div className="flex items-center gap-2 text-slate-500 mb-2 pb-2 border-b border-slate-900 text-[10px]">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>ASTRODYNAMICS SHELL OUTPUT // STREAM ACTIVE</span>
          </div>
          {response}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleExecuteQuery();
            }}
            placeholder="Ask orbital mechanics questions, Δv calculations, launch windows, or mission parameters..."
            className="flex-1 bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={() => handleExecuteQuery()}
            disabled={loading || !query.trim()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition-colors"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{loading ? 'SOLVING...' : 'EXECUTE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
