import React, { useState } from 'react';
import { SummarizeIcon, TranslateIcon, ProofreadIcon, RewriteIcon, SettingsIcon } from './icons';

const ActionButton = ({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center w-full p-4 rounded-lg text-left bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors duration-200 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </button>
);

const Spinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
);

export default function Popup() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = (action: string) => {
    setLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        const tabId = tabs[0].id;

        chrome.scripting.executeScript(
          {
            target: { tabId },
            func: () => document.body.innerText,
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

  if (loading) {
    return (
      <div className="w-[400px] h-[400px] flex items-center justify-center text-white p-5 font-sans bg-gradient-to-br from-gray-900 to-black shadow-2xl">
        <Spinner />
      </div>
    )
  }

  if (result) {
    return (
      <div className="w-[400px] h-full flex flex-col text-white p-5 font-sans bg-gradient-to-br from-gray-900 to-black shadow-2xl">
        <button onClick={() => setResult(null)} className="mb-4 text-sm hover:underline">Back</button>
        <div className="overflow-y-auto flex-grow">
          <p>{result}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[400px] h-full flex flex-col text-white p-5 font-sans bg-gradient-to-br from-gray-900 to-black shadow-2xl overflow-hidden relative">
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
}
