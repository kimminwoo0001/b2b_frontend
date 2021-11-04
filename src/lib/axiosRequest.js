import axios from "axios";
import qs from "qs";

const axiosRequest = async (url, paramData, callback, method="GET") => {
  await axios.request({
    method: method,
    url: url,
    params: paramData,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  }).then(e => {
    if (callback) {
      callback(e);
    }
  }).catch(error => {
    console.log("error test : ", error)
  })
}

export default axiosRequest;