import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const thanhPhoVN = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

const FormDangBai = () => {
  const [formData, setFormData] = useState({
    tenNhaDat: "",
    thanhPho: "",
    quan: "",
    phuong: "",
    duong: "",
    soNha: "",
    moTa: "",
    giaBan: "",
    dienTich: "",
    huong: "",
    hinhAnh: null,
  });

  const [provincesData, setProvincesData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Tải dữ liệu quận/huyện và phường/xã từ API
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvincesData(data))
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  // Cập nhật danh sách quận/huyện khi chọn tỉnh/thành
  useEffect(() => {
    if (formData.thanhPho) {
      const selectedProvince = provincesData.find((p) =>
        p.name.includes(formData.thanhPho) ||
        formData.thanhPho.includes(p.name)
      );
      setDistricts(selectedProvince ? selectedProvince.districts : []);
      setFormData((prev) => ({ ...prev, quan: "", phuong: "" }));
      setWards([]);
    }
  }, [formData.thanhPho, provincesData]);

  // Cập nhật danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (formData.quan) {
      const selectedDistrict = districts.find((d) => d.name === formData.quan);
      setWards(selectedDistrict ? selectedDistrict.wards : []);
      setFormData((prev) => ({ ...prev, phuong: "" }));
    }
  }, [formData.quan, districts]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/nhaDat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Đăng bài thành công!");
        setFormData({
          tenNhaDat: "",
          thanhPho: "",
          quan: "",
          phuong: "",
          duong: "",
          soNha: "",
          moTa: "",
          giaBan: "",
          dienTich: "",
          huong: "",
          hinhAnh: null,
        });
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Lỗi khi gửi dữ liệu.");
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm rounded-4 p-4">
            <h3 className="mb-4 text-center">📝 Nhập Thông Tin Bất Động Sản</h3>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Tên nhà đất</Form.Label>
                    <Form.Control
                      name="tenNhaDat"
                      value={formData.tenNhaDat}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Thành phố</Form.Label>
                    <Form.Select
                      name="thanhPho"
                      value={formData.thanhPho}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      {thanhPhoVN.map((province, index) => (
                        <option key={index} value={province}>
                          {province}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Quận</Form.Label>
                    <Form.Select
                      name="quan"
                      value={formData.quan}
                      onChange={handleChange}
                      required
                      disabled={!formData.thanhPho}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Phường</Form.Label>
                    <Form.Select
                      name="phuong"
                      value={formData.phuong}
                      onChange={handleChange}
                      required
                      disabled={!formData.quan}
                    >
                      <option value="">Chọn phường/xã</option>
                      {wards.map((ward) => (
                        <option key={ward.code} value={ward.name}>
                          {ward.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Đường</Form.Label>
                    <Form.Control
                      name="duong"
                      value={formData.duong}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Số nhà</Form.Label>
                    <Form.Control
                      name="soNha"
                      value={formData.soNha}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Hướng</Form.Label>
                    <Form.Select
                      name="huong"
                      value={formData.huong}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Chọn hướng</option>
                      <option value="Đông">Đông</option>
                      <option value="Tây">Tây</option>
                      <option value="Nam">Nam</option>
                      <option value="Bắc">Bắc</option>
                      <option value="Đông Bắc">Đông Bắc</option>
                      <option value="Đông Nam">Đông Nam</option>
                      <option value="Tây Bắc">Tây Bắc</option>
                      <option value="Tây Nam">Tây Nam</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="moTa"
                  value={formData.moTa}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Giá bán (VNĐ)</Form.Label>
                    <Form.Control
                      type="number"
                      name="giaBan"
                      value={formData.giaBan}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Diện tích (m²)</Form.Label>
                    <Form.Control
                      type="number"
                      name="dienTich"
                      value={formData.dienTich}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="file"
                  name="hinhAnh"
                  accept="image/*"
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="px-5 rounded-pill"
                >
                  Đăng Bài
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormDangBai;