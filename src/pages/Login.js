// pages
import React from "react"; 
import { Grid, Text, Button, Input } from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

const Login = (props) => {

    console.log(getCookie('user_id'))

    const login = () => {

        setCookie("user_id", "zubetcha", 3);
        setCookie("user_pwd", "pppp", 3);
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text bold size="32px">로그인</Text>
            </Grid>
            <Grid minWidth="400px" maxWidth="600px" margin="0 auto">
                <Grid padding="16px">
                    <Input type="text"
                    label="아이디"
                    placeholder="아이디를 입력해주세요."
                    _onChange = {() => {
                        console.log("아이디 입력 완료");
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                    <Input type="password"
                    label="패스워드"
                    placeholder="비밀번호를 입력해주세요."
                    _onChange = {() => {
                        console.log("비밀번호 입력 완료");
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