export default function NotificationItem({
    notification,
    onRead,
    onDelete
}) {

    return (

        <div
            onClick={() => onRead(notification)}
            className={`
                p-4
                border-b
                cursor-pointer
                transition
                hover:bg-gray-100
                ${
                    !notification.isRead
                        ? "bg-green-50"
                        : "bg-white"
                }
            `}
        >

            <div className="flex justify-between items-start">

                <div>

                    <h3 className="font-bold">

                        {notification.title}

                    </h3>

                    <p className="text-sm text-gray-600 mt-1">

                        {notification.message}

                    </p>

                </div>

                {onDelete && (

                    <button
                        onClick={(e) => {

                            e.stopPropagation();

                            onDelete(notification.id);

                        }}
                        className="text-red-500 hover:text-red-700"
                    >

                        ✕

                    </button>

                )}

            </div>

        </div>

    );

}