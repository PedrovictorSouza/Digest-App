import { BackButton } from '@/features/meal-evaluation';

type ProfileHeaderProps = {
  onBack?: () => void;
};

export const ProfileHeader = ({ onBack }: ProfileHeaderProps = {}) => {
  return (
    <div className="mb-6">
      {onBack ? (
        <div className="mb-4">
          <BackButton onBack={onBack} />
        </div>
      ) : null}
      <div className="text-center">
        <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl text-gray-600">👤</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-1">Maria Silva</h1>
        <p className="text-gray-500 text-sm">maria@example.com</p>
      </div>
    </div>
  );
};
