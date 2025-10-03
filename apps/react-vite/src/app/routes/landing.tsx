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
    <div className="flex flex-col" style={{ height: '100vh', maxHeight: '100vh' }}>
      <div
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: '#f4f4f4', paddingBottom: '80px' }}
      >
        {renderPage()}
      </div>
      {showFooter && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Footer activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      )}
    </div>
  );
};

export default LandingRoute;
