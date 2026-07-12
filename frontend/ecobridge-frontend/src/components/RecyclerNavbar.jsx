export default function RecyclerNavbar() {

    const name =
        localStorage.getItem("userName");

    return (

        <div className="h-20 bg-white shadow flex justify-between items-center px-8">

            <h2 className="text-2xl font-bold text-green-700">

                Recycler Dashboard

            </h2>

            <div className="font-semibold">

                👋 Hi, {name}

            </div>

        </div>

    );

}