
const Job = ({job}) => {
    const {company, position, location, status, JobType} = job
    return (
        <div className="job-con p-5 flex justify-between border border-accent rounded-2xl my-2">
            <div className="job-primary-details">
                <p className="company-name text-2xl">{company}</p>
                <p className="position my-1">{position}</p>
                <p className="job-type">{JobType}</p>
            </div>
            <div className="job-secondary-detils flex flex-col justify-between">
                <p className="status text-2xl">{status}</p>
                <p className="lacation">{location}</p>
            </div>
        </div>
    );
}

export default Job;