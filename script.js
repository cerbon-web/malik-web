// Simple i18n switching for the small site
const translations = {
  ar: {
    title: 'مالك — موقع شخصي',
    heading: 'مرحبا، أنا مالك',
    subtitle: 'طفل أحب البرمجة وأسعى لتعلّم الأمن السيبراني الأخلاقي',
    about_title: 'من أنا',
    about: 'أنا طالب عمري 12 سنة وأحب تعلم البرمجة. أدرس في مدرسة إرشاد الرحمن (SMP) في مدينة Cirebon. أحب القرآن والحديث وأتبع طريقة السنة النبوية مع الصحابة. أسعى لأن أكون ابنًا محبًا لعائلتي، خاصة أمي، أبي، وكل أخواتي. أريد أن أستخدم معرفتي لخدمة الإسلام ومساعدة الناس.',
    interests_title: 'اهتماماتي',
    interest_programming: 'البرمجة وتعلم لغات جديدة',
    interest_cyber: 'الأمن السيبراني الأخلاقي وحماية الأنظمة',
    interest_religion: 'القرآن، الحديث، والسلوك على طريق السنة',
    school_title: 'مدرستي',
    school: 'أدرس في مدرسة Irshadurrahman SMP في مدينة Cirebon.',
    footer: 'موقعي الصغير — أحب عائلتي وأسعى لخدمة الإسلام'
  },
  id: {
    title: 'Malik — Situs Pribadi',
    heading: 'Halo, aku Malik',
    subtitle: 'Anak berusia 12 tahun yang suka belajar pemrograman dan keamanan siber secara etis',
    about_title: 'Tentang Saya',
    about: 'Saya berusia 12 tahun dan suka belajar pemrograman. Saya bersekolah di Irshadurrahman SMP di kota Cirebon. Saya menyukai Al-Qur\'an dan hadis, dan mengikuti jalan sunnah sesuai Nabi dan para sahabat. Saya berusaha menjadi anak yang mencintai keluarganya, khususnya ibu, ayah, dan semua saudara perempuanku. Saya ingin menggunakan ilmu untuk mengabdi kepada agama Islam dan membantu orang lain.',
    interests_title: 'Minat',
    interest_programming: 'Pemrograman dan mempelajari bahasa baru',
    interest_cyber: 'Keamanan siber etis dan perlindungan sistem',
    interest_religion: 'Al-Qur\'an, hadis, dan hidup di jalan sunnah',
    school_title: 'Sekolah',
    school: 'Saya bersekolah di Irshadurrahman SMP di Cirebon.',
    footer: 'Situs kecilku — Aku mencintai keluargaku dan ingin mengabdi kepada Islam'
  },
  en: {
    title: 'Malik — Personal Site',
    heading: "Hi, I'm Malik",
    subtitle: 'A 12-year-old who loves learning programming and wants to study ethical cybersecurity',
    about_title: 'About me',
    about: "I'm 12 years old and I love learning programming. I study at Irshadurrahman SMP school in Cirebon city. I love the Qur'an and Hadith, and follow the way of the Sunnah as the Prophet and his companions. I try to be a son who loves his family especially his mother, father, and all of his sisters. I want to use my knowledge to serve Islam and help people.",
    interests_title: 'Interests',
    interest_programming: 'Programming and learning new languages',
    interest_cyber: 'Ethical cybersecurity and protecting systems',
    interest_religion: 'Qur\'an, Hadith, and living by the Sunnah',
    school_title: 'School',
    school: 'I study at Irshadurrahman SMP in Cirebon.',
    footer: 'My small site — I love my family and want to serve Islam'
  }
};

function setLanguage(lang){
  const data = translations[lang] || translations.ar;
  document.documentElement.lang = lang === 'ar' ? 'ar' : (lang === 'id' ? 'id' : 'en');
  document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  // update title
  document.title = data.title;
  // update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(data[key]){
      el.textContent = data[key];
    }
  });
  // store preference
  try{ localStorage.setItem('site-lang', lang); }catch(e){}
}

// attach buttons
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>setLanguage(btn.getAttribute('data-lang')));
  });
  const saved = (localStorage.getItem('site-lang') || 'ar');
  setLanguage(saved);
});
