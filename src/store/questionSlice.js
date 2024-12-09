import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload) {
          state.items.splice(i, 1);
        }
      }
    },
    updateQuestion: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload.id) {
          state.items[i].question = action.payload.question;
        }
      }
    },
    updateAnswers: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id == action.payload.id) {
          for (let j = 0; j < state.items[i].answers.length; j++) {
            if (
              state.items[i].answers[j].answerNumber ===
              action.payload.answerNumber
            ) {
              state.items[i].answers[j].answer = action.payload.newAnswer;
            }
          }
        }
      }
    },
    updateCorrectAnswer: (state, action) => {
      state.items.forEach((item, index) => {
        if (index === action.payload.questionNumber - 1) {
          item.correctAnswer = action.payload.correctAnswer;
        }
      });
    },
    clearItems: (state) => {
      state.items.length = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuestion,
  updateAnswers,
  clearItems,
  updateCorrectAnswer,
} = questionSlice.actions;

export default questionSlice.reducer;
