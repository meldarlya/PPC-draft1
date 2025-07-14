// FormulaPage.jsx
import React, { useState, useEffect } from 'react';
import './formula.css';
import { FaHome, FaSearch, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Formula = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // สำหรับเพิ่มข้อมูลใหม่
  const [newChemical, setNewChemical] = useState({
    colorCode: "",
    chemicalCode: "",
    name: "",
    chemicalUse: ""
  });

  useEffect(() => {
    const localData = localStorage.getItem("productplan");
    if (localData) {
      setData(JSON.parse(localData));
    } else {
      setData([]);
    }
  }, []);

  // อัปเดต localStorage ทุกครั้งที่ data เปลี่ยน
  useEffect(() => {
    localStorage.setItem("productplan", JSON.stringify(data));
  }, [data]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/product-plan/formula/${search}`);
      setData(res.data);
      setShowTable(true);
    } catch (err) {
      setData([]);
      setShowTable(true);
    }
  };

  const filteredChemicals = showTable && search
    ? data.filter(item =>
        item.colorCode &&
        item.colorCode.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // ลบข้อมูล
  const handleDelete = (idx) => {
    const filtered = data.filter(item =>
      item.colorCode &&
      item.colorCode.toLowerCase().includes(search.toLowerCase())
    );
    const itemToDelete = filtered[idx];
    const newData = data.filter(item => item !== itemToDelete);
    setData(newData);
  };

  // เพิ่มข้อมูล
  const handleAdd = async () => {
    if (
      search &&
      newChemical.chemicalCode &&
      newChemical.name &&
      newChemical.chemicalUse
    ) {
      try {
        // เรียก backend เพื่อเพิ่มสูตรและ RM
        await axios.post("http://localhost:5000/api/product-plan/formula", {
          colorCode: search,
          chemicalCode: newChemical.chemicalCode,
          name: newChemical.name,
          chemicalUse: newChemical.chemicalUse
        });
        // โหลดข้อมูลใหม่หลังเพิ่ม
        handleSearch();
        setNewChemical({
          colorCode: "",
          chemicalCode: "",
          name: "",
          chemicalUse: ""
        });
      } catch (err) {
        alert("เกิดข้อผิดพลาดในการเพิ่มสูตร: " + (err.response?.data?.error || err.message));
      }
    }
  };

  return (
    <div className="fml-container">
      <div className="fml-bg"></div>
      {/* ช่อง input สำหรับค้นหา */}
      <div className="fml-search-group">
        <input
          className="fml-search-input"
          type="text"
          placeholder="enter formula code"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          className="fml-search-btn"
          type="button"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>
      <div className="fml-title">Formula</div>
      <div className="fml-username">User Name Lastname</div>
      <div className="fml-main-bg" />
      <div className="fml-main-inner-bg">
        <div className="fml-formula-title">
          Formula code: {showTable ? (search || "-") : "-"}
        </div>
        {/* แสดงตารางเฉพาะเมื่อกดค้นหา */}
        {showTable && (
          <div className="fml-table-bg">
            <div className="fml-table-scroll">
              <table className="fml-table">
                <thead>
                  <tr>
                    <th>Chemical code</th>
                    <th>Chemical name</th>
                    <th>Chemical use</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* แถวสำหรับเพิ่มข้อมูล (row แรก) */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="chemicalCode"
                        value={newChemical.chemicalCode}
                        onChange={e => setNewChemical({ ...newChemical, chemicalCode: e.target.value })}
                        style={{ width: "90px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="name"
                        value={newChemical.name}
                        onChange={e => setNewChemical({ ...newChemical, name: e.target.value })}
                        style={{ width: "90px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="use"
                        value={newChemical.chemicalUse}
                        onChange={e => setNewChemical({ ...newChemical, chemicalUse: e.target.value })}
                        style={{ width: "90px" }}
                      />
                    </td>
                    <td>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#2986cc",
                          cursor: "pointer",
                          marginLeft: 4
                        }}
                        onClick={handleAdd}
                        title="เพิ่ม"
                      >
                        <FaPlus />
                      </button>
                    </td>
                  </tr>
                  {/* แสดงข้อมูล */}
                  {filteredChemicals.length > 0
                    ? [
                        ...filteredChemicals.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.chemicalCode}</td>
                            <td>{item.name}</td>
                            <td>{item.qtyPerLot ?? item.chemicalUse}</td>
                            <td>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#e53935",
                                  cursor: "pointer"
                                }}
                                // TODO: เพิ่มฟังก์ชันลบสูตร (เรียก backend)
                                // onClick={() => handleDelete(idx)}
                                title="ลบ"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        )),
                        ...Array.from({ length: 8 - filteredChemicals.length }).map((_, idx) => (
                          <tr key={`empty-${idx}`}>
                            <td colSpan={4} style={{ height: 40 }}></td>
                          </tr>
                        ))
                      ]
                    : Array.from({ length: 8 }).map((_, idx) => (
                        <tr key={idx}>
                          <td colSpan={4} style={{ textAlign: "center", color: "#aaa", height: 40 }}>
                            {idx === 0 ? "ไม่พบข้อมูล" : ""}
                          </td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="fml-home-icon">
        <FaHome
          className="fml-icon-home"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/menu")}
        />
      </div>
    </div>
  );
};

export default Formula;
