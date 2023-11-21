
import axios from "axios";
import { API } from "../../constants/const.api";

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(`${API}/api/post-categories`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};