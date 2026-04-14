import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const PageNotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="pagenotfound-con bg-blue-600 h-dvh w-full text-white flex justify-center">
            <div className="container flex flex-col justify-center items-center mb-50">
                <motion.h2 initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{duration: 1, opacity: {duration: 2}}} className="status-con text-[10rem]">404</motion.h2>
                <p className="title text-2xl">Page Not Found</p>
                <button onClick={()=> navigate('/home')} className="bg-white px-10 py-3 rounded-2xl mt-10 text-black cursor-pointer">got to home page</button>
            </div>
        </div>
    )
}

export default PageNotFound;