import "./index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(function () {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        // product 객체의 product key 까지 접근을 해줘야한다(server.js:100)
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
        <div id="createdAt">{dayjs(product.createdAt).format("YYYY년MM월DD일")}</div>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;

// <pre> tag 줄바꿈을 그대로 출력 해준다
