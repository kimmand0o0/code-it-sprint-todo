"use client";

import { useState, useEffect } from "react";

const getWindowWidth = () => {
  if (typeof window !== "undefined") {
    return window?.innerWidth;
  }
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowWidth;
};

export default useWindowWidth;
