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

            <div className="sticky top-0 bg-white border-b p-4 font-bold text-lg z-10">
                Notifications
            </div>

            <div className="max-h-96 overflow-y-auto">
                <NotificationList
                    notifications={notifications}
                    loading={loading}
                    onRead={onRead}
                />
            </div>

            <div className="sticky bottom-0 bg-white border-t">
                <button
                    onClick={onViewAll}
                    className="w-full py-3 text-green-600 font-semibold hover:bg-green-50 transition"
                >
                    View All Notifications →
                </button>
            </div>

        </div>
    );
}