import AppCard from "./AppCard";

export default function StatCard({

    title,

    value,

    icon,

    color = "text-green-600",

    bg = "bg-green-50"

}) {

    return (

        <AppCard>

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500 font-medium">

                        {title}

                    </p>

                    <h2
                        className={`text-3xl md:text-4xl font-bold mt-3 ${color}`}
                    >

                        {value}

                    </h2>

                </div>

                <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${bg}`}
                >

                    {icon}

                </div>

            </div>

        </AppCard>

    );

}