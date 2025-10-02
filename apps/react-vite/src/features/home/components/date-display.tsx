export const DateDisplay = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="mb-8 text-center">
      <p className="w-fit rounded-full bg-white px-6 py-3 text-left text-sm font-bold text-black shadow-lg">
        {dateString}
      </p>
    </div>
  );
};
