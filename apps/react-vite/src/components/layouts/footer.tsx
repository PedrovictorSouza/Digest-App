import * as React from 'react';

type FooterProps = {
  activeTab?: 'home' | 'reports' | 'coupons' | 'profile';
  onTabChange?: (tab: 'home' | 'reports' | 'coupons' | 'profile') => void;
};

const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 22V12H15V22"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReportsIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 17L9 11L13 15L21 7"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 7H17L21 3V7Z"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CouponsIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 9L16 15"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 9L8 15"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfileIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke={isActive ? '#10B981' : '#6B7280'}
      strokeWidth="2"
    />
  </svg>
);

export const Footer = ({ activeTab = 'home', onTabChange }: FooterProps) => {
  const tabs = [
    { id: 'home', label: 'Início', icon: HomeIcon },
    { id: 'reports', label: 'Relatório', icon: ReportsIcon },
    { id: 'coupons', label: 'Cupons', icon: CouponsIcon },
    { id: 'profile', label: 'Perfil', icon: ProfileIcon },
  ] as const;

  return (
    <div
      data-testid="footer"
      className="flex h-20 w-full items-center justify-around border-t bg-white px-4 py-3"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className="flex flex-col items-center gap-1 focus:outline-none"
          >
            <IconComponent isActive={isActive} />
            <span
              className={`text-xs ${
                isActive ? 'font-medium' : 'text-gray-600'
              }`}
              style={isActive ? { color: 'rgb(106 155 124)' } : {}}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
