import React, { useState } from 'react';
import { Mail, MessageCircle, Copy, Check, Send, Sparkles, Phone, CheckCircle2 } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';
import { Language, Translations } from '../data/translations';

interface ContactSectionProps {
  profile: ProfileInfo;
  onOpenQuote: () => void;
  lang: Language;
  t: Translations['contactSection'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenQuote, lang, t }) => {
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formService, setFormService] = useState('ريلز وشورتس (Reels & Shorts)');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');
  const greetingText = lang === 'ar'
    ? 'السلام عليكم بيشوى، أرغب في حجز موعد لمشروع فيديو/تصميم...'
    : 'Hello Bishoy, I would like to book/discuss a video editing or design project...';
  const whatsappDirectUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greetingText)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      lang === 'ar'
        ? `رسالة من موقع البورتفوليو:\nالاسم: ${formName}\nجهة التواصل: ${formContact}\nالخدمة: ${formService}\nالرسالة: ${formMessage}`
        : `Message from Portfolio:\nName: ${formName}\nContact: ${formContact}\nService: ${formService}\nMessage: ${formMessage}`
    );
    setSubmitted(true);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="w-full max-w-5xl mx-auto px-6 py-16 scroll-mt-24">
      
      {/* Call to action card */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[#ffd700]/30 glow-gold-sm text-center relative overflow-hidden">
        
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-72 h-72 bg-[#ffd700]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#113824] border border-[#ffd700]/30 text-gold text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.tag}</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {t.heading}
        </h2>

        <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8">
          {t.description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-[#0b1f15] hover:bg-[#ffe234] font-black py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-[#ffd700]/30 flex items-center gap-2 text-base cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t.whatsappBtn}</span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="glass-panel text-white hover:text-gold hover:border-[#ffd700] font-bold py-3.5 px-7 rounded-xl transition-all flex items-center gap-2 text-base cursor-pointer"
          >
            <Mail className="w-5 h-5 text-gold" />
            <span>{t.emailBtn}</span>
          </a>

          <button
            onClick={copyEmail}
            className="glass-panel text-gray-300 hover:text-white font-medium py-3.5 px-4 rounded-xl transition-all flex items-center gap-1.5 text-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gold" />
                <span>{t.copyEmail}</span>
              </>
            )}
          </button>
        </div>

        {/* Direct WhatsApp Callout Banner */}
        <div className="mb-8 p-3 rounded-xl bg-[#07160e]/80 border border-[#ffd700]/30 inline-flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs text-gray-300">{t.directCallout}</span>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-bold text-base hover:underline flex items-center gap-1"
            dir="ltr"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>+20 120 169 9362</span>
          </a>
        </div>

        {/* Quick Contact Form inside panel */}
        <div className="mt-8 pt-8 border-t border-white/10 max-w-2xl mx-auto text-start">
          <h3 className="text-lg font-bold text-white mb-4 text-center">{t.formTitle}</h3>
          
          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#113824] border border-[#ffd700]/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#ffd700] mx-auto" />
              <h4 className="text-lg font-bold text-white">{t.successTitle}</h4>
              <p className="text-xs text-gray-300">{t.successDesc}</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#ffd700] underline mt-2 inline-block cursor-pointer"
              >
                {t.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-[#07160e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">{t.contactLabel}</label>
                  <input
                    type="text"
                    required
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    placeholder={t.contactPlaceholder}
                    className="w-full bg-[#07160e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">{t.serviceLabel}</label>
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full bg-[#07160e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffd700]"
                >
                  <option value="Reels & Shorts">Reels & Shorts (ريلز وشورتس)</option>
                  <option value="Long-form YouTube">Long-form Videos (فيديوهات يوتيوب طويلة)</option>
                  <option value="Podcasts Editing">Podcasts (مونتاج بودكاست)</option>
                  <option value="Thumbnails Design">Thumbnails (تصميم صور مصغرة)</option>
                  <option value="Monthly Retainer">Monthly Retainer (باقة شهرية متكاملة)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">{t.messageLabel}</label>
                <textarea
                  rows={3}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full bg-[#07160e] border border-white/15 rounded-xl p-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.submitBtn}</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Floating Action Button (FAB) for Instant WhatsApp Access */}
      <div className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-40 flex items-center gap-3`}>
        {/* Floating WhatsApp Button */}
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3.5 rounded-full shadow-2xl shadow-[#25D366]/40 border-2 border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 glow-gold-sm"
          aria-label="WhatsApp: 01201699362"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"></span>

          {/* WhatsApp Icon */}
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366] relative z-10" />

          {/* Text and Number details */}
          <div className="hidden sm:flex flex-col text-start relative z-10">
            <span className="text-[11px] font-bold leading-tight flex items-center gap-1.5">
              <span>{t.fabText}</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            </span>
            <span className="text-[12px] font-black tracking-wide text-white/95" dir="ltr">
              01201699362
            </span>
          </div>

          {/* Hover popup tooltip on mobile/desktop */}
          <div className="sm:hidden absolute bottom-full mb-2.5 left-0 bg-[#07160e] text-[#ffd700] text-xs font-bold py-1 px-2.5 rounded-lg border border-[#ffd700]/30 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp: 01201699362
          </div>
        </a>
      </div>

    </section>
  );
};
