import NotificationItem from "./NotificationItem";

export default function NotificationList({
    notifications,
    loading,
    onRead,
    onDelete
}) {

    if (loading) {

        return (
            <div className="p-6 text-center text-gray-500">
                Loading notifications...
            </div>
        );

    }

    if (notifications.length === 0) {

        return (
            <div className="p-6 text-center text-gray-500">
                No Notifications
            </div>
        );

    }

    return (

        <div>

            {notifications.map(notification => (

                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={onRead}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );

}