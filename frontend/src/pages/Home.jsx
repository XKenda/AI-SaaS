import { useContext } from "react";
import { UserContext } from "../App";
import Header from "../components/Header";

const Home = () => {
    const user = useContext({...UserContext})


    return (
        <div className="home-con w-full h-lvh bg-amber-50 p-20">
            <Header user={user} />
            
        </div>
    )
}

export default Home;