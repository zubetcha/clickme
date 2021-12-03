import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Text, Image, Button, Input } from "../elements";
import Upload from "../shared/Upload";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import Album from "../icons/Lovepik_com-400306429-photo-album.png";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const { history } = props;

  const [layout, setLayout] = React.useState(_post ? _post.layout : "");
  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const handleLayout = (e) => {
    setLayout(e.target.value);
  };

  const addPost = () => {
    if (preview === null || contents === "" || layout === "") {
      window.alert("이미지 업로드와 레이아웃 선택, 게시글 작성을 모두 완료해주세요!");
      return;
    } else {
      dispatch(postActions.addPostFB(contents, layout));
    }
  };

	console.log(layout);

  const editPost = () => {
    if (preview === null || contents === "" || layout === "") {
      window.alert("이미지 업로드와 레이아웃 선택, 게시글 작성을 모두 완료해주세요!");
      return;
    } else {
      dispatch(postActions.editPostFB(post_id, { contents: contents, layout: layout }));
    }
  };

  if (!is_login) {
    return (
      <Grid marign="100px 0" padding="16px" center>
        <Text size="32px" bold>
          잠깐!
        </Text>
        <Text soze="16px">로그인 하신 후 작성하실 수 있습니다.</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러 가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="20px 0" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>
      <Grid padding="16px">
        <Text margin="0" size="24px" bold>
          레이아웃 선택
        </Text>
      </Grid>

      <Grid margin="20px 16px">
        <Input
          radio
          label="텍스트 우측"
          name="layout"
          value="textRight"
          _onClick={handleLayout}
        ></Input>
        <Grid is_flex>
          <Image
            shape="rectangle"
            margin="0"
            size="16"
            src={preview ? preview : Album}
          />
          <Grid />
        </Grid>
      </Grid>
      <Grid margin="20px 16px">
        <Input
          radio
          label="텍스트 좌측"
          name="layout"
          value="textLeft"
          _onClick={handleLayout}
        ></Input>
        <Grid is_flex>
          <Grid />
          <Image
            shape="rectangle"
            margin="0"
            size="16"
            src={preview ? preview : Album}
          />
        </Grid>
      </Grid>
      <Grid margin="20px 16px">
        <Input
          radio
          label="텍스트 상단"
          name="layout"
          value="textTop"
          _onClick={handleLayout}
        ></Input>
        <Image
          shape="rectangle"
          margin="auto"
          src={preview ? preview : Album}
        />
      </Grid>
      <Grid padding="16px">
        <Input
          value={contents}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>
      <Grid padding="16px">
        {is_edit ? (
          <Button _onClick={editPost}>게시글 수정</Button>
        ) : (
          <Button _onClick={addPost}>게시글 작성</Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
