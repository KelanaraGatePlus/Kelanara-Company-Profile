import React, { useEffect, useState } from "react";
import "../../App.css";
import Layout from "../Layout";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const ProjectCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(projects.length - 3, 0) : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 3 ? 0 : prevIndex + 1
    );
  };

  const visibleProjects = projects.slice(currentIndex, currentIndex + 3);

  return (
    <div className="project-wrapper">
      <div className="projects-grid">
        {visibleProjects.map((project, index) => (
          <div key={index} className="project-item">
            <img
              src={project.poster}
              alt={project.title}
              className="project-image"
            />
            <div className="overlay">
              <h3 className="project-title">{project.title}</h3>
              <div className="see-now">
                <a href="/kelanara">
                  <span>See Now</span>
                  <img
                    src="/icon/see now.png"
                    alt="See Now Icon"
                    className="icon"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn prev-btn" onClick={handlePrevClick}>
        </button>
        <button className="carousel-btn next-btn" onClick={handleNextClick}>
        </button>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const [folk, setFolks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [languangeID, setLanguageID] = useState(null);
  const [languangeEN, setLanguageEN] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("ID");
  const navigate = useNavigate();

  const interpartnershipPagePath = "/interpartnership";
  const gateplusWebsiteUrl = "https://www.gateplus.id/";
  const tamanaInstagramUrl = "https://www.instagram.com/tamana_mg?igsh=MTU3bGc3NmU5aHQ5dQ==";

  const gateplusLogo = "/img/logo/Logo Gateplus.jpg";
  const tamanaLogo = "/img/logo/tamana.png";

  const handleInterpartnershipClick = () => {
    navigate(interpartnershipPagePath);
  };

  const handleExternalLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setActiveLanguage(savedLanguage);
    }

    fetch("/data/folks.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((folk_data) => {
        setFolks(folk_data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });

    fetch("/data/projects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((projects_data) => {
        setProjects(projects_data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });

    fetch("/data/clients.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((clients_data) => {
        setClients(clients_data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
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

  return (
    <>
      <Layout containerClass="about-container" />
      <div className="about">
        <div className="title-container">
          <h2 className="title">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.about.title ? (
              languangeID[2].about.about.title
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.about.title ? (
              languangeEN[2].about.about.title
            ) : (
              <p>Loading...</p>
            )}
          </h2>
        </div>
        <div className="description-container">
          <p className="description">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.about.welcome ? (
              languangeID[2].about.about.welcome
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.about.welcome ? (
              languangeEN[2].about.about.welcome
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="description">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.about.desc1 ? (
              languangeID[2].about.about.desc1
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.about.desc1 ? (
              languangeEN[2].about.about.desc1
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="description">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.about.desc2 ? (
              languangeID[2].about.about.desc2
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.about.desc2 ? (
              languangeEN[2].about.about.desc2
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="description">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.about.desc3 ? (
              languangeID[2].about.about.desc3
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.about.desc3 ? (
              languangeEN[2].about.about.desc3
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="description">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.about.desc4 ? (
              languangeID[2].about.about.desc4
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.about.desc4 ? (
              languangeEN[2].about.about.desc4
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="description-up">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.about.desc5 ? (
              languangeID[2].about.about.desc5
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.about.desc5 ? (
              languangeEN[2].about.about.desc5
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="description">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.about.desc6 ? (
              languangeID[2].about.about.desc6
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.about.desc6 ? (
              languangeEN[2].about.about.desc6
            ) : (
              <p>Loading...</p>
            )}
          </p>
        </div>
      </div>
      <div className="expertise">
        <div className="expertise-wrapper">
          <div className="text">
            <h2 className="title">
              {activeLanguage === "ID" &&
                languangeID &&
                languangeID[2] &&
                languangeID[2].about.expertise.title ? (
                languangeID[2].about.expertise.title
              ) : activeLanguage === "EN" &&
                languangeEN &&
                languangeEN[2] &&
                languangeEN[2].about.expertise.title ? (
                languangeEN[2].about.expertise.title
              ) : (
                <p>Loading...</p>
              )}
            </h2>
          </div>
          <div className="all-expertise">
            <div className="expertise-item">
              <p className="expert-title">
                {activeLanguage === "ID" &&
                  languangeID &&
                  languangeID[2] &&
                  languangeID[2].about.expertise.item1.title ? (
                  languangeID[2].about.expertise.item1.title
                ) : activeLanguage === "EN" &&
                  languangeEN &&
                  languangeEN[2] &&
                  languangeEN[2].about.expertise.item1.title ? (
                  languangeEN[2].about.expertise.item1.title
                ) : (
                  <p>Loading...</p>
                )}
              </p>
              <p className="expert-desc">
                {activeLanguage === "ID" &&
                  languangeID &&
                  languangeID[2] &&
                  languangeID[2].about.expertise.item1.description ? (
                  languangeID[2].about.expertise.item1.description
                ) : activeLanguage === "EN" &&
                  languangeEN &&
                  languangeEN[2] &&
                  languangeEN[2].about.expertise.item1.description ? (
                  languangeEN[2].about.expertise.item1.description
                ) : (
                  <p>Loading...</p>
                )}
              </p>
            </div>
            <div className="expertise-item">
              <p className="expert-title">
                {activeLanguage === "ID" &&
                  languangeID &&
                  languangeID[2] &&
                  languangeID[2].about.expertise.item2.title ? (
                  languangeID[2].about.expertise.item2.title
                ) : activeLanguage === "EN" &&
                  languangeEN &&
                  languangeEN[2] &&
                  languangeEN[2].about.expertise.item2.title ? (
                  languangeEN[2].about.expertise.item2.title
                ) : (
                  <p>Loading...</p>
                )}
              </p>
              <p className="expert-desc">
                {activeLanguage === "ID" &&
                  languangeID &&
                  languangeID[2] &&
                  languangeID[2].about.expertise.item2.description ? (
                  languangeID[2].about.expertise.item2.description
                ) : activeLanguage === "EN" &&
                  languangeEN &&
                  languangeEN[2] &&
                  languangeEN[2].about.expertise.item2.description ? (
                  languangeEN[2].about.expertise.item2.description
                ) : (
                  <p>Loading...</p>
                )}
              </p>
            </div>
            <div className="expertise-item">
              <p className="expert-title">
                {activeLanguage === "ID" &&
                  languangeID &&
                  languangeID[2] &&
                  languangeID[2].about.expertise.item3.title ? (
                  languangeID[2].about.expertise.item3.title
                ) : activeLanguage === "EN" &&
                  languangeEN &&
                  languangeEN[2] &&
                  languangeEN[2].about.expertise.item3.title ? (
                  languangeEN[2].about.expertise.item3.title
                ) : (
                  <p>Loading...</p>
                )}
              </p>
              <p className="expert-desc">
                {activeLanguage === "ID" &&
                  languangeID &&
                  languangeID[2] &&
                  languangeID[2].about.expertise.item3.description ? (
                  languangeID[2].about.expertise.item3.description
                ) : activeLanguage === "EN" &&
                  languangeEN &&
                  languangeEN[2] &&
                  languangeEN[2].about.expertise.item3.description ? (
                  languangeEN[2].about.expertise.item3.description
                ) : (
                  <p>Loading...</p>
                )}
              </p>
            </div>
            <div className="expertise-item">
              <p className="expert-title">
                {activeLanguage === "ID" &&
                  languangeID &&
                  languangeID[2] &&
                  languangeID[2].about.expertise.item4.title ? (
                  languangeID[2].about.expertise.item4.title
                ) : activeLanguage === "EN" &&
                  languangeEN &&
                  languangeEN[2] &&
                  languangeEN[2].about.expertise.item4.title ? (
                  languangeEN[2].about.expertise.item4.title
                ) : (
                  <p>Loading...</p>
                )}
              </p>
              <p className="expert-desc">
                {activeLanguage === "ID" &&
                  languangeID &&
                  languangeID[2] &&
                  languangeID[2].about.expertise.item4.description ? (
                  languangeID[2].about.expertise.item4.description
                ) : activeLanguage === "EN" &&
                  languangeEN &&
                  languangeEN[2] &&
                  languangeEN[2].about.expertise.item4.description ? (
                  languangeEN[2].about.expertise.item4.description
                ) : (
                  <p>Loading...</p>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="folks">
        <h2 className="text">
          {activeLanguage === "ID" &&
            languangeID &&
            languangeID[2] &&
            languangeID[2].about.folks.title ? (
            languangeID[2].about.folks.title
          ) : activeLanguage === "EN" &&
            languangeEN &&
            languangeEN[2] &&
            languangeEN[2].about.folks.title ? (
            languangeEN[2].about.folks.title
          ) : (
            <p>Loading...</p>
          )}
          <div className="folks-intro-section">
            <p className="folks-intro-desc">
              {activeLanguage === "ID" &&
                languangeID &&
                languangeID[2] &&
                languangeID[2].about.folks.description ? (
                languangeID[2].about.folks.description
              ) : activeLanguage === "EN" &&
                languangeEN &&
                languangeEN[2] &&
                languangeEN[2].about.folks.description ? (
                languangeEN[2].about.folks.description
              ) : (
                <p>Loading...</p>
              )}
            </p>
          </div>
        </h2>
        <div className="folks-grid-layout">
          {folk.length > 0 && (
            <div className="folks-row folks-row-first">
              <div key={0} className="folk-item">
                <img src={folk[0].img} alt={folk[0].name} className="image" />
                <p className="folk-title">
                  {folk[0].name}
                  <br />
                  {folk[0].title}
                </p>
              </div>
            </div>
          )}
          {folk.length > 1 && (
            <div className="folks-row folks-row-second">
              {folk.slice(1, 3).map((folkItem, index) => (
                <div key={index + 1} className="folk-item">
                  <img src={folkItem.img} alt={folkItem.name} className="image" />
                  <p className="folk-title">
                    {folkItem.name}
                    <br />
                    {folkItem.title}
                  </p>
                </div>
              ))}
            </div>
          )}
          {folk.length > 2 && (
            <div className="folks-row folks-row-rest">
              {folk.slice(3).map((folkItem, index) => (
                <div key={index + 1} className="folk-item">
                  <img src={folkItem.img} alt={folkItem.name} className="image" />
                  <p className="folk-title">
                    {folkItem.name}
                    <br />
                    {folkItem.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p
          className="interpartnership-text collective-link text-style"
          onClick={handleInterpartnershipClick}
        >
          {activeLanguage === "ID" &&
            languangeID &&
            languangeID[2] &&
            languangeID[2].about.inpartnershipLink ? (
            languangeID[2].about.inpartnershipLink
          ) : activeLanguage === "EN" &&
            languangeEN &&
            languangeEN[2] &&
            languangeEN[2].about.inpartnershipLink ? (
            languangeEN[2].about.inpartnershipLink
          ) : (
            "Loading..."
          )}
        </p>
        <div className="partner-logos collective-logos">
          <img
            src={gateplusLogo}
            alt="Gateplus Logo"
            className="partner-logo"
            onClick={() => handleExternalLinkClick(gateplusWebsiteUrl)}
          />
          <img
            src={tamanaLogo}
            alt="Tamana Logo"
            className="partner-logo"
            onClick={() => handleExternalLinkClick(tamanaInstagramUrl)}
          />
        </div>
      </div>
      <div className="project-intro-section">
        <h2 className="project-intro-title">
          {activeLanguage === "ID" &&
            languangeID &&
            languangeID[2] &&
            languangeID[2].about.whyKelanara.title ? (
            languangeID[2].about.whyKelanara.title
          ) : activeLanguage === "EN" &&
            languangeEN &&
            languangeEN[2] &&
            languangeEN[2].about.whyKelanara.title ? (
            languangeEN[2].about.whyKelanara.title
          ) : (
            <p>Loading...</p>
          )}
        </h2>
        <p className="project-intro-desc">
          {activeLanguage === "ID" &&
            languangeID &&
            languangeID[2] &&
            languangeID[2].about.whyKelanara.description ? (
            languangeID[2].about.whyKelanara.description
          ) : activeLanguage === "EN" &&
            languangeEN &&
            languangeEN[2] &&
            languangeEN[2].about.whyKelanara.description ? (
            languangeEN[2].about.whyKelanara.description
          ) : (
            <p>Loading...</p>
          )}
        </p>
      </div>
      <ProjectCarousel projects={projects} />
      <div className="clients">
        <div className="title">
          <h2 className="text">
            {activeLanguage === "ID" &&
              languangeID &&
              languangeID[2] &&
              languangeID[2].about.client.title ? (
              languangeID[2].about.client.title
            ) : activeLanguage === "EN" &&
              languangeEN &&
              languangeEN[2] &&
              languangeEN[2].about.client.title ? (
              languangeEN[2].about.client.title
            ) : (
              <p>Loading...</p>
            )}
          </h2>
        </div>
        <div className="client-logos">
          {clients.map((client, index) => (
            <a
              key={index}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="client-logo"
              />
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;