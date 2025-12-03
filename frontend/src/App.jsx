import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import React, { useState, useEffect } from "react";

import Home from "./pages/Home";

function App() {
  useEffect(() => {
    // Hide HTML loader after React loads
    const timer = setTimeout(() => {
      const initialLoader = document.getElementById("initial-loader");
      if (initialLoader) {
        initialLoader.style.display = "none";
      }
    }, 1500); // Show for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4d55e3",
          colorPrimaryHover: "#7d83f3",
          colorPrimaryActive: "#34495e",
          colorBgBase: "#fff",
          colorTextBase: "#1e1e1e",
          colorTextSecondary: "#4b4b4b",
          colorTextPlaceholder: "#686868",
          colorTextDisabled: "#c1c1c1",
          colorTextDescription: "#939393",
          colorLink: "#1677ff",
          borderRadius: 40,
          colorBorderSecondary: "rgba(0, 0, 0, 0.125)",
          colorBorderPrimary: "rgba(0, 0, 0, 0.2)",
          fontFamily:
            "'Outfit', system-ui, Avenir, Helvetica, Arial, sans-serif",
          fontFamilyCode:
            "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
          fontSize: 18,
          lineHeight: 1.5,
          fontWeight: 400,
          controlHeight: 32,
          sizePopupArrow: 16,
          sizeStep: 4,
          sizeUnit: 4,
          motion: true,
          motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
          opacityImage: 1,
          wireframe: false,
          zIndexBase: 0,
          zIndexPopupBase: 1000,
        },
      }}
    >
      <BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Routes>
          {/* Smart root route */}
          <Route path="/" element={<Home />} />

          {/* Public routes */}
          {/*<Route path="/home" element={<Home />} />*/}

        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
