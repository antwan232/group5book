// ThemeHandler.jsx
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ThemeHandler() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return null; 
}
