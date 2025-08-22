import { Brain } from "lucide-react";

const Header = ({ serverStatus = "checking" }) => {
  const getStatusConfig = () => {
    switch (serverStatus) {
      case "live":
        return {
          color: "bg-green-500",
          pulseColor: "bg-green-400",
          text: "Server Live",
          textColor: "text-green-400",
        };
      case "waking":
        return {
          color: "bg-yellow-500",
          pulseColor: "bg-yellow-400",
          text: "Server Waking",
          textColor: "text-yellow-400",
        };
      case "offline":
        return {
          color: "bg-red-500",
          pulseColor: "bg-red-400",
          text: "Server Offline",
          textColor: "text-red-400",
        };
      default:
        return {
          color: "bg-gray-500",
          pulseColor: "bg-gray-400",
          text: "Checking...",
          textColor: "text-gray-400",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <header
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      {" "}
      {/* Updated header background to match design system */}
      <div className="container">
        {" "}
        {/* Applied container class for 900px max-width */}
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background:
                    "linear-gradient(135deg, #0a090bff 0%, #0a0000ff 100%)", // Updated to pink-red gradient
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
                }}
              >
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  fontFamily: "Inter, sans-serif", // Applied Inter font
                  color: "white",
                }}
              >
                ResumeIQ
              </h1>
            </div>
          </div>

          {/* Server Status Indicator */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                {/* Main status circle */}
                <div
                  className={`w-3 h-3 ${statusConfig.color} rounded-full`}
                ></div>
                {/* Pulse animation for live status */}
                {serverStatus === "live" && (
                  <div
                    className={`absolute inset-0 w-3 h-3 ${statusConfig.pulseColor} rounded-full animate-ping opacity-75`}
                  ></div>
                )}
                {/* Slow pulse for waking status */}
                {serverStatus === "waking" && (
                  <div
                    className={`absolute inset-0 w-3 h-3 ${statusConfig.pulseColor} rounded-full animate-pulse opacity-75`}
                  ></div>
                )}
              </div>
              <span
                className={`text-sm font-medium ${statusConfig.textColor} hidden sm:block`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {" "}
                {/* Applied Inter font */}
                {statusConfig.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
