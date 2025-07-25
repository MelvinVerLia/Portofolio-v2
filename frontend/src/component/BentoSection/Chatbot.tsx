import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Send,
  Bot,
  User,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import ConvertFinder from "../../../API/ConvertFinder";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! I'm Bob, Melvin's lil helper. What would you like to know about him or his work?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height =
        Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  const sendMessage = async () => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setError("");
    setIsLoading(true);
    await sleep(2000);

    try {
      const response = await ConvertFinder.post("/chat", {
        prompt: inputMessage,
      });
      const data = await response.data.response;
      console.log("Response data:", data);

      if (response.status === 429) {
        setError(
          `Rate limit exceeded. Please wait ${
            data.retryAfter || 60
          } seconds before trying again.`
        );
        return;
      }

      if (!response) {
        throw new Error(data.error || "Something went wrong");
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = {
        id: Date.now() + 1,
        text: "My little helper is not braining right now. Please try again later.",
        sender: "error",
        timestamp: new Date(),
      };
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    if (error) setError(""); // Clear error when user starts typing
  };
  const formatMessageText = (text: string) => {
    const parseInline = (line: string) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

      return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-bold">
              {part.slice(2, -2)}
            </strong>
          );
        }

        return <span key={index}>{part}</span>;
      });
    };

    const lines = text.split("\n");

    return lines.map((line, index) => (
      <span key={index}>
        {parseInline(line)}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

  const handleMinimize = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      setIsMinimized(true);
      setIsMinimizing(false);
    }, 500);
  };

  if (isMinimized) {
    return (
      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 1 }}
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-5 hover:cursor-pointer"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-7 right-5 z-50"
        initial={{ opacity: 0.5, scale: 1, x: 400 }}
        animate={{
          opacity: isMinimizing ? 0 : 1,
          scale: 1,
          x: isMinimizing ? 400 : 0,
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.5,
        }}
      >
        <div
          className="bg-gray-900 w-sm flex flex-col p-0 rounded-2xl"
          style={{
            boxShadow: "0 0 20px 5px rgba(147, 51, 234, 0.8)",
            height: "70vh",
          }}
        >
          <div className="p-6 pb-4 border-b border-gray-700 bg-gradient-to-r from-purple-900/30 to-pink-900/20 shrink-0">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-900/50 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-purple-400">
                    Chat with Bob
                  </h2>
                </div>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <button
                  onClick={handleMinimize}
                  className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg p-2 hover:cursor-pointer transition-all duration-1000"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#9333ea #1f2937",
            }}
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className={`flex items-start gap-3 text-[13px] ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {(message.sender === "bot" || message.sender === "error") && (
                    <div className="p-2 bg-purple-900/30 rounded-full">
                      <Bot className="w-5 h-5 text-purple-400" />
                    </div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`max-w-[70%] p-4 rounded-lg shadow-lg text-left ${
                      message.sender === "user"
                        ? "bg-purple-600 text-gray-100"
                        : message.sender === "bot"
                        ? "bg-gray-800 text-gray-100"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    <div className="leading-normal break-words whitespace-pre-wrap">
                      {formatMessageText(message.text)}
                    </div>
                    <div
                      className={`text-[10px] mt-2 ${
                        message.sender === "user"
                        ? "text-purple-200"
                        : message.sender === "bot"
                        ? "text-gray-400"
                        : "text-red-300"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </motion.div>

                  {message.sender === "user" && (
                    <div className="p-2 bg-purple-600 rounded-full">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0. }}
              >
                <div className="p-2 bg-purple-900/30 rounded-full">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-[13px]">Bob is typing</span>
                    <div className="flex gap-1">
                      {[0, 150, 300].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-purple-400 rounded-full"
                          animate={{ y: [-2, 2, -2] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: delay / 1000,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 pt-4 shrink-0 rounded-2xl border-gradient-to-r purple-900/20 backdrop-blur-sm bg-gray-900/50">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Melvin's experience, projects, or anything else..."
                  className="w-full py-2 px-2 text-[12px] bg-gray-800/50 border border-gray-600/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none custom-scrollbar backdrop-blur-sm transition-all duration-200 hover:bg-gray-800/80"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#9333ea #1f2937",
                    minHeight: "64px",
                    maxHeight: "100px",
                  }}
                  maxLength={500}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {inputMessage.length}/500
                </div>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white hover:cursor-pointer transition-all duration-300 p-4 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group self-center"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      )
    </AnimatePresence>
  );
};

export default Chatbot;
