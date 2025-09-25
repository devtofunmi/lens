import { useState } from 'react';
import { getPageText } from '../utils/getPageText';
import { Action, Language, ToneOption } from '../types';

export const usePageAction = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: Action, language: Language) => {
    setLoading(true);
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.id) {
        const injectionResults = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: getPageText,
        });

        if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
          setResult(`Error getting page text: ${'No result from script'}`);
          return;
        }

        const pageText = injectionResults[0].result;
        const response = await chrome.runtime.sendMessage({ action, text: pageText, language });

        const lastError = chrome.runtime.lastError;
        if (lastError) {
          setResult(`Error from background script: ${(lastError as any).message || 'An unknown error occurred'}`);
        } else if (response && response.data) {
          setResult(response.data);
        } else {
          setResult('No response or data from background script.');
        }
      }
    } catch (error: any) {
      setResult(`An error occurred: ${error}`);
    } finally {
      setLoading(false);
    }
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
    } catch (error: any) {
      setResult(`Translation failed: ${error}`);
      setTranslated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRewriteTone = async (toneOption: ToneOption) => {
    setLoading(true);
    try {
      if ('Rewriter' in self) {
        const availability = await (self as any).Rewriter.availability();

        if (availability === 'available') {
          const rewriterOptions = {
            tone: toneOption.tone,
            length: toneOption.length,
            format: toneOption.format || 'as-is',
            outputLanguage: toneOption.outputLanguage,
          };
          const rewriter = await (self as any).Rewriter.create(rewriterOptions);
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

          if (tab.id) {
            const injectionResults = await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: getPageText,
            });

            if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
              setResult(`Error getting page text: ${'No result from script'}`);
              return;
            }

            const pageText = injectionResults[0].result;
            const rewrittenText = await rewriter.rewrite(pageText);
            setResult(rewrittenText);
          }
        } else {
          setResult('Rewriter not available.');
        }
      } else {
        setResult('Rewriter API not available.');
      }
    } catch (error: any) {
      setResult(`An error occurred during rewrite: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
  };

  return { result, loading, handleAction, handleTranslate, handleRewriteTone, clearResult, setResult };
};