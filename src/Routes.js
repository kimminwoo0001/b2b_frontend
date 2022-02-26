import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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

// import Utility from "./Pages/ETC/Utility/Utility";
// import PickCalculator from "./Pages/ETC/PickCalculator/PickCalculator";

function Routor() {
  //const token = sessionStorage.getItem("token");
  const user = useSelector((state) => state.UserReducer);

  const PrivateRoute = ({ children, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user.token ? children : <Navigate to="/login" />
      }
    />
  );

  if (user.id && user.name && user.token) {
    ChannelService.boot({
      "pluginKey": "7cc25793-4246-4495-80e9-97a59767ef03", //please fill with your plugin key
      "memberId": user.id, //fill with user id
      "profile": {
        "name": user.name, //fill with user name
        "teamName": user.teamName,
        "email": user.id,
        "lastPage": window.location.pathname,
      },
    });
  }

  return (
    <Router>
      <AlertModal />
      <Loading />

      <Routes>
        <PrivateRoute path={goHome} element={<Home />} />
        <PrivateRoute path={goLeagueReport} element={<League />} />
        <PrivateRoute path={goTeamReport} element={<Team />} />
        <PrivateRoute path={goPlayerReport} element={<Solo />} />
        <PrivateRoute path={goPathAnalysis} element={<Video />} />
        <PrivateRoute path={goProGameReport} element={<GameReport />} />
        <PrivateRoute
          path={proGameReportDetail}
          element={GameReportDetail}
        />
        {/* <PrivateRoute  path="/utility" element={Utility} />
        <PrivateRoute  path="/calculator" element={PickCalculator} /> */}
        <PrivateRoute path={goTeamCompare} element={<TeamCompare />} />
        <PrivateRoute path={goPlayerCompare} element={<PlayerCompare />} />
        <PrivateRoute path={goSoloRank} element={<SoloRank />} />
        {/* pi only */}
        <PrivateRoute path={goPiArea} element={<PiArea />} />
        <Route path={goError} element={<NotFound />} />
        <Route path={goLogin} element={<Login />} />
        <Route path={goCheckLogin} element={<CheckLogin />} />
        <Route path={goSignUp} element={<SingUp />} />
        <Route path={goChangePw} element={<ChangePW />} />
        <Route path={goUiTest} element={<UiTest />} />
        <Route path={goServerTest} element={<ServerTest />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default Routor;
