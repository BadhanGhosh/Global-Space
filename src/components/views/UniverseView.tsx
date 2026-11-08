import React, { useState } from 'react';
import { UNIVERSE_TOPICS, UniverseTopic } from '../../data/spaceData';
import { ViewType } from '../HeaderNav';
import { Sparkles, Compass, Eye } from 'lucide-react';

interface UniverseViewProps {
  onNavigate: (view: ViewType, subTab?: string) => void;
  selectedTopicId?: string;
}

export const UniverseView: React.FC<UniverseViewProps> = ({ onNavigate, selectedTopicId = 'all' }) => {
  const [activeTab, setActiveTab] = useState<string>(selectedTopicId);

  const filtered = activeTab === 'all'
    ? UNIVERSE_TOPICS
    : UNIVERSE_TOPICS.filter(t => t.id === activeTab);

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#e5eaf0] py-3.5 px-6 max-w-[1200px] mx-auto text-xs text-[#778598] font-sans">
        <button onClick={() => onNavigate('home')} className="text-[#b52d2a] hover:underline font-semibold">Home</button>
        <span className="mx-2">/</span>
        <span>The Universe</span>
        <span className="mx-2">/</span>
        <span className="text-[#101c2d]">Guide to the Cosmos</span>
      </div>

      {/* Page Hero */}
      <section className="bg-[#071a32] text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#ef6a61] uppercase">
            GLOBAL SPACE INDEX / COSMIC ENCYCLOPEDIA
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl text-white">
            Understand the Universe.<br />
            <em className="text-[#ef6a61] not-italic">One subject at a time.</em>
          </h1>
          <p className="max-w-2xl text-slate-300 text-base leading-relaxed">
            Start with our cosmic neighbourhood and move outward to stars, stellar nurseries, galaxies, black holes, exoplanets, and the large-scale structure of spacetime.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Topic filter bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-[#e5eaf0]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-sans font-bold tracking-wider rounded-sm transition-colors whitespace-nowrap ${activeTab === 'all' ? 'bg-[#06152d] text-white' : 'bg-[#f5f7fa] text-slate-600 hover:text-slate-900'}`}
          >
            ALL SUBJECTS
          </button>
          {UNIVERSE_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => setActiveTab(topic.id)}
              className={`px-3 py-1.5 text-xs font-sans font-bold tracking-wider rounded-sm transition-colors whitespace-nowrap ${activeTab === topic.id ? 'bg-[#06152d] text-white' : 'bg-[#f5f7fa] text-slate-600 hover:text-slate-900'}`}
            >
              {topic.title.split('&')[0].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Topic Cards Grid */}
        <div className="space-y-8">
          {filtered.map(topic => (
            <article
              key={topic.id}
              className="border border-[#dce3eb] p-6 sm:p-8 bg-white rounded-sm hover:border-slate-400 transition-colors"
            >
              <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#d83b35] mb-2 uppercase">
                {topic.kicker}
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#06152d] mb-3">
                {topic.title}
              </h2>
              <p className="text-slate-700 text-base leading-relaxed max-w-4xl mb-6">
                {topic.summary}
              </p>

              {/* Key Scientific Facts list */}
              <div className="bg-[#f8fafc] p-5 rounded border border-[#edf2f7] mb-6">
                <div className="text-xs font-bold font-sans uppercase tracking-wider text-[#06152d] mb-3">
                  Empirical Principles & Astrodynamic Observations
                </div>
                <ul className="space-y-2 text-sm text-slate-600 font-sans">
                  {topic.keyFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#d83b35] font-bold mt-0.5">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-4 border-t border-[#f1f4f8]">
                <span><strong>Significance:</strong> {topic.scientificSignificance}</span>
                <button
                  onClick={() => onNavigate('ai-assistant')}
                  className="font-bold text-[#d83b35] hover:underline whitespace-nowrap ml-4 flex items-center gap-1"
                >
                  <span>Query in AI Research</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
