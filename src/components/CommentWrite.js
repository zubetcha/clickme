import React from "react";
import { Grid, Image, Text, Input, Button } from "../elements";

const CommentWrite = (props) => {
  const [comment_text, setCommentText] = React.useState();

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

	const write = () => {
		setCommentText("");
	}

  return (
    <React.Fragment>
      <Grid padding="32px 16px 16px 16px" is_flex>
        <Input placeholder="댓글 내용을 입력해주세요." _onChange={onChange} value={comment_text}/>
        <Button width="50px" margin="0 2px" _onClick={write}>
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
