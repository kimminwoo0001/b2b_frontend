import i18next from "i18next";

export default function checkRequest(status) {
  const tokenStatus = ['403', '401'];
  const successStatus = ['201', '200'];
  const errorStatus = '500';
  const notFoundStatus = '404';
  const pagePath = document.location.pathname;
  let returnValue = {
    value: false,
    objStore: {
      status: "",
      confirmFuncId: "",
      desc: "",
      isOpen: false
    }
  };

  if (successStatus.includes(status)) {
    returnValue = {
      value: true,
      objStore: {
        status: "success",
        confirmFuncId: "",
        desc: "",
        isOpen: false
      }
    }
  } else if (tokenStatus.includes(status)) {
    returnValue = {
      value: false,
      objStore: {
        status: "token",
        confirmFuncId: "token",
        // desc: i18next.t("alert.logout.sessionExpires"),
        desc: pagePath === "/login" ? i18next.t("alert.logout.loginFail") : i18next.t("alert.logout.sessionExpires"),
        isOpen: true
      }
    }
  } else if (errorStatus === status) {
    returnValue = {
      value: false,
      objStore: {
        status: "error",
        confirmFuncId: "",
        desc: i18next.t("alert.desc.serverError"),
        isOpen: true
      }
    }
  } else if (notFoundStatus === status) {
    returnValue = {
      value: false,
      objStore: {
        status: "notFound",
        confirmFuncId: "",
        desc: i18next.t("alert.desc.serverError"),
        isOpen: true
      }
    }
  }

  console.log(returnValue);
  return returnValue;
}