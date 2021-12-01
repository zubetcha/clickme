import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = (props) => {
    return (
        <React.Fragment>
            <Grid padding="16px">
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </Grid>
        </React.Fragment>
    )
}

export default CommentList;

const CommentItem = (props) => {
    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;

    return (
        <React.Fragment>
            <Grid is_flex>
                <Grid is_flex width="auto">
                    <Image shape="circle" />
                    <Text bold>{user_name}</Text>
                </Grid>
                <Grid is_flex margin="0 4px">
                    <Text margin="0">{contents}</Text>
                    <Text margin="0">{insert_dt}</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "zubetcha",
    user_id: "",
    post_id: 1,
    contents: "눈이 감깁니다",
    insert_dt:'2021-01-01 19:00:00',

}