import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import "../styles/about.css";

function TermsAndConditionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location?.state?.theme || localStorage.getItem("theme") || "light";

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
    <motion.div className={`about-page ${theme}`} variants={containerVariants} initial="hidden" animate="visible">
      <div className="about-header">
        <div className="about-section" style={{ paddingTop: "50px" }}>
          <button className="back-button" onClick={() => navigate("/home", { state: { theme } })} aria-label="Go back">
            <MdArrowBackIosNew className="back-icon" />
          </button>
          <span className="header-title" style={{ marginLeft: "33px", fontSize: "20px" }}>Terms & Conditions</span>
        </div>
      </div>

      <section className="about-hero">
        <motion.h1 className="about-title" variants={itemVariants}>Terms & Conditions</motion.h1>
        <motion.p className="about-tagline" style={{ padding: "0px 10px" }} variants={itemVariants}>
          Please read these terms carefully before using GenStory.
        </motion.p>
      </section>

      <motion.section className="about-content">
        <motion.h2 variants={itemVariants}>1. Acceptance of Terms</motion.h2>
        <motion.p variants={itemVariants}>
          By using GenStory, you agree to these Terms and our Privacy Policy. If you disagree with any part, please discontinue use.
        </motion.p>

        <motion.h2 variants={itemVariants}>2. Story Ownership</motion.h2>
        <motion.p variants={itemVariants}>
          All stories generated through GenStory belong to you. You are free to copy, download (as PDF), or reuse them for personal and creative use. However, commercial resale of generated content is not allowed.
        </motion.p>

        <motion.h2 variants={itemVariants}>3. Proper Usage</motion.h2>
        <motion.p variants={itemVariants}>
          Users must not use GenStory to produce or promote harmful, offensive, or misleading content. We reserve the right to restrict access for misuse.
        </motion.p>

        <motion.h2 variants={itemVariants}>4. AI Limitations</motion.h2>
        <motion.p variants={itemVariants}>
          GenStory uses AI to create stories based on user input. While we aim for creativity and coherence, we cannot guarantee factual accuracy or suitability for all scenarios.
        </motion.p>

        <motion.h2 variants={itemVariants}>5. Platform Changes</motion.h2>
        <motion.p variants={itemVariants}>
          GenStory may update its terms, features, or policies at any time. Users will be informed of major changes via visible notice on the platform.
        </motion.p>
      </motion.section>
    </motion.div>
  );
}

export default TermsAndConditionsPage;
