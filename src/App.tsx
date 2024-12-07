import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './components/auth/AuthProvider';
import Shell from './components/layout/Shell';
import Teams from './components/teams/Teams';
import Calendar from './components/calendar/Calendar';
import Messages from './components/messages/Messages';
import Login from './components/auth/Login';
import { useStore } from './lib/store';
import Projects from './components/projects/Projects';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="h-screen bg-white">
          <Routes>
            {/* Redirect authenticated users to /projects */}
            <Route path="/" element={<Navigate to="/projects" />} />

            {/* Routes that require authentication */}
            <Route
              path="*"
              element={
                <Shell>
                  <Routes>
                    {/* Projects Route */}
                    <Route path="/projects" element={<Projects />} />

                    {/* Teams Route */}
                    <Route path="/teams" element={<Teams />} />

                    {/* Calendar Route */}
                    <Route path="/calendar" element={<Calendar />} />

                    {/* Messages Route */}
                    <Route path="/messages" element={<Messages />} />
                  </Routes>
                </Shell>
              }
            />

            {/* Login Route, for unauthenticated users */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
