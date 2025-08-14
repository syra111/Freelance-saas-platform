import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";   
import { useContext } from "react";

export default function JobDetail() {
  const { id } = useParams(); 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await API.get(`/jobs/${id}`);
        setJob(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = useContext(AuthContext).token;
      await API.post("/bids",
        {
          jobId: id,
          bidAmount,
          timeline,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Bid placed successfully!");
      setBidAmount("");
      setTimeline("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to place bid");
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading job...</p>;
  }

  if (!job) {
    return <p className="text-center py-10 text-red-500">Job not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Job Info */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">{job.title}</h1>
        <p className="mt-2 text-gray-600">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-700">
          <p>
            <span className="font-medium">Budget:</span> ${job.budget || "N/A"}
          </p>
          <p>
            <span className="font-medium">Timeline:</span> {new Date(job.timeline).toLocaleDateString() || "N/A"}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded ${
                job.status === "open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {job.status}
            </span>
          </p>
        </div>
      </div>

      {/* Place Bid Form */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Place Your Bid</h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}

        <form onSubmit={handlePlaceBid} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bid Amount ($)</label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Timeline (days)</label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Submit Bid
          </button>
        </form>
      </div>
    </div>
  );
}
