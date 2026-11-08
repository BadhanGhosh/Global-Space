import React, { useState, useEffect } from 'react';
import { Activity, Radio, RefreshCw, Satellite, ShieldCheck, Wifi } from 'lucide-react';

interface LiveTelemetryStreamBarProps {
  onForceRefresh?: () => void;
  packetRateHz?: number;
  onPacketRateChange?: (rate: number) => void;
}

export const LiveTelemetryStreamBar: React.FC<LiveTelemetryStreamBarProps> = ({
  onForceRefresh,
  packetRateHz = 1,
  onPacketRateChange
}) => {
  const [utcTime, setUtcTime] = useState<string>('');
  const [packetCount, setPacketCount] = useState<number>(14280);
  const [linkLatencyMs, setLinkLatencyMs] = useState<number>(38);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (packetRateHz <= 0) return;
    const intervalMs = Math.max(200, 1000 / packetRateHz);
    const packetInterval = setInterval(() => {
      setPacketCount(prev => prev + Math.floor(Math.random() * 3 + 1));
      // Subtle latency fluctuation
      setLinkLatencyMs(prev => Math.max(22, Math.min(65, prev + (Math.random() * 6 - 3))));
    }, intervalMs);
    return () => clearInterval(packetInterval);
  }, [packetRateHz]);

  const handleManualSync = () => {
    setIsSyncing(true);
    setPacketCount(p => p + 12);
    if (onForceRefresh) onForceRefresh();
    setTimeout(() => {
      setIsSyncing(false);
    }, 600);
  };

  return (
    <div className="w-full bg-[#05070c] border-b border-slate-800/90 text-xs font-mono text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mission Operations Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-slate-100 tracking-wider">
              GSO LIVE TELEMETRY
            </span>
          </div>

          <span className="text-slate-700">|</span>

          <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[11px]">
            <span>STATION: DSN / L2 / LEO ARRAY</span>
            <span>·</span>
            <span className="text-emerald-400">CARRIER SYNC: 100% NOMINAL</span>
          </div>
        </div>

        {/* Center: Live UTC Clock */}
        <div className="flex items-center gap-2 text-[11px] text-slate-200 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
          <span className="text-slate-500">UTC:</span>
          <span className="font-semibold tabular-nums text-cyan-400">{utcTime || 'SYNCHRONIZING...'}</span>
        </div>

        {/* Right: Telemetry Ingest Metrics & Sync Trigger */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span>PACKETS: <strong className="text-slate-200 tabular-nums">{packetCount.toLocaleString()}</strong></span>
            <span>·</span>
            <span>LATENCY: <strong className="text-cyan-400 tabular-nums">{linkLatencyMs.toFixed(0)} ms</strong></span>
          </div>

          {/* Rate Selector */}
          <div className="flex items-center gap-1 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
            <span className="text-[10px] text-slate-500">FEED:</span>
            {[1, 5].map(rate => (
              <button
                key={rate}
                onClick={() => onPacketRateChange && onPacketRateChange(rate)}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${packetRateHz === rate ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {rate}Hz
              </button>
            ))}
          </div>

          {/* Sync Button */}
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700/60 active:scale-95"
            title="Poll fresh aerospace telemetry packet"
          >
            <RefreshCw className={`w-3 h-3 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'INGESTING...' : 'SYNC'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
