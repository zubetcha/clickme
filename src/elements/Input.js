// elements
import React from "react";
import styled from "styled-components";
import { Grid } from ".";

const Input = (props) => {
  const {
    width,
    height,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    size,
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    radio,
    name,
		_onClick,
		is_submit,
		onSubmit,
  } = props;

  const styles = {
    width: width,
    height: height,
    borderBottom: borderBottom,
    borderTop: borderTop,
    borderLeft: borderLeft,
    borderRight: borderRight,
    size: size,
  };

  if (multiLine) {
    return (
      <Grid>
        {label && (
          <LabelArea margin="0" size={size}>
            {label}
          </LabelArea>
        )}
        <ElTextarea
          value={value}
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
          {...styles}
        ></ElTextarea>
      </Grid>
    );
  }

  if (radio) {
    return (
      <React.Fragment>
        <LabelArea htmlFor="radio">
          <input type="radio" name={name} value={value} onClick={_onClick} />
          {label}
        </LabelArea>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
			<LabelArea margin="0" size={size}>
        {label}
      </LabelArea>
			{is_submit ? (<InputArea
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
				value={value}
				onKeyPress={(e) => {
					if(e.key === "Enter") {
						onSubmit(e);
					}
				}}
        {...styles}
      ></InputArea>)
		: (<InputArea
			type={type}
			placeholder={placeholder}
			onChange={_onChange}
			onKeyPress={(e) => {
				if(e.key === "Enter") {
					onSubmit(e);
				}
			}}
			{...styles}
		></InputArea>)} 
    </React.Fragment>
  );
};

Input.defaultProps = {
  name: "",
  value: "",
  multiLine: false,
  radio: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
	is_submit: false,
	onSubmit: () => {},
  _onChange: () => {},
	_onClick: () => {},
};

const ElTextarea = styled.textarea`
  width: 100%;
  padding: 10px 4px;
  border: 1px solid #333;
  box-sizing: border-box;
  background-color: #fbf6ef;

  &:focus {
    outline: none;
  }
`;

const LabelArea = styled.label`
  font-size: 14px;
`;

const InputArea = styled.input`
  width: 100%;
  padding: 10px 4px;
  border-bottom: 3px solid #333;
  border-top: none;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  background-color: #fbf6ef;
  &:focus {
    outline: none;
  }
`;

export default Input;
