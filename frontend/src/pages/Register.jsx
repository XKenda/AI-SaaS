import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [show, setShow] = useState(false)

    const navigate = useNavigate();

    useEffect(()=>{
        setShow(true)
    }, [])

    return (
            <div className="register-con flex flex-col md:flex-row-reverse ">
             <div className={"register-info flex-1 bg-blue-700 text-white rounded-l-2xl p-10 flex flex-col justify-between duration-1000 z-10 " + (show? "translate-x-0 opacity-100" : "-translate-x-50 opacity-30") }>
                <h3 className="text-2xl w-6/12 mb-20">Your all in one website for job tracking</h3>
                <div className="register-info-details flex flex-col">
                    <p className="details-title">Trusted by leading developers</p>
                    <p className="trusted-people mt-10">Mahmoud Ibrahim (ME) :) </p>
                </div>
            </div>
            <div className={"register flex-1 flex flex-col p-10 gap-5 duration-1000 " + (show? "translate-x-0 opacity-100" : "translate-x-50 opacity-30")}>
                <div className="title-con mb-5">
                    <h2 className="create-accoutn text-2xl text-center">Create Account</h2>
                    <h2 className="welcome-message text-[20px] text-center text-gray-500">Welcome to Your Job Tracker webstie </h2>
                </div>
                <form className="register-form py-5 px-15 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="input-field col-span-2 sm:col-span-1">
                        <label htmlFor="firstName" className="input-label">first name</label>
                        <input type="text" id="firstName" />
                    </div>
                    <div className="input-field col-span-2 sm:col-span-1">
                        <label htmlFor="lastName" className="input-label">last name</label>
                        <input type="text" id="lastName" />
                    </div>
                    <div className="input-field col-span-2 sm:col-span-1">
                        <label htmlFor="email" className="email">email</label>
                        <input type="text" id="email" className="email" />
                    </div>
                    <div className="input-field col-span-2 sm:col-span-1">
                        <label htmlFor="age" className="age">age</label>
                        <input type="number" id="age" className="age" min={15} max={99} />
                    </div>
                    <div className="input-field col-span-2">
                        <label htmlFor="password" className="password">password</label>
                        <input type="password" className="password" id="password" /> 
                    </div>
                    <div className="input-field col-span-2">
                        <label htmlFor="confirm-password" className="confirm-password overflow-hidden h-5">confirm password</label>
                        <input type="password" id="confirm-password" className="confirm-password" />
                    </div>
                    <div className="input-field col-span-2">
                        <input className="max-w-6/12 cursor-pointer" type="file" name="file" id="file"/>
                    </div>
                    <div className="input-field col-span-2">
                        <input className="bg-blue-600 text-white cursor-pointer" type="submit" value="Create Account" />
                    </div>
                    <div className="login-btn col-span-2 text-center">
                        <p className="login-url">Already have an Account? <a className="text-blue-700 cursor-pointer" onClick={() => navigate('/login')}>Login</a></p>
                    </div>
                </form>
                <hr />
                <div className="external-signup-links flex justify-evenly gap-5">
                    <button className=""> <img src="/google.png" className="w-6" /> Sign Up with Google</button>
                    <button> <img src="/facebook.png" alt="" /> Sign Up with Facebook</button>
                    <button> <img src="/linkedin.png" alt="" />Sign Up with Linkedin</button>
                    
                </div>

            </div>
        </div>
    )
} 

export default Register;