import React, { useState } from "react";
import "./Budget.css";

export default function Budget() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateBudget, setShowCreateBudget] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  // Sample budget data
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Housing",
      icon: "fa-home",
      spent: 1200,
      limit: 1500,
      timeframe: "monthly",
      progress: 80,
      status: "on-track",
    },
    {
      id: 2,
      category: "Food & Dining",
      icon: "fa-utensils",
      spent: 600,
      limit: 500,
      timeframe: "monthly",
      progress: 120,
      status: "exceeded",
    },
    {
      id: 3,
      category: "Transportation",
      icon: "fa-car",
      spent: 250,
      limit: 300,
      timeframe: "monthly",
      progress: 83,
      status: "on-track",
    },
    {
      id: 4,
      category: "Entertainment",
      icon: "fa-film",
      spent: 75,
      limit: 150,
      timeframe: "monthly",
      progress: 50,
      status: "on-track",
    },
    {
      id: 5,
      category: "Shopping",
      icon: "fa-shopping-bag",
      spent: 100,
      limit: 200,
      timeframe: "monthly",
      progress: 50,
      status: "on-track",
    },
  ]);

  // Sample transactions data - removed unused setter
  const transactions = [
    {
      id: 1,
      category: "Housing",
      amount: 1200,
      description: "Rent Payment",
      date: "2023-10-01",
      type: "expense",
    },
    {
      id: 2,
      category: "Food & Dining",
      amount: 85.5,
      description: "Whole Foods",
      date: "2023-10-05",
      type: "expense",
    },
    {
      id: 3,
      category: "Transportation",
      amount: 45,
      description: "Gas Station",
      date: "2023-10-07",
      type: "expense",
    },
    {
      id: 4,
      category: "Food & Dining",
      amount: 32.75,
      description: "Restaurant",
      date: "2023-10-08",
      type: "expense",
    },
    {
      id: 5,
      category: "Shopping",
      amount: 62.3,
      description: "Amazon Purchase",
      date: "2023-10-10",
      type: "expense",
    },
  ];

  const [budgetForm, setBudgetForm] = useState({
    category: "",
    limit: "",
    timeframe: "monthly",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBudgetForm({
      ...budgetForm,
      [name]: value,
    });
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
  };

  const handleCreateBudget = (e) => {
    e.preventDefault();
    if (budgetForm.category && budgetForm.limit) {
      const newBudget = {
        id: budgets.length + 1,
        category: budgetForm.category,
        icon: "fa-wallet",
        spent: 0,
        limit: parseFloat(budgetForm.limit),
        timeframe: budgetForm.timeframe,
        progress: 0,
        status: "on-track",
      };

      setBudgets([...budgets, newBudget]);
      setBudgetForm({
        category: "",
        limit: "",
        timeframe: "monthly",
      });
      setShowCreateBudget(false);

      alert("Budget created successfully!");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (!dateRange.start && !dateRange.end) return true;

    const transactionDate = new Date(transaction.date);
    const startDate = dateRange.start ? new Date(dateRange.start) : new Date(0);
    const endDate = dateRange.end ? new Date(dateRange.end) : new Date();

    return transactionDate >= startDate && transactionDate <= endDate;
  });

  // Calculate totals
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remaining = totalBudget - totalSpent;
  const savingsRate = totalBudget > 0 ? ((remaining / totalBudget) * 100).toFixed(1) : 0;

  return (
    <div className="budget-container">
      <div className="budget-header">
        <h1>Budget Management</h1>
        <p>Track and manage your spending</p>
      </div>

      <div className="budget-tabs">
        <button
          className={activeTab === "overview" ? "tab-active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "categories" ? "tab-active" : ""}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
        <button
          className={activeTab === "transactions" ? "tab-active" : ""}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="overview-container">
          <div className="budgets-header">
            <h2>Your Budgets</h2>
            <button
              className="btn-primary"
              onClick={() => setShowCreateBudget(true)}
            >
              <i className="fas fa-plus"></i> Create Budget
            </button>
          </div>

          {showCreateBudget && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Create New Budget</h3>
                  <button
                    className="modal-close"
                    onClick={() => setShowCreateBudget(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <form onSubmit={handleCreateBudget} className="budget-form">
                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={budgetForm.category}
                      onChange={handleInputChange}
                      placeholder="e.g. Groceries, Entertainment"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="limit">Budget Limit *</label>
                    <input
                      type="number"
                      id="limit"
                      name="limit"
                      value={budgetForm.limit}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeframe">Timeframe *</label>
                    <select
                      id="timeframe"
                      name="timeframe"
                      value={budgetForm.timeframe}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setShowCreateBudget(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Create Budget
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="overview-cards">
            <div className="overview-card">
              <h3>TOTAL BUDGET</h3>
              <p className="amount">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="overview-card">
              <h3>TOTAL SPENT</h3>
              <p className="amount">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="overview-card">
              <h3>REMAINING</h3>
              <p className={`amount ${remaining >= 0 ? "positive" : "negative"}`}>
                {formatCurrency(remaining)}
              </p>
            </div>
            <div className="overview-card">
              <h3>SAVINGS RATE</h3>
              <p className="amount positive">{savingsRate}%</p>
            </div>
          </div>

          <div className="categories-grid">
            {budgets.map((budget) => (
              <div key={budget.id} className="category-card">
                <div className="category-header">
                  <div className="category-title">
                    <div className="category-icon">
                      <i className={`fas ${budget.icon}`}></i>
                    </div>
                    <span className="category-name">{budget.category}</span>
                  </div>
                  <span className="category-amount">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${budget.status}`}
                    style={{ width: `${Math.min(budget.progress, 100)}%` }}
                  ></div>
                </div>
                
                <div className="progress-info">
                  <span>{budget.progress}% spent</span>
                  <span className={`progress-percentage ${budget.status}`}>
                    {budget.status === "exceeded" 
                      ? `${formatCurrency(budget.spent - budget.limit)} over` 
                      : `${formatCurrency(budget.limit - budget.spent)} left`}
                  </span>
                </div>
                
                <div className="category-actions">
                  <button className="btn-secondary">View Details</button>
                  <button className="btn-primary">Add Expense</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="categories-container">
          <h2>Budget Categories</h2>
          <p>Manage your spending categories and limits</p>
          
          <div className="categories-list">
            {budgets.map((budget) => (
              <div key={budget.id} className="category-item">
                <div className="category-info">
                  <div className="category-icon">
                    <i className={`fas ${budget.icon}`}></i>
                  </div>
                  <div className="category-details">
                    <h3>{budget.category}</h3>
                    <p>{budget.timeframe} budget</p>
                  </div>
                </div>
                
                <div className="category-progress">
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${budget.status}`}
                      style={{ width: `${Math.min(budget.progress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    <span>{formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}</span>
                    <span>{budget.progress}%</span>
                  </div>
                </div>
                
                <div className="category-actions">
                  <button className="btn-icon">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn-icon">
                    <i className="fas fa-chart-pie"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="add-category-section">
            <button className="btn-primary" onClick={() => setShowCreateBudget(true)}>
              <i className="fas fa-plus"></i> Add New Category
            </button>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="transactions-container">
          <div className="transactions-header">
            <h2>Transaction History</h2>

            <div className="transactions-actions">
              <div className="date-filter">
                <label htmlFor="startDate">From</label>
                <input
                  type="date"
                  id="startDate"
                  name="start"
                  value={dateRange.start}
                  onChange={handleDateRangeChange}
                />

                <label htmlFor="endDate">To</label>
                <input
                  type="date"
                  id="endDate"
                  name="end"
                  value={dateRange.end}
                  onChange={handleDateRangeChange}
                />
              </div>

              <button className="btn-primary">
                <i className="fas fa-download"></i> Export
              </button>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="no-transactions">
              <p>No transactions found for the selected date range.</p>
            </div>
          ) : (
            <div className="transactions-list">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-icon">
                      <i className="fas fa-money-bill"></i>
                    </div>
                    <div className="transaction-details">
                      <h3>{transaction.description}</h3>
                      <p>{formatDate(transaction.date)}</p>
                      <span className="transaction-category">{transaction.category}</span>
                    </div>
                  </div>
                  <div className="transaction-amount">
                    -{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}