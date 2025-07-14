import React, { useState, useEffect } from 'react';
import { FaSearch, FaCheck, FaCalendarAlt, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // เพิ่มบรรทัดนี้
import './productplan.css';

const ProductPlan = () => {
    // state สำหรับ input
    const [colorCodeInput, setColorCodeInput] = useState('');
    const [lotInput, setLotInput] = useState('');
    const [percentInput, setPercentInput] = useState('');
    const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 10));

    // state สำหรับแสดงผลหลังค้นหา
    const [colorCode, setColorCode] = useState('');
    const [lot, setLot] = useState('');
    const [percent, setPercent] = useState('');
    const [department, setDepartment] = useState('');

    const [data, setData] = useState([
        {
            colorCode: "SL6200",
            chemicalCode: "F001",
            name: "H-acid",
            lot: "",
            chemicalUse: "808",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "F002",
            name: "NaNO2",
            lot: "",
            chemicalUse: "565",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "F006",
            name: "PNA",
            lot: "",
            chemicalUse: "363.5",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "F108N",
            name: "LS-9",
            lot: "",
            chemicalUse: "3.5",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "F124",
            name: "SM-acid",
            lot: "",
            chemicalUse: "14",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "F120",
            name: "Resorcinol",
            lot: "",
            chemicalUse: "264.7",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "F129",
            name: "DS-100",
            lot: "",
            chemicalUse: "692.8",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "T001",
            name: "NaCl",
            lot: "",
            chemicalUse: "6,000",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "T011",
            name: "FFA",
            lot: "",
            chemicalUse: "22",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "T101",
            name: "Na₂CO₃",
            lot: "",
            chemicalUse: "1,537.5",
            inStock: "",
            total: ""
        },
        {
            colorCode: "SL6200",
            chemicalCode: "T103",
            name: "35%HCl",
            lot: "",
            chemicalUse: "3,112",
            inStock: "",
            total: ""
        },
        // เพิ่มข้อมูล SL92N0
        {
            colorCode: "SL92N0", chemicalCode: "F001", name: "H-acid", lot: "", chemicalUse: "1,308", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "F002", name: "NaNO₂", lot: "", chemicalUse: "919", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "F006", name: "PNA", lot: "", chemicalUse: "530", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "F103", name: "MPDA", lot: "", chemicalUse: "225", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "F108N", name: "LS-9", lot: "", chemicalUse: "4", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "F124", name: "SM-acid", lot: "", chemicalUse: "19", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "F126", name: "MTDA", lot: "", chemicalUse: "200", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "F129", name: "DS-100", lot: "", chemicalUse: "1,149", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "T011", name: "FFA", lot: "", chemicalUse: "31", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "T101", name: "Na₂CO₃", lot: "", chemicalUse: "2,090", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "T102", name: "50%NaOH", lot: "", chemicalUse: "150", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "T103", name: "35%HCl", lot: "", chemicalUse: "3,193", inStock: "", total: ""
        },
        {
            colorCode: "SL92N0", chemicalCode: "T082E", name: "Dedusting oil", lot: "", chemicalUse: "25", inStock: "", total: ""
        }
    ]);
    const [filtered, setFiltered] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [inOutValues, setInOutValues] = useState({}); // { idx: { in: value, out: value } }

    const navigate = useNavigate(); // เพิ่มบรรทัดนี้

    // โหลดข้อมูลจาก localStorage เมื่อเปิดหน้า
    useEffect(() => {
        localStorage.removeItem('productplan'); // เพิ่มบรรทัดนี้ชั่วคราว
        const saved = JSON.parse(localStorage.getItem('productplan') || '[]');
        if (saved.length > 0) {
            setData(saved);
        } else {
            setData([
                {
                    colorCode: "SL6200", chemicalCode: "F001", name: "H-acid", lot: "", chemicalUse: "808", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "F002", name: "NaNO2", lot: "", chemicalUse: "565", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "F006", name: "PNA", lot: "", chemicalUse: "363.5", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "F108N", name: "LS-9", lot: "", chemicalUse: "3.5", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "F124", name: "SM-acid", lot: "", chemicalUse: "14", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "F120", name: "Resorcinol", lot: "", chemicalUse: "264.7", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "F129", name: "DS-100", lot: "", chemicalUse: "692.8", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "T001", name: "NaCl", lot: "", chemicalUse: "6,000", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "T011", name: "FFA", lot: "", chemicalUse: "22", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "T101", name: "Na₂CO₃", lot: "", chemicalUse: "1,537.5", inStock: "", total: ""
                },
                {
                    colorCode: "SL6200", chemicalCode: "T103", name: "35%HCl", lot: "", chemicalUse: "3,112", inStock: "", total: ""
                },
                // เพิ่มข้อมูล SL92N0
                {
                    colorCode: "SL92N0", chemicalCode: "F001", name: "H-acid", lot: "", chemicalUse: "1,308", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "F002", name: "NaNO₂", lot: "", chemicalUse: "919", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "F006", name: "PNA", lot: "", chemicalUse: "530", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "F103", name: "MPDA", lot: "", chemicalUse: "225", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "F108N", name: "LS-9", lot: "", chemicalUse: "4", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "F124", name: "SM-acid", lot: "", chemicalUse: "19", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "F126", name: "MTDA", lot: "", chemicalUse: "200", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "F129", name: "DS-100", lot: "", chemicalUse: "1,149", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "T011", name: "FFA", lot: "", chemicalUse: "31", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "T101", name: "Na₂CO₃", lot: "", chemicalUse: "2,090", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "T102", name: "50%NaOH", lot: "", chemicalUse: "150", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "T103", name: "35%HCl", lot: "", chemicalUse: "3,193", inStock: "", total: ""
                },
                {
                    colorCode: "SL92N0", chemicalCode: "T082E", name: "Dedusting oil", lot: "", chemicalUse: "25", inStock: "", total: ""
                }
            ]);
        }
    }, []);

    // บันทึก data ลง localStorage ทุกครั้งที่ data เปลี่ยน
    useEffect(() => {
        localStorage.setItem('productplan', JSON.stringify(data));
    }, [data]);

    // โหลดข้อมูล inventory (RM1.json)
    useEffect(() => {
        const local = localStorage.getItem('RM1.json');
        if (local) {
            setInventory(JSON.parse(local));
        } else {
            fetch("/RM1.json")
                .then(res => res.json())
                .then(json => setInventory(json))
                .catch(() => setInventory([]));
        }
    }, []);

    // ฟังก์ชันค้นหา
    const handleSearch = () => {
        setColorCode(colorCodeInput);
        setLot(lotInput);
        setPercent(percentInput);
        const result = data.filter(
            item => item.colorCode === colorCodeInput
        );
        setFiltered(result);
    };

    const today = new Date().toISOString().slice(0, 10);

    // เก็บข้อมูลที่ต้องการจะ submit
    const submitData = {
        department,
        colorCode: colorCodeInput,
        lot: lotInput,
        date: dateInput,
        percent: percentInput
    };

    // ฟังก์ชันเมื่อกด OK ใน popup
    const handleConfirmSubmit = () => {
        const updatedInventory = inventory.map((invItem) => {
            const idx = filtered.findIndex(item => item.chemicalCode === invItem.Code);
            if (idx === -1) return invItem;

            const balance = parseFloat(invItem["G-TOTAL"] ?? invItem["G-total"] ?? 0) || 0;
            const inValue = parseFloat(inOutValues[idx]?.in) || 0;
            const outValue = parseFloat(inOutValues[idx]?.out) || 0;
            const chemUseNum = parseFloat((filtered[idx].chemicalUse + '').replace(/,/g, '')) || 0;

            // Diff = (Balance - Chemical use) + In - Out
            const diff = (balance - chemUseNum) + inValue - outValue;

            return {
                ...invItem,
                "G-TOTAL": diff,
                "diff": diff
            };
        });

        setInventory(updatedInventory);
        localStorage.setItem('RM1.json', JSON.stringify(updatedInventory));

        // 2. เก็บข้อมูล planr-table (เพิ่มตรงนี้!)
        const planRData = JSON.parse(localStorage.getItem('planr-table') || '[]');
        planRData.push({
            department,
            colorCode: colorCodeInput,
            lot: lotInput,
            date: dateInput,
            percent: percentInput
        });
        localStorage.setItem('planr-table', JSON.stringify(planRData));

        setShowConfirm(false);

        // รีเซ็ตค่าที่กรอกไว้
        setDepartment('');
        setColorCodeInput('');
        setLotInput('');
        setPercentInput('');
        setDateInput(today);
        setColorCode('');
        setLot('');
        setPercent('');
        setFiltered([]);
        setInOutValues({});
    };

    // ฟังก์ชันเปลี่ยนค่า In/Out
    const handleInOutChange = (idx, field, value) => {
        setInOutValues(prev => ({
            ...prev,
            [idx]: {
                ...prev[idx],
                [field]: value
            }
        }));
    };

    // โหลด inventory ใหม่ทุกครั้งที่ showConfirm เปลี่ยน (หลัง submit)
    useEffect(() => {
        // โหลด inventory ใหม่ทุกครั้งที่ showConfirm เปลี่ยน (หลัง submit)
        if (!showConfirm) {
            const local = localStorage.getItem('RM1.json');
            if (local) {
                setInventory(JSON.parse(local));
            }
        }
    }, [showConfirm]);

    return (
        <div className="productplan-bg">
            <div className="productplan-header">
                <div style={{ position: "relative" }}>
                    <div className="productplan-title-bg"></div>
                    <div className="productplan-title">Product Plan</div>
                </div>
                <div className="productplan-user">
                    <FaHome
                        className="icon-home"
                        onClick={() => navigate('/menu')} // เพิ่ม onClick ตรงนี้
                        style={{ cursor: "pointer" }}
                    />
                    <span>User Name Lastname</span>
                </div>
            </div>
            <div className="productplan-toolbar">
                <span className="input-label">Department :</span>
                <select
                    className="input-dropdown"
                    style={{ marginRight: 8, width: 110, height: 45 }}
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
                <span className="input-label">Product code :</span>
                <input
                    className="input-code"
                    style={{ width: 110 }}
                    placeholder="enter product code"
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
                    {/* ปุ่มแคท */}
                    <button
                        className="productplan-bottom-btn"
                        style={{}} 
                        onClick={() => navigate('/formula')}
                    >
                        Formula
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
            <div className="productplan-content-wrapper" style={{ display: "flex", flexDirection: "row", position: "relative" }}>
                <div className="productplan-content">
                    <div className="productplan-info">
                        <span>Department : {department}</span>
                        <span>Product code : {colorCode}</span>
                        <span>Lot. : {lot}</span>
                        <span>% : {percent}</span>
                    </div>
                    <div className="productplan-table-wrapper">
                        <table className="productplan-table">
                            <thead>
                                <tr>
                                    <th>Product code</th>
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
                                    // ดึง balance ล่าสุดจาก inventory
                                    const inv = inventory.find(invItem =>
                                        invItem["Code"] === item.chemicalCode
                                    );
                                    const balance = inv ? parseFloat(inv["G-TOTAL"] ?? inv["G-total"] ?? 0) : 0;

                                    const inValue = parseFloat(inOutValues[idx]?.in) || 0;
                                    const outValue = parseFloat(inOutValues[idx]?.out) || 0;
                                    const chemUseNum = parseFloat((item.chemicalUse + '').replace(/,/g, '')) || 0;

                                    // Diff = (Balance - Chemical use) + In - Out
                                    const diff = (balance - chemUseNum) + inValue - outValue;

                                    return (
                                        <tr key={idx}>
                                            <td>{item.chemicalCode}</td>
                                            <td>{item.name}</td>
                                            <td>{chemUseNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
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
                {/* กล่องแจ้งเตือน */}
                <div className="side-box">
                    <div className="side-box-title">Notification</div>
                    <div className="side-box-scroll">
                        {filtered.map((item, idx) => {
                            const lotNum = parseFloat(lot) || 0;
                            const chemUseNum = parseFloat((item.chemicalUse + '').replace(/,/g, '')) || 0;
                            const percentNum = parseFloat(percent) || 100;
                            const result = lotNum ? (chemUseNum * lotNum * percentNum / 100) : chemUseNum;

                            const inv = inventory.find(invItem =>
                                invItem["Code"] === item.chemicalCode
                            );
                            const balance = inv ? parseFloat(inv["G-TOTAL"] ?? inv["G-total"] ?? 0) : 0;

                            const inValue = parseFloat(inOutValues[idx]?.in) || 0;
                            const outValue = parseFloat(inOutValues[idx]?.out) || 0;

                            const updatedBalance = (balance + inValue) - outValue;
                            const diff = updatedBalance - result;

                            // 1. balance = 0 และ diff < 0
                            if (updatedBalance === 0 && diff < 0) {
                                return (
                                    <div key={idx} className="noti-red">
                                        <b>{item.chemicalCode}</b> : ไม่มีเคมีคงเหลือ ไม่สามารถทำการผลิตได้<br />
                                        <span style={{ fontWeight: 400 }}>Diff = {diff.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg</span>
                                    </div>
                                );
                            }
                            // 2. 0 < balance < chemical used
                            else if (updatedBalance > 0 && updatedBalance < result) {
                                return (
                                    <div key={idx} className="noti-yellow">
                                        <b>{item.chemicalCode}</b> : ผลิตได้ไม่ถึง 100% ของ formula<br />
                                        <span style={{ fontWeight: 400 }}>Diff = {diff.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg</span>
                                    </div>
                                );
                            }
                            // 3. balance > chemical used และ diff < 100
                            else if (updatedBalance >= result && diff < 100) {
                                return (
                                    <div key={idx} className="noti-green">
                                        <b>{item.chemicalCode}</b> : เคมีตัวนี้เพียงพอต่อการผลิตแต่คงเหลือน้อยกว่า 100kg<br />
                                        <span style={{ fontWeight: 400 }}>Diff = {diff.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg</span>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
                {/* ปุ่ม Submit มุมขวาล่าง */}
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
                                <div>Product code: <b>{colorCodeInput}</b></div>
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