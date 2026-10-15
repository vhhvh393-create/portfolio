import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProofSection } from './components/SocialProofSection';
import { ThumbnailCard } from './components/ThumbnailCard';
import { ImageLightbox } from './components/ImageLightbox';
import { VideoCard } from './components/VideoCard';
import { ShortsCard } from './components/ShortsCard';
import { ToolsSection } from './components/ToolsSection';
import { WorkflowSection } from './components/WorkflowSection';
import { QuoteEstimator } from './components/QuoteEstimator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import {
  INITIAL_PROFILE,
  ProfileInfo,
  THUMBNAILS_DATA,
  PODCAST_VIDEOS,
  LONG_VIDEOS,
  REELS_VIDEOS,
  ThumbnailItem
} from './data/portfolioData';
import { Language, TRANSLATIONS } from './data/translations';
import { Image, Video, Smartphone, Film, Sparkles } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('bishoy_portfolio_lang') as Language;
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (e) {}
    return 'ar';
  });

  const [profile, setProfile] = useState<ProfileInfo>(() => {
    try {
      const saved = localStorage.getItem('bishoy_portfolio_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_PROFILE;
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedThumbnail, setSelectedThumbnail] = useState<ThumbnailItem | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bishoy_is_admin') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [thumbnails, setThumbnails] = useState<ThumbnailItem[]>(() => {
    try {
      const saved = localStorage.getItem('bishoy_portfolio_thumbnails');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return THUMBNAILS_DATA;
  });
  const [filterTab, setFilterTab] = useState<'all' | 'thumbnails' | 'podcasts' | 'long' | 'reels'>('all');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('bishoy_portfolio_lang', lang);
    } catch (e) {}
  }, [lang]);

  // Feature 5: JavaScript Intersection Observer Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.reveal-section');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [filterTab, lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleSaveProfile = (updated: ProfileInfo) => {
    setProfile(updated);
    try {
      localStorage.setItem('bishoy_portfolio_profile', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetProfile = () => {
    setProfile(INITIAL_PROFILE);
    try {
      localStorage.removeItem('bishoy_portfolio_profile');
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdminLogin = (pin: string) => {
    const savedPin = localStorage.getItem('bishoy_admin_pin') || '1234';
    if (pin.trim() === savedPin.trim()) {
      setIsAdmin(true);
      try {
        localStorage.setItem('bishoy_is_admin', 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('bishoy_is_admin');
    } catch (e) {}
  };

  const handleAddThumbnail = (newThumb: ThumbnailItem) => {
    const updated = [newThumb, ...thumbnails];
    setThumbnails(updated);
    try {
      localStorage.setItem('bishoy_portfolio_thumbnails', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleDeleteThumbnail = (id: string) => {
    const updated = thumbnails.filter((t) => t.id !== id);
    setThumbnails(updated);
    try {
      localStorage.setItem('bishoy_portfolio_thumbnails', JSON.stringify(updated));
    } catch (e) {}
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07160e] text-white flex flex-col selection:bg-[#ffd700] selection:text-[#07160e]">
      
      {/* 1. Sticky Glassmorphism Navbar with Quick Links */}
      <Navbar
        profile={profile}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenQuote={() => setIsQuoteOpen(true)}
        lang={lang}
        onToggleLang={toggleLanguage}
        t={t.nav}
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Hero Section with WhatsApp button and Split Cinematic Portrait */}
      <div id="hero">
        <Hero
          profile={profile}
          onExploreClick={() => scrollToSection('portfolio-section')}
          onOpenQuote={() => setIsQuoteOpen(true)}
          onContactClick={() => scrollToSection('contact')}
          onUpdateAvatar={(avatarUrl) => handleSaveProfile({ ...profile, avatarUrl })}
          lang={lang}
          t={t.hero}
          isAdmin={isAdmin}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />
      </div>

      {/* 3. Social Proof Section: Quick Stats and Featured Client "Eqtesad Plus" */}
      <SocialProofSection lang={lang} />

      {/* Main Portfolio Sections */}
      <main id="portfolio-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-24">
        
        {/* Interactive Filter Bar */}
        <div className="sticky top-20 z-30 pt-3 pb-4 bg-[#07160e]/90 backdrop-blur-md flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0b1f15] border border-[#ffd700]/25 shadow-lg max-w-full overflow-x-auto">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'all'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.filter.all}</span>
            </button>

            <button
              onClick={() => setFilterTab('thumbnails')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'thumbnails'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>{t.filter.thumbnails}</span>
            </button>

            <button
              onClick={() => setFilterTab('podcasts')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'podcasts'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{t.filter.podcasts}</span>
            </button>

            <button
              onClick={() => setFilterTab('long')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'long'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{t.filter.longVideos}</span>
            </button>

            <button
              onClick={() => setFilterTab('reels')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'reels'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t.filter.reels}</span>
            </button>
          </div>
        </div>

        {/* 1. Thumbnails Section (with reveal-section scroll animation) */}
        {(filterTab === 'all' || filterTab === 'thumbnails') && (
          <section id="thumbnails" className="reveal-section scroll-mt-28">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-white">
                <span className="w-8 h-1 bg-gold rounded-full"></span>
                {t.thumbnailsSection.title}
              </h3>
              {isAdmin && (
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-bold bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-105"
                >
                  <span>+ {lang === 'ar' ? 'إضافة صورة أو غلاف جديد' : 'Add New Thumbnail'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {thumbnails.map((item) => (
                <ThumbnailCard
                  key={item.id}
                  item={item}
                  onSelect={(thumb) => setSelectedThumbnail(thumb)}
                />
              ))}
            </div>
          </section>
        )}

        {/* 2. Podcasts Section (with reveal-section scroll animation) */}
        {(filterTab === 'all' || filterTab === 'podcasts') && (
          <section id="podcasts" className="reveal-section scroll-mt-28">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="w-8 h-1 bg-gold rounded-full"></span>
              {t.podcastsSection.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PODCAST_VIDEOS.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* 3. Long Videos Section (with reveal-section scroll animation) */}
        {(filterTab === 'all' || filterTab === 'long') && (
          <section id="long-videos" className="reveal-section scroll-mt-28">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="w-8 h-1 bg-gold rounded-full"></span>
              {t.longVideosSection.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LONG_VIDEOS.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* 4. Reels & Shorts Section (with reveal-section scroll animation) */}
        {(filterTab === 'all' || filterTab === 'reels') && (
          <section id="reels" className="reveal-section scroll-mt-28">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-white">
              <span className="w-8 h-1 bg-gold rounded-full"></span>
              {t.reelsSection.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REELS_VIDEOS.map((video) => (
                <ShortsCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* 5. Software & AI Tools Section */}
        <div className="reveal-section">
          <ToolsSection lang={lang} t={t.toolsSection} />
        </div>

        {/* 6. Production Workflow Section */}
        <div className="reveal-section">
          <WorkflowSection lang={lang} t={t.workflowSection} />
        </div>

        {/* 7. Contact Section */}
        <div className="reveal-section">
          <ContactSection
            profile={profile}
            onOpenQuote={() => setIsQuoteOpen(true)}
            lang={lang}
            t={t.contactSection}
          />
        </div>

      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onScrollToTop={scrollToTop}
        onOpenSettings={() => setIsAdminModalOpen(true)}
        lang={lang}
        t={t.footer}
        navT={t.nav}
      />

      {/* 2. Image Lightbox with Vanilla JS Escape & Fullscreen Dark Overlay */}
      <ImageLightbox
        item={selectedThumbnail}
        onClose={() => setSelectedThumbnail(null)}
        profile={profile}
        lang={lang}
      />

      {/* Quote Request Modal */}
      <QuoteEstimator
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        profile={profile}
        lang={lang}
        t={t.quoteModal}
      />

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />

      {/* Admin Panel Modal (Secure Profile Picture & Work Management) */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        profile={profile}
        onUpdateProfile={handleSaveProfile}
        thumbnails={thumbnails}
        onAddThumbnail={handleAddThumbnail}
        onDeleteThumbnail={handleDeleteThumbnail}
        lang={lang}
      />

    </div>
  );
}
