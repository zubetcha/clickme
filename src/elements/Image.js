// elements
import React from "react";
import styled from "styled-components";

const Image = (props) => {
    const { shape, src, size, margin } = props;

    const styles = {
        src: src,
        size: size,
        margin: margin,
    }

    if (shape === "circle") {
        return (
            <ImageCircle {...styles}></ImageCircle>
        )

    }

    if (shape === "rectangle") {
        return (
            <AspectOuter>
                <AspectInner {...styles}></AspectInner>
            </AspectOuter>
        )
    }

    return (
        <React.Fragment>
            <ImageDefault {...styles}></ImageDefault>
        </React.Fragment>
    )
}

Image.defaultProps = {
    shape: "circle",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_Z6Y_X3KyySHOIPcpwOraBX6meYb7q2brg&usqp=CAU",
    size: 36,
    margin: false,
};

const ImageDefault = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
`;


const AspectOuter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    /* margin: 4px; */
`;

export default Image;