'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'error';
  content: string;
}

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to the DMCC Meetup 2025! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'An unknown error occurred.');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setMessages(prev => [...prev, { role: 'error', content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="chat-toggle-button">
          <ChatIcon />
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <h3 className="chat-title">DMCC-AI</h3>
            <button onClick={() => setIsOpen(false)} className="close-button">
              <CloseIcon />
            </button>
          </div>
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.role}`}>
                <div className={`avatar ${msg.role}`}>{msg.role === 'user' ? 'U' : 'A'}</div>
                <div className={`message-bubble ${msg.role}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message-wrapper assistant">
                <div className="avatar assistant">A</div>
                <div className="message-bubble assistant">
                  <div className="spinner" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the event..."
              className="input"
              disabled={isLoading}
            />
            <button type="submit" className="send-button" disabled={isLoading}>
              <SendIcon />
            </button>
          </form>
        </div>
      )}
      <style jsx>{`
        .chat-toggle-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #4f46e5;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 9999;
        }

        .chat-window {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 400px;
          height: 600px;
          background-color: #111827;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9999;
        }

        .chat-header {
          padding: 16px;
          background-color: #1f2937;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-title {
          color: white;
          font-weight: bold;
          font-size: 18px;
        }

        .close-button {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
        }

        .message-list {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }
        .message-wrapper.user {
          justify-content: flex-end;
        }
        .message-wrapper.assistant, .message-wrapper.error {
          justify-content: flex-start;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
        .avatar.user {
          background-color: #3b82f6;
          order: 1;
        }
        .avatar.assistant, .avatar.error {
          background-color: #4b5563;
          order: 0;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          max-width: 80%;
          color: white;
        }
        .message-bubble.user {
          background-color: #3b82f6;
        }
        .message-bubble.assistant {
          background-color: #374151;
        }
        .message-bubble.error {
          background-color: #ef4444;
        }

        .input-form {
          padding: 16px;
          border-top: 1px solid #374151;
          display: flex;
          gap: 8px;
        }

        .input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          background-color: #374151;
          color: white;
          outline: none;
        }

        .send-button {
          padding: 0 12px;
          border-radius: 8px;
          border: none;
          background-color: #4f46e5;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #FFFFFF;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 480px) {
          .chat-window {
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }
          .chat-toggle-button {
            bottom: 15px;
            right: 15px;
          }
        }
      `}</style>
    </div>
  );
};

// SVG Icons
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

export default ChatInterface;
