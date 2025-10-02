export const AchievementsCard = () => {
  const achievements = [
    { value: '156', label: 'Avaliações', color: 'rgb(106 155 124)' },
    { value: '3.8', label: 'Média nutrição', color: 'rgb(106 155 124)' },
    { value: '12', label: 'Semanas seguidas', color: 'text-orange-500' },
    { value: '4.2', label: 'Média satisfação', color: 'text-yellow-500' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Suas Conquistas</h2>

      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: achievement.color }}
            >
              {achievement.value}
            </p>
            <p className="text-sm text-gray-600 mt-1">{achievement.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
