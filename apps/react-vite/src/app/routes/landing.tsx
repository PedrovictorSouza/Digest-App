import { useState } from 'react';

import { Footer } from '@/components/layouts';
import { CouponsPage } from '@/features/coupons';
import { HomePage } from '@/features/home';
import { ProfilePage } from '@/features/profile';
import { ReportsPage } from '@/features/reports';

const LandingRoute = () => {
  const [showFooter, setShowFooter] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'home' | 'reports' | 'coupons' | 'profile'
  >('home');

  const handleTabChange = (tab: 'home' | 'reports' | 'coupons' | 'profile') => {
    setActiveTab(tab);
    setShowFooter(true);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage onViewChange={(view) => setShowFooter(view === 'home')} />
        );
      case 'reports':
        return <ReportsPage />;
      case 'coupons':
        return <CouponsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <HomePage onViewChange={(view) => setShowFooter(view === 'home')} />
        );
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div
        className="flex-1 overflow-y-auto pb-20"
        style={{ backgroundColor: '#f4f4f4' }}
      >
        {renderPage()}
      </div>
      {showFooter && (
        <Footer activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
};

export default LandingRoute;
