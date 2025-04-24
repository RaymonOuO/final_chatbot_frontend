import React, { useState } from "react";
import { uploadPDF } from "../api/api";
import { FaUpload, FaFile, FaCheck, FaSpinner } from "react-icons/fa";
import "../styles/Chat.css";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Only PDF files are supported");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file to upload");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const result = await uploadPDF(file);
      setUploadResult(result);

      // Call success callback
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed, please try again");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <div className="file-upload-header">
        <h3>Add Knowledge Document</h3>
        <p className="upload-description">
          Upload PDF documents to expand the assistant's knowledge base
        </p>
      </div>

      <div className="file-selection">
        <div className="file-input-wrapper">
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isUploading}
            className="file-input"
          />
          <label htmlFor="pdf-upload" className="file-input-label">
            <FaFile className="file-icon" />
            <span>{file ? file.name : "Choose PDF file"}</span>
          </label>
        </div>

        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <>
              <FaSpinner className="spinner-icon" />
              Uploading...
            </>
          ) : (
            <>
              <FaUpload />
              Upload Document
            </>
          )}
        </button>
      </div>

      {error && <div className="upload-error">{error}</div>}

      {uploadResult && (
        <div className="upload-success">
          <FaCheck className="success-icon" />
          <p>{uploadResult.message}</p>
          <p className="upload-details">
            Filename: {uploadResult.filename}
            <br />
            Text chunks added: {uploadResult.chunks_added}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
