// pages
import React from "react";
import { Grid, Text, Button, Input } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";


const Join = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [pwd_check, setPwdCheck] = React.useState("");
    const [user_name, setUserName] = React.useState("");

    const join = () => {
        if (id === "" || pwd === "" || user_name === "") {
            window.alert("아이디, 패스워드, 별명을 모두 입력해주세요.")
            return;
        }

        if(!emailCheck(id)) {
            window.alert("이메일 형식이 맞지 않습니다.")
            return;
        }

        if (pwd !== pwd_check) {
            window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
            return;
        }
        dispatch(userActions.joinFB(id, pwd, user_name))
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text bold size="32px">회원가입</Text>
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
                <Input
                    label="별명"
                    placeholder="별명을 입력해주세요."
                    _onChange = {(e) => {
                        setUserName(e.target.value);
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                <Input type="password"
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요."
                    _onChange = {(e) => {
                        setPwd(e.target.value);
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                <Input type="password"
                    label="비밀번호 확인"
                    placeholder="비밀번호를 다시 입력해주세요."
                    _onChange = {(e) => {
                        setPwdCheck(e.target.value);
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                    <Button text="회원가입하기" _onClick={join}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Join.defaultProps = {}

export default Join;