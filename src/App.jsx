import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

const CardComponent = ({obj, setJobs, setDisplayMessage}) => {

  const deleteBtnHandler = async () => {
    let deletedJob = await fetch(`https://fullstack-mcr.vercel.app/job/delete/${obj._id}`, {
      method: "DELETE"
    });
    let response = await fetch("https://fullstack-mcr.vercel.app/jobs");
    let responseData = await response.json();
    setJobs(responseData);
    setDisplayMessage(true);
    setTimeout(() => {
      setDisplayMessage(false);
    }, 5000);
  }

  return (
    <div className="card">
      <div className="card-body">
        <p className="fs-3 fw-medium">{obj.title}</p>
        <p><strong>Company Name: </strong>{obj.companyDetails.name}</p>
        <p><strong>Location: </strong>{obj.companyDetails.location}</p>
        <p><strong>Job Type: </strong>{obj.companyDetails.jobType}</p>
        <div className="d-flex">
          <Link className="btn btn-primary px-4" to={`/jobDetails/${obj._id}`}>See Details</Link>
          <button className="btn btn-danger ms-4 px-5" onClick={deleteBtnHandler}>Delete</button>
        </div>
      </div>
    </div>
  )
}

const JobsList = ({setLoading, setError, setDisplayMessage, jobs, setJobs}) => {

  useEffect(() => {
    fetch("https://fullstack-mcr.vercel.app/jobs")
    .then(async(response) => {
      let data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(data.message);
        } else if (response.status === 500) {
          throw new Error("Cannot fetch jobs");
        }
      }
      return data;
    })
    .then((responseData) => {
      setJobs(responseData);
      setError(null);
    })
    .catch((error) => {
      setError(error.message);
      setJobs(null);
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);
  console.log(jobs);

  return (
    <div className="py-4">
      <h4 className="display-5 fw-medium">All Jobs</h4>
      <div className="row py-2">
        {jobs?.map((obj) => {
          return (
            <div className="col-md-4 gy-3" key={obj._id}>
              <CardComponent obj={obj} setJobs={setJobs} setDisplayMessage={setDisplayMessage}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const JobsPostingPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [jobs, setJobs] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchBtnHandler = () => {
    let array = searchQuery.split(" ");
    let formattedArray = array.map((ele) => {
      let str = ele[0].toUpperCase() + ele.slice(1);
      return str
    });
    let formattedSearchQuery = formattedArray.join(" ");
    fetch(`https://fullstack-mcr.vercel.app/jobs/title?jobTitle=${formattedSearchQuery}`)
    .then(async(response) => {
      let data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(data.message);
        } else if (response.status === 500) {
          throw new Error("Cannot fetch jobs with this title");
        }
      }
      return data;
    })
    .then((responseData) => {
      setJobs(responseData);
      setError(null);
    })
    .catch((error) => {
      setError(error.message);
      setJobs(null);
    })
  }

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="col-md-6 py-4">
          <div className="input-group">
            <input
            type="text"
            className="form-control border black"
            placeholder="Search by job title"
            onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button className="btn btn-primary" onClick={(searchBtnHandler)}><i className="bi bi-search"></i> Search</button>
          </div>
        </div>
        {displayMessage && <div className="row d-flex justify-content-center py-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <p className="fs-5 fw-medium" style={{ color: "red" } }>Job deleted successfully.</p>
              </div>
            </div>
          </div>
        </div>}
        {loading && <div className="spinner-border text-primary position-fixed top-50 start-50"></div>}
        {error && <p className="fs-5 fw-medium position-fixed top-50 start-50">{error}</p>}
        <JobsList setError={setError} setLoading={setLoading} setDisplayMessage={setDisplayMessage} jobs={jobs} setJobs={setJobs}/>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <JobsPostingPage/>
  )
}

export default App