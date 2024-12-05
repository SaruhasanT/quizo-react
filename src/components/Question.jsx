import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import "../css/Question.css";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import { div } from "framer-motion/client";
import { CheckBox } from "@mui/icons-material";
import userSlice from "../store/userSlice";
const Question = ({ li, setList, list, questionNumber }) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editWriteAnswer, setEditWriteAnswer] = useState(null);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#414040",
      },
    },
  });

  return (
    <>
      <div className="ques__wrapper">
        <div>
          <span>{questionNumber}.</span>
          {li.question}
        </div>
        <div className="answers">
          {li.answers.map((ans, index) => {
            return (
              <>
                <div
                  key={index + 1}
                  onDoubleClick={() => {
                    setEditIndex(index + 1);
                    setEditText(ans);
                  }}
                  className={
                    li.correctAnswer === index + 1 ? "ans correct" : "ans"
                  }
                >
                  {index + 1}.{"  "}
                  {editIndex !== index + 1 ? (
                    li.correctAnswer !== index + 1 ? (
                      ans
                    ) : (
                      <>
                        {ans} <DoneIcon />
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
                            li.answers.forEach((a, i) => {
                              if (i + 1 == editIndex) {
                                setList(
                                  list.map((l, j) => {
                                    if (j + 1 === questionNumber) {
                                      return {
                                        ...l,
                                        answers: [
                                          ...l.answers.slice(0, i),
                                          editText,
                                          ...l.answers.slice(i + 1),
                                        ],
                                      };
                                    } else {
                                      return l;
                                    }
                                  })
                                );
                              }
                            });
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
              </>
            );
          })}
        </div>
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => {
              setList([...list].filter((l) => li.id !== l.id));
              questionNumber--;
            }}
            size="small"
            variant="outlined"
            startIcon={<DeleteOutlinedIcon />}
            color="primary"
          >
            Delete
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
};
export default Question;
