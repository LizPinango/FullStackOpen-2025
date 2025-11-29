const Notification = ({ message, error }) => {
  if (message !== null) {
    return (
      <div
        className={
          error ? "message-box error-box" : "message-box notification-box"
        }
      >
        <p>{message}</p>
      </div>
    );
  }
  return null;
};

export default Notification;
