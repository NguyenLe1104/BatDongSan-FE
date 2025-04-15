import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchLoaiNhaDatList } from "../services/fetchData";

function TimKiem({ onSearch }) {
    const [filters, setFilters] = useState({
        q: "", // Thay searchText bằng q để phù hợp với BE
        TenLoaiDat: "",
        ThanhPho: "",
        Quan: "",
        Phuong: "",
        Duong: "",
        GiaMin: "",
        GiaMax: "",
        DienTichMin: "",
        DienTichMax: "",
    });

    const thanhPhoVN = [
        "Hà Nội",
        "Hồ Chí Minh",
        "Đà Nẵng",
        "Hải Phòng",
        "Cần Thơ",
        // ... (giữ nguyên danh sách tỉnh thành)
    ];

    const [loaiDatList, setLoaiDatList] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [loaiDat] = await Promise.all([fetchLoaiNhaDatList()]);
            setLoaiDatList(loaiDat);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "GiaBan" && value.includes("-")) {
            const [min, max] = value.split("-").map(Number);
            setFilters((prev) => ({
                ...prev,
                GiaMin: min,
                GiaMax: max,
            }));
        } else if (name === "DienTich" && value.includes("-")) {
            const [min, max] = value.split("-").map(Number);
            setFilters((prev) => ({
                ...prev,
                DienTichMin: min,
                DienTichMax: max,
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

        const handleSearchInputChange = (e) => {
        const { value } = e.target;
        setFilters((prev) => ({
            ...prev,
            q: value // Cập nhật trường q thay vì searchText
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Chuẩn bị params gửi lên server
        const searchParams = {
            ...filters,
            // Loại bỏ các trường rỗng
            ...Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== "" && v !== undefined)
            )
        };
        
        onSearch(searchParams);
    };
    
    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm theo tên, mô tả hoặc địa chỉ"
                                name="searchText"
                                value={filters.searchText}
                                onChange={handleSearchInputChange}
                            />
                            <button className="btn btn-danger" type="submit">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    
                    <div className="col-md-8 mx-auto">
                        <div className="d-flex gap-2 mb-3">
                            <select 
                                className="form-select" 
                                name="ThanhPho" 
                                value={filters.ThanhPho}
                                onChange={handleChange}
                            >
                                <option value="">-- Chọn Thành Phố --</option>
                                {thanhPhoVN.map((tp, idx) => (
                                    <option key={idx} value={tp}>{tp}</option>
                                ))}
                            </select>

                            <select 
                                className="form-select" 
                                name="TenLoaiDat" 
                                value={filters.TenLoaiDat}
                                onChange={handleChange}
                            >
                                <option value="">-- Chọn Loại Đất --</option>
                                {loaiDatList.map(loai => (
                                    <option key={loai.id} value={loai.TenLoaiDat}>
                                        {loai.TenLoaiDat}
                                    </option>
                                ))}
                            </select>

                            <select 
                                className="form-select" 
                                name="GiaBan" 
                                onChange={handleChange}
                                value={
                                    filters.GiaMin && filters.GiaMax 
                                        ? `${filters.GiaMin}-${filters.GiaMax}`
                                        : ""
                                }
                            >
                                <option value="">-- Chọn khoảng giá --</option>
                                <option value="0-1000000000">Dưới 1 tỷ</option>
                                <option value="1000000000-2000000000">1 tỷ - 2 tỷ</option>
                                <option value="2000000000-3000000000">2 tỷ - 3 tỷ</option>
                                <option value="3000000000-5000000000">3 tỷ - 5 tỷ</option>
                                <option value="5000000000-99999999999999">Trên 5 tỷ</option>
                            </select>
                            
                            <select 
                                className="form-select" 
                                name="DienTich" 
                                onChange={handleChange}
                                value={
                                    filters.DienTichMin && filters.DienTichMax 
                                        ? `${filters.DienTichMin}-${filters.DienTichMax}`
                                        : ""
                                }
                            >
                                <option value="">-- Chọn diện tích --</option>
                                <option value="0-50">Dưới 50m²</option>
                                <option value="50-100">50 - 100m²</option>
                                <option value="100-200">100 - 200m²</option>
                                <option value="200-99999">Trên 200m²</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TimKiem;