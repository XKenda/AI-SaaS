import { useContext, useRef } from "react";
import { UserContext } from "../App";
import { updateUser } from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import { Plus, User, LogOut } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const titleInputRef = useRef(null);
    const user = useContext(UserContext); 

    if (!user) return null;

    const { profileImgUrl, username, title } = user.user;

    const HandleTitleSubmit = async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const newData = titleInputRef.current.value;
            await updateUser({ title: newData });
        }
    };

    return (
        <header className="glass mb-8 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-accent/20 group-hover:ring-accent/50 transition-all duration-300">
                        {profileImgUrl ? (
                            <img src={profileImgUrl} alt={username} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-secondary flex items-center justify-center text-accent">
                                <User size={32} />
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent capitalize">
                        Welcome back, {username}!
                    </h2>
                    <div className="flex items-center gap-2 text-gray-400">
                        {title ? (
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-accent/10 text-accent ring-1 ring-accent/20">
                                {title}
                            </span>
                        ) : (
                            <input
                                ref={titleInputRef}
                                onKeyDown={HandleTitleSubmit}
                                type="text"
                                placeholder="Add your professional title..."
                                className="bg-transparent border-b border-gray-700 focus:border-accent outline-none text-sm transition-colors"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate('/create/job')} 
                    className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg shadow-accent/20 active:scale-95"
                >
                    <Plus size={20} />
                    <span>Add New Job</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
