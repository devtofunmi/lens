import { useState } from 'react';
import { getPageText } from '../utils/getPageText';
import { Action } from '../types';

export const usePageAction = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = (action: Action) => {
    setLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        const tabId = tabs[0].id;

        chrome.scripting.executeScript(
          {
            target: { tabId },
            func: getPageText,
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