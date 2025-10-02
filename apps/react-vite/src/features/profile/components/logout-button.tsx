type LogoutButtonProps = {
  onLogout: () => void;
};

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <button
      onClick={onLogout}
      className="w-full bg-white border border-red-300 text-red-600 rounded-2xl p-4 font-medium hover:bg-red-50 transition-colors"
    >
      <div className="flex items-center justify-center">
        <span className="mr-2">→</span>
        Sair
      </div>
    </button>
  );
};
