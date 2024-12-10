import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { AnimatePresence } from "framer-motion";
import "../css/Question.css";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Checkbox from "@mui/material/Checkbox";
import {
  removeItem,
  updateAnswers,
  updateQuestion,
  updateCorrectAnswer,
} from "../store/questionSlice";
import { useSelector } from "react-redux";
const AnimatedInput = motion.create(TextField);

const Question = ({ li, questionNumber, lastItemRef }) => {
  const [correctAnsCheckIndex, setCorrectAnsCheckIndex] = useState(
    li.correctAnswer
  );
  useEffect(() => {
    dispatch(
      updateCorrectAnswer({
        questionNumber: questionNumber,
        correctAnswer: correctAnsCheckIndex,
      })
    );
  }, [correctAnsCheckIndex]);

  const questionSave = useRef();
  const answerSave = useRef();

  const questionList = useSelector((store) => {
    return store.questions.items;
  });
  const dispatch = useDispatch();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [qEditText, setQEditText] = useState("");
  const [showItem, setShowItem] = useState(true);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#414040",
      },
    },
  });
  const checkBoxRef = useRef();
  useEffect(() => {
    setEditIndex(null);
    dispatch(
      updateAnswers({
        id: questionList[questionNumber - 1].id,
        answerNumber: editIndex,
        newAnswer: editText,
      })
    );
    setEditText("");
  }, [setEditIndex]);

  return (
    <div className="ques__wrapper" ref={lastItemRef}>
      <div className="question-header">
        <div
          onClick={(e) => {
            if (e.target === questionSave.current) return;
            setIsInputOpen(true);
            setQEditText(li.question);
          }}
        >
          <span>{questionNumber}.</span>
          {!isInputOpen ? (
            li.question
          ) : (
            <>
              {/* <input
                className="edit__field"
                value={qEditText}
                onChange={(e) => {
                  setQEditText(e.target.value);
                }}
              /> */}
              <TextField
                id="standard-basic"
                className="edit__field"
                value={qEditText}
                onChange={(e) => {
                  setQEditText(e.target.value);
                }}
                label=""
                variant="standard"
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
                  ref={questionSave}
                >
                  SAVE
                </Button>
              </ThemeProvider>
            </>
          )}
        </div>
        <div
          className={showItem ? "active icon-wrapper" : "icon-wrapper"}
          onClick={() => {
            setShowItem(!showItem);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <span className="a"></span>
          <span className="b"></span>
        </div>
      </div>

      <AnimatePresence>
        {showItem && (
          <motion.div
            initial={{
              height: 0,
              overflow: "hidden",
            }}
            animate={{
              height: "auto",
            }}
            exit={{
              height: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="answers"
          >
            {li.answers.map((ans, index) => {
              return (
                <div
                  className={
                    li.correctAnswer === index + 1 ? "ans correct" : "ans"
                  }
                >
                  <Checkbox
                    checked={correctAnsCheckIndex === index + 1 ? true : false}
                    onChange={() => {
                      setCorrectAnsCheckIndex(index + 1);

                      console.log(li.correctAnswer, correctAnsCheckIndex);
                    }}
                    ref={checkBoxRef}
                    style={{
                      padding: 0,
                      zIndex: 100,
                      position: "absolute",
                      top: "50%",
                      width: 50,
                      margin: 0,
                    }}
                  />
                  <div
                    key={index + 1}
                    onClick={(e) => {
                      if (e.target === answerSave.current) {
                        return;
                      }
                      setEditIndex(index + 1);
                      setEditText(ans.answer);
                    }}
                    className="no_checkBox"
                  >
                    <div>
                      {index + 1}.{"  "}
                    </div>
                    {editIndex !== index + 1 ? (
                      li.correctAnswer !== index + 1 ? (
                        <div>{ans.answer}</div>
                      ) : (
                        <div className="flex w-40 justify-between">
                          <div className="">{ans.answer}</div>{" "}
                          <DoneIcon size="small" />
                        </div>
                      )
                    ) : (
                      <div className="input__and__btn">
                        <AnimatePresence>
                          <AnimatedInput
                            initial={{
                              width: 0,
                              overflow: "hidden",
                              borderBottom: "1px solid",
                              borderRadius: 0,
                            }}
                            animate={{
                              width: "auto",
                            }}
                            exit={{
                              width: 0,
                            }}
                            id="standard-basic"
                            className="edit__field"
                            value={editText}
                            onChange={(e) => {
                              setEditText(e.target.value);
                            }}
                            label=""
                            variant="standard"
                          />
                        </AnimatePresence>
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
                            ref={answerSave}
                          >
                            SAVE
                          </Button>
                        </ThemeProvider>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

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
          style={{
            marginTop: 10,
            marginLeft: 15,
          }}
        >
          Delete
        </Button>
      </ThemeProvider>
    </div>
  );
};
export default Question;
