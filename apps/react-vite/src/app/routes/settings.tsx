import { useState } from 'react';
import { useNavigate } from 'react-router';

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
        <div className="mb-6 flex items-center">
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
            <p className="mb-6 text-sm text-gray-500">
              Defina seus horários habituais para receber notificações
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="breakfast-time"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Café da manhã
                </label>
                <div className="relative">
                  <input
                    id="breakfast-time"
                    type="time"
                    value={breakfastTime}
                    onChange={(e) => setBreakfastTime(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="--:--"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🕐
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="lunch-time"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Almoço
                </label>
                <div className="relative">
                  <input
                    id="lunch-time"
                    type="time"
                    value={lunchTime}
                    onChange={(e) => setLunchTime(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="--:--"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🕐
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="dinner-time"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Jantar
                </label>
                <div className="relative">
                  <input
                    id="dinner-time"
                    type="time"
                    value={dinnerTime}
                    onChange={(e) => setDinnerTime(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="--:--"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
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
            <p className="mb-6 text-sm text-gray-500">
              Informações para personalizar seus relatórios
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="gender"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Gênero
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ⌄
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Idade
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: 30"
                />
              </div>

              <div>
                <label
                  htmlFor="weight"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Peso (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: 70"
                />
              </div>

              <div>
                <label
                  htmlFor="height"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Altura (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: 170"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-green-800">
              Condições de Saúde
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Opcional - ajuda a personalizar orientações
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hypertension"
                  checked={hypertension}
                  onChange={(e) => setHypertension(e.target.checked)}
                  className="size-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="hypertension"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  Hipertensão
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diabetes"
                  checked={diabetes}
                  onChange={(e) => setDiabetes(e.target.checked)}
                  className="size-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="diabetes"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  Diabetes
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="highCholesterol"
                  checked={highCholesterol}
                  onChange={(e) => setHighCholesterol(e.target.checked)}
                  className="size-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="highCholesterol"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  Colesterol alto
                </label>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-start">
                <div className="shrink-0">
                  <span className="text-lg text-yellow-600">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    Estas informações são para personalização e não substituem
                    orientação médica profissional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSave}
              className="rounded-lg bg-green-600 px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-green-700"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
