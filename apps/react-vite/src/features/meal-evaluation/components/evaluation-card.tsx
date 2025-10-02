type EvaluationCardProps = {
  title: string;
  question: string;
  value: number | null;
  onChange: (value: number) => void;
};

const emojis = ['😞', '😐', '🙂', '😊', '😄'];

export const EvaluationCard = ({
  title,
  question,
  value,
  onChange,
}: EvaluationCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{question}</p>

      <div className="flex justify-center space-x-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onChange(index + 1)}
            className={`size-12 rounded-full flex items-center justify-center text-2xl transition-all ${
              value === index + 1
                ? 'bg-[rgb(250,204,21)] scale-110'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
