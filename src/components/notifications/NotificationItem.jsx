const NotificationItem = ({ notification }) => {
    const isUnread = !notification.readed;

    return (
        <div
            className={`px-4 py-3 border-b border-gray-700 hover:bg-[#1F2937] cursor-pointer ${isUnread ? "bg-[#111827]" : ""
                }`}
        >
            <p className="text-sm text-gray-200">
                <span className="font-semibold">Price Update:</span>{" "}
                Product price changed
            </p>

            <p className="text-xs text-gray-400 mt-1">
                Old: ₹{notification.oldPrice} → New: ₹{notification.newPrice}
            </p>

            <p className="text-xs text-gray-500 mt-1">
                {new Date(notification.createdAt).toLocaleString()}
            </p>
        </div>
    );
};

export default NotificationItem;
