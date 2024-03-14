export interface NotificationProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export type NotificationComponent = React.FC<NotificationProps>;
