import { useContext, useEffect, useState } from "react";
import { JobContext, UserContext } from "../App";
import Header from "../components/Header";
import Loading from "../components/loading";

const Home = () => {


    return (
        <div className="home-con w-full h-lvh bg-primary p-20 grid grid-cols-3 grid-rows-3">
            <div className="header col-span-3 row-span-1">
                {
                   <Header />
                }
            </div>
            <div className="num-of-jobs">

            </div>

        </div>
    )
}

export default Home;