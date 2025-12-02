import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  if (!notification.message) return null;

  return (
    <div
      className={
        notification.error
          ? "message-box error-box"
          : "message-box notification-box"
      }
    >
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
