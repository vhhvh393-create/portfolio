import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/portfolioData';
import { Language, Translations } from '../data/translations';

interface WorkflowSectionProps {
  lang: Language;
  t: Translations['workflowSection'];
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ lang, t }) => {
  const stepsEn = [
    {
      step: "01",
      title: "Brief & Raw Footage Ingestion",
      desc: "Understanding the project goals, target audience, and receiving raw audio/video files at maximum quality."
    },
    {
      step: "02",
      title: "Assembly & Storyline Pacing",
      desc: "Trimming fluff, dynamic cut editing, crafting a compelling narrative arc, and maintaining high viewer retention."
    },
    {
      step: "03",
      title: "Sound Design & Music Scoring (SFX)",
      desc: "Precision sound effects, risers, whooshes, ambient layers, and beat-synced background music."
    },
    {
      step: "04",
      title: "Motion Graphics & Color Grading",
      desc: "Warm cinematic color grading, kinetic typography, lower-thirds, and visual hooks that stop scrolling."
    },
    {
      step: "05",
      title: "High-CTR Thumbnail & 4K Master",
      desc: "High click-through thumbnail design and final 4K export with revisions until 100% satisfaction."
    }
  ];

  const currentSteps = lang === 'ar' ? WORKFLOW_STEPS : stepsEn;

  return (
    <section id="workflow" className="w-full max-w-6xl mx-auto px-6 py-12 scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center justify-center gap-3">
          <span className="w-8 h-1 bg-gold rounded-full"></span>
          {t.title}
          <span className="w-8 h-1 bg-gold rounded-full"></span>
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {currentSteps.map((step, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative group hover:border-[#ffd700]/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-gold font-mono tracking-wider">
                  {step.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#ffd700]/50 group-hover:bg-[#ffd700] transition-colors"></span>
              </div>

              <h4 className="font-bold text-white text-base mb-2 leading-snug">
                {step.title}
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#ffd700]/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.approvedBadge}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
