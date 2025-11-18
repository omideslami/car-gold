
import React, { useState, useRef, useCallback } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsCard } from './components/ResultsCard';
import { ShareCard } from './components/ShareCard';
import { CARS, DEFAULT_GOLD_PRICE } from './constants';
import type { CalculationInput, CalculationResult, Car } from './types';
import { toPng } from 'html-to-image';

const App: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car>(CARS[2]);
  const [calculationInput, setCalculationInput] = useState<CalculationInput>({
    carPrice: CARS[2].price,
    goldPrice: DEFAULT_GOLD_PRICE,
    monthlySavings: 5,
    savingsUnit: 'gold',
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const handleCalculation = () => {
    const { carPrice, goldPrice, monthlySavings, savingsUnit } = calculationInput;
    if (!carPrice || !goldPrice || !monthlySavings) {
      setResult(null);
      return;
    }

    const totalGold = carPrice / goldPrice;
    const monthlySavingsInGold = savingsUnit === 'gold' ? monthlySavings : monthlySavings / goldPrice;
    if (monthlySavingsInGold <= 0) {
      setResult(null);
      return;
    }
    const totalMonths = Math.ceil(totalGold / monthlySavingsInGold);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    // Suggestion logic: what if they save 2 more grams?
    const suggestedMonthlySavings = monthlySavingsInGold + 2;
    const newTotalMonths = Math.ceil(totalGold / suggestedMonthlySavings);
    const timeSavedMonths = totalMonths - newTotalMonths;
    
    setResult({
      totalGold,
      totalMonths,
      years,
      months,
      suggestion: {
        increasedSavings: 2,
        newTotalMonths,
        timeSavedMonths,
      },
    });
  };

  const handleDownloadImage = useCallback(() => {
    if (shareCardRef.current === null) {
      return;
    }

    toPng(shareCardRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `plan-saving-${selectedCar.name.replace(/\s/g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  }, [selectedCar]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
          ماشین رو با طلا بخر
        </h1>
        <p className="text-slate-400 mt-2">
          پس‌اندازت رو برای خرید خودرو بر اساس گرم طلا محاسبه و برنامه‌ریزی کن
        </p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <CalculatorForm
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            calculationInput={calculationInput}
            setCalculationInput={setCalculationInput}
            onCalculate={handleCalculation}
          />
        </div>

        <div className="w-full">
          {result && (
            <ResultsCard 
              result={result} 
              input={calculationInput}
              carName={selectedCar.name}
              onDownload={handleDownloadImage}
            />
          )}
        </div>
      </main>

      {/* Hidden component for generating the shareable image */}
      {result && (
         <div className="fixed -bottom-[9999px] -left-[9999px]">
            <ShareCard
                ref={shareCardRef}
                result={result}
                input={calculationInput}
                carName={selectedCar.name}
            />
        </div>
      )}
    </div>
  );
};

export default App;
