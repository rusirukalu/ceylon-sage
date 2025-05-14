type FAQ = {
    id: string;
    questions: string[];
    answer: string;
    category: string;
    followups?: string[];
  };
  
  export function matchIntent(userQuery: string, faqs: FAQ[]): FAQ | null {
    const normalizedQuery = userQuery.toLowerCase().trim();
    
    // First try exact matches
    for (const faq of faqs) {
      for (const question of faq.questions) {
        if (normalizedQuery === question.toLowerCase()) {
          return faq;
        }
      }
    }
    
    // Then try keyword matching
    for (const faq of faqs) {
      for (const question of faq.questions) {
        const keywords = question.toLowerCase().split(' ');
        const matchCount = keywords.filter(keyword => 
          normalizedQuery.includes(keyword) && keyword.length > 3
        ).length;
        
        // If more than 50% of keywords match, return this FAQ
        if (matchCount > 0 && matchCount >= keywords.length * 0.5) {
          return faq;
        }
      }
    }
    
    return null;
  }
  