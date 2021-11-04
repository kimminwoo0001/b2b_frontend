import axios from "axios";
import qs from "qs";

const B2B_Request = async (url, paramData, callback) => {
  await axios.request({
    method: "GET",
    url: url,
    params: {
      paramData
    },
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

export default B2B_Request;