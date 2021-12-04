// shared
import React from "react";
import { Grid, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux//configureStore";
import { apiKey } from "../shared/firebase";
import Permit from "../shared/Permit";

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <Permit>
        <React.Fragment>
          <Grid is_flex maxWidth="800px" minWidth="400px" padding="20px 0" margin="0" bg="#FBF6EF" position="fixed" top="0" zIndex="2">
            <Grid margin="0 0 0 10px">
              <Text margin="0px" size="24px" bold
                cursor="pointer"
                _onClick={() => {
                  history.push("/");
                }}>
                Click me!
              </Text>
            </Grid>
            <Grid is_flex>
              <Button margin="0 5px" text="내정보" _onClick={() => {
								window.alert("준비중입니다. 조금만 기다려주세요!")
							}}></Button>
              <Button margin="0 5px" text="알림" _onClick={() => {
								window.alert("준비중입니다. 조금만 기다려주세요!")
							}}></Button>
              <Button
							 margin="0 5px"
                text="로그아웃"
                _onClick={() => {
                  dispatch(userActions.logoutFB());
                }}
              ></Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </Permit>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex maxWidth="800px" minWidth="400px" padding="20px 0" margin="0" bg="#FBF6EF" position="fixed" top="0" zIndex="2">
        <Grid margin="0 0 0 10px">
          <Text margin="0px" size="24px" bold
          cursor="pointer"
            _onClick={() => {
              history.push("/");
            }}
          >
            Click me!
          </Text>
        </Grid>
        <Grid is_flex>
          <Button
					margin="0 5px"
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
					margin="0 5px"
            text="회원가입"
            _onClick={() => {
              history.push("/join");
            }}
          ></Button>
        </Grid>
      </Grid>
      <Permit>
        <React.Fragment>
          <Grid is_flex padding="4px 0">
            <Grid>
              <Text margin="0px" size="24px" bold _onClick={() => {}}>
                Click me!
              </Text>
            </Grid>
            <Grid is_flex>
              <Button margin="0 5px" text="내정보" _onClick={() => {
								window.alert("준비중입니다. 조금만 기다려주세요!")
							}}></Button>
              <Button margin="0 5px" text="알림" _onClick={() => {
								window.alert("준비중입니다. 조금만 기다려주세요!")
							}}></Button>
              <Button
							margin="0 5px"
                text="로그아웃"
                _onClick={() => {
                  dispatch(userActions.logoutFB());
                }}
              ></Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </Permit>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
