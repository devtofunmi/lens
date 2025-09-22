import React from 'react';
import { SummarizeIcon, TranslateIcon, ProofreadIcon, RewriteIcon, SettingsIcon } from './icons';



const ActionButton = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <button className="flex items-center w-full p-4 rounded-lg text-left bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors duration-200 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </button>
);

export default function Popup() {
  return (
    <div className="w-[400px] text-white p-5 font-sans bg-gradient-to-br from-gray-900 to-black shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('https://source.unsplash.com/random/800x600/?dark,abstract,gradient')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="relative z-10">
       

        <main className="grid grid-cols-1 gap-4">
          <ActionButton icon={<SummarizeIcon />} title="Summarize" description="Get a quick summary of any webpage." />
          <ActionButton icon={<TranslateIcon />} title="Translate" description="Translate text into different languages." />
          <ActionButton icon={<ProofreadIcon />} title="Proofread" description="Fix grammar and spelling mistakes." />
          <ActionButton icon={<RewriteIcon />} title="Rewrite" description="Rewrite text in different tones." />
        </main>

        <footer className="mt-8 flex justify-end">
          <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
            <SettingsIcon />
          </button>
        </footer>
      </div>
    </div>
  );
}