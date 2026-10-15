import React, { useState } from 'react';
import { Video, Sparkles, MessageCircle, Menu, X, Globe, Lock, Shield } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';
import { Language, Translations } from '../data/translations';

interface NavbarProps {
  profile: ProfileInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuote: () => void;
  lang: Language;
  onToggleLang: () => void;
  t: Translations['nav'];
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onNavigate,
  onOpenQuote,
  lang,
  onToggleLang,
  t,
  isAdmin = false,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: t.home },
    { id: 'thumbnails', label: t.thumbnails },
    { id: 'podcasts', label: t.podcasts },
    { id: 'long-videos', label: t.longVideos },
    { id: 'reels', label: t.reels },
    { id: 'tools', label: t.tools },
    { id: 'workflow', label: t.workflow },
    { id: 'contact', label: t.contact },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const whatsappMessage = lang === 'ar'
    ? 'السلام عليكم بيشوى، أرغب في الاستفسار عن خدمة مونتاج / تصميم...'
    : 'Hello Bishoy, I would like to inquire about a video editing / thumbnail project...';

  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const displayName = lang === 'ar' ? profile.name : profile.nameEn;
  const displayTitle = lang === 'ar' ? profile.titleEn : 'Video Editor & AI Designer';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07160e]/80 backdrop-blur-md border-b border-[#ffd700]/20 shadow-lg shadow-black/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-tr from-[#113824] to-[#0b1f15] border border-[#ffd700]/40 flex items-center justify-center glow-gold-sm group-hover:border-[#ffd700] transition-colors shrink-0">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#ffd700] font-black text-xl">ب</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-wide group-hover:text-[#ffd700] transition-colors">
                  {displayName}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <span className="text-xs text-[#ffd700]/80 font-medium block">
                {displayTitle}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Actions & Language Switcher */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Admin Control Button */}
            <button
              onClick={onOpenAdmin}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isAdmin
                  ? 'border-[#ffd700] bg-[#ffd700] text-[#07160e] shadow-[#ffd700]/30 hover:bg-[#ffe234]'
                  : 'border-white/15 hover:border-[#ffd700]/50 bg-white/5 text-gray-300 hover:text-[#ffd700]'
              }`}
              title={isAdmin ? (lang === 'ar' ? 'لوحة تحكم الأدمن' : 'Admin Studio') : (lang === 'ar' ? 'دخول الأدمن 🔒' : 'Admin Login 🔒')}
            >
              {isAdmin ? <Shield className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isAdmin ? (lang === 'ar' ? 'الأدمن 👑' : 'Admin 👑') : (lang === 'ar' ? 'دخول' : 'Login')}</span>
            </button>

            {/* Bilingual toggle button */}
            <button
              onClick={onToggleLang}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[#ffd700]/30 hover:border-[#ffd700] bg-white/5 hover:bg-[#ffd700]/10 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#ffd700]" />
              <span className="font-mono tracking-wider">{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-3.5 py-1.5 text-xs font-bold text-[#ffd700] border border-[#ffd700]/40 hover:border-[#ffd700] hover:bg-[#ffd700]/10 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.quoteBtn}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-bold bg-[#ffd700] text-[#07160e] hover:bg-[#ffe234] rounded-lg transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg shadow-[#ffd700]/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.whatsappBtn}</span>
            </a>
          </div>

          {/* Mobile Actions: Language + Admin + hamburger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 ${
                isAdmin 
                  ? 'bg-[#ffd700] text-[#07160e] border-[#ffd700]' 
                  : 'bg-white/5 text-gray-300 border-white/10'
              }`}
              title="Admin"
            >
              {isAdmin ? <Shield className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onToggleLang}
              className="px-2 py-1 text-[11px] font-bold rounded-lg border border-[#ffd700]/30 bg-white/5 text-white flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-[#ffd700]" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-2.5 py-1 text-[11px] font-bold text-[#ffd700] border border-[#ffd700]/40 rounded-lg flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{t.quoteBtn}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#ffd700]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07160e]/95 backdrop-blur-xl border-b border-[#ffd700]/20 px-6 py-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-start px-3 py-2 text-sm font-semibold rounded-lg bg-white/5 hover:bg-[#ffd700]/10 hover:text-[#ffd700] text-gray-200 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-sm font-bold bg-[#ffd700] text-[#07160e] rounded-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.whatsappBtn} (01201699362)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
