import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../context/UserContext";
import API from "../api/axios";

const Profile = () => {
  const { user, setUser, loading } = User();
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    skillsToTeach: "",
    skillsToLearn: "",
    profilePic: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        bio: user.bio || "",
        skillsToTeach: user.skillsToTeach ? user.skillsToTeach.join(", ") : "",
        skillsToLearn: user.skillsToLearn ? user.skillsToLearn.join(", ") : "",
        profilePic: user.profilePic || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await API.put("/users/profile", {
        username: formData.username,
        bio: formData.bio,
        skillsToTeach: formData.skillsToTeach.split(",").map((s) => s.trim()),
        skillsToLearn: formData.skillsToLearn.split(",").map((s) => s.trim()),
        profilePic: formData.profilePic,
      });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || "",
        bio: user.bio || "",
        skillsToTeach: user.skillsToTeach ? user.skillsToTeach.join(", ") : "",
        skillsToLearn: user.skillsToLearn ? user.skillsToLearn.join(", ") : "",
        profilePic: user.profilePic || "",
        email: user.email || "",
      });
    }
    setIsEditing(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition"
          >
            Skill Swap
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          {/* User Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <img
              src={
                formData.profilePic ||
                "https://www.gravatar.com/avatar/?d=mp&s=200"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover shadow-md"
            />
            <div className="mt-4 md:mt-0 w-full">
              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {formData.username}
                  </h2>
                  <p className="text-gray-500">{formData.email}</p>
                </>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={formData.email}
                    readOnly
                    className="w-full border px-4 py-2 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800">Bio</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ) : (
              <p className="mt-2 text-gray-600">
                {formData.bio || "No bio added yet."}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Skills to Teach
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  name="skillsToTeach"
                  value={formData.skillsToTeach}
                  onChange={handleChange}
                  placeholder="Comma separated values"
                  className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skillsToTeach ? (
                    formData.skillsToTeach.split(",").map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Skills to Learn
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  name="skillsToLearn"
                  value={formData.skillsToLearn}
                  onChange={handleChange}
                  placeholder="Comma separated values"
                  className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skillsToLearn ? (
                    formData.skillsToLearn.split(",").map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium shadow-sm"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Profile Pic */}
          {isEditing && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800">
                Profile Picture URL
              </h3>
              <input
                type="text"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="mt-10 flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
