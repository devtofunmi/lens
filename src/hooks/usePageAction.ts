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
        const injectionResults = await chrome.scripting.executeScript<[string], void>({
          target: { tabId: tab.id },
          func: getPageText,
        });

        if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
          setResult(`Error getting page text: No result from script`);
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
    } catch (error: unknown) {
        setResult(`An error occurred: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async (text: string, targetLanguage: Language, setTranslated: (translated: boolean) => void) => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined' && 'Translator' in window) {
        const sourceLanguage = await new Promise<string>((resolve) => {
          chrome.i18n.detectLanguage(text, (result) => {
            resolve(result.languages[0].language);
          });
        });

        const translatorCapabilities = await (window as any).Translator.availability({ sourceLanguage, targetLanguage });

        if (translatorCapabilities === 'available') {
          const translator = await (window as any).Translator.create({ sourceLanguage, targetLanguage });
          const translatedText = await translator.translate(text);
          setResult(translatedText);
          setTranslated(true);
        } else {
          setResult(`Translation not available for ${sourceLanguage} to ${targetLanguage}. Status: ${translatorCapabilities}`);
          setTranslated(false);
        }
      } else {
        setResult('Translator API not available in this environment.');
        setTranslated(false);
      }
    } catch (error: unknown) {
      setResult(`Translation failed: ${error instanceof Error ? error.message : String(error)}`);
      setTranslated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRewriteTone = async (toneOption: ToneOption) => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined' && 'Rewriter' in window) {
        const availability = await (window as any).Rewriter.availability();

        if (availability === 'available') {
          const outputLanguage = (!toneOption.outputLanguage || !['en', 'es', 'ja'].includes(toneOption.outputLanguage))
            ? 'en'
            : toneOption.outputLanguage;

          const rewriterOptions: any = {
            tone: toneOption.tone,
            format: toneOption.format || 'as-is',
            outputLanguage: outputLanguage,
          };

          if (toneOption.length) {
            rewriterOptions.length = toneOption.length;
          }

          const rewriter = await (window as any).Rewriter.create(rewriterOptions);
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

          if (tab.id) {
            const injectionResults = await chrome.scripting.executeScript<[string], void>({
              target: { tabId: tab.id },
              func: getPageText,
            });

            if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
              setResult(`Error getting page text: No result from script`);
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
        setResult('Rewriter API not available in this environment.');
      }
    } catch (error: unknown) {
      setResult(`An error occurred during rewrite: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
  };

  return { result, loading, handleAction, handleTranslate, handleRewriteTone, clearResult, setResult };
};