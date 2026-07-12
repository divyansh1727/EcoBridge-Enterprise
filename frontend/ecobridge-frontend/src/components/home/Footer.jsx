import logo from "../../assets/logo.png";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";



export default function Footer() {
  const navigate = useNavigate();
const location = useLocation();


const goToSection = (id) => {

    if (location.pathname !== "/") {

        navigate("/");

        setTimeout(() => {
            document
                .getElementById(id)
                ?.scrollIntoView({
                    behavior: "smooth",
                });
        }, 300);

    } else {

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
            });

    }

}; 

  return (

    <footer className="bg-gray-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <img
              src={logo}
              className="w-16 mb-4"
            />

            <p className="text-gray-400">

              Smart Waste Management Platform
              connecting Generators with Recyclers.

            </p>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">

    <li
        onClick={() => goToSection("home")}
        className="cursor-pointer hover:text-green-400"
    >
        Home
    </li>

    <li
        onClick={() => goToSection("features")}
        className="cursor-pointer hover:text-green-400"
    >
        Features
    </li>

    <li
        onClick={() => goToSection("how-it-works")}
        className="cursor-pointer hover:text-green-400"
    >
        How it Works
    </li>

    <li
        onClick={() => goToSection("testimonials")}
        className="cursor-pointer hover:text-green-400"
    >
        Testimonials
    </li>

    <li
        onClick={() => goToSection("faq")}
        className="cursor-pointer hover:text-green-400"
    >
        FAQ
    </li>

    <li
        onClick={() => goToSection("contact")}
        className="cursor-pointer hover:text-green-400"
    >
        Contact
    </li>

</ul>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Resources
            </h3>

            <ul className="space-y-2 text-gray-400">

              <li>Documentation</li>
              <li>Privacy Policy</li>
              <li>Terms</li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Connect
            </h3>

            <div className="flex gap-4 text-2xl">

              <a
    href="https://github.com/divyansh1727"
    target="_blank"
    rel="noreferrer"
    >
    <FaGithub className="cursor-pointer hover:text-green-400" />
    </a>


              <a
    href="https://linkedin.com/in/divyansh1727"
    target="_blank"
    rel="noreferrer"
>
  
    <FaLinkedin className="cursor-pointer hover:text-green-400" />
    
</a>

              <FaEnvelope className="cursor-pointer hover:text-green-400" />

            </div>

          </div>

        </div>

        <hr className="my-10 border-gray-800" />

        <p className="text-center text-gray-500">

          © 2026 EcoBridge. Built with ❤️ using Spring Boot, React &
          Microservices.

        </p>

      </div>

    </footer>

  );

}