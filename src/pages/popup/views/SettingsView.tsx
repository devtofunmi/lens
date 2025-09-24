import React from 'react';
import { BackIcon } from '../components/Icons';
import { Button } from '../components/Button';
import { View, Theme, SummaryStyle, Language } from '../../../types';

export const SettingsView = ({ setView, theme, setTheme, defaultSummaryStyle, setDefaultSummaryStyle, language, setLanguage }: { setView: (view: View) => void, theme: Theme, setTheme: (theme: Theme) => void, defaultSummaryStyle: SummaryStyle, setDefaultSummaryStyle: (style: SummaryStyle) => void, language: Language, setLanguage: (language: Language) => void }) => (
  <div className="relative z-10 flex flex-col flex-grow">
    <Button onClick={() => setView('main')} className="self-start mb-4">
      <BackIcon />
    </Button>
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
          <select id="summary-style" value={defaultSummaryStyle} onChange={(e) => setDefaultSummaryStyle(e.target.value as SummaryStyle)} className="w-full p-2 rounded-lg bg-surface-variant text-on-surface-variant dark:bg-dark-surface-variant dark:text-dark-on-surface-variant">
            <option value="insight">1-line insight</option>
            <option value="bullets">Bullet points</option>
            <option value="detailed">Detailed summary</option>
          </select>
        </div>
        <div>
          <label htmlFor="language" className="block text-on-background dark:text-dark-on-background mb-2">Target Language</label>
          <select id="language" value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="w-full p-2 rounded-lg bg-surface-variant text-on-surface-variant dark:bg-dark-surface-variant dark:text-dark-on-surface-variant">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ru">Russian</option>
            <option value="ar">Arabic</option>
            <option value="pt">Portuguese</option>
            <option value="it">Italian</option>
            <option value="nl">Dutch</option>
            <option value="pl">Polish</option>
            <option value="sv">Swedish</option>
            <option value="tr">Turkish</option>
          </select>
        </div>
      </div>
    </main>
  </div>
);
