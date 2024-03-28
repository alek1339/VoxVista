import { NotificationPortalComponent } from "./NotificationPortalTypes";
import Notification from "../notification/Notification";
import { useAppSelector } from "../../hooks/useReduxActions";
import { removeNotification } from "../../store/reducers/notificationSlice";

const NotificationPortal: NotificationPortalComponent = () => {
  const { notifications } = useAppSelector((state) => state.notifications);

  return (
    <div className="notification-portal">
      {notifications.map((n) => (
        <Notification
          key={n.id}
          message={n.message}
          duration={n.duration}
          onClose={() => removeNotification(n.id)}
        />
      ))}
    </div>
  );
};

export default NotificationPortal;
