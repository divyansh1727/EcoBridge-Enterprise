import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationDropdown from "./NotificationDropdown";

import {
    getNotifications,
    getUnreadCount,
    markAsRead
} from "../../services/notificationService";

export default function NotificationBell() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        if (!user) return;

        loadUnread();

        const interval = setInterval(loadUnread, 10000);

        return () => clearInterval(interval);

    }, [user]);

    const loadUnread = async () => {

        try {

            const response = await getUnreadCount(user.id);
            setUnread(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    const loadNotifications = async () => {

        try {

            const response = await getNotifications(user.id);
            setNotifications(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    const toggleDropdown = () => {

        const next = !open;
        setOpen(next);

        if (next) {
            loadNotifications();
        }

    };

    const handleRead = async (notification) => {

        if (notification.isRead) return;

        await markAsRead(notification.id);

        loadNotifications();
        loadUnread();

    };

    return (

        <div className="relative z-[9999]">

            <button
                onClick={toggleDropdown}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-green-600 hover:bg-green-700 cursor-pointer"
            >

                <FaBell className="text-white text-2xl" />

                {unread > 0 && (

                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">

                        {unread}

                    </span>

                )}

            </button>

            <NotificationDropdown
                open={open}
                notifications={notifications}
                loading={false}
                onRead={handleRead}
                onViewAll={() => {

                    setOpen(false);
                    console.log(user);
    console.log(user.role);

                    if (user.role === "ROLE_GENERATOR") {
                        navigate("/generator/notifications");
                    } else {
                        navigate("/recycler/notifications");
                    }

                }}
            />

        </div>

    );

}