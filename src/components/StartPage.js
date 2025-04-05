import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import Swal from 'sweetalert2'
import {FaRedo } from "react-icons/fa"



const StartPage = () => {
  const navigate = useNavigate();
  const Swal = require('sweetalert2')
  const selectUser = (user) => {
    localStorage.setItem("selectedUser", user);
    navigate("/verse");
  };

  const handleReset = () => {
    console.log("Reset icon clicked!");
    // Show SweetAlert2 confirmation dialog
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
  };

  return (
    <div className="start-page">
      <header className="header-start">
        <h1><i>"Every Promise in the Book in Mine!"</i></h1>
      </header>
      <main>
        <div className="user-button-div">
          <button
            onClick={() => selectUser("user")}
            className="user-button"
          >
            View Verse
          </button>
          <button className="reset-button" onClick={handleReset}>
          <FaRedo  />
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
