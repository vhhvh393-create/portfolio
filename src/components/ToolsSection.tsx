import React from 'react';
import { Film, Sparkles, Cpu, Headphones } from 'lucide-react';
import { SOFTWARE_TOOLS } from '../data/portfolioData';
import { Language, Translations } from '../data/translations';

interface ToolsSectionProps {
  lang: Language;
  t: Translations['toolsSection'];
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ lang, t }) => {
  const isAr = lang === 'ar';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'film':
        return <Film className="w-6 h-6 text-[#ffd700]" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-[#ffd700]" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-[#ffd700]" />;
      case 'headphones':
        return <Headphones className="w-6 h-6 text-[#ffd700]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#ffd700]" />;
    }
  };

  return (
    <section id="tools" className="w-full max-w-6xl mx-auto px-6 py-8 scroll-mt-28">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center justify-center gap-3">
          <span className="w-8 h-1 bg-gold rounded-full"></span>
          {t.title}
          <span className="w-8 h-1 bg-gold rounded-full"></span>
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm">
          {isAr 
            ? 'أدوات المونتاج والمؤثرات والذكاء الاصطناعي لإنتاج محتوى استثنائي' 
            : 'Core editing, visual effects, and AI toolset for production'}
        </p>
      </div>

      {/* 4 Clean Minimal Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {SOFTWARE_TOOLS.map((tool, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl flex flex-col items-center text-center hover:border-[#ffd700]/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#ffd700]/10 group"
          >
            {/* Tool Icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#113824] border border-[#ffd700]/30 flex items-center justify-center mb-3.5 glow-gold-sm group-hover:border-[#ffd700] transition-colors">
              {getIcon(tool.icon)}
            </div>

            {/* Tool Name */}
            <h4 className="text-base sm:text-lg font-black text-white mb-1.5 group-hover:text-[#ffd700] transition-colors">
              {tool.name}
            </h4>

            {/* Short Category Label */}
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-gray-300">
              {isAr ? tool.categoryAr : tool.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
