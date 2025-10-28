import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Form = ({setMessage}) => {
    const [jobData, setJobData] = useState({
        title: "",
        companyDetails: {
            name: "",
            location: "",
            salary: "",
            jobType: ""
        },
        description: "",
        Qualifications: []
    });
    const navigate = useNavigate();

    const formSubmitHandler = (event) => {
        event.preventDefault();
        fetch("https://fullstack-mcr.vercel.app/jobs/new", {
            method: "POST",
            body: JSON.stringify(jobData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async(response) => {
            let data = await response.json();
            if (! response.ok) {
                setMessage("Error in saving jobs");
            } else {
                setMessage("Job posted successfully");
            }
            return data
        })
        .then(() => {
            setTimeout(() => {
                navigate("/");
            }, 5000);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="col mt-4">
                <label className="form-label fs-5 fw-medium">Job Title:</label>
                <input
                type="text"
                className="form-control border-black"
                required
                onChange={(event) => setJobData((prevData) => ({
                    ...prevData, title: event.target.value
                }))}
                placeholder="Enter the job title"
                />
            </div>
            <div className="col mt-4">
                <label className="form-label fs-5 fw-medium">Company Name: </label>
                <input
                type="text"
                className="form-control border-black"
                required
                onChange={(event) => setJobData((prevData) => ({
                    ...prevData, companyDetails: {...prevData.companyDetails, name: event.target.value}
                }))}
                placeholder="Enter the company name"
                />
            </div>
            <div className="col mt-4">
                <label className="form-label fs-5 fw-medium">Location:</label>
                <input
                type="text"
                className="form-control border-black"
                required
                onChange={(event) => setJobData((prevData) => ({
                    ...prevData, companyDetails: {...prevData.companyDetails, location: event.target.value}
                }))}
                placeholder="Enter the location"
                />
            </div>
            <div className="col mt-4">
                <label className="form-label fs-5 fw-medium">Salary: </label>
                <input
                type="number"
                className="form-control border-black"
                required
                onChange={(event) => setJobData((prevData) => ({
                    ...prevData, companyDetails: {...prevData.companyDetails, salary: event.target.value}
                }))}
                placeholder="Enter the salary provided for the role"
                />
            </div>
            <div className="col mt-4">
                <label className="form-label fs-5 fw-medium">Job Type: </label>
                <select 
                className="form-select"
                required
                onChange={(event) => setJobData((prevData) => ({
                    ...prevData, companyDetails: {...prevData.companyDetails, jobType: event.target.value}
                }))}
                >
                    <option value="">--Select Job Type--</option>
                    <option value=" Full-time (On-site)"> Full-time (On-site)</option>
                    <option value=" Part-time (On-site)"> Part-time (On-site)</option>
                    <option value="Full-time (Remote)">Full-time (Remote)</option>
                    <option value="Part-time (Remote)">Part-time (Remote)</option>
                </select>
            </div>
            <div className="col mt-4">
                <label className="form-label fs-5 fw-medium">Job Description:</label>
                <textarea
                className="form-control border-black"
                rows={5}
                required
                onChange={(event) => setJobData((prevData) => ({
                    ...prevData, description: event.target.value
                }))}
                placeholder="Enter the job description"
                ></textarea>
            </div>
            <div className="col mt-4">
                <label className="form-label fs-5 fw-medium">Job Qualification:</label>
                <textarea
                className="form-control border-black"
                rows={5}
                required
                onChange={(event) => setJobData((prevData) => {
                    let array = event.target.value.split(", ");
                    return {...prevData, Qualifications: [...prevData.Qualifications, ...array]}
                })}
                placeholder="Enter the qualification required for the job"
                ></textarea>
            </div>
            <div className="col py-4">
                <button type="submit" className="btn btn-primary">Post Job</button>
            </div>
        </form>
    )
}

const PostJobPage = () => {
    const [message, setMessage] = useState("");
    return (
        <div>
            <Header/>
            <div className="container">
                {message && <div className="row py-4 justify-content-center">
  <div className="col-md-4">
    <div className="card">
      <div className="card-body text-center">
        <p className="fs-5 fw-medium" style={{ color: message === "Job posted successfully" ? "green" : "red" }}>
          {message}
        </p>
      </div>
    </div>
  </div>
</div>
}
                <h5 className="display-5 fw-normal mt-4">Post a Job</h5>
                <Form setMessage={setMessage}/>
            </div>
        </div>
    )
}

export default PostJobPage