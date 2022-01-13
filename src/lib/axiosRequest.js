import qs from "qs";
import axios from "axios";
import checkRequest from "./checkRequest";

const axiosRequest = async (
  method = "POST",
  url,
  paramData,
  callback,
  failCallback,
  timeout
) => {
  //const dispatch = useDispatch();
  if (method === "GET") {
    await axios({
      method: method,
      url: url,
      params: paramData,
      headers: { Accept: `Bearer  ${paramData.token}` },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    })
      .then((e) => {
        // 여기서도 에러를 던지면 아래의 catch로 이동된다.
        // throw Error("에러 테스트")
        const check = checkRequest(e.data);
        console.log("check", check);
        if (check?.value) {
          if (callback) {
            console.log("checkout", e);
            callback(e.data.response);
          } else {
            console.log(check.objStore);
            // sessionStorage.clear();
            //history.push("/login");
          }
        } else {
          failCallback(check.objStore);
        }
      })
      .catch((error) => {
        console.log("error test : ", error);
      });
  } else if (method?.toUpperCase() === "POST") {
    await axios({
      method: "post",
      url: url,
      data: paramData,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      timeout: timeout,
    })
      .then((e) => {
        console.log("e: ", e)
        const check = checkRequest(e.data);
        console.log("check", check);
        if (check.value) {
          if (callback) {
            callback(e.data.response);
            console.log(e.data.response);
          } else {
            //sessionStorage.clear();
            //history.push("/login");
          }
        } else {
          failCallback(check.objStore);
        }
      })
      .catch((error) => {
        const errMsg = `error: ${error}\nurl: ${url}\nparamData: ${paramData}`
        console.log(errMsg);
        if (timeout === 5000) {
          alert(error);
        }
      });
  }
};

export default axiosRequest;
