
import React from 'react';
import type { CalculationResult, CalculationInput } from '../types';
import { formatNumber, formatGold } from '../utils/formatters';

interface ResultsCardProps {
  result: CalculationResult;
  input: CalculationInput;
  carName: string;
  onDownload: () => void;
}

const InfoPill: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className }) => (
    <div className={`text-center p-4 rounded-lg bg-slate-700/50 ${className}`}>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-xl font-bold text-amber-300">{value}</p>
    </div>
);

export const ResultsCard: React.FC<ResultsCardProps> = ({ result, input, carName, onDownload }) => {
  const { totalGold, years, months, suggestion } = result;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col h-full animate-fade-in">
        <h2 className="text-2xl font-bold mb-2 text-amber-400">🚗 نتیجهٔ شما</h2>
        <p className="text-slate-400 mb-6">
            این هم برنامه پس‌انداز شما برای خرید <span className="font-bold text-white">{carName}</span>:
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
            <InfoPill label="قیمت ماشین" value={`${formatGold(totalGold)} گرم طلا`} />
            <InfoPill label="مدت زمان لازم" value={`${years > 0 ? `${years} سال و ` : ''}${months} ماه`} />
        </div>
        
        <div className="bg-slate-900/50 border border-amber-500/30 p-4 rounded-lg text-center flex-grow flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-amber-300 mb-2">🚀 پیشنهاد ویژه</h3>
            <p className="text-slate-300 leading-relaxed">
                اگر ماهی فقط <span className="font-bold text-white">{formatGold(suggestion.increasedSavings)} گرم</span> بیشتر پس‌انداز کنی،
                <br />
                می‌تونی <span className="font-bold text-white">{suggestion.timeSavedMonths} ماه زودتر</span> به هدفت برسی!
            </p>
        </div>

        <button
            onClick={onDownload}
            className="w-full mt-6 bg-transparent border-2 border-amber-500 text-amber-500 font-bold py-3 px-4 rounded-lg hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            دانلود کارت انگیزشی
        </button>
    </div>
  );
};

// Add a simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
