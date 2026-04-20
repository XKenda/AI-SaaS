import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Loading from "../components/loading";
import { LogInAPI } from "../../API/userApi";
import { motion } from "framer-motion";
import { Briefcase, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
    const [passwordIsShown, setPasswordIsShown] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const HandleLogIn = async (e) => {
        setIsloading(true);
        e.preventDefault();

        try {
            await LogInAPI(formData.email, formData.password).then((res) => {
                if (res.data.success)
                    navigate('/home');
            }).catch((e) => {
                console.log(e);
                alert(e.response.data.message);
            });
        } catch (e) {
            console.log(e);
        } finally {
            setIsloading(false);
        }
    };

    return (
        <div className="auth-gradient min-h-screen flex items-center justify-center p-4 selection:bg-accent/30">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row max-w-5xl w-full shadow-2xl"
            >

                <div className="md:w-5/12 bg-accent/10 p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                            <Briefcase className="text-white" size={24} />
                        </div>
                        <h3 className="text-3xl font-extrabold text-white leading-tight mb-4">
                            Your all-in-one platform for job tracking
                        </h3>
                        <p className="text-indigo-200/80 text-lg">
                            Stay organized, track applications, and land your dream job with AI-powered insights.
                        </p>
                    </div>

                    <div className="relative z-10 pt-10">
                        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-300 mb-4 opacity-60">Trusted by developers</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center text-sm font-bold">MI</div>
                            <p className="text-white font-medium italic">Mahmoud Ibrahim</p>
                        </div>
                    </div>
                </div>


                <div className="md:w-7/12 p-12 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400">Please enter your details to sign in</p>
                    </div>

                    <form className="space-y-6" onSubmit={HandleLogIn}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="name@company.com"
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                                <input 
                                    type={passwordIsShown ? "text" : "password"} 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} 
                                />
                                <button 
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    onClick={() => setPasswordIsShown(prev => !prev)}
                                >
                                    {passwordIsShown ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? <Loading /> : (
                                <>
                                    Log In 
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] px-2 text-gray-500">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <button onClick={() => navigate("/not-feature")} className="flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                            <img src="/google.png" className="w-5 h-5" alt="Google" />
                        </button>
                        <button onClick={() => navigate("/not-feature")} className="flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                            <img src="/facebook.png" className="w-5 h-5" alt="Facebook" />
                        </button>
                        <button onClick={() => navigate("/not-feature")} className="flex items-center justify-center py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                            <img src="/linkedin.png" className="w-5 h-5" alt="LinkedIn" />
                        </button>
                    </div>

                    <p className="mt-8 text-center text-gray-500">
                        Don't have an account? 
                        <button 
                            onClick={() => navigate('/auth/register')} 
                            className="ml-2 text-accent font-semibold hover:underline"
                        >
                            Register now
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;