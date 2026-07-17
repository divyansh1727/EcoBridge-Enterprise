import NotificationList from "./NotificationList";

export default function NotificationDropdown({
    open,
    notifications,
    loading,
    onRead,
    onViewAll
}) {

    if (!open) return null;

    return (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9999] overflow-hidden">

    <div className="p-4 border-b font-bold text-lg">
        Notifications
    </div>

    <div className="max-h-96 overflow-y-auto">
        <NotificationList
            notifications={notifications}
            loading={loading}
            onRead={onRead}
        />
    </div>

    <button
        onClick={onViewAll}
        className="w-full py-3 bg-green-600 text-white hover:bg-green-700"
    >
        View All Notifications
    </button>

</div>
    );
}