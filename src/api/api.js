import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkHealth = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};

export const sendMessage = async (query, chatHistory) => {
  try {
    const response = await api.post("/chat", {
      query,
      chat_history: chatHistory,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
};

export const uploadPDF = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/upload_pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to upload PDF:", error);
    throw error;
  }
};

export const resetChat = async () => {
  try {
    const response = await api.post("/reset_chat");
    return response.data;
  } catch (error) {
    console.error("Failed to reset chat:", error);
    throw error;
  }
};

export default api;
