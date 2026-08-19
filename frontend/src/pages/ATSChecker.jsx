import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { atsChecker, getAllCVsAPI } from "../../API/cvApi";
import Loading from "../components/loading";
import {
    FileText,
    Upload,
    Sparkles,
    AlertTriangle,
    CheckCircle,
    Brain,
    RefreshCw,
    Clipboard,
    ArrowRight,
    FileCheck,
    FileCode,
    Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ATSChecker = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [savedCV, setSavedCV] = useState(null);
    const [useSavedCV, setUseSavedCV] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    const loadingMessages = [
        "Analyzing resume structure...",
        "Extracting core competencies and skills...",
        "Parsing job description keywords...",
        "Measuring alignment and density...",
        "Identifying qualification gaps...",
        "Generating score metrics...",
        "Compiling recommended optimizations..."
    ];

    // Fetch existing CV on mount
    useEffect(() => {
        const fetchExistingCV = async () => {
            try {
                const res = await getAllCVsAPI();
                if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
                    setSavedCV(res.data.data[0]);
                    setUseSavedCV(true);
                }
            } catch (err) {
                console.error("Error fetching existing CV:", err);
            }
        };
        fetchExistingCV();
    }, []);

    // Cycle loading messages
    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setInterval(() => {
                setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUseSavedCV(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setUseSavedCV(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!useSavedCV && !file) {
            alert("Please upload a resume first!");
            return;
        }
        if (!jobDescription.trim()) {
            alert("Please paste a job description!");
            return;
        }

        setIsLoading(true);
        setLoadingMessageIndex(0);

        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        
        if (useSavedCV && savedCV) {
            // If using saved CV, we must fetch the file or backend can download it, 
            // but the controller expects req.file. Let's fetch the file from savedCV.cvUrl
            try {
                const response = await fetch(savedCV.cvUrl);
                const blob = await response.blob();
                const cvFile = new File([blob], "resume.pdf", { type: "application/pdf" });
                formData.append("cv", cvFile);
            } catch (err) {
                console.error("Error downloading saved CV file:", err);
                alert("Failed to retrieve saved resume. Please upload a file manually.");
                setIsLoading(false);
                return;
            }
        } else {
            formData.append("cv", file);
        }

        try {
            const res = await atsChecker(formData);
            if (res.data.success) {
                setAnalysisResult(res.data.data);
            } else {
                alert("Failed to perform ATS check. Please try again.");
            }
        } catch (err) {
            console.error("ATS Check failed:", err);
            alert("An error occurred during analysis. Please check file size/type and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setAnalysisResult(null);
        // Keep the saved CV toggle but clear manually uploaded files
        if (!savedCV) {
            setFile(null);
        }
    };

    // Calculate score color tier
    const getScoreTier = (score) => {
        if (score >= 80) return { label: "Excellent Match", color: "text-emerald-400", border: "stroke-emerald-500", bg: "bg-emerald-500/10", shadow: "shadow-emerald-500/20" };
        if (score >= 60) return { label: "Good Match", color: "text-indigo-400", border: "stroke-indigo-500", bg: "bg-indigo-500/10", shadow: "shadow-indigo-500/20" };
        if (score >= 40) return { label: "Fair Match", color: "text-amber-400", border: "stroke-amber-500", bg: "bg-amber-500/10", shadow: "shadow-amber-500/20" };
        return { label: "Poor Match", color: "text-red-400", border: "stroke-red-500", bg: "bg-red-500/10", shadow: "shadow-red-500/20" };
    };

    const score = analysisResult ? (analysisResult.atsCehckerRate || analysisResult.atsCheckerRate || 0) : 0;
    const tier = getScoreTier(score);
    
    // Normalize lists
    const weaknessesList = analysisResult ? (analysisResult.Weakness || analysisResult.weaknesses || []) : [];
    const improvementsList = analysisResult ? (analysisResult.needToImprove || analysisResult.improvements || []) : [];

    // State for interactive checkboxes of improvements
    const [checkedImprovements, setCheckedImprovements] = useState({});

    useEffect(() => {
        if (analysisResult) {
            setCheckedImprovements({});
        }
    }, [analysisResult]);

    const toggleImprovement = (index) => {
        setCheckedImprovements((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="dashboard-grid bg-primary text-white selection:bg-accent/30 min-h-screen">
            <Sidebar />

            <main className="content-area pt-8">
                <Header />

                <div className="max-w-7xl mx-auto space-y-10 pb-12">
                    {/* Page Title */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
                            <Sparkles size={16} className="animate-pulse" />
                            <span>ATS Compatibility Audit</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">AI Resume Matcher</h1>
                        <p className="text-gray-400 text-lg max-w-3xl">
                            Evaluate how well your resume matches target job descriptions. See your match rate, missing keywords, and get actionable recommendations.
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            /* LOADING STATE */
                            <motion.div
                                key="loading-section"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="glass-card p-16 rounded-[2.5rem] flex flex-col items-center justify-center gap-8 min-h-120 border border-white/5"
                            >
                                <div className="relative">
                                    <div className="w-28 h-28 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                                    <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent animate-pulse" size={36} />
                                </div>
                                <div className="text-center space-y-4 max-w-md">
                                    <motion.p
                                        key={loadingMessageIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-2xl font-bold text-white tracking-wide"
                                    >
                                        {loadingMessages[loadingMessageIndex]}
                                    </motion.p>
                                    <p className="text-gray-500 text-sm">Our AI agent is matching your CV qualifications against the employer's requirements. This takes just a moment...</p>
                                </div>
                            </motion.div>
                        ) : !analysisResult ? (
                            /* UPLOAD & PASTE FORM STATE */
                            <motion.div
                                key="form-section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                            >
                                {/* Left Side: Resume Source */}
                                <div className="glass-card p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                                            <FileText size={22} />
                                        </div>
                                        <h3 className="text-2xl font-bold">1. Select Resume</h3>
                                    </div>

                                    {savedCV && (
                                        <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-2xl">
                                            <button
                                                type="button"
                                                onClick={() => setUseSavedCV(true)}
                                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                                                    useSavedCV 
                                                        ? "bg-accent text-white shadow-lg shadow-accent/20" 
                                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                Use Saved Resume
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUseSavedCV(false);
                                                    if (!file) {
                                                        // trigger file picker
                                                        document.getElementById("manual-upload-input")?.click();
                                                    }
                                                }}
                                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                                                    !useSavedCV 
                                                        ? "bg-accent text-white shadow-lg shadow-accent/20" 
                                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                Upload New File
                                            </button>
                                        </div>
                                    )}

                                    {useSavedCV && savedCV ? (
                                        <div className="flex-1 flex flex-col justify-center items-center gap-4 p-8 border-2 border-accent/20 border-dashed rounded-3xl bg-accent/5">
                                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                                                <FileCheck size={36} />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-lg text-white">Saved Resume Selected</p>
                                                <p className="text-sm text-gray-400 mt-1">CV Rating: {savedCV.cvRate}/10</p>
                                            </div>
                                            <a 
                                                href={savedCV.cvUrl} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="text-xs text-accent hover:underline flex items-center gap-1"
                                            >
                                                View Current File <ArrowRight size={12} />
                                            </a>
                                        </div>
                                    ) : (
                                        <div 
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleDrop}
                                            className="flex-1 flex flex-col justify-center items-center gap-6 p-8 border-2 border-white/10 border-dashed rounded-3xl hover:border-accent/40 transition-colors group relative cursor-pointer min-h-64"
                                            onClick={() => document.getElementById("manual-upload-input")?.click()}
                                        >
                                            <input
                                                id="manual-upload-input"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                accept=".pdf"
                                            />
                                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform shadow-xl">
                                                <Upload size={32} />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-lg text-white">
                                                    {file ? file.name : "Drag & Drop Resume PDF"}
                                                </p>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Only PDF files supported up to 5MB"}
                                                </p>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="bg-accent/10 text-accent px-6 py-2.5 rounded-xl text-sm font-bold border border-accent/20 group-hover:bg-accent group-hover:text-white transition-colors"
                                            >
                                                Browse Files
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Job Description */}
                                <div className="glass-card p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                                            <Clipboard size={22} />
                                        </div>
                                        <h3 className="text-2xl font-bold">2. Job Description</h3>
                                    </div>

                                    <div className="flex-1 flex flex-col relative">
                                        <textarea
                                            value={jobDescription}
                                            onChange={(e) => setJobDescription(e.target.value)}
                                            placeholder="Paste the target job description details here (responsibilities, skills, requirements, experience)..."
                                            className="w-full flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 resize-none font-sans text-sm min-h-64"
                                        />
                                        <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-primary/80 px-2 py-1 rounded-md border border-white/5">
                                            {jobDescription.split(/\s+/).filter(Boolean).length} words
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/25 hover:shadow-accent/40 active:scale-98"
                                    >
                                        <Sparkles size={20} />
                                        <span>Check Compatibility</span>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* COMPATIBILITY RESULTS DASHBOARD */
                            <motion.div
                                key="results-section"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                {/* Results Title & Actions */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 ${tier.bg} rounded-2xl flex items-center justify-center`}>
                                            <FileCheck className={tier.color} size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">ATS Audit Complete</h3>
                                            <p className="text-sm text-gray-400 mt-0.5">Matched CV against target Job Description</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 font-semibold transition-all text-sm"
                                    >
                                        <RefreshCw size={16} />
                                        <span>Analyze New Job</span>
                                    </button>
                                </div>

                                {/* Top Grid: Score Ring + Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Circular Dial Card */}
                                    <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                                        <div className="relative w-44 h-44 flex items-center justify-center">
                                            {/* Outer Glow Ring */}
                                            <div className={`absolute inset-0 rounded-full blur-xl opacity-20 ${tier.bg}`} />
                                            
                                            {/* SVG Circular Dial */}
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                {/* Background Circle */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="42"
                                                    className="stroke-white/5"
                                                    strokeWidth="6"
                                                    fill="transparent"
                                                />
                                                {/* Animated Score Progress */}
                                                <motion.circle
                                                    cx="50"
                                                    cy="50"
                                                    r="42"
                                                    className={tier.border}
                                                    strokeWidth="7"
                                                    fill="transparent"
                                                    strokeDasharray="264"
                                                    initial={{ strokeDashoffset: 264 }}
                                                    animate={{ strokeDashoffset: 264 - (264 * score) / 100 }}
                                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            
                                            {/* Center Label */}
                                            <div className="absolute flex flex-col items-center">
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="text-5xl font-extrabold tracking-tight"
                                                >
                                                    {score}
                                                </motion.span>
                                                <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest mt-1">ATS Score</span>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <span className={`badge ${tier.color} ${tier.bg} text-sm px-4 py-1.5 rounded-full border border-white/5 font-extrabold`}>
                                                {tier.label}
                                            </span>
                                            <p className="text-gray-400 text-sm mt-4 px-4 leading-relaxed">
                                                {score >= 80 
                                                    ? "Excellent alignment! Your resume contains the most critical keywords and experience match."
                                                    : score >= 60 
                                                    ? "Good match, but missing some key requirements or target keywords."
                                                    : score >= 40
                                                    ? "Fair alignment. We suggest adding core requirements to bypass early filters."
                                                    : "High risk of ATS filtering. Significant gaps identified in skills and keywords."
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Resume details summary */}
                                    <div className="md:col-span-2 glass-card p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-5">
                                            <Brain size={160} />
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                                                    <Lightbulb size={20} />
                                                </div>
                                                <h3 className="text-2xl font-bold">Summary Review</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                                                    <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Matched Job Target</p>
                                                    <p className="text-lg font-bold mt-1 text-white truncate">
                                                        {jobDescription.substring(0, 120)}...
                                                    </p>
                                                </div>
                                                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-medium">Missing Competencies</p>
                                                        <p className="text-2xl font-extrabold text-amber-400 mt-1">{weaknessesList.length}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-medium">Optimization Recommendations</p>
                                                        <p className="text-2xl font-extrabold text-emerald-400 mt-1">{improvementsList.length}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-white/5">
                                            <p className="text-xs text-gray-500 text-center sm:text-left">
                                                Pro-tip: Check off optimizations below as you add them to your resume draft.
                                            </p>
                                            {savedCV && (
                                                <a 
                                                    href="/resume" 
                                                    className="bg-accent hover:bg-accent-hover text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-accent/10"
                                                >
                                                    Go to Resume Editor
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Grid: Weaknesses & Improvements */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Card 1: Missing Keywords / Weaknesses */}
                                    <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-red-500/10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-red-500/15 text-red-400 rounded-xl flex items-center justify-center">
                                                <AlertTriangle size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold">Gaps & Weaknesses</h3>
                                                <p className="text-xs text-gray-400 mt-0.5">Missing keywords or requirement mismatches</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {weaknessesList.length > 0 ? (
                                                weaknessesList.map((weakness, index) => (
                                                    <div key={index} className="flex gap-4 items-start p-4 bg-white/5 hover:bg-white/8 rounded-2xl border border-white/5 transition-colors group">
                                                        <div className="mt-1 w-2 h-2 rounded-full bg-red-400 shrink-0 shadow-lg shadow-red-400/50" />
                                                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">{weakness}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-10 text-gray-500 gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                                        <CheckCircle size={22} className="text-emerald-400" />
                                                    </div>
                                                    <p className="text-center text-sm">No significant skill gaps identified!</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card 2: Interactive Improvements Checklist */}
                                    <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-emerald-500/10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-emerald-500/15 text-emerald-400 rounded-xl flex items-center justify-center">
                                                <CheckCircle size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold">Optimization Actions</h3>
                                                <p className="text-xs text-gray-400 mt-0.5">Check off items as you modify your CV</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {improvementsList.length > 0 ? (
                                                improvementsList.map((improvement, index) => {
                                                    const isChecked = !!checkedImprovements[index];
                                                    return (
                                                        <div 
                                                            key={index} 
                                                            onClick={() => toggleImprovement(index)}
                                                            className={`flex gap-4 items-start p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                                                                isChecked 
                                                                    ? "bg-emerald-500/5 border-emerald-500/25 opacity-60" 
                                                                    : "bg-white/5 border-white/5 hover:bg-white/8"
                                                            }`}
                                                        >
                                                            <div className="mt-0.5 shrink-0">
                                                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                                                    isChecked 
                                                                        ? "bg-emerald-500 border-emerald-500 text-white" 
                                                                        : "border-gray-500 hover:border-white"
                                                                }`}>
                                                                    {isChecked && <CheckCircle size={14} className="stroke-3" />}
                                                                </div>
                                                            </div>
                                                            <p className={`text-sm leading-relaxed ${
                                                                isChecked 
                                                                    ? "text-gray-400 line-through" 
                                                                    : "text-gray-300"
                                                            }`}>
                                                                {improvement}
                                                            </p>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-10 text-gray-500 gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                                        <CheckCircle size={22} className="text-emerald-400" />
                                                    </div>
                                                    <p className="text-center text-sm">No adjustments needed!</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default ATSChecker;