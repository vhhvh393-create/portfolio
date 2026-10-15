export interface ThumbnailItem {
  id: string;
  title: string;
  category: string;
  driveId: string;
  driveUrl: string;
  fallbackUrl: string;
  views?: string;
  tools: string[];
  description: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'podcast' | 'long-video' | 'reel';
  youtubeId: string;
  embedUrl: string;
  duration?: string;
  client?: string;
  description?: string;
  tags?: string[];
}

export interface ProfileInfo {
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  bio: string;
  avatarUrl: string;
  email: string;
  whatsapp: string;
  location: string;
  availability: boolean;
  social: {
    youtube?: string;
    instagram?: string;
    behance?: string;
    telegram?: string;
    tiktok?: string;
  };
}

export const INITIAL_PROFILE: ProfileInfo = {
  name: "بيشوى أشرف",
  nameEn: "Bishoy Ashraf",
  title: "محرر فيديو ومصمم جرافيك بالذكاء الاصطناعي",
  titleEn: "Video Editor & AI Graphic Designer",
  bio: "أصنع محتوى بصري احترافي باستخدام أحدث تقنيات المونتاج والذكاء الاصطناعي. متخصص في تصميم الصور المصغرة ذات معدل النقر العالي (High CTR Thumbnails)، تحرير الفيديوهات الطويلة، البودكاست، وإنشاء الريلز والشورتس الفيروسية التي تجذب انتباه الجمهور من أول ثانية.",
  avatarUrl: "https://lh3.googleusercontent.com/d/1FIv0a049n3VCJRyfKMSZWQMhMY4JAdmE",
  email: "bishoy.editor.pro@gmail.com",
  whatsapp: "+201201699362",
  location: "القاهرة، مصر (متاح للعمل عن بُعد عالمياً)",
  availability: true,
  social: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    behance: "https://behance.net",
    telegram: "https://t.me",
  }
};

export const THUMBNAILS_DATA: ThumbnailItem[] = [
  {
    id: "thumb-1",
    title: "تصميم صورة مصغرة يوتيوب احترافية - قصة نجاح وتقنية",
    category: "يوتيوب وتكنولوجيا",
    driveId: "1NgtdqEUS_2B1e0CJyGMa5zfvTR_31HS9",
    driveUrl: "https://drive.google.com/uc?export=view&id=1NgtdqEUS_2B1e0CJyGMa5zfvTR_31HS9",
    fallbackUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    views: "+250K",
    tools: ["Photoshop", "Midjourney AI", "Color Grade"],
    description: "تصميم مصغر عالي التباين مبني على سيكولوجية جذب المشاهد مع تباين ألوان قوي وإبراز تعبيرات الوجه."
  },
  {
    id: "thumb-2",
    title: "غلاف حلقة بودكاست ومناقشات حوارية",
    category: "بودكاست ومقابلات",
    driveId: "1wHVsS8k8zI_vmGaX4C2y71XLvPCq-hVB",
    driveUrl: "https://drive.google.com/uc?export=view&id=1wHVsS8k8zI_vmGaX4C2y71XLvPCq-hVB",
    fallbackUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    views: "+180K",
    tools: ["Photoshop", "AI Generative Fill", "Typography"],
    description: "تكوين سينمائي يركز على عنوان جذاب مع إضاءة حادة تجذب نقرات الجمهور المستهدف."
  },
  {
    id: "thumb-3",
    title: "صورة مصغرة لفيديو وثائقي وسرد قصصي",
    category: "وثائقي وسرد قصصي",
    driveId: "13k6av-lLhVxmskCGeP-ZZFO8v5xndNJs",
    driveUrl: "https://drive.google.com/uc?export=view&id=13k6av-lLhVxmskCGeP-ZZFO8v5xndNJs",
    fallbackUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
    views: "+420K",
    tools: ["Photoshop", "DALL-E 3", "Camera Raw"],
    description: "تصميم مبهر بأسلوب درامي وثائقي يجبر المشاهد على التساؤل والضغط لمشاهدة الفيديو."
  },
  {
    id: "thumb-4",
    title: "تصميم إعلاني لمنتج ومحتوى ترويجي",
    category: "محتوى إعلاني وترويجي",
    driveId: "13k6av-lLhVxmskCGeP-ZZFO8v5xndNJs",
    driveUrl: "https://drive.google.com/uc?export=view&id=13k6av-lLhVxmskCGeP-ZZFO8v5xndNJs",
    fallbackUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    views: "+310K",
    tools: ["Photoshop", "3D Elements", "Visual Hooks"],
    description: "تصميم مخصص لزيادة نسبة النقر للظهور (CTR) وتحقيق أعلى معدل تحويل للمشاهدات."
  }
];

export const PODCAST_VIDEOS: VideoItem[] = [
  {
    id: "pod-1",
    title: "مونتاج حلقة بودكاست حوارية متعددة الكاميرات",
    category: "podcast",
    youtubeId: "L7UAFtUXcRA",
    embedUrl: "https://www.youtube.com/embed/L7UAFtUXcRA",
    duration: "45 دقيقة",
    client: "بودكاست حواري",
    description: "تبديل ذكي بين الكاميرات (Multi-cam Editing)، تنقية الصوت وإزالة التشويش، إضافة مؤثرات بصرية وسفلية احترافية مع شريط فصول الحلقة.",
    tags: ["Multi-Cam", "Sound Cleanup", "Color Matching"]
  },
  {
    id: "pod-2",
    title: "تحرير ومونتاج بودكاست تقني وإثارة بصرية",
    category: "podcast",
    youtubeId: "0xnTwb9vEyY",
    embedUrl: "https://www.youtube.com/embed/0xnTwb9vEyY",
    duration: "38 دقيقة",
    client: "برنامج حواري متقدم",
    description: "مونتاج سلس وسريع للإيقاع مع إدخال مقاطع B-Roll توضيحية وموشن جرافيك للشروحات والمصطلحات المعقدة.",
    tags: ["B-Roll Integration", "Motion Graphics", "Dynamic Zoom"]
  }
];

export const LONG_VIDEOS: VideoItem[] = [
  {
    id: "long-1",
    title: "تحرير ومونتاج فيديو وثائقي وسرد قصصي عالي الجودة",
    category: "long-video",
    youtubeId: "MKg7yid7ZYA",
    embedUrl: "https://www.youtube.com/embed/MKg7yid7ZYA",
    duration: "18 دقيقة",
    client: "قناة يوتيوب وثائقية",
    description: "سرد قصصي شيق (Storytelling)، هندسة صوتية متقدمة بمؤثرات سينمائية SFX، وتلوين رقمي احترافي يحافظ على انتباه المشاهد للنهاية.",
    tags: ["Storytelling", "Sound Design", "Cinematic Pacing"]
  },
  {
    id: "long-2",
    title: "مونتاج فيديو تحليلي وتثقيفي جذاب",
    category: "long-video",
    youtubeId: "V_18LhQ-XJQ",
    embedUrl: "https://www.youtube.com/embed/V_18LhQ-XJQ",
    duration: "14 دقيقة",
    client: "صانع محتوى معرفي",
    description: "إيقاع سريع لمنع الملل (High Retention Editing)، خرائط متحركة، نصوص متحركة وربط بصري سلس بين الأفكار.",
    tags: ["High Retention", "Kinetic Typography", "Sound Effects"]
  }
];

export const REELS_VIDEOS: VideoItem[] = [
  {
    id: "reel-1",
    title: "ريلز فايرال سريع وجذاب مع نصوص متحركة",
    category: "reel",
    youtubeId: "RdKZKw2jprY",
    embedUrl: "https://www.youtube.com/embed/RdKZKw2jprY",
    duration: "45 ثانية",
    client: "إنستغرام وتيك توك",
    description: "هوك بصري قوي في أول ثانيتين، كتابة تلقائية للنصوص الملونة (Dynamic Captions)، وتأثيرات صوتية تجعل المشاهد يعيد الفيديو.",
    tags: ["Hook Strategy", "Subtitles Animation", "Viral Sound"]
  },
  {
    id: "reel-2",
    title: "شورتس تحفيزي مع مونتاج سينمائي سريع",
    category: "reel",
    youtubeId: "BfiQaj75ybc",
    embedUrl: "https://www.youtube.com/embed/BfiQaj75ybc",
    duration: "58 ثانية",
    client: "يوتيوب شورتس",
    description: "تنسيق رأسي 9:16 بجودة عالية 4K، تصحيح ألوان مشبع وموسيقى حماسية مضبوطة بالمللي ثانية مع الإيقاع.",
    tags: ["9:16 Vertical", "Beat Sync", "Color Pop"]
  },
  {
    id: "reel-3",
    title: "ريل توعوي سريع مع رسوم ومؤثرات ذكاء اصطناعي",
    category: "reel",
    youtubeId: "JFf0zD-7PY8",
    embedUrl: "https://www.youtube.com/embed/JFf0zD-7PY8",
    duration: "40 ثانية",
    client: "صانع محتوى رقمي",
    description: "دمج لقطات مولدة بالذكاء الاصطناعي مع لقطات المتحدث، وسرعة في الانتقالات تضمن معدل إكمال 100%.",
    tags: ["AI B-Roll", "Fast Cuts", "Maximum Retention"]
  }
];

export const SOFTWARE_TOOLS = [
  {
    name: "Adobe Premiere Pro (Pr Pro)",
    category: "Video Editing",
    categoryAr: "مونتاج الفيديو",
    icon: "film"
  },
  {
    name: "Adobe After Effects",
    category: "Motion Graphics & VFX",
    categoryAr: "موشن جرافيك ومؤثرات",
    icon: "sparkles"
  },
  {
    name: "Google Gemini (AI)",
    category: "Generative AI",
    categoryAr: "ذكاء اصطناعي توليدي",
    icon: "cpu"
  },
  {
    name: "Sound Design",
    category: "SFX & Audio Engineering",
    categoryAr: "هندسة ومؤثرات صوتية",
    icon: "headphones"
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "استلام الفكرة والمواد الخام",
    desc: "دراسة هدف الفيديو، الجمهور المستهدف، واستلام الملفات الصوتية والمرئية بأعلى جودة."
  },
  {
    step: "02",
    title: "المونتاج الأولي والـ Storyline",
    desc: "إزالة الصمت والأخطاء، بناء السرد القصصي السلس، وضبط الإيقاع لمنع ملل المشاهد."
  },
  {
    step: "03",
    title: "المؤثرات الصوتية والموسيقى (SFX)",
    desc: "إضافة المؤثرات الصوتية الاستراتيجية وتناغم الموسيقى التصويرية مع كل لحظة حماسية."
  },
  {
    step: "04",
    title: "الموشن جرافيك وتصحيح الألوان",
    desc: "تلوين المشاهد بأسلوب سينمائي دافئ، وإضافة نصوص توضيحية ورسومات متحركة تشد العين."
  },
  {
    step: "05",
    title: "الغلاف المصغر (Thumbnail) والتسليم",
    desc: "تصميم غلاف مغناطيسي للضغطات، ثم تسليم الفيديو جاهزاً للنشر بجودة 4K مع إجراء التعديلات المطلوبة."
  }
];
