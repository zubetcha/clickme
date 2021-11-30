// elements
import React from "react";
import styled from "styled-components";

const Input = (props) => {
    const { width, height, borderBottom, borderTop, borderLeft, borderRight, size, label, placeholder, _onChange, ref} = props;

    const styles = {
        width: width,
        height: height,
        borderBottom: borderBottom,
        borderTop: borderTop,
        borderLeft: borderLeft,
        borderRight: borderRight,
        size: size,
    }

    return (
        <React.Fragment>
            <LabelArea margin="0" size={size}>{label}</LabelArea>
            <InputArea ref={ref} placeholder={placeholder} onChange={_onChange} {...styles}></InputArea>
        </React.Fragment>
    )
}

Input.defaultProps = {
    label: '텍스트',
    placeholder: '텍스트를 입력해주세요.',
    ref: null,
    _onChange: () => {},
}

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
    &:focus {
        outline: none;
    }
`;

export default Input;