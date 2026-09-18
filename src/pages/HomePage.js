import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import logo from "../assets/logo.png";
import light from "../assets/images/mode.svg";
import dark from "../assets/images/icon.svg";

import inFlag from "../assets/flag/in.png";
import usFlag from "../assets/flag/us.png";
import esFlag from "../assets/flag/es.png";
import frFlag from "../assets/flag/fr.png";
import deFlag from "../assets/flag/de.png";
import itFlag from "../assets/flag/it.png";
import krFlag from "../assets/flag/kr.png";
import pkFlag from "../assets/flag/pk.png";

import "../styles/home.css";

const LANGUAGE_OPTIONS = [
  { name: "English", flag: usFlag, code: "en" },
  { name: "Hindi", flag: inFlag, code: "hi" },
  { name: "Spanish", flag: esFlag, code: "es" },
  { name: "French", flag: frFlag, code: "fr" },
  { name: "German", flag: deFlag, code: "de" },
  { name: "Italian", flag: itFlag, code: "it" },
  { name: "Korean", flag: krFlag, code: "ko" },
  { name: "Urdu", flag: pkFlag, code: "ur" },
];

function HomePage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [length, setLength] = useState("Medium");
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState({});
  const [, setStoryHistory] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const genreRef = useRef(null);
  const toneRef = useRef(null);
  const languageRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);

    const storedHistory =
      JSON.parse(localStorage.getItem("storyHistory")) || [];

    // Filter out bad/invalid entries
    const cleanedHistory = storedHistory.filter(
      (story) => story.timestamp && typeof story.timestamp === "string"
    );

    if (cleanedHistory.length !== storedHistory.length) {
      localStorage.setItem("storyHistory", JSON.stringify(cleanedHistory));
    }

    setStoryHistory(cleanedHistory);

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        showSidebar
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!prompt.trim()) newErrors.prompt = "Prompt is required";
    if (!selectedGenre) newErrors.genre = "Genre is required";
    if (!selectedTone) newErrors.tone = "Tone is required";
    if (!selectedLanguage) newErrors.language = "Language is required";
    if (!length) newErrors.length = "Length is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setErrors((prev) => ({ ...prev, genre: "" }));
    genreRef.current?.removeAttribute("open");
  };

  const handleToneSelect = (tone) => {
    setSelectedTone(tone);
    setErrors((prev) => ({ ...prev, tone: "" }));
    toneRef.current?.removeAttribute("open");
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setErrors((prev) => ({ ...prev, language: "" }));
    languageRef.current?.removeAttribute("open");
  };

  const handleGenerate = () => {
    if (!validateForm()) return;

    navigate("/loading", {
      state: {
        prompt,
        selectedGenre,
        selectedTone,
        selectedAudience,
        selectedFormat,
        selectedPurpose,
        length,
        selectedLanguage,
        theme,
      },
    });
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleHistoryClick = () => {
    setShowSidebar(false);
    navigate("/history");
  };

  const handleAboutUsClick = () => {
    setShowSidebar(false);
    navigate("/about-us");
  };

  const handleTermsAndConditionsClick = () => {
    setShowSidebar(false);
    navigate("/terms-condition");
  };

  const handlePrivacyPoliciesClick = () => {
    setShowSidebar(false);
    navigate("/privacy-policy");
  };

  return (
    <div className={`home-container ${theme}`}>
      <nav className="navigation" style={{ paddingTop: "50px" }}>
        <div className="d-flex home-logo">
          <img src={logo} alt="GenStory logo" />
          <span>GenStory</span>
        </div>
        <div className="icon">
          <img
            src={theme === "light" ? dark : light}
            alt="Toggle Theme"
            className="theme-toggle-icon"
            onClick={toggleTheme}
          />
          <FontAwesomeIcon
            icon={faCog}
            className="settings-icon"
            onClick={handleToggleSidebar}
          />
        </div>
      </nav>

      <div
        className={`settings-sidebar ${showSidebar ? "open" : ""}`}
        ref={sidebarRef}
      >
        <div className="sidebar-header" style={{ height: "100px" }}>
          <h3 style={{ marginTop: "60px" }}>Settings</h3>
          <FontAwesomeIcon
            style={{ marginTop: "50px" }}
            icon={faTimes}
            className="close-sidebar-icon"
            onClick={() => setShowSidebar(false)}
          />
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-main-menu-list">
            <li onClick={handleHistoryClick}>History</li>
            <li onClick={handleAboutUsClick}>About Us</li>
            <li onClick={handlePrivacyPoliciesClick}>Privacy Policy</li>
            <li onClick={handleTermsAndConditionsClick}>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      <motion.main
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ paddingTop: "40px" }}
      >
        {/* Prompt Section */}
        <section className="section-1">
          <span>Story prompt or Idea</span>
          <textarea
            className="custom-textarea"
            placeholder="Type your story idea..."
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setErrors((prev) => ({ ...prev, prompt: "" }));
            }}
          />
          {errors.prompt && <p className="error-message">{errors.prompt}</p>}
        </section>

        {/* Genre */}
        <section className="section-2">
          <p className="dropdown-title">Genre</p>
          <details className="custom-dropdown" ref={genreRef}>
            <summary className="d-flex justify-content-between">
              <div>{selectedGenre || "-- Select Genre --"}</div>
              <span className="arrow">▾</span>
            </summary>
            <ul className="dropdown-list">
              {[
                "🌍 Adventure",
                "🎭 Drama",
                "📜 Historical",
                "🧚 Fairy Tale",
                "🧞 Cultural Tale",
                "👻 Paranormal",
                "🍰 Slice of Life",
                "⚔ War Story",
                "🌟 Inspirational",
                "🎭 Satire",
                "💔 Tragedy",
                "💕 Fantasy Romance",
              ]
                .filter((g) => g !== selectedGenre)
                .map((g) => (
                  <li key={g} onClick={() => handleGenreSelect(g)}>
                    {g}
                  </li>
                ))}
            </ul>
          </details>
          {errors.genre && (
            <span className="error-message">{errors.genre}</span>
          )}
        </section>

        {/* Crafter Options */}
        <section className="section-3 mt-4">
          <details className="story-crafter-toggle">
            <summary className="d-flex justify-content-between">
              <span>Story Crafter</span>
              <span className="arrow" style={{ marginRight: "15px" }}>
                ▾
              </span>
            </summary>
            <div className="story-crafter-wrapper">
              {/* Audience */}
              <div className="story-category">
                <p className="category-label">Target Audience</p>
                <div className="pill-group">
                  {["🙉 Children", "🧑‍🎓 Young Adult", "👴 Adult"].map((item) => (
                    <span
                      key={item}
                      className={`pill ${
                        selectedAudience === item ? "selected" : ""
                      }`}
                      onClick={() => setSelectedAudience(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {/* Format */}
              <div className="story-category">
                <p className="category-label">Format</p>
                <div className="pill-group">
                  {["Prose", "Screenplay", "Stageplay", "Poem"].map((item) => (
                    <span
                      key={item}
                      className={`pill ${
                        selectedFormat === item ? "selected" : ""
                      }`}
                      onClick={() => setSelectedFormat(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {/* Purpose */}
              <div className="story-category">
                <p className="category-label">Purpose</p>
                <div className="pill-group">
                  {[
                    "Complete Story",
                    "Story Opening",
                    "Climax Scene",
                    "Story Chapter",
                    "Epilogue",
                    "Story Ending",
                  ].map((item) => (
                    <span
                      key={item}
                      className={`pill ${
                        selectedPurpose === item ? "selected" : ""
                      }`}
                      onClick={() => setSelectedPurpose(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </details>
        </section>

        {/* Length */}
        <section className="section-4 mt-3">
          <p className="">Length</p>
          <div className="pill-group group">
            {["Short", "Medium", "Long"].map((item) => (
              <span
                key={item}
                className={`pill ${length === item ? "selected" : ""}`}
                onClick={() => {
                  setLength(item);
                  setErrors((prev) => ({ ...prev, length: "" }));
                }}
              >
                {item}
              </span>
            ))}
          </div>
          {errors.length && <p className="error-message">{errors.length}</p>}
        </section>

        {/* Tone */}
        <section className="section-5 mt-4">
          <p className="len" style={{ fontWeight: "700" }}>
            Writing Tone
          </p>
          <details className="custom-dropdown" ref={toneRef}>
            <summary className="d-flex justify-content-between">
              <div>{selectedTone || "-- Select Tone --"}</div>
              <span className="arrow">▾</span>
            </summary>
            <ul className="dropdown-list">
              {["❤️ Romantic", "🔮 Mysterious", "😂 Humorous", "😱 Suspenseful"]
                .filter((t) => t !== selectedTone)
                .map((t) => (
                  <li key={t} onClick={() => handleToneSelect(t)}>
                    {t}
                  </li>
                ))}
            </ul>
          </details>
          {errors.tone && <p className="error-message">{errors.tone}</p>}
        </section>

        {/* Language */}
        <section className="section-6 mt-2">
          <p className="len">Language</p>
          <details className="custom-dropdown" ref={languageRef}>
            <summary className="d-flex justify-content-between">
              <div>
                {selectedLanguage ? (
                  <>
                    <img
                      src={selectedLanguage.flag}
                      className="flag-icon"
                      alt=""
                    />{" "}
                    {selectedLanguage.name}
                  </>
                ) : (
                  "-- Select Language --"
                )}
              </div>
              <span className="arrow">▾</span>
            </summary>
            <ul className="dropdown-list">
              {LANGUAGE_OPTIONS.filter(
                (lang) => lang.code !== selectedLanguage?.code
              ).map((lang) => (
                <li key={lang.code} onClick={() => handleLanguageSelect(lang)}>
                  <img src={lang.flag} className="flag-icon" alt="" />{" "}
                  {lang.name}
                </li>
              ))}
            </ul>
          </details>
          {errors.language && (
            <p className="error-message">{errors.language}</p>
          )}
        </section>
      </motion.main>

      {/* Generate Button */}
      <motion.section
        className="section-7 button"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <button onClick={handleGenerate}>Generate Story</button>
      </motion.section>
    </div>
  );
}

export default HomePage;
