import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import '../../App.css';
import Footer from "../Footer";
import Contactbutton from "../Contactbutton";

const Contact = () => {
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
        <>
            <Layout containerClass="contact-wrapper"></Layout>
            <div className="form">
                <div className="form-info-wrapper">
                    <div className="form-input">
                        <h2 className="cta">
                            {activeLanguage === 'ID' && languangeID && languangeID[5] && languangeID[5].contact.contact.title ? (
                                languangeID[5].contact.contact.title
                            ) : activeLanguage === 'EN' && languangeEN && languangeEN[5] && languangeEN[5].contact.contact.title ? (
                                languangeEN[5].contact.contact.title
                            ) : (
                                <p>Loading...</p>
                            )}
                        </h2>
                        <p className="desc">
                            {activeLanguage === 'ID' && languangeID && languangeID[5] && languangeID[5].contact.contact.text ? (
                                languangeID[5].contact.contact.text
                            ) : activeLanguage === 'EN' && languangeEN && languangeEN[5] && languangeEN[5].contact.contact.text ? (
                                languangeEN[5].contact.contact.text
                            ) : (
                                <p>Loading...</p>
                            )}
                        </p>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Fullname" aria-label="Fullname" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Organization" aria-label="Organization" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Email" aria-label="Email" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Phone" aria-label="Phone" />
                            </div>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Additional Message" aria-label="Additional Message" />
                        </div>
                        <Contactbutton />
                    </div>
                    <div className="org-info">
                        <div className="whatsapp-contact">
                            <p className="text">Whatsapp</p>
                            <p className="text">+62 2150955747</p>
                        </div>
                        <div className="email-contact">
                            <p className="text">Email</p>
                            <p className="text">kelanarastudio@gmail.com</p>
                        </div>
                        <div className="socmed-icon">
                            <p className="text">
                                {activeLanguage === 'ID' && languangeID && languangeID[5] && languangeID[5].contact.contact.followUs ? (
                                    languangeID[5].contact.contact.followUs
                                ) : activeLanguage === 'EN' && languangeEN && languangeEN[5] && languangeEN[5].contact.contact.followUs ? (
                                    languangeEN[5].contact.contact.followUs
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </p>
                            <div className="social-media">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <img src="/icon/facebook-grey.png" alt="facebook-icon" className="icon" />
                                </a>
                                <a href="https://www.instagram.com/kelanarastudio/" target="_blank" rel="noopener noreferrer">
                                    <img src="/icon/instagram-grey.png" alt="instagram-icon" className="icon" />
                                </a>
                                <a href="https://x.com/KelanaraStudio" target="_blank" rel="noopener noreferrer">
                                    <img src="/icon/twitter-grey.png" alt="twitter-icon" className="icon" />
                                </a>
                                <a href="https://www.youtube.com/@KelanaraStudio/featured" target="_blank" rel="noopener noreferrer">
                                    <img src="/icon/youtube-grey.png" alt="youtube-icon" className="icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact;