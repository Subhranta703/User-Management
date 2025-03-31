import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Error fetching user data.");
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
      if (response.status === 200) {
        alert("User updated successfully!");
        navigate("/users");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={user.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
