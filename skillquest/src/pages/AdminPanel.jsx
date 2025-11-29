// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackFilter, setFeedbackFilter] = useState('all');

  // Form state for creating/editing events
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    points: 100,
    category: 'technical',
    capacity: 50,
    image: '🎯'
  });

  // Mock data initialization
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Tech Innovation Hackathon",
        description: "24-hour coding competition to build innovative solutions",
        date: "2024-02-15",
        time: "10:00 AM",
        location: "Tech Building Auditorium",
        points: 500,
        category: "technical",
        capacity: 50,
        registeredCount: 32,
        participants: 28,
        image: "🎯",
        status: 'active'
      },
      {
        id: 2,
        title: "Leadership Workshop",
        description: "Develop essential leadership skills and team management",
        date: "2024-02-20",
        time: "2:00 PM",
        location: "Business School Room 301",
        points: 300,
        category: "workshop",
        capacity: 30,
        registeredCount: 28,
        participants: 25,
        image: "🌟",
        status: 'active'
      },
      {
        id: 3,
        title: "AI & Machine Learning Seminar",
        description: "Learn about the latest trends in AI and ML technologies",
        date: "2024-02-25",
        time: "3:30 PM",
        location: "Computer Science Hall",
        points: 200,
        category: "seminar",
        capacity: 100,
        registeredCount: 67,
        participants: 45,
        image: "🤖",
        status: 'active'
      }
    ];

    const mockStudents = [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@student.edu",
        points: 1250,
        eventsRegistered: 5,
        eventsParticipated: 3,
        level: "Explorer"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@student.edu",
        points: 800,
        eventsRegistered: 3,
        eventsParticipated: 2,
        level: "Beginner"
      },
      {
        id: 3,
        name: "Mike Chen",
        email: "mike.chen@student.edu",
        points: 2100,
        eventsRegistered: 8,
        eventsParticipated: 7,
        level: "Champion"
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@student.edu",
        points: 1500,
        eventsRegistered: 6,
        eventsParticipated: 4,
        level: "Explorer"
      }
    ];

    const mockFeedbacks = [
      {
        id: 1,
        studentName: "John Smith",
        studentEmail: "john.smith@student.edu",
        studentId: 1,
        category: "clubs",
        title: "More Programming Club Activities",
        description: "The programming club should host more hands-on workshops and coding sessions. Current meetings are too theoretical and could benefit from practical projects.",
        urgency: "medium",
        status: "pending",
        anonymous: false,
        timestamp: "2024-01-15T10:30:00Z",
        adminNotes: ""
      },
      {
        id: 2,
        studentName: "Anonymous",
        studentEmail: "",
        studentId: null,
        category: "facilities",
        title: "Library Hours Extension",
        description: "The library should extend its opening hours during exam periods. Many students study late and need access to resources.",
        urgency: "high",
        status: "in-progress",
        anonymous: true,
        timestamp: "2024-01-16T14:20:00Z",
        adminNotes: "Discussing with library management team"
      },
      {
        id: 3,
        studentName: "Sarah Johnson",
        studentEmail: "sarah.j@student.edu",
        studentId: 2,
        category: "technology",
        title: "Campus Wi-Fi Issues",
        description: "The Wi-Fi in the student dormitories is very unstable during peak hours. This affects online classes and study sessions.",
        urgency: "critical",
        status: "pending",
        anonymous: false,
        timestamp: "2024-01-17T09:15:00Z",
        adminNotes: ""
      },
      {
        id: 4,
        studentName: "Mike Chen",
        studentEmail: "mike.chen@student.edu",
        studentId: 3,
        category: "sports",
        title: "Basketball Court Maintenance",
        description: "The outdoor basketball courts need resurfacing and new nets. The current condition makes it difficult to play properly.",
        urgency: "medium",
        status: "completed",
        anonymous: false,
        timestamp: "2024-01-10T16:45:00Z",
        adminNotes: "Scheduled for maintenance next month"
      },
      {
        id: 5,
        studentName: "Anonymous",
        studentEmail: "",
        studentId: null,
        category: "dining",
        title: "More Vegetarian Options",
        description: "The campus cafeteria should offer more diverse vegetarian and vegan meal options. Current choices are very limited.",
        urgency: "medium",
        status: "pending",
        anonymous: true,
        timestamp: "2024-01-18T12:00:00Z",
        adminNotes: ""
      }
    ];

    setEvents(mockEvents);
    setStudents(mockStudents);
    setFeedbacks(mockFeedbacks);
  }, []);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length + 1,
      ...eventForm,
      registeredCount: 0,
      participants: 0,
      status: 'active'
    };
    
    setEvents([...events, newEvent]);
    setShowCreateEvent(false);
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      points: 100,
      category: 'technical',
      capacity: 50,
      image: '🎯'
    });
  };

  const handleEditEvent = (event) => {
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      points: event.points,
      category: event.category,
      capacity: event.capacity,
      image: event.image
    });
    setSelectedEvent(event);
    setShowCreateEvent(true);
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    setEvents(events.map(event => 
      event.id === selectedEvent.id 
        ? { ...event, ...eventForm }
        : event
    ));
    setShowCreateEvent(false);
    setSelectedEvent(null);
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      points: 100,
      category: 'technical',
      capacity: 50,
      image: '🎯'
    });
  };

  const deleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const toggleEventStatus = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, status: event.status === 'active' ? 'inactive' : 'active' }
        : event
    ));
  };

  const addPointsToStudent = (studentId, points) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, points: student.points + points }
        : student
    ));
  };

  // Feedback Management Functions
  const updateFeedbackStatus = (feedbackId, status) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === feedbackId 
        ? { ...feedback, status }
        : feedback
    ));
  };

  const addAdminNotes = (feedbackId, notes) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === feedbackId 
        ? { ...feedback, adminNotes: notes }
        : feedback
    ));
  };

  const deleteFeedback = (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== feedbackId));
    }
  };

  const getFeedbackAnalytics = () => {
    const totalFeedbacks = feedbacks.length;
    const pendingFeedbacks = feedbacks.filter(f => f.status === 'pending').length;
    const completedFeedbacks = feedbacks.filter(f => f.status === 'completed').length;
    const anonymousFeedbacks = feedbacks.filter(f => f.anonymous).length;
    
    // Category distribution
    const categoryDistribution = {};
    feedbacks.forEach(feedback => {
      categoryDistribution[feedback.category] = (categoryDistribution[feedback.category] || 0) + 1;
    });

    // Urgency distribution
    const urgencyDistribution = {};
    feedbacks.forEach(feedback => {
      urgencyDistribution[feedback.urgency] = (urgencyDistribution[feedback.urgency] || 0) + 1;
    });

    return {
      totalFeedbacks,
      pendingFeedbacks,
      completedFeedbacks,
      anonymousFeedbacks,
      categoryDistribution,
      urgencyDistribution
    };
  };

  const getEventAnalytics = () => {
    const totalEvents = events.length;
    const totalRegistrations = events.reduce((sum, event) => sum + event.registeredCount, 0);
    const totalParticipants = events.reduce((sum, event) => sum + event.participants, 0);
    const totalPointsDistributed = events.reduce((sum, event) => sum + (event.participants * event.points), 0);
    
    return { totalEvents, totalRegistrations, totalParticipants, totalPointsDistributed };
  };

  const analytics = getEventAnalytics();
  const feedbackAnalytics = getFeedbackAnalytics();

  const eventCategories = [
    { id: 'technical', name: 'Technical', icon: '💻' },
    { id: 'workshop', name: 'Workshop', icon: '🎓' },
    { id: 'seminar', name: 'Seminar', icon: '🎤' },
    { id: 'volunteer', name: 'Volunteer', icon: '🤝' },
    { id: 'competition', name: 'Competition', icon: '🏆' }
  ];

  const feedbackCategories = [
    { value: 'academic', label: 'Academic Programs', icon: '🎓' },
    { value: 'clubs', label: 'Clubs & Organizations', icon: '👥' },
    { value: 'facilities', label: 'Campus Facilities', icon: '🏛️' },
    { value: 'events', label: 'Events & Activities', icon: '📅' },
    { value: 'technology', label: 'Technology & Resources', icon: '💻' },
    { value: 'sports', label: 'Sports & Recreation', icon: '⚽' },
    { value: 'dining', label: 'Dining Services', icon: '🍽️' },
    { value: 'housing', label: 'Housing & Residence', icon: '🏠' },
    { value: 'other', label: 'Other Suggestions', icon: '💡' }
  ];

  const urgencyLabels = {
    low: { label: 'Low', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
    medium: { label: 'Medium', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' },
    high: { label: 'High', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' },
    critical: { label: 'Critical', color: '#dc2626', bgColor: 'rgba(220, 38, 38, 0.1)' }
  };

  const statusLabels = {
    pending: { label: 'Pending', color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' },
    'in-progress': { label: 'In Progress', color: '#2563eb', bgColor: 'rgba(37, 99, 235, 0.1)' },
    completed: { label: 'Completed', color: '#059669', bgColor: 'rgba(5, 150, 105, 0.1)' },
    rejected: { label: 'Rejected', color: '#dc2626', bgColor: 'rgba(220, 38, 38, 0.1)' }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (feedbackFilter === 'all') return true;
    return feedback.status === feedbackFilter;
  });

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header glass-panel-enhanced">
        <div className="header-content">
          <h1 className="gradient-text">Admin Panel</h1>
          <div className="admin-actions">
            <button 
              className="btn-primary"
              onClick={() => {
                setSelectedEvent(null);
                setShowCreateEvent(true);
              }}
            >
              + Create Event
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        {/* Analytics Overview */}
        <div className="analytics-grid">
          <div className="analytics-card glass-panel-enhanced">
            <div className="analytics-icon">📊</div>
            <div className="analytics-info">
              <h3>Total Events</h3>
              <p>{analytics.totalEvents}</p>
            </div>
          </div>
          <div className="analytics-card glass-panel-enhanced">
            <div className="analytics-icon">📝</div>
            <div className="analytics-info">
              <h3>Total Registrations</h3>
              <p>{analytics.totalRegistrations}</p>
            </div>
          </div>
          <div className="analytics-card glass-panel-enhanced">
            <div className="analytics-icon">💬</div>
            <div className="analytics-info">
              <h3>Total Feedbacks</h3>
              <p>{feedbackAnalytics.totalFeedbacks}</p>
            </div>
          </div>
          <div className="analytics-card glass-panel-enhanced">
            <div className="analytics-icon">⏳</div>
            <div className="analytics-info">
              <h3>Pending Feedbacks</h3>
              <p>{feedbackAnalytics.pendingFeedbacks}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            📅 Events Management
          </button>
          <button 
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            👥 Students & Points
          </button>
          <button 
            className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            💬 Student Feedback
          </button>
          <button 
            className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>

        {/* Events Management */}
        {activeTab === 'events' && (
          <div className="tab-content">
            <div className="events-management">
              <h2>Events Management</h2>
              <div className="events-grid">
                {events.map(event => (
                  <div key={event.id} className="event-admin-card glass-panel-enhanced">
                    <div className="event-admin-header">
                      <div className="event-admin-image">{event.image}</div>
                      <div className="event-admin-status">
                        <span className={`status-badge ${event.status}`}>
                          {event.status}
                        </span>
                        <div className="event-points">+{event.points} pts</div>
                      </div>
                    </div>
                    
                    <div className="event-admin-content">
                      <h3>{event.title}</h3>
                      <p className="event-description">{event.description}</p>
                      
                      <div className="event-stats">
                        <div className="stat">
                          <span className="stat-label">Registrations</span>
                          <span className="stat-value">{event.registeredCount}/{event.capacity}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Participants</span>
                          <span className="stat-value">{event.participants}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Completion</span>
                          <span className="stat-value">
                            {Math.round((event.participants / event.registeredCount) * 100) || 0}%
                          </span>
                        </div>
                      </div>

                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${(event.registeredCount / event.capacity) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="event-admin-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </button>
                      <button 
                        className={`btn-status ${event.status === 'active' ? 'inactive' : 'active'}`}
                        onClick={() => toggleEventStatus(event.id)}
                      >
                        {event.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => deleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Students & Points Management */}
        {activeTab === 'students' && (
          <div className="tab-content">
            <div className="students-management">
              <h2>Students & Points Management</h2>
              <div className="students-table-container glass-panel-enhanced">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Points</th>
                      <th>Level</th>
                      <th>Events Registered</th>
                      <th>Events Participated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id}>
                        <td>
                          <div className="student-info">
                            <div className="student-avatar">👤</div>
                            <span>{student.name}</span>
                          </div>
                        </td>
                        <td>{student.email}</td>
                        <td>
                          <span className="points-badge">{student.points}</span>
                        </td>
                        <td>
                          <span className="level-badge">{student.level}</span>
                        </td>
                        <td>{student.eventsRegistered}</td>
                        <td>{student.eventsParticipated}</td>
                        <td>
                          <div className="student-actions">
                            <button 
                              className="btn-add-points"
                              onClick={() => {
                                const points = parseInt(prompt('Enter points to add:'));
                                if (points && points > 0) {
                                  addPointsToStudent(student.id, points);
                                }
                              }}
                            >
                              + Points
                            </button>
                            <button className="btn-view-details">
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Management */}
        {activeTab === 'feedback' && (
          <div className="tab-content">
            <div className="feedback-management">
              <div className="feedback-header">
                <h2>Student Feedback Management</h2>
                <div className="feedback-filters">
                  <select 
                    value={feedbackFilter}
                    onChange={(e) => setFeedbackFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Feedback</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="feedback-stats-grid">
                <div className="stat-card glass-panel-enhanced">
                  <div className="stat-icon pending">💬</div>
                  <div className="stat-info">
                    <h3>Pending</h3>
                    <p>{feedbackAnalytics.pendingFeedbacks}</p>
                  </div>
                </div>
                <div className="stat-card glass-panel-enhanced">
                  <div className="stat-icon in-progress">🔄</div>
                  <div className="stat-info">
                    <h3>In Progress</h3>
                    <p>{feedbacks.filter(f => f.status === 'in-progress').length}</p>
                  </div>
                </div>
                <div className="stat-card glass-panel-enhanced">
                  <div className="stat-icon completed">✅</div>
                  <div className="stat-info">
                    <h3>Completed</h3>
                    <p>{feedbackAnalytics.completedFeedbacks}</p>
                  </div>
                </div>
                <div className="stat-card glass-panel-enhanced">
                  <div className="stat-icon anonymous">🎭</div>
                  <div className="stat-info">
                    <h3>Anonymous</h3>
                    <p>{feedbackAnalytics.anonymousFeedbacks}</p>
                  </div>
                </div>
              </div>

              <div className="feedback-list">
                {filteredFeedbacks.length === 0 ? (
                  <div className="empty-state glass-panel-enhanced">
                    <div className="empty-icon">💬</div>
                    <h3>No feedback found</h3>
                    <p>No feedback matches the current filter criteria</p>
                  </div>
                ) : (
                  filteredFeedbacks.map(feedback => (
                    <div key={feedback.id} className="feedback-card glass-panel-enhanced">
                      <div className="feedback-header">
                        <div className="feedback-meta">
                          <h3 className="feedback-title">{feedback.title}</h3>
                          <div className="feedback-categories">
                            <span 
                              className="category-badge"
                              style={{ 
                                backgroundColor: feedbackCategories.find(c => c.value === feedback.category)?.color || '#6b7280'
                              }}
                            >
                              {feedbackCategories.find(c => c.value === feedback.category)?.icon}
                              {feedbackCategories.find(c => c.value === feedback.category)?.label}
                            </span>
                            <span 
                              className="urgency-badge"
                              style={{
                                backgroundColor: urgencyLabels[feedback.urgency].bgColor,
                                color: urgencyLabels[feedback.urgency].color
                              }}
                            >
                              {urgencyLabels[feedback.urgency].label}
                            </span>
                            <span 
                              className="status-badge"
                              style={{
                                backgroundColor: statusLabels[feedback.status].bgColor,
                                color: statusLabels[feedback.status].color
                              }}
                            >
                              {statusLabels[feedback.status].label}
                            </span>
                          </div>
                        </div>
                        <div className="feedback-actions">
                          <button 
                            className="btn-view"
                            onClick={() => setSelectedFeedback(feedback)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      <div className="feedback-content">
                        <p className="feedback-description">{feedback.description}</p>
                        
                        <div className="feedback-details">
                          <div className="detail-item">
                            <span className="detail-label">Submitted by:</span>
                            <span className="detail-value">
                              {feedback.anonymous ? 'Anonymous' : `${feedback.studentName} (${feedback.studentEmail})`}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Submitted on:</span>
                            <span className="detail-value">
                              {new Date(feedback.timestamp).toLocaleDateString()} at {new Date(feedback.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          {feedback.adminNotes && (
                            <div className="detail-item">
                              <span className="detail-label">Admin Notes:</span>
                              <span className="detail-value">{feedback.adminNotes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="feedback-quick-actions">
                        <select 
                          value={feedback.status}
                          onChange={(e) => updateFeedbackStatus(feedback.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Mark as Pending</option>
                          <option value="in-progress">Mark as In Progress</option>
                          <option value="completed">Mark as Completed</option>
                          <option value="rejected">Mark as Rejected</option>
                        </select>
                        
                        <button 
                          className="btn-notes"
                          onClick={() => {
                            const notes = prompt('Add admin notes:', feedback.adminNotes || '');
                            if (notes !== null) {
                              addAdminNotes(feedback.id, notes);
                            }
                          }}
                        >
                          Add Notes
                        </button>
                        
                        <button 
                          className="btn-delete"
                          onClick={() => deleteFeedback(feedback.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="tab-content">
            <div className="analytics-dashboard">
              <h2>Event Analytics</h2>
              <div className="charts-grid">
                <div className="chart-card glass-panel-enhanced">
                  <h3>Event Participation Rate</h3>
                  <div className="participation-chart">
                    {events.map(event => (
                      <div key={event.id} className="chart-bar">
                        <div className="bar-label">{event.title}</div>
                        <div className="bar-container">
                          <div 
                            className="bar-fill"
                            style={{
                              width: `${(event.participants / event.registeredCount) * 100 || 0}%`,
                              backgroundColor: '#64ffda'
                            }}
                          ></div>
                        </div>
                        <div className="bar-value">
                          {Math.round((event.participants / event.registeredCount) * 100) || 0}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chart-card glass-panel-enhanced">
                  <h3>Points Distribution by Category</h3>
                  <div className="category-stats">
                    {eventCategories.map(category => {
                      const categoryEvents = events.filter(event => event.category === category.id);
                      const totalPoints = categoryEvents.reduce((sum, event) => sum + (event.points * event.participants), 0);
                      return (
                        <div key={category.id} className="category-stat">
                          <div className="category-info">
                            <span className="category-icon">{category.icon}</span>
                            <span className="category-name">{category.name}</span>
                          </div>
                          <span className="category-points">{totalPoints} pts</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback Analytics */}
                <div className="chart-card glass-panel-enhanced">
                  <h3>Feedback by Category</h3>
                  <div className="category-stats">
                    {feedbackCategories.map(category => {
                      const categoryFeedbacks = feedbacks.filter(f => f.category === category.value);
                      return (
                        <div key={category.value} className="category-stat">
                          <div className="category-info">
                            <span className="category-icon">{category.icon}</span>
                            <span className="category-name">{category.label}</span>
                          </div>
                          <span className="category-count">{categoryFeedbacks.length}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="chart-card glass-panel-enhanced">
                  <h3>Feedback Status Distribution</h3>
                  <div className="status-stats">
                    {Object.entries(statusLabels).map(([status, { label, color }]) => {
                      const statusCount = feedbacks.filter(f => f.status === status).length;
                      const percentage = (statusCount / feedbacks.length) * 100;
                      return (
                        <div key={status} className="status-stat">
                          <div className="status-info">
                            <span className="status-label">{label}</span>
                            <span className="status-count">{statusCount}</span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: color
                              }}
                            ></div>
                          </div>
                          <span className="status-percentage">{Math.round(percentage)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Event Modal */}
      {showCreateEvent && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel-enhanced">
            <div className="modal-header">
              <h2>{selectedEvent ? 'Edit Event' : 'Create New Event'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowCreateEvent(false);
                  setSelectedEvent(null);
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Event Title</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Points</label>
                  <input
                    type="number"
                    value={eventForm.points}
                    onChange={(e) => setEventForm({...eventForm, points: parseInt(e.target.value)})}
                    min="1"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({...eventForm, category: e.target.value})}
                  >
                    {eventCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    value={eventForm.capacity}
                    onChange={(e) => setEventForm({...eventForm, capacity: parseInt(e.target.value)})}
                    min="1"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Emoji Icon</label>
                  <input
                    type="text"
                    value={eventForm.image}
                    onChange={(e) => setEventForm({...eventForm, image: e.target.value})}
                    placeholder="🎯"
                  />
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateEvent(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {selectedEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel-enhanced">
            <div className="modal-header">
              <h2>Feedback Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedFeedback(null)}
              >
                ×
              </button>
            </div>
            
            <div className="feedback-detail">
              <div className="detail-section">
                <h3>{selectedFeedback.title}</h3>
                <div className="detail-meta">
                  <span className="category">
                    {feedbackCategories.find(c => c.value === selectedFeedback.category)?.icon}
                    {feedbackCategories.find(c => c.value === selectedFeedback.category)?.label}
                  </span>
                  <span 
                    className="urgency"
                    style={{ color: urgencyLabels[selectedFeedback.urgency].color }}
                  >
                    {urgencyLabels[selectedFeedback.urgency].label} Priority
                  </span>
                  <span 
                    className="status"
                    style={{ color: statusLabels[selectedFeedback.status].color }}
                  >
                    {statusLabels[selectedFeedback.status].label}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Description</h4>
                <p>{selectedFeedback.description}</p>
              </div>

              <div className="detail-section">
                <h4>Submission Details</h4>
                <div className="submission-details">
                  <div className="detail-row">
                    <span className="detail-label">Submitted by:</span>
                    <span className="detail-value">
                      {selectedFeedback.anonymous ? 'Anonymous' : `${selectedFeedback.studentName} (${selectedFeedback.studentEmail})`}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Submitted on:</span>
                    <span className="detail-value">
                      {new Date(selectedFeedback.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Anonymous:</span>
                    <span className="detail-value">
                      {selectedFeedback.anonymous ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedFeedback.adminNotes && (
                <div className="detail-section">
                  <h4>Admin Notes</h4>
                  <p>{selectedFeedback.adminNotes}</p>
                </div>
              )}

              <div className="detail-actions">
                <select 
                  value={selectedFeedback.status}
                  onChange={(e) => {
                    updateFeedbackStatus(selectedFeedback.id, e.target.value);
                    setSelectedFeedback({...selectedFeedback, status: e.target.value});
                  }}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>

                <button 
                  className="btn-notes"
                  onClick={() => {
                    const notes = prompt('Add or edit admin notes:', selectedFeedback.adminNotes || '');
                    if (notes !== null) {
                      addAdminNotes(selectedFeedback.id, notes);
                      setSelectedFeedback({...selectedFeedback, adminNotes: notes});
                    }
                  }}
                >
                  {selectedFeedback.adminNotes ? 'Edit Notes' : 'Add Notes'}
                </button>

                <button 
                  className="btn-delete"
                  onClick={() => {
                    deleteFeedback(selectedFeedback.id);
                    setSelectedFeedback(null);
                  }}
                >
                  Delete Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;