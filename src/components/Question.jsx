import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import "../css/Question.css";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  removeItem,
  updateAnswers,
  updateQuestion,
  clearItems,
} from "../store/questionSlice";
import { useSelector } from "react-redux";

const Question = ({ li, questionNumber }) => {
  const questionList = useSelector((store) => {
    return store.questions.items;
  });
  const dispatch = useDispatch();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [qEditText, setQEditText] = useState("");
  const [editRightAnswer, setEditRightAnswer] = useState(null);
  const [showItem, setShowItem] = useState(true);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#414040",
      },
    },
  });

  return (
    <div className="ques__wrapper">
      <div className="question-header">
        <div
          onDoubleClick={() => {
            setIsInputOpen(true);
            setQEditText(li.question);
          }}
        >
          <span>{questionNumber}.</span>
          {!isInputOpen ? (
            li.question
          ) : (
            <>
              <input
                className="edit__field"
                value={qEditText}
                onChange={(e) => {
                  setQEditText(e.target.value);
                }}
              />

              <ThemeProvider theme={theme}>
                <Button
                  onClick={() => {
                    dispatch(
                      updateQuestion({
                        id: questionList[questionNumber - 1].id,
                        question: qEditText,
                      })
                    );
                    setQEditText("");
                    setIsInputOpen(false);
                  }}
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  SAVE
                </Button>
              </ThemeProvider>
            </>
          )}
        </div>
        <div
          className="icon-wrapper"
          onClick={() => {
            setShowItem(!showItem);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          {!showItem ? (
            <img
              src="https://www.svgrepo.com/show/532997/plus-large.svg"
              className="plus-icon acc-icon"
            />
          ) : (
            <img
              src="https://www.svgrepo.com/show/532178/horizontal-rule.svg"
              className="minus-icon acc-icon"
            />
          )}
        </div>
      </div>
      {showItem && (
        <div className="answers">
          {li.answers.map((ans, index) => {
            return (
              <div
                key={index + 1}
                onDoubleClick={() => {
                  setEditIndex(index + 1);
                  setEditText(ans.answer);
                }}
                className={
                  li.correctAnswer === index + 1 ? "ans correct" : "ans"
                }
              >
                {index + 1}.{"  "}
                {editIndex !== index + 1 ? (
                  li.correctAnswer !== index + 1 ? (
                    ans.answer
                  ) : (
                    <>
                      {ans.answer} <DoneIcon />
                    </>
                  )
                ) : (
                  <>
                    <input
                      className="edit__field"
                      value={editText}
                      onChange={(e) => {
                        setEditText(e.target.value);
                      }}
                    />

                    <ThemeProvider theme={theme}>
                      <Button
                        onClick={() => {
                          setEditIndex(null);
                          dispatch(
                            updateAnswers({
                              id: questionList[questionNumber - 1].id,
                              answerNumber: editIndex,
                              newAnswer: editText,
                            })
                          );
                          setEditText("");
                        }}
                        size="small"
                        variant="outlined"
                        color="primary"
                      >
                        SAVE
                      </Button>
                    </ThemeProvider>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => {
            dispatch(removeItem(li.id));
            questionNumber--;
            questionNumber = 0;
          }}
          size="small"
          variant="outlined"
          startIcon={<DeleteOutlinedIcon />}
          color="primary"
        >
          {showItem && "Delete"}
        </Button>
      </ThemeProvider>
    </div>
  );
};
export default Question;
