import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { InputField } from './InputField';
import { SuggestedQuestions } from './SuggestedQuestions';
import { matchIntent } from '../utils/intentMatcher';
import { useLocalStorage } from '../utils/useLocalStorage';
import knowledgeBase from '../data/knowledgeBase.json';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type SuggestedQuestion = {
  id: string;
  text: string;
};

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Ceylon Sage, your Bank of Ceylon virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [suggestions, setSuggestions] = useState<SuggestedQuestion[]>([
    { id: 'account-opening', text: 'How do I open an account?' },
    { id: 'online-banking', text: 'How to register for online banking?' },
    { id: 'card-services', text: 'Tell me about BOC card services' },
  ]);
  const [feedbackData, setFeedbackData] = useLocalStorage<
    Record<string, boolean>
  >('feedback-data', {});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeedback = (messageId: string, isHelpful: boolean) => {
    setFeedbackData(prev => ({
      ...prev,
      [messageId]: isHelpful,
    }));

    // In a real implementation, this would be sent to a server
    console.log(
      `Feedback for message ${messageId}: ${isHelpful ? 'Helpful' : 'Not helpful'}`
    );
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Process the message and get a response
    setTimeout(() => {
      const response = processMessage(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      // Update suggested questions based on the response
      if (response.followups && response.followups.length > 0) {
        const newSuggestions = response.followups
          .map(id => {
            const faq = knowledgeBase.faqs.find(faq => faq.id === id);
            return faq ? { id, text: faq.questions[0] } : null;
          })
          .filter(Boolean) as SuggestedQuestion[];

        setSuggestions(newSuggestions);
      }
    }, 500); // Simulate processing time
  };

  const processMessage = (text: string) => {
    const matchedFaq = matchIntent(text, knowledgeBase.faqs);

    if (matchedFaq) {
      return {
        answer: matchedFaq.answer,
        followups: matchedFaq.followups || [],
      };
    }

    return {
      answer:
        "I'm sorry, I don't have information on that topic yet. Is there something else I can help you with?",
      followups: ['account-opening', 'online-banking', 'card-services'],
    };
  };

  const handleSuggestionClick = (suggestion: SuggestedQuestion) => {
    handleSendMessage(suggestion.text);
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-lg bg-white shadow-md">
      <div className="bg-slate-800 p-4 text-white">
        <h2 className="text-xl font-semibold">Ceylon Sage</h2>
        <p className="text-sm text-slate-300">Bank of Ceylon FAQ Assistant</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            onFeedback={message.sender === 'bot' ? handleFeedback : undefined}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 p-4">
        <SuggestedQuestions
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
        <InputField onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
