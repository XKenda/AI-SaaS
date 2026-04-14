import { motion } from "framer-motion";


const Job = ({job}) => {
    const {company, position, location, status, JobType} = job
    return (
        <motion.div initial={{y: 10 , opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.5}} className="job-con p-5 flex justify-between border border-gray-500 rounded-2xl my-2 capitalize">
            <div className="job-primary-details">
                <p className="company-name text-2xl text-accent">{company}</p>
                <p className="position my-1 text-gray-500">{position}</p>
                <p className="job-type">{JobType}</p>
            </div>
            <div className="job-secondary-detils flex flex-col justify-between">
                <p className="status text-2xl">{status}</p>
                <p className="lacation">{location}</p>
            </div>
        </motion.div>
    );
}

export default Job;