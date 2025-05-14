import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackButtonsProps {
  messageId: string;
  onFeedback: (messageId: string, isHelpful: boolean) => void;
}

export function FeedbackButtons({
  messageId,
  onFeedback,
}: FeedbackButtonsProps) {
  return (
    <div className="mt-1 flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs"
        onClick={() => onFeedback(messageId, true)}
      >
        <ThumbsUp className="mr-1 h-3 w-3" />
        Helpful
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs"
        onClick={() => onFeedback(messageId, false)}
      >
        <ThumbsDown className="mr-1 h-3 w-3" />
        Not helpful
      </Button>
    </div>
  );
}
