import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { Radio, Activity, Play, Pause, RefreshCw, Zap, Shield, Filter } from 'lucide-react';

interface SignalDataPoint {
  time: string;
  timestamp: number;
  voyager1: number; // dBm (~ -159 dBm)
  europaClipper: number; // dBm (~ -138 dBm)
  jwst: number; // dBm (~ -121 dBm)
  perseverance: number; // dBm (~ -142 dBm)
}

export const DsnSignalTimeSeriesChart: React.FC = () => {
  const [data, setData] = useState<SignalDataPoint[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [activeSpacecraft, setActiveSpacecraft] = useState<{ [key: string]: boolean }>({
    voyager1: true,
    europaClipper: true,
    jwst: true,
    perseverance: true
  });
  const [selectedWindowSeconds, setSelectedWindowSeconds] = useState<number>(60);

  // Initialize initial 25 points
  useEffect(() => {
    const initialData: SignalDataPoint[] = [];
    const now = Date.now();
    for (let i = 24; i >= 0; i--) {
      const t = now - i * 2000;
      const dateObj = new Date(t);
      const timeStr = dateObj.toTimeString().split(' ')[0];
      initialData.push({
        time: timeStr,
        timestamp: t,
        voyager1: +(-159.2 + (Math.sin(i * 0.4) * 0.9) + (Math.random() * 0.4 - 0.2)).toFixed(2),
        europaClipper: +(-138.4 + (Math.cos(i * 0.3) * 1.4) + (Math.random() * 0.5 - 0.25)).toFixed(2),
        jwst: +(-121.3 + (Math.sin(i * 0.2) * 0.8) + (Math.random() * 0.3 - 0.15)).toFixed(2),
        perseverance: +(-142.1 + (Math.cos(i * 0.5) * 1.1) + (Math.random() * 0.4 - 0.2)).toFixed(2)
      });
    }
    setData(initialData);
  }, []);

  // Real-time ticking stream every 2 seconds
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const dateObj = new Date(now);
      const timeStr = dateObj.toTimeString().split(' ')[0];

      setData(prev => {
        const last = prev[prev.length - 1];
        const newPoint: SignalDataPoint = {
          time: timeStr,
          timestamp: now,
          voyager1: +(
            Math.max(-162, Math.min(-156, (last ? last.voyager1 : -159.2) + (Math.random() * 0.8 - 0.4)))
          ).toFixed(2),
          europaClipper: +(
            Math.max(-141, Math.min(-135, (last ? last.europaClipper : -138.4) + (Math.random() * 1.0 - 0.5)))
          ).toFixed(2),
          jwst: +(
            Math.max(-124, Math.min(-118, (last ? last.jwst : -121.3) + (Math.random() * 0.6 - 0.3)))
          ).toFixed(2),
          perseverance: +(
            Math.max(-145, Math.min(-139, (last ? last.perseverance : -142.1) + (Math.random() * 0.8 - 0.4)))
          ).toFixed(2)
        };

        const maxPoints = Math.floor(selectedWindowSeconds / 2);
        const updated = [...prev, newPoint];
        if (updated.length > maxPoints) {
          return updated.slice(updated.length - maxPoints);
        }
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isStreaming, selectedWindowSeconds]);

  const toggleSpacecraft = (key: string) => {
    setActiveSpacecraft(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const latest = data[data.length - 1] || {
    voyager1: -159.2,
    europaClipper: -138.4,
    jwst: -121.3,
    perseverance: -142.1
  };

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden text-slate-100">
      {/* Top Console Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-800 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span className="uppercase tracking-wider text-slate-100 font-bold">
              DSN Live RF Signal Strength Time-Series
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400">GOLDSTONE / MADRID / CANBERRA</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Real-time continuous carrier power measurements (Prx in dBm) tracked across 70m and 34m parabolic antennas.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {/* Time Window Selector */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase px-1">Window:</span>
            {[30, 60, 120].map(sec => (
              <button
                key={sec}
                onClick={() => setSelectedWindowSeconds(sec)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${selectedWindowSeconds === sec ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {sec}s
              </button>
            ))}
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {isStreaming ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isStreaming ? 'PAUSE' : 'RESUME'}</span>
          </button>
        </div>
      </div>

      {/* 4 Real-Time Signal Level HUD Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-slate-800 divide-x divide-slate-800/80 bg-slate-950/40 font-mono">
        {/* JWST */}
        <button
          onClick={() => toggleSpacecraft('jwst')}
          className={`p-3.5 text-left transition-colors ${activeSpacecraft.jwst ? 'bg-slate-900/50' : 'opacity-40 hover:opacity-70'}`}
        >
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-semibold">JWST (L2 Halo)</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="text-xl font-bold text-cyan-300 mt-1 tabular-nums">
            {latest.jwst} <span className="text-xs text-slate-500 font-normal">dBm</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">High-Rate Ka-Band</div>
        </button>

        {/* Europa Clipper */}
        <button
          onClick={() => toggleSpacecraft('europaClipper')}
          className={`p-3.5 text-left transition-colors ${activeSpacecraft.europaClipper ? 'bg-slate-900/50' : 'opacity-40 hover:opacity-70'}`}
        >
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-semibold">Europa Clipper</span>
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
          </div>
          <div className="text-xl font-bold text-indigo-300 mt-1 tabular-nums">
            {latest.europaClipper} <span className="text-xs text-slate-500 font-normal">dBm</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Ka-Band Ingest</div>
        </button>

        {/* Mars Perseverance */}
        <button
          onClick={() => toggleSpacecraft('perseverance')}
          className={`p-3.5 text-left transition-colors ${activeSpacecraft.perseverance ? 'bg-slate-900/50' : 'opacity-40 hover:opacity-70'}`}
        >
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-semibold">Perseverance</span>
            <span className="w-2 h-2 rounded-full bg-rose-400" />
          </div>
          <div className="text-xl font-bold text-rose-300 mt-1 tabular-nums">
            {latest.perseverance} <span className="text-xs text-slate-500 font-normal">dBm</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">X-Band Coherent</div>
        </button>

        {/* Voyager 1 */}
        <button
          onClick={() => toggleSpacecraft('voyager1')}
          className={`p-3.5 text-left transition-colors ${activeSpacecraft.voyager1 ? 'bg-slate-900/50' : 'opacity-40 hover:opacity-70'}`}
        >
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-semibold">Voyager 1</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-300 mt-1 tabular-nums">
            {latest.voyager1} <span className="text-xs text-slate-500 font-normal">dBm</span>
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5">Interstellar X-Band</div>
        </button>
      </div>

      {/* Main Dynamic Recharts Time-Series Line Chart Viewport */}
      <div className="p-6 bg-[#040609]">
        <div className="w-full h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 15, right: 25, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[-170, -110]}
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
                unit=" dBm"
                width={75}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0b1120',
                  borderColor: '#334155',
                  borderRadius: '6px',
                  fontFamily: 'IBM Plex Mono',
                  fontSize: '11px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: 'IBM Plex Mono',
                  fontSize: '11px',
                  paddingTop: '10px'
                }}
              />

              {/* Reference Threshold Lines */}
              <ReferenceLine
                y={-165}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{ value: 'Receiver Thermal Noise Floor (-165 dBm)', fill: '#ef4444', fontSize: 10, position: 'insideBottomRight' }}
              />
              <ReferenceLine
                y={-155}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{ value: 'Carrier Lock Sensitivity Threshold (-155 dBm)', fill: '#f59e0b', fontSize: 10, position: 'insideTopRight' }}
              />

              {/* Spacecraft Dynamic Lines */}
              {activeSpacecraft.jwst && (
                <Line
                  type="monotone"
                  dataKey="jwst"
                  name="JWST (Ka-Band)"
                  stroke="#06b6d4"
                  strokeWidth={2.2}
                  dot={false}
                  isAnimationActive={false}
                />
              )}

              {activeSpacecraft.europaClipper && (
                <Line
                  type="monotone"
                  dataKey="europaClipper"
                  name="Europa Clipper (Ka-Band)"
                  stroke="#818cf8"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              )}

              {activeSpacecraft.perseverance && (
                <Line
                  type="monotone"
                  dataKey="perseverance"
                  name="Mars Perseverance (X-Band)"
                  stroke="#fb7185"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              )}

              {activeSpacecraft.voyager1 && (
                <Line
                  type="monotone"
                  dataKey="voyager1"
                  name="Voyager 1 (X-Band)"
                  stroke="#34d399"
                  strokeWidth={2.2}
                  dot={false}
                  isAnimationActive={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend notes */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-900 mt-2">
          <div className="flex items-center gap-4">
            <span>● Click top chips to toggle spacecraft traces</span>
            <span>·</span>
            <span>Sample rate: 0.5 Hz (2s polling)</span>
          </div>
          <div>
            Decibel-milliwatts (P = 10 · log10(P_mW))
          </div>
        </div>
      </div>
    </div>
  );
};
