import { useState } from "react";
import { register } from "../services/authService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Register({ onRegisterSuccess, goLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

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
      });

      setLoading(false);

toast.success("🎉 Account created successfully! Please login.");

if (onRegisterSuccess) {
    onRegisterSuccess();
}
    } catch (err) {
      setLoading(false);

      toast.error(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-950 px-4">

      <form
        onSubmit={handleRegister}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >

        <h2 className="text-3xl font-bold text-center text-green-700">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Join EcoBridge 🌱
        </p>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-4"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>

        </div>

        <p
          className={`text-sm mb-4 ${
            passwordStrength() === "Strong"
              ? "text-green-600"
              : passwordStrength() === "Medium"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          Password Strength: {passwordStrength()}
        </p>

        <div className="relative mb-2">

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-4"
          >
            {showConfirmPassword ? (
              <FiEyeOff />
            ) : (
              <FiEye />
            )}
          </button>

        </div>

        {form.confirmPassword.length > 0 && (
          <p
            className={`text-sm mb-4 ${
              form.password === form.confirmPassword
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {form.password === form.confirmPassword
              ? "✓ Passwords match"
              : "✗ Passwords do not match"}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?

          <button
            type="button"
            onClick={goLogin}
            className="text-green-700 font-semibold ml-2"
          >
            Login
          </button>

        </p>

      </form>

    </div>
  );
}