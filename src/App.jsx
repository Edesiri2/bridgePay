// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Loans from "./pages/LoanModule";
import Transfer from "./pages/Transfer";
import Support from "./pages/Support";
import "./App.css"; 
import PaymentLink from "./pages/PaymentLink";

function AppLayout() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/loans" element={<Loans/>} />
          <Route path="/transfer" element={<Transfer />} />
           <Route path="/paymentlink" element={<PaymentLink />} />
          <Route path="/support" element={<Support />} />
          <Route path="/auth" element={<Auth />} />

          {/* Fallback → Dashboard */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}