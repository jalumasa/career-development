import { useState } from 'react';
import ChatInput from '../components/ChatInput';
import ChatWindow from '../components/ChatWindow';
import { getChatbotResponse } from '../services/ChatbotService';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm CareerBot, your career development expert! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message) => {
    const userMessage = { message, direction: 'outgoing', sender: 'user' };
    setMessages([...messages, userMessage]);

    setIsTyping(true);
    try {
      const botResponse = await getChatbotResponse(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        { message: botResponse.text, sender: "ChatGPT" }
      ]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
    }
    setIsTyping(false);
  };

  return (
    <div className="chatbot-container">
      <h1>Career AI Chatbot</h1>
      <ChatWindow messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
