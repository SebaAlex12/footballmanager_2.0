import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
// import history from "./history";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Teams from "./components/teams/Teams";
import Matches from "./components/matches/Matches";

import { getMatches } from "./actions/matchActions";

// Check for token
if (localStorage.jwtToken) {
  //  Set auth token auth
  setAuthToken(localStorage.jwtToken);
  // Decode token get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and Authenticate
  store.dispatch(setCurrentUser(decoded));

  // check for expire token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
  store.dispatch(getMatches());
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
              <BrowserRouter>
                  <Navbar />
                      <Routes className="App" >
                          <Route index path="/dashboard" element={<Dashboard />} />
                          {/* <Route index path="/" element={<Landing />} /> */}
                          <Route path="/register" element={<Register />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/teams_feed" element={<Teams />} />
                          <Route path="/matches_feed" element={<Matches />} />
                      </Routes>
                  <Footer />
              </BrowserRouter>
      </Provider>
    );
  }
}

export default App;