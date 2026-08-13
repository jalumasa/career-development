import React, { useEffect, useRef } from 'react';
import { FaCompass, FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Hoisted so it keeps the same identity across renders — an inline array
// would be a new value every time and defeat the memo on ChatMessage.
const REMARK_PLUGINS = [remarkGfm];

const TypingDots = () => (
  <span className="chat-typing" aria-label="Compass is typing">
    <span></span><span></span><span></span>
  </span>
);

// Memoized because the assistant's reply streams in token by token: without
// this, every token re-parses the Markdown of every message in the thread.
const ChatMessage = React.memo(({ role, content }) => (
  <div className={`chat-message chat-message-${role}`}>
    <div className="chat-avatar" aria-hidden="true">
      {role === 'assistant' ? <FaCompass /> : <FaUser />}
    </div>
    <div className="chat-bubble">
      {content
        ? <ReactMarkdown remarkPlugins={REMARK_PLUGINS}>{content}</ReactMarkdown>
        : <TypingDots />}
    </div>
  </div>
));

const ChatWindow = ({ messages, suggestions, onSuggestionClick }) => {
  const endRef = useRef(null);
  const messageCount = messages.length;
  const streamingLength = messages[messageCount - 1]?.content.length ?? 0;

  // Animate when a new message appears...
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messageCount]);

  // ...but follow streamed text instantly. A smooth scroll restarted on every
  // token fights itself and stutters; 'auto' just keeps the tail in view.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [streamingLength]);

  const showSuggestions = messageCount <= 1 && suggestions?.length > 0;

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
      ))}

      {showSuggestions && (
        <div className="chat-suggestions">
          {suggestions.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="chat-suggestion-chip"
              onClick={() => onSuggestionClick(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
