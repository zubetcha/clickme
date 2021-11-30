// pages
import React from "react";
import { Grid, Text, Button, Input } from "../elements";


const Join = (props) => {
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text bold size="32px">회원가입</Text>
            </Grid>
            <Grid minWidth="400px" maxWidth="600px" margin="0 auto">
                <Grid padding="16px">
                    <Input type="text"
                    label="아이디"
                    placeholder="아이디를 입력해주세요."
                    _Onchange = {() => {
                        console.log("아이디 입력 완료");
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                <Input type="text"
                    label="별명"
                    placeholder="별명을 입력해주세요."
                    _Onchange = {() => {
                        console.log("별명 입력 완료");
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                <Input type="password"
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요."
                    _Onchange = {() => {
                        console.log("비밀번호 입력 완료");
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                <Input type="password"
                    label="비밀번호 확인"
                    placeholder="비밀번호를 다시 입력해주세요."
                    _Onchange = {() => {
                        console.log("비밀번호 확인 완료");
                    }}
                    ></Input>
                </Grid>
                <Grid padding="16px">
                    <Button text="회원가입하기"></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Join.defaultProps = {}

export default Join;