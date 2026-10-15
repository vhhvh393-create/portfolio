import React, { useEffect } from 'react';
import { X, MessageCircle, ExternalLink, Download } from 'lucide-react';
import { ThumbnailItem, ProfileInfo } from '../data/portfolioData';
import { Language } from '../data/translations';

interface ImageLightboxProps {
  item: ThumbnailItem | null;
  onClose: () => void;
  profile: ProfileInfo;
  lang: Language;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ item, onClose, profile, lang }) => {
  // Vanilla JS keyboard event handling and body scroll locking
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  const imgSrc = `https://lh3.googleusercontent.com/d/${item.driveId}`;
  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');
  const isAr = lang === 'ar';

  const orderMsg = isAr
    ? `السلام عليكم بيشوى، يعجبني هذا النموذج من الصور المصغرة "${item.title}"، أرغب في تصميم مماثل لقناتي.`
    : `Hello Bishoy, I really like this thumbnail sample "${item.title}", I want a similar design for my channel.`;

  const whatsappInquiryUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(orderMsg)}`;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Bar with Title and Close (X) */}
      <div 
        className="w-full max-w-6xl flex items-center justify-between z-10 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] animate-pulse"></span>
          <span className="text-sm sm:text-base font-bold text-white line-clamp-1">{item.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={item.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5"
            title="Google Drive"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'فتح الملف الأصلي' : 'Open in Drive'}</span>
          </a>

          {/* Large Close Button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-[#ffd700] text-white hover:text-[#07160e] transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            title="إغلاق (Esc)"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Fullscreen Image Area */}
      <div 
        className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgSrc}
          alt={item.title}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = item.fallbackUrl;
          }}
          className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl border border-white/15 transition-transform duration-300 select-none"
        />
      </div>

      {/* Bottom Action Footer Bar */}
      <div 
        className="w-full max-w-2xl py-3 px-6 rounded-2xl bg-[#0b1f15]/90 border border-[#ffd700]/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-start">
          <span className="text-xs text-gray-300 block">{isAr ? 'تريد تصميماً احترافياً مشابهاً؟' : 'Need a similar high-CTR thumbnail?'}</span>
          <span className="text-sm font-extrabold text-[#ffd700]">{isAr ? 'بيشوى أشرف · تسليم سريع 24-48h' : 'Bishoy Ashraf · 24-48h Turnaround'}</span>
        </div>

        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-2.5 px-5 rounded-xl transition-all shadow-lg hover:shadow-[#25D366]/40 hover:scale-105 active:scale-95 flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
          <span>{isAr ? 'طلب غلاف عبر واتساب' : 'Order on WhatsApp'}</span>
        </a>
      </div>

    </div>
  );
};
