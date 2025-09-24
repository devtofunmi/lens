const summarize = (text: string, type: 'insight' | 'bullets' | 'detailed'): string => {
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) {
    return "Couldn't find any text to summarize.";
  }

  switch (type) {
    case 'insight':
      return sentences[0];
    case 'bullets':
      if (sentences.length <= 5) {
        return sentences.map(s => `• ${s}`).join('\n');
      }
      // Basic scoring based on length
      const sortedSentences = [...sentences].sort((a, b) => b.length - a.length);
      return sortedSentences.slice(0, 5).map(s => `• ${s}`).join('\n');
    case 'detailed':
      if (sentences.length <= 3) {
        return text;
      }
      return sentences.slice(0, 3).join('. ') + '.';
    default:
      return "Invalid summary type.";
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action.startsWith('summarize_')) {
    const type = request.action.split('_')[1];
    const summary = summarize(request.text, type as any);
    sendResponse({ data: summary });
  } else if (['translate', 'proofread', 'rewrite'].includes(request.action)) {
    // Placeholder for other actions
    sendResponse({ data: `Action '${request.action}' is not yet implemented.` });
  } else {
    sendResponse({ data: `Unknown action: '${request.action}'` });
  }
  
  // Return true to indicate that the response is sent asynchronously
  return true;
});

// This empty export statement makes the file a module, satisfying --isolatedModules.
export {};