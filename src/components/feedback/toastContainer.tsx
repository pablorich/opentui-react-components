import { FlexCol, Spacer } from "../../components";
import { Toast } from "./toast";
import { useToast } from "./toastContext";

export interface ToastContainerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function ToastContainer({ position }: ToastContainerProps) {
  const { toasts } = useToast();

  const positionToasts = toasts.filter((toast) => toast.position === position);

  const getPositionStyle = () => {
    switch (position) {
      case "top-left":
        return { top: 1, left: 1 };
      case "top-right":
        return { top: 1, right: 1 };
      case "bottom-left":
        return { bottom: 1, left: 1 };
      case "bottom-right":
        return { bottom: 1, right: 1 };
    }
  };

  if (positionToasts.length === 0) {
    return null;
  }

  const alignment =
    position === "bottom-right" || position === "top-right"
      ? "flex-end"
      : "flex-start";

  return (
    <box
      style={{
        position: "absolute",
        ...getPositionStyle(),
        zIndex: 1000,
        maxWidth: 60,
      }}
    >
      <FlexCol style={{ alignItems: alignment }}>
        {positionToasts.map((toast, index) => (
          <>
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={toast.title}
              message={toast.message}
              position={toast.contentPosition}
              width={toast.width}
            />
            {index < positionToasts.length - 1 && <Spacer size={1} />}
          </>
        ))}
      </FlexCol>
    </box>
  );
}

export function Toasts() {
  return (
    <>
      <ToastContainer position="top-left" />
      <ToastContainer position="top-right" />
      <ToastContainer position="bottom-left" />
      <ToastContainer position="bottom-right" />
    </>
  );
}
