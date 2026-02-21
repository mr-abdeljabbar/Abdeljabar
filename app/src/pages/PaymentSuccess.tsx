import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Home, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 pt-24 pb-16">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-xl w-full relative z-10"
            >
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                    >
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-25" />
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 relative z-10" />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Payment Successful!
                        </h1>
                        <p className="text-zinc-400 text-lg mb-8">
                            Thank you for your business. Your payment has been processed successfully.
                            We'll start working on your request right away.
                        </p>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8 gap-2 transition-all hover:scale-105"
                                onClick={() => navigate('/')}
                            >
                                <Home className="w-5 h-5" />
                                Return Home
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-white/10 hover:bg-white/5 text-zinc-300 gap-2 transition-all hover:scale-105"
                                onClick={() => navigate('/projects')}
                            >
                                <LayoutGrid className="w-5 h-5" />
                                Browse Projects
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-8 text-zinc-500 text-sm"
                >
                    A confirmation email has been sent to your inbox.
                    <br />
                    Need help? <a href="/contact" className="text-emerald-500 hover:underline">Contact Support</a>
                </motion.p>
            </motion.div>
        </div>
    );
}
