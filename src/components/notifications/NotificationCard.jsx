import { Bell, Tag } from "lucide-react";

const NotificationCard = ({ notification }) => {
    const isUnread = !notification.readed;

    return (
        <div
            className={`p-4 rounded-lg border transition
        ${isUnread
                    ? "bg-[#111827] border-blue-500/40"
                    : "bg-[#0B1220] border-gray-700"
                }`}
        >
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-blue-500/10 text-blue-400">
                    <Tag className="h-4 w-4" />
                </div>

                <div className="flex-1">
                    <p className="text-sm text-gray-200">
                        <span className="font-semibold">Price Update</span> for a product
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                        Price changed from ₹{notification.oldPrice} to ₹{notification.newPrice}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                    </p>
                </div>

                {isUnread && (
                    <span className="text-xs text-blue-400 font-medium">New</span>
                )}
            </div>
        </div>
    );
};

export default NotificationCard;
