import i18next from "i18next";

export default function checkRequest(status) {
  if (status === '403' || status === '401') {
    if (!alert(i18next.t("alert.logout.sessionExpires"))) {
      return true;
    }
  } else if (['201', '200'].includes(status)) {
    return true
  }
  else {
    return false;
  }
}

