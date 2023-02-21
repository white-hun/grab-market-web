import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants";
import { Carousel } from "antd";

// 사용할 라이브러리를 확장 시키겠다(dayjs의 확장된 기능들을 사용할 수 있다)
dayjs.extend(relativeTime);

function MainPage() {
  // 화면에서 사용되어야 하기에 state 형태로 관리한다
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  React.useEffect(function () {
    // 상품을 받아오는 로직
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        setProducts(products); // 결과를 업데이트
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
    // banner를 받아오는 로직
    //한번만 실행될 것이기 때문에 useEffect안에 넣어준다
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.error("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={5000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product-list">
        {products.map(function (product, index) {
          return (
            <div className="product-card">
              {product.soldout === 1 && <div className="product-blur" />}
              <Link className="product-link" to={`/products/${product.id}`}>
                <div>
                  <img className="product-img" src={`${API_URL}/${product.imageUrl}`} />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">
                    {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                  </span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img className="product-avatar" src="images/icons/avatar.png" />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product-date">{dayjs(product.createdAt).fromNow()}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
