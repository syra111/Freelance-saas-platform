import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Layout from "./components/Layout";
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
function App() {

  return (
    <>
    <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/jobs/:id" element={<JobDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Layout>
    </>
  )
}

export default App
