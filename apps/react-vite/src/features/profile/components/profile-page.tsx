import { AccountInfo } from './account-info';
import { AchievementsCard } from './achievements-card';
import { LogoutButton } from './logout-button';
import { ProfileHeader } from './profile-header';
import { ProfileMenu } from './profile-menu';

type ProfilePageProps = {
  onBack?: () => void;
};

export const ProfilePage = ({ onBack }: ProfilePageProps = {}) => {
  const handleLogout = () => {
    console.log('Logout clicado');
  };

  return (
    <div className="px-4 py-4" style={{ backgroundColor: '#f4f4f4' }}>
      <ProfileHeader onBack={onBack} />
      <AchievementsCard />
      <ProfileMenu />
      <AccountInfo />
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};
