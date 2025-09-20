import React, { useState } from "react";
import "./PayBills.css";

export default function PayBills() {
  const [activeTab, setActiveTab] = useState("airtime");
  const [showBillForm, setShowBillForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [savedBeneficiaries, setSavedBeneficiaries] = useState([
    { id: 1, name: "My Airtel Line", number: "08031234567", provider: "airtel" },
    { id: 2, name: "Home Internet", number: "1234567890", provider: "spectranet" },
    { id: 3, name: "Office Electricity", number: "5432167890", provider: "ikedc" },
  ]);

  // Sample providers data
  const providers = {
    airtime: [
      { id: 1, name: "MTN", icon: "fa-sim-card" },
      { id: 2, name: "Airtel", icon: "fa-sim-card" },
      { id: 3, name: "Glo", icon: "fa-sim-card" },
      { id: 4, name: "9mobile", icon: "fa-sim-card" },
    ],
    data: [
      { id: 1, name: "MTN Data", icon: "fa-wifi" },
      { id: 2, name: "Airtel Data", icon: "fa-wifi" },
      { id: 3, name: "Glo Data", icon: "fa-wifi" },
      { id: 4, name: "9mobile Data", icon: "fa-wifi" },
      { id: 5, name: "Smile", icon: "fa-wifi" },
      { id: 6, name: "Spectranet", icon: "fa-wifi" },
    ],
    electricity: [
      { id: 1, name: "IKEDC", icon: "fa-bolt" },
      { id: 2, name: "EKEDC", icon: "fa-bolt" },
      { id: 3, name: "IBEDC", icon: "fa-bolt" },
      { id: 4, name: "BEDC", icon: "fa-bolt" },
      { id: 5, name: "AEDC", icon: "fa-bolt" },
      { id: 6, name: "KAEDCO", icon: "fa-bolt" },
    ],
    cable: [
      { id: 1, name: "DStv", icon: "fa-tv" },
      { id: 2, name: "GOtv", icon: "fa-tv" },
      { id: 3, name: "Startimes", icon: "fa-tv" },
    ],
    water: [
      { id: 1, name: "LWC", icon: "fa-tint" },
      { id: 2, name: "LWC", icon: "fa-tint" },
      { id: 3, name: "ABSWA", icon: "fa-tint" },
    ],
    internet: [
      { id: 1, name: "Spectranet", icon: "fa-wifi" },
      { id: 2, name: "Smile", icon: "fa-wifi" },
      { id: 3, name: "Swift", icon: "fa-wifi" },
    ],
  };

  // Sample data plans
  const dataPlans = {
    mtn: [
      { id: 1, name: "500MB Daily", price: 200, validity: "1 day" },
      { id: 2, name: "1.5GB Weekly", price: 500, validity: "7 days" },
      { id: 3, name: "3GB Monthly", price: 1000, validity: "30 days" },
      { id: 4, name: "6GB Monthly", price: 1500, validity: "30 days" },
      { id: 5, name: "10GB Monthly", price: 3000, validity: "30 days" },
    ],
    airtel: [
      { id: 1, name: "500MB Daily", price: 200, validity: "1 day" },
      { id: 2, name: "1.5GB Weekly", price: 500, validity: "7 days" },
      { id: 3, name: "3GB Monthly", price: 1000, validity: "30 days" },
      { id: 4, name: "6GB Monthly", price: 1500, validity: "30 days" },
      { id: 5, name: "10GB Monthly", price: 3000, validity: "30 days" },
    ],
    glo: [
      { id: 1, name: "500MB Daily", price: 200, validity: "1 day" },
      { id: 2, name: "1.5GB Weekly", price: 500, validity: "7 days" },
      { id: 3, name: "3GB Monthly", price: 1000, validity: "30 days" },
      { id: 4, name: "6GB Monthly", price: 1500, validity: "30 days" },
      { id: 5, name: "10GB Monthly", price: 3000, validity: "30 days" },
    ],
  };

  const [billForm, setBillForm] = useState({
    provider: "",
    type: "airtime",
    phone: "",
    amount: "",
    plan: "",
    meter: "",
    customer: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillForm({
      ...billForm,
      [name]: value,
    });
  };

  const handleProviderSelect = (provider, type) => {
    setSelectedProvider(provider);
    setBillForm({
      ...billForm,
      provider: provider.name,
      type: type,
    });
    setShowBillForm(true);
  };

  const handlePlanSelect = (plan) => {
    setBillForm({
      ...billForm,
      amount: plan.price,
      plan: plan.name,
    });
  };

  const handleBillPayment = (e) => {
    e.preventDefault();
    if (billForm.amount && billForm.provider) {
      alert(`Payment of ₦${billForm.amount} to ${billForm.provider} initiated successfully!`);
      // Reset form
      setBillForm({
        provider: "",
        type: "airtime",
        phone: "",
        amount: "",
        plan: "",
        meter: "",
        customer: "",
      });
      setShowBillForm(false);
      setSelectedProvider(null);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleBeneficiarySelect = (beneficiary) => {
    setBillForm({
      ...billForm,
      phone: beneficiary.number,
      provider: beneficiary.provider,
    });
  };

  return (
    <div className="paybills-container">
      <div className="paybills-header">
        <h1>Pay Bills</h1>
        <p>Quickly pay for services and utilities</p>
      </div>

      <div className="paybills-tabs">
        <button
          className={activeTab === "airtime" ? "tab-active" : ""}
          onClick={() => setActiveTab("airtime")}
        >
          <i className="fas fa-mobile-alt"></i> Airtime
        </button>
        <button
          className={activeTab === "data" ? "tab-active" : ""}
          onClick={() => setActiveTab("data")}
        >
          <i className="fas fa-wifi"></i> Data
        </button>
        <button
          className={activeTab === "electricity" ? "tab-active" : ""}
          onClick={() => setActiveTab("electricity")}
        >
          <i className="fas fa-bolt"></i> Electricity
        </button>
        <button
          className={activeTab === "cable" ? "tab-active" : ""}
          onClick={() => setActiveTab("cable")}
        >
          <i className="fas fa-tv"></i> Cable TV
        </button>
        <button
          className={activeTab === "water" ? "tab-active" : ""}
          onClick={() => setActiveTab("water")}
        >
          <i className="fas fa-tint"></i> Water
        </button>
        <button
          className={activeTab === "internet" ? "tab-active" : ""}
          onClick={() => setActiveTab("internet")}
        >
          <i className="fas fa-internet-explorer"></i> Internet
        </button>
      </div>

      <div className="paybills-content">
        {/* Saved Beneficiaries */}
        {savedBeneficiaries.length > 0 && (
          <div className="saved-beneficiaries">
            <h2>Saved Beneficiaries</h2>
            <div className="beneficiaries-list">
              {savedBeneficiaries.map((beneficiary) => (
                <div 
                  key={beneficiary.id} 
                  className="beneficiary-card"
                  onClick={() => handleBeneficiarySelect(beneficiary)}
                >
                  <div className="beneficiary-icon">
                    <i className={`fas ${providers[beneficiary.provider]?.[0]?.icon || 'fa-user'}`}></i>
                  </div>
                  <div className="beneficiary-details">
                    <h3>{beneficiary.name}</h3>
                    <p>{beneficiary.number}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Providers Grid */}
        <div className="providers-section">
          <h2>Select Provider</h2>
          <div className="providers-grid">
            {providers[activeTab]?.map((provider) => (
              <div 
                key={provider.id} 
                className="provider-card"
                onClick={() => handleProviderSelect(provider, activeTab)}
              >
                <div className="provider-icon">
                  <i className={`fas ${provider.icon}`}></i>
                </div>
                <span className="provider-name">{provider.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Payment Form Modal */}
        {showBillForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Pay {selectedProvider?.name} {activeTab}</h3>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowBillForm(false);
                    setSelectedProvider(null);
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <form onSubmit={handleBillPayment} className="bill-form">
                {activeTab === "data" && selectedProvider && (
                  <div className="data-plans">
                    <h4>Select Data Plan</h4>
                    <div className="plans-grid">
                      {dataPlans[selectedProvider.name.toLowerCase().split(' ')[0]]?.map((plan) => (
                        <div 
                          key={plan.id} 
                          className={`plan-card ${billForm.plan === plan.name ? 'selected' : ''}`}
                          onClick={() => handlePlanSelect(plan)}
                        >
                          <div className="plan-name">{plan.name}</div>
                          <div className="plan-price">{formatCurrency(plan.price)}</div>
                          <div className="plan-validity">{plan.validity}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="phone">
                    {activeTab === "electricity" ? "Meter Number" : 
                     activeTab === "cable" ? "Smartcard Number" : 
                     "Phone Number"} *
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={billForm.phone}
                    onChange={handleInputChange}
                    placeholder={
                      activeTab === "electricity" ? "Enter meter number" : 
                      activeTab === "cable" ? "Enter smartcard number" : 
                      "Enter phone number"
                    }
                    required
                  />
                </div>

                {(activeTab === "airtime" || activeTab === "electricity" || activeTab === "cable" || activeTab === "water") && (
                  <div className="form-group">
                    <label htmlFor="amount">Amount (₦) *</label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={billForm.amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                )}

                <button type="submit" className="submit-btn">
                  Pay {formatCurrency(billForm.amount || 0)}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Recent Bills */}
        <div className="recent-bills">
          <h2>Recent Bill Payments</h2>
          <div className="bills-list">
            <div className="bill-item">
              <div className="bill-info">
                <div className="bill-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="bill-details">
                  <h3>Airtel Airtime</h3>
                  <p>08031234567 • Oct 15, 2023</p>
                </div>
              </div>
              <div className="bill-amount">-₦1,000</div>
            </div>
            <div className="bill-item">
              <div className="bill-info">
                <div className="bill-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="bill-details">
                  <h3>IKEDC Electricity</h3>
                  <p>1234567890 • Oct 10, 2023</p>
                </div>
              </div>
              <div className="bill-amount">-₦5,500</div>
            </div>
            <div className="bill-item">
              <div className="bill-info">
                <div className="bill-icon">
                  <i className="fas fa-tv"></i>
                </div>
                <div className="bill-details">
                  <h3>DStv Subscription</h3>
                  <p>5432167890 • Oct 5, 2023</p>
                </div>
              </div>
              <div className="bill-amount">-₦15,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}