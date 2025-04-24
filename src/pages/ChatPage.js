import React, { useState, useEffect, useRef } from "react";
import { sendMessage, resetChat, checkHealth } from "../api/api";
import ChatMessage from "../components/ChatMessage";
import FileUpload from "../components/FileUpload";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import "../styles/Chat.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Mental Health Assistant, ready to help with your questions or concerns about mental health. Feel free to start a conversation anytime.",
      isUser: false,
      sources: [],
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking");
  const messagesEndRef = useRef(null);

  // Format chat history for API
  const formatChatHistory = () => {
    const history = [];
    for (let i = 0; i < messages.length - 1; i += 2) {
      if (i + 1 < messages.length) {
        history.push([
          messages[i].text, // User message
          messages[i + 1].text, // Bot response
        ]);
      }
    }
    return history;
  };

  // Send message
  const handleSendMessage = async (e) => {
    e?.preventDefault();

    if (!inputMessage.trim() || isLoading) return;

    // Add user message to list
    const userMessage = { text: inputMessage, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input field
    setInputMessage("");
    setIsLoading(true);

    try {
      // Prepare chat history
      const chatHistory = formatChatHistory();

      // Call API to send message
      const response = await sendMessage(userMessage.text, chatHistory);

      // Add assistant response to message list
      setMessages((prev) => [
        ...prev,
        {
          text: response.response,
          isUser: false,
          sources: response.sources || [],
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, an error occurred. Please try again later or refresh the page.",
          isUser: false,
          sources: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset conversation
  const handleResetChat = async () => {
    try {
      await resetChat();
      setMessages([
        {
          text: "The conversation has been reset. How can I help you today?",
          isUser: false,
          sources: [],
        },
      ]);
    } catch (error) {
      console.error("Failed to reset chat:", error);
    }
  };

  // Handle file upload success
  const handleUploadSuccess = (result) => {
    // Add message to notify user of successful upload
    setMessages((prev) => [
      ...prev,
      {
        text: `Document "${result.filename}" has been successfully uploaded and added to my knowledge base! I can now answer questions based on this document.`,
        isUser: false,
        sources: [],
      },
    ]);

    // Hide upload panel
    setShowUpload(false);
  };

  // Check API health status
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        await checkHealth();
        setApiStatus("connected");
      } catch (error) {
        console.error("API health check failed:", error);
        setApiStatus("error");
      }
    };

    checkApiHealth();
  }, []);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      {/* API status indicator */}
      {apiStatus === "checking" && (
        <div className="api-status checking">
          <FaSpinner className="spinner-icon" /> Checking API connection...
        </div>
      )}

      {apiStatus === "error" && (
        <div className="api-status error">
          Unable to connect to API server. Please ensure the backend service is
          running on port 1234.
        </div>
      )}

      {/* Upload panel */}
      {showUpload && (
        <div className="upload-panel">
          <FileUpload onUploadSuccess={handleUploadSuccess} />
          <button
            className="close-upload-button"
            onClick={() => setShowUpload(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Messages area */}
      <div className="messages-container">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            sources={message.sources}
          />
        ))}

        {isLoading && (
          <div className="bot-typing">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>AI assistant is thinking...</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="chat-input-container">
        <button
          className="upload-toggle-button"
          onClick={() => setShowUpload(!showUpload)}
          title="Upload PDF document"
        >
          Add Knowledge Document
        </button>

        <form className="chat-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question or concern..."
            disabled={isLoading || apiStatus === "error"}
            className="chat-input"
          />

          <button
            type="submit"
            disabled={
              !inputMessage.trim() || isLoading || apiStatus === "error"
            }
            className="send-button"
          >
            {isLoading ? (
              <FaSpinner className="spinner-icon" />
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
