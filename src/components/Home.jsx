import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import "../App.css";
import Login from "./Login";
import DarkBg from "./DarkBg";
import PrimaryButton from "./PrimaryButton";
import { useSelector } from "react-redux";
const Home = ({ setIsLoggedIn, setIsLogin, isLoggedIn, isLogin }) => {
  const user = useSelector((store) => store.users);
  const navigate = useNavigate();
  return (
    <div className="container home">
      {isLogin != null ? (
        <>
          <DarkBg
            onClick={() => {
              setIsLogin(null);
            }}
          />
          <Login
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            setIsLoggedIn={setIsLoggedIn}
          />
        </>
      ) : null}
      <div>
        <main>
          <h1>
            "Quizo: Your Gateway to Fun and Learning – Build a Quiz or Compete
            in One Already Created!"
          </h1>
          <div className="buttons">
            <PrimaryButton
              onClick={() => {
                if (user) {
                  navigate("/create");
                } else {
                  setIsLogin(true);
                }
              }}
              text="create"
              backgroundColor="black"
              width="100px"
            />
            <PrimaryButton
              onClick={() => {}}
              text="Join"
              backgroundColor="black"
              width="100px"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
