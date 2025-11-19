// src/pages/Dashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, BookOpen, Award, 
  TrendingUp, Clock, MapPin, Star
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const upcomingEvents = [
    { id: 1, title: 'Hackathon 2024', date: 'Mar 15', time: '6:00 PM', location: 'Tech Building' },
    { id: 2, title: 'Photography Workshop', date: 'Mar 18', time: '3:00 PM', location: 'Arts Center' },
    { id: 3, title: 'Music Club Practice', date: 'Mar 20', time: '5:00 PM', location: 'Music Hall' },
  ];

  const myClubs = [
    { id: 1, name: 'Tech Club', members: 150, events: 12 },
    { id: 2, name: 'Photography Club', members: 80, events: 8 },
    { id: 3, name: 'Debate Society', members: 60, events: 6 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's what's happening in your campus community today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel-enhanced p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">5</p>
                <p className="text-gray-600 dark:text-gray-300">Events Today</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Calendar className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel-enhanced p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">3</p>
                <p className="text-gray-600 dark:text-gray-300">My Clubs</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Users className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel-enhanced p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">12</p>
                <p className="text-gray-600 dark:text-gray-300">Activities</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel-enhanced p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">8</p>
                <p className="text-gray-600 dark:text-gray-300">Achievements</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Award className="text-yellow-600 dark:text-yellow-400" size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel-enhanced p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
              <Clock className="mr-3 text-purple-500" size={24} />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {event.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm">
                    Join
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* My Clubs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel-enhanced p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
              <BookOpen className="mr-3 text-blue-500" size={24} />
              My Clubs
            </h2>
            <div className="space-y-4">
              {myClubs.map((club, index) => (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{club.name}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {club.members} members
                      </span>
                      <span className="flex items-center">
                        <Star size={14} className="mr-1" />
                        {club.events} events
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                    View
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;