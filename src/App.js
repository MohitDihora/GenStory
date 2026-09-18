import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GenStory from "./pages/GenStory";
import StoryPage from "./pages/StoryPage";
import LoadingPage from "./pages/LoadingPage";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenStory />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/terms-condition" element={<TermsAndConditionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
