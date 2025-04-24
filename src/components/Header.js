import React from "react";
import { FaBrain, FaHeart } from "react-icons/fa";
import "../styles/App.css";

const Header = ({ onResetChat }) => {
  return (
    <header className="app-header">
      <div className="header-logo">
        <FaBrain className="logo-icon" />
        <h1 className="app-title">Mental Health Assistant</h1>
      </div>

      <div className="header-subtitle">
        <FaHeart className="heart-icon" />
        <p>Your AI Counseling Companion</p>
      </div>

      {onResetChat && (
        <button
          className="reset-button"
          onClick={onResetChat}
          aria-label="Reset conversation"
          title="Reset conversation"
        >
          Reset Chat
        </button>
      )}
    </header>
  );
};

export default Header;
