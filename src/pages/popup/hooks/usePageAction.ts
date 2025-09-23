import { useState } from 'react';

export const usePageAction = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = (action: string) => {
    setLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        const tabId = tabs[0].id;

        chrome.scripting.executeScript(
          {
            target: { tabId },
            func: () => {
              const selectors = ['main', 'article', '[role="main"]', '#content', '#main', '.content', '.main-content', '.post-body', '.entry-content'];
              for (const selector of selectors) {
                  const element = document.querySelector(selector);
                  if (element) {
                      return (element as HTMLElement).innerText;
                  }
              }
              // Fallback to body if no main content element is found
              return document.body.innerText;
            },
          },
          (injectionResults) => {
            if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
              setResult(`Error getting page text: ${chrome.runtime.lastError?.message || 'No result from script'}`);
              setLoading(false);
              return;
            }

            const pageText = injectionResults[0].result;

            chrome.runtime.sendMessage({ action, text: pageText }, (response) => {
              if (chrome.runtime.lastError) {
                setResult(`Error from background script: ${chrome.runtime.lastError.message}`);
              } else {
                setResult(response.data);
              }
              setLoading(false);
            });
          }
        );
      }
    });
  };

  return { result, loading, handleAction, setResult };
};