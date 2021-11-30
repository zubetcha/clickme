
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Header from "./Header";
import { Grid } from "../elements";

function App() {
  return (
    <div className="App">
        <Grid minWidth="400px" maxWidth="800px" margin="0 auto">
            <BrowserRouter>
            </BrowserRouter>
                <Header />
                <BrowserRouter>
                    <Route path="/" exact component={PostList} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/join" exact component={Join} />
                </BrowserRouter>
        </Grid>
    </div>
  );
}


export default App;
