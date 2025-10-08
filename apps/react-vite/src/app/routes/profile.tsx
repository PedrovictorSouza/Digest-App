import { useNavigate } from 'react-router';

import { paths } from '@/config/paths';
import { ProfilePage } from '@/features/profile/components/profile-page';

export default function ProfileRoute() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(paths.home.path);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
      <ProfilePage onBack={handleBack} />
    </div>
  );
}
