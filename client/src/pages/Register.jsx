import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";


const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer"
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
const res = await axiosInstance.post("/auth/register", form);
      alert("Registered successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <div>
        <input type="text" name="name" placeholder="Name"
          value={form.name} onChange={handleChange}
          className="w-full border px-3 py-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange}
          className="w-full border px-3 py-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange}
          className="w-full border px-3 py-2 rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <select name="role" onChange={handleChange} className="w-full border px-3 py-2 rounded">
        <option value="freelancer">Freelancer</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default Register;
