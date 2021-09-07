import axios from "axios";
import { API } from "../config";

export const signIn = async ({ id, password }) => {
  const user = { id, password };
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const { data } = await axios.post(`${API}/api/login`, JSON.stringify(user), {
    headers
  });
  return data;
};
