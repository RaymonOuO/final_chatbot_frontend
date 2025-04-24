import React from "react";
import ReactMarkdown from "react-markdown";
import { FaUser, FaRobot } from "react-icons/fa";
import "../styles/Chat.css";

const ChatMessage = ({ message, isUser, sources = [] }) => {
  return (
    <div className={`chat-message ${isUser ? "user-message" : "bot-message"}`}>
      <div className="message-avatar">{isUser ? <FaUser /> : <FaRobot />}</div>
      <div className="message-content">
        <div className="message-text">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>

        {}
        {!isUser && sources && sources.length > 0 && (
          <div className="message-sources">
            <p className="sources-title">Reference:</p>
            <ul className="sources-list">
              {sources.map((source, index) => (
                <li key={index} className="source-item">
                  {source}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
