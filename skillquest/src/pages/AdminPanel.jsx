// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

    setEvents(mockEvents);
    setStudents(mockStudents);
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

  const getEventAnalytics = () => {
    const totalEvents = events.length;
    const totalRegistrations = events.reduce((sum, event) => sum + event.registeredCount, 0);
    const totalParticipants = events.reduce((sum, event) => sum + event.participants, 0);
    const totalPointsDistributed = events.reduce((sum, event) => sum + (event.participants * event.points), 0);
    
    return { totalEvents, totalRegistrations, totalParticipants, totalPointsDistributed };
  };

  const analytics = getEventAnalytics();

  const eventCategories = [
    { id: 'technical', name: 'Technical', icon: '💻' },
    { id: 'workshop', name: 'Workshop', icon: '🎓' },
    { id: 'seminar', name: 'Seminar', icon: '🎤' },
    { id: 'volunteer', name: 'Volunteer', icon: '🤝' },
    { id: 'competition', name: 'Competition', icon: '🏆' }
  ];

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
            <div className="analytics-icon">✅</div>
            <div className="analytics-info">
              <h3>Total Participants</h3>
              <p>{analytics.totalParticipants}</p>
            </div>
          </div>
          <div className="analytics-card glass-panel-enhanced">
            <div className="analytics-icon">⭐</div>
            <div className="analytics-info">
              <h3>Points Distributed</h3>
              <p>{analytics.totalPointsDistributed}</p>
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
    </div>
  );
};

export default AdminPanel;