import React, { useRef, useState, useEffect } from 'react';
import '../../App.css'; or

const PodcastPlayer = ({ podcast, studioName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1); // 0 to 1
  const iframeRef = useRef(null);

  useEffect(() => {
    if (podcast && iframeRef.current) {
      setIsPlaying(false);
    }
  }, [podcast]);

  const togglePlayPause = () => {
    if (!podcast) return;

    const currentSrc = iframeRef.current.src;
    let newSrc = currentSrc;

    if (isPlaying) {y
      if (newSrc.includes('autoplay=1')) {
        newSrc = newSrc.replace('autoplay=1', 'autoplay=0');
      }
      setIsPlaying(false);
    } else {
      if (!newSrc.includes('autoplay=')) {
        newSrc = newSrc.includes('?') ? `${newSrc}&autoplay=1` : `${newSrc}?autoplay=1`;
      } else if (newSrc.includes('autoplay=0')) {
        newSrc = newSrc.replace('autoplay=0', 'autoplay=1');
      }
      setIsPlaying(true);
    }
    iframeRef.current.src = newSrc;
  };

  const handleRewind = () => {
    alert('Fungsi Rewind tidak sepenuhnya didukung di Spotify Embed tanpa SDK.');
  };

  const handleFastForward = () => {
    alert('Fungsi Fast Forward tidak sepenuhnya didukung di Spotify Embed tanpa SDK.');
  };

  const handleSpeedChange = () => {
    setPlaybackSpeed((prevSpeed) => {
      if (prevSpeed === 1) return 1.5;
      if (prevSpeed === 1.5) return 2;
      return 1;
    });
    alert(`Kecepatan putar diatur ke ${playbackSpeed}x. Fitur ini mungkin tidak berfungsi di iframe Spotify.`);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    alert('Fungsi Volume tidak sepenuhnya didukung di Spotify Embed tanpa SDK.');
  };

  const getEmbedUrl = (audioUrl, autoplay) => {
    if (!audioUrl) return '';
    let embedUrl = audioUrl.replace('open.spotify.com/', 'open.spotify.com/embed/');
    embedUrl += embedUrl.includes('?') ? '&' : '?';
    embedUrl += `autoplay=${autoplay ? 1 : 0}`;
    embedUrl += '&utm_source=generator'; 
    return embedUrl;
  };

  if (!podcast) {
    return (
      <div className="podcast-player-container empty">
        Pilih podcast dari daftar di bawah untuk diputar.
      </div>
    );
  }

  return (
    <div className="podcast-player-container">
      <div className="podcast-player-header">
        <div className="podcast-player-artwork">
          <img src={podcast.thumbnail || '/img/default_podcast_artwork.jpg'} alt="Artwork" />
        </div>
        <div className="podcast-info">
          <h3 className="podcast-player-title">{podcast.title || 'Judul Tidak Tersedia'}</h3>
          <p className="podcast-player-studio">{podcast.studio || studioName || 'Studio Tidak Diketahui'}</p>
        </div>
        <div className="player-speed-control" onClick={handleSpeedChange}>
          {playbackSpeed}x
        </div>
      </div>

      <div className="podcast-player-controls">
        <div className="control-button" onClick={handleRewind}>
          <img src="/icon/rewind_15s.png" alt="Rewind 15s" /> {/* Ikon mundur 15s */}
        </div>
        <div className="control-button play-pause-button" onClick={togglePlayPause}>
          <img src={isPlaying ? "/icon/pause_button.png" : "/icon/play_button.png"} alt={isPlaying ? "Pause" : "Play"} /> {/* Ikon play/pause */}
        </div>
        <div className="control-button" onClick={handleFastForward}>
          <img src="/icon/forward_15s.png" alt="Forward 15s" /> {/* Ikon maju 15s */}
        </div>
      </div>

      <div className="podcast-player-progress">
        <span className="current-time">0:00</span>
        <input type="range" className="progress-bar" min="0" max="100" value="0" />
        <span className="total-time">{podcast.duration || '0:00'}</span>
      </div>

      <div className="podcast-player-volume">
        <img src="/icon/volume_icon.png" alt="Volume" className="volume-icon" /> 
        <input type="range" className="volume-slider" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
      </div>

      <iframe
        ref={iframeRef}
        src={getEmbedUrl(podcast.audioUrl, isPlaying)} 
        width="100%"
        height="100"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={podcast.title || 'Podcast Player'}
        style={{ opacity: 0, position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} 
      ></iframe>
    </div>
  );
};

export default PodcastPlayer;