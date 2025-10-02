import { Link } from 'react-router';

type ProfileMenuItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  href?: string;
};

export const ProfileMenuItem = ({ icon, title, description, onClick, href }: ProfileMenuItemProps) => {
  const content = (
    <div className="flex items-center">
      <div className="mr-4" style={{color: 'rgb(106 155 124)'}}>{icon}</div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="w-full bg-white rounded-2xl p-5 mb-4 shadow-sm border hover:bg-gray-50 transition-colors text-left block"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-5 mb-4 shadow-sm border hover:bg-gray-50 transition-colors text-left"
    >
      {content}
    </button>
  );
};
