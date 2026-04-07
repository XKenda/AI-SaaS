import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    return (
        <div className="register-con p-10">
            <h2 className="create-accoutn text-2xl text-center">Create Account</h2>
            <h2 className="welcome-message text-[20px] text-center">Welcome to Your Job Tracker webstie </h2>
            <div className="register flex justify-center pt-10">
                <form className="register-form border py-5 px-15 rounded-2xl grid grid-cols-2 gap-5">
                    <div className="input-field row-start-1">
                        <label htmlFor="firstName" className="input-label">first name</label>
                        <input type="text" id="firstName" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName" className="input-label">last name</label>
                        <input type="text" id="lastName" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email" className="email">email</label>
                        <input type="text" id="email" className="email" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="age" className="age">age</label>
                        <input type="number" id="age" className="age" min={15} max={99} />
                    </div>
                    <div className="input-field col-span-2">
                        <label htmlFor="password" className="password">password</label>
                        <input type="password" className="password" id="password" /> 
                    </div>
                    <div className="input-field col-span-2">
                        <label htmlFor="confirm-password" className="confirm-password">confirm password</label>
                        <input type="password" id="confirm-password" className="confirm-password" />
                    </div>
                    <div className="input-field col-span-2">
                        <input className="max-w-6/12" type="file" name="file" id="file"/>
                    </div>
                    <div className="input-field col-span-2">
                        <input className="bg-blue-600 text-white" type="submit" value="Create Account" />
                    </div>
                    <div className="login-btn col-span-2 text-center">
                        <p className="login-url">Already have an Account? <a className="text-blue-700 cursor-pointer" onClick={() => navigate()}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
} 

export default Register;