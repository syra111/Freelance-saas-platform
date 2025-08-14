import React from "react";
import { Link } from "react-router-dom";


const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg shadow-sm p-5 hover:shadow-lg transition duration-300 bg-white flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-green-600">{job.title}</h2>
        <p className="text-gray-600 mt-2">{job.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-semibold">Deadline:</span> {new Date(job.deadline).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Budget:</span> {job.budget}
        </p>
      </div>
        <Link to={`/jobs/${job._id}`}  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          View Details
        </Link>

      {/* <button>
        Apply Now
      </button> */}
    </div>
  );
};

export default JobCard;
