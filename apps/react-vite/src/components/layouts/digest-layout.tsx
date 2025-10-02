import * as React from 'react';

import { Footer } from './footer';
import { MealCard } from './meal-card';
import { MotivationalBanner } from './motivational-banner';

type DigestLayoutProps = {
  children?: React.ReactNode;
  activeTab?: 'home' | 'reports' | 'coupons' | 'profile';
  onTabChange?: (tab: 'home' | 'reports' | 'coupons' | 'profile') => void;
};

export const DigestLayout = ({
  children,
  activeTab = 'home',
  onTabChange,
}: DigestLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main
        className="flex-1 px-24 py-6"
        style={{ backgroundColor: '#f4f4f4' }}
      >
        <div className="space-y-6">
          <MealCard
            mealName="Café da Manhã"
            time="08:00"
            isEvaluated={true}
            mealType="breakfast"
          />
          <MealCard
            mealName="Almoço"
            time="12:30"
            isEvaluated={false}
            mealType="lunch"
          />
          <MealCard
            mealName="Jantar"
            time="19:00"
            isEvaluated={false}
            mealType="dinner"
          />
        </div>

        <MotivationalBanner />

        {children}
      </main>

      <Footer activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
