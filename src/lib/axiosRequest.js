
import qs from "qs";
import axios from "axios";

const axiosRequest = async (url, paramData, callback, method = "GET") => {
  await axios.request({
    method: method,
    url: url,
    params: paramData,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    }
  }).then(e => {
    // 여기서도 에러를 던지면 아래의 catch로 이동된다.
    // throw Error("에러 테스트")
    if (callback) {
      callback(e);
    }
  }).catch(error => {
    console.log("error test : ", error)
  })
}

export default axiosRequest;