import React, { useState, useEffect } from 'react';
import { Sun, Wind, Magnet, Zap, ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';

export const LiveSpaceWeatherMonitor: React.FC = () => {
  const [solarWindSpeed, setSolarWindSpeed] = useState<number>(438.4);
  const [solarDensity, setSolarDensity] = useState<number>(5.8);
  const [imfBz, setImfBz] = useState<number>(-2.4);
  const [kpIndex, setKpIndex] = useState<number>(2.33);
  const [flareFlux, setFlareFlux] = useState<string>('C1.8');
  const [radioBlackoutRisk, setRadioBlackoutRisk] = useState<string>('R0 (Nominal)');

  // Micro-fluctuations mimicking live solar satellite feeds (Aditya-L1 / NOAA DSCOVR)
  useEffect(() => {
    const timer = setInterval(() => {
      setSolarWindSpeed(prev => +(prev + (Math.random() * 2.4 - 1.2)).toFixed(1));
      setSolarDensity(prev => +(Math.max(2.1, prev + (Math.random() * 0.4 - 0.2))).toFixed(1));
      setImfBz(prev => +(prev + (Math.random() * 0.3 - 0.15)).toFixed(2));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="uppercase tracking-wider font-bold text-slate-200">
            Heliospheric Telemetry & Space Weather Alert Monitor
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">NOAA SWPC / Aditya-L1 / SOHO Live Stream</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-emerald-400 font-semibold">GEOMAGNETIC ENVIRONMENT: NOMINAL</span>
        </div>
      </div>

      {/* 4-Panel Real-Time Heliosphere Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Metric 1: Solar Wind Velocity */}
        <div className="p-4 bg-slate-950/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span className="uppercase text-[10px]">Solar Wind Speed</span>
            <Wind className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-100 tabular-nums">{solarWindSpeed}</span>
            <span className="text-xs font-mono text-slate-400">km/s</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1 flex justify-between">
            <span>Proton Density: {solarDensity} p/cm³</span>
            <span className="text-emerald-400">Normal Range</span>
          </div>
        </div>

        {/* Metric 2: Interplanetary Magnetic Field Bz */}
        <div className="p-4 bg-slate-950/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span className="uppercase text-[10px]">IMF Magnetic Field (Bz)</span>
            <Magnet className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">{imfBz}</span>
            <span className="text-xs font-mono text-slate-400">nT</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1 flex justify-between">
            <span>Orientation: Southward</span>
            <span className="text-slate-400">Weak Coupling</span>
          </div>
        </div>

        {/* Metric 3: Planetary Kp Index */}
        <div className="p-4 bg-slate-950/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span className="uppercase text-[10px]">Geomagnetic Kp Index</span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">{kpIndex}</span>
            <span className="text-xs font-mono text-slate-400">/ 9.0</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1 flex justify-between">
            <span>Activity: G0 Quiet</span>
            <span className="text-emerald-400">Low Aurora</span>
          </div>
        </div>

        {/* Metric 4: Solar Flare Flux & HF Radio Blackout */}
        <div className="p-4 bg-slate-950/40">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span className="uppercase text-[10px]">X-Ray Flare Flux</span>
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-cyan-300 tabular-nums">{flareFlux}</span>
            <span className="text-xs font-mono text-slate-400">W/m²</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1 flex justify-between">
            <span>HF Comms: {radioBlackoutRisk}</span>
            <span className="text-slate-400">No Geomag Storm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
