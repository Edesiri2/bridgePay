import React, { useState } from "react";
import "./Transfer.css";

export default function Transfer() {
  const [activeTab, setActiveTab] = useState("internal");
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
  const [accounts] = useState([
    {
      id: 1,
      name: "Primary Savings",
      number: "**** 4582",
      balance: 1250000,
      currency: "NGN",
      type: "savings"
    },
    {
      id: 2,
      name: "Current Account",
      number: "**** 7821",
      balance: 750000,
      currency: "NGN",
      type: "current"
    },
    {
      id: 3,
      name: "Dollar Account",
      number: "**** 6394",
      balance: 5000,
      currency: "USD",
      type: "foreign"
    }
  ]);

  const [beneficiaries, setBeneficiaries] = useState([
    {
      id: 1,
      name: "John Doe",
      bank: "GTBank",
      accountNumber: "0123456789",
      accountType: "savings",
      nickname: "Brother"
    },
    {
      id: 2,
      name: "Sarah Smith",
      bank: "First Bank",
      accountNumber: "9876543210",
      accountType: "current",
      nickname: "Sis"
    },
    {
      id: 3,
      name: "Mike Johnson",
      bank: "Zenith Bank",
      accountNumber: "4567890123",
      accountType: "savings",
      nickname: "Mike"
    }
  ]);

  const [transfers, setTransfers] = useState([
    {
      id: 1,
      type: "internal",
      fromAccount: "Primary Savings (****4582)",
      toAccount: "Current Account (****7821)",
      amount: 50000,
      currency: "NGN",
      date: "2023-10-15",
      status: "completed",
      description: "Funds transfer"
    },
    {
      id: 2,
      type: "external",
      fromAccount: "Current Account (****7821)",
      toAccount: "John Doe - GTBank (0123456789)",
      amount: 25000,
      currency: "NGN",
      date: "2023-10-12",
      status: "completed",
      description: "Monthly allowance"
    },
    {
      id: 3,
      type: "external",
      fromAccount: "Primary Savings (****4582)",
      toAccount: "Sarah Smith - First Bank (9876543210)",
      amount: 15000,
      currency: "NGN",
      date: "2023-10-10",
      status: "pending",
      description: "Loan repayment"
    }
  ]);

  const [transferForm, setTransferForm] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    beneficiaryBank: "",
    beneficiaryAccount: "",
    beneficiaryName: "",
    saveBeneficiary: false,
    beneficiaryNickname: ""
  });

  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    bank: "",
    accountNumber: "",
    accountType: "savings",
    nickname: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTransferForm({
      ...transferForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBeneficiaryInput = (e) => {
    const { name, value } = e.target;
    setNewBeneficiary({
      ...newBeneficiary,
      [name]: value
    });
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    
    if (!transferForm.fromAccount || !transferForm.amount) {
      alert("Please select source account and enter amount");
      return;
    }

    if (activeTab === "internal" && !transferForm.toAccount) {
      alert("Please select destination account");
      return;
    }

    if (activeTab === "external" && (!transferForm.beneficiaryAccount || !transferForm.beneficiaryBank)) {
      alert("Please enter beneficiary details");
      return;
    }

    // Create new transfer
    const fromAccount = accounts.find(acc => acc.id === parseInt(transferForm.fromAccount));
    let toAccountInfo = "";

    if (activeTab === "internal") {
      const toAccount = accounts.find(acc => acc.id === parseInt(transferForm.toAccount));
      toAccountInfo = `${toAccount.name} (${toAccount.number})`;
    } else {
      toAccountInfo = `${transferForm.beneficiaryName} - ${transferForm.beneficiaryBank} (${transferForm.beneficiaryAccount})`;
      
      // Save beneficiary if requested
      if (transferForm.saveBeneficiary && transferForm.beneficiaryNickname) {
        const newBeneficiary = {
          id: beneficiaries.length + 1,
          name: transferForm.beneficiaryName,
          bank: transferForm.beneficiaryBank,
          accountNumber: transferForm.beneficiaryAccount,
          accountType: "savings", // Default type
          nickname: transferForm.beneficiaryNickname
        };
        setBeneficiaries([...beneficiaries, newBeneficiary]);
      }
    }

    const newTransfer = {
      id: transfers.length + 1,
      type: activeTab,
      fromAccount: `${fromAccount.name} (${fromAccount.number})`,
      toAccount: toAccountInfo,
      amount: parseFloat(transferForm.amount),
      currency: fromAccount.currency,
      date: new Date().toISOString().split('T')[0],
      status: "pending",
      description: transferForm.description || "Funds transfer"
    };

    setTransfers([newTransfer, ...transfers]);
    
    // Reset form
    setTransferForm({
      fromAccount: "",
      toAccount: "",
      amount: "",
      description: "",
      beneficiaryBank: "",
      beneficiaryAccount: "",
      beneficiaryName: "",
      saveBeneficiary: false,
      beneficiaryNickname: ""
    });

    alert("Transfer initiated successfully!");
  };

  const addNewBeneficiary = (e) => {
    e.preventDefault();
    
    if (!newBeneficiary.name || !newBeneficiary.bank || !newBeneficiary.accountNumber) {
      alert("Please fill in all required fields");
      return;
    }

    const beneficiary = {
      id: beneficiaries.length + 1,
      ...newBeneficiary
    };

    setBeneficiaries([...beneficiaries, beneficiary]);
    setNewBeneficiary({
      name: "",
      bank: "",
      accountNumber: "",
      accountType: "savings",
      nickname: ""
    });
    setShowAddBeneficiary(false);

    alert("Beneficiary added successfully!");
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="transfer-container">
      <div className="transfer-header">
        <h1>Transfer Funds</h1>
        <p>Transfer money between your accounts or to other beneficiaries</p>
      </div>

      <div className="transfer-tabs">
        <button 
          className={activeTab === "internal" ? "tab-active" : ""} 
          onClick={() => setActiveTab("internal")}
        >
          <i className="fas fa-exchange-alt"></i> Internal Transfer
        </button>
        <button 
          className={activeTab === "external" ? "tab-active" : ""} 
          onClick={() => setActiveTab("external")}
        >
          <i className="fas fa-user-friends"></i> Third Party Transfer
        </button>
        <button 
          className={activeTab === "history" ? "tab-active" : ""} 
          onClick={() => setActiveTab("history")}
        >
          <i className="fas fa-history"></i> Transfer History
        </button>
      </div>

      {activeTab !== "history" ? (
        <div className="transfer-form-container">
          <h2>{activeTab === "internal" ? "Internal Transfer" : "Third Party Transfer"}</h2>
          
          <form onSubmit={handleTransfer} className="transfer-form">
            <div className="form-group">
              <label htmlFor="fromAccount">From Account *</label>
              <select
                id="fromAccount"
                name="fromAccount"
                value={transferForm.fromAccount}
                onChange={handleInputChange}
                required
              >
                <option value="">Select account</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} - {formatCurrency(account.balance, account.currency)}
                  </option>
                ))}
              </select>
            </div>

            {activeTab === "internal" ? (
              <div className="form-group">
                <label htmlFor="toAccount">To Account *</label>
                <select
                  id="toAccount"
                  name="toAccount"
                  value={transferForm.toAccount}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select account</option>
                  {accounts
                    .filter(account => account.id !== parseInt(transferForm.fromAccount))
                    .map(account => (
                      <option key={account.id} value={account.id}>
                        {account.name} - {formatCurrency(account.balance, account.currency)}
                      </option>
                    ))
                  }
                </select>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="beneficiary">Select Beneficiary</label>
                  <select
                    id="beneficiary"
                    name="beneficiary"
                    onChange={(e) => {
                      if (e.target.value) {
                        const beneficiary = beneficiaries.find(b => b.id === parseInt(e.target.value));
                        if (beneficiary) {
                          setTransferForm({
                            ...transferForm,
                            beneficiaryName: beneficiary.name,
                            beneficiaryBank: beneficiary.bank,
                            beneficiaryAccount: beneficiary.accountNumber
                          });
                        }
                      }
                    }}
                  >
                    <option value="">Choose saved beneficiary</option>
                    {beneficiaries.map(beneficiary => (
                      <option key={beneficiary.id} value={beneficiary.id}>
                        {beneficiary.nickname} - {beneficiary.bank} ({beneficiary.accountNumber})
                      </option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    className="add-beneficiary-btn"
                    onClick={() => setShowAddBeneficiary(true)}
                  >
                    <i className="fas fa-plus"></i> Add New Beneficiary
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="beneficiaryName">Beneficiary Name *</label>
                  <input
                    type="text"
                    id="beneficiaryName"
                    name="beneficiaryName"
                    value={transferForm.beneficiaryName}
                    onChange={handleInputChange}
                    placeholder="Enter beneficiary full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="beneficiaryBank">Bank Name *</label>
                  <input
                    type="text"
                    id="beneficiaryBank"
                    name="beneficiaryBank"
                    value={transferForm.beneficiaryBank}
                    onChange={handleInputChange}
                    placeholder="Enter bank name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="beneficiaryAccount">Account Number *</label>
                  <input
                    type="text"
                    id="beneficiaryAccount"
                    name="beneficiaryAccount"
                    value={transferForm.beneficiaryAccount}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                    required
                  />
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="saveBeneficiary"
                    name="saveBeneficiary"
                    checked={transferForm.saveBeneficiary}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="saveBeneficiary">Save as beneficiary</label>
                </div>

                {transferForm.saveBeneficiary && (
                  <div className="form-group">
                    <label htmlFor="beneficiaryNickname">Nickname (Optional)</label>
                    <input
                      type="text"
                      id="beneficiaryNickname"
                      name="beneficiaryNickname"
                      value={transferForm.beneficiaryNickname}
                      onChange={handleInputChange}
                      placeholder="e.g. Brother, Sis, etc."
                    />
                  </div>
                )}
              </>
            )}

            <div className="form-group">
              <label htmlFor="amount">Amount *</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={transferForm.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <input
                type="text"
                id="description"
                name="description"
                value={transferForm.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </div>

            <button type="submit" className="submit-btn">
              Transfer Now
            </button>
          </form>
        </div>
      ) : (
        <div className="transfer-history-container">
          <h2>Transfer History</h2>
          
          {transfers.length === 0 ? (
            <div className="no-transfers">
              <p>No transfer history found.</p>
            </div>
          ) : (
            <div className="transfers-table-container">
              <table className="transfers-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map(transfer => (
                    <tr key={transfer.id}>
                      <td>{formatDate(transfer.date)}</td>
                      <td>
                        <span className={`transfer-type ${transfer.type}`}>
                          {transfer.type}
                        </span>
                      </td>
                      <td>{transfer.fromAccount}</td>
                      <td>{transfer.toAccount}</td>
                      <td className="amount">
                        {formatCurrency(transfer.amount, transfer.currency)}
                      </td>
                      <td>{transfer.description}</td>
                      <td>
                        <span className={`status-badge ${transfer.status}`}>
                          {transfer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add Beneficiary Modal */}
      {showAddBeneficiary && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Beneficiary</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddBeneficiary(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={addNewBeneficiary} className="beneficiary-form">
              <div className="form-group">
                <label htmlFor="newBeneficiaryName">Beneficiary Name *</label>
                <input
                  type="text"
                  id="newBeneficiaryName"
                  name="name"
                  value={newBeneficiary.name}
                  onChange={handleBeneficiaryInput}
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newBeneficiaryBank">Bank Name *</label>
                <input
                  type="text"
                  id="newBeneficiaryBank"
                  name="bank"
                  value={newBeneficiary.bank}
                  onChange={handleBeneficiaryInput}
                  placeholder="Enter bank name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newBeneficiaryAccount">Account Number *</label>
                <input
                  type="text"
                  id="newBeneficiaryAccount"
                  name="accountNumber"
                  value={newBeneficiary.accountNumber}
                  onChange={handleBeneficiaryInput}
                  placeholder="Enter account number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newBeneficiaryType">Account Type</label>
                <select
                  id="newBeneficiaryType"
                  name="accountType"
                  value={newBeneficiary.accountType}
                  onChange={handleBeneficiaryInput}
                >
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="newBeneficiaryNickname">Nickname (Optional)</label>
                <input
                  type="text"
                  id="newBeneficiaryNickname"
                  name="nickname"
                  value={newBeneficiary.nickname}
                  onChange={handleBeneficiaryInput}
                  placeholder="e.g. Brother, Sis, etc."
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowAddBeneficiary(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Beneficiary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}