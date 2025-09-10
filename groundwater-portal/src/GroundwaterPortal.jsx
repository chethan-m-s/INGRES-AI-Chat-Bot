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
import ChatWidget from "./ChatWidget";

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
        } border-b px-4 py-3 flex items-center justify-between sticky top-0 z-40`}
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

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 pt-16 transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border-r`}
        >
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-blue-50 text-blue-700"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 pt-20 lg:ml-64">
          <h2 className="text-2xl font-bold mb-6">Groundwater Monitoring Dashboard</h2>
          
          {/* Your existing dashboard content here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard cards and content */}
            <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="font-semibold mb-4">Overview</h3>
              <p>Welcome to the INGRES Groundwater Portal. This dashboard provides real-time monitoring and analysis of groundwater levels across different regions.</p>
            </div>
            
            {/* Add more dashboard content as needed */}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Chat Widget */}
      <ChatWidget isDarkMode={isDarkMode} />
    </div>
  );
};

export default GroundwaterPortal;
