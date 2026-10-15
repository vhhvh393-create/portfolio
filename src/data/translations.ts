export type Language = 'ar' | 'en';

export interface Translations {
  nav: {
    home: string;
    thumbnails: string;
    podcasts: string;
    longVideos: string;
    reels: string;
    tools: string;
    workflow: string;
    contact: string;
    quoteBtn: string;
    whatsappBtn: string;
  };
  hero: {
    badge: string;
    name: string;
    title: string;
    bio: string;
    directWhatsApp: string;
    phoneLabel: string;
    quoteBtn: string;
    exploreBtn: string;
    changePhotoBtn: string;
    stats: {
      views: string;
      viewsLabel: string;
      projects: string;
      projectsLabel: string;
      speed: string;
      speedLabel: string;
      satisfaction: string;
      satisfactionLabel: string;
    };
  };
  filter: {
    all: string;
    thumbnails: string;
    podcasts: string;
    longVideos: string;
    reels: string;
  };
  thumbnailsSection: {
    title: string;
    subtitle: string;
    badge: string;
    clickToZoom: string;
    highCtr: string;
    toolsUsed: string;
    openInDrive: string;
    orderSimilar: string;
    close: string;
  };
  podcastsSection: {
    title: string;
    subtitle: string;
    badge: string;
  };
  longVideosSection: {
    title: string;
    subtitle: string;
    badge: string;
  };
  reelsSection: {
    title: string;
    subtitle: string;
    badge: string;
    viralBadge: string;
  };
  toolsSection: {
    title: string;
    subtitle: string;
    readyBadge: string;
  };
  workflowSection: {
    title: string;
    subtitle: string;
    approvedBadge: string;
  };
  quoteModal: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    rushDelivery: string;
    rushDesc: string;
    standardDelivery: string;
    standardDesc: string;
    extrasTitle: string;
    captionsOption: string;
    thumbnailsOption: string;
    notesPlaceholder: string;
    turnaroundLabel: string;
    freeConsultation: string;
    cancel: string;
    sendWhatsApp: string;
  };
  contactSection: {
    tag: string;
    heading: string;
    description: string;
    whatsappBtn: string;
    emailBtn: string;
    copyEmail: string;
    copied: string;
    directCallout: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    serviceLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
    fabText: string;
  };
  footer: {
    description: string;
    rights: string;
    backToTop: string;
    customize: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      thumbnails: 'الصور المصغرة',
      podcasts: 'البودكاست',
      longVideos: 'الفيديوهات الطويلة',
      reels: 'الريلز والشورتس',
      tools: 'المهارات والبرامج',
      workflow: 'طريقة العمل',
      contact: 'تواصل معي',
      quoteBtn: 'طلب عرض سعر',
      whatsappBtn: 'واتساب مباشر',
    },
    hero: {
      badge: 'متاح لاستقبال مشاريع المونتاج والتصميم الآن',
      name: 'بيشوى أشرف',
      title: 'Video Editor & AI Graphic Designer',
      bio: 'أصنع محتوى بصري احترافي باستخدام أحدث تقنيات المونتاج والذكاء الاصطناعي. متخصص في تصميم الصور المصغرة ذات معدل النقر العالي (High CTR Thumbnails)، تحرير الفيديوهات الطويلة، البودكاست، وإنشاء الريلز والشورتس الفيروسية التي تجذب انتباه الجمهور من أول ثانية.',
      directWhatsApp: 'تواصل عبر واتساب',
      phoneLabel: 'الواتساب المباشر:',
      quoteBtn: 'طلب عرض سعر لمشروعك',
      exploreBtn: 'تصفح الأعمال',
      changePhotoBtn: 'تغيير أو اختيار صورتك الشخصية 📷',
      stats: {
        views: '+5M',
        viewsLabel: 'مشاهدات محققة للمحتوى',
        projects: '+150',
        projectsLabel: 'فيديو وغلاف تم إنجازه',
        speed: '48h',
        speedLabel: 'متوسط سرعة التسليم',
        satisfaction: '100%',
        satisfactionLabel: 'دقة واحترافية بالمواعيد',
      },
    },
    filter: {
      all: 'جميع الأعمال',
      thumbnails: 'الصور المصغرة',
      podcasts: 'البودكاست',
      longVideos: 'الفيديوهات الطويلة',
      reels: 'الريلز والشورتس',
    },
    thumbnailsSection: {
      title: 'الصور المصغرة (Thumbnails)',
      subtitle: 'أغلفة مصممة بسيكولوجية الجذب ورفع نسبة النقر للظهور (CTR) عبر الفوتوشوب والذكاء الاصطناعي',
      badge: '4 نماذج مختارة · انقر للتكبير',
      clickToZoom: 'انقر للتكبير والتفاصيل',
      highCtr: 'High CTR',
      toolsUsed: 'الأدوات والتقنيات:',
      openInDrive: 'فتح الملف الأصلي في Google Drive',
      orderSimilar: 'طلب تصميم غلاف مشابه',
      close: 'إغلاق',
    },
    podcastsSection: {
      title: 'البودكاست',
      subtitle: 'مونتاج متعدد الكاميرات، إزالة الفواصل والتردد، هندسة صوتية نقية وإضافة B-Roll توضيحي',
      badge: 'حلقات بودكاست كاملة',
    },
    longVideosSection: {
      title: 'الفيديوهات الطويلة',
      subtitle: 'سرد قصصي عالي الجودة، مونتاج مشوق، خرائط ورسوم توضيحية ومؤثرات صوتية سينمائية',
      badge: 'محتوى يوتيوب وثائقي ومعرفي',
    },
    reelsSection: {
      title: 'الريلز والشورتس',
      subtitle: 'تنسيق رأسي 9:16 مصمم للانتشار الفيروسي (Viral)، مع كابشنز ملونة وانتقالات ديناميكية',
      badge: '9:16 Vertical Content',
      viralBadge: 'محتوى رأسي فيروسي',
    },
    toolsSection: {
      title: 'البرامج والأدوات الاحترافية',
      subtitle: 'أستخدم أقوى برامج صناعة الفيديو وتقنيات الذكاء الاصطناعي التوليدي لضمان خروج كل ثانية بأعلى دقة ممكنة.',
      readyBadge: 'جاهز للاستخدام الفوري في المشاريع',
    },
    workflowSection: {
      title: 'خطة وسير العمل (Workflow)',
      subtitle: 'خطوات واضحة ومنظمة تبدأ من الفكرة وتصل إلى ملف جاهز للنشر وتحقيق أعلى أداء.',
      approvedBadge: 'مرحلة معتمدة',
    },
    quoteModal: {
      title: 'طلب عرض سعر وتفاصيل مشروعك',
      subtitle: 'حدد نوع وحجم مشروعك واحصل على استشارة وتنسيق مباشر',
      step1: '1. اختر نوع المشروع المطلوب:',
      step2: '2. العدد التقريبي (فيديوهات / صور مصغرة):',
      step3: '3. أولوية وسرعة التسليم:',
      step4: '4. ملاحظات أو روابط لمحتوى مشابه (اختياري):',
      rushDelivery: 'مستعجل ⚡ Express',
      rushDesc: 'أولوية إنتاج 24-48h',
      standardDelivery: 'تسليم قياسي منتظم',
      standardDesc: 'وفق الجدول المعتاد',
      extrasTitle: 'إضافات مقترحة:',
      captionsOption: 'إضافة نصوص كابشنز متحركة وتفريغ صوتي ديناميكي (Dynamic Captions)',
      thumbnailsOption: 'تصميم صورة مصغرة (CTR Thumbnail) عالية الدقة مع كل فيديو',
      notesPlaceholder: 'مثال: قناة تقنية، أسلوب مشابه لـ أليكس هورموزي، أو رابط فيديو مرجعي...',
      turnaroundLabel: 'وقت التسليم المتوقع:',
      freeConsultation: 'استشارة مجانية',
      cancel: 'إلغاء',
      sendWhatsApp: 'إرسال الطلب مباشرة عبر واتساب',
    },
    contactSection: {
      tag: 'دعنا نصنع محتوى استثنائياً معاً',
      heading: 'جاهز للعمل على مشروعك القادم؟',
      description: 'سواء كنت تبحث عن مونتاج بودكاست احترافي، فيديوهات يوتيوب ترفع المشاهدات، أو ريلز تزيد متابعيك، أنا هنا لتحويل رؤيتك إلى واقع بصري مبهر.',
      whatsappBtn: 'محادثة واتساب: 01201699362',
      emailBtn: 'راسلني عبر الإيميل',
      copyEmail: 'نسخ الإيميل',
      copied: 'تم نسخ الإيميل!',
      directCallout: 'للتواصل والاتفاق الفوري عبر واتساب مباشرة:',
      formTitle: 'أو أرسل تفاصيل مشروعك مباشرة:',
      nameLabel: 'اسمك أو اسم القناة/الشركة:',
      namePlaceholder: 'بيشوى عاطف...',
      contactLabel: 'رقم الواتساب أو الإيميل:',
      contactPlaceholder: 'رقم الهاتف أو البريد...',
      serviceLabel: 'الخدمة المطلوبة:',
      messageLabel: 'نبذة عن المحتوى أو الروابط المرجعية:',
      messagePlaceholder: 'أود مونتاج 4 فيديوهات شهرياً بأسلوب وثائقي مع مؤثرات صوتية...',
      submitBtn: 'إرسال وتنسيق التفاصيل مباشرة',
      successTitle: 'تم استلام طلبك بنجاح!',
      successDesc: 'تم فتح المحادثة عبر واتساب لمتابعة التفاصيل فوراً.',
      sendAnother: 'إرسال رسالة أخرى',
      fabText: 'تواصل مع بيشوى',
    },
    footer: {
      description: 'مونتاج احترافي، تصحيح ألوان، هندسة صوتية وتصميم أغلفة عالية النقرات لتنمية حضورك وصناعة تأثير حقيقي.',
      rights: 'جميع الحقوق محفوظة',
      backToTop: 'العودة للأعلى',
      customize: 'تخصيص البيانات',
    },
  },
  en: {
    nav: {
      home: 'Home',
      thumbnails: 'Thumbnails',
      podcasts: 'Podcasts',
      longVideos: 'Long Videos',
      reels: 'Reels & Shorts',
      tools: 'Skills & Tools',
      workflow: 'Workflow',
      contact: 'Contact Me',
      quoteBtn: 'Get a Quote',
      whatsappBtn: 'Direct WhatsApp',
    },
    hero: {
      badge: 'Available for New Video & Design Projects',
      name: 'Bishoy Ashraf',
      title: 'Video Editor & AI Graphic Designer',
      bio: 'I craft high-impact visual content using modern video editing and generative AI. Specializing in high-CTR YouTube thumbnails, long-form documentary editing, multicam podcasts, and viral 9:16 Reels & Shorts engineered to hook viewers from the first second.',
      directWhatsApp: 'Chat on WhatsApp',
      phoneLabel: 'Direct WhatsApp:',
      quoteBtn: 'Request a Project Quote',
      exploreBtn: 'Explore Portfolio',
      changePhotoBtn: 'Change Profile Picture 📷',
      stats: {
        views: '+5M',
        viewsLabel: 'Total Views Generated',
        projects: '+150',
        projectsLabel: 'Videos & Thumbnails Delivered',
        speed: '48h',
        speedLabel: 'Average Turnaround',
        satisfaction: '100%',
        satisfactionLabel: 'On-time & Reliable Delivery',
      },
    },
    filter: {
      all: 'All Works',
      thumbnails: 'Thumbnails',
      podcasts: 'Podcasts',
      longVideos: 'Long Videos',
      reels: 'Reels & Shorts',
    },
    thumbnailsSection: {
      title: 'Thumbnails (High CTR)',
      subtitle: 'Thumbnails engineered with click-through psychology, contrast lighting, and AI generative fill.',
      badge: '4 Featured Samples · Click to Zoom',
      clickToZoom: 'Click to expand & inspect',
      highCtr: 'High CTR',
      toolsUsed: 'Tools & Techniques:',
      openInDrive: 'Open original in Google Drive',
      orderSimilar: 'Order a Similar Thumbnail',
      close: 'Close',
    },
    podcastsSection: {
      title: 'Podcasts',
      subtitle: 'Multi-camera switching, pacing, audio noise cleanup, motion lower-thirds, and visual B-Roll integration.',
      badge: 'Full Podcast Episodes',
    },
    longVideosSection: {
      title: 'Long-Form Videos',
      subtitle: 'Cinematic storytelling, engaging pacing, animated maps, custom SFX, and color grading.',
      badge: 'Documentaries & Educational',
    },
    reelsSection: {
      title: 'Reels & Shorts',
      subtitle: '9:16 vertical short-form videos designed for viral reach, dynamic animated captions, and rhythmic cuts.',
      badge: '9:16 Vertical Content',
      viralBadge: 'Viral Vertical Content',
    },
    toolsSection: {
      title: 'Professional Software & AI Stack',
      subtitle: 'Harnessing industry-standard post-production suites and state-of-the-art generative AI models for maximum polish.',
      readyBadge: 'Production Ready',
    },
    workflowSection: {
      title: 'Production Workflow',
      subtitle: 'A streamlined 5-phase pipeline taking raw footage to 4K publication-ready master exports.',
      approvedBadge: 'Verified Phase',
    },
    quoteModal: {
      title: 'Request a Project Quote & Consultation',
      subtitle: 'Select your project scope and get immediate scheduling and pricing.',
      step1: '1. Select Project Type:',
      step2: '2. Quantity (Videos / Thumbnails):',
      step3: '3. Turnaround Priority:',
      step4: '4. Project Brief or Reference Links (Optional):',
      rushDelivery: 'Rush ⚡ Express',
      rushDesc: '24-48h Priority Turnaround',
      standardDelivery: 'Standard Delivery',
      standardDesc: 'Regular Production Schedule',
      extrasTitle: 'Recommended Add-ons:',
      captionsOption: 'Include dynamic animated subtitles and sound-synced captions (Dynamic Captions)',
      thumbnailsOption: 'Design matching high-CTR thumbnail for each video',
      notesPlaceholder: 'e.g., Tech channel, Alex Hormozi editing style, or link to reference video...',
      turnaroundLabel: 'Estimated Turnaround:',
      freeConsultation: 'Free Consultation',
      cancel: 'Cancel',
      sendWhatsApp: 'Send Order via WhatsApp',
    },
    contactSection: {
      tag: "Let's Create Something Extraordinary Together",
      heading: 'Ready to Work on Your Next Project?',
      description: "Whether you need podcast editing, view-multiplying YouTube content, or viral Reels, I'm here to bring your vision to life.",
      whatsappBtn: 'WhatsApp Chat: 01201699362',
      emailBtn: 'Email Me Directly',
      copyEmail: 'Copy Email',
      copied: 'Email Copied!',
      directCallout: 'For immediate agreements & fast turnaround via WhatsApp:',
      formTitle: 'Or send your project brief directly:',
      nameLabel: 'Your Name or Channel/Brand:',
      namePlaceholder: 'John Doe / Media Studio...',
      contactLabel: 'WhatsApp or Email Address:',
      contactPlaceholder: '+1 ... / email@...',
      serviceLabel: 'Requested Service:',
      messageLabel: 'Brief Overview or Reference Links:',
      messagePlaceholder: 'Need 4 documentary-style videos per month with custom sound design...',
      submitBtn: 'Send & Coordinate Details Directly',
      successTitle: 'Inquiry Received Successfully!',
      successDesc: 'WhatsApp chat has been opened to finalize your project details.',
      sendAnother: 'Send another message',
      fabText: 'Chat with Bishoy',
    },
    footer: {
      description: 'Professional video editing, color grading, sound design, and high-CTR thumbnails to grow your audience and make an impact.',
      rights: 'All rights reserved',
      backToTop: 'Back to Top',
      customize: 'Customize Profile',
    },
  },
};
