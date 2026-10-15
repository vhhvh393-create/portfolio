import React, { useState, useRef } from 'react';
import { Sparkles, MessageCircle, ArrowDown, Eye, CheckCircle2, Film, Clock, Flame, Camera, Phone, Youtube, Instagram, Send as TelegramIcon, Lock, Shield } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';
import { Language, Translations } from '../data/translations';
import { compressImage } from '../utils/imageUtils';

interface HeroProps {
  profile: ProfileInfo;
  onExploreClick: () => void;
  onOpenQuote: () => void;
  onContactClick: () => void;
  onUpdateAvatar?: (avatarBase64: string) => void;
  lang: Language;
  t: Translations['hero'];
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onExploreClick,
  onOpenQuote,
  onContactClick,
  onUpdateAvatar,
  lang,
  t,
  isAdmin = false,
  onOpenAdmin,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');
  const whatsappMessage = lang === 'ar'
    ? 'السلام عليكم بيشوى، أريد الاستفسار عن مشروع مونتاج وتصميم...'
    : 'Hello Bishoy, I would like to inquire about a video editing / thumbnail project...';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  // Fallback to locally bundled file or Unsplash
  const localAvatar = "./bishoy-profile.jpg";
  const fallbackAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

  const [avatarSrc, setAvatarSrc] = useState(profile.avatarUrl || localAvatar);

  React.useEffect(() => {
    if (profile.avatarUrl) {
      setAvatarSrc(profile.avatarUrl);
    }
  }, [profile.avatarUrl]);

  const handleImageError = () => {
    if (avatarSrc !== localAvatar) {
      setAvatarSrc(localAvatar);
    } else {
      setAvatarSrc(fallbackAvatar);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateAvatar) {
      try {
        const compressed = await compressImage(file, 640, 0.88);
        onUpdateAvatar(compressed);
        setAvatarSrc(compressed);
      } catch (err) {
        console.error('Avatar upload error:', err);
      }
    }
  };

  const displayName = lang === 'ar' ? profile.name : profile.nameEn;
  const greeting = lang === 'ar' ? `أهلاً، أنا ${displayName}` : `Hi, I'm ${displayName}`;
  const displayBio = lang === 'ar' ? profile.bio : t.bio;

  return (
    <header className="relative w-full max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
      
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/3 end-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#10b981]/15 via-[#ffd700]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 start-10 w-[350px] h-[350px] bg-emerald-950/25 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Split Hero Banner Card */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-8 md:p-12 border border-[#ffd700]/25 shadow-2xl overflow-hidden bg-gradient-to-b from-[#0a2318]/90 via-[#07160e]/95 to-[#05100a]">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          
          {/* Column 1: Typography, Bio & CTA Buttons (7 cols on desktop) */}
          <div className="md:col-span-7 flex flex-col text-start z-10">
            
            {/* Availability status badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#113824]/80 border border-[#ffd700]/30 backdrop-blur-md self-start">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-semibold text-[#ffd700]">{t.badge}</span>
            </div>

            {/* Main Greeting / Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3 leading-tight">
              {greeting}
            </h1>

            {/* Title / Profession highlighted */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#ffd700] mb-5 tracking-wide flex items-center gap-2">
              <span>{t.title}</span>
            </h2>

            {/* Bio description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-normal">
              {displayBio}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3.5 px-7 rounded-xl transition-all duration-300 shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-105 active:scale-95 flex items-center gap-2.5 text-sm sm:text-base cursor-pointer border border-white/20"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>{lang === 'ar' ? 'تواصل معي عبر واتساب' : 'Chat on WhatsApp'}</span>
              </a>

              <button
                onClick={onOpenQuote}
                className="glass-panel text-white hover:text-[#ffd700] hover:border-[#ffd700] font-bold py-3.5 px-6 rounded-xl transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#ffd700]" />
                <span>{t.quoteBtn}</span>
              </button>

              <button
                onClick={onExploreClick}
                className="text-gray-300 hover:text-white font-medium py-3.5 px-4 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer hover:bg-white/5"
              >
                <span>{t.exploreBtn}</span>
                <ArrowDown className="w-4 h-4 text-[#ffd700] animate-bounce" />
              </button>

              {isAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] font-black py-3.5 px-5 rounded-xl transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer shadow-lg shadow-[#ffd700]/30"
                >
                  <Shield className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'لوحة تحكم الأدمن 👑' : 'Admin Studio 👑'}</span>
                </button>
              )}
            </div>

            {/* Direct WhatsApp Callout & Social Links Row */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span>{t.phoneLabel}</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#ffd700] hover:underline flex items-center gap-1 font-mono text-sm"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>01201699362</span>
                </a>
              </div>

              {/* Social icons row matching the reference style */}
              <div className="flex items-center gap-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#ffd700] text-gray-300 hover:text-[#07160e] flex items-center justify-center transition-all border border-white/10 hover:border-[#ffd700]"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#ffd700] text-gray-300 hover:text-[#07160e] flex items-center justify-center transition-all border border-white/10 hover:border-[#ffd700]"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#ffd700] text-gray-300 hover:text-[#07160e] flex items-center justify-center transition-all border border-white/10 hover:border-[#ffd700]"
                >
                  <TelegramIcon className="w-4 h-4" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#25D366] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-white/10 hover:border-[#25D366]"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Cinematic Portrait with feathered edge fade (5 cols on desktop) */}
          <div className="md:col-span-5 flex justify-center items-center relative">
            
            <div className="relative w-full max-w-[380px] lg:max-w-[440px] aspect-[4/5] flex items-center justify-center">
              
              {/* Backlight halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#113824]/60 via-[#ffd700]/15 to-transparent rounded-3xl blur-2xl pointer-events-none transform scale-95" />

              {/* Portrait Container with feathered vignette mask */}
              <div 
                className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl [mask-image:radial-gradient(circle_at_center,black_60%,transparent_98%)] sm:[mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)]"
              >
                <img
                  src={avatarSrc}
                  alt={displayName}
                  onError={handleImageError}
                  className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[0.98] transition-transform duration-700 hover:scale-105"
                />

                {/* Dark atmospheric gradient overlays merging seamlessly into dark background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07160e] via-transparent to-transparent opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#07160e]/50 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07160e]/40 via-transparent to-[#07160e]/40 opacity-50" />
              </div>

              {/* Admin Active Corner Badge */}
              {isAdmin && (
                <div className="absolute top-4 start-4 z-30 px-3 py-1 rounded-full bg-[#ffd700] text-[#07160e] font-black text-[11px] shadow-lg flex items-center gap-1.5 animate-fadeIn">
                  <span>👑</span>
                  <span>{lang === 'ar' ? 'وضع الأدمن مفعل' : 'Admin Mode Active'}</span>
                </div>
              )}

              {/* Secure Admin photo controls */}
              {isAdmin ? (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="absolute bottom-4 end-4 z-30 p-2.5 rounded-full bg-[#07160e]/95 hover:bg-[#113824] text-[#ffd700] border border-[#ffd700]/60 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center gap-1.5"
                  title={lang === 'ar' ? 'تغيير الصورة الشخصية وإدارة الأعمال' : 'Edit Photo & Works'}
                  aria-label={lang === 'ar' ? 'تغيير الصورة الشخصية' : 'Edit Photo'}
                >
                  <Camera className="w-4 h-4" />
                  <span className="text-[11px] font-bold text-gray-200 hidden sm:inline">{lang === 'ar' ? 'تعديل الصورة' : 'Edit Photo'}</span>
                </button>
              ) : (
                /* Discreet lock icon for the owner to log in without letting visitors change photo */
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="absolute bottom-4 end-4 z-20 p-2 rounded-full bg-black/40 hover:bg-[#07160e]/90 text-gray-500 hover:text-[#ffd700] border border-white/10 hover:border-[#ffd700]/40 backdrop-blur-sm transition-all cursor-pointer opacity-30 hover:opacity-100"
                  title={lang === 'ar' ? 'دخول الأدمن 🔒' : 'Admin Login 🔒'}
                  aria-label="Admin Login"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

          </div>

        </div>

      </div>

      {/* Highlight Stats Strip below hero card */}
      <div className="w-full max-w-5xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-gold font-black text-2xl md:text-3xl mb-1 font-mono">
            <span>{t.stats.views}</span>
            <Eye className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-xs text-gray-400 font-medium">{t.stats.viewsLabel}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-gold font-black text-2xl md:text-3xl mb-1 font-mono">
            <span>{t.stats.projects}</span>
            <Flame className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-xs text-gray-400 font-medium">{t.stats.projectsLabel}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-gold font-black text-2xl md:text-3xl mb-1 font-mono">
            <span>{t.stats.speed}</span>
            <Clock className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-xs text-gray-400 font-medium">{t.stats.speedLabel}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-gold font-black text-2xl md:text-3xl mb-1 font-mono">
            <span>{t.stats.satisfaction}</span>
            <CheckCircle2 className="w-4 h-4 opacity-75 text-emerald-400" />
          </div>
          <span className="text-xs text-gray-400 font-medium">{t.stats.satisfactionLabel}</span>
        </div>

      </div>

    </header>
  );
};
