import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Text, Image, Button, Input } from "../elements"
import Upload from "../shared/Upload";
import { actionCreators as postActions } from "../redux/modules/post";
import Spinner from "../spinner-bar.svg";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview)


    const { history } = props;

    const [contents, setContents] = React.useState("");

    const changeContents = (e) => {
        setContents(e.target.value);
    };

    const addPost = () => {
        dispatch(postActions.addPostFB(contents))
    };

    if (!is_login) {
        return (
            <Grid marign="100px 0" padding="16px" center>
                <Text size="32px" bold>잠깐!</Text>
                <Text soze="16px">로그인 하신 후 작성하실 수 있습니다.</Text>
                <Button _onClick={() => {history.replace("/")}}>로그인 하러 가기</Button>
            </Grid>
        )
    };

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0" size="36px" bold>게시글 작성</Text>
                <Upload />
            </Grid>
            <Grid>
                <Grid padding="16px">
                    <Text margin="0" size="24px" bold>미리보기</Text>
                </Grid>
            </Grid>
            <Image shape="rectangle" margin="auto" src={preview? preview : Spinner }/>
            <Grid padding="16px">
                <Input _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
            </Grid>
            <Grid padding="16px">
                <Button _onClick={addPost}>게시글 작성</Button>
            </Grid>
        </React.Fragment>
    )
}

export default PostWrite;