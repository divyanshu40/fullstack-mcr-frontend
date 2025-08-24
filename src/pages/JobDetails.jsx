import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const JobDetails = ({job}) => {

    return (
        <div>
            <p className="fs-3 fw-medium">{job?.title}</p>
            <div className="card">
                <div className="card-body">
                    <p><strong>Company Name: </strong>{job?.companyDetails.name}</p>
                    <p><strong>Location: </strong>{job?.companyDetails.location}</p>
                    <p><strong>Salary: </strong><i className="bi bi-currency-rupee"></i>{job?.companyDetails.salary}</p>
                    <p><strong>Job Type: </strong>{job?.companyDetails.jobType}</p>
                    <p><strong>Description: </strong>{job?.description}</p>
                    <p><strong>Qualifications: </strong></p>
                    <ol>
                        {job?.Qualifications.map((ele) => {
                            return (
                                <li key={ele}>{ele}</li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}

const JobDetailsPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [job, setJob] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`https://fullstack-mcr.vercel.app/job/details/${id}`)
        .then(async(response) => {
            let data = await response.json();
            if (! response.ok) {
                if (response.status === 404) {
                    throw new Error(data.message);
                } else if (response.status === 500) {
                    throw new Error("Cannot fetch job details");
                }
            }
            return data;
        })
        .then((responseData) => {
            setJob(responseData);
            setError(null);
        })
        .catch((error) => {
            setError(error.message);
            setJob(null);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <div>
            <Header/>
            <div className="container py-4">
              {loading && <div className="spinner-border text-primary position-fixed top-50 start-50"></div>}
              {error && <p className="fs-5 fw-medium text-center">{error}</p>}
              {!loading && <JobDetails job={job}/>}
            </div>
        </div>
    )
}

export default JobDetailsPage