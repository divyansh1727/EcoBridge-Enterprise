import { motion } from "framer-motion";
import { FaQuoteLeft, FaLeaf } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Waste Generator",
    review:
      "EcoBridge helped me find nearby recyclers within minutes. The process was smooth and incredibly simple.",
  },
  {
    name: "Priya Patel",
    role: "Recycler",
    review:
      "The smart matching feature saves me hours every week. I can instantly find nearby waste listings.",
  },
  {
    name: "GreenCycle Pvt. Ltd.",
    role: "Recycling Organization",
    review:
      "A well-designed platform that bridges the gap between waste producers and recycling companies.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            Loved by our Community
          </h2>

          <p className="text-gray-400 mt-4">
            Hear what our early users have to say.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-xl"
            >

              <FaQuoteLeft className="text-green-400 text-3xl mb-6" />

              <p className="text-gray-300 leading-7">
                {item.review}
              </p>

              <div className="flex items-center mt-8">

                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">

                  <FaLeaf />

                </div>

                <div className="ml-4">

                  <h4 className="font-bold">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-400">
                    {item.role}
                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}