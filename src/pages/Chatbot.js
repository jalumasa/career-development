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
  const [error, setError] = useState(null);

  const handleSendMessage = async (message) => {
    const userMessage = { message, direction: 'outgoing', sender: 'user' };
    setMessages([...messages, userMessage]);
    setError(null);

    setIsTyping(true);
    try {
      const botResponse = await getChatbotResponse(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: botResponse.text, sender: "ChatGPT" }
      ]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setError('Sorry, I encountered an error. Please try again later.');
    }
    setIsTyping(false);
  };

  return (
    <div className="chatbot-container">
      <h1>Career AI Chatbot</h1>
      <ChatWindow messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Chatbot;
