import React from 'react';
import { InsightIcon, BulletPointsIcon, DetailedSummaryIcon, BackIcon } from '../components/Icons';
import { ActionButton } from '../components/ActionButton';
import { Button } from '../components/Button';
import { View, Action } from '../../../types';

export const SummarizeView = ({ setView, handleAction }: { setView: (view: View) => void, handleAction: (action: Action) => void }) => (
  <div className="relative z-10 flex flex-col flex-grow">
    <Button onClick={() => setView('main')} className="self-start mb-4">
      <BackIcon />
    </Button>
    <main className="grid grid-cols-1 gap-4  overflow-y-auto">
      <ActionButton icon={<InsightIcon />} title="1-line insight" description="A very short version, like a tl;dr." onClick={() => handleAction('summarize_insight')} />
      <ActionButton icon={<BulletPointsIcon />} title="Bullet points" description="Key highlights for quick scanning." onClick={() => handleAction('summarize_bullets')} />
      <ActionButton icon={<DetailedSummaryIcon />} title="Detailed summary" description="A structured summary for deeper understanding." onClick={() => handleAction('summarize_detailed')} />
    </main>
  </div>
);