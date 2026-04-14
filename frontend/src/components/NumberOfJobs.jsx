import { useContext } from "react";
import { JobContext } from "../App";
import Loading from "./loading";


const NumberOfJobs = () => {
    const jobsContext = useContext(JobContext)
    console.log(jobsContext)
    return (
        <div className="number-of-jobs  text-[20px] lg:text-2xl  h-full px-5 lg:px-20 py-10">
            {
                jobsContext.data.jobs? 
            <div className="number-con">

            <p className="number-of-jobs-titl flex justify-between">Total Jobs <span>{jobsContext.data.count}</span></p>
            <hr className="w-full my-5" />
            <p className="number-of-pending">Pending <span>{
                jobsContext.data.jobs.filter((job) =>{ return job.status === "pending"}).length
            }</span></p>
            <p className="number-of-interview">Interview <span>{
                jobsContext.data.jobs.filter((job) =>{ return job.status === "interview"}).length
            }</span></p>
            <p className="number-of-offered">Offered <span>{
                jobsContext.data.jobs.filter((job) =>{ return job.status === "offered"}).length
            }</span></p>
            <p className="number-of-declined">Declined <span>{
                jobsContext.data.jobs.filter((job) =>{ return job.status === "declined"}).length
            }</span></p>
            </div> : <Loading />
            
        } 
        </div>
    )
}

export default NumberOfJobs;