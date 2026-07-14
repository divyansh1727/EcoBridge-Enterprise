import { motion } from "framer-motion";

export default function PageHeader({

    title,
    subtitle,

}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: 0.45,
            }}

            className="mb-10"

        >

            <span className="inline-block rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 px-4 py-2 text-sm font-medium tracking-wide text-[#C7D59F]">

                DASHBOARD

            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">

                {title}

            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-400">

                {subtitle}

            </p>

        </motion.div>

    );

}