// elements
import React from "react";
import styled from "styled-components";
import { Grid, Text } from ".";

const Input = (props) => {
    const { width, height, borderBottom, borderTop, borderLeft, borderRight, size, label, placeholder, _onChange, type, multiLine, value, } = props;
    

    const styles = {
        width: width,
        height: height,
        borderBottom: borderBottom,
        borderTop: borderTop,
        borderLeft: borderLeft,
        borderRight: borderRight,
        size: size,
    }

    if (multiLine) {
        return (
            <Grid>
               {label && <LabelArea margin="0" size={size}>{label}</LabelArea>}
                <ElTextarea value={value} rows={10} placeholder={placeholder} onChange={_onChange} {...styles}></ElTextarea>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            {label && <LabelArea margin="0" size={size}>{label}</LabelArea>}
            <InputArea type={type} placeholder={placeholder} onChange={_onChange} {...styles}></InputArea>
        </React.Fragment>
    )
}

Input.defaultProps = {
		value: "",
    multiLine: false,
    label: false,
    placeholder: '텍스트를 입력해주세요.',
    type: "text",
    _onChange: () => {},
}

const ElTextarea = styled.textarea`
    width: 100%;
    padding: 10px 4px;
    border: 1px solid #333;
    box-sizing: border-box;
    background-color: #FBF6EF;

    &:focus {
        outline: none;
    }

`;

const LabelArea = styled.label`
    font-size: 12px;
`;

const InputArea = styled.input`
    width: 100%;
    padding: 10px 4px;
    border-bottom: 3px solid #333;
    border-top: none;
    border-left: none;
    border-right: none;
    box-sizing: border-box;
    background-color: #FBF6EF;
    &:focus {
        outline: none;
    }
`;

export default Input;