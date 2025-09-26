import React, { useState, useEffect } from 'react';
import { Spinner } from './components/Spinner';
import { usePageAction } from '../../hooks/usePageAction';
import { MainView } from './views/MainView';
import { SummarizeView } from './views/SummarizeView';
import { SettingsView } from './views/SettingsView';
import { ResultView } from './views/ResultView';
import { ToneRewriterView } from './views/ToneRewriterView';
import ProofreadView from './views/ProofreadView';
import { getPageText } from '../../utils/getPageText';
import { View, Theme, SummaryStyle, Language } from '../../types';

const PopupContent = () => {
  const { result, loading, handleAction, setResult, handleTranslate, handleRewriteTone } = usePageAction();
  const [view, setView] = useState<View>('main');
  const [pageText, setPageText] = useState<string>('');
  const [isFetchingText, setIsFetchingText] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [defaultSummaryStyle, setDefaultSummaryStyle] = useState<SummaryStyle>('bullets');
  const [targetLanguage, setTargetLanguage] = useState<Language>('en');
  const [translated, setTranslated] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleProofread = async () => {
    setIsFetchingText(true);
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      const injectionResults = await chrome.scripting.executeScript<[string], void>({
        target: { tabId: tab.id },
        func: getPageText,
      });
      if (injectionResults && injectionResults[0]) {
        setPageText(injectionResults[0].result ?? '');
      }
    }
    setView('proofread');
    setIsFetchingText(false);
  }

  // Reset translated state when result changes (e.g., new summary)
  useEffect(() => {
    // Reset translated state when result is cleared (e.g., new summary)
    if (result === null) {
      setTranslated(false);
    }
  }, [result]);

  if (loading || isFetchingText) {
    return (
      <div className="w-[400px] h-[500px] flex items-center justify-center text-on-background p-5 font-sans bg-background dark:bg-dark-background shadow-2xl">
        <Spinner />
      </div>
    );
  }

  if (result) {
    return <ResultView result={result} setResult={setResult} setView={setView} handleTranslate={handleTranslate} targetLanguage={targetLanguage} translated={translated} setTranslated={setTranslated} loading={loading} />;
  }

  return (
    <div className="w-[400px] h-[500px] flex flex-col text-on-background dark:text-dark-on-background p-5 font-sans bg-background dark:bg-dark-background shadow-2xl overflow-hidden relative">
      {view === 'main' && <MainView setView={setView} handleAction={(action) => handleAction(action, targetLanguage)} handleProofread={handleProofread} />}
      {view === 'summarize' && <SummarizeView setView={setView} handleAction={(action) => handleAction(action, targetLanguage)} />}
      {view === 'proofread' && <ProofreadView text={pageText} onBack={() => { setView('main'); setPageText(''); }} />}
      {view === 'settings' && <SettingsView setView={setView} theme={theme} setTheme={setTheme} defaultSummaryStyle={defaultSummaryStyle} setDefaultSummaryStyle={setDefaultSummaryStyle} language={targetLanguage} setLanguage={setTargetLanguage} />}
      {view === 'toneRewriter' && <ToneRewriterView setView={setView} targetLanguage={targetLanguage} />}
    </div>
  );
};

export default function Popup() {
  return <PopupContent />;
}
