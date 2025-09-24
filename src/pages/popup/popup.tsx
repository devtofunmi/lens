import React, { useState, useEffect } from 'react';
import { Spinner } from './components/Spinner';
import { usePageAction } from '../../hooks/usePageAction';
import { MainView } from './views/MainView';
import { SummarizeView } from './views/SummarizeView';
import { SettingsView } from './views/SettingsView';
import { ResultView } from './views/ResultView';
import { View, Theme, SummaryStyle } from '../../types';

const PopupContent = () => {
  const { result, loading, handleAction, setResult } = usePageAction();
  const [view, setView] = useState<View>('main');
  const [theme, setTheme] = useState<Theme>('dark');
  const [defaultSummaryStyle, setDefaultSummaryStyle] = useState<SummaryStyle>('bullets');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return (
      <div className="w-[400px] h-[400px] flex items-center justify-center text-on-background p-5 font-sans bg-background dark:bg-dark-background shadow-2xl">
        <Spinner />
      </div>
    );
  }

  if (result) {
    return <ResultView result={result} setResult={setResult} setView={setView} />;
  }

  return (
    <div className="w-[400px] h-[500px] flex flex-col text-on-background dark:text-dark-on-background p-5 font-sans bg-background dark:bg-dark-background shadow-2xl overflow-hidden relative">
      {view === 'main' && <MainView setView={setView} handleAction={handleAction} />}
      {view === 'summarize' && <SummarizeView setView={setView} handleAction={handleAction} />}
      {view === 'settings' && <SettingsView setView={setView} theme={theme} setTheme={setTheme} defaultSummaryStyle={defaultSummaryStyle} setDefaultSummaryStyle={setDefaultSummaryStyle} />}
    </div>
  );
};

export default function Popup() {
  return <PopupContent />;
}