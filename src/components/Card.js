import React from "react";

import { Grid, Text, Image } from "../elements";

const Card = (props) => {
  const { image_url, user_name, post_id } = props;

  return (
    <Grid margin="8px 0" padding="16px" is_flex bg="#FFF">
      <Grid width="auto" margin="0 8px 0 0">
        <Image shape="square" size={85} image_url={image_url} />
      </Grid>
      <Grid>
        <Text>
          <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다.
        </Text>
      </Grid>
    </Grid>
  );
};

Card.defaultProps = {
	image_url: "",
	user_name: "",
	post_id: null,
}

export default Card;
