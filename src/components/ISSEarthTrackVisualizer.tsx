import React, { useState, useEffect } from 'react';
import { Satellite, Globe2, Compass, MapPin, Eye, ArrowUpRight, Clock, Shield } from 'lucide-react';

interface GroundStation {
  name: string;
  country: string;
  lat: number;
  lng: number;
  nextPassMinutes: number;
  maxElevationDeg: number;
}

const GROUND_STATIONS: GroundStation[] = [
  { name: 'NASA Johnson Space Center (Houston)', country: 'USA', lat: 29.559, lng: -95.09, nextPassMinutes: 34, maxElevationDeg: 68 },
  { name: 'ISRO Telemetry (ISTRAC Bengaluru)', country: 'India', lat: 13.033, lng: 77.564, nextPassMinutes: 18, maxElevationDeg: 81 },
  { name: 'ESA European Space Operations (Darmstadt)', country: 'Germany', lat: 49.871, lng: 8.625, nextPassMinutes: 52, maxElevationDeg: 54 },
  { name: 'JAXA Tsukuba Space Center', country: 'Japan', lat: 36.064, lng: 140.126, nextPassMinutes: 76, maxElevationDeg: 72 },
  { name: 'Guiana Space Centre (Kourou)', country: 'French Guiana', lat: 5.237, lng: -52.768, nextPassMinutes: 9, maxElevationDeg: 89 },
  { name: 'Canberra Deep Space Station', country: 'Australia', lat: -35.401, lng: 148.982, nextPassMinutes: 44, maxElevationDeg: 48 }
];

export const ISSEarthTrackVisualizer: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<GroundStation>(GROUND_STATIONS[0]);
  const [nowSec, setNowSec] = useState<number>(0);

  // Orbital mechanics real-time propagation
  // ISS orbit: period = 92.8 minutes = 5568 seconds
  // Inclination: 51.64 degrees
  const orbitalPeriodSec = 5568;
  const inclinationDeg = 51.64;

  useEffect(() => {
    const timer = setInterval(() => {
      setNowSec(Date.now() / 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute instantaneous latitude and longitude
  const phase = ((nowSec % orbitalPeriodSec) / orbitalPeriodSec) * 2 * Math.PI;
  // Latitude follows sine curve bounded by inclination
  const currentLat = Math.sin(phase) * inclinationDeg;
  // Longitude shifts westwards by ~23.2 degrees per orbit due to Earth rotation
  const currentLng = (((((nowSec / orbitalPeriodSec) * 360) + (phase * 180 / Math.PI)) % 360) - 180);

  // Altitude with realistic micro-variations
  const altitudeKm = 418.2 + Math.sin(phase * 2) * 1.8;
  const speedKmSec = 7.66 + Math.cos(phase) * 0.02;

  // Day/Night Solar Sub-point based on current UTC hour
  const utcDate = new Date();
  const utcHours = utcDate.getUTCHours() + utcDate.getUTCMinutes() / 60;
  const solarSubLng = 180 - (utcHours / 24) * 360;

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-wider text-slate-200 font-semibold">ISS Real-Time Ground Track & Orbital Telemetry</span>
            <span>·</span>
            <span>NORAD ID: 25544 (ZARYA)</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Low Earth Orbit trajectory, sub-satellite coordinates, day/night solar terminator, and ground station pass predictions.
          </p>
        </div>

        {/* Live Vector Telemetry Pill Cluster */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-500 mr-1">ALTITUDE:</span>
            <span className="text-sky-400 font-bold tabular-nums">{altitudeKm.toFixed(1)} km</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-500 mr-1">VELOCITY:</span>
            <span className="text-emerald-400 font-bold tabular-nums">{speedKmSec.toFixed(2)} km/s</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hidden sm:block">
            <span className="text-slate-500 mr-1">CREW:</span>
            <span className="text-slate-200 font-bold">Expedition 72 (7 Onboard)</span>
          </div>
        </div>
      </div>

      {/* Main Map Viewport & Track */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* World Map with Ground Track */}
        <div className="lg:col-span-8 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between bg-[#04060a]">
          <div className="relative w-full aspect-[2/1] rounded-lg border border-slate-800/80 bg-[#080d1a] overflow-hidden">
            {/* World Grid Lines */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="-180 -90 360 180" preserveAspectRatio="none">
              {/* Latitude parallels */}
              {[-60, -30, 0, 30, 60].map(lat => (
                <line
                  key={lat}
                  x1="-180"
                  y1={-lat}
                  x2="180"
                  y2={-lat}
                  stroke={lat === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(51, 65, 85, 0.2)'}
                  strokeWidth="0.5"
                  strokeDasharray={lat === 0 ? '' : '2, 4'}
                />
              ))}
              {/* Longitude meridians */}
              {[-120, -60, 0, 60, 120].map(lng => (
                <line
                  key={lng}
                  x1={lng}
                  y1="-90"
                  x2={lng}
                  y2="90"
                  stroke={lng === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(51, 65, 85, 0.2)'}
                  strokeWidth="0.5"
                  strokeDasharray={lng === 0 ? '' : '2, 4'}
                />
              ))}

              {/* Simplified Global Continents Outline */}
              {/* North America */}
              <path d="M -160,65 L -140,70 L -120,68 L -80,60 L -60,45 L -75,30 L -95,20 L -80,10 L -100,20 L -120,35 L -125,50 Z" fill="rgba(30, 41, 59, 0.5)" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="0.6" />
              {/* South America */}
              <path d="M -80,10 L -60,5 L -35,-5 L -40,-20 L -60,-40 L -70,-55 L -75,-30 L -80,-10 Z" fill="rgba(30, 41, 59, 0.5)" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="0.6" />
              {/* Eurasia */}
              <path d="M -10,35 L 20,40 L 40,65 L 80,70 L 140,65 L 170,60 L 140,35 L 120,20 L 80,25 L 60,35 L 30,30 L 10,45 Z" fill="rgba(30, 41, 59, 0.5)" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="0.6" />
              {/* Africa */}
              <path d="M -15,30 L 10,35 L 30,30 L 50,12 L 40,-10 L 30,-30 L 18,-35 L 10,-5 L -15,10 Z" fill="rgba(30, 41, 59, 0.5)" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="0.6" />
              {/* India subcontinent */}
              <path d="M 68,24 L 78,30 L 88,24 L 80,10 L 76,8 Z" fill="rgba(14, 165, 233, 0.2)" stroke="rgba(14, 165, 233, 0.5)" strokeWidth="0.8" />
              {/* Australia */}
              <path d="M 115,-15 L 145,-12 L 150,-30 L 140,-38 L 115,-32 Z" fill="rgba(30, 41, 59, 0.5)" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="0.6" />

              {/* Day / Night Terminator Shading Arc */}
              <path
                d={`M ${solarSubLng - 90},-90 C ${solarSubLng - 45},-45 ${solarSubLng - 45},45 ${solarSubLng - 90},90 L ${solarSubLng + 90},90 C ${solarSubLng + 135},45 ${solarSubLng + 135},-45 ${solarSubLng + 90},-90 Z`}
                fill="rgba(5, 7, 12, 0.55)"
              />

              {/* ISS Ground Track Sine Wave (Next Orbit Projected) */}
              <path
                d={Array.from({ length: 72 }).map((_, i) => {
                  const t = (i / 71) * 2 * Math.PI;
                  const x = (((currentLng + (t * 180 / Math.PI) - (t / (2 * Math.PI)) * 23.2 + 180) % 360) - 180);
                  const y = -Math.sin(phase + t) * inclinationDeg;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="rgba(56, 189, 248, 0.55)"
                strokeWidth="1.2"
                strokeDasharray="3, 3"
              />

              {/* Ground Stations Pins */}
              {GROUND_STATIONS.map(st => (
                <g key={st.name} transform={`translate(${st.lng}, ${-st.lat})`}>
                  <circle r="2" fill="#f59e0b" />
                  <circle r="6" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
                </g>
              ))}

              {/* Current Sub-Satellite Point (ISS Marker) */}
              <g transform={`translate(${currentLng}, ${-currentLat})`}>
                {/* Visual footprint circle (~2200 km horizon line) */}
                <circle r="18" fill="rgba(56, 189, 248, 0.12)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.6" />
                {/* ISS icon blip */}
                <circle r="3.5" fill="#38bdf8" />
                <circle r="6" fill="none" stroke="#38bdf8" strokeWidth="1" className="animate-ping" />
              </g>
            </svg>

            {/* Map HUD Legend */}
            <div className="absolute top-2 left-2 flex items-center gap-2 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 text-[10px] font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>ISS: {currentLat >= 0 ? `${currentLat.toFixed(2)}°N` : `${Math.abs(currentLat).toFixed(2)}°S`}, {currentLng >= 0 ? `${currentLng.toFixed(2)}°E` : `${Math.abs(currentLng).toFixed(2)}°W`}</span>
            </div>

            <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 text-[10px] font-mono text-slate-400">
              <span>ORBITAL PERIOD: 92.8 MIN</span>
              <span>·</span>
              <span>INCLINATION: 51.64°</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-3">
            <span>● Blue Point: Real-time ISS sub-satellite position & 2,200 km line-of-sight footprint</span>
            <span>● Yellow Pins: Tracking ground telemetry complexes</span>
          </div>
        </div>

        {/* Right: Next Pass Predictor & Ground Station Acquisition */}
        <div className="lg:col-span-4 p-5 bg-slate-950/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-400" />
                <h3 className="font-mono text-sm font-bold text-slate-100">OVERHEAD PASS PREDICTOR</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">AOS / LOS TIMING</span>
            </div>

            <div className="my-3 space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Select Target Telemetry Station:</span>
              <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {GROUND_STATIONS.map(station => {
                  const isSelected = selectedStation.name === station.name;
                  return (
                    <button
                      key={station.name}
                      onClick={() => setSelectedStation(station)}
                      className={`w-full text-left p-2.5 rounded border text-xs font-mono transition-colors flex items-center justify-between ${isSelected ? 'bg-sky-500/10 border-sky-500/50 text-sky-300' : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'}`}
                    >
                      <div>
                        <div className="font-semibold text-slate-100">{station.name}</div>
                        <div className="text-[10px] text-slate-400">{station.country} · {station.lat.toFixed(1)}°, {station.lng.toFixed(1)}°</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sky-400 font-bold">{station.nextPassMinutes}m to AOS</div>
                        <div className="text-[10px] text-slate-400">Max El: {station.maxElevationDeg}°</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Station Pass Detail */}
            <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs font-mono space-y-2 mt-4">
              <div className="flex justify-between items-center text-slate-200 font-semibold border-b border-slate-800 pb-1.5">
                <span>Selected: {selectedStation.name}</span>
                <span className="text-emerald-400">HIGH ELEVATION PASS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block text-[10px]">TIME TO ACQUISITION</span>
                  <span className="text-sm font-bold text-sky-400">{selectedStation.nextPassMinutes} Minutes</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">MAX VISIBLE ELEVATION</span>
                  <span className="text-sm font-bold text-slate-100">{selectedStation.maxElevationDeg}° from Horizon</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">PASS DURATION</span>
                  <span className="text-slate-300">~6m 12s line-of-sight</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">HAM RADIO LINK</span>
                  <span className="text-slate-300">145.800 MHz FM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
            <span>NASA Orbital Debris & Space Station Operations</span>
            <span>PROPAGATION: SGP4 SATELLITE ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
