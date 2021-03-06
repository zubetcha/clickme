import React from "react";
import moment from "moment";
import "moment/locale/ko";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Image, Text } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";


const CommentList = (props) => {

	const dispatch = useDispatch();
	const comment_list = useSelector(state => state.comment.list);

	const {post_id} = props;

	React.useEffect(() => {

		if (!comment_list[post_id]) {
			dispatch(commentActions.getCommentFB(post_id));
		}
	}, []);

	if (!comment_list[post_id] || !post_id) {
		return null;
	}

  return (
    <React.Fragment>
      <Grid padding="16px 10px">
				{comment_list[post_id].map(c => {
					return <CommentItem ket={c.id} {...c} />
				})}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
	post_id: null,
}

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;

  const now = moment();

  const daysGap = Math.floor(moment.duration(now.diff(insert_dt)).asDays());
  const hoursGap = Math.floor(moment.duration(now.diff(insert_dt)).asHours());
  const minutesGap = Math.floor(
    moment.duration(now.diff(insert_dt)).asMinutes()
  );

  return (
    <React.Fragment>
      <Grid is_flex margin="6px 0">
        <Grid is_flex width="auto">
          <Image shape="circle" />
          <Text bold margin="0 0 0 5px">{user_name}</Text>
        </Grid>
        <Grid is_flex margin="0 4px">
          <Text margin="0 0 0 10px">{contents}</Text>
          {minutesGap < 60 && <Text margin="0" size="10px">{minutesGap}분 전</Text>}
          {minutesGap > 60 && minutesGap < 1440 && (<Text margin="0" size="10px">{hoursGap}시간 {minutesGap % 60}분 전</Text>)}
          {minutesGap > 1440 && <Text margin="0" size="10px">{daysGap}일 전</Text>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "zubetcha",
  user_id: "",
  post_id: 1,
  contents: "눈이 감깁니다",
  insert_dt: "2021-01-01 19:00:00",
};
