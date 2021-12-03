import React from "react";

import { Grid } from "../elements";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Permit from "../shared/Permit";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {

	const dispatch = useDispatch();

  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {

		if (post) {
			return;
		}
		
		dispatch(postActions.getOnePostFB(id))

  }, []);

  return (
    <React.Fragment>
			<Grid margin="100px 0 0 0">
			{post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
			<Permit>
      <CommentWrite post_id={id}/>
			</Permit>
      <CommentList post_id={id}/>
			</Grid>
      
    </React.Fragment>
  );
};

export default PostDetail;
