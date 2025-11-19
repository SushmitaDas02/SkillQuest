// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [studentPoints, setStudentPoints] = useState(1250);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for events
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
        registered: false,
        capacity: 50,
        registeredCount: 32,
        image: "🎯"
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
        registered: true,
        capacity: 30,
        registeredCount: 28,
        image: "🌟"
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
        registered: false,
        capacity: 100,
        registeredCount: 67,
        image: "🤖"
      },
      {
        id: 4,
        title: "Community Service Day",
        description: "Volunteer for local community improvement projects",
        date: "2024-03-01",
        time: "9:00 AM",
        location: "City Park",
        points: 400,
        category: "volunteer",
        registered: false,
        capacity: 40,
        registeredCount: 22,
        image: "🌱"
      },
      {
        id: 5,
        title: "Startup Pitch Competition",
        description: "Pitch your business ideas to industry experts",
        date: "2024-03-05",
        time: "1:00 PM",
        location: "Innovation Hub",
        points: 600,
        category: "competition",
        registered: true,
        capacity: 20,
        registeredCount: 18,
        image: "💡"
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

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || event.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Events', icon: '📅' },
    { id: 'technical', name: 'Technical', icon: '💻' },
    { id: 'workshop', name: 'Workshops', icon: '🎓' },
    { id: 'seminar', name: 'Seminars', icon: '🎤' },
    { id: 'volunteer', name: 'Volunteer', icon: '🤝' },
    { id: 'competition', name: 'Competitions', icon: '🏆' }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header glass-panel-enhanced">
        <div className="header-content">
          <h1 className="gradient-text">Student Dashboard</h1>
          <div className="user-info">
            <div className="points-display">
              <span className="points-label">Your Points</span>
              <span className="points-value">{studentPoints}</span>
            </div>
            <div className="avatar">👤</div>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card glass-panel-enhanced">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Total Events</h3>
              <p>{events.length}</p>
            </div>
          </div>
          <div className="stat-card glass-panel-enhanced">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Registered</h3>
              <p>{registeredEvents.length}</p>
            </div>
          </div>
          <div className="stat-card glass-panel-enhanced">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>Available Points</h3>
              <p>{events.filter(e => !e.registered).reduce((sum, event) => sum + event.points, 0)}</p>
            </div>
          </div>
          <div className="stat-card glass-panel-enhanced">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>Your Level</h3>
              <p>Explorer</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="controls-section">
          <div className="search-box glass-panel-enhanced">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`tab-button ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-section">
          <h2 className="section-title">
            {activeTab === 'all' ? 'All Events' : 
             categories.find(cat => cat.id === activeTab)?.name + ' Events'}
          </h2>
          
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card glass-panel-enhanced">
                <div className="event-header">
                  <div className="event-image">{event.image}</div>
                  <div className="event-points">+{event.points} pts</div>
                </div>
                
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      {event.date} • {event.time}
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      {event.location}
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      {event.registeredCount}/{event.capacity} registered
                    </div>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${(event.registeredCount / event.capacity) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="event-actions">
                  {event.registered ? (
                    <div className="action-buttons">
                      <button 
                        className="btn-participate"
                        onClick={() => participateEvent(event.id)}
                      >
                        Participate & Earn Points
                      </button>
                      <button 
                        className="btn-unregister"
                        onClick={() => handleUnregister(event.id)}
                      >
                        Unregister
                      </button>
                    </div>
                  ) : (
                    <button 
                      className={`btn-register ${event.registeredCount >= event.capacity ? 'disabled' : ''}`}
                      onClick={() => handleRegister(event.id)}
                      disabled={event.registeredCount >= event.capacity}
                    >
                      {event.registeredCount >= event.capacity ? 'Full' : 'Register Now'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registered Events Sidebar */}
        {registeredEvents.length > 0 && (
          <div className="registered-events-sidebar glass-panel-enhanced">
            <h3>Your Registered Events</h3>
            <div className="registered-list">
              {registeredEvents.map(event => (
                <div key={event.id} className="registered-item">
                  <div className="registered-info">
                    <h4>{event.title}</h4>
                    <p>{event.date} • +{event.points} pts</p>
                  </div>
                  <button 
                    className={`btn-participate-small ${event.participated ? 'completed' : ''}`}
                    onClick={() => participateEvent(event.id)}
                    disabled={event.participated}
                  >
                    {event.participated ? 'Completed ✓' : 'Participate'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;