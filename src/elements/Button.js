// elements
import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const { text, _onClick, is_float } = props;

    if (is_float) {
        return (
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text}</FloatButton>
            </React.Fragment>
        )    
    }
    
    return (
        <React.Fragment>
            <Btn onClick={_onClick} is_float={is_float}>{text}</Btn>
        </React.Fragment>
    )
}

Button.defaultProps = {
    text: "텍스트",
    _onClick: () => {},
    is_float: false,
}

const Btn = styled.button`
    width: 100%;
    background-color: #333;
    color: whitesmoke;
    padding: 12px 0;
    outline: none;
    border: 0;
    box-sizing: border-box;
`;

const FloatButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: tomato;
    color: whitesmoke;
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 16px;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50%;
`;

export default Button;