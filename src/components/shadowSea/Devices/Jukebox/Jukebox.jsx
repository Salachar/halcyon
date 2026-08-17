import { useState, useEffect } from 'react';
import { Line, Divider, Section, InsetBox } from '@shadowsea/ShadowSeaComponents';
import { getJukeboxTracks } from '@data/random/audioTracks';

import './Jukebox.css';

export default function Jukebox({
  model = "JB-707",
  location = "Unknown location",
  musicType,
  trackLimit = 4,
  songs,
}) {
  const displaySongs = songs || getJukeboxTracks(musicType || "synthwave", trackLimit);

  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);

  const colorMap = {
    red:    { primary: 'rgb(239, 68, 68)',   glow: 'rgba(239, 68, 68, 0.4)' },
    blue:   { primary: 'rgb(59, 130, 246)',  glow: 'rgba(59, 130, 246, 0.4)' },
    purple: { primary: 'rgb(168, 85, 247)',  glow: 'rgba(168, 85, 247, 0.4)' },
    orange: { primary: 'rgb(251, 146, 60)',  glow: 'rgba(251, 146, 60, 0.4)' },
    green:  { primary: 'rgb(34, 197, 94)',   glow: 'rgba(34, 197, 94, 0.4)' },
    cyan:   { primary: 'rgb(79, 209, 197)',  glow: 'rgba(79, 209, 197, 0.4)' },
    pink:   { primary: 'rgb(255, 0, 128)',   glow: 'rgba(255, 0, 128, 0.4)' },
  };

  const currentSong = displaySongs[selectedSongIndex] || {};
  const currentColor = colorMap[currentSong.color] || colorMap.cyan;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSongSelect = (index) => {
    setSelectedSongIndex(index);
    setIsPlaying(true);
    setRotation(0);
  };

  const handleStop = () => setIsPlaying(false);

  return (
    <div className="jukebox-wrapper">
      <div className="jukebox-container">

        {/* Header */}
        <Line smoke large bold style={{ marginBottom: '0.5rem' }}>
          [JUKEBOX - MODEL {model}]
        </Line>
        <Line cyan style={{ marginBottom: '1rem' }}>{location}</Line>
        <Divider />

        <div className="jukebox-layout">

          {/* Left — song list */}
          <div className="jukebox-left">
            <InsetBox title="NOW PLAYING:">
              {currentSong.title ? (
                <>
                  <Line neon>Track: "{currentSong.title}"</Line>
                  <Line neon>Artist: {currentSong.artist}</Line>
                  <Line neon>Genre: {currentSong.genre}</Line>
                  <Line neon>Status: {isPlaying ? '♪ PLAYING' : '⏸ PAUSED'}</Line>
                </>
              ) : (
                <Line yellow>Select a song to play</Line>
              )}
            </InsetBox>

            <Section title="SONG SELECTION:">
              {displaySongs.map((song, i) => {
                const isSelected = i === selectedSongIndex;
                const songColor = colorMap[song.color] || colorMap.cyan;
                return (
                  <button
                    key={i}
                    onClick={() => handleSongSelect(i)}
                    className="jukebox-song-button"
                    style={{
                      backgroundColor: isSelected ? 'rgba(79, 209, 197, 0.15)' : 'rgba(51, 65, 85, 0.3)',
                      border: isSelected ? `1px solid ${songColor.primary}` : '1px solid rgb(71, 85, 105)',
                    }}
                  >
                    <div
                      className="jukebox-song-dot"
                      style={{
                        backgroundColor: songColor.primary,
                        boxShadow: isSelected ? `0 0 8px ${songColor.glow}` : 'none',
                      }}
                    />
                    <div className="jukebox-song-info">
                      <div
                        className="jukebox-song-title"
                        style={{ color: isSelected ? songColor.primary : 'rgb(148, 163, 184)' }}
                      >
                        {i + 1}. "{song.title}"
                      </div>
                      <div className="jukebox-song-artist">{song.artist}</div>
                    </div>
                    {isSelected && isPlaying && (
                      <div className="jukebox-song-playing" style={{ color: songColor.primary }}>
                        ♪
                      </div>
                    )}
                  </button>
                );
              })}
            </Section>
          </div>

          {/* Right — record player */}
          <div className="jukebox-right">
            <div className="jukebox-player-housing">
              {/* Spinning record */}
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  backgroundColor: '#1a1a1a',
                  border: `3px solid ${currentColor.primary}`,
                  boxShadow: isPlaying ? `0 0 20px ${currentColor.glow}` : 'none',
                  position: 'relative',
                  transform: `rotate(${rotation}deg)`,
                  transition: isPlaying ? 'none' : 'transform 0.5s ease-out',
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: '50%', left: '50%',
                      width: `${120 - i * 12}px`,
                      height: `${120 - i * 12}px`,
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    backgroundColor: currentColor.primary,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    color: 'rgb(19, 23, 34)',
                  }}
                >
                  {selectedSongIndex + 1}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'rgb(19, 23, 34)',
                    transform: 'translate(-50%, -50%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                />
              </div>

              {/* Tonearm */}
              <div
                style={{
                  position: 'absolute',
                  top: '20%', right: '10%',
                  width: '60px', height: '2px',
                  backgroundColor: 'rgb(148, 163, 184)',
                  transformOrigin: 'right center',
                  transform: isPlaying ? 'rotate(-25deg)' : 'rotate(0deg)',
                  transition: 'transform 0.5s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-4px', top: '-2px',
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    backgroundColor: currentColor.primary,
                    boxShadow: `0 0 6px ${currentColor.glow}`,
                  }}
                />
              </div>
            </div>

            {isPlaying && (
              <button className="jukebox-stop-button" onClick={handleStop}>
                ⏹ STOP
              </button>
            )}
          </div>
        </div>

        <div className="jukebox-footer">
          <Divider />
          <Line yellow style={{ fontSize: '0.875rem' }}>
            2¤ per song
          </Line>
        </div>
      </div>
    </div>
  );
}
