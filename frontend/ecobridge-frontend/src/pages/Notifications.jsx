import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import NotificationList from "../components/ui/NotificationList";

import {
    getNotifications,
    markAsRead,
    deleteNotification
} from "../services/notificationService";

export default function Notifications() {

    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadNotifications = async () => {

        try {

            const response =
                await getNotifications(user.id);

            setNotifications(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (user) {

            loadNotifications();

        }

    }, [user]);

    const handleRead = async (notification) => {

        if (notification.isRead) return;

        await markAsRead(notification.id);

        loadNotifications();

    };

    const handleDelete = async (id) => {

        await deleteNotification(id);

        loadNotifications();

    };

    return (

        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">

                Notifications

            </h1>

            <NotificationList
                notifications={notifications}
                loading={loading}
                onRead={handleRead}
                onDelete={handleDelete}
            />

        </div>

    );

}