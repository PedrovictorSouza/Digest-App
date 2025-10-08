import { useCallback, useState } from 'react';

type ToastState = {
  isVisible: boolean;
  message: string;
};

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
  });

  const showToast = useCallback((message: string) => {
    setToast({ isVisible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
};
