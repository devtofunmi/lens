import { useState } from 'react';
import { getPageText } from '../utils/getPageText';
import { Action, Language } from '../types';

export const usePageAction = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = (action: Action, language: Language) => {
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

            chrome.runtime.sendMessage({ action, text: pageText, language }, (response) => {
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

  const handleTranslate = async (text: string, targetLanguage: Language, setTranslated: (translated: boolean) => void) => {
    setLoading(true);
    try {
      if ('Translator' in self) {
        const sourceLanguage = await new Promise<string>((resolve) => {
          chrome.i18n.detectLanguage(text, (result) => {
            resolve(result.languages[0].language);
          });
        });

        const translatorCapabilities = await (self as any).Translator.availability({ sourceLanguage, targetLanguage });

        if (translatorCapabilities === 'available') {
          const translator = await (self as any).Translator.create({ sourceLanguage, targetLanguage });
          const translatedText = await translator.translate(text);
          setResult(translatedText);
          setTranslated(true);
        } else {
          setResult(`Translation not available for ${sourceLanguage} to ${targetLanguage}. Status: ${translatorCapabilities}`);
          setTranslated(false);
        }
      } else {
        setResult('Translator API not available.');
        setTranslated(false);
      }
    } catch (error) {
      setResult(`Translation failed: ${error}`);
      setTranslated(false);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, handleAction, setResult, handleTranslate };
};