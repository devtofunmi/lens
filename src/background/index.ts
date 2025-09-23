const summarizeText = (text: string): string => {
  // A very simple extractive summarizer
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
  
  // If the text is short, return it as is
  if (sentences.length <= 3) {
    return text;
  }
  
  // Otherwise, return the first 3 sentences
  return sentences.slice(0, 3).join('. ') + '.';
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    const summary = summarizeText(request.text);
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