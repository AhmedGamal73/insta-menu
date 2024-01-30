import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3001",
});

// GET Images
export const getImmgs = async () => {
  return await server.get("/imgs");
};

// POST Product
export const postImg = async (imgData) => {
  return await server.post("/imgs", imgData);
};
