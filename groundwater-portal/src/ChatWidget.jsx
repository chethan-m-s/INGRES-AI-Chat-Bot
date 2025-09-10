import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Mic,
  Send,
  X,
  Download,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const ChatWidget = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm your groundwater data assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample data for visualizations (copied from GroundwaterPortal)
  const trendData = [
    { year: "2018", level: 15.2, rainfall: 850 },
    { year: "2019", level: 14.8, rainfall: 920 },
    { year: "2020", level: 13.9, rainfall: 780 },
    { year: "2021", level: 12.5, rainfall: 650 },
    { year: "2022", level: 11.8, rainfall: 720 },
    { year: "2023", level: 13.2, rainfall: 890 },
    { year: "2024", level: 14.1, rainfall: 940 },
  ];

  const districtData = [
    { name: "District A", status: "Safe", value: 85, color: "#10B981" },
    {
      name: "District B",
      status: "Semi-Critical",
      value: 65,
      color: "#F59E0B",
    },
    { name: "District C", status: "Critical", value: 35, color: "#EF4444" },
    {
      name: "District D",
      status: "Over-Exploited",
      value: 15,
      color: "#7C2D12",
    },
  ];

  const quickQueries = [
    "Show groundwater levels for the last 5 years",
    "Which districts are in critical condition?",
    "What's the rainfall impact on water levels?",
    "Generate water quality report for my area",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isOpen]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        type: "user",
        content: inputMessage,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, newMessage]);
      setInputMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          type: "bot",
          content: generateBotResponse(inputMessage),
          timestamp: new Date(),
          hasChart:
            inputMessage.toLowerCase().includes("trend") ||
            inputMessage.toLowerCase().includes("level"),
          hasMap:
            inputMessage.toLowerCase().includes("district") ||
            inputMessage.toLowerCase().includes("area"),
        };
        setChatMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const generateBotResponse = (query) => {
    if (
      query.toLowerCase().includes("trend") ||
      query.toLowerCase().includes("level")
    ) {
      return "Here's the groundwater level trend for the past 7 years. You can see the correlation with rainfall patterns.";
    } else if (
      query.toLowerCase().includes("district") ||
      query.toLowerCase().includes("critical")
    ) {
      return "Based on current data, District C and D are in critical/over-exploited conditions. Here's the status overview:";
    } else if (query.toLowerCase().includes("rainfall")) {
      return "Rainfall has a significant impact on groundwater recharge. The data shows a strong correlation between annual rainfall and water level recovery.";
    } else {
      return "I've analyzed the latest groundwater data. Here are the key insights based on your query. Would you like me to show specific visualizations?";
    }
  };

  const handleQuickQuery = (query) => {
    setInputMessage(query);
    handleSendMessage();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window - Expanded State */}
      {isOpen && (
        <div 
          className={`mb-4 w-[350px] sm:w-[400px] md:w-[450px] rounded-lg shadow-xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
          style={{ maxHeight: "600px", height: "70vh" }}
        >
          {/* Chat Header */}
          <div 
            className={`p-4 flex justify-between items-center border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <MessageCircle className="text-blue-500" size={20} />
              <h3 className="font-semibold">Groundwater Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className={`p-1 rounded-full hover:${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Query Buttons */}
          <div
            className={`p-3 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {quickQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuery(query)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors hover:${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                  } rounded-lg p-3 shadow-sm`}
                >
                  <p className="text-sm mb-1">{message.content}</p>

                  {/* Chart Integration */}
                  {message.hasChart && message.type === "bot" && (
                    <div
                      className={`mt-3 p-3 rounded-lg ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-xs">Groundwater Level Trends</h4>
                        <button className="text-blue-500 hover:text-blue-600">
                          <Download size={14} />
                        </button>
                      </div>
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: '10px' }} />
                          <Line
                            type="monotone"
                            dataKey="level"
                            stroke="#3B82F6"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="rainfall"
                            stroke="#10B981"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Map Integration */}
                  {message.hasMap && message.type === "bot" && (
                    <div
                      className={`mt-3 p-3 rounded-lg ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-xs">District Water Status</h4>
                        <button className="text-blue-500 hover:text-blue-600">
                          <Download size={14} />
                        </button>
                      </div>
                      <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={districtData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <div
                    className={`mt-1 text-xs ${
                      message.type === "user"
                        ? "text-blue-200"
                        : isDarkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div
            className={`p-3 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className={`flex-1 py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
              />
              <button
                onClick={toggleRecording}
                className={`p-2 rounded-lg border transition-colors ${
                  isRecording
                    ? "bg-red-500 text-white border-red-500"
                    : `hover:${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`
                }`}
              >
                <Mic size={18} />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button - Minimized State */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? "bg-red-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;