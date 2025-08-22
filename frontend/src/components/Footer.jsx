"use client";
import { Mail, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {" "}
      {/* Updated footer background to match design system */}
      <div className="container">
        {" "}
        {/* Applied container class for 900px max-width */}
        {/* Main Footer Content */}
        <div style={{ padding: "1.5rem 0", margin: "0 auto" }}>
          {/* Brand Section */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <a
                href="https://www.linkedin.com/in/ajay-das-204111273/"
                style={{
                  padding: "8px",
                  color: "#d1d5db",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "white";
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#d1d5db";
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                }}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:ajayarsenal001@gmail.com"
                style={{
                  padding: "8px",
                  color: "#d1d5db",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "white";
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#d1d5db";
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                }}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "1.5rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth < 768 ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: window.innerWidth < 768 ? "1rem" : "0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#d1d5db",
                fontSize: "0.875rem",
                fontFamily: "Inter, sans-serif", // Applied Inter font
              }}
            >
              <span>© 2025 ResumeAI Analyzer Pro. All rights reserved.</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "#d1d5db",
                fontSize: "0.875rem",
                fontFamily: "Inter, sans-serif", // Applied Inter font
              }}
            >
              {/* <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" /> */}
              <span>for job seekers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
