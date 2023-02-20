// import { upload } from "@testing-library/user-event/dist/upload";
import { Button, Divider, Form, Input, InputNumber, Upload, message } from "antd";
import { useState } from "react";
import { API_URL } from "../config/constants";
import axios from "axios";
// 페이지 이동
import { useHistory } from "react-router-dom";
import "./index.css";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();
  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        price: parseInt(values.price),
        seller: values.seller,
        description: values.description,
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        // history.push는 페이지 이동하면 이전페이지로 가진다
        // history.replace는 이전 페이지를 생략한다
        // 1 -> 2 -> 3 순으로 이동했을 때, 3페이지에서 페이지 이동이 발생하면 1번 페이지로 간다
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  // 이미지를 업로드하면 onChange함수 호출
  // callback에 들어가는 인자를 이용해서
  // 최종적으로 state를 업데이트
  // 그 후 업데이트된 state에 따라서 화면이 업데이트
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      // imageUrl을 받았을 때 setImageUrl
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item name="upload" label={<div className="upload-label">상품 사진</div>}>
          <Upload
            name="image" // multiport form의 key
            action={`${API_URL}/image`} // 어느 url로 보낼지
            listType="picture"
            showUploadList={false} // 추가적으로 다른 이미지를 보여주는 속성
            onChange={onChangeImage} // onChange 함수 호출 :14
          >
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload-label">판매자 명</div>}
          name="seller"
          rules={[{ required: true, message: "판매자 이름을 입력해주세요." }]}
        >
          <Input className="upload-name" size="large" placeholder="이름을 입력해주세요."></Input>
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품명</div>}
          rules={[{ required: true, message: "상품명을 입력해주세요." }]}
        >
          <Input className="upload-name" size="large" placeholder="상품명을 입력해주세요." />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력햐주세요." }]}
        >
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품 설명</div>}
          rules={[{ required: true, message: "상품 설명을 작성해주세요." }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount
            maxLength={300}
            placeholder="상품 설명을 입력해주세요."
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            문제 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
