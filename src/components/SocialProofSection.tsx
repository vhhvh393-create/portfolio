import React from 'react';
import { Eye, Flame, CheckCircle2, ShieldCheck, Youtube, Award, Star } from 'lucide-react';
import { Language } from '../data/translations';

interface SocialProofSectionProps {
  lang: Language;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section className="reveal-section w-full max-w-6xl mx-auto px-4 sm:px-6 my-6">
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-[#ffd700]/30 glow-gold-sm bg-gradient-to-r from-[#0b1f15]/90 via-[#07160e]/95 to-[#0b1f15]/90">
        
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 text-center sm:text-start">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#113824] text-[#ffd700] border border-[#ffd700]/30 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-white font-extrabold text-base md:text-lg flex items-center gap-2 justify-center sm:justify-start">
                <span>{isAr ? 'موثوق من قنوات يوتيوب وصناع محتوى رواد' : 'Trusted by Leading Creators & Channels'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h3>
              <p className="text-xs text-gray-400">
                {isAr ? 'خبرة عملية في إنتاج محتوى يحقق أعلى نسب تفاعل ومشاهدات' : 'Proven track record of high-retention video production'}
              </p>
            </div>
          </div>

          {/* Prominent Featured Client Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#113824]/90 border border-[#ffd700]/50 shadow-md">
            <div className="w-8 h-8 rounded-full bg-[#ffd700] text-[#07160e] flex items-center justify-center font-black text-xs shadow">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-start">
              <span className="text-[10px] text-gray-300 block leading-tight">{isAr ? 'عميل بارز' : 'Featured Client'}</span>
              <span className="text-sm font-black text-[#ffd700] tracking-wide">
                {isAr ? 'اقتصاد بلس (Eqtesad Plus)' : 'Eqtesad Plus (اقتصاد بلس)'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Numbers / Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          
          {/* Stat 1 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center hover:border-[#ffd700]/40 transition-colors">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black text-[#ffd700] mb-1 font-mono">
              <Eye className="w-5 h-5 text-emerald-400 opacity-90" />
              <span>+5M</span>
            </div>
            <span className="text-xs font-semibold text-gray-200">
              {isAr ? 'مشاهدات محققة' : 'Views Generated'}
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5">
              {isAr ? 'على يوتيوب والمنصات' : 'Across YouTube & Social'}
            </span>
          </div>

          {/* Stat 2 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center hover:border-[#ffd700]/40 transition-colors">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black text-[#ffd700] mb-1 font-mono">
              <Flame className="w-5 h-5 text-amber-400 opacity-90" />
              <span>+100</span>
            </div>
            <span className="text-xs font-semibold text-gray-200">
              {isAr ? 'فيديو وغلاف تم إنجازه' : 'Videos & Thumbnails'}
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5">
              {isAr ? 'بأعلى جودة إخراجية' : 'Delivered to clients'}
            </span>
          </div>

          {/* Stat 3 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center hover:border-[#ffd700]/40 transition-colors">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black text-[#ffd700] mb-1 font-mono">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 opacity-90" />
              <span>100%</span>
            </div>
            <span className="text-xs font-semibold text-gray-200">
              {isAr ? 'التزام بالمواعيد' : 'On-Time Delivery'}
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5">
              {isAr ? 'دقة وسرعة في التسليم' : 'Strict schedule adherence'}
            </span>
          </div>

          {/* Stat 4 - Channel partners */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center hover:border-[#ffd700]/40 transition-colors">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black text-[#ffd700] mb-1 font-mono">
              <Star className="w-5 h-5 text-[#ffd700] opacity-90" />
              <span>5.0</span>
            </div>
            <span className="text-xs font-semibold text-gray-200">
              {isAr ? 'تقييم رضا العملاء' : 'Client Satisfaction'}
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5">
              {isAr ? 'تعديلات حتى الرضا التام' : 'Revisions until perfection'}
            </span>
          </div>

        </div>

        {/* Client channels ticker/tags */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs text-gray-300">
          <span className="text-gray-400 text-xs font-medium">
            {isAr ? 'من بين الشركاء وصناع المحتوى:' : 'Featured Partners & Channels:'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#113824] border border-[#ffd700]/30 text-[#ffd700] font-bold text-xs flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>اقتصاد بلس</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-gray-300 font-medium text-xs">
              بودكاست بزنس وريادة
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-gray-300 font-medium text-xs">
              قنوات وثائقية ومعرفية
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
