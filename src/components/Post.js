// components
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import { ReactComponent as Comment } from "../icons/comment-dots-regular.svg";
import { ReactComponent as Edit } from "../icons/edit-regular.svg";
import { ReactComponent as Delete } from "../icons/trash-alt-regular.svg";

const Post = (props) => {

	const dispatch = useDispatch();

	const deletePost = () => {
		let splitUrl = props.image_url.split('/');
		let image = splitUrl[7].split('?')[0].substring(9);

		if (window.confirm('게시글을 삭제하시겠습니까?')) {
			return dispatch(postActions.deletePostFB(props.id));
		} else {
			return;
		}
	}

  return (
    <React.Fragment>
      <Grid height="100%" padding="50px 0 0 0">
        <Grid is_flex padding="10px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            {props.is_me && (
              <Edit
                style={{ width: "18px", margin: "0 10px 0 0" }}
                onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              />
            )}
            {props.is_me && <Delete style={{ width: "14px" }} onClick={deletePost} />}
          </Grid>
        </Grid>
        <Grid padding="0 10px">
          <Text color="grey" size="14px">
            {props.contents}
          </Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="0 10px" is_flex>
          <Text vertical="middle" height="inherit">
            <Comment
              style={{
                width: "16px",
              }}
            />{" "}
            좋아요 {props.comment_cnt}개
          </Text>
          <Text size="10px">{props.insert_dt}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "zubetcha",
    user_profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_Z6Y_X3KyySHOIPcpwOraBX6meYb7q2brg&usqp=CAU",
  },
  image_url:
    "https://cdn.shopify.com/s/files/1/0969/9128/products/FRD4_1_8138c99c-236c-45e4-aa64-74dd876697da.jpg?v=1561202243",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-11-28 10:00:00",
  is_me: false,
};

export default Post;
