import { useState } from 'react';
import { ChatContainer } from './components/ChatContainer';
import { AdminView } from './components/AdminView';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useLocalStorage } from './utils/useLocalStorage';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [feedbackData] = useLocalStorage<Record<string, boolean>>(
    'feedback-data',
    {}
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Ceylon Sage</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdmin(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Admin
          </Button>
        </div>
        <ChatContainer />
        {showAdmin && (
          <AdminView
            feedbackData={feedbackData}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
