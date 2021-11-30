// shared
import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "./Cookie";

const Header = (props) => {
    const history = useHistory();

    const [is_login, setIsLogin] = React.useState(false);



    if(is_login) {
        return (
            <React.Fragment>
                <Grid is_flex padding="4px 0">
                    <Grid>
                        <Text margin="0px" size="24px" bold
                        _onClick={() => {
                            history.push("/");
                        }}
                        >Click me!</Text>
                    </Grid>
                    <Grid is_flex>
                        <Button text="내정보"
                        _onClick={() => {
                        }}
                        ></Button>
                        <Button text="알림"
                        _onClick={() => {
                        }}
                        ></Button>
                        <Button text="로그아웃"
                        _onClick={() => {
                        }}
                        ></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Grid is_flex padding="4px 0">
                <Grid>
                    <Text margin="0px" size="24px" bold
                    _onClick={() => {
                        history.push("/");
                    }}
                    >Click me!</Text>
                </Grid>
                <Grid is_flex>
                    <Button text="회원가입"
                    _onClick={() => {
                        history.push("/join");
                    }}
                    ></Button>
                    <Button text="로그인"
                    _onClick={() => {
                        history.push("/login");
                    }}
                    ></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {}

export default Header;