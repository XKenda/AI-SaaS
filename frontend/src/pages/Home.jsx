import { useContext, useEffect, useState } from "react";
import { JobContext, UserContext } from "../App";
import Header from "../components/Header";
import Loading from "../components/loading";
import NumberOfJobs from "../components/NumberOfJobs";

const Home = () => {


    return (
        <div className="home-con w-full bg-primary border border-gray-200 p-20 grid grid-cols-3 grid-rows-3 gap-2.5">
            <div className="header col-span-3 row-span-1">
                {
                   <Header />
                }
            </div>
            <div className="num-of-jobs col-span-3 row-span-1 md:col-span-1 md:row-span-3">
                {
                    <NumberOfJobs />
                }
            </div>
            <div className="jobs col-span-3 row-span-1 md:col-span-2 md:row-span-2">
                
            </div>

        </div>
    )
}

export default Home;