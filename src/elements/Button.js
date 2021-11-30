// elements
import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const { text, _onClick } = props;

    return (
        <React.Fragment>
            <Btn onClick={_onClick}>{text}</Btn>
        </React.Fragment>
    )
}

Button.defaultProps = {
    text: "텍스트",
    _onClick: () => {},
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

export default Button;