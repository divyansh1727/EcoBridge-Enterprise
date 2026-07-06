import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useState } from "react";


export default function Login({
   onLoginSuccess, 
   goRegister 
  }) {
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
  setLoading(true);

  try {
    const response = await login(form);

    const data = response.data;

    // Save tokens
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

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

    onLoginSuccess();


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
    <div className="min-h-screen flex justify-center items-center bg-green-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white text-black p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
       Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          // required
        />

       <div className="relative mb-4">

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}S
    className="w-full border rounded-lg p-3 pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-4 text-gray-500 hover:text-green-600"
  >
    {showPassword ? <FiEyeOff /> : <FiEye />}
  </button>

</div>

        {error && (
          <p className="text-red-500 mb-3">{error}</p>
        )}

        <button
  type="submit"
  disabled={loading}
  className={`w-full py-2 rounded text-white font-semibold transition ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-500"
  }`}
>
  {loading ? "Logging in..." : "Login"}
</button>
<p className="text-center mt-5 text-gray-600">
  Don't have an account?

  <button
    type="button"
    onClick={goRegister}
    className="ml-2 text-green-700 font-semibold hover:underline"
  >
    Register
  </button>
</p>
      </form>
    </div>
  );
}