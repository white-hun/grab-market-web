import logo from "./logo.svg";
import "./App.css";
import ChildComponent from "./child.js";
import TimerComponent from "./timer.js";

function App() {
  const text = "인프런 화이팅";
  const sayHello = function () {
    return <h3>인프런 강의 좋아</h3>;
  };
  const sayHello2 = function () {
    alert("안녕하세요");
  };
  return (
    <div>
      <h1>안녕하세요!</h1>
      <h2>{text}</h2>
      {sayHello()}
      <div onClick={sayHello2}>클릭해주세요</div>
      <TimerComponent />
      <ChildComponent name="white" age={28} />
      <ChildComponent name="red" age={25} />
      <ChildComponent name="blue" age={24} />
      <ChildComponent name="yellow" age={23} />
    </div>
  );
}

export default App;
