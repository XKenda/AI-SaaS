import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import Loading from "../components/loading";
import { LogInAPI } from "../../API/userApi";
import { motion } from "framer-motion";



const Login = () => {
    const [show, setShow] = useState(false)
    const [passwordIsShown, setPasswordIsShown] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const navigate = useNavigate()

    const [formData , setFormData] = useState({
        email: '',
        password: ''
    })

    const HandleLogIn = async (e) => {
        setIsloading(true)
        e.preventDefault();

        const data = new FormData();
        data.append("email", formData.email)
        data.append("password", formData.password)
        try {

            await LogInAPI(formData.email, formData.password).then((res)=>{
                if(res.data.success)
                    navigate('/home')
            }).catch((e)=>{
                console.log(e)
                alert(e.response.data.message)
            })
        } catch (e) {
            console.log(e)
        } finally {
            setIsloading(false)
        }
    }

    useEffect(()=>{
        setShow(true)
    }, [])

    return (
            <div className=" login-con flex flex-col-reverse md:flex-row ">
                <motion.div initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 0.5, ease: "linear", opacity: {duration: 2}}} className={"login-info flex-1 bg-blue-700 text-white rounded-t-2xl md:rounded-r-2xl p-10 flex flex-col h-dvh justify-between duration-1000 z-10 "}>
                <h3 className="text-2xl w-6/12 mb-20">Your all in one website for job tracking</h3>
                <div className="login-info-details flex flex-col">
                    <p className="details-title">Trusted by leading developers</p>
                    <p className="trusted-people mt-10">Mahmoud Ibrahim (ME) :) </p>
                </div>
            </motion.div>
            <motion.div initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 0.5, ease: "linear", opacity: {duration: 2}}}  className={"login flex-1 flex flex-col p-10 gap-5 duration-1000 "}>
                <div className="title-con mb-5">
                    <h2 className="log-in text-2xl text-center">Log In</h2>
                    <h2 className="welcome-message text-[20px] text-center text-gray-500">Welcome to Your Job Tracker webstie </h2>
                </div>
                <form className="login-form py-5 px-15 rounded-2xl flex flex-col gap-5">
                    <div className={"input-field " + (formData.email? "written": "")}>
                        <label htmlFor="email" className="email">email</label>
                        <input type="text" id="email" className="email" onChange={(e)=> setFormData(prev => ({...prev, email:e.target.value}))} />
                    </div>
                    <div className={"input-field relative " + (formData.password? "written": "")}>
                        <label htmlFor="password" className="password">password</label>
                        <input type={passwordIsShown? "text" : "password"} className="password" id="password"  onChange={(e)=> setFormData(prev => ({...prev, password:e.target.value}))} /> 
                        <div className="icon-con absolute right-5 text-2xl top-3 cursor-pointer" onClick={()=> setPasswordIsShown(prev => !prev)}>
                            {
                                passwordIsShown? <IoEyeOff /> : <IoEye />
                            }
                        </div>
                    </div>

                    <div className="input-field flex justify-center">
                        <button onClick={HandleLogIn} className="bg-blue-600 text-white cursor-pointer max-w-4/12" type="submit">
                            {
                                isLoading? <Loading /> : "Log In"
                            }
                        </button>
                    </div>
                    <div className="login-btn col-span-2 text-center">
                        <p className="login-url">Don't have an account? <a className="text-blue-700 cursor-pointer" onClick={() => navigate('/auth/register')}>register</a></p>
                    </div>
                </form>
                <hr />
                <div className="external-signup-links flex justify-evenly gap-5">
                    <button onClick={() => navigate("/not-feature")}> <img src="/google.png" className="w-6" />Sign Up with Google</button>
                    <button onClick={() => navigate("/not-feature")} > <img src="/facebook.png" alt="" />Sign Up with Facebook</button>
                    <button onClick={() => navigate("/not-feature")}> <img src="/linkedin.png" alt="" />Sign Up with Linkedin</button>    
                </div>
            </motion.div>
            </div>
    )
} 

export default Login;