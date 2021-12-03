// elements
import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const { is_flex, minWidth, maxWidth, width, height, margin, padding, bg, children, center, _onClick, } = props;
    
    const styles = {
        is_flex: is_flex,
        minWidth: minWidth,
        maxWidth: maxWidth,
        width: width,
        height: height,
        margin: margin,
        padding: padding,
        bg: bg,
        center: center,
    };
    return (
        <React.Fragment>
            <Gridbox onClick={_onClick} {...styles}>{children}</Gridbox>
        </React.Fragment>
    )
}

Grid.defaultProps = {
    children: null,
    is_flex: false,
    minWidth: false,
    maxWidth: false,
    width: "100%",
    height: "",
    padding: false,
    margin: false,
    bg: false,
    center:false,
		_onClick: () => {},
}

const Gridbox = styled.div`
    ${(props) => (props.minWidth? `min-width: ${props.minWidth};` : "")}
    ${(props) => (props.maxWidth? `max-width: ${props.maxWidth};` : "")}
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    box-sizing: border-box;
    ${(props) => (props.padding? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin? `margin: ${props.margin};` : "")}
    ${(props) => (props.bg? `background-color: ${props.bg};` : "")}
    ${(props) => props.is_flex? `display: flex; align-items: center; justify-content: space-between;` : ""}
    ${(props) => props.center? `text-align: center;` : ""}
`;


export default Grid;