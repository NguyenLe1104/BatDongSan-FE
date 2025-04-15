import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../style/Chitietsanpham.css";
import MoTaChiTiet from "../../components/MoTaChiTiet";
import { useChat } from "../../context/ChatContext"; // Import context
import nhaDatApi from "../../api/NhaDatApi";

const danhSachBatDongSan = [
    {
        id: 1,
        title: "BÁN BT NAM CƯỜNG DƯƠNG NỘI HÀ ĐÔNG 212M2",
        price: "34,13 tỷ",
        area: "212m²",
        pricePerM2: "161 tr/m²",
        bedrooms: 5,
        bathrooms: 4,
        location: "Hà Đông, Hà Nội",
        images: [
            require("../../assets/slide/banner1.jpg"),
            require("../../assets/slide/banner2.jpg"),
            require("../../assets/slide/banner3.jpg"),
            require("../../assets/slide/banner3.jpg")
        ],
        contact: "0969 524 ***",
        agent: "Nguyễn Bình Gkd",
        description: "Căn biệt thự cao cấp nằm trong khu đô thị Nam Cường Dương Nội."
    },
    {
        id: 2,
        title: "VINHOMES WONDER CITY ĐAN PHƯỢNG",
        price: "50 tỷ",
        area: "200m²",
        pricePerM2: "250 tr/m²",
        bedrooms: 7,
        bathrooms: 6,
        location: "Đan Phượng, Hà Nội",
        images: [
            require("../../assets/slide/banner1.jpg"),
            require("../../assets/slide/banner2.jpg"),
            require("../../assets/slide/banner3.jpg"),
            require("../../assets/slide/banner3.jpg")
        ],
        contact: "0987 761 ***",
        agent: "Global Property",
        description: "Một căn biệt thự sang trọng tại Vinhomes Wonder City."
    }
];


const ChiTietSanPham = () => {
    const { id } = useParams();
    const { setIsChatOpen } = useChat();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await nhaDatApi.getById(id); // Gọi API BE
                const data = res.data;

                // Mapping dữ liệu BE sang UI
                const mappedData = {
                    title: data.TenNhaDat,
                    price: `${Number(data.GiaBan).toLocaleString()} VND`,
                    area: `${data.DienTich}m²`,
                    pricePerM2: data.GiaBan && data.DienTich ? `${Math.round(data.GiaBan / data.DienTich).toLocaleString()} VND/m²` : "",
                    bedrooms: data.SoPhongNgu || 0,
                    bathrooms: data.SoPhongTam || 0,
                    location: `${data.Duong}, ${data.Phuong}, ${data.Quan}, ${data.ThanhPho}`,
                    images: data.hinhAnh?.map(img => img.url) || [],
                    contact: "0969 524 111", // tạm thời hardcode
                    agent: "Nguyễn Bình Gold", // tạm thời hardcode
                    description: data.MoTa,
                };

                setProduct(mappedData);
                setSelectedImage(mappedData.images[0] || "");
            } catch (error) {
                console.error("Lỗi khi tải chi tiết sản phẩm:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="product-container">Đang tải chi tiết sản phẩm...</div>;
    }

    return (
        <div className="product-container">
            <div className="product-top">
                {/* BÊN TRÁI - HÌNH ẢNH */}
                <div className="product-left">
                <div className="main-image-wrapper">
                    <img src={selectedImage} alt="Ảnh chính" className="main-image" />
                </div>

                    <div className="thumbnail-list">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Ảnh ${index + 1}`}
                                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* BÊN PHẢI - THÔNG TIN */}
                <div className="product-right">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-location">Địa chỉ: {product.location}</p>
                    <p className="product-price">Giá Tiền: {product.price}</p>
                    <p className="product-meta">
                       Diện tích {product.area} • {product.pricePerM2} • {product.bedrooms} PN • {product.bathrooms} WC
                    </p>

                    <div className="contact-box">
                        <p><strong>Môi giới: {product.agent}</strong></p>
                        <p className="contact-number">☎ {product.contact}</p>
                        <button className="contact-button" onClick={() => setIsChatOpen(true)}>Liên hệ ngay</button>
                    </div>
                </div>
            </div>

            {/* PHẦN MÔ TẢ NẰM DƯỚI */}
            <div className="product-description">
                <MoTaChiTiet description={product.description} />
            </div>
        </div>

    );
}
export default ChiTietSanPham;