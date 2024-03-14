import { useEffect, useState } from "react";
import { NotificationComponent } from "./NotificationTypes";

import "./Notification.scss";

const Notification: NotificationComponent = ({
  message,
  duration = 3000,
  onClose,
}) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${showNotification ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default Notification;
