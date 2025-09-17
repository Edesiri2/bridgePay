import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../pages/Dashboard.css";

// Sample chart component
const ExpenseChart = () => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Spending Overview</h3>
      <div className="chart-placeholder">
        <p>Chart visualization would appear here</p>
      </div>
    </div>
  );
};

// Transaction history component
const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h3 className="transaction-history-title">Recent Transactions</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="transaction-row">
              <td>
                <div className="transaction-description">
                  <div className={`transaction-icon ${transaction.type === 'income' ? 'green-light-bg' : 'red-light-bg'}`}>
                    <i className={`fas ${transaction.type === 'income' ? 'fa-arrow-down teal-text' : 'fa-arrow-up red-text'}`}></i>
                  </div>
                  <div>
                    <p className="bill-name">{transaction.description}</p>
                    <p className="transaction-category">{transaction.category}</p>
                  </div>
                </div>
              </td>
              <td>{transaction.date}</td>
              <td className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
              </td>
              <td>
                <span className={`status-badge ${transaction.status === 'completed' ? 'status-completed' : 'status-pending'}`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Quick actions component
const QuickActions = () => {
  const actions = [
    { icon: 'fa-exchange-alt', title: 'Transfer', link: '/transfer', color: 'teal-bg' },
    { icon: 'fa-plus-circle', title: 'Deposit', link: '/deposit', color: 'blue-bg' },
    { icon: 'fa-hand-holding-usd', title: 'Loan', link: '/loans', color: 'yellow-bg' },
    { icon: 'fa-bill', title: 'Pay Bills', link: '/bills', color: 'purple-bg' },
    { icon: 'fa-chart-pie', title: 'Budget', link: '/budget', color: 'green-bg' },
    { icon: 'fa-cog', title: 'Settings', link: '/settings', color: 'gray-bg' },
  ];

  return (
    <div className="quick-actions">
      <h3 className="quick-actions-title">Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="action-item"
          >
            <div className={`action-icon ${action.color}`}>
              <i className={`fas ${action.icon}`}></i>
            </div>
            <span className="action-name">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate fetching transaction data
    const mockTransactions = [
      { id: 1, description: 'Salary', category: 'Income', date: 'Oct 12, 2023', amount: 250000, type: 'income', status: 'completed' },
      { id: 2, description: 'Electricity Bill', category: 'Utilities', date: 'Oct 10, 2023', amount: 15000, type: 'expense', status: 'completed' },
      { id: 3, description: 'Grocery Shopping', category: 'Food', date: 'Oct 8, 2023', amount: 18000, type: 'expense', status: 'completed' },
      { id: 4, description: 'Freelance Work', category: 'Income', date: 'Oct 5, 2023', amount: 75000, type: 'income', status: 'completed' },
      { id: 5, description: 'Netflix Subscription', category: 'Entertainment', date: 'Oct 3, 2023', amount: 3600, type: 'expense', status: 'pending' },
    ];
    setTransactions(mockTransactions);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's your financial overview</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <p className="stat-card-title">Total Balance</p>
              <p className="stat-card-value">₦{user?.balance?.toLocaleString()}</p>
            </div>
            <div className="stat-card-icon teal-light-bg">
              <i className="fas fa-wallet teal-text"></i>
            </div>
          </div>
          <p className="stat-card-footer teal-text">
            <i className="fas fa-arrow-up mr-1"></i> 2.5% from last month
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <p className="stat-card-title">Active Loans</p>
              <p className="stat-card-value">{user?.loans?.length || 0}</p>
            </div>
            <div className="stat-card-icon green-light-bg">
              <i className="fas fa-hand-holding-usd green-text"></i>
            </div>
          </div>
          <p className="stat-card-footer">₦150,000 total borrowed</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <p className="stat-card-title">Monthly Income</p>
              <p className="stat-card-value">₦325,000</p>
            </div>
            <div className="stat-card-icon purple-light-bg">
              <i className="fas fa-money-bill-wave purple-text"></i>
            </div>
          </div>
          <p className="stat-card-footer teal-text">
            <i className="fas fa-arrow-up mr-1"></i> 5.2% from last month
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <p className="stat-card-title">Monthly Spending</p>
              <p className="stat-card-value">₦78,500</p>
            </div>
            <div className="stat-card-icon red-light-bg">
              <i className="fas fa-chart-line red-text"></i>
            </div>
          </div>
          <p className="stat-card-footer red-text">
            <i className="fas fa-arrow-down mr-1"></i> 3.1% from last month
          </p>
        </div>
      </div>

      <div className="dashboard-main-grid">
        <ExpenseChart />
        <div className="upcoming-bills">
          <h3 className="upcoming-bills-title">Upcoming Bills</h3>
          <div className="bills-list">
            <div className="bill-item">
              <div className="bill-info">
                <div className="bill-icon yellow-light-bg">
                  <i className="fas fa-bolt yellow-text"></i>
                </div>
                <div>
                  <p className="bill-name">Electricity Bill</p>
                  <p className="bill-due">Due in 3 days</p>
                </div>
              </div>
              <p className="bill-amount">₦12,500</p>
            </div>
            <div className="bill-item">
              <div className="bill-info">
                <div className="bill-icon blue-light-bg">
                  <i className="fas fa-house blue-text"></i>
                </div>
                <div>
                  <p className="bill-name">Rent Payment</p>
                  <p className="bill-due">Due in 12 days</p>
                </div>
              </div>
              <p className="bill-amount">₦85,000</p>
            </div>
            <div className="bill-item">
              <div className="bill-info">
                <div className="bill-icon green-light-bg">
                  <i className="fas fa-wifi green-text"></i>
                </div>
                <div>
                  <p className="bill-name">Internet Bill</p>
                  <p className="bill-due">Due in 7 days</p>
                </div>
              </div>
              <p className="bill-amount">₦18,900</p>
            </div>
          </div>
        </div>
      </div>

      <QuickActions />

      <TransactionHistory transactions={transactions} />
    </div>
  );
}