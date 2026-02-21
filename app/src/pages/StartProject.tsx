import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    ChevronRight,
    ChevronLeft,
    Check,
    Star,
    ShieldCheck,
    Zap,
    Smartphone,
    Search,
    Clock,
    Send,
    Upload,
    Trophy,
    Target,
    Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const steps = [
    { id: 1, title: 'Business', icon: Building2 },
    { id: 2, title: 'Services', icon: Zap },
    { id: 3, title: 'Branding', icon: Globe },
    { id: 4, title: 'Goals', icon: Target },
    { id: 5, title: 'Technical', icon: Smartphone },
    { id: 6, title: 'Launch', icon: Clock },
];

export function StartProject() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        // Step 1: Business
        businessName: '',
        businessCategory: '',
        address: '',
        serviceAreas: '',
        phone: '',
        whatsapp: '',
        email: '',
        businessHours: '',
        emergencyServices: 'No',

        // Step 2: Services
        mainServices: '',
        serviceDescription: '',
        yearsInBusiness: '',
        certifications: '',
        guarantees: '',
        googleRating: '',
        reviewCount: '',

        // Step 3: Branding
        logoDesign: 'No',
        brandColors: '',

        // Step 4: Goals
        mainGoal: 'Phone Calls',
        targetCity: '',
        keywords: '',
        competitors: '',

        // Step 5: Technical
        hasDomain: 'No',
        hasHosting: 'No',
        hasGMB: 'No',
        socialLinks: '',

        // Step 6: Budget & Timeline
        budget: '$2,000 - $5,000',
        launchDate: '',
        notes: ''
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateFormData = (fields: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const validateStep = (step: number) => {
        setError(null);
        switch (step) {
            case 1:
                if (!formData.businessName || !formData.businessCategory || !formData.phone || !formData.email || !formData.address || !formData.serviceAreas) {
                    setError('Please fill in all required fields marked with *');
                    return false;
                }
                return true;
            case 2:
                if (!formData.mainServices) {
                    setError('Please list your main services.');
                    return false;
                }
                return true;
            case 3:
                // Logo existence is required
                return true;
            case 6:
                if (!formData.budget || !formData.launchDate) {
                    setError('Please select a budget range and launch date.');
                    return false;
                }
                return true;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (currentStep < 6) {
            if (validateStep(currentStep)) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo({ top: formRef.current?.offsetTop ? formRef.current.offsetTop - 100 : 0, behavior: 'smooth' });
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: formRef.current?.offsetTop ? formRef.current.offsetTop - 100 : 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Final step validation
        if (!validateStep(currentStep)) return;

        // Safety check: Don't submit unless on the final step
        if (currentStep < 6) {
            nextStep();
            return;
        }

        setIsSubmitting(true);
        setError(null);

        // Format a clean summary for the email message
        const summaryText = `
🏠 1. BUSINESS PROFILE:
Business Name: ${formData.businessName}
Industry: ${formData.businessCategory}
Address: ${formData.address}
Service Areas: ${formData.serviceAreas}

📞 2. CONTACT INFO:
Phone: ${formData.phone}
WhatsApp: ${formData.whatsapp || 'Same as phone'}
Email: ${formData.email}
Hours: ${formData.businessHours}

🎯 3. SERVICES & GOALS:
Main Services: ${formData.mainServices}
Website Goal: ${formData.mainGoal}
Market Presence: ${formData.yearsInBusiness}
Already has Logo: ${formData.logoDesign === 'No' ? 'Yes' : 'No'}

🛠️ 4. TECHNICAL & BUDGET:
Has Domain: ${formData.hasDomain}
Has Hosting: ${formData.hasHosting}
Google Business Profile: ${formData.hasGMB}
Budget Projection: ${formData.budget}
Target Launch: ${formData.launchDate}

📝 5. SUPPLEMENTAL NOTES:
${formData.notes || 'No notes provided.'}
        `.trim();

        const payload = {
            ...formData,
            message: summaryText, // Web3Forms will display this neatly formatted block
            access_key: '2a8abf95-8065-49e0-9e03-a879c2b8fe0a',
            subject: `New Project Request: ${formData.businessName}`,
            from_name: 'Abdeljabar Agency - Start Project Form',
        };

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setError(result.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Failed to send request. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const downloadSummary = async () => {
        // Function to convert image to base64
        const getBase64Image = async (url: string): Promise<string> => {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (e) {
                console.error('Failed to convert image to base64', e);
                return '';
            }
        };

        let logoBase64 = '';
        try {
            logoBase64 = await getBase64Image('/logo-doc.png');
        } catch (e) {
            console.error('Failed to load logo for document', e);
        }

        const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
    <meta charset="utf-8">
    <title>Project Proposal - ${formData.businessName}</title>
    <style>
        @page { size: auto; margin: 1in; }
        body { font-family: 'Segoe UI', 'Calibri', 'Arial', sans-serif; color: #111827; line-height: 1.6; background: #ffffff; }
        .header { text-align: center; margin-bottom: 50px; border-bottom: 1px solid #e5e7eb; padding-bottom: 30px; }
        .logo { width: 180px; margin-bottom: 15px; }
        .agency-name { font-size: 26px; font-weight: bold; color: #064e3b; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
        .document-title { font-size: 14px; color: #6b7280; margin-top: 5px; font-weight: 500; }
        
        .main-content { max-width: 800px; margin: 0 auto; }
        
        h2 { color: #059669; border-bottom: 1px solid #d1fae5; padding-bottom: 8px; margin-top: 40px; font-size: 20px; font-weight: bold; }
        
        .grid-container { display: table; width: 100%; border-collapse: collapse; margin-top: 15px; }
        .field-row { display: table-row; }
        .label-cell { display: table-cell; font-weight: bold; color: #4b5563; padding: 6px 12px 6px 0; border-bottom: 1px solid #f3f4f6; width: 220px; font-size: 13px; }
        .value-cell { display: table-cell; color: #111827; padding: 6px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
        
        .notes-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-top: 15px; font-style: italic; color: #374151; }
        
        .footer { margin-top: 80px; padding-top: 30px; border-top: 2px solid #10b981; text-align: center; font-size: 11px; }
        .contact-grid { display: table; width: 100%; margin-top: 15px; }
        .contact-item { display: table-cell; width: 33%; text-align: center; }
        .contact-link { color: #059669; font-weight: bold; text-decoration: none; font-size: 13px; }
        .copyright { margin-top: 15px; color: #9ca3af; }
    </style>
</head>
<body>
    <div class="main-content">
        <div class="header">
            ${logoBase64 ? `<img src="${logoBase64}" class="logo">` : ''}
            <div class="agency-name">Abdeljabar Agency</div>
            <div class="document-title">CONFIDENTIAL PROJECT PROPOSAL & INTAKE SUMMARY</div>
        </div>

        <div class="meta" style="margin-bottom: 20px; text-align: right; color: #6b7280; font-size: 12px;">
            <div>REF: ADJ-${new Date().getTime().toString().slice(-6)}</div>
            <div>DATE: ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        <h2>1. Business Profile</h2>
        <div class="grid-container">
            <div class="field-row">
                <div class="label-cell">Business Legal Name</div>
                <div class="value-cell">${formData.businessName}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Industry Vertical</div>
                <div class="value-cell">${formData.businessCategory}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Primary Headquarters</div>
                <div class="value-cell">${formData.address || 'N/A'}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Strategic Service Clusters</div>
                <div class="value-cell">${formData.serviceAreas || 'N/A'}</div>
            </div>
        </div>

        <h2>2. Stakeholder Contact Details</h2>
        <div class="grid-container">
            <div class="field-row">
                <div class="label-cell">Primary Phone</div>
                <div class="value-cell">${formData.phone}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Verified WhatsApp</div>
                <div class="value-cell">${formData.whatsapp || formData.phone}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Decision Maker Email</div>
                <div class="value-cell">${formData.email}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Operating Hours</div>
                <div class="value-cell">${formData.businessHours || 'Standard Business Hours'}</div>
            </div>
        </div>

        <h2>3. Requirements & Strategic Goals</h2>
        <div class="grid-container">
            <div class="field-row">
                <div class="label-cell">Core Service Offerings</div>
                <div class="value-cell">${formData.mainServices}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Primary Conversion KPI</div>
                <div class="value-cell">${formData.mainGoal}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Market Presence</div>
                <div class="value-cell">${formData.yearsInBusiness || 'New Venture'}</div>
            </div>
        </div>

        <h2>4. Infrastructure & Financials</h2>
        <div class="grid-container">
            <div class="field-row">
                <div class="label-cell">Domain Registration</div>
                <div class="value-cell">${formData.hasDomain === 'Yes' ? 'Active' : 'Acquisition Required'}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Hosting Infrastructure</div>
                <div class="value-cell">${formData.hasHosting === 'Yes' ? 'Existing Environment' : 'Setup Required'}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Investment Projection</div>
                <div class="value-cell">${formData.budget}</div>
            </div>
            <div class="field-row">
                <div class="label-cell">Target Go-Live Date</div>
                <div class="value-cell">${formData.launchDate || 'To be determined'}</div>
            </div>
        </div>

        <h2>5. Strategic Consultation Notes</h2>
        <div class="notes-box">
            ${formData.notes || 'No supplemental notes provided during intake.'}
        </div>

        <div class="footer">
            <div style="font-weight: bold; margin-bottom: 10px; color: #064e3b; font-size: 14px;">Abdeljabar Agency Integration Desk</div>
            <div class="contact-grid">
                <div class="contact-item">
                    <a href="https://www.abdeljabar.com" class="contact-link">abdeljabar.com</a>
                </div>
                <div class="contact-item">
                    <a href="mailto:owner@abdeljabar.com" class="contact-link">owner@abdeljabar.com</a>
                </div>
                <div class="contact-item">
                    <span class="contact-link">+212 700 789 623</span>
                </div>
            </div>
            <div class="copyright">
                © ${new Date().getFullYear()} Abdeljabar. All rights reserved. | Proprietary and Confidential
            </div>
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Project_Summary_${formData.businessName.replace(/\s+/g, '_')}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 pt-24 pb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Check className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Project Submitted!</h1>
                    <p className="text-zinc-400 text-lg mb-8">
                        I've received your request. A detailed copy has been sent to my inbox, and I will contact you within 24 hours.
                    </p>

                    <div className="bg-zinc-800/30 border border-white/5 rounded-2xl p-6 mb-8 text-left">
                        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">Next Step for you:</h3>
                        <p className="text-zinc-300 text-sm mb-4">
                            You can download a summary of your project details below to keep for your records.
                        </p>
                        <Button
                            onClick={downloadSummary}
                            variant="outline"
                            className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 gap-2 h-12 rounded-xl"
                        >
                            <Upload className="w-4 h-4 rotate-180" />
                            Download Project Summary (.doc)
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => window.location.href = '/'}
                            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8 h-12 rounded-full"
                        >
                            Back to Home
                        </Button>
                        <Button
                            onClick={() => window.location.href = '/projects'}
                            variant="outline"
                            className="border-white/10 text-zinc-300 px-8 h-12 rounded-full"
                        >
                            View More Projects
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-emerald-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
                            Currently accepting new projects
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Professional Website</span> Project
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Tell us about your business and we'll build a powerful, conversion-focused website that generates more leads and grows your local presence.
                        </p>
                        <Button
                            size="lg"
                            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-10 h-14 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        >
                            Start My Project <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Why Work With Us */}
            <section className="py-24 border-y border-white/5 bg-zinc-900/20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {[
                            { icon: Target, title: 'Conversion Focused', desc: 'Designed to turn visitors into paying customers.' },
                            { icon: Search, title: 'Built for Local SEO', desc: 'Dominate local search results in your city.' },
                            { icon: Zap, title: 'Fast Delivery', desc: 'Your new business site live in weeks, not months.' },
                            { icon: Smartphone, title: 'Mobile Optimized', desc: 'Flawless experience on all devices & screens.' },
                            { icon: ShieldCheck, title: 'Built for Trust', desc: 'Professional design that builds customer confidence.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
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

            {/* Form Section */}
            <section ref={formRef} className="py-24 px-4 scroll-mt-24">
                <div className="max-w-4xl mx-auto">
                    {/* Progress Indicator */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-emerald-400 uppercase tracking-widest">Progress: {Math.round((currentStep / 6) * 100)}%</span>
                            <span className="text-sm text-zinc-500">Step {currentStep} of 6</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / 6) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-10 justify-center">
                        {steps.map((s) => (
                            <div
                                key={s.id}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${currentStep === s.id
                                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                                    : currentStep > s.id
                                        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500'
                                        : 'bg-zinc-900/50 border-white/5 text-zinc-500'
                                    }`}
                            >
                                <s.icon className="w-4 h-4" />
                                <span className="text-sm font-medium hidden sm:inline">{s.title}</span>
                                {currentStep > s.id && <Check className="w-4 h-4" />}
                            </div>
                        ))}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // Block Enter from submitting on step 6
                                if (currentStep === 6) {
                                    e.preventDefault();
                                    return;
                                }

                                // On other steps, try to go next if valid
                                e.preventDefault();
                                nextStep();
                            }
                        }}
                        className="space-y-8"
                    >
                        <AnimatePresence mode="wait">
                            {/* Step 1: Business Info */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Business Name *</label>
                                            <Input
                                                placeholder="e.g. Acme Plumbing Services"
                                                value={formData.businessName}
                                                onChange={e => updateFormData({ businessName: e.target.value })}
                                                required
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Business Category *</label>
                                            <Input
                                                placeholder="e.g. Plumbing & HVAC"
                                                value={formData.businessCategory}
                                                onChange={e => updateFormData({ businessCategory: e.target.value })}
                                                required
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-zinc-400">Full Business Address *</label>
                                            <Input
                                                placeholder="123 Business Way, City, State, ZIP"
                                                value={formData.address}
                                                onChange={e => updateFormData({ address: e.target.value })}
                                                required
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Service Areas *</label>
                                            <Input
                                                placeholder="e.g. Los Angeles, Orange County"
                                                value={formData.serviceAreas}
                                                onChange={e => updateFormData({ serviceAreas: e.target.value })}
                                                required
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Phone Number *</label>
                                            <Input
                                                placeholder="+1 (555) 000-0000"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={e => updateFormData({ phone: e.target.value })}
                                                required
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">WhatsApp Number</label>
                                            <Input
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.whatsapp}
                                                onChange={e => updateFormData({ whatsapp: e.target.value })}
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Email Address *</label>
                                            <Input
                                                placeholder="owner@business.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={e => updateFormData({ email: e.target.value })}
                                                required
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Services & Content */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">List your main services *</label>
                                        <Textarea
                                            placeholder="e.g. Residential Plumbing, Drain Cleaning, Water Heater Repair..."
                                            value={formData.mainServices}
                                            onChange={e => updateFormData({ mainServices: e.target.value })}
                                            required
                                            className="bg-zinc-800/50 border-white/10 focus:border-blue-500 min-h-[100px] rounded-xl"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Years in business</label>
                                            <Input
                                                placeholder="e.g. 10 years"
                                                value={formData.yearsInBusiness}
                                                onChange={e => updateFormData({ yearsInBusiness: e.target.value })}
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Google Rating / Review Count</label>
                                            <Input
                                                placeholder="e.g. 4.9 (150 reviews)"
                                                value={formData.googleRating}
                                                onChange={e => updateFormData({ googleRating: e.target.value })}
                                                className="bg-zinc-800/50 border-white/10 focus:border-blue-500 h-12 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Branding */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4 col-span-2">
                                            <p className="text-zinc-400 text-center py-8 border border-white/5 bg-zinc-950/30 rounded-2xl">
                                                Branding and assets can be shared after your initial consultation.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Do you already have a logo? *</label>
                                            <select
                                                required
                                                className="w-full bg-zinc-800/50 border border-white/10 h-12 rounded-xl px-4 text-zinc-300 outline-none focus:border-emerald-500"
                                                value={formData.logoDesign === 'Yes' ? 'No' : 'Yes'} // Inverting logic to match question "already have" vs "need design"
                                                onChange={e => updateFormData({ logoDesign: e.target.value === 'No' ? 'Yes' : 'No' })}
                                            >
                                                <option value="Yes">Yes, I have one</option>
                                                <option value="No">No, I need one</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Brand Colors (if any)</label>
                                            <Input
                                                placeholder="e.g. Blue and White"
                                                value={formData.brandColors}
                                                onChange={e => updateFormData({ brandColors: e.target.value })}
                                                className="bg-zinc-800/50 border-white/10 focus:border-emerald-500 h-12 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Goals */}
                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Main Website Goal</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {['Phone Calls', 'WhatsApp', 'Booking', 'Quote Request'].map(goal => (
                                                <div
                                                    key={goal}
                                                    onClick={() => updateFormData({ mainGoal: goal })}
                                                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${formData.mainGoal === goal
                                                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                                        : 'bg-zinc-800/50 border-white/10 text-zinc-400 hover:border-white/20'
                                                        }`}
                                                >
                                                    <span className="text-xs font-bold uppercase">{goal}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-zinc-400 text-sm">Select the primary action you want visitors to take on your new website.</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 5: Technical */}
                            {currentStep === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Have a Domain?</label>
                                            <select
                                                className="w-full bg-zinc-800/50 border border-white/10 h-12 rounded-xl px-4 text-zinc-300 outline-none focus:border-blue-500"
                                                value={formData.hasDomain}
                                                onChange={e => updateFormData({ hasDomain: e.target.value })}
                                            >
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Have Hosting?</label>
                                            <select
                                                className="w-full bg-zinc-800/50 border border-white/10 h-12 rounded-xl px-4 text-zinc-300 outline-none focus:border-blue-500"
                                                value={formData.hasHosting}
                                                onChange={e => updateFormData({ hasHosting: e.target.value })}
                                            >
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Google Business Prof.?</label>
                                            <select
                                                className="w-full bg-zinc-800/50 border border-white/10 h-12 rounded-xl px-4 text-zinc-300 outline-none focus:border-blue-500"
                                                value={formData.hasGMB}
                                                onChange={e => updateFormData({ hasGMB: e.target.value })}
                                            >
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 6: Budget & Timeline */}
                            {currentStep === 6 && (
                                <motion.div
                                    key="step6"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Estimated Budget *</label>
                                            <select
                                                required
                                                className="w-full bg-zinc-800/50 border border-white/10 h-12 rounded-xl px-4 text-zinc-300 outline-none focus:border-emerald-500"
                                                value={formData.budget}
                                                onChange={e => updateFormData({ budget: e.target.value })}
                                            >
                                                <option value="">Select a range</option>
                                                <option>Less than $1,000</option>
                                                <option>$1,000 - $2,000</option>
                                                <option>$2,000 - $5,000</option>
                                                <option>$5,000 - $10,000</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Desired Launch Date *</label>
                                            <Input
                                                type="date"
                                                required
                                                value={formData.launchDate}
                                                onChange={e => updateFormData({ launchDate: e.target.value })}
                                                className="bg-zinc-800/50 border-white/10 focus:border-emerald-500 h-12 rounded-xl text-zinc-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Additional Notes</label>
                                        <Textarea
                                            placeholder="Any specific requests or features you need?"
                                            value={formData.notes}
                                            onChange={e => updateFormData({ notes: e.target.value })}
                                            className="bg-zinc-800/50 border-white/10 focus:border-blue-500 min-h-[100px] rounded-xl"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col gap-4 pt-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="flex justify-between items-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 1 || isSubmitting}
                                    className="border-white/10 hover:bg-white/5 text-zinc-400 px-8 h-12 rounded-full disabled:opacity-0 transition-all font-medium"
                                >
                                    <ChevronLeft className="mr-2 w-5 h-5" /> Previous
                                </Button>

                                {currentStep < 6 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-10 h-12 rounded-full shadow-lg shadow-emerald-500/20 font-bold transition-all hover:scale-105"
                                    >
                                        Continue <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-12 h-12 rounded-full shadow-lg shadow-emerald-500/20 font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Submit Project Request <Send className="ml-2 w-5 h-5" />
                                            </div>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24 bg-zinc-900/40 relative border-t border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Trust & Reliability</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 underline decoration-emerald-500/30">Trusted by Local Businesses</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { text: "The best investment I've made for my roofing business. We get 3x more calls now.", author: "Mike R., Pro Roofing" },
                            { text: "Clean design and very easy to work with. Highly recommended for any local service.", author: "Dr. Sarah L., Smiles Dental" },
                            { text: "Fast, professional, and our site looks premium. Exactly what we needed.", author: "John D., Apex Insurance" },
                        ].map((t, i) => (
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
                        <div className="flex items-center gap-2"><Trophy className="w-8 h-8" /><span className="font-bold">#1 Local Agency</span></div>
                        <div className="flex items-center gap-2"><ShieldCheck className="w-8 h-8" /><span className="font-bold">Google Partner</span></div>
                        <div className="flex items-center gap-2"><Check className="w-8 h-8 border rounded-full p-1" /><span className="font-bold">5-Star Rated</span></div>
                    </div>

                    <div className="mt-16 flex flex-col items-center gap-2 p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 max-w-md mx-auto">
                        <Clock className="w-8 h-8 text-emerald-400 mb-2" />
                        <span className="font-bold text-xl">24-Hour Response Guarantee</span>
                        <p className="text-sm text-zinc-400">We value your time. Our team will contact you within 24 hours of submission, guaranteed.</p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-8 sm:p-12 text-center"
                    >
                        {/* Background Gradient */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to Grow Your Business Online?
                            </h2>
                            <p className="text-zinc-400 mb-8 max-w-xl mx-auto text-lg">
                                Stop losing potential customers to competitors with better websites. Let's build your powerful online presence today.
                            </p>

                            <div className="flex justify-center">
                                <Button
                                    size="lg"
                                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-lg h-14 px-10 gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                                    onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Secure My New Website <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );
}
