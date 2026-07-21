import { useState } from "react";
import { register } from "../services/authService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Register({ onRegisterSuccess, goLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ROLE_GENERATOR",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const passwordStrength = () => {
    const p = form.password;

    if (p.length < 6) return "Weak";
    if (
      /[A-Z]/.test(p) &&
      /[0-9]/.test(p) &&
      /[^A-Za-z0-9]/.test(p)
    )
      return "Strong";

    return "Medium";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      toast.error("Enter a valid email");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setLoading(false);
      toast.success("🎉 Account created successfully! Please login.");

      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
      navigate("/login");
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  const inputStyle = `
  w-full
  rounded-xl
  bg-white/10
  border
  border-white/10
  p-3
  text-white
  placeholder:text-gray-400
  outline-none
  focus:border-[#A4B465]
  focus:ring-2
  focus:ring-[#A4B465]/20
  transition
  `;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#101411] flex items-center justify-center px-6 py-10">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-[#A4B465]/10 blur-[160px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[170px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleRegister}
          className="w-full rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-white">
            Create your <span className="text-[#A4B465]">EcoBridge</span> Account
          </h2>

          <p className="text-center text-gray-400 mt-2 mb-6 text-sm">
            Start your sustainable recycling journey today.
          </p>

          <div className="mb-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* Password Input Container */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4B465] hover:text-white transition"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          <div className="mb-4">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              passwordStrength() === "Strong"
                ? "bg-green-500/20 text-green-300"
                : passwordStrength() === "Medium"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
            }`}>
              {passwordStrength()} Password
            </span>
          </div>

          {/* Confirm Password Input Container */}
          <div className="relative mb-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4B465] hover:text-white transition"
            >
              {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {form.confirmPassword.length > 0 && (
            <p className={`text-sm mb-4 font-medium ${
              form.password === form.confirmPassword ? "text-green-400" : "text-red-400"
            }`}>
              {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}

          {/* Account Role Toggles */}
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-white text-sm">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "ROLE_GENERATOR" })}
                className={`rounded-xl border p-4 font-medium transition flex flex-col items-center gap-1 ${
                  form.role === "ROLE_GENERATOR"
                    ? "border-[#A4B465] bg-[#A4B465]/15 text-[#A4B465]"
                    : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">♻️</span>
                Generator
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, role: "ROLE_RECYCLER" })}
                className={`rounded-xl border p-4 font-medium transition flex flex-col items-center gap-1 ${
                  form.role === "ROLE_RECYCLER"
                    ? "border-orange-400 bg-orange-500/10 text-orange-400"
                    : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">🚛</span>
                Recycler
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-400 text-xs font-semibold tracking-wider">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => window.location.href =
`${import.meta.env.VITE_API_BASE}/oauth2/authorization/google`}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/95 py-3 font-semibold text-gray-800 shadow hover:bg-gray-100 transition duration-200"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => window.location.href =
`${import.meta.env.VITE_API_BASE}/oauth2/authorization/github`}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#1B211C] border border-white/10 py-3 font-semibold text-white shadow hover:bg-[#242c25] transition duration-200"
            >
              <FaGithub size={22} />
              Continue with GitHub
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold mb-4 transition duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#A4B465] to-[#93a254] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#A4B465]/20"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Redirect Option */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#A4B465] font-semibold ml-2 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}