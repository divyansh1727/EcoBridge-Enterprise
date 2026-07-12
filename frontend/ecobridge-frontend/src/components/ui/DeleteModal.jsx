export default function DeleteModal({
    open,
    title,
    onCancel,
    onDelete
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-5">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

                <div className="text-center">

                    <div className="text-6xl mb-4">
                        🗑️
                    </div>

                    <h2 className="text-2xl font-bold">
                        Delete Waste
                    </h2>

                    <p className="text-gray-600 mt-4">

                        Are you sure you want to delete

                    </p>

                    <p className="font-semibold mt-2">

                        "{title}"

                    </p>

                    <p className="text-red-500 mt-5">

                        This action cannot be undone.

                    </p>

                </div>

                <div className="flex gap-4 mt-8">

                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-xl border"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}