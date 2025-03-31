import axios from "axios";

const BASE_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      return response.data; // Return data part of response
    } catch (error) {
      console.error("Error in getUsers:", error);
      throw error;
    }
  };

  export const updateUser = async (id, user) => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
      return response;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error; // Rethrow to be handled in the component
    }
  };
  

export const deleteUser = async (id) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`);
  return response;
};

