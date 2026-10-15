import React, { useState, useRef } from 'react';
import { 
  X, Lock, Unlock, Shield, Camera, Upload, Link as LinkIcon, 
  Plus, Trash2, CheckCircle2, RotateCcw, Save, KeyRound, 
  Image as ImageIcon, Sparkles, User
} from 'lucide-react';
import { ProfileInfo, ThumbnailItem, INITIAL_PROFILE } from '../data/portfolioData';
import { Language } from '../data/translations';
import { compressImage } from '../utils/imageUtils';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  profile: ProfileInfo;
  onUpdateProfile: (updated: ProfileInfo) => void;
  thumbnails: ThumbnailItem[];
  onAddThumbnail: (newThumb: ThumbnailItem) => void;
  onDeleteThumbnail: (id: string) => void;
  lang: Language;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  profile,
  onUpdateProfile,
  thumbnails,
  onAddThumbnail,
  onDeleteThumbnail,
  lang,
}) => {
  if (!isOpen) return null;
  const isRtl = lang === 'ar';

  // Auth State
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab inside Admin
  const [activeTab, setActiveTab] = useState<'avatar' | 'add-work' | 'profile' | 'security'>('avatar');

  // Avatar Management
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl);
  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add Thumbnail form
  const [newThumbTitle, setNewThumbTitle] = useState('');
  const [newThumbCategory, setNewThumbCategory] = useState(isRtl ? 'يوتيوب وتكنولوجيا' : 'YouTube & Tech');
  const [newThumbImageUrl, setNewThumbImageUrl] = useState('');
  const [newThumbViews, setNewThumbViews] = useState('+350K');
  const [newThumbTools, setNewThumbTools] = useState('Photoshop, Midjourney AI');
  const [newThumbDesc, setNewThumbDesc] = useState('');
  const thumbFileRef = useRef<HTMLInputElement>(null);

  // Profile data edit
  const [profileForm, setProfileForm] = useState<ProfileInfo>({ ...profile });

  // Security - Change PIN
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  // Success feedback toast
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(pinInput);
    if (success) {
      setAuthError(false);
      setPinInput('');
      showToast(isRtl ? 'تم تسجيل الدخول كأدمن بنجاح! 👑' : 'Admin Login Successful! 👑');
    } else {
      setAuthError(true);
    }
  };

  // Avatar File Upload handler with automatic compression
  const handleAvatarFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 640, 0.88);
        setAvatarPreview(compressedBase64);
        setAvatarUrlInput('');
      } catch (err) {
        console.error('Image compression error:', err);
      }
    }
  };

  const handleSaveAvatar = () => {
    const finalUrl = avatarUrlInput.trim() || avatarPreview;
    if (finalUrl) {
      const updated = { ...profile, avatarUrl: finalUrl };
      onUpdateProfile(updated);
      showToast(isRtl ? 'تم تحديث الصورة الشخصية بنجاح!' : 'Profile picture updated successfully!');
    }
  };

  const handleResetAvatar = () => {
    const original = INITIAL_PROFILE.avatarUrl;
    setAvatarPreview(original);
    setAvatarUrlInput('');
    const updated = { ...profile, avatarUrl: original };
    onUpdateProfile(updated);
    showToast(isRtl ? 'تمت استعادة الصورة الأصلية' : 'Restored original portrait');
  };

  // Add Thumbnail File Upload with automatic compression
  const handleThumbFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 1280, 0.85);
        setNewThumbImageUrl(compressedBase64);
      } catch (err) {
        console.error('Thumbnail compression error:', err);
      }
    }
  };

  const handleCreateThumbnail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThumbTitle || !newThumbImageUrl) {
      alert(isRtl ? 'يرجى كتابة عنوان واختيار صورة للعمل المصغر' : 'Please provide a title and an image');
      return;
    }

    const item: ThumbnailItem = {
      id: `thumb-${Date.now()}`,
      title: newThumbTitle,
      category: newThumbCategory,
      driveId: '',
      driveUrl: newThumbImageUrl,
      fallbackUrl: newThumbImageUrl,
      views: newThumbViews || '+100K',
      tools: newThumbTools.split(',').map(s => s.trim()).filter(Boolean),
      description: newThumbDesc || (isRtl ? 'تصميم مصغر عالي النقر' : 'High CTR Thumbnail design')
    };

    onAddThumbnail(item);
    setNewThumbTitle('');
    setNewThumbImageUrl('');
    setNewThumbDesc('');
    showToast(isRtl ? 'تمت إضافة الصورة المصغرة إلى المعرض بنجاح!' : 'New thumbnail added to portfolio!');
  };

  const handleSaveProfileForm = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    showToast(isRtl ? 'تم حفظ التعديلات في البيانات!' : 'Profile data updated successfully!');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      localStorage.setItem('bishoy_admin_pin', newPin.trim());
      setPinSuccess(true);
      setNewPin('');
      setTimeout(() => setPinSuccess(false), 3000);
      showToast(isRtl ? 'تم تغيير الرقم السري للأدمن بنجاح!' : 'Admin PIN changed successfully!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#07160e] border border-[#ffd700]/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#ffd700]/20 bg-[#0b1f15]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ffd700]/15 border border-[#ffd700]/40 flex items-center justify-center text-[#ffd700]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span>{isRtl ? 'لوحة تحكم الأدمن' : 'Admin Control Studio'}</span>
                {isAdmin && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
                    {isRtl ? 'نشط 👑' : 'AUTHORIZED 👑'}
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-gray-400">
                {isRtl ? 'تغيير الصورة الشخصية وإضافة صور وأعمال جديدة للموقع' : 'Secure profile picture & portfolio management'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-xl transition-colors flex items-center gap-1 cursor-pointer border border-rose-500/30"
                title={isRtl ? 'تسجيل الخروج من الأدمن' : 'Logout from Admin'}
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isRtl ? 'قفل الأدمن' : 'Lock'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Toast Banner */}
        {successMessage && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-4 py-2.5 text-xs text-emerald-300 font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Content Body */}
        {!isAdmin ? (
          /* STEP 1: AUTHENTICATION LOCK SCREEN */
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center text-[#ffd700]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="max-w-md space-y-2">
              <h4 className="text-xl font-bold text-white">
                {isRtl ? 'هذه المنطقة مخصصة للأدمن فقط' : 'Admin Authentication Required'}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {isRtl 
                  ? 'لحماية موقعك من قيام أي زائر بتغيير صورتك أو بياناتك، يرجى إدخال الرقم السري الخاص بك للمتابعة.'
                  : 'To prevent unauthorized changes to your profile picture and works, please enter your admin security PIN.'}
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full max-w-sm space-y-4">
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  required
                  placeholder={isRtl ? 'أدخل الرقم السري (الافتراضي: 1234)' : 'Enter PIN (Default: 1234)'}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  className={`w-full bg-[#0b1f15] border rounded-2xl px-4 py-3 text-center text-sm font-mono tracking-widest text-white focus:outline-none transition-colors ${
                    authError 
                      ? 'border-rose-500 ring-1 ring-rose-500' 
                      : 'border-[#ffd700]/40 focus:border-[#ffd700]'
                  }`}
                />
              </div>

              {authError && (
                <p className="text-xs text-rose-400 font-medium">
                  {isRtl ? 'الرقم السري غير صحيح. يرجى المحاولة مرة أخرى.' : 'Incorrect PIN. Please try again.'}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-2xl font-bold text-sm bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] transition-all shadow-lg shadow-[#ffd700]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>{isRtl ? 'دخول لوحة التحكم' : 'Authenticate & Unlock'}</span>
              </button>

              <div className="text-[11px] text-gray-500 pt-2">
                <span>{isRtl ? 'الرقم السري الافتراضي لأول مرة: ' : 'Default initial PIN: '}</span>
                <span className="font-mono text-gray-400 font-bold">1234</span>
                <span className="block mt-1 text-gray-400">
                  {isRtl ? '(يمكنك تغييره من داخل اللوحة في أي وقت)' : '(You can change it anytime in settings)'}
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* STEP 2: ADMIN LOGGED IN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Tabs */}
            <div className="px-6 pt-3 border-b border-[#ffd700]/20 flex items-center gap-1 overflow-x-auto bg-[#07160e]">
              <button
                onClick={() => setActiveTab('avatar')}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'avatar'
                    ? 'bg-[#0b1f15] text-[#ffd700] border-t-2 border-[#ffd700]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{isRtl ? 'الصورة الشخصية' : 'Profile Picture'}</span>
              </button>

              <button
                onClick={() => setActiveTab('add-work')}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'add-work'
                    ? 'bg-[#0b1f15] text-[#ffd700] border-t-2 border-[#ffd700]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isRtl ? 'إضافة صور وأعمال جديدة' : 'Add New Work / Photos'}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#0b1f15] text-[#ffd700] border-t-2 border-[#ffd700]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{isRtl ? 'بيانات التواصل' : 'Profile Info'}</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-[#0b1f15] text-[#ffd700] border-t-2 border-[#ffd700]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{isRtl ? 'تغيير الرقم السري' : 'Change PIN'}</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-start">
              
              {/* TAB 1: AVATAR MANAGEMENT */}
              {activeTab === 'avatar' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#0b1f15] border border-[#ffd700]/20">
                    <div className="relative w-32 h-40 rounded-2xl overflow-hidden border-2 border-[#ffd700]/40 shadow-xl bg-black shrink-0">
                      <img
                        src={avatarPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setAvatarPreview('./bishoy-profile.jpg')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 inset-x-0 text-center text-[10px] font-bold text-gray-200">
                        {isRtl ? 'معاينة مباشرة' : 'Live Preview'}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 text-start">
                      <h4 className="font-bold text-white text-sm">
                        {isRtl ? 'تعديل الصورة الشخصية لبورتفوليو بيشوى' : 'Update Hero Profile Portrait'}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {isRtl 
                          ? 'يمكنك رفع صورة جديدة من جهازك مباشرة (هاتف أو كمبيوتر)، أو وضع رابط صورة خارجي.'
                          : 'Upload an image directly from your device or paste a public web link.'}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 text-xs font-bold bg-[#ffd700] text-[#07160e] hover:bg-[#ffe234] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                        >
                          <Upload className="w-4 h-4" />
                          <span>{isRtl ? 'رفع صورة من جهازك' : 'Upload from Device'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleResetAvatar}
                          className="px-3.5 py-2 text-xs font-medium text-gray-300 hover:text-white glass-panel rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{isRtl ? 'استعادة الصورة الأصلية' : 'Restore Default'}</span>
                        </button>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarFileUpload}
                      />
                    </div>
                  </div>

                  {/* Or image URL */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-300">
                      {isRtl ? 'أو ضع رابط مباشر للصورة (URL):' : 'Or enter Direct Image URL:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="w-4 h-4 text-gray-500 absolute top-3 start-3" />
                        <input
                          type="url"
                          placeholder="https://example.com/my-photo.jpg"
                          value={avatarUrlInput}
                          onChange={(e) => {
                            setAvatarUrlInput(e.target.value);
                            if (e.target.value.trim()) setAvatarPreview(e.target.value.trim());
                          }}
                          className="w-full bg-[#0b1f15] border border-white/20 rounded-xl py-2.5 ps-9 pe-3 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveAvatar}
                      className="px-6 py-2.5 text-xs font-bold bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] rounded-xl flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isRtl ? 'حفظ وتثبيت الصورة في الموقع' : 'Save & Publish Portrait'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ADD NEW WORK & PHOTOS (THUMBNAILS) */}
              {activeTab === 'add-work' && (
                <div className="space-y-6">
                  {/* Add New Thumbnail Box */}
                  <form onSubmit={handleCreateThumbnail} className="p-4 sm:p-5 rounded-2xl bg-[#0b1f15] border border-[#ffd700]/25 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4 text-[#ffd700]" />
                        <span>{isRtl ? 'إضافة صورة مصغرة / عمل جديد للمعرض' : 'Add New Portfolio Thumbnail'}</span>
                      </h4>
                      <span className="text-[11px] text-[#ffd700] font-mono">
                        {thumbnails.length} {isRtl ? 'أعمال حالية' : 'current items'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          {isRtl ? 'عنوان العمل أو الفيديو:' : 'Project Title:'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={isRtl ? 'مثال: تصميم غلاف بودكاست تكنولوجي' : 'e.g., Tech Podcast Cover Design'}
                          value={newThumbTitle}
                          onChange={(e) => setNewThumbTitle(e.target.value)}
                          className="w-full bg-[#07160e] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          {isRtl ? 'التصنيف / القسم:' : 'Category:'}
                        </label>
                        <select
                          value={newThumbCategory}
                          onChange={(e) => setNewThumbCategory(e.target.value)}
                          className="w-full bg-[#07160e] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                        >
                          <option value={isRtl ? 'يوتيوب وتكنولوجيا' : 'YouTube & Tech'}>{isRtl ? 'يوتيوب وتكنولوجيا' : 'YouTube & Tech'}</option>
                          <option value={isRtl ? 'بودكاست ومقابلات' : 'Podcasts'}>{isRtl ? 'بودكاست ومقابلات' : 'Podcasts'}</option>
                          <option value={isRtl ? 'وثائقي وسرد قصصي' : 'Documentary'}>{isRtl ? 'وثائقي وسرد قصصي' : 'Documentary'}</option>
                          <option value={isRtl ? 'محتوى إعلاني وترويجي' : 'Commercial Ads'}>{isRtl ? 'محتوى إعلاني وترويجي' : 'Commercial Ads'}</option>
                          <option value={isRtl ? 'تصميم ذكاء اصطناعي' : 'AI Generative'}>{isRtl ? 'تصميم ذكاء اصطناعي' : 'AI Generative'}</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Source: upload or URL */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-300">
                        {isRtl ? 'صورة الغلاف (رفع من جهازك أو رابط):' : 'Thumbnail Image (Upload or URL):'}
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => thumbFileRef.current?.click()}
                          className="px-4 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/15"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#ffd700]" />
                          <span>{isRtl ? 'اختر صورة من الجهاز' : 'Pick from Device'}</span>
                        </button>
                        <input
                          ref={thumbFileRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleThumbFileUpload}
                        />

                        <input
                          type="text"
                          placeholder={isRtl ? 'أو الصق رابط الصورة هنا...' : 'Or paste image URL...'}
                          value={newThumbImageUrl}
                          onChange={(e) => setNewThumbImageUrl(e.target.value)}
                          className="flex-1 bg-[#07160e] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                        />
                      </div>

                      {newThumbImageUrl && (
                        <div className="mt-2 w-full max-w-xs aspect-video rounded-xl overflow-hidden border border-[#ffd700]/30 shadow-md">
                          <img src={newThumbImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          {isRtl ? 'المشاهدات (اختياري):' : 'Views / Impact:'}
                        </label>
                        <input
                          type="text"
                          placeholder="+250K"
                          value={newThumbViews}
                          onChange={(e) => setNewThumbViews(e.target.value)}
                          className="w-full bg-[#07160e] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          {isRtl ? 'الأدوات المستخدمة:' : 'Tools Used:'}
                        </label>
                        <input
                          type="text"
                          placeholder="Photoshop, Midjourney AI"
                          value={newThumbTools}
                          onChange={(e) => setNewThumbTools(e.target.value)}
                          className="w-full bg-[#07160e] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        {isRtl ? 'وصف مختصر للتصميم:' : 'Short Description:'}
                      </label>
                      <input
                        type="text"
                        placeholder={isRtl ? 'تصميم مصغر عالي التباين مبني على سيكولوجية جذب المشاهد...' : 'High contrast thumbnail engineered for maximum CTR...'}
                        value={newThumbDesc}
                        onChange={(e) => setNewThumbDesc(e.target.value)}
                        className="w-full bg-[#07160e] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 text-xs font-bold bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isRtl ? 'إضافة هذا العمل إلى الموقع الآن' : 'Publish This Thumbnail'}</span>
                    </button>
                  </form>

                  {/* Existing Thumbnails Management List */}
                  <div className="space-y-3">
                    <h5 className="font-bold text-xs text-gray-300">
                      {isRtl ? 'الأعمال المعروضة حالياً في الموقع:' : 'Currently Displayed Thumbnails:'}
                    </h5>

                    <div className="space-y-2">
                      {thumbnails.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-[#0b1f15] border border-white/10 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 rounded-lg overflow-hidden bg-black shrink-0 border border-white/15">
                              <img
                                src={item.fallbackUrl || item.driveUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white line-clamp-1">{item.title}</div>
                              <div className="text-[10px] text-gray-400">
                                {item.category} · <span className="text-[#ffd700] font-mono">{item.views}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => onDeleteThumbnail(item.id)}
                            className="p-1.5 text-gray-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                            title={isRtl ? 'حذف هذا العمل' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PROFILE INFORMATION */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfileForm} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        {isRtl ? 'الاسم:' : 'Full Name:'}
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        {isRtl ? 'رقم الواتساب:' : 'WhatsApp Number:'}
                      </label>
                      <input
                        type="text"
                        value={profileForm.whatsapp}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                        className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {isRtl ? 'المسمى الوظيفي:' : 'Job Title:'}
                    </label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {isRtl ? 'البريد الإلكتروني:' : 'Email Address:'}
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-[#0b1f15] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      {isRtl ? 'النبذة التعريفية (Bio):' : 'Bio:'}
                    </label>
                    <textarea
                      rows={3}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full bg-[#0b1f15] border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#ffd700] resize-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-bold bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isRtl ? 'حفظ البيانات' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: SECURITY & PIN */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#0b1f15] border border-[#ffd700]/20 space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <KeyRound className="w-4 h-4 text-[#ffd700]" />
                      <span>{isRtl ? 'تغيير الرقم السري لحساب الأدمن' : 'Change Admin Security PIN'}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {isRtl 
                        ? 'احرص على تعيين رقم سري تحفظه جيداً حتى لا يتمكن أي شخص آخر من تعديل صورك أو أعمالك.'
                        : 'Choose a memorable PIN to keep your portfolio protected from unauthorized changes.'}
                    </p>

                    <form onSubmit={handleChangePin} className="space-y-3 pt-2">
                      <div className="max-w-xs">
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          {isRtl ? 'الرقم السري الجديد (4 أرقام أو أكثر):' : 'New PIN (4+ digits):'}
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="مثال: 9876"
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          className="w-full bg-[#07160e] border border-white/20 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#ffd700]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-bold bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'تحديث الرقم السري' : 'Update PIN'}</span>
                      </button>

                      {pinSuccess && (
                        <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isRtl ? 'تم تغيير الرقم السري بنجاح!' : 'PIN successfully updated!'}</span>
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
