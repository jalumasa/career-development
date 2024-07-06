import React, { useState } from 'react';
import ChatInput from '../components/ChatInput';
import ChatWindow from '../components/ChatWindow';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, user: 'user' }]);
    // Simulate bot response
    setTimeout(() => {
      setMessages([...messages, { text: message, user: 'user' }, { text: 'This is a bot response.', user: 'bot' }]);
    }, 1000);
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
