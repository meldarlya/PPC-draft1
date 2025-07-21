// FormulaPage.jsx
import React, { useState, useEffect } from 'react';
import './formula.css';
import { FaHome, FaSearch, FaTrash, FaPlus, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Formula = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [prefix, setPrefix] = useState("");
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showAddFormula, setShowAddFormula] = useState(false);
  const [newFormulaCode, setNewFormulaCode] = useState("");
  const [newFormulaRemark, setNewFormulaRemark] = useState(""); // เพิ่ม state สำหรับ Remark
  const [newFormulaChemicals, setNewFormulaChemicals] = useState([
    { chemicalCode: "", name: "", chemicalUse: "" },
    { chemicalCode: "", name: "", chemicalUse: "" },
    { chemicalCode: "", name: "", chemicalUse: "" }
  ]);

  // สำหรับเพิ่มข้อมูลใหม่
  const [newChemical, setNewChemical] = useState({
    colorCode: "",
    chemicalCode: "",
    name: "",
    chemicalUse: ""
  });

  const [editIdx, setEditIdx] = useState(null);
  const [editChemicalUse, setEditChemicalUse] = useState("");

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

  const handleSearch = () => {
    // โหลดข้อมูลล่าสุดจาก localStorage ทุกครั้งที่ค้นหา
    const localData = localStorage.getItem("productplan");
    if (localData) {
      setData(JSON.parse(localData));
    } else {
      setData([]);
    }
    setShowTable(true);
    // ถ้าต้องการรวม prefix กับ search:
    // setSearch(prefix ? `${prefix} ${search}` : search);
  };

  const filteredChemicals = showTable && search
    ? data.filter(item =>
        item.chemicalCode &&
        item.colorCode &&
        item.colorCode.toLowerCase() === search.toLowerCase()
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
  const handleAdd = () => {
    if (
      search && // ต้องมีสูตรที่ค้นหาอยู่
      newChemical.chemicalCode &&
      newChemical.name &&
      newChemical.chemicalUse
    ) {
      // เพิ่ม colorCode ให้ตรงกับสูตรที่ค้นหา
      const newItem = {
        colorCode: search,
        chemicalCode: newChemical.chemicalCode,
        name: newChemical.name,
        chemicalUse: newChemical.chemicalUse
      };
      setData([...data, newItem]);
      setNewChemical({
        colorCode: "",
        chemicalCode: "",
        name: "",
        chemicalUse: ""
      });
    }
  };

  // ฟังก์ชันสำหรับบันทึกการแก้ไข
  const handleEditSave = (idx) => {
    const filtered = data.filter(item =>
      item.colorCode &&
      item.colorCode.toLowerCase().includes(search.toLowerCase())
    );
    const itemToEdit = filtered[idx];
    const newData = data.map(item =>
      item === itemToEdit
        ? { ...item, chemicalUse: editChemicalUse }
        : item
    );
    setData(newData);
    setEditIdx(null);
    setEditChemicalUse("");
  };

  const handleAddFormulaChemical = () => {
    setNewFormulaChemicals([
      ...newFormulaChemicals,
      { chemicalCode: "", name: "", chemicalUse: "" }
    ]);
  };

  const handleChangeFormulaChemical = (idx, field, value) => {
    const updated = [...newFormulaChemicals];
    updated[idx][field] = value;
    setNewFormulaChemicals(updated);
  };

  // เพิ่ม Remark ใน handleSubmitFormula
  const handleSubmitFormula = () => {
    if (!newFormulaCode) return;
    const newItems = newFormulaChemicals
      .filter(c => c.chemicalCode && c.name && c.chemicalUse)
      .map(c => ({
        colorCode: newFormulaCode,
        remark: newFormulaRemark, // เพิ่ม remark ในแต่ละรายการ
        chemicalCode: c.chemicalCode,
        name: c.name,
        chemicalUse: c.chemicalUse
      }));
    setData([...data, ...newItems]);
    setShowAddFormula(false);
    setNewFormulaCode("");
    setNewFormulaRemark(""); // reset remark
    setNewFormulaChemicals([{ chemicalCode: "", name: "", chemicalUse: "" }]);
  };

  return (
    <div className="fml-container">
      <div className="fml-bg"></div>
      {/* ช่อง input สำหรับค้นหา */}
      <div className="fml-search-group">
        <div className="fml-search-prefix-group">
          <select
            value={prefix}
            onChange={e => setPrefix(e.target.value)}
            className="fml-search-prefix"
          >
            <option value="">Prefix</option>
            <option value="Syn.">Syn.</option>
            <option value="Pi-1">Pi-1</option>
            <option value="Pi-2">Pi-2</option>
          </select>
          <input
            className="fml-search-input"
            type="text"
            placeholder="enter formula code"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
            disabled={false}
          />
        </div>
        <button
          className="fml-search-btn"
          type="button"
          onClick={handleSearch}
          disabled={showAddFormula}
        >
          <FaSearch />
        </button>
        <button
          className="fml-extra-btn"
          type="button"
          style={{
            marginLeft: 8,
            background: "#61bdee",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0 16px",
            height: "38px",
            fontWeight: 500,
            cursor: "pointer"
          }}
          onClick={() => setShowAddFormula(true)}
        >
          New Formula
        </button>
      </div>
      <div className="fml-title">Formula</div>
      <div className="fml-username">User Name Lastname</div>
      <div className="fml-main-bg" />
      <div className="fml-main-inner-bg">
        <div className="fml-formula-title">
          Formula code: {showTable ? (search || "-") : "-"}
        </div>
        {/* Modal สำหรับเพิ่มสูตรใหม่ */}
        {showAddFormula && (
          <div className="fml-modal-bg">
            <div className="fml-modal-content">
              <div className="fml-modal-header">
                <h3 className="fml-modal-title">New Formula</h3>
                <div style={{ display: "flex", gap: 16 }}>
                  <div className="fml-formula-input-group">
                    <label className="fml-formula-label">Formula code: </label>
                    <input
                      type="text"
                      value={newFormulaCode}
                      onChange={e => setNewFormulaCode(e.target.value)}
                      className="fml-formula-input"
                    />
                  </div>
                  <div className="fml-formula-input-group">
                    <label className="fml-formula-label">Remark: </label>
                    <select
                      className="fml-formula-input"
                      value={newFormulaRemark}
                      onChange={e => setNewFormulaRemark(e.target.value)}
                    >
                      <option value="">--เลือก Remark--</option>
                      <option value="Syn.">Syn.</option>
                      <option value="Pi-1">Pi-1</option>
                      <option value="Pi-2">Pi-2</option>
                    </select>
                  </div>
                </div>
              </div>
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
                      {newFormulaChemicals.map((chem, idx) => (
                        <tr key={idx}>
                          <td>
                            <input
                              type="text"
                              placeholder="chemicalCode"
                              value={chem.chemicalCode}
                              onChange={e =>
                                handleChangeFormulaChemical(idx, "chemicalCode", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              placeholder="name"
                              value={chem.name}
                              onChange={e =>
                                handleChangeFormulaChemical(idx, "name", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              placeholder="use"
                              value={chem.chemicalUse}
                              onChange={e =>
                                handleChangeFormulaChemical(idx, "chemicalUse", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <button
                              className="fml-btn-delete"
                              onClick={() =>
                                setNewFormulaChemicals(
                                  newFormulaChemicals.filter((_, i) => i !== idx)
                                )
                              }
                              title="ลบ"
                              disabled={newFormulaChemicals.length === 1}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={4} style={{ textAlign: "right" }}>
                          <button
                            className="fml-btn-add-row"
                            onClick={handleAddFormulaChemical}
                          >
                           add row
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="fml-modal-footer">
                <button
                  className="fml-btn-submit"
                  onClick={handleSubmitFormula}
                  disabled={
                    !newFormulaCode ||
                    newFormulaChemicals.filter(
                      c => c.chemicalCode && c.name && c.chemicalUse
                    ).length === 0
                  }
                >
                  Submit
                </button>
                <button
                  className="fml-btn-cancel"
                  onClick={() => setShowAddFormula(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* แสดงตารางเฉพาะเมื่อกดค้นหา */}
        {!showAddFormula && showTable && (
          <div className="fml-main-table-area" style={{ display: "flex", gap: 32 }}>
            {showTable && (
              <div className="fml-main-table-bg">
                <div className="fml-main-table-scroll">
                  <table className="fml-main-table">
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
                                <td>
                                  {editIdx === idx ? (
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                      <input
                                        type="text"
                                        value={editChemicalUse}
                                        autoFocus
                                        style={{ width: "90px" }}
                                        onChange={e => setEditChemicalUse(e.target.value)}
                                        onKeyDown={e => {
                                          if (e.key === "Enter") handleEditSave(idx);
                                          if (e.key === "Escape") {
                                            setEditIdx(null);
                                            setEditChemicalUse("");
                                          }
                                        }}
                                      />
                                      <button
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#43a047",
                                          cursor: "pointer",
                                          padding: 0
                                        }}
                                        onClick={() => handleEditSave(idx)}
                                        title="ยืนยัน"
                                      >
                                        <FaCheck />
                                      </button>
                                      <button
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#e53935",
                                          cursor: "pointer",
                                          padding: 0
                                        }}
                                        onClick={() => {
                                          setEditIdx(null);
                                          setEditChemicalUse("");
                                        }}
                                        title="ยกเลิก"
                                      >
                                        <FaTimes />
                                      </button>
                                    </div>
                                  ) : (
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                      <span style={{ marginRight: 8 }}>{item.chemicalUse}</span>
                                      <button
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#2986cc",
                                          cursor: "pointer",
                                          padding: 0
                                        }}
                                        onClick={() => {
                                          setEditIdx(idx);
                                          setEditChemicalUse(item.chemicalUse);
                                        }}
                                        title="แก้ไข"
                                      >
                                        <FaEdit />
                                      </button>
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <div className="fml-action-cell">
                                    <button
                                      style={{
                                        background: "none",
                                        border: "none",
                                        color: "#e53935",
                                        cursor: "pointer"
                                      }}
                                      onClick={() => handleDelete(idx)}
                                      title="ลบ"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
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
            <div className="fml-formula-list-panel">
              <div className="fml-formula-list-title">All Formulas</div>
              <ul className="fml-formula-list">
                {[...new Set(data.map(item => item.colorCode))]
                  .filter(Boolean)
                  .map(code => (
                    <li
                      key={code}
                      className={code === search ? "active" : ""}
                      style={{
                        cursor: "pointer",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: code === search ? "#e3f2fd" : "transparent",
                        color: code === search ? "#2986cc" : "#333",
                        fontWeight: code === search ? 700 : 400,
                        marginBottom: 4
                      }}
                      onClick={() => {
                        setSearch(code);
                        setShowTable(true);
                      }}
                    >
                      {code}
                    </li>
                  ))}
              </ul>
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
