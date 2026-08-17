// components/ClassArtwork.jsx
import { useState } from 'react';
import { X } from 'lucide-react';

export default function ClassArtwork({ character }) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!character.constructor.artwork) return null;

  const artworkPath = character.constructor.artwork;

  return (
    <>
      {/* Thumbnail */}
      <div className="mb-8">
        <div
          onClick={() => setShowFullscreen(true)}
          className="relative w-full mx-auto bg-black border-2 border-cy-cyan overflow-hidden cursor-pointer group hover:border-cy-cyan/50 transition-all duration-300"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
          }}
        >
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-cy-cyan animate-pulse">LOADING CLASS DATA...</div>
            </div>
          )}

          {/* Error state */}
          {imageError && (
            <div className="aspect-[2/1] flex flex-col items-center justify-center bg-gray-900 text-red-400">
              <span className="font-bold mb-2">IMAGE ERROR</span>
              <span className="text-gray-600 text-sm">{character.constructor.class}</span>
            </div>
          )}

          {/* Image */}
          {!imageError && (
            <img
              src={artworkPath}
              alt={`${character.constructor.class} artwork`}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setImageError(true);
                setIsLoading(false);
              }}
            />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-cy-cyan text-sm font-bold tracking-wider">
                Click to expand // {character.constructor.class.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Scanline effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)'
            }}
          />
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <FullscreenViewer
          character={character}
          artworkPath={artworkPath}
          onClose={() => setShowFullscreen(false)}
        />
      )}
    </>
  );
}

function FullscreenViewer({ character, artworkPath, onClose }) {
  const [imageError, setImageError] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 bg-black/80 border border-cy-cyan text-cy-cyan hover:bg-cy-cyan hover:text-black transition-all duration-200"
      >
        <X size={24} />
      </button>

      {/* Class info */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 border border-cy-cyan px-4 py-2">
        <div className="text-cy-cyan font-bold tracking-wider">
          {character.constructor.class.toUpperCase()}
        </div>
      </div>

      {/* Main image */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {imageError ? (
          <div className="bg-gray-900 border-2 border-red-400 p-12 text-center">
            <div className="text-red-400 text-2xl font-bold mb-4">IMAGE LOAD ERROR</div>
            <div className="text-gray-500">{character.constructor.class}</div>
          </div>
        ) : (
          <img
            src={artworkPath}
            alt={`${character.constructor.class} artwork`}
            className="max-w-full max-h-[90vh] object-contain border-2 border-cy-cyan shadow-lg"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)'
            }}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-gray-700 px-6 py-2">
        <div className="text-gray-400 text-xs space-x-4">
          <span><span className="text-cy-cyan">ESC</span> Close</span>
          <span><span className="text-cy-cyan">Click</span> to close</span>
        </div>
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.5) 2px, rgba(0, 255, 255, 0.5) 4px)'
        }}
      />
    </div>
  );
}
