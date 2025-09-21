import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import './PodcastPlayer.css';

const PodcastPlayer = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    fetch('/data/podcasts.json')
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error('Error fetching podcast data:', error));
  }, []);

  const currentPodcast = podcasts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % podcasts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + podcasts.length) % podcasts.length);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleSpeed = () => {
    setSpeed(speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1);
  };

  return (
    <div className="podcast-wrapper">
      {currentPodcast && (
          <div className="podcast-player">
          <div className="player-header">
            <div className="thumbnail">
              {currentPodcast.thumbnail && (
                <img src={currentPodcast.thumbnail} alt={currentPodcast.title} />
              )}
            </div>

            <div className="podcast-info">
              <h3 className="podcast-title">
                {currentPodcast.title}
              </h3>
              <p className="podcast-description">
                {currentPodcast.description}
              </p>
            </div>
          </div>

          <div className="player-controls">
            <div className="progress-bar">
              <div 
                className="progress"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="progress-handle"
                style={{ left: `${progress}%` }}
              />
            </div>

            <div className="time-display">
              <span>{formatTime(0)}</span>
              <span>{formatTime(currentPodcast.duration)}</span>
            </div>

            <div className="controls-wrapper">
              <div className="main-controls">
                <button className="control-button" onClick={handlePrev}>
                  <SkipBack size={24} />
                </button>
                <button 
                  className="play-button-podcast"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? 
                    <Pause size={24} color="black" /> : 
                    <Play size={24} color="black" style={{ marginLeft: '2px' }} />
                  }
                </button>
                <button className="control-button" onClick={handleNext}>
                  <SkipForward size={24} />
                </button>
              </div>

              <div className="right-controls">
                <button 
                  className="speed-button"
                  onClick={toggleSpeed}
                >
                  {speed}x
                </button>
                <div className="volume-control">
                  <Volume2 size={20} className="control-button" />
                  <div className="volume-slider">
                    <div className="volume-level" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="next-up">
        <h4 className="next-up-title">Next Up</h4>
        {podcasts.slice(currentIndex + 1).map((podcast, index) => (
          <div key={podcast.id} className="next-up-item">
            <div className="episode-thumbnail">
              {podcast.thumbnail && (
                <img src={podcast.thumbnail} alt={podcast.title} />
              )}
            </div>
            <div className="episode-info">
              <h5 className="episode-title">{podcast.title}</h5>
              <p className="episode-duration">{formatTime(podcast.duration)}</p>
            </div>
            <button className="control-button">
              <Play size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastPlayer;