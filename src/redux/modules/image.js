import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";

// **************** Action Type **************** //

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";
const DELETE_IMAGE = "DELETE_IMAGE";


// **************** Action Creators **************** //

const uploading = createAction(UPLOADING, (uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));
const deleteImage = createAction(DELETE_IMAGE, (image_url) => ({image_url}));


// **************** Initial Data **************** //

const initialState = {
    image_url: '',
    uploading: false,
    preview: null,
};


// **************** Middlewares **************** //
 
const deleteImageFB = (url, image) => {
	return async function (dispatch, getState, {history}) {

		const imageRef = storage.ref(`images/${image}`);

		await imageRef.delete().then(() => {
			dispatch(deleteImage(url))
		}).catch((error) => {
			console.log("이미지 삭제에 문제가 발생했습니다.");
		});
	};
};


// **************** Reducer **************** //

export default handleActions({
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
    }),
    [UPLOADING]: (state, action) => produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
    }),
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.preview = action.payload.preview;
    }),
		[DELETE_IMAGE]: (state, action) => produce(state, (draft) => {
			action.payload.image_url = '';
		})
}, initialState);

 const actionCreators = {
     uploadImage,
		 deleteImage,
		 deleteImageFB,
     setPreview,
 };

 export { actionCreators };