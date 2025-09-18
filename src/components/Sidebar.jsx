import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FiHome, 
  FiCreditCard, 
  FiDollarSign, 
  FiRepeat, 
  FiLink, 
  FiHelpCircle, 
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";
import "./Sidebar.css";

export default function Sidebar() {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <FiHome /> },
    { path: "/accounts", label: "Accounts", icon: <FiCreditCard /> },
    { path: "/loans", label: "Loans", icon: <FiDollarSign /> },
    { path: "/transfer", label: "Transfer", icon: <FiRepeat /> },
    { path: "/paymentlink", label: "Payment Link", icon: <FiLink /> },
    { path: "/support", label: "Support", icon: <FiHelpCircle /> },
  ];

  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        <FiMenu />
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <span className="logo">BridgePay</span>
            <button className="close-sidebar" onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link 
              to={item.path} 
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
              key={item.path}
            >
              <span className="link-icon">{item.icon}</span>
              <span className="link-text">{item.label}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="logout-button"
        >
          <FiLogOut className="logout-icon" />
          <span>Logout</span>
        </button>
      </aside>
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}