// elements
import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const { bold, color, size, margin, height, vertical, children, cursor, textAlign, _onClick } = props;

    const styles = {
        bold: bold, 
        color: color, 
        size: size, 
        margin: margin, 
        height: height,
        vertical: vertical,
        cursor: cursor,
				textAlign: textAlign,
    }
    return (
        <P {...styles} onClick={_onClick}>
            {children}
        </P>
    )
}

Text.defaultProps = {
    children: null,
    bold: false,
    color: '#333',
    size: '14px',
    margin: false,
    height: '',
    vertical: false,
    cursor: 'default',
		textAlign: 'left',
    _onClick: () => {},
}

const P = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
    ${(props) => (props.vertical ? `vertical-align: ${props.vertical};` : "")};
    cursor: ${(props) => props.cursor};
		text-align: ${(props) => props.textAlign};
`;

export default Text;