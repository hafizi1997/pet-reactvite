import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ChatBubble } from "../components/ChatBubble";
import { SendIcon, MicIcon } from "lucide-react";

export const VetConsultation = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Dr. Whiskers, your AI vet assistant. How can I help your pet today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: input,
          isUser: true,
        },
      ]);
      setInput("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "Thank you for providing that information. Based on the symptoms you've described, it could be a minor digestive issue. I recommend monitoring your pet for the next 24 hours and ensuring they have access to fresh water. If symptoms persist or worsen, please contact your veterinarian for an in-person examination.",
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">
          Vet AI Consultation
        </h1>
        <p className="text-gray-600">
          Chat with our AI veterinarian for preliminary advice.
        </p>
      </header>
      <Card className="overflow-hidden bg-white">
        <div className="flex flex-col h-[500px]">
          {/* Chat header */}
          <div className="bg-blue-500 text-white p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MicIcon size={20} />
              </div>
              <div className="ml-3">
                <p className="font-medium">Dr. Whiskers</p>
                <p className="text-xs text-blue-100">AI Veterinary Assistant</p>
              </div>
            </div>
          </div>
          {/* Chat messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
          </div>
          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your pet's symptoms..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} className="rounded-full px-4">
                <SendIcon size={18} />
              </Button>
            </div>
            <p className="mt-2 text-xs text-gray-500 text-center">
              This AI assistant provides general advice only and is not a
              substitute for professional veterinary care.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
