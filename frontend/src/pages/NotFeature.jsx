import { useNavigate } from "react-router-dom";
import { Construction, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFeature = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-primary text-white flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full glass-card p-12 rounded-3xl text-center space-y-8"
            >
                <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500 ring-1 ring-amber-500/20 shadow-lg shadow-amber-500/10">
                    <Construction size={48} />
                </div>
                
                <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold tracking-tight">Under Construction</h1>
                    <p className="text-gray-400">
                        This feature is currently being built with ❤️ by Mahmoud Ibrahim. Check back soon!
                    </p>
                </div>

                <div className="pt-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl font-semibold transition-all group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Go Back</span>
                    </button>
                </div>

                <div className="text-xs text-gray-500 pt-4">
                    Need this feature urgently? Contact developer at:
                    <br />
                    <span className="text-accent underline">maibrahim131@gmail.com</span>
                </div>
            </motion.div>
        </div>

    )
}

export default NotFeature;
