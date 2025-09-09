import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Mic,
  Send,
  Home,
  BarChart3,
  Eye,
  Settings,
  Moon,
  Sun,
  Download,
  Menu,
  X,
  Globe,
  ChevronDown,
  MapPin,
  TrendingUp,
  Droplets,
  AlertTriangle,
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

const GroundwaterPortal = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
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
  const [language, setLanguage] = useState("English");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample data for visualizations
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
    scrollToBottom();
  }, [chatMessages]);

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

  const sidebarItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "historical", icon: BarChart3, label: "Historical Data" },
    { id: "visualizations", icon: Eye, label: "Visualizations" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const languages = ["English", "Hindi", "Bengali", "Tamil", "Telugu"];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg hover:${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            } lg:hidden`}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Droplets className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              INGRES AI Portal
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Globe size={16} />
              <span>{language}</span>
              <ChevronDown size={14} />
            </button>

            {showLanguageDropdown && (
              <div
                className={`absolute right-0 mt-2 w-32 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-lg border z-50`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    } first:rounded-t-lg last:rounded-b-lg`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg hover:${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:relative lg:translate-x-0 z-40 w-64 h-full ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } border-r transition-transform duration-300 ease-in-out`}
        >
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : `hover:${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-sm opacity-70">Quick Stats</h3>
            <div
              className={`p-3 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm font-medium">Water Level</span>
              </div>
              <p className="text-lg font-bold">14.1m</p>
              <p className="text-xs opacity-70">+0.9m from last year</p>
            </div>

            <div
              className={`p-3 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="text-yellow-500" size={16} />
                <span className="text-sm font-medium">Critical Areas</span>
              </div>
              <p className="text-lg font-bold">2</p>
              <p className="text-xs opacity-70">Districts need attention</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex">
          {/* Chat Panel */}
          <div className="flex-1 flex flex-col">
            {/* Quick Query Buttons */}
            <div
              className={`p-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {quickQueries.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuery(query)}
                    className={`px-3 py-2 text-sm rounded-full border transition-colors hover:${
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
                    className={`max-w-3xl ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : isDarkMode
                        ? "bg-gray-800"
                        : "bg-white"
                    } rounded-lg p-4 shadow-sm`}
                  >
                    <p className="mb-2">{message.content}</p>

                    {/* Chart Integration */}
                    {message.hasChart && message.type === "bot" && (
                      <div
                        className={`mt-4 p-4 rounded-lg ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">
                            Groundwater Level Trends
                          </h4>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Download size={16} />
                          </button>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
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
                        className={`mt-4 p-4 rounded-lg ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">
                            District Water Status
                          </h4>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Download size={16} />
                          </button>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={districtData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3B82F6" />
                          </BarChart>
                        </ResponsiveContainer>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {districtData.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <div
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-sm">{item.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              className={`p-4 border-t ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about groundwater data, trends, or generate reports..."
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <button
                  onClick={toggleRecording}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    isRecording
                      ? "bg-red-500 text-white border-red-500"
                      : `hover:${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`
                  }`}
                >
                  <Mic size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Data Panel */}
          <div
            className={`w-80 border-l ${
              isDarkMode
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            } p-4 hidden xl:block`}
          >
            <h3 className="font-semibold mb-4">Live Data Overview</h3>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <h4 className="font-medium mb-2">Current Status</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-2 bg-green-100 text-green-800 rounded">
                    <div className="font-bold">Safe</div>
                    <div>45%</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-100 text-yellow-800 rounded">
                    <div className="font-bold">Semi-Critical</div>
                    <div>30%</div>
                  </div>
                  <div className="text-center p-2 bg-red-100 text-red-800 rounded">
                    <div className="font-bold">Critical</div>
                    <div>15%</div>
                  </div>
                  <div className="text-center p-2 bg-red-200 text-red-900 rounded">
                    <div className="font-bold">Over-Exploited</div>
                    <div>10%</div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <h4 className="font-medium mb-2">Recent Updates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-blue-500" size={14} />
                    <span>District A: Level improved by 2.3m</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-green-500" size={14} />
                    <span>Overall trend: +5% this quarter</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-yellow-500" size={14} />
                    <span>2 districts need monitoring</span>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <h4 className="font-medium mb-2">Data Sources</h4>
                <div className="text-sm space-y-1">
                  <p>• CGWB Monitoring Wells</p>
                  <p>• Satellite Data (ISRO)</p>
                  <p>• Rainfall Records (IMD)</p>
                  <p>• Last Updated: 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default GroundwaterPortal;
