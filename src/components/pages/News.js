import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const News = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  
  const [currentPageNews, setCurrentPageNews] = useState(1); 

  const [currentPodcastIndex, setCurrentPodcastIndex] = useState(0); 
  const [languangeID, setLanguageID] = useState(null);
  const [languangeEN, setLanguageEN] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("ID");

  const newsPerPage = 6;

  const navigate = useNavigate();

  const handleNewsClick = (newsItem) => {
    navigate(`/media/${newsItem.id}`, { state: { newsItem } });
  };

  const handleNextPodcast = () => {
    setCurrentPodcastIndex((prevIndex) =>
      (prevIndex + 1) % podcasts.length
    );
  };

  const handlePrevPodcast = () => {
    setCurrentPodcastIndex((prevIndex) =>
      (prevIndex - 1 + podcasts.length) % podcasts.length
    );
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setActiveLanguage(savedLanguage);
    }

    fetch("/data/youtube-videos.json")
      .then((response) => response.json())
      .then((videos_data) => {
        if (Array.isArray(videos_data) && videos_data.length > 0) {
            setVideos(videos_data);
            setCurrentVideoIndex(0); 
        } else {
            console.warn("youtube-videos.json is empty or invalid.");
            setVideos([]);
        }
      })
      .catch((error) => console.error("Fetch error for YouTube videos:", error));

    fetch("/data/news.json")
      .then((response) => response.json())
      .then((news_data) => setNews(news_data))
      .catch((error) => console.error("Fetch error for news:", error));

    fetch("/data/podcasts.json")
      .then((res) => res.json())
      .then((data) => {
        const validPodcasts = data.filter((p) => p.audioUrl);
        setPodcasts(validPodcasts);
        if (validPodcasts.length > 0) {
          setCurrentPodcastIndex(0);
        } else {
            console.warn("podcasts.json is empty or invalid.");
            setPodcasts([]);
        }
      })
      .catch((error) => console.error("Fetch error for podcasts:", error));

    fetch("/data/languangeID.json")
      .then((response) => response.json())
      .then((data) => setLanguageID(data))
      .catch((error) => console.error("Error fetching language ID data:", error));

    fetch("/data/languangeEN.json")
      .then((response) => response.json())
      .then((data) => setLanguageEN(data))
      .catch((error) => console.error("Error fetching language EN data:", error));
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const indexOfLastNews = currentPageNews * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const totalPagesNews = Math.ceil(news.length / newsPerPage);
  const paginateNews = (pageNumber) => setCurrentPageNews(pageNumber);
  const goToNextPageNews = () => {
    if (currentPageNews < totalPagesNews) {
      setCurrentPageNews(currentPageNews + 1);
    }
  };

  const currentPlayingPodcast = podcasts[currentPodcastIndex] || null;
  const currentYoutubeVideo = videos[currentVideoIndex] || null;


  const getYoutubeThumbnailUrl = (videoId) => {
    if (!videoId) return '/img/default_youtube_thumb.jpg'; 
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`; 
  };

  const getYoutubeEmbedUrl = (videoId, autoplay = 0) => {
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&modestbranding=1&rel=0`;
  };

  const getSpotifyEmbedUrl = (audioUrl) => {
    if (!audioUrl) return '';
    let embedUrl = audioUrl;
    embedUrl += embedUrl.includes('?') ? '&' : '?';
    embedUrl += `autoplay=1`;
    embedUrl += '&utm_source=generator';
    return embedUrl;
  };

  return (
    <>
      <Layout containerClass="media-container" />
      <div className="youtube-video">
        <div className="video-wrapper">
          {(!isPlaying || !currentYoutubeVideo) ? (
            <div className="thumbnail-container">
              <img
                src={getYoutubeThumbnailUrl(currentYoutubeVideo?.id)} 
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
            currentYoutubeVideo ? ( 
                <iframe
                    src={getYoutubeEmbedUrl(currentYoutubeVideo.id, 1)} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="intro playing"
                    title={currentYoutubeVideo.title || "YouTube Video"}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            ) : (
                <div style={{ textAlign: 'center', padding: '50px', background: '#f0f0f0', borderRadius: '12px', width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Video not available.
                </div>
            )
          )}
          <div className="bottom-wrapper">
            <div className="text-wrapper">
              <h4 className="video-text">{currentYoutubeVideo?.title || "Loading Video..."}</h4>
              <p className="video-text-secondary">{currentYoutubeVideo?.date || ""}</p>
              <div className="carousel-controls">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${currentVideoIndex === index ? "active" : ""}`}
                    onClick={() => {
                      setCurrentVideoIndex(index);
                      setIsPlaying(false); 
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="news">
        <div className="title">
          <h2 className="text">
            {activeLanguage === "ID"
              ? languangeID?.[4]?.media.news.title || "Berita"
              : languangeEN?.[4]?.media.news.title || "News"}
          </h2>
        </div>
        <div className="all-news">
          {currentNews.map((newsItem, index) => (
            <div
              key={index}
              className="news-item"
              onClick={() => handleNewsClick(newsItem)}
            >
              <img src={newsItem.poster} alt={newsItem.title} className="image" />
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
        <div className="pagination">
          {Array.from({ length: totalPagesNews }, (_, index) => (
            <button
              key={`news-page-${index}`}
              onClick={() => paginateNews(index + 1)}
              className={`pagination-button ${currentPageNews === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={goToNextPageNews}
            className="pagination-button next-button"
            disabled={currentPageNews >= totalPagesNews}
          >
            {activeLanguage === "ID"
              ? languangeID?.[4]?.media.news.direction || "Berikutnya"
              : languangeEN?.[4]?.media.news.direction || "Next"}
            <span>
              <img src="/icon/right.png" alt="right arrow" />
            </span>
          </button>
        </div>
      </div>

      <section style={{ padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Podcast</h2>

        <div className="single-podcast-player-wrapper" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <button
            onClick={handlePrevPodcast}
            disabled={podcasts.length <= 1}
            className="podcast-nav-button prev-podcast-button"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
          >
            <img src="/icon/left.png" alt="Previous Podcast" style={{ width: '30px', height: '30px', filter: 'invert(0%)' }} />
          </button>

          {currentPlayingPodcast ? (
            <iframe
              key={currentPlayingPodcast.id}
              style={{ borderRadius: "12px" }}
              src={getSpotifyEmbedUrl(currentPlayingPodcast.audioUrl)}
              width="100%"
              height="232"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={currentPlayingPodcast.title || 'Podcast Player'}
            ></iframe>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px', background: '#f0f0f0', borderRadius: '12px', width: '100%' }}>
              Loading podcast...
            </div>
          )}

          <button
            onClick={handleNextPodcast}
            disabled={podcasts.length <= 1}
            className="podcast-nav-button next-podcast-button"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
          >
            <img src="/icon/right.png" alt="Next Podcast" style={{ width: '30px', height: '30px', filter: 'invert(0%)' }} />
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default News;