import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Footer";
import Layout from "../Layout";
import '../../App.css';

const NewsDetails = () => {
    const location = useLocation();
    const newsItem = location.state?.newsItem; // Retrieve passed data

    if (!newsItem) {
        return <div>No news item found.</div>;
    }

    return (
        <>
            <Layout containerClass="news-details-container" />
            <div className="news-details-wrapper">
                <div className="news-details">
                    <div className="back-home-route">
                        <img src="/icon/back home.png" alt="back-home-icon" className="back-home-icon" />
                        <Link to="/media" className="back-home">Back to Media</Link>
                    </div>
                    <div className="flex-wrapper">
                        <img src={newsItem.poster} alt={newsItem.title} className="details-image" />
                        <div className="details">
                            <h1 className="title">{newsItem.title}</h1>
                            <p className="desc">{newsItem.desc}</p>
                            <p className="published">{newsItem.date}/ Published by {newsItem.publisher}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewsDetails;
