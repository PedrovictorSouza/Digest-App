import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { paths } from '@/config/paths';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [breakfastTime, setBreakfastTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [dinnerTime, setDinnerTime] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [hypertension, setHypertension] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [highCholesterol, setHighCholesterol] = useState(false);

  const handleSave = () => {
    console.log('Configurações salvas');
  };

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="mr-4 text-xl text-gray-600 hover:text-gray-800"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-green-800">Configurações</h1>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-green-800">
              Horários das Refeições
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Defina seus horários habituais para receber notificações
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Café da manhã
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={breakfastTime}
                    onChange={(e) => setBreakfastTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="--:--"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🕐
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Almoço
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={lunchTime}
                    onChange={(e) => setLunchTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="--:--"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🕐
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jantar
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={dinnerTime}
                    onChange={(e) => setDinnerTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="--:--"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🕐
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-green-800">
              Dados Pessoais
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Informações para personalizar seus relatórios
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gênero
                </label>
                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    ⌄
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 170"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-green-800">
              Condições de Saúde
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Opcional - ajuda a personalizar orientações
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hypertension"
                  checked={hypertension}
                  onChange={(e) => setHypertension(e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="hypertension" className="ml-3 text-sm font-medium text-gray-700">
                  Hipertensão
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diabetes"
                  checked={diabetes}
                  onChange={(e) => setDiabetes(e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="diabetes" className="ml-3 text-sm font-medium text-gray-700">
                  Diabetes
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="highCholesterol"
                  checked={highCholesterol}
                  onChange={(e) => setHighCholesterol(e.target.checked)}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="highCholesterol" className="ml-3 text-sm font-medium text-gray-700">
                  Colesterol alto
                </label>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-yellow-600 text-lg">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    Estas informações são para personalização e não substituem orientação médica profissional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
