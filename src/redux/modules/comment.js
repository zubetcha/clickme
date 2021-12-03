import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import "moment/locale/ko";
import { doc, addDoc, updateDoc, collection } from "@firebase/firestore";
import firebase from "firebase/compat/app";
import { actionCreators as postActions } from "./post";


// ************* Action Type ************* //

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const LOADING = "LOADING";


// ************* Action Creators ************* //

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));


// ************* Initial Data ************* //

const initialState = {
  list: {},
  is_loading: false,
};


// ************* Middlewares ************* //

const addCommentFB = (post_id, contents) => {
	return async function (dispatch, getState, {history}) {

		const user_info = getState().user.user;

		let comment = {
			post_id: post_id,
			user_id: user_info.uid,
			user_name: user_info.user_name,
			user_profile: user_info.user_profile,
			contents: contents,
			insert_dt: moment().format("YYYY-MM-DD HH:mm:ss")
		}

		const cmtRef = await addDoc(collection(firestore, "comment"), {...comment});

		comment = {...comment, id: cmtRef.id};

		const post = getState().post.list.find(el => el.id === post_id);

		const increment = firebase.firestore.FieldValue.increment(1);
		
		await updateDoc(doc(firestore, "post", post_id), {comment_cnt: increment});

		dispatch(addComment(post_id, comment))
		
		if (post) {
			dispatch(postActions.editPost(post_id, {comment_cnt: parseInt(post.comment_cnt) + 1}))
		}	
	}
}

const getCommentFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    const commentDB = firestore.collection("comment");

    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
				let list = [];

				docs.forEach((doc) => {
					list.push({...doc.data(), id: doc.id});
				})

				dispatch(setComment(post_id, list));
			}).catch((err) => {
				console.log("댓글 정보를 가져올 수 없습니다", err);
			});
  };
};


// ************* Reducer ************* //

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
			draft.list[action.payload.post_id] = action.payload.comment_list;
		}),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
			draft.list[action.payload.post_id].unshift(action.payload.comment);
		}),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);


// ************* Export ************* //

const actionCreators = {
  getCommentFB,
	addCommentFB,
  setComment,
  addComment,
};

export { actionCreators };
