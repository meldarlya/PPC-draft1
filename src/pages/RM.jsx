// RMStockPage.jsx
import React, { useState, useEffect } from 'react';
import './RM.css';
import { FaHome, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RM = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // โหลดข้อมูลจาก inventory (RM1.json)
  useEffect(() => {
    // ถ้ามีใน localStorage ให้ใช้ข้อมูลล่าสุด
    const local = localStorage.getItem('RM1.json');
    if (local) {
      setData(JSON.parse(local));
    } else {
      fetch("/RM1.json")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => setData([]));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowResult(false); // ซ่อนผลลัพธ์เมื่อเปลี่ยนข้อความ
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  const handleInventoryClick = () => {
    navigate("/inventory");
  };

  // ฟิลเตอร์ข้อมูลตาม code ที่ค้นหา (ถ้าไม่กรอกจะแสดงทั้งหมด)
  const filteredData = search
    ? data.filter(item =>
        item["Code"] &&
        item["Code"].toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div className="rm-container">
      <div className="rm-bg"></div>
      {/* ช่อง input สำหรับค้นหา */}
      <form className="rm-search-group" onSubmit={handleSearch}>
        <input
          className="rm-search-input"
          type="text"
          placeholder="enter chem code"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="rm-search-btn" type="submit">
          <FaSearch />
        </button>
      </form>
      <div className="rm-title">RM Stock</div>
      <div className="rm-username">User Name Lastname</div>
      <div className="rm-main-bg" />
      <div className="rm-main-inner-bg">
        <div className="rm-table-bg">
          <div className="rm-table-scroll">
            <table className="rm-table">
              <thead>
                <tr>
                  <th>Chemical code</th>
                  <th>G-total</th>
                </tr>
              </thead>
              <tbody>
                {(search ? filteredData : data).map((item, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        background:
                          search && item["Code"] && item["Code"].toLowerCase().includes(search.toLowerCase())
                            ? "#fff9c4"
                            : "transparent"
                      }}
                    >
                      {item["Code"]}
                    </td>
                    <td>
                      {item["G-TOTAL"] !== undefined && item["G-TOTAL"] !== null
                        ? Number(item["G-TOTAL"]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rm-alert-list">
          {(search ? filteredData : data)
            .filter(item => Number(item["G-TOTAL"]) === 0)
            .map((item, idx) => (
              <div key={idx} className="rm-alert-red">
                <span className="alert-icon">🚨</span>
                <b>{item["Code"]}</b> : สารนี้คงเหลือ 0
              </div>
            ))}
        </div>
      </div>

      <div className="rm-home-icon">
        <FaHome
          className="rm-icon-home"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/menu")}
        />
      </div>
    </div>
  );
};

export default RM;
