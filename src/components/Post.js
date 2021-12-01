// components
import React from "react";

import { Grid, Image, Text } from "../elements";

import { ReactComponent as Comment } from '../comment-dots-regular.svg';

const Post = (props) => {
    return (
        <React.Fragment>
            <Grid height="100%" padding="50px 0 0 0">
                <Grid is_flex padding="10px">
                    <Grid is_flex width="auto">
                        <Image shape="circle" src={props.src} />
                        <Text bold>{props.user_info.user_name}</Text>
                    </Grid>
                    <Text size="10px">{props.insert_dt}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.image_url} />
                </Grid>
                {/* <Grid padding="10px 0">
                    <Text margin="0" bold size="20px" color="tomato">{props.title}</Text>
                </Grid> */}
                <Grid padding="0 10px">
                    <Text color="grey" size="14px">{props.contents}</Text>
                </Grid>
                <Grid padding="0 10px">
                    <Text vertical="middle" height="inherit"><Comment style={{
                        width: "16px"
                    }}/> {props.comment_cnt}</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Post.defaultProps = {
    user_info: {
        user_name: "zubetcha",
        user_profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_Z6Y_X3KyySHOIPcpwOraBX6meYb7q2brg&usqp=CAU"
    },
    image_url: "https://cdn.shopify.com/s/files/1/0969/9128/products/FRD4_1_8138c99c-236c-45e4-aa64-74dd876697da.jpg?v=1561202243",
    contents: "고양이네요!",
    comment_cnt: 10,
    insert_dt: "2021-11-28 10:00:00",
};


export default Post;