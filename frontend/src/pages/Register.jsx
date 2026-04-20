import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { RegisterAPI } from "../../API/userApi";
import Loading from "../components/loading";
import { motion } from "framer-motion";
import { User, Mail, Lock, Calendar, Camera, ArrowRight, Check, AlertCircle } from "lucide-react";

const Register = () => {
    const [passwordIsShown, setPasswordIsShown] = useState(false);
    const [confirmPasswordIsShown, setConfirmPasswordIsShown] = useState(false);
    const [confirmRes, setConfirmRes] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        image: null,
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: ''
    });

    const CreateAccount = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const data = new FormData();
        data.append('username', `${formData.firstName} ${formData.lastName}`);
        data.append('email', formData.email);
        data.append('age', formData.age);
        data.append('password', formData.password);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await RegisterAPI(data).then((res) => {
                if (res) {
                    navigate('/login');
                }
            }).catch((e) => {
                setErrorMessage(e.response?.data?.message || "Registration failed");
            });
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const HandleConfirmPassword = (e) => {
        const text = e.target.value;
        setFormData(prev => ({ ...prev, confirmPassword: text }));
        setConfirmRes(text === formData.password);
    };

    return (
        <div className="auth-gradient min-h-screen flex items-center justify-center p-4 md:p-10 selection:bg-accent/30">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row-reverse max-w-6xl w-full shadow-2xl"
            >
                {/* Info Section */}
                <div className="lg:w-4/12 bg-accent/10 p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                            <User className="text-white" size={24} />
                        </div>
                        <h3 className="text-3xl font-extrabold text-white leading-tight mb-4">
                            Join the best job tracking community
                        </h3>
                        <p className="text-indigo-200/80 text-lg">
                            Take control of your career journey. Simple, powerful, and designed for growth.
                        </p>
                        
                        <div className="mt-10 space-y-4">
                            {[
                                "AI application insights",
                                "Workflow automation",
                                "Community support"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-indigo-100/70">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Check className="text-emerald-400" size={12} />
                                    </div>
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 pt-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 p-1">
                                <div className="w-full h-full rounded-full bg-accent flex items-center justify-center text-xs font-bold">MI</div>
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">Mahmoud Ibrahim</p>
                                <p className="text-indigo-300 text-xs opacity-60">Lead Developer</p>
                            </div>
                        </div>
                    </div>
                </div>

     
                <div className="lg:w-8/12 p-8 md:p-12">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400">Join thousands of developers tracking their success</p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={CreateAccount}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">First Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="John"
                                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Last Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="Doe"
                                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} 
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="john@example.com"
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Age</label>
                            <div className="relative group">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="number" 
                                    min="13"
                                    max="100"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="25"
                                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))} 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Profile Photo</label>
                            <div className="relative group">
                                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white file:hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))} 
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                                    {formData.image ? formData.image.name.substring(0, 15) + '...' : 'Optional'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type={passwordIsShown ? "text" : "password"} 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} 
                                />
                                <button type="button" onClick={() => setPasswordIsShown(!passwordIsShown)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                    {passwordIsShown ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type={confirmPasswordIsShown ? "text" : "password"} 
                                    required
                                    className={`w-full bg-white/5 border ${confirmRes === false ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-3.5 pl-11 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all`}
                                    placeholder="••••••••"
                                    onChange={HandleConfirmPassword} 
                                />
                                <button type="button" onClick={() => setConfirmPasswordIsShown(!confirmPasswordIsShown)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                    {confirmPasswordIsShown ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {errorMessage && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                <AlertCircle size={18} />
                                <p className="text-sm font-medium">{errorMessage}</p>
                            </motion.div>
                        )}

                        <div className="md:col-span-2 pt-2">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isLoading ? <Loading /> : (
                                    <>
                                        Create Account 
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] px-2 text-gray-500">Or sign up with</span></div>
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
                        Already have an account? 
                        <button 
                            onClick={() => navigate('/auth/login')} 
                            className="ml-2 text-accent font-semibold hover:underline"
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default Register;
