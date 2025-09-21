import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    const [languageData, setLanguageData] = useState(null);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');

        const languageFile = savedLanguage === 'ID' ? '/data/languangeID.json' : '/data/languangeEN.json';
        fetch(languageFile)
            .then((response) => response.json())
            .then((data) => setLanguageData(data[0]))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const links = [
        { key: 'home', label: languageData?.navbar?.home },
        { key: 'about', label: languageData?.navbar?.about },
        { key: 'kelanara', label: languageData?.navbar?.kelanara },
        { key: 'project', label: languageData?.navbar?.project },
        { key: 'media', label: languageData?.navbar?.media },
        { key: 'contact', label: languageData?.navbar?.contact }
    ];

    return (
        <div className="footer-container">
            <div className="menu-socmend-info-wrapper">
                <div className="menu-socmed-wrapper">
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/facebook.png" alt="facebook-icon" className="icon" />
                        </a>
                        <a href="https://www.instagram.com/kelanarastudio/" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/instagram.png" alt="instagram-icon" className="icon" />
                        </a>
                        <a href="https://x.com/KelanaraStudio" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/twitter.png" alt="twitter-icon" className="icon" />
                        </a>
                        <a href="https://www.youtube.com/@KelanaraStudio/featured" target="_blank" rel="noopener noreferrer">
                            <img src="/icon/youtube.png" alt="youtube-icon" className="icon" />
                        </a>
                    </div>
                    <div className="menu">
                        {links.map(({ key, label }) => (
                            <Link key={key} to={`/${key === 'home' ? '' : key}`} className="menu-text">
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="information-wrapper">
                    <img src="/img/Logo Kelanara Footer.png" alt="logo-kelanara" className="logo-kelanara" />
                    <div className="information">
                        <div className="address">
                            <p className="title">PT JERO MEDIA ABADI</p>
                            <p className="the-address">XL Axiata Tower, 10th Floor<br />Jl. H. R. Rasuna Said X5 Kav. 11-12<br />Kuningan Tim.<br />Kecamatan Setiabudi<br />DKI Jakarta<br />12950</p>
                        </div>
                        <div className="contact">
                            <p className="title">Contact Person</p>
                            <p className="the-contact">+62 2150955747<br />kelanarastudio@gmail.com</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="line"></div>
            <div className="copyright">
                <p className="text">Kelanara Studio. All Right Reserved. Developed by Kelanara IT teams.</p>
            </div>
        </div>
    );
}

export default Footer;
