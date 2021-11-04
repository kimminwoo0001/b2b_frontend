import axios from "axios";
import qs from "qs";

const B2B_Request = async ({ url, paramData }) => {
  const result = await axios.request({
    method: "GET",
    url: url,
    params: {
      paramData
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  });

  if (result.data === "") {
    throw new Error("No Have Data.");
  }
  return result;
}

export default B2B_Request;