import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import League from "./Pages/LeagueReport/League";
import Team from "./Pages/TeamReport/Team";
import Solo from "./Pages/PlayerReport/Solo";
import NotFound from "./Pages/ETC/NotFound/NotFound";
import Login from "./Pages/Sign/Login";
import TeamCompare from "./Pages/TeamCompare/TeamCompare";
import PlayerCompare from "./Pages/PlayerCompare/PlayerCompare";
import Video from "./Pages/PathingAnalysis/Video";
import Footer from "./Components/Footer/Footer";
import SingUp from "./Pages/Sign/SignUp";
import ChangePW from "./Pages/Sign/ChangePW";
import { useSelector } from "react-redux";
import PiArea from "./Pages/ETC/PiArea/PiArea";
import GameReport from "./Pages/ProGameReport/GameReport";
import AlertModal from "./Components/UtilityComponent/AlertModal";
import CheckLogin from "./Pages/Sign/CheckLogin";
import Loading from "./Components/LoadingImg/LoadingImg";
import ChannelService from "./Components/UtilityComponent/ChannelService";
import GameReportDetail from "./Pages/ProGameReport/Components/GameReportDetail";
import UiTest from "./Pages/ETC/Ui/UiTest"
import ServerTest from "./Pages/ETC/ServerTest/ServerTest";
import SoloRank from "./Pages/SoloRank/SoloRank";
import { goChangePw, goCheckLogin, goError, goHome, goLeagueReport, goLogin, goPathAnalysis, goPiArea, goPlayerCompare, goPlayerReport, goProGameReport, goServerTest, goSignUp, goSoloRank, goTeamCompare, goTeamReport, goUiTest, proGameReportDetail } from "./lib/pagePath";
import CalendarFilter from "./Components/Filter/Calendar/CalendarFilter";

// import Utility from "./Pages/ETC/Utility/Utility";
// import PickCalculator from "./Pages/ETC/PickCalculator/PickCalculator";

function Routes() {
  //const token = sessionStorage.getItem("token");
  const user = useSelector((state) => state.UserReducer);
  const calendar = useSelector((state) => state.CalendarReducer);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user.token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  if (user.id && user.name && user.token) {
    ChannelService.boot({
      "pluginKey": "7cc25793-4246-4495-80e9-97a59767ef03", //please fill with your plugin key
      "memberId": user.id, //fill with user id
      "profile": {
        "name": user.name, //fill with user name
        "teamName": user.teamName ?? "Developer",
        "email": user.id,
        "lastPage": window.location.pathname,
        // "mobileNumber": "YOUR_USER_MOBILE_NUMBER", //fill with user phone number
        // "CUSTOM_VALUE_1": "VALUE_1", //any other custom meta data
        // "CUSTOM_VALUE_2": "VALUE_2"
      },
    });
  }

  return (
    <Router>
      <AlertModal />
      <Loading />
      
      <Switch>
        <PrivateRoute exact path={goHome} component={Home} />
        <PrivateRoute exact path={goLeagueReport} component={League} />
        <PrivateRoute exact path={goTeamReport} component={Team} />
        <PrivateRoute exact path={goPlayerReport} component={Solo} />
        <PrivateRoute exact path={goPathAnalysis} component={Video} />
        <PrivateRoute exact path={goProGameReport} component={GameReport} />
        <PrivateRoute
          exact
          path={proGameReportDetail}
          component={GameReportDetail}
        />
        {/* <PrivateRoute exact path="/utility" component={Utility} />
        <PrivateRoute exact path="/calculator" component={PickCalculator} /> */}
        <PrivateRoute exact path={goTeamCompare} component={TeamCompare} />
        <PrivateRoute exact path={goPlayerCompare} component={PlayerCompare} />
        <PrivateRoute exact path={goSoloRank} component={SoloRank} />
        {/* pi only */}
        <PrivateRoute exact path={goPiArea} component={PiArea} />
        <Route exact path={goError} component={NotFound} />
        <Route exact path={goLogin} component={Login} />
        <Route exact path={goCheckLogin} component={CheckLogin} />
        <Route exact path={goSignUp} component={SingUp} />
        <Route exact path={goChangePw} component={ChangePW} />
        <Route exact path={goUiTest} component={UiTest} />
        <Route exact path={goServerTest} component={ServerTest} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default Routes;
