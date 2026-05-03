import React, { useState } from 'react';

export default function ZoomableImage({ src, alt, className, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className || ''} cursor-pointer`}
        onClick={() => setIsOpen(true)}
        {...props}
      />

      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-4 md:p-8"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-6xl w-full flex flex-col items-center justify-center animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 md:-top-10 right-0 md:-right-10 text-white/70 hover:text-white transition-colors duration-200 text-4xl p-2 focus:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img 
              src={src} 
              alt={alt || "Expanded view"} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
