import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
} from "@firebase/firestore";
import "moment";

import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";

// **************** Action Type **************** //

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LIKE_POST = "LIKE_POST";

// **************** Action Creators **************** //

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const likePost = createAction(LIKE_POST, (post_id) => ({post_id}));

// **************** Initial Data **************** //

const initialState = {
  list: [],
};

const initialPost = {
  // id: 0,
  // user_info: {
  //     user_name: "zubetcha",
  //     user_profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_Z6Y_X3KyySHOIPcpwOraBX6meYb7q2brg&usqp=CAU"
  // },
  image_url:
    "https://cdn.shopify.com/s/files/1/0969/9128/products/FRD4_1_8138c99c-236c-45e4-aa64-74dd876697da.jpg?v=1561202243",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

// **************** Middlewares **************** //

const getPostFB = () => {
  return async function (dispatch, getState, { history }) {

		const postDT = firestore.collection("post");




    const postDB = await getDocs(collection(firestore, "post"));
    let post_list = [];
    postDB.forEach((doc) => {
      let _post = doc.data();

      let post = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] },
            };
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {} }
      );
      post_list.push(post);
    });
    dispatch(setPost(post_list));
  };
};

const addPostFB = (contents = "") => {
  return async function (dispatch, getState, { history }) {
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const _image = getState().image.preview;
    console.log(_image);

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            return url;
          })
          .then((url) => {
            const docRef = addDoc(collection(firestore, "post"), {
              ...user_info,
              ..._post,
              image_url: url,
            });
            let post = { user_info, ..._post, id: docRef.id, image_url: url };
            dispatch(addPost(post));
            history.replace("/");

            dispatch(imageActions.setPreview(null));
          })
          .catch((err) => {
            window.alert("게시글 작성에 문제가 있습니다.");
            console.log("게시글 작성에 실패했습니다.", err);
          });
      })
      .catch((err) => {
        window.alert("이미지 업로드에 문제가 있습니다.");
        console.log("이미지 업로드에 문제가 있습니다.", err);
      });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없습니다.");
      return;
    }

    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const docRef = doc(firestore, "post", post_id);

    if (_image === _post.image_url) {
      await updateDoc(docRef, { ...post });
      dispatch(editPost(post_id, { ...post }));
      history.replace("/");
    } else {
      const user_id = getState().user.user.uid;
      console.log(user_id);
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              return url;
            })
            .then((url) => {
              updateDoc(docRef, { ...post, image_url: url });
              dispatch(editPost(post_id, { ...post, image_url: url }));
              history.replace("/");
            });
        })
        .catch((err) => {
          window.alert("이미지 업로드에 문제가 있습니다.");
          console.log("이미지 업로드에 문제가 있습니다.", err);
        });
    }
  };
};

const deletePostFB = (post_id, image) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) {
      window.alert("게시물 정보를 받아오고 있습니다. 잠시만 기다려주세요!");
      return window.location.reload();
    }

		const _image = storage.ref().child(`images/${image}`)

    await deleteDoc(doc(firestore, "post", post_id))
      .then(() => {
        dispatch(deletePost(post_id));
        _image.delete();
				window.location.reload();
      })
      .catch((err) => {
        console.log("게시글 삭제에 문제가 발생했습니다", err);
      });
  };
};


const likePostFB = (post_id) => {
	return async function (dispatch, getState, {history}) {
		if (!post_id) {
      window.alert("게시물 정보를 받아오고 있습니다. 잠시만 기다려주세요!");
      return window.location.reload();
    }
	}
}

// **************** Reducer **************** //

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.filter((p) => p.id !== action.payload.post_id);
      }),
			[LIKE_POST]: (state, action) => produce(state, (draft) => {

			})
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  deletePost,
	likePost,
  getPostFB,
  addPostFB,
  editPostFB,
  deletePostFB,
	likePostFB,
};

export { actionCreators };
