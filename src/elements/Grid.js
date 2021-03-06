// elements
import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const { is_flex, minWidth, maxWidth, width, height, margin, padding, bg, children, center, borderBottom, position, zIndex, top, left, border, _onClick, } = props;
    
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
				borderBottom: borderBottom,
				position: position,
				zIndex: zIndex,
				top: top,
				left: left,
				border: border,
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
		borderBottom: false,
		position: false,
		zIndex: 0,
		top: false,
		left: false,
		border:false,
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
    ${(props) => props.borderBottom? `border-bottom: ${props.borderBottom};` : ""}
    ${(props) => props.position? `position: ${props.position};` : ""}
    ${(props) => props.zIndex? `z-index: ${props.zIndex};` : ""}
    ${(props) => props.top? `top: ${props.top};` : ""}
    ${(props) => props.left? `left: ${props.left};` : ""}
    ${(props) => props.border? `border: ${props.border};` : ""}

`;


export default Grid;