import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import "../styles/about.css";

function AboutPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const theme = state?.theme || localStorage.getItem("theme") || "light";

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`about-page ${theme}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="about-header">
        <div className="about-section" style={{ paddingTop: "50px" }}>
          <button
            className="back-button"
            onClick={() => navigate("/home", { state: { theme } })}
          >
            <MdArrowBackIos className="back-icon" />
          </button>
          <span
            className="header-title"
            style={{ marginLeft: "33px", fontSize: "20px" }}
          >
            About Us
          </span>
        </div>
      </div>
<main>
      <section className="about-hero">
        <motion.h1 className="about-title" variants={itemVariants}>
          Welcome to GenStory
        </motion.h1>
        <motion.p className="about-tagline" variants={itemVariants}>
          Where <strong>Imagination</strong> meets <strong>AI</strong>.
        </motion.p>
      </section>

      <motion.section className="about-content" variants={containerVariants}>
        <motion.p variants={itemVariants}>
          GenStory is a creative platform designed to help anyone — from
          students to writers — craft unique stories in seconds. Whether you’re
          a daydreamer or a storyteller, GenStory transforms your thoughts into
          beautiful narratives with the help of artificial intelligence.
        </motion.p>

        <motion.h2 variants={itemVariants}>🎯 Why We Built GenStory</motion.h2>
        <motion.p variants={itemVariants}>
          We wanted storytelling to be simple, fast, and fun. GenStory allows
          users to choose a genre (like adventure, fairy tale, or drama),
          audience (kids, young adults, adults), format (prose, screenplay,
          poem), and even tone and language — to create exactly the story they
          imagine.
        </motion.p>

        <motion.h2 variants={itemVariants}>
          🌟 What Makes GenStory Special?
        </motion.h2>
        <motion.p variants={itemVariants}>
          🎨 Intuitive UI with Dark/Light Mode
        </motion.p>
        <motion.p variants={itemVariants}>
          ✍️ Fully customizable story crafting options
        </motion.p>
        <motion.p variants={itemVariants}>⚡ Instant story generation</motion.p>
        <motion.p variants={itemVariants}>
          📥 Download as PDF or Copy to Clipboard
        </motion.p>
        <motion.p variants={itemVariants}>
          🕓 History saved for later use
        </motion.p>

        <motion.p variants={itemVariants}>
          Our goal is to make AI-powered storytelling accessible and exciting —
          for everyone.
        </motion.p>
      </motion.section>
      </main>
    </motion.div>
  );
}

export default AboutPage;
