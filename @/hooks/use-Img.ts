import axios from "axios";

const server = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
});

// GET Images
export const getImmgs = async () => {
  return await server.get("/imgs");
};

// POST Product
export const postImg = async (imgData) => {
  return await server.post("/imgs", imgData);
};
