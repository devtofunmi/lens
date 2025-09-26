import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import * as Icons from "../components/Icons";
import { Spinner } from "../components/Spinner";

const ProofreadView = ({ text, onBack }: { text: string, onBack: () => void }) => {
  const [proofreadResult, setProofreadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const proofreadText = async () => {
      setLoading(true);
      chrome.runtime.sendMessage({ action: "proofread", text }, (response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setProofreadResult(response.data);
        }
        setLoading(false);
      });
    };

    proofreadText();
  }, [text]);

  const renderResult = () => {
    if (loading) return <Spinner />;
    if (!proofreadResult) return <span>{text}</span>;

    let lastIndex = 0;
    const elements = [];
    for (const correction of proofreadResult.corrections) {
      if (correction.startIndex > lastIndex) {
        elements.push(<span key={lastIndex}>{text.substring(lastIndex, correction.startIndex)}</span>);
      }
      elements.push(<span key={correction.startIndex} className="bg-green-200">{text.substring(correction.startIndex, correction.endIndex)}</span>);
      lastIndex = correction.endIndex;
    }

    if (lastIndex < text.length) {
      elements.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
    }

    return elements;
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={onBack} className="self-start">
        <Icons.BackIcon />
      </Button>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold">Proofread</h1>
        <p className="text-sm text-gray-500">Reviewing and correcting the text for errors.</p>
      </div>
      <div className="p-4 border rounded-md text-sm">
        {error ? <p className="text-red-500">{error}</p> : renderResult()}
      </div>
    </div>
  );
};

export default ProofreadView;
