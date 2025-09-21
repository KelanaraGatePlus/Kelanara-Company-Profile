import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [activeLanguage, setActiveLanguage] = useState('ID');
    const [languageData, setLanguageData] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setIsMenuOpen(false); // Ensure menu closes on resize
        }
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setActiveLanguage(savedLanguage);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const languageFile = activeLanguage === 'ID' ? '/data/languangeID.json' : '/data/languangeEN.json';
        fetch(languageFile)
            .then((response) => response.json())
            .then((data) => setLanguageData(data[0]))
            .catch((error) => console.error("Error fetching data:", error));
    }, [activeLanguage]);

    const handleLanguageClick = (language) => {
        setActiveLanguage(language);
        localStorage.setItem('language', language);
        window.location.reload();
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false); // Close menu when clicking a link
    };

    const links = [
        { key: 'home', label: languageData?.navbar?.home },
        { key: 'about', label: languageData?.navbar?.about },
        { key: 'kelanara', label: languageData?.navbar?.kelanara },
        { key: 'media', label: languageData?.navbar?.media },
        { key: 'contact', label: languageData?.navbar?.contact }
    ];

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container d-flex justify-content-between">
                <img src="/img/Logo Kelanara.png" alt="Kelanara Logo" className="navbar-brand-logo" />

                {/* Hamburger Menu for smaller screens */}
                <button
                    className={`navbar-toggler ${isMenuOpen ? 'open' : ''}`}
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Wrapper */}
                <div className={`navbar-wrapper ${isMenuOpen ? 'show' : 'none'}`}>
                    {/* Navbar links */}
                    <div className={`navbar-nav ${isMenuOpen ? 'show' : 'none'}`}>
                        {links.map(({ key, label }) => (
                            <Link
                                key={key}
                                className={`nav-link ${location.pathname === `/${key === 'home' ? '' : key}` ? 'active glow' : ''}`}
                                to={`/${key === 'home' ? '' : key}`}
                                onClick={handleLinkClick} // Close menu on click
                            >
                                {label || key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        ))}
                    </div>

                    <div className="language-toggle">
                        <span
                            className={`nav-link ${activeLanguage === 'EN' ? 'active glow' : ''}`}
                            onClick={() => handleLanguageClick('EN')}
                        >
                            EN
                        </span>
                        <div className="language-separator"></div>
                        <span
                            className={`nav-link ${activeLanguage === 'ID' ? 'active glow' : ''}`}
                            onClick={() => handleLanguageClick('ID')}
                        >
                            ID
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
