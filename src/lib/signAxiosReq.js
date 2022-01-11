import qs from "qs";
import axios from "axios";
import checkRequest from "./checkRequest";

const signAxiosReq = async (
  url,
  paramData,
  callback,
  failCallback) => {
  await axios({
    method: "post",
    url: url,
    data: paramData,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  })
    .then((e) => {
      console.log("e: ", e)
      if (e.data.message.toUpperCase() === "OK") {
        if (callback) {
          callback(true);
          //console.log(e.data.response);
        } else {
          //sessionStorage.clear();
          //history.push("/login");
        }
      } else {
        failCallback(e.data.message);
      }
    })
    .catch((error) => {
      console.log("error test : ", error);
    });
}

export default signAxiosReq;