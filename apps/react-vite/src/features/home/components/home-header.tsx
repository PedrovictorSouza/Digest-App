export const HomeHeader = () => {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4L20 16L32 16L22 24L26 32L16 28L6 32L10 24L0 16L12 16L16 4Z"
            fill="#14B8A6"
            stroke="#14B8A6"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M24 8H26V10H24V8Z"
            fill="#14B8A6"
          />
          <path
            d="M6 22H8V24H6V22Z"
            fill="#14B8A6"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800">digest</h1>
      </div>
      <p className="text-gray-600">Como foram suas refeições hoje?</p>
    </div>
  );
};
