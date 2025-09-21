import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Footer from "../Footer";

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [languangeID, setLanguageID] = useState(null);
    const [languangeEN, setLanguageEN] = useState(null);
    const [activeLanguage, setActiveLanguage] = useState('ID');
    const navigate = useNavigate();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setActiveLanguage(savedLanguage);
        }

        fetch('/data/projects.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(projects_data => {
                setProjects(projects_data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        fetch("/data/languangeID.json")
            .then((response) => response.json())
            .then((data) => setLanguageID(data))
            .catch((error) => console.error("Error fetching data:", error));

        fetch("/data/languangeEN.json")
            .then((response) => response.json())
            .then((data) => setLanguageEN(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleProjectClick = (projectItem) => {
        navigate(`/project/${projectItem.id}`, { state: { projectItem } }); // Redirect to the project details page
    };

    return (
        <>
            <Layout containerClass="project-container" />
            <div className="all-project-wrapper">
                <h2 className="title">
                    {activeLanguage === 'ID' && languangeID && languangeID[3] && languangeID[3].project.project.title ? (
                        languangeID[3].project.project.title
                    ) : activeLanguage === 'EN' && languangeEN && languangeEN[3] && languangeEN[3].project.project.title ? (
                        languangeEN[3].project.project.title
                    ) : (
                        <p>Loading...</p>
                    )}
                </h2>
            </div>
            <div className="all-project-grid">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-item"
                        onClick={() => handleProjectClick(project)}
                    >
                        <img src={project.poster} alt={project.title} className="project-image" />
                        <h3 className="project-title">{project.title}</h3>
                    </div>
                ))}
            </div>


            <Footer />
        </>
    );
};

export default Project;
