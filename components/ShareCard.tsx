
import React, { forwardRef } from 'react';
import type { CalculationResult, CalculationInput } from '../types';
import { formatGold } from '../utils/formatters';

interface ShareCardProps {
  result: CalculationResult;
  input: CalculationInput;
  carName: string;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ result, input, carName }, ref) => {
    const { totalGold, years, months } = result;
    const monthlySavingsInGold = input.savingsUnit === 'gold' 
        ? input.monthlySavings 
        : input.monthlySavings / input.goldPrice;

    return (
      <div
        ref={ref}
        className="w-[375px] h-[667px] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 flex flex-col justify-between font-['Vazirmatn']"
        dir="rtl"
      >
        <div>
            <h1 className="text-3xl font-bold text-amber-300">مسیر من برای خرید</h1>
            <h2 className="text-4xl font-bold text-white mt-1">{carName}</h2>
        </div>
        
        <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-xl">
                <p className="text-slate-400 text-sm">ارزش کل خودرو</p>
                <p className="text-3xl font-bold text-amber-300">{formatGold(totalGold)} گرم طلا</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-xl">
                <p className="text-slate-400 text-sm">پس‌انداز ماهانه من</p>
                <p className="text-3xl font-bold text-white">{formatGold(monthlySavingsInGold)} گرم طلا</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-xl">
                <p className="text-slate-400 text-sm">زمان رسیدن به هدف</p>
                <p className="text-3xl font-bold text-white">{`${years > 0 ? `${years} سال و ` : ''}${months} ماه`}</p>
            </div>
        </div>

        <div className="text-center">
            <p className="text-lg">
                تو چطور؟ برنامه‌ت رو بچین!
            </p>
            <p className="text-amber-400 font-bold mt-1 text-sm">
                ساخته شده با ابزار «ماشین رو با طلا بخر»
            </p>
        </div>
      </div>
    );
  }
);
