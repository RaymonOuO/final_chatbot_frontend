import React from "react";
import Header from "./components/Header";
import ChatPage from "./pages/ChatPage";
import { resetChat } from "./api/api";
import "./styles/App.css";

function App() {
  const handleResetChat = async () => {
    try {
      await resetChat();
      // Refresh page to reset state
      window.location.reload();
    } catch (error) {
      console.error("Failed to reset chat:", error);
      alert("Failed to reset conversation. Please try again.");
    }
  };

  return (
    <div className="app">
      <Header onResetChat={handleResetChat} />
      <main className="app-main">
        <ChatPage />
      </main>
      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} Mental Health Assistant | Powered by AI
        </p>
      </footer>
    </div>
  );
}

export default App;
