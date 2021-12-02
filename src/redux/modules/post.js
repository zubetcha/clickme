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

import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";

// **************** Action Type **************** //

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LIKE_POST = "LIKE_POST";
const LOADING = "LOADING";

// **************** Action Creators **************** //

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const likePost = createAction(LIKE_POST, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// **************** Initial Data **************** //

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
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

const getPostFB = (start = null, size = 3) => {
  return async function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));

    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
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
        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
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

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            return url;
          })
          .then((url) => {
            const docRef = addDoc(collection(firestore, "post"), {
              ...user_info,
              ..._post,
              image_url: url,
            }).then((docRef) => {
              let post = { user_info, ..._post, id: docRef.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");
              console.log(post);

              dispatch(imageActions.setPreview(null));
            });
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

    const _image = storage.ref().child(`images/${image}`);

    await deleteDoc(doc(firestore, "post", post_id))
      .then(() => {
        dispatch(deletePost(post_id));
        _image.delete().then(() => {
					window.location.reload();
				})
      })
      .catch((err) => {
        console.log("게시글 삭제에 문제가 발생했습니다", err);
      });
  };
};

const likePostFB = (post_id) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) {
      window.alert("게시물 정보를 받아오고 있습니다. 잠시만 기다려주세요!");
      return window.location.reload();
    }
  };
};

// **************** Reducer **************** //

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
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
    [LIKE_POST]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
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
	loading,
};

export { actionCreators };
