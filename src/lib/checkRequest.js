import i18next from "i18next";

export default function checkRequest(jsonData) {
  const httpStatus = jsonData.data?.httpStatus;
  if (httpStatus === '403' || httpStatus === '401') {
    if (!alert(i18next.t("alert.logout.sessionExpires"))) {
      console.log("true")
      return true;
    }
  } else {
    return false;
  }
}

