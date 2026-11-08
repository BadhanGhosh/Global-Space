import React, { useState, useEffect } from 'react';
import { Radio, Compass, Wifi, Clock, ArrowDownRight, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';

interface DsnDish {
  dish: string;
  sizeMeters: number;
  target: string;
  band: string;
  freqGhz: number;
  powerDbm: number;
  dataRateKbps: number;
  rtltMinutes: number;
  azimuthDeg: number;
  elevationDeg: number;
  state: string;
  snrDb: number;
}

interface DsnComplex {
  id: string;
  name: string;
  location: string;
  coords: { lat: number; lng: number };
  localTime: string;
  dishes: DsnDish[];
}

const DEFAULT_DSN_COMPLEXES: DsnComplex[] = [
  {
    id: 'goldstone',
    name: 'Goldstone Deep Space Complex',
    location: 'Mojave Desert, California (USA)',
    coords: { lat: 35.426, lng: -116.89 },
    localTime: 'PST (UTC-8)',
    dishes: [
      {
        dish: 'DSS-14',
        sizeMeters: 70,
        target: 'Voyager 1',
        band: 'X-Band Downlink',
        freqGhz: 8.415,
        powerDbm: -159.2,
        dataRateKbps: 0.16,
        rtltMinutes: 1365.4,
        azimuthDeg: 214.3,
        elevationDeg: 38.6,
        state: 'CARRIER_LOCKED',
        snrDb: 11.4
      },
      {
        dish: 'DSS-25',
        sizeMeters: 34,
        target: 'Europa Clipper',
        band: 'Ka-Band Downlink',
        freqGhz: 32.05,
        powerDbm: -138.6,
        dataRateKbps: 450.0,
        rtltMinutes: 24.8,
        azimuthDeg: 142.1,
        elevationDeg: 62.4,
        state: 'SCIENCE_INGEST',
        snrDb: 22.8
      },
      {
        dish: 'DSS-26',
        sizeMeters: 34,
        target: 'Mars Perseverance',
        band: 'X-Band Uplink/Downlink',
        freqGhz: 7.149,
        powerDbm: -142.1,
        dataRateKbps: 128.0,
        rtltMinutes: 18.2,
        azimuthDeg: 98.7,
        elevationDeg: 45.2,
        state: 'TWO_WAY_COHERENT',
        snrDb: 19.5
      }
    ]
  },
  {
    id: 'madrid',
    name: 'Madrid Deep Space Complex',
    location: 'Robledo de Chavela, Spain',
    coords: { lat: 40.431, lng: -4.248 },
    localTime: 'CET (UTC+1)',
    dishes: [
      {
        dish: 'DSS-63',
        sizeMeters: 70,
        target: 'James Webb Space Telescope (JWST)',
        band: 'Ka-Band Downlink',
        freqGhz: 25.9,
        powerDbm: -121.3,
        dataRateKbps: 28000.0,
        rtltMinutes: 0.163, // 9.8 sec
        azimuthDeg: 188.5,
        elevationDeg: 54.1,
        state: 'HIGH_RATE_SCIENCE_DUMP',
        snrDb: 34.2
      },
      {
        dish: 'DSS-65',
        sizeMeters: 34,
        target: 'Parker Solar Probe',
        band: 'X-Band Downlink',
        freqGhz: 8.43,
        powerDbm: -149.7,
        dataRateKbps: 34.5,
        rtltMinutes: 8.4,
        azimuthDeg: 285.2,
        elevationDeg: 29.8,
        state: 'CORONA_DATA_PASS',
        snrDb: 15.6
      }
    ]
  },
  {
    id: 'canberra',
    name: 'Canberra Deep Space Complex',
    location: 'Tidbinbilla, ACT, Australia',
    coords: { lat: -35.401, lng: 148.982 },
    localTime: 'AEDT (UTC+11)',
    dishes: [
      {
        dish: 'DSS-43',
        sizeMeters: 70,
        target: 'Voyager 2',
        band: 'S-Band Uplink / X-Band Downlink',
        freqGhz: 8.42,
        powerDbm: -161.8,
        dataRateKbps: 0.16,
        rtltMinutes: 1128.0,
        azimuthDeg: 312.4,
        elevationDeg: 42.1,
        state: 'INTERSTELLAR_LINK',
        snrDb: 9.8
      },
      {
        dish: 'DSS-36',
        sizeMeters: 34,
        target: 'New Horizons',
        band: 'X-Band Downlink',
        freqGhz: 8.438,
        powerDbm: -157.1,
        dataRateKbps: 1.0,
        rtltMinutes: 492.0,
        azimuthDeg: 125.0,
        elevationDeg: 35.6,
        state: 'KUIPER_BELT_INGEST',
        snrDb: 13.1
      }
    ]
  }
];

export const DeepSpaceNetworkRadar: React.FC = () => {
  const [complexes, setComplexes] = useState<DsnComplex[]>(DEFAULT_DSN_COMPLEXES);
  const [selectedComplexId, setSelectedComplexId] = useState<string>('goldstone');
  const [selectedDishName, setSelectedDishName] = useState<string>('DSS-14');
  const [ticker, setTicker] = useState(0);

  // Periodic simulated RF jitter & RTLT increment
  useEffect(() => {
    const timer = setInterval(() => {
      setTicker(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeComplex = complexes.find(c => c.id === selectedComplexId) || complexes[0];
  const activeDish = activeComplex.dishes.find(d => d.dish === selectedDishName) || activeComplex.dishes[0];

  const formatRtlt = (minutes: number) => {
    if (minutes < 1) {
      return `${(minutes * 60).toFixed(1)} sec`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes * 60) % 60);
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="uppercase tracking-wider text-slate-200 font-semibold">NASA Deep Space Network (DSN)</span>
            <span>·</span>
            <span>Global Interplanetary Radio Array</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time parabolic tracking antennas communicating across the solar system at 120° planetary longitude spacing.
          </p>
        </div>

        {/* Complex Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          {complexes.map(comp => (
            <button
              key={comp.id}
              onClick={() => {
                setSelectedComplexId(comp.id);
                setSelectedDishName(comp.dishes[0].dish);
              }}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${selectedComplexId === comp.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {comp.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Antenna Display & RF Signal Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Active Dishes for Complex */}
        <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">Antennas Online ({activeComplex.dishes.length})</span>
            <span className="text-xs font-mono text-slate-400">{activeComplex.location}</span>
          </div>

          <div className="space-y-2.5">
            {activeComplex.dishes.map(dish => {
              const isSelected = dish.dish === activeDish.dish;
              return (
                <div
                  key={dish.dish}
                  onClick={() => setSelectedDishName(dish.dish)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${isSelected ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/20' : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-100">{dish.dish}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {dish.sizeMeters}m Parabolic
                        </span>
                      </div>
                      <div className="text-xs font-mono text-cyan-400 font-semibold mt-1">
                        → {dish.target}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {dish.state}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800/60 text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Frequency</div>
                      <div className="text-slate-300">{dish.freqGhz.toFixed(2)} GHz</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Data Rate</div>
                      <div className="text-slate-300">
                        {dish.dataRateKbps >= 1000 ? `${(dish.dataRateKbps / 1000).toFixed(1)} Mbps` : `${dish.dataRateKbps.toFixed(2)} kbps`}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">RTLT Light Time</div>
                      <div className="text-sky-400 font-semibold">{formatRtlt(dish.rtltMinutes)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DSN Complex photo showcase */}
          <div className="relative rounded-lg overflow-hidden border border-slate-800 mt-4 group">
            <img
              src="/src/assets/images/deep_space_antenna_array_1794124312358.jpg"
              alt="NASA Deep Space Network 70-meter dish antenna at twilight"
              className="w-full h-36 object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[11px] font-mono font-semibold text-slate-200">70-Meter High-Gain Parabolic Reflector</span>
              <span className="text-[10px] text-slate-400">Equivalent to a 20-story building rotating with sub-millimeter precision</span>
            </div>
          </div>
        </div>

        {/* Right: Active Antenna Telemetry Console & RF Spectrum */}
        <div className="lg:col-span-7 p-6 bg-slate-950/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <h3 className="font-mono text-sm font-bold text-slate-100">
                  {activeDish.dish} // DOWNLINK & UPLINK TELEMETRY CONSOLE
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>RTLT: {formatRtlt(activeDish.rtltMinutes)}</span>
              </div>
            </div>

            {/* Main Instrument HUD Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5">
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Received Power</span>
                <span className="text-xl font-mono font-bold text-slate-100">{activeDish.powerDbm.toFixed(1)}</span>
                <span className="text-[10px] font-mono text-slate-400 ml-1">dBm</span>
                <span className="text-[10px] block font-mono text-emerald-400 mt-1">● Carrier Locked</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Signal-to-Noise</span>
                <span className="text-xl font-mono font-bold text-cyan-400">{activeDish.snrDb.toFixed(1)}</span>
                <span className="text-[10px] font-mono text-slate-400 ml-1">dB</span>
                <span className="text-[10px] block font-mono text-slate-400 mt-1">Margin: +8.2 dB</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Azimuth Bearing</span>
                <span className="text-xl font-mono font-bold text-slate-100">{activeDish.azimuthDeg.toFixed(1)}°</span>
                <span className="text-[10px] block font-mono text-slate-400 mt-1">Az Rate: 0.04°/s</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Elevation Angle</span>
                <span className="text-xl font-mono font-bold text-slate-100">{activeDish.elevationDeg.toFixed(1)}°</span>
                <span className="text-[10px] block font-mono text-slate-400 mt-1">Horizon Limit: &gt;6°</span>
              </div>
            </div>

            {/* Interactive Animated RF Waveform Spectrum Display */}
            <div className="p-4 rounded-lg border border-slate-800 bg-[#040609] mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  RF Spectrum & Intermediate Frequency Waterfall (Band: {activeDish.band})
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  Carrier Center: {activeDish.freqGhz.toFixed(3)} GHz
                </span>
              </div>

              {/* Synthetic RF spectrum bars */}
              <div className="h-24 flex items-end justify-between gap-1 pt-2 pb-1 border-b border-slate-800">
                {Array.from({ length: 32 }).map((_, idx) => {
                  const isCenterCarrier = idx >= 14 && idx <= 17;
                  const randomJitter = Math.sin((ticker + idx) * 0.4) * 8;
                  const height = isCenterCarrier ? 75 + randomJitter : 18 + (Math.sin(idx * 0.8 + ticker) * 12);
                  return (
                    <div
                      key={idx}
                      className="flex-1 rounded-t transition-all duration-300"
                      style={{
                        height: `${Math.max(8, Math.min(95, height))}%`,
                        backgroundColor: isCenterCarrier ? '#06b6d4' : '#1e293b'
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>-100 kHz</span>
                <span>-50 kHz</span>
                <span className="text-cyan-400 font-semibold">f₀ (Carrier Peak)</span>
                <span>+50 kHz</span>
                <span>+100 kHz</span>
              </div>
            </div>

            {/* Technical Flight Specs Box */}
            <div className="p-3.5 rounded-lg border border-slate-800/80 bg-slate-900/40 text-xs font-mono text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Spacecraft:</span>
                <span className="font-semibold text-slate-100">{activeDish.target}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transceiver Configuration:</span>
                <span>Ultra-Low Noise Cryogenic Maser Pre-amplifier (HEMT)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Forward Error Correction:</span>
                <span>CCSDS Turbo Code Rate 1/2 (Constraint Length 7)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Round-Trip Light Time (RTLT):</span>
                <span className="text-cyan-400 font-bold">{formatRtlt(activeDish.rtltMinutes)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>NASA Deep Space Communications Complex · Caltech / Jet Propulsion Laboratory</span>
            <span>DATA STREAM: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
