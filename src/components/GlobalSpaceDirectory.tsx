import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Globe, Rocket, Building2, Compass, Layers, ShieldCheck } from 'lucide-react';
import { SPACE_AGENCIES, SPACE_COMPANIES, SPACE_MISSIONS, SpaceAgency, SpaceCompany, SpaceMission } from '../data/spaceData';

type ActiveTab = 'missions' | 'agencies' | 'companies';

export const GlobalSpaceDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('missions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter Missions
  const filteredMissions = useMemo(() => {
    return SPACE_MISSIONS.filter(m => {
      const matchesSearch = searchQuery === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.agencyOrCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.countryOrRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.objective.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDest = selectedDestination === 'all' || m.destination === selectedDestination;
      const matchesStatus = selectedStatus === 'all' || m.status === selectedStatus;

      return matchesSearch && matchesDest && matchesStatus;
    });
  }, [searchQuery, selectedDestination, selectedStatus]);

  // Filter Agencies
  const filteredAgencies = useMemo(() => {
    return SPACE_AGENCIES.filter(a => {
      return searchQuery === '' ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.focus.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Filter Companies
  const filteredCompanies = useMemo(() => {
    return SPACE_COMPANIES.filter(c => {
      return searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.coreCapability.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden" id="global-directory">
      {/* Top Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Globe className="w-4 h-4 text-sky-400" />
            <span className="uppercase tracking-wider text-slate-200 font-bold">
              Global Space Index // Public Reference Database
            </span>
            <span className="text-slate-600">·</span>
            <span>Independent Space Observatory</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Searchable registry of international governmental space agencies, commercial flight operators, and active exploration programs.
          </p>
        </div>

        {/* Directory Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('missions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors font-medium ${activeTab === 'missions' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Missions ({filteredMissions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('agencies')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors font-medium ${activeTab === 'agencies' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Agencies ({filteredAgencies.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors font-medium ${activeTab === 'companies' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Industry ({filteredCompanies.length})</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-5 border-b border-slate-800 bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab} by name, country, destination, or payload...`}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Quick Filter dropdowns for Missions */}
        {activeTab === 'missions' && (
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Destinations</option>
              <option value="Moon">Moon</option>
              <option value="Mars">Mars</option>
              <option value="Earth Orbit">Earth Orbit</option>
              <option value="Sun-Earth L2">Sun-Earth L2</option>
              <option value="Jupiter & Outer Solar System">Jupiter & Deep Space</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Operational Statuses</option>
              <option value="Operational">Operational</option>
              <option value="En Route">En Route</option>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
            </select>
          </div>
        )}
      </div>

      {/* Directory Grid Cards */}
      <div className="p-6">
        {activeTab === 'missions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMissions.map(m => (
              <div
                key={m.id}
                className="p-5 rounded-lg border border-slate-800/80 bg-slate-950/60 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-800/60">
                    <div>
                      <h4 className="font-mono text-base font-bold text-slate-100">{m.name}</h4>
                      <div className="text-xs text-slate-400 mt-0.5">
                        <span>{m.agencyOrCompany}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>{m.countryOrRegion}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>Launch {m.launchYear}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${m.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : m.status === 'En Route' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-300'}`}>
                      {m.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed my-3">
                    {m.objective}
                  </p>

                  <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-2 border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-500">Destination:</span> {m.destination}
                    </div>
                    <div>
                      <span className="text-slate-500">Trajectory:</span> {m.trajectoryType}
                    </div>
                    {m.payloadInstruments.length > 0 && (
                      <div>
                        <span className="text-slate-500">Key Instruments:</span> {m.payloadInstruments.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">
                    Range: {m.distanceFromEarthKm >= 1000000 ? `${(m.distanceFromEarthKm / 1000000).toFixed(1)}M km` : `${m.distanceFromEarthKm.toLocaleString()} km`}
                  </span>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    <span>Mission Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agencies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgencies.map(a => (
              <div
                key={a.acronym}
                className="p-5 rounded-lg border border-slate-800/80 bg-slate-950/60 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-800/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.badgeColor }} />
                        <h4 className="font-mono text-lg font-bold text-slate-100">{a.acronym}</h4>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        <span>{a.country}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>Est. {a.established}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span className="text-slate-300 font-semibold">${a.budgetBillionsUSD}B Budget</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed my-2 font-medium">
                    {a.name}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {a.focus}
                  </p>

                  <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-2 border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-500">HQ:</span> {a.headquarters}
                    </div>
                    <div>
                      <span className="text-slate-500">Flagship:</span> {a.flagshipPrograms.slice(0, 2).join(', ')}
                    </div>
                    <div>
                      <span className="text-slate-500">Vehicles:</span> {a.keyLaunchVehicles.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end text-xs font-mono">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    <span>Agency Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map(c => (
              <div
                key={c.name}
                className="p-5 rounded-lg border border-slate-800/80 bg-slate-950/60 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-800/60">
                    <div>
                      <h4 className="font-mono text-base font-bold text-slate-100">{c.name}</h4>
                      <div className="text-xs text-slate-400 mt-0.5">
                        <span>{c.country}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>Founded {c.founded}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span className="text-sky-400">{c.valuationOrFunding}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed my-3">
                    {c.coreCapability}
                  </p>

                  <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-2 border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-500">Sector:</span> {c.sector}
                    </div>
                    <div>
                      <span className="text-slate-500">Flagship:</span> {c.flagshipVehicleOrConstellation}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end text-xs font-mono">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    <span>Corporate Registry</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
