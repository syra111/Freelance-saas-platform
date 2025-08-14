import { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs once when provider mounts
  useEffect(() => {
    getJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, loading, getJobs }}>
      {children}
    </JobContext.Provider>
  );
};
