import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is EcoBridge?",
    answer:
      "EcoBridge is a smart waste management platform that connects waste generators with nearby recyclers using intelligent location-based matching.",
  },
  {
    question: "Who can use EcoBridge?",
    answer:
      "Anyone can register either as a Generator to publish recyclable waste or as a Recycler to discover and reserve nearby waste.",
  },
  {
    question: "How does matching work?",
    answer:
      "EcoBridge calculates the nearest waste listings using geographical coordinates and intelligent distance calculations.",
  },
  {
    question: "Can I upload waste images?",
    answer:
      "Yes. Every waste listing can include images to help recyclers identify the material before reserving it.",
  },
  {
    question: "Is EcoBridge free?",
    answer:
      "Yes. EcoBridge is free to use and encourages sustainable recycling practices.",
  },
];

export default function FAQ() {

  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-24 bg-white">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-800">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-14">
          Everything you need to know about EcoBridge.
        </p>

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="border rounded-2xl overflow-hidden shadow-sm"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >

                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                <FaChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              <AnimatePresence>

                {open === index && (

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-gray-600"
                  >

                    {faq.answer}

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}