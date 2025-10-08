type SaveButtonProps = {
  isEnabled: boolean;
  onSave: () => void;
  isPending?: boolean;
};

export const SaveButton = ({
  isEnabled,
  onSave,
  isPending = false,
}: SaveButtonProps) => {
  const canSave = isEnabled && !isPending;

  return (
    <div className="text-center">
      <button
        onClick={onSave}
        disabled={!canSave}
        data-pending={isPending}
        className={`w-full rounded-lg px-6 py-4 font-bold text-white transition-all ${
          canSave
            ? 'active:scale-95 bg-teal-500 hover:bg-teal-600'
            : 'cursor-not-allowed bg-gray-300 opacity-50'
        }`}
      >
        {isPending ? 'Salvando...' : 'Salvar Avaliação'}
      </button>

      <p className="text-gray-400 text-sm mt-3">
        Suas avaliações são privadas e ajudam você a ter mais consciência sobre
        sua alimentação.
      </p>
    </div>
  );
};
