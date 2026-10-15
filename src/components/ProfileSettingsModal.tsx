import React, { useState } from 'react';
import { X, Save, RotateCcw, User, Mail, Phone, MapPin } from 'lucide-react';
import { ProfileInfo, INITIAL_PROFILE } from '../data/portfolioData';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
  onSave: (updated: ProfileInfo) => void;
  onReset: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ProfileInfo>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#07160e] border border-[#ffd700]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#ffd700]/20 bg-[#0b1f15]">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <User className="w-4 h-4 text-gold" />
            <span>تخصيص بيانات التواصل والمعلومات</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-right overflow-y-auto max-h-[75vh]">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">الاسم:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">المسمى الوظيفي (عربي):</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">المسمى الوظيفي (إنجليزي):</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">البريد الإلكتروني:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">رقم الواتساب (مع كود الدولة):</label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+201000000000"
              className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">النبذة التعريفية (Bio):</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-[#0b1f15] border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ffd700]"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onReset();
                setFormData(INITIAL_PROFILE);
              }}
              className="px-3 py-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة الإعدادات الافتراضية</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white glass-panel rounded-xl"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-gold text-[#0b1f15] hover:bg-[#ffe234] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>حفظ البيانات</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
