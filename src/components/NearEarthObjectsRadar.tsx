import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Disc, Filter, Info, Crosshair, BarChart3 } from 'lucide-react';
import { NEAR_EARTH_OBJECTS, NearEarthObject } from '../data/spaceData';

export const NearEarthObjectsRadar: React.FC = () => {
  const [viewMode, setViewMode] = useState<'radar' | 'scatter'>('radar');
  const [filterType, setFilterType] = useState<'all' | 'hazardous' | 'sub5ld'>('all');
  const [selectedNeo, setSelectedNeo] = useState<NearEarthObject>(NEAR_EARTH_OBJECTS[0]);

  const filteredNeos = NEAR_EARTH_OBJECTS.filter(neo => {
    if (filterType === 'hazardous') return neo.isPotentiallyHazardous;
    if (filterType === 'sub5ld') return neo.missDistanceLunarDistances <= 5.0;
    return true;
  });

  // Calculate approximate kinetic energy in Megatons TNT: E = 0.5 * m * v^2
  // Density assumption ~ 2500 kg/m^3 (rocky asteroid)
  const calculateKineticMt = (diameterMeters: number, velocityKmSec: number) => {
    const radius = diameterMeters / 2;
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const massKg = volume * 2500;
    const velocityMps = velocityKmSec * 1000;
    const energyJoules = 0.5 * massKg * Math.pow(velocityMps, 2);
    const megatonsTnt = energyJoules / (4.184e15);
    return megatonsTnt;
  };

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="uppercase tracking-wider text-slate-200 font-semibold">Near-Earth Object (NEO) Radar & Kinetic Risk Matrix</span>
            <span>·</span>
            <span>Planetary Defense Coordination Office</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Orbital ephemeris monitoring for asteroids passing within cislunar and inner solar system proximity.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded transition-colors ${filterType === 'all' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All Catalog
            </button>
            <button
              onClick={() => setFilterType('hazardous')}
              className={`px-2.5 py-1 rounded transition-colors ${filterType === 'hazardous' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              PHA Hazards
            </button>
            <button
              onClick={() => setFilterType('sub5ld')}
              className={`px-2.5 py-1 rounded transition-colors ${filterType === 'sub5ld' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              &lt; 5 Lunar Distances
            </button>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setViewMode('radar')}
              className={`px-2.5 py-1 rounded transition-colors ${viewMode === 'radar' ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Polar Radar
            </button>
            <button
              onClick={() => setViewMode('scatter')}
              className={`px-2.5 py-1 rounded transition-colors ${viewMode === 'scatter' ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Kinetic Scatter
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Chart/Radar Viewport */}
        <div className="lg:col-span-8 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-center items-center relative min-h-[460px] bg-[#05070c]">
          {viewMode === 'radar' ? (
            /* Polar Radar Scope */
            <div className="relative w-[380px] h-[380px] sm:w-[420px] sm:h-[420px] rounded-full border border-slate-800/80 flex items-center justify-center">
              {/* Radar Sweeping Beam */}
              <div className="absolute inset-0 rounded-full animate-radar origin-center pointer-events-none">
                <div
                  className="w-1/2 h-1/2 origin-bottom-right"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(245, 158, 11, 0.15) 0deg, transparent 60deg)'
                  }}
                />
              </div>

              {/* Concentric Lunar Distance Rings */}
              {[
                { r: 40, label: '1 LD (384k km)' },
                { r: 90, label: '5 LD' },
                { r: 140, label: '15 LD' },
                { r: 190, label: '30 LD' }
              ].map(ring => (
                <div
                  key={ring.r}
                  className="absolute rounded-full border border-slate-800/60 pointer-events-none"
                  style={{ width: ring.r * 2, height: ring.r * 2 }}
                >
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400">
                    {ring.label}
                  </span>
                </div>
              ))}

              {/* Crosshair Axes */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-slate-800/80" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-slate-800/80" />

              {/* Center Earth */}
              <div className="relative z-10 w-6 h-6 rounded-full bg-sky-500 shadow-lg shadow-sky-500/40 border border-sky-300 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">⊕</span>
              </div>
              <span className="absolute mt-9 text-[10px] font-mono text-sky-400 font-semibold">Earth (Center)</span>

              {/* Plotted Asteroid Blips */}
              {filteredNeos.map((neo, idx) => {
                // Distribute angle deterministically from ID hash
                const angle = (idx * 0.9 + (neo.eccentricity * 4)) % (Math.PI * 2);
                // Scale distance logarithmically so both 0.08 LD (Apophis) and 30 LD fit nicely
                const distNormalized = Math.min(185, Math.max(25, Math.log10(neo.missDistanceLunarDistances + 0.1) * 65 + 75));
                const x = Math.cos(angle) * distNormalized;
                const y = Math.sin(angle) * distNormalized;

                const isSelected = selectedNeo.id === neo.id;
                const sizePx = Math.max(6, Math.min(16, Math.sqrt(neo.diameterMeters) * 0.4));

                return (
                  <div
                    key={neo.id}
                    onClick={() => setSelectedNeo(neo)}
                    className="absolute cursor-pointer transition-transform hover:scale-125 z-20"
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                  >
                    <div
                      className={`rounded-full flex items-center justify-center transition-all ${isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-125' : ''}`}
                      style={{
                        width: sizePx,
                        height: sizePx,
                        backgroundColor: neo.isPotentiallyHazardous ? '#f59e0b' : '#94a3b8'
                      }}
                    />
                    <span
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-mono whitespace-nowrap px-1 py-0.2 rounded ${isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-950/80'}`}
                    >
                      {neo.name.split(' ')[1] || neo.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Kinetic Scatter Matrix View (Miss Distance vs Velocity) */
            <div className="w-full h-full flex flex-col justify-between py-2">
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                <span>SCATTER: Miss-Distance (Lunar Distances) vs Relative Velocity (km/s)</span>
                <span>Bubble Area ∝ Asteroid Diameter</span>
              </div>

              <div className="relative w-full h-[320px] border-l border-b border-slate-700 p-4">
                {/* Horizontal grid lines */}
                {[10, 20, 30, 40].map(v => (
                  <div key={v} className="absolute inset-x-0 border-t border-slate-800/40 text-[9px] font-mono text-slate-400 pl-2" style={{ bottom: `${(v / 40) * 100}%` }}>
                    {v} km/s
                  </div>
                ))}

                {/* Plot points */}
                {filteredNeos.map(neo => {
                  const xPercent = Math.min(95, Math.max(5, (neo.missDistanceLunarDistances / 70) * 100));
                  const yPercent = Math.min(95, Math.max(5, (neo.velocityKmSec / 40) * 100));
                  const isSelected = selectedNeo.id === neo.id;
                  const sizePx = Math.max(10, Math.min(32, Math.sqrt(neo.diameterMeters) * 0.6));

                  return (
                    <div
                      key={neo.id}
                      onClick={() => setSelectedNeo(neo)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 z-10"
                      style={{
                        left: `${xPercent}%`,
                        bottom: `${yPercent}%`
                      }}
                    >
                      <div
                        className={`rounded-full flex items-center justify-center opacity-85 hover:opacity-100 ${isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950' : ''}`}
                        style={{
                          width: sizePx,
                          height: sizePx,
                          backgroundColor: neo.isPotentiallyHazardous ? 'rgba(245, 158, 11, 0.7)' : 'rgba(148, 163, 184, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      />
                      <span className="text-[9px] font-mono block text-center mt-1 text-slate-300">
                        {neo.name.split(' ')[1] || neo.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                <span>0 LD (Direct Lunar Orbit)</span>
                <span>25 LD</span>
                <span>50 LD</span>
                <span>75 LD (Far Approach)</span>
              </div>
            </div>
          )}

          <div className="text-[10px] font-mono text-slate-500 mt-3 flex items-center gap-2">
            <span>● Yellow: Potentially Hazardous Asteroid (PHA)</span>
            <span>·</span>
            <span>● Slate: Non-hazardous trajectory</span>
            <span>·</span>
            <span>Click any asteroid to view kinetic parameters</span>
          </div>
        </div>

        {/* Right: Selected Asteroid Kinetic Dossier */}
        <div className="lg:col-span-4 p-5 bg-slate-950/60 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500 block">JPL Small-Body Catalog</span>
                <h3 className="font-mono text-lg font-bold text-slate-100">{selectedNeo.name}</h3>
                <span className="text-xs font-mono text-slate-400">Designation: {selectedNeo.designation}</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${selectedNeo.isPotentiallyHazardous ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-300'}`}>
                {selectedNeo.isPotentiallyHazardous ? 'PHA WARNING' : 'NOMINAL PASS'}
              </span>
            </div>

            {/* Kinetic Parameters Grid */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Close Approach</span>
                <span className="text-sm font-mono font-bold text-slate-100">{selectedNeo.closeApproachDate}</span>
                <span className="text-[10px] block font-mono text-slate-400 mt-0.5">
                  {selectedNeo.missDistanceLunarDistances.toFixed(2)} Lunar Distances
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Miss Distance (km)</span>
                <span className="text-sm font-mono font-bold text-sky-400">
                  {selectedNeo.missDistanceKm.toLocaleString()}
                </span>
                <span className="text-[10px] block font-mono text-slate-400 mt-0.5">
                  {selectedNeo.missDistanceKm < 36000 ? 'Inside GEO Satellite Ring!' : 'Beyond Cislunar'}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Estimated Diameter</span>
                <span className="text-sm font-mono font-bold text-slate-100">
                  {selectedNeo.diameterMeters.toLocaleString()} m
                </span>
                <span className="text-[10px] block font-mono text-slate-400 mt-0.5">
                  {(selectedNeo.diameterMeters / 1000).toFixed(2)} km across
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Relative Velocity</span>
                <span className="text-sm font-mono font-bold text-amber-400">
                  {selectedNeo.velocityKmSec.toFixed(2)} km/s
                </span>
                <span className="text-[10px] block font-mono text-slate-400 mt-0.5">
                  {(selectedNeo.velocityKmSec * 3600).toLocaleString()} km/h
                </span>
              </div>
            </div>

            {/* Impact Risk Calculation Callout */}
            <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs font-mono space-y-1.5 mb-4">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Estimated Kinetic Impact Energy:</span>
              </div>
              <div className="text-base font-bold text-slate-100">
                ≈ {calculateKineticMt(selectedNeo.diameterMeters, selectedNeo.velocityKmSec).toLocaleString(undefined, { maximumFractionDigits: 1 })} Megatons TNT
              </div>
              <p className="text-[11px] text-slate-400">
                Torino Scale: <strong className="text-slate-200">{selectedNeo.torinoScale}</strong> (No immediate collision hazard under verified radar astrometry). Orbit class: <strong className="text-slate-200">{selectedNeo.orbitClass}</strong> (Semi-major axis: {selectedNeo.semiMajorAxisAU} AU).
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 text-[11px] font-mono text-slate-400">
            Astrometry provided via NASA Center for Near Earth Object Studies (CNEOS) and Goldstone Planetary Radar.
          </div>
        </div>
      </div>
    </div>
  );
};
