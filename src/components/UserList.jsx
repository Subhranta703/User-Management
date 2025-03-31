import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      const data = await getUsers(page);
      setUsers(data.data);
    } catch (error) {
      console.error(error);
      alert('Failed to load users');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response && response.status === 204) {
        alert("User deleted successfully!");
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Users List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar} alt={user.first_name} className="rounded-circle" />
              </td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
