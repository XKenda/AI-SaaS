

const Header = ({user}) => {
    const {profileImgUrl, username, title, employed} = user;
    return (
        <div className="header-con flex">
            <div className="img-con">
                <img src={profileImgUrl} alt={username} className="user-img w-50" />
            </div>
            <div className="details-con flex flex-col justify-between px-5 py-2">
                <div className="title-con">

                <h2 className="username capitalize text-2xl">{username}</h2>
                <p className="title">{title? <span className="title-span text-gray-500">{title}</span> : 
                    <input type="text" name="add title" id="title" placeholder="Click to add title" />
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