import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [show, setShow] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        setShow(true)
    }, [])

    return (
            <div className=" login-con h-dvh flex flex-col-reverse md:flex-row ">
                <div className={"login-info flex-1 bg-blue-700 text-white rounded-r-2xl p-10 flex flex-col justify-between duration-1000 z-10 " + (show? "translate-x-0 opacity-100" : "translate-x-50 opacity-30")}>
                <h3 className="text-2xl w-6/12 mb-20">Your all in one website for job tracking</h3>
                <div className="login-info-details flex flex-col">
                    <p className="details-title">Trusted by leading developers</p>
                    <p className="trusted-people mt-10">Mahmoud Ibrahim (ME) :) </p>
                </div>
            </div>
            <div className={"login flex-1 flex flex-col p-10 gap-5 duration-1000 " + (show? "translate-x-0 opacity-100" : "-translate-x-50 opacity-30")}>
                <div className="title-con mb-5">
                    <h2 className="log-in text-2xl text-center">Log In</h2>
                    <h2 className="welcome-message text-[20px] text-center text-gray-500">Welcome to Your Job Tracker webstie </h2>
                </div>
                <form className="login-form py-5 px-15 rounded-2xl flex flex-col gap-5">
                    <div className="input-field">
                        <label htmlFor="email" className="email">email</label>
                        <input type="text" id="email" className="email" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password" className="password">password</label>
                        <input type="password" className="password" id="password" /> 
                    </div>

                    <div className="input-field flex justify-center">
                        <input className="bg-blue-600 text-white cursor-pointer max-w-4/12" type="submit" value="Create Account" />
                    </div>
                    <div className="login-btn col-span-2 text-center">
                        <p className="login-url">Don't have an account? <a className="text-blue-700 cursor-pointer" onClick={() => navigate('/register')}>register</a></p>
                    </div>
                </form>
                <hr />
                <div className="external-signup-links flex justify-evenly gap-5">
                    <button className=""> <img src="/google.png" className="w-6" />Log in with Google</button>
                    <button> <img src="/facebook.png" alt="" />Log in with Facebook</button>
                    <button> <img src="/linkedin.png" alt="" />Log in with Linkedin</button>    
                </div>
            </div>
            </div>
    )
} 

export default Login;