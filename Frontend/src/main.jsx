import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { AuthProvider } from "./AuthContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        success: {
          duration: 1500,
        },
        error: {
          duration: 3000,
        },
      }}
    />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
