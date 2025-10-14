import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'error';
};

export const Toast = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
  type = 'success',
}: ToastProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !show) return null;

  const isError = type === 'error';
  const bgColor = isError ? 'bg-red-500' : 'bg-green-500';
  const iconBgColor = isError ? 'bg-red-400' : 'bg-green-400';
  const icon = isError ? '✕' : '✓';

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3`}>
        <div className={`size-6 rounded-full ${iconBgColor} flex items-center justify-center`}>
          <span className="text-white text-sm">{icon}</span>
        </div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
