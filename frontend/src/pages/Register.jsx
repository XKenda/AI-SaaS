import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { RegisterAPI } from "../../API/userApi";
import Loading from "../components/loading";
import { motion } from "framer-motion";

const Register = () => {
    const [show, setShow] = useState(false)
    const [confirmRes, setConfirmRes] = useState(null)
    const [passwordIsShown, setPasswordIsShown] = useState(false);
    const [ConfirmPasswordIsShown, setConfirmPasswordIsShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        image: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        password: '',
        confirmPassword: ''
    })

    const CreateAccount = async (e) => {
        setIsLoading(true)
        e.preventDefault();

        const data = new FormData();
        data.append('username', `${formData.firstName} ${formData.lastName}`);
        data.append('email', formData.email);
        data.append('age', formData.age);
        data.append('password', formData.password);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const res = await RegisterAPI(data).then((res)=>{
                if(res) {
                    navigate('/login')
                }
            }).catch((e)=>{
                setErrorMessage(e.response.data.message)
            })
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const HandleConfirmPassword = (e) => {
        const text = e.target.value
        console.log(`${text} + ${formData.password} = ${text === formData.password}`)
        if(text === formData.password)
            return setConfirmRes(true)

        return setConfirmRes(false)
    }


    useEffect(()=>{
        setShow(true)
    }, [])

    return (
        <div className="register-con flex flex-col md:flex-row-reverse ">
             <motion.div initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 0.5, ease: "linear", opacity: {duration: 2}}} className={"register-info flex-1 bg-blue-700 text-white rounded-b-2xl md:rounded-l-2xl p-10 flex flex-col justify-between duration-1000 z-10 " }>
                <h3 className="text-2xl w-6/12 mb-20">Your all in one website for job tracking</h3>
                <div className="register-info-details flex flex-col">
                    <p className="details-title">Trusted by leading developers</p>
                    <p className="trusted-people mt-10">Mahmoud Ibrahim (ME) :) </p>
                </div>
            </motion.div>

            <motion.div initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 0.5, ease: "linear", opacity: {duration: 2}}} className={"register flex-1 flex flex-col p-10 gap-5 duration-1000 " + (show? "translate-x-0 opacity-100" : "translate-x-50 opacity-30")}>
                <div className="title-con mb-5">
                    <h2 className="create-accoutn text-2xl text-center">Create Account</h2>
                    <h2 className="welcome-message text-[20px] text-center text-gray-500">Welcome to Your Job Tracker webstie </h2>
                </div>
                <form className="register-form py-5 px-15 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={"input-field col-span-2 sm:col-span-1 " + (formData.firstName ? 'written' : '')}>
                        <label htmlFor="firstName" className="input-label">first name</label>
                        <input onChange={(e)=> setFormData(prev => ({...prev, firstName: e.target.value}))} type="text" id="firstName" />
                    </div>
                    <div className={"input-field col-span-2 sm:col-span-1 " + (formData.lastName ? 'written' : '')}>
                        <label htmlFor="lastName" className="input-label">last name</label>
                        <input onChange={(e)=> setFormData(prev => ({...prev, lastName: e.target.value}))} type="text" id="lastName" />
                    </div>
                    <div className={"input-field col-span-2 sm:col-span-1 " + (formData.email ? 'written' : '')}>
                        <label htmlFor="email" className="email">email</label>
                        <input  onChange={(e)=> setFormData(prev => ({...prev, email: e.target.value}))} type="text" id="email" />
                    </div>
                    <div className={"input-field col-span-2 sm:col-span-1 " + (formData.age ? 'written' : '')}>
                        <label htmlFor="age" className="age">age</label>
                        <input  onChange={(e)=> setFormData(prev => ({...prev, age: e.target.value}))} type="number" id="age" min={15} max={99} />
                    </div>
                    <div className={"input-field col-span-2 " + (formData.password ? 'written' : '')}>
                        <label htmlFor="password" className="password">password</label>
                        <input  onChange={(e)=> setFormData(prev => ({...prev, password: e.target.value}))} type={passwordIsShown? "text" : "password"} id="password" />
                        <div className="icon-con absolute right-5 text-2xl top-3 cursor-pointer" onClick={()=> setPasswordIsShown(prev => !prev)}>
                            {
                                passwordIsShown? <IoEyeOff /> : <IoEye />
                            }
                        </div>
                    </div>
                    <div className={"input-field col-span-2 " + (formData.confirmPassword ? 'written' : '')}>
                        <label htmlFor="confirm-password" className="confirm-password overflow-hidden h-5">confirm password</label>
                        <input  onInput={(e)=> setFormData(prev => ({...prev, confirmPassword: e.target.value}))} onChange={HandleConfirmPassword} type={ConfirmPasswordIsShown? "text" : "password"} id="confirm-password" />
                        <div className="icon-con absolute right-5 text-2xl top-3 cursor-pointer" onClick={()=> setConfirmPasswordIsShown(prev => !prev)}>
                            {
                                ConfirmPasswordIsShown? <IoEyeOff /> : <IoEye />
                            }
                        </div>
                        <div className={"match-con absolute -top-10 bg-gray-300 rounded-2xl px-1 py-2 duration-500 " + (confirmRes? "opacity-0" : formData.confirmPassword? "": "opacity-0")}>
                            <p className="match-text">
                            {
                                confirmRes ? "": "password doesn't match"
                            }
                            </p>
                        </div>
                    </div>
                    <div className="input-field col-span-2">
                        <input onChange={(e) => setFormData(prev => ({...prev, image: e.target.files[0]}))} className="max-w-6/12 cursor-pointer" type="file" name="file" id="file"/>
                    </div>
                    {
                        errorMessage?
                            <div className="error-message-con text-[18px] text-red-500">
                                <p className="error-mes">{errorMessage}</p>
                            </div> : ''
                    }
                    <div className="input-field col-span-2">
                        <button className="bg-blue-600 text-white cursor-pointer" type="submit" disabled={confirmRes? false: true} onClick={(e) => CreateAccount(e)}>
                            {
                                isLoading?  <Loading /> : "Create Account"
                            }
                        </button>
                    </div>
                    <div className="login-btn col-span-2 text-center">
                        <p className="login-url">Already have an Account? <a className="text-blue-700 cursor-pointer" onClick={() => navigate('/auth/login')}>Login</a></p>
                    </div>
                </form>
                <hr />
                <div className="external-signup-links flex justify-evenly gap-5">
                    <button onClick={() => {navigate("/not-feature")}}> <img src="/google.png" className="w-6" /> Sign Up with Google</button>
                    <button onClick={() => navigate("/not-feature")}> <img src="/facebook.png" alt="" /> Sign Up with Facebook</button>
                    <button onClick={() => navigate("/not-feature")}> <img src="/linkedin.png" alt="" />Sign Up with Linkedin</button>
                    
                </div>

            </motion.div>
        </div>
    )
} 

export default Register;