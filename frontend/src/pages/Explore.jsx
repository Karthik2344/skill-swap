import React, { useEffect, useState } from "react";
import Card from "../components/card";
import RequestModal from "../components/RequestModal";
import API from "../api/axios";

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users/get-users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSendRequestClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Explore Users</h1>
        <p className="text-gray-600 mt-2">
          Discover new people and send barter requests.
        </p>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && users.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          <p>No users available to explore right now.</p>
        </div>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map((u) => (
          <div
            key={u._id}
            className="transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <Card user={u} onSendRequest={handleSendRequestClick} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <RequestModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Explore;
