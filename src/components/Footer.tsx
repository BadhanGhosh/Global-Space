import React from 'react';
import { ViewType } from './HeaderNav';

interface FooterProps {
  onNavigate: (view: ViewType, subTab?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-[#dce3eb] bg-[#f8fafc] text-[#596779] font-sans">
      <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-8">
        {/* Navigation Link Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold tracking-wider uppercase border-b border-[#e5eaf0] pb-6">
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => onNavigate('agencies')} className="hover:text-[#d83b35] transition-colors">
              AGENCIES
            </button>
            <button onClick={() => onNavigate('companies')} className="hover:text-[#d83b35] transition-colors">
              COMPANIES
            </button>
            <button onClick={() => onNavigate('countries')} className="hover:text-[#d83b35] transition-colors">
              COUNTRIES
            </button>
            <button onClick={() => onNavigate('missions')} className="hover:text-[#d83b35] transition-colors">
              MISSIONS
            </button>
            <button onClick={() => onNavigate('universe')} className="hover:text-[#d83b35] transition-colors">
              THE UNIVERSE
            </button>
            <button onClick={() => onNavigate('observatory')} className="hover:text-[#d83b35] transition-colors text-[#1769aa]">
              LIVE OBSERVATORY ↗
            </button>
          </div>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="text-[#d83b35] hover:underline font-bold"
          >
            AI SPACE ASSISTANT ↗
          </button>
        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#778598]">
          <div className="font-display font-semibold text-sm text-[#06152d]">
            GLOBAL SPACE INDEX // BHARAT SPACE
          </div>
          <div>
            Independent reference project · Sourced from NASA, ISRO, ESA, JAXA & official space archives
          </div>
        </div>
      </div>
    </footer>
  );
};
