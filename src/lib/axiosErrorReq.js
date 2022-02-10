// 데이터 오류로 인해 null 값을 받을 시, 슬랙으로 받을 수 있도록 백엔드에 요청.

import { API } from "../Pages/config";
import axiosRequest from "./axiosRequest";

export default function axiosErrorReq(errUrl, errParam, errResult) {

  let url = `${API}/lolapi/`;
  let params = {
    url: errUrl,
    param: errParam,
    result: errResult
  }

  axiosRequest(
    undefined,
    url,
    params,
    function (e) {
      console.log("Success: Send Error Msg")
    },
    function (objStore) {
      console.log("Fail: Send Error Msg")
    }
  );
}