import React, { useState } from 'react';
import { ViewType } from '../HeaderNav';
import { OrbitalTrajectoryCanvas } from '../OrbitalTrajectoryCanvas';
import { DeepSpaceNetworkRadar } from '../DeepSpaceNetworkRadar';
import { NearEarthObjectsRadar } from '../NearEarthObjectsRadar';
import { ISSEarthTrackVisualizer } from '../ISSEarthTrackVisualizer';
import { MarsAtmosphereStation } from '../MarsAtmosphereStation';
import { ExoplanetSpectroscopyChart } from '../ExoplanetSpectroscopyChart';
import { LiveSpaceWeatherMonitor } from '../LiveSpaceWeatherMonitor';
import { DsnSignalTimeSeriesChart } from '../DsnSignalTimeSeriesChart';
import { Activity, Compass, Radio, Satellite, ShieldAlert, Eye, LineChart as ChartIcon } from 'lucide-react';

interface ObservatoryViewProps {
  onNavigate: (view: ViewType) => void;
  initialTab?: string;
}

export const ObservatoryView: React.FC<ObservatoryViewProps> = ({ onNavigate, initialTab = 'orbital' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <div className="w-full bg-[#07090e] text-slate-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-slate-800 py-3.5 px-6 max-w-[1240px] mx-auto text-xs text-slate-400 font-mono">
        <button onClick={() => onNavigate('home')} className="text-rose-400 hover:underline font-semibold">Home</button>
        <span className="mx-2">/</span>
        <span>Observatory</span>
        <span className="mx-2">/</span>
        <span className="text-slate-200 uppercase">{activeTab}</span>
      </div>

      {/* Header */}
      <section className="border-b border-slate-800 py-10 px-6 bg-slate-950/60">
        <div className="max-w-[1240px] mx-auto space-y-3">
          <div className="text-[11px] font-mono font-bold tracking-[0.16em] text-cyan-400 uppercase">
            GLOBAL SPACE OBSERVATORY // FLIGHT TELEMETRY & DATA VISUALIZATIONS
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl text-white">
            Aerospace Instrumentation Stage
          </h1>
          <p className="max-w-3xl text-slate-400 text-sm leading-relaxed font-sans">
            Interactive numerical models, real-time antenna tracking arrays, dynamic Recharts time-series RF telemetry, planetary ephemeris, and physical science stations.
          </p>

          {/* Instrument Switcher Tabs */}
          <div className="pt-4 flex items-center gap-1.5 overflow-x-auto pb-2">
            {[
              { id: 'orbital', label: 'Orbital Mechanics Engine', icon: Compass },
              { id: 'dsn-chart', label: 'DSN Signal Time-Series (Recharts)', icon: ChartIcon },
              { id: 'dsn', label: 'Deep Space Network Array (DSN)', icon: Radio },
              { id: 'neo', label: 'NEO Asteroid Radar', icon: ShieldAlert },
              { id: 'iss', label: 'ISS Real-Time Ground Track', icon: Satellite },
              { id: 'mars', label: 'Mars Jezero Weather', icon: Activity },
              { id: 'jwst', label: 'JWST Spectroscopy', icon: Eye }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-mono font-semibold transition-colors whitespace-nowrap ${isSelected ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compact Heliospheric Space Weather Strip */}
      <section className="max-w-[1240px] mx-auto px-6 py-4">
        <LiveSpaceWeatherMonitor />
      </section>

      {/* Single Dedicated Focused Visualization Viewport */}
      <main className="max-w-[1240px] mx-auto px-6 py-6">
        <div className="transition-all duration-300">
          {activeTab === 'orbital' && <OrbitalTrajectoryCanvas />}
          {activeTab === 'dsn-chart' && <DsnSignalTimeSeriesChart />}
          {activeTab === 'dsn' && <DeepSpaceNetworkRadar />}
          {activeTab === 'neo' && <NearEarthObjectsRadar />}
          {activeTab === 'iss' && <ISSEarthTrackVisualizer />}
          {activeTab === 'mars' && <MarsAtmosphereStation />}
          {activeTab === 'jwst' && <ExoplanetSpectroscopyChart />}
        </div>
      </main>
    </div>
  );
};
