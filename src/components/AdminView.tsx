import { Button } from '@/components/ui/button';

interface AdminViewProps {
  feedbackData: Record<string, boolean>;
  onClose: () => void;
}

export function AdminView({ feedbackData, onClose }: AdminViewProps) {
  const helpfulCount = Object.values(feedbackData).filter(v => v).length;
  const notHelpfulCount = Object.values(feedbackData).filter(v => !v).length;
  const totalFeedback = Object.keys(feedbackData).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Admin Dashboard</h2>

        <div className="mb-4">
          <h3 className="mb-2 font-semibold">Feedback Statistics</h3>
          <p>Total feedback received: {totalFeedback}</p>
          <p>
            Helpful responses: {helpfulCount} (
            {Math.round((helpfulCount / totalFeedback) * 100) || 0}%)
          </p>
          <p>
            Not helpful responses: {notHelpfulCount} (
            {Math.round((notHelpfulCount / totalFeedback) * 100) || 0}%)
          </p>
        </div>

        <div className="mb-4">
          <h3 className="mb-2 font-semibold">Learning Opportunities</h3>
          <p className="text-sm text-gray-600">
            In a full implementation, this section would show patterns from
            unhelpful responses to help improve the knowledge base and response
            quality.
          </p>
        </div>

        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
