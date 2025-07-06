import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Send, User, Mic, MicOff, Play, Pause } from "lucide-react";
import { marked } from "marked";

const InterviewBot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const recognition = useRef(null);
  const chatWindowRef = useRef(null);

  const interviewQuestions = [
    "Tell me about yourself and your career aspirations.",
    "What made you interested in this field?",
    "Can you describe a challenging project you've worked on?",
    "Where do you see yourself in 5 years?",
    "What are your strengths and weaknesses?",
  ];

  // Voice recognition setup
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
    }
  }, []);

  const startInterview = async () => {
    setInterviewStarted(true);
    const question = interviewQuestions[currentQuestion];
    setMessages([{ sender: "bot", text: question, isHtml: false }]);
    speakResponse(question);
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      const nextQuestion = interviewQuestions[currentQuestion + 1];
      setMessages(prev => [...prev, { sender: "bot", text: nextQuestion, isHtml: false }]);
      speakResponse(nextQuestion);
    } else {
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "Interview completed! Thank you for your responses.", 
        isHtml: false 
      }]);
      setInterviewStarted(false);
      setCurrentQuestion(0);
    }
  };

  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsListening(!isListening);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { sender: "user", text: input, isHtml: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI feedback
    setLoading(true);
    setTimeout(() => {
      const feedback = generateFeedback(input);
      setMessages(prev => [...prev, { sender: "bot", text: feedback, isHtml: true }]);
      handleNextQuestion();
      setLoading(false);
    }, 2000);
  };

  const generateFeedback = (answer) => {
    return marked.parse(`
      ### Feedback on your response:
      - **Clarity**: Good articulation of points
      - **Content**: Relevant information provided
      - **Improvement areas**: Consider adding specific examples
      - **Overall**: Strong response! 
    `);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 md:p-8 mt-16">
      <div className="max-w-4xl mx-auto bg-zinc-900/50 rounded-xl border border-emerald-500/20 backdrop-blur-sm shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 font-semibold">AI</span>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Interview Simulator
              </h2>
            </div>
            {!interviewStarted && (
              <button
                onClick={startInterview}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-black hover:bg-emerald-600 transition-colors"
              >
                <Play size={20} className="inline mr-2" />
                Start Interview
              </button>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div ref={chatWindowRef} className="h-[60vh] overflow-y-auto p-4 space-y-4 bg-zinc-950/50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                {msg.sender === "user" ? 
                  <User size={16} className="text-zinc-400" /> : 
                  <span className="text-emerald-400 text-sm">AI</span>
                }
              </div>
              <div className={`max-w-[75%] rounded-xl p-3 ${
                msg.sender === "user" 
                  ? "bg-emerald-500/10 border border-emerald-500/20" 
                  : "bg-zinc-800/50 border border-zinc-700/50"
              }`}>
                {msg.isHtml ? (
                  <div className="text-gray-300 prose prose-invert prose-sm" 
                       dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  <div className="text-gray-300">{msg.text}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={interviewStarted ? "Type your answer..." : "Interview will start soon..."}
              disabled={!interviewStarted || loading}
            />
            {speechSupported && (
              <button
                onClick={toggleListening}
                disabled={!interviewStarted}
                className={`p-2 rounded-lg ${
                  isListening ? 'bg-red-500' : 'bg-emerald-500'
                } text-black hover:opacity-90 transition-colors disabled:opacity-50`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            )}
            <button 
              onClick={handleSendMessage}
              disabled={!interviewStarted || loading}
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

export default InterviewBot;