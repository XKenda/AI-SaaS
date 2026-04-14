import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";
import { updateUser } from "../../API/userApi";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate()

    const titleInputRef = useRef(null)

    const user = useContext({...UserContext})
    const {profileImgUrl, username, title, employed} = user.user;

    const HandleTitleSubmit = async (event) => {
            if(event.key == "Enter") {
                event.preventDefault();
                const newData = titleInputRef.current.value;
                console.log(newData)
                user.setUser(prev => ({...prev, title: newData}))
                await updateUser({title: newData})
            }
        }



    return (
        <div className="header-con flex flex-col md:flex-row justify-center items-center md:justify-start gap-4 rounded-2xl px-2 md:px-10 py-10">
            <div className="img-con w-50 h-40 rounded-full overflow-hidden flex justify-center">
                <img src={profileImgUrl? profileImgUrl: null} alt={username} className="user-img" />
            </div>
            <div className=" flex justify-between w-full flex-col md:flex-row items-center">
                <div className="details-con  flex flex-col justify-between px-5 py-2">

                <div className="title-con">

                <h2 className="username capitalize text-4xl">{username}</h2>
                <p className="title">{title? <span className="title-span text-2xl text-gray-500">{title}</span> : 
                    <input ref={titleInputRef} onKeyDown={HandleTitleSubmit}  type="text" name="add title" id="title" placeholder="Click to add title" />
                }</p>
                </div>
                <div className="status-con">    
                <p className="current-status mt-20 text-2xl ">{employed? "Working" : "Not Working"}</p>
                </div>
                </div>
                <div className="btns-con mt-15 md:mt-0">
                    <button onClick={()=> navigate('/create/job')} className="bg-accent text-white px-10 py-3 rounded-2xl cursor-pointer hover:bg-blue-800 duration-200">Add Job</button>
                </div>
            </div>
        </div>
    );
}

export default Header;