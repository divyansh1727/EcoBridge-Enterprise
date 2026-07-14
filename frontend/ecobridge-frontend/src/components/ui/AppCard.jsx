import { motion } from "framer-motion";

export default function AppCard({

    children,
    className = ""

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
                duration: 0.35,
            }}

            whileHover={{
                y: -4,
            }}

            className={`
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-[0_10px_35px_rgba(0,0,0,.25)]
                p-6
                transition-all
                duration-300
                hover:border-[#7A9B33]/30
                hover:shadow-[0_0_40px_rgba(122,155,51,.12)]
                ${className}
            `}

        >

            {children}

        </motion.div>

    );

}