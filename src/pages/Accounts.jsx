import React, { useState } from "react";
import "./Accounts.css";

export default function Account() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [fundingMethod, setFundingMethod] = useState("card");
  const [showNewAccountForm, setShowNewAccountForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  // Sample data
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Primary Savings",
      number: "**** 4582",
      balance: 1250000,
      currency: "NGN",
      type: "savings",
      status: "active",
    },
    {
      id: 2,
      name: "Current Account",
      number: "**** 7821",
      balance: 750000,
      currency: "NGN",
      type: "current",
      status: "active",
    },
    {
      id: 3,
      name: "Dollar Account",
      number: "**** 6394",
      balance: 5000,
      currency: "USD",
      type: "foreign",
      status: "active",
    },
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      accountId: 1,
      type: "deposit",
      method: "card",
      amount: 50000,
      currency: "NGN",
      date: "2023-10-15",
      status: "completed",
      description: "Card deposit",
    },
    {
      id: 2,
      accountId: 1,
      type: "deposit",
      method: "transfer",
      amount: 100000,
      currency: "NGN",
      date: "2023-10-10",
      status: "completed",
      description: "Bank transfer",
    },
    {
      id: 3,
      accountId: 2,
      type: "deposit",
      method: "card",
      amount: 25000,
      currency: "NGN",
      date: "2023-10-05",
      status: "completed",
      description: "Card deposit",
    },
    {
      id: 4,
      accountId: 3,
      type: "deposit",
      method: "transfer",
      amount: 1000,
      currency: "USD",
      date: "2023-10-01",
      status: "pending",
      description: "International transfer",
    },
  ]);

  const [depositForm, setDepositForm] = useState({
    amount: "",
    account: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const [newAccountForm, setNewAccountForm] = useState({
    name: "",
    type: "savings",
    currency: "NGN",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepositForm({
      ...depositForm,
      [name]: value,
    });
  };

  const handleNewAccountInput = (e) => {
    const { name, value } = e.target;
    setNewAccountForm({
      ...newAccountForm,
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

  const handleDeposit = (e) => {
    e.preventDefault();
    if (depositForm.amount && depositForm.account) {
      alert(`Deposit of ${depositForm.amount} initiated successfully!`);
      // Reset form
      setDepositForm({
        amount: "",
        account: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        bankName: "",
        accountNumber: "",
        accountName: "",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (newAccountForm.name && newAccountForm.type) {
      const newAccount = {
        id: accounts.length + 1,
        name: newAccountForm.name,
        number: "**** " + Math.floor(1000 + Math.random() * 9000),
        balance: 0,
        currency: newAccountForm.currency,
        type: newAccountForm.type,
        status: "active",
      };

      setAccounts([...accounts, newAccount]);
      setNewAccountForm({
        name: "",
        type: "savings",
        currency: "NGN",
      });
      setShowNewAccountForm(false);

      alert("Account created successfully!");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
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

  const downloadTransactions = () => {
    // In a real app, this would generate a CSV or PDF file
    alert("Download functionality would be implemented here");
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>Account Management</h1>
        <p>Manage your deposits and accounts</p>
      </div>

      <div className="account-tabs">
        <button
          className={activeTab === "overview" ? "tab-active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "deposit" ? "tab-active" : ""}
          onClick={() => setActiveTab("deposit")}
        >
          Deposit Funds
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
          <div className="accounts-header">
            <h2>Your Accounts</h2>
            <button
              className="btn-primary"
              onClick={() => setShowNewAccountForm(true)}
            >
              <i className="fas fa-plus"></i> New Account
            </button>
          </div>

          {showNewAccountForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Create New Account</h3>
                  <button
                    className="modal-close"
                    onClick={() => setShowNewAccountForm(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <form onSubmit={handleCreateAccount} className="account-form">
                  <div className="form-group">
                    <label htmlFor="accountName">Account Name *</label>
                    <input
                      type="text"
                      id="accountName"
                      name="name"
                      value={newAccountForm.name}
                      onChange={handleNewAccountInput}
                      placeholder="e.g. Vacation Savings"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="accountType">Account Type *</label>
                    <select
                      id="accountType"
                      name="type"
                      value={newAccountForm.type}
                      onChange={handleNewAccountInput}
                      required
                    >
                      <option value="savings">Savings Account</option>
                      <option value="current">Current Account</option>
                      <option value="fixed">Fixed Deposit</option>
                      <option value="foreign">Foreign Currency Account</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="accountCurrency">Currency *</label>
                    <select
                      id="accountCurrency"
                      name="currency"
                      value={newAccountForm.currency}
                      onChange={handleNewAccountInput}
                      required
                    >
                      <option value="NGN">Naira (NGN)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="GBP">British Pound (GBP)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setShowNewAccountForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="accounts-grid">
            {accounts.map((account) => (
              <div key={account.id} className="account-card">
                <div className="account-card-header">
                  <div className="account-type">{account.type}</div>
                  <div className={`account-status ${account.status}`}>
                    {account.status}
                  </div>
                </div>

                <h3 className="account-name">{account.name}</h3>
                <p className="account-number">{account.number}</p>

                <div className="account-balance">
                  {formatCurrency(account.balance, account.currency)}
                </div>

                <div className="account-actions">
                  <button className="btn-secondary">View Details</button>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setActiveTab("deposit");
                      setSelectedAccount(account.id);
                    }}
                  >
                    Deposit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "deposit" && (
        <div className="deposit-container">
          <h2>Deposit Funds</h2>

          <div className="deposit-methods">
            <div className="method-tabs">
              <button
                className={fundingMethod === "card" ? "method-active" : ""}
                onClick={() => setFundingMethod("card")}
              >
                <i className="fas fa-credit-card"></i> Credit/Debit Card
              </button>
              <button
                className={fundingMethod === "transfer" ? "method-active" : ""}
                onClick={() => setFundingMethod("transfer")}
              >
                <i className="fas fa-exchange-alt"></i> Bank Transfer
              </button>
            </div>

            <form onSubmit={handleDeposit} className="deposit-form">
              <div className="form-group">
                <label htmlFor="account">Select Account *</label>
                <select
                  id="account"
                  name="account"
                  value={depositForm.account}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {account.number} ({account.currency})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount *</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={depositForm.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                />
              </div>

              {fundingMethod === "card" && (
                <>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={depositForm.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiry">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={depositForm.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={depositForm.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {fundingMethod === "transfer" && (
                <>
                  <div className="form-group">
                    <label htmlFor="bankName">Bank Name *</label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={depositForm.bankName}
                      onChange={handleInputChange}
                      placeholder="Enter bank name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="accountNumber">Account Number *</label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={depositForm.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="accountName">Account Name *</label>
                    <input
                      type="text"
                      id="accountName"
                      name="accountName"
                      value={depositForm.accountName}
                      onChange={handleInputChange}
                      placeholder="Enter account name"
                      required
                    />
                  </div>
                </>
              )}

              <button type="submit" className="submit-btn">
                Deposit Funds
              </button>
            </form>
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

              <button
                className="btn-primary"
                onClick={downloadTransactions}
                disabled={filteredTransactions.length === 0}
              >
                <i className="fas fa-download"></i> Download
              </button>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="no-transactions">
              <p>No transactions found for the selected date range.</p>
            </div>
          ) : (
            <div className="transactions-table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Method</th>
                    <th>Account</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => {
                    const account = accounts.find(
                      (acc) => acc.id === transaction.accountId
                    );
                    return (
                      <tr key={transaction.id}>
                        <td>{formatDate(transaction.date)}</td>
                        <td>{transaction.description}</td>
                        <td>
                          <span
                            className={`method-badge ${transaction.method}`}
                          >
                            {transaction.method}
                          </span>
                        </td>
                        <td>{account ? account.name : "N/A"}</td>
                        <td className={`amount ${transaction.type}`}>
                          {transaction.type === "deposit" ? "+" : "-"}
                          {formatCurrency(
                            transaction.amount,
                            transaction.currency
                          )}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${transaction.status}`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
