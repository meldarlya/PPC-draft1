import React, { useEffect, useState } from "react";
import "./inventory.css";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // เพิ่มบรรทัดนี้

const Inventory = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // เพิ่มบรรทัดนี้

  useEffect(() => {
    fetch("/RM1.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading RM1.json:", err));
  }, []);

  return (
    <div className="inventory-bg">
      <div className="inventory-header">
        <button className="back-btn" onClick={() => navigate("/rm")}>
          <FaArrowLeft size={28} />
        </button>
        <h1 className="inventory-title">RM Stock</h1>
        <div className="inventory-user">
          <FaHome size={24} className="home-icon" />
          <span>User Name Lastname</span>
        </div>
      </div>
      <div className="inventory-table-outer">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Chemical code</th>
              <th>G-total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item["Code"]}</td>
                <td>
                  {Number(item["G-TOTAL"] || item["G-total"] || 0).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;