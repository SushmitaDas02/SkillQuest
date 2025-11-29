// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [studentPoints, setStudentPoints] = useState(1250);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState({
    category: '',
    title: '',
    description: '',
    urgency: 'medium',
    anonymous: false
  });

  // Mock data for events
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Tech Innovation Hackathon",
        description: "24-hour coding competition to build innovative solutions for real-world problems. Join us for an exciting weekend of coding, collaboration, and creativity.",
        date: "2024-02-15",
        time: "10:00 AM",
        location: "Tech Building Auditorium",
        points: 500,
        category: "technical",
        registered: false,
        capacity: 50,
        registeredCount: 32,
        image: "🎯",
        difficulty: "Advanced",
        duration: "24 hours"
      },
      {
        id: 2,
        title: "Leadership Workshop",
        description: "Develop essential leadership skills and team management techniques. Perfect for students looking to enhance their leadership capabilities.",
        date: "2024-02-20",
        time: "2:00 PM",
        location: "Business School Room 301",
        points: 300,
        category: "workshop",
        registered: true,
        capacity: 30,
        registeredCount: 28,
        image: "🌟",
        difficulty: "Beginner",
        duration: "3 hours"
      },
      {
        id: 3,
        title: "AI & Machine Learning Seminar",
        description: "Learn about the latest trends in AI and ML technologies from industry experts. Hands-on demonstrations included.",
        date: "2024-02-25",
        time: "3:30 PM",
        location: "Computer Science Hall",
        points: 200,
        category: "seminar",
        registered: false,
        capacity: 100,
        registeredCount: 67,
        image: "🤖",
        difficulty: "Intermediate",
        duration: "2 hours"
      },
      {
        id: 4,
        title: "Community Service Day",
        description: "Volunteer for local community improvement projects. Make a difference while earning valuable experience and points.",
        date: "2024-03-01",
        time: "9:00 AM",
        location: "City Park",
        points: 400,
        category: "volunteer",
        registered: false,
        capacity: 40,
        registeredCount: 22,
        image: "🌱",
        difficulty: "Beginner",
        duration: "6 hours"
      },
      {
        id: 5,
        title: "Startup Pitch Competition",
        description: "Pitch your business ideas to industry experts and win amazing prizes. Great opportunity for aspiring entrepreneurs.",
        date: "2024-03-05",
        time: "1:00 PM",
        location: "Innovation Hub",
        points: 600,
        category: "competition",
        registered: true,
        capacity: 20,
        registeredCount: 18,
        image: "💡",
        difficulty: "Advanced",
        duration: "4 hours"
      },
      {
        id: 6,
        title: "Web Development Bootcamp",
        description: "Intensive web development workshop covering modern frameworks and best practices. Build your portfolio project.",
        date: "2024-03-10",
        time: "9:00 AM",
        location: "Digital Lab",
        points: 350,
        category: "technical",
        registered: false,
        capacity: 25,
        registeredCount: 15,
        image: "💻",
        difficulty: "Intermediate",
        duration: "8 hours"
      }
    ];
    setEvents(mockEvents);
    setRegisteredEvents(mockEvents.filter(event => event.registered));
  }, []);

  const handleRegister = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, registered: true, registeredCount: event.registeredCount + 1 }
        : event
    ));
    
    const eventToRegister = events.find(event => event.id === eventId);
    if (eventToRegister && !registeredEvents.some(event => event.id === eventId)) {
      setRegisteredEvents([...registeredEvents, { ...eventToRegister, registered: true }]);
    }
  };

  const handleUnregister = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, registered: false, registeredCount: event.registeredCount - 1 }
        : event
    ));
    
    setRegisteredEvents(registeredEvents.filter(event => event.id !== eventId));
  };

  const participateEvent = (eventId) => {
    const event = registeredEvents.find(event => event.id === eventId);
    if (event && !event.participated) {
      setStudentPoints(studentPoints + event.points);
      setRegisteredEvents(registeredEvents.map(event => 
        event.id === eventId ? { ...event, participated: true } : event
      ));
      alert(`Congratulations! You earned ${event.points} points for participating in "${event.title}"`);
    }
  };

  const handleFeedbackChange = (field, value) => {
    setFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitFeedback = () => {
    if (!feedback.category || !feedback.title || !feedback.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', {
      ...feedback,
      timestamp: new Date().toISOString(),
      studentId: 'current-student-id', // This would come from auth context
      status: 'pending'
    });

    // Show success message
    alert('Thank you for your feedback! It has been submitted to the administration.');

    // Reset form and close
    setFeedback({
      category: '',
      title: '',
      description: '',
      urgency: 'medium',
      anonymous: false
    });
    setShowFeedbackForm(false);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || event.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Events', icon: '📅', color: 'var(--indigo-color)' },
    { id: 'technical', name: 'Technical', icon: '💻', color: 'var(--teal-color)' },
    { id: 'workshop', name: 'Workshops', icon: '🎓', color: 'var(--purple-color)' },
    { id: 'seminar', name: 'Seminars', icon: '🎤', color: 'var(--blue-color)' },
    { id: 'volunteer', name: 'Volunteer', icon: '🤝', color: 'var(--green-color)' },
    { id: 'competition', name: 'Competitions', icon: '🏆', color: 'var(--gold-color)' }
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

  const getLevel = (points) => {
    if (points < 500) return { name: 'Beginner', color: '#6b7280' };
    if (points < 1000) return { name: 'Explorer', color: '#059669' };
    if (points < 2000) return { name: 'Achiever', color: '#2563eb' };
    if (points < 3500) return { name: 'Expert', color: '#7c3aed' };
    return { name: 'Master', color: '#dc2626' };
  };

  const userLevel = getLevel(studentPoints);

  return (
    <div className="student-dashboard">
      {/* Header Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <div className="welcome-section">
            <h1 className="hero-title">
              Welcome Back, <span className="gradient-text">Student!</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing events, earn points, and grow your skills
            </p>
          </div>
          
          <div className="hero-actions">
            <div className="points-card glass-panel-enhanced">
              <div className="points-header">
                <div className="points-icon">⭐</div>
                <div className="points-info">
                  <span className="points-label">Your Points</span>
                  <span className="points-value">{studentPoints.toLocaleString()}</span>
                </div>
              </div>
              <div className="level-badge" style={{ backgroundColor: userLevel.color }}>
                {userLevel.name}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${(studentPoints % 1000) / 10}%`,
                    backgroundColor: userLevel.color
                  }}
                ></div>
              </div>
            </div>
            
            <button 
              className="feedback-btn glass-panel-enhanced"
              onClick={() => setShowFeedbackForm(true)}
            >
              <span className="btn-icon">💬</span>
              Submit Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackForm && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel-enhanced">
            <div className="modal-header">
              <h2>Submit Feedback to Administration</h2>
              <button 
                className="close-btn"
                onClick={() => setShowFeedbackForm(false)}
              >
                ×
              </button>
            </div>
            
            <div className="feedback-form">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📋</span>
                  Category *
                </label>
                <select 
                  className="form-select"
                  value={feedback.category}
                  onChange={(e) => handleFeedbackChange('category', e.target.value)}
                >
                  <option value="">Select a category</option>
                  {feedbackCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📝</span>
                  Title *
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Brief title of your feedback..."
                  value={feedback.title}
                  onChange={(e) => handleFeedbackChange('title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">💡</span>
                  Detailed Description *
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="Please provide detailed suggestions, improvements, or concerns..."
                  rows="5"
                  value={feedback.description}
                  onChange={(e) => handleFeedbackChange('description', e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">🚨</span>
                    Urgency Level
                  </label>
                  <select 
                    className="form-select"
                    value={feedback.urgency}
                    onChange={(e) => handleFeedbackChange('urgency', e.target.value)}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical Issue</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={feedback.anonymous}
                      onChange={(e) => handleFeedbackChange('anonymous', e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkmark"></span>
                    Submit anonymously
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  className="btn-cancel"
                  onClick={() => setShowFeedbackForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-submit"
                  onClick={submitFeedback}
                >
                  <span className="btn-icon">📤</span>
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card glass-panel-enhanced">
            <div className="stat-icon" style={{ background: 'var(--teal-gradient)' }}>📊</div>
            <div className="stat-info">
              <h3>Total Events</h3>
              <p className="stat-number">{events.length}</p>
            </div>
          </div>
          
          <div className="stat-card glass-panel-enhanced">
            <div className="stat-icon" style={{ background: 'var(--green-gradient)' }}>✅</div>
            <div className="stat-info">
              <h3>Registered</h3>
              <p className="stat-number">{registeredEvents.length}</p>
            </div>
          </div>
          
          <div className="stat-card glass-panel-enhanced">
            <div className="stat-icon" style={{ background: 'var(--gold-gradient)' }}>🎯</div>
            <div className="stat-info">
              <h3>Available Points</h3>
              <p className="stat-number">
                {events.filter(e => !e.registered).reduce((sum, event) => sum + event.points, 0).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="stat-card glass-panel-enhanced">
            <div className="stat-icon" style={{ background: 'var(--purple-gradient)' }}>📈</div>
            <div className="stat-info">
              <h3>Completion Rate</h3>
              <p className="stat-number">
                {registeredEvents.length > 0 
                  ? `${Math.round((registeredEvents.filter(e => e.participated).length / registeredEvents.length) * 100)}%`
                  : '0%'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <div className="events-container">
            {/* Search and Filter Section */}
            <div className="controls-section glass-panel-enhanced">
              <div className="search-container">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search events by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
              </div>
              
              <div className="category-tabs">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`tab-button ${activeTab === category.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(category.id)}
                    style={{
                      '--active-color': category.color
                    }}
                  >
                    <span className="tab-icon">{category.icon}</span>
                    <span className="tab-text">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className="events-section">
              <div className="section-header">
                <h2 className="section-title">
                  {activeTab === 'all' ? 'All Events' : 
                   categories.find(cat => cat.id === activeTab)?.name + ' Events'}
                  <span className="events-count">({filteredEvents.length})</span>
                </h2>
                <div className="sort-options">
                  <select className="sort-select">
                    <option>Sort by: Date</option>
                    <option>Sort by: Points</option>
                    <option>Sort by: Popularity</option>
                  </select>
                </div>
              </div>
              
              {filteredEvents.length === 0 ? (
                <div className="empty-state glass-panel-enhanced">
                  <div className="empty-icon">🔍</div>
                  <h3>No events found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="events-grid">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="event-card glass-panel-enhanced">
                      <div className="event-header">
                        <div className="event-image">{event.image}</div>
                        <div className="event-meta">
                          <span className="event-points">+{event.points} pts</span>
                          <span className={`event-difficulty ${event.difficulty.toLowerCase()}`}>
                            {event.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="event-content">
                        <h3 className="event-title">{event.title}</h3>
                        <p className="event-description">{event.description}</p>
                        
                        <div className="event-details">
                          <div className="detail-item">
                            <span className="detail-icon">📅</span>
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-icon">📍</span>
                            <span>{event.location}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-icon">⏱️</span>
                            <span>{event.duration}</span>
                          </div>
                        </div>
                        
                        <div className="capacity-info">
                          <div className="capacity-text">
                            <span className="detail-icon">👥</span>
                            {event.registeredCount}/{event.capacity} registered
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{width: `${(event.registeredCount / event.capacity) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="event-actions">
                        {event.registered ? (
                          <div className="action-buttons">
                            <button 
                              className="btn-participate"
                              onClick={() => participateEvent(event.id)}
                            >
                              <span className="btn-icon">🎯</span>
                              Participate & Earn Points
                            </button>
                            <button 
                              className="btn-unregister"
                              onClick={() => handleUnregister(event.id)}
                            >
                              <span className="btn-icon">❌</span>
                              Unregister
                            </button>
                          </div>
                        ) : (
                          <button 
                            className={`btn-register ${event.registeredCount >= event.capacity ? 'disabled' : ''}`}
                            onClick={() => handleRegister(event.id)}
                            disabled={event.registeredCount >= event.capacity}
                          >
                            <span className="btn-icon">
                              {event.registeredCount >= event.capacity ? '🔒' : '✅'}
                            </span>
                            {event.registeredCount >= event.capacity ? 'Event Full' : 'Register Now'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Registered Events */}
            {registeredEvents.length > 0 && (
              <div className="registered-events glass-panel-enhanced">
                <div className="sidebar-header">
                  <h3>Your Events</h3>
                  <span className="badge">{registeredEvents.length}</span>
                </div>
                <div className="registered-list">
                  {registeredEvents.map(event => (
                    <div key={event.id} className="registered-item">
                      <div className="event-emoji">{event.image}</div>
                      <div className="registered-info">
                        <h4 className="event-title-small">{event.title}</h4>
                        <div className="event-meta-small">
                          <span>{event.date}</span>
                          <span className="points-small">+{event.points}</span>
                        </div>
                      </div>
                      <button 
                        className={`participate-btn ${event.participated ? 'completed' : ''}`}
                        onClick={() => participateEvent(event.id)}
                        disabled={event.participated}
                      >
                        {event.participated ? (
                          <>
                            <span className="btn-icon">✅</span>
                            Completed
                          </>
                        ) : (
                          <>
                            <span className="btn-icon">🎯</span>
                            Participate
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="quick-stats glass-panel-enhanced">
              <div className="sidebar-header">
                <h3>Quick Stats</h3>
              </div>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="stat-label">Events Completed</span>
                  <span className="stat-value">
                    {registeredEvents.filter(e => e.participated).length}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Points Earned</span>
                  <span className="stat-value">
                    {registeredEvents
                      .filter(e => e.participated)
                      .reduce((sum, event) => sum + event.points, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Upcoming Events</span>
                  <span className="stat-value">
                    {registeredEvents.filter(e => !e.participated).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="achievements-preview glass-panel-enhanced">
              <div className="sidebar-header">
                <h3>Next Achievement</h3>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">🏆</div>
                <div className="achievement-info">
                  <h4>Point Master</h4>
                  <p>Reach 2,000 points</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${(studentPoints / 2000) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;