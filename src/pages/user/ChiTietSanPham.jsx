import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../style/Chitietsanpham.css";

import bds1 from "../../assets/productImages/bds1.jpg";
import bds2 from "../../assets/productImages/bds2.jpg";

const trangChuSanPhamData = [
  { id: 1, title: "Biệt thự biển sang trọng", description: "Sơn Trà", price: "15 tỷ VNĐ", images: [bds1, bds2] },
  { id: 2, title: "Nhà phố hiện đại", description: "Sơn Trà", price: "7 tỷ VNĐ", images: [bds2, bds1] },
  { id: 3, title: "Biệt thự ven sông", description: "Hải Châu", price: "20 tỷ VNĐ", images: [bds1, bds2] },
  { id: 4, title: "Căn hộ cao cấp", description: "Hòa Vang", price: "10 tỷ VNĐ", images: [bds2, bds1] }
];

const ChiTietSanPham = () => {
  const { id } = useParams();
  const product = trangChuSanPhamData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="product-container">Sản phẩm không tồn tại.</div>;
  }

  return (
    <div className="product-container">
      <div className="product-detail-container">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="product-swiper"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Ảnh ${index + 1}`} className="product-img" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="product-detail-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Giá: <strong>{product.price}</strong></p>
          <button className="buy-button">Liên hệ ngay</button>
        </div>
      </div>
    </div>
  );
};

export default ChiTietSanPham;
