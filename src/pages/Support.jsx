import React, { useState } from "react";
import "./Support.css";

export default function Support() {
  const [activeTab, setActiveTab] = useState("new");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "medium",
    file: null
  });
  
  const [tickets, setTickets] = useState([
    {
      id: 1,
      category: "Account Issue",
      subject: "Cannot access my account",
      description: "I've been unable to login to my account since yesterday.",
      priority: "high",
      status: "open",
      date: "2023-10-15",
      file: null,
      messages: [
        {
          id: 1,
          sender: "user",
          text: "I've been unable to login to my account since yesterday.",
          timestamp: "2023-10-15 10:30 AM"
        },
        {
          id: 2,
          sender: "support",
          text: "We're looking into this issue. Can you try resetting your password?",
          timestamp: "2023-10-15 11:45 AM"
        }
      ]
    },
    {
      id: 2,
      category: "Transaction",
      subject: "Failed transaction deduction",
      description: "I was charged for a transaction that failed.",
      priority: "medium",
      status: "closed",
      date: "2023-10-10",
      file: null,
      messages: [
        {
          id: 1,
          sender: "user",
          text: "I was charged for a transaction that failed.",
          timestamp: "2023-10-10 09:15 AM"
        },
        {
          id: 2,
          sender: "support",
          text: "We've verified the issue and will process a refund within 3-5 business days.",
          timestamp: "2023-10-10 02:30 PM"
        }
      ]
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.category && formData.subject && formData.description) {
      const newTicket = {
        id: tickets.length + 1,
        ...formData,
        status: "open",
        date: new Date().toISOString().split('T')[0],
        messages: [
          {
            id: 1,
            sender: "user",
            text: formData.description,
            timestamp: new Date().toLocaleString()
          }
        ]
      };
      
      setTickets([newTicket, ...tickets]);
      setFormData({
        category: "",
        subject: "",
        description: "",
        priority: "medium",
        file: null
      });
      
      // Reset file input
      document.getElementById("file-upload").value = "";
      
      alert("Your support ticket has been submitted successfully!");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const closeTicket = (id) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? {...ticket, status: "closed"} : ticket
    ));
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket(null);
    }
  };

  const reopenTicket = (id) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? {...ticket, status: "open"} : ticket
    ));
  };

  const viewTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const sendMessage = () => {
    if (chatMessage.trim() && selectedTicket) {
      const newMessage = {
        id: selectedTicket.messages.length + 1,
        sender: "user",
        text: chatMessage,
        timestamp: new Date().toLocaleString()
      };
      
      const updatedTickets = tickets.map(ticket => 
        ticket.id === selectedTicket.id 
          ? {...ticket, messages: [...ticket.messages, newMessage]}
          : ticket
      );
      
      setTickets(updatedTickets);
      setSelectedTicket({
        ...selectedTicket,
        messages: [...selectedTicket.messages, newMessage]
      });
      setChatMessage("");
    }
  };

  const viewFile = (file) => {
    if (file) {
      // Create a URL for the file and open it in a new tab
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  };

  const backToTickets = () => {
    setSelectedTicket(null);
  };

  const filteredTickets = activeTab === "open" 
    ? tickets.filter(ticket => ticket.status === "open")
    : activeTab === "closed"
    ? tickets.filter(ticket => ticket.status === "closed")
    : tickets;

  return (
    <div className="support-container">
      <h1 className="support-title">Customer Support</h1>
      
      {selectedTicket ? (
        <div className="ticket-detail-view">
          <button className="back-button" onClick={backToTickets}>
            <i className="fas fa-arrow-left"></i> Back to Tickets
          </button>
          
          <div className="ticket-header-detail">
            <div>
              <h2>{selectedTicket.subject}</h2>
              <div className="ticket-meta">
                <span className="ticket-id">#{selectedTicket.id}</span>
                <span className={`priority-badge ${selectedTicket.priority}`}>
                  {selectedTicket.priority}
                </span>
                <span className={`status-badge ${selectedTicket.status}`}>
                  {selectedTicket.status}
                </span>
                <span className="ticket-category">{selectedTicket.category}</span>
                <span className="ticket-date">{selectedTicket.date}</span>
              </div>
            </div>
            
            {selectedTicket.status === "open" && (
              <button 
                className="btn-secondary"
                onClick={() => closeTicket(selectedTicket.id)}
              >
                Close Ticket
              </button>
            )}
          </div>
          
          {selectedTicket.file && (
            <div className="ticket-attachment-detail">
              <h3>Attached File</h3>
              <div className="attachment-preview" onClick={() => viewFile(selectedTicket.file)}>
                <i className="fas fa-paperclip"></i>
                <span>{selectedTicket.file.name}</span>
                <button className="view-file-btn">View File</button>
              </div>
            </div>
          )}
          
          <div className="chat-container">
            <h3>Conversation</h3>
            <div className="chat-messages">
              {selectedTicket.messages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedTicket.status === "open" && (
              <div className="chat-input">
                <textarea
                  rows="3"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message here..."
                />
                <button onClick={sendMessage} disabled={!chatMessage.trim()}>
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="support-tabs">
            <button 
              className={activeTab === "new" ? "tab-active" : ""} 
              onClick={() => setActiveTab("new")}
            >
              New Ticket
            </button>
            <button 
              className={activeTab === "open" ? "tab-active" : ""} 
              onClick={() => setActiveTab("open")}
            >
              Open Tickets
            </button>
            <button 
              className={activeTab === "closed" ? "tab-active" : ""} 
              onClick={() => setActiveTab("closed")}
            >
              Closed Tickets
            </button>
            <button 
              className={activeTab === "all" ? "tab-active" : ""} 
              onClick={() => setActiveTab("all")}
            >
              All Tickets
            </button>
          </div>
          
          {activeTab === "new" ? (
            <div className="ticket-form-container">
              <h2>Create New Support Ticket</h2>
              <form onSubmit={handleSubmit} className="ticket-form">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Account Issue">Account Issue</option>
                    <option value="Transaction">Transaction Problem</option>
                    <option value="Loan Application">Loan Application</option>
                    <option value="Card Issue">Card Issue</option>
                    <option value="Online Banking">Online Banking</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Please describe your issue in detail..."
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="file-upload">Attach File (Optional)</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <span className="file-info">
                      {formData.file ? formData.file.name : "No file chosen"}
                    </span>
                  </div>
                  <small>Supported formats: JPG, PNG, PDF, DOC (Max 5MB)</small>
                </div>
                
                <button type="submit" className="submit-btn">
                  Submit Ticket
                </button>
              </form>
            </div>
          ) : (
            <div className="tickets-container">
              <h2>
                {activeTab === "open" && "Open Tickets"}
                {activeTab === "closed" && "Closed Tickets"}
                {activeTab === "all" && "All Tickets"}
              </h2>
              
              {filteredTickets.length === 0 ? (
                <div className="no-tickets">
                  <p>No {activeTab} tickets found.</p>
                </div>
              ) : (
                <div className="tickets-list">
                  {filteredTickets.map(ticket => (
                    <div key={ticket.id} className={`ticket-card ${ticket.status}`}>
                      <div className="ticket-header">
                        <div className="ticket-meta">
                          <span className="ticket-id">#{ticket.id}</span>
                          <span className={`priority-badge ${ticket.priority}`}>
                            {ticket.priority}
                          </span>
                          <span className={`status-badge ${ticket.status}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <span className="ticket-date">{ticket.date}</span>
                      </div>
                      
                      <h3 className="ticket-subject">{ticket.subject}</h3>
                      <div className="ticket-category">{ticket.category}</div>
                      
                      <p className="ticket-description">{ticket.description}</p>
                      
                      {ticket.file && (
                        <div className="ticket-attachment">
                          <i className="fas fa-paperclip"></i>
                          <span>Attachment: {ticket.file.name}</span>
                        </div>
                      )}
                      
                      <div className="ticket-actions">
                        <button 
                          className="btn-primary"
                          onClick={() => viewTicket(ticket)}
                        >
                          View Ticket
                        </button>
                        {ticket.status === "open" ? (
                          <button 
                            className="btn-secondary"
                            onClick={() => closeTicket(ticket.id)}
                          >
                            Close Ticket
                          </button>
                        ) : (
                          <button 
                            className="btn-secondary"
                            onClick={() => reopenTicket(ticket.id)}
                          >
                            Reopen Ticket
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}