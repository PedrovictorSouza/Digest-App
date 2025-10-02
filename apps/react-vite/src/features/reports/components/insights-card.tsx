type InsightsCardProps = {
  icon: string;
  message: string;
  trend: 'up' | 'down' | 'stable';
};

export const InsightsCard = ({ icon, message, trend }: InsightsCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➡️';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border">
      <div className="flex items-start">
        <div className="size-10 flex items-center justify-center mr-3 flex-shrink-0">
          <span className="text-xl">{icon}</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 text-sm leading-relaxed">{message}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
