import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  limit,
  startAt,
} from "@firebase/firestore";
import "moment";
import "moment/locale/ko";
import moment from "moment";
import { firestore, storage } from "../../shared/firebase";


// **************** Action Type **************** //

const LIKE_POST = "LIKE_POST";
const DISLIKE_POST = "DISLIKE_POST";


// **************** Action Creators **************** //

const likePost = createAction(LIKE_POST, (post_id) => ({ post_id }));
const dislikePost = createAction(DISLIKE_POST, (post_id) => ({ post_id }));


// **************** Initial Data **************** //

const initialState = {
  list: {},
};


// **************** Middlewares **************** //

const likePostFB = (post_id) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) {
      window.alert("게시물 정보를 받아오고 있습니다. 잠시만 기다려주세요!");
      return window.location.reload();
    }

		const user_info = getState().user.user;

		let like = {
			post_id: post_id,
			user_id: user_info.uid,
			user_name: user_info.user_name,
			user_profile: user_info.user_profile,
			liked: true,
			insert_dt: moment().format("YYYY-MM-DD HH:mm:ss")
		}

		
  };
};

const dislikePostFB = (post_id) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) {
      window.alert("게시물 정보를 받아오고 있습니다. 잠시만 기다려주세요!");
      return window.location.reload();
    }
  };
};


// **************** Reducer **************** //

export default handleActions (
	{
		[LIKE_POST]: (state, action) => produce(state, (draft) => {}),
    [DISLIKE_POST]: (state, action) => produce(state, (draft) => {}),
	},
	initialState
);


// **************** Export **************** //

const actionCreators = {
	likePost,
	likePostFB,
	dislikePost,
	dislikePostFB,
};

export { actionCreators };