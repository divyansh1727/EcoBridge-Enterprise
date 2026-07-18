import {
    FaRecycle,
    FaCheckCircle,
    FaClipboardCheck
} from "react-icons/fa";

export default function NotificationItem({
    notification,
    onRead,
    onDelete
}) {

    const getIcon = () => {

        const title = notification.title.toLowerCase();

        if (title.includes("created"))
            return <FaRecycle className="text-green-600" />;

        if (title.includes("reserved"))
            return <FaClipboardCheck className="text-orange-500" />;

        if (title.includes("completed"))
            return <FaCheckCircle className="text-blue-600" />;

        return <FaRecycle className="text-green-600" />;
    };

    const getBorder = () => {

        const title = notification.title.toLowerCase();

        if (title.includes("created"))
            return "border-l-green-500";

        if (title.includes("reserved"))
            return "border-l-orange-500";

        if (title.includes("completed"))
            return "border-l-blue-500";

        return "border-l-green-500";
    };

    return (

        <div
            onClick={() => onRead(notification)}
            className={`
                border-b border-l-4
                ${getBorder()}
                p-4
                cursor-pointer
                transition-all
                hover:bg-gray-50
                ${!notification.isRead ? "bg-green-50" : "bg-white"}
            `}
        >

            <div className="flex justify-between">

                <div className="flex gap-3">

                    <div className="mt-1">
                        {getIcon()}
                    </div>

                    <div>

                        <h3 className="font-semibold text-gray-800">
                            {notification.title}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
                        </p>

                    </div>

                </div>

                <div className="flex items-start gap-2">

                    {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-green-600 mt-2"></span>
                    )}

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

        </div>

    );
}