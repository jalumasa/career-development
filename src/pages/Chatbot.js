import React, { useState } from 'react';
import ChatInput from '../components/ChatInput';
import ChatWindow from '../components/ChatWindow';
import { getChatbotResponse } from '../services/ChatbotService';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, user: 'user' };
    setMessages([...messages, userMessage]);
    const botResponse = await getChatbotResponse(message);
    setMessages([...messages, userMessage, botResponse]);
  };

  return (
    <div className="container">
      <h1>Career AI Chatbot</h1>
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
