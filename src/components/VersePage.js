import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const VersePage = () => {
  const [verse, setVerse] = useState(null);
  const navigate = useNavigate();
  const user = localStorage.getItem("selectedUser");

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const storedDate = localStorage.getItem(`${user}-verseDate`);
    const storedVerse = localStorage.getItem(`${user}-verse`);
    const dummyDate = '01-01-0001'

    // fetchVerse(new Date().toISOString().split("T")[0])

    if (storedDate === today && storedVerse) {
      setVerse(JSON.parse(storedVerse));
    } else {
      // localStorage.clear();
      fetchVerse(today);
    }
  }, [user]);

  const fetchVerse = async (today) => {
    try {
      const response = await axios.get("https://bible-api.com/data/kjv/random");debugger
      const newVerse = response.data;
      setVerse(newVerse.random_verse);
      localStorage.setItem(`${user}-verseDate`, today);
      localStorage.setItem(`${user}-verse`, JSON.stringify(newVerse.random_verse));
    } catch (error) {
      console.error("Error fetching verse:", error);
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("selectedUser");
    navigate("/");
  };

  return (
    <div className="verse-page">
      <header className="header-main">
        <h1>{user}'s verse for Today</h1>
      </header>
      <main>
        {verse ? (
          <div className="verse-container">
            <p className="verse-text">"{verse.text}"</p>
            <p className="verse-reference">{verse.book} {verse.chapter}:{verse.verse}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={handleGoBack} className="go-back-button">
          Go Back
        </button>
      </main>
      <footer>
        <p>© 2025 Verse of the Day App</p>
      </footer>
    </div>
  );
};

export default VersePage;
