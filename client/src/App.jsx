import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar';
import Layout from "./components/Layout";

import Footer from './components/Footer';

function App() {

  return (
    <>
    <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Layout>
    </>
  )
}

export default App
