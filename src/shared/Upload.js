import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { storage } from "./firebase";
import { actionCreators as imageActions } from "../redux/modules/image";


const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);

    const fileInput = React.useRef();

    const selectFile = (e) => {
				dispatch(imageActions.uploading(true));

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {

            dispatch(imageActions.setPreview(reader.result));
						dispatch(imageActions.uploading(false));
        }
    }

    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}></input>
        </React.Fragment>
    )
}

export default Upload;