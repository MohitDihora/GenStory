import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import "../styles/about.css";

function PrivacyPolicyPage() {
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div className={`about-page ${theme}`} initial="hidden" animate="visible" variants={containerVariants}>
      <div className="about-header">
        <div className="about-section" style={{ paddingTop: "50px" }}>
          <button className="back-button" onClick={() => navigate("/home", { state: { theme } })}>
            <MdArrowBackIosNew className="back-icon" />
          </button>
          <span className="header-title" style={{ marginLeft: "40px", fontSize: "20px" }}>Privacy Policy</span>
        </div>
      </div>

      <section className="about-hero" style={{ padding: "0px 44px" }}>
        <motion.h1 className="about-title" variants={itemVariants}>Your Privacy Matters to Us</motion.h1>
        <motion.p className="about-tagline" variants={itemVariants}>We’re committed to protecting your information and keeping it private.</motion.p>
      </section>

      <motion.section className="about-content" variants={containerVariants}>
        <motion.h2 variants={itemVariants}>🔍 What We Collect</motion.h2>
        <motion.p variants={itemVariants}>
          We only collect your input — such as the prompt, genre, tone, and other selected options. We don’t collect personal data like name, email, or location.
        </motion.p>

        <motion.h2 variants={itemVariants}>🧠 AI Usage</motion.h2>
        <motion.p variants={itemVariants}>
          Your inputs are processed by AI solely to generate your story. We do not store, sell, or use your inputs for training or analytics.
        </motion.p>

        <motion.h2 variants={itemVariants}>🔐 Security</motion.h2>
        <motion.p variants={itemVariants}>
          All data is transmitted securely. We do not share your input with third parties. Your content is yours alone.
        </motion.p>

        <motion.h2 variants={itemVariants}>📅 Changes to Policy</motion.h2>
        <motion.p variants={itemVariants}>
          If we change how we handle data, we will notify users on the platform. You are encouraged to check this page periodically.
        </motion.p>
      </motion.section>
    </motion.div>
  );
}

export default PrivacyPolicyPage;
