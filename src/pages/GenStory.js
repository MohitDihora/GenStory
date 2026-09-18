import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/genstory.css";
import logo from "../assets/logo.png";

function GenStory() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Get theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1400);

    const redirectTimer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className={`splash-container ${fadeOut ? "fade-out" : "fade-in"} ${theme}`}>
      <img src={logo} alt="GenStory Logo" className="logo" />
      <h1 className="title">GenStory</h1>
      <p className="tagline">"Where imagination meets AI"</p>
    </div>
  );
}

export default GenStory;
