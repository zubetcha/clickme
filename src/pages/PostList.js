// pages
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements";

const PostList = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            if (p.user_info.user_id === user_info?.uid) {
              return (
								<Grid bg="" key={p.id}>
									<Post {...p} is_me />
								</Grid>
							);
            } else {
              return (
								<Grid bg="" key={p.id}>
									<Post {...p} />
								</Grid>
							) 
            }
          })}
        </InfinityScroll>
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
