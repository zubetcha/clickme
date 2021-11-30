// pages
import React from "react";
import styled from "styled-components";
import Post from "../components/Post";


const PostList = (props) => {
    return (
        <React.Fragment>
            <Container>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    max-width: 800px;
    height: 100vh;

    padding-top: 50px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 800px));
    gap: 50px;
`;


export default PostList;