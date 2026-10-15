import React from 'react';
import { VideoItem } from '../data/portfolioData';

interface ShortsCardProps {
  video: VideoItem;
}

export const ShortsCard: React.FC<ShortsCardProps> = ({ video }) => {
  return (
    <div className="glass-panel p-2 md:p-2.5 rounded-2xl flex justify-center transition-all duration-300 hover:scale-[1.01] hover:border-[#ffd700]/50 hover:shadow-2xl hover:shadow-[#ffd700]/15">
      {/* 9:16 Vertical Video Frame */}
      <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-xl overflow-hidden bg-black border border-[#ffd700]/25 shadow-2xl">
        <iframe
          className="w-full h-full rounded-xl"
          src={`${video.embedUrl}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
