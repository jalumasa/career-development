import { ChatContainer, MainContainer, Message, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React from 'react';

const ChatWindow = ({ messages, isTyping }) => {
  return (
    <div style={{ position: "relative", height: "800px", width: "700px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="CareerBot is typing" /> : null}
          >
            {messages.map((message, i) => (
              <Message
                key={i}
                model={{
                  message: message.message,
                  sentTime: message.sentTime,
                  sender: message.sender,
                  direction: message.sender === 'user' ? 'outgoing' : 'incoming'
                }}
              />
            ))}
          </MessageList>
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatWindow;
