import { useState, useRef, useEffect } from "react";
import NotificationsMenu from "./NotificationsMenu";
import { Bell } from "lucide-react";

const NotificationsDropdown = ({ notifications }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter((n) => !n.readed).length;

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer
               hover:bg-gray-800 hover:text-blue-400 transition duration-300"
            >
                {/* Bell wrapper */}
                <span className="relative mr-2">
                    <Bell className="h-5 w-5" />

                    {unreadCount > 0 && (
                        <span
                            className="absolute -top-1 -right-1 min-w-[16px] h-[16px]
                     bg-red-500 text-white text-[10px] font-semibold
                     rounded-full flex items-center justify-center"
                        >
                            {unreadCount}
                        </span>
                    )}
                </span>

                Notifications
            </button>

            {open && (
                <NotificationsMenu
                    notifications={notifications}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>

    );
};

export default NotificationsDropdown;
