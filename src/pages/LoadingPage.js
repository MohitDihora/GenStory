import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import "../styles/loading.css"
import writingAnimation from "../assets/animation/Light Solutions - blue green teal.json";
import "../styles/home.css";

function LoadingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const hasGeneratedStory = useRef(false);
  const theme = state?.theme || "dark"; // Default to dark if undefined

  useEffect(() => {
    const fetchStory = async () => {
      if (hasGeneratedStory.current) return;
      hasGeneratedStory.current = true;

      try {
        const {
          prompt,
          selectedGenre,
          selectedTone,
          selectedAudience,
          selectedFormat,
          selectedPurpose,
          length,
          selectedLanguage,
        } = state;

        const systemPrompt = `You are a creative storyteller. Respond only with the story content in ${selectedLanguage.name}.`;
        const fullPrompt = `\n${systemPrompt}\nUser Prompt: ${prompt}\nGenre: ${selectedGenre}\nTone: ${selectedTone}\nAudience: ${selectedAudience}\nFormat: ${selectedFormat}\nPurpose: ${selectedPurpose}\nLength: ${length}\nLanguage: ${selectedLanguage.name}`;

        const maxTokens =
          length === "Short"
            ? 400
            : length === "Medium"
              ? 800
              : 1200;

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
              "X-Title": "GenStory",
              "HTTP-Referer": "http://localhost:3000/",
            },
            body: JSON.stringify({
              model: "openrouter/free",
              temperature: 0.7,
              max_tokens: maxTokens,
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: fullPrompt },
              ],
            }),
          }
        );

        const data = await response.json();

        if (!data.choices?.[0]?.message?.content) {
          throw new Error("Failed to generate story content. Please try again.");
        }

        const emojiGenre = selectedGenre;
        const cleanedGenre = selectedGenre.replace(/^[^\w\s]+/, "").trim();
        const generatedTitle = `${cleanedGenre} Story`;
        const generatedContent = data.choices[0].message.content;

        const existingStories = JSON.parse(localStorage.getItem("storyHistory")) || [];

        const newStory = {
          id: Date.now(),
          title: generatedTitle,
          content: generatedContent,
          genre: emojiGenre,
          tone: selectedTone,
          language: selectedLanguage.name,
          timestamp: new Date().toLocaleString(),
        };

        const isDuplicate = existingStories.some(
          (story) =>
            story.content === newStory.content &&
            story.title === newStory.title
        );

        let updatedStories;
        if (!isDuplicate) {
          updatedStories = [newStory, ...existingStories].slice(0, 10);
          localStorage.setItem("storyHistory", JSON.stringify(updatedStories));
        } else {
          updatedStories = existingStories;
        }

        navigate("/story", {
          state: {
            title: generatedTitle,
            subtitle: selectedGenre,
            genre: selectedGenre,
            content: generatedContent,
            theme,
          },
        });
      } catch (err) {
        alert("Error generating story: " + err.message);
        hasGeneratedStory.current = false;
        navigate("/");
      }
    };

    if (!hasGeneratedStory.current) {
      fetchStory();
    }
  }, [navigate, state]);

  return (
    <div className={`fullscreen-loader ${theme}`}>
      <Lottie
        animationData={writingAnimation}
        loop
        style={{ width: 380, height: 380 }}
      />
      <p>Generating your story...</p>
    </div>
  );
}

export default LoadingPage;
