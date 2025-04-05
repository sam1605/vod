import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const VersePage = () => {
  const [verse, setVerse] = useState(null);
  const [reference, setReference] = useState(null);
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [verseNum, setVerseNum] = useState(null);
  const [translation, setTranslation] = useState("WEB");
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
    const storedBook = localStorage.getItem(`${user}-book`);
    const storedChapter = localStorage.getItem(`${user}-chapter`);
    const storedVerseNum = localStorage.getItem(`${user}-verseNum`);
    const dummyDate = '01-01-0001'

    // fetchVerse(new Date().toISOString().split("T")[0])

    if (storedDate === today && storedVerse&&storedVerse!=='undefined') {
      setVerse(JSON.parse(storedVerse));
      setReference(JSON.parse(storedReference));
      setBook(JSON.parse(storedBook.toLowerCase()));
      setChapter(JSON.parse(storedChapter));
      setVerseNum(JSON.parse(storedVerseNum));
    } else {
      localStorage.clear();
      fetchVerse(today);
    }
  }, []);

  const fetchVerse = async (today) => {
    try {
      const response = await axios.get("https://blushing-clownfish-sierramike-82a6e4dd.koyeb.app/api/Verses/random");debugger
      const newVerse = response.data;
      setVerse(newVerse.verse);
      setReference(newVerse.reference);
      setId(newVerse.id);
      setBook(newVerse.book.toLowerCase());
      setChapter(newVerse.chapter);
      setVerseNum(newVerse.verseNum);
      localStorage.setItem(`${user}-verseDate`, today);
      localStorage.setItem(`${user}-verse`, JSON.stringify(newVerse.verse));
      localStorage.setItem(`${user}-reference`, JSON.stringify(newVerse.reference));
      localStorage.setItem(`${user}-book`, JSON.stringify(newVerse.book));
      localStorage.setItem(`${user}-chapter`, JSON.stringify(newVerse.chapter));
      localStorage.setItem(`${user}-verseNum`, JSON.stringify(newVerse.verseNum));
    } catch (error) {
      console.error("Error fetching verse:", error);
    }
  };
  const fetchTranslation = async (tBook,tChapter,tVerse,translation) => {
    try {
      const response = await axios.get(`https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-${translation}/books/${tBook}/chapters/${tChapter}/verses/${tVerse}.json`);debugger
      const newVerse = response.data;
      setVerse(newVerse.text);
    } catch (error) {
      console.error("Error fetching Translation:", error);
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
            <p className="translation">{`[${translation}]`}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="translation-div">
        <button onClick={()=>{fetchTranslation(book,chapter,verseNum,"kjv");setTranslation("KJV")}} id="en-kjv" className="translation-button">
          KJV
        </button>
        <button onClick={()=>{fetchTranslation(book,chapter,verseNum,"asv");setTranslation("ASV")}} id="en-asv" className="translation-button">
          ASV
        </button>
        <button onClick={()=>{fetchTranslation(book,chapter,verseNum,"lsv");setTranslation("LSV")}} id="en-lsv" className="translation-button">
          LSV
        </button>
        <button onClick={()=>{fetchTranslation(book,chapter,verseNum,"webus");setTranslation("WEB")}} id="en-webus" className="translation-button">
          WEB
        </button>
        </div>
        <button onClick={handleGoBack}  className="go-back-button">
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
