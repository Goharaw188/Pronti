import React, { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";
import "./App.css";
import SpotlightCard from "./components/SpotlightCard";
import FadeContent from "./components/FadeContent";

const monday = mondaySdk();

// Mock data for the new Company x People board structure
const mockData = [
  {
    id: "1",
    name: "Michael Stone",
    group: { title: "Hot Leads" },
    column_values: [
      { id: "text_mkvybmv2", title: "First Name", text: "Michael", value: "Michael", type: "text" },
      { id: "text_mkvyqk12", title: "Last Name", text: "Stone", value: "Stone", type: "text" },
      { id: "text_mkvy3wdc", title: "Job Title", text: "COO", value: "COO", type: "text" },
      { id: "email_mkvykynq", title: "Work Email", text: "michaelstone@gmail.com", value: "michaelstone@gmail.com", type: "email" },
      { id: "phone_mkvyssq7", title: "Phone Number", text: "202-56-32-945", value: "202-56-32-945", type: "phone" },
      { id: "link_mkvyere3", title: "LinkedIn Profile", text: "https://linkedin.com/in/michaelstone", value: "https://linkedin.com/in/michaelstone", type: "link" },
      { id: "text_mkvydcf7", title: "Location", text: "San Francisco, CA", value: "San Francisco, CA", type: "text" },
      { id: "color_mkvygng3", title: "Lead Status", text: "In Progress", value: "In Progress", type: "color" },
      { id: "color_mkvyxdy1", title: "Tier", text: "Tier 1", value: "Tier 1", type: "color" },
      { id: "numeric_mkvyhq72", title: "Engagement Score", text: "87", value: "87", type: "numeric" },
      { id: "color_mkvynspn", title: "Next Action", text: "Schedule Demo", value: "Schedule Demo", type: "color" },
      { id: "date_mkvy906z", title: "Next Action Due Date", text: "2025-01-25", value: "2025-01-25", type: "date" },
      { id: "long_text_mkvyn6c3", title: "Pain Points", text: "Need better project management and team collaboration tools", value: "Need better project management and team collaboration tools", type: "long_text" },
      { id: "date_mkvyefkw", title: "Last Engagement Date", text: "2025-01-20", value: "2025-01-20", type: "date" },
      { id: "multiple_person_mkvyabfq", title: "Assigned Person", text: "John Doe", value: "John Doe", type: "people" },
      { id: "file_mkvyf09e", title: "Profile Picture", text: "", value: "", type: "file" },
      { id: "numeric_mkvy4jjs", title: "Deal Value", text: "50000", value: "50000", type: "numeric" },
      { id: "numeric_mkvygggz", title: "Lead Score", text: "92", value: "92", type: "numeric" },
      { id: "long_text_mkvyzm9p", title: "Activity Log", text: "Initial call completed, demo scheduled for next week", value: "Initial call completed, demo scheduled for next week", type: "long_text" },
      { id: "tag_mkvy4zdj", title: "Tags", text: "Hot Lead,Enterprise,High Value", value: "Hot Lead,Enterprise,High Value", type: "tags" },
      { id: "text_mkvygx4a", title: "Lead Source", text: "LinkedIn", value: "LinkedIn", type: "text" },
      { id: "long_text_mkvykm", title: "Notes", text: "Very interested in our enterprise solution. Budget approved for Q1.", value: "Very interested in our enterprise solution. Budget approved for Q1.", type: "long_text" }
    ]
  },
  {
    id: "2",
    name: "Sophia Anderson",
    group: { title: "Qualified Leads" },
    column_values: [
      { id: "text_mkvybmv2", title: "First Name", text: "Sophia", value: "Sophia", type: "text" },
      { id: "text_mkvyqk12", title: "Last Name", text: "Anderson", value: "Anderson", type: "text" },
      { id: "text_mkvy3wdc", title: "Job Title", text: "Product Manager", value: "Product Manager", type: "text" },
      { id: "email_mkvykynq", title: "Work Email", text: "sophiaanderson@gmail.com", value: "sophiaanderson@gmail.com", type: "email" },
      { id: "phone_mkvyssq7", title: "Phone Number", text: "(480) 535-0103", value: "(480) 535-0103", type: "phone" },
      { id: "link_mkvyere3", title: "LinkedIn Profile", text: "https://linkedin.com/in/sophiaanderson", value: "https://linkedin.com/in/sophiaanderson", type: "link" },
      { id: "text_mkvydcf7", title: "Location", text: "45 Accent Street, Boston, MA", value: "45 Accent Street, Boston, MA", type: "text" },
      { id: "color_mkvygng3", title: "Lead Status", text: "In Progress", value: "In Progress", type: "color" },
      { id: "color_mkvyxdy1", title: "Tier", text: "Tier 1", value: "Tier 1", type: "color" },
      { id: "numeric_mkvyhq72", title: "Engagement Score", text: "95", value: "95", type: "numeric" },
      { id: "color_mkvynspn", title: "Next Action", text: "Contract Review", value: "Contract Review", type: "color" },
      { id: "date_mkvy906z", title: "Next Action Due Date", text: "2025-02-05", value: "2025-02-05", type: "date" },
      { id: "long_text_mkvyn6c3", title: "Pain Points", text: "Looking for scalable solutions to handle rapid growth", value: "Looking for scalable solutions to handle rapid growth", type: "long_text" },
      { id: "date_mkvyefkw", title: "Last Engagement Date", text: "2025-01-20", value: "2025-01-20", type: "date" },
      { id: "multiple_person_mkvyabfq", title: "Assigned Person", text: "Jane Smith", value: "Jane Smith", type: "people" },
      { id: "file_mkvyf09e", title: "Profile Picture", text: "", value: "", type: "file" },
      { id: "numeric_mkvy4jjs", title: "Deal Value", text: "75000", value: "75000", type: "numeric" },
      { id: "numeric_mkvygggz", title: "Lead Score", text: "98", value: "98", type: "numeric" },
      { id: "long_text_mkvyzm9p", title: "Activity Log", text: "Demo completed successfully, proposal sent, waiting for feedback", value: "Demo completed successfully, proposal sent, waiting for feedback", type: "long_text" },
      { id: "tag_mkvy4zdj", title: "Tags", text: "Hot Lead,Product Manager,High Priority", value: "Hot Lead,Product Manager,High Priority", type: "tags" },
      { id: "text_mkvygx4a", title: "Lead Source", text: "Referral", value: "Referral", type: "text" },
      { id: "long_text_mkvykm", title: "Notes", text: "Excellent fit for our product. Decision maker with budget authority.", value: "Excellent fit for our product. Decision maker with budget authority.", type: "long_text" }
    ]
  },
  {
    id: "3",
    name: "Olivia Williams",
    group: { title: "Prospects" },
    column_values: [
      { id: "text_mkvybmv2", title: "First Name", text: "Olivia", value: "Olivia", type: "text" },
      { id: "text_mkvyqk12", title: "Last Name", text: "Williams", value: "Williams", type: "text" },
      { id: "text_mkvy3wdc", title: "Job Title", text: "Product Manager", value: "Product Manager", type: "text" },
      { id: "email_mkvykynq", title: "Work Email", text: "owilliamspharmalab@gmail.com", value: "owilliamspharmalab@gmail.com", type: "email" },
      { id: "phone_mkvyssq7", title: "Phone Number", text: "415-32-98-420", value: "415-32-98-420", type: "phone" },
      { id: "link_mkvyere3", title: "LinkedIn Profile", text: "https://linkedin.com/in/oliviawilliams", value: "https://linkedin.com/in/oliviawilliams", type: "link" },
      { id: "text_mkvydcf7", title: "Location", text: "Chicago, IL", value: "Chicago, IL", type: "text" },
      { id: "color_mkvygng3", title: "Lead Status", text: "In Progress", value: "In Progress", type: "color" },
      { id: "color_mkvyxdy1", title: "Tier", text: "Tier 2", value: "Tier 2", type: "color" },
      { id: "numeric_mkvyhq72", title: "Engagement Score", text: "72", value: "72", type: "numeric" },
      { id: "color_mkvynspn", title: "Next Action", text: "Follow up call", value: "Follow up call", type: "color" },
      { id: "date_mkvy906z", title: "Next Action Due Date", text: "2025-01-19", value: "2025-01-19", type: "date" },
      { id: "long_text_mkvyn6c3", title: "Pain Points", text: "Need better team collaboration tools", value: "Need better team collaboration tools", type: "long_text" },
      { id: "date_mkvyefkw", title: "Last Engagement Date", text: "2025-01-19", value: "2025-01-19", type: "date" },
      { id: "multiple_person_mkvyabfq", title: "Assigned Person", text: "Mike Johnson", value: "Mike Johnson", type: "people" },
      { id: "file_mkvyf09e", title: "Profile Picture", text: "", value: "", type: "file" },
      { id: "numeric_mkvy4jjs", title: "Deal Value", text: "25000", value: "25000", type: "numeric" },
      { id: "numeric_mkvygggz", title: "Lead Score", text: "78", value: "78", type: "numeric" },
      { id: "long_text_mkvyzm9p", title: "Activity Log", text: "Initial contact made, interested in learning more", value: "Initial contact made, interested in learning more", type: "long_text" },
      { id: "tag_mkvy4zdj", title: "Tags", text: "Warm Lead,Healthcare,Medium Priority", value: "Warm Lead,Healthcare,Medium Priority", type: "tags" },
      { id: "text_mkvygx4a", title: "Lead Source", text: "Website", value: "Website", type: "text" },
      { id: "long_text_mkvykm", title: "Notes", text: "Good potential, needs nurturing", value: "Good potential, needs nurturing", type: "long_text" }
    ]
  },
  {
    id: "4",
    name: "John Holiday",
    group: { title: "New Leads" },
    column_values: [
      { id: "text_mkvybmv2", title: "First Name", text: "John", value: "John", type: "text" },
      { id: "text_mkvyqk12", title: "Last Name", text: "Holiday", value: "Holiday", type: "text" },
      { id: "text_mkvy3wdc", title: "Job Title", text: "Marketer", value: "Marketer", type: "text" },
      { id: "email_mkvykynq", title: "Work Email", text: "iamjohn@gmail.com", value: "iamjohn@gmail.com", type: "email" },
      { id: "phone_mkvyssq7", title: "Phone Number", text: "101-90-52-729", value: "101-90-52-729", type: "phone" },
      { id: "link_mkvyere3", title: "LinkedIn Profile", text: "https://linkedin.com/in/johnholiday", value: "https://linkedin.com/in/johnholiday", type: "link" },
      { id: "text_mkvydcf7", title: "Location", text: "Austin, TX", value: "Austin, TX", type: "text" },
      { id: "color_mkvygng3", title: "Lead Status", text: "In Progress", value: "In Progress", type: "color" },
      { id: "color_mkvyxdy1", title: "Tier", text: "Tier 3", value: "Tier 3", type: "color" },
      { id: "numeric_mkvyhq72", title: "Engagement Score", text: "58", value: "58", type: "numeric" },
      { id: "color_mkvynspn", title: "Next Action", text: "Initial call", value: "Initial call", type: "color" },
      { id: "date_mkvy906z", title: "Next Action Due Date", text: "2025-01-10", value: "2025-01-10", type: "date" },
      { id: "long_text_mkvyn6c3", title: "Pain Points", text: "Looking for marketing automation tools", value: "Looking for marketing automation tools", type: "long_text" },
      { id: "date_mkvyefkw", title: "Last Engagement Date", text: "2025-01-10", value: "2025-01-10", type: "date" },
      { id: "multiple_person_mkvyabfq", title: "Assigned Person", text: "Sarah Wilson", value: "Sarah Wilson", type: "people" },
      { id: "file_mkvyf09e", title: "Profile Picture", text: "", value: "", type: "file" },
      { id: "numeric_mkvy4jjs", title: "Deal Value", text: "15000", value: "15000", type: "numeric" },
      { id: "numeric_mkvygggz", title: "Lead Score", text: "65", value: "65", type: "numeric" },
      { id: "long_text_mkvyzm9p", title: "Activity Log", text: "Lead captured from website form", value: "Lead captured from website form", type: "long_text" },
      { id: "tag_mkvy4zdj", title: "Tags", text: "New Lead,Marketing,Low Priority", value: "New Lead,Marketing,Low Priority", type: "tags" },
      { id: "text_mkvygx4a", title: "Lead Source", text: "Website Form", value: "Website Form", type: "text" },
      { id: "long_text_mkvykm", title: "Notes", text: "New lead, needs qualification", value: "New lead, needs qualification", type: "long_text" }
    ]
  },
  {
    id: "5",
    name: "Steve M",
    group: { title: "Qualified Leads" },
    column_values: [
      { id: "text_mkvybmv2", title: "First Name", text: "Steve", value: "Steve", type: "text" },
      { id: "text_mkvyqk12", title: "Last Name", text: "M", value: "M", type: "text" },
      { id: "text_mkvy3wdc", title: "Job Title", text: "CTO", value: "CTO", type: "text" },
      { id: "email_mkvykynq", title: "Work Email", text: "steve.m@techcorp.com", value: "steve.m@techcorp.com", type: "email" },
      { id: "phone_mkvyssq7", title: "Phone Number", text: "555-123-4567", value: "555-123-4567", type: "phone" },
      { id: "link_mkvyere3", title: "LinkedIn Profile", text: "https://linkedin.com/in/stevem", value: "https://linkedin.com/in/stevem", type: "link" },
      { id: "text_mkvydcf7", title: "Location", text: "Seattle, WA", value: "Seattle, WA", type: "text" },
      { id: "color_mkvygng3", title: "Lead Status", text: "In Progress", value: "In Progress", type: "color" },
      { id: "color_mkvyxdy1", title: "Tier", text: "Tier 1", value: "Tier 1", type: "color" },
      { id: "numeric_mkvyhq72", title: "Engagement Score", text: "83", value: "83", type: "numeric" },
      { id: "color_mkvynspn", title: "Next Action", text: "Technical discussion", value: "Technical discussion", type: "color" },
      { id: "date_mkvy906z", title: "Next Action Due Date", text: "2025-01-22", value: "2025-01-22", type: "date" },
      { id: "long_text_mkvyn6c3", title: "Pain Points", text: "Need scalable infrastructure solutions", value: "Need scalable infrastructure solutions", type: "long_text" },
      { id: "date_mkvyefkw", title: "Last Engagement Date", text: "2025-01-18", value: "2025-01-18", type: "date" },
      { id: "multiple_person_mkvyabfq", title: "Assigned Person", text: "Alex Chen", value: "Alex Chen", type: "people" },
      { id: "file_mkvyf09e", title: "Profile Picture", text: "", value: "", type: "file" },
      { id: "numeric_mkvy4jjs", title: "Deal Value", text: "100000", value: "100000", type: "numeric" },
      { id: "numeric_mkvygggz", title: "Lead Score", text: "89", value: "89", type: "numeric" },
      { id: "long_text_mkvyzm9p", title: "Activity Log", text: "Technical requirements discussion completed", value: "Technical requirements discussion completed", type: "long_text" },
      { id: "tag_mkvy4zdj", title: "Tags", text: "Hot Lead,Enterprise,High Value", value: "Hot Lead,Enterprise,High Value", type: "tags" },
      { id: "text_mkvygx4a", title: "Lead Source", text: "Conference", value: "Conference", type: "text" },
      { id: "long_text_mkvykm", title: "Notes", text: "Strong technical fit, large enterprise opportunity", value: "Strong technical fit, large enterprise opportunity", type: "long_text" }
    ]
  }
];

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    // Check if we're running in Monday.com context
    if (window.location.hostname === 'localhost') {
      // Use mock data for local development
      setLoading(true);
      setTimeout(() => {
        setItems(mockData);
        setSelectedLead(mockData[0]); // Select Michael Stone by default
        setLoading(false);
      }, 1500); // Simulate loading time
    } else {
      // Original Monday.com integration
      monday.listen("context", async (res) => {
        try {
          setLoading(true);
          const { itemIds = [], boardId } = res.data;
          
          if (itemIds.length > 0) {
            const query = `query {
              items(ids: [${itemIds.join(",")}]) {
                id
                name
                group {
                  title
                }
                column_values {
                  id
                  title
                  text
                  value
                  type
                }
              }
            }`;

            const response = await monday.api(query);
            setItems(response.data.items);
            if (response.data.items.length > 0) {
              setSelectedLead(response.data.items[0]);
            }
          } else {
            setItems([]);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      });
    }
  }, []);

  const getColumnValue = (item, columnId) => {
    const column = item.column_values.find(col => col.id === columnId);
    return column ? column.text : "";
  };

  const getStatusColor = (statusText) => {
    switch (statusText.toLowerCase()) {
      case "in progress":
        return "#007bff";
      case "done":
        return "#00c875";
      case "stuck":
        return "#df2f4a";
      default:
        return "#c4c4c4";
    }
  };

  const getTierColor = (tierText) => {
    if (tierText.includes("Tier 1")) return "#00c875";
    if (tierText.includes("Tier 2")) return "#fdab3d";
    if (tierText.includes("Tier 3")) return "#df2f4a";
    return "#c4c4c4";
  };

  const filteredItems = items;

  const renderLeadCard = (item) => {
    const firstName = getColumnValue(item, "text_mkvybmv2");
    const lastName = getColumnValue(item, "text_mkvyqk12");
    const company = getColumnValue(item, "name");
    const jobTitle = getColumnValue(item, "text_mkvy3wdc");
    const status = getColumnValue(item, "color_mkvygng3");
    const dealValue = getColumnValue(item, "numeric_mkvy4jjs");
    const tier = getColumnValue(item, "color_mkvyxdy1");

    return (
      <div 
        key={item.id} 
        className={`lead-card ${selectedLead?.id === item.id ? 'selected' : ''}`}
        onClick={() => setSelectedLead(item)}
      >
        <div className="lead-avatar">
          <div className="avatar-circle">
            {firstName.charAt(0)}{lastName.charAt(0)}
          </div>
        </div>
        <div className="lead-info">
          <div className="lead-name-row">
            <div className="lead-name">{firstName} {lastName}</div>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(status) }}
            >
              {status}
            </span>
          </div>
          <div className="lead-company">{company}</div>
          <div className="lead-title">{jobTitle}</div>
          <div className="lead-metrics-row">
            <span className="deal-value">${dealValue}</span>
            <span className="tier-badge" style={{ backgroundColor: getTierColor(tier) }}>
              {tier}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderLeadDetail = (lead) => {
    if (!lead) return null;

    const firstName = getColumnValue(lead, "text_mkvybmv2");
    const lastName = getColumnValue(lead, "text_mkvyqk12");
    const company = getColumnValue(lead, "name");
    const jobTitle = getColumnValue(lead, "text_mkvy3wdc");
    const email = getColumnValue(lead, "email_mkvykynq");
    const phone = getColumnValue(lead, "phone_mkvyssq7");
    const location = getColumnValue(lead, "text_mkvydcf7");
    const linkedin = getColumnValue(lead, "link_mkvyere3");
    const status = getColumnValue(lead, "color_mkvygng3");
    const tier = getColumnValue(lead, "color_mkvyxdy1");
    const engagementScore = getColumnValue(lead, "numeric_mkvyhq72");
    const dealValue = getColumnValue(lead, "numeric_mkvy4jjs");
    const leadScore = getColumnValue(lead, "numeric_mkvygggz");
    const nextAction = getColumnValue(lead, "color_mkvynspn");
    const nextActionDate = getColumnValue(lead, "date_mkvy906z");
    const painPoints = getColumnValue(lead, "long_text_mkvyn6c3");
    const activityLog = getColumnValue(lead, "long_text_mkvyzm9p");
    const notes = getColumnValue(lead, "long_text_mkvykm");
    const tags = getColumnValue(lead, "tag_mkvy4zdj");

        return (
          <FadeContent duration={800} delay={100}>
            <div className="lead-detail">
              <div className="detail-header">
                <div className="detail-avatar">
                  <div className="avatar-circle large">
                    {firstName.charAt(0)}{lastName.charAt(0)}
                  </div>
                </div>
                <div className="detail-info">
                  <h2>{firstName} {lastName}</h2>
                  <p className="job-title">{jobTitle}</p>
                </div>
              </div>

              <div className="detail-content">
                <SpotlightCard className="contact-details-card" spotlightColor="rgba(0, 123, 255, 0.1)">
                  <h3>📞 Contact Details</h3>
                  <div className="contact-grid">
                    <div className="contact-item">
                      <label>Workplace:</label>
                      <span>{company}</span>
                    </div>
                    <div className="contact-item">
                      <label>Contact ID:</label>
                      <span>3871230387</span>
                    </div>
                    <div className="contact-item">
                      <label>Email:</label>
                      <span>{email}</span>
                    </div>
                    <div className="contact-item">
                      <label>Phone:</label>
                      <span>{phone}</span>
                    </div>
                    <div className="contact-item">
                      <label>Request Date:</label>
                      <span>{nextActionDate}</span>
                    </div>
                    <div className="contact-item">
                      <label>Address:</label>
                      <span>{location}</span>
                    </div>
                  </div>
                  <div className="contact-actions">
                    <button className="action-btn">📞</button>
                    <button className="action-btn">✈️</button>
                    <button className="action-btn">✉️</button>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="pain-points-card" spotlightColor="rgba(255, 193, 7, 0.1)">
                  <h3>⚠️ Pain Points & Needs</h3>
                  <div className="pain-points-content">
                    <p>{painPoints}</p>
                  </div>
                  <div className="activity-log">
                    <h4>📝 Activity Log</h4>
                    <p>{activityLog}</p>
                  </div>
                  <div className="notes-section">
                    <h4>📋 Notes</h4>
                    <p>{notes}</p>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="tracking-card" spotlightColor="rgba(40, 167, 69, 0.1)">
                  <h3>📍 Tracking page</h3>
                  <div className="tracking-info">
                    <div className="tracking-id">Tracking ID: USL56372901US</div>
                    <div className="tracking-status">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(status) }}>
                        {status}
                      </span>
                    </div>
                    <div className="tracking-details">
                      <div>Arrival Waypoint: Boston, Massachusetts</div>
                      <div>Current Location: Chicago, Illinois</div>
                      <div>Departure Waypoint: San Francisco, California</div>
                      <div>Route: San Francisco - Boston</div>
                      <div>Estimated Delivery Date: 5th February, 2025</div>
                      <div>Courier: Edward Hill</div>
                    </div>
                  </div>
                </SpotlightCard>

              </div>
            </div>
          </FadeContent>
        );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading sales pipeline data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Error Loading Data</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="crm-dashboard">
      {/* Main Content */}
      <div className="main-content">
        {/* Content Area */}
        <div className="content-area">
          {/* Lead List */}
          <div className="lead-list">
            {filteredItems.map(renderLeadCard)}
          </div>

          {/* Lead Detail View */}
          <div className="lead-detail-container">
            {renderLeadDetail(selectedLead)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
