import axios from "axios";
const baseUrl = "/api/blogs";

const loadUser = () => {
  const user = window.localStorage.getItem("loggedUser");
  return user ? JSON.parse(user) : null;
};

const getConfig = () => ({
  headers: { Authorization: `Bearer ${loadUser().token}` },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const like = async (updatedObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response;
};

const comment = async (commentObject, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject);
  return response.data;
}

export default { getAll, create, like, remove, comment };
