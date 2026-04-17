import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addJob } from "../../API/jobApi";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Briefcase, Building, MapPin, Send, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { JobContext } from "../App";

const CreateJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        JobType: "Full-Time",
        status: "pending",
        location: ""
    });

    const jobs = useContext(JobContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await addJob(formData);
            if (res.data.success) {
                navigate("/home");
                jobs.getAllJobs()
                
            } else {
                setError(res.data.message || "Failed to add job application.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-grid bg-primary text-white">
            <Sidebar />
            
            <main className="content-area pt-8">
                <Header />
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight">Add New Application</h1>
                        <p className="text-gray-400 text-lg">Detailed entry for your next career move.</p>
                    </div>

                    <div className="glass-card p-10 rounded-3xl shadow-2xl relative overflow-hidden">

                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        
                        <form onSubmit={handleSubmit} className="relative space-y-8">
                            <AnimatePresence>
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-sm"
                                    >
                                        <AlertCircle size={18} />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-400 flex items-center gap-2 px-1">
                                        <Briefcase size={14} className="text-accent" />
                                        Job Position
                                    </label>
                                    <input 
                                        required
                                        type="text" 
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        placeholder="e.g. Senior Frontend Engineer"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-600"
                                    />
                                </div>


                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-400 flex items-center gap-2 px-1">
                                        <Building size={14} className="text-accent" />
                                        Company Name
                                    </label>
                                    <input 
                                        required
                                        type="text" 
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Google"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-600"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-400 flex items-center gap-2 px-1">
                                        <MapPin size={14} className="text-accent" />
                                        Job Location
                                    </label>
                                    <input 
                                        required
                                        type="text" 
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City, Remote, or Hybrid"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-600"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-400 flex items-center gap-2 px-1">
                                        <Clock size={14} className="text-accent" />
                                        Job Type
                                    </label>
                                    <select 
                                        name="JobType"
                                        value={formData.JobType}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-accent outline-none transition-all cursor-pointer appearance-none"
                                    >
                                        <option value="Full-Time" className="bg-primary">Full-Time</option>
                                        <option value="Part-Time" className="bg-primary">Part-Time</option>
                                        <option value="Contract" className="bg-primary">Contract</option>
                                        <option value="Freelance" className="bg-primary">Freelance</option>
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-400 flex items-center gap-2 px-1">
                                        <CheckCircle size={14} className="text-accent" />
                                        Current Status
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {['pending', 'interview', 'declined', 'offered'].map((status) => (
                                            <button
                                                key={status}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, status }))}
                                                className={`py-3 px-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all border ${
                                                    formData.status === status 
                                                        ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button 
                                disabled={loading}
                                type="submit"
                                className="w-full bg-accent hover:bg-accent-hover text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        <span>Create Application Tracker</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default CreateJob;
