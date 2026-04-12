import { TextAlignJustify, X } from "lucide-react"
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div className="sidebar-con fixed h-dvh w-full sm:w-40">
            <div className="header flex justify-between pt-2">
                <p className="tile ml-2">Side bar</p>
                <TextAlignJustify className="btn" size={30}  />
            </div>
            <hr className="my-3" />
            <div className="pages-list-con pl-2">
                <ul className="pages-list">
                    <li><NavLink className={({ isActive }) =>
                        isActive ? "text-red-500" : "text-black"
                        } to={'/home'} >
                        Home
                    </NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;