import qs from "qs";
import axios from "axios";
import checkRequest from "./checkRequest";
import { createStore } from 'redux';
import persistReducer from '../redux/modules/index';
import { SetStatus, SetDesc, SetIsOpen, SetConfirmFuncId } from '../redux/modules/modalvalue';



const axiosRequest = async (method = "GET", url, paramData, callback, failCallback) => {
  //const dispatch = useDispatch();
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
      const check = checkRequest(e.data.status);
      console.log("check", check);
      if (check?.value) {
        if (callback) {
          callback(e.data.response);
        } else {
          console.log(check.objStore);
          // sessionStorage.clear();
          //history.push("/login");
        }
      } else {
        failCallback(check.objStore)
      }
    }).catch(error => {
      console.log("error test : ", error)
    })
  } else if (method?.toUpperCase() === "POST") {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    await axios.post(url, paramData, {
      headers: headers,
      withCredentials: true
    }).then(e => {
      const check = checkRequest(e.data.status);
      console.log("check", check);
      if (check.value) {
        if (callback) {
          callback(e.data.response);
        } else {
          //sessionStorage.clear();
          //history.push("/login");
        }
      } else {
        failCallback(check.objStore)
      }
    }).catch(error => {
      console.log("error test : ", error)
    })
  }
};

export default axiosRequest;
