import React from "react";

const Card = ({ user, onSendRequest }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center">
      <img
        src={user.profilePic || "https://via.placeholder.com/150"}
        alt={user.username}
        className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-200"
      />
      <h2 className="text-lg font-semibold text-gray-800">{user.username}</h2>
      <p className="text-sm text-gray-500">{user.bio || "No bio provided"}</p>

      <div className="mt-4 w-full text-left">
        <p className="text-sm font-medium text-gray-700">Skills to Teach:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {user.skillsToTeach?.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="text-sm font-medium text-gray-700 mt-3">
          Skills to Learn:
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {user.skillsToLearn?.map((skill, idx) => (
            <span
              key={idx}
              className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSendRequest(user)}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full"
      >
        Send Request
      </button>
    </div>
  );
};

export default Card;
