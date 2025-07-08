import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PlanR.css";
import axios from "axios";

const PlanR = () => {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product-plan")
      .then((res) => setRows(res.data))
      .catch(() => setRows([]));
  }, []);

  const filteredRows = search
    ? rows.filter((row) =>
        (row.colorCode || "").toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  return (
    <div>
      <div className="planr-bg-blue-right"></div>
      <div className="planr-bg-blue-left"></div>
      {/* Header */}
      <div
        className="planr-header"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "18px 32px 0 0",
        }}
      >
        <FaHome
          className="planr-icon-home"
          style={{
            cursor: "pointer",
            fontSize: 28,
            color: "#2986cc",
            marginRight: 12,
          }}
          onClick={() => navigate("/menu")}
        />
        <span className="planr-user-name">User Name Lastname</span>
      </div>
      <div className="planr-bg-white">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            margin: "24px 0 16px 0",
          }}
        >
          <input
            className="planr-search-planr"
            type="text"
            placeholder="Search Product code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <select className="planr-dropdown-planr">
            <option>Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
          <select className="planr-dropdown-planr">
            <option>Years</option>
            <option>2024</option>
            <option>2025</option>
            {/* ...อื่นๆ... */}
          </select>
          <div style={{ flex: 1 }} />
          <button className="planr-export-btn-planr">Export Excel</button>
        </div>
        <div className="planr-table-wrapper">
          <table className="planr-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Product code</th>
                <th>Lot.</th>
                <th>Date</th>
                <th>%</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.department}</td>
                  <td>{row.colorCode}</td>
                  <td>{row.lot}</td>
                  <td>{row.date}</td>
                  <td>{row.percent}</td>
                  <td>{/* ปุ่มดาวน์โหลดหรือไอคอน */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="planr-title">Planning Record</div>
    </div>
  );
};

export default PlanR;
