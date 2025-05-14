import { Button } from "@/components/ui/button";

type SuggestedQuestion = {
  id: string;
  text: string;
};

interface SuggestedQuestionsProps {
  suggestions: SuggestedQuestion[];
  onSuggestionClick: (suggestion: SuggestedQuestion) => void;
}

export function SuggestedQuestions({
  suggestions,
  onSuggestionClick,
}: SuggestedQuestionsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="mb-3">
      <p className="text-sm text-slate-500 mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.id}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="text-sm"
          >
            {suggestion.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
