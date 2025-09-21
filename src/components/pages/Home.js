import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Aboutbutton from "../Aboutbutton";
import TypingEffect from "../../effects/TypingEffect";
import "../../App.css";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [news, setNews] = useState([]);
  const [languangeID, setLanguageID] = useState(null);
  const [languangeEN, setLanguageEN] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState('ID');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setActiveLanguage(savedLanguage);
    }

    fetch("/data/youtube-videos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((videos_data) => {
        setVideos(videos_data);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
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
        console.error("There has been a problem with your fetch operation:", error);
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
        console.error("There has been a problem with your fetch operation:", error);
      });

    fetch("/data/news.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((news_data) => {
        setNews(news_data);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
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

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const handleProjectClick = (projectItem) => {
    navigate(`/project/${projectItem.id}`, { state: { projectItem } });
  };

  const handleNewsClick = (newsItem) => {
    navigate(`/media/${newsItem.id}`, { state: { newsItem } });
  };

  return (
    <>
      <Layout containerClass="home-container">
        <div className="home-headline">
          <h1 className="title">Kelanara Studio</h1>
          <h3 className="slogan">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.slogan ? (
              <TypingEffect
                text={languangeID[1].home.slogan}
                speed={100}
              />
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.slogan ? (
              <TypingEffect
                text={languangeEN[1].home.slogan}
                speed={100}
              />
            ) : (
              <p>Loading...</p>
            )}
          </h3>
        </div>
      </Layout>
      <div className="home-about">
        <div className="title-container">
          <h2 className="title">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.about.title ? (
              languangeID[1].home.about.title
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.about.title ? (
              languangeEN[1].home.about.title
            ) : (
              <p>Loading...</p>
            )}
          </h2>
          <h2 className="title">Kelanara</h2>
        </div>
        <div className="description-container">
          <p className="description-up">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.about.description ? (
              languangeID[1].home.about.description
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.about.description ? (
              languangeEN[1].home.about.description
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="description">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.about.welcome ? (
              languangeID[1].home.about.welcome
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.about.welcome ? (
              languangeEN[1].home.about.welcome
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="description">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.about.welcomeDescription ? (
              languangeID[1].home.about.welcomeDescription
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.about.welcomeDescription ? (
              languangeEN[1].home.about.welcomeDescription
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <Aboutbutton />
        </div>
      </div>
      <div className="home-video">
        <div className="video-wrapper">
          {!isPlaying ? (
            <div className="thumbnail-container">
              <img
                src={`https://img.youtube.com/vi/${videos[currentVideoIndex]?.id}/maxresdefault.jpg`}
                alt="Video Thumbnail"
                className="video-thumbnail"
              />
              <div className="play-button" onClick={handlePlay}>
                <img
                  src="/icon/play button.png"
                  alt="Play Button"
                  className="play-icon"
                />
              </div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videos[currentVideoIndex]?.id}?autoplay=1&modestbranding=1&showinfo=0&controls=1&rel=0&fs=1&color=white&disablekb=1&playsinline=1&iv_load_policy=3&enablejsapi=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="intro playing"
            ></iframe>
          )}
          <div className="bottom-wrapper">
            <div className="text-wrapper">
              <h4 className="video-text">{videos[currentVideoIndex]?.title}</h4>
              <p className="video-text-secondary">
                {videos[currentVideoIndex]?.date}
              </p>
              <div className="latest-video">
                <img
                  src="/icon/youtube play button.png"
                  alt="Youtube Play Button"
                  className="youtube-play-button-icon"
                />
                <p className="video-text-secondary">
                  {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.project.text ? (
                    languangeID[1].home.project.text
                  ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.project.text ? (
                    languangeEN[1].home.project.text
                  ) : (
                    <p>Loading...</p>
                  )}
                </p>
                <div className="carousel-controls">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-dot ${currentVideoIndex === index ? "active" : ""}`}
                      onClick={() => {
                        setCurrentVideoIndex(index);
                        setIsPlaying(false);
                      }}
                      data-index={index + 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="featured-projects">
        <div className="title">
          <h2 className="text">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.project.title ? (
              languangeID[1].home.project.title
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.project.title ? (
              languangeEN[1].home.project.title
            ) : (
              <p>Loading...</p>
            )}
          </h2>
        </div>
        <div className="projects-grid">
          {projects.slice(0, 12).map((project, index) => (
            <div
              key={index}
              className="project-item"
              onClick={() => handleProjectClick(project)}
            >
              <img
                src={project.poster}
                alt={project.title}
                className="project-image"
              />
              <div className="overlay">
                <h3 className="project-title">{project.title}</h3>
                <div className="see-now">
                  <span>
                    {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.project.titleDescription ? (
                      languangeID[1].home.project.titleDescription
                    ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.project.titleDescription ? (
                      languangeEN[1].home.project.titleDescription
                    ) : (
                      <p>Loading...</p>
                    )}
                  </span>
                  <img
                    src="/icon/see now.png"
                    alt="See Now Icon"
                    className="icon"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="clients">
        <div className="title">
          <h2 className="text">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.client.title ? (
              languangeID[1].home.client.title
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.client.title ? (
              languangeEN[1].home.client.title
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
      <div className="news">
        <div className="title">
          <h2 className="text">
            {activeLanguage === 'ID' && languangeID && languangeID[1] && languangeID[1].home.news.title ? (
              languangeID[1].home.news.title
            ) : activeLanguage === 'EN' && languangeEN && languangeEN[1] && languangeEN[1].home.news.title ? (
              languangeEN[1].home.news.title
            ) : (
              <p>Loading...</p>
            )}
          </h2>
        </div>
        <div className="all-news">
          {news.slice(0, 3).map((newsItem, index) => (
            <div
              key={index}
              className="news-item"
              onClick={() => handleNewsClick(newsItem)}
            >
              <img
                src={newsItem.poster}
                alt={newsItem.title}
                className="image"
              />
              <p className="date">
                Posted on <span>{newsItem.date}</span> / By {newsItem.publisher}
              </p>
              <div className="content">
                <h4 className="title">{newsItem.title}</h4>
                <p className="desc">
                  {newsItem.desc.length > 100
                    ? `${newsItem.desc.substring(0, 300)}...`
                    : newsItem.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
