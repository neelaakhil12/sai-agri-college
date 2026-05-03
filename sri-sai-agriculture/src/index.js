import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import { ImageModalProvider } from "./hooks/useImageModal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ImageModalProvider>
        <App />
      </ImageModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
