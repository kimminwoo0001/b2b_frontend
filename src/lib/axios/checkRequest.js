import i18next from "i18next";

export default function checkRequest(data) {
  const { status, message } = data
  const tokenStatus = ['403', '401'];
  const successStatus = ['201', '200'];
  const dupliStatus = '406';
  const errorStatus = '500';
  const notFoundStatus = '404';
  const pagePath = document.location.pathname;
  let returnValue = {
    value: false,
    objStore: {
      status: "",
      confirmFuncId: "",
      desc: "",
      message: message,
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
        message: message,
        isOpen: false
      }
    }
  } else if (dupliStatus === status) {
    returnValue = {
      value: false,
      objStore: {
        status: "duplication",
        confirmFuncId: "/login",
        // desc: i18next.t("alert.logout.sessionExpires"),
        desc: i18next.t("alert.logout.duplication"),
        isOpen: true,
        message: message,
      }
    }
  } else if (tokenStatus.includes(status)) {
    returnValue = {
      value: false,
      objStore: {
        status: "token",
        confirmFuncId: pagePath === "/login" ? "token" : "/login",
        // desc: i18next.t("alert.logout.sessionExpires"),
        desc: pagePath === "/login" ? i18next.t("alert.logout.loginFail") : i18next.t("alert.logout.sessionExpires"),
        isOpen: true,
        message: message,
      }
    }
  } else if (errorStatus === status) {
    returnValue = {
      value: false,
      objStore: {
        status: "error",
        confirmFuncId: "",
        desc: i18next.t("alert.desc.serverError"),
        isOpen: true,
        message: message,
      }
    }
  } else if (notFoundStatus === status) {
    returnValue = {
      value: false,
      objStore: {
        status: "notFound",
        confirmFuncId: "",
        desc: i18next.t("alert.desc.serverError"),
        isOpen: true,

      }
    }
  }

  console.log(returnValue);
  return returnValue;
}