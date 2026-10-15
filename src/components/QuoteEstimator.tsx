import React, { useState } from 'react';
import { X, MessageCircle, Check, Calculator, Clock } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';
import { Language, Translations } from '../data/translations';

interface QuoteEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
  lang: Language;
  t: Translations['quoteModal'];
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ isOpen, onClose, profile, lang, t }) => {
  const [projectType, setProjectType] = useState<'reels' | 'long' | 'podcast' | 'thumbnails' | 'bundle'>('reels');
  const [quantity, setQuantity] = useState<number>(3);
  const [urgency, setUrgency] = useState<'normal' | 'rush'>('normal');
  const [includeCaptions, setIncludeCaptions] = useState(true);
  const [includeThumbnail, setIncludeThumbnail] = useState(true);
  const [clientNotes, setClientNotes] = useState('');

  if (!isOpen) return null;

  const projectTypesAr = [
    { id: 'reels', label: 'ريلز وشورتس (9:16)', desc: 'فيديوهات رأسية سريعة بنصوص متحركة وهندسة صوتية' },
    { id: 'long', label: 'فيديوهات طويلة يوتيوب', desc: 'سرد قصصي، تلوين، ومونتاج عالي الاحتفاظ' },
    { id: 'podcast', label: 'حلقات بودكاست', desc: 'تعدد كاميرات، تنقية صوت، وتقطيع فصول' },
    { id: 'thumbnails', label: 'تصميم صور مصغرة (Thumbnails)', desc: 'أغلفة جذابة بالذكاء الاصطناعي ومعدل CTR مرتفع' },
    { id: 'bundle', label: 'باقة شهرية شاملة', desc: 'إدارة كاملة للمحتوى المرئي لقناتك أو علامتك' },
  ];

  const projectTypesEn = [
    { id: 'reels', label: 'Reels & Shorts (9:16)', desc: 'Fast-paced vertical videos with animated captions & sound design' },
    { id: 'long', label: 'YouTube Long-form Videos', desc: 'Documentary storytelling, pacing, and color grading' },
    { id: 'podcast', label: 'Podcast Episodes', desc: 'Multicam editing, audio cleanup, and chaptering' },
    { id: 'thumbnails', label: 'High-CTR Thumbnails', desc: 'Psychology-driven thumbnails with generative AI' },
    { id: 'bundle', label: 'Monthly Retainer Bundle', desc: 'End-to-end post-production management for channels & brands' },
  ];

  const projectTypes = lang === 'ar' ? projectTypesAr : projectTypesEn;

  const getEstimatedTurnaround = () => {
    if (lang === 'ar') {
      if (urgency === 'rush') return '24 - 48 ساعة فقط (أولوية قصوى)';
      if (projectType === 'thumbnails') return '24 - 48 ساعة';
      if (projectType === 'reels') return '48 - 72 ساعة';
      if (projectType === 'bundle') return 'تسليم أسبوعي مستمر';
      return '3 - 5 أيام عمل';
    } else {
      if (urgency === 'rush') return '24 - 48 Hours Express (Top Priority)';
      if (projectType === 'thumbnails') return '24 - 48 Hours';
      if (projectType === 'reels') return '48 - 72 Hours';
      if (projectType === 'bundle') return 'Weekly Continuous Delivery';
      return '3 - 5 Business Days';
    }
  };

  const generateWhatsAppMessage = () => {
    const selectedTypeObj = projectTypes.find((p) => p.id === projectType);
    let msg = lang === 'ar'
      ? `السلام عليكم بيشوى، أرغب في الاستفسار عن عرض سعر لمشروع:\n`
      : `Hello Bishoy, I would like to inquire about a project quote:\n`;
    
    msg += `• ${lang === 'ar' ? 'نوع الخدمة' : 'Service'}: ${selectedTypeObj?.label}\n`;
    msg += `• ${lang === 'ar' ? 'العدد' : 'Quantity'}: ${quantity}\n`;
    msg += `• ${lang === 'ar' ? 'سرعة التسليم' : 'Turnaround'}: ${urgency === 'rush' ? (lang === 'ar' ? 'مستعجل (24-48 ساعة)' : 'Rush (24-48h)') : (lang === 'ar' ? 'عادي' : 'Standard')}\n`;
    
    if (projectType !== 'thumbnails') {
      msg += `• ${lang === 'ar' ? 'كابشنز متحركة' : 'Animated Captions'}: ${includeCaptions ? (lang === 'ar' ? 'نعم مطلوب' : 'Yes') : (lang === 'ar' ? 'لا' : 'No')}\n`;
      msg += `• ${lang === 'ar' ? 'غلاف مصغر' : 'Thumbnail'}: ${includeThumbnail ? (lang === 'ar' ? 'نعم مطلوب' : 'Yes') : (lang === 'ar' ? 'لا' : 'No')}\n`;
    }
    if (clientNotes.trim()) {
      msg += `• ${lang === 'ar' ? 'ملاحظات' : 'Notes'}: ${clientNotes.trim()}\n`;
    }
    return encodeURIComponent(msg);
  };

  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${cleanPhone}?text=${generateWhatsAppMessage()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#07160e] border border-[#ffd700]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#ffd700]/20 bg-[#0b1f15]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#113824] text-[#ffd700] border border-[#ffd700]/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">{t.title}</h3>
              <p className="text-xs text-gray-300">{t.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Project Type */}
          <div>
            <label className="block text-sm font-bold text-white mb-3">
              {t.step1}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {projectTypes.map((tItem) => (
                <button
                  key={tItem.id}
                  type="button"
                  onClick={() => setProjectType(tItem.id as any)}
                  className={`p-3 rounded-xl text-start transition-all border ${
                    projectType === tItem.id
                      ? 'bg-[#113824] border-[#ffd700] text-[#ffd700] glow-gold-sm'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{tItem.label}</span>
                    {projectType === tItem.id && <Check className="w-4 h-4 text-[#ffd700]" />}
                  </div>
                  <span className="text-[11px] text-gray-400 block leading-tight">{tItem.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-white">
                {t.step2}
              </label>
              <span className="text-gold font-bold text-base px-3 py-0.5 rounded bg-[#ffd700]/10 border border-[#ffd700]/20 font-mono">
                {quantity} {projectType === 'thumbnails' ? (lang === 'ar' ? 'صور' : 'Thumbnails') : (lang === 'ar' ? 'فيديوهات' : 'Videos')}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-[#ffd700] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20+</span>
            </div>
          </div>

          {/* Delivery Urgency */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              {t.step3}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUrgency('normal')}
                className={`p-3 rounded-xl text-center border font-bold text-sm transition-all ${
                  urgency === 'normal'
                    ? 'bg-[#113824] border-[#ffd700] text-[#ffd700]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
                }`}
              >
                <span>{t.standardDelivery}</span>
                <span className="block text-[11px] text-gray-400 font-normal mt-0.5">{t.standardDesc}</span>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('rush')}
                className={`p-3 rounded-xl text-center border font-bold text-sm transition-all ${
                  urgency === 'rush'
                    ? 'bg-[#113824] border-[#ffd700] text-[#ffd700]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
                }`}
              >
                <span>{t.rushDelivery}</span>
                <span className="block text-[11px] text-gray-400 font-normal mt-0.5">{t.rushDesc}</span>
              </button>
            </div>
          </div>

          {/* Additional Options */}
          {projectType !== 'thumbnails' && (
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="block text-xs font-bold text-gray-300 mb-1">{t.extrasTitle}</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-200">
                <input
                  type="checkbox"
                  checked={includeCaptions}
                  onChange={(e) => setIncludeCaptions(e.target.checked)}
                  className="rounded text-[#ffd700] accent-[#ffd700] w-4 h-4"
                />
                <span>{t.captionsOption}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-200">
                <input
                  type="checkbox"
                  checked={includeThumbnail}
                  onChange={(e) => setIncludeThumbnail(e.target.checked)}
                  className="rounded text-[#ffd700] accent-[#ffd700] w-4 h-4"
                />
                <span>{t.thumbnailsOption}</span>
              </label>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              {t.step4}
            </label>
            <textarea
              rows={2}
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full bg-[#0b1f15] border border-white/15 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-[#113824]/60 border border-[#ffd700]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#ffd700]" />
              <div>
                <span className="text-xs text-gray-300 block">{t.turnaroundLabel}</span>
                <span className="text-sm font-bold text-[#ffd700]">{getEstimatedTurnaround()}</span>
              </div>
            </div>
            <span className="text-xs text-emerald-300 font-semibold bg-emerald-900/60 px-2.5 py-1 rounded">
              {t.freeConsultation}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ffd700]/20 bg-[#0b1f15] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white glass-panel rounded-xl cursor-pointer"
          >
            {t.cancel}
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-sm font-bold bg-[#ffd700] text-[#07160e] hover:bg-[#ffe234] rounded-xl flex items-center gap-2 shadow-lg shadow-[#ffd700]/20 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.sendWhatsApp}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
