import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import "../styles/story.css";

function StoryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { title, content, theme = "light" } = state || {}; // Ensure theme has a default
  const [downloading, setDownloading] = useState(false);

  if (!title || !content) {
    return (
      <div className="error-message">
        <p>No story found. Please go back and generate a story.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handleDownload = () => {
    setDownloading(true);

    const originalElement = document.getElementById("pdf-content");
    const clonedElement = originalElement.cloneNode(true);

    // Set background and text color for PDF
    clonedElement.style.backgroundColor = "#ffffff";
    clonedElement.style.color = "#000000";

    // Remove back button from cloned content
    const backBtn = clonedElement.querySelector(".back-button");
    if (backBtn) backBtn.remove();

    // Force all inner elements to be black text on white bg
    clonedElement.querySelectorAll("*").forEach((el) => {
      el.style.color = "#000000";
      el.style.backgroundColor = "#ffffff";
    });

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.top = "-9999px";
    tempContainer.style.left = "-9999px";
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    const opts = {
      margin: 0.5,
      filename: `${title}.pdf`,
      image: { type: "png", quality: 1.0 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opts)
      .from(clonedElement)
      .save()
      .finally(() => {
        setDownloading(false);
        document.body.removeChild(tempContainer);
      });
  };

  const handleCopy = () => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard
        .writeText(String(content))
        .then(() => alert("✅ Story copied to clipboard!"))
        .catch(() => fallbackCopyTextToClipboard(String(content)));
    } else {
      fallbackCopyTextToClipboard(String(content));
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = "1px";
    textArea.style.height = "1px";
    textArea.style.padding = 0;
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      alert(successful ? "✅ Story copied!" : "❌ Copy failed. Please try manually.");
    } catch (err) {
      alert("❌ Copy not supported. Please copy manually.");
    }

    document.body.removeChild(textArea);
  };

  return (
    <motion.div
      className={`story-page ${theme}`}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
    >
      {downloading && (
        <div className="loader-overlay">
          <div className="spinner" />
          <p>Preparing your PDF...</p>
        </div>
      )}

      <div id="pdf-content" className="pdf-wrapper">
        <div className="pdf-header">
          <div className="pdf-secound" style={{marginTop:"50px"}}>
            <button className="back-button" onClick={() => navigate("/home")} style={{marginTop:"5px"}}>
              <MdArrowBackIos
                style={{ color: theme === "dark" ? "white" : "black" }}
              />
            </button>
          <h1
            className="story-title"
            style={{ color: theme === "dark" ? "white" : "#333" }}
          >
            {title}
          </h1>
            </div>
        </div>

        <div className="story-content" style={{marginTop:"38px"}}>
          {String(content)
            .split("\n")
            .map((para, i) => (
              <p key={i}>{para || <br />}</p>
            ))}
        </div>
      </div>

      <div className="story-actions">
        <button onClick={handleDownload} disabled={downloading}>
          📥 Download PDF
        </button>
        <button onClick={handleCopy} disabled={downloading}>
          📋 Copy Text
        </button>
      </div>
    </motion.div>
  );
}

export default StoryPage;