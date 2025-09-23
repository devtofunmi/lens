import React from 'react';
import { SummarizeIcon, TranslateIcon, ProofreadIcon, RewriteIcon, SettingsIcon } from './icons';
import { ActionButton, Spinner } from './components';
import { usePageAction } from './hooks/usePageAction';

const PopupContent = () => {
  const { result, loading, handleAction, setResult } = usePageAction();

  if (loading) {
    return (
      <div className="w-[400px] h-[400px] flex items-center justify-center text-white p-5 font-sans bg-gradient-to-br from-gray-900 to-black shadow-2xl">
        <Spinner />
      </div>
    );
  }

  if (result) {
    return (
      <div className="w-[400px] h-[500px] flex flex-col text-white p-5 font-sans bg-gradient-to-br from-gray-900 to-black shadow-2xl">
        <button onClick={() => setResult(null)} className="mb-4 text-sm hover:underline">Back</button>
        <div className="overflow-y-auto flex-grow">
          <p>{result}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[400px] h-[500px] flex flex-col text-white p-5 font-sans bg-gradient-to-br from-gray-900 to-black shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600/?dark,abstract,gradient')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="relative z-10 flex flex-col flex-grow">
        <main className="grid grid-cols-1 gap-4 flex-grow overflow-y-auto">
          <ActionButton icon={<SummarizeIcon />} title="Summarize" description="Get a quick summary of any webpage." onClick={() => handleAction('summarize')} />
          <ActionButton icon={<TranslateIcon />} title="Translate" description="Translate text into different languages." onClick={() => handleAction('translate')} />
          <ActionButton icon={<ProofreadIcon />} title="Proofread" description="Fix grammar and spelling mistakes." onClick={() => handleAction('proofread')} />
          <ActionButton icon={<RewriteIcon />} title="Rewrite" description="Rewrite text in different tones." onClick={() => handleAction('rewrite')} />
        </main>
        <footer className="mt-8 flex justify-end flex-shrink-0">
          <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
            <SettingsIcon />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default function Popup() {
  return <PopupContent />;
}
