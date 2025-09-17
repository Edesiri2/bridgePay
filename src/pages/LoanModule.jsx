import React, { useState } from "react";
import "./LoanModule.css";

export default function LoanModule() {
  const [activeTab, setActiveTab] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Loan products data
  const [loanProducts] = useState([
    {
      id: 1,
      name: "Personal Loan",
      interestRate: 15,
      maxAmount: 500000,
      minTenure: 3,
      maxTenure: 24,
      description: "For personal expenses and emergencies"
    },
    {
      id: 2,
      name: "Business Loan",
      interestRate: 12,
      maxAmount: 2000000,
      minTenure: 6,
      maxTenure: 36,
      description: "For business expansion and capital"
    },
    {
      id: 3,
      name: "Education Loan",
      interestRate: 10,
      maxAmount: 1000000,
      minTenure: 6,
      maxTenure: 48,
      description: "For educational purposes and tuition fees"
    }
  ]);

  // Loan application form state
  const [loanForm, setLoanForm] = useState({
    productId: "",
    amount: "",
    tenure: "",
    gracePeriod: "",
    purpose: ""
  });

  // Sample loan data
  const [loans, setLoans] = useState([
    {
      id: 1,
      product: "Personal Loan",
      amount: 150000,
      disbursedAmount: 145000,
      balance: 120500,
      interestRate: 15,
      tenure: 12,
      paidInstallments: 3,
      nextPaymentDate: "2023-11-15",
      nextPaymentAmount: 14500,
      status: "active",
      startDate: "2023-08-15",
      endDate: "2024-08-15"
    },
    {
      id: 2,
      product: "Business Loan",
      amount: 500000,
      disbursedAmount: 490000,
      balance: 450000,
      interestRate: 12,
      tenure: 24,
      paidInstallments: 2,
      nextPaymentDate: "2023-11-20",
      nextPaymentAmount: 24500,
      status: "active",
      startDate: "2023-09-20",
      endDate: "2025-09-20"
    },
    {
      id: 3,
      product: "Education Loan",
      amount: 300000,
      disbursedAmount: 295000,
      balance: 0,
      interestRate: 10,
      tenure: 18,
      paidInstallments: 18,
      nextPaymentDate: "-",
      nextPaymentAmount: 0,
      status: "closed",
      startDate: "2022-03-10",
      endDate: "2023-09-10"
    },
    {
      id: 4,
      product: "Personal Loan",
      amount: 200000,
      disbursedAmount: 0,
      balance: 0,
      interestRate: 15,
      tenure: 12,
      paidInstallments: 0,
      nextPaymentDate: "-",
      nextPaymentAmount: 0,
      status: "pending",
      startDate: "-",
      endDate: "-"
    }
  ]);

  // Sample transactions data
  const [transactions] = useState([
    {
      id: 1,
      loanId: 1,
      date: "2023-10-15",
      amount: 14500,
      type: "repayment",
      status: "completed"
    },
    {
      id: 2,
      loanId: 1,
      date: "2023-09-15",
      amount: 14500,
      type: "repayment",
      status: "completed"
    },
    {
      id: 3,
      loanId: 2,
      date: "2023-10-20",
      amount: 24500,
      type: "repayment",
      status: "completed"
    },
    {
      id: 4,
      loanId: 1,
      date: "2023-08-15",
      amount: 145000,
      type: "disbursement",
      status: "completed"
    }
  ]);

  // Sample repayment schedule
  const [repaymentSchedule] = useState([
    {
      id: 1,
      dueDate: "2023-08-15",
      amount: 14500,
      status: "paid",
      paidDate: "2023-08-15"
    },
    {
      id: 2,
      dueDate: "2023-09-15",
      amount: 14500,
      status: "paid",
      paidDate: "2023-09-15"
    },
    {
      id: 3,
      dueDate: "2023-10-15",
      amount: 14500,
      status: "paid",
      paidDate: "2023-10-15"
    },
    {
      id: 4,
      dueDate: "2023-11-15",
      amount: 14500,
      status: "upcoming",
      paidDate: "-"
    },
    {
      id: 5,
      dueDate: "2023-12-15",
      amount: 14500,
      status: "upcoming",
      paidDate: "-"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanForm({
      ...loanForm,
      [name]: value
    });
  };

  const handleCreateLoan = (e) => {
    e.preventDefault();
    
    if (!loanForm.productId || !loanForm.amount || !loanForm.tenure) {
      alert("Please fill in all required fields");
      return;
    }

    const selectedProduct = loanProducts.find(product => product.id === parseInt(loanForm.productId));
    
    const newLoan = {
      id: loans.length + 1,
      product: selectedProduct.name,
      amount: parseFloat(loanForm.amount),
      disbursedAmount: 0,
      balance: 0,
      interestRate: selectedProduct.interestRate,
      tenure: parseInt(loanForm.tenure),
      paidInstallments: 0,
      nextPaymentDate: "-",
      nextPaymentAmount: 0,
      status: "pending",
      startDate: "-",
      endDate: "-"
    };

    setLoans([newLoan, ...loans]);
    setLoanForm({
      productId: "",
      amount: "",
      tenure: "",
      gracePeriod: "",
      purpose: ""
    });
    setShowCreateForm(false);

    alert("Loan application submitted successfully!");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (dateString === "-") return "-";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate summary metrics
  const activeLoans = loans.filter(loan => loan.status === "active").length;
  const pendingLoans = loans.filter(loan => loan.status === "pending").length;
  const closedLoans = loans.filter(loan => loan.status === "closed").length;
  const totalLoanBalance = loans
    .filter(loan => loan.status === "active")
    .reduce((total, loan) => total + loan.balance, 0);
  
  const filteredLoans = activeTab === "all" 
    ? loans 
    : loans.filter(loan => loan.status === activeTab);

  return (
    <div className="loan-module-container">
      <div className="loan-module-header">
        <h1>Loan Management</h1>
        <p>Manage your loans, applications, and repayment schedules</p>
      </div>

      {/* Summary Cards */}
      <div className="loan-summary-cards">
        <div className="summary-card">
          <div className="card-icon">
            <i className="fas fa-file-invoice-dollar"></i>
          </div>
          <div className="card-content">
            <h3>{activeLoans}</h3>
            <p>Active Loans</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="card-content">
            <h3>{pendingLoans}</h3>
            <p>Pending Applications</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon closed">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="card-content">
            <h3>{closedLoans}</h3>
            <p>Closed Loans</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon balance">
            <i className="fas fa-wallet"></i>
          </div>
          <div className="card-content">
            <h3>{formatCurrency(totalLoanBalance)}</h3>
            <p>Total Loan Balance</p>
          </div>
        </div>
      </div>

      {/* Loan Management Section */}
      <div className="loan-management">
        <div className="management-header">
          <h2>Loan Portfolio</h2>
          
          <div className="header-actions">
            <div className="tab-controls">
              <button 
                className={activeTab === "all" ? "tab-active" : ""}
                onClick={() => setActiveTab("all")}
              >
                All Loans
              </button>
              <button 
                className={activeTab === "active" ? "tab-active" : ""}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button 
                className={activeTab === "pending" ? "tab-active" : ""}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
              <button 
                className={activeTab === "closed" ? "tab-active" : ""}
                onClick={() => setActiveTab("closed")}
              >
                Closed
              </button>
            </div>
            
            <button 
              className="btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              <i className="fas fa-plus"></i> Apply for Loan
            </button>
          </div>
        </div>

        {filteredLoans.length === 0 ? (
          <div className="no-loans">
            <div className="no-loans-icon">
              <i className="fas fa-file-invoice"></i>
            </div>
            <h3>No loans found</h3>
            <p>You don't have any {activeTab} loans at the moment</p>
            <button 
              className="btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              Apply for Loan
            </button>
          </div>
        ) : (
          <div className="loans-table-container">
            <div className="table-responsive">
              <table className="loans-table">
                <thead>
                  <tr>
                    <th>Loan Product</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Interest Rate</th>
                    <th>Tenure</th>
                    <th>Next Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map(loan => (
                    <tr key={loan.id}>
                      <td>
                        <div className="loan-product">
                          <div className="product-name">{loan.product}</div>
                          <div className="loan-id">ID: {loan.id}</div>
                        </div>
                      </td>
                      <td>
                        <div className="loan-amount">
                          {formatCurrency(loan.amount)}
                        </div>
                      </td>
                      <td>
                        <div className="loan-balance">
                          {formatCurrency(loan.balance)}
                        </div>
                      </td>
                      <td>
                        <div className="interest-rate">
                          {loan.interestRate}%
                        </div>
                      </td>
                      <td>
                        <div className="loan-tenure">
                          {loan.tenure} months
                        </div>
                      </td>
                      <td>
                        <div className="next-payment">
                          <div className="payment-date">{formatDate(loan.nextPaymentDate)}</div>
                          <div className="payment-amount">{formatCurrency(loan.nextPaymentAmount)}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${loan.status}`}>
                          {loan.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="icon-btn" title="View details">
                            <i className="fas fa-eye"></i>
                          </button>
                          {loan.status === "active" && (
                            <button className="icon-btn" title="Make payment">
                              <i className="fas fa-credit-card"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Loan ID</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.loanId}</td>
                  <td>{formatCurrency(transaction.amount)}</td>
                  <td>
                    <span className={`type-badge ${transaction.type}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Repayment Schedule */}
      <div className="repayment-schedule">
        <h2>Repayment Schedule</h2>
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {repaymentSchedule.map(schedule => (
                <tr key={schedule.id}>
                  <td>{formatDate(schedule.dueDate)}</td>
                  <td>{formatCurrency(schedule.amount)}</td>
                  <td>
                    <span className={`status-badge ${schedule.status}`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td>{formatDate(schedule.paidDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Loan Form Modal */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Apply for a New Loan</h2>
              <button 
                className="close-button"
                onClick={() => setShowCreateForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleCreateLoan} className="loan-application-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="productId">Loan Product *</label>
                  <select
                    id="productId"
                    name="productId"
                    value={loanForm.productId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select loan product</option>
                    {loanProducts.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {product.interestRate}% interest
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Loan Amount (NGN) *</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={loanForm.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tenure">Tenure (months) *</label>
                  <input
                    type="number"
                    id="tenure"
                    name="tenure"
                    value={loanForm.tenure}
                    onChange={handleInputChange}
                    placeholder="Loan duration in months"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gracePeriod">Grace Period (days)</label>
                  <input
                    type="number"
                    id="gracePeriod"
                    name="gracePeriod"
                    value={loanForm.gracePeriod}
                    onChange={handleInputChange}
                    placeholder="Optional grace period"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="purpose">Loan Purpose</label>
                <textarea
                  id="purpose"
                  name="purpose"
                  rows="3"
                  value={loanForm.purpose}
                  onChange={handleInputChange}
                  placeholder="Describe the purpose of this loan..."
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}