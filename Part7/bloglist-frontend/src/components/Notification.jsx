import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  if (!notification.message) return null;

  return (
    <div
      className={
        notification.error
          ? "border-2 rounded-lg border-red-500 bg-gray-50 text-red-500 text-lg text-center font-bold py-2 px-4 mx-10 mt-6"
          : "border-2 rounded-lg border-green-500 bg-gray-50 text-green-500 text-lg text-center font-bold py-2 px-4 mx-10 mt-6"
      }
    >
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
