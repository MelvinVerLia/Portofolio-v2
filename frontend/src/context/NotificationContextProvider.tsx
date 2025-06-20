import CustomNotification from "@/component/CustomNotification";
import React, { createContext, ReactNode, useState } from "react";

type NotificationType = "success" | "error" | undefined;
interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void;
}
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationContextProvider"
    );
  }
  return context;
};

interface NotificationContextProviderProps {
  children: ReactNode;
}

export const NotificationContextProvider: React.FC<
  NotificationContextProviderProps
> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  const showNotification = (
    type: NotificationType = "success",
    message: string
  ) => {
    setMessage(message);
    setType(type);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <CustomNotification
        isVisible={isVisible}
        type={type}
        message={message}
        onClose={handleClose}
      />
    </NotificationContext.Provider>
  );
};
