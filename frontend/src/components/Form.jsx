"use client";

import { useRef, useState } from "react";
import axios from "axios";
import {
  Upload,
  X,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Wifi,
  WifiOff,
} from "lucide-react";

function Form({ serverStatus, onRefreshStatus }) {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if server is available for requests
  const isServerAvailable = serverStatus === "live";
  const isServerWaking = serverStatus === "waking";
  const isServerOffline = serverStatus === "offline";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jobDesc) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    // Check server status before making request
    if (!isServerAvailable) {
      if (isServerWaking) {
        alert("Server is waking up. Please wait a moment and try again.");
        return;
      } else if (isServerOffline) {
        alert(
          "Server is offline. Please check your connection or try again later."
        );
        return;
      }
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDesc);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://ai-resume-analyzer-htsu.onrender.com/analyze/",
        formData
      );

      if (res.data?.result) {
        setResult(res.data.result);
      } else if (res.data?.analysis) {
        setResult(res.data.analysis);
      } else if (res.data?.error) {
        setResult("❌ Server responded with an error: " + res.data.error);
      } else {
        setResult("❌ Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error:", err);

      if (err.response?.status === 429) {
        setResult("⚠️ Rate limit exceeded. Please try again in a few minutes.");
      } else if (err.response?.data?.error) {
        setResult("❌ Error from server: " + err.response.data.error);
      } else {
        setResult(
          "❌ Network error. Please check your connection or try again."
        );
        // Trigger server status refresh when network error occurs
        if (onRefreshStatus) {
          onRefreshStatus();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const fileInputRef = useRef();
  const handleCancel = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setResume(file);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const formatResult = (text) => {
    // Clean up the text first
    const cleanText = text.replace(/\*\*/g, "").replace(/\*/g, "");

    // Split into sections based on common patterns
    const sections = cleanText
      .split(/\n\s*\n/)
      .filter((section) => section.trim());

    return sections
      .map((section, index) => {
        const lines = section.split("\n").filter((line) => line.trim());

        if (lines.length === 0) return null;

        // Check if this is a main section (usually the first line is a header)
        const firstLine = lines[0].trim();
        const isMainSection =
          firstLine.length > 0 &&
          (firstLine.includes("Analysis") ||
            firstLine.includes("Summary") ||
            firstLine.includes("Recommendations") ||
            firstLine.includes("Skills") ||
            firstLine.includes("Experience") ||
            firstLine.includes("Education") ||
            firstLine.includes("Improvements") ||
            firstLine.includes("Match") ||
            firstLine.includes("Score") ||
            firstLine.includes("Feedback") ||
            firstLine.includes("Strengths") ||
            firstLine.includes("Weaknesses"));

        if (isMainSection) {
          return (
            <div
              key={index}
              style={{
                marginBottom: "2rem",
                borderLeft: "4px solid #ec4899",
                paddingLeft: "1.5rem",
              }}
            >
              {" "}
              {/* Updated border color to pink */}
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#ec4899", // Updated to pink
                  marginBottom: "1rem",
                  fontFamily: "Inter, sans-serif",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#ec4899",
                    borderRadius: "50%",
                    marginRight: "12px",
                  }}
                ></div>
                {firstLine}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {lines.slice(1).map((line, lineIndex) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine) return null;

                  // Check if it's a sub-heading (usually contains colons or is short)
                  const isSubHeading =
                    trimmedLine.includes(":") && trimmedLine.length < 100;

                  if (isSubHeading) {
                    const [heading, ...contentParts] = trimmedLine.split(":");
                    const content = contentParts.join(":").trim();

                    return (
                      <div
                        key={lineIndex}
                        style={{ marginBottom: "1rem", marginLeft: "1rem" }}
                      >
                        <h3
                          style={{
                            fontSize: "1.125rem",
                            fontWeight: "600",
                            color: "#1f2937",
                            marginBottom: "0.5rem",
                            fontFamily: "Inter, sans-serif",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              background: "#ef4444",
                              borderRadius: "50%",
                              marginRight: "8px",
                            }}
                          ></div>{" "}
                          {/* Updated to red */}
                          {heading.trim()}
                        </h3>
                        {content && (
                          <p
                            style={{
                              color: "#4b5563",
                              marginLeft: "1.5rem",
                              lineHeight: "1.6",
                              fontFamily: "Inter, sans-serif",
                              background: "rgba(0, 0, 0, 0.05)",
                              padding: "12px",
                              borderRadius: "8px",
                            }}
                          >
                            {content}
                          </p>
                        )}
                      </div>
                    );
                  }

                  // Check if it's a numbered or bulleted item
                  const numberedMatch = trimmedLine.match(/^(\d+)\.?\s*(.+)/);
                  const bulletMatch = trimmedLine.match(/^[-•·]\s*(.+)/);

                  if (numberedMatch) {
                    return (
                      <div
                        key={lineIndex}
                        style={{ marginBottom: "12px", marginLeft: "2rem" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "24px",
                              height: "24px",
                              background:
                                "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)", // Updated to pink-red gradient
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontSize: "12px",
                              fontWeight: "700",
                              marginTop: "2px",
                              flexShrink: 0,
                            }}
                          >
                            {numberedMatch[1]}
                          </div>
                          <p
                            style={{
                              color: "#4b5563",
                              lineHeight: "1.6",
                              fontFamily: "Inter, sans-serif",
                              flex: 1,
                              background: "rgba(0, 0, 0, 0.03)",
                              padding: "8px",
                              borderRadius: "6px",
                            }}
                          >
                            {numberedMatch[2]}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  if (bulletMatch) {
                    return (
                      <div
                        key={lineIndex}
                        style={{ marginBottom: "8px", marginLeft: "2rem" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              background: "#6b7280",
                              borderRadius: "50%",
                              marginTop: "8px",
                              flexShrink: 0,
                            }}
                          ></div>
                          <p
                            style={{
                              color: "#4b5563",
                              lineHeight: "1.6",
                              fontFamily: "Inter, sans-serif",
                              background: "rgba(0, 0, 0, 0.03)",
                              padding: "8px",
                              borderRadius: "6px",
                            }}
                          >
                            {bulletMatch[1]}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  // Regular content
                  return (
                    <p
                      key={lineIndex}
                      style={{
                        color: "#4b5563",
                        lineHeight: "1.6",
                        fontFamily: "Inter, sans-serif",
                        marginLeft: "1.5rem",
                        marginBottom: "8px",
                        background: "rgba(0, 0, 0, 0.03)",
                        padding: "8px",
                        borderRadius: "6px",
                      }}
                    >
                      {trimmedLine}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        }

        // Handle standalone content blocks
        return (
          <div
            key={index}
            style={{
              marginBottom: "1.5rem",
              background: "rgba(0, 0, 0, 0.05)",
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            {lines.map((line, lineIndex) => {
              const trimmedLine = line.trim();
              if (!trimmedLine) return null;

              // Check for sub-headings
              const isSubHeading =
                trimmedLine.includes(":") && trimmedLine.length < 100;

              if (isSubHeading) {
                const [heading, ...contentParts] = trimmedLine.split(":");
                const content = contentParts.join(":").trim();

                return (
                  <div key={lineIndex} style={{ marginBottom: "12px" }}>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "500",
                        color: "#f59e0b",
                        marginBottom: "4px",
                        fontFamily: "Inter, sans-serif",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          background: "#f59e0b",
                          borderRadius: "50%",
                          marginRight: "8px",
                        }}
                      ></div>
                      {heading.trim()}
                    </h4>
                    {content && (
                      <p
                        style={{
                          color: "#4b5563",
                          marginLeft: "1rem",
                          lineHeight: "1.6",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {content}
                      </p>
                    )}
                  </div>
                );
              }

              return (
                <p
                  key={lineIndex}
                  style={{
                    color: "#4b5563",
                    lineHeight: "1.6",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "8px",
                  }}
                >
                  {trimmedLine}
                </p>
              );
            })}
          </div>
        );
      })
      .filter(Boolean);
  };

  // Get button text and styling based on server status
  const getButtonConfig = () => {
    if (loading) {
      return {
        text: "Analyzing...",
        icon: <Loader2 className="w-5 h-5 animate-spin" />,
        disabled: true,
        className: "btn-primary",
        style: { opacity: 0.6, cursor: "not-allowed" },
      };
    }

    if (isServerOffline) {
      return {
        text: "Server Offline",
        icon: <WifiOff className="w-5 h-5" />,
        disabled: true,
        className: "btn-primary",
        style: { opacity: 0.6, cursor: "not-allowed" },
      };
    }

    if (isServerWaking) {
      return {
        text: "Server Waking Up...",
        icon: <Wifi className="w-5 h-5 animate-pulse" />,
        disabled: true,
        className: "btn-primary",
        style: { opacity: 0.6, cursor: "not-allowed" },
      };
    }

    return {
      text: "Analyze Resume",
      icon: <Zap className="w-5 h-5" />,
      disabled: false,
      className: "btn-primary",
      style: {},
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="container">
      {" "}
      {/* Applied container class for 900px max-width */}
      <div className="card">
        {" "}
        {/* Applied card class for white background and shadow */}
        {/* Header Section */}
        <div className="card-header" style={{ textAlign: "center" }}>
          {" "}
          {/* Applied card-header class */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)", // Updated to pink-red gradient
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
              }}
            >
              <Zap className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>
          <h1
            className="card-title"
            style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}
          >
            {" "}
            {/* Applied card-title class and Inter font */}
            AI Resume Analyzer
          </h1>
          <p className="card-subtitle" style={{ fontSize: "1.125rem" }}>
            {" "}
            {/* Applied card-subtitle class */}
            Get intelligent insights about your resume compatibility
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* File Upload Section */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "500",
                fontSize: "1.125rem",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Upload Resume (PDF)
            </label>

            <div
              style={{
                position: "relative",
                border: `2px dashed ${
                  dragActive ? "#ec4899" : resume ? "#10b981" : "#d1d5db"
                }`, // Updated active color to pink
                borderRadius: "12px",
                padding: "2rem",
                transition: "all 0.3s ease",
                background: dragActive
                  ? "rgba(236, 72, 153, 0.05)"
                  : resume
                  ? "rgba(16, 185, 129, 0.05)"
                  : "rgba(0, 0, 0, 0.02)",
              }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {resume ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-green-400 animate-bounce" />
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          color: "#10b981",
                          fontWeight: "500",
                          fontSize: "1.125rem",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {resume.name}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginTop: "8px",
                        }}
                      >
                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "0.875rem",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          File uploaded successfully
                        </p>
                        <button
                          onClick={handleCancel}
                          style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            borderRadius: "6px",
                            padding: "4px",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <X className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-slate-400" />
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          color: "#374151",
                          fontWeight: "500",
                          fontSize: "1.125rem",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        Drop your resume here or click to browse
                      </p>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.875rem",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        PDF files only
                      </p>
                    </div>
                  </>
                )}
              </div>

              <input
                id="file-upload"
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                onChange={(e) => setResume(e.target.files[0])}
                required={true}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
                disabled={!isServerAvailable && !isServerWaking}
              />
            </div>
          </div>

          {/* Job Description Section */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "500",
                fontSize: "1.125rem",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Paste Job Description
            </label>
            <div style={{ position: "relative" }}>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                required={true}
                rows={6}
                placeholder="Enter the job description here..."
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "rgba(0, 0, 0, 0.02)",
                  border: "1px solid #d1d5db",
                  borderRadius: "12px",
                  color: "#1f2937",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  resize: "none",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#ec4899")} // Updated focus color to pink
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                disabled={!isServerAvailable && !isServerWaking}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {jobDesc.length} characters
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={buttonConfig.disabled}
            className={buttonConfig.className}
            style={{
              ...buttonConfig.style,
              width: "100%",
              padding: "1rem 1.5rem",
              fontSize: "1.125rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {buttonConfig.icon}
            <span>{buttonConfig.text}</span>
          </button>
        </form>
        {/* Enhanced Results Section */}
        {result && (
          <div
            className="card"
            style={{ marginTop: "2rem", overflow: "hidden" }}
          >
            {" "}
            {/* Applied card class */}
            {/* Result Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background:
                      "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)", // Updated to pink-red gradient
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#ec4899", // Updated to pink
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    AI Feedback
                  </h2>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Resume analysis results
                  </p>
                </div>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  background: "rgba(0, 0, 0, 0.05)",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Inter, sans-serif",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(0, 0, 0, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "rgba(0, 0, 0, 0.05)")
                }
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: copied ? "#10b981" : "#6b7280",
                  }}
                >
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
            {/* Result Content */}
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                paddingRight: "8px",
              }}
            >
              <div>{formatResult(result)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
