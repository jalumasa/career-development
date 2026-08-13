import React, { useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const MAX_HEIGHT_PX = 160;

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const resize = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT_PX)}px`;
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    resize(e.target);
  };

  const submit = () => {
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setMessage('');
    resize(textareaRef.current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Message Compass…"
        rows={1}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !message.trim()} aria-label="Send message">
        <FaArrowUp />
      </button>
    </form>
  );
};

export default ChatInput;
