import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Question from "./Question";
import "../css/McqBuild.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#414040",
    },
  },
});
const McqBuild = () => {
  const [list, setList] = useState([]);
  const [questionValue, setQuestionValue] = useState(null);
  const [ans1, setAns1] = useState(null);
  let question = useRef(null);
  const [ans2, setAns2] = useState(null);
  const [ans3, setAns3] = useState(null);
  const [ans4, setAns4] = useState(null);
  const [ans5, setAns5] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedIndex, setCheckedIndex] = useState(0);
  let questionNumber = 0;
  const setValue = (e, setItem) => {
    let value = e.target.value;
    if (value === "") {
      setItem(null);
    } else {
      setItem(value);
    }
  };
  const resetField = (element, state) => {};
  const questionStyle = {
    ".MuiOulinedInput-root": {
      input: {
        color: "blue",
        fontSize: 40,
        border: "1px solid red",
      },
      fieldSet: {
        color: "blue",
      },
    },
  };
  const answerStyle = {
    label: {
      marginLeft: "30px",
    },
    "& label.Mui-focused": {
      marginLeft: "15px",
      background: "white",
      display: "none",
    },
    "& .MuiInput-root": {
      input: {
        paddingLeft: "30px",
      },
    },
  };
  return (
    <div className="mcq__build">
      <div className="mcq__building">
        <form>
          <h2>Create your question here.</h2>
          <div className="question__wrapper">
            <span>
              <span className="question__number">{list.length + 1}</span>.
            </span>
            <TextField
              id="standard-basic"
              label="Question"
              variant="outlined"
              ref={question}
              onChange={(e) => {
                setQuestionValue(
                  question.current.children[1].children[0].value
                );
              }}
              sx={questionStyle}
            />
          </div>
          <div className="answers">
            <div>
              <span>1.</span>
              <TextField
                onChange={(e) => setValue(e, setAns1)}
                id="standard-basic"
                label="Answer 01"
                variant="standard"
                size="small"
                sx={answerStyle}
              />
              <Checkbox
                checked={checkedIndex === 0 ? true : false}
                onChange={(e) => {
                  setIsChecked(!isChecked);
                  setCheckedIndex(0);
                }}
              />
            </div>
            <div>
              <span>2.</span>
              <TextField
                onChange={(e) => setValue(e, setAns2)}
                id="standard-basic"
                label="Answer 02"
                variant="standard"
                size="small"
                sx={answerStyle}
              />{" "}
              <Checkbox
                checked={checkedIndex === 1 ? true : false}
                onChange={(e) => {
                  setIsChecked(!isChecked);
                  setCheckedIndex(1);
                }}
              />
            </div>
            <div>
              <span>3.</span>
              <TextField
                onChange={(e) => setValue(e, setAns3)}
                id="standard-basic"
                label="Answer 03"
                variant="standard"
                size="small"
                sx={answerStyle}
              />{" "}
              <Checkbox
                checked={checkedIndex === 2 ? true : false}
                onChange={(e) => {
                  setIsChecked(!isChecked);
                  setCheckedIndex(2);
                }}
              />
            </div>
            <div className="ansNo4">
              <span>4.</span>
              <TextField
                onChange={(e) => setValue(e, setAns4)}
                id="standard-basic"
                label="Answer 04"
                variant="standard"
                size="small"
                sx={answerStyle}
              />{" "}
              <Checkbox
                checked={checkedIndex === 3 ? true : false}
                onChange={(e) => {
                  setIsChecked(!isChecked);
                  setCheckedIndex(3);
                }}
              />
            </div>
            <div className="ansNo5">
              <span>5.</span>
              <TextField
                required
                onChange={(e) => setValue(e, setAns5)}
                id="standard-basic"
                label="Answer 05"
                variant="standard"
                size="small"
                sx={answerStyle}
              />{" "}
              <Checkbox
                checked={checkedIndex === 4 ? true : false}
                onChange={(e) => {
                  setIsChecked(!isChecked);
                  setCheckedIndex(4);
                }}
              />
            </div>
          </div>
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              size="small"
              onClick={() => {
                setList([
                  ...list,
                  {
                    id: uuidv4(),
                    question: questionValue,
                    answers: [ans1, ans2, ans3, ans4, ans5].filter(
                      (item) => item !== null
                    ),
                    correctAnswer: checkedIndex + 1,
                  },
                ]);
                question.current.children[1].children[0].value = "";
                setQuestionValue("");
                console.log(list);
              }}
              variant="outlined"
            >
              ADD
            </Button>
          </ThemeProvider>
        </form>
        <ThemeProvider theme={theme}>
          <Button variant="outlined" size="small" color="primary">
            Submit
          </Button>
        </ThemeProvider>
      </div>
      <div className="mcq__container">
        {list.map((li) => {
          ++questionNumber;
          return (
            <Question
              key={li.id}
              li={li}
              setList={setList}
              list={list}
              questionNumber={questionNumber}
            />
          );
        })}
      </div>
    </div>
  );
};

export default McqBuild;
