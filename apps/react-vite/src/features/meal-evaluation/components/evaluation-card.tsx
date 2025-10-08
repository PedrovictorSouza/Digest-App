type EvaluationCardProps = {
  title: string;
  question: string;
  value: number | null;
  onChange: (value: number) => void;
  isPending?: boolean;
};

const emojis = ['😞', '😐', '🙂', '😊', '😄'];

export const EvaluationCard = ({
  title,
  question,
  value,
  onChange,
  isPending = false,
}: EvaluationCardProps) => {
  return (
    <div className="mb-4 rounded-lg bg-gray-50 p-6">
      <h3 className="mb-2 text-lg font-bold text-gray-800">{title}</h3>
      <p className="mb-4 text-gray-500">{question}</p>

      <div className="flex justify-center space-x-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            data-pending={isPending}
            onClick={() => onChange(index + 1)}
            disabled={isPending}
            className={`flex size-12 items-center justify-center rounded-full text-2xl transition-all ${
              value === index + 1
                ? 'scale-110 bg-[rgb(250,204,21)]'
                : 'bg-white hover:bg-gray-100'
            } ${isPending ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
