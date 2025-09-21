import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import './Aboutbutton.css';

const Aboutbutton = () => {
    const [languangeID, setLanguageID] = useState(null);
    const [languangeEN, setLanguageEN] = useState(null);
    const [activeLanguage, setActiveLanguage] = useState('ID');

    useEffect(() => {

        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setActiveLanguage(savedLanguage);
        }

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
        <div className="button">
            <img src="/icon/read more.png" alt="read-more-icon" className="read-more-icon" />
            <Link to="/about" className="link">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.about.aboutBtn ? (
              languangeID[1].home.about.aboutBtn
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.about.aboutBtn ? (
              languangeEN[1].home.about.aboutBtn
            ) : (
              <p>Loading...</p>
            )}
            </Link>
        </div>
    );
}

export default Aboutbutton;