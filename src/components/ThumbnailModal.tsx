import React from 'react';
import { X, ExternalLink, Sparkles, MessageCircle, CheckCircle, Tag } from 'lucide-react';
import { ThumbnailItem, ProfileInfo } from '../data/portfolioData';

interface ThumbnailModalProps {
  item: ThumbnailItem | null;
  onClose: () => void;
  profile: ProfileInfo;
}

export const ThumbnailModal: React.FC<ThumbnailModalProps> = ({ item, onClose, profile }) => {
  if (!item) return null;

  const imgSrc = `https://lh3.googleusercontent.com/d/${item.driveId}`;

  const whatsappInquiryUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `السلام عليكم بيشوى، يعجبني هذا النموذج من الصور المصغرة "${item.title}"، أرغب في تصميم مماثل لقناتي.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#07160e] border border-[#ffd700]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#ffd700]/15 bg-[#0b1f15]/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700]"></span>
            <span className="text-xs font-bold text-[#ffd700]">{item.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Image display */}
        <div className="relative bg-black flex items-center justify-center overflow-auto max-h-[55vh] p-2">
          <img
            src={imgSrc}
            alt={item.title}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = item.fallbackUrl;
            }}
            className="w-full h-auto max-h-[50vh] object-contain rounded-lg"
          />
        </div>

        {/* Modal Details & Action bar */}
        <div className="p-6 bg-[#07160e] flex flex-col gap-4 text-right">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
          </div>

          {/* Tools & Strategy Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            <span className="text-xs font-semibold text-gray-400 ml-2">الأدوات والتقنيات:</span>
            {item.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs rounded-md bg-[#113824] text-[#ffd700] border border-[#ffd700]/20 font-medium"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <a
              href={item.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-[#ffd700] flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>فتح الملف الأصلي في Google Drive</span>
            </a>

            <div className="flex items-center gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs md:text-sm font-bold bg-[#ffd700] text-[#07160e] hover:bg-[#ffe234] rounded-xl flex items-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب تصميم غلاف مشابه</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs md:text-sm font-semibold text-gray-300 hover:text-white glass-panel rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
