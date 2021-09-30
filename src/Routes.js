import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
import { useSelector } from "react-redux";

function Routes() {
  const token = sessionStorage.getItem("token");
  const refreshToken = useSelector((state) => state.User);

  console.log("token, refreshToken : ", token, refreshToken);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token || refreshToken.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/league" component={League} />
        <PrivateRoute exact path="/team" component={Team} />
        <PrivateRoute exact path="/solo" component={Solo} />
        <PrivateRoute exact path="/video" component={Video} />
        <PrivateRoute exact path="/utility" component={Utility} />
        <PrivateRoute exact path="/simulator" component={ItemSimulator} />
        <PrivateRoute exact path="/calculator" component={PickCalculator} />
        <PrivateRoute exact path="/teamCompare" component={TeamCompare} />
        <PrivateRoute exact path="/playerCompare" component={PlayerCompare} />
        <Route exact path="/error" component={NotFound} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
}
export default Routes;
