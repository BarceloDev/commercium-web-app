import axios from "axios";
import { useEffect, useState } from "react";

export default function Notifications({ theme }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );

        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error(
          "Error fetching notifications:",
          error.response?.data || error,
        );
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  async function markAsRead(id) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found.");
        return;
      }
      await axios.put(
        `http://127.0.0.1:8000/api/notifications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id),
      );
    } catch (error) {
      console.error(
        "Error marking notification as read:",
        error.response?.data || error,
      );
    }
  }

  return (
    <div
      className={`w-screen h-full py-4 px-4 flex flex-col gap-4 ${theme === "light" ? "text-slate-950 bg-slate-50" : "text-slate-50 bg-slate-800"} transition duration-150 ease-in`}
    >
      <h1 className="text-2xl font-bold">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="w-full flex items-center justify-center py-10">
          <p className="text-gray-500 text-lg">No notifications</p>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="w-80 p-4 rounded-2xl border border-red-500 shadow-sm flex flex-col gap-4 bg-white"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-red-500 font-bold text-lg">Alert</h2>

                <span className="text-xs text-gray-400">
                  #{notification.id}
                </span>
              </div>

              <p className="text-gray-700">{notification.message}</p>

              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                onClick={() => markAsRead(notification.id)}
              >
                Mark as read
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
