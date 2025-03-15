"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface AIResponse {
  recommendation: string;
}

const socket: Socket = io("http://localhost:4000", {
  transports: ["websocket"], // Ensures WebSocket connection
  reconnectionAttempts: 5, // Retries connection 5 times if it fails
});

export default function Home() {
  const [steps, setSteps] = useState<number>(0);
  const [heartRate, setHeartRate] = useState<number>(80);
  const [aiRecommendation, setAiRecommendation] = useState<string>("");

  useEffect(() => {
    const handleAIResponse = (data: AIResponse) => {
      setAiRecommendation(data.recommendation);
    };

    socket.on("aiRecommendation", handleAIResponse);
    socket.on("connect_error", (err) => console.error("Socket connection error:", err));

    return () => {
      socket.off("aiRecommendation", handleAIResponse);
      socket.off("connect_error");
    };
  }, []);

  const requestAI = () => {
    socket.emit("getRecommendation", { steps, heartRate });
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold">🚀 AI-Powered Health Tracker</h1>

      <div className="mt-5 p-5 border rounded-lg shadow-lg w-80 text-center">
        <p className="text-lg">👣 Steps Taken: {steps}</p>
        <p className="text-lg">❤️ Heart Rate: {heartRate} bpm</p>
        <button
          onClick={requestAI}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Get AI Recommendation
        </button>
      </div>

      {aiRecommendation && (
        <div className="mt-5 p-4 border-l-4 border-blue-500 bg-gray-100 shadow-md">
          <p className="text-lg">🔹 AI Suggestion: {aiRecommendation}</p>
        </div>
      )}
    </div>
  );
}
