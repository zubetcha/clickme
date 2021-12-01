// elements
import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const { text, _onClick, is_float, children, margin, width } = props;

    if (is_float) {
        return (
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
            </React.Fragment>
        )    
    }

    const styles = {
        margin: margin,
        width: width,
    }


    return (
        <React.Fragment>
            <Btn onClick={_onClick} is_float={is_float} {...styles}>{text? text : children}</Btn>
        </React.Fragment>
    )
}

Button.defaultProps = {
    text: false,
    children: null,
    _onClick: () => {},
    is_float: false,
    margin: false,
    width: '100%',
}

const Btn = styled.button`
    width: ${(props) => props.width};
    ${(props) => (props.margin? `margin: ${props.margin};` : '')};
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