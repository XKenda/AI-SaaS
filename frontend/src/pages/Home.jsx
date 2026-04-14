import { useContext, useEffect, useState } from "react";
import { JobContext, UserContext } from "../App";
import Header from "../components/Header";
import Loading from "../components/loading";
import NumberOfJobs from "../components/NumberOfJobs";
import Job from "../components/Job";

const Home = () => {
    const jobContext = useContext(JobContext)
    const [jobs, setJobs] = useState({});
    
    useEffect(()=>{
        setJobs(jobContext.data)
    }, [jobContext])

    return (
        <>
        {
            !jobContext.data.jobs?
            <Loading /> :
            <div className="home-con w-full bg-primary border border-gray-200 p-20 grid grid-cols-3 grid-rows-3 gap-7">
            <div className="header con col-span-3 row-span-1">
                {
                    <Header />
                }
            </div>
            <div className="num-of-jobs col-span-3 row-span-1 md:col-span-1 md:row-span-3">
                {
                    <NumberOfJobs />
                }
            </div>
            <div className="jobs con max-h-150 col-span-3 row-span-1 md:col-span-2 md:row-span-2 p-5 overflow-y-scroll overflow-x-hidden">
                {
                    jobs.jobs?
                    jobs.jobs.map((job)=>(
                        <Job job={job} />
                    )) : <p className="no-jobs capitalize">No jobs yet</p>
                }
            </div>

        </div>
        }
    </>
    )
}

export default Home;