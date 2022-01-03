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
import Login from "./Pages/Login/Login";
import TeamCompare from "./Pages/TeamCompare/TeamCompare";
import PlayerCompare from "./Pages/PlayerCompare/PlayerCompare";
import Video from "./Pages/VideoReport/Video";
import Footer from "./Components/Footer/Footer";
import MetaAnalysis from "./Pages/MetaAnalysis/MetaAnalysis";
import MatchAnalysis from "./Pages/MatchAnalysis/MatchAnalysis";
import { useSelector } from "react-redux";
import PiArea from "./Pages/PiArea/PiArea";
import GameReport from "./Pages/GameReport/GameReport";
import AlertModal from "./Components/UtilityComponent/AlertModal";

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

  return (
    <Router>
      <AlertModal />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/league" component={League} />
        <PrivateRoute exact path="/team" component={Team} />
        <PrivateRoute exact path="/metaAnalysis" component={MetaAnalysis} />
        <PrivateRoute exact path="/matchAnalysis" component={MatchAnalysis} />
        <PrivateRoute exact path="/solo" component={Solo} />
        <PrivateRoute exact path="/video" component={Video} />
        <PrivateRoute exact path="/gameReport" component={GameReport} />
        <PrivateRoute exact path="/utility" component={Utility} />
        <PrivateRoute exact path="/simulator" component={ItemSimulator} />
        <PrivateRoute exact path="/calculator" component={PickCalculator} />
        <PrivateRoute exact path="/teamCompare" component={TeamCompare} />
        <PrivateRoute exact path="/playerCompare" component={PlayerCompare} />
        {/* pi only */}
        <PrivateRoute exact path="/piArea" component={PiArea} />
        <Route exact path="/error" component={NotFound} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default Routes;
