import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Text, Image, Button, Input } from "../elements"
import Upload from "../shared/Upload";

const PostWrite = (props) => {
    const is_login = useSelector((state) => state.user.is_login);

    if (!is_login) {
        return (
            <Grid>
                <Text>잠깐!</Text>
                <Text>로그인 하신 후 작성하실 수 있습니다.</Text>
                <Button _onClick={() => {}}>로그인 하러 가기</Button>
            </Grid>
        )
    }
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

            <Image shape="rectangle" />

            <Grid padding="16px">
                <Input label="게시글 내용" placeholder="게시글 작성" multiLine />
            </Grid>
            <Grid padding="16px">
                <Button>게시글 작성</Button>
            </Grid>
        </React.Fragment>
    )
}

export default PostWrite;