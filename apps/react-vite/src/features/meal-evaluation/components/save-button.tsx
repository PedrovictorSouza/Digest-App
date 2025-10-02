type SaveButtonProps = {
  isEnabled: boolean;
  onSave: () => void;
};

export const SaveButton = ({ isEnabled, onSave }: SaveButtonProps) => {
  return (
    <div className="text-center">
      <button
        onClick={onSave}
        disabled={!isEnabled}
        className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all ${
          isEnabled
            ? 'bg-teal-500 hover:bg-teal-600 active:scale-95'
            : 'bg-gray-300 cursor-not-allowed opacity-50'
        }`}
      >
        Salvar Avaliação
      </button>

      <p className="text-gray-400 text-sm mt-3">
        Suas avaliações são privadas e ajudam você a ter mais consciência sobre
        sua alimentação.
      </p>
    </div>
  );
};
