// pages
import React from "react"; 
import { Grid, Text, Button, Input } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Login = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const login = () => {

        if(id === "" || pwd === "") {
            window.alert("아이디 혹은 비밀번호가 공란입니다. 입력해주세요.")
            return;
        }

        if(!emailCheck(id)) {
            window.alert("이메일 형식이 맞지 않습니다.")
            return;
        }
        dispatch(userActions.loginFB(id, pwd));
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text bold size="32px">로그인</Text>
            </Grid>
            <Grid minWidth="400px" maxWidth="600px" margin="0 auto">
                <Grid padding="16px">
                    <Input
                    label="아이디"
                    placeholder="아이디를 입력해주세요."
                    _onChange = {(e) => {
                        setId(e.target.value);
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                    <Input type="password"
                    label="패스워드"
                    placeholder="비밀번호를 입력해주세요."
                    _onChange = {(e) => {
                        setPwd(e.target.value);
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                    <Button text="로그인하기"
                    _onClick={() => {
                        login();
                        console.log("로그인 완료");
                    }}
                    ></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Login;