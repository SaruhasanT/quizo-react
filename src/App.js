import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import McqCreate from "./components/McqCreate";
import "./App.css";
import { useState } from "react";
import Layout from "./components/Layout";
import McqBuild from "./components/McqBuild";
function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          isLoggedIn={isLoggedIn}
          isLogin={isLogin}
          setIsLoggedIn={setIsLoggedIn}
          setIsLogin={setIsLogin}
        />
      ),
      children: [
        {
          path: "/",
          element: (
            <Home
              isLoggedIn={isLoggedIn}
              isLogin={isLogin}
              setIsLoggedIn={setIsLoggedIn}
              setIsLogin={setIsLogin}
            />
          ),
        },
        {
          path: "create",
          element: (
            <McqCreate
              isLoggedIn={isLoggedIn}
              isLogin={isLogin}
              setIsLoggedIn={setIsLoggedIn}
              setIsLogin={setIsLogin}
              setNumberOfAnswers={setNumberOfAnswers}
              setTotalQuestions={setTotalQuestions}
              numberOfAnswers={numberOfAnswers}
            />
          ),
        },
        {
          path: "build",
          element: (
            <McqBuild
              totalQuestions={totalQuestions}
              numberOfAnswers={numberOfAnswers}
            />
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
