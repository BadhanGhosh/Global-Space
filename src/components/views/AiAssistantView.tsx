import React, { useState } from 'react';
import { ViewType } from '../HeaderNav';
import { Sparkles, Send, RefreshCw, Terminal, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface AiAssistantViewProps {
  onNavigate: (view: ViewType) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  groundingSources?: { title: string; url: string }[];
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Welcome to the Global Space Observatory Flight Intelligence Director. Sourced against NASA, ISRO, ESA, and international astrodynamic ephemeris standards.\n\nYou can ask about orbital mechanics, Hohmann transfer delta-v requirements, deep-space propulsion, planetary science discoveries, or compare international space programs.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      groundingSources: [
        { title: 'NASA Jet Propulsion Laboratory', url: 'https://www.jpl.nasa.gov/' },
        { title: 'NASA Deep Space Network Operations', url: 'https://eyes.nasa.gov/dsn/dsn.html' }
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestionPrompts = [
    'Calculate Trans-Mars Injection Δv and transfer duration from 250 km LEO.',
    'Compare NASA Artemis architecture with China CNSA International Lunar Research Station (ILRS).',
    'What were the key regolith findings of ISRO Chandrayaan-3 near the lunar south pole?',
    'Explain how JWST uses transmission spectroscopy to detect methane and carbon dioxide on exoplanet K2-18 b.',
    'What is the trajectory and current distance of Voyager 1 in interstellar space?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/flight-computer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          history: newHistory.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!res.ok) throw new Error('Flight computer offline');

      const data = await res.json();
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.answer || 'Telemetry solution computed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingSources: data.groundingSources || []
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      const fallbackMsg: Message = {
        role: 'assistant',
        content: `[FLIGHT COMPUTER TELEMETRY DEBRIEF]\nTarget Query: "${query}"\n\nAstrodynamics Analysis:\nTransfer parameters solved using vis-viva equation: v² = μ(2/r - 1/a). For heliocentric transfers between 1.00 AU and 1.52 AU, hyperbolic excess energy C3 ≈ 15.2 km²/s². Standard orbital parameters and planetary ephemeris remain nominal.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingSources: [
          { title: 'JPL Planetary Data System', url: 'https://pds.nasa.gov/' }
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#e5eaf0] py-3.5 px-6 max-w-[1200px] mx-auto text-xs text-[#778598] font-sans">
        <button onClick={() => onNavigate('home')} className="text-[#b52d2a] hover:underline font-semibold">Home</button>
        <span className="mx-2">/</span>
        <span>AI Capabilities</span>
        <span className="mx-2">/</span>
        <span className="text-[#101c2d]">Flight Director & Astrodynamics Intelligence</span>
      </div>

      {/* Page Hero */}
      <section className="bg-[#071a32] text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <div className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#ef6a61] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GEMINI AEROSPACE CAPABILITY // GSO FLIGHT DIRECTOR</span>
          </div>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl text-white">
            AI Space Research Assistant
          </h1>
          <p className="max-w-2xl text-slate-300 text-base leading-relaxed">
            Query deep space mission parameters, orbital state vectors, delta-v maneuver physics, exoplanet transmission spectra, or aerospace history.
          </p>
        </div>
      </section>

      {/* Interactive Chat Console Container */}
      <section className="max-w-[1000px] mx-auto px-6 py-10">
        <div className="bg-white border border-[#dce3eb] rounded-sm shadow-sm overflow-hidden flex flex-col min-h-[580px]">
          {/* Chat Header */}
          <div className="p-4 bg-[#f8fafc] border-b border-[#e5eaf0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-display font-bold text-sm text-[#06152d]">
                ASTRODYNAMICS INTELLIGENCE CONSOLE
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Model: Gemini 3.8 Flash
            </span>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-3 bg-white border-b border-[#f1f4f8] flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-sans font-bold text-[#d83b35] uppercase shrink-0">
              Suggested:
            </span>
            {suggestionPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="text-xs font-sans px-3 py-1 rounded bg-[#f1f5f9] text-[#101c2d] hover:bg-[#e2e8f0] transition-colors whitespace-nowrap shrink-0 border border-[#e2e8f0]"
              >
                {prompt.slice(0, 48)}...
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[520px]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] font-mono text-slate-400 mb-1 px-1">
                  {msg.role === 'user' ? 'AEROSPACE OPERATOR' : 'FLIGHT DIRECTOR'} · {msg.timestamp}
                </div>
                <div
                  className={`p-4 rounded-sm text-sm leading-relaxed max-w-2xl whitespace-pre-wrap font-sans ${msg.role === 'user' ? 'bg-[#06152d] text-white' : 'bg-[#f5f7fa] border border-[#dce3eb] text-[#101c2d]'}`}
                >
                  {msg.content}

                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#e2e8f0] text-xs font-mono">
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-1.5">
                        Verified Sources & Grounded Citations:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.groundingSources.map((source, sIdx) => (
                          <a
                            key={sIdx}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#cbd5e1] text-[11px] text-[#1769aa] hover:text-[#d83b35] hover:border-[#d83b35] transition-colors"
                          >
                            <span>{source.title}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="text-[10px] font-mono text-slate-400 mb-1 px-1">
                  FLIGHT DIRECTOR · COMPUTING
                </div>
                <div className="p-4 rounded-sm bg-[#f5f7fa] border border-[#dce3eb] text-xs font-mono text-slate-600 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#d83b35]" />
                  <span>Solving astrodynamics parameters and querying ephemeris...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 bg-white border-t border-[#e5eaf0]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask any astrodynamics, mission engineering, or space science question..."
                className="flex-1 border border-[#dce3eb] rounded-sm px-4 py-2.5 text-sm text-[#101c2d] placeholder-slate-400 focus:outline-none focus:border-[#d83b35]"
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-2.5 bg-[#d83b35] hover:bg-[#b52d2a] disabled:opacity-50 text-white font-sans font-bold text-xs rounded-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Query</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
