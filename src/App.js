// 실제로 화면에 보이는 JS파일
// 위의 이유는 처음은 src/index.js 에서 시작 하는데 ReactDOM.render()로 App component를 불러오기 때문

import "./App.css";
import MainPageComponent from "./main/index.js"; //index.js는 생략해도 React에서 알아서 main의 index.js를 찾는다
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./products";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
function App() {
  const history = useHistory();
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/logo.png" />
          </Link>
          <Button
            size="large"
            onClick={function () {
              history.push("/upload");
            }}
            icon={<DownloadOutlined />}
          >
            상품 업로드
          </Button>
        </div>
      </div>
      <div id="body">
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
      <div id="footer"></div>
    </div>
  );
}

export default App;
