import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import Home from "./Pages/Home/Home";
import League from "./Pages/League/League";
import Team from "./Pages/Team/Team";
import Solo from "./Pages/Solo/Solo";
import Utility from "./Pages/Utility/Utility";
import ItemSimulator from "./Pages/ItemSimulator/ItemSimulator";
import PickCalculator from "./Pages/PickCalculator/PickCalculator";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Sign/Login";
import TeamCompare from "./Pages/TeamCompare/TeamCompare";
import PlayerCompare from "./Pages/PlayerCompare/PlayerCompare";
import Video from "./Pages/VideoReport/Video";
import Footer from "./Components/Footer/Footer";
import MetaAnalysis from "./Pages/MetaAnalysis/MetaAnalysis";
import MatchAnalysis from "./Pages/MatchAnalysis/MatchAnalysis";
import SingUp from "./Pages/Sign/SignUp";
import ChangePW from "./Pages/Sign/ChangePW";
import { useSelector } from "react-redux";
import PiArea from "./Pages/PiArea/PiArea";
import GameReport from "./Pages/GameReport/GameReport";
import AlertModal from "./Components/UtilityComponent/AlertModal";
import CheckLogin from "./Pages/Sign/CheckLogin";
import Loading from "./Components/LoadingImg/LoadingImg";
import ChannelService from "./Components/UtilityComponent/ChannelService";
import GameReportDetail from "./Pages/GameReport/Components/GameReportDetail";

function Routes() {
  //const token = sessionStorage.getItem("token");
  const user = useSelector((state) => state.UserReducer);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user.token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  if (user.id) {
    ChannelService.boot({
      "pluginKey": "7cc25793-4246-4495-80e9-97a59767ef03", //please fill with your plugin key
      "memberId": user.id, //fill with user id
      "profile": {
        "name": user.name, //fill with user name
        "teamName": user.teamName ?? "Developer",
        "email": user.id,
        // "mobileNumber": "YOUR_USER_MOBILE_NUMBER", //fill with user phone number
        // "CUSTOM_VALUE_1": "VALUE_1", //any other custom meta data
        // "CUSTOM_VALUE_2": "VALUE_2"
      }
    });
  }


  return (
    <Router>
      <AlertModal />
      <Loading />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/league" component={League} />
        <PrivateRoute exact path="/team" component={Team} />
        <PrivateRoute exact path="/metaAnalysis" component={MetaAnalysis} />
        <PrivateRoute exact path="/matchAnalysis" component={MatchAnalysis} />
        <PrivateRoute exact path="/solo" component={Solo} />
        <PrivateRoute exact path="/video" component={Video} />
        <PrivateRoute exact path="/gameReport" component={GameReport} />
        <PrivateRoute exact path="/gameReportDetail" component={GameReportDetail} />
        <PrivateRoute exact path="/utility" component={Utility} />
        <PrivateRoute exact path="/simulator" component={ItemSimulator} />
        <PrivateRoute exact path="/calculator" component={PickCalculator} />
        <PrivateRoute exact path="/teamCompare" component={TeamCompare} />
        <PrivateRoute exact path="/playerCompare" component={PlayerCompare} />
        {/* pi only */}
        <PrivateRoute exact path="/piArea" component={PiArea} />
        <Route exact path="/error" component={NotFound} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/checkLogin" component={CheckLogin} />
        <Route exact path="/signUp" component={SingUp} />
        <Route exact path="/changePW" component={ChangePW} />
      </Switch>

      <Footer />
    </Router>
  );
}
export default Routes;
