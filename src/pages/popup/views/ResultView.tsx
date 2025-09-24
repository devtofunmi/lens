import React from 'react';
import { BackIcon } from '../components/Icons';
import { Button } from '../components/Button';
import { View } from '../../../types';

export const ResultView = ({ result, setResult, setView }: { result: string, setResult: (result: string | null) => void, setView: (view: View) => void }) => (
  <div className="w-[400px] h-[500px] flex flex-col text-on-background dark:text-dark-on-background p-5 font-sans bg-background dark:bg-dark-background shadow-2xl">
    <Button onClick={() => { setResult(null); setView('summarize'); }} className="self-start mb-4">
      <BackIcon />
    </Button>
    <div className="overflow-y-auto flex-grow">
      <p>{result}</p>
    </div>
  </div>
);