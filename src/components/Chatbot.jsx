import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Send, User, Mic, MicOff } from "lucide-react";
import { marked } from "marked";

const Chatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognition = useRef(null);
  const abortController = useRef(new AbortController());
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      setSpeechSupported(true);

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsListening(!isListening);
  };

  // Add this useEffect to load voices when component mounts
  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

  }, []);

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    scrollToBottom();

    try {
      const response = await fetch("http://localhost:3001/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          message: input,
          history: chatHistory,
        }),
        signal: abortController.current.signal,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = { sender: "bot", text: "" };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.replace("data: ", ""));
            botMessage.text += data.text;
            const html = marked.parse(botMessage.text);

            setMessages([...newMessages, { sender: "bot", text: html, isHtml: true }]);
            speakResponse(data.text);
            scrollToBottom();
          }
        }
      }

      setChatHistory(prev => [
        ...prev,
        { role: "user", parts: [{ text: input }] },
        { role: "model", parts: [{ text: botMessage.text }] },
      ]);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Stream error:", err);
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "Error processing request" },
        ]);
      }
    } finally {
      setLoading(false);
      abortController.current = new AbortController();
    }
  };

  // Update the speakResponse function
  const speakResponse = (text) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean up the text for better speech
    const cleanText = text
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/([.!?])\s*/g, '$1\n') // Add pauses after punctuation
      .split('\n')
      .filter(sentence => sentence.trim().length > 0);

    // Configure speech settings
    const utterance = new SpeechSynthesisUtterance();
    utterance.volume = 1; // 0 to 1
    utterance.rate = 1.0; // 0.1 to 10
    utterance.pitch = 1; // 0 to 2
    utterance.lang = 'en-US';

    // Get available voices and select a better one
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      voice => 
        voice.name.includes('Google') || // Prefer Google voices
        voice.name.includes('Female') || // Or female voices
        voice.lang === 'en-US' // Or US English voices
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Handle speech events
    utterance.onstart = () => {
      console.log('Started speaking');
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };

    // Speak each sentence with proper pauses
    cleanText.forEach((sentence) => {
      const sentenceUtterance = new SpeechSynthesisUtterance(sentence);
      sentenceUtterance.voice = utterance.voice;
      sentenceUtterance.rate = utterance.rate;
      sentenceUtterance.pitch = utterance.pitch;
      window.speechSynthesis.speak(sentenceUtterance);
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 md:p-8 mt-16">
      <div className="max-w-4xl mx-auto bg-zinc-900/50 rounded-xl border border-emerald-500/20 backdrop-blur-sm shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-emerald-400 font-semibold">AI</span>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Career Advisor
            </h2>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={chatWindowRef}
          className="h-[60vh] overflow-y-auto p-4 space-y-4 bg-zinc-950/50"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                {msg.sender === "user" ? 
                  <User size={16} className="text-zinc-400" /> : 
                  <span className="text-emerald-400 text-sm">AI</span>
                }
              </div>
              <div
                className={`max-w-[75%] rounded-xl p-3 ${
                  msg.sender === "user" 
                    ? "bg-emerald-500/10 border border-emerald-500/20" 
                    : "bg-zinc-800/50 border border-zinc-700/50"
                }`}
              >
                {msg.isHtml ? (
                  <div 
                    className="text-gray-300 prose prose-invert prose-sm"
                    dangerouslySetInnerHTML={{ __html: msg.text }} 
                  />
                ) : (
                  <div className="text-gray-300">{msg.text}</div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              disabled={loading}
            />
            {speechSupported && (
              <button
                onClick={toggleListening}
                className={`p-2 rounded-lg ${
                  isListening ? 'bg-red-500' : 'bg-emerald-500'
                } text-black hover:opacity-90 transition-colors`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            )}
            <button 
              onClick={handleSendMessage}
              disabled={loading}
              className="p-2 rounded-lg bg-emerald-500 text-black hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;