import { motion } from "framer-motion";


const PageNotFound = () => {
    return (
        <div className="pagenotfound-con bg-blue-600 h-dvh w-full text-white flex justify-center">
            <div className="container flex flex-col justify-center items-center mb-50">
                <motion.h2 initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{duration: 1, opacity: {duration: 2}}} className="status-con text-[10rem]">404</motion.h2>
                <p className="title text-2xl">Page Not Found</p>
            </div>
        </div>
    )
}

export default PageNotFound;