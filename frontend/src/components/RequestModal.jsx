import React, { useState } from "react";
import API from "../api/axios";
import { User } from "../context/UserContext";

const RequestModal = ({ user, onClose }) => {
  const { user: currentUser } = User();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendRequest = async () => {
    if (
      !currentUser?.skillsToTeach?.length ||
      !currentUser?.skillsToLearn?.length
    ) {
      setError("⚠️ Please update your profile with skills first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/barters/create", {
        recieverId: user._id,
        offeredSkill: currentUser.skillsToTeach,
        requestedSkill: currentUser.skillsToLearn,
      });

      alert("✅ Barter request sent!");
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Send Request to {user.username}
        </h2>

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSendRequest}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
