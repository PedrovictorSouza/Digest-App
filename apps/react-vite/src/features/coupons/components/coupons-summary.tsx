export const CouponsSummary = () => {
  const availableCoupons = 3;

  return (
    <div className="bg-gradient-to-br from-[#568168] to-transparent bg-[#9bba9b] rounded-2xl p-5 mb-8 border border-green-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-medium mb-1">Cupons disponíveis</p>
          <p className="text-3xl font-bold text-white">{availableCoupons}</p>
        </div>
        <div className="size-16 flex items-center justify-center">
          <span className="text-6xl">🎁</span>
        </div>
      </div>
    </div>
  );
};
