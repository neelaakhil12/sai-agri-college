import React, { createContext, useContext, useState } from 'react';

const ImageModalContext = createContext();

export function useImageModal() {
  return useContext(ImageModalContext);
}

export function ImageModalProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (src) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

  return (
    <ImageModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      
      {/* Global Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/85 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl w-full flex flex-col items-center justify-center animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 md:-top-10 right-0 md:-right-10 text-white/70 hover:text-white transition-colors duration-200 text-4xl p-2 focus:outline-none"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Expanded view" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-none"
            />
          </div>
        </div>
      )}
    </ImageModalContext.Provider>
  );
}
