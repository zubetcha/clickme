import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { doc, getDocs, addDoc, collection } from "@firebase/firestore";
import "moment";

import { firestore } from "../../shared/firebase";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list: [],
};

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "zubetcha",
    //     user_profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_Z6Y_X3KyySHOIPcpwOraBX6meYb7q2brg&usqp=CAU"
    // },
    image_url: "https://cdn.shopify.com/s/files/1/0969/9128/products/FRD4_1_8138c99c-236c-45e4-aa64-74dd876697da.jpg?v=1561202243",
    contents: "",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (contents="",) => {
    return async function (dispatch, getState, {history}) {
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        }
        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        }

        const docRef = await addDoc(collection(firestore, "post"), {
            ...user_info,
            ..._post
        });

        let post = {user_info, ..._post, id: docRef.id};

        dispatch(addPost(post));
        history.replace("/");
    }
}

const getPostFB = () => {
    return async function (dispatch, getState, {history}) {
        const postDB = await getDocs(collection(firestore, "post"));
        let post_list = [];
        postDB.forEach((doc) => {
            let _post = doc.data();

            let post = Object.keys(_post).reduce((acc, cur) => {

                if(cur.indexOf("user_") !== -1) {
                    return {
                        ...acc,
                        user_info: {...acc.user_info, [cur]: _post[cur]}};
                }
                return {...acc, [cur]: _post[cur]};
            }, {id: doc.id, user_info: {}});
            post_list.push(post);
        })
        dispatch(setPost(post_list));
    }
}

export default handleActions (
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),
        [ADD_POST]: (state, action)  => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        })
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    addPostFB,
    getPostFB,
    
};

export { actionCreators };