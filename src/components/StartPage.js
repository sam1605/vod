import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import Swal from 'sweetalert2'



const StartPage = () => {
  const navigate = useNavigate();
  const [holdTimer, setHoldTimer] = useState(null);
  // or via CommonJS
  const Swal = require('sweetalert2')
  const selectUser = (user) => {
    localStorage.setItem("selectedUser", user);
    navigate("/verse");
  };

  const setUser = (user) => {
    console.log(`User set to: ${user}`);
    selectUser("user");
    // Add any additional logic for short press here
  };

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      Swal.fire({
        title: "Do you want to clear Data ?",
        text: "(Don't do it if you don't like the verse, God doesn't work that way)!",
        icon: "warning",
        confirmButtonText: "Reset",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        toast: false,
        timer: 10000,
        timerProgressBar: true
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          Swal.fire("Data Cleared!", "", "success");
        }
        else{
          // Swal.fire("Action cancelled!", "", "error");
          Swal.close();
        }
      });
    }, 5000);
    setHoldTimer(timer);
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimer);
    // Keep the short press functionality as is
    setUser("shortPressUser");
  };

  const handleMouseLeave = () => {
    clearTimeout(holdTimer);
  };

  return (
    <div className="start-page">
      <header className="header-start">
        <h1><i>"Every Promise in the Book in Mine!"</i></h1>
      </header>
      <main>
        <div className="user-button-div">
          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="user-button"
          >
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
