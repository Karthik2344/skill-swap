import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Requests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const [sentRes, receivedRes] = await Promise.all([
        API.get("/barters/sent"),
        API.get("/barters/requests"),
      ]);

      setSentRequests(
        Array.isArray(sentRes.data.data) ? sentRes.data.data : []
      );
      setReceivedRequests(
        Array.isArray(receivedRes.data.data) ? receivedRes.data.data : []
      );
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await API.put(`/barters/${id}/respond`, { status: action });
      setReceivedRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: action } : req))
      );
    } catch (err) {
      console.error(err);
      alert("❌ Action failed");
    }
  };

  const handleCancel = async (id) => {
    try {
      await API.delete(`/barters/${id}/cancel`);
      setSentRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to cancel request");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        📬 My Requests
      </h1>

      {loading && <p className="text-center">Loading requests...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Sent Requests */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Sent Requests
            </h2>
            {sentRequests.length === 0 ? (
              <p className="text-gray-500">No sent requests.</p>
            ) : (
              <div className="space-y-5">
                {sentRequests.map((req) => (
                  <div
                    key={req._id}
                    className="p-5 border rounded-xl shadow-md bg-white hover:shadow-lg transition"
                  >
                    <p>
                      <strong>To:</strong>{" "}
                      {req.recieverId?.username || "Unknown"}
                    </p>
                    <p>
                      <strong>Wants to learn:</strong>{" "}
                      {req.requestedSkill?.join(", ")}
                    </p>
                    <p>
                      <strong>Offers:</strong> {req.offeredSkill?.join(", ")}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`${
                          req.status === "pending"
                            ? "text-yellow-600"
                            : req.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        } font-medium capitalize`}
                      >
                        {req.status}
                      </span>
                    </p>

                    {req.status === "pending" && (
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Received Requests */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Received Requests
            </h2>
            {receivedRequests.length === 0 ? (
              <p className="text-gray-500">No received requests.</p>
            ) : (
              <div className="space-y-5">
                {receivedRequests.map((req) => (
                  <div
                    key={req._id}
                    className="p-5 border rounded-xl shadow-md bg-white hover:shadow-lg transition"
                  >
                    <p>
                      <strong>From:</strong>{" "}
                      {req.senderId?.username || "Unknown"}
                    </p>
                    <p>
                      <strong>Wants to learn:</strong>{" "}
                      {req.requestedSkill?.join(", ")}
                    </p>
                    <p>
                      <strong>Offers:</strong> {req.offeredSkill?.join(", ")}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`${
                          req.status === "pending"
                            ? "text-yellow-600"
                            : req.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        } font-medium capitalize`}
                      >
                        {req.status}
                      </span>
                    </p>

                    {req.status === "pending" && (
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => handleAction(req._id, "accepted")}
                          className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(req._id, "rejected")}
                          className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
