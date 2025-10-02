import { AccountInfo } from './account-info';
import { AchievementsCard } from './achievements-card';
import { LogoutButton } from './logout-button';
import { ProfileHeader } from './profile-header';
import { ProfileMenu } from './profile-menu';

export const ProfilePage = () => {
  const handleLogout = () => {
    console.log('Logout clicado');
  };

  return (
    <div className="px-24 py-6" style={{backgroundColor: '#f4f4f4'}}>
      <ProfileHeader />
      <AchievementsCard />
      <ProfileMenu />
      <AccountInfo />
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};
