import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { uploadCVAPI, getAllCVsAPI, deleteCVAPI } from "../../API/cvApi";
import Loading from "../components/loading";
import {
    FileText,
    Upload,
    Trash2,
    Brain,
    Zap,
    AlertTriangle,
    TrendingUp,
    CheckCircle,
    Star,
    RefreshCw,
    Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Resume = () => {
    const [cv, setCv] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [funnyMessageIndex, setFunnyMessageIndex] = useState(0);

    const funnyMessages = [
        "We are asking experts to analyze your Resume...",
        "Wait for them to tell us what they think...",
        "The experts are debating your font choice...",
        "The AI is currently judging your experience level...",
        "Almost there, our digital auditors are finishing their report...",
        "Comparing your skills with the industry's best...",
        "Decoding your career achievements..."
    ];

    const fetchCV = useCallback(async () => {
        setIsLoading(true);
        await getAllCVsAPI().then((res) => {
            if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
                setCv(res.data.data[0]);
            } else {
                setCv(null);
            }
        }).catch((err) => {

            console.error("Error fetching CV:", err);
        }).finally(() => {
            setIsLoading(false)
        });

    }, []);

    useEffect(() => {
        fetchCV();
    }, [fetchCV]);

    useEffect(() => {
        let interval;
        if (isUploading) {
            interval = setInterval(() => {
                setFunnyMessageIndex((prev) => (prev + 1) % funnyMessages.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isUploading]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("cv", file);

        setIsUploading(true);
        setFunnyMessageIndex(0);

        try {
            const res = await uploadCVAPI(formData);
            if (res.data.success) {
                setCv(res.data.data);
            }
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your resume?")) return;

        try {
            await deleteCVAPI(cv._id).then((res) => {
                if (res.data.success) {
                    setCv(null);
                }
            }).catch((err) => {
                console.log(err)
            });
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="dashboard-grid bg-primary text-white">
                <Sidebar />
                <div className="flex items-center justify-center w-full min-h-screen">
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-grid bg-primary text-white selection:bg-accent/30 min-h-screen">
            <Sidebar />

            <main className="content-area pt-8">
                <Header />

                <div className="max-w-7xl mx-auto space-y-10 pb-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
                            <FileText size={16} />
                            <span>Resume Management</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Your Professional Resume</h1>
                    </div>

                    <AnimatePresence mode="wait">
                        {!cv && !isUploading ? (
                            <motion.div
                                key="upload-section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="glass-card p-12 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 border-dashed border-2 border-white/10 hover:border-accent/50 transition-all cursor-pointer group relative overflow-hidden"
                            >
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleUpload}
                                    accept=".pdf,.doc,.docx"
                                />
                                <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-accent/5">
                                    <Upload className="text-accent" size={40} />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-2">Upload your resume</h3>
                                    <p className="text-gray-400">PDF, DOC, or DOCX up to 5MB</p>
                                </div>
                                <div className="bg-accent px-8 py-3 rounded-2xl font-bold shadow-lg shadow-accent/20 group-hover:bg-accent-hover transition-colors">
                                    Browse Files
                                </div>
                            </motion.div>
                        ) : isUploading ? (
                            <motion.div
                                key="loading-section"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="glass-card p-12 rounded-[2.5rem] flex flex-col items-center justify-center gap-8 min-h-[400px]"
                            >
                                <div className="relative">
                                    <div className="w-24 h-24 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                                    <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent animate-pulse" size={32} />
                                </div>
                                <div className="text-center space-y-4 max-w-md">
                                    <motion.p
                                        key={funnyMessageIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xl font-medium text-white italic"
                                    >
                                        "{funnyMessages[funnyMessageIndex]}"
                                    </motion.p>
                                    <p className="text-gray-500 text-sm">Please don't refresh the page while the experts work.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="cv-details"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
                                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                                            <Star className="text-emerald-400" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">CV Score</p>
                                            <p className="text-2xl font-bold">{cv.cvRate}/10</p>
                                        </div>
                                    </div>
                                    <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                                            <Download className="text-indigo-400" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">Document</p>
                                            <a href={cv.cvUrl} download target="_blank" rel="noreferrer" className="text-accent hover:underline font-bold">Download PDF</a>
                                        </div>
                                    </div>
                                    <div className="glass-card p-6 rounded-3xl flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center">
                                                <RefreshCw className="text-red-400" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm font-medium">Update</p>
                                                <p className="font-bold">Replace CV</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors relative">
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} accept=".pdf,.doc,.docx" />
                                                <Upload size={20} className="text-gray-400 hover:text-white" />
                                            </label>
                                            <button onClick={handleDelete} className="p-2 hover:bg-red-500/10 rounded-xl transition-colors">
                                                <Trash2 size={20} className="text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                        className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Brain size={120} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                                                    <Brain className="text-white" size={20} />
                                                </div>
                                                <h3 className="text-2xl font-bold">AI Analysis Overview</h3>
                                            </div>
                                            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
                                                {cv.aiOverview}
                                            </p>
                                        </div>
                                    </motion.div>


                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="glass-card p-10 rounded-[2.5rem]"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                                <Zap className="text-emerald-400" size={20} />
                                            </div>
                                            <h3 className="text-2xl font-bold">Key Skills Identified</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {cv.skills.map((skill, index) => (
                                                <span key={index} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>


                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="glass-card p-10 rounded-[2.5rem]"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                                <AlertTriangle className="text-amber-400" size={20} />
                                            </div>
                                            <h3 className="text-2xl font-bold">Points of Caution</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {cv.weaknesses.map((weakness, index) => (
                                                <div key={index} className="flex gap-3 items-start text-gray-400">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                                    <p>{weakness}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>


                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] bg-accent/5 backdrop-blur-xl border-accent/20"
                                    >
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                                                <TrendingUp className="text-white" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold">Recommended Improvements</h3>
                                                <p className="text-sm text-gray-400">Follow these steps to increase your hireability</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {cv.improvements.map((improvement, index) => (
                                                <div key={index} className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/5">
                                                    <div className="mt-1 bg-accent/20 p-1 rounded-full">
                                                        <CheckCircle className="text-accent" size={16} />
                                                    </div>
                                                    <p className="text-gray-300 font-medium">{improvement}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Resume;