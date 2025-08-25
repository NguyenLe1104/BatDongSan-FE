import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "antd";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/Trangchu.css";
import { useNavigate } from "react-router-dom";
import nhaDatApi from "../../api/NhaDatApi";

const { Meta } = Card;

const diaDiemData = [
    { id: 1, title: "Thành Phố Hồ Chí Minh", image: require("../../assets/locations/hcm.jpg"), large: true },
    { id: 2, title: "Hà Nội", image: require("../../assets/locations/hn.jpg") },
    { id: 3, title: "Hải Phòng", image: require("../../assets/locations/hp.jpg") },
    { id: 4, title: "Cần Thơ", image: require("../../assets/locations/ct.jpg") },
    { id: 5, title: "Đà Nẵng", image: require("../../assets/locations/dn.jpg") },
];

const realEstateFeatures = [
    { title: "Bất động sản bán", description: "Tìm kiếm cơ hội đầu tư và an cư lý tưởng.", img: require("../../assets/locations/bdsBan.png") },
    { title: "Bất động sản cho thuê", description: "Cập nhật nhà cho thuê mới nhất.", img: require("../../assets/locations/bdsThue.png") },
    { title: "Đánh giá dự án", description: "Xem nhận xét từ chuyên gia BĐS.", img: require("../../assets/locations/duan.png") },
    { title: "Wiki BĐS", description: "Học hỏi kinh nghiệm và kiến thức BĐS.", img: require("../../assets/locations/wikibds.png") },
];

const Trangchu = () => {
    const [nhaDatList, setNhaDatList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
        loadData(1, true); 
    }, []);

    const loadData = async (pageToLoad = 1, isFirst = false) => {
        try {
            const response = await nhaDatApi.getAll({ page: pageToLoad, limit: 8 });
            const newData = response.data.data;
            if (isFirst) {
                setNhaDatList(newData);
            } else {
                setNhaDatList(prev => [...prev, ...newData]);
            }
            setHasMore(newData.length === 8); // Nếu trả về đủ 8 thì còn dữ liệu
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            if (isFirst) setNhaDatList([]);
            setHasMore(false);
        }
    };

    const handleXemThem = () => {
        const nextPage = page + 1;
        loadData(nextPage);
        setPage(nextPage);
    };

    return (
        <>
            {/* Banner/Hero Section */}
            <div
                style={{
                    background: "linear-gradient(135deg, #0c0c0cff 0%, #959598ff 100%)",
                    color: "white",
                    padding: "60px 0",
                    textAlign: "center",
                }}
            >
                <Container>
                    <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                        Chào mừng đến với BlackS City
                    </h1>
                    <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
                        Nền tảng bất động sản uy tín - Kết nối người mua và người bán
                    </p>
                    <Button
                        variant="light"
                        size="lg"
                        style={{ marginRight: "10px" }}
                        onClick={() => navigate("/bat-dong-san")}
                    >
                        Tìm kiếm ngay
                    </Button>
                    {isLoggedIn ? (
                        <Button
                            variant="outline-light"
                            size="lg"
                            onClick={() => navigate("/form-bai-viet")}
                        >
                            Đăng tin miễn phí
                        </Button>
                    ) : (
                        <Button
                            variant="outline-light"
                            size="lg"
                            onClick={() => navigate("/dang-nhap")}
                        >
                            Đăng nhập để đăng tin
                        </Button>
                    )}
                </Container>
            </div>

            {/* Giới thiệu */}
            <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
                <Row className="justify-content-center text-center">
                    <Col md={4} className="mx-5">
                        <div style={{ padding: '10px' }}>
                            <h3 style={{ color: '#0b0b0bff' }}>🏠 Đa dạng bất động sản</h3>
                            <p>Nhà đất, căn hộ, biệt thự, đất nền với đầy đủ thông tin chi tiết</p>
                        </div>
                    </Col>
                    <Col md={4} className="mx-5">
                        <div style={{ padding: '10px' }}>
                            <h3 style={{ color: '#0b0b0bff' }}>✅ Thông tin xác thực</h3>
                            <p>Tất cả bài đăng đều được kiểm duyệt và xác thực thông tin</p>
                        </div>
                    </Col>
                    <Col md={4} className="mx-5">
                        <div style={{ padding: '10px' }}>
                            <h3 style={{ color: '#0b0b0bff' }}>💰 Giá cả minh bạch</h3>
                            <p>Thông tin giá cả rõ ràng, không ẩn phí, không môi giới</p>
                        </div>
                    </Col>
                </Row>
            </Container>


            {/* Sản phẩm nổi bật */}
            <Container>
                <h2 className="text-center mb-4">Sản phẩm nổi bật</h2>
                <Row gutter={[16, 16]}>
                    {nhaDatList.map((item) => (
                        <Col xs={24} sm={12} md={6} lg={6} key={item.id}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={item.TenNhaDat}
                                        src={
                                            item.hinhAnh && item.hinhAnh.length > 0
                                                ? item.hinhAnh[0].url
                                                : "/default-image.jpg"
                                        }
                                        className="img-fluid card-image"
                                    />
                                }
                                className="shadow-sm card-container"
                            >
                                <Meta title={<span className="card-title">{item.TenNhaDat}</span>} />
                                <p className="card-price text-dark fw-normal">
                                    {item.Quan}, {item.ThanhPho}
                                </p>
                                <p className="card-price">
                                    {Number(item.GiaBan).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                                <Button type="primary" block onClick={() => navigate(`/bat-dong-san/${item.id}`)}>
                                    Xem chi tiết
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {hasMore && (
                    <div className="d-flex justify-content-center mt-4">
                        <Button type="primary" size="large" style={{ borderRadius: 24, fontWeight: 600, padding: '8px 36px' }} onClick={handleXemThem}>
                            Xem thêm
                        </Button>
                    </div>
                )}
            </Container>

            {/* Bất động sản theo địa điểm */}
            <Container className="mt-5">
                <h2 className="text-center mb-4">Bất Động Sản Theo Địa Điểm</h2>
                <div className="real-estate-container">
                    {diaDiemData.map((item) => (
                        <div key={item.id} className={`real-estate-card ${item.large ? "large" : ""}`}>
                            <img src={item.image} alt={item.title} />
                            <div className="location-name">{item.title}</div>
                        </div>
                    ))}
                </div>
            </Container>

            {/* Tìm hiểu thêm về Bất động sản */}
            <Container className="mt-5 mb-5">
                <h2 className="text-center mb-4">Tìm hiểu thêm về Bất động sản</h2>
                <Row gutter={[16, 16]} className="text-center">
                    {realEstateFeatures.map((feature, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                            <Card className="feature-card shadow-sm">
                                <img src={feature.img} alt={feature.title} className="feature-icon mb-3" />
                                <h4 className="feature-title">{feature.title}</h4>
                                <p className="feature-description">{feature.description}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Trangchu;