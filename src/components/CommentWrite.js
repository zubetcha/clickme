import React from "react";
import { Grid, Image, Text, Input, Button } from "../elements";

const CommentWrite = (props) => {
    return (
        <React.Fragment>
            <Grid padding="16px" is_flex>
                <Input placeholder="댓글 내용을 입력해주세요." />
                <Button width="50px" margin="0 2px">작성</Button>
            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;