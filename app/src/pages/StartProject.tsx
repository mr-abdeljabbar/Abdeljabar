import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, ChevronRight, ChevronLeft, Check, Star,
  ShieldCheck, Zap, Smartphone, Search, Clock, Send,
  Upload, Trophy, Target, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n';

export function StartProject() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const sp = t.startProject;

  const steps = [
    { id: 1, icon: Building2 },
    { id: 2, icon: Zap },
    { id: 3, icon: Globe },
    { id: 4, icon: Target },
    { id: 5, icon: Smartphone },
    { id: 6, icon: Clock },
  ];

  const whyItems = [
    { icon: Target, title: sp.whyItems[0].title, desc: sp.whyItems[0].desc },
    { icon: Search, title: sp.whyItems[1].title, desc: sp.whyItems[1].desc },
    { icon: Zap, title: sp.whyItems[2].title, desc: sp.whyItems[2].desc },
    { icon: Smartphone, title: sp.whyItems[3].title, desc: sp.whyItems[3].desc },
    { icon: ShieldCheck, title: sp.whyItems[4].title, desc: sp.whyItems[4].desc },
  ];

  const [formData, setFormData] = useState<{
    businessName: string; businessCategory: string; address: string; serviceAreas: string;
    phone: string; whatsapp: string; email: string; businessHours: string; emergencyServices: string;
    mainServices: string; serviceDescription: string; yearsInBusiness: string; certifications: string;
    guarantees: string; googleRating: string; reviewCount: string;
    logoDesign: string; brandColors: string;
    mainGoal: string; targetCity: string; keywords: string; competitors: string;
    hasDomain: string; hasHosting: string; hasGMB: string; socialLinks: string;
    budget: string; launchDate: string; notes: string;
  }>({
    businessName: '', businessCategory: '', address: '', serviceAreas: '',
    phone: '', whatsapp: '', email: '', businessHours: '', emergencyServices: 'No',
    mainServices: '', serviceDescription: '', yearsInBusiness: '', certifications: '',
    guarantees: '', googleRating: '', reviewCount: '',
    logoDesign: 'No', brandColors: '',
    mainGoal: sp.goals[0], targetCity: '', keywords: '', competitors: '',
    hasDomain: 'No', hasHosting: 'No', hasGMB: 'No', socialLinks: '',
    budget: sp.budgetOptions[1], launchDate: '', notes: '',
  });

  const updateFormData = (fields: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const validateStep = (step: number) => {
    setError(null);
    if (step === 1) {
      if (!formData.businessName || !formData.businessCategory || !formData.phone || !formData.email || !formData.address || !formData.serviceAreas) {
        setError(sp.requiredError); return false;
      }
    }
    if (step === 2 && !formData.mainServices) { setError(sp.servicesError); return false; }
    if (step === 6 && (!formData.budget || !formData.launchDate)) { setError(sp.budgetError); return false; }
    return true;
  };

  const scrollToForm = () => window.scrollTo({ top: formRef.current?.offsetTop ? formRef.current.offsetTop - 100 : 0, behavior: 'smooth' });

  const nextStep = () => { if (currentStep < 6 && validateStep(currentStep)) { setCurrentStep(p => p + 1); scrollToForm(); } };
  const prevStep = () => { if (currentStep > 1) { setCurrentStep(p => p - 1); scrollToForm(); } };

  const sendTelegramNotification = async (data: typeof formData) => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (!token || !chatId) return;
    const ref = `ADJ-${Date.now().toString().slice(-6)}`;
    const text = [
      `🚀 *New Project Request — ${ref}*`,
      ``,
      `🏢 *Business:* ${data.businessName}`,
      `🏷 *Category:* ${data.businessCategory}`,
      `📍 *Address:* ${data.address || 'N/A'}`,
      `🌍 *Service Areas:* ${data.serviceAreas || 'N/A'}`,
      ``,
      `📞 *Phone:* ${data.phone}`,
      `💬 *WhatsApp:* ${data.whatsapp || data.phone}`,
      `📧 *Email:* ${data.email}`,
      ``,
      `🛠 *Services:* ${data.mainServices}`,
      `🎯 *Goal:* ${data.mainGoal}`,
      `📅 *Launch Date:* ${data.launchDate || 'TBD'}`,
      `💰 *Budget:* ${data.budget}`,
      ``,
      `🌐 *Domain:* ${data.hasDomain}  |  🖥 *Hosting:* ${data.hasHosting}  |  📌 *GMB:* ${data.hasGMB}`,
      ``,
      `📝 *Notes:* ${data.notes || 'None'}`,
      ``,
      `⏰ ${new Date().toLocaleString('fr-MA', { timeZone: 'Africa/Casablanca' })}`,
    ].join('\n');
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    }).catch(() => { /* silent fail — don't block UX */ });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    if (currentStep < 6) { nextStep(); return; }
    setIsSubmitting(true); setError(null);
    const summaryText = `BUSINESS: ${formData.businessName} | ${formData.businessCategory}\nCONTACT: ${formData.phone} | ${formData.email}\nSERVICES: ${formData.mainServices}\nBUDGET: ${formData.budget}\nLAUNCH: ${formData.launchDate}\nNOTES: ${formData.notes || 'N/A'}`.trim();
    const payload = { ...formData, message: summaryText, access_key: '2a8abf95-8065-49e0-9e03-a879c2b8fe0a', subject: `New Project Request: ${formData.businessName}`, from_name: 'Abdeljabar Agency - Start Project Form' };
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) });
      const result = await res.json();
      if (result.success) {
        await sendTelegramNotification(formData);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else setError(result.message || sp.requiredError);
    } catch { setError(sp.requiredError); }
    finally { setIsSubmitting(false); }
  };

  const downloadSummary = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentW = pageW - margin * 2;
    const ref = `ADJ-${Date.now().toString().slice(-6)}`;
    const dateStr = new Date().toLocaleDateString('fr-MA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // ── Header bar ──────────────────────────────────────────────────────────
    doc.setFillColor(5, 150, 105); // emerald-600
    doc.rect(0, 0, pageW, 32, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('ABDELJABAR AGENCY', margin, 14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('CONFIDENTIAL PROJECT PROPOSAL & INTAKE SUMMARY', margin, 22);
    doc.setFontSize(8);
    doc.text(`REF: ${ref}`, pageW - margin, 14, { align: 'right' });
    doc.text(dateStr, pageW - margin, 22, { align: 'right' });

    // ── Section helper ───────────────────────────────────────────────────────
    let y = 44;
    const sectionTitle = (title: string) => {
      doc.setFillColor(236, 253, 245);
      doc.roundedRect(margin, y, contentW, 8, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(6, 78, 59);
      doc.text(title, margin + 3, y + 5.5);
      y += 13;
    };
    const row = (label: string, value: string) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      doc.text(label, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(17, 24, 39);
      const lines = doc.splitTextToSize(value || 'N/A', contentW - 55);
      doc.text(lines, margin + 55, y);
      doc.setDrawColor(243, 244, 246);
      doc.line(margin, y + 3, margin + contentW, y + 3);
      y += Math.max(7, lines.length * 5);
    };

    // ── 1. Business Profile ──────────────────────────────────────────────────
    sectionTitle('1. Business Profile');
    row('Business Name', formData.businessName);
    row('Industry / Category', formData.businessCategory);
    row('Address', formData.address);
    row('Service Areas', formData.serviceAreas);
    row('Years in Business', formData.yearsInBusiness || 'New');
    row('Certifications', formData.certifications || 'N/A');
    y += 4;

    // ── 2. Contact Details ───────────────────────────────────────────────────
    sectionTitle('2. Contact Details');
    row('Phone', formData.phone);
    row('WhatsApp', formData.whatsapp || formData.phone);
    row('Email', formData.email);
    row('Business Hours', formData.businessHours || 'N/A');
    y += 4;

    // ── 3. Services & Goals ──────────────────────────────────────────────────
    sectionTitle('3. Services & Goals');
    row('Main Services', formData.mainServices);
    row('Service Description', formData.serviceDescription || 'N/A');
    row('Website Goal', formData.mainGoal);
    row('Target City / Keywords', `${formData.targetCity || 'N/A'} — ${formData.keywords || 'N/A'}`);
    y += 4;

    // ── 4. Infrastructure & Budget ───────────────────────────────────────────
    sectionTitle('4. Infrastructure & Budget');
    row('Domain Registered', formData.hasDomain);
    row('Hosting Ready', formData.hasHosting);
    row('Google My Business', formData.hasGMB);
    row('Budget', formData.budget);
    row('Target Launch Date', formData.launchDate || 'TBD');
    y += 4;

    // ── 5. Additional Notes ──────────────────────────────────────────────────
    sectionTitle('5. Additional Notes');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(55, 65, 81);
    const noteLines = doc.splitTextToSize(formData.notes || 'No additional notes provided.', contentW - 6);
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, y - 2, contentW, noteLines.length * 5 + 6, 2, 2, 'F');
    doc.text(noteLines, margin + 3, y + 3);
    y += noteLines.length * 5 + 12;

    // ── Footer ───────────────────────────────────────────────────────────────
    const footerY = doc.internal.pageSize.getHeight() - 18;
    doc.setDrawColor(5, 150, 105);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 2, margin + contentW, footerY - 2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('abdeljabar.com', margin, footerY + 4);
    doc.text('owner@abdeljabar.com', pageW / 2, footerY + 4, { align: 'center' });
    doc.text('+212 700 789 623', pageW - margin, footerY + 4, { align: 'right' });
    doc.setFontSize(7);
    doc.text(`© ${new Date().getFullYear()} Abdeljabar Agency. All rights reserved.`, pageW / 2, footerY + 10, { align: 'center' });

    const filename = `Project_Summary_${formData.businessName.replace(/\s+/g, '_')}_${ref}.pdf`;
    doc.save(filename);

    // Send PDF copy to Telegram
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (token && chatId) {
      const pdfBlob = doc.output('blob');
      const form = new FormData();
      form.append('chat_id', chatId);
      form.append('document', pdfBlob, filename);
      form.append('caption', `📄 Project Summary — ${formData.businessName} (${ref})`);
      fetch(`https://api.telegram.org/bot${token}/sendDocument`, { method: 'POST', body: form })
        .catch(() => { /* silent fail */ });
    }
  };

  // ── Success State ──────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{sp.successTitle}</h1>
          <p className="text-zinc-400 text-lg mb-8">{sp.successMsg}</p>
          <div className="bg-zinc-800/30 border border-white/5 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">{sp.nextStep}</h3>
            <p className="text-zinc-300 text-sm mb-4">{sp.downloadNote}</p>
            <Button onClick={downloadSummary} variant="outline"
              className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 gap-2 h-12 rounded-xl">
              <Upload className="w-4 h-4 rotate-180" />{sp.downloadBtn}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = '/'}
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8 h-12 rounded-full">
              {sp.backHome}
            </Button>
            <Button onClick={() => window.location.href = '/projects'} variant="outline"
              className="border-white/10 text-zinc-300 px-8 h-12 rounded-full">
              {sp.viewProjects}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Helmet>
        <title>Démarrer un Projet Web | Abdeljabar – Création de Sites au Maroc</title>
        <meta name="description" content="Lancez votre projet de site web professionnel au Maroc. Remplissez notre formulaire pour recevoir un devis personnalisé en moins de 24h. Restaurants, hôtels, boutiques, cabinets médicaux." />
        <link rel="alternate" hrefLang="fr" href="https://abdeljabar.com/fr/start-project" />
        <link rel="alternate" hrefLang="ar" href="https://abdeljabar.com/ar/start-project" />
        <link rel="alternate" hrefLang="en" href="https://abdeljabar.com/en/start-project" />
        <link rel="alternate" hrefLang="x-default" href="https://abdeljabar.com/start-project" />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-emerald-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
              {sp.badge}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              {sp.heroTitle1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{sp.heroTitleGrad}</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">{sp.heroDesc}</p>
            <Button size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-10 h-14 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              {sp.heroBtn} <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 border-y border-white/5 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {whyItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                  <item.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section ref={formRef} className="py-24 px-4 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-emerald-400 uppercase tracking-widest">{sp.progress} {Math.round((currentStep / 6) * 100)}%</span>
              <span className="text-sm text-zinc-500">{sp.stepOf(currentStep)}</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                initial={{ width: 0 }} animate={{ width: `${(currentStep / 6) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>

          {/* Step Pills */}
          <div className="flex flex-wrap gap-4 mb-10 justify-center">
            {steps.map((s, idx) => (
              <div key={s.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${currentStep === s.id ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : currentStep > s.id ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-zinc-900/50 border-white/5 text-zinc-500'}`}>
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{sp.stepLabels[idx]}</span>
                {currentStep > s.id && <Check className="w-4 h-4" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (currentStep < 6) nextStep(); } }}
            className="space-y-8">
            <AnimatePresence mode="wait">

              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.businessName}</label>
                      <Input placeholder={sp.businessNamePh} value={formData.businessName} onChange={e => updateFormData({ businessName: e.target.value })} required className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.businessCategory}</label>
                      <Input placeholder={sp.businessCategoryPh} value={formData.businessCategory} onChange={e => updateFormData({ businessCategory: e.target.value })} required className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.address}</label>
                      <Input placeholder={sp.addressPh} value={formData.address} onChange={e => updateFormData({ address: e.target.value })} required className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.serviceAreas}</label>
                      <Input placeholder={sp.serviceAreasPh} value={formData.serviceAreas} onChange={e => updateFormData({ serviceAreas: e.target.value })} required className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.phone}</label>
                      <Input placeholder="+212 6XX XXX XXX" type="tel" value={formData.phone} onChange={e => updateFormData({ phone: e.target.value })} required className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.whatsapp}</label>
                      <Input placeholder="+212 6XX XXX XXX" value={formData.whatsapp} onChange={e => updateFormData({ whatsapp: e.target.value })} className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.email}</label>
                      <Input placeholder="owner@business.com" type="email" value={formData.email} onChange={e => updateFormData({ email: e.target.value })} required className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">{sp.mainServices}</label>
                    <Textarea placeholder={sp.mainServicesPh} value={formData.mainServices} onChange={e => updateFormData({ mainServices: e.target.value })} required className="bg-zinc-800/50 border-white/10 focus:border-blue-500 min-h-[100px] rounded-xl" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.yearsInBusiness}</label>
                      <Input placeholder={sp.yearsInBusinessPh} value={formData.yearsInBusiness} onChange={e => updateFormData({ yearsInBusiness: e.target.value })} className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.googleRating}</label>
                      <Input placeholder={sp.googleRatingPh} value={formData.googleRating} onChange={e => updateFormData({ googleRating: e.target.value })} className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 col-span-2">
                      <p className="text-zinc-400 text-center py-8 border border-white/5 bg-zinc-950/30 rounded-2xl">{sp.brandingNote}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.hasLogo}</label>
                      <select required
                        className="w-full bg-zinc-800/50 border border-white/10 h-12 rounded-xl px-4 text-zinc-300 outline-none focus:border-emerald-500"
                        value={formData.logoDesign === 'Yes' ? 'No' : 'Yes'}
                        onChange={e => updateFormData({ logoDesign: e.target.value === 'No' ? 'Yes' : 'No' })}>
                        <option value="Yes">{sp.hasLogoYes}</option>
                        <option value="No">{sp.hasLogoNo}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.brandColors}</label>
                      <Input placeholder={sp.brandColorsPh} value={formData.brandColors} onChange={e => updateFormData({ brandColors: e.target.value })} className="bg-zinc-800/50 border-white/10 focus:border-emerald-500 h-12 rounded-xl" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4 */}
              {currentStep === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">{sp.mainGoal}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {sp.goals.map(goal => (
                        <div key={goal} onClick={() => updateFormData({ mainGoal: goal })}
                          className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${formData.mainGoal === goal ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-zinc-800/50 border-white/10 text-zinc-400 hover:border-white/20'}`}>
                          <span className="text-xs font-bold uppercase">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm">{sp.goalNote}</p>
                </motion.div>
              )}

              {/* Step 5 */}
              {currentStep === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { label: sp.hasDomain, key: 'hasDomain' as const },
                      { label: sp.hasHosting, key: 'hasHosting' as const },
                      { label: sp.hasGMB, key: 'hasGMB' as const },
                    ].map(({ label, key }) => (
                      <div key={key} className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">{label}</label>
                        <select className="w-full bg-zinc-800/50 border border-white/10 h-12 rounded-xl px-4 text-zinc-300 outline-none focus:border-blue-500"
                          value={formData[key]} onChange={e => updateFormData({ [key]: e.target.value })}>
                          <option value="No">{sp.noOption}</option>
                          <option value="Yes">{sp.yesOption}</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 6 */}
              {currentStep === 6 && (
                <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.budget}</label>
                      <select required className="w-full bg-zinc-800/50 border border-white/10 h-12 rounded-xl px-4 text-zinc-300 outline-none focus:border-emerald-500"
                        value={formData.budget} onChange={e => updateFormData({ budget: e.target.value })}>
                        <option value="">{sp.budgetPh}</option>
                        {sp.budgetOptions.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">{sp.launchDate}</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        <Input type="date" required value={formData.launchDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => updateFormData({ launchDate: e.target.value })}
                          className="bg-zinc-800/50 border-white/10 focus:border-emerald-500 h-12 rounded-xl text-zinc-300 pl-10" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">{sp.notes}</label>
                    <Textarea placeholder={sp.notesPh} value={formData.notes} onChange={e => updateFormData({ notes: e.target.value })} className="bg-zinc-800/50 border-white/10 focus:border-blue-500 min-h-[100px] rounded-xl" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex flex-col gap-4 pt-6">
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                  {error}
                </motion.div>
              )}
              <div className="flex justify-between items-center">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1 || isSubmitting}
                  className="border-white/10 hover:bg-white/5 text-zinc-400 px-8 h-12 rounded-full disabled:opacity-0 font-medium">
                  <ChevronLeft className="mr-2 w-5 h-5" />{sp.prev}
                </Button>
                {currentStep < 6 ? (
                  <Button type="button" onClick={nextStep}
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-10 h-12 rounded-full shadow-lg shadow-emerald-500/20 font-bold transition-all hover:scale-105">
                    {sp.next} <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-12 h-12 rounded-full shadow-lg font-bold transition-all hover:scale-105 disabled:opacity-50 min-w-[200px]">
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                        {sp.sending}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {sp.submit} <Send className="ml-2 w-5 h-5" />
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Trust */}
      <section className="py-24 bg-zinc-900/40 relative border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{sp.trustBadge}</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-16 underline decoration-emerald-500/30">{sp.trustTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sp.testimonials.map((t, i) => (
              <div key={i} className="bg-zinc-950/50 p-8 rounded-3xl border border-white/5 flex flex-col items-center">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="text-zinc-400 italic mb-6">"{t.text}"</p>
                <span className="font-bold text-sm text-zinc-300">— {t.author}</span>
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-wrap justify-center gap-10 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2"><Trophy className="w-8 h-8" /><span className="font-bold">{sp.trustBadge}</span></div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-8 h-8" /><span className="font-bold">Google Partner</span></div>
            <div className="flex items-center gap-2"><Check className="w-8 h-8 border rounded-full p-1" /><span className="font-bold">5★</span></div>
          </div>
          <div className="mt-16 flex flex-col items-center gap-2 p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 max-w-md mx-auto">
            <Clock className="w-8 h-8 text-emerald-400 mb-2" />
            <span className="font-bold text-xl">{sp.guarantee}</span>
            <p className="text-sm text-zinc-400">{sp.guaranteeMsg}</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-8 sm:p-12 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{sp.finalCtaTitle}</h2>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto text-lg">{sp.finalCtaSub}</p>
              <div className="flex justify-center">
                <Button size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-lg h-14 px-10 gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                  {sp.finalCtaBtn} <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
