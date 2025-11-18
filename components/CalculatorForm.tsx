
import React from 'react';
import type { Car, CalculationInput, SavingsUnit } from '../types';
import { CARS } from '../constants';
import { formatNumber } from '../utils/formatters';

interface CalculatorFormProps {
  selectedCar: Car;
  setSelectedCar: (car: Car) => void;
  calculationInput: CalculationInput;
  setCalculationInput: (input: CalculationInput) => void;
  onCalculate: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  selectedCar,
  setSelectedCar,
  calculationInput,
  setCalculationInput,
  onCalculate,
}) => {
  const handleCarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carName = e.target.value;
    const car = CARS.find((c) => c.name === carName);
    if (car) {
      setSelectedCar(car);
      setCalculationInput({ ...calculationInput, carPrice: car.price });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalculationInput({
      ...calculationInput,
      [name]: Number(value.replace(/,/g, '')) || 0,
    });
  };

  const handleUnitChange = (unit: SavingsUnit) => {
    setCalculationInput({ ...calculationInput, savingsUnit: unit });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-amber-400">اطلاعات را وارد کنید</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="car-select" className="block text-sm font-medium text-slate-300 mb-2">
            نوع خودرو
          </label>
          <select
            id="car-select"
            value={selectedCar.name}
            onChange={handleCarChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          >
            {CARS.map((car) => (
              <option key={car.name} value={car.name}>
                {car.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="car-price" className="block text-sm font-medium text-slate-300 mb-2">
            قیمت خودرو (تومان)
          </label>
          <input
            type="text"
            id="car-price"
            name="carPrice"
            value={formatNumber(calculationInput.carPrice)}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-left dir-ltr focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          />
        </div>

        <div>
          <label htmlFor="gold-price" className="block text-sm font-medium text-slate-300 mb-2">
            قیمت هر گرم طلا (تومان)
          </label>
          <input
            type="text"
            id="gold-price"
            name="goldPrice"
            value={formatNumber(calculationInput.goldPrice)}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-left dir-ltr focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          />
        </div>
        
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
                پس‌انداز ماهانه
            </label>
            <div className="flex rounded-lg border border-slate-600 overflow-hidden">
                <input
                    type="text"
                    name="monthlySavings"
                    value={formatNumber(calculationInput.monthlySavings)}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 p-3 text-left dir-ltr focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition"
                />
                <button
                    type="button"
                    onClick={() => handleUnitChange('gold')}
                    className={`px-4 py-2 transition ${calculationInput.savingsUnit === 'gold' ? 'bg-amber-500 text-slate-900' : 'bg-slate-600 hover:bg-slate-500'}`}
                >
                    گرم طلا
                </button>
                <button
                    type="button"
                    onClick={() => handleUnitChange('toman')}
                    className={`px-4 py-2 transition ${calculationInput.savingsUnit === 'toman' ? 'bg-amber-500 text-slate-900' : 'bg-slate-600 hover:bg-slate-500'}`}
                >
                    تومان
                </button>
            </div>
        </div>


        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 font-bold py-3 px-4 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          محاسبه کن
        </button>
      </form>
    </div>
  );
};
