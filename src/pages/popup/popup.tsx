import React, { useState, useEffect } from 'react';
import { SummarizeIcon, TranslateIcon, ProofreadIcon, RewriteIcon, SettingsIcon, InsightIcon, BulletPointsIcon, DetailedSummaryIcon, BackIcon } from './icons';
import { ActionButton, Spinner } from './components';
import { usePageAction } from './hooks/usePageAction';

const PopupContent = () => {
  const { result, loading, handleAction, setResult } = usePageAction();
  const [view, setView] = useState('main');
  const [theme, setTheme] = useState('dark');
  const [defaultSummaryStyle, setDefaultSummaryStyle] = useState('bullets');

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
    return (
      <div className="w-[400px] h-[500px] flex flex-col text-on-background dark:text-dark-on-background p-5 font-sans bg-background dark:bg-dark-background shadow-2xl">
        <button onClick={() => { setResult(null); setView('main'); }} className="p-2 rounded-full hover:bg-surface-variant dark:hover:bg-dark-surface-variant transition-colors duration-200 self-start mb-4"><BackIcon /></button>
        <div className="overflow-y-auto flex-grow">
          <p>{result}</p>
        </div>
      </div>
    );
  }

  const renderMainView = () => (
    <div className="relative z-10 flex flex-col flex-grow">
      <main className="grid grid-cols-1 gap-4 flex-grow overflow-y-auto">
        <ActionButton icon={<SummarizeIcon />} title="Summarize" description="Get a quick summary of any webpage." onClick={() => setView('summarize')} />
        <ActionButton icon={<TranslateIcon />} title="Translate" description="Translate text into different languages." onClick={() => handleAction('translate')} />
        <ActionButton icon={<ProofreadIcon />} title="Proofread" description="Fix grammar and spelling mistakes." onClick={() => handleAction('proofread')} />
        <ActionButton icon={<RewriteIcon />} title="Rewrite" description="Rewrite text in different tones." onClick={() => handleAction('rewrite')} />
      </main>
      <footer className="mt-8 flex justify-end flex-shrink-0">
        <button onClick={() => setView('settings')} className="p-2 rounded-full hover:bg-surface-variant dark:hover:bg-dark-surface-variant transition-colors duration-200">
          <SettingsIcon />
        </button>
      </footer>
    </div>
  );

  const renderSummarizeView = () => (
    <div className="relative z-10 flex flex-col flex-grow">
       <button onClick={() => setView('main')} className="p-2 rounded-full hover:bg-surface-variant dark:hover:bg-dark-surface-variant transition-colors duration-200 self-start mb-4"><BackIcon /></button>
      <main className="grid grid-cols-1 gap-4  overflow-y-auto">
        <ActionButton icon={<InsightIcon />} title="1-line insight" description="A very short version, like a tl;dr." onClick={() => handleAction('summarize_insight')} />
        <ActionButton icon={<BulletPointsIcon />} title="Bullet points" description="Key highlights for quick scanning." onClick={() => handleAction('summarize_bullets')} />
        <ActionButton icon={<DetailedSummaryIcon />} title="Detailed summary" description="A structured summary for deeper understanding." onClick={() => handleAction('summarize_detailed')} />
      </main>
    </div>
  );

  const renderSettingsView = () => (
    <div className="relative z-10 flex flex-col flex-grow">
      <button onClick={() => setView('main')} className="p-2 rounded-full hover:bg-surface-variant dark:hover:bg-dark-surface-variant transition-colors duration-200 self-start mb-4"><BackIcon /></button>
      <main className="flex-grow">
        <h2 className="text-2xl font-bold text-on-background dark:text-dark-on-background mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="theme-toggle" className="flex items-center justify-between">
              <span className="text-on-background dark:text-dark-on-background">Theme</span>
              <div className="relative">
                <input type="checkbox" id="theme-toggle" className="sr-only" checked={theme === 'dark'} onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="summary-style" className="block text-on-background dark:text-dark-on-background mb-2">Default Summary Style</label>
            <select id="summary-style" value={defaultSummaryStyle} onChange={(e) => setDefaultSummaryStyle(e.target.value)} className="w-full p-2 rounded-lg bg-surface-variant text-on-surface-variant dark:bg-dark-surface-variant dark:text-dark-on-surface-variant">
              <option value="insight">1-line insight</option>
              <option value="bullets">Bullet points</option>
              <option value="detailed">Detailed summary</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <div className="w-[400px] h-[500px] flex flex-col text-on-background dark:text-dark-on-background p-5 font-sans bg-background dark:bg-dark-background shadow-2xl overflow-hidden relative">
      {view === 'main' && renderMainView()}
      {view === 'summarize' && renderSummarizeView()}
      {view === 'settings' && renderSettingsView()}
    </div>
  );
};

export default function Popup() {
  return <PopupContent />;
}
