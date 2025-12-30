import type { ReactNode } from "react";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ToastItem, ToastOptions, ToastVariant } from "./toast";
import { Toasts } from "./toastContainer";

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (message: string, options?: ToastOptions) => void;
  success: (message: string, options?: Omit<ToastOptions, "variant">) => void;
  error: (message: string, options?: Omit<ToastOptions, "variant">) => void;
  warning: (message: string, options?: Omit<ToastOptions, "variant">) => void;
  info: (message: string, options?: Omit<ToastOptions, "variant">) => void;
  dismiss: (id: string) => void;
}

const toastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  defaultDuration?: number;
}

export function ToastProvider({
  children,
  defaultDuration = 3000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = (
    message: string,
    variant: ToastVariant,
    options: ToastOptions = {},
  ) => {
    const {
      duration = defaultDuration,
      position = "bottom-right",
      title,
      contentPosition,
      width,
    } = options;

    const id = crypto.randomUUID();
    const toast: ToastItem = {
      id,
      variant,
      message,
      title,
      position,
      duration,
      createdAt: Date.now(),
      contentPosition,
      width,
    };

    setToasts((prev) => {
      const positionToasts = prev.filter((t) => t.position === position);

      if (positionToasts.length >= 3) {
        const oldest = positionToasts.reduce((oldest, current) =>
          oldest.createdAt < current.createdAt ? oldest : current,
        );
        const filtered = prev.filter((t) => t.id !== oldest.id);

        const oldestTimer = timersRef.current.get(oldest.id);
        if (oldestTimer) {
          clearTimeout(oldestTimer);
          timersRef.current.delete(oldest.id);
        }

        return [...filtered, toast];
      }

      return [...prev, toast];
    });

    const timerId = setTimeout(() => {
      dismiss(id);
    }, duration);
    timersRef.current.set(id, timerId);
  };

  const toast = (message: string, options?: ToastOptions) => {
    addToast(message, options?.variant || "info", options);
  };

  const success = (
    message: string,
    options?: Omit<ToastOptions, "variant">,
  ) => {
    addToast(message, "success", options);
  };

  const error = (message: string, options?: Omit<ToastOptions, "variant">) => {
    addToast(message, "error", options);
  };

  const warning = (
    message: string,
    options?: Omit<ToastOptions, "variant">,
  ) => {
    addToast(message, "warning", options);
  };

  const info = (message: string, options?: Omit<ToastOptions, "variant">) => {
    addToast(message, "info", options);
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => {
        void clearTimeout(timer);
      });
      timersRef.current.clear();
    };
  }, []);

  const value: ToastContextValue = {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
  };

  return (
    <toastContext.Provider value={value}>
      {children}
      <Toasts />
    </toastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = use(toastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
