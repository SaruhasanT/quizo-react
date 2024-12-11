import React, { useRef, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import Header from "./Header";
import "../css/McqCreate.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CheckBox } from "@mui/icons-material";
const McqCreate = ({
  numberOfAnswers,
  setNumberOfAnswers,
  setTotalQuestions,
}) => {
  const handleChange = (event) => {
    setNumberOfAnswers(event.target.value);
  };

  const totalQuestionsRef = useRef();
  const navigate = useNavigate();
  return (
    <div className="mcq-create">
      <form action="">
        <div>
          <label for="no__of__mcq__questions">No of questions</label>
          <TextField
            size="small"
            ref={totalQuestionsRef}
            onChange={() => {
              let totalQuestions =
                totalQuestionsRef.current.children[0].children[0].value;
              setTotalQuestions(totalQuestions);
              console.log(totalQuestions);
            }}
          />
        </div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel
            id="demo-select-small-label"
            onClick={() => {
              console.log("hi");
            }}
          >
            Number of Answers
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Number of Answers"
            value={numberOfAnswers}
            onChange={handleChange}
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <PrimaryButton
          onClick={() => {
            navigate("/build");
          }}
          text="Create"
          backgroundColor="red"
          width="171px"
        />
      </form>
      <div className="list_of_questions"></div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Move
      </button>
    </div>
  );
};

export default McqCreate;
