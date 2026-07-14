import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowRight, FaTachometerAlt } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "How it Works", id: "how-it-works" },
    { name: "Testimonials", id: "testimonials" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavClick = (id) => {
    setIsOpen(false);

    // If user is inside an internal page (e.g., dashboard), route back home first
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: id } });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // Resolves portal path dynamically based on token user rules
  const getDashboardPath = () => {

    switch (user?.role) {

        case "ROLE_RECYCLER":
            return "/recycler";

        case "ROLE_ADMIN":
            return "/admin/dashboard";

        case "ROLE_GENERATOR":
            return "/generator";

        default:
            return "/";
    }

};

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#101411]/80 px-6 py-3 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,.35)]">
        
        {/* Logo */}
        <div
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex cursor-pointer items-center gap-3"
        >
          <img
            src={logo}
            alt="EcoBridge"
            className="h-14 w-14 transition duration-300 hover:rotate-6"
          />
          <div className="hidden sm:block">
            <h2 className="text-xl font-black text-white">EcoBridge</h2>
            <p className="text-xs text-gray-400">Smart Waste Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="cursor-pointer text-gray-300 font-medium transition duration-300 hover:text-[#A4B465]"
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <>
              <button
                onClick={() => navigate(getDashboardPath())}
                className="inline-flex items-center gap-2 rounded-xl border border-[#A4B465]/30 bg-[#A4B465]/10 px-4 py-2 text-sm font-medium text-[#A4B465] transition hover:bg-[#A4B465]/20"
              >
                <FaTachometerAlt /> Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-3 rounded-xl bg-[#A4B465] px-6 py-3 font-semibold text-white transition duration-300 hover:bg-[#93a254]"
            >
              Login
              <FaArrowRight />
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-white lg:hidden"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-3 rounded-2xl border border-white/10 bg-[#101411]/95 p-6 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left text-lg text-gray-300 transition hover:text-[#A4B465]"
                >
                  {item.name}
                </button>
              ))}
              
              <div className="mt-2 h-px bg-white/10" />

              {user ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate(getDashboardPath());
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#A4B465]/30 bg-[#A4B465]/10 py-3 text-center font-semibold text-[#A4B465]"
                  >
                    <FaTachometerAlt /> Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/login");
                  }}
                  className="rounded-xl bg-[#A4B465] py-3 font-semibold text-white text-center"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}