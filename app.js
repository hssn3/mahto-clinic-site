(function () {
  "use strict";

  /* =========================================================================
     REAL INSTAGRAM DATA (@mahto_clinic) + CLINIC ARCHIVE
     ========================================================================= */
  const REELS_PLAYLIST = [
    {
      id: "clinic-intro",
      label: "معرفی مه‌تو",
      badge: "🎬 معرفی کلینیک مه تو",
      title: "در کلینیک مه‌تو، زیبایی با منطق همراه است",
      service: "مشاوره عمومی پوست و مو (کمپین هدیه ۳۰۰ میلیونی)",
      cat: "skin",
      catLabel: "معرفی کلینیک",
      poster: "./assets/reels/clinic-intro.jpg",
      videoSrc: "./assets/reels/clinic-intro.mp4",
      igUrl: "https://www.instagram.com/p/DQb-U8Jjcg-/",
      desc: "در «کلینیک مه‌تو»، زیبایی با منطق همراه است.\nما باور داریم لیزر مؤثر و ایمن نباید تجربه‌ای لوکس و دست‌نیافتنی باشد. اینجا تجهیزات پیشرفته، اپراتورهای متخصص و قیمت‌های منصفانه کنار هم قرار گرفته‌اند تا هم نتیجه بگیرید، هم آسوده‌خاطر باشید.\nکلینیک مه‌تو — جایی که کیفیت، با قیمت درست همراه است 🌙",
    },
    {
      id: "billboard-gift",
      label: "کمپین ۳۰۰م",
      badge: "🎁 کمپین ۳۰۰ میلیونی مه‌تو",
      title: "به‌جای بیلبورد ۳۰۰ میلیونی، هدیه‌اش را به شما دادیم!",
      service: "مشاوره عمومی پوست و مو (کمپین هدیه ۳۰۰ میلیونی)",
      cat: "skin",
      catLabel: "کمپین ویژه",
      poster: "./assets/mahto/welcome.jpg",
      videoSrc: "./assets/reels/billboard-gift.mp4",
      igUrl: "https://www.instagram.com/p/DadzZKwNsT5/",
      desc: "قرار بود برای معرفی کلینیک جدید، یک بیلبورد بزرگ در شهر رزرو کنیم؛ هزینه‌اش ۳۰۰ میلیون تومان بود.\nبه‌جای اینکه این مبلغ را صرف تبلیغات کنیم، تصمیم گرفتیم آن را به شکل تخفیف‌ها، هدایا و آفرهای ویژه به مراجعین کلینیک اختصاص دهیم.\nکارهای تبلیغاتی موندگار و دائمی نیستند؛ اما رضایت شما، موندگارترین سرمایه ماست.",
    },
    {
      id: "soprano-2025",
      label: "سوپرانو ۲۰۲۵",
      badge: "⚡ Soprano Titanium 2025",
      title: "لیزر سوپرانو تیتانیوم ۲۰۲۵ — سریع، کم‌درد و سه‌طول‌موج",
      service: "لیزر موهای زائد (Soprano Titanium 2025)",
      cat: "laser",
      catLabel: "لیزر سوپرانو ۲۰۲۵",
      poster: "./assets/reels/soprano-2025.jpg",
      videoSrc: "./assets/reels/soprano-2025.mp4",
      igUrl: "https://www.instagram.com/p/DbImKXctUv4/",
      desc: "اگر به دنبال لیزری سریع، کم‌درد و مؤثر هستید، سوپرانو تیتانیوم ۲۰۲۵ یکی از پیشرفته‌ترین انتخاب‌هاست:\n✔️ مناسب انواع تیپ پوستی\n✔️ سه طول موج همزمان برای اثربخشی بیشتر\n✔️ خنک‌کننده قدرتمند برای تجربه‌ای راحت‌تر\n✔️ سرعت بالا و پوشش وسیع نواحی بدن",
    },
    {
      id: "laser-790",
      label: "لیزر ۷۹۰ هزار",
      badge: "🔥 آفر لیزر فول‌بادی بابل",
      title: "لیزر فول‌بادی در بابل فقط با ۷۹۰ هزار تومان",
      service: "لیزر موهای زائد (Soprano Titanium 2025)",
      cat: "laser",
      catLabel: "آفر ویژه لیزر",
      poster: "./assets/reels/laser-790.jpg",
      videoSrc: "./assets/reels/laser-790.mp4",
      igUrl: "https://www.instagram.com/p/DaQJLhnxckB/",
      desc: "لیزر فول‌بادی با دستگاه پیشرفته در کلینیک زیبایی مه‌تو بابل فقط با ۷۹۰ هزار تومان! تجربه‌ای ایمن، بدون درد و با تنظیم اختصاصی برای پوست شما.",
    },
    {
      id: "hifu",
      label: "هایفو ۵۰٪",
      badge: "✨ تخفیف ۵۰٪ هایفوتراپی",
      title: "تخفیف ویژه هایفو در بابل — ۳.۵ میلیون به‌جای ۷ میلیون",
      service: "هایفوتراپی و لیفت صورت (آفر ۳.۵ میلیون)",
      cat: "inject",
      catLabel: "هایفوتراپی و لیفت",
      poster: "./assets/reels/hifu.jpg",
      videoSrc: "./assets/reels/hifu.mp4",
      igUrl: "https://www.instagram.com/p/Ddwa3N5oAi5/",
      desc: "هایفوتراپی با دستگاه به‌روز، مناسب برای سفت‌تر و لیفت‌تر شدن ظاهر پوست بدون نیاز به جراحی.\n🔸 قیمت اصلی: ۷ میلیون تومان\n🔥 قیمت ویژه جشنواره: فقط ۳.۵ میلیون تومان (ظرفیت پذیرش محدود).",
    },
    {
      id: "spartina",
      label: "لاغری اسپارتینا",
      badge: "🌙 پروتکل علمی اسپارتینا",
      title: "اسپارتینا — مسیر علمی کنترل اشتها و کاهش وزن",
      service: "پروتکل علمی لاغری اسپارتینا",
      cat: "body",
      catLabel: "لاغری زیر نظر پزشک",
      poster: "./assets/reels/spartina.jpg",
      videoSrc: "./assets/reels/spartina.mp4",
      igUrl: "https://www.instagram.com/p/DatBOBTNOnz/",
      desc: "اگر از رژیم‌های سخت و نتیجه‌های کوتاه‌مدت خسته شدی، وقتشه یه مسیر علمی‌تر رو امتحان کنی.\nاسپارتینا با کمک به کنترل اشتها و کاهش ریزه‌خواری، در کنار رژیم و سبک زندگی سالم مسیر کاهش وزن را راحت‌تر می‌کند. قبل از شروع، پزشک شرایط شما را کامل بررسی می‌کند.",
    },
    {
      id: "botox-filler",
      label: "بوتاکس و فیلر",
      badge: "💉 دکتر توحید اسماعیلی",
      title: "ترکیب هوشمندانه بوتاکس و فیلر برای جوانی طبیعی",
      service: "بوتاکس تخصصی و لیفت ابرو",
      cat: "inject",
      catLabel: "بوتاکس و فیلر",
      poster: "./assets/reels/botox-filler.jpg",
      videoSrc: "./assets/reels/botox-filler.mp4",
      igUrl: "https://www.instagram.com/p/DZ7R2eDgIiD/",
      desc: "ترکیب هوشمندانه بوتاکس و فیلر نتایجی کاملاً طبیعی و چشمگیر ایجاد می‌کند:\n🔹 بوتاکس: محو خطوط دینامیک پیشانی و دور چشم\n🔹 فیلر: جبران کاهش حجم و بازگرداندن هارمونی و لیفت صورت بدون تغییر اغراق‌آمیز در چهره — دکتر توحید اسماعیلی.",
    },
    {
      id: "brow-lift",
      label: "لیفت ابرو",
      badge: "👁 تکنیک ۳ نقطه‌ای لیفت ابرو",
      title: "پیشگیری از پتوز و ایجاد لیفت ابرو (چشم گربه‌ای)",
      service: "بوتاکس تخصصی و لیفت ابرو",
      cat: "inject",
      catLabel: "آموزش تخصصی بوتاکس",
      poster: "./assets/reels/brow-lift.jpg",
      videoSrc: "./assets/reels/brow-lift.mp4",
      igUrl: "https://www.instagram.com/p/DSFdlh7kYlq/",
      desc: "تزریق غیراصولی در پیشانی می‌تواند باعث افتادگی (پتوز) ابرو شود. تزریق درست در نواحی جانبی و سه نقطه کنار پلک باعث لیفت ابرو، ایجاد چشم گربه‌ای و حذف چین‌وچروک کنار چشم می‌شود.",
    },
    {
      id: "botox-result",
      label: "نتیجه بوتاکس",
      badge: "✨ نتیجه واقعی بوتاکس",
      title: "نتیجه شگفت‌انگیز بوتاکس توسط دکتر توحید اسماعیلی",
      service: "بوتاکس تخصصی و لیفت ابرو",
      cat: "inject",
      catLabel: "نمونه‌کار بوتاکس",
      poster: "./assets/reels/botox-result.jpg",
      videoSrc: "./assets/reels/botox-result.mp4",
      igUrl: "https://www.instagram.com/p/DSfuQu0DT8V/",
      desc: "تزریق ایمن و دقیق بوتاکس توسط دکتر توحید اسماعیلی؛ کاهش چروک‌های ریز و عمیق همراه با حفظ ظاهر طبیعی، لطیف و افزایش اعتمادبه‌نفس.",
    },
    {
      id: "lip-correction",
      label: "اصلاح فرم لب",
      badge: "💋 اصلاح فرم لب تکنیکی",
      title: "اصلاح فرم لب تزریق‌شده در مرکز دیگر با تکنیک دقیق",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      cat: "ig-work",
      catLabel: "اصلاح فرم لب",
      poster: "./assets/reels/lip-correction.jpg",
      videoSrc: "./assets/reels/lip-correction.mp4",
      igUrl: "https://www.instagram.com/p/Da7eM_zNP-v/",
      desc: "برای مراجعه‌کننده عزیزمان که قبلاً جای دیگری تزریق داشتند و فرم لب مورد پسندشان نبود، اصلاح فرم لب و فرم‌دهی تکنیکی انجام شد تا دقیقاً به نتیجه طبیعی و دلخواهشان برسند.",
    },
    {
      id: "fullface",
      label: "فیلر فول‌فیس",
      badge: "💎 فیلر فول‌فیس هارمونیک",
      title: "تزریق فیلر فول‌فیس و جوانسازی هماهنگ چهره",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      cat: "ig-work",
      catLabel: "فیلر فول‌فیس",
      poster: "./assets/reels/fullface.jpg",
      videoSrc: "./assets/reels/fullface.mp4",
      igUrl: "https://www.instagram.com/p/DdekzNDRKY-/",
      desc: "تزریق تخصصی فیلر فول‌فیس با در نظر گرفتن تناسبات طلایی صورت برای بازگرداندن شادابی، فرم‌دهی متعادل گونه‌ها، چانه و خط فک.",
    },
    {
      id: "skinbooster",
      label: "پرولوکس و زیتریتال",
      badge: "💧 جوانسازهای محبوب",
      title: "جوانساز پرولوکس و زیتریتال — مشابه عملکرد پروفایلو",
      service: "جوانساز پرولوکس، زیتریتال و زیر چشم",
      cat: "skin",
      catLabel: "جوانساز پوست",
      poster: "./assets/reels/skinbooster.jpg",
      videoSrc: "./assets/reels/skinbooster.mp4",
      igUrl: "https://www.instagram.com/p/DeMzWLkxg9D/",
      desc: "معرفی دو جوانساز بسیار محبوب و پرطرفدار «پرولوکس» و «زیتریتال» در کلینیک مه‌تو با عملکردی کاملاً مشابه پروفایلو برای آبرسانی عمقی، شفافیت و سفت‌سازی پوست.",
    },
    {
      id: "carboxy",
      label: "کربوکسی ۹۸۰ت",
      badge: "🌿 روشن‌سازی تا ۴ درجه",
      title: "کربوکسی‌تراپی پوست تا ۴ درجه روشن‌تر با ۹۸۰ هزار تومان",
      service: "کربوکسی‌تراپی و فیشیال (آفر ۹۸۰ هزار)",
      cat: "skin",
      catLabel: "کربوکسی‌تراپی",
      poster: "./assets/reels/carboxy.jpg",
      videoSrc: "./assets/reels/carboxy.mp4",
      igUrl: "https://www.instagram.com/p/DePMVGENR_C/",
      desc: "اگر می‌خواهید پوستتان با ۹۸۰ هزار تومان تا ۴ درجه روشن‌تر و شفاف‌تر شود، همین حالا نوبت کربوکسی‌تراپی تخصصی خود را در کلینیک زیبایی مه‌تو رزرو کنید.",
    },
    {
      id: "bleaching",
      label: "آفیس بلیچینگ",
      badge: "🦷 آفیس بلیچینگ ۱ جلسه‌ای",
      title: "یک جلسه آفیس بلیچینگ برای درخشندگی لبخند",
      service: "آفیس بلیچینگ (سفید کردن دندان)",
      cat: "body",
      catLabel: "دندانپزشکی زیبایی",
      poster: "./assets/reels/bleaching.jpg",
      videoSrc: "./assets/reels/bleaching.mp4",
      igUrl: "https://www.instagram.com/p/Dd4XN64xvfe/",
      desc: "وقتی دندان‌ها مرتب هستند و سایز مناسبی دارند، آفیس بلیچینگ بهترین و ایمن‌ترین گزینه برای سفید شدن دندان‌ها تنها در یک جلسه کلینیکی است.",
    },
  ];

  const GALLERY_ITEMS = [
    // Real Instagram Client Works (High-Res Photos)
    {
      src: "./assets/ig/jawline-1.jpg",
      cat: "ig-work",
      catLabel: "نمونه‌کار زاویه‌سازی فک",
      title: "زاویه‌سازی فک؛ تغییر ظریف، تأثیر چشمگیر",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      igUrl: "https://www.instagram.com/p/DTIblxRjfp1/",
      desc: "چهره‌ای خوش‌فرم‌تر، خط فک واضح‌تر و نیمرخی شیک‌تر بدون نیاز به جراحی؛ مناسب برای افتادگی خفیف فک و صورت‌های گرد با ماندگاری بالا و کاملاً طبیعی.",
    },
    {
      src: "./assets/ig/lip-neuramis-1.jpg",
      cat: "ig-work",
      catLabel: "نمونه‌کار فیلر لب",
      title: "تزریق ۱ سی‌سی فیلر لب با برند محبوب نورامیس",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      igUrl: "https://www.instagram.com/p/DdR1gSbu5ZZ/",
      desc: "فرم‌دهی طبیعی و ظریف لب با یک سی‌سی فیلر اصیل نورامیس (Neuramis) بدون ایجاد حالت غیرطبیعی یا اردکی در کلینیک مه‌تو بابل.",
    },
    {
      src: "./assets/ig/chin-revofil-1.jpg",
      cat: "ig-work",
      catLabel: "نمونه‌کار فیلر چانه",
      title: "تزریق فیلر چانه و اصلاح فرم با ۱.۵ سی‌سی رووفیل",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      igUrl: "https://www.instagram.com/p/Ddj-n-nSMxa/",
      desc: "اصلاح فرم چانه و ایجاد تناسب طلایی نیم‌رخ با ۱.۵ سی‌سی فیلر معتبر رووفیل (Revofil) زیر نظر دکتر توحید اسماعیلی.",
    },
    {
      src: "./assets/ig/jawline-2.jpg",
      cat: "ig-work",
      catLabel: "نمونه‌کار زاویه‌سازی فک",
      title: "نمای نیمرخ زاویه‌سازی فک بدون جراحی",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      igUrl: "https://www.instagram.com/p/DTIblxRjccu/",
      desc: "هر چیزی که به زیبایی‌ات مربوط باشد، باید علمی، اصولی و توسط متخصص انجام شود — زاویه‌سازی فک با هارمونی طبیعی در کلینیک مه‌تو.",
    },
    {
      src: "./assets/ig/lip-neuramis-2.jpg",
      cat: "ig-work",
      catLabel: "نمونه‌کار فیلر لب",
      title: "زاویه دوم فیلر لب طبیعی نورامیس",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      igUrl: "https://www.instagram.com/p/DdR1MU1J4gP/",
      desc: "تزریق ۱ سی‌سی فیلر لب با برند محبوب نورامیس برای حجم‌دهی لطیف، رفع عدم تقارن و شادابی لب‌ها.",
    },
    {
      src: "./assets/ig/chin-revofil-2.jpg",
      cat: "ig-work",
      catLabel: "نمونه‌کار فیلر چانه",
      title: "اصلاح تناسب نیم‌رخ با فیلر چانه رووفیل",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      igUrl: "https://www.instagram.com/p/Ddj-p3WSq1Z/",
      desc: "تغییر ظریف اما بسیار مؤثر در تناسب چهره با ۱.۵ سی‌سی فیلر چانه رووفیل بدون اغراق.",
    },
    {
      src: "./assets/ig/lip-neuramis-3.jpg",
      cat: "ig-work",
      catLabel: "نمونه‌کار فیلر لب",
      title: "جزئیات فرم‌دهی ظریف لب با نورامیس",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      igUrl: "https://www.instagram.com/p/DdR1coUvegG/",
      desc: "خط لب دقیق و حجم طبیعی با حفظ کامل آناتومی و زیبایی چهره در کلینیک تخصصی مه تو.",
    },
    // Playable Featured Reels inside 3D Coverflow!
    ...REELS_PLAYLIST.slice(2, 14).map((r) => ({
      src: r.poster,
      videoSrc: r.videoSrc,
      cat: r.cat,
      catLabel: r.catLabel + " · ریلز",
      title: r.title,
      service: r.service,
      igUrl: r.igUrl,
      desc: r.desc,
    })),
    // Classic Clinic Visuals & Educational Cards
    {
      src: "./assets/mahto/laser-before-after.jpg",
      cat: "laser",
      catLabel: "نتیجه واقعی لیزر",
      title: "صافی پوست بعد از جلسات لیزر سوپرانو تیتانیوم",
      service: "لیزر موهای زائد (Soprano Titanium 2025)",
      desc: "قبل و بعد را ببینید: پوست صاف‌تر، بدون موهای زائد، بدون موهای زیرپوستی و دون‌دون‌های آزاردهنده با تنظیمات اختصاصی کلینیک مه تو.",
    },
    {
      src: "./assets/mahto/soprano-tech.jpg",
      cat: "laser",
      catLabel: "تکنولوژی لیزر",
      title: "دستگاه Soprano Titanium — جدیدترین نسل لیزر دنیا",
      service: "لیزر موهای زائد (Soprano Titanium 2025)",
      desc: "لیزر بدون درد با سه طول موج همزمان و خنک‌کننده قوی؛ مناسب برای تمام تیپ‌های پوستی، حتی پوست‌های سبزه.",
    },
    {
      src: "./assets/mahto/undereye.jpg",
      cat: "skin",
      catLabel: "جوانسازی و فیشیال",
      title: "جادوی جوانساز زیر چشم؛ خداحافظی با چهره خسته",
      service: "جوانساز پرولوکس، زیتریتال و زیر چشم",
      desc: "ترکیبی دقیق از مواد تقویت‌کننده برای رفع تیرگی زیر چشم، استحکام بافت و کاهش چروک‌های سطحی.",
    },
    {
      src: "./assets/mahto/hair-filler-1.jpg",
      cat: "skin",
      catLabel: "درمان تخصصی مو",
      title: "برای درمان ریزش مو، هیر فیلر کاملاً جواب است",
      service: "هیر فیلر و درمان ریزش مو",
      desc: "پروتکل تخصصی هیر فیلر زیر نظر پزشک برای تقویت ریشه مو، کاهش ریزش و افزایش ضخامت موهای کم‌پشت.",
    },
    {
      src: "./assets/mahto/botox-care.jpg",
      cat: "inject",
      catLabel: "مراقبت بوتاکس",
      title: "قوانین طلایی مراقبت بعد از تزریق بوتاکس",
      service: "بوتاکس تخصصی و لیفت ابرو",
      desc: "تا ۴ ساعت دراز نکشید و سر را پایین نگیرید، ناحیه تزریق را ماساژ ندهید و تا ۲۴ ساعت از ورزش سنگین و حمام داغ خودداری کنید.",
    },
    {
      src: "./assets/mahto/filler-myth.jpg",
      cat: "inject",
      catLabel: "دانستنی علمی فیلر",
      title: "آیا فیلر باعث افتادگی پوست می‌شود؟",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      desc: "خیر؛ اگر فیلر مناسب با تکنیک درست و در ناحیه صحیح تزریق شود، هرگز باعث افتادگی پوست نمی‌شود. ظاهر غیرطبیعی فقط نتیجه Overfilling است.",
    },
    {
      src: "./assets/mahto/laser-cycle.jpg",
      cat: "laser",
      catLabel: "دانستنی لیزر",
      title: "چرا نباید جلسات لیزر را زودتر از موعد انجام داد؟",
      service: "لیزر موهای زائد (Soprano Titanium 2025)",
      desc: "لیزر فقط روی موهایی اثر می‌کند که در مرحله رشد فعال (آناژن) هستند. نظم جلسات ضامن نتیجه قطعی و صرفه‌جویی در هزینه است.",
    },
    {
      src: "./assets/mahto/hair-filler-2.jpg",
      cat: "skin",
      catLabel: "تقویت فولیکول مو",
      title: "۷ مزیت علمی تزریق هیر فیلر برای موها",
      service: "هیر فیلر و درمان ریزش مو",
      desc: "تقویت فولیکول‌های مو، کاهش ریزش، تحریک رشد مجدد، افزایش ضخامت و بهبود کیفیت پوست سر.",
    },
  ];

  const PROTOCOLS = [
    {
      title: "سه طول موج همزمان و پروتکل اختصاصی (روشن تا سبزه)",
      body: "دستگاه Soprano Titanium 2025 با سه طول موج همزمان و خنک‌کننده قدرتمند، بدون درد و سوختگی روی تمام تیپ‌های پوستی حتی پوست‌های سبزه بیشترین بازدهی را دارد — اکنون با آفر فول‌بادی ۷۹۰ هزار تومان در بابل.",
    },
    {
      title: "رعایت علمی چرخه رشد فعال مو (فاز آناژن)",
      body: "موهای بدن ۳ مرحله رشد دارند و لیزر فقط روی ریشه‌های فعال در فاز آناژن اثر می‌گذارد. انجام زودتر از موعد جلسات نتیجه‌ای ندارد؛ نظم در جلسات مطابق برنامه کلینیک، ضامن صافی کامل پوست است.",
    },
    {
      title: "بررسی هورمونی و پایش پزشک کنار لیزر",
      body: "گاهی دلیل برگشت مو در برخی افراد نه دستگاه است و نه تعداد جلسات، بلکه هورمون‌های فعال مثل تخمدان پلی‌کیستیک (PCOS) یا استرس بالاست. در کلینیک مه تو، پایش پزشک کنار لیزر نتیجه را چندبرابر می‌کند.",
    },
  ];

  const WIZARD = [
    {
      label: "⚡ لیزر ۷۹۰ هزار (سوپرانو ۲۰۲۵)",
      service: "لیزر موهای زائد (Soprano Titanium 2025)",
      advice: "پیشنهاد کلینیک مه‌تو: دستگاه Soprano Titanium 2025 با ۳ طول موج همزمان، خنک‌کننده قوی و آفر فول‌بادی ۷۹۰ هزار تومان در بابل با تنظیم اختصاصی تیپ پوستی شما.",
    },
    {
      label: "💋 فیلر لب، چانه و زاویه فک",
      service: "فیلر لب، چانه و زاویه‌سازی فک",
      advice: "پیشنهاد دکتر اسماعیلی: ارزیابی هارمونی نیم‌رخ و تزریق ظریف با برندهای اصیل نورامیس (لب) یا رووفیل (چانه و فک) بدون اغراق و Overfilling.",
    },
    {
      label: "✨ لیفت بدون جراحی (هایفو ۳.۵م)",
      service: "هایفوتراپی و لیفت صورت (آفر ۳.۵ میلیون)",
      advice: "پیشنهاد ویژه جشنواره: هایفوتراپی با دستگاه به‌روز برای سفتی و لیفت پوست بدون جراحی با ۵۰٪ تخفیف (۳.۵ میلیون به‌جای ۷ میلیون تومان).",
    },
    {
      label: "💎 بوتاکس و لیفت ابرو",
      service: "بوتاکس تخصصی و لیفت ابرو",
      advice: "پیشنهاد دکتر اسماعیلی: تزریق دقیق آناتومیک در ۳ نقطه کلیدی برای محو خطوط پیشانی و دور چشم، لیفت ابرو و پیشگیری کامل از افتادگی (پتوز).",
    },
    {
      label: "🌙 کاهش وزن علمی (اسپارتینا)",
      service: "پروتکل علمی لاغری اسپارتینا",
      advice: "پیشنهاد کلینیک مه‌تو: مشاوره پزشکی و بررسی شرایط فردی برای شروع پروتکل اسپارتینا جهت کنترل اشتها و ریزه‌خواری در کنار اصلاح سبک زندگی.",
    },
    {
      label: "💧 جوانساز و روشن‌سازی پوست",
      service: "کربوکسی‌تراپی و فیشیال (آفر ۹۸۰ هزار)",
      advice: "پیشنهاد کلینیک مه‌تو: کربوکسی‌تراپی (تا ۴ درجه روشن‌تر با ۹۸۰ هزار تومان) یا تزریق جوانسازهای پرولوکس و زیتریتال (مشابه پروفایلو) و جوانساز زیر چشم.",
    },
    {
      label: "🌿 ریزش و کم‌پشتی مو",
      service: "هیر فیلر و درمان ریزش مو",
      advice: "پیشنهاد کلینیک مه‌تو: پروتکل تخصصی هیر فیلر زیر نظر پزشک برای تقویت فولیکول‌ها، کاهش ریزش و افزایش ضخامت و استحکام تار مو.",
    },
    {
      label: "🦷 سفید کردن دندان (بلیچینگ)",
      service: "آفیس بلیچینگ (سفید کردن دندان)",
      advice: "پیشنهاد کلینیک مه‌تو: یک جلسه آفیس بلیچینگ تخصصی و ایمن؛ بهترین گزینه برای درخشندگی طبیعی دندان‌های مرتب بدون آسیب به مینای دندان.",
    },
  ];

  const toFaNum = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  /* =========================================================================
     TOAST, THEME & MOBILE MENU
     ========================================================================= */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2700);
  }

  const themeToggle = document.getElementById("themeToggle");
  let currentTheme = "dark";
  try { currentTheme = localStorage.getItem("mahto_theme") || "dark"; } catch {}
  function applyTheme(t) {
    currentTheme = t;
    document.documentElement.setAttribute("data-theme", t);
    if (themeToggle) themeToggle.textContent = t === "dark" ? "☀" : "🌙";
    try { localStorage.setItem("mahto_theme", t); } catch {}
  }
  applyTheme(currentTheme);
  themeToggle?.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const open = mobileNavDrawer.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      mobileNavDrawer.setAttribute("aria-hidden", open ? "false" : "true");
      mobileMenuBtn.textContent = open ? "✕" : "☰";
    });
    mobileNavDrawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.textContent = "☰";
      });
    });
  }

  /* =========================================================================
     4-SLIDE HERO CAROUSEL ENGINE
     ========================================================================= */
  const sliderFrame = document.getElementById("heroSliderFrame");
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const tabs = Array.from(document.querySelectorAll(".slide-tab"));
  let slideIdx = 0;
  let slideTimer = null;
  let sliderHovered = false;

  function goSlide(next) {
    if (!slides.length) return;
    slideIdx = (next + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === slideIdx));
    tabs.forEach((tb, i) => {
      const isAct = i === slideIdx;
      tb.classList.toggle("active", isAct);
      tb.setAttribute("aria-selected", isAct ? "true" : "false");
      const bar = tb.querySelector(".slide-progress");
      if (bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
    });
    restartSlideTimer();
  }

  function restartSlideTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
      if (!sliderHovered && !document.hidden) goSlide(slideIdx + 1);
    }, 6800);
  }

  tabs.forEach((tb) => tb.addEventListener("click", () => goSlide(Number(tb.dataset.goto))));
  document.getElementById("heroNext")?.addEventListener("click", () => goSlide(slideIdx + 1));
  document.getElementById("heroPrev")?.addEventListener("click", () => goSlide(slideIdx - 1));

  sliderFrame?.addEventListener("mouseenter", () => { sliderHovered = true; sliderFrame.classList.add("is-paused"); });
  sliderFrame?.addEventListener("mouseleave", () => { sliderHovered = false; sliderFrame.classList.remove("is-paused"); });

  let heroDragX = null;
  sliderFrame?.addEventListener("pointerdown", (e) => { heroDragX = e.clientX; });
  sliderFrame?.addEventListener("pointerup", (e) => {
    if (heroDragX === null) return;
    const dx = e.clientX - heroDragX;
    if (Math.abs(dx) > 48) goSlide(slideIdx + (dx > 0 ? -1 : 1));
    heroDragX = null;
  });
  restartSlideTimer();

  /* =========================================================================
     INTERACTIVE REELS CINEMA & STORIES STRIP
     ========================================================================= */
  const storiesRow = document.getElementById("storiesRow");
  const reelPlaylistEl = document.getElementById("reelPlaylist");
  const activeReelVideo = document.getElementById("activeReelVideo");
  const reelActiveBadge = document.getElementById("reelActiveBadge");
  const reelActiveTitle = document.getElementById("reelActiveTitle");
  const reelActiveCaption = document.getElementById("reelActiveCaption");
  const reelBookServiceBtn = document.getElementById("reelBookServiceBtn");
  const reelIgLink = document.getElementById("reelIgLink");
  const reelMuteBtn = document.getElementById("reelMuteBtn");
  const reelFullscreenBtn = document.getElementById("reelFullscreenBtn");
  const reelCountLabel = document.getElementById("reelCountLabel");

  let activeReel = REELS_PLAYLIST[0];

  function loadReelIntoCinema(reel, autoPlay = true, shouldScroll = false) {
    if (!reel) return;
    activeReel = reel;
    if (reelActiveBadge) reelActiveBadge.textContent = reel.badge;
    if (reelActiveTitle) reelActiveTitle.textContent = reel.title;
    if (reelActiveCaption) reelActiveCaption.textContent = reel.desc;
    if (reelIgLink) reelIgLink.href = reel.igUrl || "https://www.instagram.com/mahto_clinic";

    if (activeReelVideo) {
      activeReelVideo.poster = reel.poster;
      activeReelVideo.src = reel.videoSrc;
      activeReelVideo.load();
      if (autoPlay) {
        activeReelVideo.play().catch(() => {});
      }
    }

    reelPlaylistEl?.querySelectorAll(".reel-item-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.reelId === reel.id);
    });

    if (shouldScroll) {
      document.getElementById("reels")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (reelCountLabel) reelCountLabel.textContent = toFaNum(REELS_PLAYLIST.length) + " ویدیوی واقعی";

  // Build Stories Strip (mix of Reels + Key Before/After Photos)
  const STORIES_ITEMS = [
    ...REELS_PLAYLIST.slice(0, 10).map((r) => ({
      label: r.label,
      thumb: r.poster,
      isVideo: true,
      reel: r,
    })),
    { label: "زاویه‌سازی فک", thumb: "./assets/ig/jawline-1.jpg", galleryItem: GALLERY_ITEMS[0] },
    { label: "فیلر لب نورامیس", thumb: "./assets/ig/lip-neuramis-1.jpg", galleryItem: GALLERY_ITEMS[1] },
    { label: "چانه رووفیل", thumb: "./assets/ig/chin-revofil-1.jpg", galleryItem: GALLERY_ITEMS[2] },
    { label: "قبل و بعد لیزر", thumb: "./assets/mahto/laser-before-after.jpg", galleryItem: GALLERY_ITEMS.find((x) => x.src.includes("before-after")) },
  ];

  if (storiesRow) {
    STORIES_ITEMS.forEach((st) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "story-pill";
      btn.innerHTML =
        '<div class="story-ring"><img src="' + st.thumb + '" alt="' + st.label + '" loading="lazy" />' +
        (st.isVideo ? '<span class="story-video-dot">▶</span>' : "") +
        '</div><div class="story-label">' + st.label + "</div>";
      btn.addEventListener("click", () => {
        if (st.reel) {
          openLightbox({
            videoSrc: st.reel.videoSrc,
            src: st.reel.poster,
            catLabel: st.reel.catLabel,
            title: st.reel.title,
            service: st.reel.service,
            desc: st.reel.desc,
            igUrl: st.reel.igUrl,
          });
        } else if (st.galleryItem) {
          openLightbox(st.galleryItem);
        }
      });
      storiesRow.appendChild(btn);
    });
  }

  // Build Reels Playlist
  if (reelPlaylistEl) {
    REELS_PLAYLIST.forEach((r, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "reel-item-btn" + (idx === 0 ? " active" : "");
      btn.dataset.reelId = r.id;
      btn.innerHTML =
        '<div class="reel-item-thumb"><img src="' + r.poster + '" alt="' + r.label + '" loading="lazy" /></div>' +
        '<div class="reel-item-meta"><strong>' + r.label + "</strong><span>" + r.catLabel + "</span></div>";
      btn.addEventListener("click", () => {
        if (activeReelVideo) activeReelVideo.muted = false;
        loadReelIntoCinema(r, true, false);
        showToast("در حال پخش: " + r.label);
      });
      reelPlaylistEl.appendChild(btn);
    });
  }

  loadReelIntoCinema(REELS_PLAYLIST[0], false, false);

  reelMuteBtn?.addEventListener("click", () => {
    if (!activeReelVideo) return;
    activeReelVideo.muted = !activeReelVideo.muted;
    reelMuteBtn.textContent = activeReelVideo.muted ? "🔇 صدا قطع است" : "🔊 صدا وصل است";
    if (activeReelVideo.paused) activeReelVideo.play().catch(() => {});
  });

  reelFullscreenBtn?.addEventListener("click", () => {
    if (!activeReel) return;
    if (activeReelVideo) activeReelVideo.pause();
    openLightbox({
      videoSrc: activeReel.videoSrc,
      src: activeReel.poster,
      catLabel: activeReel.catLabel,
      title: activeReel.title,
      service: activeReel.service,
      desc: activeReel.desc,
      igUrl: activeReel.igUrl,
    });
  });

  reelBookServiceBtn?.addEventListener("click", () => {
    if (activeReel) selectServiceAndScroll(activeReel.service);
  });

  // Global [data-play-reel] triggers (from Hero, Offers, Service cards, Knowledge Vault)
  document.body.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-play-reel]");
    if (!trigger) return;
    const id = trigger.dataset.playReel;
    const found = REELS_PLAYLIST.find((r) => r.id === id);
    if (found) {
      openLightbox({
        videoSrc: found.videoSrc,
        src: found.poster,
        catLabel: found.catLabel,
        title: found.title,
        service: found.service,
        desc: found.desc,
        igUrl: found.igUrl,
      });
    }
  });

  /* =========================================================================
     SERVICES FILTER & 3D TILT + FRESNEL SPOTLIGHT
     ========================================================================= */
  const serviceFilterBtns = document.querySelectorAll("#serviceFilters .filter-pill");
  const serviceCards = document.querySelectorAll("#servicesGrid .service-card");
  serviceFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      serviceFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.svcCat;
      serviceCards.forEach((card) => {
        const show = cat === "all" || card.dataset.svcCat === cat;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    document.querySelectorAll(".glass").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
      }, { passive: true });
    });

    document.querySelectorAll(".tilt-3d").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(950px) rotateY(" + (nx * 8.5).toFixed(2) + "deg) rotateX(" + (-ny * 8.5).toFixed(2) + "deg) translateY(-4px)";
      }, { passive: true });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* =========================================================================
     SMART CONSULTATION WIZARD & PROTOCOL TABS
     ========================================================================= */
  const wizChips = document.getElementById("wizardChips");
  const wizAdvice = document.getElementById("wizardAdvice");
  let wizCurrent = WIZARD[0];
  if (wizChips && wizAdvice) {
    WIZARD.forEach((w, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "wiz-chip" + (idx === 0 ? " active" : "");
      b.textContent = w.label;
      b.addEventListener("click", () => {
        wizChips.querySelectorAll(".wiz-chip").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        wizCurrent = w;
        wizAdvice.textContent = w.advice;
      });
      wizChips.appendChild(b);
    });
    wizAdvice.textContent = wizCurrent.advice;
  }
  document.getElementById("wizardApplyBtn")?.addEventListener("click", () => selectServiceAndScroll(wizCurrent.service));

  const protoPanel = document.getElementById("protoPanel");
  document.querySelectorAll(".proto-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".proto-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const p = PROTOCOLS[Number(btn.dataset.proto)] || PROTOCOLS[0];
      if (protoPanel) protoPanel.innerHTML = "<strong>" + p.title + "</strong>" + p.body;
    });
  });

  /* =========================================================================
     3D INTERACTIVE COVERFLOW GALLERY (PHOTOS + PLAYABLE VIDEOS)
     ========================================================================= */
  const cfStage = document.getElementById("coverflowStage");
  const cfCounter = document.getElementById("cfCounter");
  const gridEl = document.getElementById("galleryGridMode");
  const stageShell = document.getElementById("stage3dShell");
  const toggleViewBtn = document.getElementById("toggleViewMode");
  let filteredItems = [...GALLERY_ITEMS];
  let activeIdx = 0;
  let isGrid = false;

  function renderGallery() {
    if (!cfStage || !gridEl) return;
    cfStage.innerHTML = "";
    gridEl.innerHTML = "";
    if (activeIdx >= filteredItems.length) activeIdx = 0;

    filteredItems.forEach((item, idx) => {
      const badgeHtml = item.videoSrc ? '<span class="cf-video-badge">▶ ریلز</span>' : "";
      const card = document.createElement("div");
      card.className = "cf-card";
      card.innerHTML =
        '<img src="' + item.src + '" alt="' + item.title + '" loading="lazy" />' +
        badgeHtml +
        '<div class="cf-overlay"><span class="cf-cat">' + item.catLabel +
        '</span><div class="cf-title">' + item.title +
        '</div><div class="cf-excerpt">' + item.desc + "</div></div>";
      card.addEventListener("click", () => {
        if (idx === activeIdx) openLightbox(item);
        else { activeIdx = idx; layoutCoverflow(); }
      });
      cfStage.appendChild(card);

      const gi = document.createElement("div");
      gi.className = "grid-item";
      gi.innerHTML =
        '<img src="' + item.src + '" alt="' + item.title + '" loading="lazy" />' +
        badgeHtml +
        '<div class="cf-overlay"><span class="cf-cat">' + item.catLabel +
        '</span><div class="cf-title">' + item.title + "</div></div>";
      gi.addEventListener("click", () => openLightbox(item));
      gridEl.appendChild(gi);
    });
    layoutCoverflow();
  }

  function layoutCoverflow() {
    if (!cfStage) return;
    const cards = cfStage.querySelectorAll(".cf-card");
    const total = cards.length;
    const spread = window.innerWidth < 640 ? 150 : 228;
    cards.forEach((card, i) => {
      let diff = i - activeIdx;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      const abs = Math.abs(diff);
      if (abs > 3) {
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        card.style.transform = "translate3d(" + (diff > 0 ? 500 : -500) + "px, 0, -400px) scale(0.55)";
        return;
      }
      const tx = diff * spread;
      const tz = -abs * 125 + (abs === 0 ? 74 : 0);
      const ry = -diff * 32;
      const sc = Math.max(0.68, 1 - abs * 0.13);
      card.style.zIndex = String(20 - abs);
      card.style.opacity = abs === 0 ? "1" : String(Math.max(0.32, 0.9 - abs * 0.24));
      card.style.filter = abs === 0 ? "none" : "brightness(" + Math.max(0.55, 1 - abs * 0.18) + ")";
      card.style.pointerEvents = "auto";
      card.style.transform =
        "translate3d(" + tx + "px, 0, " + tz + "px) rotateY(" + ry + "deg) scale(" + sc + ")";
    });
    if (cfCounter) cfCounter.textContent = toFaNum(activeIdx + 1) + " / " + toFaNum(total);
  }

  const stepCf = (delta) => {
    if (!filteredItems.length) return;
    activeIdx = (activeIdx + delta + filteredItems.length) % filteredItems.length;
    layoutCoverflow();
  };
  document.getElementById("cfNext")?.addEventListener("click", () => stepCf(1));
  document.getElementById("cfPrev")?.addEventListener("click", () => stepCf(-1));
  window.addEventListener("resize", layoutCoverflow, { passive: true });

  let dragStartX = null;
  cfStage?.addEventListener("pointerdown", (e) => { dragStartX = e.clientX; });
  cfStage?.addEventListener("pointerup", (e) => {
    if (dragStartX === null) return;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 40) stepCf(dx > 0 ? -1 : 1);
    dragStartX = null;
  });

  document.querySelectorAll(".filter-pill[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill[data-cat]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      filteredItems = cat === "all" ? [...GALLERY_ITEMS] : GALLERY_ITEMS.filter((x) => x.cat === cat);
      activeIdx = 0;
      renderGallery();
    });
  });

  toggleViewBtn?.addEventListener("click", () => {
    isGrid = !isGrid;
    stageShell?.classList.toggle("hidden", isGrid);
    gridEl?.classList.toggle("active", isGrid);
    toggleViewBtn.textContent = isGrid ? "نمای سه‌بعدی 3D ✦" : "نمای شبکه‌ای ▦";
  });
  renderGallery();

  /* =========================================================================
     LIGHTBOX MODAL (PHOTOS + PLAYABLE MP4 REELS)
     ========================================================================= */
  const lightbox = document.getElementById("lightbox");
  const lbMedia = document.getElementById("lbMedia");
  const lbCat = document.getElementById("lbCat");
  const lbTitle = document.getElementById("lbTitle");
  const lbDesc = document.getElementById("lbDesc");
  const lbBookBtn = document.getElementById("lbBookBtn");
  const lbIgLink = document.getElementById("lbIgLink");
  let lbCurrentService = "مشاوره عمومی پوست و مو (کمپین هدیه ۳۰۰ میلیونی)";

  function openLightbox(item) {
    if (!lightbox || !lbMedia) return;
    lbMedia.innerHTML = item.videoSrc
      ? '<video controls autoplay playsinline poster="' + (item.src || "") + '"><source src="' + item.videoSrc + '" type="video/mp4" /></video>'
      : '<img src="' + item.src + '" alt="' + item.title + '" />';
    if (lbCat) lbCat.textContent = item.catLabel || "کلینیک زیبایی مه تو";
    if (lbTitle) lbTitle.textContent = item.title;
    if (lbDesc) lbDesc.textContent = item.desc || "";
    if (lbIgLink) lbIgLink.href = item.igUrl || "https://www.instagram.com/mahto_clinic";
    lbCurrentService = item.service || "مشاوره عمومی پوست و مو (کمپین هدیه ۳۰۰ میلیونی)";
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    lightbox?.classList.remove("open");
    if (lbMedia) lbMedia.innerHTML = "";
  }
  document.getElementById("lbClose")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
  lbBookBtn?.addEventListener("click", () => { closeLightbox(); selectServiceAndScroll(lbCurrentService); });

  document.getElementById("openBeforeAfterBtn")?.addEventListener("click", () => {
    const ba = GALLERY_ITEMS.find((i) => i.src.includes("before-after"));
    if (ba) openLightbox(ba);
  });

  document.querySelectorAll(".vault-thumb[data-open-img]").forEach((el) => {
    el.addEventListener("click", () => {
      const found = GALLERY_ITEMS.find((i) => i.src === el.dataset.openImg);
      if (found) openLightbox(found);
    });
  });

  /* =========================================================================
     SERVICE SELECTION, COPY, VCARD, SHARE & SMART BOOKING
     ========================================================================= */
  function selectServiceAndScroll(svc) {
    const sel = document.getElementById("fService");
    if (sel) {
      for (const opt of sel.options) {
        if (opt.value === svc) { sel.value = svc; break; }
      }
    }
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    showToast("خدمت «" + svc + "» در فرم نوبت‌دهی انتخاب شد");
  }

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-select-service]");
    if (btn) selectServiceAndScroll(btn.dataset.selectService);
  });

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        showToast("شماره تماس با موفقیت کپی شد");
      } catch {
        showToast("شماره: " + btn.dataset.copy);
      }
    });
  });

  document.getElementById("saveVcardBtn")?.addEventListener("click", () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:اسماعیلی;توحید;دکتر;;",
      "FN:کلینیک زیبایی مه تو — دکتر توحید اسماعیلی",
      "ORG:کلینیک زیبایی مه تو | MAHTO CLINIC",
      "TEL;TYPE=CELL,VOICE,PREF:+989201827726",
      "TEL;TYPE=CELL,VOICE:+989001827726",
      "ADR;TYPE=WORK:;;خورشیدکلا، بلوار جانبازان، میدان شهید سجودی (قاضی کتی)، ساختمان مازیار، طبقه ۷، واحد ۲۹;بابل;مازندران;;ایران",
      "NOTE:پوست، مو، لیزر سوپرانو تیتانیوم ۲۰۲۵، فیلر و بوتاکس، هایفو، هیر فیلر، کربوکسی، بلیچینگ و لاغری اسپارتینا",
      "END:VCARD",
    ].join("\r\n");
    const blob = new Blob(["\uFEFF" + vcard], { type: "text/vcard;charset=utf-8" });
    const u = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = u;
    a.download = "mahto-clinic.vcf";
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1500);
    showToast("کارت مخاطب کلینیک ذخیره شد");
  });

  document.getElementById("shareSiteBtn")?.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "کلینیک زیبایی مه تو | MAHTO CLINIC",
          text: "کلینیک زیبایی مه تو — دکتر توحید اسماعیلی (بابل)",
          url: location.href,
        });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(location.href);
      showToast("لینک سایت کپی شد");
    } catch {}
  });

  // Resilient Booking Form (Cloudflare Worker API + Seamless Static Preview Fallback)
  const bookingForm = document.getElementById("bookingForm");
  const bookingResult = document.getElementById("bookingResult");
  const submitBtn = document.getElementById("submitBookingBtn");

  bookingForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fName").value.trim();
    const rawPhone = document.getElementById("fPhone").value.trim();
    const service = document.getElementById("fService").value;
    const preferredTime = document.getElementById("fTime").value;
    const notes = document.getElementById("fNotes").value.trim();

    const phone = rawPhone
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .replace(/[\s-]/g, "");

    bookingResult.className = "booking-result";
    if (fullName.length < 2) {
      bookingResult.textContent = "لطفاً نام و نام خانوادگی خود را وارد کنید.";
      bookingResult.classList.add("show", "err");
      return;
    }
    if (!/^09\d{9}$/.test(phone)) {
      bookingResult.textContent = "لطفاً شماره موبایل معتبر ۱۱ رقمی (شروع با ۰۹) وارد کنید.";
      bookingResult.classList.add("show", "err");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "در حال ثبت درخواست...";

    const payload = { fullName, phone, service, preferredTime, notes };
    let code = "MHT-" + String(Math.floor(100000 + Math.random() * 900000));

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.appointment?.code) code = data.appointment.code;
      } else {
        throw new Error("static-fallback");
      }
    } catch {
      // Persist locally on static preview hosts
      try {
        const prev = JSON.parse(localStorage.getItem("mahto_bookings") || "[]");
        prev.unshift({ ...payload, code, createdAt: new Date().toISOString() });
        localStorage.setItem("mahto_bookings", JSON.stringify(prev.slice(0, 20)));
      } catch {}
    }

    const waText = encodeURIComponent(
      "سلام کلینیک زیبایی مه تو 🌙\nدرخواست نوبت آنلاین ثبت کردم:\n" +
      "کد پیگیری: " + code + "\nنام: " + fullName + "\nتلفن: " + phone +
      "\nخدمت: " + service + "\nزمان تماس: " + preferredTime +
      (notes ? "\nتوضیحات: " + notes : "")
    );

    bookingResult.innerHTML =
      '<div style="font-weight:900;color:#86efac;margin-bottom:5px;">✦ درخواست نوبت شما با موفقیت ثبت شد!</div>' +
      '<div style="font-size:0.88rem;">کد پیگیری شما: <strong dir="ltr" style="color:#f6e0aa;">' + code + "</strong></div>" +
      '<div style="font-size:0.83rem;margin-top:4px;opacity:0.92;">کارشناسان کلینیک زیبایی مه تو در اسرع وقت با شما تماس می‌گیرند. برای تایید فوری‌تر می‌توانید جزئیات را به واتساپ پذیرش بفرستید:</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">' +
      '<a href="https://wa.me/989201827726?text=' + waText + '" target="_blank" rel="noopener noreferrer" class="btn-gold" style="padding:8px 16px;font-size:0.8rem;">ارسال سریع به واتساپ پذیرش ↗</a>' +
      '<a href="tel:+989201827726" class="btn-glass" style="padding:8px 14px;font-size:0.8rem;">تماس مستقیم ۰۹۲۰۱۸۲۷۷۲۶</a>' +
      "</div>";
    bookingResult.classList.add("show");
    bookingForm.reset();
    showToast("نوبت شما با کد " + code + " ثبت شد ✦");
    triggerBurst();

    submitBtn.disabled = false;
    submitBtn.textContent = "ثبت درخواست نوبت و دریافت کد پیگیری";
  });

  // Scroll Reveal Observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* =========================================================================
     SIGNATURE 3D SCULPTURAL ENGINE (Crescent Moon, Dual Rings, Pearls & Sakura)
     ========================================================================= */
  const canvas = document.getElementById("universe3D");
  const ctx = canvas ? canvas.getContext("2d") : null;
  let W = window.innerWidth;
  let H = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let paused = false;
  let auraBoost = false;

  function resize3D() {
    if (!canvas || !ctx) return;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize3D();
  window.addEventListener("resize", resize3D, { passive: true });

  const crescentPts = [];
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const a = 0.5 + (i / steps) * (Math.PI * 2 - 1.0);
    crescentPts.push({ x: Math.cos(a) * 190, y: Math.sin(a) * 190 });
  }
  for (let i = steps; i >= 0; i--) {
    const a = 0.66 + (i / steps) * (Math.PI * 2 - 1.32);
    crescentPts.push({ x: 58 + Math.cos(a) * 148, y: -8 + Math.sin(a) * 148 });
  }

  function makeRing(radius, tiltX, tiltY, count) {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const x = Math.cos(a) * radius;
      const y = Math.sin(a) * radius;
      const z = 0;
      const y1 = y * Math.cos(tiltX) - z * Math.sin(tiltX);
      const z1 = y * Math.sin(tiltX) + z * Math.cos(tiltX);
      const x2 = x * Math.cos(tiltY) + z1 * Math.sin(tiltY);
      const z2 = -x * Math.sin(tiltY) + z1 * Math.cos(tiltY);
      pts.push({ x: x2, y: y1, z: z2 });
    }
    return pts;
  }
  const ringA = makeRing(260, 1.08, 0.36, 80);
  const ringB = makeRing(312, -0.92, 0.58, 80);

  const pearls = Array.from({ length: 16 }, (_, i) => ({
    ang: (i / 16) * Math.PI * 2,
    rad: 215 + (i % 3) * 58,
    zAmp: 125 + (i % 4) * 35,
    size: 5.8 + (i % 3) * 3.6,
    speed: 0.22 + (i % 4) * 0.08,
    rose: i % 2 === 0,
  }));

  const petals3D = Array.from({ length: W < 640 ? 48 : 96 }, () => ({
    x: (Math.random() - 0.5) * 1500,
    y: (Math.random() - 0.5) * 980,
    z: (Math.random() - 0.5) * 720,
    vy: 0.34 + Math.random() * 0.58,
    vx: -0.25 - Math.random() * 0.38,
    rot: Math.random() * Math.PI * 2,
    vRot: (Math.random() - 0.5) * 0.02,
    size: 5.5 + Math.random() * 7.8,
    isGold: Math.random() < 0.34,
  }));
  const burstPetals = [];

  function triggerBurst() {
    for (let i = 0; i < 40; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 5.8;
      burstPetals.push({
        x: W * 0.5,
        y: H * 0.45,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 2.2,
        rot: Math.random() * 6,
        vRot: (Math.random() - 0.5) * 0.15,
        size: 7 + Math.random() * 8,
        life: 1,
        isGold: i % 3 === 0,
      });
    }
  }

  const hudPause = document.getElementById("hudPauseBtn");
  hudPause?.addEventListener("click", () => {
    paused = !paused;
    hudPause.textContent = paused ? "▶ پخش ۳بعدی" : "⏸ توقف ۳بعدی";
  });

  const hudAura = document.getElementById("hudAuraBtn");
  hudAura?.addEventListener("click", () => {
    auraBoost = !auraBoost;
    hudAura.classList.toggle("active", auraBoost);
    showToast(auraBoost ? "هاله سه‌بعدی کهکشانی فعال شد ✨" : "نورپردازی استاندارد سه‌بعدی فعال شد");
  });

  document.getElementById("hudBurstBtn")?.addEventListener("click", () => {
    triggerBurst();
    showToast("بارش شکوفه‌های ساکورا فعال شد ✦");
  });

  let mx = 0, my = 0, rx = 0, ry = 0, t = 0;
  window.addEventListener("pointermove", (e) => {
    mx = (e.clientX / W - 0.5) * 2;
    my = (e.clientY / H - 0.5) * 2;
  }, { passive: true });

  function rotate3D(p, ax, ay, az) {
    let x = p.x, y = p.y, z = p.z || 0;
    const cxz = Math.cos(az), sxz = Math.sin(az);
    const xz = x * cxz - y * sxz, yz = x * sxz + y * cxz;
    x = xz; y = yz;
    const cy = Math.cos(ay), sy = Math.sin(ay);
    const xy = x * cy + z * sy, zy = -x * sy + z * cy;
    x = xy; z = zy;
    const cx = Math.cos(ax), sx = Math.sin(ax);
    return { x, y: y * cx - z * sx, z: y * sx + z * cx };
  }

  function project(p, ox, oy, fov) {
    const depth = fov / (fov + p.z + 430);
    return { x: ox + p.x * depth, y: oy + p.y * depth, scale: depth, z: p.z };
  }

  function drawRingArc(pts, rotOff, ox, oy, fov, color, w, frontOnly) {
    const proj = pts.map((pt) => project(rotate3D(pt, rx, ry + rotOff, t * 0.16), ox, oy, fov));
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.lineCap = "round";
    for (let i = 0; i < proj.length; i++) {
      const a = proj[i], b = proj[(i + 1) % proj.length], avgZ = (a.z + b.z) * 0.5;
      if ((frontOnly && avgZ >= 0) || (!frontOnly && avgZ < 0)) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawPetal(px, py, sz, rot, alpha, isGold, isLight) {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(rot);
    ctx.globalAlpha = alpha;
    if (isGold) {
      ctx.fillStyle = isLight ? "#c8963e" : "#f6e0aa";
      ctx.beginPath();
      ctx.arc(0, 0, sz * 0.38, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const g = ctx.createLinearGradient(0, -sz, 0, sz);
      g.addColorStop(0, "#fff0f7");
      g.addColorStop(1, isLight ? "#e65c96" : "#f585b8");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, sz * 0.85);
      ctx.bezierCurveTo(sz * 0.8, sz * 0.4, sz * 0.9, -sz * 0.45, sz * 0.24, -sz * 0.85);
      ctx.lineTo(0, -sz * 0.5);
      ctx.lineTo(-sz * 0.24, -sz * 0.85);
      ctx.bezierCurveTo(-sz * 0.9, -sz * 0.45, -sz * 0.8, sz * 0.4, 0, sz * 0.85);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function render3D() {
    if (!ctx) return;
    if (!document.hidden) {
      if (!paused) t += auraBoost ? 0.018 : 0.012;
      const isLight = currentTheme === "light";
      ctx.clearRect(0, 0, W, H);
      const scrollRatio = Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - H));
      ry += (mx * 0.55 + scrollRatio * 2.25 - ry) * 0.045;
      rx += (-my * 0.38 + scrollRatio * 0.44 - rx) * 0.045;

      const ox = W > 960 ? W * 0.24 : W * 0.5;
      const oy = (W > 960 ? H * 0.48 : H * 0.36) + Math.sin(t * 1.1) * 14 - scrollRatio * 90;
      const fov = 760;

      const auraRadius = auraBoost ? 460 : 345;
      const aura = ctx.createRadialGradient(ox, oy, 20, ox, oy, auraRadius);
      aura.addColorStop(0, isLight ? "rgba(255, 136, 188, 0.28)" : (auraBoost ? "rgba(242, 122, 176, 0.36)" : "rgba(242, 122, 176, 0.22)"));
      aura.addColorStop(0.5, isLight ? "rgba(218, 174, 92, 0.18)" : (auraBoost ? "rgba(246, 224, 170, 0.22)" : "rgba(214, 174, 96, 0.12)"));
      aura.addColorStop(1, "transparent");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(ox, oy, auraRadius, 0, Math.PI * 2);
      ctx.fill();

      drawRingArc(ringB, -t * 0.22, ox, oy, fov, isLight ? "rgba(186,134,48,0.34)" : "rgba(246,224,170,0.3)", 1.5, false);
      drawRingArc(ringA, t * 0.3, ox, oy, fov, isLight ? "rgba(222,74,140,0.34)" : "rgba(242,122,176,0.38)", 2.2, false);

      const sliceCount = 8;
      for (let s = 0; s < sliceCount; s++) {
        const zOff = (s - (sliceCount - 1) / 2) * 4.8;
        const isFront = s === sliceCount - 1;
        ctx.beginPath();
        crescentPts.forEach((pt, idx) => {
          const pr = project(rotate3D({ x: pt.x, y: pt.y, z: zOff }, rx, ry + Math.sin(t * 0.7) * 0.24, -0.22), ox, oy, fov);
          if (idx === 0) ctx.moveTo(pr.x, pr.y);
          else ctx.lineTo(pr.x, pr.y);
        });
        ctx.closePath();
        if (isFront) {
          const grad = ctx.createLinearGradient(ox - 165, oy - 165, ox + 155, oy + 155);
          grad.addColorStop(0, "#fff2c6");
          grad.addColorStop(0.38, "#ddb25c");
          grad.addColorStop(0.75, "#9c7026");
          grad.addColorStop(1, "#f2cf82");
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.strokeStyle = "rgba(255,248,224,0.78)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(138,96,32," + (0.26 + s * 0.08).toFixed(2) + ")";
          ctx.fill();
        }
      }

      drawRingArc(ringB, -t * 0.22, ox, oy, fov, isLight ? "rgba(186,134,48,0.45)" : "rgba(246,224,170,0.42)", 1.7, true);
      drawRingArc(ringA, t * 0.3, ox, oy, fov, isLight ? "rgba(222,74,140,0.46)" : "rgba(242,122,176,0.52)", 2.5, true);

      const starC = project(rotate3D({ x: 84, y: -78, z: 28 }, rx, ry + Math.sin(t * 0.7) * 0.24, -0.22), ox, oy, fov);
      const sp = (24 + Math.sin(t * 3.2) * 4.5) * starC.scale;
      ctx.save();
      ctx.translate(starC.x, starC.y);
      ctx.rotate(t * 0.65);
      const sg = ctx.createRadialGradient(0, 0, 1, 0, 0, sp);
      sg.addColorStop(0, "#fff");
      sg.addColorStop(0.45, "#f6e0aa");
      sg.addColorStop(1, "rgba(242,122,176,0)");
      ctx.fillStyle = sg;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const rad = i % 2 === 0 ? sp : sp * 0.26;
        const a = (i * Math.PI) / 4;
        if (i === 0) ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
        else ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      pearls.forEach((p) => {
        if (!paused) p.ang += 0.006 * p.speed;
        const pr = project(rotate3D({ x: Math.cos(p.ang) * p.rad, y: Math.sin(p.ang) * p.rad * 0.72, z: Math.sin(p.ang * 2) * p.zAmp }, rx, ry, 0), ox, oy, fov);
        const r = Math.max(2, p.size * pr.scale);
        const pg = ctx.createRadialGradient(pr.x - r * 0.3, pr.y - r * 0.3, r * 0.1, pr.x, pr.y, r);
        if (p.rose) {
          pg.addColorStop(0, "#fff0f7");
          pg.addColorStop(0.5, "#f27ab0");
          pg.addColorStop(1, "rgba(180,44,106,0.25)");
        } else {
          pg.addColorStop(0, "#fff8e0");
          pg.addColorStop(0.5, "#d9b060");
          pg.addColorStop(1, "rgba(130,88,24,0.25)");
        }
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      petals3D.forEach((pt) => {
        if (!paused) {
          pt.y += pt.vy;
          pt.x += pt.vx + Math.sin(t + pt.rot) * 0.28;
          pt.rot += pt.vRot;
          if (pt.y > 540) { pt.y = -520; pt.x = (Math.random() - 0.5) * 1450; }
          if (pt.x < -780) pt.x = 780;
        }
        const pr = project({ x: pt.x + mx * 45, y: pt.y + my * 35, z: pt.z }, W * 0.5, H * 0.5, 680);
        if (pr.scale <= 0.1) return;
        drawPetal(pr.x, pr.y, pt.size * pr.scale, pt.rot, Math.min(0.84, pr.scale * (isLight ? 0.58 : 0.72)), pt.isGold, isLight);
      });

      for (let i = burstPetals.length - 1; i >= 0; i--) {
        const b = burstPetals[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.04;
        b.rot += b.vRot;
        b.life -= 0.012;
        if (b.life <= 0) { burstPetals.splice(i, 1); continue; }
        drawPetal(b.x, b.y, b.size, b.rot, b.life, b.isGold, isLight);
      }
    }
    if (!reduced) requestAnimationFrame(render3D);
  }
  render3D();
})();
