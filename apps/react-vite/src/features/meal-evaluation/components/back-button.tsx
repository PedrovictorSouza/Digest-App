type BackButtonProps = {
  onBack: () => void;
};

export const BackButton = ({ onBack }: BackButtonProps) => {
  return (
    <button
      onClick={onBack}
      className="flex items-center text-gray-600 hover:text-gray-800"
    >
      <span className="mr-2">←</span>
      Voltar
    </button>
  );
};
