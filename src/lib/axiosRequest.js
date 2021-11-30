
import qs from "qs";
import axios from "axios";
import checkRequest from "./checkRequest";

const axiosRequest = async (url, paramData, callback, method = "GET", history) => {
  if (method === "GET") {
    await axios.request({
      method: method,
      url: url,
      params: paramData,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    }).then(e => {
      // 여기서도 에러를 던지면 아래의 catch로 이동된다.
      // throw Error("에러 테스트")
      if (checkRequest(e.data.status)) {
        if (callback) {
          callback(e.data.response);
        } else {
          sessionStorage.clear();
          //history.push("/login");
        }
      }
    }).catch(error => {
      console.log("error test : ", error)
    })
  } else if (method.toUpperCase() === "POST") {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    await axios.post(url, paramData, {
      headers: headers,
      withCredentials: true
    }).then(e => {
      if (checkRequest(e.data.status)) {
        if (callback) {
          callback(e.data.response);
        } else {
          sessionStorage.clear();
          //history.push("/login");
        }
      }
    }).catch(error => {
      console.log("error test : ", error)
    })
  }
}

export default axiosRequest;