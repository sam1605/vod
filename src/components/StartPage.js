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
      <h1><i>"Every Promise in the Book in Mine!"</i></h1>
      </header>
      <main>
      <div className="user-button-div">
        <button onClick={() => selectUser("user")} className="user-button">
          View Verse
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
