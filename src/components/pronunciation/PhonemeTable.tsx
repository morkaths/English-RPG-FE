import React from 'react';
import { consonants, vowels } from 'src/constants';
import { playAudio } from "src/utils/speech";

const PhonemeTable: React.FC = () => {
  const handlePlayAudio = (text: string) => {
    playAudio(text, 'en-US', 'Microsoft Zira - English (United States)');
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <hr className="mb-2" />
      <h2 className="text-center font-semibold text-lg mb-4">Nguyên âm</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {vowels.map((item) => (
          <button
            key={item.symbol + item.word}
            className="bg-white rounded-md border shadow-sm flex flex-col items-center justify-center p-2 min-h-[48px] transition hover:bg-blue-50 active:scale-95"
            type="button"
            tabIndex={0}
          >
            <span className="text-lg font-bold">{item.symbol}</span>
            <span className="text-gray-500 text-xs">{item.word}</span>
            <div className="w-2/3 h-0.5 bg-gray-200 rounded-full mt-1" />
          </button>
        ))}
        
      </div>
      <hr className="mb-2" />
      <h2 className="text-center font-semibold text-lg mb-4">Phụ âm</h2>
      <div className="grid grid-cols-3 gap-4">
        {consonants.map((item) => (
          <button
            key={item.symbol + item.word}
            className="bg-white rounded-md border shadow-sm flex flex-col items-center justify-center p-2 min-h-[48px] transition hover:bg-blue-50 active:scale-95"
            type="button"
            tabIndex={0}
          >
            <span className="text-lg font-bold">{item.symbol}</span>
            <span className="text-gray-500 text-xs">{item.word}</span>
            <div className="w-2/3 h-0.5 bg-gray-200 rounded-full mt-1" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default PhonemeTable;