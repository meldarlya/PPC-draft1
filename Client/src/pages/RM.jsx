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
    fetch("/RM1.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => setData([]));
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
    : [];

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
      <div className="rm-main-inner-bg" />
      <div className="rm-inventory-btn" onClick={handleInventoryClick}>
        <span className="rm-inventory-text">Inventory</span>
      </div>
      <div className="rm-label-code">Chemical code :</div>
      <div className="rm-label-total">G-total :</div>
      <div className="rm-home-icon">
        <FaHome
          className="rm-icon-home"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/menu")}
        />
      </div>
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
              {showResult && filteredData.map((item, idx) => (
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
                  <td>{item["G-TOTAL"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RM;
