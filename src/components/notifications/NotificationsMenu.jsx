import NotificationItem from "./NotificationItem";
import { Link } from "react-router-dom";

const NotificationsMenu = ({ notifications = [], onClose }) => {
    const visibleNotifications = notifications.slice(0, 3);

    console.log("notifcaitons ", notifications);
    
    return (
        <div className="absolute right-0 mt-3 w-96 bg-[#0B1220] border border-gray-700 rounded-lg shadow-xl z-50">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700 text-sm font-semibold">
                Notifications
            </div>

            {/* Notification list */}
            {visibleNotifications.length > 0 ? (
                visibleNotifications.map((notification) => (
                    <NotificationItem
                        key={notification._id}
                        notification={notification}
                    />
                ))
            ) : (
                <p className="px-4 py-6 text-sm text-gray-400 text-center">
                    No notifications
                </p>
            )}

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-700 text-center">
                <Link
                    to="/notifications"
                    state={{ notifications }}   
                    onClick={onClose}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                >
                    View all
                </Link>
            </div>
        </div>
    );
};

export default NotificationsMenu;
