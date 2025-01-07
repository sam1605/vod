import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const StartPage = () => {
  const navigate = useNavigate();

  const selectUser = (user) => {
    localStorage.setItem("selectedUser", user);
    navigate("/verse");
  };

  return (
    <div className="start-page">
      <header className="header-start">
      <h1>Who are you?</h1>
      </header>
      <main>
      <div className="user-button-div">
        <button onClick={() => selectUser("Shu")} className="user-button">
          Allu Shiny Shulamite
        </button>
        <button onClick={() => selectUser("Sam")} className="user-button">
          Sam Aditya
        </button>
      </div>
      </main>
      <footer>
        <p>© 2025 Verse of the Day App</p>
      </footer>
    </div>
  );
};

export default StartPage;
