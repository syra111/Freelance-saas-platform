import React from "react";

const JobCard = ({ title, description, priceRange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <span className="block text-green-600 font-semibold mb-4">{priceRange}</span>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
