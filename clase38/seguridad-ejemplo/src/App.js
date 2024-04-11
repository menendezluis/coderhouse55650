import "./App.css";
import LoginForm from "./LoginForm";
import SuccessPage from "./SuccessPage";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn", true);
  return (
    <div className="App">{isLoggedIn ? <SuccessPage /> : <LoginForm />}</div>
  );
}

export default App;
