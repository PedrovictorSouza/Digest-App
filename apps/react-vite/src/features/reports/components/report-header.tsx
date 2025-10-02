export const ReportHeader = () => {
  const getCurrentWeekRange = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('pt-BR', { day: 'numeric' });
    };
    
    const month = startOfWeek.toLocaleDateString('pt-BR', { month: 'short' });
    
    return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)} de ${month}`;
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Relatório Semanal</h1>
      <p className="text-gray-500 text-left">{getCurrentWeekRange()}</p>
    </div>
  );
};
