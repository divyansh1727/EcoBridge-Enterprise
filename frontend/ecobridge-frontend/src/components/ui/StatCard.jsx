import AppCard from "./AppCard";
import { motion } from "framer-motion";

export default function StatCard({

    title,
    value,
    icon,
    color = "text-[#A4B465]",
    bg = "bg-[#A4B465]/10"

}) {

    return (

        <motion.div

            whileHover={{
                y: -8,
                scale: 1.02,
            }}

            transition={{
                duration: 0.25,
            }}

        >

            <AppCard>

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm font-medium uppercase tracking-wider text-gray-400">

                            {title}

                        </p>

                        <h2 className="mt-4 text-4xl font-black text-white">

                            {value}

                        </h2>

                    </div>

                    <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${bg} ${color}`}
                    >

                        {icon}

                    </div>

                </div>

            </AppCard>

        </motion.div>

    );

}