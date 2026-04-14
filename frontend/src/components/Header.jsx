import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";
import { updateUser } from "../../API/userApi";


const Header = () => {

    const titleInputRef = useRef(null)

    const user = useContext({...UserContext})
    const {profileImgUrl, username, title, employed} = user.user;

    useEffect(()=>{
        document.getElementById("title").addEventListener("keydown", async (event) => {
            if(event.key == "Enter") {
                event.preventDefault();
                const newData = titleInputRef.current.value;
                console.log(newData)
                user.setUser(prev => ({...prev, title: newData}))
                await updateUser({title: newData})
            }
        })

        return document.getElementById("title").removeEventListener("keydown", (event) => {
            console.log(event)
        })
    }, [])


    return (
        <div className="header-con bg-secoundry flex rounded-2xl p-10">
            <div className="img-con w-50 h-40 rounded-full overflow-hidden flex justify-center">
                <img src={profileImgUrl? profileImgUrl: null} alt={username} className="user-img" />
            </div>
            <div className="details-con flex flex-col justify-between px-5 py-2">
                <div className="title-con">

                <h2 className="username capitalize text-2xl">{username}</h2>
                <p className="title">{title? <span className="title-span text-gray-500">{title}</span> : 
                    <input ref={titleInputRef}  type="text" name="add title" id="title" placeholder="Click to add title" />
                }</p>
                </div>
                <div className="status-con">    
                <p className="current-status">{employed? "employed" : "unemployed"}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;