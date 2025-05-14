import { FeedbackButtons } from './FeedbackButtons';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

interface MessageBubbleProps {
  message: Message;
  onFeedback?: (messageId: string, isHelpful: boolean) => void;
}

export function MessageBubble({ message, onFeedback }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-2 ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <span className="mt-1 block text-xs opacity-70">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        {!isUser && onFeedback && (
          <FeedbackButtons messageId={message.id} onFeedback={onFeedback} />
        )}
      </div>
    </div>
  );
}
