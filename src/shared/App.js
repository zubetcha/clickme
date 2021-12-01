import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Join from "../pages/Join";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";


import Header from "../components/Header";
import { Button, Grid } from "../elements";
import Permit from "./Permit";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { apiKey } from "./firebase";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  });

  return (
      <Grid bg="#FBF6EF" height="100vh">
          <Grid minWidth="400px" maxWidth="800px" margin="0 auto">
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/join" exact component={Join} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
        </ConnectedRouter>
      </Grid>
      <Permit>
          <Button is_float text="+"></Button>
        </Permit>
      </Grid>
  );
}

export default App;
