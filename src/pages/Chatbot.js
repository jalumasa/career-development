import { useState } from 'react';
import LogoMark from '../components/LogoMark';
import ChatInput from '../components/ChatInput';
import ChatWindow from '../components/ChatWindow';
import chatSuggestions from '../data/chatSuggestions';
import { streamChatbotResponse } from '../services/ChatbotService';
import './Chatbot.css';

const GREETING = "Hi, I'm Compass — your AI career guide. Ask me anything about your career, from resume feedback to negotiating an offer.";

const newMessage = (role, content) => ({ id: crypto.randomUUID(), role, content });

const Chatbot = () => {
  const [messages, setMessages] = useState([newMessage('assistant', GREETING)]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (text) => {
    setError(null);

    const history = messages.map(({ role, content }) => ({ role, content }));
    const placeholder = newMessage('assistant', '');

    setMessages((prev) => [...prev, newMessage('user', text), placeholder]);
    setIsStreaming(true);

    try {
      await streamChatbotResponse(text, history, (_chunk, fullText) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === placeholder.id ? { ...m, content: fullText } : m))
        );
      });
    } catch (err) {
      console.error('Error getting chatbot response:', err);
      setError('Sorry, I ran into a problem. Please try again.');
      setMessages((prev) => prev.filter((m) => m.id !== placeholder.id));
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-shell">
        <header className="chatbot-header">
          <span className="chatbot-header-icon"><LogoMark size={19} /></span>
          <div>
            <h1>Compass AI</h1>
            <p>Your AI career guide</p>
          </div>
        </header>

        <ChatWindow
          messages={messages}
          suggestions={chatSuggestions}
          onSuggestionClick={sendMessage}
        />

        {error && <p className="chatbot-error">{error}</p>}

        <ChatInput onSendMessage={sendMessage} disabled={isStreaming} />
      </div>
    </div>
  );
};

export default Chatbot;
