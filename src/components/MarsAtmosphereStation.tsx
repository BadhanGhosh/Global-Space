import React, { useState } from 'react';
import { Compass, Wind, Thermometer, Gauge, Eye, Database, CheckCircle2 } from 'lucide-react';
import { MARS_WEATHER_STATION } from '../data/spaceData';

export const MarsAtmosphereStation: React.FC = () => {
  const [selectedCoreId, setSelectedCoreId] = useState<number>(1);
  const data = MARS_WEATHER_STATION;

  // Mock Mars diurnal pressure wave curve over Sol hours (00:00 to 24:00 LMST)
  const diurnalPressureCurve = [
    { solHour: '00', pa: 738 },
    { solHour: '04', pa: 734 },
    { solHour: '08', pa: 746 },
    { solHour: '12', pa: 752 },
    { solHour: '16', pa: 744 },
    { solHour: '20', pa: 739 },
    { solHour: '24', pa: 737 }
  ];

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="uppercase tracking-wider text-slate-200 font-semibold">Mars Surface Environmental Station (MEDA)</span>
            <span>·</span>
            <span>Perseverance Rover · Jezero Crater</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            In-situ atmospheric pressure, diurnal thermal amplitude, wind vector anemometry and geological core cache.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-500 mr-1">MISSION SOL:</span>
            <span className="text-amber-400 font-bold tabular-nums">{data.sol}</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hidden sm:block">
            <span className="text-slate-500 mr-1">LOCATION:</span>
            <span className="text-slate-200">18.38°N, 77.58°E</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Weather Telemetry Grid & Jezero Delta Photo */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-5">
          {/* 4 Sensor Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Atmospheric Pressure</span>
              <span className="text-xl font-mono font-bold text-slate-100 tabular-nums">{data.pressurePascals}</span>
              <span className="text-xs font-mono text-slate-400 ml-1">Pa</span>
              <span className="text-[10px] block font-mono text-emerald-400 mt-1">Trend: {data.pressureTrend}</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Air Temperature</span>
              <span className="text-xl font-mono font-bold text-rose-400 tabular-nums">{data.airTemperatureMaxC}°</span>
              <span className="text-xs font-mono text-slate-400 ml-0.5">C</span>
              <span className="text-[10px] block font-mono text-slate-400 mt-1">Low: {data.airTemperatureMinC}°C</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Ground Regolith Temp</span>
              <span className="text-xl font-mono font-bold text-amber-300 tabular-nums">{data.groundTemperatureMaxC}°</span>
              <span className="text-xs font-mono text-slate-400 ml-0.5">C</span>
              <span className="text-[10px] block font-mono text-slate-400 mt-1">Min: {data.groundTemperatureMinC}°C</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Dust Opacity (Tau)</span>
              <span className="text-xl font-mono font-bold text-sky-400 tabular-nums">{data.dustOpticalDepthTau}</span>
              <span className="text-[10px] block font-mono text-emerald-400 mt-1">Clear Sky</span>
            </div>
          </div>

          {/* Diurnal Bar Chart */}
          <div className="p-4 rounded-lg border border-slate-800 bg-[#040609]">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-slate-300 font-semibold">DIURNAL ATMOSPHERIC PRESSURE TIDE (SOL {data.sol})</span>
              <span className="text-slate-400">Mean: ~742 Pascals (0.74% Earth atm)</span>
            </div>

            <div className="h-28 flex items-end justify-between gap-3 pt-3 pb-1 border-b border-slate-800">
              {diurnalPressureCurve.map(item => {
                const heightPercent = ((item.pa - 725) / 35) * 100;
                return (
                  <div key={item.solHour} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-300 tabular-nums">{item.pa}</span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-rose-950 to-rose-500/80 transition-all duration-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[10px] font-mono text-slate-500">{item.solHour}:00</span>
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-2 flex justify-between">
              <span>Mars Local Solar Time (LMST)</span>
              <span>Thermal atmospheric tide driven by solar heating of CO₂</span>
            </div>
          </div>

          {/* Panoramic Jezero Delta Photo */}
          <div className="relative rounded-lg overflow-hidden border border-slate-800 group">
            <img
              src="/src/assets/images/mars_jezero_crater_1794124311119.jpg"
              alt="Perseverance Mastcam view across ancient river delta sediment layers at Jezero Crater"
              className="w-full h-44 object-cover filter brightness-95 group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-3 flex flex-col justify-end">
              <span className="text-xs font-mono font-bold text-slate-100">Jezero Crater Sedimentary Delta Fan</span>
              <span className="text-[11px] text-slate-300">Lacustrine mudstones and conglomerate rocks indicating ancient aqueous environment</span>
            </div>
          </div>
        </div>

        {/* Right: Mars Sample Return Sealed Core Cache */}
        <div className="lg:col-span-5 p-6 bg-slate-950/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-rose-400" />
                <h3 className="font-mono text-sm font-bold text-slate-100">HERMETIC SAMPLE RETURN CACHE</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">{data.sealedCoresCount} Cores Sealed</span>
            </div>

            <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
              Titanium sample tubes hermetically sealed by Perseverance’s robotic coring drill for the future NASA/ESA Mars Sample Return campaign.
            </p>

            {/* Core Sample List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {[
                { id: 1, name: 'Sample #01 (Montdenier)', rockType: 'Igneous crater floor basalt', sol: 190, depthMm: 59.8, organics: 'Aromatic carbon detected by SHERLOC' },
                { id: 2, name: 'Sample #02 (Montagnac)', rockType: 'Paired igneous olivine core', sol: 196, depthMm: 61.2, organics: 'Carbonate minerals & sulfate veins' },
                { id: 3, name: 'Sample #07 (Swift Run)', rockType: 'Fine-grained delta siltstone', sol: 490, depthMm: 60.1, organics: 'Highest concentration of preserved organics' },
                { id: 4, name: 'Sample #14 (Bearwallow)', rockType: 'River conglomerate sandstone', sol: 654, depthMm: 58.4, organics: 'Clay mineral detritus' },
                { id: 5, name: 'Sample #24 (Comet Geyser)', rockType: 'Atmospheric gas blank sample', sol: 890, depthMm: 0, organics: 'Pristine Martian atmospheric isotopic ratios' }
              ].map(sample => {
                const isSelected = sample.id === selectedCoreId;
                return (
                  <div
                    key={sample.id}
                    onClick={() => setSelectedCoreId(sample.id)}
                    className={`p-3 rounded-lg border text-xs font-mono cursor-pointer transition-colors ${isSelected ? 'bg-rose-500/10 border-rose-500/50 text-slate-100' : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-200">
                      <span>{sample.name}</span>
                      <span className="text-[10px] text-amber-400">Sol {sample.sol}</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">{sample.rockType}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Analysis: {sample.organics}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between">
            <span>Mars 2020 Caching Subsystem</span>
            <span>NASA / JPL / ESA MSR Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
};
