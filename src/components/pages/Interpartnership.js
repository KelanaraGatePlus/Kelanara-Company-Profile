import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const Interpartnership = () => {
  const [interpartnershipPhotos, setInterpartnershipPhotos] = useState([]);
  const [languangeID, setLanguageID] = useState(null); 
  const [languangeEN, setLanguageEN] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("ID"); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/interpartnership_photos.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setInterpartnershipPhotos(data);
      })
      .catch(error => console.error("Error fetching interpartnership photos:", error));

    fetch("/data/languangeID.json")
      .then((response) => response.json())
      .then((data) => setLanguageID(data))
      .catch((error) => console.error("Error fetching languangeID data:", error));

    fetch("/data/languangeEN.json")
      .then((response) => response.json())
      .then((data) => setLanguageEN(data))
      .catch((error) => console.error("Error fetching languangeEN data:", error));

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setActiveLanguage(savedLanguage);
    }
  }, []); 

  const handleBackClick = () => {
    navigate(-1);
  };

  const translations = activeLanguage === "ID" ? languangeID : languangeEN;

  if (!translations) {
    return <p>Loading translations...</p>;
  }

  return (
    <>
      <Layout containerClass="interpartnership-container">
        <div className="interpartnership-content">
          <div className="back-home-route" onClick={handleBackClick}>
            <img
              src="/icon/back home.png"
              alt={translations[0]?.navbar.back || "Back"}
              className="back-home-icon"
            />
            <span className="back-home">
              {translations[0]?.navbar.back || "Back"}
            </span>
          </div>

          <h1 className="interpartnership-title">
            {translations[2]?.about.inpartnershipTitle || "Inpartnership Photos"}
          </h1>
          <p className="interpartnership-intro-desc">
            {translations[2]?.about.inpartnershipDesc || "This is a collection of photos from our various collaborations and inpartnerships."}
          </p>

          <div className="interpartnership-grid">
            {interpartnershipPhotos.map((photo, index) => (
              <div key={photo.id || index} className="interpartnership-item">
                <img
                  src={photo.src}
                  alt={photo.alt || `Interpartnership Photo ${index + 1}`}
                  className="interpartnership-image"
                />
                <p className="interpartnership-image-title">
                  {translations[2]?.about.inpartnershipDes || "Partner Name"}
                  <br />
                  {translations[2]?.about.inpartnershipDes || "Role"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>

      <Footer />
    </>
  );
};

export default Interpartnership;
