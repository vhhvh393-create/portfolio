import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';
import { Language, Translations } from '../data/translations';

interface FooterProps {
  profile: ProfileInfo;
  onScrollToTop: () => void;
  onOpenSettings?: () => void;
  lang: Language;
  t: Translations['footer'];
  navT: Translations['nav'];
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onScrollToTop,
  onOpenSettings,
  lang,
  t,
  navT,
}) => {
  const displayName = lang === 'ar' ? profile.name : profile.nameEn;
  const displayTitle = lang === 'ar' ? profile.titleEn : 'Video Editor & AI Designer';

  return (
    <footer className="w-full mt-16 py-12 border-t border-[#ffd700]/20 text-center bg-[#07160e]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={onScrollToTop}>
          <div className="w-9 h-9 rounded-full bg-[#113824] border border-[#ffd700]/40 flex items-center justify-center glow-gold-sm">
            <span className="text-[#ffd700] font-black text-lg">ب</span>
          </div>
          <span className="text-xl font-black text-white">{displayName}</span>
          <span className="text-xs text-gold">· {displayTitle}</span>
        </div>

        <p className="text-gray-400 text-xs max-w-md leading-relaxed mb-6">
          {t.description}
        </p>

        {/* Quick Nav tags */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300 mb-8">
          <a href="#thumbnails" className="hover:text-gold transition-colors">{navT.thumbnails}</a>
          <span className="text-gray-600">·</span>
          <a href="#podcasts" className="hover:text-gold transition-colors">{navT.podcasts}</a>
          <span className="text-gray-600">·</span>
          <a href="#long-videos" className="hover:text-gold transition-colors">{navT.longVideos}</a>
          <span className="text-gray-600">·</span>
          <a href="#reels" className="hover:text-gold transition-colors">{navT.reels}</a>
          <span className="text-gray-600">·</span>
          <a href="#tools" className="hover:text-gold transition-colors">{navT.tools}</a>
          <span className="text-gray-600">·</span>
          <a href="#contact" className="hover:text-gold transition-colors">{navT.contact}</a>
        </div>

        {/* Back to top & copyright */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <div className="flex items-center gap-2">
            <span>{t.rights} © {new Date().getFullYear()} {displayName}</span>
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="text-gray-500 hover:text-gold transition-colors text-[11px] underline mr-2 cursor-pointer"
              >
                {t.customize}
              </button>
            )}
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gold transition-colors cursor-pointer"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
