import React, { useEffect } from "react";
import { useContext } from "react";
import JobCard from "../components/JobCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { JobContext } from "../context/JobContext";


const Home = () => {
  const { jobs, loading } = useContext(JobContext);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  console.log(jobs);

  return (
    <div>
      <section
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')`,
          minHeight: "80vh",
        }}
      >
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Next Freelance Project
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Join thousands of freelancers and clients working together.
          </p>
          <a
            href="/jobs"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-semibold"
          >
            Browse Jobs
          </a>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Active Jobs</h2>

          {loading ? (
            <p className="text-green-600">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500">No jobs available right now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {jobs.map((job, index) => (
                <div
                  key={job._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            "This platform helped me land my dream freelance project. The process was smooth, and the clients were professional."
          </p>
        </div>
      </section>

      <section className="py-16 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6">Subscribe to our newsletter for the latest job postings.</p>
        <form className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded text-black"
          />
          <button className="bg-white text-green-600 px-6 py-2 rounded font-semibold">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
