import React from 'react';
import { SummarizeIcon, ProofreadIcon, RewriteIcon, SettingsIcon } from '../components/Icons';
import { ActionButton } from '../components/ActionButton';
import { Button } from '../components/Button';
import { View, Action } from '../../../types';

export const MainView = ({ setView, handleAction, handleProofread }: { setView: (view: View) => void, handleAction: (action: Action) => void, handleProofread: () => void }) => (
  <div className="relative z-10 flex flex-col flex-grow">
    <main className="grid grid-cols-1 gap-4 mt-10 overflow-y-auto">
      <ActionButton icon={<SummarizeIcon />} title="Summarize" description="Get a quick summary of any webpage." onClick={() => setView('summarize')} />
      {/* <ActionButton icon={<TranslateIcon />} title="Translate" description="Translate text into different languages." onClick={() => handleAction('translate')} /> */}
      <ActionButton icon={<ProofreadIcon />} title="Proofread" description="Fix grammar and spelling mistakes." onClick={handleProofread} />
      <ActionButton icon={<RewriteIcon />} title="Rewrite" description="Rewrite text in different tones." onClick={() => setView('toneRewriter')} />
    </main>
    <footer className="mt-8 flex justify-end flex-shrink-0">
      <Button onClick={() => setView('settings')}>
        <SettingsIcon />
      </Button>
    </footer>
  </div>
);