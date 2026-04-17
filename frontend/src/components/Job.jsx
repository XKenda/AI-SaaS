import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, Trash, Edit } from "lucide-react";


const Job = ({ job, index }) => {

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + (index * 0.1) }}
            key={job._id || index}
            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group relative cursor-pointer"
        >
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Briefcase size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-white group-hover:text-accent transition-colors">{job.position}</h4>
                    <p className="text-sm text-gray-400 capitalize">{job.company}</p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="hidden sm:flex flex-col items-end text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                        <Calendar size={12} />
                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className={`badge status-${job.status?.toLowerCase()} scale-90`}>
                    {job.status}
                </div>
            </div>
            <div className="absolute jobs-btns-con right-5 flex flex-col gap-3">
                <button className="job-btn">
                    <Trash />
                </button>
                <button className="job-btn">
                    <Edit />
                </button>
            </div>
        </motion.div>
    );
}

export default Job;