export default {
  common: {
    loading: 'جاري التحميل...',
    error: {
      title: 'حدث خطأ ما',
      tryAgain: 'حاول مرة أخرى',
      generic: 'حدث خطأ غير متوقع',
    },
    buttons: {
      save: 'حفظ',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      delete: 'حذف',
      continue: 'متابعة',
      retry: 'إعادة المحاولة',
    },
    search: {
      placeholder: 'بحث...',
    },
  },
  navigation: {
    home: 'الرئيسية',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
  },
  screens: {
    home: {
      title: 'مرحباً بك',
      subtitle: 'هذه الشاشة الرئيسية المخصصة لك',
    },
    profile: {
      title: 'ملفك الشخصي',
      subtitle: 'إدارة معلوماتك الشخصية',
    },
    settings: {
      title: 'الإعدادات',
      theme: 'إعدادات السمة',
      language: 'إعدادات اللغة',
    },
  },
  posts: {
    search: {
      placeholder: 'البحث في المنشورات...',
    },
    empty: {
      title: 'لا توجد منشورات',
    },
    actions: {
      favorite: 'تبديل المفضلة',
      delete: 'حذف المنشور',
      sort: 'ترتيب المنشورات',
    },
    errors: {
      fetch: 'فشل في جلب المنشورات',
      delete: 'فشل في حذف المنشور',
      retry: 'حاول مرة أخرى',
    },
  },
  theme: {
    title: 'عرض السمة',
    light: '☀️ الوضع النهاري',
    dark: '🌙 الوضع الليلي',
    system: 'سمة النظام',
    colors: {
      title: 'الألوان',
      primary: 'الأساسي',
      secondary: 'الثانوي',
      error: 'الخطأ',
      success: 'النجاح',
      warning: 'التحذير',
    },
    typography: {
      title: 'الخطوط',
      xxxl: 'نص كبير جداً جداً ({{size}} بكسل)',
      xxl: 'نص كبير جداً ({{size}} بكسل)',
      xl: 'نص كبير ({{size}} بكسل)',
      lg: 'نص كبير ({{size}} بكسل)',
      md: 'نص متوسط ({{size}} بكسل)',
      sm: 'نص صغير ({{size}} بكسل)',
      xs: 'نص صغير جداً ({{size}} بكسل)',
    },
    surfaces: {
      title: 'الأسطح',
      paper: 'سطح ورقي',
      elevated: 'سطح مرتفع',
    },
  },
  settings: {
    title: 'الإعدادات',
    language: {
      title: 'اللغة',
      english: 'English',
      arabic: 'العربية',
      restartTitle: 'إعادة التشغيل مطلوبة',
      restartMessage: 'يحتاج التطبيق إلى إعادة التشغيل لتغيير اتجاه التخطيط. هل تريد المتابعة؟',
    },
    theme: {
      title: 'السمة',
      description: 'اختر السمة المفضلة لديك',
    },
  },
  auth: {
    initializing: 'جاري تهيئة التطبيق...',
    login: {
      title: 'مرحباً بك مجدداً',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      submit: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      signup: 'إنشاء حساب',
      error: {
        invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        general: 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'البريد الإلكتروني غير صالح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordLength: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'
      }
    },
    signup: {
      title: 'إنشاء حساب',
      name: 'الاسم',
      namePlaceholder: 'أدخل اسمك',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
      submit: 'إنشاء حساب',
      haveAccount: 'لديك حساب بالفعل؟',
      login: 'تسجيل الدخول',
      error: {
        general: 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.',
        nameRequired: 'الاسم مطلوب',
        nameLength: 'يجب أن يكون الاسم حرفين على الأقل',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'البريد الإلكتروني غير صالح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordLength: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
        passwordsDoNotMatch: 'كلمات المرور غير متطابقة'
      }
    },
    logout: {
      title: 'تسجيل الخروج',
      confirm: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
      success: 'تم تسجيل الخروج بنجاح',
      cancel: 'إلغاء'
    }
  },
};
