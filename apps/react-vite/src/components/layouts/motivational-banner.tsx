import * as React from 'react';

type MotivationalBannerProps = {
  message?: string;
};

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
      fill="#F59E0B"
    />
  </svg>
);

export const MotivationalBanner = ({
  message = 'Continue assim! Cada refeição consciente é um passo para uma vida mais saudável.',
}: MotivationalBannerProps) => {
  return (
    <div className="mx-28 mb-6 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 p-6">
      <div className="flex items-center gap-2">
        <StarIcon />
        <p className="text-sm font-medium leading-relaxed text-black">
          {message}
        </p>
      </div>
    </div>
  );
};
