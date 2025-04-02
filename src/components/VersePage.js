import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const VersePage = () => {
  const [verse, setVerse] = useState(null);
  const [reference, setReference] = useState(null);
  const [id, setId] = useState(null);
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
    const storedReference = localStorage.getItem(`${user}-reference`);
    const dummyDate = '01-01-0001'

    // fetchVerse(new Date().toISOString().split("T")[0])

    if (storedDate === today && storedVerse&&storedVerse!=='undefined') {
      setVerse(JSON.parse(storedVerse));
      setReference(JSON.parse(storedReference));
    } else {
      // localStorage.clear();
      fetchVerse(today);
    }
  }, [user]);

  const fetchVerse = async (today) => {
    try {
      const response = await axios.get("https://blushing-clownfish-sierramike-82a6e4dd.koyeb.app/api/Verses/random");debugger
      const newVerse = response.data;
      setVerse(newVerse.verse);
      setReference(newVerse.reference);
      setId(newVerse.id);
      localStorage.setItem(`${user}-verseDate`, today);
      localStorage.setItem(`${user}-verse`, JSON.stringify(newVerse.verse));
      localStorage.setItem(`${user}-reference`, JSON.stringify(newVerse.reference));
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
        <h1>Your verse for Today</h1>
      </header>
      <main>
        {verse ? (
          <div className="verse-container">
            <p className="verse-text">"{verse}"</p>
            <p className="verse-reference">{reference}</p>
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
