import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
export default function Login() {

    const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginUser } = useAuth();
  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  // Email Validation
if (!form.email.trim()) {
  toast.error("Email is required");
  return;
}

// Valid Email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(form.email)) {
  toast.error("Enter a valid email address");
  return;
}

// Password Validation
if (!form.password.trim()) {
  toast.error("Password is required");
  return;
}

if (form.password.length < 6) {
  toast.error("Password must be at least 6 characters");
  return;
}

setLoading(true);
  

  try {
    const response = await login(form);

    const data = response.data;

    // Save tokens
    localStorage.setItem("accessToken", data.accessToken);
    

    // Save user details
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("userEmail", data.user.email);

    // Save role
    if (data.user.roles && data.user.roles.length > 0) {
      localStorage.setItem("userRole", data.user.roles[0].name);
      loginUser({
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    role: data.user.roles[0].name
});

toast.success(`Welcome ${data.user.name}!`);
    }
    setLoading(false);

    const role = data.user.roles[0].name;

if (role === "ROLE_ADMIN") {
    navigate("/admin/dashboard");
}
else if (role === "ROLE_RECYCLER") {
    navigate("/recycler");
}
else if (role === "ROLE_GENERATOR") {
    navigate("/generator");
}
else {
    navigate("/");
}


  } catch (err) {
    const message =
    err.response?.data?.message ||
    "Invalid email or password";

setError(message);

toast.error(message);
setLoading(false);
  }
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#065f46] to-[#052e16] flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-md">

      {/* Logo */}

      <div className="text-center mb-8">

        <img
          src={logo}
          alt="EcoBridge"
          className="w-20 mx-auto mb-4"
        />

        <h1 className="text-4xl font-black text-white">
          Welcome Back
        </h1>

        <p className="text-green-200 mt-2">
          Sign in to continue to EcoBridge
        </p>

      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8"
      >

        {/* Email */}

        <div className="mb-5">

          <label className="text-green-100 text-sm">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-2 w-full rounded-xl bg-white/10 border border-green-200/20 p-3 text-white placeholder:text-green-200 outline-none focus:border-green-400"
          />

        </div>

        {/* Password */}

        <div className="mb-4">

          <label className="text-green-100 text-sm">
            Password
          </label>

          <div className="relative mt-2">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl bg-white/10 border border-green-200/20 p-3 pr-12 text-white placeholder:text-green-200 outline-none focus:border-green-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-green-200"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

          </div>

        </div>

        {/* Error */}

        {error && (
          <p className="text-red-300 mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Login */}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-green-500 py-3 font-bold text-white transition hover:bg-green-400 disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        {/* Divider */}

        {/* Divider */}

<div className="flex items-center gap-4 my-6">

    <div className="flex-1 h-px bg-white/20"></div>

    <span className="text-green-200 text-sm">
        OR CONTINUE WITH
    </span>

    <div className="flex-1 h-px bg-white/20"></div>

</div>

<div className="space-y-3">

    {/* Google */}

    <button
        type="button"
        onClick={() =>
            window.location.href =
                "http://localhost:8080/oauth2/authorization/google"
        }
        className="w-full flex items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-gray-800 shadow hover:bg-gray-100 transition"
    >
        <FcGoogle size={24} />
        Continue with Google
    </button>

    {/* GitHub */}

    <button
        type="button"
        onClick={() =>
            window.location.href =
                "http://localhost:8080/oauth2/authorization/github"
        }
        className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#24292f] py-3 font-semibold text-white shadow hover:bg-[#1b1f23] transition"
    >
        <FaGithub size={22} />
        Continue with GitHub
    </button>

</div>

        {/* Register */}

        <p className="text-center text-green-100 mt-6">

          Don't have an account?

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="ml-2 font-bold text-green-300 hover:text-green-200"
          >
            Register
          </button>

        </p>

      </form>

    </div>

  </div>
);
}
