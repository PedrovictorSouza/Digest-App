import { InsightsCard } from './insights-card';

type Insight = {
  id: string;
  icon: string;
  message: string;
  trend: 'up' | 'down' | 'stable';
};

type WeeklyInsightsProps = {
  insights: Insight[];
};

export const WeeklyInsights = ({ insights }: WeeklyInsightsProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Insights da Semana
      </h2>
      <div className="space-y-4">
        {insights.map((insight) => (
          <InsightsCard
            key={insight.id}
            icon={insight.icon}
            message={insight.message}
            trend={insight.trend}
          />
        ))}
      </div>
    </div>
  );
};
