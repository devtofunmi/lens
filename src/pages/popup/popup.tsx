import React from 'react';
import { SummarizeIcon, TranslateIcon, ProofreadIcon, RewriteIcon, SettingsIcon } from './icons';

const Logo = () => (
  <svg width="48" height="48" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="108" width="152.735" height="152.735" transform="rotate(45 108 0)" fill="white"/>
  </svg>
);

const ActionButton = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <button className="flex items-center w-full p-4 rounded-lg text-left bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
    <div className="p-2 bg-gray-700 rounded-lg">
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </button>
);

export default function Popup() {
  return (
    <div className="w-[400px] bg-gray-900 text-white p-5 font-sans">
      <header className="flex items-center mb-8">
        <Logo />
        <h1 className="text-2xl font-bold ml-4">Lens</h1>
      </header>

      <main className="grid grid-cols-1 gap-4">
        <ActionButton icon={<SummarizeIcon />} title="Summarize" description="Get a quick summary of any webpage." />
        <ActionButton icon={<TranslateIcon />} title="Translate" description="Translate text into different languages." />
        <ActionButton icon={<ProofreadIcon />} title="Proofread" description="Fix grammar and spelling mistakes." />
        <ActionButton icon={<RewriteIcon />} title="Rewrite" description="Rewrite text in different tones." />
      </main>

      <footer className="mt-8 flex justify-end">
        <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
          <SettingsIcon />
        </button>
      </footer>
    </div>
  );
}