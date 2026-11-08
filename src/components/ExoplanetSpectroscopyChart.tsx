import React, { useState } from 'react';
import { Eye, Sparkles, Filter, Crosshair, ArrowRight, Layers } from 'lucide-react';
import { EXOPLANET_SPECTRA, ExoplanetSpectralData } from '../data/spaceData';

export const ExoplanetSpectroscopyChart: React.FC = () => {
  const [selectedPlanetName, setSelectedPlanetName] = useState<string>('K2-18 b');
  const [hoveredPoint, setHoveredPoint] = useState<{ wavelengthMicrons: number; transitDepthPpm: number; uncertainty: number } | null>(null);

  const planet: ExoplanetSpectralData = EXOPLANET_SPECTRA.find(p => p.planetName === selectedPlanetName) || EXOPLANET_SPECTRA[0];

  // Min and max bounds for chart scaling
  const minWavelength = 0.5;
  const maxWavelength = 5.5;
  const depths = planet.spectrumPoints.map(p => p.transitDepthPpm);
  const minDepth = Math.min(...depths) - 80;
  const maxDepth = Math.max(...depths) + 80;

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="uppercase tracking-wider text-slate-200 font-semibold">JWST Exoplanet Atmospheric Transmission Spectroscopy</span>
            <span>·</span>
            <span>NIRSpec / NIRCam Infrared Precision Array</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Measurement of starlight filtering through exoplanetary atmospheres to resolve chemical signatures ($CH_4, CO_2, H_2O$).
          </p>
        </div>

        {/* Planet Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          {EXOPLANET_SPECTRA.map(p => (
            <button
              key={p.planetName}
              onClick={() => {
                setSelectedPlanetName(p.planetName);
                setHoveredPoint(null);
              }}
              className={`px-3 py-1.5 rounded transition-colors font-semibold ${selectedPlanetName === p.planetName ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {p.planetName}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Interactive Spectroscopy Chart Viewport */}
        <div className="lg:col-span-8 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between bg-[#04060a]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span>SPECTRAL CURVE: Transit Depth (ppm) vs Wavelength (λ in Microns)</span>
              <span className="text-cyan-400">
                {hoveredPoint ? `λ = ${hoveredPoint.wavelengthMicrons.toFixed(2)} µm | Depth = ${hoveredPoint.transitDepthPpm} ± ${hoveredPoint.uncertainty} ppm` : 'Hover point to inspect precision flux'}
              </span>
            </div>

            {/* SVG Spectroscopy Chart */}
            <div className="relative w-full h-[300px] border border-slate-800 rounded-lg p-4 bg-slate-950/70">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 240" preserveAspectRatio="none">
                {/* Horizontal reference lines */}
                {[0.2, 0.5, 0.8].map(frac => {
                  const yVal = frac * 240;
                  const depthVal = Math.round(maxDepth - frac * (maxDepth - minDepth));
                  return (
                    <g key={frac}>
                      <line x1="0" y1={yVal} x2="500" y2={yVal} stroke="rgba(51, 65, 85, 0.3)" strokeDasharray="2, 4" strokeWidth="0.8" />
                      <text x="4" y={yVal - 4} fill="#64748b" fontSize="8" fontFamily="IBM Plex Mono">
                        {depthVal} ppm
                      </text>
                    </g>
                  );
                })}

                {/* Vertical wavelength grid */}
                {[1.0, 2.0, 3.0, 4.0, 5.0].map(wl => {
                  const xVal = ((wl - minWavelength) / (maxWavelength - minWavelength)) * 500;
                  return (
                    <g key={wl}>
                      <line x1={xVal} y1="0" x2={xVal} y2="240" stroke="rgba(51, 65, 85, 0.3)" strokeDasharray="2, 4" strokeWidth="0.8" />
                      <text x={xVal + 3} y="235" fill="#64748b" fontSize="8" fontFamily="IBM Plex Mono">
                        {wl.toFixed(1)} µm
                      </text>
                    </g>
                  );
                })}

                {/* Molecular Absorption Band Shaded Columns */}
                {/* H2O band ~ 1.4 µm */}
                <rect x={((1.3 - minWavelength) / 5.0) * 500} y="0" width={(0.2 / 5.0) * 500} height="240" fill="rgba(56, 189, 248, 0.08)" />
                <text x={((1.3 - minWavelength) / 5.0) * 500 + 4} y="15" fill="#38bdf8" fontSize="8" fontFamily="IBM Plex Mono">H₂O</text>

                {/* CH4 band ~ 2.3 - 3.3 µm */}
                <rect x={((2.2 - minWavelength) / 5.0) * 500} y="0" width={(1.2 / 5.0) * 500} height="240" fill="rgba(16, 185, 129, 0.08)" />
                <text x={((2.2 - minWavelength) / 5.0) * 500 + 4} y="15" fill="#10b981" fontSize="8" fontFamily="IBM Plex Mono">CH₄ (Methane)</text>

                {/* CO2 band ~ 4.3 µm */}
                <rect x={((4.15 - minWavelength) / 5.0) * 500} y="0" width={(0.35 / 5.0) * 500} height="240" fill="rgba(244, 63, 94, 0.12)" />
                <text x={((4.15 - minWavelength) / 5.0) * 500 + 4} y="15" fill="#f43f5e" fontSize="8" fontFamily="IBM Plex Mono">CO₂</text>

                {/* Spectral Polyline Curve */}
                <polyline
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.2"
                  points={planet.spectrumPoints.map(pt => {
                    const x = ((pt.wavelengthMicrons - minWavelength) / (maxWavelength - minWavelength)) * 500;
                    const y = 240 - ((pt.transitDepthPpm - minDepth) / (maxDepth - minDepth)) * 240;
                    return `${x},${y}`;
                  }).join(' ')}
                />

                {/* Data Points with Error Bars */}
                {planet.spectrumPoints.map((pt, idx) => {
                  const x = ((pt.wavelengthMicrons - minWavelength) / (maxWavelength - minWavelength)) * 500;
                  const y = 240 - ((pt.transitDepthPpm - minDepth) / (maxDepth - minDepth)) * 240;
                  const errHeight = (pt.uncertainty / (maxDepth - minDepth)) * 240;
                  const isHovered = hoveredPoint?.wavelengthMicrons === pt.wavelengthMicrons;

                  return (
                    <g
                      key={idx}
                      onMouseEnter={() => setHoveredPoint(pt)}
                      className="cursor-pointer"
                    >
                      {/* Vertical Error Bar */}
                      <line x1={x} y1={y - errHeight} x2={x} y2={y + errHeight} stroke="rgba(203, 213, 225, 0.6)" strokeWidth="1" />
                      <line x1={x - 3} y1={y - errHeight} x2={x + 3} y2={y - errHeight} stroke="rgba(203, 213, 225, 0.6)" strokeWidth="1" />
                      <line x1={x - 3} y1={y + errHeight} x2={x + 3} y2={y + errHeight} stroke="rgba(203, 213, 225, 0.6)" strokeWidth="1" />

                      {/* Data Point circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 6 : 4}
                        fill={isHovered ? '#38bdf8' : '#0891b2'}
                        stroke="#f1f5f9"
                        strokeWidth="1.2"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* JWST NIRCam Deep Field Image Showcase */}
          <div className="relative rounded-lg overflow-hidden border border-slate-800 mt-4 group">
            <img
              src="/src/assets/images/nasa_jwst_deep_field_1794124310858.jpg"
              alt="NASA JWST NIRCam ultra-deep cosmic infrared observation of gravitational lensing galaxy cluster"
              className="w-full h-36 object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
              <span className="text-xs font-mono font-bold text-slate-100">JWST Deep Space Infrared Spectrograph Target</span>
              <span className="text-[11px] text-slate-300">Resolving atmospheric constituents across interstellar distances up to 1,200 light-years</span>
            </div>
          </div>
        </div>

        {/* Right: Planet Physical Properties & Detections */}
        <div className="lg:col-span-4 p-6 bg-slate-950/50 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Exoplanetary Dossier</span>
              <h3 className="font-mono text-xl font-bold text-slate-100">{planet.planetName}</h3>
              <span className="text-xs font-mono text-cyan-400">Host Star: {planet.hostStar}</span>
            </div>

            {/* Planet Specs Grid */}
            <div className="grid grid-cols-2 gap-2.5 my-4 text-xs font-mono">
              <div className="p-2.5 rounded border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] text-slate-500 uppercase block">Distance</span>
                <span className="font-bold text-slate-100">{planet.distanceLightYears} ly</span>
              </div>
              <div className="p-2.5 rounded border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] text-slate-500 uppercase block">Orbital Period</span>
                <span className="font-bold text-slate-100">{planet.orbitalPeriodDays} Earth days</span>
              </div>
              <div className="p-2.5 rounded border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] text-slate-500 uppercase block">Planetary Mass</span>
                <span className="font-bold text-slate-100">{planet.massEarthMasses} M⊕</span>
              </div>
              <div className="p-2.5 rounded border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] text-slate-500 uppercase block">Equilibrium Temp</span>
                <span className="font-bold text-amber-300">{planet.equilibriumTempK} K ({planet.equilibriumTempK - 273}°C)</span>
              </div>
            </div>

            {/* Atmospheric Detections List */}
            <div className="space-y-2 mt-4">
              <span className="text-xs uppercase font-mono text-slate-400 block font-semibold">
                Confirmed Spectroscopic Absorptions:
              </span>
              <div className="space-y-1.5">
                {planet.atmosphereKeyDetections.map((detection, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded bg-slate-900/80 border border-slate-800/80 text-xs font-mono text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{detection}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            Source: NASA Exoplanet Science Institute & STScI JWST Archive
          </div>
        </div>
      </div>
    </div>
  );
};
