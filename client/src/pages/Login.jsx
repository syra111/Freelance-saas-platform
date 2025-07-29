import axiosInstance from "../api/axiosInstance";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Frontend validation
  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setServerError(""); // Clear error on new input
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
       const res = await axiosInstance.post("/auth/login", form);
      
      // Store token (temporarily in localStorage)
      localStorage.setItem("token", res.data.token);
      
      alert("Login successful!");
      console.log("User:", res.data.user); // Contains user details

      // TODO: redirect to dashboard using useNavigate (next day)

    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setServerError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Login</h2>

      {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
