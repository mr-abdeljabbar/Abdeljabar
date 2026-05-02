import { Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';
import { Facebook, Instagram, X, Linkedin, Github, MessageCircle } from 'lucide-react';

const FiverrIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.107 6.429h-3.214V5.357c0-.286.214-.536.535-.536h2.679V1.071h-2.679c-2.357 0-4.286 1.929-4.286 4.286V6.43H7.464V10.71h2.679v12.214h4.286V10.71h3.75l.535-4.286zM6.429 10.714H1.071v4.286h5.358v-4.286z" />
  </svg>
);

const WA_LINK =
  'https://wa.me/212700789623?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%2C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D9%84%D9%85%D9%88%D9%82%D8%B9%20%D9%88%D9%8A%D8%A8%20%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A';

const PORTFOLIO = [
  {
    src: '/images/centre-alilham.png',
    alt: 'Centre Al Ilham',
    title: 'Centre Al Ilham',
    sub: 'مركز متخصص في التوليد وطب وجراحة النساء',
    href: 'https://centre-alilham.netlify.app/',
  },
  {
    src: '/images/lallastore.png',
    alt: 'Lalla Shop',
    title: 'Lalla Shop',
    sub: 'تجربة تسوق إلكتروني مميزة للنساء',
    href: 'https://lalla-store.netlify.app/',
  },
  {
    src: '/images/ladelice.png',
    alt: 'La Délice',
    title: 'La Délice',
    sub: 'نكهات شهية وتجربة ذوق لا تُنسى',
    href: 'https://ladelice.netlify.app/',
  },
  {
    src: '/images/englishschoolkelaa.png',
    alt: 'English School Kelaa',
    title: 'English School Kelaa',
    sub: 'تعلم اللغات بسهولة وبأسلوب عصري',
    href: 'https://englishschoolkelaa.netlify.app/',
  },
];

const PROBLEMS = [
  { icon: 'search_off', title: 'الناس كيقلبو عليك وما كيلقاوكش', desc: 'أكثر من 80% من المغاربة كيقلبو فـ Google قبل ما يشريو شي خدمة.' },
  { icon: 'trending_down', title: 'المنافسين سبقوك', desc: 'المنافس ديالك اللي عندو موقع كياخد الزبائن ديالك كل نهار بلا ما تعيق.' },
  { icon: 'payments', title: 'كتضيع فلوس فالاشهار', desc: 'إلى كدير Ads وما عندكش موقع كيحول الزوار لزبائن، راك غير كتضيع ميزانيتك.' },
  { icon: 'block', title: 'Instagram ما كافيش', desc: 'السوشل ميديا مزيانة، ولكن الموقع هو اللي كيعطي المصداقية والاحترافية.' },
];

const FEATURES = [
  { icon: 'bolt', title: 'سريع وخفيف', desc: 'المواقع ديالنا كتخدم بسرعة البرق، حيت عارفين باللي الزبون ما كيتسناش كثر من 3 ثواني.' },
  { icon: 'smartphone', title: 'خدام فالهاتف', desc: 'أغلبية المغاربة كيدخلو من التلفون، داكشي علاش كنركزو باش يكون الموقع مريح فالهاتف.' },
  { icon: 'verified_user', title: 'مهيأ لـ Google', desc: 'كنخدمو على الـ SEO باش تبان فـ النتائج الأولى ملي الناس يقلبو على الخدمات ديالك.' },
  { icon: 'groups', title: 'مصمم باش يحول الزائر لزبون', desc: 'ماشي غير ديكور، الموقع ديالنا فيه أزرار و واجهة كتحفز الناس يشريو أو يتواصلو معاك.' },
];

const PROCESS = [
  { n: '01', title: 'نفهمو المشروع', desc: 'كنديرو جلسة باش نعرفو أهدافك وشكون هما الزبائن ديالك.' },
  { n: '02', title: 'نصممو تجربة مميزة', desc: 'كنوجدو تصميم عصري كيركب مع الهوية ديالك.' },
  { n: '03', title: 'نطورو الموقع', desc: 'كنحولو التصميم لواقع باستخدام أحدث التقنيات.' },
  { n: '04', title: 'نطلقوه ونرافقوك', desc: 'كنطلقو الموقع للعموم وكنبقاو معاك فالمواكبة.' },
];

const TESTIMONIALS: { quote: ReactNode; initials: string; name: string; role: string }[] = [
  { quote: <>من نهار صاوبنا الموقع، تبدلات نظرة الزبائن لينا. المبيعات تزادو بنسبة <bdi>40%</bdi> والخدمة ولات ساهلة.</>, initials: 'ي.س', name: 'ياسين سيمو', role: 'صاحب مطعم بمراكش' },
  { quote: 'الاحترافية والسرعة فالتنفيذ هي اللي كتميزهم. الموقع جاب ليا زبائن مكنتش كنحلم نوصل ليهم غير بـ Instagram.', initials: 'ف.ز', name: 'فاطمة الزهراء', role: 'صاحبة مركز تجميل بالدار البيضاء' },
  { quote: 'كنصح أي واحد عندو مشروع باغي يكبرو يتواصل معاهم. هاد الناس عارفين اشنو كيديرو وكيفهمو السوق المغربي.', initials: 'ع.ر', name: 'عمر الراضي', role: 'مدير نادي رياضي بأكادير' },
];

const OFFER_ITEMS = [
  { icon: 'check_circle', title: 'استشارة مجانية', desc: 'نجلسو معاك ونحللو المشروع ديالك 100% فابور.', highlight: null },
  { icon: 'check_circle', title: 'تصميم احترافي', desc: 'موقع مخصص ليك ماشي غير قالب واجد.', highlight: null },
  { icon: 'check_circle', title: 'دعم متواصل', desc: 'فريقنا معاك فكل صغيرة وكبيرة حتى بعد الإطلاق.', highlight: null },
  { icon: 'stars', title: 'نعاونك تبان فـ Google', desc: null, highlight: 'بونوس مجاني للمشاريع الـ 3 الأولى هاد الشهر.' },
];

export function ArabicLanding() {
  return (
    <>
      <Helmet>
        <title>Abdeljabar.com | تطوير مواقع احترافية للمشاريع المحلية</title>
        <meta name="description" content="نصممو مواقع احترافية للمشاريع المحلية بالمغرب تجلب الزبائن وتظهر في Google. استشارة مجانية دابا." />
      </Helmet>

      <div
        dir="rtl"
        className="min-h-screen overflow-x-hidden"
        style={{ backgroundColor: '#09090B', color: '#e5e1e4', fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <style>{`
          .ar-glass {
            background: rgba(24, 24, 27, 0.4);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .ar-glow:hover {
            box-shadow: 0 0 24px rgba(16, 185, 129, 0.35);
          }
          .ar-card-hover:hover .ar-blob {
            opacity: 1 !important;
          }
          @keyframes ar-ping {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .ar-pulse { animation: ar-ping 2s ease-in-out infinite; }
          .ar-img-zoom:hover img { transform: scale(1.08); }
          .ar-img-zoom img { transition: transform 0.5s ease; }
        `}</style>

        {/* ─── Navbar ─── */}
        <header
          className="fixed top-0 w-full z-50 backdrop-blur-xl"
          style={{ backgroundColor: 'rgba(9,9,11,0.85)', borderBottom: '1px solid rgba(39,39,42,0.5)' }}
        >
          <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            {/* Logo — right side (dir=rtl: first child → right) */}
            <a href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center overflow-hidden p-1">
                <img src="/logo.png" alt="Abdeljabar Logo" className="w-full h-full object-cover" />
              </div>
              <span className="gradient-text font-bold text-lg hidden sm:inline">Abdeljabar.com</span>
            </a>
            {/* CTA — left side (dir=rtl: last child → left) */}
            <div className="flex items-center gap-3">
              <a
                href={WA_LINK}
                className="hidden md:flex px-4 py-2 rounded-lg bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all"
              >
                واتساب
              </a>
              <a
                href={WA_LINK}
                className="px-5 py-2 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#10b981', color: '#003824' }}
              >
                تواصل معنا
              </a>
            </div>
          </div>
        </header>

        {/* ─── Hero ─── */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 text-right">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border"
                style={{ backgroundColor: 'rgba(78,222,163,0.1)', color: '#4edea3', borderColor: 'rgba(78,222,163,0.2)' }}
              >
                خدمة موجهة خصيصاً للمشاريع المحلية بالمغرب
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                إلى شي واحد قلب عليك دابا… <br />
                <span className="gradient-text">واش غادي يلقاك؟</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-xl">
                كنعاونوا المشاريع المحلية يكون عندها موقع احترافي كيجلب الزبائن وكيخليها تبان فـ Google.
                ما تبقاش مخبي، خلي العالم يشوف اشنو كتقدم.
              </p>
              <div className="flex flex-wrap gap-4 justify-start">
                <a
                  href={WA_LINK}
                  className="px-8 py-4 font-bold rounded-xl text-lg ar-glow transition-all flex items-center gap-2"
                  style={{ backgroundColor: '#10b981', color: '#003824' }}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  <span>بغيت موقعي دابا</span>
                </a>
                <a
                  href={WA_LINK}
                  className="px-8 py-4 border border-zinc-700 text-white font-bold rounded-xl text-lg transition-all flex items-center gap-2 hover:border-emerald-400/50"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.107 1.518 5.83L.055 23.454a.5.5 0 0 0 .491.546c.06 0 .12-.011.177-.034l5.82-2.118A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.028-1.382l-.36-.213-3.733 1.357 1.302-3.624-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                  <span>تواصل معنا</span>
                </a>
              </div>
            </div>
            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-full opacity-50 group-hover:opacity-75 transition-opacity"
                style={{ background: 'linear-gradient(to right, rgba(78,222,163,0.2), transparent)', filter: 'blur(48px)' }}
              />
              <img
                src="/images/landingpage.png"
                alt="موقع احترافي على لابتوب"
                className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>
        </section>

        {/* ─── Problem ─── */}
        <section className="py-24 px-6" style={{ backgroundColor: '#0e0e10' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                بصراحة… بزاف ديال المشاريع كيتفوتهم{' '}
                <span className="text-red-400">فرص كبيرة</span>
              </h2>
              <p className="text-zinc-500 text-lg">العالم تبدل، واللي ما عندوش بلاصة فالويب كيتسما ما كاينش</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROBLEMS.map(({ icon, title, desc }) => (
                <div
                  key={icon}
                  className="ar-glass p-8 rounded-2xl"
                  style={{ borderRight: '4px solid rgba(248,113,113,0.5)' }}
                >
                  <span className="material-symbols-outlined text-5xl mb-4 block text-right" style={{ color: '#f87171' }}>{icon}</span>
                  <h3 className="font-bold text-xl mb-3">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-12 text-zinc-500 font-bold italic">وكل نهار كتخسر زبائن محتملين...</p>
          </div>
        </section>

        {/* ─── Solution / Services ─── */}
        <section className="py-24 px-6 relative overflow-hidden" id="services">
          <div
            className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full pointer-events-none opacity-5"
            style={{ backgroundColor: '#4edea3', filter: 'blur(120px)' }}
          />
          <div className="max-w-7xl mx-auto">
            <div className="text-right mb-16 max-w-2xl mr-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                موقع احترافي{' '}
                <span className="gradient-text">يخدم عليك 24/24</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                كنصممو ليك تجربة رقمية كتحول الزائر لزبون وفي، وكتخليك تركز على الخدمة ديالك.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {FEATURES.map(({ icon, title, desc }) => (
                <div
                  key={icon}
                  className="group relative p-10 rounded-3xl overflow-hidden ar-card-hover"
                  style={{ backgroundColor: '#18181B', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="ar-blob absolute top-0 right-0 w-32 h-32 transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(78,222,163,0.1)', filter: 'blur(48px)', opacity: 0.6 }}
                  />
                  <span className="material-symbols-outlined mb-6 block text-right" style={{ fontSize: '3rem', color: '#4edea3' }}>{icon}</span>
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Before / After ─── */}
        <section className="py-24 px-6" style={{ backgroundColor: '#0e0e10' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-16">
              الفرق قبل وبعد <span className="gradient-text">موقعنا</span>
            </h2>
            <div
              className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {/* Before */}
              <div className="p-10 relative" style={{ backgroundColor: 'rgba(39,39,42,0.5)' }}>
                <span
                  className="absolute top-4 right-4 px-3 py-1 rounded text-sm font-bold"
                  style={{ backgroundColor: 'rgba(248,113,113,0.2)', color: '#f87171' }}
                >قبل</span>
                <div className="space-y-6 mt-8">
                  {['مكانش عندك وجود فـ Google', 'الزبائن كيسولوك "فين نقدر نشوف خدمتك؟"', 'ثقة منخفضة في علامتك التجارية'].map(text => (
                    <div key={text} className="flex items-center gap-3 opacity-50">
                      <span className="material-symbols-outlined" style={{ color: '#f87171' }}>cancel</span>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* After */}
              <div
                className="p-10 relative"
                style={{ backgroundColor: 'rgba(78,222,163,0.08)', borderRight: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span
                  className="absolute top-4 right-4 px-3 py-1 rounded text-sm font-bold"
                  style={{ backgroundColor: 'rgba(78,222,163,0.2)', color: '#4edea3' }}
                >بعد</span>
                <div className="space-y-6 mt-8">
                  {['موقع كيبان فالصفحة الأولى', 'كتصيفط رابط الموقع بكل فخر', 'زبائن جدد كيتواصلو معاك يومياً'].map(text => (
                    <div key={text} className="flex items-center gap-3">
                      <span className="material-symbols-outlined" style={{ color: '#4edea3' }}>check_circle</span>
                      <p className="font-bold">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Portfolio ─── */}
        <section className="py-24 px-6" id="work">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-16">
              مشاريع <span className="gradient-text">وضعنا فيها بصمتنا</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PORTFOLIO.map(({ src, alt, title, sub, href }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-2xl ar-img-zoom block"
                  style={{ backgroundColor: '#18181B', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={src} alt={alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg mb-1">{title}</h4>
                      <p className="text-zinc-500 text-sm">{sub}</p>
                    </div>
                    <span className="material-symbols-outlined text-zinc-600 group-hover:text-emerald-400 transition-colors flex-shrink-0">open_in_new</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Process ─── */}
        <section className="py-24 px-6" style={{ backgroundColor: '#1c1b1d' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-20">
              كيفاش <span className="gradient-text">كنخدمو؟</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-12 relative">
              <div
                className="hidden md:block absolute top-12 left-0 w-full z-0"
                style={{ height: '2px', backgroundColor: '#27272a' }}
              />
              {PROCESS.map(({ n, title, desc }) => (
                <div key={n} className="relative z-10 text-center">
                  <div
                    className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: '#18181B',
                      border: '2px solid #10b981',
                      boxShadow: '0 0 24px rgba(16,185,129,0.3)',
                    }}
                  >
                    <span className="text-3xl font-bold">{n}</span>
                  </div>
                  <h4 className="font-bold text-xl mb-2">{title}</h4>
                  <p className="text-zinc-500 text-sm px-4 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-16">
              أراء <span className="gradient-text">الشركاء ديالنا</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TESTIMONIALS.map(({ quote, name }) => (
                <div key={name} className="ar-glass p-10 rounded-3xl relative">
                  <span
                    className="material-symbols-outlined absolute top-6 left-6"
                    style={{ fontSize: '5rem', color: 'rgba(78,222,163,0.15)' }}
                  >format_quote</span>
                  <p className="text-lg italic mb-8 relative z-10">"{quote}"</p>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(78,222,163,0.15)', color: '#4edea3' }}
                    >
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <h5 className="font-bold">{name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Offer ─── */}
        <section className="py-24 px-6" id="pricing">
          <div
            className="max-w-4xl mx-auto rounded-[3rem] p-px"
            style={{ background: 'linear-gradient(135deg, #10b981, #006c49)' }}
          >
            <div
              className="rounded-[calc(3rem-1px)] p-12 md:p-20 relative overflow-hidden"
              style={{ backgroundColor: '#09090B' }}
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none"
                style={{ backgroundColor: 'rgba(16,185,129,0.12)', filter: 'blur(48px)' }}
              />
              <div className="text-center relative z-10">
                <span
                  className="inline-block px-4 py-1 text-xs font-black rounded-full mb-6 ar-pulse"
                  style={{ backgroundColor: '#10b981', color: '#003824' }}
                >
                  LIMITED SPOTS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                  عرض خاص للمشاريع المحلية
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-right max-w-2xl mx-auto mb-12">
                  {OFFER_ITEMS.map(({ icon, title, desc, highlight }) => (
                    <div key={title} className="flex items-start gap-4">
                      <span className="material-symbols-outlined mt-1 flex-shrink-0" style={{ color: '#4edea3' }}>{icon}</span>
                      <div>
                        <h4 className="font-bold text-lg">{title}</h4>
                        {desc && <p className="text-zinc-500">{desc}</p>}
                        {highlight && <p className="font-bold" style={{ color: '#4edea3' }}>{highlight}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href={WA_LINK}
                  className="inline-block px-12 py-5 font-black text-xl rounded-2xl ar-glow transition-all"
                  style={{ backgroundColor: '#10b981', color: '#003824' }}
                >
                  احجز مقعدك الآن
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-32 px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-10">
              واش غادي تبقى فبلاصتك… <br /> ولا غادي تكبر مشروعك؟
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              <a
                href={WA_LINK}
                className="px-10 py-5 font-black text-xl rounded-2xl ar-glow transition-all flex items-center gap-3"
                style={{ backgroundColor: '#10b981', color: '#003824' }}
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                <span>نبدا دابا</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="border-t border-white/5 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center overflow-hidden p-0.5">
                  <img src="/logo.png" alt="Abdeljabar Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-zinc-400 text-sm text-center">© 2025 Abdeljabar.com · تصميم مواقع ويب احترافية بالمغرب 🇲🇦</span>
              </div>
              <div className="flex items-center gap-6">
                {[
                  { href: 'https://www.facebook.com/profile.php?id=61588393573891', icon: Facebook },
                  { href: 'https://www.instagram.com/go.abdeljabar', icon: Instagram },
                  { href: 'https://x.com/b_abdeljabbar', icon: X },
                  { href: 'https://www.linkedin.com/in/babdeljabbar', icon: Linkedin },
                  { href: 'https://github.com/mr-abdeljabbar', icon: Github },
                  { href: 'https://wa.me/212700789623', icon: MessageCircle },
                ].map(({ href, icon: Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-emerald-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
                <a href="https://www.fiverr.com/s/o8lvXz8" target="_blank" rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-emerald-400 transition-colors">
                  <FiverrIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* ─── Sticky WhatsApp ─── */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 left-8 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[100]"
          style={{ backgroundColor: '#25D366', color: 'white' }}
          aria-label="واتساب"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.107 1.518 5.83L.055 23.454a.5.5 0 0 0 .491.546c.06 0 .12-.011.177-.034l5.82-2.118A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.028-1.382l-.36-.213-3.733 1.357 1.302-3.624-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
