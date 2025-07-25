import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import banner1 from "../../assets/slide/banner1.jpg";
import TimKiem from "../../components/TimKiem";
import { fetchNhaDatListUser } from "../../services/fetchData";
import nhaDatApi from "../../api/NhaDatApi";
import PhanTrang from "../../components/PhanTrang";
function Batdongsan() {
    const [yeuThich, setYeuThich] = useState([]);
    const [nhaDatList, setNhaDatList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadData(currentPage);
    }, [currentPage]);
    const loadData = async (page = 1) => {
        try {
            const response = await fetchNhaDatListUser(page, 8);
            setNhaDatList(response.data);
            setCurrentPage(response.currentPage);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            setNhaDatList([]);
        }
    };
    const toggleYeuThich = (id) => {
        setYeuThich((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSearch = async (filters) => {

        try {
            const res = await nhaDatApi.search(filters);

            if (Array.isArray(res.data.data)) {
                setNhaDatList(res.data.data);
            } else {
                setNhaDatList([]);
            }
        } catch (error) {
            setNhaDatList([]);
        }
    };

    return (
        <div>
            <TimKiem onSearch={handleSearch} />

            <div className="container mt-4">
                <h2 className="text-center fw-bold fs-4">Danh sách bất động sản</h2>
                <div className="row mt-3">
                    {Array.isArray(nhaDatList) && nhaDatList.map((item) => (
                        <div key={item.id} className="col-12 d-flex justify-content-center mb-4">
                            <div className="card shadow-sm border-0 position-relative" style={{ maxWidth: "850px", width: "100%", minHeight: "550px" }}>
                                <Link to={`/bat-dong-san/${item.id}`} className="text-decoration-none">
                                    <img
                                        src={item.hinhAnh && item.hinhAnh.length > 0 ? item.hinhAnh[0].url : banner1}
                                        className="card-img-top rounded-top"
                                        alt={item.TenNhaDat}
                                        style={{ height: "350px", objectFit: "cover" }}
                                    />
                                </Link>
                                <div className="p-4">
                                    <Link to={`/bat-dong-san/${item.id}`} className="text-decoration-none">
                                        <h4 className="fw-bold mt-2 fs-5 text-dark">{item.TenNhaDat}</h4>
                                    </Link>
                                    <p className="text-danger fw-bold mb-1 fs-6">
                                        {item.GiaBan.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                    </p>
                                    <p className="text-muted small mb-1 fs-6">
                                        {item.DienTich} m² • {item.Huong}
                                    </p>
                                    <p className="text-primary small fs-6">
                                        {item.SoNha}, {item.Duong}, {item.Phuong}, {item.Quan}, {item.ThanhPho}
                                    </p>
                                    <div className="mt-2 d-flex justify-content-end align-items-center">
                                        <div
                                            style={{
                                                cursor: "pointer",
                                                fontSize: "24px",
                                                color: yeuThich.includes(item.id) ? "red" : "gray",
                                            }}
                                            onClick={() => toggleYeuThich(item.id)}
                                        >
                                            <FaHeart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
                <PhanTrang
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Batdongsan;
