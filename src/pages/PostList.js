// pages
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        {/* <Post /> */}
        {post_list.map((p, idx) => {
					if(p.user_info.user_id === user_info?.uid) {
						return <Post key={p.id} {...p} is_me />;
					} else {
						return <Post key={p.id} {...p} />;
					}
        })}
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  max-width: 800px;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 800px));
  gap: 50px;
`;

export default PostList;
