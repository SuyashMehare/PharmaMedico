import { useLocation } from "react-router-dom";
import NotificationCard from "../components/notifications/NotificationCard";

const NotificationsPage = () => {
    const location = useLocation();

    const notifications =
        location.state?.notifications || [];


    return (
        <div className="min-h-screen bg-[#0B1220] text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Notifications</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        All updates related to your account and products
                    </p>
                </div>

                {/* Notifications list */}
                <div className="space-y-4">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <NotificationCard
                                key={notification._id}
                                notification={notification}
                            />
                        ))
                    ) : (
                        <div className="text-center py-16 text-gray-400">
                            You have no notifications
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
