import { useContext, useMemo } from "react";
import { JobContext, UserContext } from "../App";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import JobChart from "../components/JobChart";
import Loading from "../components/loading";
import { Clock, CheckCircle, Users, Briefcase, MapPin, Calendar, LayoutDashboard, Trash, Edit } from "lucide-react";
import { motion } from "framer-motion";
import Job from "../components/Job";

const Home = () => {
    const { user } = useContext(UserContext);
    const jobContext = useContext(JobContext);
    
    // Normalize jobs data
    const jobs = useMemo(() => {
        const rawData = jobContext?.data;
        if (Array.isArray(rawData)) return rawData;
        if (rawData && Array.isArray(rawData.jobs)) return rawData.jobs;
        return [];
    }, [jobContext]);

    const stats = useMemo(() => {
        return jobs.reduce((acc, job) => {
            const status = job.status?.toLowerCase();
            if (acc.hasOwnProperty(status)) {
                acc[status]++;
            }
            acc.total++;
            return acc;
        }, { pending: 0, interview: 0, declined: 0, offered: 0, total: 0 });
    }, [jobs]);

    const chartData = [
        { name: 'Pending', value: stats.pending },
        { name: 'Interview', value: stats.interview },
        { name: 'Declined', value: stats.declined },
        { name: 'Offered', value: stats.offered }
    ];

    if (!user || !jobContext?.data) {
        return <Loading />;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="dashboard-grid bg-primary text-white selection:bg-accent/30">
            <Sidebar />
            
            <main className="content-area pt-8">
                <Header />
                
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto space-y-10 pb-12"
                >

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
                            <LayoutDashboard size={16} />
                            <span>Overview</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Main Dashboard</h1>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            title="Total Applications" 
                            count={stats.total} 
                            icon={Briefcase} 
                            color="bg-accent" 
                            delay={0.1}
                        />
                        <StatsCard 
                            title="Pending" 
                            count={stats.pending} 
                            icon={Clock} 
                            color="bg-amber-500" 
                            delay={0.2}
                        />
                        <StatsCard 
                            title="Interviews" 
                            count={stats.interview} 
                            icon={Users} 
                            color="bg-indigo-500" 
                            delay={0.3}
                        />
                        <StatsCard 
                            title="Job Offers" 
                            count={stats.offered} 
                            icon={CheckCircle} 
                            color="bg-emerald-500" 
                            delay={0.4}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-1">
                            <JobChart data={chartData} />
                        </div>


                        <div className="lg:col-span-2 glass-card p-8 rounded-3xl overflow-hidden flex flex-col min-h-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold">Recent Applications</h3>
                                <button className="text-accent hover:text-accent-hover text-sm font-semibold transition-colors flex items-center gap-1">
                                    View full history
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-auto space-y-4 pr-1 max-h-150">
                                {jobs.length > 0 ? (
                                    jobs.map((job, index) => (
                                        <Job key={index} job={job} index={index} />
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-gray-500 gap-4">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                            <Briefcase size={32} className="opacity-20" />
                                        </div>
                                        <p className="text-center max-w-50">No job applications found yet. Time to apply!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Home;
