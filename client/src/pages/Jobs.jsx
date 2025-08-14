import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";
import JobCard from "../components/JobCard";

const Jobs = () => {
  const { jobs, loading } = useContext(JobContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-green-600 text-xl">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="pt-20 px-5 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Available Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
