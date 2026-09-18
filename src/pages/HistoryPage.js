import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { MdArrowBackIos } from "react-icons/md";
import "../styles/history.css";

function HistoryPage() {
  const navigate = useNavigate();
  const [storyHistory, setStoryHistory] = useState([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);

    const storedHistory =
      JSON.parse(localStorage.getItem("storyHistory")) || [];

    const uniqueStories = [];
    const seenIds = new Set();
    storedHistory.forEach((story) => {
      if (story.id && !seenIds.has(story.id)) {
        seenIds.add(story.id);
        uniqueStories.push(story);
      }
    });

    setStoryHistory(uniqueStories);
  }, []);

  const handleDeleteStory = (e, id) => {
    e.stopPropagation();
    const updated = storyHistory.filter((s) => s.id !== id);
    setStoryHistory(updated);
    localStorage.setItem("storyHistory", JSON.stringify(updated));
  };

  const handleView = (story) => {
    navigate("/story", {
      state: {
        title: story.title,
        content: story.content,
        theme: theme,
        genre: story.genre,
      },
    });
  };

  const getGenreEmoji = (genre) => {
    if (!genre) return "";
    const match = genre.match(/^(\p{Emoji})/u);
    return match ? match[1] : "";
  };

  return (
    <div className={`history-page-container ${theme}`}>
      <div className="history-header">
        <MdArrowBackIos
          className="back-icon"
          onClick={() => navigate("/home")}
          style={{marginTop:"51px"}}
        />
        <h2>History</h2>
      </div>
      <div className="history-list">
        {storyHistory.length > 0 ? (
          storyHistory.map((story) => (
            <div
              key={story.id}
              className="history-card"
              onClick={() => handleView(story)}
            >
              <div className="card-left">
                <div className="story-title">
                  {getGenreEmoji(story.genre)} <strong>{story.title}</strong>
                </div>
                <div className="story-preview">
                  {story.content.length > 10
                    ? story.content.slice(0, 30) + "..."
                    : story.content}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={(e) => handleDeleteStory(e, story.id)}
              />
            </div>
          ))
        ) : (
          <p className="no-history-message">No stories yet.</p>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
