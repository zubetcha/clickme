import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { doc, getDocs, collection } from "@firebase/firestore";

import { firestore } from "../../shared/firebase";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list: [],
};

const initialPost = {
    id: 0,
    user_info: {
        user_name: "zubetcha",
        user_profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_Z6Y_X3KyySHOIPcpwOraBX6meYb7q2brg&usqp=CAU"
    },
    image_url: "https://cdn.shopify.com/s/files/1/0969/9128/products/FRD4_1_8138c99c-236c-45e4-aa64-74dd876697da.jpg?v=1561202243",
    title: "제목입니다.",
    contents: "고양이네요!",
    comment_cnt: 10,
    insert_dt: "2021-11-28 10:00:00",
};

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
        console.log(post_list);
        dispatch(setPost(post_list));
    }
}

export default handleActions (
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),
        [ADD_POST]: (state, action)  => produce(state, (draft) => {

        })
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
};

export { actionCreators };