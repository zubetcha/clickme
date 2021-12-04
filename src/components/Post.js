// components
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/ko";

import { Grid, Image, Text } from "../elements";
import HeartStatus from "./HeartStatus";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

import { ReactComponent as Comment } from "../icons/comment-dots-regular.svg";
import { ReactComponent as Edit } from "../icons/edit-regular.svg";
import { ReactComponent as Delete } from "../icons/trash-alt-regular.svg";

const Post = (props) => {
  const dispatch = useDispatch();

  const deletePost = () => {
    let image = props.image_url.split("/")[7].split("?")[0].substring(9);

    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      return dispatch(postActions.deletePostFB(props.id, image));
    } else {
      return;
    }
  };

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === props.id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(props.id));
  }, []);

  const now = moment();

  const daysGap = Math.floor(
    moment.duration(now.diff(props.insert_dt)).asDays()
  );
  const hoursGap = Math.floor(
    moment.duration(now.diff(props.insert_dt)).asHours()
  );
  const minutesGap = Math.floor(
    moment.duration(now.diff(props.insert_dt)).asMinutes()
  );

  return (
    <React.Fragment>
      <Grid height="100%">
        <Grid is_flex padding="7px 10px" borderBottom="0.5px solid #333">
          <Grid is_flex width="auto">
            <Grid width="auto">
              <Image shape="circle" src={props.src} />
            </Grid>
            <Grid width="auto">
              <Text bold margin="0 0 0 5px">
                {props.user_info.user_name}
              </Text>
            </Grid>
          </Grid>
          <Grid is_flex width="auto">
            {props.is_me && (
              <Edit
                style={{ width: "18px", margin: "0 15px 0 0" }}
                onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              />
            )}
            {props.is_me && (
              <Delete style={{ width: "14px" }} onClick={deletePost} />
            )}
          </Grid>
        </Grid>
        <Grid
          borderBottom="0.5px solid #333"
          padding="20px 0"
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}
        >
          {props.layout === "textRight" && (
            <Grid is_flex>
              <Grid>
                <Image shape="rectangle" src={props.image_url} />
              </Grid>
              <Grid padding="0 10px">
                <Text color="grey" size="14px" vertical="top">
                  {props.contents}
                </Text>
              </Grid>
            </Grid>
          )}
          {props.layout === "textLeft" && (
            <Grid is_flex>
              <Grid padding="0 10px">
                <Text color="grey" size="14px" vertical="top" textAlign="right">
                  {props.contents}
                </Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.image_url} />
              </Grid>
            </Grid>
          )}
          {props.layout === "textTop" && (
            <Grid>
              <Grid padding="0 10px">
                <Text color="grey" size="14px">
                  {props.contents}
                </Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.image_url} />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid>
          <Grid padding="0 10px" is_flex>
            <Grid is_flex width="auto">
              <Grid width="auto" margin="0 15px 0 0" is_flex>
                <HeartStatus
                  {...post}
                  is_me={post.user_info.user_id === user_info?.uid}
                  liked={props.liked}
                />
                <Text vertical="middle" height="inherit" size="12px">
                  {props.like_cnt}
                </Text>
              </Grid>
              <Grid
                width="auto"
                is_flex
                _onClick={() => {
                  history.push(`/post/${props.id}`);
                }}
              >
                <Comment
                  style={{
                    width: "20px",
                    marginRight: "4px",
                  }}
                />
                <Text vertical="middle" height="inherit" size="12px">
                  {" "}
                  {props.comment_cnt}
                </Text>
              </Grid>
            </Grid>
            {minutesGap < 60 && <Text size="10px">{minutesGap}분 전</Text>}
            {minutesGap > 60 && minutesGap < 1440 && (
              <Text size="10px">
                {hoursGap}시간 {minutesGap % 60}분 전
              </Text>
            )}
            {minutesGap > 1440 && <Text size="10px">{daysGap}일 전</Text>}
          </Grid>
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
  like_cnt: 10,
  liked: false,
};

export default Post;
