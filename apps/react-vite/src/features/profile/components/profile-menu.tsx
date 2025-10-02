import { Link } from 'react-router';

import { paths } from '@/config/paths';
import { ProfileMenuItem } from './profile-menu-item';

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
  </svg>
);

export const ProfileMenu = () => {
  const menuItems = [
    {
      icon: <CalendarIcon />,
      title: 'Histórico',
      description: 'Veja todas as suas avaliações',
      onClick: () => console.log('Histórico clicado')
    },
    {
      icon: <TargetIcon />,
      title: 'Metas',
      description: 'Defina seus objetivos',
      onClick: () => console.log('Metas clicado')
    },
    {
      icon: <SettingsIcon />,
      title: 'Configurações',
      description: 'Notificações e preferências',
      href: paths.settings.getHref()
    }
  ];

  return (
    <div className="mb-8">
      {menuItems.map((item, index) => (
        <ProfileMenuItem
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
          onClick={item.onClick}
          href={item.href}
        />
      ))}
    </div>
  );
};
