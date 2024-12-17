import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../pages/Login';
import AdminDashboard from '../../pages/AdminDashboard';
import StudentDashboard from '../../pages/StudentDashboard';
import ManageUsers from '../../pages/ManageUsers';
import Courses from '../../pages/Courses';
import Grades from '../../pages/Grades';
import ViewGrades from '../../pages/ViewGrades';
import Profile from '../../pages/Profile';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login/>} />

        {/* Admin Dashboard with Nested Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>}>
         {/* Redirect Default Admin Route to Manage Users */}
         <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="courses" element={<Courses />} />
          <Route path="grades" element={<Grades />} />
        </Route>

        {/* Student Dashboard with Nested Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/view-grades" element={<ViewGrades />} />
          <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;

