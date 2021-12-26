import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  console.log("getAll", baseUrl);
  return axios.get(baseUrl);
};

const create = (newObject) => {
  console.log("create", newObject, baseUrl);
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  console.log("update", id, newObject, baseUrl);
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteEntry = (id) => {
  console.log("deleteEntry", id, baseUrl);
  return axios.delete(`${baseUrl}/${id}`);
};

const service = { getAll, create, update, deleteEntry };
export default service;