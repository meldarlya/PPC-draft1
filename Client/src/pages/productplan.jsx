import React, { useState, useEffect } from 'react';
import { FaSearch, FaCheck, FaHome } from 'react-icons/fa';
import './productplan.css';
import axios from 'axios';

const ProductPlan = () => {
    // --- State สำหรับ input และผลลัพธ์ ---
    const [colorCodeInput, setColorCodeInput] = useState('');
    const [lotInput, setLotInput] = useState('');
    const [percentInput, setPercentInput] = useState('');
    const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 10));
    const [colorCode, setColorCode] = useState('');
    const [lot, setLot] = useState('');
    const [percent, setPercent] = useState('');
    const [department, setDepartment] = useState('');
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [inOutValues, setInOutValues] = useState({}); // { idx: { in: value, out: value } }

    // --- โหลดข้อมูลจาก localStorage เมื่อเปิดหน้า ---
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('productplan') || '[]');
        if (saved.length > 0) {
            setData(saved);
        } else {
            setData([]);
        }
    }, []);

    // --- บันทึก data ลง localStorage ทุกครั้งที่ data เปลี่ยน ---
    useEffect(() => {
        localStorage.setItem('productplan', JSON.stringify(data));
    }, [data]);

    // --- โหลดข้อมูล inventory จาก backend ---
    useEffect(() => {
        axios.get('http://localhost:5000/api/rm')
            .then(res => setInventory(res.data))
            .catch(() => setInventory([]));
    }, []);

    // --- ฟังก์ชันค้นหา ---
    const handleSearch = () => {
        setColorCode(colorCodeInput);
        setLot(lotInput);
        setPercent(percentInput);
        // ไม่ต้อง filter จาก data แล้ว เพราะ filtered จะถูก set จาก useEffect ด้านล่าง
        // setFiltered(result); // ลบออก
    };

    // --- ฟังก์ชันเปลี่ยนค่า In/Out ---
    const handleInOutChange = (idx, field, value) => {
        setInOutValues(prev => ({
            ...prev,
            [idx]: {
                ...prev[idx],
                [field]: value
            }
        }));
    };

    // --- ฟังก์ชัน Submit ---
    const handleConfirmSubmit = async () => {
        // เตรียมข้อมูล chemicals
        const chemicals = filtered.map((item, idx) => ({
            chemicalCode: item.chemicalCode,
            in: parseFloat(inOutValues[idx]?.in) || 0,
            out: parseFloat(inOutValues[idx]?.out) || 0,
            chemicalUse: parseFloat((item.chemicalUse + '').replace(/,/g, '')) || 0
        }));
        try {
            await axios.post('http://localhost:5000/api/product-plan', {
                department,
                colorCode: colorCodeInput,
                lot: lotInput,
                percent: percentInput,
                date: dateInput,
                chemicals
            });
            setShowConfirm(false);
            // รีเฟรช inventory หลังบันทึก
            axios.get('http://localhost:5000/api/rm')
                .then(res => setInventory(res.data))
                .catch(() => setInventory([]));
            // ล้าง input
            setColorCodeInput('');
            setLotInput('');
            setPercentInput('');
            setFiltered([]);
            setInOutValues({});
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    // --- โหลดสูตรจาก backend ตาม color code ---
    useEffect(() => {
        if (colorCodeInput) {
            axios.get(`http://localhost:5000/api/product-plan/formula/${colorCodeInput}`)
                .then(res => {
                    // Map field ให้ตรงกับที่ frontend ใช้
                    const mapped = (res.data || []).map(item => ({
                        chemicalCode: item.chemicalCode,
                        name: item.name,
                        chemicalUse: item.qtyPerLot,
                        lot: '',
                        inStock: '',
                        total: ''
                    }));
                    setFiltered(mapped);
                })
                .catch(() => setFiltered([]));
        } else {
            setFiltered([]);
        }
    }, [colorCodeInput]);

    return (
        <div className="productplan-bg">
            {/* Header */}
            <div className="productplan-header">
                <div style={{ position: "relative" }}>
                    <div className="productplan-title-bg"></div>
                    <div className="productplan-title">Product Plan</div>
                </div>
                <div className="productplan-user">
                    <FaHome className="icon-home" />
                    <span>User Name Lastname</span>
                </div>
            </div>
            {/* Toolbar */}
            <div className="productplan-toolbar">
                <span className="input-label">Department :</span>
                <select
                    className="input-dropdown"
                    style={{ marginRight: 8, width: 100, height: 40 }}
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                >
                    <option value="">Department</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="C3">C3</option>
                    <option value="C4">C4</option>
                    <option value="C5">C5</option>
                    <option value="Pi1">Pi-1</option>
                    <option value="Pi2">Pi-2</option>
                </select>
                <span className="input-label">Color code :</span>
                <input
                    className="input-code"
                    style={{ width: 110 }}
                    placeholder="enter color code"
                    value={colorCodeInput}
                    onChange={e => setColorCodeInput(e.target.value)}
                />
                <button className="icon-btn" onClick={handleSearch}><FaSearch /></button>
                <span className="input-label">Lot :</span>
                <input
                    className="input-lot"
                    style={{ width: 70 }}
                    placeholder="enter Lot"
                    value={lotInput}
                    onChange={e => setLotInput(e.target.value)}
                />
                <button className="icon-btn" onClick={() => setLot(lotInput)}><FaCheck /></button>
                <span className="input-label">% :</span>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <input
                        className="input-percent"
                        placeholder="%"
                        style={{ width: 50 }}
                        value={percentInput}
                        onChange={e => setPercentInput(e.target.value)}
                    />
                    <button
                        className="icon-btn"
                        style={{ marginLeft: 4 }}
                        onClick={() => setPercent(percentInput)}
                        title="Update %"
                    >
                        <FaCheck />
                    </button>
                    <button
                        className="productplan-bottom-btn"
                        style={{ marginLeft: 8 }}
                    >
                        ปุ่มแคท
                    </button>
                </div>
                <div className="toolbar-right">
                    <input
                        className="input-date"
                        type="date"
                        value={dateInput}
                        onChange={e => setDateInput(e.target.value)}
                    />
                </div>
                
            </div>
            {/* Content */}
            <div className="productplan-content-wrapper" style={{ display: "flex", flexDirection: "row", position: "relative" }}>
                <div className="productplan-content">
                    <div className="productplan-info">
                        <span>Department : {department}</span>
                        <span>Color code : {colorCode}</span>
                        <span>Lot. : {lot}</span>
                        <span>% : {percent}</span>
                    </div>
                    <div className="productplan-table-wrapper">
                        <table className="productplan-table">
                            <thead>
                                <tr>
                                    <th>Chemical code</th>
                                    <th>Name</th>
                                    <th>Chemical use (kg)</th>
                                    <th>In (kg)</th>
                                    <th>Out (kg)</th>
                                    <th>Balance (kg)</th>
                                    <th>Diff (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((item, idx) => {
                                    const lotNum = parseFloat(lot) || 0;
                                    const chemUseNum = parseFloat((item.chemicalUse + '').replace(/,/g, '')) || 0;
                                    const percentNum = parseFloat(percent) || 100;
                                    const result = lotNum
                                        ? (chemUseNum * lotNum * percentNum / 100)
                                        : chemUseNum;
                                    // รองรับทั้ง Code/code และ G-TOTAL/g_total
                                    const inv = inventory.find(invItem =>
                                        (invItem["Code"] || invItem.code) === item.chemicalCode
                                    );
                                    const balance = inv ? parseFloat(inv["G-total"] ?? inv["G-TOTAL"] ?? inv.g_total ?? 0) : 0;
                                    const inValue = parseFloat(inOutValues[idx]?.in) || 0;
                                    const outValue = parseFloat(inOutValues[idx]?.out) || 0;
                                    const diff = ((balance + inValue) - outValue) - result;
                                    return (
                                        <tr key={idx}>
                                            <td>{item.chemicalCode}</td>
                                            <td>{item.name}</td>
                                            <td>{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="input-inout"
                                                    value={inOutValues[idx]?.in || ""}
                                                    onChange={e => handleInOutChange(idx, "in", e.target.value)}
                                                    style={{ width: 70 }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="input-inout"
                                                    value={inOutValues[idx]?.out || ""}
                                                    onChange={e => handleInOutChange(idx, "out", e.target.value)}
                                                    style={{ width: 70 }}
                                                />
                                            </td>
                                            <td>{balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                            <td>{diff.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Notification Box */}
                <div className="side-box">
                    <div className="side-box-title">Notification</div>
                    <div className="side-box-scroll">
                        {filtered.map((item, idx) => {
                            const lotNum = parseFloat(lot) || 0;
                            const chemUseNum = parseFloat((item.chemicalUse + '').replace(/,/g, '')) || 0;
                            const percentNum = parseFloat(percent) || 100;
                            const result = lotNum
                              ? (chemUseNum * lotNum * percentNum / 100)
                              : chemUseNum;
                            const inv = inventory.find(invItem =>
                              (invItem["Code"] || invItem.code) === item.chemicalCode
                            );
                            const balance = inv ? parseFloat(inv["G-total"] ?? inv["G-TOTAL"] ?? inv.g_total ?? 0) : 0;
                            const inValue = parseFloat(inOutValues[idx]?.in) || 0;
                            const outValue = parseFloat(inOutValues[idx]?.out) || 0;
                            const diff = ((balance + inValue) - outValue) - result;
                            if (diff < 0) {
                              return (
                                <div key={idx} className="noti-red">
                                  <b>{item.chemicalCode}</b> : Balance เหลือไม่พอสำหรับ Chemical use  <br />
                                  <span style={{fontWeight:400}}>Diff = {diff.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg</span>
                                </div>
                              );
                            } else if (diff < 100) {
                              return (
                                <div key={idx} className="noti-yellow">
                                  <b>{item.chemicalCode}</b> : Balance stock คงเหลือน้อยกว่า 100 kg<br />
                                  <span style={{fontWeight:400}}>Diff = {diff.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg</span>
                                </div>
                              );
                            }
                            return null;
                        })}
                    </div>
                </div>
                {/* Submit Button & Popup */}
                <button
                    className="productplan-submit-btn"
                    disabled={
                        !department ||
                        !colorCodeInput ||
                        !lotInput ||
                        !percentInput ||
                        !dateInput
                    }
                    onClick={() => setShowConfirm(true)}
                >
                    Submit
                </button>

                {/* Popup ยืนยัน */}
                {showConfirm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>ยืนยันข้อมูลก่อนบันทึก</h3>
                            <div className="confirm-list">
                                <div>Department: <b>{department}</b></div>
                                <div>Color code: <b>{colorCodeInput}</b></div>
                                <div>Lot: <b>{lotInput}</b></div>
                                <div>%: <b>{percentInput}</b></div>
                                <div>Date: <b>{dateInput}</b></div>
                                {/* เพิ่มตาราง In/Out */}
                                <div style={{marginTop: 18, marginBottom: 6, fontWeight: 600, color: "#2986cc"}}>In/Out</div>
                                <table style={{width: "100%", borderCollapse: "collapse", fontSize: "1rem", marginBottom: 8}}>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign: "center"}}>Chemical code</th>
                                            <th style={{textAlign: "right"}}>In</th>
                                            <th style={{textAlign: "right"}}>Out</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered
                                          .filter((item, idx) => 
                                            (parseFloat(inOutValues[idx]?.in) || 0) !== 0 ||
                                            (parseFloat(inOutValues[idx]?.out) || 0) !== 0
                                          )
                                          .map((item, idx) => (
                                            <tr key={idx}>
                                              <td style={{textAlign: "center"}}>{item.chemicalCode}</td>
                                              <td style={{textAlign: "right"}}>{inOutValues[idx]?.in || 0}</td>
                                              <td style={{textAlign: "right"}}>{inOutValues[idx]?.out || 0}</td>
                                            </tr>
                                          ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-btns">
                                <button onClick={handleConfirmSubmit}>OK</button>
                                <button onClick={() => setShowConfirm(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPlan;