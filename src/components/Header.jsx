import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [navElement, setNavElement] = useState("");
    return (
        <header>
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container">
                <NavLink className="navbar-brand text-light" to="/">Intern House</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
                 </button>
                 <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {navElement === "Jobs Postings" ? <NavLink to="/" className="nav-link text-light" onMouseLeave={() => setNavElement("")}>Jobs Postings</NavLink> : <NavLink className="nav-link text-light opacity-75" onMouseEnter={() => setNavElement("Jobs Postings")}>Jobs Postings</NavLink>}
                        </li>
                        <li className="nav-item">
                            {navElement === "Post a Job" ? <NavLink to="/postJob" className="nav-link text-light" onMouseLeave={() => setNavElement("")}>Post a Job</NavLink> : <NavLink className="nav-link text-light opacity-75" onMouseEnter={() => setNavElement("Post a Job")}>Post a Job</NavLink>}
                        </li>
                    </ul>
                 </div>
            </div>
        </nav>
    </header>
    )
}

export default Header