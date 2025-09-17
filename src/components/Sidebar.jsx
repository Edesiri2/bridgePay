import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">BridgePay</div>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/accounts" className="sidebar-link" onClick={() => setIsOpen(false)}>Accounts</Link>
          <Link to="/loans" className="sidebar-link" onClick={() => setIsOpen(false)}>Loans</Link>
          <Link to="/transfer" className="sidebar-link" onClick={() => setIsOpen(false)}>Transfer</Link>
          <Link to="/paymentlink" className="sidebar-link" onClick={() => setIsOpen(false)}>Payment Link</Link>
          <Link to="/support" className="sidebar-link" onClick={() => setIsOpen(false)}>Support</Link>
        </nav>
        <button
          onClick={logout}
          className="logout-button"
        >
          Logout
        </button>
      </aside>
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
        ></div>
      )}
    </>
  );
}