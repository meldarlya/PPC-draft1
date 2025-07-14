import React from "react";
import { FaClipboardList, FaWarehouse, FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-bg">
      <div className="main-menu-wrapper">
        <div className="bg-blue-left"></div>
        <div className="bg-blue-right"></div>
        <div className="bg-white"></div>
        <div className="bg-gradient"></div>
        <div className="menu-title">Home page</div>
        <div className="user-name">User Name Lastname</div>
        <div className="menu-items">
          <div
            className="menu-item"
            onClick={() => navigate("/productplan")}
            style={{ cursor: "pointer" }}
          >
            <div className="menu-icon-bg">
              <FaClipboardList className="menu-icon" />
            </div>
            <div className="label">Product Plan</div>
          </div>
          <div
            className="menu-item"
            onClick={() => navigate("/rm")}
            style={{ cursor: "pointer" }}
          >
            <div className="menu-icon-bg">
              <FaWarehouse className="menu-icon" />
            </div>
            <div className="label">Chemical stock</div>
          </div>
          <div
            className="menu-item"
            onClick={() => navigate("/planr")}
            style={{ cursor: "pointer" }}
          >
            <div className="menu-icon-bg">
              <FaRegFileAlt className="menu-icon" />
            </div>
            <div className="label">Planning Record</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
