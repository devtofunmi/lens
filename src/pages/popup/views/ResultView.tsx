import React from 'react';
import { BackIcon, TranslateIcon } from '../components/Icons';
import { Button } from '../components/Button';
import { View, Language } from '../../../types';

export const ResultView = ({ result, setResult, setView, handleTranslate, targetLanguage, translated, setTranslated, loading }: { result: string, setResult: (result: string | null) => void, setView: (view: View) => void, handleTranslate: (text: string, targetLanguage: Language, setTranslated: (translated: boolean) => void) => void, targetLanguage: Language, translated: boolean, setTranslated: (translated: boolean) => void, loading: boolean }) => {
  return (
    <div className="w-[400px] h-[500px] flex flex-col text-on-background dark:text-dark-on-background p-5 font-sans bg-background dark:bg-dark-background shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => { setResult(null); setView('summarize'); }} className="self-start">
          <BackIcon />
        </Button>
        {!translated && !loading && (
          <Button
            onClick={() => {
              handleTranslate(result, targetLanguage, setTranslated);
            }}
            className="self-start"
            title="Translate"
          >
            <TranslateIcon />
          </Button>
        )}
      </div>
      <div className="overflow-y-auto flex-grow">
        <p>{result}</p>
      </div>
    </div>
  );
};