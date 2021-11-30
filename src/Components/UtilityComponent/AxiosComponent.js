import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import AlertModal from "./AlertModal";

const AxiosComponent = ({ url, paramData, callback, method = "GET" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertDesc, setAlertDesc] = useState("");
  const [status, setStatus] = useState();
  let history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    axiosRequest();
  }, [])

  const checkRequest = (status) => {
    if (['403', '401'].includes(status)) {
      setAlertDesc(t("alert.logout.sessionExpires"));
      setIsOpen(true);
      return false;
    } else if (['201', '200'].includes(status)) {
      return true
    } else if ('500' === status) {
      setAlertDesc(t("alert.desc.serverError"));
      setIsOpen(true);
      return false;
    }
  }

  const status500Func = () => {
    sessionStorage.clear();
    history.push("/login");
  }

  const axiosRequest = async () => {
    if (method === "GET") {
      await axios.request({
        method: method,
        url: url,
        params: paramData,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      }).then(e => {
        if (checkRequest(e.data.status)) {
          if (callback) {
            callback(e.data.response);
          } else {
            sessionStorage.clear();
            history.push("/login");
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
            history.push("/login");
          }
        }
      }).catch(error => {
        console.log("error test : ", error)
      })
    }
  }

  return (
    <>
      <AlertModal
        desc={alertDesc}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default memo(AxiosComponent);