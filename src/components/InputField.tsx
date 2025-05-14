import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface InputFieldProps {
  onSendMessage: (message: string) => void;
}

export function InputField({ onSendMessage }: InputFieldProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question here..."
        className="flex-1"
      />
      <Button onClick={handleSend} size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
