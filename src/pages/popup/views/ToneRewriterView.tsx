import React from 'react';
import { Button } from '../components/Button';
import { BackIcon } from '../components/Icons';
import { View, RewriterTone, RewriterLength, Language } from '../../../types';
import { usePageAction } from '../../../hooks/usePageAction';

interface ToneRewriterViewProps {
  setView: (view: View) => void;
  targetLanguage: Language;
}

export const ToneRewriterView: React.FC<ToneRewriterViewProps> = ({ setView, targetLanguage }) => {
  const { handleRewriteTone } = usePageAction();

  const handleToneSelection = (tone: RewriterTone | undefined, length: RewriterLength | undefined) => {
    handleRewriteTone({ tone, length, outputLanguage: targetLanguage });
  };

  return (
    <div className="w-[400px] h-[500px] flex flex-col text-on-background dark:text-dark-on-background p-5 font-sans">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setView('main')} className="self-start">
          <BackIcon />
        </Button>
      </div>

      <div className="flex flex-col space-y-4 flex-grow justify-center items-center">
        <Button
          onClick={() => handleToneSelection('more-casual', 'shorter')}
          className="w-full py-3 text-lg"
        >
          Simplify (Kids/ESL)
        </Button>
        <Button
          onClick={() => handleToneSelection('more-formal', undefined)}
          className="w-full py-3 text-lg"
        >
          Formalize (Work Reports)
        </Button>
        <Button
          onClick={() => handleToneSelection('more-casual', 'shorter')} // Social media often benefits from casual and shorter
          className="w-full py-3 text-lg"
        >
          Social Media Format
        </Button>
      </div>
    </div>
  );
};
