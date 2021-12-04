import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { apiKey } from "../shared/firebase";

import { ReactComponent as Heart } from "../icons/heart-solid.svg";
import { actionCreators as postActions } from "../redux/modules/post";

const HeartStatus = (props) => {
  const dispatch = useDispatch();

  const { id, liked } = props;

  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <Wrap liked={liked}>
        <Heart
          className="like_icon"
          style={{
            width: "18px",
            marginRight: "4px",
          }}
				liked={props.liked}
          onClick={() => {
            dispatch(postActions.likePostFB(id));
          }}
        />
      </Wrap>
    );
  }

  return (
    <div>
      <Heart
        style={{
          width: "18px",
          marginRight: "4px",
          color: "#333",
        }}
        onClick={() => {
          window.alert("로그인 후 이용하실 수 있습니다.");
        }}
      />
    </div>
  );
};

const Wrap = styled.div`
	.like_icon {
		color: ${(props) => (props.liked === true ? "tomato" : "#333")};
	}
`;

export default HeartStatus;

// import React from "react";
// import styled from "styled-components";

// // 분홍 하트, 회색 하트 이미지 가져오기
// import heart_pink from "../shared/heart_pink.png";
// import heart_gray from "../shared/heart_gray.png";

// // 하트 버튼은 일단 모양새만 잡아줄거예요!
// const HeartButton = (props) => {
//   const icon_url = props.is_like ? heart_pink : heart_gray;

//   return (
//     <React.Fragment>
//       <Heart onClick={props._onClick} icon_url={icon_url}></Heart>
//     </React.Fragment>
//   );
// };

// const Heart = styled.div`
//   width: 30px;
//   height: 30px;
//   display: inline-flex;
//   background: url(${(props) => props.icon_url});
//   background-size: cover;
//   cursor: pointer;
//   position: relative;
//   left: 7px;
//   top: 9px;
// `;

// export default HeartButton;
