import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { ThumbnailItem } from '../data/portfolioData';

interface ThumbnailCardProps {
  item: ThumbnailItem;
  onSelect: (item: ThumbnailItem) => void;
}

export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ item, onSelect }) => {
  // Use Google Drive fast CDN format first, then fallback
  const cdnUrl = `https://lh3.googleusercontent.com/d/${item.driveId}`;
  const [currentSrc, setCurrentSrc] = useState(cdnUrl);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentSrc === cdnUrl) {
      setCurrentSrc(item.driveUrl);
    } else if (!hasError) {
      setCurrentSrc(item.fallbackUrl);
      setHasError(true);
    }
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="glass-panel p-2 md:p-2.5 rounded-2xl group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-[#ffd700]/60 hover:shadow-2xl hover:shadow-[#ffd700]/15"
      title="انقر لتكبير الصورة"
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-[#ffd700]/20">
        <img
          src={currentSrc}
          alt={item.title}
          onError={handleError}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle hover zoom overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="p-3 rounded-full bg-[#07160e]/90 text-[#ffd700] border border-[#ffd700]/50 shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
            <ZoomIn className="w-6 h-6" />
          </span>
        </div>
      </div>
    </div>
  );
};
