import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import AppButton from "./AppButton";

export default function DeleteModal({
    open,
    title,
    onCancel,
    onDelete,
}) {

    return (

        <AnimatePresence>

            {open && (

                <motion.div

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-5"

                >

                    <motion.div

                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: 20,
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}

                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: 20,
                        }}

                        transition={{
                            duration: 0.25,
                        }}

                        className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#161B18] p-8 shadow-[0_20px_60px_rgba(0,0,0,.45)]"

                    >

                        <div className="text-center">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 text-4xl text-red-400">

                                <FaTrashAlt />

                            </div>

                            <h2 className="mt-6 text-3xl font-black text-white">

                                Delete Waste

                            </h2>

                            <p className="mt-5 leading-7 text-gray-400">

                                Are you sure you want to permanently delete

                            </p>

                            <p className="mt-3 text-xl font-semibold text-[#A4B465] break-words">

                                "{title}"

                            </p>

                            <p className="mt-6 text-sm text-red-400">

                                This action cannot be undone.

                            </p>

                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                            <AppButton
                                variant="secondary"
                                onClick={onCancel}
                                className="flex-1"
                            >

                                <FaTimes />

                                Cancel

                            </AppButton>

                            <AppButton
                                variant="danger"
                                onClick={onDelete}
                                className="flex-1"
                            >

                                <FaTrashAlt />

                                Delete

                            </AppButton>

                        </div>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>

    );

}