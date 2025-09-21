import React from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../Layout";
import Footer from "../Footer";

const ProjectDetails = () => {
    const location = useLocation();
    const projectItem = location.state?.projectItem;

    if (!projectItem) {
        return <div>No news item found.</div>;
    }

    return (
        <>
            <Layout containerClass="project-details-container" />
            <div className="project-details-wrapper">
                <div className="project-details">
                    <div className="back-home-route">
                        <img src="/icon/back home.png" alt="back-home-icon" className="back-home-icon" />
                        <Link to="/kelanara" className="back-home">Back to Media</Link>
                    </div>
                    <div className="flex-wrapper">
                        <div className="image-wrapper">
                            <img src={projectItem.poster} alt={projectItem.title} className="details-image" />
                        </div>
                        <div className="details">
                            <h1 className="title">{projectItem.title}</h1>
                            <h4><strong>Deskripsi</strong></h4>
                            <p className="desc">{projectItem.desc}</p>
                            <h4><strong>Sinopsis</strong></h4>
                            <p className="sinopsis">{projectItem.sinopsis}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ProjectDetails;
