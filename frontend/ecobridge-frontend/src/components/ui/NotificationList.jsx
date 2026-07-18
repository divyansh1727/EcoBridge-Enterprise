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
                <div className="p-8 text-center">

    <div className="text-5xl mb-3">
        📭
    </div>

    <h3 className="font-semibold text-gray-700">
        No Notifications Yet
    </h3>

    <p className="text-sm text-gray-500 mt-2">
        We'll notify you whenever something important happens.
    </p>

</div>
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