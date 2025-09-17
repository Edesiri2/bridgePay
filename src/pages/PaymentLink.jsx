import React, { useState } from "react";
import "./PaymentLink.css";

export default function PaymentLink() {
  const [activeView, setActiveView] = useState("manage");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLink, setSelectedLink] = useState(null);

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

  const [paymentLinks, setPaymentLinks] = useState([
    {
      id: 1,
      title: "Website Development Fee",
      amount: 150000,
      currency: "NGN",
      description: "Payment for website development services",
      status: "completed",
      url: "https://bridgepay.com/pay/abc123",
      created: "2023-10-15",
      account: 1,
      payments: [
        { amount: 150000, date: "2023-10-16" }
      ]
    },
    {
      id: 2,
      title: "Monthly Subscription",
      amount: 5000,
      currency: "NGN",
      description: "Monthly service subscription fee",
      status: "pending",
      url: "https://bridgepay.com/pay/def456",
      created: "2023-10-12",
      account: 2,
      payments: []
    },
    {
      id: 3,
      title: "Consultation Fee",
      amount: 25000,
      currency: "NGN",
      description: "One-time consultation session",
      status: "underpaid",
      url: "https://bridgepay.com/pay/ghi789",
      created: "2023-10-10",
      account: 1,
      payments: [
        { amount: 15000, date: "2023-10-11" }
      ]
    }
  ]);

  const [paymentForm, setPaymentForm] = useState({
    title: "",
    amount: "",
    currency: "NGN",
    description: "",
    customerName: "",
    customerEmail: "",
    account: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value
    });
  };

  const createPaymentLink = (e) => {
    e.preventDefault();
    
    if (!paymentForm.title || !paymentForm.amount || !paymentForm.account) {
      alert("Please fill in all required fields");
      return;
    }

    const selectedAccount = accounts.find(acc => acc.id === parseInt(paymentForm.account));
    
    const newPaymentLink = {
      id: paymentLinks.length + 1,
      title: paymentForm.title,
      amount: parseFloat(paymentForm.amount),
      currency: paymentForm.currency,
      description: paymentForm.description,
      status: "pending",
      url: `https://bridgepay.com/pay/${Math.random().toString(36).substr(2, 9)}`,
      created: new Date().toISOString().split('T')[0],
      account: parseInt(paymentForm.account),
      customerName: paymentForm.customerName,
      customerEmail: paymentForm.customerEmail,
      payments: []
    };

    setPaymentLinks([newPaymentLink, ...paymentLinks]);
    setPaymentForm({
      title: "",
      amount: "",
      currency: "NGN",
      description: "",
      customerName: "",
      customerEmail: "",
      account: ""
    });
    setActiveView("manage");

    alert("Payment link created successfully!");
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Payment link copied to clipboard!");
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
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

  const getTotalPaid = (payments) => {
    return payments.reduce((total, payment) => total + payment.amount, 0);
  };

  const getPaymentStatus = (paymentLink) => {
    const totalPaid = getTotalPaid(paymentLink.payments);
    
    if (totalPaid === 0) return "pending";
    if (totalPaid < paymentLink.amount) return "underpaid";
    if (totalPaid > paymentLink.amount) return "overpaid";
    return "completed";
  };

  // Update status for all payment links
  const updatedPaymentLinks = paymentLinks.map(link => ({
    ...link,
    status: getPaymentStatus(link)
  }));

  const filteredPaymentLinks = filterStatus === "all" 
    ? updatedPaymentLinks 
    : updatedPaymentLinks.filter(link => link.status === filterStatus);

  const viewLinkDetails = (link) => {
    setSelectedLink(link);
    setActiveView("details");
  };

  const PaymentLinkDetails = () => {
    if (!selectedLink) return null;
    
    const account = accounts.find(acc => acc.id === selectedLink.account);
    const totalPaid = getTotalPaid(selectedLink.payments);
    
    return (
      <div className="paymentlink-details">
        <div className="details-header">
          <button 
            className="back-button"
            onClick={() => setActiveView("manage")}
          >
            <i className="fas fa-arrow-left"></i> Back to Payment Links
          </button>
          <h2>Payment Link Details</h2>
        </div>
        
        <div className="details-content">
          <div className="details-card">
            <div className="details-section">
              <h3>Payment Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Title</label>
                  <span>{selectedLink.title}</span>
                </div>
                <div className="detail-item">
                  <label>Amount</label>
                  <span className="detail-amount">
                    {formatCurrency(selectedLink.amount, selectedLink.currency)}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Description</label>
                  <span>{selectedLink.description || "No description"}</span>
                </div>
                <div className="detail-item">
                  <label>Status</label>
                  <span className={`status-badge ${selectedLink.status}`}>
                    {selectedLink.status}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Created</label>
                  <span>{formatDate(selectedLink.created)}</span>
                </div>
                <div className="detail-item">
                  <label>Receiving Account</label>
                  <span>{account?.name || "N/A"}</span>
                </div>
              </div>
            </div>
            
            <div className="details-section">
              <h3>Payment URL</h3>
              <div className="url-display">
                <input 
                  type="text" 
                  value={selectedLink.url} 
                  readOnly 
                />
                <button 
                  className="btn-secondary"
                  onClick={() => copyToClipboard(selectedLink.url)}
                >
                  <i className="fas fa-copy"></i> Copy
                </button>
              </div>
            </div>
            
            {selectedLink.payments.length > 0 && (
              <div className="details-section">
                <h3>Payment History</h3>
                <div className="payments-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLink.payments.map((payment, index) => (
                        <tr key={index}>
                          <td>{formatDate(payment.date)}</td>
                          <td>{formatCurrency(payment.amount, selectedLink.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div className="preview-section">
              <h3>Customer Preview</h3>
              <div className="preview-card">
                <div className="preview-header">
                  <div className="preview-logo">
                    <div className="logo-icon">
                      <i className="fas fa-bridge"></i>
                    </div>
                    <span className="logo-text">BridgePay</span>
                  </div>
                  <div className="preview-amount">
                    {formatCurrency(selectedLink.amount, selectedLink.currency)}
                  </div>
                </div>
                
                <div className="preview-body">
                  <h4 className="preview-title">{selectedLink.title}</h4>
                  
                  <p className="preview-description">
                    {selectedLink.description || "No description provided"}
                  </p>
                  
                  {selectedLink.customerName && (
                    <div className="preview-customer">
                      <i className="fas fa-user"></i>
                      <span>For: {selectedLink.customerName}</span>
                    </div>
                  )}
                  
                  <div className="preview-account">
                    <i className="fas fa-wallet"></i>
                    <span>{account?.name || "Account"}</span>
                  </div>
                </div>
                
                <div className="preview-footer">
                  <div className="preview-security">
                    <i className="fas fa-lock"></i>
                    <span>Secure payment by BridgePay</span>
                  </div>
                  <div className="preview-actions">
                    <button className="pay-button">Pay Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="paymentlink-container">
      <div className="paymentlink-header">
        <h1>Payment Links</h1>
        <p>Create and manage payment links to receive payments</p>
      </div>

      {activeView === "manage" ? (
        <div className="manage-paymentlinks">
          <div className="manage-header">
            <h2>Payment Links</h2>
            
            <div className="header-actions">
              <div className="filter-controls">
                <div className="filter-group">
                  <label htmlFor="statusFilter">Filter:</label>
                  <select
                    id="statusFilter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="underpaid">Underpaid</option>
                    <option value="overpaid">Overpaid</option>
                  </select>
                </div>
                
                <div className="search-group">
                  <input
                    type="text"
                    placeholder="Search payment links..."
                  />
                  <i className="fas fa-search"></i>
                </div>
              </div>
              
              <button 
                className="btn-primary"
                onClick={() => setActiveView("create")}
              >
                <i className="fas fa-plus"></i> New Payment Link
              </button>
            </div>
          </div>

          {filteredPaymentLinks.length === 0 ? (
            <div className="no-links">
              <div className="no-links-icon">
                <i className="fas fa-link"></i>
              </div>
              <h3>No payment links found</h3>
              <p>Create your first payment link to get started</p>
              <button 
                className="btn-primary"
                onClick={() => setActiveView("create")}
              >
                Create Payment Link
              </button>
            </div>
          ) : (
            <div className="paymentlinks-table-container">
              <div className="table-responsive">
                <table className="paymentlinks-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Amount</th>
                      <th>Account</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPaymentLinks.map(link => {
                      const totalPaid = getTotalPaid(link.payments);
                      const account = accounts.find(acc => acc.id === link.account);
                      return (
                        <tr key={link.id}>
                          <td>
                            <div className="link-title-cell">
                              <div className="title-text">{link.title}</div>
                            </div>
                          </td>
                          <td>
                            <div className="amount-cell">
                              <span className="amount">{formatCurrency(link.amount, link.currency)}</span>
                              {totalPaid > 0 && (
                                <span className="paid-amount">
                                  Paid: {formatCurrency(totalPaid, link.currency)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>{account?.name || "N/A"}</td>
                          <td>{formatDate(link.created)}</td>
                          <td>
                            <span className={`status-badge ${link.status}`}>
                              {link.status}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button 
                                className="icon-btn"
                                onClick={() => copyToClipboard(link.url)}
                                title="Copy payment link"
                              >
                                <i className="fas fa-copy"></i>
                              </button>
                              <button 
                                className="icon-btn" 
                                title="View details"
                                onClick={() => viewLinkDetails(link)}
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : activeView === "create" ? (
        <div className="create-paymentlink">
          <div className="create-header">
            <button 
              className="back-button"
              onClick={() => setActiveView("manage")}
            >
              <i className="fas fa-arrow-left"></i> Back to Payment Links
            </button>
            <h2>Create New Payment Link</h2>
            <p>Create a shareable link to receive payments from customers</p>
          </div>

          <div className="create-content">
            <div className="paymentlink-form-container">
              <div className="paymentlink-card">
                <form onSubmit={createPaymentLink} className="paymentlink-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Payment Title *</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={paymentForm.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Invoice Payment, Service Fee"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <select
                        id="currency"
                        name="currency"
                        value={paymentForm.currency}
                        onChange={handleInputChange}
                      >
                        <option value="NGN">NGN - Nigerian Naira</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="amount">Amount *</label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={paymentForm.amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="account">Receiving Account *</label>
                    <select
                      id="account"
                      name="account"
                      value={paymentForm.account}
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

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      value={paymentForm.description}
                      onChange={handleInputChange}
                      placeholder="Describe what this payment is for..."
                    ></textarea>
                  </div>

                  <div className="form-section-divider">
                    <span>Customer Information (Optional)</span>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="customerName">Customer Name</label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={paymentForm.customerName}
                        onChange={handleInputChange}
                        placeholder="Customer's full name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="customerEmail">Customer Email</label>
                      <input
                        type="email"
                        id="customerEmail"
                        name="customerEmail"
                        value={paymentForm.customerEmail}
                        onChange={handleInputChange}
                        placeholder="customer@example.com"
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn">
                    Create Payment Link
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PaymentLinkDetails />
      )}
    </div>
  );
}