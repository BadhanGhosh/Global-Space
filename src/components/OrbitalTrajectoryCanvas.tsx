import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Maximize2, Compass, Layers } from 'lucide-react';

interface CelestialBody {
  id: string;
  name: string;
  color: string;
  radiusKm: number;
  semiMajorAxisAU: number; // 1 AU = 149.6M km
  orbitalPeriodDays: number;
  eccentricity: number;
  type: 'star' | 'planet' | 'spacecraft';
  speedKmSec: number;
  notes: string;
}

const CELESTIAL_BODIES: CelestialBody[] = [
  { id: 'sun', name: 'The Sun', color: '#fbbf24', radiusKm: 696340, semiMajorAxisAU: 0, orbitalPeriodDays: 0, eccentricity: 0, type: 'star', speedKmSec: 0, notes: 'G-type main-sequence star. 99.86% of solar system mass.' },
  { id: 'mercury', name: 'Mercury', color: '#94a3b8', radiusKm: 2439, semiMajorAxisAU: 0.387, orbitalPeriodDays: 88, eccentricity: 0.205, type: 'planet', speedKmSec: 47.4, notes: 'Smallest planet, highest orbital eccentricity of terrestrial bodies.' },
  { id: 'venus', name: 'Venus', color: '#f59e0b', radiusKm: 6052, semiMajorAxisAU: 0.723, orbitalPeriodDays: 224.7, eccentricity: 0.007, type: 'planet', speedKmSec: 35.0, notes: 'Dense supercritical CO2 atmosphere, retrograde rotation.' },
  { id: 'earth', name: 'Earth & Moon', color: '#38bdf8', radiusKm: 6371, semiMajorAxisAU: 1.0, orbitalPeriodDays: 365.25, eccentricity: 0.017, type: 'planet', speedKmSec: 29.8, notes: '1.00 AU baseline. Host to ISS and cislunar spacecraft.' },
  { id: 'mars', name: 'Mars', color: '#ef4444', radiusKm: 3389, semiMajorAxisAU: 1.524, orbitalPeriodDays: 687, eccentricity: 0.093, type: 'planet', speedKmSec: 24.1, notes: 'Host to Perseverance, Curiosity, Hope & orbital reconnaissance fleet.' },
  { id: 'jupiter', name: 'Jupiter', color: '#ea580c', radiusKm: 69911, semiMajorAxisAU: 5.204, orbitalPeriodDays: 4333, eccentricity: 0.048, type: 'planet', speedKmSec: 13.1, notes: 'Largest gas giant. Target for Europa Clipper and JUICE.' },
  { id: 'saturn', name: 'Saturn', color: '#eab308', radiusKm: 58232, semiMajorAxisAU: 9.582, orbitalPeriodDays: 10759, eccentricity: 0.054, type: 'planet', speedKmSec: 9.7, notes: 'Extensive ice ring system and ocean moons Titan & Enceladus.' },
  // Active Spacecraft
  { id: 'jwst', name: 'JWST (L2 Halo)', color: '#06b6d4', radiusKm: 20, semiMajorAxisAU: 1.01, orbitalPeriodDays: 365.25, eccentricity: 0.02, type: 'spacecraft', speedKmSec: 29.7, notes: 'Orbiting Sun-Earth Lagrange Point 2 (1.5M km anti-sunward).' },
  { id: 'clipper', name: 'Europa Clipper', color: '#a855f7', radiusKm: 15, semiMajorAxisAU: 2.1, orbitalPeriodDays: 1100, eccentricity: 0.42, type: 'spacecraft', speedKmSec: 21.5, notes: 'Mars-Earth Gravity Assist (MEGA) trajectory en route to Jupiter system.' },
  { id: 'voyager1', name: 'Voyager 1 (Interstellar)', color: '#10b981', radiusKm: 10, semiMajorAxisAU: 163.8, orbitalPeriodDays: 999999, eccentricity: 1.30, type: 'spacecraft', speedKmSec: 17.0, notes: 'Hyperbolic escape trajectory beyond the heliopause into interstellar space.' }
];

export const OrbitalTrajectoryCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(5); // days per second
  const [zoom, setZoom] = useState(1);
  const [selectedBodyId, setSelectedBodyId] = useState<string>('earth');
  const [viewPreset, setViewPreset] = useState<'inner' | 'full' | 'cislunar'>('inner');
  const [showAsteroidBelt, setShowAsteroidBelt] = useState(true);
  const [simTimeDays, setSimTimeDays] = useState(0);

  const selectedBody = CELESTIAL_BODIES.find(b => b.id === selectedBodyId) || CELESTIAL_BODIES[3];

  // Pan offset
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Handle Preset Changes
  const handlePresetChange = (preset: 'inner' | 'full' | 'cislunar') => {
    setViewPreset(preset);
    setPan({ x: 0, y: 0 });
    if (preset === 'inner') {
      setZoom(1.1);
      setSelectedBodyId('mars');
    } else if (preset === 'full') {
      setZoom(0.25);
      setSelectedBodyId('jupiter');
    } else if (preset === 'cislunar') {
      setZoom(2.8);
      setSelectedBodyId('jwst');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTimestamp = performance.now();

    // Generate static asteroid belt particles once
    const asteroidParticles: { a: number; angle: number; speed: number; size: number }[] = [];
    for (let i = 0; i < 300; i++) {
      const a = 2.2 + Math.random() * 1.1; // 2.2 to 3.3 AU
      asteroidParticles.push({
        a,
        angle: Math.random() * Math.PI * 2,
        speed: (2 * Math.PI) / (Math.pow(a, 1.5) * 365.25),
        size: Math.random() * 1.4 + 0.6
      });
    }

    const render = (now: number) => {
      const dtSeconds = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying) {
        setSimTimeDays(prev => prev + dtSeconds * speedMultiplier * 10);
      }

      // Handle DPI
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * window.devicePixelRatio || canvas.height !== height * window.devicePixelRatio) {
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
      }

      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) / 1.5);
      bgGrad.addColorStop(0, '#0c101b');
      bgGrad.addColorStop(1, '#05070b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Grid coordinate crosshairs (astrodynamic astronomical unit grid)
      const cx = width / 2 + pan.x;
      const cy = height / 2 + pan.y;
      const scaleAU = 110 * zoom; // pixels per 1 AU

      // Hairline coordinate grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // AU Concentric distance range rings
      const distanceRings = [0.5, 1.0, 1.5, 2.0, 3.0, 5.0, 10.0];
      distanceRings.forEach(au => {
        const r = au * scaleAU;
        if (r < Math.max(width, height) * 1.5) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = au === 1.0 ? 'rgba(56, 189, 248, 0.3)' : 'rgba(71, 85, 105, 0.2)';
          ctx.setLineDash(au === 1.0 ? [4, 4] : [2, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Ring label
          ctx.font = '10px "IBM Plex Mono", monospace';
          ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
          ctx.fillText(`${au.toFixed(1)} AU`, cx + r + 4, cy - 4);
        }
      });

      // Render Asteroid Belt
      if (showAsteroidBelt && zoom > 0.15) {
        ctx.fillStyle = 'rgba(203, 213, 225, 0.35)';
        asteroidParticles.forEach(ast => {
          const currentAngle = ast.angle + ast.speed * simTimeDays;
          const astX = cx + Math.cos(currentAngle) * ast.a * scaleAU;
          const astY = cy + Math.sin(currentAngle) * ast.a * scaleAU;
          ctx.beginPath();
          ctx.arc(astX, astY, ast.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Render Orbits & Bodies
      CELESTIAL_BODIES.forEach(body => {
        if (body.type === 'star') {
          // Render Sun with luminous corona
          const sunRadius = Math.max(7, 12 * Math.min(1.5, zoom));
          const sunGlow = ctx.createRadialGradient(cx, cy, sunRadius * 0.5, cx, cy, sunRadius * 3.5);
          sunGlow.addColorStop(0, 'rgba(251, 191, 36, 0.9)');
          sunGlow.addColorStop(0.3, 'rgba(245, 158, 11, 0.4)');
          sunGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = sunGlow;
          ctx.beginPath();
          ctx.arc(cx, cy, sunRadius * 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
          ctx.fill();
          return;
        }

        // Keplerian orbit geometry
        const a = body.semiMajorAxisAU * scaleAU;
        const e = body.eccentricity;
        const b = a * Math.sqrt(Math.max(0.01, 1 - e * e));
        const focusOffset = a * e;

        // Draw orbit path
        ctx.beginPath();
        if (body.eccentricity >= 1.0) {
          // Hyperbolic escape path for Voyager 1
          ctx.moveTo(cx, cy);
          const escapeLength = Math.min(width, height) * 0.9;
          const escapeAngle = -Math.PI / 4;
          ctx.lineTo(cx + Math.cos(escapeAngle) * escapeLength, cy + Math.sin(escapeAngle) * escapeLength);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          ctx.ellipse(cx - focusOffset, cy, a, b, 0, 0, Math.PI * 2);
          ctx.strokeStyle = body.id === selectedBodyId ? 'rgba(56, 189, 248, 0.7)' : 'rgba(100, 116, 139, 0.28)';
          ctx.lineWidth = body.id === selectedBodyId ? 1.5 : 1;
          ctx.setLineDash(body.type === 'spacecraft' ? [3, 3] : []);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Calculate current position along orbit
        let bodyX = cx;
        let bodyY = cy;

        if (body.eccentricity >= 1.0) {
          // Voyager hyperbolic trajectory
          const distance = Math.min(scaleAU * 12, (simTimeDays * 0.05 + 180) * (scaleAU / 20));
          const angle = -Math.PI / 4;
          bodyX = cx + Math.cos(angle) * distance;
          bodyY = cy + Math.sin(angle) * distance;
        } else {
          // Mean anomaly M = n * (t - T0)
          const meanMotion = (2 * Math.PI) / body.orbitalPeriodDays;
          const M = (meanMotion * simTimeDays) % (2 * Math.PI);
          // Approximation for eccentric anomaly E
          let E = M;
          for (let k = 0; k < 3; k++) {
            E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
          }
          const trueAnomaly = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
          const r = a * (1 - e * Math.cos(E));

          // Spacecraft specific orbital offsets (e.g. JWST at L2)
          if (body.id === 'jwst') {
            // Earth coordinates
            const earthA = 1.0 * scaleAU;
            const earthM = ((2 * Math.PI) / 365.25 * simTimeDays) % (2 * Math.PI);
            const earthX = cx + Math.cos(earthM) * earthA;
            const earthY = cy + Math.sin(earthM) * earthA;

            // L2 halo offset: 1.5M km = ~0.01 AU away from Sun + small Lissajous loop
            const l2Distance = 0.04 * scaleAU;
            const haloLoopAngle = (simTimeDays / 180) * Math.PI * 2;
            bodyX = earthX + Math.cos(earthM) * l2Distance + Math.cos(haloLoopAngle) * 5;
            bodyY = earthY + Math.sin(earthM) * l2Distance + Math.sin(haloLoopAngle) * 5;
          } else {
            bodyX = cx - focusOffset + Math.cos(trueAnomaly) * r;
            bodyY = cy + Math.sin(trueAnomaly) * (b / a * r);
          }
        }

        // Draw body
        const isSelected = body.id === selectedBodyId;
        const bodyRadius = body.type === 'spacecraft' ? 3.5 : Math.max(3, Math.min(8, 4 + zoom * 0.8));

        // Draw selection targeting reticle
        if (isSelected) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bodyX, bodyY, bodyRadius + 7, 0, Math.PI * 2);
          ctx.stroke();

          // Reticle ticks
          ctx.beginPath();
          ctx.moveTo(bodyX - bodyRadius - 10, bodyY);
          ctx.lineTo(bodyX - bodyRadius - 5, bodyY);
          ctx.moveTo(bodyX + bodyRadius + 5, bodyY);
          ctx.lineTo(bodyX + bodyRadius + 10, bodyY);
          ctx.moveTo(bodyX, bodyY - bodyRadius - 10);
          ctx.lineTo(bodyX, bodyY - bodyRadius - 5);
          ctx.moveTo(bodyX, bodyY + bodyRadius + 5);
          ctx.lineTo(bodyX, bodyY + bodyRadius + 10);
          ctx.stroke();
        }

        ctx.fillStyle = body.color;
        ctx.beginPath();
        ctx.arc(bodyX, bodyY, bodyRadius, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = '11px "IBM Plex Mono", monospace';
        ctx.fillStyle = isSelected ? '#38bdf8' : '#cbd5e1';
        ctx.fillText(body.name, bodyX + bodyRadius + 5, bodyY + 3);
      });

      // HUD Telemetry Stamp (Bottom left of canvas)
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`SIM T+${simTimeDays.toFixed(1)} DAYS | RATE ${speedMultiplier}X | SCALE 1 AU = ${scaleAU.toFixed(0)}px`, 16, height - 16);

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, speedMultiplier, zoom, selectedBodyId, pan, showAsteroidBelt, simTimeDays]);

  // Drag and Pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(5, Math.max(0.15, prev * zoomDelta)));
  };

  return (
    <div className="relative w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
      {/* Top Console Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-wider text-slate-300">
              Orbital Mechanics Simulator
            </span>
          </div>
          <span className="text-slate-600">·</span>
          <span className="text-xs font-mono text-slate-400">
            J2000 Ephemeris Engine
          </span>
        </div>

        {/* Preset Switches */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => handlePresetChange('inner')}
            className={`px-2.5 py-1 text-xs font-mono transition-colors rounded ${viewPreset === 'inner' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Inner Solar System
          </button>
          <button
            onClick={() => handlePresetChange('full')}
            className={`px-2.5 py-1 text-xs font-mono transition-colors rounded ${viewPreset === 'full' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Outer Gas Giants
          </button>
          <button
            onClick={() => handlePresetChange('cislunar')}
            className={`px-2.5 py-1 text-xs font-mono transition-colors rounded ${viewPreset === 'cislunar' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Cislunar & L2 Halo
          </button>
        </div>

        {/* Canvas Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAsteroidBelt(!showAsteroidBelt)}
            className={`p-1.5 rounded border text-xs font-mono transition-colors ${showAsteroidBelt ? 'bg-slate-800 border-slate-700 text-sky-400' : 'border-slate-800 text-slate-500 hover:text-slate-300'}`}
            title="Toggle Main Asteroid Belt"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.min(5, prev * 1.25))}
            className="p-1.5 rounded border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(0.15, prev * 0.8))}
            className="p-1.5 rounded border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => { setPan({ x: 0, y: 0 }); setZoom(1); }}
            className="p-1.5 rounded border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono"
            title="Reset Pan & Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-medium transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? 'PAUSE' : 'RESUME'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full h-[520px] cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full block"
        />

        {/* Floating Quick Body Selector Strip */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1 bg-slate-950/80 p-1.5 rounded-lg border border-slate-800 backdrop-blur-md max-w-xl">
          {CELESTIAL_BODIES.map(body => (
            <button
              key={body.id}
              onClick={() => setSelectedBodyId(body.id)}
              className={`px-2 py-0.5 text-xs font-mono rounded transition-colors ${selectedBodyId === body.id ? 'bg-sky-500 text-white font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              {body.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Floating Selected Body Telemetry HUD Card */}
        <div className="absolute bottom-4 right-4 z-10 w-80 bg-slate-950/90 border border-slate-800 rounded-lg p-3.5 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedBody.color }} />
              <h4 className="text-sm font-semibold text-slate-100 font-mono">{selectedBody.name}</h4>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {selectedBody.type}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-2">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Semi-Major Axis</div>
              <div className="text-slate-200 font-semibold">{selectedBody.semiMajorAxisAU.toFixed(3)} AU</div>
              <div className="text-[10px] text-slate-500">{(selectedBody.semiMajorAxisAU * 149.6).toFixed(1)}M km</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Orbital Velocity</div>
              <div className="text-sky-400 font-semibold">{selectedBody.speedKmSec.toFixed(1)} km/s</div>
              <div className="text-[10px] text-slate-500">{(selectedBody.speedKmSec * 3600).toLocaleString()} km/h</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Period (Earth Days)</div>
              <div className="text-slate-200">{selectedBody.orbitalPeriodDays.toLocaleString()} d</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Eccentricity (e)</div>
              <div className="text-slate-200">{selectedBody.eccentricity.toFixed(3)}</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
            {selectedBody.notes}
          </p>
        </div>
      </div>

      {/* Bottom Timeline & Speed Scrubber Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2.5 border-t border-slate-800/80 bg-slate-950/70 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-slate-500 uppercase text-[10px]">Simulation Speed:</span>
          {[0.5, 1, 5, 30, 90].map(speed => (
            <button
              key={speed}
              onClick={() => setSpeedMultiplier(speed)}
              className={`px-2 py-0.5 rounded ${speedMultiplier === speed ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {speed}x
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <span>Drag to pan canvas</span>
          <span>·</span>
          <span>Scroll wheel to zoom</span>
          <span>·</span>
          <span>Click body to inspect orbital state vector</span>
        </div>
      </div>
    </div>
  );
};
