import "./App.css";
import MainPageComponent from "./main/index.js"; //index.js는 생략해도 React에서 알아서 main의 index.js를 찾는다
import { Switch, Route } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./products";
function App() {
  return (
    <div>
      <Switch>
        <Route exact={true} path={"/"}>
          <MainPageComponent /> {/* 위에 path 경로로 들어갔을때 이 페이지를 보여주겠다 */}
        </Route>
        <Route exact={true} path="/products/:id">
          <ProductPage />
        </Route>
        <Route exact={true} path="/upload">
          <UploadPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
